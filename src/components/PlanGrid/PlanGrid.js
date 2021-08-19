import './plan-grid.css';
import './plan-grid__background.css';
import './plan-grid__background_color_green.css';
import './plan-grid__background_color_grey.css';
import './plan-grid__text.css';
import './plan-grid__text_quarter_one.css';
import './plan-grid__text_quarter_two.css';
import './plan-grid__text_quarter_three.css';
import './plan-grid__text_quarter_four.css';

function PlanGrid(props) {
  return (
    <div className={ 'plan-grid ' + props.addClasses }>
      <div className="plan-grid__background plan-grid__background_color_green">
        <p className="plan-grid__text plan-grid__text_quarter_one">1 неделя</p>
      </div>
      <div className="plan-grid__background plan-grid__background_color_grey">
        <p className="plan-grid__text plan-grid__text_quarter_two">4 недели</p>
      </div>
      <p className="plan-grid__text plan-grid__text_quarter_three">Back-end</p>
      <p className="plan-grid__text plan-grid__text_quarter_four">Front-end</p>
    </div>
  );
}

export default PlanGrid;
