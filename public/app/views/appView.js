/* global */
/* eslint no-unused-vars: 1 */

// -- Vendor modules
import Backbone from 'backbone';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

// -- Project Modules
import App from '../components/layout';

// -- Variables

// -- Main section
module.exports = Backbone.View.extend({
  el: '',

  events: {
  },

  initialize() {
    // Fixes loss of context for 'this' within methods:
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is.
    this.rendered = this.render();
  },

  // Sets and updates the title of the App.
  setTitle(title) {
    this.rendered.setTitle(title);
  },

  // Sets and updates the body content of the App.
  setContent(content, options) {
    this.rendered.setContent(content, options);
  },

  // Makes the side menu visible.
  openMenu() {
    this.rendered.openMenu();
  },

  // Makes the side menu invisible.
  closeMenu() {
    this.rendered.closeMenu();
  },

  // Creates the virtual DOM of the App.
  render() {
    return ReactDOM.render(
      <App />,
      document.getElementById('app'),
    );
  },
});
