const db = require("../models");
/**
 * 判断是否登录中间件
 * @param opt.reject {Boolean} 没有登录返回400 默认true
 * @param opt.identity {Boolean} ctx.user 赋值当前用户 默认true
 */
module.exports = (opt = {}) => async (ctx, next) => {
  const token = ctx.cookies.get("token");
  const { reject = true, identity = true } = opt;
  if (!token && reject) {
    ctx.status = 400;
    ctx.body = { message: "not logined" };
    return false;
  }
  if (identity) {
    const user = await db.user.findOne({ accessToken: token }).select("loginId createdAt").lean().exec();
    ctx.user = user;
  }
  return next();
};