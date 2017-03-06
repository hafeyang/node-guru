# NodeJS 骨架项目基本目录结构
```
.
├── Dockerfile 构建Docker镜像文件
├── README.md 自我介绍markdown
├── app.js 程序启动文件
├── lib
│   ├── logger.js 日志方法类
│   ├── mongo mongo连接
│   │   └── index.js
│   └── validation.js 校验封装方法
├── models model定义文件夹
│   └── secuhold.js
├── models.js models快捷引入文件
├── node_modules 依赖的node模块,通过npm install安装
├── package.json 声明入口，依赖模块等
├── routes 路由定义
│   └── query.js
├── sbin 相关的shell脚本
│   └── build.sh 构建镜像
└── settings.js 配置
```
# 主要用到的库/模块
* [Koa](http://koajs.com/) web框架
* [bluebird](http://bluebirdjs.com/) 高性能，Promise封装，当然也用原生的Promise
* [joi](https://github.com/hapijs/joi/) 校验http请求
* [lodash](https://lodash.com/) 实用方法封装
* [mongoose](http://mongoosejs.com/) 基于MongoDB的ORM库
* [winston](https://github.com/winstonjs/winston) 定义日志输出方式
* [ioredis](https://github.com/luin/ioredis) Redis访问库