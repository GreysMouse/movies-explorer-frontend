class ViewportWidthListener {
  setListener(viewportWidthHandler) {
    window.addEventListener('resize', viewportWidthHandler);
  }

  removeListener(viewportWidthHandler) {
    window.removeEventListener('resize', viewportWidthHandler);
  }
}

const viewportWidthListener = new ViewportWidthListener();

export default viewportWidthListener;


