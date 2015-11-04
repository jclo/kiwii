/* global */
/* eslint */
'use strict';

// -- Vendor modules

// -- Project Modules
var FooterView = require('./views/footerView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  ;

// -- Main section
var Footer = function() {
  //
};

// Methods
Footer.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module view.
    this.footer = new FooterView();
    log.init('footer', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Footer;
