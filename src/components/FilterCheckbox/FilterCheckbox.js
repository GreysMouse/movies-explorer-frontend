import React from 'react';

import './filter-checkbox.css';
import './filter-checkbox__input.css';
import './filter-checkbox__label.css';
import './filter-checkbox__label_checked.css';

function FilterCheckbox(props) {
  const [ isChecked, setIsChecked ] = React.useState(false);

  function handleFilterCheckboxCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <div className={ 'filter-checkbox ' + (props.addClasses || '') }>
      <input className="filter-checkbox__input" id="filter-__input" type="checkbox" />
      <label 
        className={ 'filter-checkbox__label ' + (isChecked ? 'filter-checkbox__label_checked' : '') }
        for="filter-checkbox__input"
        onClick={ handleFilterCheckboxCheck }
      >
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
