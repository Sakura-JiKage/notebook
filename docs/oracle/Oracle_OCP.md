# B站OCP视频教程

[【绝版教程】Oracle 12c18c19c DBA OCP 认证全套实战培训视频教程+学习软件文档+全套题库_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1bL411w72V/)

希望自己可以坚持学习到最后，加油！

## 第一天上午

### 1 登陆管理员用户

在客户端登陆管理员用户时，需要输入用户名密码。

```sql
C:\Users\Jerry>sqlplus sys/123456 as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期日 2月 19 17:51:58 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> show user
USER 为 "SYS"
```

在服务器端登陆管理员用户时，可以不输入用户名密码。

```sql
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期日 2月 19 17:52:11 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

-- 这里show user命令可以写成sho user，也是可以的。
SQL> show user
USER 为 "SYS"
```

在服务器端登陆管理员用户时，即使输入错误用户名和密码，也可以登陆成功。

```sql
C:\Users\Jerry>sqlplus a234afaf34/afga23rga as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期日 2月 19 18:02:25 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> show user
USER 为 "SYS"
```

### 2 查询用户名

登陆管理员用户，查询用户表的属性。describe命令可以查询所有表的属性即列的定义

```sql
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期日 2月 19 22:09:42 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> describe dba_users
 名称                                      是否为空? 类型
 ----------------------------------------- -------- ----------------------------
 USERNAME                                  NOT NULL VARCHAR2(128)
 USER_ID                                   NOT NULL NUMBER
 PASSWORD                                           VARCHAR2(4000)
 ACCOUNT_STATUS                            NOT NULL VARCHAR2(32)
 LOCK_DATE                                          DATE
 EXPIRY_DATE                                        DATE
 DEFAULT_TABLESPACE                        NOT NULL VARCHAR2(30)
 TEMPORARY_TABLESPACE                      NOT NULL VARCHAR2(30)
 LOCAL_TEMP_TABLESPACE                              VARCHAR2(30)
 CREATED                                   NOT NULL DATE
 PROFILE                                   NOT NULL VARCHAR2(128)
 INITIAL_RSRC_CONSUMER_GROUP                        VARCHAR2(128)
 EXTERNAL_NAME                                      VARCHAR2(4000)
 PASSWORD_VERSIONS                                  VARCHAR2(17)
 EDITIONS_ENABLED                                   VARCHAR2(1)
 AUTHENTICATION_TYPE                                VARCHAR2(8)
 PROXY_ONLY_CONNECT                                 VARCHAR2(1)
 COMMON                                             VARCHAR2(3)
 LAST_LOGIN                                         TIMESTAMP(9) WITH TIME ZONE
 ORACLE_MAINTAINED                                  VARCHAR2(1)
 INHERITED                                          VARCHAR2(3)
 DEFAULT_COLLATION                                  VARCHAR2(100)
 IMPLICIT                                           VARCHAR2(3)
 ALL_SHARD                                          VARCHAR2(3)
 PASSWORD_CHANGE_DATE                               DATE

SQL>select USERNAME,ACCOUNT_STATUS from dba_users;
-- 检索结果在命令窗口下折行显示，不友好。
-- 下面命令调整username列表示的宽度
SQL>col username for a30
-- 提交命令
SQL>/
-- 下面命令调整account_status列表示的宽度
SQL>col account_status for a30
-- 提交命令
SQL>/

-- 下面是命令窗口里最终的显示结果。两列可以在同一行显示，不再折行。
-- ACCOUNT_STATUS:OPEN的用户表示可以用。
--                EXPIRED表示用户过期。
--                LOCKED表示用户被锁。
USERNAME                       ACCOUNT_STATUS
------------------------------ ------------------------------
SYS                            OPEN
SYSTEM                         OPEN
XS$NULL                        EXPIRED & LOCKED
OJVMSYS                        LOCKED
LBACSYS                        LOCKED
OUTLN                          LOCKED
SYS$UMF                        LOCKED
DBSNMP                         LOCKED
APPQOSSYS                      LOCKED
DBSFWUSER                      LOCKED
GGSYS                          LOCKED

USERNAME                       ACCOUNT_STATUS
------------------------------ ------------------------------
ANONYMOUS                      EXPIRED & LOCKED
HR                             EXPIRED & LOCKED
CTXSYS                         EXPIRED & LOCKED
DVSYS                          LOCKED
DVF                            LOCKED
GSMADMIN_INTERNAL              LOCKED
MDSYS                          LOCKED
OLAPSYS                        LOCKED
XDB                            LOCKED
WMSYS                          LOCKED
GSMCATUSER                     LOCKED

USERNAME                       ACCOUNT_STATUS
------------------------------ ------------------------------
MDDATA                         LOCKED
SYSBACKUP                      LOCKED
REMOTE_SCHEDULER_AGENT         LOCKED
GSMUSER                        LOCKED
SYSRAC                         LOCKED
GSMROOTUSER                    LOCKED
SI_INFORMTN_SCHEMA             LOCKED
AUDSYS                         LOCKED
DIP                            LOCKED
ORDPLUGINS                     LOCKED
SYSKM                          LOCKED

USERNAME                       ACCOUNT_STATUS
------------------------------ ------------------------------
ORDDATA                        LOCKED
ORACLE_OCM                     LOCKED
SYSDG                          LOCKED
ORDSYS                         LOCKED

已选择 37 行。
```

