/* global */
/* eslint one-var: 0 */

// -- Vendor modules
const Radio = require('backbone.radio')
    ;

// -- Project Modules
const HeaderView = require('./views/headerView.js')
    , log = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Header = function() {
  //
};

// Methods
Header.prototype = {

  // Initializes the module.
  init() {
    // Create Module View
    this.header = new HeaderView(mainc);
    log.init('header', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Header;
