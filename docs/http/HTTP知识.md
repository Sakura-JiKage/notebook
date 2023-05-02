# 1、什么是HTTP

HTTP协议是HyperText Transfer Protocal（超文本传输协议）的缩写，是用于从万维网（WWW:World Wide Web）服务器传输超文本到本地浏览器的传送协议，是因特网上应用最为广泛的一种网络传输协议，所有的WWW文件都必须遵守这个标准。

HTTP是基于TCP/IP通信协议来传递数据（HTML文件，图片文件，查询结果等）。

## 1.1、因特网，万维网，互联网什么区别？

### 1.1.1、范围

互联网 > 因特网 > 万维网

### 1.1.2、互联网

internet 注意 i 小写，凡是能彼此通信的设备组成的网络就叫互联网，可以看出，这里互联网的范围很广。

### 1.1.3、因特网

Internet 注意 I 大写，是网络与网络之间所串连成的庞大网络，这些网络以一组标准的网络TCP/IP协议族相连，下图展示的是TCP/IP协议族：

![](\md_images\TCP IP协议族.jpg)

### 1.1.4、万维网

World Wide Web，万维网是文件、图片、多媒体和其他资源的集合，资源通过超链接互相连接形成网络，并使用统一资源标志符（URL）标识。HTTP是万维网的主要访问协议。

其实大家平常使用的浏览器根据维基百科上的解释，可以称为：万维网浏览器软件，如chrome,firefox

### 1.1.5、区别总结

目前由于因特网的广泛使用，因此互联网有时直接指代因特网，但是我们可以从英语名字中看出不同，互联网：internet，因特网：Internet。广义上的互联网是很大的，两台电脑组成的网络也能称为互联网，但是不能称为因特网。

万维网也称为Web，是因特网中的一项服务（web服务），除了万维网，因特网还包括了许多其他服务，例如：电子邮件服务，FTP，Telnet等等。

## 1.2、其他

### 1.2.1、Telnet

Telnet协议是TCP/IP协议族中的一员，是Internet远程登录服务的标准协议和主要方式。它为用户提供了在本地计算机上完成远程主机工作的能力

# 2、HTTP工作原理

HTTP协议工作于客户端-服务端架构上。HTTP客户端（浏览器）通过URL向HTTP服务端（WEB服务器）发送所有请求。

WEB服务器有：Apcache服务器，IIS服务器（Internet Information Services）等。

WEB服务器根据接收到的请求后，向客户端发送响应信息。

HTTP默认端口号是90，但是你也可以改为8080活着其他端口。

## 2.1、HTTP三点注意事项

### 2.1.1、HTTP无连接

注意事项1：无连接。无连接的含义是限制每次连接只处理一个请求。服务器处理完客户端的请求，并受到客户端的应答后，即断开连接。采用这种方式可以节省传输时间。

### 2.1.2、HTTP媒体独立的

注意事项2：媒体独立。这意味着，只要客户端和服务器知道如何处理数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型。

### 2.1.3、HTTP无状态

注意事项3：无状态。HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就比较快。

## 2.2、图解HTTP协议通信流程

![](\md_images\图解HTTP协议通信流程.gif)

## 2.3、关于CGI
本章节“关于CGI”搬运自《简单说明CGI和动态请求是什么》：https://www.cnblogs.com/f-ck-need-u/p/7627035.html

### 2.3.1、CGI是什么

CGI是common gateway interface的缩写，大家都译作通用网关接口，但很不幸，我们无法见名知意。

我们知道，web服务器所处理的内容都是静态的，要想处理动态内容，需要依赖于web应用程序，如php、jsp、python、perl等。但是web server如何将动态的请求传递给这些应用程序？它所依赖的就是cgi协议。没错，是协议，也就是web server和web应用程序交流时的规范。换句话说，通过cgi协议，再结合已搭建好的web应用程序，就可以让web server也能"处理"动态请求(或者说，当用户访问某个特定资源时，可以触发执行某个web应用程序来实现特定功能)，你肯定知道处理两字为什么要加上双引号。

简单版的cgi工作方式如下：

![](\md_images\简单版的cgi工作方式.jpg)

例如，在谷歌搜索栏中搜索一个关键词"http"，对应的URL为：

