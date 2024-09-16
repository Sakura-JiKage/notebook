# 1.写文件

创建Oracle数据库文件路径Directory对象

```sql
CREATE OR REPLACE DIRECTORY utl_dir AS '/path/to/your/directory';
```

编写向文件写入的plsql代码

```plsql
SET SERVEROUTPUT ON;
 
DECLARE
  v_file_handle UTL_FILE.file_type;
BEGIN
  -- 打开文件进行写操作
  -- 'UTL_DIR' 是你之前创建的DIRECTORY对象的名称
  -- 'my_file.txt' 是你想创建的文件名
  -- 'w' 表示写入模式
  v_file_handle := UTL_FILE.fopen('UTL_DIR', 'my_file.txt', 'w');
 
  -- 写入一行文本
  UTL_FILE.put_line(v_file_handle, 'Hello, this is a line of text.');
 
  -- 关闭文件
  UTL_FILE.fclose(v_file_handle);
EXCEPTION
  WHEN OTHERS THEN
    -- 如果有异常，关闭文件并捕获异常信息
    IF UTL_FILE.is_open(v_file_handle) THEN
      UTL_FILE.fclose(v_file_handle);
    END IF;
    RAISE;
END;
/
```

