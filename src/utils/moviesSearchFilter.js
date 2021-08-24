function moviesSearchFilter(moviesList, searchQuery, isShort) {
  const keyWords = searchQuery.toLowerCase().split(' ').filter((key) => !!key);
  
  const filteredMoviesList = [];

  let include;

  for (let movie of moviesList) {
    include = true;

    if (isShort && movie.duration > 40) continue

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

export default moviesSearchFilter;
