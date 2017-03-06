# 从0开始搭建一个NodeJS项目

## Step 1: 安装NodeJS环境
参见官网，安装完之后得到`node`,`npm`命令
npm: node package manage

```
node -v
v7.6.0
npm -v
4.1.2
```
## Step 2: 创建一个项目demo
```
mkdir demo
cd demo

npm init -y # 生成package.json文件 -y 标示全部默认
```

## Step 3: 安装Koa
```
npm install koa --save # --save 保存package.json文件
```

## Step 4: 修改index.js
```
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## Step 5:运行
```
node app.js

curl "http://localhost:3000" # Hello World!
```

## 参考
[Koa](http://koajs.com/)
