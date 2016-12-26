/* global */
/* eslint one-var: 0 */

// -- Vendor modules
import Backbone from 'backbone';
import Radio from 'backbone.radio';

// -- Project Modules
import App from '../app/app';
import Home from '../pages/home/home';
import Search from '../pages/search/search';
import Settings from '../pages/settings/settings';
import Geoloc from '../pages/geoloc/geoloc';
import Weather from '../pages/weather/weather';
import Legal from '../pages/legal/legal';
import log from '../lib/logger';
import config from './config';

// -- Variables
const level            = config.logger.level
    , mainc            = Radio.channel('mainc')
    , urlHistory       = []
    , menuShiftDelay   = 1000
    ;

let isSideMenuOpened = false
  , app
  ;

// -- Main section
module.exports = Backbone.Router.extend({

  // Set routes.
  /* eslint-disable key-spacing */
  routes: {
    '':       'home',
    home:     'home',
    search:   'search',
    profile:  'profile',
    favorite: 'favorite',
    settings: 'settings',
    geoloc:   'geoloc',
    weather:  'weather',
    legal:    'legal',
    menu:     'menu',
  },
  /* eslint-enable key-spacing */

  // Create App.
  initialize() {
    // logging:
    log.init('router', level, false);
    log.trace('the initialization is done...');
    app = new App();
    app.init();
  },

  // Home page
  home() {
    this.pushUrl(Backbone.history.fragment);
    const home = new Home();
    home.init(app);
    this.closeMenu();
  },

  // Search page.
  search() {
    this.pushUrl(Backbone.history.fragment);
    const search = new Search();
    search.init(app);
    this.closeMenu();
  },

  // Profile page.
  profile() {
    this.pushUrl(Backbone.history.fragment);
    this.closeMenu();
  },

  // Favorite page.
  favorite() {
    this.pushUrl(Backbone.history.fragment);
    this.closeMenu();
  },

  // Settings page.
  settings() {
    this.pushUrl(Backbone.history.fragment);
    const settings = new Settings();
    settings.init(app);
    this.closeMenu();
  },

  // Geoloc page.
  geoloc() {
    this.pushUrl(Backbone.history.fragment);
    const geoloc = new Geoloc();
    geoloc.init(app);
    this.closeMenu();
    // Send a message to Geoloc when the menu is fully hidden:
    this.sayMenuReady();
  },

  // Weather page.
  weather() {
    this.pushUrl(Backbone.history.fragment);
    const weather = new Weather();
    weather.init(app);
    this.closeMenu();
  },

  // Legal page.
  legal() {
    this.pushUrl(Backbone.history.fragment);
    const legal = new Legal();
    legal.init(app);
    this.closeMenu();
  },

  // Menu button.
  menu() {
    // Toggle the sidemenu.
    // If the sidemenu is made visible, we replace the fragment url
    // by an inexistent route, otherwise a second click on the menu
    // button won't fire an event. If the side menu is made hidden,
    // we restitute the 'original' fragment url without refreshing
    // the page (refresh is: 'this.navigate(previousUrl, true)').
    if (!isSideMenuOpened) {
      // Open the side menu:
      app.openMenu();
      isSideMenuOpened = true;
      this.navigate('sidemenu');
    } else {
      app.closeMenu();
      isSideMenuOpened = false;
      const previousUrl = urlHistory[urlHistory.length - 1];
      if (previousUrl === 'undefined') {
        this.navigate('home');
      } else {
        this.navigate(previousUrl);
      }
    }
  },

  // Hide the menu.
  closeMenu() {
    if (isSideMenuOpened) {
      app.closeMenu();
      isSideMenuOpened = false;
    }
  },

  // Publish a message when side menu is totally open or closed.
  // This could be useful for actions that have to be delayed until
  // the side menu is totally closed or open.
  sayMenuReady() {
    setTimeout(() => {
      mainc.trigger('sidemenu:ready');
    }, menuShiftDelay);
  },

  // Save the route history.
  // Limit the size to prevent a memory leak.
  pushUrl(route) {
    if (urlHistory.length >= 10) {
      urlHistory.shift();
    }
    urlHistory.push(route);
  },
});
