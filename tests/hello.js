import { hello } from '../src/js/core';

describe('Hello', function () {

  specify('returns hello', function () {
    expect(hello()).to.equal('hello');
  });
});
