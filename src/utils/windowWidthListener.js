class WindowWidthListener {
  setListener(windowWidthHandler) {
    window.addEventListener('resize', windowWidthHandler);
  }

  removeListener(windowWidthHandler) {
    window.removeEventListener('resize', windowWidthHandler);
  }
}

const windowWidthListener = new WindowWidthListener();

export default windowWidthListener;


