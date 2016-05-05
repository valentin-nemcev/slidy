import $ from 'jquery';


/**
 * Handles URLs.
 * Syncronizes document hash fragment and SlidyScreen state
 */
export default class SlidyRouter {

  _setHash(hash, {replace = false}) {
    if (replace) {
      this._window.history.replaceState(null, null, hash);
    } else {
      this._window.history.pushState(null, null, hash);
    }
  }

  _clearHash() {
    const loc = this._window.location;
    // Prevent double update when hash is empty
    const method = loc.hash === '' ? 'replaceState' : 'pushState';
    this._window.history[method](null, null, loc.pathname + loc.search);
  }

  _getCurrentPath() {
    return this._pathFromHash(this._window.location.hash);
  }

  _hashFromPath(path) {
    return '#slidy-' + path;
  }

  _pathFromHash(hash) {
    const match = hash.match(/^#slidy-(\d+)$/i);
    return match && parseInt(match[1], 10);
  }


  /**
   * @param {object} options
   * @param {SlidyDeck} options.deck
   */
  constructor({deck}) {
    this._deck = deck;
  }

  /**
   * Listen to presentation state change events and update window URL and vice
   * versa
   * Both {@link bindToScreen} and {@link bindToWindow} should be called for
   * this object to work correctly
   * @param {SlidyScreen} screen
   * @param {window} window
   * @return {this}
   */
  bindToScreenAndWindow(screen, window) {
    this._screen = screen;

    this._screen.$screen
      .on('slidy:showSlide', (ev, $slide) =>
          this._setHash(
            this._hashFromPath(this._deck.getPathBySlide($slide)),
            // Slide transitions should not be in navigation history
            {replace: this._getCurrentPath() != null}
          )
      )
      .on('slidy:stopSlideshow', () => this._clearHash());

    this._window = window;
    $(this._window).on('popstate', () => {
      const path = this._getCurrentPath();
      if (path != null) {
        this._screen.showSlide(this._deck.getSlideByPath(path));
      } else {
        this._screen.stopPresenting();
      }
    }).trigger('popstate');
    return this;
  }

}
