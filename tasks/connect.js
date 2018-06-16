/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */
/* eslint strict: 0, semi-style: 0 */

'use strict';

// -- Node modules
const gulp     = require('gulp')
    , connect  = require('gulp-connect')
    , open     = require('opn')
    ;

// -- Local modules
const config = require('./config')
  ;

// -- Local constants
const { source } = config
    , { dist }   = config

    ;

// -- Local variables


// -- Gulp Private Tasks


// -- Gulp Public Tasks

gulp.task('connect', function() {
  connect.server({
    root: source,
    port: 3000,
    livereload: true,
  });
  open('http://localhost:3000');
});

gulp.task('connectdist', function() {
  connect.server({
    root: dist,
    port: 3000,
    livereload: true,
  });
  open('http://localhost:3000');
});
