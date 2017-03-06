# 中间件

中间件是Koa中一个很重要的概念，通常用于拦截请求做通用处理，保证了Koa的扩展性

比如`app.js`中记录日志以及错误处理的中间件


```js
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
```

[目前开源的中间件](https://github.com/koajs/koa/wiki)