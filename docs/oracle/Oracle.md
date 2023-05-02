# Oracle 知识笔记

记载内容：

ORA故障解决办法

ORACLE 命令

ORACLE SQL

ORACLE 环境配置相关

等等其他

## ORACLE 命令

### 1 最多可以打开的游标数
```sql
-- 查询最多可以打开的游标数
show parameter open_cursors;

-- 修改可以最多可以打开的游标数
alter system set open_cursors=300 scope=both;
```

### 2 查询或修改一个字占用一个byte还是一个char
```sql
-- 查询向DB中存储一个汉字，是按照BYTE存，还是CHAR存。
select * from nls_database_parameters;

 -- 值可以是'char'或者'byte'。修改DB类型，如VARCHAR2(2)，默认是表示2个CHAR还是2个BTYE。
alter system set nls_length_semantics=‘char’;
```

### 3 用dmp文件向数据库导入数据
```sql
-- 方式1（指定dmp路径）：
imp 用户名/密码 file=D:/aaa.dmp full=y;

-- 方式2（不指定dmp路径，默认用oracle路径，如：D:\oracle\app\admin\orcl\dpdump\aaa.dmp）
impdp 用户名/密码 dumpfile=aaa.dmp full=y;
```

### 4 把数据库数据导出成dmp文件
```sql
-- 方式1（指定dmp路径），没试过类比一下导入dmp命令，应该是好用的
exp 用户名/密码 file=D:\aaa.dmp full=y;

-- 方式2（不指定dmp路径，默认用oracle路径，如：D:\oracle\app\admin\orcl\dpdump\aaa.dmp）
expdp 用户名/密码 dumpfile=aaa.dmp full=y;
```

### 5 根据表的注释名，查询表名
```sql
SELECT  table_name
       ,comments
  FROM user_tab_comments
 WHERE comments = '用户情报表';
```

