import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import './movies-card-list.css';
import './movies-card-list__text.css';

function MoviesCardList(props) {

  return (
    <section className={ 'movies-card-list ' + (props.addClasses || '')}>
      {
        props.isMoviesLoading ? <Preloader /> :
        props.foundMoviesList.length ? props.uploadedMoviesList.map((movie) => {
          return (
            <MoviesCard
              key={ movie.id }
              data={ movie.data }
              onSave={ props.onMovieSave }
            />
          );
        }) : 
        <p className="movies-card-list__text">Ничего не найдено</p>
      }
    </section>
  );
}

export default MoviesCardList;