### 3 修改用户状态

假设有一个用户scott存在。

```sql
-- 用户被锁
SQL>alter user scott account lock;
-- 用户解锁
SQL>alter user scott account unlock;
-- 用户过期
SQL>alter user scott account expired;
```

### 4 停止数据库

```sql
-- 登陆管理员用户
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期一 2月 20 22:16:00 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

-- 执行命令，这个命令执行速度很快，无论数据库有多大，几个T，也会在几秒内停掉数据库。
SQL> shut abort
-- 英文提示是：ORACLE instance shut down.
ORACLE 例程已经关闭。
```

### 5 启动数据库

停止数据库或者刚刚启动操作系统后，可以执行第5步启动数据库

```sql
sqlplus / as sysdba
-- 连接到了一个空闲的实例
Connected to an idle instance
-- 启动数据库
SQL>startup
-- 启动了数据库
ORACLE instance started.

Total System Global Area
```

### 6 查询ORACLE默认属性

```sql
SQL> show all
appinfo 为 OFF 并且已设置为 "SQL*Plus"
arraysize 15
autocommit OFF
autoprint OFF
autorecovery OFF
autotrace OFF
blockterminator "." (hex 2e)
btitle OFF 为下一条 SELECT 语句的前几个字符
cmdsep OFF
colinvisible OFF
coljson OFF
colsep " "
compatibility version NATIVE
concat "." (hex 2e)
copycommit 0
COPYTYPECHECK 为 ON
define "&" (hex 26)
describe DEPTH 1 LINENUM OFF INDENT ON
echo OFF
editfile "afiedt.buf"
embedded OFF
errorlogging is OFF
escape OFF
escchar OFF
exitcommit ON
FEEDBACK ON for 6 or more rows SQL_ID OFF
flagger OFF
flush ON
fullcolname OFF
heading ON
headsep "|" (hex 7c)
history is OFF
instance "local"
linesize 80
lno -43
loboffset 1
lobprefetch 0
logsource ""
long 80
longchunksize 80
markup HTML OFF HEAD "<style type='text/css'> body {font:10pt Arial,Helvetica,sans-serif; color:black; background:White;} p {font:10pt Arial,Helvetica,sans-serif; color:black; background:White;} table,tr,td {font:10pt Arial,Helvetica,sans-serif; color:Black; background:#f7f7e7; padding:0px 0px 0px 0px; margin:0px 0px 0px 0px;} th {font:bold 10pt Arial,Helvetica,sans-serif; color:#336699; background:#cccc99; padding:0px 0px 0px 0px;} h1 {font:16pt Arial,Helvetica,Geneva,sans-serif; color:#336699; background-color:White; border-bottom:1px solid #cccc99; margin-top:0pt; margin-bottom:0pt; padding:0px 0px 0px 0px;-
} h2 {font:bold 10pt Arial,Helvetica,Geneva,sans-serif; color:#336699; background-color:White; margin-top:4pt; margin-bottom:0pt;} a {font:9pt Arial,Helvetica,sans-serif; color:#663300; background:#ffffff; margin-top:0pt; margin-bottom:0pt; vertical-align:top;}</style><title>SQL*Plus Report</title>" BODY "" TABLE "border='1' width='90%' align='center' summary='Script output'" SPOOL OFF ENTMAP ON PREFORMAT OFF
markup CSV OFF DELIMITER , QUOTE ON
newpage 1
null ""
numformat ""
numwidth 10
pagesize 14
PAUSE 为 OFF
pno 1
recsep WRAP
recsepchar " " (hex 20)
release 1903000000
repfooter OFF  为 NULL
repheader OFF  为 NULL
rowlimit OFF
rowprefetch 1
securedcol is OFF
serveroutput OFF
shiftinout INVISIBLE
showmode OFF
spool OFF
sqlblanklines OFF
sqlcase MIXED
sqlcode 0
sqlcontinue "> "
sqlnumber ON
sqlpluscompatibility 19.0.0
sqlprefix "#" (hex 23)
sqlprompt "SQL> "
sqlterminator ";" (hex 3b)
statementcache is 0
suffix "sql"
tab ON
termout ON
timing OFF
trimout ON
trimspool OFF
ttitle OFF 为下一条 SELECT 语句的前几个字符
underline "-" (hex 2d)
USER 为 "SYS"
verify ON
wrap : 将换至下一行
xmloptimizationcheck OFF
```

