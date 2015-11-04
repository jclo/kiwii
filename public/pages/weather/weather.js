/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var WeatherView  = require('./views/weatherView.js')
  , WeatherModel = require('./models/weatherModel.js')
  , log          = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Weather = function() {
  //
};

// Methods
Weather.prototype = {

  // Initializes the module.
  init: function() {
    // Creates the module model and view.
    var model = new WeatherModel();
    this.weather = new WeatherView({ model: model, mailbox: mainc });
    log.init('weather', level, false);
    log.trace('Created model & view...');
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Weather;
