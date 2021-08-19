import React from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProfileForm from '../ProfileForm/ProfileForm';

import './profile.css';
import './profile__form-container.css';
import './profile__title.css';
import './profile__form.css';
import './profile__logout-link.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__form-container">
        <h2 className="profile__title">{ `Привет, ${ currentUser.name }` }</h2>
        <ProfileForm
          addClasses="profile__form"
          onUserUpdate={ props.onUserUpdate }
        />
        <Link
          className="profile__logout-link"
          to={ props.logoutLink }
          onClick={ props.onLogout }
        >
          Выйти из аккаунта
        </Link>
      </div>      
    </section>
  );
}

export default Profile;
