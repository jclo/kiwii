/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var SettingsView = require('./views/settingsView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Settings = function() {
  //
};

// Methods
Settings.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module view.
    this.settings = new SettingsView(mainc);
    log.init('settings', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Settings;
