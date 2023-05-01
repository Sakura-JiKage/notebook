# git 使用方法备忘文档

## 安装git工具

[下载地址 https://github.com/git-for-windows/git/releases/download/v2.40.1.windows.1/Git-2.40.1-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.40.1.windows.1/Git-2.40.1-64-bit.exe)

安装时一直下一步即可

## github取得到本地

1 本地硬盘新建文件夹

2 右键选择git bash

![](/tupian/git/001.png)

显示下面图片的界面

![](/tupian/git/002.png)

找到下面图片中的链接，复制后，再执行git clone 命令

![](/tupian/git/003.png)

git clone命令如下：

```
git clone https://github.com/Sakura-JiKage/notebook.git
```

## github更新到本地

因为我的github只有我自己使用，所以如果**github内容变更**后，与本地不一致了，此时我回把**本地内容删除，重新执行第二步**，保持本地和github一致后，再修改本地内容。



## 提交本地内容到github

与svn不同的是，github的提交是提交到本地git库，而上传到github是提交后，执行推送（push）。

```
git add [文件名]	//添加到暂存区
git commit -m "提交注释"	//提交到本地库

//由于首次提交时已经关联了远程仓库，这里直接推送就好了
git push origin master	//将项目推送到远程仓库(master:分支名)
```

![](/tupian/git/004.png)

再次查看github，发现内容提交成功

![](/tupian/git/005.png)