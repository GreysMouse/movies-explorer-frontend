import { BASE_URL } from '../config';

class UserApi {
  constructor(options) {
    this._baseURL = options.baseURL;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`${ res.status === 500 ? 'Сервер не отвечает' : 'Ошибка с кодом ' + res.status + ': ' + res.statusText }`);
  }
  
  register({ email, password, name }) {
    return fetch(`${ this._baseURL }/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(this._checkResponse);
  }

  login({ email, password }) {
    return fetch(`${ this._baseURL }/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._checkResponse);
  }

  logout() {
    return fetch(`${ this._baseURL }/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }
}

const userApi = new UserApi({
  baseURL: BASE_URL
});

export default userApi;
