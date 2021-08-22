import './movies-uploader.css';
import './movies-uploader__button.css';

function MoviesUploader(props) {
  return (
    <div className="movies-uploader">
      <button
        className="movies-uploader__button"
        onClick={ props.onButtonClick }
      >
        Еще
      </button>
    </div>
  );
}

export default MoviesUploader;
