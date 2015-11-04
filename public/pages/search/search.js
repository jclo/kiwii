/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var SearchView = require('./views/searchView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Search = function() {
  //
};

// Methods
Search.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module view.
    this.search = new SearchView(mainc);
    log.init('search', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Search;
