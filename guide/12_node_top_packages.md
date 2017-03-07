# 2016流行的NodeJS包/库
[原文不仅是有NodeJS，有Web前端所有的排名趋势，墙裂推荐](https://risingstars2016.js.org/)
链接见原文

简单理解：
Express/Koa:手动挡
Keystone: 自动挡
Loopback: 手自一体


## Express

When you build a web application with node.js, Express is often considered as the de-facto web server. Its philosophy (a minimalistic core that you can extend using middleware packages) is familiar to most of node.js developers.

Express目前还是市面上的主流

## Koa

Koa philosophy is close to Express but it's built using ES6 generators to avoid a problem sometimes called Callback Hell.

Koa是未来无疑，出于Express，但是高于Express

## Feathers

Feathers is a very flexible solution to create a "service oriented" architecture, it's a good fit to create node.js microservices.

## Nodal

Nodal framework targets stateless and distributed services connected to PostgreSQL databases.

## Keystone

Keystone is one of the best solutions I know to get an admin client up and running, in order to manage the content coming from a MongoDB database. The Admin UI is automatically generated from the models, has all CRUD actions and nice filters.

傻瓜式生成后台界面，官网上有演示demo

## Sails

Sails is a full MVC framework, very inspired by Ruby on Rails (hence the name Sails!). It has been around for a long time. It can play with any kind of database, SQL or non-SQL.

## Loopback

Loopback is another mature framework with a lot of built-in features, including authentication with token and connectors to any kind of database.

The killer feature is the API explorer that lets developers check all API end-points in an intuitive way, with the ability to check any user's token. It's definitively a good choice if you have to build an API.

快速生成REST API，但是也能满足开发