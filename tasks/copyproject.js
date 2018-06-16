/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */
/* eslint strict: 0, semi-style: 0 */

'use strict';

// -- Node modules
const gulp        = require('gulp')
    , cleanCSS    = require('gulp-clean-css')
    , concat      = require('gulp-concat')
    , header      = require('gulp-header')
    , uglify      = require('gulp-uglify')
    , rename      = require('gulp-rename')
    , replace     = require('gulp-replace')
    , runSequence = require('run-sequence')
    ;

// -- Local modules
const config = require('./config')
    ;

// -- Local constants
const { source } = config
    , { dist } = config
    , { lib } = config
    , { bundle } = config
    , { html } = config.copy
    , { cordova } = config.copy
    , { style } = config.copy
    , { img } = config.copy
    , licensejs = config.license.js
    , licensecss = config.license.css
    , destjs = config.copy.dest.js
    , destcss = config.copy.dest.css
    , destimg = config.copy.dest.img
    , { ratchet } = config.copy.fonts
    , { weatherIcons } = config.copy.fonts
    , { fontAwesome } = config.copy.fonts
    ;

// -- Local variables


// -- Gulp Private Tasks

// Copy index.html:
gulp.task('doHTML', function() {
  return gulp.src(html)
    .pipe(replace('<script></script>', cordova))
    .pipe(replace(`${bundle}.js`, `${bundle}-min.js`))
    .pipe(gulp.dest(dist));
});

// Create a minified version of the library:
gulp.task('uglify', function() {
  return gulp.src(`${source}/js/${bundle}.js`)
    .pipe(uglify())
    .pipe(header(licensejs))
    .pipe(concat(`${bundle}-min.js`))
    .pipe(gulp.dest(`${source}/js`));
});

// Copy CSS:
gulp.task('doCSS', function() {
  return gulp.src(style)
    .pipe(cleanCSS({ specialComments: 1, format: 'keep-breaks' }))
    .pipe(header(licensecss))
    // Flatten the path for the images:
    .pipe(replace(/url\(\.\.\/.*\/img\//g, 'url(../img/'))
    .pipe(gulp.dest(destcss));
});

// Copy the lib to dist:
gulp.task('copylib', function() {
  return gulp.src(`${lib}/${bundle}-min.js`)
    .pipe(gulp.dest(destjs));
});

// Copy the map to dist:
gulp.task('copymap', function() {
  return gulp.src(`${lib}/${bundle}.js.map`)
    .pipe(concat(`${bundle}-min.js.map`))
    .pipe(gulp.dest(destjs));
});

// Copy Images:
gulp.task('copyimg', function() {
  return gulp.src(img)
    // Flatten folder structure:
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(destimg));
});

// Copy fonts:
gulp.task('copy-ratchet-fonts', function() {
  return gulp.src(ratchet.source)
    .pipe(gulp.dest(ratchet.dest));
});

gulp.task('copy-weather-icons-fonts', function() {
  return gulp.src(weatherIcons.source)
    .pipe(gulp.dest(weatherIcons.dest));
});

gulp.task('copy-fontawesome', function() {
  return gulp.src(fontAwesome.source)
    .pipe(gulp.dest(fontAwesome.dest));
});

// -- Gulp Public Tasks
gulp.task('copyproject', function(callback) {
  runSequence(
    ['doHTML', 'uglify', 'doCSS', 'copyimg'],
    ['copy-ratchet-fonts', 'copy-weather-icons-fonts', 'copy-fontawesome'],
    ['copylib', 'copymap'],
    callback,
  );
});
