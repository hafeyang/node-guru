const db = require("../models");
const Promise = require('bluebird');
const joi = require("joi");
const validation = require("../lib/validation");
const extJoi = require("../lib/joi_ext");
const router = require('koa-router')();
const hash = require('password-hash');
const _ = require("lodash");
const uuidV4 = require('uuid/v4');
const auth = require("../lib/auth")


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
  ctx.body = await Promise.props({
    data: db.user.find(params)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .lean()
      .exec(),
    total: db.user.count(params),
    page,
    limit
  })
    .then((data) => {
      data.pages = Math.ceil(data.total / limit);
      return data;
    });
});

const userValidaion = {
  body: {
    loginId: joi.string().min(5).required(),
    password: joi.string().length(32)
  }
};

const userUpdateValidation = _.defaultsDeep({
  body: { _id: joi.string().length(24).required() }
}, userValidaion);


// curl "http://localhost:3500/users/" -H "Content-Type:application/json" -d '{"loginId":"abc","password":"abc","accessToken":"abc"}'
router.post('/users', validation(userValidaion), async (ctx) => {
  try {
    ctx.body = await (new db.user(ctx.request.body)).save();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

// curl -X PUT "http://localhost:3500/users/" -H "Content-Type:application/json" -d '{"loginId":"abcd","password":"abcd","accessToken":"abcd","_id": "58ba9cf48f62186b29ddd29e"}'
router.put('/users', validation(userUpdateValidation), async (ctx) => {
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


router.post('/users/login', validation(userValidaion), async (ctx) => {
  try {
    const body = ctx.request.body;
    const user = await db.user.findOne({ loginId: body.loginId }).exec();
    if (!user) {
      ctx.status = 400;
      ctx.body = { message: `user ${body.loginId} does not exist` };
      return;
    }
    if (!hash.verify(body.password, user.password)) {
      ctx.status = 400;
      ctx.body = { message: `loginId/password not matched` };
      return;
    }
    user.accessToken = uuidV4(); // refresh accessToken
    await user.save();
    ctx.cookies.set('token', user.accessToken);
    ctx.status = 200;
    ctx.body = { _id: user._id, accessToken: user.accessToken };
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.get('/users/by_accesstoken', auth(), async (ctx) => {
  try {
    if (!ctx.user) {
      ctx.status = 400;
      ctx.body = { message: `accessToken does not exist` };
      return;
    }
    ctx.status = 200;
    ctx.body = ctx.user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;