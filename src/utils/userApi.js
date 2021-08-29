import { MAIN_API_BASE_URL } from '../config';

class UserApi {
  constructor(options) {
    this._baseURL = options.baseURL;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res);
  }
  
  getUserCredentials() {
    return fetch(`${ this._baseURL }/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  updateUserCredentials({ email, name }) {
    return fetch(`${ this._baseURL }/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name })
    })
    .then(this._checkResponse);
  }
}

const userApi = new UserApi({
  baseURL: MAIN_API_BASE_URL
});

export default userApi;
