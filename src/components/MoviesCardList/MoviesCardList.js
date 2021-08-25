import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import './movies-card-list.css';
import './movies-card-list__text.css';

function MoviesCardList(props) {

  return (
    <section className={ 'movies-card-list ' + (props.addClasses || '') }>
      {
        props.page === 'movies' && (
          props.isMoviesLoading ?
            <Preloader />
          :
          //found
            props.uploadedMoviesList.length ? 
              props.uploadedMoviesList.map((uploadedMovie) => {
                const savedMovie = props.savedMoviesList.find((savedMovie) => {
                  return savedMovie.movieId === uploadedMovie.movieId;
                });

                const movie = savedMovie || uploadedMovie;

                return (
                  <MoviesCard
                    key={ movie.movieId }
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
          props.isMoviesLoading ?
            <Preloader />
          :
            (props.isFiltered ? props.filteredMoviesList : props.savedMoviesList).map((movie) => {
              return (
                <MoviesCard
                  key={ movie.movieId }
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
