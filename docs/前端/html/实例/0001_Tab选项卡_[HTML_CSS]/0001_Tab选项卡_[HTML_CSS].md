# 0001_Tab选项卡

[演示页面](https://sakura-jikage.github.io/notebook/前端/html/实例/0001_Tab选项卡_[HTML_CSS]/index.html)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="css/index.css" />
		<title>0001 Tab选项卡</title>
	</head>

	<body>
        <!--视频教程地址：https://www.bilibili.com/video/BV1uK411A7S6-->
		<div class="tab">
			<input type="radio" name="tab" id="tab1" checked />
			<input type="radio" name="tab" id="tab2" />
			<input type="radio" name="tab" id="tab3" />
			<input type="radio" name="tab" id="tab4" />
			<input type="radio" name="tab" id="tab5" />
			<label for="tab1"> <img src="images/1.png" alt="" />HTML</label>
			<label for="tab2"> <img src="images/2.png" alt="" />CSS</label>
			<label for="tab3">
				<img src="images/3.png" alt="" />JAVASCRIPT
			</label>
			<label for="tab4"> <img src="images/4.png" alt="" />VUE</label>
			<label for="tab5"> <img src="images/5.png" alt="" />React</label>
			<ul>
				<li>
					<img src="images/1.png" alt="" />
					<h2>HTML</h2>
					<p>
						HTML的英文全称是 Hyper Text Markup
						Language，即超文本标记语言。HTML是由Web的发明者 Tim
						Berners-Lee和同事 Daniel W.
						Connolly于1990年创立的一种标记语言，它是标准通用化标记语言SGML的应用。用HTML编写的超文本文档称为HTML文档，它能独立于各种操作系统平台(如UNIX，
						Windows等)。使用HTML，将所需要表达的信息按某种规则写成HTML文件，通过专用的浏览器来识别，并将这些HTML文件“翻译”成可以识别的信息，即现在所见到的网页。
					</p>
				</li>
				<li>
					<img src="images/2.png" alt="" />
					<h2>CSS</h2>
					<p>
						层叠样式表(英文全称：Cascading Style
						Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。
					</p>
				</li>
				<li>
					<img src="images/3.png" alt="" />
					<h2>JAVASCRIPT</h2>
					<p>
						JavaScript（简称“JS”）
						是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web页面的脚本语言而出名，但是它也被用到了很多非浏览器环境中，JavaScript
						基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式、声明式、函数式编程范式。
					</p>
				</li>
				<li>
					<img src="images/4.png" alt="" />
					<h2>VUE</h2>
					<p>
						VUE 是 iOS 和 Android 平台上的一款 Vlog
						社区与编辑工具，允许用户通过简单的操作实现 Vlog
						的拍摄、剪辑、细调、和发布，记录与分享生活。 [1]
						还可以在社区直接浏览他人发布的 Vlog，与 Vloggers 互动。
					</p>
				</li>
				<li>
					<img src="images/5.png" alt="" />
					<h2>React</h2>
					<p>
						由于
						React的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来
						Web 开发的主流工具。
						这个项目本身也越滚越大，从最早的UI引擎变成了一整套前后端通吃的
						Web App 解决方案。衍生的 React Native
						项目，目标更是宏伟，希望用写 Web App 的方式去写 Native
						App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次UI
						，就能同时运行在服务器、浏览器和手机
					</p>
				</li>
			</ul>
		</div>
	</body>
</html>

```

**index.css**

```css
* {
	padding: 0;
	margin: 0;
	/*盒子模型*/
	box-sizing: border-box;
}
body {
	/* 居中对齐弹性盒的各项 <div> 元素： */
	display: flex;
	/*center元素位于容器的中心。*/
	/*弹性盒子元素在该行的侧轴（纵轴）上居中放置。*/
	/*（如果该行的尺寸小于弹性盒子元素的尺寸，*/
	/*则会向两个方向溢出相同的长度）。*/
	align-items: center;
	justify-content: center;
	/*vh就是当前屏幕可见高度的1%*/
	/*height:100vh，该元素会被撑开屏幕高度一致。*/
	height: 100vh;
	background-color: #282c34;
}

.tab {
	width: 700px;
	height: 250px;
	color: #607291;
	background-color: #fff;
	overflow: hidden;
}

input {
	/*隐藏单选按钮*/
	display: none;
}

/* tab页样式 */
label {
	float: left;
	width: 140px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	font-weight: 700;
	transition: all 0.3s;
	background-color: #e5e9ea;
}

/* tab页选中状态 */
label:hover {
	background-color: #fff;
}

/* tab页里的图片样式 */
label img {
	width: 20px;
	height: 20px;
	vertical-align: middle;
	margin-top: -5px;
	margin-right: 5px;
}

ul {
	clear: both;
	width: 3500px;
	height: 210px;
	/* 进场动画 */
	transition: all 0.5s;
}

ul li {
	float: left;
	list-style: none;
	width: 700px;
	height: 210px;
	padding: 40px;
}

/* tab页内容的图片 */
ul li img {
	float: left;
	width: 130px;
	height: 130px;
	margin-right: 20px;
}

ul li p {
	text-indent: 2em;
	/* 伸缩盒子模型 */
	/* 把tab页里的图片下面的文字移到右侧 */
	display: -webkit-box;
	/* 在伸缩盒子里让子元素垂直排列 */
	-webkit-box-orient: vertical;
	/* 非css标准，只显示三行 */
	-webkit-line-clamp: 3;
	/* 三行以外溢出文字 隐藏 */
	overflow: hidden;
	/* 溢出文字 以省略号表示 */
	text-overflow: ellipsis;
	margin-top: 20px;
}

#tab1:checked ~ ul {
	margin-left: 0px;
}

#tab2:checked ~ ul {
	margin-left: -700px;
}

#tab3:checked ~ ul {
	margin-left: -1400px;
}

#tab4:checked ~ ul {
	margin-left: -2100px;
}

#tab5:checked ~ ul {
	margin-left: -2800px;
}

/* tab页选中后 背景变白色 */
#tabl:checked ~ label[for='tab1'] {
	background-color: #fff;
}
#tab2:checked ~ label[for='tab2'] {
	background-color: #fff;
}
#tab3:checked ~ label[for='tab3'] {
	background-color: #fff;
}
#tab4:checked ~ label[for='tab4'] {
	background-color: #fff;
}
#tab5:checked ~ label[for='tab5'] {
	background-color: #fff;
}
```

**图片**

/images/1.png

![](/images/1.png)

/images/2.png

![](/images/2.png)

/images/3.png

![](/images/3.png)

/images/4.png

![](/images/4.png)

/images/5.png

![](/images/5.png)