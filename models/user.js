const database = require('../database')
const { getRandomString, sha512, encodeToken } = require('../util')

class User {
  constructor(params = {}) {
    this.id = params.id;
    this.email = params.email;
    if(params.password) {
      this.password = params.password;
    }
    if(params.salt) {
      this.salt = params.salt;
    }
    this.isAdmin = Boolean(params.isAdmin);
  }

  async validate() {

    if (!Boolean(this.email) || this.email.indexOf('@') < 0) {
      throw new Error('EmailRequired');
    }
  
    if (!Boolean(this.password) || this.password.length < 6) {
      throw new Error("PasswordRequired");
    }

    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('users').where('email', '=', this.email);
      if (count > 0) {
        throw new Error('EmailInUse');
      }
      return true;
    } catch(error) {
      throw error;
    }
  }

  async exists() {
    try {
      const {count} = await database.first().select([database.count('id').as('count')]).from('users').where('id', '=', this.id);
      return count > 0;
    } catch(err) {
      return false;
    }
  }

  async create() {
    try {
      await this.validate();

      this.salt = getRandomString(16);
      this.password = sha512(this.password, this.salt);
      const [id] = await database('users').returning('id').insert({
        is_admin: this.isAdmin,
        email: this.email,
        password: this.password,
        salt: this.salt
      });
      this.id = id;
      this.password = '';
      this.salt = '';
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
        throw new Error('UserNotExists');
      }

      if(newData.hasOwnProperty('password') && newData.password < 6) {
        throw new Error('PasswordRequired');
      }

      if(Boolean(newData.password)) {
        newData.password = sha512(newData.password, this.salt);
      }

      if(Boolean(newData.id)) {
        delete(newData.id);
      }

      if(newData.hasOwnProperty('isAdmin')) {
        newData['is_admin'] = Boolean(newData.isAdmin);
        delete(newData.isAdmin);
      }

      await database('users').where('id', '=', this.id).update(newData);
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
        throw new Error('UserNotExists');
      }

      await database('users').where('id', '=', this.id).delete();
      return !(await this.exists());
    } catch(error) {
      throw error;
    }
  }
}

exports.User = User;

exports.findUser = async (id, withPassword = false) => {
  const values = ['id', 'email', { isAdmin: 'is_admin' }];
  if(withPassword) {
    values.push('password');
    values.push('salt');
  }
  try {
    const [row] = await database.select(values).from('users').where('id', '=', id);
    const user = new User(row);
    return user;
  } catch(error) {
    throw error;
  }
}

exports.findUsers = async() => {
  const values = ['id', 'email', { isAdmin: 'is_admin' }];
  try {
    const rows = await database.select(values).from('users');
    return rows.map(row => new User(row));
  } catch(error) {
    throw error;
  }
}

exports.login = async(email, password) => {
  try {
    const [row] = await database.select(['id', 'email', 'password', 'salt']).from('users').where({ email });
    if(!row) {
      throw new Error('InvalidRequest');
    }
    const user = new User(row);
    if(!await user.exists()) {
      throw new Error('LoginError');
    }
    if(!(sha512(password, user.salt) === user.password)) {
      throw new Error('LoginError');
    }
    return encodeToken({ user: user.id });
  } catch(error) {
    throw error;
  }
}
