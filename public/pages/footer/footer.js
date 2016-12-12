/* global */
/* eslint one-var: 0 */

// -- Vendor modules

// -- Project Modules
import FooterView from './views/footerView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level;

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
