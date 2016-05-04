import $ from 'jquery';
import keycode from 'keycode';

import SlidyScreen from './screen';
import SlidyRouter from './router';
import SlidyDeck from './deck';
import clearSelection from './clearSelection';

import jQueryMousewheel from 'jquery-mousewheel';
import throttle from 'throttle-debounce/throttle';


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
    }
  );


  screen.$screen.on('slidy:showSlide', (ev, $slide) => {
    clearSelection();
    $slide.scrollTop(0);
  });


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


  jQueryMousewheel($);

  $(document).on(
    'mousewheel',
    '.presenting .presented',
    throttle(250, /* noTrailing */ true, (ev) => {
      const $this = $(ev.currentTarget);

      if (!deck.getOptionsForSlide($this).scrollControl) return;
      const scrollingDown = ev.deltaY < 0;
      const scrollingUp = ev.deltaY > 0;

      // http://stackoverflow.com/questions/6271237/detecting-when-user-scrolls-to-bottom-of-div-with-jquery/6271466#6271466
      // - 1 because innerHeight could be fractional and scrollHeight is
      // always rounded
      const scrolledToBottom =
        $this.scrollTop() + $this.innerHeight() >= $this[0].scrollHeight - 1;
      const scrolledToTop = $this.scrollTop() === 0;

      if (scrollingDown && scrolledToBottom) {
        screen.showSlide(deck.getNextSlide(screen.getCurrentSlide()));
      }

      if (scrollingUp && scrolledToTop) {
        screen.showSlide(deck.getPrevSlide(screen.getCurrentSlide()));
      }
    })
  );
});
