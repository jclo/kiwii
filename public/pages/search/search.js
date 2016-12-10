/* global */
/* eslint one-var: 0 */

// -- Vendor modules
const Radio = require('backbone.radio')
    ;

// -- Project Modules
const SearchView = require('./views/searchView.js')
    , log = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
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
