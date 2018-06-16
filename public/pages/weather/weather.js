/* global */
/* eslint one-var: 0, semi-style: 0 */

// -- Vendor modules
import Radio from 'backbone.radio';

// -- Project Modules
import WeatherView from './views/weatherView';
import WeatherModel from './models/weatherModel';
import log from '../../lib/logger';
import config from '../../js/config';

// -- Variables
const { level } = config.logger
    , mainc     = Radio.channel('mainc')
    ;

// -- Main section
const Weather = function() {
  //
};

// Methods
Weather.prototype = {

  // Initializes the module.
  init(app) {
    // Creates the module model and view:
    const model = new WeatherModel();
    this.weather = new WeatherView(app, model, mainc);
    log.init('weather', level, false);
    log.trace('the content of the page is updated...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Weather;
