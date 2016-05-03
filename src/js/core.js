export function hashFromPath(path) {
  return '#slidy-' + path;
}

export function pathFromHash(hash) {
  const match = hash.match(/^#slidy-(\d+)$/i);
  return match && parseInt(match[1], 10);
}

export default class Slidy {

  constructor({containerSelector}) {
    this.containerSelector = containerSelector || 'body';
  }

  findPresentingContainer($context) {
    return $context.find(this.containerSelector + '.presenting');
  }

  presentSlide($nextSlideArg) {
    const $nextSlide = $nextSlideArg.filter('.slide').first();
    const $container = $nextSlide.closest(this.containerSelector);

    const $currentSlides = $container.find('.presented');

    $currentSlides.removeClass('presented');
    $nextSlide.addClass('presented');
    $container.addClass('presenting');

    $container.trigger('slidy:startSlideshow');
  }


  switchSlide($container, nextOrPrev) {
    const $currentSlide = $container.find('.presented');
    const $nextSlide =
      $currentSlide[nextOrPrev + 'All']('.slide').first();
    this.presentSlide($nextSlide);
  }


  stopPresenting($container) {
    const $currentSlides = $container.find('.presented');

    $currentSlides.removeClass('presented');
    $container.removeClass('presenting');

    $container.trigger('slidy:stopSlideshow');
  }
}
