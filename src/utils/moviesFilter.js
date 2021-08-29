import { MOVIES_API_BASE_URL, SHORT_MOVIE_DURATION_LIMIT } from '../config';

class MoviesFilter {
  constructor(options) {
    this._baseURL = options.baseURL;
  }

  propertiesFilter(moviesList) {
    return moviesList.map((movie) => {
      return {
        _id: movie._id || '-1',
        country: movie.country || 'no country',
        director: movie.director || 'no director',
        duration: movie.duration || 1000000,
        year: movie.year || 'no year',
        description: movie.description || 'no description',
        image: MOVIES_API_BASE_URL + movie.image.url || '',
        trailer: movie.trailerLink || 'https://example.com/',
        thumbnail: MOVIES_API_BASE_URL + movie.image.formats.thumbnail.url || '',
        movieId: movie.id || 1000000,
        nameRU: movie.nameRU || 'no nameRU',
        nameEN: movie.nameEN || 'no NameEN',
        owner: movie.owner || '-1'
      };
    });  
  };

  _isWordFound(str, word) {
    let str_pointer = 0;
    let word_pointer = 0;

    while(str_pointer < str.length) {
      if (str[str_pointer] === word[word_pointer]) {
        if (word_pointer === word.length - 1) return true;
        word_pointer++;
      }
      else if (word_pointer !== 0) {
        word_pointer = 0;
        continue;
      }
      str_pointer++;
    }
    return false;
  }

  searchFilter(moviesList, searchQuery, isShort) {
    const keyWords = searchQuery.toLowerCase().split(' ').filter((key) => !!key);
    const filteredMoviesList = [];

    let nameRU = '';
    let nameEN = '';
    
    for (let movie of moviesList) {
      if (isShort && movie.duration > SHORT_MOVIE_DURATION_LIMIT) continue;
      
      nameRU = movie.nameRU.toLowerCase();
      nameEN = movie.nameEN.toLowerCase();

      for (let word of keyWords) {
        word = word.toLowerCase();

        if (this._isWordFound(nameRU, word) || this._isWordFound(nameEN, word)) {
            filteredMoviesList.push(movie);
            break;
        }
      }
    }
    
    return filteredMoviesList;
  }
}

const moviesFilter = new MoviesFilter({
  MOVIES_API_BASE_URL
});

export default moviesFilter;
