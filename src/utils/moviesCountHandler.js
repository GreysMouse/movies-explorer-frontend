import {
  SCREEN_WIDTH_CHECKPOINT_768PX,
  SCREEN_WIDTH_CHECKPOINT_425PX,
  MOVIES_CARD_MIN_COUNT_DEFAULT,
  MOVIES_CARD_MIN_COUNT_768PX,
  MOVIES_CARD_MIN_COUNT_425PX,
  MOVIES_CARD_UPLOAD_COUNT_DEFAULT,
  MOVIES_CARD_UPLOAD_COUNT_768PX,
  MOVIES_CARD_UPLOAD_COUNT_425PX
} from '../config';

class MoviesCountHandler {
  _getDisplayedCardsCount(currentViewportWidth) {
    let cardsCount = MOVIES_CARD_MIN_COUNT_DEFAULT;

    if (currentViewportWidth <= SCREEN_WIDTH_CHECKPOINT_425PX) {
      cardsCount = MOVIES_CARD_MIN_COUNT_425PX;
    }
    else if (currentViewportWidth <= SCREEN_WIDTH_CHECKPOINT_768PX) {
      cardsCount = MOVIES_CARD_MIN_COUNT_768PX;
    }

    return cardsCount;
  }

  _getUploadedCardsCount(currentViewportWidth) {
    let uploadsCount = MOVIES_CARD_UPLOAD_COUNT_DEFAULT;

    if (currentViewportWidth <= SCREEN_WIDTH_CHECKPOINT_425PX) {
      uploadsCount = MOVIES_CARD_UPLOAD_COUNT_425PX;
    }
    else if (currentViewportWidth <= SCREEN_WIDTH_CHECKPOINT_768PX) {
      uploadsCount = MOVIES_CARD_UPLOAD_COUNT_768PX;
    }

    return uploadsCount;
  }
  
  getCards(foundMoviesList, uploadedMoviesList, currentViewportWidth) {
    const cardsCount = this._getDisplayedCardsCount(currentViewportWidth);

    // ----- Чтобы не уменьшать уже видимое число фильмов при уменьшении разрешения -----//
    if (uploadedMoviesList.length >= cardsCount ) return uploadedMoviesList;
    // --------------------------------------------------------------------------------- //

    return foundMoviesList.slice(0, cardsCount);
  }

  uploadCards(foundMoviesList, uploadedMoviesList, currentViewportWidth) {
    const pointer = uploadedMoviesList.length;
    
    let uploadsCount = this._getUploadedCardsCount(currentViewportWidth);

    if (pointer + uploadsCount > foundMoviesList.length) {
      uploadsCount = pointer + uploadsCount - foundMoviesList.length + 1;
    }
    return foundMoviesList.slice(pointer, pointer + uploadsCount);
  }
}

const moviesCountHandler = new MoviesCountHandler();

export default moviesCountHandler;
