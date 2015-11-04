/* global */
/* eslint */
'use strict';

// -- Vendor modules
var $        = require('zepto')
  , Backbone = require('backbone')
  , Radio    = require('backbone.radio')
  ;

// -- Project Modules
var framework = require('../pages/framework/templates/framework.hbs')
  , Header    = require('../pages/header/header.js')
  , Footer    = require('../pages/footer/footer.js')
  , Home      = require('../pages/home/home.js')
  , Search    = require('../pages/search/search.js')
  , Settings  = require('../pages/settings/settings.js')
  , Geoloc    = require('../pages/geoloc/geoloc.js')
  , Weather   = require('../pages/weather/weather.js')
  , Legal     = require('../pages/legal/legal.js')
  , Menu      = require('../pages/menu/menu.js')
  , log       = require('../lib/logger.js')
  ;

// -- Variables
var level            = require('./config.js').level
  , mainc            = Radio.channel('mainc')
  , urlHistory       = []
  , menuShiftDelay   = 1000
  , isSideMenuOpened = false
  ;

// -- Main section
module.exports = Backbone.Router.extend({

  // Set routes.
  routes: {
    '':         'home',
    'home':     'home',
    'search':   'search',
    'profile':  'profile',
    'favorite': 'favorite',
    'settings': 'settings',
    'geoloc':   'geoloc',
    'weather':  'weather',
    'legal':    'legal',
    'menu':     'menu'
  },

  // Initialize the router.
  initialize: function() {
    var header,
        footer,
        menu;

    // Print skeleton.
    $('.container').empty().append(framework());

    // Add header.
    header = new Header();
    header.init();

    // Add footer.
    footer = new Footer();
    footer.init();

    // Add menu.
    menu = new Menu();
    menu.init();

    // logging.
    log.init('router', level, false);
    log.trace('Initialization done...');
  },

  // Home page.
  home: function() {
    var home;

    this.pushUrl(Backbone.history.fragment);
    home = new Home();
    home.init();
    this.shiftMenu('hide');
  },

  // Search page.
  search: function() {
    var search;

    this.pushUrl(Backbone.history.fragment);
    search = new Search();
    search.init();
    this.shiftMenu('hide');
  },

  // Profile page.
  profile: function() {
    this.pushUrl(Backbone.history.fragment);
    this.shiftMenu('hide');
  },

  // Favorite page.
  favorite: function() {
    this.pushUrl(Backbone.history.fragment);
    this.shiftMenu('hide');
  },

  // Settings page.
  settings: function() {
    var settings;

    this.pushUrl(Backbone.history.fragment);
    settings = new Settings();
    settings.init();
    this.shiftMenu('hide');
  },

  // Geoloc page.
  geoloc: function() {
    var geoloc;

    this.pushUrl(Backbone.history.fragment);
    geoloc = new Geoloc();
    geoloc.init();
    this.shiftMenu('hide');
  },

  // Weather page.
  weather: function() {
    var weather;

    this.pushUrl(Backbone.history.fragment);
    weather = new Weather();
    weather.init();
    this.shiftMenu('hide');
  },

  // Legal page.
  legal: function() {
    var legal;

    this.pushUrl(Backbone.history.fragment);
    legal = new Legal();
    legal.init();
    this.shiftMenu('hide');
  },

  // Menu button.
  menu: function() {
    var previousUrl;

    // Toggle sidemenu.
    // If the sidemenu is made visible, we replace the fragment url
    // by an inexistent route, otherwise a second click on the menu
    // button won't fire an event. If the side menu is made hidden,
    // we restitute the 'original' fragment url without refreshing
    // the page (refresh is: 'this.navigate(previousUrl, true)').
    this.shiftMenu('toggle');
    if (isSideMenuOpened === true) {
      this.navigate('sidemenu');
    } else {
      previousUrl = urlHistory[urlHistory.length - 1];
      if (previousUrl === 'undefined') {
        this.navigate('home');
      }
      else {
        this.navigate(previousUrl);
      }
    }
  },

  // Open or close the side menu.
  shiftMenu: function(action) {
    if (action === 'hide') {
      // Hide the side menu.
      $('header').removeClass('right');
      $('.content').removeClass('right');
      $('footer').removeClass('right');
      isSideMenuOpened = false;

    } else {
      // toggle.
      // We prefer to rely on the presence or the absence of the
      // class 'right' to determine the position of the side menu.
      if ($('.content').attr('class').match(/right/) === null) {
        // sidemenu hidden, make it visible.
        $('header').addClass('right');
        $('.content').addClass('right');
        $('footer').addClass('right');
        isSideMenuOpened = true;
      } else {
        // side menu visible, hidden it.
        $('header').removeClass('right');
        $('.content').removeClass('right');
        $('footer').removeClass('right');
        isSideMenuOpened = false;
      }
    }

    // Publish a message when side menu is totally open or closed.
    // This could be useful for actions that have to be delayed until
    // the side menu is totally closed or open.
    setTimeout(function() {
      mainc.trigger('sidemenu:ready');
    }, menuShiftDelay);
  },

  // Save the route history.
  // Limit the size to prevent a memory leak.
  pushUrl: function(route) {
    if (urlHistory.length >= 10) {
      urlHistory.shift();
    }
    urlHistory.push(route);
  }
});
