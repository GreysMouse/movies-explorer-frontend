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
  let buttonAddClass = '';

  if (props.state === 'added') buttonAddClass = 'movie-card__add-button_state_added';
  else if (props.state === 'saved') buttonAddClass = 'movie-card__add-button_state_saved';

  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <p className="movie-card__caption">{ props.data.nameRU || props.data.nameEN }</p>
        <p className="movie-card__duration-info">{ props.data.duration + ' минут(ы)' }</p>
      </div>
      <a
        className="movie-card__link"
        href={ props.data.trailerLink }
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__thumbnail"
          src={ 'https://api.nomoreparties.co' + props.data.image.url }
          alt="Постер фильма"
        />
      </a>
      <button
        className={ 'movie-card__add-button ' + buttonAddClass }
        onClick={ props.onSave }
      >
        { props.state ? '' : 'Сохранить' }
      </button>
    </div>
  );
}

export default MoviesCard;
