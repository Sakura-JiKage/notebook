## ORACLE 常用命令

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

### 7 创建会话级临时表

[参照博客园博主“Smile”的文章《Oracle删除临时表》](https://www.cnblogs.com/ButterflyEffect/p/14016288.html)

```sql
CREATE GLOBAL Temporary TABLE TEMPTABLENAME
ON COMMIT PRESERVE ROWS
AS
SELECT .....FROM..
```

### 8 创建事务级临时表

[参照博客园博主“Smile”的文章《Oracle删除临时表》](https://www.cnblogs.com/ButterflyEffect/p/14016288.html)

```sql
CREATE GLOBAL Temporary TABLE TEMPTABLENAME
ON COMMIT DELETE ROWS
INSERT INTO TEMPTABLENAME VALUES('','',....)
```

### 9 压缩表空间数据文件的空间

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

### 10 查询占用内存大小排名前10的表ID
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

### 11 查询某个表占用的表空间大小
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

### 12 查询所有表的所有列的情报、所有表的注释、所有列的注释
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

### 13 恢复被删除的数据

```sql
/*第一步：查询删除时间点的数据，检查哪些时间点的数据是自己需要恢复的数据 */
SELECT * FROM M_PROPLAYER as of timestamp to_timestamp('20240928 201314','yyyy-mm-dd hh24:mi:ss');

/*第二步：将删除时间点的数据备份到临时表里 */
CREATE TABLE M_PROPLAYER_BAK AS SELECT * FROM M_PROPLAYER as of timestamp to_timestamp('20240928 201314','yyyy-mm-dd hh24:mi:ss');

/*第三步：将临时表里的数据恢复到真实表里去 */
INSERT INTO M_PROPLAYER select * from M_PROPLAYER_BAK;

/*第四步：删除临时表，并释放回收站的空间 */
drop table M_PROPLAYER_BAK purge;
```

### 14 恢复被删除的表

```sql
flashback table M_PROPLAYER to before drop;
```

### 15 创建普通表

```sql
/*
-- 作成表的中文名：选手定妆照表
-- 作成表的英文名：T_PLAYLER_PICTURES
-- 作成组织：无
-- 作成日期：2024/02/15
-- 作成者：烟图黛螺
-- 修改历史：2024/02/15 烟图黛螺 新建文件
*/

------- 永久删除表，不进入回收站 ----------
DROP TABLE T_PLAYLER_PICTURES PURGE;
/

------- 创建表 ----------
CREATE TABLE T_PLAYLER_PICTURES (
     INSTID         VARCHAR2(64 CHAR) NOT NULL
    ,INSTDT         DATE NOT NULL
    ,INSTTERM       VARCHAR2(50 CHAR) NOT NULL
    ,INSTPRGNM      VARCHAR2(50 CHAR) NOT NULL
    ,UPDTID         VARCHAR2(64 CHAR) NOT NULL
    ,UPDTDT         DATE NOT NULL
    ,UPDTTERM       VARCHAR2(50 CHAR) NOT NULL
    ,UPDTPRGNM      VARCHAR2(50 CHAR) NOT NULL
    ,PICTURENO      VARCHAR2(20 CHAR) NOT NULL
    ,NUM            NUMBER(3,0) DEFAULT 1 NOT NULL
    ,MEMBER_ID      VARCHAR2(5 CHAR) NOT NULL
    ,PICURL         VARCHAR2(100 CHAR) NOT NULL
    ,USEKBN         VARCHAR2(1 CHAR) DEFAULT 1 NOT NULL
);
/

------- 添加触发器 ----------
--自动填写登陆者名、登陆时间、登陆客户端名、登陆程序名、更新者名、更新时间、更新客户端名、更新程序名
CREATE OR REPLACE TRIGGER TRG_T_PLAYLER_PICTURES BEFORE INSERT OR UPDATE ON T_PLAYLER_PICTURES FOR EACH ROW
DECLARE
    LV_USER VARCHAR2(64 CHAR);
    LV_CLIENTID VARCHAR2(64 CHAR);
    LV_PROGRAMNAME VARCHAR2(50 CHAR);
    LV_TERMINALINAL VARCHAR2(50 CHAR);
BEGIN
    LV_USER := SYS_CONTEXT('USERENV', 'SESSION_USER');
    LV_CLIENTID:= SYS_CONTEXT('USERENV', 'CLIENT_INFO');
    LV_PROGRAMNAME:= SYS_CONTEXT('USERENV', 'CLIENT_PROGRAM_NAME');
    LV_TERMINALINAL:= SYS_CONTEXT('USERENV', 'TERMINAL');

    IF NOT LV_CLIENTID IS NULL
        AND LENGTH(LV_CLIENTID) > 0
    THEN
        IF INSTR(LV_CLIENTID, ',') > 0
        THEN
            LV_USER := SUBSTR(LV_CLIENTID, 1, INSTR(LV_CLIENTID, ',') - 1);
            LV_PROGRAMNAME:= SUBSTR(LV_CLIENTID, INSTR(LV_CLIENTID, ',') + 1);

            IF INSTR(LV_PROGRAMNAME, ',') > 0
            THEN
                LV_TERMINALINAL := SUBSTR(LV_PROGRAMNAME, INSTR(LV_PROGRAMNAME, ',') + 1);
                LV_PROGRAMNAME:= SUBSTR(LV_PROGRAMNAME, 1, INSTR(LV_PROGRAMNAME, ',') - 1);
            END IF;
        ELSE
            LV_USER := LV_CLIENTID;
        END IF;
    ELSE
        LV_USER := LV_USER || ',' || LV_PROGRAMNAME;
    END IF;

    IF INSERTING
    THEN
        : new.INSTID := LV_USER;
        :new.INSTDT := sysdate;
        :new.INSTTERM := LV_TERMINALINAL;
        :new.INSTPRGNM := LV_PROGRAMNAME;
    END IF;

    IF INSERTING OR UPDATING
    THEN
        : new.UPDTID := LV_USER;
        :new.UPDTDT := sysdate;
        :new.UPDTTERM := LV_TERMINALINAL;
        :new.UPDTPRGNM := LV_PROGRAMNAME;
    END IF;
END;
/

-------添加主键索引----------
ALTER TABLE T_PLAYLER_PICTURES ADD CONSTRAINT PK_T_PLAYLER_PICTURES PRIMARY KEY (PICTURENO);
/

------- 添加约束条件 ----------
ALTER TABLE T_PLAYLER_PICTURES ADD CONSTRAINT CHECK_T_PLAYLER_PICTURES_NUM_1 CHECK(NUM >= 1);
/
ALTER TABLE T_PLAYLER_PICTURES ADD CONSTRAINT CHECK_T_PLAYLER_PICTURES_USEKBN_1 CHECK(USEKBN IN (0,1));
/

------- 添加表和列名的注释 ----------
COMMENT ON TABLE T_PLAYLER_PICTURES IS '选手定妆照表';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.INSTID IS '登陆者名';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.INSTDT IS '登陆时间';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.INSTTERM IS '登陆客户端名';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.INSTPRGNM IS '登陆程序名';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.UPDTID IS '更新者名';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.UPDTDT IS '更新时间';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.UPDTTERM IS '更新客户端名';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.UPDTPRGNM IS '更新程序名';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.PICTURENO IS '定妆照编号';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.NUM IS '连番';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.MEMBER_ID IS '人员ID';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.PICURL IS '选手照图片地址';
/
COMMENT ON COLUMN T_PLAYLER_PICTURES.USEKBN IS '背景作用';
/

```

### 16 行列转换

#### 第1种方式 max+decode

```sql


```

#### 第2种方式 pivot

```sql

```

### 17 分组排序

```sql

```

### 18 分组排序取第一条

```sql

```

### 19 窗口函数的使用

#### row_number()

```sql

```

#### rank()

```sql

```

#### dense_rank()

```sql

```

#### partition by



