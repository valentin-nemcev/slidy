import chai from 'chai';


import sinon from 'sinon';

global.sinon = sinon;

import 'mocha-sinon';


import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import chaiJQ from 'chai-jq';
chai.use(chaiJQ);

global.expect = chai.expect;

// expect(true).to.be.true(); instead of expect(true).to.be.true;
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);


import $ from './jquery';

chai.use(function (chai, utils) {
  // Usual chai substitution form 'expected #{this} to have a #{exp}' had some
  // troubles with $.fn.inspect(), so we substitute manually
  chai.Assertion.addMethod('sameElements', function (expected) {
    this.assert(
      this._obj.equals(expected),
      `expected ${utils.inspect(this._obj)}`
      + ` to have same elements as ${utils.inspect(expected)}`,
      `expected ${utils.inspect(this._obj)}`
      + ` not to have same elements as ${utils.inspect(expected)}`
    );
  });

  chai.Assertion.addMethod('sameOuterHTML', function (expected) {
    this.assert(
      this._obj.outerHTML() === $(expected).outerHTML(),
      `expected ${utils.inspect(this._obj)}`
      + ` to have same outer html as ${utils.inspect(expected)}`,
      `expected ${utils.inspect(this._obj)}`
      + ` to not have same outer html as ${utils.inspect(expected)}`
    );
  });
});