>```
>https://www.google.com/search?q=http&oq=http&aqs=chrome..69i57j69i60l4j0.1136j0j8&sourceid=chrome&ie=UTF-8
>```

当谷歌的web server收到该请求后，先分析该url，从中知道了要执行search程序，并且还知道了一系列要传递给search的参数及其对应的value。web server会将这些程序参数和其它一些环境变量根据cgi协议通过TCP或套接字等方式传递给已启动的cgi程序(可能是cgi进程，或者是已加载的模块cgi模块)。当cgi进程接收到web server的请求后，调用search程序并执行，同时还会传递参数给search程序。search执行结束后，cgi进程/线程将处理结果返回给web server，web server再返回给浏览器。

有多种方式可以执行cgi程序，但对http的请求方法来说，只有get和post两种方法允许执行cgi脚本(即上面的search程序)。实际上post方法的内部本质还是get方法，只不过在发送http请求时，get和post方法对url中的参数处理方式不一样而已。

任何一种语言都能编写CGI，只不过有些语言比较擅长，有些语言则非常繁琐，例如用bash shell开发，那么需要用echo等打印语句将执行结果放在巨多无比的html的标签中输出给客户端。常用于编写CGI的语言有perl、php、python等，java也一样能写，但java的servlet完全能实现CGI的功能，且更优化、更利于开发。

### 2.3.2、各种术语释疑

说实话，对于一个没接触过编程语言的人来说，刚接触cgi概念的时候肯定会有一堆疑问，这到底是什么鬼，处理动态内容的东西不是像php一样的应用程序吗，跟cgi有几毛钱关系，fastcgi又是什么？我想，非科班出身的强迫症患者(包括我)一定会被这些概念折腾的死去活来。

以php为例，我将一次动态请求相关的概念大致都简单解释一遍。

1. `cgi`：它是一种协议。通过cgi协议，web server可以将动态请求和相关参数发送给专门处理动态内容的应用程序。
2. `fastcgi`：也是一种协议，只不过是cgi的优化版。cgi的性能较烂，fastcgi则在其基础上进行了改进。
3. `php-cgi`：fastcgi是一种协议，而php-cgi实现了这种协议。不过这种实现比较烂。它是单进程的，一个进程处理一个请求，处理结束后进程就销毁。
4. `php-fpm`：是对php-cgi的改进版，它直接管理多个php-cgi进程/线程。也就是说，**php-fpm是php-cgi的进程管理器**因此它也算是fastcgi协议的实现。在一定程度上讲，php-fpm与php的关系，和tomcat对java的关系是类似的。
5. `cgi进程/线程`：在php上，就是php-cgi进程/线程。专门用于接收web server的动态请求，**调用并初始化zend虚拟机**。
6. `cgi脚本`：被执行的php源代码文件。
7. `zend虚拟机`：对php文件做词法分析、语法分析、编译成opcode，并执行。最后关闭zend虚拟机。
8. `cgi进程/线程和zend虚拟机的关系`：cgi进程调用并初始化zend虚拟机的各种环境。

以php-fpm为例，web server从转发动态请求到结束的过程大致如下：

![](\md_images\web server从转发动态请求到结束的过程.jpg)

而每个php-cgi进程的作用大致包括：(有些功能分类错误，请无视，知道大致功能就够了)

![](\md_images\每个php-cgi进程的作用.jpg)

注意，尽管php-fpm的全称为PHP FastCGI Process Manager，但严格地讲，php-fpm不是fastcgi的进程管理器，而是php fastcgi即php-cgi的进程管理器。fastcgi只是一种协议，不是进程。就像http协议一样，apache对它的实现是httpd，nginx对它的实现就叫nginx。

再次说明，cgi和fastcgi是一种协议。各种支持和WEB交互的编程语言对cgi/fastcgi协议都做了各自的实现(当然，任何一种语言都能写cgi脚本)，而php上的php-cgi和php-fpm正是php对fastcgi协议的实现。

### 2.3.3、web server和CGI的交互模式

