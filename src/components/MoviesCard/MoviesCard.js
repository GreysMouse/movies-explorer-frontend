import React from 'react';

import './movie-card.css';
import './movie-card__header.css';
import './movie-card__caption.css';
import './movie-card__duration-info.css';
import './movie-card__link.css';
import './movie-card__thumbnail.css';
import './movie-card__add-button.css';
import './movie-card__add-button_state_added.css';
import './movie-card__add-button_state_saved.css';

function MoviesCard(props) {
  const [ isSaved, setIsSaved ] = React.useState(() => {
    const movie = props.savedMoviesList.find((savedMovie) => savedMovie.movieId === props.movie.id);
    
    return movie ? true : false;
  });

  function handleMovieSave() {
    if (isSaved) {
      const movie = props.savedMoviesList.find((savedMovie) => savedMovie.movieId === props.movie.id);

      props.onDelete(movie._id)
      .then(() => setIsSaved(false))
      .catch((err) => console.log(err));
    } else {
      props.onSave({
        country: props.movie.country,
        director: props.movie.director,
        duration: props.movie.duration,
        year: props.movie.year,
        description: props.movie.description,
        image: props.movie.image.url,
        trailer: props.movie.trailerLink,
        thumbnail: props.movie.image.formats.thumbnail.url,
        movieId: props.movie.id,
        nameRU: props.movie.nameRU,
        nameEN: props.movie.nameEN
      })
      .then(() => setIsSaved(true))
      .catch((err) => console.log(err));
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <p className="movie-card__caption">{ props.movie.nameRU || props.movie.nameEN }</p>
        <p className="movie-card__duration-info">{ props.movie.duration + ' минут(ы)' }</p>
      </div>
      <a
        className="movie-card__link"
        href={ props.movie.trailerLink }
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__thumbnail"
          src={ 'https://api.nomoreparties.co' + props.movie.image.url }
          alt="Постер фильма"
        />
      </a>
      <button
        className={ 'movie-card__add-button ' + (isSaved ? 'movie-card__add-button_state_added' : '') }
        onClick={ handleMovieSave }
      >
        { isSaved ? '' : 'Сохранить' }
      </button>
    </div>
  );
}

export default MoviesCard;
