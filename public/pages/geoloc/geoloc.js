/* global */
/* eslint */
'use strict';

// -- Vendor modules
var Radio = require('backbone.radio')
  ;

// -- Project Modules
var GeolocView = require('./views/geolocView.js')
  , log = require('../../lib/logger.js')
  ;

// -- Variables
var level = require('../../js/config.js').level
  , mainc = Radio.channel('mainc')
  ;

// -- Main section
var Geoloc = function() {
  //
};

// Methods
Geoloc.prototype = {

  // Initializes the module.
  init: function() {
    var geoView;

    // Creates the module view.
    geoView = new GeolocView(mainc);
    log.init('geoloc', level, false);
    log.trace('Created view...');

    // Wait for the side menu hidden totally hidden.
    mainc.once('sidemenu:ready', function() {
      geoView.displayCoords();
    });
  },

  // Stops the module.
  destroy: function() {
    // stuff here.
  }
};

module.exports = Geoloc;
