import SectionHeader from '../SectionHeader/SectionHeader';
import PlanGrid from '../PlanGrid/PlanGrid';

import './about-project.css';
import './about-project__text-container.css';
import './about-project__textbox.css';
import './about-project__textbox-title.css';
import './about-project__textbox-text.css';
import './about-project__plan-grid.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SectionHeader>О проекте</SectionHeader>
      <div className="about-project__text-container">
        <div className="about-project__textbox">
          <p className="about-project__textbox-title">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__textbox-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__textbox">
          <p className="about-project__textbox-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__textbox-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__textbox">
          <p className="about-project__textbox-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__textbox-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <PlanGrid addClasses="about-project__plan-grid" />
    </section>
  );
}

export default AboutProject;
