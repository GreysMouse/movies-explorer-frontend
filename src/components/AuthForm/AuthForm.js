import React from 'react';

import IsDataLoadingContext from '../../contexts/IsDataLoadingContext';

import './auth-form.css';
import './auth-form__submit-button.css';
import './auth-form__submit-button_disabled.css';

function AuthForm(props) {
  const isDataLoading = React.useContext(IsDataLoadingContext);

  return (
      <form className={ 'auth-form ' + (props.addClasses || '') }>
        { props.children }
        <button
          className={ 'auth-form__submit-button ' + (props.isFormValid && !isDataLoading ?
              ''
            :
              'auth-form__submit-button_disabled'
          )}
          onClick={ props.onSubmit }
          disabled={ !props.isFormValid || isDataLoading }
        >
          { isDataLoading ? 'Авторизация...' : props.submitButtonText }
        </button>
      </form>
  );
}

export default AuthForm;
