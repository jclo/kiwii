/* global */
/* eslint one-var: 0 */

// -- Vendor modules

// -- Project Modules
import MenuView from './views/menuView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level;

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
