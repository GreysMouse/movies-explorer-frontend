import React from 'react';
import { NavLink } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import IsLoggedInContext from '../../contexts/IsLoggedInContext';
import defaultStudentAvatar from '../../images/default-student-avatar.svg';

import './navigation.css';
import './navigation_location_promo.css';
import './navigation_location_main.css';
import './navigation_location_menu.css';
import './navigation__link.css';
import './navigation__link_active.css';
import './navigation__link_type_registry.css';
import './navigation__link_type_login.css';
import './navigation__link_type_profile.css';
import './navigation__profile-avatar.css';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <nav className={ 'navigation ' + (
      isLoggedIn ?
        (props.location ? `navigation_location_${ props.location }` : '')
      :
        'navigation_location_promo'
      )
    }>
      { 
        !isLoggedIn &&
          <>
            <NavLink
              className="navigation__link navigation__link_type_registry"
              to="/signup"
            >
              Регистрация
            </NavLink>
            <NavLink
              className="navigation__link navigation__link_type_login"
              to="/signin"
            >
              Войти
            </NavLink>
          </>
      }
      {
        isLoggedIn && props.location === 'main' &&
          <>
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link_active"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
            <NavLink
              className="navigation__link navigation__link_type_profile"
              activeClassName="navigation__link_active"
              to="/profile"
            >
              Аккаунт
              <img
                className="navigation__profile-avatar"
                src={ currentUser.avatar || defaultStudentAvatar }
                alt="Аватар студента"
              />
            </NavLink>
          </>
      }
      {
        isLoggedIn && props.location === 'menu' &&
          <>
            <NavLink
              exact
              className="navigation__link"
              activeClassName="navigation__link_active"
              to="/"
            >
              Главная
            </NavLink>
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link_active"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
            <NavLink
              className="navigation__link navigation__link_type_profile"
              activeClassName="navigation__link_active"
              to="/profile"
            >
              Аккаунт
              <img
                className="navigation__profile-avatar"
                src={ currentUser.avatar || defaultStudentAvatar }
                alt="Аватар студента" />
            </NavLink>
          </>
      }
    </nav>
  );
}

export default Navigation;
