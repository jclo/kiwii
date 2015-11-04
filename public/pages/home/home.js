/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var HomeView = require('./views/homeView.js')
  , log      = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Home = function() {
  //
};

// Methods
Home.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module view.
    this.home = new HomeView(mainc);
    log.init('home', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Home;
