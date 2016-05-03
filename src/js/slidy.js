import $ from 'jquery';
import keycode from 'keycode';

import Slidy, {hashFromPath, pathFromHash} from './core';

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


const slidy = new Slidy({containerSelector: 'body'});


$(document).ready(() => {
  $(document).on(
    'click',
    slideSelector,
    function () { slidy.presentSlide($(this)); }
  );

  $(document).on(
    'keydown',
    '.presenting',
    function (ev) {
      switch (keycode(ev)) {
        case 'right':
        case 'space':
          slidy.switchSlide($(this), 'next');
          break;
        case 'left':
          slidy.switchSlide($(this), 'prev');
          break;
        case 'esc':
          slidy.stopPresenting($(this));
          break;
        default:
          return true;
      }
      return false;
    }
  );


  $(window).on('popstate', () => {
    const path = pathFromHash(window.location.hash);
    if (path != null) {
      slidy.presentSlide(slideByPath(path));
    } else {
      slidy.stopPresenting($('body'));
    }
  }).trigger('popstate');

  $('body')
    .on('slidy:showSlide', (ev, $slide) => {
      window.history.pushState(null, null,
                           hashFromPath(slidePath($slide)));
    })
    .on('slidy:stopSlideshow', () => {
      // Remove hash from location
      const loc = window.location;
      window.history.pushState(null, null, loc.pathname + loc.search);
    });
});
