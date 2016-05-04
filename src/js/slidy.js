import $ from 'jquery';
import keycode from 'keycode';

import SlidyScreen from './screen';
import SlidyRouter from './router';
import SlidyDeck from './deck';
import clearSelection from './clearSelection';


$(document).ready(() => {
  const screen = new SlidyScreen({$screen: $(document.body)});
  const deck = new SlidyDeck({$context: $(document)});

  new SlidyRouter({deck})
    .bindToScreen(screen)
    .bindToWindow(window);

  $(document).on(
    'click',
    '.slide',
    function (ev) {
      screen.showSlide($(this));
      ev.preventDefault();
      clearSelection();
    }
  );

  $(document).on(
    'keydown',
    '.presenting',
    (ev) => {
      switch (keycode(ev)) {
        case 'right':
        case 'space':
          screen.showSlide(deck.getNextSlide(screen.getCurrentSlide()));
          break;
        case 'left':
          screen.showSlide(deck.getPrevSlide(screen.getCurrentSlide()));
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
