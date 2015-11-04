#!/usr/bin/env node
/* ****************************************************************************
 * Kiwii.js is a script to create a web app and build a Backbone module.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr)
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
/* eslint-env node */
/* eslint curly: 0, no-console: 0, max-len: [1, 130, 2] */
'use strict';

// -- Node modules
var fs      = require('fs')
  , exec    = require('child_process').exec
  , nopt    = require('nopt')
  , path    = require('path')
  , express = require('express')
  , http    = require('http')
  , open    = require('open')
  ;

// -- Global variables
var baseapp        = process.cwd()
  , basekiwii      = __dirname.replace('/bin', '')
  , publickiwii    = 'public'
  , publicapp      = 'public'
  , version        = require('../package.json').version
  , projectcontent = 'project-templates'
  , tplpath        = path.join(basekiwii, 'module-templates')
  , projectDir     = ['css', 'templates', 'models', 'views', 'collections', 'img']
  , projectFiles   = ['@.js', 'css/@.css', 'templates/@.hbs', 'models/@Model.js', 'views/@View.js', 'collections/@Collection.js']
    // Command line Options
  , opts = {
    help:       [Boolean, false],
    version:    [String, null],
    collection: [Boolean, false],
    path:       path,
    name:       [String, null]
  }
  , shortOpts = {
    h: ['--help'],
    v: ['--version', version],
    c: ['--collection'],
    p: ['--path'],
    n: ['--name']
  }
  , parsed = nopt(opts, shortOpts, process.argv, 2)
  ;

// -- Private functions

/**
 * Removes the cached files and returns the array.
 *
 * @function (files)
 * @private
 * @param {Array}     An array of files,
 * @returns {Array}   Returns the filtered array,
 */
function _filter(files) {
  var filtered
    , i
    ;

  filtered = [];
  for (i = 0; i < files.length; i++)
    if (files[i].match(/^\./) === null)
      filtered.push(files[i]);

  return filtered;
}

/**
 * Copies source file to destination.
 *
 * @function (source, dest)
 * @private
 * @param {String}    The source file,
 * @param {String}    The destination file,
 * @returns {}        -,
 */
function _copyFile(source, dest) {
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
}

/**
 * Recursively copies source to destination.
 *
 * @function (source, dest)
 * @private
 * @param {String}    The source foler/file,
 * @param {String}    The destination folder/file,
 * @returns {}        -,
 */
function _copyRecursiveSync(source, dest) {
  var files
    , i
    ;

  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(dest);
    files = _filter(fs.readdirSync(source));
    for (i = 0; i < files.length; i++) {
      if (fs.statSync(source + '/' + files[i]).isDirectory()) {
        console.log('  ' + 'Add folder: ' + files[i]);
        _copyRecursiveSync(source + '/' + files[i], dest + '/' + files[i]);
      } else {
        console.log('  ' + 'Add file: ' + files[i]);
        _copyFile(source + '/' + files[i], dest + '/' + files[i]);
      }
    }
  } else {
    _copyFile(source, dest);
  }
}

/**
 * Removes kiwii dependencies to package.json and bower.json
 *
 * @function (base)
 * @private
 * @param {String}    The root path of the web app,
 * @returns {}        -,
 */
function _customizeApp(basekiwii, baseapp, app) {
  var npm   = 'package.json'
    , bower = 'bower.json'
    , json
    , obj
    ;

  // Rework package.json
  json = fs.readFileSync(path.join(basekiwii, npm), 'utf8', function (error) {
    if (error)
      throw error;
  });

  obj = JSON.parse(json);
  obj.name = app;
  obj.version = '0.0.0';
  obj.description = app + ' ...';
  obj.bin = {};
  obj.repository.url = '';
  obj.keywords = [];
  obj.author = '';
  obj.bugs.url = '';
  obj.homepage = '';
  delete obj.devDependencies.express;
  delete obj.devDependencies.nopt;
  delete obj.devDependencies.path;
  delete obj.devDependencies.path;

  console.log('  ' + npm);
  fs.writeFileSync(path.join(baseapp, npm), JSON.stringify(obj, null, 2));

  // Rework bower.json
  json = fs.readFileSync(path.join(basekiwii, bower), 'utf8', function (error) {
    if (error)
      throw error;
  });

  obj = JSON.parse(json);
  obj.name = app;
  obj.description = app + ' ...';
  obj.authors = [];
  obj.keywords = [];
  obj.homepage = '';

  console.log('  ' + npm);
  fs.writeFileSync(path.join(baseapp, bower), JSON.stringify(obj, null, 2));
}

