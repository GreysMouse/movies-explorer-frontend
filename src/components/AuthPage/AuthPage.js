import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

import './auth-page.css';
import './auth-page__form-container.css';
import './auth-page__title.css';
import './auth-page__form.css';
import './auth-page__redirect-text.css';
import './auth-page__redirect-link.css';

function AuthPage(props) {
  return (
    <section className="auth-page">
      <div className="auth-page__form-container">
        <Logo />
        <h2 className="auth-page__title">{ props.pageTitle }</h2>
        <AuthForm
          addClasses="auth-page__form"
          submitButtonText={ props.submitButtonText }
          onSubmit={ props.onSubmit }
          isFormValid={ props.isFormValid }
        >
          { props.children }
        </AuthForm>
        <p className="auth-page__redirect-text">
          { props.redirectText }
          <Link
            className="auth-page__redirect-link"
            to={ props.redirectLink }
          >
            { props.redirectLinkText }
          </Link>
        </p>
      </div>
    </section>
  );
}

export default AuthPage;
