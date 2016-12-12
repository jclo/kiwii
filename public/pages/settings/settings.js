/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import SettingsView from './views/settingsView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Settings = function() {
  //
};

// Methods
Settings.prototype = {

  // Initializes the module.
  init() {
    // Creates the module view.
    this.settings = new SettingsView(mainc);
    log.init('settings', level, false);
    log.trace('Created view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Settings;
