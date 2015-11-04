/* ****************************************************************************
* Logger v0.0.1
*
* Logger is a minimal lightweight logging for JavaScript.
* Copyright (c) 2014-2015 Artelsys (www.artelsys.com).
* Released under the MIT license. You may obtain a copy of the License'
* at: http://www.opensource.org/licenses/mit-license.php).
* ****************************************************************************/
/* global define, module */
/* eslint curly: 0, no-console: 0, max-len: [1, 120, 2] */
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([''], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals.
    root.Logger = factory();
  }
}(this, function() {
  'use strict';

  // Globals variables and constants.
  // (inside the module scope)
  var VERSION = '0.0.1',
      DEFAULT_LEVEL = 'trace',
      LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'off'];

  var Logger = function() {};

  Logger = {

    help: function() {

      var help = ['',
        'Prints a log message formatted as: [year-month-day] [level] name message,',
        'Methods:',
        '  help(): print this message,',
        '  version(): return the version number,',
        '  init(name, level, highlight): set the name, the threshold level and the output color,',
        '  trace(msg): print the trace message,',
        '  debug(msg): print the debug message,',
        '  info(msg): print the info message,',
        '  warn(msg): print the warn message,',
        '  error(msg): print the error message,',
        '  fatal(msg): print the fatal message,',

        ''
      ].join('\n');

      console.log(help);
    },

    _print: function(msg, currentlevel) {
      var levels,
          colors,
          date,
          stringDate;

      levels = Logger._levels();
      colors = [32, 36, 34, 33, 35, 31, 0];
      date = new Date();
      stringDate = '[' + date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds() + ':'
                       + date.getMilliseconds() + ']';

      if (typeof this.level === undefined)
        this.level = Logger._default();

      if (typeof this.highlight === undefined)
        this.highlight = true;

      if (levels.indexOf(currentlevel) >= levels.indexOf(this.level)) {
        if (this.highlight === true) {
          console.log(stringDate + ' [' + currentlevel + '] '
                                 + '\u001b[1;' + colors[levels.indexOf(currentlevel)]
                                 + 'm' + this.name + ':\u001b[0m ' + msg);
        } else {
          console.log(stringDate + ' [' + currentlevel + '] ' + this.name + ': ' + msg);
        }
        if (typeof msg === 'object') {
          // to visualize content of the object instead of [object Object] only.
          console.log(msg);
        }
      }

    },

    _levels: function() {
      return LEVELS;
    },

    _default: function() {
      return DEFAULT_LEVEL;
    },

    version: function() {
      return VERSION;
    },

    init: function(name, level, highlight) {
      this.name = name;
      this.level = level;
      this.highlight = highlight;
    },

    trace: function(msg) {
      Logger._print(msg, 'trace');
    },

    debug: function(msg) {
      Logger._print(msg, 'debug');
    },

    info: function(msg) {
      Logger._print(msg, 'info');
    },

    warn: function(msg) {
      Logger._print(msg, 'warn');
    },

    error: function(msg) {
      Logger._print(msg, 'error');
    },

    fatal: function(msg) {
      Logger._print(msg, 'fatal');
    }

  };

  // Just return a value to define the module export.
  // This example returns a function as the exported
  // value but the module can return an object.
  return Logger;

}));
