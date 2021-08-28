import React from 'react';
import Validator from 'validator';
import { Link } from 'react-router-dom';

import { USER_NAME_REGEXP } from '../../config';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProfileForm from '../ProfileForm/ProfileForm';
import ProfileFormInput from '../ProfileFormInput/ProfileFormInput';

import './profile.css';
import './profile__form-container.css';
import './profile__title.css';
import './profile__form.css';
import './profile__logout-link.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [ userName, setUserName ] = React.useState('');
  const [ userEmail, setUserEmail ] = React.useState('');

  const [ isValidUserName, setIsValidUserName ] = React.useState(true);
  const [ isValidUserEmail, setIsValidUserEmail ] = React.useState(true);

  const [ spanText, setSpanText ] = React.useState('');
  const [ userNameSpanText, setUserNameSpanText ] = React.useState('');
  const [ userEmailSpanText, setUserEmailSpanText ] = React.useState('');

  const [ isFormValid, setIsFormValid ] = React.useState(false);

  React.useEffect(() => {
    if ((!userName && !userEmail) || !isValidUserName || !isValidUserEmail) setIsFormValid(false);
    else setIsFormValid(true);

    if (!isValidUserName) setSpanText(userNameSpanText);
    else if (!isValidUserEmail) setSpanText(userEmailSpanText);
    else setSpanText('');

  }, [ userName, userEmail, isValidUserName, isValidUserEmail, userNameSpanText, userEmailSpanText ]);

  function handleUserNameInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserName(value);
    setIsValidUserName((Validator.matches(value, USER_NAME_REGEXP) && valid && (value !== currentUser.name)) || !value);

    if (!Validator.matches(value, USER_NAME_REGEXP)) {
      setUserNameSpanText('Допустимы только символы: А-Я(A-Z), а-я(a-z), тире или пробел');
    }
    else if (value === currentUser.name) {
      setUserNameSpanText('Введённое имя совпадает с текущим');
    }
    else if (!valid) {
      setUserNameSpanText('Длина имени должна быть от 2 до 30 символов');
    }
  }

  function handleUserEmailInput(evt) {
    const { value } = evt.target;

    setUserEmail(value);
    setIsValidUserEmail((Validator.isEmail(value) && (value !== currentUser.email)) || !value);

    if (value === currentUser.email) {
      setUserEmailSpanText('Введённый E-mail совпадает с текущим');
    }
    else if (!Validator.isEmail(value)) {
      setUserEmailSpanText('Некорректный формат E-mail');
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    
    props.onUserUpdate({
      email: userEmail || currentUser.email,
      name: userName || currentUser.name
    });
    
    setIsFormValid(false);
  }

  return (
    <section className="profile">
      <div className="profile__form-container">
        <h2 className="profile__title">{ `Привет, ${ currentUser.name }` }</h2>
        <ProfileForm
          addClasses="profile__form"
          onSubmit={ handleSubmit }
          isFormValid={ isFormValid }
          spanText={ spanText }
          isSpanVisible={ !isValidUserName || !isValidUserEmail }
        >
          <ProfileFormInput
            minLength="2"
            maxLength="30"
            placeholder="Введите новое имя"
            labelText="Имя"
            type="text"
            value={ userName }
            onChange={ handleUserNameInput }
          />
          <ProfileFormInput
            addClasses="profile-form__input-label_last"
            placeholder="Введите новый E-mail"
            labelText="E-mail"
            type="email"
            value={ userEmail }
            onChange={ handleUserEmailInput }
          />
        </ProfileForm>
        <Link
          className="profile__logout-link"
          to={ props.logoutLink }
          onClick={ props.onLogout }
        >
          Выйти из аккаунта
        </Link>
      </div>      
    </section>
  );
}

export default Profile;