### 7 检索结果显示在一页当中

下面命令仅在当前session内有效，当用户退出重新登陆后，即失效。

```sql
SQL> show pagesize
pagesize 14
-- 输入下面SQL，检索出的结果分为4页显示在命令行。
SQL> select username from dba_users;

USERNAME
--------------------------------------------------------------------------------
SYS
SYSTEM
XS$NULL
OJVMSYS
LBACSYS
OUTLN
SYS$UMF
DBSNMP
APPQOSSYS
DBSFWUSER
GGSYS

USERNAME
--------------------------------------------------------------------------------
ANONYMOUS
HR
CTXSYS
DVSYS
DVF
GSMADMIN_INTERNAL
MDSYS
OLAPSYS
XDB
WMSYS
GSMCATUSER

USERNAME
--------------------------------------------------------------------------------
MDDATA
SYSBACKUP
REMOTE_SCHEDULER_AGENT
GSMUSER
SYSRAC
GSMROOTUSER
SI_INFORMTN_SCHEMA
AUDSYS
DIP
ORDPLUGINS
SYSKM

USERNAME
--------------------------------------------------------------------------------
ORDDATA
ORACLE_OCM
SYSDG
ORDSYS

已选择 37 行。

SQL>set pagesize 37
-- 修改完pagesize后，再次检索。发现还是有2页，原因是pagesize37行，包括了标题栏以及上下的空行、虚线等。
SQL> select username from dba_users;

USERNAME
--------------------------------------------------------------------------------
SYS
SYSTEM
XS$NULL
OJVMSYS
LBACSYS
OUTLN
SYS$UMF
DBSNMP
APPQOSSYS
DBSFWUSER
GGSYS
ANONYMOUS
HR
CTXSYS
DVSYS
DVF
GSMADMIN_INTERNAL
MDSYS
OLAPSYS
XDB
WMSYS
GSMCATUSER
MDDATA
SYSBACKUP
REMOTE_SCHEDULER_AGENT
GSMUSER
SYSRAC
GSMROOTUSER
SI_INFORMTN_SCHEMA
AUDSYS
DIP
ORDPLUGINS
SYSKM
ORDDATA

USERNAME
--------------------------------------------------------------------------------
ORACLE_OCM
SYSDG
ORDSYS

已选择 37 行。

SQL> set pagesize 42
-- 把多余的4行计算入其中，刚好能显示一页。
SQL> select username from dba_users;

USERNAME
--------------------------------------------------------------------------------
SYS
SYSTEM
XS$NULL
OJVMSYS
LBACSYS
OUTLN
SYS$UMF
DBSNMP
APPQOSSYS
DBSFWUSER
GGSYS
ANONYMOUS
HR
CTXSYS
DVSYS
DVF
GSMADMIN_INTERNAL
MDSYS
OLAPSYS
XDB
WMSYS
GSMCATUSER
MDDATA
SYSBACKUP
REMOTE_SCHEDULER_AGENT
GSMUSER
SYSRAC
GSMROOTUSER
SI_INFORMTN_SCHEMA
AUDSYS
DIP
ORDPLUGINS
SYSKM
ORDDATA
ORACLE_OCM
SYSDG
ORDSYS

已选择 37 行。

SQL> show pagesize
pagesize 42
SQL> exit
从 Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0 断开

C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期二 2月 21 22:14:07 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

-- 退出后重新登陆，pagesize恢复至修改前的值：14
SQL> show pagesize
pagesize 14
SQL>
```

### 8 把命令提示符"SQL>"修改成其他内容

```sql
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期二 2月 21 22:25:15 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> set sqlprompt "_user'@'_connect_identifier>"
-- 下面尖括号左侧，显示了当前用户名。
SYS@orcl>set sqlprompt "jerry>"
jerry>
```

### 9 切换用户

用户登陆后，可以直接切换到其他用户，不用退出后重新登陆

