import SlidyDeck from '../src/js/deck';

import $ from './jquery';

describe('Deck', function () {

  beforeEach(function () {
    this.$slide1 = $(`
      <section class="slide">
        <h1>Title</h1>
        <p>Content</p>
      </section>
    `);

    this.$slide2 = $(`
      <section class="slide">
        <h2>Slide 2</h2>
        <p>Content</p>
      </section>
    `);

    this.$slide3 = $(`
      <section class="slide">
        <h2>Slide 3</h2>
        <p>Content</p>
      </section>
    `);

    this.$deck = $('<section class="presentation"/>')
      .append(this.$slide1, this.$slide2, this.$slide3);

    this.deck = new SlidyDeck({$context: this.$deck});
  });


  describe('getSlideByPath', function () {

    specify('returns slide', function () {
      expect(this.deck.getSlideByPath(1))
        .to.have.sameElements(this.$slide1);
      expect(this.deck.getSlideByPath(2))
        .to.have.sameElements(this.$slide2);
      expect(this.deck.getSlideByPath(3))
        .to.have.sameElements(this.$slide3);
    });


    specify('returns empty when path does not exist', function () {
      expect(this.deck.getSlideByPath(-1).get()).to.be.empty();
      expect(this.deck.getSlideByPath(0).get()).to.be.empty();
      expect(this.deck.getSlideByPath(4).get()).to.be.empty();
      expect(this.deck.getSlideByPath(null).get()).to.be.empty();
    });
  });

  describe('getPathBySlide', function () {
    specify('returns path', function () {
      expect(this.deck.getPathBySlide(this.$slide1)).to.equal(1);
      expect(this.deck.getPathBySlide(this.$slide2)).to.equal(2);
      expect(this.deck.getPathBySlide(this.$slide3)).to.equal(3);
    });


    specify('returns empty when path does not exist', function () {
      expect(this.deck.getPathBySlide($('<section class="slide"/>')))
        .to.be.null();
      expect(this.deck.getPathBySlide(this.$somethingElse)).to.be.null();
      expect(this.deck.getPathBySlide($())).to.be.null();
    });
  });
});
