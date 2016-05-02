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
});
