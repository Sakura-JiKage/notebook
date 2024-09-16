# 实用范例

## 0001_Tab选项卡

**实现效果**

![0001_Tab选项卡](实现效果截图\0001_Tab选项卡.png)

[参照的网址：https://www.bilibili.com/video/BV1uK411A7S6](https://www.bilibili.com/video/BV1uK411A7S6)

[参照的源代码地址：https://github.com/bilibili-ayang/HTML-CSS-case](https://github.com/bilibili-ayang/HTML-CSS-case)

[演示页面](https://sakura-jikage.github.io/notebook/前端/html/实例/0001_Tab选项卡/index.html)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="css/index.css" />
		<title>0001_Tab选项卡</title>
	</head>

	<body>
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

/0001_Tab选项卡/images/1.png

![](0001_Tab选项卡/images/1.png)

/0001_Tab选项卡/images/2.png

![](0001_Tab选项卡/images/2.png)

/0001_Tab选项卡/images/3.png

![](0001_Tab选项卡/images/3.png)

/0001_Tab选项卡/images/4.png

![](0001_Tab选项卡/images/4.png)

/0001_Tab选项卡/images/5.png

![](0001_Tab选项卡/images/5.png)

## 0002_幽灵漂浮

**实现效果**

![0002_幽灵漂浮](实现效果截图\0002_幽灵漂浮.png)

[参照的网址：https://www.bilibili.com/video/BV1ut4y1B7xP](https://www.bilibili.com/video/BV1ut4y1B7xP)

[参照的源代码地址：https://github.com/bilibili-ayang/HTML-CSS-case](https://github.com/bilibili-ayang/HTML-CSS-case)

[演示页面](https://sakura-jikage.github.io/notebook/前端/html/实例/0002_幽灵漂浮/index.html)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">
    <title>0002_幽灵漂浮</title>
</head>
<body>
    <div class="container">
        <div class="ghost">
            <div class="ghostEyes"></div>
            <div class="ghostDimples"></div>
            <div class="ghostFeet">
                <div class="ghostFoot"></div>
                <div class="ghostFoot"></div>
                <div class="ghostFoot"></div>
                <div class="ghostFoot"></div>
            </div>
        </div>
        <div class="shadow"></div>
    </div>
</body>
</html>
```

**/css/index.css**

```css
*{
    padding: 0;
    margin: 0;
}

body{
    /* 垂直水平居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 屏幕占浏览器可视范围内的高度 */
    height: 100vh;
    background-color: #00034b;
}

.container .ghost{
    position: relative;
    width: 150px;
    height: 225px;
    border-radius: 75px 75px 0 0;
    background-color: #fff;
    /* inset 内阴影设定 */
    /* 外散光设定 */
    box-shadow: -17px 0 0 #dbdbdb inset,0 0 50px #5939db;
    animation: ghost 2s infinite;
}

/* 眼睛区域 */
.container .ghost .ghostEyes{
    display: flex;
    /* 水平分散对齐 */
    justify-content: space-around;
    width: 90px;
    padding-top: 70px;
    /* 水平居中 */
    margin: 0 auto;
}

/* 伪元素 画幽灵眼睛 */
.container .ghost .ghostEyes::before,
.container .ghost .ghostEyes::after{
    content: "";
    width: 15px;
    height: 25px;
    background-color: #00034b;
    border-radius: 50%;
}

.container .ghost .ghostDimples{
    display: flex;
    justify-content: space-around;
    width: 130px;
    padding-top: 15px;
    margin: 0 auto;
}

.container .ghost .ghostDimples::before,
.container .ghost .ghostDimples::after{
    content: "";
    width: 15px;
    height: 15px;
    background-color: #ffbeff;
    border-radius: 50%;
}

.container .ghost .ghostFeet{
    display: flex;
    position: absolute;
    bottom: -13px;
    width: 100%;
}

.container .ghost .ghostFeet .ghostFoot{
    content: "";
    width: 25%;
    height: 25px;
    background-color: #fff;
    border-radius: 50% ;
}

.container .ghost .ghostFeet .ghostFoot:last-child{
    /* 背景渐变色实现，to right 指的是从左到右 */
    background-image: linear-gradient(to right,#fff 55%, #dbdbdb 45%);
}

.container .shadow{
    width: 150px;
    height: 40px;
    margin-top: 50px;
    background-color: #000232;
    border-radius: 50%;
    /* 动画 名称 时长 infinite无限次播放*/
    animation: shadow 2s infinite;
}

/* 幽灵漂浮的动画 */
@keyframes ghost{
    0%,
    100%{
        transform: translateY(0);
    }
    50%{
        /* 2D位移 -15向上走 */
        transform: translateY(-15px);
    }
}

@keyframes shadow{
    0%,
    100%{
        transform: scale(1);
    }
    50%{
        /* 缩放 9比1小一点 */
        transform: scale(0.9);
    }
}
```

## 0003_日升loading

**实现效果**

![0003_日升loading](实现效果截图\0003_日升loading.png)

[参照的网址：https://www.bilibili.com/video/BV1nZ4y1r7yR](https://www.bilibili.com/video/BV1nZ4y1r7yR)

[参照的源代码地址：https://github.com/bilibili-ayang/HTML-CSS-case](https://github.com/bilibili-ayang/HTML-CSS-case)

[演示页面](https://sakura-jikage.github.io/notebook/前端/html/实例/0003_日升loading/index.html)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">
    <title>0003_日升loading</title>
</head>
<body>
    <div class="container">
        <div class="sun">
            <div class="sun-body">
                <div class="line" style="--i:1"></div>
                <div class="line" style="--i:2"></div>
                <div class="line" style="--i:3"></div>
                <div class="line" style="--i:4"></div>
                <div class="line" style="--i:5"></div>
                <div class="line" style="--i:6"></div>
                <div class="line" style="--i:7"></div>
                <div class="line" style="--i:8"></div>
            </div>
            <div class="eye"></div>
        </div>
        <div class="horizon"></div>
    </div>
</body>
</html>
```

**/css/index.css**

```css
/* 定义字体 */
 @font-face {
    font-family: HarmonyOS;
    src: url();
} 

/* 定义全局变量 */
:root{
    --light-color:#f4c042;
    --dark-color:#7a5600;  
}


/* 所有元素伪元素内外边距清除，应用盒子模型 */
*,*::before,*::after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: HarmonyOS;
    background-color: var(--light-color);
}

.container{
    /* 相对定位，为了内部的太阳可以绝对定位 */
    position: relative;
    width: 300px;
    height: 300px;
    /*临时*/
    /* border: 1px solid #000; */
}

.container .sun{
    position: absolute;
    top: 135px;
    /* 这里计算calc要加空格隔开各个数值 */
    left: calc(50% - 136px / 2);
    width: 136px;
    height: 136px;
    /* border: 1px solid #fff; */
    animation: sun 2.7s linear infinite;
}

/* 太阳身体 圆圈 */
.container .sun .sun-body{
    position: absolute;
    top: 17px;
    /*如果left:18px，则实测是左28px，右24px，不居中*/
    left: 17px;
    width: 100px;
    height: 100px;
    /* 画圆形身体 */
    border-radius: 50%;
    border: 6px solid var(--dark-color);/*实测边框宽度9px*/
    /* 设定动画，命名sun-body 时间2.7s一个循环 infinite指的是速度最快 */
    animation: sun-body 2.7s linear infinite;
}

/* 太阳光线 */
.container .sun .sun-body .line{
    position: absolute;
    top: -24px;
    left: calc(50% - 3px);
    width: 6px;
    height: 12px;
    background-color: var(--dark-color);
    border-radius: 6px;
    /* 8个类名为line的元素，设置了变量i，可以通过自定计算旋转角度 */
    transform: rotate(calc(var(--i) * 45deg));
    /* 设定旋转的中心 */
    transform-origin: center 68px;
}

/* 太阳眼镜 */
.container .sun .eye{
    position: absolute;
    top: 60px;
    left: 40px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--dark-color);
    /* 阴影复制另一个眼睛 */
    box-shadow: 16px 0 var(--dark-color);
    animation: eye 2.7s linear infinite;

}

/* 地平线 */
.container .horizon{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 115px;
    /* 同背景色一致的颜色，起到隐藏水平线一下的太阳身体的作用 */
    background-color: var(--light-color);
}
.container .horizon::before{
    position: absolute;
    content: "";
    left: 5%;
    width: 90%;
    height: 6px;
    border-radius: 6px;
    background-color: var(--dark-color);
}

/* loading字样 */
.container .horizon::after{
    content: "loading...";
    position: absolute;
    top: 30px;

    /* 居中 */
    width: 100%;
    text-align: center;

    font-family: HarmonyOS;
    font-size: 25px;
    color: var(--dark-color);
    animation: loading 2.7s linear infinite;
}

/* 动画效果 */
@keyframes sun{
    10%{
        /* 输入这里的时候vscode没有提示 */
        transform: translate(0);
    }
    40%,
    70%{
        transform: translateY(-40px);
    }

}

@keyframes sun-body{
    40%{
        transform: rotate(0);
    }
    50%,
    100%{
        transform: rotate(45deg);
    }

}

@keyframes eye{
    50%,60%{
        transform: scale(1);
    }
    55%{
        transform: scaleY(0.1);
    }
    70%,100%{
        transform: translateX(34px);
    }

}


@keyframes loading{
    40%{
        opacity: 1;
    }
    60%{
        opacity: 0;
    }

}
```