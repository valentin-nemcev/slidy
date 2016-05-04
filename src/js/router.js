import $ from 'jquery';


export default class SlidyRouter {

  _setHash(hash, {replace = false}) {
    if (replace) {
      this.window.history.replaceState(null, null, hash);
    } else {
      this.window.history.pushState(null, null, hash);
    }
  }

  _clearHash() {
    const loc = this.window.location;
    this.window.history.pushState(null, null, loc.pathname + loc.search);
  }

  _getCurrentPath() {
    return this._pathFromHash(this.window.location.hash);
  }

  _hashFromPath(path) {
    return '#slidy-' + path;
  }

  _pathFromHash(hash) {
    const match = hash.match(/^#slidy-(\d+)$/i);
    return match && parseInt(match[1], 10);
  }


  constructor({deck}) {
    this.deck = deck;
  }

  bindToScreen(screen) {
    this.screen = screen;

    this.screen.$screen
      .on('slidy:showSlide', (ev, $slide) =>
          this._setHash(
            this._hashFromPath(this.deck.getPathBySlide($slide)),
            // Slide transitions should not be in navigation history
            {replace: this._getCurrentPath() != null}
          )
      )
      .on('slidy:stopSlideshow', () => this._clearHash());
    return this;
  }

  bindToWindow(window) {
    this.window = window;
    $(this.window).on('popstate', () => {
      const path = this._getCurrentPath();
      if (path != null) {
        this.screen.showSlide(this.deck.getSlideByPath(path));
      } else {
        this.screen.stopPresenting();
      }
    }).trigger('popstate');
    return this;
  }
}
