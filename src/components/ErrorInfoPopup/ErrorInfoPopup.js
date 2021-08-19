import React from 'react';

import './error-info-popup.css';
import './error-info-popup_visible.css';
import './error-info-popup__text.css';

function ErrorInfoPopup(props) {
  const [ isOpen, setIsOpen ] = React.useState(true);

  function handleClick() {
    setIsOpen(false);
  }

  return (
    <div
      className={ 'error-info-popup ' + (props.isOpen && isOpen ? 'error-info-popup_visible' : '') }
      onClick={ handleClick }
    >
      <p className="error-info-popup__text">{ props.message }</p>
    </div>
  )
}

export default ErrorInfoPopup;
