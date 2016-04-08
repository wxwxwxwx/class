# javascript 是什么

> 程序语言

# 程序语言是什么？

> 和计算机交流的语言

# 计算机是什么？

> 计算机就是用来做计算的

> 程序语言就是一条条的人类可读的指令
> 告诉计算机怎么去做计算

# 西红柿炒鸡蛋

> 材料： 西红柿两颗 鸡蛋两颗 油5mg 盐3mg
> 工具： 刀 铲子 
> 步骤： 1.开火
         2.放油
         3.油没热就一直烧，直到油热
         4.如果使用葱炒，放葱。
         5.炒5分钟

> 程序语言就像一份指令或者一份菜谱
> 详细的描述了计算机应该怎么去计算

> 一门程序语言必须具备一些能力，才能和计算机交流明白。

> 必须能很清楚的告诉计算机 怎样去存储数据
> 必须能很清楚的告诉计算机 怎样去做逻辑操作

## javascript中的逻辑操作

> + - * / % && || ！
> === ！== >= <= > < (esLint)
> if(){}
> if()else{}
> if(){}else if(){}else if(){}else{}
> switch(val){
	case 1;
	xxxxxx;
	break;
	xxxxxx
	case 2;
	xxxxxx
	break;
	default;
}
> for(var i = 0; i < 100; i++){
	
}
> while(i < 200){
	console.log(1);
	i++;
}
> do{
	console.log(12);
	i++;
}while(i<300)

## 数据存储

> var _v = 1                     Number
> var _v = 'aaa我'               String
> var _v = [1,2,3,'ss']          Array
> var _v = {a:1,c:2,b:3}         Object
> var _v = function(){}          function
> var _v = undefined;            undefined
> var _v = null                  null
> var _v = true                  Boolean

javascript中用类似于'表'的形式来存储(对象)

## 从函数这个对象说起

var fn = function(){
	alert(1);
	console.log(1);
	return(1);
}

函数会用一个不可见的属性'调用'来存储函数中的代码
{'调用'：'alert(1);console.log(1);return1'}
函数这个对象相比其他对象的特殊之处在于他可以被调用
函数名+()可以调用函数

> 定义函数的时候发生了什么？

要把代表函数的那张表构建完全
1.'调用'这个属性赋值，函数体内部的字符串
2.需要把当前可见范围内的所有的变量，由近到远的记录到链条中，形成一条作用域链。

> 调用函数的时候发生了什么

调用函数的时候，函数对象会去都去自己身上'调用'这个属性的值，取出来之后把这些字符串交给js解析器去当作javascript代码去执行。
与此同时还会取出函数的作用域链，用来辅助这段代码的执行。

# 在函数中 this 是什么？

只有在函数中才有this这个东西。
函数在定义的时候 this什么都不是
函数在定义的时候
根据调用者的不同的情况，来决定 this 变成什么

> this指针的第一种情况

```javascript
var da = function{
	var fn=function(){
	console.log(this)
	}
	fn();
}

da();
//正常的定义一个函数(不把函数作为某个对象的属性)
//正常的调用一个函数(使用()的方式调用函数)

//this是指向window对象

```

> this指针的第二种情况

```javascript

var obj = {
	a:1,
	b:2,
	c:funcgion(){
	console.log(this)
	}
}
obj.c()
//this 指向obj对象 指向它的宿主对象
var el = document.getElementById("aa")
el.onclick = function(){
	console.log(this);
}
el.onclick({client:234,})

```
> this指针的第三种情况

```javascript
//如果我们需要把this指针换成任何我们想要的对象
//我们需要借助函数对象身上的call和apply方法
var obj = {a:1,b:2};
var fn= function(){
	console.log(this)
}
obj.c=fn
fn()
//this 指向window
obj.c()
//this依然是指向obj对象
obj.c.call()
//用来改变this指向
obj.c.call('aaaab')
//this指向call方法中的第一个参数
fn.call([1,2,3,4])
//[1,2,3,4]

```

## 当我们写好一份程序之后，计算机在处理的过程中发生了什么？

对照代码，从上往下的开始解析
var el=document.getElementById('id')
var color = ['red','green']
if(color[1]==='green'){
	
}