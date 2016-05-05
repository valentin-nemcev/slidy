import clearSelection from './clearSelection';

import $ from 'jquery';

import keycode from 'keycode';

import jQueryMousewheel from 'jquery-mousewheel';
import throttle from 'throttle-debounce/throttle';

import Hammer from 'hammerjs';


export default class SlidyUI {
  constructor({screen, deck}) {
    this.screen = screen;
    this.deck = deck;
  }

  showNextSlide() {
    this.screen.showSlide(this.deck.getNextSlide(this.screen.getCurrentSlide()));
  }

  showPrevSlide() {
    this.screen.showSlide(this.deck.getPrevSlide(this.screen.getCurrentSlide()));
  }

  bindDeckUI($context) {
    $context.on(
      'click',
      '.slide',
      (ev) => {
        if (!this.screen.isPresenting()) {
          this.screen.showSlide($(ev.currentTarget));
          ev.preventDefault();
        }
      }
    );
    return this;
  }

  bindSlideUI() {
    this.screen.$screen.on('slidy:showSlide', (ev, $slide) => {
      clearSelection();
      $slide.scrollTop(0);
    });
    return this;
  }

  bindKeyboardUI() {
    this.screen.$screen.on(
      'keydown',
      (ev) => {
        if (!this.screen.isPresenting()) return true;
        switch (keycode(ev)) {
          case 'right':
          case 'space':
            this.showNextSlide();
            break;
          case 'left':
            this.showPrevSlide();
            break;
          case 'esc':
            this.screen.stopPresenting();
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

  bindScrollUI() {
    jQueryMousewheel($);

    this.screen.$screen.on(
      'mousewheel',
      // Max scroll speed: 4 slides per second
      throttle(250, /* noTrailing */ true, (ev) => {
        if (!this.screen.isPresenting()) return true;
        const $slide = this.screen.getCurrentSlide();

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

  bindTouchUI() {
    // Enable text selection
    delete Hammer.defaults.cssProps.userSelect;
    const hammer = new Hammer(this.screen.$screen[0]);
    hammer.get('pinch').set({enable: true});

    hammer
      .on('swiperight', () => {
        if (!this.screen.isPresenting()) return true;

        this.showPrevSlide();
        return false;
      })
      // TODO: Don't overtake horizontal scrolling when present, similar to
      // bindScrollUI
      .on('swipeleft', () => {
        if (!this.screen.isPresenting()) return true;

        this.showNextSlide();
        return false;
      })
      .on('pinchout', () => {
        if (!this.screen.isPresenting()) return true;

        this.screen.stopPresenting();
        return false;
      });
    return this;
  }
}

