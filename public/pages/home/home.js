/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import HomeView from './views/homeView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Home = function() {
  //
};

// Methods
Home.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.home = new HomeView(mainc);
    log.init('home', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Home;
