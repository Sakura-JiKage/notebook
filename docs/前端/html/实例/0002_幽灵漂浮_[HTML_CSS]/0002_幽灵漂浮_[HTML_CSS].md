# 0002_幽灵漂浮

[演示页面](https://sakura-jikage.github.io/notebook/前端/html/实例/0002_幽灵漂浮_[HTML_CSS]/index.html)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">
    <title>Document</title>
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
