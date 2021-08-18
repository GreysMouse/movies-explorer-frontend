import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import currentUserContext from '../../contexts/currentUserContext';
import currentUserAvatar from '../../images/current-user-avatar.jpg';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Menu from '../Menu/Menu';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ErrorInfoPopup from '../ErrorInfoPopup/ErrorInfoPopup';
import Preloader from '../Preloader/Preloader';

import './app.css';
import './app__container.css';

function App() {
  const [ currentUser, setCurrentUser ] = React.useState({
    name: 'Диана',
    bio: 'Фронтенд-разработчик, 24 года',
    description: 'Живу в городе Ярославль. Закончила физический факультет по специальности электроника и наноэлектроника. Люблю решать математические задачки. В настоящее время обучаюсь в Яндекс Практикум.',
    avatar: currentUserAvatar,
    accounts: [
      { name: 'Facebook', link: 'https://www.facebook.com/' },
      { name: 'Github', link: 'https://github.com/GreysMouse/' }
    ],
    portfolio: [
      { name: 'Статичный сайт', link: 'https://github.com/GreysMouse/how-to-learn/' },
      { name: 'Адаптивный сайт', link: 'https://github.com/GreysMouse/russian-travel/' },
      { name: 'Одностраничное приложение', link: 'https://github.com/GreysMouse/react-mesto-api-full/' }
    ]
  });

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const history = useHistory();

  function handleRegister() {
    history.push('/signin');
  }

  function handleLogin() {
    history.push('/movies');
  }

  function handleLogout() {
    history.push('/signin');
  }

  function handleUserUpdate() {
    setCurrentUser({
      name: 'Диана',
      bio: 'Фронтенд-разработчик, 24 года',
      description: 'Живу в городе Ярославль. Закончила физический факультет по специальности электроника и наноэлектроника. Люблю решать математические задачки. В настоящее время обучаюсь в Яндекс Практикум.',
      avatar: currentUserAvatar,
      accounts: [
        { name: 'Facebook', link: 'https://www.facebook.com/' },
        { name: 'Github', link: 'https://github.com/GreysMouse/' }
      ],
      portfolio: [
        { name: 'Статичный сайт', link: 'https://github.com/GreysMouse/how-to-learn/' },
        { name: 'Адаптивный сайт', link: 'https://github.com/GreysMouse/russian-travel/' },
        { name: 'Одностраничное приложение', link: 'https://github.com/GreysMouse/react-mesto-api-full/' }
      ]
    });
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <currentUserContext.Provider value={ currentUser }>
      <div className="app">
        <div className="app__container">
          <Switch>
            <Route exact path="/">
              <Header location="promo" />
              <Main />
              <Footer />
            </Route>
            <Route path="/movies">
              <Header location="main" onMenuOpen={ handleMenuButtonClick } />
              <Movies />
              <Footer />
            </Route>
            <Route path="/saved-movies">
              <Header location="main" onMenuOpen={ handleMenuButtonClick } />
              <SavedMovies />
              <Footer />
            </Route>
            <Route path="/profile">
              <Header location="main" onMenuOpen={ handleMenuButtonClick } />
              <Profile onUserUpdate={ handleUserUpdate } onLogout={ handleLogout } />
            </Route>
            <Route path="/signup">
              <Register onRegister={ handleRegister } />
            </Route>
            <Route path="/signin">
              <Login onLogin={ handleLogin } />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          <Menu isOpen={ isMenuOpen } onMenuOpen={ handleMenuButtonClick } />
          <Preloader isActive={ false } />
          <ErrorInfoPopup isOpen={ false } message="Неверный логин или пароль" />
        </div>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
