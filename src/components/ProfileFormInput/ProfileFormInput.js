import './profile-form__input.css';
import './profile-form__input-label.css';
import './profile-form__input-label_last.css';

function ProfileFormInput(props) {
  return (
    <label className={ 'profile-form__input-label ' + (props.addClasses || '') }>
      { props.labelText }
      <input
        className="profile-form__input"
        minLength={ props.minLength }
        maxLength={ props.maxLength }
        placeholder={ props.placeholder }
        autoComplete="off"
        spellCheck="false"
        type={ props.type }
        value={ props.value }
        onChange={ props.onChange }
      />
    </label>
  );
}

export default ProfileFormInput;
