/* global StatusBar */
/* eslint no-new: 0, semi-style: 0 */

// -- Vendor modules
import Backbone from 'backbone';
import $ from 'zepto';
// Even if ratchet.js is a IIFE, we need ot define it here otherwise
// it isn't browserified with the other js files.
/* eslint-disable import/no-extraneous-dependencies, no-unused-vars,
  import/no-unresolved, import/extensions */
import Ratchet from 'ratchet';
/* eslint-enable import/no-extraneous-dependencies, no-unused-vars,
  import/no-unresolved, import/extensions */

// -- Project Modules
import Router from './router';
import log from '../lib/logger';
import config from './config';

// Backbone’s jQuery reference needs to be set.
Backbone.$ = $;

// -- Variables
const { level } = config.logger
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
