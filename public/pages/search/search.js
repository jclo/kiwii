/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import SearchView from './views/searchView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Search = function() {
  //
};

// Methods
Search.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.search = new SearchView(mainc);
    log.init('search', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Search;
