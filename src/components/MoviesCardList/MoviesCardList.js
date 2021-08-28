import React from 'react';

import IsDataLoadingContext from '../../contexts/IsDataLoadingContext';

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import './movies-card-list.css';
import './movies-card-list__text.css';

function MoviesCardList(props) {
  const isDataloading = React.useContext(IsDataLoadingContext);

  return (
    <section className={ 'movies-card-list ' + (props.addClasses || '') }>
      {
        isDataloading && <Preloader />
      }
      {
        props.page === 'movies' && !isDataloading && (
          props.displayedMoviesList.length ? 
            props.displayedMoviesList.map((displayedMovie) => {
              const savedMovie = props.savedMoviesList.find((savedMovie) => {
                return savedMovie.movieId === displayedMovie.movieId;
              });

              const movie = savedMovie || displayedMovie;

              return (
                <MoviesCard
                  key={ movie.movieId }
                  page="movies"
                  movie={ movie }
                  isSaved={ !!savedMovie }
                  onSave={ props.onMovieSave }
                  onDelete={ props.onMovieDelete }
                />
              );
            })
          :
            <p className="movies-card-list__text">Ничего не найдено</p>
        )
      }
      {
        props.page === 'saved-movies' && (
          props.inSearch ?
            props.filteredMoviesList.length ?
              props.filteredMoviesList.map((movie) => {
                return (
                  <MoviesCard
                    key={ movie.movieId }
                    page="saved-movies"
                    movie={ movie }
                    isSaved={ true }
                    onDelete={ props.onMovieDelete }
                  />
                );
              })
            :
              <p className="movies-card-list__text">Ничего не найдено</p>
          :
            props.savedMoviesList.map((movie) => {
              return (
                <MoviesCard
                  key={ movie.movieId }
                  page="saved-movies"
                  movie={ movie }
                  isSaved={ true }
                  onDelete={ props.onMovieDelete }
                />
              );
            })
        )
      }
    </section>
  );
}

export default MoviesCardList;
