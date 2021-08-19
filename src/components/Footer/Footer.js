import React from 'react';
import currentUserContext from '../../contexts/currentUserContext';

import './footer.css';
import './footer__description.css';
import './footer__container.css';
import './footer__copyright.css';
import './footer__link-list.css';
import './footer__link.css';

function Footer() {
  const currentUser = React.useContext(currentUserContext);  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">© { currentYear }</p>
        <ul className="footer__link-list">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_black" rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>
          {
            currentUser.accounts.map((account, i) => {
              return (
                <li key={ i }>
                  <a className="footer__link" href={ account.link } target="_black" rel="noreferrer">
                    { account.name }
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
