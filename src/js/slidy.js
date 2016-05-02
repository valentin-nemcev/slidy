import $ from 'jquery';
import keycode from 'keycode';

const slideSelector = '.slide';
const containerSelector = 'body';


function presentSlide(nextSlide) {
  const $nextSlide = $(nextSlide);
  const $container = $nextSlide.closest(containerSelector);

  const $currentSlides = $container.find('.presented');

  $currentSlides.removeClass('presented');
  $nextSlide.addClass('presented');
  $container.addClass('presenting');

  window.history.pushState(null, null, '#slidy');
}

function switchSlide(target, nextOrPrev) {
  const $container = $(target).closest(containerSelector);
  const $currentSlide = $container.find('.presented');
  const $nextSlide =
    $currentSlide[nextOrPrev + 'All'](slideSelector).first();
  presentSlide($nextSlide);
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
    function () { presentSlide(this); }
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
    if (window.location.hash === '#slidy') {
      presentSlide($('.slide').first());
    } else {
      stopPresenting($('.presentation'));
    }
  }).trigger('popstate');
});
