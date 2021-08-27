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

  searchFilter(moviesList, searchQuery, isShort) {
    const keyWords = searchQuery.toLowerCase().split(' ').filter((key) => !!key);
    const filteredMoviesList = [];
    
    for (let movie of moviesList) {
      if (isShort && movie.duration > SHORT_MOVIE_DURATION_LIMIT) continue;
      
      for (let word of keyWords) {
        const regExp = new RegExp('(' + word + ')', 'i');

        if ((movie.nameRU || '').search(regExp) !== -1 || (movie.nameEN || '').search(regExp) !== -1) {
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
