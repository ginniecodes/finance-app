const database = require('../database');

class Currency {
  constructor(params = {}) {
    this.id = params.id
    this.name = params.name
    this.symbol = params.symbol
  }

  async exists() {
    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('currencies').where('id', '=', this.id);
      return count > 0;
    } catch(err) {
      return false;
    }
  }

  async create() {
    try {
      const [id] = await database('currencies').returning('id').insert({
        name: this.name,
        symbol: this.symbol
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
        throw new Error('CurrencyNotFound');
      }
      
      if(newData.hasOwnProperty('id')) {
        delete(newData.id);
      }

      await database('currencies').where('id', '=', this.id).update(newData);

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
        throw new Error('CurrencyNotFound');
      }

      await database('currencies').where('id', '=', this.id).delete();
      return !(await this.exists());
    } catch(error) {
      throw error
    }
  }
}

exports.Currency = Currency;

exports.findCurrencies = async () => {
  const values = ['id', 'name', 'symbol'];

  try {
    const rows = await database.select(values).from('currencies');
    return rows.map(row => new Currency(row));
  } catch(error) {
    throw error;
  }
};

exports.findCurrency = async id => {
  const values = ['id', 'name', 'symbol'];
  try {
    const [row] = await database.select(values).from('currencies').where('id', '=', id);
    return new Currency(row);
  } catch(error) {
    throw error;
  }
};
