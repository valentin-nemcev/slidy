import chai from 'chai';

global.expect = chai.expect;

import sinon from 'sinon';
global.sinon = sinon;

import 'mocha-sinon';

// chai.use(require('dirty-chai'));
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import chaiJquery from 'chai-jquery';
import $ from './jquery';

chai.use(function (chai, utils) {
  return chaiJquery(chai, utils, $);
});


// http://stackoverflow.com/questions/3176962/jquery-object-equality/3177083#3177083

$.fn.equals = function (compareTo) {
  if (!compareTo || this.length !== compareTo.length) {
    return false;
  }
  for (let i = 0; i < this.length; ++i) {
    if (this[i] !== compareTo[i]) {
      return false;
    }
  }
  return true;
};

$.fn.outerHTML = function () {
  $('<div/>').append(this.clone()).html();
};

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

import './routing';
