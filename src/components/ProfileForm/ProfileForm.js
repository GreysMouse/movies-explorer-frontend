import React from 'react';

import IsDataLoadingContext from '../../contexts/IsDataLoadingContext';

import './profile-form.css';
import './profile-form__input-span.css';
import './profile-form__input-span_visible.css';
import './profile-form__submit-button.css';
import './profile-form__submit-button_disabled.css';

function ProfileForm(props) {
  const isDataLoading = React.useContext(IsDataLoadingContext);

  return (
    <form className={ 'profile-form ' + (props.addClasses || '') }>
      { props.children }
      <span
        className={ 'profile-form__input-span ' + (props.isSpanVisible ?
            'profile-form__input-span_visible'
          :
            ''
        )}
      >
        { props.spanText }
      </span>
      <button
        className={ 'profile-form__submit-button ' + (props.isFormValid && !isDataLoading ? 
            ''
          :
            'profile-form__submit-button_disabled'
        )} 
        onClick={ props.onSubmit }
        disabled={ !props.isFormValid || isDataLoading }
      >
        { isDataLoading ? 'Сохранение...' : 'Редактировать' }
      </button>
    </form>
  );
}

export default ProfileForm;
