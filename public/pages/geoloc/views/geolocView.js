/* global */
/* eslint */
'use strict';

// -- Vendor modules
var $        = require('zepto')
  , Backbone = require('backbone')
  , _        = require('lodash')
  ;

// -- Project Modules
var template = require('../templates/geoloc.hbs')
  ;

// -- Variables

// -- Main section
module.exports = Backbone.View.extend({
  el: '.content',

  events: {
  },

  initialize: function(mailbox) {
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render();
    // Ask the Header to update the title.
    mailbox.trigger('header:title', 'Your Location');
  },

  render: function() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title: '...' }));
  },

  // Pop up the current location.
  displayCoords: function() {

    // Read position.
    navigator.geolocation.getCurrentPosition(
      function(position) {
        alert(position.coords.latitude + ',' + position.coords.longitude);
      },
      function() {
        alert('Error getting location');
      }
    );
  }
});
