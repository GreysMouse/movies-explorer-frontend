import React from 'react';
import Validator from 'validator';

import AuthPage from "../AuthPage/AuthPage";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

function Login(props) {
  const [ userEmail, setUserEmail ] = React.useState('');
  const [ userPassword, setUserPassword ] = React.useState('');

  const [ isValidUserEmail, setIsValidUserEmail ] = React.useState(false);
  const [ isValidUserPassword, setIsValidUserPassword ] = React.useState(false);

  const [ userEmailSpanText, setUserEmailSpanText ] = React.useState('');
  const [ userPasswordSpanText, setUserPasswordSpanText ] = React.useState('');

  const [ isFormValid, setIsFormValid ] = React.useState(false);

  React.useEffect(() => {
    if (!isValidUserEmail || !isValidUserPassword) setIsFormValid(false);
    else setIsFormValid(true);
  }, [ isValidUserEmail, isValidUserPassword ]);

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
    
    props.onLogin({
      email: userEmail,
      password: userPassword
    });
  }

  return (
    <AuthPage
      pageTitle="Рады видеть!"
      submitButtonText="Войти"
      onSubmit={ handleSubmit }
      isFormValid={ isFormValid }
      isDataLoading={ props.isLoading }
      redirectText="Ещё не зарегистрированы?"
      redirectLink="/signup"
      redirectLinkText="Регистрация"
    >
      <AuthFormInput
        placeholder="Введите адрес электронной почты"
        labelText="E-mail"
        type="email"
        value={ userEmail }
        onChange={ handleUserEmailInput }
        spanText={ userEmailSpanText }
        isSpanVisible={ !isValidUserEmail }
      />
      <AuthFormInput
        minLength="8"
        placeholder="Введите пароль"
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

export default Login;
