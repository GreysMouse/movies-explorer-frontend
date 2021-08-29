import React from 'react';

import './filter-checkbox.css';
import './filter-checkbox__input.css';
import './filter-checkbox__label.css';
import './filter-checkbox__label_checked.css';

function FilterCheckbox(props) {
  return (
    <div className={ 'filter-checkbox ' + (props.addClasses || '') }>
      <input className="filter-checkbox__input" id="filter-__input" type="checkbox" />
      <label 
        className={ 'filter-checkbox__label ' + (props.isChecked ? 'filter-checkbox__label_checked' : '') }
        htmlFor="filter-checkbox__input"
        onClick={ props.onCheck }
      >
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
