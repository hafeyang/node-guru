
const mongoose = require('mongoose');

const logger = require('./logger');
const config = require("config");

const mongos = config.get("mongos");

mongoose.Promise = require('bluebird');
require('bluebird').promisifyAll(require('mongoose'));

const createDb = (payload) => {
  const uri = payload.uri || `mongodb://${payload.hosts.join(',')}/${payload.database}`;
  logger.info(`mongoose connection uri: ${uri}`);

  const db = mongoose.createConnection(uri, payload.options);
  db.on('error', (err) => {
    logger.error(`mongoose connection error: ${err}, retry after 5s`);
    return setTimeout(() => db.open(uri), 5000);
  });

  db.on('connected', () => logger.info(`mongoose connected`));
  db.on('disconnect', () => {
    logger.error(`mongoose disconnected, retry after 5s`);
    return setTimeout(() => db.open(uri), 5000);
  });
  return db;
};

const dbs = new Proxy({}, {
  get(target, dbName) {
    if (dbName in target) { return target[dbName]; }
    if (typeof dbName !== 'string') { return undefined; }

    if (!(dbName in mongos)) {
      return logger.error(`${dbName} not defined in mongos config`);
    }

    const payload = mongos[dbName];
    payload.options = Object.assign({}, mongos.options, payload.options);
    target[dbName] = createDb(payload);
    return target[dbName];
  }
});

module.exports = dbs;
