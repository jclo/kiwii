/* global */
/* eslint */
'use strict';

// -- Vendor modules

// -- Project Modules
var MenuView = require('./views/menuView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  ;

// -- Main section
var Menu = function() {
  //
};

// Methods
Menu.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module view.
    this.menu = new MenuView();
    log.init('menu', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Menu;
