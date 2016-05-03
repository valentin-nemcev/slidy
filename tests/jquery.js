// http://stackoverflow.com/questions/30223265/how-to-use-jquery-with-jsdom5/30223890#30223890

import {jsdom} from 'jsdom';
const document = jsdom('<html></html>', {});
const window = document.defaultView;
import jQuery from 'jquery';
export default jQuery(window);
