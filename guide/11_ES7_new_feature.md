# ES6/7 语言新特性

ES6（ECMAScript2015）的出现，无疑给前端开发人员带来了新的惊喜，它包含了一些很棒的新特性，可以更加方便的实现很多复杂的操作，提高开发人员的效率。

以下是ES6排名前十的最佳特性列表（排名不分先后）：
* Default Parameters（默认参数） in ES6
* Template Literals （模板文本）in ES6
* Multi-line Strings （多行字符串）in ES6
* Destructuring Assignment （解构赋值）in ES6
* Enhanced Object Literals （增强的对象文本）in ES6
* Arrow Functions （箭头函数）in ES6
* Promises in ES6
* Block-Scoped Constructs Let and Const（块作用域构造Let and Const）
* Classes（类） in ES6
* Modules（模块） in ES6


1.Default Parameters（默认参数） in ES6
还记得我们以前不得不通过下面方式来定义默认参数：

```js
var link = function (height, color, url) {
    var height = height || 50;
    var color = color || 'red';
    var url = url || 'http://azat.co';
    ...
}
```

一切工作都是正常的，直到参数值是0后，就有问题了，因为在JavaScript中，0表示fasly，它是默认被hard-coded的值，而不能变成参数本身的值。当然，如果你非要用0作为值，我们可以忽略这一缺陷并且使用逻辑OR就行了！但在ES6，我们可以直接把默认值放在函数申明里：

```js
var link = function(height = 50, color = 'red', url = 'http://azat.co') {
  ...
}
```

顺便说一句，这个语法类似于Ruby！

2.Template Literals（模板对象） in ES6
在其它语言中，使用模板和插入值是在字符串里面输出变量的一种方式。因此，在ES5，我们可以这样组合一个字符串：
```js
var name = 'Your name is ' + first + ' ' + last + '.';
var url = 'http://localhost:3000/api/messages/' + id;

```

幸运的是，在ES6中，我们可以使用新的语法$ {NAME}，并把它放在反引号里：

```js
var name = `Your name is ${first} ${last}. `;
var url = `http://localhost:3000/api/messages/${id}`;
```

3.Multi-line Strings （多行字符串）in ES6
ES6的多行字符串是一个非常实用的功能。在ES5中，我们不得不使用以下方法来表示多行字符串：
```js
var roadPoem = 'Then took the other, as just as fair,nt'
    + 'And having perhaps the better claimnt'
    + 'Because it was grassy and wanted wear,nt'
    + 'Though as for that the passing therent'
    + 'Had worn them really about the same,nt';
var fourAgreements = 'You have the right to be you.\n
    You can only be you when you do your best.';
```

然而在ES6中，仅仅用反引号就可以解决了：
```js
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`;
var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`;
```

4.Destructuring Assignment （解构赋值）in ES6
解构可能是一个比较难以掌握的概念。先从一个简单的赋值讲起，其中house 和 mouse是key，同时house 和mouse也是一个变量，在ES5中是这样：

```js
var data = $('body').data(), // data has properties house and mouse
   house = data.house,
   mouse = data.mouse;
```

以及在node.js中用ES5是这样：
```js
var jsonMiddleware = require('body-parser').jsonMiddleware ;
var body = req.body, // body has username and password
   username = body.username,
   password = body.password;
```

在ES6，我们可以使用这些语句代替上面的ES5代码：

```js
var { house, mouse} = $('body').data(); // we'll get house and mouse variables
var {jsonMiddleware} = require('body-parser');
var {username, password} = req.body;
```

这个同样也适用于数组，非常赞的用法：
```js
var [col1, col2]  = $('.column'),
   [line1, line2, line3, , line5] = file.split('n');
```

我们可能需要一些时间来习惯解构赋值语法的使用，但是它确实能给我们带来许多意外的收获。
5.Enhanced Object Literals （增强的对象字面量）in ES6
使用对象文本可以做许多让人意想不到的事情！通过ES6，我们可以把ES5中的JSON变得更加接近于一个类。
下面是一个典型ES5对象文本，里面有一些方法和属性：
```js
var serviceBase = {port: 3000, url: 'azat.co'},
    getAccounts = function(){return [1,2,3]};
