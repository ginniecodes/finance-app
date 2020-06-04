const database = require('../database');
class Client {
  constructor(params = {}) {
    this.id = params.id
    this.fullName = params.fullName
    this.birthdate = params.birthdate
    this.profilePicture = params.profilePicture
    this.user = params.user
  }

  async validate() {
    if (!Boolean(this.fullName) || this.fullName.length < 4) {
      throw new Error('NameRequired');
    }

    if (!Boolean(this.user) || this.user.id <= 0) {
      throw new Error('UserRequired');
    }

    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('users').where('id', '=', this.user.id);
      if (count <= 0) {
        throw new Error('UserNotFound');
      }

      const {clients} = await database.first().select([database.count('id').as('count')]).from('client_information').where('user_id', '=', this.user.id);
      if (clients > 0) {
        throw new Error('UserHasClient');
      }
      return true;
    } catch(error) {
      throw error;
    }
  }

  async exists() {
    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('client_information').where('id', '=', this.id);
      return count > 0;
    } catch(err) {
      return false;
    }
  }

  async create() {
    try {
      await this.validate();

      const [id] = await database('client_information').returning('id').insert({
        full_name: this.fullName,
        birthdate: this.birthdate,
        profile_picture: this.profilePicture,
        user_id: this.user.id
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
        throw new Error('ClientNotExists');
      }


      if(Boolean(newData.id)) {
        delete(newData.id);
      }

      if(newData.hasOwnProperty('user')) {
        newData['user_id'] = newData.user.id;
        delete(newData.user);
      }

      await database('client_information').where('id', '=', this.id).update(newData);

      if(newData.hasOwnProperty('user_id')) {
        this.user = { id: newData.user_id };
        delete(newData.user_id);
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
        throw new Error('ClientNotExists');
      }

      await database('client_information').where('id', '=', this.id).delete();
      return !(await this.exists());
    } catch(error) {
      throw error;
    }
  }
}

exports.Client = Client;

exports.findClientFromUser = async (userId) => {
  try {
    const [row] = await database.select(['id', 'full_name', 'birthdate', 'profile_picture', 'user_id']).from('client_information').where('user_id', userId);
    console.log(row)
    const client = new Client({
      id: row.id,
      fullName: row.full_name,
      birthdate: row.birthdate,
      profilePicture: this.profile_picture,
      user: {
        id: row.user_id
      }
    });
    return client;
  } catch(error) {
    throw error;
  }
};

exports.findClient = async (id) => {
  try {
    const [row] = await database.select(['id', 'full_name', 'birthdate', 'profile_picture', 'user_id']).from('client_information').where('id', '=', id);

    const client = new Client({
      id: row.id,
      fullName: row.full_name,
        birthdate: row.birthdate,
        profilePicture: this.profile_picture,
        user: {
          id: row.user_id
        }
    });
    return client;
  } catch(error) {
    throw error;
  }
};
