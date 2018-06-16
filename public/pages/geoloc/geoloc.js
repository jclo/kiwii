/* global */
/* eslint one-var: 0, semi-style: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import GeolocView from './views/geolocView';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const { level } = config.logger
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Geoloc = function() {
  //
};

// Methods
Geoloc.prototype = {

  // Initializes the module.
  init(app) {
    // Creates the module view:
    const geoView = new GeolocView(app, mainc);
    log.init('geoloc', level, false);
    log.trace('the content of the page is updated.');

    // Wait for the side menu totally hidden before displaying coordinates:
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
