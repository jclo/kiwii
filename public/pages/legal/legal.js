/* global */
/* eslint one-var: 0 */

// -- Vendor modules
const Radio = require('backbone.radio')
    ;

// -- Project Modules
const LegalView = require('./views/legalView.js')
    , log = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Legal = function() {
  //
};

// Methods
Legal.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.legal = new LegalView(mainc);
    log.init('legal', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Legal;
