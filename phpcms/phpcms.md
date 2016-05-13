# phpcms使用

##  什么是内容管理系统？(content marnerge system)
用来制作动态网站的一个系统
phpcmsv9提供文件
把index.php文件公开给用户去访问
index.php是一段程序
这段程序根据得到的参数决定把那个主页发送给用户

这段程序会在web服务器上寻找html和脚本，图片，拼接起来之后发送给用户
同时会把数据库中的动态内容写入到这些html中


localhost:8080/index.php
> 单入口文件。通过给定不同的参数，进入不同的页面。

html文件在哪里
phpcms/templates/default/content

脚本在哪里
statics/css
statics/js
static/image

## 如果想改样式和结构(以首页为例)

phpcms/templates/default/content/index.html
header.html + index.html +footer.html
修改header.html
body一下都注释掉
<style></style>
html
<div.top>
	<ul>
		<li><a href="">首页</a></li>
		{pc}
		{loop}
		<li><a href=""></a></li>
		<li><a href=""></a></li>
		{/pc}
		{/loop}
	</ul>
</div>

### 栏目页的修改

模型   图片：catepory_picture.html
       文章：catepory.html
       商品模型：catepory_shop.html....

### 内容页

图片模型 show_picture.html
正文     show.html


### 顺序(文章模型)
index.html  =>  category.html...  =>  list.html  =>  show.html

### 细节
 * 取一级栏目
 {pc:content action="category" catid="0"}

 * 取某一个一级下的二级栏目
 {pc:content action="category" catid="$catid"}

 * 取某个二级下的内容
 {pc:content action="lists" catid="$catid"}

 * 取某个内容下的标题和文章
 {$title}{$content}

 ## 在每个页面中我们能使用哪些php变量
index.html $CATEGORYS $catid=0
category.html $CATEGORYS $catid=点击那个一级栏目的id
list.html     $CATEGROPS $catid=点击栏目的id
show.heml     $CATEGROPS $catid=这个内容属于的栏目id
              数据模型中的字段


### 引入js,css,pic
<link rel="stylesheet" type="text/css" href="{CSS_PATH}XX/YY/DD.css">
<script src="{SJ_PATH}xxx/yyy.js"></script>
<body>
	<div>
		<img src="{IMG_PATH}XXX/yy.jpg" alt="">
	</div>
</body>

