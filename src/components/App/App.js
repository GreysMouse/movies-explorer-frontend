import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import moviesSearchFilter from '../../utils/moviesSearchFilter';

import authApi from '../../utils/authApi';
import userApi from '../../utils/userApi';
import moviesApi from '../../utils/moviesApi';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import IsLoggedInContext from '../../contexts/IsLoggedInContext';

import currentUserAvatar from '../../images/current-user-avatar.jpg';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
    name: 'Mouse Greys',
    email: 'greys.mouse@yandex.ru',
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

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(true);
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);

  const [ findMovies, setFindMovies ] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    userApi.getUserCredentials()
    .then((user) => handleAuthorization(user.email, user.data))
    .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  function handleAuthorization(email, name) {
    currentUser.email = email;
    currentUser.name = name;
    setCurrentUser(currentUser);
    
    setIsLoggedIn(true);

    history.push('/movies');
    console.log('Выполнен вход в аккаунт');
  }

  function handleRegister({ email, password, name }) {
    authApi.register({ email, password, name })
    .then(() => {
      history.push('/signin');

      console.log('Регистрация прошла успешно. Введите адрес электронной почты и пароль, чтобы войти');
    })
    .catch((err) => console.log(err));
  }

  function handleLogin({ email, password }) {
    authApi.login({ email, password })
    .then((data) => handleAuthorization(data.email, data.name))
    .catch((err) => console.log(err));
  }

  function handleLogout() {
    authApi.logout()
    .then(() => {
      setIsLoggedIn(false);
      history.push('/');

      console.log('Выполнен выход из аккаунта');
    })
    .catch((err) => console.log(err));
  }

  function handleUserCredentialsUpdate({ email, name }) {
    userApi.updateUserCredentials({ email, name })
    .then((user) => {
      currentUser.name = user.name;
      currentUser.email = user.email;
      setCurrentUser(currentUser);

      console.log('Данные успешно обновлены');
    })
    .catch((err) => console.log(err));
  }

  function handleMoviesSearch(searchQuery, isShort) {
    moviesApi.searchMovies()
    .then((moviesList) => setFindMovies(moviesSearchFilter(moviesList, searchQuery, isShort)))
    .catch((err) => console.log(err));
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <IsLoggedInContext.Provider value={ isLoggedIn }>
        <div className="app">
          <div className="app__container">
            <Switch>
              <Route exact path="/">
                <Header location="promo" />
                <Main />
                <Footer />
              </Route>            
              <Route path="/signup">
                <Register onRegister={ handleRegister } />
              </Route>
              <Route path="/signin">
                <Login onLogin={ handleLogin } />
              </Route>
              <ProtectedRoute path="/movies" defaultPath="/">
                <Header location="main" onMenuOpen={ handleMenuButtonClick } />
                <Movies onMoviesSearch={ handleMoviesSearch } />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" defaultPath="/">
                <Header location="main" onMenuOpen={ handleMenuButtonClick } />
                <SavedMovies onMoviesSearch={ handleMoviesSearch } />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" defaultPath="/">
                <Header location="main" onMenuOpen={ handleMenuButtonClick } />
                <Profile
                  onUserUpdate={ handleUserCredentialsUpdate }
                  onLogout={ handleLogout }
                  logoutLink="/signin"
                />
              </ProtectedRoute>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
            <Menu isOpen={ isMenuOpen } onMenuOpen={ handleMenuButtonClick } />
            <Preloader isActive={ false } />
            <ErrorInfoPopup isOpen={ false } message="Неверный логин или пароль" />
          </div>
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
