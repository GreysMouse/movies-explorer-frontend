import './auth-form__input.css';
import './auth-form__input-label.css';
import './auth-form__input-span.css';
import './auth-form__input-span_visible.css';

function AuthFormInput(props) {
  return (
    <>
      <label className="auth-form__input-label">
        { props.labelText }
        <input
          className="auth-form__input"
          minLength={ props.minLength }
          maxLength={ props.maxLength }
          placeholder={ props.placeholder }
          autoComplete="off"
          spellCheck="false"
          required
          type={ props.type }
          value={ props.value }
          onChange={ props.onChange }
          onBlur={ props.onBlur }
        />
      </label>
      <span
        className={ 'auth-form__input-span ' + (props.isSpanVisible ? 'auth-form__input-span_visible' : '') }
      >
        { props.spanText || 'Что-то пошло не так...' }
      </span>
    </>
  );
}

export default AuthFormInput;
