import React from 'react';

import './error-info-popup.css';
import './error-info-popup_visible.css';
import './error-info-popup__text.css';

function ErrorInfoPopup(props) {
  return (
    <div
      className={ 'error-info-popup ' + (props.isOpen ? 'error-info-popup_visible' : '') }
      onClick={ props.onClick }
    >
      <p className="error-info-popup__text">{ props.message }</p>
    </div>
  )
}

export default ErrorInfoPopup;
