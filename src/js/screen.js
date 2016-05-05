/**
  * Handles slide presentation, tracks presentation states, emits presentation
  * state change events. Presentation state is stored in DOM.
  */
export default class SlidyScreen {

  /**
   * @param {object} options
   * @param {jQuery} options.$screen Element to act as presentation screen
   * currently only body is working, support for in-page elements may be added
   */
  constructor({$screen}) {
    /**
     * Screen element, used as a target for all emitted events
     */
    this.$screen = $screen;
  }


  /**
   * Shows provided slide. Does nothing if no slide was provided.
   * @param {jQuery} $slide Slide element to show
   * @emits {slidy:showSlide} when current slide has changed
   * @emits {slidy:startSlideshow} when no slide was shown before
   * @return {undefined}
   */
  showSlide($slide) {
    const $nextSlide =
      this.$screen.find($slide).first();

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


  /**
   * Is there a slide being presented?
   * @return {boolean}
   */
  isPresenting() {
    return this.$screen.hasClass('presenting');
  }

  /**
   * Returns current presented slide or empty object
   * @return {jQuery}
   */
  getCurrentSlide() {
    return this.$screen.find('.presented').first();
  }


  /**
   * Stops presentation, does nothing if nothing was presented
   * @emits {slidy:stopSlideshow} when something was presented before
   * @return {jQuery}
   */
  stopPresenting() {
    const $currentSlides = this.$screen.find('.presented');

    $currentSlides.removeClass('presented');
    if (this.$screen.hasClass('presenting')) {
      this.$screen.removeClass('presenting');
      this.$screen.trigger('slidy:stopSlideshow');
    }
  }
}
