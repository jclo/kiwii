/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var LegalView = require('./views/legalView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Legal = function() {
  //
};

// Methods
Legal.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module view.
    this.legal = new LegalView(mainc);
    log.init('legal', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Legal;