web server对cgi进程/线程来说，它的作用就是发起动态处理请求，传递一些参数和环境变量，最后接收cgi的返回结果。再通俗而不严谨地说，web server通过cgi/fastcgi协议将动态请求转发给执行cgi脚本的应用程序。通过下面httpd.conf中的转发配置应该很容易理解(httpd和php-fpm的交互)：

> ```
> ProxyRequests off
> ProxyPassMatch ^/(.*\.php)$ fcgi://127.0.0.1:9000/usr/local/apache/htdocs/$1
> ```

以最典型的apache httpd和php为例，对于httpd来说，web server和php-cgi有3种交互模式。

- `cgi模式`：httpd接收到一个动态请求就fork一个cgi进程，cgi进程返回结果给httpd进程后自我销毁。
- `动态模块模式`：将php-cgi的模块(例如php5_module)编译进httpd。在httpd启动时会加载模块，加载时也将对应的模块激活，php-cgi也就启动了。(注：纠正一个小小错误，很多人以为动态编译的模块是可以在需要的时候随时加载调用，不需要的时候它们就停止了，实际上不是这样的。和静态编译的模块一样，动态加载的模块在被加载时就被加入到激活链表中，无论是否使用它，它都已经运行在apache httpd的内部。可参考LoadModule指令的官方手册)
- `php-fpm模式`：使用php-fpm管理php-cgi，此时httpd不再控制php-cgi进程的启动。可以将php-fpm独立运行在非web服务器上，实现所谓的动静分离。

实际上，借助模块mod_fastcgi还可以实现fastcgi模式。同cgi一样，管理模式的先天缺陷决定了这并不是一种好方法。

### 2.3.4、CGI模式

使用CGI模式时，当动态请求到达，httpd临时启动一个cgi解释器，并通过cgi协议转发要运行的内容。当cgi脚本运行结束后，将结果返回给httpd，然后cgi解释器进程自我销毁。当多个动态请求到达时，将先后启动多个cgi解释器。因此，这种方法效率极低。

在注释掉php5_module的LoadModule相关行后，使用action指令指定要使用cgi运行的类型。但注意，action指令是mod_action提供的，所以必须已经加载该模块。

例如：指定MIME类型为image/gif的请求使用images.cgi运行。显然，images.cgi脚本你必须先写好。

>```
>Action image/gif /cgi-bin/images.cgi
>```

还可以通过添加handler来复合文件类型，再使用某个cgi脚本去运行这个handler中的任意类型。

>```
>AddHandler my-file-type .xyz
>Action my-file-type "/cgi-bin/program.cgi"
>```

对于php来说，则可以使用安装php时bin目录下提供的php-cgi程序作为cgi程序。

>```
>[root@xuexi php]# ls /usr/local/php/bin/
>pear  peardev  pecl  phar  phar.phar  php  php-cgi  php-config  phpize
>
># 复制到apache默认的cgi-bin目录下，方便管理
>[root@xuexi php]# cp /usr/local/php/bin/php-cgi /usr/local/apache/cgi-bin/
>
># 在httpd.conf中添加以下行
>Action application/x-httpd-php /usr/local/php/bin/cgi-bin/php-cgi
>```

### 2.3.5、模块方式

在编译php时，将php5_module模块编译到apache中，例如在编译php时在./configure配置中加上"--with-apxs2=/usr/local/apache/bin/apxs"。

这种交互模式下，httpd在启动时加载并激活php_module。也就是说，php-cgi常驻在httpd进程内部。当动态请求到达时，httpd不用再生成cgi解释器，而是直接将动态请求转发给它内部php-cgi。

配置实用这种交互模式非常简单，只需使用LoadModule加载php_module，再添加对应的MIME处理器即可。

>```
>LoadModule php5_module modules/libphp5.so
>
># 在mime模块中添加对应的类型
><IfModule mime_module>
>AddType application/x-httpd-php .php
>AddType applicaiton/x-httpd-php-source .phps
></IfModule>
>```

### 2.3.6、php-fpm方式

前面说了，php-fpm是php-cgi的进程管理器。这种交互方式实际上是让php-cgi以独立于httpd的方式存在，目前基本使用php-fpm的方式管理php-cgi进程。也就是说，这种模式下，php-cgi和httpd已经分离了，它们的分离意味着请求的动静分离变为可能：httpd和php-fpm分别运行在不同服务器上。动静分离后，压力也分散到各自的服务器上。

