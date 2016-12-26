/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import LegalView from './views/legalView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Legal = function() {
  //
};

// Methods
Legal.prototype = {

  // Initializes the module.
  init(app) {
    // Creates the module view.
    this.legal = new LegalView(app, mainc);
    log.init('legal', level, false);
    log.trace('the content of the page is updated...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Legal;
