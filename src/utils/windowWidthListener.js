class WindowWidthListener {
  setListener(widthHandler) {
    window.addEventListener('resize', widthHandler);
  }

  removeListener(widthHandler) {
    window.removeEventListener('resize', widthHandler);
  }
}

const windowWidthListener = new WindowWidthListener();

export default windowWidthListener;


