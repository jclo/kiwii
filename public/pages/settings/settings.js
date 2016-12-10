/* global */
/* eslint one-var: 0 */

// -- Vendor modules
const Radio = require('backbone.radio')
    ;

// -- Project Modules
const SettingsView = require('./views/settingsView.js')
    , log = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Settings = function() {
  //
};

// Methods
Settings.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.settings = new SettingsView(mainc);
    log.init('settings', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Settings;
