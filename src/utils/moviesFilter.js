import { MOVIES_API_BASE_URL } from '../config';

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
        nameEN: movie.nameEN || 'noNameEN',
        owner: movie.owner || '-1'
      };
    });  
  };

  searchFilter(moviesList, searchQuery, isShort) {
    const keyWords = searchQuery.toLowerCase().split(' ').filter((key) => !!key);
  
    const filteredMoviesList = [];
  
    let include;
  
    for (let movie of moviesList) {
      if (isShort && movie.duration > 40) continue;
      
      include = true;     
  
      for (let word of keyWords) {     
        if (!(movie.nameRU || '').toLowerCase().split(' ').includes(word)) {
          if (!(movie.nameEN || '').toLowerCase().split(' ').includes(word)) {
            include = false;
            break;
          }
        }
      }
  
      if (include) filteredMoviesList.push(movie);
    }
    
    return filteredMoviesList;
  }
}

const moviesFilter = new MoviesFilter({
  MOVIES_API_BASE_URL
});

export default moviesFilter;
