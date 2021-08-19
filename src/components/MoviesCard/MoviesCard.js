import React from 'react';

import filmThumbnail from '../../images/film-thumbnail-example.jpg';

import './movie-card.css';
import './movie-card__header.css';
import './movie-card__caption.css';
import './movie-card__duration-info.css';
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
        <p className="movie-card__caption">В погонепогонепогонепогонепогоне за Бенкси</p>
        <p className="movie-card__duration-info">27 минут</p>
      </div>
      <img className="movie-card__thumbnail" src={ filmThumbnail } alt="Постер фильма" />
      <button
        className={ 'movie-card__add-button ' + buttonAddClass }
      >
        { props.state ? '' : 'Сохранить' }
      </button>
    </div>
  );
}

export default MoviesCard;
