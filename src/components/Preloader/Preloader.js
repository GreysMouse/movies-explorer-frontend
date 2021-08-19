import './preloader.css';
import './preloader_active.css';
import './preloader__container.css';
import './preloader__round.css';

function Preloader(props) {
  return (
    <div className={ 'preloader ' + (props.isActive ? 'preloader_active' : '') }>
      <div className="preloader__container">
          <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader;
