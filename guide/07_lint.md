# 语法检查
JavaScript是一门动态语言，理论上讲不需要太多讲究语法格式，但是为了：

* 保证良好的阅读风格以
* 消除一些潜在的bug
* 保持更好的代码风格
* 有一个叫节操的东西，免得别人总骂你代码写的烂

引入eslint做代码风格检查，相关配置在`.eslintrc`中定义，个别文件需要临时禁用某些规则可以在文件上写类似：

```js
/* eslint no-console:0 */
```

市面上比较主流的代码检查风格是airbnb的

```js
//.eslintrc

module.exports = {
  extends: "airbnb-base",
  rules:{}
}
```

各种编辑器的eslint验证请自行Google，`Visual Studio Code` 自带


eslint的各种规则参见：[http://eslint.org/docs/rules/](http://eslint.org/docs/rules/)