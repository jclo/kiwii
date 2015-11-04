# Kiwii

[![NPM version][npm-image]][npm-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)

[![NPM install][npm-install-image]][npm-install-url]


Kiwii is a lightweight unopinionated HTML5 Hybrid Mobile App framework. Kiwii relies on [Backbone](http://backbonejs.org) to build your MVC web application. It relies on [Backbone.Radio](https://github.com/marionettejs/backbone.radio) for messaging, [Handlebars](http://handlebarsjs.com) for templating and [Ratchet](http://goratchet.com) and [Font-Awesome](https://fortawesome.github.io/Font-Awesome/) for styling. However, you are not forced to use these technologies for messaging, templating and styling. With little effort, you can replace them by your preferred solutions.

And of course, Kiwii relies on [Cordova](https://cordova.apache.org) to convert your web application into a Mobile Hybrid Application.

Kiwii is just Backbone! Kiwii aims at providing a very thin framework to reduce the overhead and thus to get a very fast Mobile Hybrid Application. And, Kiwii aims at providing a totally transparent framework without magic behind the curtains. With Kiwii we want to keep the framework as simple as possible. We want the developper to understand what it does.

A Kiwii webapp mainly consists of one HTML page, one CSS file, one Javascript file and a set of loosely coupled Kiwii Backbone MV modules.

If you are familiar with Backbone, Kiwii is really easy to use. If you aren't, you need to learn Backbone first as Kiwii is just a minimal glue around Backbone to facilitate its use.

Kiwii is shipped with a running minimalist webapp having a few pages and a vertical responsive menu. You can immediately start building your webapp from this skeleton.

Besides, Kiwii includes a CLI script, `kiwii.js`, to assist you on adding a new module (§ Add a new module).

Kiwii creates the webapp by building all the Javascript project files into an UMD bundle that it attaches to the HTML page (§ Architecture).

Kiwii relies on [Babel](https://babeljs.io) and [Browserify](http://browserify.org) for the build. Thus, you can write ES6 Javascript code if you wish. `js/app.js` is written in ES6.

Kiwii uses [Gulp](http://gulpjs.com) to build a distribution version.


## Prerequisites

Kiwii needs [Node](https://nodejs.org/en/) and [Gulp](http://gulpjs.com) for installation and building. They should be installed on your PC. As Gulp is only required to create a distribution version, you can start without.


## Quick Startup

You can easily get your first Kiwii webapp running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your webapp.

Then, you have to install Kiwii package globally. Open a terminal session and type the command:

```
npm install kiwii -g
``` 

If you don't have the rights to install kiwii globally, you can install it locally in your project. Open a terminal session, move to your working directory - the empty folder you created - and type the following command:

```
npm install kiwii
```

Now populate your empty folder and create your first web app:

```
// populate
kiwii populate -n myapp
// Or, if you installed the package locally:
./node_modules/kiwii/bin/kiwii.js populate -n myapp
// Install Node.js packages
npm install
// Build your first webpapp
npm run build
```

Your working directory should contain now a set of files and a folder `public` that contains the webapp.

As your webapp is just the HTML file `public/index.html` with CSS files and a Javascript bundle attached, you can visualize it into your browser by a simple drag and drop of the file `index.html`.

Make sure that your Desktop browser is emulating mobile devices. Check out how to configure [Google Chrome](https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports) and [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View) to enable Mobile device mode.

Do it and you will see your webapp running. that's all!


## Architecture

Kiwii webapp organisation closely matches the Backbone structure. The webapp consists of one HTML file `public/index.html`, one CSS file `public/css/style.css`, and one Javascript file `public/js/app.js`.

When the HTML page is loaded into the browser, it imports the file style.css and starts the Javascript file app.js.

The file style.css imports a set of dependant CSS files (see the file). These CSS files define the general styling (Ratchet) and the font used (Font-Awesome) plus the styling specific to each Backone module (see below).

The file app.js starts a Javascript script (see the file). It initializes Backbone URL history and starts the Backbone router `public/js/router.js`.

Thus, the basic structure of Kiwii webapp is:

```
public
  |_ index.html
  |_ css
  |   |_ style.css
  |_ js
      |_ app.js
      |_ router.js
```

At this basic structure, we add Kiwii Backbone modules. Each module has a specific task (display header, footer, core page, menu, etc.).

Thus, Kiwii webapp is completed with:

```
public
  |_ pages
       |_ home
           |_ home.js
           |_templates
           |    |_ home.hbs
           |_ css
           |   |_ home.css
           |_ models
           |    |_ homeModel.js
           |_ views
                |_ homeView.js
```

The folder `pages` contains a set of folders. Each folder is a Kiwii Backbone module.

A Kiwii Backbone module consists of an interface, a view, a model, a template and a style sheet.

The interface (here home.js) is the link with the other parts of the webapp. It sends and listens messages from the router/controller. It updates the model (here homeModel.js) and the view (here homeView.js). Models and Views have no link with the outside. They must go through the interface.

The template (here home.hbs) is an HTML file, with handlebars tags, that contains the HTML structure of the module.

The style sheet (here home.css) defines what style to apply to the template.


## Build

Kiwii provides two commands to build your webapp:

  * npm run build,
  * npm run watch.

`npm run build` launches a script that bundles all the Javascript files, of your project, in one big file `public/js/wapp.js`. This file that is attached to `public/index.html`.

`npm run watch`, as its name lets think, launches a script that watches the files of your project. If one file is modified, it automatically updates `public/js/wapp.js`.


## Add a new module

When you want to add a new page, a new Kiwii Backbone module, to your project, you don't need to create all files and folders manually. You just need to type:

```
kiwii add -n <new_module_name> -p 'public/pages'
// Or, if installed locally:
./node_modules/kiwii/bin/kiwii.js add -n <new_module_name> -p 'public/pages'
```

The script creates a skeleton for the new Kiwii Backbone module. Then, you just need to fill the views and models functions and to complete the template and the style sheet.

When your module is ready to be tested, you need to instantiate it in `public/js/router.js`.   

## Create a distribution version

Kiwii provides three commands to build your webapp:

  * npm run build_dist,
  * npm run update_dist,
  * npm run browser.

But, before building a distribution version, you need to install the gulp module globally if it isn't done yet.

```
npm install -g gulp@3.9.0
```

When done, you can build your distribution version. Type:

```
npm run build_dist
```

It will create a folder `_dist` with all the files required for your webapp. Mainly one HTML file, one big CSS file and one big Javascript file. The two last files include an header copyright defined in `gulpfile.js`.

You can update your distribution version, on the fly, each time you modify a project file by typing this command:

```
npm run update_dist
```

And finally, you can view your distribution application running in the default browser of your PC. Type:

```
npm run browser
```

It creates an HTTP server listening on port 3000 and it launches your default browser with the URL `http://localhost:3000`. You should see your distribution webapp running in it.


## Create a Mobile Hybrid Application

Now that your Kiwii webapp is ready, you can convert it to a Mobile Hybrid Application thanks to [Cordova](https://cordova.apache.org). If you aren't familiar with Cordova learn it first otherwise you won't understand what is described below.

First, install Cordova if it is not done yet. Type

```
npm install -g cordova
```

Then, create a new empty directory, open a terminal, go to this directory and type:

```
cordova create myapp
```

Go to myapp directory, throw away the folder `www`, copy `_dist` and rename it `www`.


### Create a browser platform

Now we are going to test the Hybrid Application into the browser. We need to install the browser platform by typing the command (from myapp directory):

```
cordova platform add browser
```

Then run the Hybrid Application:

```
cordova run browser
```

Your Hybrid Application runs now at the address `http://localhost:8000`.


### Create an IOS Application

Be aware, you can create an IOS app only from a Mac OS X platform with Xcode tools installed. 

If you are on a Mac and you have Xcode installed, type the command:

```
cordova platform add ios
```

Add the plugins:

```
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-statusbar
```

Build the IOS Application:

```
cordova build ios
```

Then go to `myapp/platforms/ios/` and double click the file `HelloCordova.xcodeproj`. It launches Xcode. When the Xcode application is opened, select the menu `Product -> Run`. Xcode will open the IOS Simulator and you will see your IOS Hybrid Mobile App running! 

Enjoy!

## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/kiwii.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/kiwii.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.12-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/kiwii.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/Kiwii/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/Kiwii/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/es6umd.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/kiwii
[npm-install-url]: https://nodei.co/npm/kiwii
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/kiwii
[dependencies-url]: https://david-dm.org/jclo/Kiwii#info=dependencies
[devdependencies-url]: https://david-dm.org/jclo/Kiwii#info=devDependencies
[license-url]: http://opensource.org/licenses/MIT
