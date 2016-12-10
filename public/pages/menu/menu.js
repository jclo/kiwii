/* global */
/* eslint one-var: 0 */

// -- Vendor modules

// -- Project Modules
const MenuView = require('./views/menuView.js')
    , log = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
    ;

// -- Main section
const Menu = function() {
  //
};

// Methods
Menu.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.menu = new MenuView();
    log.init('menu', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Menu;
