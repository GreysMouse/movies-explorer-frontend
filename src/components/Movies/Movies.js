import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesUploader from '../MoviesUploader/MoviesUploader';

import './movies.css';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm
        onMoviesSearch={ props.onMoviesSearch }
        disabled={ props.isMoviesLoading }
      />
      {
        (props.foundMoviesList.length || props.isSearchButtonClicked) && <MoviesCardList
          foundMoviesList={ props.foundMoviesList }
          uploadedMoviesList={ props.uploadedMoviesList }
          isMoviesLoading={ props.isMoviesLoading }
        />
      }
      {
        props.uploadedMoviesList.length !== props.foundMoviesList.length && <MoviesUploader
          onButtonClick={ props.onUploaderClick }
        />
      }
    </main>
  );
}

export default Movies;
