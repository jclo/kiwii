
// -- Vendor modules
import Backbone from 'backbone';
import _ from 'lodash';

// -- Project Modules
import Home from '../components/body';

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
    app.setTitle('Home');
    // Updates the content of the app:
    app.setContent(Home);
  },
});
