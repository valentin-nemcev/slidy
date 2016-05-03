import {hashFromPath, pathFromHash} from '../src/js/router';

describe('Router', function () {

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