要让php-fpm以这种方式运行，需要在编译的./configure配置选项中添加"--enable-fpm"选项。当然，还得启动php-fpm服务。例如：

>```
>service php-fpm start
>```

这样php-cgi进程就开放着端口(默认9000)等待httpd转发动态请求。要让httpd能够转发请求到php-cgi上，需要在httpd.conf中关闭正向代理，并设置fastcgi协议代理参数。例如，转发到192.168.100.54主机上的php-fpm。

>```
># 加载代理模块
>LoadModule proxy_module modules/mod_proxy.so
>LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so
>
># 添加MIME类型
>AddType application/x-httpd-php .php
>AddType application/x-httpd-php-source .phps
>
># 在需要转发的虚拟主机中配置转发代理
>ProxyRequests off
>ProxyPassMatch ^/(.*\.php)$ >fcgi://192.168.100.54:9000/usr/local/apache/htdocs/$1
>```

# 3、HTTP协议各个版本

本章节"HTTP协议各个版本"搬运自《http协议各个版本》：https://blog.csdn.net/qq_22238021/article/details/81197157

## 3.1、HTTP/0.9

HTTP协议的最初版本，功能简陋，仅支持请求方式GET，并且仅能请求访问HTML格式的资源。

## 3.2、HTTP/1.0

请求行必须在尾部添加协议版本字段（http/1.0）；必须包含头消息

在0.9版本上做了进步，增加了请求方式POST和HEAD；不再局限于0.9版本的HTML格式，根据Content-Type可以支持多种数据格式，即MIME多用途互联网邮件扩展，例如text/html、image/jpeg等；同时也开始支持Cache，就是当客户端在规定时间内访问统一网站，

再次，HTTP请求和回应的格式也变了。除了数据部分，每次通信都必须包括头信息（HTTP header），用来描述一些元数据。

其他的新增功能还包括状态码（status code）、多字符集支持、多部分发送（multi-part type）、权限（authorization）、缓存（cache）、内容编码（content encoding）等。

​    但是1.0版本的工作方式是每次TCP连接只能发送一个请求，当服务器响应后就会关闭这次连接，下一个请求需要再次建立TCP连接，就是不支持keepalive。

​    TCP连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢（slow start）。所以，HTTP 1.0版本的性能比较差。随着网页加载的外部资源越来越多，这个问题就愈发突出了。

为了解决这个问题，有些浏览器在请求时，用了一个非标准的`Connection`字段。

> ```
> Connection: keep-alive
> ```

这个字段要求服务器不要关闭TCP连接，以便其他请求复用。服务器同样回应这个字段。

> ```
> Connection: keep-alive
> ```

一个可以复用的TCP连接就建立了，直到客户端或服务器主动关闭连接。但是，这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。

### 3.2.1、Content-Type 字段

关于字符的编码，1.0版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是`Content-Type`字段的作用。

下面是一些常见的`Content-Type`字段的值。

> - text/plain
> - text/html
> - text/css
> - image/jpeg
> - image/png
> - image/svg+xml
> - audio/mp4
> - video/mp4
> - application/javascript
> - application/pdf
> - application/zip
> - application/atom+xml

这些数据类型总称为`MIME type`，每个值包括一级类型和二级类型，之间用斜杠分隔。

除了预定义的类型，厂商也可以自定义类型。

> ```
> application/vnd.debian.binary-package
> ```

上面的类型表明，发送的是Debian系统的二进制数据包。

`MIME type`还可以在尾部使用分号，添加参数。

> ```
> Content-Type: text/html; charset=utf-8
> ```

上面的类型表明，发送的是网页，而且编码是UTF-8。

客户端请求的时候，可以使用`Accept`字段声明自己可以接受哪些数据格式。

> ```
> Accept: */*
> ```

上面代码中，客户端声明自己可以接受任何格式的数据。

`MIME type`不仅用在HTTP协议，还可以用在其他地方，比如HTML网页。

> ```
> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
> <!-- 等同于 -->
> <meta charset="utf-8" /> 
> ```

### 3.2.2、Content-Encoding 字段

由于发送的数据可以是任何格式，因此可以把数据压缩后再发送。`Content-Encoding`字段说明数据的压缩方法。

