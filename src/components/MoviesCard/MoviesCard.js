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
  let addButtonClass = '';

  if (props.page === 'movies' && props.isSaved) addButtonClass = 'movie-card__add-button_state_added';
  else if (props.page === 'saved-movies' && props.isSaved) addButtonClass= 'movie-card__add-button_state_saved';

  function handleMovieSave() {
    if (props.isSaved) {
      props.onDelete(props.movie._id);
      props.onFilteredMovieDelete(props.movie._id);
    }
    else props.onSave(props.movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <p className="movie-card__caption">{ props.movie.nameRU || props.movie.nameEN }</p>
        <p className="movie-card__duration-info">{ props.movie.duration + ' минут(ы)' }</p>
      </div>
      <a
        className="movie-card__link"
        href={ props.movie.trailer }
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__thumbnail"
          src={ props.movie.image }
          alt="Постер фильма"
        />
      </a>
      <button
        className={ 'movie-card__add-button ' + addButtonClass }
        onClick={ handleMovieSave }
      >
        { props.isSaved ? '' : 'Сохранить' }
      </button>
    </div>
  );
}

export default MoviesCard;
