import './preloader.css';
import './preloader__container.css';
import './preloader__round.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
          <span className="preloader__round" />
      </div>
    </div>
  )
};

export default Preloader;
