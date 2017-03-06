/* eslint import/no-dynamic-require:0,no-restricted-syntax:0 */
const _ = require('lodash');
const Promise = require('bluebird');
const request = require("supertest-as-promised")(Promise);

const app = require('../app');

const helper = module.exports = {};

helper.config = require('../settings');

helper.initDb = data =>
  Promise.map(Object.keys(data), (model) => {
    const rows = data[model];
    const m = require(`../models/${model}`);
    return m.remove({}).exec()
      .then(() =>
        Promise.map(rows, row =>
          (new m(row)).save()
        )
      );
  });

helper.request = (options, query) => {
  const opts = _.isString(options) ? { url: options, query } : options;
  const method = opts.method || opts.methods || 'get';
  let req = request(opts.app || app)[method](opts.url);
  if (opts.data) {
    req = req.send(opts.data);
  }

  if (opts.header && _.isObject(opts.header)) {
    _.each(opts.header, (val, key) => req.set(key, val));
  }

  return req
    .query(opts.query || opts.qs || {})
    .set('Accept', 'application/json')
    .toPromise();
};
