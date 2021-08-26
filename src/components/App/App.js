import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import windowWidthListener from '../../utils/windowWidthListener';
import moviesFilter from '../../utils/moviesFilter';
import moviesUploader from '../../utils/moviesUploader';
import errorHandler from '../../utils/errorHandler';

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

import './app.css';
import './app__container.css';

function App() {
  const history = useHistory();

  const [ currentWindowWidth, setCurrentWindowWidth ] = React.useState(window.innerWidth);
  const [ isWindowWidthResizing, setIsWindowWidthResizing ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ infoMessage, setInfoMessage ] = React.useState('');

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
  
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);

  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
  const [ isMoviesSearchButtonClicked,  setIsMoviesSearchButtonClicked ] = React.useState(false);
   
  const [ foundMoviesList, setFoundMoviesList ] = React.useState([]);  
  const [ uploadedMoviesList, setUploadedMoviesList ] = React.useState([]);
  const [ savedMoviesList,  setSavedMoviesList ] = React.useState([]);

  React.useEffect(() => {
    windowWidthListener.setListener(handleWindowWidth);

    userApi.getUserCredentials()
    .then((user) => handleAuthorization(user))
    .catch((err) => errorHandler(err, 'Необходима авторизация'));

    moviesApi.getSavedMovies()
    .then((movies) => setSavedMoviesList(movies))
    .catch((err) => errorHandler(err, 'Необходима авторизация'));

    return () => {
      windowWidthListener.removeListener(handleWindowWidth);
    }

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setUploadedMoviesList((uploadedMoviesList) => {
      return moviesUploader.getUploadedCards(foundMoviesList, uploadedMoviesList, currentWindowWidth);
    });
  }, [ foundMoviesList, currentWindowWidth ]);

  function handleWindowWidth(evt) {
    // console.log('f  ', foundMoviesList)
    // console.log('u  ', uploadedMoviesList)
    // console.log('s  ', savedMoviesList)
    if (!isWindowWidthResizing) {
      setIsWindowWidthResizing(true);

      setTimeout(() => {
        setCurrentWindowWidth(evt.target.innerWidth);
        setIsWindowWidthResizing(false);
      }, 1000);
    }
  }

  function handleAuthorization({ email, name }) {
    console.log(`Выполнен вход в аккаунт ${ email }`);

    setCurrentUser((currentUser) => {
      currentUser.name = name;
      currentUser.email = email;

      return currentUser;
    });

    setIsLoggedIn(true);
    
    setFoundMoviesList(() => {
      return JSON.parse(localStorage.getItem('movies')) || []
    });

    history.push('/movies');
  }

  function handleRegister(user) {
    authApi.register(user)
    .then(() => {
      console.log('Регистрация прошла успешно. Введите адрес электронной почты и пароль, чтобы войти');

      history.push('/signin');
    })
    .catch((err) => errorHandler(err, 'Неверные данные или пользователь с таким E-mail уже существует'));
  }

  function handleLogin(user) {
    authApi.login(user)
    .then((user) => {
      localStorage.removeItem('movies');
      handleAuthorization(user);
    })
    .catch((err) => errorHandler(err, 'Неверный логин или пароль'));
  }

  function handleLogout() {
    authApi.logout()
    .then(() => {
      console.log(`Выполнен выход из аккаунта ${ currentUser.email }`);

      setIsLoggedIn(false);
      localStorage.removeItem('movies');
      history.push('/');
    })
    .catch((err) => errorHandler(err, 'Не удалось выполнить выход из аккаунта'));
  }

  function handleUserCredentialsUpdate(credentials) {
    userApi.updateUserCredentials(credentials)
    .then((user) => {
      console.log(`${ user.name !== currentUser.name ? 'Новое имя: ' + user.name + '\n' : ''
      }${
        user.email !== currentUser.email ? 'Новый E-mail: ' + user.email : ''
      }`);

      setCurrentUser((currentUser) => {
        currentUser.name = user.name;
        currentUser.email = user.email;

        return currentUser;
      });
    })
    .catch((err) => errorHandler(err, 'Неверные данные или пользователь с таким E-mail уже существует'));
  }

  function handleMoviesSearch(searchQuery, isShort) {
    setIsLoading(true);

    moviesApi.searchMovies()
    .then((moviesList) => {
      const filteredMoviesList = moviesFilter.propertiesFilter(moviesFilter.searchFilter(moviesList, searchQuery, isShort));

      setFoundMoviesList(filteredMoviesList);
      setIsMoviesSearchButtonClicked(true);

      localStorage.setItem('movies', JSON.stringify(filteredMoviesList));
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleMovieSave(movie) {
    moviesApi.saveMovie(movie)
    .then((movie) => setSavedMoviesList([ movie, ...savedMoviesList ]))
    .catch((err) => console.log(err))
    .finally(() =>console.log(savedMoviesList))
  }

  function handleMovieDelete(movieId) {
    moviesApi.deleteMovie(movieId)
    .then(() => setSavedMoviesList((savedMoviesList) => {
        return savedMoviesList.filter((savedMovie) => savedMovie._id !== movieId);
      })
    )
    .catch((err) => console.log(err))
    .finally(() =>console.log(savedMoviesList))
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMoviesUploaderClick() {
    const uploadedMovieCards = moviesUploader.uploadCards(foundMoviesList, uploadedMoviesList, currentWindowWidth);

    setUploadedMoviesList(uploadedMoviesList.concat(uploadedMovieCards));
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
                <Movies
                  isMoviesLoading={ isLoading }
                  isSearchButtonClicked={ isMoviesSearchButtonClicked }  
                  foundMoviesList={ foundMoviesList }
                  uploadedMoviesList={ uploadedMoviesList }
                  savedMoviesList={ savedMoviesList }
                  onMoviesSearch={ handleMoviesSearch }
                  onMovieSave={ handleMovieSave }
                  onMovieDelete={ handleMovieDelete }
                  onUploaderClick={ handleMoviesUploaderClick }            
                />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" defaultPath="/">
                <Header location="main" onMenuOpen={ handleMenuButtonClick } />
                <SavedMovies
                  isMoviesLoading={ isLoading }
                  savedMoviesList={ savedMoviesList }
                  onMovieSave={ handleMovieSave }
                  onMovieDelete={ handleMovieDelete }
                />
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
            <ErrorInfoPopup isOpen={ false } message={ infoMessage } />
          </div>
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