var accountServiceES5 = {
  port: serviceBase.port,
  url: serviceBase.url,
  getAccounts: getAccounts,
   toString: function() {
      return JSON.stringify(this.valueOf());
  },
  getUrl: function() {return "http://" + this.url + ':' + this.port},
  valueOf_1_2_3: getAccounts()
}
```

如果我们想让它更有意思，我们可以用Object.create从serviceBase继承原型的方法：
```js
var accountServiceES5ObjectCreate = Object.create(serviceBase)
var accountServiceES5ObjectCreate = {
  getAccounts: getAccounts,
  toString: function() {
    return JSON.stringify(this.valueOf());
  },
  getUrl: function() {return "http://" + this.url + ':' + this.port},
  valueOf_1_2_3: getAccounts()
}
```

我们知道，accountServiceES5ObjectCreate 和accountServiceES5 并不是完全一致的，因为一个对象(accountServiceES5)在__proto__对象中将有下面这些属性：
图片1
为了方便举例，我们将考虑它们的相似处。所以在ES6的对象文本中，既可以直接分配getAccounts: getAccounts,也可以只需用一个getAccounts，此外，我们在这里通过__proto__（并不是通过’proto’）设置属性，如下所示：

```js
var serviceBase = {port: 3000, url: 'azat.co'},
getAccounts = function(){return [1,2,3]};
var accountService = {
    __proto__: serviceBase,
    getAccounts,
另外，我们可以调用super防范，以及使用动态key值(valueOf_1_2_3):
    toString() {
     return JSON.stringify((super.valueOf()));
    },
    getUrl() {return "http://" + this.url + ':' + this.port},
    [ 'valueOf_' + getAccounts().join('_') ]: getAccounts()
};
console.log(accountService)
```

ES6对象文本是一个很大的进步对于旧版的对象文本来说。
6.Arrow Functions in（箭头函数） ES6
这是我迫不及待想讲的一个特征，CoffeeScript 就是因为它丰富的箭头函数让很多开发者喜爱。在ES6中，也有了丰富的箭头函数。这些丰富的箭头是令人惊讶的因为它们将使许多操作变成现实，比如，
以前我们使用闭包，this总是预期之外地产生改变，而箭头函数的迷人之处在于，现在你的this可以按照你的预期使用了，身处箭头函数里面，this还是原来的this。
有了箭头函数在ES6中， 我们就不必用that = this或 self =  this  或 _this = this  或.bind(this)。例如，下面的代码用ES5就不是很优雅：

```js
var _this = this;
$('.btn').click(function(event){
  _this.sendData();
})
```

在ES6中就不需要用 _this = this：

```js
$('.btn').click((event) =>{
  this.sendData();
})
```
不幸的是，ES6委员会决定，以前的function的传递方式也是一个很好的方案，所以它们仍然保留了以前的功能。
下面这是一个另外的例子，我们通过call传递文本给logUpperCase() 函数在ES5中：

```js
var logUpperCase = function() {
  var _this = this;

  this.string = this.string.toUpperCase();
  return function () {
    return console.log(_this.string);
  }
}

logUpperCase.call({ string: 'ES6 rocks' })();
```
而在ES6，我们并不需要用_this浪费时间：

```js
var logUpperCase = function() {
  this.string = this.string.toUpperCase();
  return () => console.log(this.string);
}
logUpperCase.call({ string: 'ES6 rocks' })();

