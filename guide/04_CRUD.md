# 实现一个增删改查模块

# Moogoose 实现数据库连接

```
const mongoose = require('mongoose');
const db = require("../lib/mongo").guru;
const Schema = mongoose.Schema;
```
[mongo/index.js](../lib/mongo/index.js) 定义了Proxy。
可以在访问属性时动态找到对应的数据库配置并做Mongo连接返回Mongo连接
配置在`settings.js`中定义，`settings.js`会根据当前`NODE_ENV`环境变量读取相应的配置


# Schema 定义
MongoDB 是一个Nosql数据库，也是一个不需要在数据库定义Schema。只需要在代码中申明即可

```js
const mongoose = require('mongoose');
const db = require("../lib/mongo").guru;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  loginId: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    index: true,
    unique: true
  }
}, {
  timestamps: { },  // createdAt,updatedAt 字段并自动更新
  toObject: { getters: true, virtuals: false },
  toJSON: { getters: true, virtuals: false },
});

// 定义复合索引
// UserSchema.index({ field1: 1, field2: 1 });

module.exports = db.model('User', UserSchema, 'users');

```


## Router接口定义
通常建议是用REST接口风格，下面是常见REST接口定义约定

```
GET /users : 查询users.
PUT /users : 保存一个user
POST /users : 新增一个user
DELETE /users : 批量删除一个users
DELETE /users/{id} : 删除一个users
GET /users/{id}/accessTokens : 获取单个用户子属性
GET /users/{id}/exists : 当个用户自定义行为
GET /users/findOne : 自定义动作
POST /users/login : 自定义动作

```

下面是关键代码：


```js
// routes/users.js
const db = require("../models");
const router = require('koa-router')();

curl "http://localhost:3500/users/"
router.get('/users', async (ctx) => {
  ctx.body = await db.user.find().exec().lean();
});


// curl "http://localhost:3500/users/" -H "Content-Type:application/json" -d '{"loginId":"abc","password":"abc","accessToken":"abc"}'
router.post('/users', async (ctx) => {
  try {
    ctx.body = await (new db.user(ctx.request.body)).save();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// curl -X PUT "http://localhost:3500/users/" -H "Content-Type:application/json" -d '{"loginId":"abcd","password":"abcd","accessToken":"abcd","_id": "58ba9cf48f62186b29ddd29e"}'
router.put('/users', async (ctx) => {
  try {
    ctx.body = await db.user.update({ _id: ctx.request.body._id }, ctx.request.body).exec();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});


// curl -X DELETE "http://localhost:3500/users/" -H "Content-Type:application/json" -d '["58ba9d3210fe906b623e0fea"]'
router.delete('/users', async (ctx) => {
  try {
    ctx.body = await db.user.remove({ _id: { $in: ctx.request.body } }).exec();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});


// curl -X DELETE "http://localhost:3500/users/58ba9d3210fe906b623e0fea"
router.delete('/users/:id([a-z0-9]{24})', async (ctx) => {
  try {
    ctx.body = await db.user.remove({ _id: ctx.params.id }).exec();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});


module.exports = router;
```

详细的实现可参见`routes/users.js`