/**
 * Create project tree.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}  the base path,
 * @param {String}  the module name,
 * @returns {}      -,
 */
function _createTree(base, project) {
  var arr,
      tree,
      i;

  // Check is this module already exists.
  if (fs.existsSync(path.join(base, project))) {
    console.log(path.join(base, project) + ' exists. It can\'t be overwrited. Process aborted...');
    process.exit(1);
  }

  // Build directory tree.
  tree = '/';
  arr = path.join(base, project).split('/');

  for (i in arr) {
    if (arr[i] !== '') {
      if (!fs.existsSync(path.join(tree, arr[i])))
        fs.mkdirSync(path.join(tree, arr[i])/*, 0766*/);
      tree = path.join(tree, arr[i]);
    }
  }
}

/**
 * Creates an empty project.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}  the base path,
 * @param {String}  the module name,
 * @returns {}      -,
 */
function _createEmptyProject(base, project) {
  var i;

  // Create project folders.
  for (i in projectDir)
    fs.mkdirSync(path.join(base, project, projectDir[i]));

  // Create empty files.
  for (i in projectFiles)
    fs.appendFileSync(path.join(base, project, projectFiles[i].replace(/@/, project)), '');
}

/**
 * Adds files to the project.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}  the base path,
 * @param {String}  the module name,
 * @returns {}      -,
 */
