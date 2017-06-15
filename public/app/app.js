/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import AppView from './views/appView';
import log from '../lib/logger';
import config from '../js/config';

// -- Variables
const level = config.logger.level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const App = function() {
  //
};

// Methods
App.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.view = new AppView(mainc);
    log.init('App', level, false);
    log.trace('the app is created...');
  },

  // Sets and updates the title of the App.
  setTitle(title) {
    this.view.setTitle(title);
    log.init('App', level, false);
    log.trace('the title is updated...');
  },

  // Sets and updates the body content of the App.
  setContent(content, options) {
    this.view.setContent(content, options);
    log.init('App', level, false);
    log.trace('the content is updated...');
  },

  // Makes the side menu visible.
  openMenu() {
    this.view.openMenu();
    log.init('App', level, false);
    log.trace('the menu is opened...');
  },

  // Makes the side menu invisible.
  closeMenu() {
    this.view.closeMenu();
    log.init('App', level, false);
    log.trace('the menu is closed...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = App;
