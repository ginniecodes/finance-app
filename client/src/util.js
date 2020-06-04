export function api(url = '/', method='GET', data=null, options={}) {
  method = method.toUpperCase();
  const params = {
    ...options,
    method,
    headers: {
      'Accept-Language': 'es',
      ...options.headers
    }
  };
  if (data) {
    if (method === 'GET') {
      url += '?';
      let str = '';
      for (let key in data) {
        str += `${str.length === 0 ? '': '&'}${key}=${data[key]}`;
      }
      url += str;
    } else {
      params.headers['Content-Type'] = 'application/json';
      params.body = JSON.stringify(data);
    }
  }

  if ((url !== '/auth/login' || url !== '/auth/register') && !params.headers.hasOwnProperty('Authorization')) {
    params.headers['Authorization'] = `Bearer ${localStorage.getItem("auth")}`;
  }

  return fetch(encodeURI(url), params)
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    throw res
  })
  .catch(err => {
    throw err
  });
}

export class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removeListener(name, listenerToRemove) {
    if (!this._events[name]) {
      throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  emit(name, data) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    const fireCallbacks = (callback) => {
      callback(data);
    };

    this._events[name].forEach(fireCallbacks);
  }
}

export class AuthManager extends EventEmitter {
  constructor() {
    super();
    this.admin = false;
  }

  get token() {
    return localStorage.getItem("auth");
  }

  set token(token) {
    localStorage.setItem("auth", token);
  }

  hasAuth() {
    return this.token !== null && this.token !== undefined && this.token.length > 12
  }

  isAdmin() {
    return this.admin
  }

  async load() {
    return api('/api/user')
    .catch(err => { 
      this.logout();
    })
    .then(res => {
      this.admin = res.data.user.isAdmin;
    });
  }

  login(email, password) {
    return api('/auth/login', 'POST', {
      email,
      password
    })
    .then(res => {
      if(res.status) {
        this.token = res.data.token;
        this.emit('login', res.status);
      }
      return res.status;
    })
    .catch(err => false);
  }

  register(data) {
    data.birthdate = (new Date()).toISOString().split('T')[0];
    return api('/auth/register', 'POST', data);
  }

  logout() {
    localStorage.removeItem("auth");
    this.emit('logout', true);
    return Promise.resolve(true);
  }
}
