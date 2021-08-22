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
        (props.findMoviesList.length || props.isSearchButtonClicked) && <MoviesCardList
          findMoviesList={ props.findMoviesList }
          isMoviesLoading={ props.isMoviesLoading }
        />
      }
      <MoviesUploader />
    </main>
  );
}

export default Movies;
