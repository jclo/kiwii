/* global */
/* eslint */
'use strict';

// -- Vendor modules
var $        = require('zepto')
  , Backbone = require('backbone')
  , _        = require('lodash')
  ;

// -- Project Modules
var template = require('../templates/settings.hbs')
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
    // Ask the Header module to update the title.
    mailbox.trigger('header:title', 'Settings');
  },

  render: function() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title: '' }));
  }

});
