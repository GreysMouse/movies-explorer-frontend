import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesUploader from '../MoviesUploader/MoviesUploader';

import './movies.css';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm
        page="movies"
        onMoviesSearch={ props.onMoviesSearch }
      />
      {
        (props.displayedMoviesList.length || props.isSearchButtonClicked) && <MoviesCardList
          page="movies"
          foundMoviesList={ props.foundMoviesList }
          displayedMoviesList={ props.displayedMoviesList }
          savedMoviesList={ props.savedMoviesList }
          onMovieSave={ props.onMovieSave }
          onMovieDelete={ props.onMovieDelete }
        />
      }
      {
        props.displayedMoviesList.length !== props.foundMoviesList.length && <MoviesUploader
          onButtonClick={ props.onUploaderClick }
        />
      }
    </main>
  );
}

export default Movies;