> ```
> Content-Encoding: gzip
> Content-Encoding: compress
> Content-Encoding: deflate
> ```

客户端在请求时，用`Accept-Encoding`字段说明自己可以接受哪些压缩方法。

> ```
> Accept-Encoding: gzip, deflate
> ```

## 3.3、HTTP/1.1

### 3.3.1、持久连接

1.1 版的最大变化，就是引入了持久连接（persistent connection），即TCP连接默认不关闭，可以被多个请求复用，不用声明`Connection: keep-alive`。解决了1.0版本的keepalive问题，1.1版本加入了持久连接，一个TCP连接可以允许多个HTTP请求；

客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送`Connection: close`，明确要求服务器关闭TCP连接。

> ```
> Connection: close
> ```

目前，对于`同一个域名，大多数浏览器允许同时建立6个持久连接`。降低了延迟同时提高了带宽的利用率。

### 3.3.2、管道机制

加入了管道机制 ，在同一个TCP连接里，允许多个请求同时发送，增加了并发性，进一步改善了HTTP协议的效率；举例来说，客户端需要请求两个资源。以前的做法是，在同一个TCP连接里面，先发送A请求，然后等待服务器做出回应，收到后再发出B请求。管道机制则是允许浏览器同时发出A请求和B请求，但是服务器还是按照顺序，先回应A请求，完成后再回应B请求。

### 3.3.3、Content-Length 字段

一个TCP连接现在可以传送多个回应，势必就要有一种机制，区分数据包是属于哪一个回应的。这就是`Content-length`字段的作用，声明本次回应的数据长度。

> ```
> Content-Length: 3495
> ```

上面代码告诉浏览器，本次回应的长度是3495个字节，后面的字节就属于下一个回应了。

在1.0版中，`Content-Length`字段不是必需的，因为浏览器发现服务器关闭了TCP连接，就表明收到的数据包已经全了。

### 3.3.4、分块传输编码

使用`Content-Length`字段的前提条件是，服务器发送回应之前，必须知道回应的数据长度。

对于一些很耗时的动态操作来说，这意味着，服务器要等到所有操作完成，才能发送数据，显然这样的效率不高。更好的处理方法是，产生一块数据，就发送一块，采用"流模式"（stream）取代"缓存模式"（buffer）。

