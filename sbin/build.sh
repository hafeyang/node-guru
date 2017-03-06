#!/bin/bash

cd $(cd `dirname $0`;pwd)

docker_host=docker.zhehekeji.com
name=node-guru
ver=`date "+%Y%m%d"`

branch='dev'
if [ x$1 != x ];then
  branch=$1
fi

target=$name
if [ x$branch != xmaster ];then
  target=${target}_${branch}
fi

# build
image=${docker_host}/${target}:${ver}

echo "building app:version ---> $image"

cd ..
docker build -t $image .
# docker push $image
