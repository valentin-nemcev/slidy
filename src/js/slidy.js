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

  return $container.find(slideSelector).get(path);
}


//   window.history.pushState(null, null,
//                            hashFromPath(slidePath($nextSlide)));


const slidy = new Slidy({containerSelector: 'body'});

function switchSlide(target, nextOrPrev) {
  const $container = $(target).closest(containerSelector);
  const $currentSlide = $container.find('.presented');
  const $nextSlide =
    $currentSlide[nextOrPrev + 'All'](slideSelector).first();
  slidy.presentSlide($nextSlide);
}

function stopPresenting(target) {
  const $container = $(target).closest(containerSelector);
  const $currentSlides = $container.find('.presented');

  $currentSlides.removeClass('presented');
  $container.removeClass('presenting');

  // Remove hash from location
  const loc = window.location;
  window.history.pushState(null, null, loc.pathname + loc.search);
}

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
          switchSlide(this, 'next');
          break;
        case 'left':
          switchSlide(this, 'prev');
          break;
        case 'esc':
          stopPresenting(this);
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
      stopPresenting($('.presentation'));
    }
  }).trigger('popstate');
});
