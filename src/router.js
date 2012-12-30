'use strict';
var fs = require('fs');

function getName(folder, pattern) {
  if (pattern) {
    return "/" + pattern.replace(/\[folder\]/, folder);
  }
  return "/index";
}

function register(app, options) {
  return function (folder) {
    var modulePath = options.path + '/' + folder;
    var stat = fs.statSync(modulePath);
    var fileStat;
    var module;

    if (stat.isDirectory()) {
      modulePath += getName(folder, options.pattern);
      try {
        require(modulePath)(app);
      } catch (err) {
      }
    }
  };
}

exports.registerRoutes = function (app, options) {
  if (!options || !options.path) { throw new Error('Indicate the path to the resources.'); }
  var dirs = fs.readdirSync(options.path);
  dirs.forEach(register(app, options));
};
