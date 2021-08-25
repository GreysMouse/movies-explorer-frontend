import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesUploader from '../MoviesUploader/MoviesUploader';

import './movies.css';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm
        page="movies"
        onMoviesSearch={ props.onMoviesSearch }
        disabled={ props.isMoviesLoading }
      />
      {
        // founded
        (props.uploadedMoviesList.length || props.isSearchButtonClicked) && <MoviesCardList
          page="movies"
          foundMoviesList={ props.foundMoviesList }
          uploadedMoviesList={ props.uploadedMoviesList }
          savedMoviesList={ props.savedMoviesList }
          isMoviesLoading={ props.isMoviesLoading }
          onMovieSave={ props.onMovieSave }
          onMovieDelete={ props.onMovieDelete }
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
