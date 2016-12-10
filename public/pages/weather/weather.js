/* global */
/* eslint one-var: 0 */

// -- Vendor modules
const Radio = require('backbone.radio')
    ;

// -- Project Modules
const WeatherView  = require('./views/weatherView.js')
    , WeatherModel = require('./models/weatherModel.js')
    , log          = require('../../lib/logger.js')
    ;

// -- Variables
const level = require('../../js/config.js').level
    , mainc = Radio.channel('mainc')
    ;

// -- Main section
const Weather = function() {
  //
};

// Methods
Weather.prototype = {

  // Initializes the module.
  init() {
    // Creates the module model and view.
    const model = new WeatherModel();
    this.weather = new WeatherView({ model, mailbox: mainc });
    log.init('weather', level, false);
    log.trace('Created model & view...');
  },

  // Stops the module.
  destroy() {
    // stuff here.
  },
};

module.exports = Weather;
