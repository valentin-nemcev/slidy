import $ from 'jquery';
import keycode from 'keycode';

import SlidyScreen from './screen';
import SlidyRouter from './router';


$(document).ready(() => {
  const screen = new SlidyScreen({$screen: $(document.body)});

  const router = new SlidyRouter();
  router
    .bindToScreen(screen)
    .bindToWindow(window);

  $(document).on(
    'click',
    '.slide',
    function () { screen.showSlide($(this)); }
  );

  $(document).on(
    'keydown',
    '.presenting',
    (ev) => {
      switch (keycode(ev)) {
        case 'right':
        case 'space':
          screen.switchSlide('next');
          break;
        case 'left':
          screen.switchSlide('prev');
          break;
        case 'esc':
          screen.stopPresenting();
          break;
        default:
          return true;
      }
      return false;
    }
  );
});
