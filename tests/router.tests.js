var should = require("should");
var resources = require('../src/router');

function getApp() {
  return {
    getRoutes: [],
    postRoutes: [],
    get: function (pattern, handler) {
      this.getRoutes.push({pattern: pattern, handler: handler});
    },
    post: function (pattern, handler) {
      this.postRoutes.push({pattern: pattern, handler: handler});
    }
  }
}

describe("registerRoutes(app, null)", function () {
  it('should register a set of routes using the given path', function (done) {
    var app = getApp();
    resources.registerRoutes(app, {path: __dirname + "/resources"});
    app.getRoutes.length.should.eql(2);
    app.postRoutes.length.should.eql(2);
    done();
  });

  it('should register a set of routes using the given path and pattern', function (done) {
    var app = getApp();
    resources.registerRoutes(app, {path: __dirname + "/resources", pattern: "[folder].routes"});
    app.getRoutes.length.should.eql(1);
    app.postRoutes.length.should.eql(1);
    done();
  });
});
