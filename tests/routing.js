import Slidy, {hashFromPath, pathFromHash} from '../src/js/core';

import $ from './jquery';

describe('Routing', function () {

  specify('hash from path', function () {
    expect(hashFromPath(1)).to.equal('#slidy-1');
  });

  specify('path from hash', function () {
    expect(pathFromHash('#slidy-1')).to.equal(1);

    expect(pathFromHash('#slidy')).to.equal(null);
    expect(pathFromHash('#slidy-nan')).to.equal(null);
    expect(pathFromHash('')).to.equal(null);
    expect(pathFromHash('something else')).to.equal(null);
  });
});


describe('Present slide', function () {

  context('when no slides are presented', function () {

    beforeEach(function () {
      this.$container = $('<div class="container"></div>');
      this.$container.append('<div class="slide"/>');
      this.$slide = $('<div class="slide"/>');
      this.$container.append(this.$slide);
      this.$container.append('<div class="slide"/>');


      this.slidy = new Slidy({containerSelector: '.container'});
    });


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


    specify(
      'when slide is not part of the container does not touch anything',
      function () {
        const $before = this.$container.clone();
        const $orphanSlide = $('<div class="slide"/>');
        this.slidy.presentSlide($orphanSlide);

        expect($before).to.have.sameOuterHTML(this.$container);
      });
  });
});
