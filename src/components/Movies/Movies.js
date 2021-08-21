import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesUploader from '../MoviesUploader/MoviesUploader';

import './movies.css';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm onMoviesSearch={ props.onMoviesSearch } />
      <MoviesCardList />
      <MoviesUploader />
    </main>
  );
}

export default Movies;
