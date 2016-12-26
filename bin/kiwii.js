#!/usr/bin/env node
/* ****************************************************************************
 * Kiwii.js is a script to create a web app and build a Backbone module.
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
/* eslint-env node */
/* eslint one-var: 0, object-shorthand: 0, no-console: 0 */
/* eslint strict: 0 */

'use strict';

// -- Node modules
const fs      = require('fs')
    , exec    = require('child_process').exec
    , nopt    = require('nopt')
    , path    = require('path')
    , express = require('express')
    , http    = require('http')
    , open    = require('open')
    ;

// -- Global variables
const baseapp        = process.cwd()
    , basekiwii      = __dirname.replace('/bin', '')
    , publickiwii    = 'public'
    , publicapp      = 'public'
    , version        = require('../package.json').version
    // , projectcontent = 'project-templates'
    , tplpath        = path.join(basekiwii, 'module-templates')
    , projectDir     = ['css', 'components', 'models', 'views', 'collections', 'img']
    , projectFiles   = ['@.js', 'css/@.css', 'components/body.js', 'models/@Model.js', 'views/@View.js', 'collections/@Collection.js']
      // Command line Options
    , opts = {
      help: [Boolean, false],
      version: [String, null],
      collection: [Boolean, false],
      path: path,
      name: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', version],
      c: ['--collection'],
      p: ['--path'],
      n: ['--name'],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    ;

// -- Templates
const readme = [
  '# MyApp',
  ' ',
  'Bla bla ...',
  ' ',
  '## License',
  ' ',
  'MIT.',
  ''].join('\n');

const license = [
  'The MIT License (MIT)',
  '',
  'Copyright (c) 2016 John Doe <jdo@johndoe.com> (http://www.johndoe.com)',
  '',
  'Permission is hereby granted, free of charge, to any person obtaining a copy',
  'of this software and associated documentation files (the "Software"), to deal',
  'in the Software without restriction, including without limitation the rights',
  'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
  'copies of the Software, and to permit persons to whom the Software is',
  'furnished to do so, subject to the following conditions:',
  '',
  'The above copyright notice and this permission notice shall be included in',
  'all copies or substantial portions of the Software.',
  '',
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
  'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
  'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
  'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
  'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
  'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
  'THE SOFTWARE.',
  ''].join('\n');

const changelog = [
  '### HEAD',
  '',
  '',
  '### 0.1.0 (Month Day, Year)',
  '',
  '  * Initial build.',
  ''].join('\n');

// -- Private functions
/* eslint-disable no-underscore-dangle */

/**
 * Removes the cached files and returns the array.
 *
 * @function (files)
 * @private
 * @param {Array}     an array of files,
 * @returns {Array}   returns the filtered array,
 */
function _filter(files) {
  const filtered = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].match(/^\./) === null) {
      filtered.push(files[i]);
    }
  }
  return filtered;
}

/**
 * Copies source file to destination.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the source file,
 * @param {String}    the destination file,
 * @returns {}        -,
 */
function _copyFile(source, dest) {
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
}

/**
 * Recursively copies source to destination.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the source folder/file,
 * @param {String}    the destination folder/file,
 * @returns {}        -,
 */
function _copyRecursiveSync(source, dest) {
  // var files
  //   , i
  //   ;

  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(dest);
    const files = _filter(fs.readdirSync(source));
    for (let i = 0; i < files.length; i++) {
      if (fs.statSync(`${source}/${files[i]}`).isDirectory()) {
        console.log(`  Add folder: ${files[i]}`);
        _copyRecursiveSync(`${source}/${files[i]}`, `${dest}/${files[i]}`);
      } else {
        console.log(`  Add file: ${files[i]}`);
        _copyFile(`${source}/${files[i]}`, `${dest}/${files[i]}`);
      }
    }
  } else {
    _copyFile(source, dest);
  }
}

/**
 * Removes kiwii dependencies to package.json and bower.json
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}    The root path of Kiwii,
 * @param {String}    The root path of web app,
 * @param {String}    The name of the web app,
 * @returns {}        -,
 */
