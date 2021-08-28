import React from 'react';
import Validator from 'validator';

import { USER_NAME_REGEXP } from '../../config';

import AuthPage from "../AuthPage/AuthPage";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

function Register(props) {
  const [ userName, setUserName ] = React.useState('');
  const [ userEmail, setUserEmail ] = React.useState('');
  const [ userPassword, setUserPassword ] = React.useState('');

  const [ isValidUserName, setIsValidUserName ] = React.useState(false);
  const [ isValidUserEmail, setIsValidUserEmail ] = React.useState(false);
  const [ isValidUserPassword, setIsValidUserPassword ] = React.useState(false);

  const [ userNameSpanText, setUserNameSpanText ] = React.useState('');
  const [ userEmailSpanText, setUserEmailSpanText ] = React.useState('');
  const [ userPasswordSpanText, setUserPasswordSpanText ] = React.useState('');

  const [ isFormValid, setIsFormValid ] = React.useState(false);

  React.useEffect(() => {
    if (!isValidUserName || !isValidUserEmail || !isValidUserPassword) setIsFormValid(false);
    else setIsFormValid(true);
  }, [ isValidUserName, isValidUserEmail, isValidUserPassword ]);

  function handleUserNameInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserName(value);
    setIsValidUserName(Validator.matches(value, USER_NAME_REGEXP) && valid);

    if (!Validator.matches(value, USER_NAME_REGEXP)) {
      setUserNameSpanText('Допустимы только символы: А-Я(A-Z), а-я(a-z), тире или пробел');
    }
    else if (!value) setUserNameSpanText('Поле не заполнено');
    else if (!valid) setUserNameSpanText('Длина имени должна быть от 2 до 30 символов');
  }

  function handleUserEmailInput(evt) {
    const { value } = evt.target;

    setUserEmail(value);
    setIsValidUserEmail(Validator.isEmail(value));

    if (!value) setUserEmailSpanText('Поле не заполнено');
    else setUserEmailSpanText('Некорректный формат E-mail');
  }

  function handleUserPasswordInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserPassword(value);
    setIsValidUserPassword(valid);

    if (!value) setUserPasswordSpanText('Поле не заполнено');
    else setUserPasswordSpanText('Длина пароля должна быть не менее 8 символов');
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onRegister({
      email: userEmail,
      password: userPassword,
      name: userName
    });
  }

  return (
    <AuthPage
      pageTitle="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      onSubmit={ handleSubmit }
      isFormValid={ isFormValid }
      redirectText="Уже зарегистрированы?"
      redirectLink="/signin"
      redirectLinkText="Войти"
    >
      <AuthFormInput
        minLength="2"
        maxLength="30"
        placeholder="Введите имя"
        labelText="Имя"
        type="text"
        value={ userName }
        onChange={ handleUserNameInput }
        spanText={ userNameSpanText }
        isSpanVisible={ !isValidUserName }
      />
      <AuthFormInput
        placeholder="Укажите адрес электронной почты"
        labelText="E-mail"
        type="email"
        value={ userEmail }
        onChange={ handleUserEmailInput }
        spanText={ userEmailSpanText }
        isSpanVisible={ !isValidUserEmail }
      />
      <AuthFormInput
        minLength="8"
        placeholder="Придумайте пароль"
        labelText="Пароль"
        type="password"
        value={ userPassword }
        onChange={ handleUserPasswordInput }
        spanText={ userPasswordSpanText }
        isSpanVisible={ !isValidUserPassword }
      />
    </AuthPage>
  );
}

export default Register;
