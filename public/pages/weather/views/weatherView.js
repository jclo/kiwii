/* global */
/* eslint max-len: [1, 110, 2] */
'use strict';

// -- Vendor modules
var $        = require('zepto')
  , Backbone = require('backbone')
  , _        = require('lodash')
  ;

// -- Project Modules
var template = require('../templates/weather.hbs')
  ;

// -- Variables
// Eiffel Tower Live Web Cam (tps = current time in seconds from 1970).
var eiffelurl = 'http://www.parisapartment7eme.com/image_r.jpg?tps=';

// -- Main section
module.exports = Backbone.View.extend({
  el: '.content',

  events: {
  },

  initialize: function(opt) {
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render();
    // Ask the Header module to update the title.
    opt.mailbox.trigger('header:title', 'Weather');
  },

  render: function() {
    var _this = this
      ;

    // Get Yahoo data then render.
    this.model.fetch({
      success: function() {
        var date     = new Date()
          , time     = date.getTime()
          , code     = _this.model.attributes.query.results.channel.item.condition.code
          , text     = _this.model.attributes.query.results.channel.item.condition.text
          , tempF    = _this.model.attributes.query.results.channel.item.condition.temp
          , tempC    = parseInt((tempF - 32) / (9 / 5), 10)
          , humidity = _this.model.attributes.query.results.channel.atmosphere.humidity
          , pressure = _this.model.attributes.query.results.channel.atmosphere.pressure * 3376.85 / 100
          , wind     = parseInt(_this.model.attributes.query.results.channel.wind.speed * 1.609344, 10)
          ;

        // Update view.
        $(_this.el).html(template({
          url:         eiffelurl + time,
          icon:        _this._getIcon(code),
          description: text,
          temperature: tempC + '°C',
          humidity:    ' ' + humidity,
          pressure:    ' ' + pressure.toFixed(1) + ' hPa',
          wind:        ' ' + wind + ' km/h',
          color:       _this._getColor()
        }));
      },
      error: function() {
        // No stuff.
      }
    });
  },

  _getIcon: function(code) {
    var yahoocode = {
      0:  'wi-tornado',                // tornado
      1:  'wi-thunderstorm',           // tropical storm
      2:  '',       // hurricane
      3:  'wi-thunderstorm',           // severe thunderstorms
      4:  'wi-thunderstorm',           // thunderstorms
      5:  '',       // mixed rain and snow
      6:  '',       // mixed rain and sleet
      7:  '',       // mixed snow and sleet
      8:  '',       // freezing drizzle
      9:  '',       // drizzle
      10: '',       // freezing rain
      11: 'wi-showers',                // showers
      12: 'wi-showers',                // showers
      13: '',       //  snow flurries
      14: '',       //  light snow showers
      15: '',       //  blowing snow
      16: 'wi-snow',                   // snow
      17: 'wi-hail',                   // hail
      18: 'wi-sleet',                  // sleet
      19: 'wi-dust',                   // dust
      20: 'wi-fog',                    // foggy
      21: '',       //  haze
      22: 'wi-smoke',                  // smoky
      23: '',       //  blustery
      24: 'wi-windy',                  // windy
      25: '',       //  cold
      26: 'wi-cloudy',                 // cloudy
      27: 'wi-night-cloudy',           // mostly cloudy (night)
      28: 'wi-day-cloudy',             // mostly cloudy (day)
      29: 'wi-night-partly-cloudy',    // partly cloudy (night)
      30: 'wi-day-cloudy-high',        // partly cloudy (day)
      31: 'wi-night-clear',            // clear (night)
      32: 'wi-day-sunny',              // sunny
      33: '',       //  fair (night)
      34: '',       //  fair (day)
      35: '',       //  mixed rain and hail
      36: '',       //  hot
      37: '',       //  isolated thunderstorms
      38: '',       //  scattered thunderstorms
      39: '',       //  scattered thunderstorms
      40: '',       //  scattered showers
      41: '',       //  heavy snow
      42: '',       //  scattered snow showers
      43: '',       //  heavy snow
      44: 'wi-day-cloudy-high',        // partly cloudy
      45: '',       //  thundershowers
      46: '',       //  snow showers
      47: ''        //  isolated thundershowers
      // 3200: '',  //  not available
    };
    return yahoocode[code];
  },

  _getColor() {
    // This could be more accurate by using sunrise and sunset.
    // (query.results.channel.astronomy).
    var d = new Date();
    if (d.getHours() >= 8 && d.getHours() <= 18)
      return 'yellow';
    else
      return 'white';
  }

});
