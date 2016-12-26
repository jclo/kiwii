/* ****************************************************************************
 * gulpfile.js is a script to build an ES6 UMD Module.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2016 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ***************************************************************************/
/* global */
/* eslint one-var: 0 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint prefer-arrow-callback: 0 */
/* eslint strict: 0 */

'use strict';

// -- Node modules
const browserify   = require('browserify')
    , del          = require('del')
    , gulp         = require('gulp')
    , concat       = require('gulp-concat')
    , header       = require('gulp-header')
    , minify       = require('gulp-clean-css')
    , rename       = require('gulp-rename')
    , replace      = require('gulp-replace')
    , sourcemaps   = require('gulp-sourcemaps')
    , uglify       = require('gulp-uglify')
    , gutil        = require('gulp-util')
    , buffer       = require('vinyl-buffer')
    , sourcestream = require('vinyl-source-stream')
    , watchify     = require('watchify')
    ;

// -- Local declarations
const myapp    = 'MyApp'
    , release  = require('./package.json').version
    , source   = './public'
    , dist     = './_dist'
    , html     = 'index.html'
    , bundle   = 'wapp' // require('./package.json').name.toLowerCase()
    , app      = 'app'
    , style    = 'style'
    , cordova  = '<script type="text/javascript" src="cordova.js"></script>'
    ;

// License Header
const licensejs = ['/**',
  ` * ${myapp} v${release}`,
  ' *',
  ` * ${myapp} is a ...`,
  ' * Copyright (c) 2016 John Doe <jdo@johndoe.com> (http://www.johndoe.com).',
  ' * Released under the MIT license. You may obtain a copy of the License',
  ' * at: http://www.opensource.org/licenses/mit-license.php).',
  ' *',
  ' * This file includes third-party code:',
  ' *   . Zepto (http://zeptojs.com)',
  ' *   . Backbone (http://backbonejs.org)',
  ' *   . Backbone.Radio (https://github.com/marionettejs/backbone.radio)',
  ' *   . lodash (https://lodash.com)',
  ' *   . Ratchet (http://goratchet.com)',
  ' *   . React (https://facebook.github.io/react/)',
  ' */',
  '',
].join('\n');

const licensecss = ['/**',
  ` * ${myapp} v${release}`,
  ' *',
  ` * ${myapp} is a ...`,
  ' * Copyright (c) 2016 John Doe <jdo@johndoe.com> (http://www.johndoe.com).',
  ' * Released under the MIT license. You may obtain a copy of the License',
  ' * at: http://www.opensource.org/licenses/mit-license.php).',
  ' *',
  ' * This file includes third-party code:',
  ' *   . Ratchet (http://goratchet.com)',
  ' *   . Font-Awesome (http://fontawesome.io)',
  ' *   . Weather Icons (https://erikflowers.github.io/weather-icons)',
  ' */',
  '',
].join('\n');

// -- Local functions

// -- Gulp Tasks

// Remove the previous '_dist'.
gulp.task('remove', function() {
  del.sync([dist]);
});

// Create '_dist' and populate it.
gulp.task('create', ['remove'], function() {
  return gulp.src(['./README.md'])
    .pipe(gulp.dest(dist));
});

// Export HTML.
gulp.task('doHTML', ['create'], function() {
  return gulp.src(`${source}/${html}`)
    .pipe(replace('<script></script>', cordova))
    .pipe(replace(`${bundle}.js`, `${bundle}.min.js`))
    .pipe(gulp.dest(dist));
});

// Export Images.
gulp.task('doIMG', ['create'], function() {
  return gulp.src([`${source}/**/img/*`])
    // Flatten folder structure.
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(`${dist}/img`));
});

// Export JS.
gulp.task('doJS', ['create'], function() {
  return gulp.src(`${source}/js/${bundle}.js`)
    .pipe(uglify())
    .pipe(concat(`${bundle}.min.js`))
    .pipe(header(licensejs))
    .pipe(replace('@#Release#@', release))
    .pipe(gulp.dest(`${dist}/js/`));
});

