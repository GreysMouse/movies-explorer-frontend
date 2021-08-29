import { MAIN_API_BASE_URL } from '../config';

class AuthApi {
  constructor(options) {
    this._baseURL = options.baseURL;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res);
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

const authApi = new AuthApi({
  baseURL: MAIN_API_BASE_URL
});

export default authApi;
