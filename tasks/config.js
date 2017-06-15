/* eslint one-var: 0 */

// -- Node modules

// -- Local modules

// -- Local constants
const name    = require('../package.json').name
    , release = require('../package.json').version
    , source  = './public'
    , dist    = './_dist'
    ;


// -- Configuration file for Gulp
module.exports = {
  // Generic (shared between Gulp tasks):
  name,
  release,
  source,
  dist,
  lib: `${source}/js`,
  bundle: 'wapp',

  // Specific to browserify:
  browserify: {
    app: `${source}/js/main.js`,
    debug: false,
  },

  // Specific to `vendor` task:
  vendor: {
    folder: `${source}/vendor`,
    ratchet: './node_modules/goratchet/dist/**/*',
    weatherIcons: './node_modules/weathericons/**/*',
    fontAwesome: './node_modules/font-awesome/**/*',
  },

  // Specific to `copyproject` task:
  copy: {
    html: `${source}/index.html`,
    cordova: '<script type="text/javascript" src="cordova.js"></script>',
    style: `${source}/css/style.css`,
    img: `${source}/**/img/*`,
    dest: {
      js: `${dist}/js`,
      css: `${dist}/css`,
      img: `${dist}/img`,
    },
    fonts: {
      ratchet: {
        source: `${source}/vendor/ratchet/fonts/*`,
        dest: `${dist}/vendor/ratchet/fonts`,
      },
      weatherIcons: {
        source: `${source}/vendor/weather-icons/font/*`,
        dest: `${dist}/vendor/weather-icons/font`,
      },
      fontAwesome: {
        source: `${source}/vendor/font-awesome/fonts/*`,
        dest: `${dist}/vendor/font-awesome/fonts`,
      },
    },
  },

  // License header:
  license: {
    js: ['/**',
      ` * ${name} v${release}`,
      ' *',
      ` * ${name} is a ...`,
      ' * Copyright (c) 2017 Jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr).',
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' *',
      ' * This file includes third-party code:',
      ' *   . Zepto (http://zeptojs.com)',
      ' *   . Backbone (http://backbonejs.org)',
      ' *   . Backbone.Radio (https://github.com/marionettejs/backbone.radio)',
      ' *   . lodash (https://lodash.com)',
      ' *   . Ratchet (http://goratchet.com)',
      ' */',
      '',
    ].join('\n'),

    css: ['/**',
      ` * ${name} v${release}`,
      ' *',
      ` * ${name} is a ...`,
      ' * Copyright (c) 2017 Jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr).',
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' *',
      ' * This file includes third-party code:',
      ' *   . Ratchet (http://goratchet.com)',
      ' *   . Font-Awesome (http://fontawesome.io)',
      ' *   . Weather Icons (https://erikflowers.github.io/weather-icons)',
      ' */',
      '',
    ].join('\n'),
  },
};
