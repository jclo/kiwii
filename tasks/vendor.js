/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */
/* eslint strict: 0 */

'use strict';

// -- Node modules
const del         = require('del')
    , gulp        = require('gulp')
    , runSequence = require('run-sequence')
    ;

// -- Local modules
const config = require('./config')
  ;

// -- Local constants
const vendor       = config.vendor.folder
    , ratchet      = config.vendor.ratchet
    , weatherIcons = config.vendor.weatherIcons
    , fontAwesome  = config.vendor.fontAwesome
    ;

// -- Local variables


// -- Gulp Private Tasks

// Remove all vendors:
gulp.task('remove-vendors', function() {
  del.sync([vendor]);
});

// Copy Ratchet Vendor:
gulp.task('copy-ratchet', function() {
  return gulp.src(ratchet)
    .pipe(gulp.dest(`${vendor}/ratchet`));
});

// Copy Weather Icons Vendor:
gulp.task('copy-weather-icons', function() {
  return gulp.src(weatherIcons)
    .pipe(gulp.dest(`${vendor}/weather-icons`));
});

// Copy Font Awesome Vendor:
gulp.task('copy-font-awesome', function() {
  return gulp.src(fontAwesome)
    .pipe(gulp.dest(`${vendor}/font-awesome`));
});


// -- Gulp Public Tasks

// Extract vendor JS and CSS files:
gulp.task('vendor', function(callback) {
  runSequence('remove-vendors',
    ['copy-ratchet', 'copy-weather-icons', 'copy-font-awesome'],
    callback);
});
