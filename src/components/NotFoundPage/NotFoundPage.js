import { Link, useHistory } from 'react-router-dom';

import './not-found-page.css';
import './not-found-page__title.css';
import './not-found-page__subtitle.css';
import './not-found-page__backward-link.css';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <Link className="not-found-page__backward-link" onClick={ useHistory().goBack } >Назад</Link>
    </section>
  );
}

export default NotFoundPage;
