import React from 'react';

import AuthPage from "../AuthPage/AuthPage";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

function Login(props) {
  const [ userEmail, setUserEmail ] = React.useState('');
  const [ userPassword, setUserPassword ] = React.useState('');

  const [ isValidUserEmail, setIsValidUserEmail ] = React.useState(false);
  const [ isValidUserPassword, setIsValidUserPassword ] = React.useState(false);

  const [ isFormValid, setIsFormValid ] = React.useState(true);

  React.useEffect(() => {
    if (!userEmail || !userPassword) setIsFormValid(false);
    else setIsFormValid(true);
  }, [ userEmail, userPassword ]);

  function handleUserEmailInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserEmail(value);
    setIsValidUserEmail(valid);   
  }

  function handleUserPasswordInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserPassword(value);
    setIsValidUserPassword(valid);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!isValidUserEmail || !isValidUserPassword) alert('!');
    else props.onLogin();
  }

  return (
    <AuthPage
      pageTitle="Рады видеть!"
      submitButtonText="Войти"
      onSubmit={ handleSubmit }
      isFormValid={ isFormValid }
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
        spanText=""
        isSpanVisible={ false }
      />
      <AuthFormInput
        minLength="8"
        placeholder="Введите пароль"
        labelText="Пароль"
        type="password"
        value={ userPassword }
        onChange={ handleUserPasswordInput }
        spanText=""
        isSpanVisible={ false }
      />
    </AuthPage>
  );
}

export default Login;