```
请注意，只要你愿意，在ES6中=>可以混合和匹配老的函数一起使用。当在一行代码中用了箭头函数，它就变成了一个表达式。它将暗地里返回单个语句的结果。如果你超过了一行，将需要明确使用return。
这是用ES5代码创建一个消息数组：

```js
var ids = ['5632953c4e345e145fdf2df8','563295464e345e145fdf2df9'];
var messages = ids.map(function (value) {
  return "ID is " + value; // explicit return
});
```
用ES6是这样：
```js
var ids = ['5632953c4e345e145fdf2df8','563295464e345e145fdf2df9'];
var messages = ids.map(value => `ID is ${value}`); // implicit return
```

请注意，这里用了字符串模板。
在箭头函数中，对于单个参数，括号()是可选的，但当你超过一个参数的时候你就需要他们。
在ES5代码有明确的返回功能：
```js
var ids = ['5632953c4e345e145fdf2df8', '563295464e345e145fdf2df9'];
var messages = ids.map(function (value, index, list) {
  return 'ID of ' + index + ' element is ' + value + ' '; // explicit return
});
```
在ES6中有更加严谨的版本，参数需要被包含在括号里并且它是隐式的返回：

```js
var ids = ['5632953c4e345e145fdf2df8','563295464e345e145fdf2df9'];
var messages = ids.map((value, index, list) => `ID of ${index} element is ${value} `); // implicit return
```

7. Promises in ES6
Promises 是一个有争议的话题。因此有许多略微不同的promise 实现语法。Q，bluebird，deferred.js，vow, avow, jquery 一些可以列出名字的。也有人说我们不需要promises，仅仅使用异步，生成器，回调等就够了。但令人高兴的是，在ES6中有标准的Promise实现。
下面是一个简单的用setTimeout()实现的异步延迟加载函数:

```js
setTimeout(function(){
  console.log('Yay!');
}, 1000);

var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
}).then(function() {
  console.log('Yay!');
});
```
或者用ES6的箭头函数：

```js
var wait1000 =  new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000);
}).then(()=> {
  console.log('Yay!');
});
```
到目前为止，代码的行数从三行增加到五行，并没有任何明显的好处。确实，如果我们有更多的嵌套逻辑在setTimeout()回调函数中，我们将发现更多好处：

```js
setTimeout(function(){
  console.log('Yay!');
  setTimeout(function(){
    console.log('Wheeyee!');
  }, 1000)
}, 1000);
```
在ES6中我们可以用promises重写：

```js
var wait1000 =  ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)});
wait1000()
    .then(function() {
        console.log('Yay!')
        return wait1000()
    })
    .then(function() {
        console.log('Wheeyee!')
    });
```
还是不确信Promises 比普通回调更好？其实我也不确信，我认为一旦你有回调的想法，那么就没有必要额外增加promises的复杂性。
虽然，ES6 有让人崇拜的Promises 。Promises 是一个有利有弊的回调但是确实是一个好的特性，更多详细的信息关于promise:Introduction to ES6 Promises.
8.Block-Scoped Constructs Let and Const（块作用域和构造let和const）
在ES6代码中，你可能已经看到那熟悉的身影let。在ES6里let并不是一个花俏的特性，它是更复杂的。Let是一种新的变量申明方式，它允许你把变量作用域控制在块级里面。我们用大括号定义代码块，在ES5中，块级作用域起不了任何作用：
```js
function calculateTotalAmount (vip) {
  var amount = 0;
  if (vip) {
    var amount = 1;
  }
  { // more crazy blocks!
    var amount = 100;
    {
      var amount = 1000;
    }
  }
  return amount;
}
console.log(calculateTotalAmount(true));
```
结果将返回1000，这真是一个bug。在ES6中，我们用let限制块级作用域。而var是限制函数作用域。
```js
function calculateTotalAmount (vip) {
  var amount = 0; // probably should also be let, but you can mix var and let
  if (vip) {
    let amount = 1; // first amount is still 0
  }
  { // more crazy blocks!
    let amount = 100; // first amount is still 0
    {
      let amount = 1000; // first amount is still 0
    }
  }
  return amount;
}

