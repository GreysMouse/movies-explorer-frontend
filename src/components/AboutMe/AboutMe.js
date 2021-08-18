import SectionHeader from '../SectionHeader/SectionHeader';
import Portfolio from '../Portfolio/Portfolio';
import StudentCard from '../StudentCard/StudentCard';

import './about-me.css';
import './about-me__section-header.css';
import './about-me__student-card.css';
import './about-me__portfolio.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SectionHeader addClasses="about-me__section-header">Студент</SectionHeader>
      <StudentCard addClasses="about-me__student-card" />
      <Portfolio addClasses="about-me__portfolio" />
    </section>
  );
}

export default AboutMe;
