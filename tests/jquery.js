// http://stackoverflow.com/questions/30223265/how-to-use-jquery-with-jsdom5/30223890#30223890

import {jsdom} from 'jsdom';
const document = jsdom('<html></html>', {});
const window = document.defaultView;
import jQueryFactory from 'jquery';
const jQuery = jQueryFactory(window);


// http://stackoverflow.com/questions/3176962/jquery-object-equality/3177083#3177083

jQuery.fn.equals = function (compareTo) {
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

jQuery.fn.outerHTML = function () {
  jQuery('<div/>').append(this.clone()).html();
};

jQuery.fn.inspect = function () {
  return '$("' + this.selector + '")';
};

export default jQuery;
