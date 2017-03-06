# 单元测试

单元测试的重要性对于后端来不言而喻

单元测试使用的主要package:

* 单测runner [ava](https://github.com/koajs/koa)
* 统计/跟踪代码运行 [nyc](https://github.com/istanbuljs/nyc)
* http请求代理 [supertest](https://github.com/visionmedia/supertest)

## 写一个单测

 ```js
 // tests/user.test.js
const test = require('ava').test;
const helper = require('./helper');
test("user: should success when search", async (t) => {
  // 初始化数据库，先删除后新增记录
  await helper.initDb({
    user: [
      { loginId: "abc", password: "abc", accessToken: "abc" },
      { loginId: "abcd", password: "abcd", accessToken: "abcd" }
    ]
  });
  // 发起http请求
  const res = await helper.request({
    url: "/users",
  });
  t.is(res.statusCode, 200);
  t.is(res.body.data.length, 2);
});

```

## 运行单测


```shell
# 跑单独一个文件
npm run test tests/user.test.js
# 跑所有文件的单测
npm run test
# 跑所有单测并查看代码覆盖率
npm run test:cov

```

可以查看 `tests/helper.js`的相关实现