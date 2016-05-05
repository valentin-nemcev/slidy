/** Handles deck, which is represented as DOM tree, see reference presentation
 * HTML for structure. Does not have any state.
 */
export default class SlidyDeck {

  /**
   * @param {object} options
   * @param {jQuery} options.$context Where to look for slides
   */
  constructor({$context}) {
    /**
    * Where to look for slides
    */
    this.$context = $context;

    /**
    * @private
    */
    this.$ = $context.constructor;
  }


  _getFirstPresentation() {
    return this.$context
      .find('.presentation')
      .addBack('.presentation')
      .first();
  }


  /**
   * @param {number} path 1-based slide index in deck. In future paths could be
   * more complex than just numbers, (for example, in order to support multiple
   * decks)
   * @return {jQuery} Slide element or empty object of no slide was found
   */
  getSlideByPath(path) {
    const $presentation = this._getFirstPresentation();

    if (path > 0) {
      const slideIndex = path - 1;
      return $presentation.find('.slide').eq(slideIndex);
    } else {
      return this.$();
    }
  }


  /**
   * @param {jQuery} $slide Slide element
   * @return {?number} Slide path, see {@link getSlideByPath} for description.
   * null when $slide is not a presentation slide
   */
  getPathBySlide($slide) {
    const $presentation = this._getFirstPresentation();

    const slideIndex = $presentation.find('.slide').index($slide || this.$());
    return slideIndex >= 0 ? slideIndex + 1 : null;
  }


  /**
   * @param {jQuery} $slide Slide element
   * @return {jQuery} Previous slide in deck or empty object if $slide is a
   * last first
   */
  getPrevSlide($slide) {
    return this._getAdjacentSlide('prev', $slide);
  }


  /**
   * @param {jQuery} $slide Slide element
   * @return {jQuery} Next slide in deck or empty object if $slide is a
   * last slide
   */
  getNextSlide($slide) {
    return this._getAdjacentSlide('next', $slide);
  }


  _getAdjacentSlide(nextOrPrev, $slide) {
    return $slide[nextOrPrev + 'All']('.slide:first');
  }
}
