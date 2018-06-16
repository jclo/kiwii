/* global */
/* eslint one-var: 0, semi-style: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import SearchView from './views/searchView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const { level } = config.logger
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Search = function() {
  //
};

// Methods
Search.prototype = {

  // Initializes the module.
  init(app) {
    // Creates the module view:
    this.search = new SearchView(app, mainc);
    log.init('search', level, false);
    log.trace('the content of the page is updated.');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Search;
