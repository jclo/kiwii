/* global alert, navigator */
/* eslint one-var: 0, no-alert: 0 */

// -- Vendor modules
import Backbone from 'backbone';
import _ from 'lodash';

// -- Project Modules
import Geoloc from '../components/body';

// -- Variables

// -- Main section
module.exports = Backbone.View.extend({
  el: '',

  events: {
  },

  initialize(app) {
    // Fixes loss of context for 'this' within methods:
    _.bindAll(this, 'render');
    // Not all views are self-rendering. This one is:
    this.render(app);
  },

  render(app) {
    // Updates the title of the app:
    app.setTitle('Your Location');
    // Updates the content of the app:
    app.setContent(Geoloc, { title: 'Location:', text: 'Bla bla' });
  },

  // Pop up the current location:
  displayCoords() {
    // Read the position:
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
