import './auth-form.css';
import './auth-form__submit-button.css';
import './auth-form__submit-button_disabled.css';

function AuthForm(props) {
  return (
      <form className={ 'auth-form ' + (props.addClasses || '') }>
        { props.children }
        <button
          className={ 'auth-form__submit-button ' + (props.isFormValid && !props.isDataLoading ? '' : 'auth-form__submit-button_disabled')}
          onClick={ props.onSubmit }
          disabled={ !props.isFormValid || props.isDataLoading }
        >
          { props.isDataLoading ? 'Сохранение...' : props.submitButtonText }
        </button>
      </form>
  );
}

export default AuthForm;
