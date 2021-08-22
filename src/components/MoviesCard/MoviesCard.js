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
        <p className="movie-card__caption">{ props.cardData.nameRU || props.cardData.nameEN }</p>
        <p className="movie-card__duration-info">{ props.cardData.duration + ' минут(ы)' }</p>
      </div>
      <a
        className="movie-card__link"
        href={ props.cardData.trailerLink }
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__thumbnail"
          src={ 'https://api.nomoreparties.co' + props.cardData.image.url }
          alt="Постер фильма"
        />
      </a>
      <button
        className={ 'movie-card__add-button ' + buttonAddClass }
      >
        { props.state ? '' : 'Сохранить' }
      </button>
    </div>
  );
}

export default MoviesCard;
