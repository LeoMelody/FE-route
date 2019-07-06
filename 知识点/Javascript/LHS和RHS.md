# LHS 和 RHS

LHS 赋值操作的左侧  Left Hand Side
RHS 赋值操作的右侧  Right Hand Side

## 从一道题开始

下面这两行代码，哪一行会报错？报什么错？为什么？

```
x = 1
console.log(y)
```

## 更方便的理解

LHS 侧重点在于赋值操作 可以理解为将值赋值给 = 左侧的这个东西，这个东西是啥，我不关心，反正就在作用域里找他呗，这层找不到就往上找，最后找不到就在全局里面创建个就完事了，反正我要完成赋值操作

RHS 侧重点在于查找 可以理解为我要找到这个变量啊，这个作用域里找不到就往上找，最后找不到难受到报错 RefrenceError
然而，对于方法和对象，如果找到的类型不匹配，则会报TypeError。这两个是非常常见的两个错误。除此之外还有SyntaxError 等，可参考[这篇文章](./JS_ERROR.md)。关于RHS报错，最重要的就是知道RefrenceError

看如下代码,最后a会怎么样

```
a = (function add(num) {
  return function(num) {
    a = num
  }
})(5);

a(6)

a 
```

解析： 
```
a = (function add(num) { // 1、一次对a的LHS操作，操作完后 a是个function
  return function(num) { // 4、num = 6的LHS隐式操作 
    a = num // 5、num RHS操作 和 a的LHS操作 此时将a赋值为6。
  }
})(5); // 2、发生了一次对add这个函数的 num = 5 的LHS操作以及一个隐式的RHS调用操作add(5)

a(6) // 3、对a的RHS操作，没问题

a // 6 6、整段代码执行完毕，从1-6中涉及的所有RHS都完美找到，不会报错
```

换个题咯，这次我直接标记顺序解析了

```
a = (function add(num) { // 1、对a进行LHS
  var b
  return function(num) { // 4、num = 6 LHS
    b = num // 5、num RHS 以及 b = 6 的 LHS 最后在add的函数作用域内找到了b
  }
})(5); // 2、发生了一次对add这个函数的 num = 5 的LHS操作以及一个隐式的RHS调用操作add(5)

a(6) // 3、a RHS

b // 6、b 的RHS 找不到b 报 RefrenceError

```

在了解LHS和RHS之前，你可能对作用域的赋值了解，也知道这些题的答案。但是真正的运行机制以及什么情况下会报错，会报什么错误在不了解LHS和RHS是不行的把

最后，再问你哪里会报错？报什么错？为什么？ 你会了吗？

```
x = 1
console.log(y)
```

## 严格模式

[github地址](https://github.com/LeoMelody/FE-route/tree/master/%E7%9F%A5%E8%AF%86%E7%82%B9/Javascript)