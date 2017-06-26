const env = process.env.NODE_ENV || 'development'; // development production test_ci ..
const _ = require("lodash");

const settings = {
  base: {
    log: {
      console: true,
      fields: ["method", "url", "res.statusCode", "req.headers", "request.body", "body"]
    },
    errorStack: true
  },
  development: {
    mongos: {
      guru: {
        hosts: [
          '127.0.0.1:27017'
        ],
        database: 'node-guru',
        options: {
        }
      }
    }
  },
  test_local: {
    mongos: {
      guru: {
        hosts: [
          '127.0.0.1:27017'
        ],
        database: 'node-guru-test-local'
      }
    }
  }
};
module.exports = _.defaultsDeep(settings[env], settings.base);
