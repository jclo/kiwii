/* global StatusBar */
/* eslint */

// -- Vendor modules
import $ from 'zepto';
import Backbone from 'backbone';
// Even if ratchet.js is a IIFE, we need ot define it here otherwise
// it isn't browserified with the other js files.
import Ratchet from 'ratchet';

//Backbone’s jQuery reference needs to be set.
Backbone.$ = $;

// -- Project Modules
import Router from './router.js';
import log from '../lib/logger.js';
import Config from './config.js';

// -- Variables
var level = Config.level
  ;

// -- Main section

// Set IOS Status Bar to light (require plugin cordova-plugin-statusbar).
if (typeof StatusBar !== 'undefined')
  StatusBar.styleLightContent();

// Start Backbone.
new Router();
Backbone.history.start();
log.init('app', level, false);
log.trace('Router & Backbone history started...');
