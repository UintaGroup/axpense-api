var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'axpense-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/axpense:27017'
  },

  test: {
    root: rootPath,
    app: {
      name: 'axpense-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/axpense_test:27017'
  },

  production: {
    root: rootPath,
    app: {
      name: 'axpense-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/axpense-api-production'
  }
};

module.exports = config[env];
