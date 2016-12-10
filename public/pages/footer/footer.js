/* global */
/* eslint one-var: 0 */

// -- Vendor modules

// -- Project Modules
const FooterView = require('./views/footerView.js')
    , log = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
    ;

// -- Main section
const Footer = function() {
  //
};

// Methods
Footer.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.footer = new FooterView();
    log.init('footer', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Footer;
