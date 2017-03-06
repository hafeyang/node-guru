# 部署

## 使用Node周边工具PM2/forever部署

```
npm install pm2 -g

pm2 start app.js --name "guru"
[PM2] Starting /Users/gf/Projects/node-guru/app.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────┬───────────┬──────────┐
│ App name │ id │ mode │ pid  │ status │ restart │ uptime │ cpu │ mem       │ watching │
├──────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────┼───────────┼──────────┤
│ guru     │ 0  │ fork │ 5109 │ online │ 0       │ 0s     │ 0%  │ 12.9 MB   │ disabled │
└──────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────┴───────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## Docker构建镜像部署
```
cd sbin
sh build.sh

docker push xxxx

docker pull xxxx

docker run -d --name=guru -p 3500:3500 xxxx
```

## 常见web前后端nginx配置

```
  location / {
    root /var/www/;
  }

  location /api {
    proxy_pass http://localhost:3500/;
  }

```
后端接口通常通过端口转发到对应服务，前端本地开发也可以`/api`使用服务器代理