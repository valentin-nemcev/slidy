import $ from 'jquery';

import SlidyScreen from './screen';
import SlidyRouter from './router';
import SlidyDeck from './deck';
import SlidyUI from './ui';

// For IE9
import 'html5-history-api';

// No / after # in url in IE9
window.history.setup(null, '');

function getControlSettings($el) {
  const defaults = {
    keyboard: true,
    scroll: true,
    touch: 'auto',
  };
  const controls = $.extend({}, defaults, $el.data('controls'));

  if (controls.touch === 'auto') controls.touch = 'ontouchstart' in window;

  return controls;
}


function slidy($context) {
  const screen = new SlidyScreen({$screen: $context});
  const deck = new SlidyDeck({$context});

  const controls = getControlSettings($context);

  new SlidyRouter({deck})
    .bindToScreen(screen)
    .bindToWindow(window);

  const ui = new SlidyUI({deck, screen})
    .bindDeckUI($context)
    .bindSlideUI();

  if (controls.keyboard) ui.bindKeyboardUI();
  if (controls.scroll) ui.bindScrollUI();
  if (controls.touch) ui.bindTouchUI();
}

$(document).ready(() => slidy($(document.body)));
