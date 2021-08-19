import NavTab from '../NavTab/NavTab';

import './promo.css';
import './promo__banner.css';
import './promo__title.css';
import './promo__nav-tab.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__banner">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <NavTab addClasses="promo__nav-tab" />
      </div>
    </section>
  );
}

export default Promo;