```sql
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期二 2月 21 22:29:16 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SQL> show user
USER 为 "SYS"
SQL> connect system/123456
已连接。
SQL> show user
USER 为 "SYSTEM"
SQL>
-- connect命令，可以缩写为conn
```

### 10 ‪初始化加载glogin.sql

登陆用户后，oracle会先加载‪C:\oracle\app\sqlplus\admin\glogin.sql里的命令，我们可以有下面的操作。

glogin.sql文件末尾追加下面命令

```sql
connect system/123456
```

结果报了下面的错，证明不能用connect命令。

```sql
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期二 2月 21 22:36:07 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
已连接。
SP2-0309: SQL*Plus 命令过程的最大嵌套深度为 20。
SP2-0309: SQL*Plus 命令过程的最大嵌套深度为 20。
SQL>
```

我们重新修改glogin.sql里的内容

```sql
set sqlprompt "_user'@'_connect_identifier>"
```

```sql
C:\Users\Jerry>sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on 星期二 2月 21 22:38:46 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


连接到:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SYS@orcl>
-- 此时，我们不用show user命令，也可以通过“SYS@oracl>”，得知我们登陆了SYS用户。
```

但是，不推荐在glogin.sql文件里写东西。

## 第一天下午

### 数据库SQL分类

[参照CSDN博主梦里有阳光的原创文章](https://blog.csdn.net/weixin_44169484/article/details/119255935)

SQL(Structure Query Language)语言共分为四大类：`数据查询语言DQL，数据操作语言DML，数据定义语言DDL，数据控制语言DCL`。另外数据库中`事务控制语言称为TCL`。

1、DQL概述
DQL(Data Query Language)数据查询语言，数据检索语句，用于从表中获取数据。关键字有：select。
`Select语句`：查询表里的数据。

2、DML概述
DML(Data Manipulation Language )数据操作语言，用于操作数据库对象中包含的数据，操作的对象是记录。主要的关键字有：update、delete、insert。DML操作可以手动控制事务的开启、提交和回滚。
`Insert语句`：向数据表张插入一条记录。
`Delete语句`：删除数据表中的一条或多条记录，也可以删除数据表中的所有记录，但是，它的操作对象仍是记录。
`Update语句`：用于修改已存在表中的记录的内容。

3、DDL概述
DDL(Data Definition Language)数据定义语言，用于定义和管理数据库中的所有对象的语言，对数据库中的某些对象(例如database,table)进行管理。操作对象包括数据库本身以及数据库对象，如表、视图等等。主要的关键字有：create、alter、drop、truncate。DDL操作是隐性提交的，不能回滚。
`Create语句`：可以创建数据库和数据库的一些对象。
`Drop语句`：可以删除数据表、索引、触发程序、条件约束以及数据表的权限等。
`Alter语句`：修改数据表定义及属性。
`Truncate语句`：清空表里的数据。

4、DCL概述
DCL(Data Control Language )数据控制语句，操作对象是数据库的权限，并控制数据库操纵事务发生的时间及效果，对数据库实行监视等。这些操作使数据更加的安全。主要的关键字有：grant、revoke 。
`Grant语句`：允许对象的创建者给某用户或某组或所有用户(PUBLIC)某些特定的权限。
`Revoke语句`：可以废除某用户或某组或所有用户访问权限。

5、TCL概述
TCL(Transaction Control Language)事务控制语句，用于控制事务。主要的语句关键字有：commit、rollback、savepoint、set transaction。
`Rollback语句`：用于事务的回退操作。
`Savepoint语句`：为回退而存在,个数没有限制,与虚拟机中快照类似。savepoint是事务中的一点。用于取消部分事务，当结束事务时，会自动的删除该事务中所定义的所有保存点。
`Commit语句`：用于提交事务。
`Set transaction语句`：设置事务的各种状态，比如只读、读/写、隔离级别。

### Oracle 官方示例表和数据

oracle 19c安装完成后，C:\oracle\app\demo\schema\human_resources下面有很多sql文件，依此执行下面的命令，就可以创建hr用户，会有很多表、序列、存储过程等对象和很多数据被创建。如果路径有点错误，都会报错：SP2-0310。

```sql
@C:\oracle\app\demo\schema\human_resources\hr_drop_new.sql;
@C:\oracle\app\demo\schema\human_resources\hr_cre.sql;
@C:\oracle\app\demo\schema\human_resources\hr_popul.sql;
@C:\oracle\app\demo\schema\human_resources\hr_idx.sql;
@C:\oracle\app\demo\schema\human_resources\hr_code.sql;
@C:\oracle\app\demo\schema\human_resources\hr_comnt.sql;
@C:\oracle\app\demo\schema\human_resources\hr_analz.sql;
```

### Oracle数据类型

#### 字符数据类型(Character Data Types)

**可变长字符串**，varchar2(n char)或者varchar2(n byte)，n长度范围：0-4000位

**定长字符串**， char(n char)或者char(n byte)，n长度范围：0-2000位

#### 数值数据类型(Numeric Data Types)

NUMBER（precision, scale）

**precision表示数字中的有效位**。范围：0至38，如果没有指定precision的话，Oracle将使用38作为精度。

**scale表示数字小数点右边的位数**。范围：-84至127，scale默认设置为0.  如果把scale设成负数，Oracle将把该数字取舍到小数点左边的指定位数。

- number;

  `有效位长度38，精度0`

- number(9,2);

  `有效位长度9，精度2。如果赋值1234567.128，是不会报错的，但最后一位的8会被四舍五入，ln_height的值会是1234567.13。`

- number(4,5);

  `1登陆后报错ORA-01438`

  `0.1登陆后报错ORA-01438`

  `1.01登陆后报错ORA-01438`

  `0.01登陆后是0.01，即0.01000`

  `0.001登陆后是0.00100`

  `0.0001登陆后是0.00010`

  `0.00001登陆后是0.00001`

  `0.000006登陆后是0.00001`

  `0.0000001登陆后是0.00000`

  `总结：s>p时，小数点右侧，应该有s-p个0`

- number(5,-2);

  `123登陆后是100`

  `1234登陆后是1200`

  `12345登陆后是12300`

  `123456登陆后是123500`

  `1234567登陆后是1234600`

  `12登陆后是0`

  `1登陆后是0`

  `0.1登陆后是0`

  `1234567.6789登陆后是1234600`

  `精确到小数点左边s位，并四舍五入，然后检验有效数位是否<=p+|s|`

- s=0表示整数，number(p)相当于number(p,0)，用于指定整数

  number不指定p、s，用于表示浮点数，其中p和s都是oracle所能支持的最大值。

**总结：**

在 p < s 这种情况下

1.只能用来存放大于 0 小于 1 的小数 。 

2.小数点后紧接着的 0 的数目至少有 s-p 个 ，不然无法正常插入。 

3.p 用来指定小数点之后的最大有效数字位数。当然不包括小数点后紧接着的 0 的个数。 

4.s 是用来限制小数点后的数字位数【当然也就包括小数点后紧接的 0 】。 

在 p > s 这种情况下

小数点前最多能插入： p - s 个数字，但是小数点后的数字可以任意长度

[参照CSDN博主hacker_LeeFei的博客《oracle的number类型精度、刻度范围》](https://blog.csdn.net/hacker_Lees/article/details/64444751)

#### 日期时间数据类型(Datetime Data Types)

**Date型**，没有长度，存储范围在公元前4712年12月31日，至公元后9999年的12月31日

**Timestamp型**，timestamp(n)，n表示毫秒的位数，取值范围在0-9之间，默认值是6

#### 行编号数据类型(Rowid Data Types)

#### 格式化模型和数据的类型(Format Models and Data Types)

### 知识项一

1、起别名

```sql
SELECT SALARY * 12 AS "NIAN XIN" FROM EMP;
```

2，字符串连接

```sql
SELECT 'A' || 'B' FROM DUAL;
```

输出 'AB'

3，去重复

```sql
select distinct job from emp;
```

4，NVL

```SQL
SELECT ENAME,NVL(COMM,0) FROM EMP;
```

如果COMM是null，则输出0，否则输出正常数据

5，NULL和任何数做运算，结果都是NULL

```sql
SQL>select null+2 from dual;
SQL>NULL
```

6，NULL连接任意内容A，结果都是A

```sql
SQL>SELECT NULL || 2 FROM DUAL;
SQL>2
```

7，NULL作为where条件是，判断方式是is null或者is not null。

“A = NULL”这样的表达式作为where 条件时，无论A是否为NULL，结果都为false。

```sql
SQL> select last_name,manager_id from employees where manager_id = null;

未选定行

SQL> select last_name,manager_id from employees where manager_id is null;

LAST_NAME                                          MANAGER_ID
-------------------------------------------------- ----------
King

SSQL> select last_name,manager_id from employees where manager_id is not null and rownum <5;

LAST_NAME                                          MANAGER_ID
-------------------------------------------------- ----------
Kochhar                                                   100
De Haan                                                   100
Hunold                                                    102
Ernst                                                     103

SQL>
```

