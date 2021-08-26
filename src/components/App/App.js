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
  const [ isInfoPopupOpen, setIsInfoPopupOpen ] = React.useState(false);

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
    .catch((err) => console.log(errorHandler(err, 'Необходима авторизация')));

    moviesApi.getSavedMovies()
    .then((movies) => setSavedMoviesList(movies))
    .catch((err) => console.log(errorHandler(err, 'Необходима авторизация')));

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

  React.useEffect(() => {
    if (isInfoPopupOpen) setTimeout(() => setIsInfoPopupOpen(false), 5000);
  }, [ isInfoPopupOpen ]);

  function handleWindowWidth(evt) {
    if (!isWindowWidthResizing) {
      setIsWindowWidthResizing(true);

      setTimeout(() => {
        setCurrentWindowWidth(evt.target.innerWidth);
        setIsWindowWidthResizing(false);
      }, 1000);
    }
  }

  function handleInfoPopupClick() {
    setIsInfoPopupOpen(false);
  }

  function handleAuthorization({ email, name }) {
    console.log(`Выполнен вход в аккаунт ${ email }`);

    setCurrentUser((currentUser) => {
      currentUser.name = name;
      currentUser.email = email;

      return currentUser;
    });

    setIsLoggedIn(true);
    setFoundMoviesList(JSON.parse(localStorage.getItem('movies')) || []);

    history.push('/movies');
  }

  function handleRegister(user) {
    setIsLoading(true);
    
    authApi.register(user)
    .then(() => {
      const message = 'Регистрация прошла успешно. Введите адрес электронной почты и пароль, чтобы войти';

      setIsInfoPopupOpen(true);
      setInfoMessage(message);
      console.log(message);

      history.push('/signin');
    })
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Неверные данные или пользователь с таким E-mail уже существует');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    })
    .finally(() => setIsLoading(false));
  }

  function handleLogin(user) {
    setIsLoading(true);

    authApi.login(user)
    .then((user) => {
      localStorage.removeItem('movies');
      handleAuthorization(user);

      setIsInfoPopupOpen(true);
      setInfoMessage(`Выполнен вход в аккаунт ${ user.email }`);
    })
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Неверный логин или пароль');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    })
    .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    authApi.logout()
    .then(() => {
      const message = `Выполнен выход из аккаунта ${ currentUser.email }`;

      setIsInfoPopupOpen(true);
      setInfoMessage(message);
      console.log(message);

      setIsLoggedIn(false);
      localStorage.removeItem('movies');
      history.push('/');
    })
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Не удалось выполнить выход из аккаунта');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    });
  }

  function handleUserCredentialsUpdate(credentials) {
    setIsLoading(true);

    userApi.updateUserCredentials(credentials)
    .then((user) => {
      const message = `${
        user.name !== currentUser.name ? 'Новое имя: ' + user.name + '\n' : ''
      }${
        user.email !== currentUser.email ? 'Новый E-mail: ' + user.email : ''
      }`;     

      setIsInfoPopupOpen(true);
      setInfoMessage(message);
      console.log(message);

      setCurrentUser((currentUser) => {
        currentUser.name = user.name;
        currentUser.email = user.email;

        return currentUser;
      });
    })
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Неверные данные или пользователь с таким E-mail уже существует');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    })
    .finally(() => setIsLoading(false));
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
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    })
    .finally(() => setIsLoading(false));
  }

  function handleMovieSave(movie) {
    moviesApi.saveMovie(movie)
    .then((movie) => setSavedMoviesList([ movie, ...savedMoviesList ]))
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Карточка с таким идентификатором уже добавлена в избранное');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    });
  }

  function handleMovieDelete(movieId) {
    moviesApi.deleteMovie(movieId)
    .then(() => setSavedMoviesList((savedMoviesList) => {
        return savedMoviesList.filter((savedMovie) => savedMovie._id !== movieId);
      })
    )
    .catch((err) => {
      const errorMessage = errorHandler(err, 'Не удалось удалить карточку');
      
      setIsInfoPopupOpen(true);
      setInfoMessage(errorMessage);
      console.log(errorMessage);
    });
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
                <Register
                  onRegister={ handleRegister }
                  isDataLoading={ isLoading }
                />
              </Route>
              <Route path="/signin">
                <Login
                  onLogin={ handleLogin }
                  isDataLoading={ isLoading }
                />
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
                  savedMoviesList={ savedMoviesList }
                  onMovieDelete={ handleMovieDelete }
                />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" defaultPath="/">
                <Header location="main" onMenuOpen={ handleMenuButtonClick } />
                <Profile
                  isDataLoading={ isLoading }
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
            <ErrorInfoPopup
              isOpen={ isInfoPopupOpen }
              message={ infoMessage }
              onClick={ handleInfoPopupClick }
            />
          </div>
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
