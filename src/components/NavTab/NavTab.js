import { HashLink } from 'react-router-hash-link';

import './nav-tab.css';
import './nav-tab__link.css';

function NavTab(props) {
  return (
    <div className={ 'nav-tab ' + props.addClasses }>
      <HashLink className="nav-tab__link" to="/#about-project">О проекте</HashLink>
      <HashLink className="nav-tab__link" to="/#techs">Технологии</HashLink>
      <HashLink className="nav-tab__link" to="/#about-me">Студент</HashLink>    
    </div>
  );
}

export default NavTab;
