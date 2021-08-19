import SectionHeader from '../SectionHeader/SectionHeader';

import './techs.css';
import './techs__title.css';
import './techs__description.css';
import './techs__link-list.css';
import './techs__link.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <SectionHeader>Технологии</SectionHeader>
      <p className="techs__title">7 технологий</p>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__link-list">
        <li>
          <a
            className="techs__link"
            href="https://developer.mozilla.org/ru/docs/Web/HTML/"
            target="_blank"
            rel="noreferrer"
          >
            HTML
          </a>
        </li>
        <li>
          <a
            className="techs__link"
            href="https://developer.mozilla.org/ru/docs/Web/CSS/"
            target="_blank"
            rel="noreferrer"
          >
            CSS
          </a>
        </li>
        <li>
          <a
            className="techs__link"
            href="https://developer.mozilla.org/ru/docs/Web/JavaScript/"
            target="_blank"
            rel="noreferrer"
          >
            JS
          </a>
        </li>
        <li>
          <a
            className="techs__link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>
        </li>
        <li>
          <a
            className="techs__link"
            href="https://git-scm.com/"
            target="_blank"
            rel="noreferrer"
          >
            Git
          </a>
        </li>
        <li>
          <a
            className="techs__link"
            href="https://expressjs.com/"
            target="_blank"
            rel="noreferrer"
          >
            Express.js
          </a>
        </li>
        <li>
          <a
            className="techs__link"
            href="https://www.mongodb.com/"
            target="_blank"
            rel="noreferrer"
          >
            mongoDB
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
