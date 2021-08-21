import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './saved-movies.css';
import './saved-movies__movies-card-list.css';

function SavedMovies(props) {
  return (
    <main className="saved-movies">
      <SearchForm onMoviesSearch={ props.onMoviesSearch } />
      <MoviesCardList addClasses="saved-movies__movies-card-list" />
    </main>
  );
}

export default SavedMovies;
