# jQuery

前端开发在开始写js代码之前一般先要解决的两个问题。


1.解决js标准本身的兼容性问题，es5shim.js
只需要一百多行代码即可解决
2.解决DOM扩展部分的兼容性问题。
需要一万行代码，经过江湖厮杀，最终jQuery称霸。

```html
//第一个引入的js库用来解决兼容性问题
<!-- <script src="jquery.js></script>
<script src="header.js></script>
<script src="footer.js></script> -->

```
分开引入的js文件一定要解决一个问题，
不能污染全局作用域

```javascript
var getElement = function(selector){
	if( document.querySelector ){
		return document.querySelector(selector)
	}else{
	 	console.error('please change you browers')
	}
}

```


```javascript
var a = getElement('.aaa')
```
两个问题
1.用户需要学习一门全新的语法。
2.用户需要避开库里面的所有全局变量。


## 实现原理
dom对象
```javascript
var el = {
	offsetWidth:12,
	__proto__:HEMLDivElement
	title:'aa'
	 __proto__:HEMLElement
	 src:'xxx.png'
	  __proto__:Element
	  getAttribute:fn;
	    __proto__:Node
	    nodeName:'IMG'
}
```
dom集合

```javascript
var els = {
	0:el,
	1:el,
	2:el,
	length:3
	__proto__:(并没有有价值的方法和属性)
}

```
jQuery对象

```javascript
var els = {
	0:el,
	1:el,
	2:el,
	length:3
	__proto__:
	 addClass:fn,
	 removeClass:fn,
	 tooggleClass:fn,
	 css:fn,
	 prop:fn,
	 ........
}
```
jQuery是javascript的一个库
库就类似与一个仓库，以某种方式组织起来，存放方便易用函数的函数集合
jQuery库的优点：
1.全面解决pc端的兼容性问题
2.语法精炼，性能好。插件库非常庞大。



jQuery版本号之间的区别：
1.xxx->1.12  支持ie6-8
2.0          彻底的放弃了ie<10的支持。转向移动端开发
3.0 	 	 


## jQuery原理：
```javascript
(function(){
	var jQuery = function(selector){
		var els = document.queryselectorAll(selector)
		for( var i = 0;i < els.length ;i++ ){
			this[i] = els[i]
		}
		this.length = els.length
	}
	jQuery.prototype.addClass = function(srt){
		for(var i = 0;i < this.length ; i++ ){
			this[i].classList.add(str)
		}
	}
	var _d = function(){
		return new jQuery(selector)
	}
	window.$ = _d
})()

```



* 理解javascript的关键点。
1.new的时候到底发生了什么
2.对象的原型链
3.函数身上一个属性(prototype)和一个方法(call)
4.this 的指向


## jQuery的构造方法
1.构造一个空对象{}
2.把mao那个函数作为这个空对象的临时方法调用一次；
3.把mao那个函数身上的prototype那个属性拿来，作为自己原型链的一条
4.返回最终对象
每一个函数对象身上,都有一个其他对象不具备的属性，叫做。prptotype


## $函数可以接受的参数类型。以及对应得返回值
选取元素 创建元素
$(           )
* null             => jquery对象(无键值，直接原型链)
* 数组，对象集合   => 处理过的jQuery对象(键值length原型链)
* 选择器		   => 处理过的jQuery对象(键值/context/length/prevObject/selector/原型链)
* html标签		   => 处理过的jQuery对象(键值/context/length/prevObject/selector/原型链)
* DOM集合		   => 处理过的jQuery对象(键值/context/length/prevObject/selector/原型链)
* DOM对象          => 处理过的jQuery对象(键值/context/length/原型链)
* 函数             => 在函数加载完成的情况下直接调用


## 链式调用原理
```javascript
var obj = {
		width:100,
		height:200,
		addW:function(){
			this.width += 10;
			return this
			//链式调用的时候，需要返回值为原集合
		},
		addH:function(){
			this.height += 10;
			return this
		}
	}
	obj.addW().addW().addH().addH()
	console.log(obj.width,obj.height)
```


jQuery中大多数方法都会返回一个jQuery集合
* 操作集合的方法返回的就是原集合
* 对集合做过过滤或者导致集合改变的一些方法返回改变后的jQuery集合
* $ .append这一类方法，当涉及到创建dom对象时，他们会返回创建完成后的一个jQuery集合
所以在jQueyr中链式调用很普遍
>只要返回结果是jquery集合
>那么即可使用链式调用

////链式调用
```javascript
$('#selectors h1').width(500).height(200).css({color:'red'}).offset()
Object {top: 147.1875, left: 0}
```



## jQuery中能使用的选择器
jQuery中选择器使用一个叫sizzle.js的库
从后往前找(在树中，着父元素只找一次，找子元素需要遍历)
* parent > child 子选择器 父元素下的直接子元素
可以无限往下链

* prev + next	相邻一个选择器
* prev ~ next	相邻所有选择器

* :eq()
* :even
* :odd
* :lt()
* :gt()
* :first
* :last
* :animated 所以有正在执行的jquery动画元素
* :header 	$(this).find('*:header')标签h1~h6找出来
* :lang() 	<div lang="spanish">找出属性中有lang属性的元素
* :root	 	找html当iframe引入
* :target 浏览器发生跳转时找跳转到那儿了
* :not()    $('li:not(.aa)')选出li中没有.aa的元素

* ：contains(n)标签元素包含内容n的元素
* :empty()$('p:empty')内容为空的p标签
* ：has()   可接受简单的选择器  $('li:has(p)') 选取有p子元素的li
* :null()   可接受简单的选择器
* :parent $('li:parent') 有孩子的li，若li没有子元素，则不会选出来

* :visible    留下选中元素中可见的元素
* :hidden     留下选中元素中隐藏的元素

* [attr]         $('li[data-role]')
* [attr=aa]         $('li[data-role = aa]')
* [attr |= aa]   $('li[data-role != aa]') -连字符
* [attr != aa]   $('li[data-role]')
* [attr *= aa]   $('li[data-role]') 包含内容
* [attr ^= aa]   $('li[data-role]') 以开头
* [attr ~= aa]   $('li[data-role]') 空格
* [attr $= aa]   $('li[data-role]') 以结尾

* $('li:nth-child(1)')
* $('li:first-child(1)')
* $('li:last-child(1)')
* $('li:only-child(1)')
* $('li:nth-of-type(1)')
* $('li:first-of-type')
* $('li:last-of-type')
* $('li:last-of-type()')
* $('li:only-of-type')


//中括号可链接写
```javascript
$($0).next()
$($0).next().find('li')
$($0).next().find('li').css({color:red})
$($0).next().find('li:eq(n)').css({color:red})
//li中下标为n的元素的css样式改变
$($0).next().find('li:even').css({color:red})
//li中下标为偶数元素的css样式改变
$($0).next().find('li:first').css({color:red})
//li中下标为0的元素的css样式改变
$($0).next().find('li:last').css({color:red})
//li中下标最后一个元素的css样式改变
$($0).next().find('li:gt(5)').css({color:red})
//li中下标大于5的元素的css样式改变
$($0).next().find('li:lt(5)').css({color:red})
//li中下标小于5的元素的css样式改变
$($0).next().find('li:odd').css({color:red})
//li中下标为奇数的元素的css样式改变
```
