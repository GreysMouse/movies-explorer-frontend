class MoviesUploader {
  getUploadedCards(foundMoviesList, uploadedMoviesList, currentWindowWidth) {
    let cardsNum = 12;

    if (currentWindowWidth <= 425) cardsNum = 5;
    else if (currentWindowWidth <= 768) cardsNum = 8;

    if (uploadedMoviesList.length >= cardsNum ) return uploadedMoviesList; // Чтобы не уменьшать уже видимое число фильмов при уменьшении разрешения
    return foundMoviesList.slice(0, cardsNum);
  }

  uploadCards(foundMoviesList, uploadedMoviesList, currentWindowWidth) {
    const pointer = uploadedMoviesList.length;
    
    let cardsNum = 3;
    if (currentWindowWidth <= 768) cardsNum = 2;

    if (pointer + cardsNum > foundMoviesList.length) {
      cardsNum = pointer + cardsNum - foundMoviesList.length + 1;
    }
    return foundMoviesList.slice(pointer, pointer + cardsNum);
  }
}

const moviesUploader = new MoviesUploader();

export default moviesUploader;
