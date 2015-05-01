node-resources
================

[![Build Status](https://travis-ci.org/hgarcia/node-resources.png?branch=master)](https://travis-ci.org/hgarcia/node-resources)
[![NPM version](https://badge-me.herokuapp.com/api/npm/node-resources.png)](http://badges.enytc.com/for/npm/node-resources)

### History
  -0.1.1
    Added console log to show errors when requiring resources. Thanks to https://github.com/rstuven

### Usage

When working on Restify or ExpressJS applications you usually see a file structure based on routes, models and views.

    |_app.js
    |_routes
    | |_hello.js
    |_models
    | |_hello.js
    |_views
      |_hello
        |_index.ejs
        |_edit.ejs

This structure is very common to other MVC frameworks as well.

I found that this structure works well for small or medium size projects but after a while it can get a bit out of control. The main problem is that code that belong together and is relate is split all over the place what makes developing small modules in isolation very complicate.

I prefer the following code organization.

    |_app.js
    |_resources
      |_hello
        |_index.js
        |_handlers.js
        |_models
        | |_hello.js
        |_views
          |_index.ejs
          |_edit.ejs

This approach makes each module self contained.

## Caveats

You want to make sure that inter-dependency between this modules is keep to a minimum.

## Usage

Install as usual via npm

    npm install node-resources

To use the structure above you should do the following.

    var resources = require('node-resources');
    resources.registerRoutes(server, {path: __dirname + "/resources"});

Your route files should export a function that accepts the server as it's only parameter.

    module.exports = function (app) {
      app.get("/one", function () {});
      app.post("/one", function () {});
    };

## Api

The module exports only one method `registerRoutes(server, options)`
The server argument is your server or application on restify/express
The `options` argument can have two properties.

### options.path

This is mandatory and if not passed it should throw an Error.

### options.pattern

You can use this property to specify a pattern to search for a file inside the module to require. This is useful if you don't want to use an `index.js` file in each module or if you want to give use for something different.

Ex: given you have the following module.

    |_cars
      |_cars.routes.js
      |_handlers.js
      |_models
      | |_cars.js
      |_views
        |_list.ejs

Your `options.pattern` should be `[folder].routes.js`
The `[folder]` token is the only one accepted in the pattern and will be replaced by the folder name at the root of the module.
