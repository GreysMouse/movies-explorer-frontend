import MoviesCard from '../MoviesCard/MoviesCard';

import './movies-card-list.css';

function MoviesCardList(props) {
  return (
    <section className={ 'movies-card-list ' + (props.addClasses || '')}>
      <MoviesCard />
      <MoviesCard state="saved" />
      <MoviesCard state="added" />
    </section>
  );
}

export default MoviesCardList;
