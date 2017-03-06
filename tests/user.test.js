const test = require('ava').test;
const helper = require('./helper');
const mongoose = require('mongoose');
const uuidV4 = require('uuid/v4');

const ObjectId = mongoose.Types.ObjectId;
const MD5_123 = "202cb962ac59075b964b07152d234b70";
const MD5_456 = "250cf8b51c773f3f8dc8b4be867a9a02";

test("user: should success when search", async (t) => {
  await helper.initDb({
    user: [
      { loginId: "abc", password: "abc", accessToken: "abc" },
      { loginId: "abcd", password: "abcd", accessToken: "abcd" }
    ]
  });
  const res = await helper.request({
    url: "/users",
  });
  t.is(res.statusCode, 200);
  t.is(res.body.data.length, 2);
});
test("user: should get 2 validate errors when error input", async (t) => {
  const res = await helper.request({
    url: "/users",
    method: "post",
    data: {
      loginId: "123",
      password: "123"
    }
  });
  t.is(res.statusCode, 400);
  t.is(res.body.errors.length, 2);
});
test("user: password should encrypted when creating", async (t) => {
  // clear db
  await helper.initDb({
    user: []
  });
  const res = await helper.request({
    url: "/users",
    method: "post",
    data: {
      loginId: "admin",
      password: MD5_123 // md5("123")
    }
  });
  t.is(res.statusCode, 200);
  const queryResult = await helper.request({
    url: "/users",
  });

  t.is(queryResult.statusCode, 200);
  t.is(queryResult.body.data[0].password.indexOf("sha"), 0);
});
test("user: should login success and refesh token", async (t) => {
  const _id = ObjectId();
  const oldToken = uuidV4();
  await helper.initDb({
    user: [
      { _id, loginId: "admin", password: MD5_123, accessToken: oldToken }
    ]
  });
  const res = await helper.request({
    url: "/users/login",
    method: "post",
    data: {
      loginId: "admin",
      password: MD5_123
    }
  });
  t.is(res.headers["set-cookie"][0], `token=${res.body.accessToken}; path=/; httponly`);
  t.is(res.statusCode, 200);
  t.is(res.body._id, _id.toString());
  t.is(oldToken !== res.body.accessToken, true);

  const resNew = await helper.request({
    url: "/users/by_accesstoken",
    method: "get",
    header: { Cookie: `token=${res.body.accessToken}`}
  });
  t.is(resNew.statusCode, 200);
});
test("user: should login failed when password incorrect", async (t) => {
  const _id = ObjectId();
  await helper.initDb({
    user: [
      { _id, loginId: "admin", password: MD5_123 }
    ]
  });
  const res = await helper.request({
    url: "/users/login",
    method: "post",
    data: {
      loginId: "admin",
      password: "0".repeat(32)
    }
  });
  t.is(res.statusCode, 400);
  t.is(res.body.message, 'loginId/password not matched');
});
test("user: should re generate password when update", async (t) => {
  const _id = ObjectId();
  await helper.initDb({
    user: [
      { _id, loginId: "admin", password: MD5_123 }
    ]
  });
  const resUpdate = await helper.request({
    url: "/users",
    method: "put",
    data: {
      _id,
      loginId: "admin",
      password: MD5_456
    }
  });
  t.is(resUpdate.statusCode, 200);

  const res = await helper.request({
    url: "/users/login",
    method: "post",
    data: {
      loginId: "admin",
      password: MD5_456
    }
  });
  t.is(res.statusCode, 200);
  t.is(res.body._id, _id.toString());
});
test("user: should success when delete batch", async (t) => {
  const _id1 = ObjectId();
  const _id2 = ObjectId();
  await helper.initDb({
    user: [
      { _id: _id1, loginId: "admin", password: MD5_123 },
      { _id: _id2, loginId: "admin2", password: MD5_123 }
    ]
  });
  const resDelete = await helper.request({
    url: "/users",
    method: "delete",
    data: [_id1.toString(), _id2.toString()]
  });
  t.is(resDelete.statusCode, 200);

  const res = await helper.request({
    url: "/users",
    method: "get"
  });
  t.is(res.statusCode, 200);
  t.is(res.body.data.length, 0);
});
test("user: should success when delete single", async (t) => {
  const _id1 = ObjectId();
  const _id2 = ObjectId();
  await helper.initDb({
    user: [
      { _id: _id1, loginId: "admin", password: MD5_123 },
      { _id: _id2, loginId: "admin2", password: MD5_123 }
    ]
  });
  const resDelete = await helper.request({
    url: `/users/${_id1}`,
    method: "delete"
  });
  t.is(resDelete.statusCode, 200);

  const res = await helper.request({
    url: "/users",
    method: "get"
  });
  t.is(res.statusCode, 200);
  t.is(res.body.data.length, 1);
});
test("user: should get user info by accessToken", async (t) => {
  const token = uuidV4();
  const _id2 = ObjectId();
  await helper.initDb({
    user: [
      { _id: _id2, loginId: "admin", password: MD5_123, accessToken: token }
    ]
  });

  const res = await helper.request({
    url: "/users/by_accesstoken",
    method: "get",
    header: { Cookie: `token=${token}` }
  });
  t.is(res.statusCode, 200);
});

test("user: should failed to get user info by accessToken when no token input", async (t) => {
  const res = await helper.request({
    url: "/users/by_accesstoken",
    method: "get"
  });
  t.is(res.statusCode, 400);
});