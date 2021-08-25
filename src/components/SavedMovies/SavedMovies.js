import React from 'react';

import moviesFilter from '../../utils/moviesFilter';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './saved-movies.css';
import './saved-movies__movies-card-list.css';

function SavedMovies(props) {
  const [ filteredMoviesList, setFilteredMoviesList ] = React.useState([]);
  const [ isFiltered, setIsFiltered ] = React.useState(false);

  function handleSavedMoviesSearch(searchQuery, isShort) {
    if (searchQuery) {
      const filteredMovies = moviesFilter.searchFilter(props.savedMoviesList, searchQuery, isShort);

      setFilteredMoviesList(filteredMovies);
      setIsFiltered(true);
    }
    else setIsFiltered(false);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        page="saved-movies"
        onMoviesSearch={ handleSavedMoviesSearch }
        disabled={ props.isMoviesLoading }
      />
      {
        props.savedMoviesList.length && <MoviesCardList
          addClasses="saved-movies__movies-card-list"
          page="saved-movies"
          savedMoviesList={ props.savedMoviesList }
          filteredMoviesList={ filteredMoviesList }
          isMoviesLoading={ props.isMoviesLoading } //
          isFiltered={ isFiltered }
          onMovieDelete={ props.onMovieDelete }
        />
      }
    </main>
  );
}

export default SavedMovies;
