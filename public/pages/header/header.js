/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var HeaderView = require('./views/headerView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Header = function() {
  //
};

// Methods
Header.prototype = {

  // Initializes the module.
  init: function() {
    // Create Module View
    this.header = new HeaderView(mainc);
    log.init('header', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Header;
