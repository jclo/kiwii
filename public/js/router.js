/* global */
/* eslint one-var: 0 */

// -- Vendor modules
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import $ from 'zepto';
import Backbone from 'backbone';
import Radio from 'backbone.radio';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

// -- Project Modules
import framework from '../pages/framework/templates/framework.hbs';
import Header from '../pages/header/header';
import Footer from '../pages/footer/footer';
import Home from '../pages/home/home';
import Search from '../pages/search/search';
import Settings from '../pages/settings/settings';
import Geoloc from '../pages/geoloc/geoloc';
import Weather from '../pages/weather/weather';
import Legal from '../pages/legal/legal';
import Menu from '../pages/menu/menu';
import log from '../lib/logger';
import config from './config';

// -- Variables
const level            = config.logger.level
    , mainc            = Radio.channel('mainc')
    , urlHistory       = []
    , menuShiftDelay   = 1000
    ;

let isSideMenuOpened = false;

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

  // Initialize the router.
  initialize() {
    // var header,
    //     footer,
    //     menu;

    // Print skeleton.
    $('.container').empty().append(framework());

    // Add header.
    const header = new Header();
    header.init();

    // Add footer.
    const footer = new Footer();
    footer.init();

    // Add menu.
    const menu = new Menu();
    menu.init();

    // logging.
    log.init('router', level, false);
    log.trace('Initialization done...');
  },

  // Home page.
  home() {
    // var home;

    this.pushUrl(Backbone.history.fragment);
    const home = new Home();
    home.init();
    this.shiftMenu('hide');
  },

  // Search page.
  search() {
    // var search;

    this.pushUrl(Backbone.history.fragment);
    const search = new Search();
    search.init();
    this.shiftMenu('hide');
  },

  // Profile page.
  profile() {
    this.pushUrl(Backbone.history.fragment);
    this.shiftMenu('hide');
  },

  // Favorite page.
  favorite() {
    this.pushUrl(Backbone.history.fragment);
    this.shiftMenu('hide');
  },

  // Settings page.
  settings() {
    // var settings;

    this.pushUrl(Backbone.history.fragment);
    const settings = new Settings();
    settings.init();
    this.shiftMenu('hide');
  },

  // Geoloc page.
  geoloc() {
    // var geoloc;

    this.pushUrl(Backbone.history.fragment);
    const geoloc = new Geoloc();
    geoloc.init();
    this.shiftMenu('hide');
  },

  // Weather page.
  weather() {
    // var weather;

    this.pushUrl(Backbone.history.fragment);
    const weather = new Weather();
    weather.init();
    this.shiftMenu('hide');
  },

  // Legal page.
  legal() {
    // var legal;

    this.pushUrl(Backbone.history.fragment);
    const legal = new Legal();
    legal.init();
    this.shiftMenu('hide');
  },

  // Menu button.
  menu() {
    // var previousUrl;

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
      const previousUrl = urlHistory[urlHistory.length - 1];
      if (previousUrl === 'undefined') {
        this.navigate('home');
      } else {
        this.navigate(previousUrl);
      }
    }
  },

  // Open or close the side menu.
  shiftMenu(action) {
    if (action === 'hide') {
      // Hide the side menu.
      $('header').removeClass('right');
      $('.content').removeClass('right');
      $('footer').removeClass('right');
      isSideMenuOpened = false;
    } else if ($('.content').attr('class').match(/right/) === null) {
      // toggle.
      // We prefer to rely on the presence or the absence of the
      // class 'right' to determine the position of the side menu.
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
    // } else {
    //   // toggle.
    //   // We prefer to rely on the presence or the absence of the
    //   // class 'right' to determine the position of the side menu.
    //   if ($('.content').attr('class').match(/right/) === null) {
    //     // sidemenu hidden, make it visible.
    //     $('header').addClass('right');
    //     $('.content').addClass('right');
    //     $('footer').addClass('right');
    //     isSideMenuOpened = true;
    //   } else {
    //     // side menu visible, hidden it.
    //     $('header').removeClass('right');
    //     $('.content').removeClass('right');
    //     $('footer').removeClass('right');
    //     isSideMenuOpened = false;
    //   }
    // }

    // Publish a message when side menu is totally open or closed.
    // This could be useful for actions that have to be delayed until
    // the side menu is totally closed or open.
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
