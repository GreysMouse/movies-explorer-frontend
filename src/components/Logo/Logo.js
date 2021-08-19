import { Link } from 'react-router-dom';

import websiteLogo from '../../images/website-logo.svg';

import './logo.css';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={ websiteLogo } alt="Логотип сайта" />
    </Link>
  );
}

export default Logo;
