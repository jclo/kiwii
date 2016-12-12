/* global */
/* eslint max-len: [1, 210, 2] */

// -- Vendor modules
import Backbone from 'backbone';

// -- Project Modules

// -- Variables

// -- Main section
module.exports = Backbone.Model.extend({
  // REST API to get Paris' weather.
  urlRoot: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22paris%2C%20fr%22)&format=json',
  defaults: {
  },

  initialize() {
    // stuff here.
  },
});