function _customizeApp(homekiwii, homeapp, app) {
  const npm = 'package.json'
    , bower = 'bower.json'
    ;
  let json
    , obj
    ;

  // Rework package.json
  json = fs.readFileSync(path.join(homekiwii, npm), 'utf8', (error) => {
    if (error) {
      throw error;
    }
  });

  obj = JSON.parse(json);
  obj.name = app.toLowerCase();
  obj.version = '0.0.0';
  obj.description = `${app} ...`;
  obj.repository.url = 'https://github.com/author/libname.git';
  obj.keywords = ['to be filled'];
  obj.author = 'John Doe <jdo@johndoe.com> (http://www.johndoe.com)';
  obj.bugs.url = 'https://github.com/author/libname/issues';
  obj.homepage = 'https://github.com/author/libname';
  delete obj.bin;
  delete obj.devDependencies.express;
  delete obj.devDependencies.nopt;
  delete obj.devDependencies.path;
  delete obj.devDependencies.open;

  console.log(`  ${npm}`);
  fs.writeFileSync(path.join(homeapp, npm), JSON.stringify(obj, null, 2));

  // Rework bower.json
  json = fs.readFileSync(path.join(homekiwii, bower), 'utf8', (error) => {
    if (error) {
      throw error;
    }
  });

  obj = JSON.parse(json);
  obj.name = app.toLowerCase();
  obj.description = `${app} ...`;
  obj.authors = ['John Doe <jdo@johndoe.com> (http://www.johndoe.com)'];
  obj.keywords = ['to be filled'];
  obj.homepage = 'https://github.com/author/libname';

  console.log(`  ${npm}`);
  fs.writeFileSync(path.join(homeapp, bower), JSON.stringify(obj, null, 2));
}

/**
 * Create project tree.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the base path,
 * @param {String}    the module name,
 * @returns {}        -,
 */
function _createTree(base, project) {
  let tree;

  // Check is this module already exists.
  if (fs.existsSync(path.join(base, project))) {
    console.log(`${path.join(base, project)} exists. It can't be overwrited. Process aborted...`);
    process.exit(1);
  }

  // Build directory tree.
  tree = '/';
  const arr = path.join(base, project).split('/');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '') {
      if (!fs.existsSync(path.join(tree, arr[i]))) {
        fs.mkdirSync(path.join(tree, arr[i]) /* , 0766 */);
      }
      tree = path.join(tree, arr[i]);
    }
  }
}

/**
 * Creates an empty project.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the base path,
 * @param {String}    the module name,
 * @returns {}        -,
 */
function _createEmptyProject(base, project) {
  let i;

  // Create project folders.
  for (i = 0; i < projectDir.length; i++) {
    fs.mkdirSync(path.join(base, project, projectDir[i]));
  }

  // Create empty files.
  for (i = 0; i < projectFiles.length; i++) {
    fs.appendFileSync(path.join(base, project, projectFiles[i].replace(/@/, project)), '');
  }
}

/**
 * Adds files to the project.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the base path,
 * @param {String}    the module name,
 * @returns {}        -,
 */
