import React from 'react';

import AuthPage from "../AuthPage/AuthPage";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

function Register(props) {
  const [ userName, setUserName ] = React.useState('');
  const [ userEmail, setUserEmail ] = React.useState('');
  const [ userPassword, setUserPassword ] = React.useState('');

  const [ isValidUserName, setIsValidUserName ] = React.useState(false);
  const [ isValidUserEmail, setIsValidUserEmail ] = React.useState(false);
  const [ isValidUserPassword, setIsValidUserPassword ] = React.useState(false);

  const [ userNameSpanText, setUserNameSpanText ] = React.useState('Поле не заполнено');
  const [ userEmailSpanText, setUserEmailSpanText ] = React.useState('Поле не заполнено');
  const [ userPasswordSpanText, setUserPasswordSpanText ] = React.useState('Поле не заполнено');

  const [ isUserNameSpanVisible, setIsUserNameSpanVisible ] = React.useState(false);
  const [ isUserEmailSpanVisible, setIsUserEmailSpanVisible ] = React.useState(false);
  const [ isUserPasswordSpanVisible, setIsUserPasswordSpanVisible ] = React.useState(false);

  const [ isFormValid, setIsFormValid ] = React.useState(true);

  React.useEffect(() => {
    if (!isValidUserName || !isValidUserEmail || !isValidUserPassword) setIsFormValid(false);
    else setIsFormValid(true);
  }, [ isValidUserName, isValidUserEmail, isValidUserPassword ]);

  function handleUserNameInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserName(value);

    if (!value) setUserNameSpanText('Поле не заполнено');
    else setUserNameSpanText('Длина имени должна быть от 2 до 30 символов');
    
    setIsValidUserName(valid);
  }

  function handleUserEmailInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserEmail(value);

    if (!value) setUserEmailSpanText('Поле не заполнено');
    else setUserEmailSpanText('Некорректный формат E-mail');

    setIsValidUserEmail(valid);
  }

  function handleUserPasswordInput(evt) {
    const { value, validity: { valid } } = evt.target;

    setUserPassword(value);

    if (!value) setUserPasswordSpanText('Поле не заполнено');
    else setUserPasswordSpanText('Длина пароля должна быть не менее 8 символов');

    setIsValidUserPassword(valid);
  }

  function handleUserNameInputBlur() {
    if (isValidUserName) setIsUserNameSpanVisible(false);
    else setIsUserNameSpanVisible(true);
  }

  function handleUserEmailInputBlur() {
    if (isValidUserEmail) setIsUserEmailSpanVisible(false);
    else setIsUserEmailSpanVisible(true);
  }

  function handleUserPasswordInputBlur() {
    if (isValidUserPassword) setIsUserPasswordSpanVisible(false);
    else setIsUserPasswordSpanVisible(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onRegister();
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
        onBlur={ handleUserNameInputBlur }
        spanText={ userNameSpanText }
        isSpanVisible={ isUserNameSpanVisible }
      />
      <AuthFormInput
        placeholder="Укажите адрес электронной почты"
        labelText="E-mail"
        type="email"
        value={ userEmail }
        onChange={ handleUserEmailInput }
        onBlur={ handleUserEmailInputBlur }
        spanText={ userEmailSpanText }
        isSpanVisible={ isUserEmailSpanVisible }
      />
      <AuthFormInput
        minLength="8"
        placeholder="Придумайте пароль"
        labelText="Пароль"
        type="password"
        value={ userPassword }
        onChange={ handleUserPasswordInput }
        onBlur={ handleUserPasswordInputBlur }
        spanText={ userPasswordSpanText }
        isSpanVisible={ isUserPasswordSpanVisible }
      />
    </AuthPage>
  );
}

export default Register;
