/* global */
/* eslint one-var: 0, no-underscore-dangle: 0 */

// -- Vendor modules
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const $        = require('zepto')
    , Backbone = require('backbone')
    , _        = require('lodash')
    ;
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

// -- Project Modules
const template = require('../templates/header.hbs')
    ;

// -- Variables
let title
  , _this
  ;

// -- Main section
module.exports = Backbone.View.extend({
  el: 'header',

  events: {
  },

  initialize(mailbox) {
    _this = this;
    // Fixes loss of context for 'this' within methods.
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.render();

    mailbox.on('header:title', (data) => {
      title = data;
      _this.render();
    });
  },

  render() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title }));
  },
});
