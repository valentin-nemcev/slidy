export function hashFromPath(path) {
  return '#slidy-' + path;
}

export function pathFromHash(hash) {
  const match = hash.match(/^#slidy-(\d+)$/i);
  return match && parseInt(match[1], 10);
}

import $ from 'jquery';

const slideSelector = '.slide';
const containerSelector = 'body';

function slidePath(slide) {
  const $slide = $(slide);
  const $container = $slide.closest(containerSelector);

  return $container.find(slideSelector).index($slide);
}

function slideByPath(path) {
  const $container = $(containerSelector).first();

  return $container.find(slideSelector).eq(path);
}

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
    return pathFromHash(this.window.location.hash);
  }

  bindToScreen(screen) {
    this.screen = screen;

    this.screen.$screen
      .on('slidy:showSlide', (ev, $slide) =>
          this._setHash(
            hashFromPath(slidePath($slide)),
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
        this.screen.showSlide(slideByPath(path));
      } else {
        this.screen.stopPresenting();
      }
    }).trigger('popstate');
    return this;
  }
}
