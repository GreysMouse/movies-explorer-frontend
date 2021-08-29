import React from 'react';

import IsDataLoadingContext from '../../contexts/IsDataLoadingContext';

import './auth-form__input.css';
import './auth-form__input-label.css';
import './auth-form__input-span.css';
import './auth-form__input-span_visible.css';

function AuthFormInput(props) {
  const isDataloading = React.useContext(IsDataLoadingContext);

  return (
    <>
      <label className="auth-form__input-label">
        { props.labelText }
        <input
          className="auth-form__input"
          minLength={ props.minLength }
          maxLength={ props.maxLength }
          placeholder={ props.placeholder }
          autoComplete="off"
          spellCheck="false"
          required
          disabled={ isDataloading }
          type={ props.type }
          value={ props.value }
          onChange={ props.onChange }
        />
      </label>
      <span
        className={ 'auth-form__input-span ' + (props.isSpanVisible ? 'auth-form__input-span_visible' : '') }
      >
        { props.spanText }
      </span>
    </>
  );
}

export default AuthFormInput;
