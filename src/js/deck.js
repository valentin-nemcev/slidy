export default class SlidyDeck {

  constructor({$context}) {
    this.$context = $context;
    this.$ = $context.constructor;
  }

  _getFirstPresentation() {
    return this.$context
      .find('.presentation')
      .addBack('.presentation')
      .first();
  }

  getSlideByPath(path) {
    const $presentation = this._getFirstPresentation();

    if (path > 0) {
      const slideIndex = path - 1;
      return $presentation.find('.slide').eq(slideIndex);
    } else {
      return this.$();
    }
  }

  getPathBySlide($slide) {
    const $presentation = this._getFirstPresentation();

    const slideIndex = $presentation.find('.slide').index($slide || this.$());
    return slideIndex >= 0 ? slideIndex + 1 : null;
  }
}
