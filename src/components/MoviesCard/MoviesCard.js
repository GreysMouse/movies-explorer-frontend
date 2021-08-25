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
  function handleMovieSave() {
    props.isSaved ? props.onDelete(props.movie._id) : props.onSave(props.movie);
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
        className={ 'movie-card__add-button ' + (props.isSaved ? 'movie-card__add-button_state_added' : '') }
        onClick={ handleMovieSave }
      >
        { props.isSaved ? '' : 'Сохранить' }
      </button>
    </div>
  );
}

export default MoviesCard;
