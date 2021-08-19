import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './search-form.css';
import './search-form__input.css';
import './search-form__submit-button.css';
import './search-form__submit-button_disabled.css';
import './search-form__filter-checkbox.css';

function SearchForm() {
  const [ movieTitle, setMovieTitle ] = React.useState('');

  const [ isFormValid, setIsFormValid ] = React.useState(false);

  function handleMovieTitleInput(evt) {
    const { value } = evt.target;

    setMovieTitle(value);

    if (!value) setIsFormValid(false);
    else setIsFormValid(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <form className="search-form">
      <input
        className="search-form__input"
        placeholder="Поиск фильма"
        autoComplete="off"
        spellCheck="false"
        type="text"
        value={ movieTitle }
        onChange={ handleMovieTitleInput }
      />
      <button
        className={ 'search-form__submit-button ' + (isFormValid ? '' : 'search-form__submit-button_disabled') }
        onClick={ handleSubmit }
        disabled={ !isFormValid }
      >
        Найти
      </button>
      <FilterCheckbox addClasses="search-form__filter-checkbox" />
    </form>
  );
}

export default SearchForm;