因此，1.1版规定可以不使用`Content-Length`字段，而使用["分块传输编码"](https://zh.wikipedia.org/wiki/分块传输编码)（chunked transfer encoding）。只要请求或回应的头信息有`Transfer-Encoding`字段，就表明回应将由数量未定的数据块组成。

> ```
> Transfer-Encoding: chunked
> ```

每个非空的数据块之前，会有一个16进制的数值，表示这个块的长度。最后是一个大小为0的块，就表示本次回应的数据发送完了。下面是一个例子。

> ```
> HTTP/1.1 200 OK
> Content-Type: text/plain
> Transfer-Encoding: chunked
> 
> 25
> This is the data in the first chunk
> 
> 1C
> and this is the second one
> 
> 3
> con
>  
> 8
> sequence
> 
> 0
> ```

新增了**请求方式PUT、PATCH、OPTIONS、DELETE**等。

另外，客户端请求的头信息新增了`Host`字段，用来指定服务器的域名。在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。

> ```
> Host: www.example.com
> ```

有了`Host`字段，就可以将请求发往同一台服务器上的不同网站，为虚拟主机的兴起打下了基础。（实现了在一台WEB服务器上可以在同一个IP地址和端口号上使用不同的主机名来创建多个虚拟WEB站点。也即是说，web server上的多个虚拟站点可以共享同一个ip和端口。）且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。

​    虽然1.1版允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。服务端是按队列顺序处理请求的，服务器只有处理完一个回应，才会进行下一个回应。假如前面的请求处理时间很长，后面就会有许多请求排队等着，这样就造成了“队头阻塞”的问题；同时HTTP是无状态的连接，因此每次请求都需要添加重复的字段，降低了带宽的利用率。

多路复用带来一个新的问题是，在连接共享的基础之上有可能会导致关键请求被阻塞。SPDY允许给每个request设置优先级，这样重要的请求就会优先得到响应。比如浏览器加载首页，首页的html内容应该优先展示，之后才是各种静态资源文件，脚本文件等加载，这样可以保证用户能第一时间看到网页内容。

为了避免这个问题，只有两种方法：一是减少请求数，二是同时多开持久连接。这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码、域名分片（domain sharding）等等。如果HTTP协议设计得更好一些，这些额外的工作是可以避免的。

***\*100(Continue) Status(节约带宽)\****

HTTP/1.1加入了一个新的状态码100（Continue）。客户端事先发送一个只带头域的请求，如果服务器因为权限拒绝了请求，就回送响应码401（Unauthorized）；如果服务器接收此请求就回送响应码100，客户端就可以继续发送带实体的完整请求了。100 (Continue) 状态代码的使用，允许客户端在发request消息body之前先用request header试探一下server，看server要不要接收request body，再决定要不要发request body。

HTTP/1.1在1.0的基础上加入了一些cache的新特性，当缓存对象的Age超过Expire时变为stale对象，cache不需要直接抛弃stale对象，而是与源服务器进行重新激活（revalidation）。

HTTP 1.1支持只发送header信息(不带任何body信息)，如果服务器认为客户端有权限请求服务器，则返回100，否则返回401。客户端如果接受到100，才开始把请求body发送到服务器。这样当服务器返回401的时候，客户端就可以不用发送请求body了，节约了带宽。

HTTP1.1还有身份认证机制，许多web站点要求用户提供一个用户名—口令对才能访问存放在其服务器中的文档，这种要求称为身份认证(authentication)。HTTP提供特殊的状态码和头部来帮助Web站点执行身份认证。

HTTP支持传送内容的一部分。这样当客户端已经有一部分的资源后，只需要跟服务器请求另外的部分资源即可。这是支持文件断点续传的基础。

HTTP/1.1支持文件断点续传，RANGE:bytes，HTTP/1.0每次传送文件都是从文件头开始，即0字节处开始。RANGE:bytes=XXXX表示要求服务器从文件XXXX字节处开始传送，断点续传。即返回码是206（Partial Content）

在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。

## 3.4、HTTP/2.0

​    为了解决1.1版本利用率不高的问题，提出了HTTP/2.0版本。增加双工模式，即不仅客户端能够同时发送多个请求，服务端也能同时处理多个请求，解决了队头堵塞的问题（HTTP2.0使用了多路复用的技术，做到同一个连接并发处理多个请求，而且并发请求的数量比HTTP1.1大了好几个数量级）；HTTP请求和响应中，状态行和请求/响应头都是些信息字段，并没有真正的数据，因此在2.0版本中将所有的信息字段建立一张表，为表中的每个字段建立索引，客户端和服务端共同使用这个表，他们之间就以索引号来表示信息字段，这样就避免了1.0旧版本的重复繁琐的字段，并以压缩的方式传输，提高利用率。

​    另外也增加服务器推送的功能，即不经请求服务端主动向客户端发送数据。

当前主流的协议版本还是HTTP/1.1版本。

### 3.4.1、二进制协议

HTTP/1.1 版的头信息肯定是文本（ASCII编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"（frame）：头信息帧和数据帧。

二进制协议的一个好处是，可以定义额外的帧。HTTP/2 定义了近十种帧，为将来的高级应用打好了基础。如果使用文本实现这种功能，解析数据将会变得非常麻烦，二进制解析则方便得多。

### 3.4.2、多工

HTTP/2 复用TCP连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了"队头堵塞"。

举例来说，在一个TCP连接里面，服务器同时收到了A请求和B请求，于是先回应A请求，结果发现处理过程非常耗时，于是就发送A请求已经处理好的部分， 接着回应B请求，完成后，再发送A请求剩下的部分。

这样双向的、实时的通信，就叫做多工（Multiplexing）。

### 3.4.3、数据流

因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的回应。因此，必须要对数据包做标记，指出它属于哪个回应。

HTTP/2 将每个请求或回应的所有数据包，称为一个数据流（stream）。每个数据流都有一个独一无二的编号。数据包发送的时候，都必须标记数据流ID，用来区分它属于哪个数据流。另外还规定，客户端发出的数据流，ID一律为奇数，服务器发出的，ID为偶数。

数据流发送到一半的时候，客户端和服务器都可以发送信号（`RST_STREAM`帧），取消这个数据流。1.1版取消数据流的唯一方法，就是关闭TCP连接。这就是说，HTTP/2 可以取消某一次请求，同时保证TCP连接还打开着，可以被其他请求使用。

客户端还可以指定数据流的优先级。优先级越高，服务器就会越早回应。

### 3.4.4、头信息压缩

HTTP 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如`Cookie`和`User Agent`，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。

HTTP/2 对这一点做了优化，引入了头信息压缩机制（header compression）。一方面，头信息使用`gzip`或`compress`压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。

### 3.4.5、服务器推送

HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送（server push）。

意思是说，当我们对支持HTTP2.0的web server请求数据的时候，服务器会顺便把一些客户端需要的资源一起推送到客户端，免得客户端再次创建连接发送请求到服务器端获取。这种方式非常合适加载静态资源。

服务器端推送的这些资源其实存在客户端的某处地方，客户端直接从本地加载这些资源就可以了，不用走网络，速度自然是快很多的。

常见场景是客户端请求一个网页，这个网页里面包含很多静态资源。正常情况下，客户端必须收到网页后，解析HTML源码，发现有静态资源，再发出静态资源请求。其实，服务器可以预期到客户端请求网页后，很可能会再请求静态资源，所以就主动把这些静态资源随着网页一起发给客户端了。

服务端推送能把客户端所需要的资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤。正因为没有发起请求，建立连接等操作，所以静态资源通过服务端推送的方式可以极大地提升速度。

普通的客户端请求过程：

![](\md_images\HTTP协议 普通的客户端请求过程.jpg)

服务端推送的过程：

![](\md_images\HTTP协议 服务端推送的过程.jpg)

HTTP 性能优化的关键并不在于高带宽，而是低延迟。TCP 连接会随着时间进行自我「调谐」，起初会限制连接的最大速度，如果数据成功传输，会随着时间的推移提高传输的速度。这种调谐则被称为 TCP 慢启动(拥塞控制)。由于这种原因，让原本就具有突发性和短时性的 HTTP 连接变的十分低效。
HTTP/2 通过让所有数据流共用同一个连接，可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。

# 4、HTTP响应模型

本章节"HTTP响应模型"搬运自《http协议各个版本》：https://blog.csdn.net/qq_22238021/article/details/81197157

​    服务器收到HTTP请求之后，会有多种方法响应这个请求，下面是HTTP响应的四种模型：

## 4.1、单进程I/O模型

服务端开启一个进程，一个进程仅能处理一个请求，并且对请求顺序处理；

## 4.2、多进程I/O模型

服务端并行开启多个进程，同样的一个进程只能处理一个请求，这样服务端就可以同时处理多个请求；

## 4.3、复用I/O模型

服务端开启一个进程，但是呢，同时开启多个线程，一个线程响应一个请求，同样可以达到同时处理多个请求，线程间并发执行；

## 4.4、复用多线程I/O模型

服务端并行开启多个进程，同时每个进程开启多个线程，这样服务端可以同时处理进程数M*每个进程的线程数N个请求。

# 5、HTTP请求方法

本章节"HTTP请求方法"搬运自《head请求_HTTP请求方法》：https://blog.csdn.net/weixin_39959236/article/details/110463453

HTTP请求方法是HTTP请求中必不可少的一部分，需要我们熟悉并掌握。最开始的 **HTTP1.0** 中定义了**三种**请求方法：GET、POST 和 HEAD。后来的 **HTTP1.1** 中又新增了**五种**：PUT、DELETE、OPTIONS、TRACE 和 CONNECT。当然除了这八种请求方法，特定的HTTP服务器还能够**扩展自定义的方法**。例如实现局部更新的 PATCH 等方法。接下来就简单介绍一下八种基本的请求方法。

首先是八种请求应该实现的功能，HEAD 只用来获取响应的报头；POST、DELETE、PUT、GET 应该分别对应对数据的增、删、改、查；OPTIONS 用来测试服务器；TRACE 用来测试或诊断；CONNECT 预留给能够将连接改为管道方式的代理服务器。

一般我们最经常使用的也就是 POST、DELETE、PUT、GET 这四种了，虽说应该与增删改查一一对应，但是经常在使用的过程中，请求方式只是起到了传递数据的作用，而更详细地对数据的处理则留给后端模块。

一般来说，我们会使用 GET 方法来完成单纯的数据获取，因为 GET 方法应该是**安全的、等幂的**（idempotent），应该不涉及数据的修改，新增，删除等操作。等幂的意思可以简单理解**为对同一URL的多个请求应该返回同样的结果**。

涉及到提交数据方面的请求都使用 POST 来完成（你也可以使用 PUT、DELETE，其实没有太大的区别）。因为 POST 方法的安全性更高，POST 的数据是在请求体中发送的，而 GET 的数据是在 URL 中发送的（其实对稍微懂一点的人来说都没差）。且能够传输的数据大小没有限制，而 GET 方法最多只能传输 2KB的数据。

接来下是八种请求方式的描述：

## 1、HEAD
HEAD 方法是向服务器发出指定资源的请求，只不过**索要的只是响应头，响应体将不会被返回**。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。

## 2、GET
GET 方法与 HEAD 方法类似，是向指定的资源发出**显示**请求。使用 GET 方法应该只用在读取数据，而不应当被用于产生副作用的操作中，如修改数据等，因为 GET 可能会被网络爬虫等随意访问。GET 方法也能够向服务端发送数据，是直接加在 URL 中发送的，用 ? 分割URL和数据，用 & 连接多个数据。
例如：https:http://mu-mu.cn/index.html?name=mumu&age=20

## 3、POST

GET 和 POST 是我们使用最频繁的两种请求方法，都是向服务器发出指定资源的请求。但是与 GET 方法不同，POST 方法一般拿来新建或修改服务器资源，所以数据与 POST 方法往往是不可分割的，POST 方法的数据会被包含在请求体中发送至服务端。

## 4、PUT
PUT 方法和 POST 方法非常类似，都是用作数据的修改，他们的区别就是，PUT 方法是**等幂**的，也就是说，如果你对一段资源进行多次 PUT 请求提交，最后的结果应该都是一样的，所以用来进行数据的修改；而 POST 方法如果进行多次数据提交，最后的结果是不一样的，所以应该用作数据的新增。

## 5、DELETE
DELETE 方法用来请求服务器**删除**Request-URI所标识的资源。

## 6、OPTIONS
OPTIONS 方法可使服务器传回对于该资源的**支持情况**，包括各种请求方法、头部的支持情况等。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“*”）使用该方法，用来测试服务器功能是否正常运作。常见的例子还有跨域的时候，当我们发送的请求为非简单请求时（非 HEAD 、GET、POST，请求头不只有 Accept、Accept-Language、Content-Language、Last-Event-ID、三种Content-Type：application/x-www-form-urlencoded、multipart/form-data、text/plain），浏览器就会先发 OPTIONS 来试探服务器是否允许跨域。相信用过 Vue 的小伙伴应该对 OPTIONS 不陌生。

## 7、CONNECT
CONNECT 方法在一般的开发中使用不到，这个方法的作用就是把服务器作为跳板，让服务器代替用户去访问其它网页，之后把数据原原本本的返回给用户。这样用户就可以访问到一些只有服务器上才能访问到的网站了，这就是HTTP代理。

## 8、TRACE
TRACE 请求会在目的服务器端发起一个环回诊断。行程最后一站的服务器会弹回一条 TRACE 响应，并在响应主体中携带它收到的原始请求报文。这样客户端就可以查看在所有中间 HTTP 应用程序组成的请求 / 响应链上，原始报文是否，以及如何被毁坏或修改过。TRACE 方法主要用于**测试或诊断**，验证请求是否如愿穿过了请求 / 响应链。

![](\md_images\TRACE 请求图解.jpg)

以上就是八种 HTTP 请求方式的简单介绍了，除了这基本的八种，还有特定服务器的扩展自定义方法，比如开头提到的 PATCH。平时如果只是满足简单的开发需要，GET 和 POST 就足够了， 但是如果能够掌握和应用这些请求方式，自然能够更上一层楼！
