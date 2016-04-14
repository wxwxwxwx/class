# DOM是什么

Document Object Modal(文档对象模型)

我们在页面中看到的div,span,p,h1等等元素或者文字
在javascript眼中都是一个对象

## 从一个web应用的开发说起

第一步，从页面中去选取一个元素出来
当我们代码在浏览器中去运行的时，
浏览器已经帮我们创建了很多对象，
对象中有很多方法，可以供我们使用
这些东西都在一个叫做window的全局变量里

window对象中的属性，可以省略window.去调用


选取元素,我们从window.document开始

## 选取元素的方式

* document.querySelector()
* document.getElementById()


* document.querySelecterAll()
* document.getElementsByName()
* document.getElementsByTagName()
* document.getElementsByName()

这些方法的返回结果是什么？
前两个的返回结果是一个对象，代表了页面中某个元素的对象
我们把他叫做DOM对象
后四个的返回结果是一个类数组对象
我们把他叫做DOM集合

```javascript
var obj = {
	0：DOM对象
	1：DOM对象
	······
	length：12;

}
```

## DOM对象中的所有常用的属性和方法


将学生管理系统中的thead用console.dir()的方式输出。
mdn火狐开发者网络
mdn 关键字
### Object

* toString()
* valueOf()

### EventTarget事件源

* addEventListener()
* removeEventListener()
* dispatchEvent()
* textContent

### Node


所有的DOM对象都是一个'节点'这三个属性用来描述节点
* nodeName
* nodeValue
* nodeType

我们能从每个DOM对象身上取到自己相邻或父或子节点

取父节点
* childNodes       取值为DOM集合( NodeList )
* firstChild       DOM对象
* lastChild        DOM对象

取子节点
* parentElement     DOM对象
* parentNode        DOM对象

取兄弟节点
* nextSibling       DOM对象
* previousSibling   DOM对象

取节点文本内容(会过滤掉标签)
* textConent

每个DOM对象中都提供了一些操作节点的方法
这四个都可链式调用

* appendChild()     父DOM对象.appendChild( DOM对象 )
* insertBefore()    父DOM对象.insertBefore( 位置,对象 )

* removeChild()
* replaceChild()

```javascript

box.appendChild(el)
//可链式调用
box.appendChild(el).style.color = 'red'
//返回值为被append or insertBefore or remove 的对象
```


* hasChildNodes()   返回值 (布尔类型)  用el.children.length代替但存在兼容性问题

* cloneNode()    返回值为DOM对象   参数( true,false )true复制加文本,false只复制节点
* contains       判断一个节点中是否包含另一个节点


```javascript
var box = document.querySelector('box')
var h3 = box.querySelector('h3')
box.contains(h3)
//返回值为true
h3.contains(box)
//返回值为false
```

### Element

'元素'和'节点'的区别：带标签的都是 元素 又是 节点
不带标签的，比如div内容的文字、注释
他们只是 元素 不是 节点

从一个DOM对象开始获取子，兄弟，父 元素

* children       取一个DOM对象的子'元素'  DOM集合
* firstElementChild
* lastElementChild

* nextElementSibling
* previousElementsSibling

对元素属性的操作  ( HTML元素的属性 就是头标签里的那些k=""中的k )

* classList		add remove toggle contains
* className     可读可写

* id            可读可写

* removeAttribute()移除元素头标签中的某个自定义属性值 无返回值只是一个操作
* getAttribute()   取出元素头标签中的某个自定义属性值 值
* setAttribute()   创建元素头标签中的某个自定义属性 undefined
* hasAttribute()   判断元素头标签中有没有某个属性 返回值为布尔

* outerHTML
* tagName

获取该元素的视窗坐标 或者与其他位置相关的信息

* getBoundingClientRect()
返回值为{top:1,left:1,bottom:1,width:1,height:1}
* scrollTop     可读写
* scrollLeft    可读写
一般用来结合document.documentElement.clientWidth
* clientWidth
* clientHeight


从某个DOM对象开始。可以缩小范围继续去查找元素

* querySelector()
* querySelectorAll()
* getElementsByClassName()
* getElementsByTagName()

### HTMLElement

* innerHTML    Waring不要用这种方式追加元素 el.innerHTML+='<div></div>'
* innerText    剥离标签直接获取文本

实时获取元素信息
* offsetHeight  不带px的数字
* offsetWidth   不带px的数字
* offsetTop		不带px的数字
* offsetLeft	不带px的数字
* offsetParent  只有定位属性(给static)的祖先元素  DOM对象

操作元素行内样式
可读写 读的时候实时的获取元素行内样式的值，不回去计算css文件中的定义的属性
* style
```javascript
console.log($0.style)
```

### HTNL xxx Element

value
checked
src
focus()

//////////////////////////////////////////////////
## 添加事件的两种方式
我们给DOM对象的onclick属性赋值，只为一个函数
这次赋值和普通的对象赋值不太一样
js会告诉浏览器，密切关注这个元素，如果有人点击它
帮我把这个函数运行
运行函数的时候给我传一个参数，参数为一个对象
对象中要详细的记录这次点击的一些信息，这个对象被称为 事件对象
```javascript
//use1 onXXX
var el = document.getElementById('box')
el.style.color = 'red'
el.onclick = (function(){
	return function(){

	}

})()
//user2 add
el.addEventListener('click',function( e ){
	console.log( e )
},false)
//默认值为false，冒泡从小到大，如果为true则改变冒泡方向
```
区别：
1.一些H5事件并没有onXXX这个版本
2.onXXX再赋值一次，会覆盖上次赋值的那个函数，addEcentListener没有这个问题他
可以给一个事件添加多个函数，事件触发的时候，按照添加顺序，逐个调用处理函数。


### 自定义事件
click dblclick =>sanji
```javascript
var threeClick = new Event('threeClick')
var box = document.querySelector('.box')
var threeclick = new Event('threeclick')
box.addEventListener = ('threeclick',function(){
	console.log('three click is open')
})
box.addEventListener = ('click',(function(){
	var cishu = 0;
	return function(){
	cishu += 1
		if( cishu === 3 ){
		box.dispatchEvent(threeclick)
		}
	setTimeout(function(){
	cishu = 0;
	},500)
}
})())


```
### 阻止事件冒泡
e.stopPropagation()
### 阻止事件的默认行为
阻止事件的默认行为要从事件的根源去阻止。
e.preventDefault()

## 添加事件的两种方式及其区别

## 回调函数
当我们把函数x作为参数传给函数y
函数y内部有对函数x的调用
我们把函数x叫做回调函数


如果就是数组，我们遍历的时候可以使用
var arr = []
arr.forEach(function(v){
	console.log(v)
})
如果是类数组对象，我们遍历的时候可以使用
var arr = []
forEach = arr.forEach
filter = arr.filter
var els = document.queryselectorAll('div')

forEacch.call(els,function(v){
	cosole.log(v)
	//v是DOM集合中的对象
})