const database = require('../database');

class Category {
  constructor(params = {}) {
    this.id = params.id
    this.name = params.name
    this.type = params.type
    this.client = params.client
  }

  async validate() {
    if (!Boolean(this.name) || this.name.length < 1) {
      throw new Error('NameRequired');
    }

    if(!Boolean(this.client) || this.client.id <= 0) {
      throw new Error('ClientRequired');
    }

    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('client_information').where('id', '=', this.client.id);
      if (count <= 0) {
        throw new Error('ClientNotExists');
      }
      return true;
    } catch(error) {
      throw error;
    }
  }

  async exists() {
    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('categories').where('id', '=', this.id);
      return count > 0;
    } catch(err) {
      return false;
    }
  }

  async create() {
    try {
      const [id] = await database('categories').returning('id').insert({
        name: this.name,
        type: this.type,
        client_id: this.client.id
      });
      this.id = id;
      return this;
    } catch(error) {
      throw error;
    }
  }

  async update(newData) {
    try {
      if(!Boolean(this.id)) {
        throw new Error('InvalidRequest');
      }

      if(!(await this.exists())) {
        throw new Error('CategoryNotFound');
      }
      
      if(newData.hasOwnProperty('id')) {
        delete(newData.id);
      }

      if(newData.hasOwnProperty('client')) {
        newData.client_id = newData.client.id;
        delete(newData.client);
      }

      await database('categories').where('id', '=', this.id).update(newData);

      if(newData.hasOwnProperty('client_id')) {
        newData.client = { id: newData.client_id };
        delete(newData.client_id);
      }

      Object.assign(this, newData);
      return this;
    } catch(error) {
      throw error;
    }
  }

  async delete() {
    try {
      if(!Boolean(this.id)) {
        throw new Error('InvalidRequest');
      }

      if(!(await this.exists())) {
        throw new Error('CategoryNotFound');
      }

      await database('categories').where('id', '=', this.id).delete();
      return !(await this.exists());
    } catch(error) {
      throw error
    }
  }
}

exports.Category = Category;

exports.findClientCategories = async (clientId) => {
  const values = ['id', 'name', 'type'];
  try {
    const rows = await database.select(values).from('categories').where('type', 'default').orWhere('client_id', clientId);
    return rows.map(row => new Category(row));
  } catch(error) {
    throw error;
  }
};

exports.findCategory = async id => {
  const values = ['id', 'name', 'type', 'client_id'];
  try {
    const [row] = await database.select(values).from('categories').where('id', '=', id);
    return new Category({
      id: row.id,
      name: row.name,
      type: row.type,
      client: { id: row.client_id }
    });
  } catch(error) {
    throw error;
  }
};
