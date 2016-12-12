/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import HeaderView from './views/headerView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level
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
