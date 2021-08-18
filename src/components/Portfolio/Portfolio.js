import React from 'react';

import currentUserContext from '../../contexts/currentUserContext';

import './portfolio.css';
import './portfolio__title.css';
import './portfolio__link-container.css';
import './portfolio__link.css';
import './portfolio__link-text.css';

function Portfolio(props) {
  const currentUser = React.useContext(currentUserContext);

  return (
    currentUser.portfolio.length !== 0 &&
      <article className={ 'portfolio ' + (props.addClasses || '') }>
        <h3 className="portfolio__title">Портфолио</h3>
        {
          currentUser.portfolio.map((app, i) => {
            return (
              <div className="portfolio__link-container" key={ i }>
                <a
                  className="portfolio__link"
                  href={ app.link }
                  target="_black"
                  rel="noreferrer"
                >
                  <p className="portfolio__link-text">{ app.name }</p>
                  <p className="portfolio__link-text">↗</p>
                </a>
              </div>
            );
          })
        }
      </article>
  );
}

export default Portfolio;