// Export CSS after merging and minification.
gulp.task('doCSS', ['create'], function() {
  return gulp.src(`${source}/css/style.css`)
    .pipe(minify({ keepSpecialComments: 1, keepBreaks: true }))
    .pipe(concat(`${style}.css`))
    .pipe(header(licensecss))
    .pipe(replace('@#Release#@', release))
    // Rework path for fonts and images.
    .pipe(replace('../../bower_components/ratchet/dist/fonts', '../fonts'))
    .pipe(replace('../../bower_components/weather-icons/font', '../fonts'))
    .pipe(replace('../../node_modules/font-awesome/fonts', '../fonts'))
    .pipe(replace(/url\(\.\.\/.*\/img\//g, 'url(../img/'))
    .pipe(gulp.dest(`${dist}/css/`));
});

// Export CSS after merging and minification without any dependency
// to 'create' task.
gulp.task('cssforwatch', function() {
  return gulp.src(`${source}/css/style.css`)
    .pipe(minify({ keepSpecialComments: 1, keepBreaks: true }))
    .pipe(concat(`${style}.css`))
    .pipe(header(licensecss))
    .pipe(replace('@#Release#@', release))
    // Rework path for fonts and images.
    .pipe(replace('../../bower_components/ratchet/dist/fonts', '../fonts'))
    .pipe(replace('../../bower_components/weather-icons/font', '../fonts'))
    .pipe(replace('../../node_modules/font-awesome/fonts', '../fonts'))
    .pipe(replace(/url\(\.\.\/.*\/img\//g, 'url(../img/'))
    .pipe(gulp.dest(`${dist}/css/`));
});

// Copy assosciated fonts.
gulp.task('doFonts1', ['create'], function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(`${dist}/fonts/`));
});

gulp.task('doFonts2', ['create'], function() {
  return gulp.src('./bower_components/ratchet/dist/fonts/*')
    .pipe(gulp.dest(`${dist}/fonts/`));
});

gulp.task('doFonts3', ['create'], function() {
  return gulp.src('./bower_components/weather-icons/font/*')
    .pipe(gulp.dest(`${dist}/fonts/`));
});

// Browserify.
gulp.task('browserify', ['create'], function() {
  // Set up the browserify instance.
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  process.env.NODE_ENV = 'production';
  const b = browserify({ entries: `${source}/js/${app}.js`, debug: true });
  // Exclude jquery from backbone as we use zepto.
  b.exclude('jquery');

  return b.bundle()
    // Log errors if they happen.
    .on('error', gutil.log)
    .pipe(sourcestream(`${bundle}.min.js`))
    // Optionnal, remove if you don't want sourcemaps.
    .pipe(buffer())
    // Load map from browserify file.
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(header(licensejs))
    .pipe(replace('@#Release#@', release))
    // Write .map file.
    .pipe(sourcemaps.write('./'))
    // Write stream to destination path.
    .pipe(gulp.dest('./_dist/js/'));
});

// Watch JS
gulp.task('watchify', function() {
  // Set up the browserify instance.
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  process.env.NODE_ENV = 'production';
  const b = watchify(browserify(
    {
      entries: `${source}/js/${app}.js`,
      debug: true,
    },
    watchify.args));
  // Exclude jquery from backbone as we use zepto.
  b.exclude('jquery');

  function build() {
    b.bundle()
      // Log errors if they happen.
      .on('error', gutil.log)
      .pipe(sourcestream(`${bundle}.min.js`))
      // Optionnal, remove if you don't want sourcemaps.
      .pipe(buffer())
      // Load map from browserify file.
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .pipe(header(licensejs))
      .pipe(replace('@#Release#@', release))
      // Write .map file.
      .pipe(sourcemaps.write('./'))
      // Write stream to destination path.
      .pipe(gulp.dest('./_dist/js/'))
      ;
  }

  // On any update, run the bundler and output build logs to the terminal.
  b.on('update', build);
  b.on('log', gutil.log);

  return build();
});

// Watch if any css files have been modified.
gulp.task('csswatch', function() {
  gulp.watch('public/**/*.css', ['cssforwatch']);
});

// The tasks (called when you run `gulp` from cli).
gulp.task('build', ['browserify', 'doHTML', 'doIMG', 'doCSS', 'doFonts1', 'doFonts2', 'doFonts3']);
gulp.task('watch', ['watchify', 'csswatch']);
gulp.task('default', []);
