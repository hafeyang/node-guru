# 数据校验
joi的数据校验不仅可以校验数据还能设置默认值
数据校验封装成了一个中间件`lib/validation.js`

下面是使用的一个demo

```js
// curl "http://localhost:3500/users/"
router.get('/users', validation({
  query: {
    page: joi.number().integer().min(1).default(1),
    limit: joi.number().integer().min(1).default(20),
    orderby: joi.string().valid(['loginId', 'createdAt', 'updatedAt']).default("createdAt"),
    dir: joi.string().valid(['asc', 'desc']).default("desc"),
    q: extJoi.string().json().default("{}")
  }
}), async (ctx) => {
  const { page, limit, orderby, dir } = ctx.request.query || {};
  const sort = { [orderby]: (dir === 'asc' ? 1 : -1) };
  const params = JSON.parse(ctx.request.query.q);
  // ...
});
```

