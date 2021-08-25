import { MAIN_API_BASE_URL, MOVIES_API_BASE_URL } from '../config';

class MoviesApi {
  constructor(options) {
    this._mainBaseURL = options.mainBaseURL;
    this._moviesBaseURL = options.moviesBaseURL;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`${
      res.status === 500 ? 'Сервер не отвечает' : 'Ошибка с кодом ' + res.status + ': ' + res.statusText
    }`);
  }
  
  searchMovies() {
    return fetch(`${ this._moviesBaseURL }/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${ this._mainBaseURL }/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  saveMovie({ country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN }) {
    return fetch(`${ this._mainBaseURL }/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN
      })
    })
    .then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${ this._mainBaseURL }/movies/${ movieId }`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  mainBaseURL: MAIN_API_BASE_URL,
  moviesBaseURL: MOVIES_API_BASE_URL
});

export default moviesApi;
