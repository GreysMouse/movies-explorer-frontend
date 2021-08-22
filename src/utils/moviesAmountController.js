function moviesAmountController(inputMoviesList, outputMoviesList, windowWidth) {
  let initialNum = 0;
  let additionalNum = 0;

  const result = [];

  if (windowWidth > 768) {
    initialNum = 12;
    additionalNum = 3;
  }
  else if (windowWidth > 420) {
    initialNum = 8;
    additionalNum = 2;
  }
  else {
    initialNum = 5;
    additionalNum = 2;
  }

  let pointer = outputMoviesList.length;
  let limiter = pointer ? additionalNum : initialNum;

  for (let i = pointer; i < pointer + limiter; ++i) {
    if (!inputMoviesList[i]) break;
    result.push(inputMoviesList[i]);
  }

  return result;
}

export default moviesAmountController;
