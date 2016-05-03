import Slidy from '../src/js/core';

import $ from './jquery';

describe('Present slide', function () {

  context('when no existing slides are presented', function () {

    beforeEach(function () {
      this.$container = $('<div class="container"></div>');
      this.$container.append('<div class="slide"/>');
      this.$somethingElse = $('<div class="somethingElse"/>');
      this.$container.append(this.$somethingElse);
      this.$slide = $('<div class="slide"/>');
      this.$container.append(this.$slide);
      this.$container.append('<div class="slide"/>');


      this.slidy = new Slidy({containerSelector: '.container'});
    });


    context('and some slide is presented', function () {

      specify('sets slide class', function () {
        this.slidy.presentSlide(this.$slide);

        expect(this.$container.find('.presented'))
        .to.have.sameElements(this.$slide);
      });


      specify('triggers start slideshow event on container', function () {
        const handlerSpy = sinon.spy();
        this.$container.on('slidy:startSlideshow', handlerSpy);

        this.slidy.presentSlide(this.$slide);

        expect(handlerSpy).to.have.been.calledOnce();
      });


      specify('sets container class', function () {
        this.slidy.presentSlide(this.$slide);

        expect(this.$container).to.have.$class('presenting');
      });
    });

    context('and multiple slides are presented', function () {

      specify('sets slide class only for first slide', function () {
        const $slides = this.$slide.add(this.$slide.nextAll('.slide'));
        this.slidy.presentSlide($slides);

        expect(this.$container.find('.presented'))
          .to.have.sameElements(this.$slide);
      });
    });


    function specifyDoesNothing() {

      specify('does not touch DOM', function () {
        const $before = this.$container.clone();
        this.slidy.presentSlide(this.$slide);

        expect($before).to.have.sameOuterHTML(this.$container);
      });

      specify('does not trigger start slideshow event on container', function () {
        const handlerSpy = sinon.spy();
        this.$container.on('slidy:startSlideshow', handlerSpy);

        this.slidy.presentSlide(this.$slide);

        expect(handlerSpy).to.have.not.been.called();
      });
    }


    context('and orphan slide is presented', function () {
      beforeEach(function () {
        this.$slide = $('<div class="slide"/>');
      });

      specifyDoesNothing();
    });


    context('and something other than a slide is presented', function () {
      beforeEach(function () {
        this.$slide = this.$somethingElse;
      });

      specifyDoesNothing();
    });


    context('and empty object is presented', function () {
      beforeEach(function () {
        this.$slide = $();
      });

      specifyDoesNothing();
    });
  });
});


describe('Stop presenting', function () {

  context('when some existing slides are presented', function () {

    beforeEach(function () {
      this.$container = $('<div class="container"></div>');
      this.$container.append('<div class="slide"/>');
      this.$somethingElse = $('<div class="somethingElse"/>');
      this.$container.append(this.$somethingElse);
      this.$slide = $('<div class="slide"/>');
      this.$container.append(this.$slide);
      this.$container.append('<div class="slide"/>');

      this.slidy = new Slidy({containerSelector: '.container'});

      this.slidy.presentSlide(this.$slide);
    });


    specify('unset slide class', function () {
      this.slidy.stopPresenting(this.$container);

      expect(this.$container.find('.presented').get()).to.be.empty();
    });


    specify('triggers stop slideshow event on container', function () {
      const handlerSpy = sinon.spy();
      this.$container.on('slidy:stopSlideshow', handlerSpy);

      this.slidy.stopPresenting(this.$container);

      expect(handlerSpy).to.have.been.calledOnce();
    });


    specify('unsets container class', function () {
      this.slidy.stopPresenting(this.$container);

      expect(this.$container).to.have.not.$class('presenting');
    });
  });

});

