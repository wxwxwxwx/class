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
# jQuery中的方法分为两类
1.直接出现在jquery函数对象身上，是一些基础性质的工具函数
2.出现在jQuery.fn函数对象的原型链上，用来批量（或者单个）操作jquery集合中的dom元素


* 大部分方法重载很严重

```javascript


$('li').css('width');
//会取出集合中li元素中第一个元素的宽度
$('li').css('width','200');
//会设置集合中的所有元素的宽度为200
$('li').css({width:200,height:200,border:'1px solid black'})
//给选中的集合中的所有的元素，加上传入对象中的所有css样式

//给集合中的每一个元素 添加'width'这个属性
每一个元素的'width'属性值由第二个参数传入的函数来计算，也就意味着，jquery会对集合中的每一个元素调用回掉函数，调用的时候会传入两个参数，一个是当前元素在集合中的位置(0,1,2,3,4,5),另一个是当前元素现在的('width')值


$('li').css('width',function(){
	return Math.random();
})
$('li').css({
	width:function(){
		return Math.random();
		}
	height:function(){
		return Math.random();
	}
	backgroundColor:function(i){
		return colors[i];
	}
})

```


jQuery库的设计理念
1.解决兼容性问题
2.让从页面中查找元素变得轻松
3.提供很多内置方法，使对DOM集合的操作 变得更轻松
css
addclass 这些方法通过内置的遍历去操作每一个DOM元素
jQuery不希望我们在循环中使用这些内置方法
```javascript
var els = document.querySelectorAll(".item");
for(var i=0;i< els.length;i++){
	$(els[i]).addClass('aa');
}
$('.item').addClass('aa')
////////////////
var colors = ['red','blue','']

```
//遍历一般为了1.给集合众的每一个DOM元素设置同样的值或行为
//遍历一般为了2.给集合众的每一个DOM元素设置不同的值或行为


1.$('li').attr('data-id');
2.$('li').attr('data-id','aaa')
3.$('li').attr('data-id',function(i){
	return
})
4. $('li').attr({data-id:'AAA',data-role:'ccc'});
5. $('li').attr({data-id:function(i,w){return aa},data-role:function(i,w){return bb}}

6.以空格分开的字符串 addClass('a b c')移除多个removeClass('a b c')

节点操作
* .clone()        拷贝后得到的对象父元素等信息会丢失

给jQuery中添加子元素(正向可传入回调函数，反向不可)
返回值为，谁调用返回谁
* .append()            添加到最后一个子元素之后
* .prepend()            添加到第一个子元素之前
 反向为(dom对象 dom集合 jquery对象 jquery集合 ‘选择器’)
* .appendTo()            把元素添加到指定元素的最后一个子元素之后
* .prependTo()            把元素添加到指定元素的第一个子元素之前

给jQuery中添加兄弟元素
* .after()          添加到本元素的后面
* .before()          添加到本元素的前面
反向为(dom对象 dom集合 jquery对象 jquery集合 ‘选择器’)
* .insertBefore()     添加本元素到某个元素的前面
* .insertAfter()      添加本元素到某个元素的后面

* .wrap()          给选定的n个元素的每一个外面包一个标签
* .wrapAll()         给选定的n个元素的外面包一个标签
* .wrapInner()        给选定的n个元素的每一个内容里面加一个标签



# TRAVERSING遍历
## Filtering过滤

* eq()
* first()
* last()
* is()
* has()
* not()
* filter()
* slice()
* map()

# Event
### on 的几种用法 

* $('.item').on('click',function(){})
* $('.item').on('click',clickHandler)
* $('.item').on('click mouseleave mousenter',clickHandler)
* $('.item').on({
	'click': fn1,
	'mouseleave':fn2,
	'mouseenter':fn3
	})
> 事件委托的两种方式第二种将被废弃
* $('.item').on('click','selector',function(){})
* $('.item').delegate('selector','click',function(){})


> 目前的jquery中，主要使用on,off,one.triggle,triggleHandler,hover等
> 一些方法将被废除，如bind,delegate,die,live,unbind,undelegate,load,unload

## summary

1.on()的几种添加方式 
* 一次绑定多个事件 用同一个处理函数
* 一次绑定多个事件 用不同的处理函数
2.事件委托的添加方式( 只能使用 on 和 delegate 方法 )
3.mouseover mouseout 方法由于事件冒泡带来的多次触发
  一般我们使用mouseenter mouseleave以及hover( 对mouseenter 和mouseleave 的封装)
4.focus blur => focusin focuout 同上 后面两个不会冒泡
5.ready()事件一般用$(function(){})来替代
内部的处理方式是document.addEventListener('DOMContentLoaded');
如果文档结构(不包含图片，脚本等)已经加载完成，直接运行函数。
如果还没有加载完成 把函数绑定到"DOMContentLoaded"事件
6.trigger()会模仿浏览器触发事件(会冒泡) trigger不会




## Event Object

继承自原声事件对象
e.keyCode e.altKey e.target e.clientX
* e.currentTarget


```javascript
var qz = function(){
	var aa = {a:1,b:2}
	$($0).on('click',aa,function(e){
		console.log(aa)
		console.log(e.data)
	})
	setInterval(function(){
	aa = {a:Math.random(),b:Math.random()}
	},1000)
}
```
e.data用来取最初的原始值

e.relatedTarget用来获取鼠标离开后去了哪里

# js中天然的异步(setInterval setTimeout)

* 事件 
* 动画 
* ajax

# 同步
* 正常的函数
* 正常的赋值
* 正常的逻辑运算


```javascript

	var a =function(){console.log(1)}
	var b = function(){a();console.log(3)}
	var c = function(r){b(),console.dir(r)} 
	var r = [1,2,3,4]
	r.slice(0,2)
	console.log(r)
	c(r)






```

* .jquery    获取版本号
* .error()   报错
* .length    获取元素在页面中的数量
* .get       相当于下标
* .index     a.index(b),返回b在a中的下标。a.index()返回a在他父元素的下标
* .toArray   把jquery集合转化为数组



* .parseXML 在初期，java等不能解析超文本标记语言，所以需要做转化，转换出来后，也可当jquery对象进行操作