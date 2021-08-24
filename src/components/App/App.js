import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import windowWidthListener from '../../utils/windowWidthListener';
import moviesSearchFilter from '../../utils/moviesSearchFilter';
import moviesCardsHandler from '../../utils/moviesCardsHandler';

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
  const [ isMoviesSearchButtonClicked,  setIsMoviesSearchButtonClicked ] = React.useState(false);

  const [ foundMoviesList, setFoundMoviesList ] = React.useState(JSON.parse(localStorage.getItem('movies')) || []);   
  const [ uploadedMoviesList,  setUploadedMoviesList ] = React.useState([]);
  const [ savedMoviesList,  setSavedMoviesList ] = React.useState([{
    "_id": "6106e4373d88d5677e9bd7f0",   
    "country": "Великобритания",
    "director": "Джульен Темпл",
    "duration": 104,
    "year": "2009",
    "description": "кий TimeOut, «безумно захватывающий фильм, даже если вы не любите музыку».",
    "image": "/uploads/Oil_City_Confidential_676986530_large_652c54fa63.jpeg",
    "trailer": "https://www.youtube.com/watch?v=7CZMLs8Ke40",
    "thumbnail": "/uploads/thumbnail_Oil_City_Confidential_676986530_large_652c54fa63.jpeg",
    "movieId": 40,
    "nameRU": "Город Нефти",
    "nameEN": "Oil City Confidential"
  }]);

  React.useEffect(() => {
    windowWidthListener.setListener(handleWindowWidth);

    userApi.getUserCredentials()
    .then((user) => handleAuthorization(user.email, user.data))
    .catch((err) => console.log(err));

    moviesApi.getSavedMovies()
    .then((movies) => setSavedMoviesList(movies))
    .catch((err) => console.log(err));

    return () => {
      windowWidthListener.removeListener(handleWindowWidth);
    }

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setUploadedMoviesList((uploadedMoviesList) => {
      return moviesCardsHandler.getUploadedCards(foundMoviesList, uploadedMoviesList, currentWindowWidth);
    });

    // eslint-disable-next-line
  }, [ foundMoviesList, currentWindowWidth ]);

  function handleWindowWidth(evt) {
    if (!isWindowWidthResizing) {
      setIsWindowWidthResizing(true);

      setTimeout(() => {
        setCurrentWindowWidth(evt.target.innerWidth);
        setIsWindowWidthResizing(false);
      }, 1000);
    }
  }

  function handleAuthorization(email, name) {
    currentUser.email = email;
    currentUser.name = name;
    setCurrentUser(currentUser);

    setIsLoggedIn(true);

    localStorage.removeItem('movies');

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

      localStorage.removeItem('movies');

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
    setIsLoading(true);

    moviesApi.searchMovies()
    .then((moviesList) => {
      const filteredMoviesList = moviesSearchFilter(moviesList, searchQuery, isShort);

      setFoundMoviesList(filteredMoviesList);
      setIsMoviesSearchButtonClicked(true);

      localStorage.setItem('movies', JSON.stringify(filteredMoviesList));
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function handleMovieSave({
    country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN
  }) {
    return moviesApi.saveMovie({
      country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN
    })
    .then((movie) => {
      setSavedMoviesList([ movie, ...savedMoviesList ]);
      
      return Promise.resolve(movie);
    })
  }

  function handleMovieDelete(movieId) {
    return moviesApi.deleteMovie(movieId)
    .then((movie) => {
      setSavedMoviesList((savedMoviesList) => {
        savedMoviesList.filter((savedMovie) => savedMovie._id !== movieId);
      });

      return Promise.resolve(movie);
    })
  }

  function handleMenuButtonClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMoviesUploaderClick() {
    const uploadedMovieCards = moviesCardsHandler.uploadCards(foundMoviesList, uploadedMoviesList, currentWindowWidth);

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
            <ErrorInfoPopup isOpen={ false } message="Неверный логин или пароль" />
          </div>
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
