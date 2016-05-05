import clearSelection from './clearSelection';

import $ from 'jquery';

import keycode from 'keycode';

import jQueryMousewheel from 'jquery-mousewheel';
import throttle from 'throttle-debounce/throttle';

import Hammer from 'hammerjs';


/**
 * Handles user input bindings
 */
export default class SlidyUI {
  /**
   * @param {object} options
   * @param {SlidyScreen} screen
   * @param {SlidyDeck} deck
   */
  constructor({screen, deck}) {
    this._screen = screen;
    this._deck = deck;
  }

  /**
   * @return {this}
   */
  showNextSlide() {
    this._screen.showSlide(this._deck.getNextSlide(this._screen.getCurrentSlide()));
    return this;
  }

  /**
   * @return {this}
   */
  showPrevSlide() {
    this._screen.showSlide(this._deck.getPrevSlide(this._screen.getCurrentSlide()));
    return this;
  }

  /**
   * Click slide to start slide show
   * @return {this}
   */
  bindDeckUI() {
    this._deck.$context.on(
      'click',
      '.slide',
      (ev) => {
        if (!this._screen.isPresenting()) {
          this._screen.showSlide($(ev.currentTarget));
          ev.preventDefault();
        }
      }
    );
    return this;
  }

  /**
   * Resets text selection and scroll position when slide is shown
   * @return {this}
   */
  bindSlideUI() {
    this._screen.$screen.on('slidy:showSlide', (ev, $slide) => {
      clearSelection();
      $slide.scrollTop(0);
    });
    return this;
  }

  /**
   * Keyboard control
   * @todo Add tabindex to correctly receive keyboard input when $screen is not
   * body
   * @return {this}
   */
  bindKeyboardUI() {
    this._screen.$screen.on(
      'keydown',
      (ev) => {
        if (!this._screen.isPresenting()) return true;
        switch (keycode(ev)) {
          case 'right':
          case 'space':
            this.showNextSlide();
            break;
          case 'left':
            this.showPrevSlide();
            break;
          case 'esc':
            this._screen.stopPresenting();
            break;
          default:
            return true;
        }
        return false;
      }
    );
    return this;
  }

  _scrolledToBottom($el) {
    // http://stackoverflow.com/questions/6271237/detecting-when-user-scrolls-to-bottom-of-div-with-jquery/6271466#6271466
    // - 1 because innerHeight could be fractional and scrollHeight is
    // always rounded
    return $el.scrollTop() + $el.innerHeight() >= $el[0].scrollHeight - 1;
  }

  _scrolledToTop($el) {
    return $el.scrollTop() === 0;
  }


  /**
   * Scroll control
   * @return {this}
   */
  bindScrollUI() {
    jQueryMousewheel($);

    this._screen.$screen.on(
      'mousewheel',
      // Max scroll speed: 4 slides per second
      throttle(250, /* noTrailing */ true, (ev) => {
        if (!this._screen.isPresenting()) return true;
        const $slide = this._screen.getCurrentSlide();

        const scrollingDown = ev.deltaY < 0;
        const scrollingUp = ev.deltaY > 0;

        // Switch slide only when it's scrolled to top/bottom
        if (scrollingDown && this._scrolledToBottom($slide)) {
          this.showNextSlide();
          return false;
        }
        if (scrollingUp && this._scrolledToTop($slide)) {
          this.showPrevSlide();
          return false;
        }

        return true;
      })
    );
    return this;
  }

  /**
   * Touch control
   * @todo Don't overtake horizontal scrolling when present, similar to
   * {@link bindScrollUI}
   * @return {this}
   */
  bindTouchUI() {
    // Enable text selection
    delete Hammer.defaults.cssProps.userSelect;
    const hammer = new Hammer(this._screen.$screen[0]);
    hammer.get('pinch').set({enable: true});

    hammer
      .on('swiperight', () => {
        if (!this._screen.isPresenting()) return true;

        this.showPrevSlide();
        return false;
      })
      .on('swipeleft', () => {
        if (!this._screen.isPresenting()) return true;

        this.showNextSlide();
        return false;
      })
      .on('pinchout', () => {
        if (!this._screen.isPresenting()) return true;

        this._screen.stopPresenting();
        return false;
      });
    return this;
  }
}

