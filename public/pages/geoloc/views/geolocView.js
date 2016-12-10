/* global alert, navigator */
/* eslint one-var: 0, no-alert: 0 */

// -- Vendor modules
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const $        = require('zepto')
    , Backbone = require('backbone')
    , _        = require('lodash')
    ;
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

// -- Project Modules
const template = require('../templates/geoloc.hbs')
    ;

// -- Variables

// -- Main section
module.exports = Backbone.View.extend({
  el: '.content',

  events: {
  },

  initialize(mailbox) {
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render();
    // Ask the Header to update the title.
    mailbox.trigger('header:title', 'Your Location');
  },

  render() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title: '...' }));
  },

  // Pop up the current location.
  displayCoords() {
    // Read position.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(`${position.coords.latitude}, ${position.coords.longitude}`);
      },
      () => {
        alert('Error getting location');
      },
    );
  },
});
