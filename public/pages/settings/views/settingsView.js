/* global */
/* eslint one-var: 0 */

// -- Vendor modules
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import $ from 'zepto';
import Backbone from 'backbone';
import _ from 'lodash';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

// -- Project Modules
import template from '../templates/settings.hbs';

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
    // Ask the Header module to update the title.
    mailbox.trigger('header:title', 'Settings');
  },

  render() {
    // Prints the Handlebars template.
    $(this.el).html(template({ title: '' }));
  },
});