function _fillProject(base, project) {
  const className = project.substr(0, 1).toUpperCase() + project.substr(1);
  let tpl
    , dest
    ;

  function _append() {
    let buffer;

    // Read template.
    buffer = fs.readFileSync(tpl, 'utf8', (error) => {
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
  dest = path.join(base, project, 'css', `${project}.css`);
  _append(tpl, dest);

  // Fill Template file.
  tpl = path.join(tplpath, 'tpl');
  dest = path.join(base, project, 'components', `${'body'}.js`);
  _append(tpl, dest);

  // Fill Project file.
  tpl = path.join(tplpath, 'project');
  dest = path.join(base, project, `${project}.js`);
  _append(tpl, dest);

  // Fill Model file.
  tpl = path.join(tplpath, 'model');
  dest = path.join(base, project, 'models', `${project}Model.js`);
  _append(tpl, dest);

  // fill Collection file.
  tpl = path.join(tplpath, 'collection');
  dest = path.join(base, project, 'collections', `${project}Collection.js`);
  _append(tpl, dest);

  // Fill View file.
  tpl = path.join(tplpath, 'view');
  dest = path.join(base, project, 'views', `${project}View.js`);
  _append(tpl, dest);
}

/**
 * Updates the Model file to be part of a collection.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the base path,
 * @param {String}    the module name,
 * @returns {}        -,
 */
function _updateCollection(base, project) {
  /* eslint-disable prefer-template, no-useless-concat */

  // sed command to remove line: urlRoot : '/.../...',
  const cmd = 'sed \'/urlRoot :/d\'' + ' ' + path.join(base, project, 'models', project + 'Model.js') + ' > ' + path.join(base, project + '/models/tmp.js');

  exec(cmd, (error/* , stdout, stderr */) => {
    if (error !== null) {
      console.log('Something went wrong. exec command returned an error!');
    } else {
      // Rename tmp file.
      fs.unlinkSync(path.join(base, project, 'models', project + 'Model.js'));
      fs.renameSync(path.join(base, project, 'models/tmp.js'), path.join(base, project, 'models', project + 'Model.js'));
    }
  });
  /* eslint-enable prefer-template, no-useless-concat */
}

/**
 * Deletes the collection.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the base path,
 * @param {String}    the module name,
 * @returns {}        -,
 */
function _deleteCollection(base, project) {
  // Extract the files in the collection.
  const files = fs.readdirSync(path.join(base, project, 'collections'));

  // Remove the files.
  for (let i = 0; i < files.length; i++) {
    fs.unlinkSync(path.join(base, project, 'collections', files[i]));
  }

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
  const message = ['',
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
    ''].join('\n');

  console.log(message);
  process.exit(0);
}

/**
 * Creates and populates the web app.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the command line options,
 * @returns {}        -,
 */
function _populate(options) {
  const app = options.name || 'myApp';

  // Check that the folder app is empty.
  console.log('Checks that the folder app is empty...');
  const files = _filter(fs.readdirSync(baseapp));
  if (files.length > 1 || (files[0] !== undefined && files[0] !== 'node_modules')) {
    console.log('This folder already contains files and/or folders. Clean it up first! Process aborted...');
    process.exit(1);
  }

  // Create README.md, LICENSE.md and CHANGELOG.md.
  console.log('  README.md');
  fs.writeFileSync(path.join(baseapp, 'README.md'), readme);
  console.log('  LICENSE.md');
  fs.writeFileSync(path.join(baseapp, 'LICENSE.md'), license);
  console.log('  CHANGELOG.md');
  fs.writeFileSync(path.join(baseapp, 'CHANGELOG.md'), changelog);

  // Add gulpfile.js, .eslintrc, .babelrc and create an empty .gitignore.
  console.log('  gulpfile.js');
  _copyFile(path.join(basekiwii, 'gulpfile.js'), path.join(baseapp, 'gulpfile.js'));
  console.log('  .eslintrc');
  _copyFile(path.join(basekiwii, '.eslintrc'), path.join(baseapp, '.eslintrc'));
  console.log('  .babelrc');
  _copyFile(path.join(basekiwii, '.babelrc'), path.join(baseapp, '.babelrc'));
  console.log('  .gitignore');
  fs.closeSync(fs.openSync('.gitignore', 'w'));

  // Add package.json and bower.json but first remove kiwii dependencies.
  _customizeApp(basekiwii, baseapp, app);

  // Create and fill the public folder.
  console.log('Fills the web app skeleton:');
  _copyRecursiveSync(path.join(basekiwii, publickiwii), path.join(baseapp, publicapp));
  console.log('Done. Enjoy!');
}

/**
 * Adds the skeleton of a new module.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the command line options,
 * @returns {}        -,
 */
function _add(options) {
  let base
    , project
    ;

  if (options.path) {
    base = options.path;
  } else {
    base = path.join(baseapp, publicapp, 'pages');
  }

  if (typeof options.name !== 'string') {
    _help();
  } else {
    project = options.name;
  }

  // Ok, base and project are set.
  // Create the project.
  _createTree(base, project);
  _createEmptyProject(base, project);
  _fillProject(base, project);

  // Update for collection.
  if (options.collection) {
    _updateCollection(base, project);
  } else {
    _deleteCollection(base, project);
  }
}

/**
 * Starts an HTTP server and opens the browser.
 *
 * @function ()
 * @private
 * @param {}          -,
 * @returns {}        -,
 */
function _run() {
  const app = express()
      , httpServer = http.createServer(app)
      ;

  // Configure the port and the static page.
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(path.join(baseapp, '_dist')));

  // Start the HTTP Server.
  httpServer.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
  });

  // Open the browser.
  open('http://localhost:3000');
}
/* eslint-enable no-underscore-dangle */


// -- Main
if (parsed.help) {
  _help();
}

if (parsed.version) {
  console.log(`kiwii version: ${parsed.version}`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate') {
  _populate(parsed);
} else if (parsed.argv.remain[0] === 'add') {
  _add(parsed);
} else if (parsed.argv.remain[0] === 'run' && parsed.argv.remain[1] === 'browser') {
  _run();
} else {
  _help();
}
