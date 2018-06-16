/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */
/* eslint strict: 0, semi-style: 0 */

'use strict';

// -- Node modules
const babelify     = require('babelify')
    , browserify   = require('browserify')
    , gulp         = require('gulp')
    , replace      = require('gulp-replace')
    , sourcemaps   = require('gulp-sourcemaps')
    , gutil        = require('gulp-util')
    , runSequence  = require('run-sequence')
    , buffer       = require('vinyl-buffer')
    , sourcestream = require('vinyl-source-stream')
    , watchify     = require('watchify')
    ;


// -- Local modules
const config = require('./config')
    ;


// -- Local constants
const { source }  = config
    , { browserify: { app } } = config
    , { bundle }  = config
    , { browserify: { debug } } = config
    , { release } = config
    , { babel } = config
    ;


// -- Local variables


// -- Gulp Private Tasks

// Browserify:
process.env.BROWSERIFYSWAP_ENV = 'dist';
process.env.NODE_ENV = 'production';
gulp.task('browserify-int', function() {
  // Set up the browserify instance.
  const b = browserify({ entries: app, debug });
  b.transform(babelify, { presets: babel.presets, plugins: babel.plugins });
  // Exclude jquery from backbone as we use zepto.
  b.exclude('jquery');

  return b.bundle()
    // Log errors if they happen:
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(sourcestream(`${bundle}.js`))
    // Optionnal, remove if you don't want sourcemaps:
    .pipe(buffer())
    // Load map from browserify file:
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here:
    .pipe(replace('{{lib:version}}', release))
    // Write .map file:
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${source}/js`))
  ;
});


// Watchify:
gulp.task('watchify', function() {
  // Set up the browserify instance:
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  process.env.NODE_ENV = 'production';
  const b = watchify(browserify({ entries: app, debug }, watchify.args));
  b.transform(babelify, { presets: babel.presets, plugins: babel.plugins });
  // Exclude jquery from backbone as we use zepto:
  b.exclude('jquery');

  function build() {
    b.bundle()
      // Log errors if they happen.
      .on('error', gutil.log)
      .pipe(sourcestream(`${bundle}.js`))
      // Optionnal, remove if you don't want sourcemaps.
      .pipe(buffer())
      // Load map from browserify file.
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      .pipe(replace('{{lib:version}}', release))
      // Write .map file.
      .pipe(sourcemaps.write('./'))
      // Write stream to destination path.
      .pipe(gulp.dest(`${source}/js`))
    ;
  }

  // On any update, run the bundler and output build logs to the terminal.
  b.on('update', build);
  b.on('log', gutil.log);

  return build();
});


// -- Gulp Public Tasks

// Build ES5 Library:
gulp.task('browserify', function(callback) {
  runSequence('browserify-int', callback);
});
