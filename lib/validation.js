/**
 * koa joi validation middleware
 * inspired from https://github.com/andrewkeig/express-validation
 * @usage
 *  router.get(urlpatern,require("validation")({
 *    query:{ // query params header body cookies
 *      a:joi.string().length(6)
 *    }
 * }))
 */
const _ = require('lodash');
const joi = require("joi");

module.exports = schema => (ctx, next) => {
  const pickedCtx = {};
  const mappings = {
    query: "request.query",
    header: "request.header",
    body: "request.body",
  };
  Object.keys(schema).forEach((k) => {
    pickedCtx[k] = _.get(ctx, mappings[k] || k) || {};
  });
  return joi.validate(pickedCtx, schema, {
    abortEarly: false,
    allowUnknown: true
  }, (err, newCtx) => {
    if (err) {
      ctx.status = 400;
      ctx.body = {
        errors: err.details.map(d => ({
          message: d.message,
          type: d.type,
          path: d.path
        }))
      };
      return false;
    }
    Object.keys(newCtx).forEach((k) => {
      _.extend(_.get(ctx, mappings[k] || k) || {}, newCtx[k]);
    });
    return next();
  });
};