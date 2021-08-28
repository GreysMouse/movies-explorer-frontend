import React from 'react';

import IsDataLoadingContext from '../../contexts/IsDataLoadingContext';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './search-form.css';
import './search-form__input.css';
import './search-form__submit-button.css';
import './search-form__filter-checkbox.css';

function SearchForm(props) {
  const isDataloading = React.useContext(IsDataLoadingContext);

  const [ searchQuery, setSearchQuery ] = React.useState('');
  const [ isFormValid, setIsFormValid ] = React.useState(false);

  const [ isShortMovie, setIsShortMovie ] = React.useState(false);

  function handleMovieTitleInput(evt) {
    const { value } = evt.target;

    setSearchQuery(value);
    setIsFormValid(value.length !== 0);
  }

  function handleFilterCheckboxCheck() {
    setIsShortMovie(!isShortMovie);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    
    if (isFormValid || props.page === 'saved-movies') {
      props.onMoviesSearch(searchQuery, isShortMovie);
    }
    else console.log('Нужно ввести ключевое слово');
  }

  return (
    <form className="search-form">
      <input
        className="search-form__input"
        placeholder="Поиск фильма"
        autoComplete="off"
        spellCheck="false"
        required
        type="text"
        value={ searchQuery }
        onChange={ handleMovieTitleInput }
      />
      <button
        className="search-form__submit-button"
        onClick={ handleSubmit }
        disabled={ isDataloading }
      >
        Найти
      </button>
      <FilterCheckbox
        addClasses="search-form__filter-checkbox"
        onCheck={ handleFilterCheckboxCheck }
        isChecked={ isShortMovie }
      />
    </form>
  );
}

export default SearchForm;
