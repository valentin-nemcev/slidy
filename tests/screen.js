import SlidyScreen from '../src/js/screen';

import $ from './jquery';

describe('Present slide', function () {

  context('when no existing slides are presented', function () {

    beforeEach(function () {
      this.$screen = $('<div class="screen"></div>');
      this.$screen.append('<div class="slide"/>');
      this.$somethingElse = $('<div class="somethingElse"/>');
      this.$screen.append(this.$somethingElse);
      this.$slide = $('<div class="slide"/>');
      this.$screen.append(this.$slide);
      this.$screen.append('<div class="slide"/>');


      this.slidy = new SlidyScreen({$screen: this.$screen});
    });


    context('and some slide is presented', function () {

      specify('sets slide class', function () {
        this.slidy.showSlide(this.$slide);

        expect(this.$screen.find('.presented'))
        .to.have.sameElements(this.$slide);
      });


      specify('triggers start slideshow event on screen', function () {
        const handlerSpy = sinon.spy();
        this.$screen.on('slidy:startSlideshow', handlerSpy);

        this.slidy.showSlide(this.$slide);

        expect(handlerSpy).to.have.been.calledOnce();
      });


      specify('triggers show slide event on screen', function () {
        const handlerSpy = sinon.spy();
        this.$screen.on('slidy:showSlide', handlerSpy);

        this.slidy.showSlide(this.$slide);

        expect(handlerSpy).to.have.been.calledOnce();
        expect(handlerSpy.args[0][1]).to.have.sameElements(this.$slide);
      });


      specify('sets screen class', function () {
        this.slidy.showSlide(this.$slide);

        expect(this.$screen).to.have.$class('presenting');
      });
    });

    context('and multiple slides are presented', function () {

      specify('sets slide class only for first slide', function () {
        const $slides = this.$slide.add(this.$slide.nextAll('.slide'));
        this.slidy.showSlide($slides);

        expect(this.$screen.find('.presented'))
          .to.have.sameElements(this.$slide);
      });
    });


    function specifyDoesNothing() {

      specify('does not touch DOM', function () {
        const $before = this.$screen.clone();
        this.slidy.showSlide(this.$slide);

        expect($before).to.have.sameOuterHTML(this.$screen);
      });

      specify('does not trigger start slideshow event on screen', function () {
        const handlerSpy = sinon.spy();
        this.$screen.on('slidy:startSlideshow', handlerSpy);

        this.slidy.showSlide(this.$slide);

        expect(handlerSpy).to.have.not.been.called();
      });
    }


    context('and orphan slide is presented', function () {
      beforeEach(function () {
        this.$slide = $('<div class="slide"/>');
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


  context('when some existing slides are presented', function () {

    beforeEach(function () {
      this.$screen = $('<div class="screen"></div>');
      this.$prevSlide = $('<div class="slide"/>');
      this.$screen.append(this.$prevSlide);
      this.$screen.append('<div class="slide"/>');
      this.$somethingElse = $('<div class="somethingElse"/>');
      this.$screen.append(this.$somethingElse);
      this.$slide = $('<div class="slide"/>');
      this.$screen.append(this.$slide);
      this.$screen.append('<div class="slide"/>');


      this.slidy = new SlidyScreen({$screen: this.$screen});

      this.slidy.showSlide(this.$prevSlide);
    });


    context('and some slide is presented', function () {

      specify('sets slide class', function () {
        this.slidy.showSlide(this.$slide);

        expect(this.$screen.find('.presented'))
        .to.have.sameElements(this.$slide);
      });


      specify(
        'does not trigger start slideshow event on screen',
        function () {
          const handlerSpy = sinon.spy();
          this.$screen.on('slidy:startSlideshow', handlerSpy);

          this.slidy.showSlide(this.$slide);

          expect(handlerSpy).to.have.not.been.called();
        });


      specify('triggers show slide event on screen', function () {
        const handlerSpy = sinon.spy();
        this.$screen.on('slidy:showSlide', handlerSpy);

        this.slidy.showSlide(this.$slide);

        expect(handlerSpy).to.have.been.calledOnce();
        expect(handlerSpy.args[0][1]).to.have.sameElements(this.$slide);
      });


      specify('sets screen class', function () {
        this.slidy.showSlide(this.$slide);

        expect(this.$screen).to.have.$class('presenting');
      });
    });


    context('and some slide is presented', function () {

      specify('does not trigger show slide event on screen', function () {
        const handlerSpy = sinon.spy();
        this.$screen.on('slidy:showSlide', handlerSpy);

        this.slidy.showSlide(this.$prevSlide);

        expect(handlerSpy).to.have.not.been.called();
      });
    });
  });
});


describe('Stop presenting', function () {

  context('when some existing slides are presented', function () {

    beforeEach(function () {
      this.$screen = $('<div class="screen"></div>');
      this.$screen.append('<div class="slide"/>');
      this.$somethingElse = $('<div class="somethingElse"/>');
      this.$screen.append(this.$somethingElse);
      this.$slide = $('<div class="slide"/>');
      this.$screen.append(this.$slide);
      this.$screen.append('<div class="slide"/>');

      this.slidy = new SlidyScreen({$screen: this.$screen});

      this.slidy.showSlide(this.$slide);
    });


    specify('unset slide class', function () {
      this.slidy.stopPresenting();

      expect(this.$screen.find('.presented').get()).to.be.empty();
    });


    specify('triggers stop slideshow event on screen', function () {
      const handlerSpy = sinon.spy();
      this.$screen.on('slidy:stopSlideshow', handlerSpy);

      this.slidy.stopPresenting();

      expect(handlerSpy).to.have.been.calledOnce();
    });


    context('when no existing slides are presented', function () {

      beforeEach(function () {
        this.slidy.stopPresenting();
      });

      specify(
        'does not trigger stop slideshow event on screen',
        function () {
          const handlerSpy = sinon.spy();
          this.$screen.on('slidy:stopSlideshow', handlerSpy);

          this.slidy.stopPresenting();

          expect(handlerSpy).to.have.not.been.called();
        });
    });


    specify('unsets screen class', function () {
      this.slidy.stopPresenting();

      expect(this.$screen).to.have.not.$class('presenting');
    });
  });

});