### 6 表被锁时，解锁表的SQL
[参照博客园博主“Smile”的文章《Oracle删除临时表》](https://www.cnblogs.com/ButterflyEffect/p/14016288.html)
```sql
SELECT  sid
       ,serial#
  FROM v$session 
 WHERE sid = (
                 SELECT sid
                   FROM v$lock 
                  WHERE id1 = (
                                  SELECT object_id
                                    FROM dba_objects 
                                   WHERE object_name = UPPER('表名')
                              )
             );
--把上面SQL查询的结果，代入到下面的'751,16962'中去，执行即可把表解锁。
ALTER system kill session '751,16962';
```

### 7 压缩表空间数据文件的空间
[参照CSDN博主"成明宁杰"的文章《解决Oracle占用磁盘太大的问题》](https://blog.csdn.net/adaivskean/article/details/124826340)
<font size = '1'>数据库运行了一段时间后，表空间一直增加，但是实际数据量并没那么大。删除数据或者truncate表并不会降低表空间。这是因为表空间不足时会自动扩容，但是不会自动收缩。</font>
```sql
 SELECT  a.file#
        ,a.name
        ,a.bytes/1024/1024 CurrentMB
        ,ceil(HWM * a.block_size)/1024/1024 ResizeTo
        ,(a.bytes - HWM * a.block_size)/1024/1024 ReleaseMB
        ,'alter database datafile '''||a.name||''' resize '|| ceil(HWM * a.block_size/1024/1024) || 'M;' ResizeCMD
   FROM  v$datafile a
        ,(
             SELECT file_id,max(block_id+blocks-1) HWM
               FROM dba_extents
           GROUP BY file_id
         ) b
   WHERE a.file# = b.file_id(+)
     AND (a.bytes - HWM *block_size) > 0;

--上面SQL执行后，会生成多条类似下面的SQL，执行即可压缩表数据文件的空间
alter database datafile 'D:\ORACLE\ORADATA\ADMIN\SYSTEM01.DBF' resize 1000M; 
alter database datafile 'D:\ORACLE\ORADATA\ADMIN\USERS01.DBF' resize 1000M; 
alter database datafile 'D:\ORACLE\ORADATA\ADMIN\LOG.DBF' resize 1000M; 
--等等SQL
```

### 8 查询占用内存大小排名前10的表ID
[参照CSDN博主"成明宁杰"的文章《解决Oracle占用磁盘太大的问题》](https://blog.csdn.net/adaivskean/article/details/124826340)
```sql
SELECT *
  FROM (
           SELECT SEGMENT_NAME -- 段的名称（如果有）
                  ,SUM(BYTES) / 1024 / 1024 MB
             FROM DBA_SEGMENTS -- 描述为数据库中所有段分配的存储
            WHERE TABLESPACE_NAME = upper('用户名') -- 包含段的表空间的名称
         GROUP BY SEGMENT_NAME
         ORDER BY 2 DESC
       )
 WHERE ROWNUM < 10;
```

### 9 查询某个表占用的表空间大小
[参照CSDN博主"成明宁杰"的文章《解决Oracle占用磁盘太大的问题》](https://blog.csdn.net/adaivskean/article/details/124826340)
```sql
  SELECT  t.segment_name
         ,t.segment_type
         ,sum(t.bytes / 1024 / 1024) "占用空间(M)"
    FROM dba_segments t
   WHERE t.segment_type='TABLE'
     AND t.segment_name='表名'
GROUP BY  OWNER
         ,t.segment_name
         ,t.segment_type;
```

### 10 查询所有表的所有列的情报、所有表的注释、所有列的注释
```sql
-- 查询所有用户的表,视图等
SELECT * FROM ALL_TAB_COMMENTS;
-- 查询本用户的表,视图等
SELECT * FROM USER_TAB_COMMENTS;

-- 查询所有用户的表的列名和注释
SELECT * FROM ALL_COL_COMMENTS;
-- 查询本用户的表的列名和注释
SELECT * FROM USER_COL_COMMENTS;

-- 查询所有用户的表的列名等信息
SELECT * FROM ALL_TAB_COLUMNS;
-- 查询本用户的表的列名等信息
SELECT * FROM USER_TAB_COLUMNS;
```

## ORACLE 查询SQL

### 1 查询

```SQL
SELECT *
  FROM DEPT;
```

```sql
SELECT  DEPTNO
       ,DNAME
  FROM DEPT;
 WHERE DEPTNO = '1001';
```

```SQL
SELECT ENAME || '一个月工资为' || SAL AS SALINFO
  FROM EMP;
```

```SQL
    SELECT  ENAME
           ,EMPNO
           ,DNAME
      FROM EMP E
INNER JOIN DEPT D
        ON E.DEPTNO = D.DEPTNO
     WHERE JOB = UPPER('CLERK');
```

```SQL
SELECT ENAME
  FROM EMP
 WHERE (
               DEPTNO = 10
           AND JOB = UPPER('MANAGER')
       )
    OR (
               DEPTNO = 20
           AND JOB = UPPER('CLERK')
       );
```

```SQL
SELECT DISTINCT JOB
  FROM EMP
 WHERE COMM > 0;
```

```SQL
SELECT ENAME
  FROM EMP
 WHERE COMM IS NULL;
   AND JOB IS NOT NULL;
 --WHERE COMM = NULL;无论COMM是NULL、还是NULL以外，（COMM = NULL）都是否。
```

```SQL
SELECT EMPNO
  FROM EMP
 WHERE HIREDATE < TO_DATE('1982/01/01','YYYY/MM/DD');
```

```SQL
SELECT  EMPNO
       ,ENAME
       ,SQL
  FROM EMP
 WHERE SAL BETWEEN 2000 AND 4000; -- SAL >= 2000 AND SAL <= 4000
```

```sql
SELECT EMPNO
  FROM EMP
 WHERE ENAME LIKE '%R_'; -- %表示任意个，_表示一个
```

```sql
SELECT EMPNO
  FROM EMP
 WHERE ENAME IN ('SMITH','KING');
```

### 2 函数

#### 1 LPAD、RPAD

```sql
SELECT LPAD(DNAME,10,' ')
  FROM DEPT;
```

#### 2 REPLACE

```SQL
SELECT REPLACE(ENAME,'S','s')
  FROM EMP;
```

#### 3 SUBSTR

```SQL
SELECT SUBSTR(ENAME, 1, 3)
  FROM EMP;
```

#### 4 INSTR

```SQL
SELECT INSTR(ENAME, 'S')
  FROM EMP;
```

```SQL
SELECT INSTR(ENAME, 'T', 1, 2)
  FROM EMP;
```

#### 5 LENGTH

```SQL
SELECT LENGTH(ENAME)
  FROM EMP;
```

#### 6 ADD_MONTHS

```SQL
SELECT  ADD_MONTHS(SYSDATE, -12)
       ,ADD_MONTHS(SYSDATE, 12)
  FROM DUAL;
```

#### 7 LAST_DAY

```SQL
SELECT LAST_DAY(SYSDATE)
  FROM DUAL;
```

#### 8 MONTHS_BETWEEN

```SQL
SELECT MONTHS_BETWEEN(SYSDATE, TO_DATE('2024/12/01', 'YYYY/MM/DD'))
  FROM DUAL;
```

#### 9 TO_CHAR

[参照CSDN博主夏雨情的文章《Oracle 中 TO_CHAR用法》](https://blog.csdn.net/qq_44094695/article/details/128069763)

##### TO_CHAR(DATE,'格式')

格式：yyyy-MM-dd HH24:mi:ss

```SQL
SELECT TO_CHAR(SYSDATE, 'YYYY/MM/DD')
  FROM DUAL;
```

##### TO_CHAR(NUMBER,'格式')

#### 10 DECODE

```SQL
SELECT DECODE(SAL, 800, '低工资', '高工资')
  FROM EMP;
```

#### 11 TRUNC

```SQL
SELECT TRUNC(SAL/1000)
  FROM EMP;
```

#### 12 NEXT_DAY

```SQL
SELECT NEXT_DAY(ADD_MONTHS(HIREDATE, 6), 2)
  FROM EMP;
```

#### 13 NVL

```sql
SELECT NVL(COMM, 0)
  FROM EMP;
```