console.log(calculateTotalAmount(true));
```
这个结果将会是0，因为块作用域中有了let。如果（amount=1）.那么这个表达式将返回1。谈到const，就更加容易了；它就是一个不变量，也是块级作用域就像let一样。下面是一个演示，这里有一堆常量，它们互不影响，因为它们属于不同的块级作用域:

```js
function calculateTotalAmount (vip) {
  const amount = 0;
  if (vip) {
    const amount = 1;
  }
  { // more crazy blocks!
    const amount = 100 ;
    {
      const amount = 1000;
    }
  }
  return amount;
}
console.log(calculateTotalAmount(true));
```

从我个人看来，let 和const使这个语言变复杂了。没有它们的话，我们只需考虑一种方式，现在有许多种场景需要考虑。
9. Classes （类）in ES6
如果你喜欢面向对象编程（OOP），那么你将喜爱这个特性。以后写一个类和继承将变得跟在facebook上写一个评论那么容易。
类的创建和使用真是一件令人头疼的事情在过去的ES5中，因为没有一个关键字class （它被保留，但是什么也不能做）。在此之上，大量的继承模型像pseudo classical, classical, functional 更加增加了混乱，JavaScript 之间的宗教战争只会更加火上浇油。
用ES5写一个类，有很多种方法，这里就先不说了。现在就来看看如何用ES6写一个类吧。ES6没有用函数, 而是使用原型实现类。我们创建一个类baseModel ，并且在这个类里定义了一个constructor 和一个 getName()方法：

```js
class baseModel {
  constructor(options, data) { // class constructor，node.js 5.6暂时不支持options = {}, data = []这样传参
    this.name = 'Base';
    this.url = 'http://azat.co/api';
    this.data = data;
    this.options = options;
   }

    getName() { // class method
        console.log(`Class name: ${this.name}`);
    }
}
```

注意我们对options 和data使用了默认参数值。此外方法名也不需要加function关键字，而且冒号(：)也不需要了。另外一个大的区别就是你不需要分配属性this。现在设置一个属性的值，只需简单的在构造函数中分配。
AccountModel 从类baseModel 中继承而来:
```js
class AccountModel extends baseModel {
    constructor(options, data) {
           super({private: true}, ['32113123123', '524214691']); //call the parent method with super
       this.name = 'Account Model';
       this.url +='/accounts/';
    }

    get accountsData() { //calculated attribute getter
    // ... make XHR
        return this.data;
    }
}
```
那么，你如何调用他们呢？它是非常容易的：
```js
let accounts = new AccountModel(5);
accounts.getName();
console.log('Data is %s', accounts.accountsData);
```
结果令人惊讶，输出是：
Class name: Account Model
Data is  32113123123,524214691

10. Modules （模块）in ES6
众所周知，在ES6以前JavaScript并不支持本地的模块。人们想出了AMD，RequireJS，CommonJS以及其它解决方法。现在ES6中可以用模块import 和export 操作了。
在ES5中，你可以在 <script>中直接写可以运行的代码（简称IIFE），或者一些库像AMD。然而在ES6中，你可以用export导入你的类。下面举个例子，在ES5中,module.js有port变量和getAccounts 方法:

```js
module.exports = {
  port: 3000,
  getAccounts: function() {
    ...
  }
}
```
在ES5中，main.js需要依赖require('module') 导入module.js：
var service = require('module.js');
console.log(service.port); // 3000
但在ES6中，我们将用export and import。例如，这是我们用ES6 写的module.js文件库：
```js

export var port = 3000;
export function getAccounts(url) {
  ...
}
```
如果用ES6来导入到文件main.js中，我们需用import {name} from 'my-module'语法，例如：

```js
import {port, getAccounts} from 'module';
console.log(port); // 3000
```
或者我们可以在main.js中把整个模块导入, 并命名为 service：

```js
import * as service from 'module';
console.log(service.port); // 3000
```
从我个人角度来说，我觉得ES6模块是让人困惑的。但可以肯定的事，它们使语言更加灵活了。
并不是所有的浏览器都支持ES6模块，所以你需要使用一些像jspm去支持ES6模块。
更多的信息和例子关于ES6模块，请看 this text。不管怎样，请写模块化的JavaScript。