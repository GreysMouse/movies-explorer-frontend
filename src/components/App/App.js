import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { VIEWPORT_WIDTH_RESIZING_TIMEOUT, INFO_POPUP_TIMEOUT } from '../../config';

import viewportWidthListener from '../../utils/viewportWidthListener';
import moviesFilter from '../../utils/moviesFilter';
import moviesCountHandler from '../../utils/moviesCountHandler';
import errorHandler from '../../utils/errorHandler';

import authApi from '../../utils/authApi';
import userApi from '../../utils/userApi';
import moviesApi from '../../utils/moviesApi';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import IsLoggedInContext from '../../contexts/IsLoggedInContext';
import IsDataLoadingContext from '../../contexts/IsDataLoadingContext';

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

  const [ currentViewportWidth, setCurrentViewportWidth ] = React.useState(window.innerWidth);
  const [ isViewportWidthResizing, setIsViewportWidthResizing ] = React.useState(false);
  const [ isDataLoading, setIsDataLoading ] = React.useState(false);
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
  
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(true);

  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);
  const [ isInfoPopupOpen, setIsInfoPopupOpen ] = React.useState(false);
  const [ isMoviesSearchInitiated,  setIsMoviesSearchInitiated ] = React.useState(false);
   
  const [ initialMoviesList, setInitialMoviesList ] = React.useState([]);
  const [ foundMoviesList, setFoundMoviesList ] = React.useState([]);  
  const [ displayedMoviesList, setDisplayedMoviesList ] = React.useState([]);
  const [ savedMoviesList,  setSavedMoviesList ] = React.useState([]);

  React.useEffect(() => {
    viewportWidthListener.setListener(handleViewportWidth);

    userApi.getUserCredentials()
    .then((user) => handleAuthorization(user))
    .catch((err) => console.log(errorHandler(err, 'Необходима авторизация')));

    handleSavedMoviesUpload();

    return () => {
      viewportWidthListener.removeListener(handleViewportWidth);
    }

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setDisplayedMoviesList((displayedMoviesList) => {
      return moviesCountHandler.getCards(foundMoviesList, displayedMoviesList, currentViewportWidth);
    });
  }, [ foundMoviesList, currentViewportWidth ]);

  React.useEffect(() => {
    if (isInfoPopupOpen) setTimeout(() => setIsInfoPopupOpen(false), INFO_POPUP_TIMEOUT);
  }, [ isInfoPopupOpen ]);

  function handleViewportWidth(evt) {
    if (!isViewportWidthResizing) {
      setIsViewportWidthResizing(true);

      setTimeout(() => {
        setCurrentViewportWidth(evt.target.innerWidth);
        setIsViewportWidthResizing(false);
      }, VIEWPORT_WIDTH_RESIZING_TIMEOUT);
    }
  }

  function handleInfoPopupClick() {
    setIsInfoPopupOpen(false);
  }

  function handleSavedMoviesUpload() {
    moviesApi.getSavedMovies()
    .then((movies) => setSavedMoviesList(movies))
    .catch((err) => {
      setIsLoggedIn(false);
      console.log(errorHandler(err, 'Необходима авторизация'))
    });
  }

  function showInfoMessage(message) {
    setIsInfoPopupOpen(true);
    setInfoMessage(message);
    console.log(message);
  }

  function handleAuthorization({ email, name }) {
    setCurrentUser((currentUser) => {
      currentUser.name = name;
      currentUser.email = email;

      return currentUser;
    });

    handleSavedMoviesUpload();

    setIsLoggedIn(true);
    setInitialMoviesList(JSON.parse(localStorage.getItem('movies')) || []);
  }

  function handleLogin(user) {
    setIsDataLoading(true);

    authApi.login(user)
    .then((user) => {
      showInfoMessage(`Выполнен вход в аккаунт ${ user.email }`);

      handleAuthorization(user);

      localStorage.removeItem('movies');
      history.push('/movies');
    })
    .catch((err) => showInfoMessage(errorHandler(err, 
      'Введён незарегистрированный логин или неправильный пароль'
      )
    ))
    .finally(() => setIsDataLoading(false));
  }

  function handleLogout() {
    authApi.logout()
    .then(() => {
      showInfoMessage(`Выполнен выход из аккаунта ${ currentUser.email }`);

      setIsLoggedIn(false);
      setIsMoviesSearchInitiated(false);

      setInitialMoviesList([]);
      setFoundMoviesList([]);
      setDisplayedMoviesList([]);
      setSavedMoviesList([]);
      
      localStorage.removeItem('movies');
      history.push('/');
    })
    .catch((err) => showInfoMessage(errorHandler(err, 'Не удалось выполнить выход из аккаунта')));
  }

  function handleRegister(user) {
    setIsDataLoading(true);
    
    authApi.register(user)
    .then(() => {
      showInfoMessage(`Регистрация пользователя ${ user.email } прошла успешно`);

      handleLogin({
        email: user.email,
        password: user.password
      });
    })
    .catch((err) => showInfoMessage(errorHandler(err, 
        'Введены некорректные данные или пользователь с таким E-mail уже существует'
      ))
    )
    .finally(() => setIsDataLoading(false));
  }

  function handleUserCredentialsUpdate(credentials) {
    setIsDataLoading(true);

    userApi.updateUserCredentials(credentials)
    .then((user) => {
      showInfoMessage(`${
        user.name !== currentUser.name ? 'Новое имя: ' + user.name + '\n' : ''
      }${
        user.email !== currentUser.email ? 'Новый E-mail: ' + user.email : ''
      }`);     

      setCurrentUser((currentUser) => {
        currentUser.name = user.name;
        currentUser.email = user.email;

        return currentUser;
      });
    })
    .catch((err) => showInfoMessage(errorHandler(err, 
      'Введены некорректные данные или пользователь с таким E-mail уже существует'
    )))
    .finally(() => setIsDataLoading(false));
  }

  function handleMoviesSearch(searchQuery, isShort) {
    setIsMoviesSearchInitiated(true);

    if (!initialMoviesList.length) {    
      setIsDataLoading(true);

      moviesApi.searchMovies()
      .then((moviesList) => {
        const formattedMoviesList = moviesFilter.propertiesFilter(moviesList);
        const filteredMoviesList = moviesFilter.searchFilter(formattedMoviesList, searchQuery, isShort);

        setInitialMoviesList(formattedMoviesList);
        localStorage.setItem('movies', JSON.stringify(formattedMoviesList));

        setDisplayedMoviesList([]);
        setFoundMoviesList(moviesFilter.searchFilter(filteredMoviesList, searchQuery, isShort));
      })
      .catch((err) => showInfoMessage(errorHandler(err,
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        ))
      )
      .finally(() => setIsDataLoading(false));
    }
    else {
      const filteredMoviesList = moviesFilter.searchFilter(initialMoviesList, searchQuery, isShort)

      setDisplayedMoviesList([]);
      setFoundMoviesList(filteredMoviesList);

      setIsMoviesSearchInitiated(true);
    }    
  }

  function handleMovieSave(movie) {
    moviesApi.saveMovie(movie)
    .then((movie) => setSavedMoviesList([ movie, ...savedMoviesList ]))
    .catch((err) => showInfoMessage(errorHandler(err,
        'Произошла ошибка при добавлении в избранное карточки с фильмом'
      ))
    );
  }

  function handleMovieDelete(movieId) {
    moviesApi.deleteMovie(movieId)
    .then(() => setSavedMoviesList((savedMoviesList) => {
        return savedMoviesList.filter((savedMovie) => savedMovie._id !== movieId);
      })
    )
    .catch((err) => showInfoMessage(errorHandler(err,
        'При удалении карточки с фильмом произошла ошибка. Не удалось удалить карточку'
      ))
    );
  }

  function handleMenuButtonClick(evt) {
    if (evt.target.tagName === 'BUTTON' || evt.target.tagName === 'ASIDE') setIsMenuOpen(!isMenuOpen);
  }

  function handleMoviesUploaderClick() {
    const uploadedMovieCards = moviesCountHandler.uploadCards(foundMoviesList, displayedMoviesList, currentViewportWidth);

    setDisplayedMoviesList(displayedMoviesList.concat(uploadedMovieCards));
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <IsLoggedInContext.Provider value={ isLoggedIn }>
        <IsDataLoadingContext.Provider value={ isDataLoading }>
          <div className="app">
            <div className="app__container">
              <Switch>
                <Route exact path="/">
                  <Header location="main" onMenuOpen={ handleMenuButtonClick } /> 
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
                    isSearchButtonClicked={ isMoviesSearchInitiated }  
                    foundMoviesList={ foundMoviesList }
                    displayedMoviesList={ displayedMoviesList }
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
        </IsDataLoadingContext.Provider>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
