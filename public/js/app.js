/* global StatusBar */
/* eslint no-new: 0 */

// -- Vendor modules
import Backbone from 'backbone';
/* eslint-disable import/no-extraneous-dependencies, no-unused-vars,
  import/no-unresolved, import/extensions */
import $ from 'zepto';
// Even if ratchet.js is a IIFE, we need ot define it here otherwise
// it isn't browserified with the other js files.
import Ratchet from 'ratchet.js';
/* eslint-enable import/no-extraneous-dependencies, no-unused-vars,
  import/no-unresolved, import/extensions */

// -- Project Modules
import Router from './router';
import log from '../lib/logger';
import config from './config';

// Backbone’s jQuery reference needs to be set.
Backbone.$ = $;

// -- Variables
const level = config.logger.level
    ;

// -- Main section

// Set IOS Status Bar to light (require plugin cordova-plugin-statusbar).
if (typeof StatusBar !== 'undefined') {
  StatusBar.styleLightContent();
}

// Start Backbone.
new Router();
Backbone.history.start();
log.init('app', level, false);
log.trace('Router & Backbone history started...');
