/* global */
/* eslint one-var: 0, no-underscore-dangle: 0, max-len: [1, 110, 2] */
/* eslint one-var-declaration-per-line: 0 */

// -- Vendor modules
import Backbone from 'backbone';
import _ from 'lodash';

// -- Project Modules
import Weather from '../components/body';

// -- Variables
// Eiffel Tower Live Web Cam (tps = current time in seconds from 1970).
const eiffelurl = 'http://www.parisapartment7eme.com/image_r.jpg?tps=';


// -- Private functions

const _getIcon = function(code) {
  /* eslint-disable key-spacing, no-multi-spaces */
  const yahoocode = {
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
    47: '',       //  isolated thundershowers
    // 3200: '',  //  not available
  };
  /* eslint-enable key-spacing, no-multi-spaces */
  return yahoocode[code];
};

const _getColor = function() {
  // This could be more accurate by using sunrise and sunset.
  // (query.results.channel.astronomy).
  const d = new Date();
  if (d.getHours() >= 8 && d.getHours() <= 18) {
    return 'yellow';
  }
  return 'white';
};

const _getPreliminaryData = function() {
  const date = new Date();
  const time = date.getTime();
  return {
    url: eiffelurl + time,
    icon: _getIcon(0),
    description: '???',
    temperature: `${'???'}°C`,
    humidity: ` ${'???'}`,
    pressure: ` ${0} hPa`,
    wind: ` ${'???'} km/h`,
    color: _getColor(),
  };
};

const _fetch = function(model) {
  const p = new Promise((resolve, reject) => {
    // Get data from Yahoo:
    model.fetch({
      success() {
        let date, time, code, text, tempF, tempC, humidity, pressure, wind;

        if (model.attributes.query.results) {
          /* eslint-disable prefer-destructuring */
          date = new Date();
          time = date.getTime();
          code = model.attributes.query.results.channel.item.condition.code;
          text = model.attributes.query.results.channel.item.condition.text;
          tempF = model.attributes.query.results.channel.item.condition.temp;
          tempC = parseInt((tempF - 32) / (9 / 5), 10);
          humidity = model.attributes.query.results.channel.atmosphere.humidity;
          pressure = (model.attributes.query.results.channel.atmosphere.pressure * 3376.85) / 100;
          wind = parseInt(model.attributes.query.results.channel.wind.speed * 1.609344, 10);
          /* eslint-enable prefer-destructuring */
        } else {
          date = new Date();
          time = date.getTime();
          code = 0;
          text = '???';
          tempF = '???';
          tempC = '???';
          humidity = '???';
          pressure = 0;
          wind = '???';
        }

        resolve({
          url: eiffelurl + time,
          icon: _getIcon(code),
          description: text,
          temperature: `${tempC}°C`,
          humidity: ` ${humidity}`,
          pressure: ` ${pressure.toFixed(1)} hPa`,
          wind: ` ${wind} km/h`,
          color: _getColor(),
        });
      },
      error() {
        reject();
      },
    });
  });
  return p;
};


// -- Main section
module.exports = Backbone.View.extend({
  el: '',

  events: {
  },

  initialize(app, model) {
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render(app, model);
  },

  render(app, model) {
    // Update the page with the preliminary data:
    app.setTitle('Weather');
    app.setContent(Weather, _getPreliminaryData());

    // Get info on weather:
    _fetch(model)
      .then((data) => {
        // Update the page with the received data:
        app.setContent(Weather, data);
      })
      .catch(() => {
        //
      });
  },
});