function _fillProject(base, project) {
  var className = project.substr(0, 1).toUpperCase() + project.substr(1),
      tpl,
      dest;

  function _append(tpl, dest) {
    var buffer;

    // Read template.
    buffer = fs.readFileSync(tpl, 'utf8', function (error) {
      if (error) {
        throw error;
      }
    });

    // Find and substitute patterns.
    buffer = buffer.replace(/@#project#@/g, project);
    buffer = buffer.replace(/@#Class#@/g, className);
    fs.appendFileSync(dest, buffer);
  }

  // Fill CSS file.
  tpl = path.join(tplpath, 'css');
  dest = path.join(base, project, 'css', project + '.css');
  _append(tpl, dest);

  // Fill Template file.
  tpl = path.join(tplpath, 'tpl');
  dest = path.join(base, project, 'templates', project + '.hbs');
  _append(tpl, dest);

  // Fill Project file.
  tpl = path.join(tplpath, 'project');
  dest = path.join(base, project, project + '.js');
  _append(tpl, dest);

  // Fill Model file.
  tpl = path.join(tplpath, 'model');
  dest = path.join(base, project, 'models', project + 'Model.js');
  _append(tpl, dest);

  //fill Collection file.
  tpl = path.join(tplpath, 'collection');
  dest = path.join(base, project, 'collections', project + 'Collection.js');
  _append(tpl, dest);

  // Fill View file.
  tpl = path.join(tplpath, 'view');
  dest = path.join(base, project, 'views', project + 'View.js');
  _append(tpl, dest);

}

/**
 * Updates the Model file to be part of a collection.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}  the base path,
 * @param {String}  the module name,
 * @returns {}      -,
 */
function _updateCollection(base, project) {
  var cmd;

  // sed command to remove line: urlRoot : '/.../...',
  cmd = 'sed \'/urlRoot :/d\'' + ' ' + path.join(base, project, 'models', project + 'Model.js') + ' > ' + path.join(base, project + '/models/tmp.js');

  exec(cmd, function(error/*, stdout, stderr*/) {

    if (error !== null) {
      console.log('Something went wrong. exec command returned an error!');

    } else {
      // Rename tmp file.
      fs.unlinkSync(path.join(base, project, 'models', project + 'Model.js'));
      fs.renameSync(path.join(base, project, 'models/tmp.js'), path.join(base, project, 'models', project + 'Model.js'));
    }
  });
}

/**
 * Deletes the collection.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}  the base path,
 * @param {String}  the module name,
 * @returns {}      -,
 */
function _deleteCollection(base, project) {
  var files,
      i;

  // Extract the files in the collection.
  files = fs.readdirSync(path.join(base, project, 'collections'));

  // Remove the files.
  for (i in files)
    fs.unlinkSync(path.join(base, project, 'collections', files[i]));

  // Remove the folder.
  fs.rmdirSync(path.join(base, project, 'collections'));

}

/**
 * Displays help message.
 *
 * @function ()
 * @private
 */
function _help() {

  var message = ['',
    'Usage: command [options]',
    '',
    'populate            populate the app',
    'add                 add a module to the web app',
    'run browser         run _dist in the default browser',
    '',
    'Options:',
    '',
    '-h, --help          output usage information',
    '-v, --version       output the version number',
    '-c, --collection    create a collection module (default false)',
    '-p, --path          define the path (default ./public/pages',
    '-n, --name          define the name of the module',
    ''
  ].join('\n');

  console.log(message);
  process.exit(0);
}

/**
 * Creates and populates the web app.
 *
 * @function (opts)
 * @private
 * @param {Object}  the command line options,
 * @returns {}      -,
 */
function _populate(opts) {
  var app = opts.name || 'myApp'
    , files
    , i
    ;

  // Check that the folder app is empty.
  console.log('Checks that the folder app is empty...');
  files = _filter(fs.readdirSync(baseapp));
  if (files.length > 1 || (files[0] !== undefined && files[0] !== 'node_modules')) {
    console.log('This folder already contains files and/or folders. Clean it up first! Process aborted...');
    process.exit(1);
  }

  // Ok. Populate it.
  console.log('Populates folder with:');

  // Populate the project with the content of project-template.
  files = _filter(fs.readdirSync(path.join(basekiwii, projectcontent)));
  for (i = 0; i < files.length; i++){
    console.log('  ' + files[i]);
    _copyFile(path.join(basekiwii, projectcontent, files[i]), path.join(baseapp, files[i]));
  }

  // Add .eslintrc and .gitignore
  console.log('  ' + '.eslintrc');
  _copyFile(path.join(basekiwii, '.eslintrc'), path.join(baseapp, '.eslintrc'));
  console.log('  ' + '.gitignore');
  _copyFile(path.join(basekiwii, '.gitignore'), path.join(baseapp, '.gitignore'));

  // Add package.json and bower.json and remove kiwii dependencies.
  _customizeApp(basekiwii, baseapp, app);

  // Create and fill public.
  console.log('Fills the web app skeleton:');
  _copyRecursiveSync(path.join(basekiwii, publickiwii), path.join(baseapp, publicapp));
  console.log('Done. Enjoy!');

}

/**
 * Adds the skeleton of a new module.
 *
 * @function (opts)
 * @private
 * @param {Object}  the command line options,
 * @returns {}      -,
 */
function _add(opts) {
  var base,
      project;

  if (opts.path)
    base = opts.path;
  else
    base = path.join(baseapp, publicapp, 'pages');

  if (typeof opts.name !== 'string')
    _help();
  else
    project = opts.name;

  // Ok, base and project are set.
  // Create the project.
  _createTree(base, project);
  _createEmptyProject(base, project);
  _fillProject(base, project);

  // Update for collection.
  if (opts.collection)
    _updateCollection(base, project);
  else
    _deleteCollection(base, project);

}

/**
 * Starts an HTTP server and opens the browser.
 *
 * @function (opts)
 * @private
 * @param {}        -,
 * @returns {}      -,
 */
function _run() {
  var app = express()
    , httpServer = http.createServer(app)
    ;

  // Configure the port and the static page.
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(path.join(baseapp, '_dist')));

  // Start the HTTP Server.
  httpServer.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });

  // Open the browser.
  open('http://localhost:3000');
}


// -- Main
if (parsed.help)
  _help();

if (parsed.version) {
  console.log('kiwii version: ' + parsed.version);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate') {
  _populate(parsed);

} else if (parsed.argv.remain[0] === 'add') {
  _add(parsed);

} else if (parsed.argv.remain[0] === 'run' && parsed.argv.remain[1] === 'browser')
  _run();

else
  _help();
