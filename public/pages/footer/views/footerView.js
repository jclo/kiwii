/* global */
/* eslint */
'use strict';

// -- Vendor modules
var $        = require('zepto')
  , Backbone = require('backbone')
  , _        = require('lodash')
  ;

// -- Project Modules
var template = require('../templates/footer.hbs')
  ;

// -- Variables

// -- Main section
module.exports = Backbone.View.extend({
  el: 'footer',

  events: {
  },

  initialize: function() {
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render();
  },

  render: function() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title: '...' }));
  }

});
