/* eslint no-console:0 */
const Koa = require('koa');
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const logger = require('./lib/logger');
const _ = require("lodash");
const router = require('koa-router')();
const users = require('./routes/users');
const http = require("http");

const app = new Koa();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));

// logger and error handler
app.use(async (ctx, next) => {
  const start = new Date();
  try {
    await next();
  } catch (error) {
    logger.error('server error', error);
    ctx.status = error.status || 500;
  }
  const responseTime = new Date() - start;
  const logObj = { responseTime };
  ["method", "url", "res.statusCode", "req.headers"].forEach(n => (logObj[n] = _.get(ctx, n)));
  logger.info(logObj);
});

router.use(users.routes());
app.use(router.routes(), router.allowedMethods());


const server = http.createServer(app.callback());
if (!module.parent) {
  server.listen(process.env.PORT || 3500);
  server.on('listening', () => {
    logger.info('Server listening on http://localhost:%d', server.address().port);
  });
}

process.on('uncaughtException', (err) => {
  const errObj = _.isString(err) ? new Error(err) : err;
  logger.error(errObj.stack);
  try {
    const killTimer = setTimeout(() => {
      process.exit(1);
    }, 30000);
    killTimer.unref();
    server.close();
  } catch (e) {
    logger.error('error when exit', e.stack);
  }
});
module.exports = server;
