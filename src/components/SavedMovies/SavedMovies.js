import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './saved-movies.css';
import './saved-movies__movies-card-list.css';

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList addClasses="saved-movies__movies-card-list" />
    </main>
  );
}

export default SavedMovies;
