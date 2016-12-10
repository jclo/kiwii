/* global */
/* eslint one-var: 0 */

// -- Vendor modules
const Radio = require('backbone.radio')
    ;

// -- Project Modules
const HomeView = require('./views/homeView.js')
    , log      = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
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
