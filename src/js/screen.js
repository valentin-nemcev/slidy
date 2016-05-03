export default class SlidyScreen {

  constructor({$screen}) {
    this.$screen = $screen;
  }


  showSlide($nextSlideArg) {
    const $nextSlide =
      this.$screen.find($nextSlideArg).first().filter('.slide');

    const $currentSlides = this.$screen.find('.presented');

    if ($nextSlide.length > 0) {
      $currentSlides.removeClass('presented');
      $nextSlide.addClass('presented');

      if (!this.$screen.hasClass('presenting')) {
        this.$screen.addClass('presenting');
        this.$screen.trigger('slidy:startSlideshow');
      }
      if (!$currentSlides.is($nextSlide)) {
        this.$screen.trigger('slidy:showSlide', [$nextSlide]);
      }
    }
  }


  switchSlide(nextOrPrev) {
    const $currentSlide = this.$screen.find('.presented');
    const $nextSlide =
      $currentSlide[nextOrPrev + 'All']('.slide').first();
    this.showSlide($nextSlide);
  }


  stopPresenting() {
    const $currentSlides = this.$screen.find('.presented');

    $currentSlides.removeClass('presented');
    if (this.$screen.hasClass('presenting')) {
      this.$screen.removeClass('presenting');
      this.$screen.trigger('slidy:stopSlideshow');
    }
  }
}
