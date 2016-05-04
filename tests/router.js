import SlidyRouter from '../src/js/router';

describe('Router', function () {

  beforeEach(function () {
    this.router = new SlidyRouter({deck: null});
  });


  specify('hash from path', function () {
    expect(this.router._hashFromPath(1)).to.equal('#slidy-1');
  });


  specify('path from hash', function () {
    expect(this.router._pathFromHash('#slidy-1')).to.equal(1);

    expect(this.router._pathFromHash('#slidy')).to.equal(null);
    expect(this.router._pathFromHash('#slidy-nan')).to.equal(null);
    expect(this.router._pathFromHash('')).to.equal(null);
    expect(this.router._pathFromHash('something else')).to.equal(null);
  });
});

