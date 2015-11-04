/* global */
/* eslint */
'use strict';

// -- Vendor modules
var $        = require('zepto')
  , Backbone = require('backbone')
  , _        = require('lodash')
  ;

// -- Project Modules
var template = require('../templates/header.hbs')
  ;

// -- Variables
var title
  , _this
  ;

// -- Main section
module.exports = Backbone.View.extend({
  el: 'header',

  events: {
  },

  initialize: function(mailbox) {
    _this = this;
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render();

    mailbox.on('header:title', function(data) {
      title = data;
      _this.render();
    });
  },

  render: function() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title: title }));
  }
});
