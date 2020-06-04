const database = require('../database');

class Transaction {
  constructor(params={}) {
    this.id = params.id
    this.category = params.category
    this.type = params.type
    this.currency = params.currency
    this.client = params.client
    this.amount = params.amount
    this.date = params.date
  }

  async validate() {
    if (!Boolean(this.amount) || this.amount <= 0) {
      throw new Error('AmountRequired');
    }

    if (!Boolean(this.client) || this.client.id <= 0) {
      throw new Error('UserRequired');
    }

    if (!Boolean(this.type) || !['income', 'outcome'].includes(this.type)) {
      throw new Error("TypeRequired");
    }

    if (!Boolean(this.category) || this.category.id <= 0) {
      throw new Error('CategoryRequired');
    }

    if(!Boolean(this.currency) || this.currency.id <= 0) {
      throw new Error('CurrencyRequired');
    }

    if(!Boolean(this.date) || typeof this.date != typeof (new Date())) {
      throw new Error('DateRequired');
    }

    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('client_information').where('id', '=', this.client.id);
      if (count <= 0) {
        throw new Error('ClientNotFound');
      }
      return true;
    } catch(error) {
      throw error;
    }
  }

  async exists() {
    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('transactions').where('id', '=', this.id);
      return count > 0;
    } catch(err) {
      return false;
    }
  }

  async create() {
    try {
      await this.validate();

      const [id] = await database('transactions').returning('id').insert({
        category: this.category.id,
        type: this.type,
        currency: this.currency.id,
        client_id: this.client.id,
        amount: this.amount,
        date: this.date
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
        throw new Error('TransactionNotExists');
      }


      if(Boolean(newData.id)) {
        delete(newData.id);
      }

      if(newData.hasOwnProperty('client')) {
        newData['client_id'] = newData.client.id;
        delete(newData.client);
      }

      if(newData.hasOwnProperty('currency')) {
        newData.currency = newData.currency.id;
      }

      if(newData.hasOwnProperty('category')) {
        newData.category = newData.category.id;
      }

      await database('transactions').where('id', '=', this.id).update(newData);

      if(newData.hasOwnProperty('client_id')) {
        this.client = { id: newData.client_id };
        delete(newData.client_id);
      }

      if(newData.hasOwnProperty('currency')) {
        this.currency = { id: newData.currency };
        delete(newData.currency)
      }

      if(newData.hasOwnProperty('category')) {
        this.category = { id: newData.category };
        delete(newData.category);
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
        throw new Error('TransactionNotExists');
      }

      await database('transactions').where('id', '=', this.id).delete();
      return !(await this.exists());
    } catch(error) {
      throw error;
    }
  }
}

exports.Transaction = Transaction;

exports.findTransaction = async (id) => {
  const values = [
    {id: 'transactions.id'},
    {amount: 'transactions.amount'},
    {type: 'transactions.type'},
    {categoryId: 'transactions.category'},
    {categoryName: 'categories.name'},
    {currencyId: 'transactions.currency'},
    {currencyName: 'currencies.name'},
    {currencySymbol: 'currencies.symbol'},
    {date: 'transactions.date'},
    {clientId: 'transactions.client_id'}
  ];
  try {

    const [row] = await database.select(values).from('transactions')
      .rightJoin('categories', 'categories.id', '=', 'transactions.category')
      .rightJoin('currencies', 'currencies.id', '=', 'transactions.currency')
      .rightJoin('client_information', 'client_information.id', '=', 'transactions.client_id')
      .where('transactions.id', '=', id);
    
    const tr = new Transaction({
      id: row.id,
      amount: row.amount,
      type: row.type,
      category: {
        id: row.categoryId,
        name: row.categoryName
      },
      currency: {
        id: row.currencyId,
        name: row.currencyName,
        symbol: row.currencySymbol
      },
      date: row.date,
      client: { id: row.clientId }
    });

    return tr;
  } catch(error) {
    throw error;
  }
}

exports.findUserTransactions = async (userId) => {
  const values = [
    {id: 'transactions.id'},
    {amount: 'transactions.amount'},
    {type: 'transactions.type'},
    {categoryId: 'transactions.category'},
    {categoryName: 'categories.name'},
    {currencyId: 'transactions.currency'},
    {currencyName: 'currencies.name'},
    {currencySymbol: 'currencies.symbol'},
    {date: 'transactions.date'},
    {clientId: 'transactions.client_id'}
  ];

  try {
    const rows = await database.select(values).from('transactions')
    .rightJoin('categories', 'categories.id', '=', 'transactions.category')
    .rightJoin('currencies', 'currencies.id', '=', 'transactions.currency')
    .rightJoin('client_information', 'client_information.id', '=', 'transactions.client_id')
    .where('client_information.user_id', '=', userId);

    return rows.map(row => new Transaction({
      id: row.id,
      amount: row.amount,
      type: row.type,
      category: {
        id: row.categoryId,
        name: row.categoryName
      },
      currency: {
        id: row.currencyId,
        name: row.currencyName,
        symbol: row.currencySymbol
      },
      date: row.date,
      client: { id: row.clientId }
    }));
  } catch(error) {
    throw error;
  }
};

exports.findClientTransactions = async (clientId) => {
  const values = [
    {id: 'transactions.id'},
    {amount: 'transactions.amount'},
    {type: 'transactions.type'},
    {categoryId: 'transactions.category'},
    {categoryName: 'categories.name'},
    {currencyId: 'transactions.currency'},
    {currencyName: 'currencies.name'},
    {currencySymbol: 'currencies.symbol'},
    {date: 'transactions.date'},
    {clientId: 'transactions.client_id'}
  ];

  try {
    const rows = await database.select(values).from('transactions')
    .rightJoin('categories', 'categories.id', '=', 'transactions.category')
    .rightJoin('currencies', 'currencies.id', '=', 'transactions.currency')
    .where('transactions.client_id', '=', clientId);

    return rows.map(row => new Transaction({
      id: row.id,
      amount: row.amount,
      type: row.type,
      category: {
        id: row.categoryId,
        name: row.categoryName
      },
      currency: {
        id: row.currencyId,
        name: row.currencyName,
        symbol: row.currencySymbol
      },
      date: row.date,
      client: { id: row.clientId }
    }));
  } catch(error) {
    throw error;
  }
};

/*
exports.findUserBalance = async (userId) => {
  try {
    const rows = await database.column(values).from('transactions')
    .rightJoin('categories', 'categories.id', '=', 'transactions.category')
    .rightJoin('currencies', 'currencies.id', '=', 'transactions.currency')
    .rightJoin('client_information', 'client_information.id', '=', 'transactions.user_id')
    .where('client_information.user_id', '=', userId);

    return rows.map(row => new Transaction(row));
  } catch(error) {
    throw error;
  }
}
*/