/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import GeolocView from './views/geolocView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const level = config.logger.level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Geoloc = function() {
  //
};

// Methods
Geoloc.prototype = {

  // Initializes the module.
  init() {
    // var geoView;

    // Creates the module view.
    const geoView = new GeolocView(mainc);
    log.init('geoloc', level, false);
    log.trace('Created view...');

    // Wait for the side menu hidden totally hidden.
    mainc.once('sidemenu:ready', () => {
      geoView.displayCoords();
    });
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Geoloc;
