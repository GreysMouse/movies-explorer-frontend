import React from 'react';

import './profile-form.css';
import './profile-form__input.css';
import './profile-form__input-label.css';
import './profile-form__input-label_last.css';
import './profile-form__submit-button.css';
import './profile-form__submit-button_disabled.css';

function ProfileForm(props) {
  const [ userName, setUserName ] = React.useState('');
  const [ userEmail, setUserEmail ] = React.useState('');

  const [ isValidUserName, setIsValidUserName ] = React.useState(true);
  const [ isValidUserEmail, setIsValidUserEmail ] = React.useState(true);

  const [ isFormValid, setIsFormValid ] = React.useState(false);

  React.useEffect(() => {
    if (!userName && !userEmail) setIsFormValid(false);
    else setIsFormValid(true);
  }, [ userName, userEmail ]);

  function handleUserNameInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserName(value);
    setIsValidUserName(valid);
  }

  function handleUserEmailInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserEmail(value);
    setIsValidUserEmail(valid);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!isValidUserName || !isValidUserEmail) alert('Тут будет модальное окно');
    else props.onUserUpdate();
  }

  return (
    <form className={ 'profile-form ' + (props.addClasses || '') }>
      <label className="profile-form__input-label">
        Имя
        <input
          className="profile-form__input"
          minLength="2"
          maxLength="30"
          placeholder="Введите новое имя"
          autoComplete="off"
          spellCheck="false"
          type="text"
          value={ userName }
          onChange={ handleUserNameInput }
        />
      </label>
      <label className="profile-form__input-label profile-form__input-label_last">
        E-mail
        <input
          className="profile-form__input"
          placeholder="Введите новый E-mail"
          autoComplete="off"
          spellCheck="false"
          type="email"
          value={ userEmail }
          onChange={ handleUserEmailInput }
        />
      </label>
      <button
        className={ 'profile-form__submit-button ' + (isFormValid ? '' : 'profile-form__submit-button_disabled') } 
        onClick={ handleSubmit }
        disabled={ !isFormValid }
      >
        Редактировать
      </button>
    </form>
  );
}

export default ProfileForm;
