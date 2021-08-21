import { BASE_URL } from '../config';

class MoviesApi {
  constructor(options) {
    this._baseURL = options.baseURL;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`${
      res.status === 500 ? 'Сервер не отвечает' : 'Ошибка с кодом ' + res.status + ': ' + res.statusText
    }`);
  }
  
  searchMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseURL: BASE_URL
});

export default moviesApi;
