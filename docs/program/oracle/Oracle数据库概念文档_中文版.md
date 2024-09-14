- 在线文档《Oracle 数据库概念文档, 19c》：https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/index.html
- 在线文档《Oracle数据库 2 天 DBA》：https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS
- 在线文档《Oracle 数据库 2 天开发人员指南》https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG

## Oracle®数据库

数据库概念

19!

E96138-06

2021年<>月

## 前言

本手册提供了 Oracle 数据库服务器（一个对象关系型数据库管理系统）的体系结构和概念概述。

本书描述了 Oracle 数据库服务器的工作原理，并为其他手册中包含的许多实用信息奠定了概念基础。本手册中的信息适用于所有操作系统上运行的 Oracle 数据库服务器。

### 观众(Audience)

Oracle *Database Concepts* 面向刚接触 Oracle 数据库的技术用户，主要是数据库管理员和数据库应用开发人员。通常，本手册的读者具有管理或开发其他关系型数据库应用程序的经验。

要使用本手册，您必须了解以下内容：

- 一般的关系型数据库概念
- “1 Oracle 数据库简介”中的概念和术语
- 运行 Oracle 的操作系统环境

### 文档可访问性

有关 Oracle 对辅助功能的承诺的信息，请访问 Oracle 辅助功能计划网站 http://www.oracle.com/pls/topic/lookup?ctx=acc&id=docacc。

**获得Oracle支持**

已购买支持的 Oracle 客户可以通过“我的 Oracle 支持(My Oracle Support)”获得电子支持。有关信息，请访问 http://www.oracle.com/pls/topic/lookup?ctx=acc&id=info 或访问 http://www.oracle.com/pls/topic/lookup?ctx=acc&id=trs ，如果您有听力障碍。

### 相关文档

本手册旨在与以下手册一起阅读：

- 《Oracle数据库 2 天 DBA》https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS
- 《Oracle 数据库 2 天开发人员指南》https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG

Oracle 数据库文档集中的许多手册都使用安装 Oracle 数据库时默认安装的数据库的示例schema。请参阅 《Oracle 数据库示例schema，》https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=COMSC 了解有关如何创建这些schema以及如何使用它们的信息。

### 约定

本手册中使用以下文本约定：

| 公约        | 意义                                                         |
| :---------- | :----------------------------------------------------------- |
| **粗體**    | 粗体类型表示与操作关联的图形用户界面元素，或在文本或词汇表中定义的术语。 |
| *斜体的*    | 斜体类型表示您为其提供特定值的手动标题、强调或占位符变量。   |
| `monospace` | 等宽类型表示段落中的命令、URL、示例中的代码、屏幕上显示的文本或输入的文本。 |

## 此版本中针对 Oracle 数据库概念的更改

### Oracle 数据库版本 19c 版本 19.1 中的更改

Oracle Database *Concepts for Oracle Database Release* 19c， Version 19.1 具有以下更改。

#### 新功能

此版本中新增了以下主要功能：

- 延迟插入

  应用程序可以将单行插入流式传输到存储在大型池中的特殊缓冲区中。插入是“延迟”的，因为数据库将这些缓冲区异步写入数据文件。插入是自动提交的，无法回滚。

- 混合分区表

  表可以包含内部和外部分区。内部分区占用数据库（段）内部的空间。外部分区使用外部表功能存储在数据库外部。例如，销售表可能包含存储在数据文件中的两个分区和存储在文本文件中的三个分区。

#### 不支持的功能

此版本不支持以下功能。

- Oracle 多媒体(Oracle Multimedia)

  从 Oracle Database 19c 开始，不再支持 Oracle 多媒体。除非取消选中，否则dba_registry中的 Oracle 多媒体组件 （ORDIM） 在升级和新创建的数据库中显示为有效。Oracle 定位器（如果未安装 Spatial and Graph 则随 Oracle Multimedia 一起安装）将继续安装和支持。Oracle 建议您将多媒体内容存储在安全文件 LOB 中，并使用第三方产品进行图像处理和转换。

- Oracle 流(Oracle Streams)

  从 Oracle Database 19c 开始，不再支持 Oracle Streams。

### Oracle 数据库版本 18c 版本 18.1 中的更改

Oracle Database *Concepts for Oracle Database Release* 18c， Version 18.1 具有以下更改。

#### 新功能

此版本中新增了以下主要功能：

- 内存优化池

  Oracle 数据库支持对使用该子句指定的表进行高性能读取。缓冲区缓存在 SGA 中称为 **缓存优化池(memoptimize pool)**的新区域中。

- 专用临时表

  专用临时表是在事务或会话结束时自动删除的临时数据库对象。私有临时表存储在内存中，并且仅对创建它的会话可见。私有临时表将临时表的范围限制为会话或事务，从而在应用程序编码方面提供了更大的灵活性，从而简化了代码维护和更好的即用型功能。

- 阴影丢失写保护

  当数据库认为它已将块写入存储，但写入未发生时，就会发生丢失的写入。影子表空间使数据库能够捕获大多数丢失的写操作，而无需使用备用数据库，也不可能发生级联错误。

#### 已弃用的功能

以下功能在此版本中已弃用，在将来的版本中可能会不受支持：

- Oracle多媒体

  从 Oracle Database 18c 开始，Oracle 多媒体被弃用。Oracle 建议您将多媒体内容存储在安全文件 LOB 中，并使用第三方产品进行图像处理和转换。

  请参阅“[安全文件](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-58F0A44E-E328-4FD6-B1A0-2DC12D0B275C)”。

## 1 Oracle 数据库简介

本章概述了 Oracle 数据库。

### 关于关系型数据库(Relational Databases)

每个组织都有必须存储和管理的信息以满足其要求。例如，公司必须收集和维护其员工的人力资源记录。这些信息必须提供给需要它的人。

**信息系统(information system )**是用于存储和处理信息的正式系统。信息系统可以是一组包含马尼拉文件夹的纸板箱，以及如何存储和检索文件夹的规则。但是，如今大多数公司都使用数据库来自动化其信息系统。数据库是被视为一个单元的有组织的信息集合。数据库的目的是收集、存储和检索相关信息以供数据库应用程序使用。

#### 数据库管理系统

**数据库管理系统 （Database Management System、DBMS）** 是控制数据的存储、组织和检索的软件。

通常，DBMS 具有以下元素：

- 内核代码(Kernel code)

  此代码管理 DBMS 的内存和存储。

- 元数据存储库(Repository of metadata)

  此存储库通常称为**数据字典(data dictionary)**。

- 查询语言(Query language)

  此语言使应用程序能够访问数据。

**数据库应用程序(database application)** 是与数据库交互以访问和操作数据的软件程序。

第一代数据库管理系统包括以下类型：

- 层次

  **分层数据库(hierarchical database)** 以树结构组织数据。每个父记录都有一个或多个子记录，类似于文件系统的结构。

- 网络

  **网络数据库(network database)** 类似于分层数据库，不同之处在于记录具有多对多关系，而不是一对多关系。

前面的数据库管理系统以严格的预定关系存储数据。由于不存在数据定义语言，因此更改数据结构很困难。此外，这些系统缺乏简单的查询语言，这阻碍了应用程序开发。

#### 关系模型(Relational Model)

在他1970年的开创性论文“大型共享数据银行的数据关系模型(A Relational Model of Data for Large Shared Data Banks)”中，E. F. Codd定义了基于数学集合论的关系模型。今天，最广泛接受的数据库模型是关系模型。

**关系型数据库(relational database)** 是符合关系模型的数据库。关系模型具有以下主要方面：

- 结构(Structures)

  定义良好的对象存储或访问数据库的数据。

- 操作(Operations)

  明确定义的操作使应用程序能够操作数据库的数据和结构。

- 诚信规则(Integrity rules)

  完整性规则控制对数据库的数据和结构的操作。

关系型数据库将数据存储在一组简单关系中。**关系(relation)** 是一组元组。**元组(tuples)** 是一组无序的属性值，元组指一条结果行包含多个对象。

**表(table)** 是以行（元组）和列（属性）形式呈现的关系的二维表示形式。表中的每一行都有相同的列集。关系型数据库是在关系（表）中存储数据的数据库。例如，关系型数据库可以将有关公司员工的信息存储在员工表、部门表和工资表中。

#### 关系型数据库管理系统

关系模型是**关系型数据库管理系统(Relational Database Management System、RDBMS)** 的基础。RDBMS 将数据移动到数据库中，存储数据并检索它，以便应用程序可以对其进行操作。

RDBMS 区分以下类型的操作：

- 逻辑运算(Logical operations)

  在这种情况下，应用程序指定需需要<i>什么</i>内容。例如，应用程序请求员工姓名或向表中添加员工记录。

- 物理操作(Physical operations)

  在这种情况下，RDBMS确定应该<i>如何</i>做事并执行操作。例如，在应用程序查询表之后，数据库可以使用索引来查找请求的行，将数据读入内存，并在将结果返回给用户之前执行许多其他步骤。RDBMS 存储(Store)和检索(Retrieve)数据，以便物理操作对数据库应用程序透明。

Oracle Database 是一个 RDBMS。实现面向对象(object-oriented)功能（如用户定义类型(user-defined types)、继承(inheritance)和多态性(polymorphism)）的 RDBMS 称为**对象关系型数据库管理系统(Object-relational Database Management System、ORDBMS)。** Oracle 数据库已将关系模型扩展到对象关系模型，从而可以在关系型数据库中存储复杂的业务模型。

#### Oracle 数据库简史

当前版本的 Oracle 数据库是超过 35 年创新开发的成果。

Oracle 数据库发展的亮点包括：

- Oracle公司成立

  1977年，Larry Ellison，Bob Miner和Ed Oates创办了咨询软件开发实验室(the consultancy Software Development Laboratories)，后来成为Relational Software，Inc.（RSI）。1983年，RSI成为Oracle系统公司，后来成为Oracle公司。

- 首个商用RDBMS

  1979年，RSI推出了Oracle V2（版本2），作为第一个商用的基于 **SQL** 的RDBMS，这是关系型数据库历史上具有里程碑意义的事件。

- Oracle数据库的便携式版本

  Oracle 版本 3 发布于 1983 年，是第一个在大型机、小型机和个人计算机上运行的关系型数据库。数据库是用 C 语言编写的，使数据库能够移植到多个平台。

- 对并发控制、数据分发和可伸缩性的增强

  版本 4 引入了多版本 **读取一致性(read consistency)** 。版本 5 发布于 1985 年，支持客户端/服务器计算和 **分布式数据库(distributed database)** 系统。版本 6 增强了磁盘 I/O、行锁定、可扩展性以及备份和恢复功能。此外，版本6引入了 **PL/SQL** 语言的第一个版本，这是SQL的专有过程扩展。

- PL/SQL 存储程序单元

  Oracle7 发布于1992，引入了PL/SQL存储过程和触发器。

- 对象和分区

  Oracle8 于 1997 年作为对象关系型数据库发布，支持许多新的数据类型。此外，Oracle8 还支持对大型表进行分区。

- 互联网计算

  Oracle8i数据库于1999年发布，为Internet协议提供了本机支持，并为Java提供了服务器端支持。Oracle8i 专为互联网计算而设计，使数据库能够部署在多层环境中。

- Oracle Real Application Clusters （Oracle RAC）

  Oracle9i Database 在 2001 年引入了 Oracle RAC，使多个实例能够同时访问单个数据库。此外，Oracle XML Database (**Oracle XML DB**) 引入了存储和查询 XML 的功能。

- 网格计算(Grid Computing)

  Oracle Database 10g 于 2003 年引入了网格计算。此版本使组织能够通过构建基于低成本商用服务器的 **网格基础结构(grid infrastructure)** 来虚拟化计算资源。一个关键目标是使数据库自我管理(self-managing)和自我调整(self-tuning)。Oracle 自动存储管理 **(Oracle Automatic Storage Management、Oracle ASM)** 通过虚拟化和简化数据库存储管理帮助实现了这一目标。

- 可管理性、可诊断性和可用性

  Oracle Database 11g 于 2007 年发布，引入了许多新功能，使管理员和开发人员能够快速适应不断变化的业务需求。适应性的关键是通过整合信息和尽可能使用自动化来简化信息基础架构。

- 插入云

  Oracle Database 12c 于 2013 年发布，专为云而设计，具有新的多租户架构(Multitenant Architecture)、内存中列存储以及对 JSON 文档的支持。Oracle Database 12c 帮助 DBA 更高效地利用其 IT 资源，同时继续降低成本并提高最终用户的服务级别。

- 集成和内存性能

  Oracle Database 18c 简化了与 Microsoft Active Directory 等目录服务的集成。它还引入了利用内存的功能，不仅可以用于列式数据模型，还可以用于高速行访问。

- 增强的稳定性

  Oracle Database 19c 是 Oracle Database 12c（版本 12.2）产品系列的长期支持版本。此版本的主要重点是稳定性。Oracle Database 19c 还对 JSON 和 Active Data Guard 等功能进行了一些小而重要的改进。

### Schema 对象

RDBMS的一个特征是物理数据存储独立于逻辑数据结构。

在 Oracle 数据库中，数据库schema是逻辑数据结构或 **schema** 对象的集合。数据库用户拥有与 **用户名(user name)** 同名的数据库 schema。

schema对象是用户创建的结构，直接引用数据库中的数据。数据库支持多种类型的schema对象，其中最重要的是表和索引。

schema对象是一种 **数据库对象(dababase object)** 类型。某些数据库对象（如配置文件和角色）不驻留在schema中。

#### 表

表描述实体，例如员工。

使用表名（如`employees`和列集）定义表。通常，在创建表时，您可以为每 **列(column)** 指定名称、**数据类型(data type)** 和宽度。

表是一组行。列标识表描述的实体的属性，而 **行(row)** 标识实体的实例。例如，雇员实体的属性对应于雇员 ID 和姓氏的列。行标识特定员工。

您可以选择为列指定称为 **完整性约束(integrity constraint)** 的规则。例如`NOT NULL`的完整性约束。此约束强制列在每一行中包含一个值。

#### 索引(Indexes)

**索引** 是一种可选数据结构，可以在表的一列或多列上创建。索引可以提高数据检索的性能。

处理请求时，数据库可以使用索引有效地定位请求的行。当应用程序经常查询特定行或行范围时，索引非常有用。

索引在逻辑上和物理上都独立于数据。因此，您可以删除和创建索引，而不会影响表或其他索引。删除索引后，所有应用程序将继续运行。

### 数据访问(Data Access)

DBMS 的一般要求是遵守数据访问语言的公认行业标准。

#### 结构化查询语言 （SQL）

SQL是一种基于集合的声明性语言，它为RDBMS（如Oracle数据库）提供接口。

C等过程语言描述了*应该如何*做事。SQL 是非过程性的，它描述了应该*做什么*。

SQL 是关系型数据库的 ANSI 标准语言。对 Oracle 数据库中数据的所有操作都是使用 SQL 语句执行的。例如，您可以使用 SQL 创建表以及查询和修改表中的数据。

SQL语句可以被认为是一个非常简单但功能强大的计算机程序或指令。用户指定他们想要的结果（例如，员工姓名），而不是如何派生它。SQL 语句是 SQL 文本的字符串，如下所示：

```sql
SELECT first_name, last_name FROM employees;
```

SQL 语句使您能够执行以下任务：

- 查询数据
- 在表中插入、更新和删除行
- 创建、替换、更改和删除对象
- 控制对数据库及其对象的访问
- 保证数据库的一致性和完整性

SQL 将上述任务统一为一种一致的语言。**Oracle SQL** 是ANSI标准的实现。Oracle SQL 支持许多超出标准 SQL 的功能。

#### PL/SQL 和 Java

**PL/SQL**是Oracle SQL的过程扩展。

PL/SQL 与 Oracle 数据库集成，使您能够使用所有 Oracle 数据库 SQL 语句、函数和数据类型。您可以使用 PL/SQL 来控制 SQL 程序的流程、使用变量和编写错误处理程序。

PL/SQL的一个主要优点是能够在数据库本身中存储应用程序逻辑。**PL/SQL 存储过程(PL/SQL procedure)** 或 **函数(function)** 是一个模式对象，它由一组 SQL 语句和其他 PL/SQL 构造组成，组合在一起，存储在数据库中，并作为一个单元运行以解决特定问题或执行一组相关任务。服务器端编程的主要好处是内置功能可以部署在任何地方。

Oracle数据库还可以存储用Java编写的程序单元。Java 存储过程是发布到 SQL 并存储在数据库中以供常规使用的 Java 方法。您可以从 Java 调用现有的 PL/SQL 程序，也可以从 PL/SQL 调用 Java 程序。

### 事务管理(Transaction Management)

Oracle 数据库设计为多用户数据库。数据库必须确保多个用户可以同时工作而不会损坏彼此的数据。

#### 事务(Transactions)

**事务**是包含一个或多个 SQL 语句的逻辑原子工作单元。

RDBMS 必须能够对 SQL 语句进行分组，以便它们要么全部提交（这意味着它们被应用于数据库），要么全部回滚，这意味着它们被撤消。

事务需求的一个例子是从储蓄账户到支票账户的资金转移。传输包括以下单独的操作：

1. 减少储蓄账户。
2. 增加支票账户。
3. 在交易日志中记录交易记录。

Oracle 数据库保证所有三个操作作为一个单元成功或失败。例如，如果硬件故障阻止事务中的语句执行，则必须回滚其他语句。

事务是将 Oracle 数据库与文件系统区分开来的一项功能。如果执行更新多个文件的原子操作，并且如果系统中途失败，则文件将不一致。相反，事务将 Oracle 数据库从一个一致状态移动到另一个一致状态。事务的基本原则是“全有或全无”：原子操作作为一个整体成功或失败。

#### 数据并发(Data Concurrency)

多用户RDBMS的一个要求是控制**数据并发性(data concurrency)**，即多个用户同时访问同一数据。

如果没有并发控制，用户可能会不正确地更改数据，从而损害**数据完整性(data integrity)**。例如，一个用户可以更新行，而另一个用户同时更新行。

如果多个用户访问相同的数据，则管理并发的一种方法是让用户等待。但是，DBMS 的目标是减少等待时间，因此它不存在或可以忽略不计。所有修改数据的 SQL 语句都必须在尽可能少的干扰下进行。必须避免破坏交互，即错误地更新数据或更改基础数据结构的交互。

Oracle 数据库使用锁来控制对数据的并发访问。**锁(lock)** 是一种机制，可防止访问共享资源的事务之间的破坏交互。锁有助于确保数据完整性，同时允许对数据的最大并发访问。

#### 数据一致性(Data Consistency)

在 Oracle 数据库中，每个用户都必须看到一致的数据视图，包括用户自己的事务和其他用户的已提交事务所做的可见更改。

例如，数据库必须防止脏读问题，当一个事务看到另一个并发事务所做的未提交的更改时，就会出现 **脏读(dirty read)** 问题。

Oracle 数据库始终强制实施语句级 **读取一致性(read consistency)** ，从而保证单个查询返回的数据在单个时间点提交且一致。根据事务隔离级别，此点是打开语句的时间或事务开始的时间。Oracle 闪回查询功能使您能够显式指定此时间点。

数据库还可以为事务中的所有查询提供读取一致性，称为事务级读取一致性。在这种情况下，事务中的每个语句都会看到来自同一时间点的数据，即事务开始的时间。

### Oracle数据库架构(Oracle Database Architecture)

**数据库服务器**是信息管理的关键。

通常，**服务器(server)** 在多用户环境中可靠地管理大量数据，以便用户可以同时访问相同的数据。数据库服务器还可以防止未经授权的访问，并为故障恢复提供有效的解决方案。

#### 数据库和实例

Oracle 数据库服务器由一个数据库和至少一个**数据库实例(database instance)**（通常简称为**实例(instance)**）组成。

由于实例和数据库的连接非常紧密，因此术语 Oracle 数据库有时用于指代实例和数据库。从最严格的意义上讲，这些术语具有以下含义：

- 数据库(Database)

  数据库是位于磁盘上的一组文件，用于存储数据。这些文件可以独立于数据库实例存在。

- 数据库实例(Database instance)

  实例是一组管理数据库文件的内存结构。该实例由一个共享内存区域（称为 **系统全局区域(system global area、SGA)**）和一组后台进程组成。实例可以独立于数据库文件存在。

下图显示了数据库及其实例。对于与实例的每个用户连接，**客户端进程(client process)** 都会运行该应用程序。每个客户端进程都与其自己的 **服务器进程(server process)** 相关联。服务器进程具有自己的专用会话内存，称为 **程序全局区域 (program global area、PGA)**。

图 1-1 Oracle 实例和数据库

![图 1-1 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt233.gif)

**“图 1-1 Oracle 实例和数据库”的说明**

&emsp;&emsp;该图显示了 SGA。SGA 中包括数据库缓冲区缓存、重做日志缓冲区、共享池、大型池、固定 SGA、Java 池和流池。SGA 的右侧是后台进程 PMON、SMON、RECO、MMON、MMNL 等。SGA下方是DBWn，CKPT，LGWR，ARCn和RVWR。SGA 下面是 PGA 和服务器进程。服务器进程连接到客户端进程。客户端进程的右侧是数据库文件（数据文件、控制文件、联机重做日志）、存档重做日志和闪回日志。

尽管严格意义上的 Oracle 数据库是一组物理结构（文件和内存结构），但应用程序可以与单个物理数据库中的多个逻辑数据库或分布在多个物理数据库中的单个逻辑数据库进行交互。

##### 多租户架构(Multitenant Architecture)

**多租户架构**使 Oracle 数据库成为多租户容器数据库 （multitenant container database、CDB）。

**非 CDB(non-CDB)** 是不能包含 PDB 的传统 Oracle 数据库。**CDB** 是包含零个、一个或多个用户创建的可插拔数据库的单个物理数据库。**可插拔数据库（pluggable databases、PDB）** 是schema、schema对象和非schema对象的可移植集合，在 **Oracle Net** 客户端中显示为非 CDB。

**注意**：CDB 和非 CDB 存在体系结构差异。除非另有说明，否则本手册假定非 CDB 的体系结构。

###### 多租户架构的优势(Benefits of the Multitenant Architecture)

多租户架构解决了传统非CDB架构带来的许多问题。

大型企业可能使用数百或数千个数据库，通常在多个物理服务器上的不同平台上运行。现代服务器能够处理比以前更重的工作负载。数据库可能只使用服务器硬件容量的一小部分。这种方法浪费了硬件和人力资源。

通过将不同计算机上的多个物理数据库合并为单台计算机上的单个数据库，多租户架构具有以下优点：

- 降低硬件成本
- 更轻松、更快速地移动数据和代码
- 更轻松地管理和监控物理数据库
- 数据和代码分离
- **PDB 管理员(PDB administrator)**（仅管理其被授予权限的PDB）与 **CDB 管理员(CDB administrator)**（管理整个 CDB）之间的职责分离

可管理性的好处包括：

- 通过拔出和插入 PDB 更轻松地升级数据和代码
- 在将 PDB 插入生产 CDB 之前，使用 PDB 进行开发，从而更轻松地进行测试
- 能够将单个 PDB 闪回到以前的 SCN
- 能够在 PDB 级别设置内存和 I/O 的性能限制
- 能够在 **应用程序容器(application container)** 中安装、升级和管理主 **应用程序(application)** 定义，主应用程序定义是插入到公共**应用程序根(application root)**目录的一组 PDB

###### 数据库整合(Database Consolidation)

**数据库整合**是将数据从一个或多个非 CDB 移动到 CDB 的一般过程。

从 Oracle 数据库 12c 开始，必须将数据库创建为 CDB 或非 CDB。您可以将传统的非CDB 作为 PDB 插入 CDB。**PDB/非CDB 兼容性保证(PDB/non-CDB compatibility guarantee)** 意味着 PDB 的行为与从 Oracle Net 连接的客户端看到的非 CDB 相同。

下图显示了两个单独的非 CDB：`hr`和`sales` 。每个非 CDB 都有自己的内存和数据库文件集，并驻留在自己的计算机上。每个非 CDB 都有自己的专用用户应用程序。

图1-2 非国开行

![Description of Figure 1-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt349.png)

**“图1-2 非CDB”说明**

&emsp;&emsp;此图显示了两台服务器计算机，每台计算机都有一个表示数据库的柱面。一个数据库标记为“hr”，另一个数据库标记为“sales”。标有“HR Application”的框指向 HR 数据库。标有“Sales Application”的框指向销售数据库。

下图显示了合并到名为`MYCDB` 的 CDB 后的相同数据。

图1-3 非国开行并入国开行

![图 1-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt352.png)

**“图1-3 非国开行合并为国开行”说明**

&emsp;&emsp;此图描绘了一台服务器计算机。这台计算机上有一个表示数据库的柱面。数据库标记为“CDB”。圆柱体内部是一个标有“根（CDB$ROOT）”的三维长方形盒子。两个较小的气缸插入盒子。一个柱面标记为“hrpdb”。另一个柱面标记为“salespdb”。标记为“Sales Application”的框指向 salespdb。标记为 HR Application的框指向 hrpdb。

从物理上讲，`MYCDB`是一个Oracle数据库。`MYCDB`有一个数据库实例，尽管在 Oracle 实际应用程序集群中可以有多个实例，以及一组数据库文件，就像非 CDB 一样。

`MYCDB`包含两个 PDB：`hrpdb`和`salespdb' 。如图 1-3 所示，这些 PDB 在各自的应用程序中显示的方式与数据库合并之前一样。若要管理 CDB 本身或其中的任何 PDB，CDB 管理员可以连接到 **CDB根(CDB root)**，该根是所有PDB所属的的schema、schema对象和非schema对象的集合。

###### 应用程序容器(Application Containers)

从 Oracle 数据库 12c 第 2 版 （12.2） 开始，应用容器是用户创建的可选容器，用于存储一个或多个应用模型的数据和元数据。

应用程序（也称为*应用程序模型*）是存储在 **应用程序根目录(application root)** 中的一组命名的版本化公共数据和元数据。例如，应用程序模型可能包括一组 PDB 通用的表、视图、用户帐户和 PL/SQL 包的定义。

在某些方面，应用程序容器充当 CDB *中*特定于应用程序的 CDB。应用程序容器（如 CDB 本身）可以包含多个应用程序 PDB，并使这些 PDB 能够共享元数据和数据。

例如，SaaS 部署可以使用多个应用程序 PDB，每个 PDB 用于单独的客户，这些 PDB 共享应用程序元数据和数据。例如，在下图中，`sales_app`是应用程序根目录中的应用程序模型。名为`cust1_pdb`的 **应用程序 PDB(application PDB)** 仅包含客户 1 的销售数据，而名为`cust2_pdb`的应用程序 PDB 仅包含客户 2 的销售数据。插入、拔出、克隆和其他 PDB 级别的操作可用于单个客户 PDB。

图 1-4 SaaS 用例

![图 1-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt389.png)

**“图 1-4 SaaS 用例”的说明**

&emsp;&emsp;此图描绘了一个标记为“根”（CDB$ROOT）的三维框。在根下方和左侧，带有 USB 连接器的圆柱体插入根盒。圆柱体标记为种子 （PDB$SEED）。在框下方和右侧，标记为“应用程序根”的框插入到根中。连接器标记为“应用程序容器”。应用程序根目录包含一个标记为 sales_app 的较小框。插入应用程序根目录的是应用程序种子、cust1_pdb和cust2_pdb。后两者标记为应用程序 PDB。

##### 分片架构(Sharding Architecture)

Oracle 分片是一种基于跨多个 Oracle 数据库对数据进行水平分区的数据库扩展技术。 应用程序将数据库池视为单个逻辑数据库。

OLTP 应用程序分片的主要优势包括线性可伸缩性、故障遏制和地理数据分布。分片非常适合在 Oracle 云中进行部署。 与实现分片的NoSQL数据存储不同，Oracle分片提供了分片的优势，而不会牺牲企业RDBMS的功能。

在分片schema中，每个数据库都托管在具有自己的本地资源（CPU、内存、闪存或磁盘）的专用服务器上。 此类配置中的每个数据库称为**分片**。 所有碎片一起组成 向上单个逻辑数据库，称为**分片 数据库**。

水平分区涉及跨分片拆分数据库表，以便每个分片包含具有相同列但行子集不同的表。以这种方式拆分的表也称为**分片表**。

下图显示了跨三个分片水平分区的分片表。

图 1-5 跨分片的水平分区表

![图 1-5 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin_3v_134a.png)
[“图 1-5 跨分片的水平分区表”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin_3v_134a.html)

一个用例是跨多个物理数据库分发客户帐户数据。例如，具有 ID 28459361的客户可以查找其记录。下图显示了可能的体系结构。客户请求通过连接池路由，其中分片控制器（网络侦听器）将请求定向到包含所有客户行的相应分片。

图 1-6 Oracle 分片schema

![Description of Figure 1-6 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin_3v_143d.png)
[“图 1-6 Oracle 分片体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin_3v_143d.html)

另请参阅：

[使用 Oracle Sharding 了解 Oracle Sharding](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SHARD-GUID-0F39B1FB-DCF9-4C8A-A2EA-88705B90C5BF) 的概述



#### 数据库存储结构

可以从物理和逻辑两个角度考虑数据库。

物理数据是在操作系统级别可查看的数据。例如，操作系统实用程序如Linux可以列出数据库文件和进程。逻辑数据（如表）仅对数据库有意义。SQL 语句可以列出 Oracle 数据库中的表，但操作系统实用程序不能列出。`ls``ps`

数据库具有物理结构和逻辑结构。由于物理结构和逻辑结构是分开的，因此您可以管理数据的物理存储，而不会影响对逻辑存储结构的访问。例如，重命名物理数据库文件不会重命名其数据存储在此文件中的表。





##### 物理存储结构

物理数据库结构是存储数据的文件。

执行语句时，将创建以下文件：`CREATE DATABASE`

- 数据文件

  每个 Oracle 数据库都有一个或多个物理数据文件，其中包含所有数据库数据。逻辑数据库结构（如表和索引）的数据以物理方式存储在数据文件中。

- 控制文件

  每个 Oracle 数据库都有一个[**控制文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)。控制文件包含指定数据库物理结构的元数据，包括数据库名称以及数据库文件的名称和位置。

- 联机重做日志文件

  每个 Oracle 数据库都有一个联机重做日志，该日志是一组两个或多个[**联机重做**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)日志文件。联机重做日志由重做条目（也称为[**重做**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F24A4593-5E47-4D06-B9D6-0061D288373C)日志记录）组成，这些条目记录对数据所做的所有更改。

许多其他文件对于 Oracle 数据库服务器的功能很重要。其中包括参数文件和网络文件。备份文件和存档的重做日志文件是对于备份和恢复很重要的脱机文件。

另请参阅：

"[物理存储结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-FFA872E1-7F63-4DC5-8A35-F21394AB4595)"





##### 逻辑存储结构

逻辑存储结构使 Oracle 数据库能够对磁盘空间的使用进行精细控制。

本主题讨论逻辑存储结构：

- 数据块

  在最精细的粒度级别，Oracle 数据库数据存储在数据块中。一个[**数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)对应于磁盘上的特定字节数。

- 程度

  [**范围**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C56D833A-B3D3-4B85-AAB4-334F7CF3F5E9)是在单个分配中获得的特定数量的逻辑连续数据块，用于存储特定类型的信息。

- 段

  [**线段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)是为用户对象（例如，表或索引）、撤消数据或临时[**数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-297B963A-989C-4720-B061-A2352FF72892)分配的一组盘区。

- 表空间

  数据库分为称为表空间的逻辑存储单元。[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA66891C-71B2-4D55-8F64-0E427AE24E88)是段的逻辑容器。每个表空间至少包含一个数据文件。

另请参阅：

"[逻辑存储结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-13CE5EDA-8C66-4CA0-87B5-4069215A368D)"





#### 数据库实例结构

Oracle 数据库使用内存结构和进程来管理和访问数据库。所有内存结构都存在于构成RDBMS的计算机的主内存中。

当应用程序连接到 Oracle 数据库时，它们将连接到[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)。实例通过分配除 SGA 之外的其他内存区域以及启动除后台进程之外的其他进程来为应用程序提供服务。





##### Oracle数据库流程

**进程**是操作系统中的一种机制，可以运行一系列步骤。某些操作系统使用术语“*作业*”、“*任务*”或*“线程*”。

就本主题而言，线程等效于进程。Oracle 数据库实例具有以下类型的进程：

- 客户端进程

  创建和维护这些进程是为了运行应用程序或 Oracle 工具的软件代码。大多数环境都有用于客户端进程的单独计算机。

- 后台进程

  这些进程整合了原本由为每个客户端进程运行的多个 Oracle 数据库程序处理的功能。后台进程异步执行 I/O 并监控其他 Oracle 数据库进程，以提供更高的并行性，从而提高性能和可靠性。

- 服务器进程

  这些进程与客户端进程通信，并与 Oracle 数据库交互以满足请求。

Oracle 进程包括服务器进程和后台进程。在大多数环境中，Oracle 进程和客户端进程在不同的计算机上运行。

另请参阅：

"[流程schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-85D9852E-5BF1-4AC0-9E5A-49F0570DBD7A)"





##### 实例内存结构

Oracle 数据库为每个连接的用户创建并使用程序代码、用户之间共享的数据以及私有数据区域的内存结构。

以下内存结构与数据库实例相关联：

- 系统全局区域 （SGA）

  SGA 是一组共享内存结构，其中包含一个数据库实例的数据和控制信息。SGA 组件的示例包括数据库缓冲区缓存和共享 SQL 区域。从 Oracle 数据库 12c 第 1 版 （12.1.0.2） 开始，SGA 可以包含可选的内存中列存储（IM 列存储），该存储允许以[**列格式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DDC39B24-BE95-406A-986F-D760308CA26D)在[**内存中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A19D33EA-7BAA-42C0-9E13-6AF686E2A976)填充数据。

- 计划全球区域 （PGA）

  PGA 是包含服务器或后台进程的数据和控制信息的内存区域。进入PGA是该过程独有的。每个服务器进程和后台进程都有自己的 PGA。

  另请参阅：

  "[内存schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-913335DF-050A-479A-A653-68A064DCCA41)"





#### 应用和网络schema

为了充分利用给定的计算机系统或网络，Oracle数据库允许在数据库服务器和客户端程序之间拆分处理。运行RDBMS的计算机处理数据库服务器职责，而运行应用程序的计算机处理数据的解释和显示。





##### 应用程序体系结构

应用程序体系结构是数据库应用程序连接到 Oracle 数据库的计算环境。两种最常见的数据库体系结构是客户端/服务器和多层。

客户端-服务器体系结构

在客户端[**/服务器体系结构**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F0D8417-F8ED-4D91-BB81-1F86499ADD69)中，客户端应用程序启动要在数据库服务器上执行的操作的请求。服务器运行 Oracle 数据库软件并处理并发共享数据访问所需的功能。服务器接收并处理来自客户端的请求。

多层体系结构

在[**多层体系结构**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A8812375-43CA-4C1A-B376-A59C6FADF50B)中，一个或多个应用程序服务器执行部分操作。应用程序[**服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1774BB0F-837E-4651-B1A3-BC468B027B8F)包含大部分应用程序逻辑，为客户机提供对数据的访问，并执行一些查询处理。这样，数据库上的负载就会减少。应用程序服务器可以充当客户机和多个数据库之间的接口，并提供额外的安全级别。

[**面向服务的体系结构 （SOA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2CB01B71-A23D-4127-B54A-E946C23BEDFC) 是一种多层体系结构，其中应用程序功能封装在服务中。SOA 服务通常作为 Web 服务实现。Web 服务可通过 HTTP 访问，并且基于 XML 的标准，如 Web 服务描述语言 （WSDL） 和 SOAP。Oracle 数据库可以在传统的多层或 SOA 环境中充当 Web 服务提供程序。

**简单 Oracle 文档访问 （SODA） 是 SOA** 的改编版，使您能够访问存储在数据库中的数据。SODA 专为无模式应用程序开发而设计，无需了解关系型数据库功能或语言（如 SQL 和 PL/SQL）。您可以在 Oracle 数据库中创建和存储文档集合、检索和查询文档集合，而无需知道文档的存储方式。SODA for REST 使用具象状态传输 （REST） 体系结构样式来实现 SODA。

另请参阅：

- "[多层体系结构概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-A65D8A2C-2DE0-4438-A042-54A3C07FF006)"
- [Oracle XML DB 开发人员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDB-GUID-108279B4-0315-4D8D-86A2-6487767ED280)了解有关将 Web 服务与数据库配合使用的更多信息





##### Oracle网络服务schema

**Oracle 网络服务**是数据库和网络通信协议之间的接口，可促进分布式处理和分布式数据库。

通信协议定义了在网络上传输和接收数据的方式。Oracle 网络服务支持所有主要网络协议上的通信，包括 TCP/IP、HTTP、FTP 和 WebDAV。

Oracle Net是[**Oracle Net**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4F4232CE-6A82-4F39-8565-281AF563F0AE) Services的一个组件，它建立和维护从客户端应用程序到数据库服务器的网络会话。建立网络会话后，Oracle Net 充当客户端应用程序和数据库服务器的数据传送者，在它们之间交换消息。Oracle Net可以执行这些作业，因为它位于网络中的每台计算机上。

网络服务的一个重要组件是 Oracle 网络侦听器（称为[**侦听器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-504800FA-2159-495B-8E4F-B2D4D938EA85)），它是在数据库或网络中其他位置运行的进程。客户端应用程序将连接请求发送到侦听器，侦听器管理这些请求到数据库的流量。建立连接后，客户端和数据库直接通信。

配置 Oracle 数据库以服务客户端请求的最常见方法是：

- 专用服务器schema

  每个客户端进程都连接到[**专用服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8B14C804-9D68-471C-A581-5AEE673A9FCD)进程。在客户端会话期间，任何其他客户端都不会共享服务器进程。每个新会话都分配有一个专用的服务器进程。

- 共享服务器体系结构

  数据库将[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)进程池用于多个会话。客户端进程与调度程序通信，[**调度程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D8288F03-1F84-4766-AF5B-B341A714BD3F)使许多客户端能够连接到同一数据库实例，而无需为每个客户端提供专用服务器进程。

另请参阅：

- "[Oracle 网络服务schema概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-136C7637-89B5-4C5A-B186-E06F86CE2359)"
- [《Oracle Database Net Services Administrator's Guide》，了解有关 Oracle Net](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG1511) schema的更多信息
- [Oracle XML DB 开发人员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDB-GUID-0F06D44E-4DBD-4B5D-B275-A4BADA0510AB)了解有关将 WebDAV 与数据库配合使用的信息





### Oracle数据库文档路线图

文档集设计有特定的访问路径，以确保用户能够尽可能高效地找到他们需要的信息。

文档集分为三个层或组：基本层、中层和高级层。用户从基本组中的手册开始，进入中间组中的手册（*2 天 +* 系列），最后到高级手册，其中包括文档的其余部分。

您可以在 https://docs.oracle.com/en/database/oracle/oracle-database/ 找到有关受支持的 Oracle 数据库版本的文档。





#### Oracle 数据库文档：基本组

刚接触 Oracle 数据库的技术用户首先从头到尾阅读基本组中的一本或多本手册。该组中的每本手册设计为在两天内阅读。

除本手册外，基本组还包括下表中显示的手册。

表1-1 基本组

| 手动                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Oracle数据库 2 天 DBA](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-78050887-822B-4091-8DBA-A8EC43602350) | 数据库管理员 （DBA） 负责 Oracle 数据库的整体操作。这个基于任务的快速入门教授 DBA 如何使用 Oracle Enterprise Manager Database Express （EM Express） 执行日常数据库管理任务。该手册教授 DBA 如何执行保持数据库运行所需的所有典型管理任务，包括如何执行基本的故障排除和性能监视活动。 |
| [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-AE8B7A74-AD1F-4474-B0CF-B3E95D075DDA) | 本基于任务的快速入门指南介绍了如何通过 SQL 和 PL/SQL 使用 Oracle 数据库的基本功能。 |

基本组中的手册密切相关，这反映在交叉引用的数量上。例如，*Oracle 数据库概念经常*向用户发送 *2 天*手册，以了解如何根据概念执行任务。*为期 2 天的*手册经常参考 *Oracle 数据库概念*，了解任务的概念背景。





#### Oracle 数据库文档：中间组

从基本组向上的下一步是中间组。

中间组中的手册以*单词 2 天 +* 为前缀，因为它们扩展并假定 *2 天*手册中包含的信息。*2 天 +* 手册比基本手册更深入地涵盖主题，或涵盖特别感兴趣的主题。这些手册适用于不同的受众：

- 数据库管理员

  Oracle 数据库 2 天 + 性能调优指南是一份快速入门指南，介绍如何使用 Oracle 诊断包、Oracle 调优包和 Oracle 企业管理器云控制（云控制）提供的功能执行日常[数据库性能调优](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-CEF73784-0C70-415A-ACB6-72504CC10B70)任务。

- 数据库开发人员

  [《Oracle 数据库 2 天 + Java 开发人员指南》可帮助您](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-8C73108B-E0F3-4CD5-A813-909B339339BB)了解用于构建 Java 应用的所有 Java 产品。本手册介绍了如何在示例 Web 应用程序中使用 Oracle JDBC 瘦驱动程序、通用连接池 （UCP） 和数据库中的 Java （OJVM）。





#### Oracle 数据库文档：高级组

高级组手册适用于需要比 *2 天 +* 手册提供的更详细的特定主题信息的专家用户。

下表列出了高级组中的基本参考手册。

表1-2 基本参考手册

| 手动                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF) | 提供用于管理 Oracle 数据库中信息的结构化查询语言 （SQL） 的完整说明。 |
| [Oracle数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN) | 描述数据库初始化参数、数据字典视图、动态性能视图、等待事件和后台进程。 |
| [Oracle Database PL/SQL 包和类型参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS-GUID-4AA6AA30-CAEE-4DCD-B214-9AD51D0229B4) | 描述随 Oracle 数据库服务器提供的 PL/SQL 包。可以在创建应用程序时使用提供的包，也可以在创建自己的存储过程时使用想法。 |

高级指南太多，无法在本节中列出。下表列出了大多数专家 Oracle DBA 使用的指南。

表 1-3 DBA 高级组

| 手动                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN) | 说明如何执行创建和配置数据库、维护和监视数据库、创建schema对象、计划作业和诊断问题等任务。 |
| [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG-GUID-41040F53-D7A6-48FA-A92A-0C23118BC8A0) | 介绍如何使用默认数据库功能配置 Oracle 数据库的安全性。       |
| [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA) | 介绍如何使用 Oracle 数据库工具优化数据库性能。本指南还介绍了创建数据库的性能最佳做法，并包括与性能相关的参考信息。 |
| [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL) | 描述 SQL 处理、优化器、执行计划、SQL 运算符、优化器统计信息、应用程序跟踪和 SQL 顾问程序。 |
| [Oracle 数据库备份和恢复用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV) | 说明如何备份、还原和恢复 Oracle 数据库，如何对数据库文件的备份执行维护，以及如何在存储系统之间传输数据。 |
| [Oracle 真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD) | 说明如何安装、配置、管理和排除 Oracle RAC 数据库故障。       |

下表列出了大多数 Oracle 专家开发人员使用的指南。

表 1-4 面向开发人员的高级组

| 手动                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [Oracle数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS) | 说明如何开发应用程序或转换现有应用程序以在 Oracle 数据库环境中运行。该手册解释了应用程序设计的基础知识，并描述了在SQL和PL / SQL中进行开发的基本概念。 |
| [Oracle Database PL/SQL Language Reference](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS) | 描述 PL/SQL 语言的所有方面，包括数据类型、控制语句、集合、触发器、包和错误处理。 |
| [Oracle Database Java Developer's Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=JJDEV-GUID-912A14D4-2621-4955-85BD-A04E17EE6D21) | 描述如何在 Oracle 数据库中开发、加载和运行 Java 应用程序。   |
| [Oracle 数据库安全文件和大型对象开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-1A2B0023-9EE8-48AF-AA76-171D1FC5C241) | 说明如何使用大型对象 （LOB）、安全文件 LOB 和数据库文件系统 （DBFS） 开发新应用程序。 |

特定用户所需的其他高级指南取决于该用户的责任范围。

## 第一部分 Oracle关系数据结构

本部分介绍数据库的基本数据结构，包括数据完整性规则和存储元数据的结构。

本部分包含以下章节：

- 表和表簇
- 索引和按索引组织的表
- 分区、视图和其他schema对象
- 数据完整性
- 数据字典和动态性能视图

## 2 表 和 表簇

本章介绍schema对象并讨论表，表是最常见的schema对象类型。

本章包含以下部分：

- schema对象简介
- 表概述
- 表集群概述
- 属性集群表概述
- 临时表概述
- 外部表概述
- 对象表概述

### Schema 对象简介

**schema**是数据结构的逻辑容器，称为**schema**对象。schema对象的示例包括表和索引。您可以使用 SQL 创建和操作schema对象。

数据库**用户账户**具有密码和特定的数据库权限。每个用户帐户都拥有一个与用户同名的schema。schema包含拥有该schema的用户的数据。例如，<code>hr</code>用户帐户拥有<code>hr</code> schema，其中包含schema对象（如<code>employees</code> 表）。在生产数据库中，schema所有者通常表示数据库应用程序而不是人员。

在schema中，特定类型的每个schema对象都有一个唯一的名称。例如，<code>hr.employees</code> 引用<code>hr</code> schema中的<code>employees</code> 表。图 2-1 描述了名为hr的schema所有者和hr schema中的schema对象。

图 2-1 HR schema

![Description of Figure 2-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt230.gif)
“图 2-1 HR schema”的说明

本节包含以下主题：

- schema对象类型
- schema对象存储
- schema对象依赖项
- 系统和系统schema
- 示例schema

#### schema 对象类型

Oracle SQL 使您能够创建和操作许多其他类型的schema对象。

下表显示了schema对象的主要类型。

表2-1 schema对象

| 对象                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- | 
| 表(Table)                  | **表(Table)**将数据存储在行中。表是关系型数据库中最重要的schema对象。 |
| 索引(Indexes)                  | 索引是schema对象，其中包含表或**簇表(Table Cluster)**的每个索引行的条目，并提供对行的直接、快速访问。Oracle 数据库支持多种类型的索引。**索引表(index-organized table)**是数据存储在索引结构中的表。 |
| 分区(Partitions)                  | 分区是大型表和索引的片段。每个分区都有自己的名称，并且可以选择具有自己的存储特征。 |
| 视图(Views)                  | 视图是一个或多个表或其他视图中数据的自定义表示形式。您可以将它们视为存储的查询。视图实际上不包含数据。 |
| 序列(Sequences)                  | 序列是用户创建的对象，可由多个用户共享以生成整数。通常，使用序列生成**主键(primary key)**|
| 维度(Dimensions)                  | 维度表是数据仓库中的概念。维度定义列集对之间的父子关系，其中列集的所有列必须来自同一个表。维度通常用于对客户、产品和时间等数据进行分类。 |
| 同义词(Synonyms)                | 同义词是另一个schema对象的别名。由于同义词只是一个别名，因此除了在**数据字典**中的定义外，它不需要存储。 |
| PL/SQL 子程序和软件包 | PL/SQL是SQL的Oracle过程扩展。**PL/SQL 子程序**是一个命名的 PL/SQL 块，可以使用一组参数调用。**PL/SQL 软件包**对逻辑上相关的 PL/SQL 类型、变量和子程序进行分组。 | 

其他类型的对象也存储在数据库中，可以使用 SQL 语句创建和操作，但不包含在schema中。这些对象包括数据库用户帐户、角色、上下文和字典对象。

#### Schema 对象存储

某些schema对象将数据存储在称为**段(Segment)**的逻辑存储结构类型中。例如，非分区堆组织的表或索引会创建一个段。

其他schema对象（如视图和序列）仅包含元数据(metadata)。本主题仅介绍具有段的schema对象。

Oracle 数据库将schema对象逻辑地存储在**表空间(tablespace)**中。schema和表空间之间没有关系：表空间可以包含来自不同schema的对象，并且schema的对象可以包含在不同的表空间中。每个对象的数据在物理上包含在一个或多个数据文件中。

下图显示了表段和索引段、表空间和数据文件的可能配置。一个表的数据段跨越两个数据文件，这两个文件都是同一表空间的一部分。一个段不能跨越多个表空间。

图 2-2 段、表空间和数据文件

![Description of Figure 2-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt284.gif)

<br/>
“图 2-2 段、表空间和数据文件”的说明

#### Schema 对象依赖

某些schema对象引用其他对象，从而创建**schema对象依赖(schema object dependency)**。

例如，视图包含引用表或视图的**查询(query)**，而 **PL/SQL** 子程序调用其他子程序。如果对象A 的定义引用对象B，则A是B上的**依赖对象(dependent object)**，B是A的**引用对象(referenced object)**。

Oracle 数据库提供了一种自动机制，可确保依赖对象相对于其引用的对象始终保持最新状态。创建依赖对象时，数据库将跟踪依赖对象与其引用对象之间的依赖关系。当引用的对象以可能影响依赖对象的方式更改时，数据库会将依赖对象标记为无效。例如，如果用户删除了一个表，则基于已删除表的视图不可用。

在依赖对象可用之前，必须根据引用对象的新定义重新编译无效的依赖对象。引用无效的依赖对象时，会自动进行重新编译。

为了说明schema对象如何创建依赖项，以下示例脚本创建一个表 <code>test_table</code>，然后创建一个查询此表的过程：

```sql
CREATE TABLE test_table ( col1 INTEGER, col2 INTEGER );

CREATE OR REPLACE PROCEDURE test_proc
AS
BEGIN
 FOR x IN ( SELECT col1, col2 FROM test_table )
 LOOP
   -- process data
   NULL;
 END LOOP;
END;
/
```

以下对**存储过程(procedure)**<code>test_proc</code>的状态的查询显示它是有效的：

```sql
SQL> SELECT OBJECT_NAME, STATUS FROM USER_OBJECTS WHERE OBJECT_NAME = 'TEST_PROC';
 
OBJECT_NAME STATUS
----------- -------
TEST_PROC   VALID
```

将列<code>col3</code>添加到<code>test_table</code>后，该存储过程仍然有效，因为该存储过程不依赖于此列：

```sql
SQL> ALTER TABLE test_table ADD col3 NUMBER;
 
Table altered.
 
SQL> SELECT OBJECT_NAME, STATUS FROM USER_OBJECTS WHERE OBJECT_NAME = 'TEST_PROC';
 
OBJECT_NAME STATUS
----------- -------
TEST_PROC   VALID
```

但是，更改存储过程<code>test_proc</code>所依赖的列<code>col1</code>的数据类型会使该过程失效：

```sql
SQL> ALTER TABLE test_table MODIFY col1 VARCHAR2(20);
 
Table altered.
 
SQL> SELECT OBJECT_NAME, STATUS FROM USER_OBJECTS WHERE OBJECT_NAME = 'TEST_PROC';
 
OBJECT_NAME STATUS
----------- -------
TEST_PROC   INVALID
```

运行或重新编译该存储过程使其再次有效，如以下示例所示：

```sql
SQL> EXECUTE test_proc
 
PL/SQL procedure successfully completed.
 
SQL> SELECT OBJECT_NAME, STATUS FROM USER_OBJECTS WHERE OBJECT_NAME = 'TEST_PROC';
 
OBJECT_NAME STATUS
----------- -------
TEST_PROC   VALID
```

#### SYS 和 SYSTEM Schemas

所有 Oracle 数据库都包含默认管理帐户。

管理帐户具有很高的特权，仅供有权执行启动和停止数据库、管理内存和存储、创建和管理数据库用户等任务的 DBA 使用。

创建数据库时会自动创建管理帐户<code>SYS</code>。此帐户可以执行所有数据库管理功能。<code>SYS</code> schema存储 **数据字典(data dictionary)** 的基表和视图。这些基表和视图对于 Oracle 数据库的操作至关重要。<code>SYS</code> schema中的表仅由数据库操作，不得由任何用户修改。

创建数据库时，也会自动创建管理帐户<code>SYSTEM</code>。该<code>SYSTEM</code> schema存储显示管理信息的其他表和视图，以及各种 Oracle 数据库选项和工具使用的内部表和视图。切勿使用<code>SYSTEM</code> schema来存储非管理用户感兴趣的表。

#### 示例 Schemas

Oracle 数据库可能包括**示例schema(sample schemas)**，这些schema是一组相互链接的**schemas**，使 Oracle 文档和 Oracle 教学材料能够说明常见的数据库任务。

<code>hr</code> 示例schema包含有关员工(employees)、部门(departments)和位置(locations)、工作历史记录(work histories)等的信息。下图描述了<code>hr</code> 中表的实体关系图。本手册中的大多数示例都使用此schema中的对象。

图 2-3 HR schema

![Description of Figure 2-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt292.gif)

“图 2-3 HR schema”的说明

另请参阅：

[Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-844E92D8-A4C8-4522-8AF5-761D4BE99200)示例schema，了解如何安装示例schema

### 表概述

**表**是 Oracle 数据库中数据组织的基本单位。

表描述了一个实体，该**实体**对于必须记录哪些信息具有重要意义。例如，员工可以是实体。

Oracle 数据库表分为以下基本类别：

- 关系表

  关系表具有简单的列，是最常见的表类型。[示例 2-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B0DFC5A7-E482-4E17-A6F5-FF476A92DC73__CBBEHJCH) 显示了关系表的语句。`CREATE TABLE`

- 对象表

  这些列对应于[**对象类型的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-33C40B41-75EF-4B5A-AE9F-45CB91700218)顶级属性。请参阅“[对象表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-EBB02ED3-525E-4D7F-B984-E8AC3BF039F7)”。

您可以创建具有以下组织特征的关系表：

- [**堆组织的表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-861D8FCE-B86C-46B3-AA01-35066D24F4CF)不按任何特定顺序存储行。缺省情况下，该语句创建一个堆组织的表。`CREATE TABLE`
- [**按索引组织的表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FD628CF1-3A67-4171-92BB-D4A74119ACD9)根据主键值对行进行排序。对于某些应用程序，按索引组织的表可以提高性能并更有效地使用磁盘空间。请参阅“按[索引组织的表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DAEC075B-C16D-4A57-898C-70EBCB364F0C)”。
- 外部表是只读表，其元数据存储在数据库中，但其数据存储在数据库[**外部**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1B18B978-29DD-4961-BD39-86838CB5F7D0)。请参阅“[外部表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97FC9DFF-A6CF-46CD-9F6F-D88A37C0E79C)”。

表可以是永久性的，也可以是临时的。永久表定义和数据跨会话保留。[**临时**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-41501962-A37B-4D37-BAF2-59030048FE08)表定义以与永久表定义相同的方式保留，但数据仅在[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)或[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)期间存在。临时表在必须临时保存结果集的应用程序中很有用，这可能是因为结果是通过运行多个操作构造的。

本主题包含以下主题：

- [列](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-46FE2805-CA44-429B-84F4-492F9A2C05D6)
- [行](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-62BA95A1-692C-4323-A594-11AD70EF475D)
- [示例：创建表和更改表语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B0DFC5A7-E482-4E17-A6F5-FF476A92DC73)
- [Oracle数据类型](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-A8F3420D-093C-449F-87E4-6C3DDFA8BCFF)
- [完整性约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-FEB30808-F9D1-46AC-B9D7-AE18A12E1C78)
- [表存储](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-85BE900A-0047-4B7C-A992-F1E35B640CA3)
- [表压缩](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-54EE5325-0894-4869-B3AD-8912D9B4A329)

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN015)了解如何管理表





#### 列

表定义包括表名和列集。

[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F1D9AA5F-C66A-4D5F-A84C-8D7360DE3BE5)标识表描述的实体的属性。例如，表中的列引用雇员实体的雇员 ID 属性。`employee_id``employees`

通常，在创建表时，可以为每列指定列名、[**数据类型**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3873B26C-657D-4508-B13D-9155F1D5D8F4)和宽度。例如，数据类型为 ，指示此列只能包含宽度不超过 6 位的数字数据。宽度可以由数据类型预先确定，如 。`employee_id``NUMBER(6)``DATE`





##### 虚拟列

表可以包含虚拟列，与非虚拟列不同，**虚拟列**不占用磁盘空间。

数据库通过计算一组用户指定的表达式或函数来按需派生虚拟列中的值。例如，虚拟列可以是 和 列的函数。`income``salary``commission_pct`

另请参阅：

[《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-2634BF31-512E-4276-99D4-848A535D273B)了解如何管理虚拟列





##### 不可见列

不可见列是用户指定的列，其值仅在按名称显式指定列时才**可见**。您可以在不影响现有应用程序的情况下向表添加不可见列，并在必要时使该列可见。



通常，不可见列有助于迁移和发展联机应用程序。用例可能是使用语句查询三列表的应用程序。向表中添加第四列会中断应用程序，该应用程序需要三列数据。添加第四个不可见列可使应用程序正常运行。然后，开发人员可以更改应用程序以处理第四列，并使该列在应用程序上线时可见。`SELECT *`

下面的示例创建一个包含不可见列的表，然后使不可见列可见：`products``count`

```
CopyCREATE TABLE products ( prod_id INT, count INT INVISIBLE );
ALTER TABLE products MODIFY ( count VISIBLE );
```

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13866)，了解如何管理不可见列
- 有关不可见列的详细信息，Oracle [数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF55897)





#### 行

**行**是与表中的记录对应的列信息的集合。

例如，表中的行描述特定员工的属性：员工 ID、姓氏、名字等。创建表后，您可以使用 SQL 插入、查询、删除和更新行。`employees`





#### 示例：创建表和更改表语句

用于创建表的 Oracle SQL 语句是 。`CREATE TABLE`

例 2-1 创建表员工

以下示例显示了示例schema中表的语句。该语句指定列（如 、 等），并为每个列指定数据类型（如 或）。`CREATE TABLE``employees``hr``employee_id``first_name``NUMBER``DATE`

```
CopyCREATE TABLE employees
    ( employee_id    NUMBER(6)
    , first_name     VARCHAR2(20)
    , last_name      VARCHAR2(25)
         CONSTRAINT     emp_last_name_nn  NOT NULL
    , email          VARCHAR2(25)
        CONSTRAINT     emp_email_nn  NOT NULL
    , phone_number   VARCHAR2(20)
    , hire_date      DATE
        CONSTRAINT     emp_hire_date_nn  NOT NULL
    , job_id         VARCHAR2(10)
        CONSTRAINT     emp_job_nn  NOT NULL
    , salary         NUMBER(8,2)
    , commission_pct NUMBER(2,2)
    , manager_id     NUMBER(6)
    , department_id  NUMBER(4)
    , CONSTRAINT     emp_salary_min
                     CHECK (salary > 0)
    , CONSTRAINT     emp_email_uk
                     UNIQUE (email)
    ) ;
```

示例 2-2 更改表员工

下面的示例演示向表添加完整性约束的语句。完整性约束强制实施业务规则并防止将无效信息输入表中。`ALTER TABLE``employees`

```
CopyALTER TABLE employees
ADD ( CONSTRAINT     emp_emp_id_pk
                       PRIMARY KEY (employee_id)
    , CONSTRAINT     emp_dept_fk
                       FOREIGN KEY (department_id)
                         REFERENCES departments
    , CONSTRAINT     emp_job_fk
                       FOREIGN KEY (job_id)
                         REFERENCES jobs (job_id)
    , CONSTRAINT     emp_manager_fk
                       FOREIGN KEY (manager_id)
                         REFERENCES employees
    ) ;
```

示例 2-3 员工表中的行

以下示例输出显示了表的 8 行和 6 列。`hr.employees`

```
CopyEMPLOYEE_ID FIRST_NAME  LAST_NAME      SALARY COMMISSION_PCT DEPARTMENT_ID
----------- ----------- ------------- ------- -------------- -------------
        100 Steven      King            24000                           90
        101 Neena       Kochhar         17000                           90
        102 Lex         De Haan         17000                           90
        103 Alexander   Hunold           9000                           60
        107 Diana       Lorentz          4200                           60
        149 Eleni       Zlotkey         10500             .2            80
        174 Ellen       Abel            11000             .3            80
        178 Kimberely   Grant            7000            .15
```

前面的输出说明了表、列和行的以下一些重要特征：

- 表的一行描述一个员工的属性：姓名、薪水、部门等。例如，输出中的第一行显示名为 Steven King 的员工的记录。
- 列描述员工的属性。在该示例中，列是[**主键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)，这意味着每个员工都由员工 ID 唯一标识。保证任何两个员工不具有相同的员工 ID。`employee_id`
- 非键列可以包含具有相同值的行。在此示例中，雇员 101 和 102 的工资值相同：。`17000`
- 外键列是指同一表或不同表中的主键或唯一[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EEE8A67D-6B0E-468E-9554-48FEE552BC9A)。在此示例中，in 的值对应于表的列。`90``department_id``department_id``departments`
- [**字段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCCDD0D5-7738-431A-96F4-08B32D01FD7B)是行和列的交集。它只能包含一个值。例如，雇员 103 的部门 ID 的字段包含值 。`60`
- 字段可以缺少值。在这种情况下，该字段被称为包含[空值。](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8854502F-2B8F-4ABC-98FA-BBFC3695A964)雇员 100 的列值为 null，而雇员 149 的字段中的值为 。除非在此列上定义了主键完整性约束，否则列允许空值，在这种情况下，如果没有此列的值，则无法插入任何行。`commission_pct``.2``NOT``NULL`

另请参阅：

适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`CREATE TABLE`





#### Oracle数据类型(Oracle Data Types)

每列都有一个数据类型，该**数据类型**(data type)与特定的存储格式、约束和有效值范围相关联。值的数据类型将一组固定的属性与值相关联。

这些属性会导致 Oracle 数据库以不同于另一种数据类型的值处理一种数据类型的值。例如，可以将数据类型`NUMBER`的值相乘，但不能乘以数据类型`RAW`的值。

创建表时，必须为其每列指定数据类型。随后插入到列中的每个值都采用列数据类型。

Oracle 数据库提供了多种内置数据类型。最常用的数据类型分为以下几类：

- 字符数据类型(Character Data Types)
- 数值数据类型(Numeric Data Types)
- 日期时间数据类型(Datetime Data Types)
- 行编号数据类型(Rowid Data Types)
- 格式化模型和数据的类型(Format Models and Data Types)

内置类型的其他重要类别包括原始对象(raw)、大型对象 （large objects、LOB） 和集合。PL/SQL 具有常量和变量的数据类型，包括`BOOLEAN`、引用类型、复合类型（记录）和用户定义类型。

##### 字符数据类型(Character Data Types)

字符数据类型将字母数字数据存储在字符串中。最常见的字符数据类型是`VARCHAR2`，这是存储字符数据的最有效选项。

字节值对应于字符 **编码(character encoding)** 方案，通常称为 **字符集(character set)** 。数据库字符集在创建数据库时建立。字符集的示例包括 7位ASCII、EBCDIC 和 Unicode UTF-8。

字符数据类型的长度语义可以用字节或字符来衡量。将字符串视为字节[**序列称为字节语义**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BBEA62B4-5767-40DF-B2D6-BEC1F267B22F)。这是字符数据类型的默认值。将字符串视为字符序列称为[**字符语义**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-46D094F4-88B8-4939-AFBD-971EA3AABBDA)。字符是数据库字符集的代码点。

另请参阅：

- "[字符集](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-57374356-61C4-45B1-8A05-3353FD034202)"
- [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG31000)，简要介绍数据类型
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00302)，了解如何选择字符数据类型





###### VARCHAR2 和 CHAR 数据类型

`VARCHAR2` 数据类型存储可变长度字符文本。**文本**是固定的数据值。

例如，、 和 都是字符文字; 是数字文本。字符文本括在单引号中，以便数据库可以将它们与schema对象名称区分开来。`'LILA'``'St. George Island'``'101'``5001`

注意：本手册交替使用术语*文本*文字、*字符文字*和*字符串*。

创建包含列的表时，请指定最大字符串长度。在[示例 2-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B0DFC5A7-E482-4E17-A6F5-FF476A92DC73__CBBEHJCH) 中，列的数据类型为 ，这意味着列中存储的任何名称最多具有 25 个字节。`VARCHAR2``last_name``VARCHAR2(25)`

对于每一行，Oracle 数据库将列中的每个值存储为可变长度字段，除非值超过最大长度，在这种情况下，数据库将返回错误。例如，在单字节字符集中，如果为行中的列值输入 10 个字符，则行段中的列仅存储 10 个字符（10 个字节），而不是 25 个字符。使用可减少空间消耗。`last_name``VARCHAR2`

与 相反，存储固定长度的字符串。创建包含列的表时，该列需要字符串长度。默认值为 1 字节。数据库使用空格将值填充到指定的长度。`VARCHAR2``CHAR``CHAR`

Oracle 数据库使用非填充比较语义比较值，并使用空白填充的比较语义比较值。`VARCHAR2``CHAR`

另请参阅：

[Oracle 数据库 SQL 语言参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF51040)了解有关空白填充和非填充比较语义的详细信息





###### NCHAR 和 NVARCHAR2 数据类型

`NCHAR` 和 `NVARCHAR2` 数据类型存储 Unicode 字符数据。

**Unicode** 是一种通用编码字符集，可以使用单个字符集以任何语言存储信息。 存储与国家/地区字符集对应的固定长度字符串，而存储可变长度字符串。`NCHAR``NVARCHAR2`

创建数据库时指定国家/地区字符集。和数据类型的字符集必须是 或 。这两个字符集都使用 Unicode 编码。`NCHAR``NVARCHAR2``AL16UTF16``UTF8`

创建具有 or 列的表时，最大大小始终采用字符长度语义。字符长度语义是 or 的默认且唯一的长度语义。`NCHAR``NVARCHAR2``NCHAR``NVARCHAR2`

另请参阅：

[Oracle 数据库全球化支持指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NLSPG0071)了解有关 Oracle 全球化支持功能的信息





##### 数值数据类型

Oracle 数据库数值数据类型存储定点数和浮点数、零和无穷大。某些数值类型还存储作为操作的未定义结果的值，这些值称为“不是数字”或 。`NaN`

Oracle 数据库以可变长度格式存储数字数据。每个值都以科学记数法存储，其中 1 个字节用于存储指数。数据库最多使用 20 个字节来存储尾数，[**尾数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0912AA8C-6F9E-4382-97A3-2B43832BEBE6)是包含其有效数字的浮点数的一部分。Oracle 数据库不存储前导和尾随零。





###### 数字数据类型

数据类型存储定点数和浮点数。数据库可以存储几乎任何数量级的数字。此数据保证在运行 Oracle 数据库的不同操作系统之间可移植。对于必须存储数值数据的大多数情况，建议使用数据类型。`NUMBER``NUMBER`

您可以以 `NUMBER(p,s)` 的形式指定定点数(a fixed-point number)，其中 *`p`* 和 *`s`* 表示以下特征：

- 有效位数(precision)

  P指定总位数。如果未指定精度，则列将完全按照应用程序提供的值存储值，而不进行任何舍入。

- 精度(scale)

  小数位数指定从小数点到最低有效位数的位数。正小数位数对小数点右侧的数字进行计数，直到并包括最低有效数字。负刻度对小数点左侧的数字进行计数，直到（但不包括最低有效数字）。如果指定不带小数位数的精度（如`NUMBER(6)`中所示），则小数位数为 0。

[在示例 2-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B0DFC5A7-E482-4E17-A6F5-FF476A92DC73__CBBEHJCH) 中，列是类型 ，因此精度为 8，小数位数为 2。因此，数据库将 100，000 的薪水存储为 .`salary``NUMBER(8,2)``100000.00`

###### 浮点数

Oracle 数据库为浮点数提供两种专门用于数值的数值数据类型：和 。`BINARY_FLOAT``BINARY_DOUBLE`

这些类型支持数据类型提供的所有基本功能。但是，而使用十进制精度，并使用二进制精度，这样可以实现更快的算术计算，并且通常会降低存储需求。`NUMBER``NUMBER``BINARY_FLOAT``BINARY_DOUBLE`

```
BINARY_FLOAT`并且是近似数值数据类型。它们存储十进制值的近似表示形式，而不是精确表示形式。例如，值 0.1 不能完全由 或 表示。它们经常用于科学计算。它们的行为类似于Java和XMLSchema中的数据类型。`BINARY_DOUBLE``BINARY_DOUBLE``BINARY_FLOAT``FLOAT``DOUBLE
```

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00222)，了解数值类型的精度、小数位数和其他特征





##### 日期时间数据类型

**日期时间**数据类型为 和 。Oracle 数据库为时间戳提供全面的时区支持。`DATE``TIMESTAMP`





###### 日期数据类型

数据类型存储日期和时间。尽管日期时间可以用字符或数字数据类型表示，但具有特殊的关联属性。`DATE``DATE`

数据库在内部将日期存储为数字。日期存储在固定长度的字段中，每个字段 7 个字节，对应于世纪、年、月、日、小时、分钟和秒。

注意：日期完全支持算术运算，因此您可以像使用数字一样对日期进行加减。

数据库根据指定的[**格式模型**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F97AA700-3D17-428F-B9E0-52259D19C037)显示日期。格式模型是描述字符串中日期时间格式的字符文本。标准日期格式为 ，它以 的形式显示日期。`DD-MON-RR``01-JAN-11`

```
RR`类似于（年份的最后两位数），但返回值的世纪根据指定的两位数年份和当前年份的最后两位数字而变化。假设在 1999 年数据库显示 。如果日期格式使用 ，则指定 ，而如果格式使用 ，则指定 。您可以在数据库实例和会话级别更改默认日期格式。`YY``01-JAN-11``RR``11``2011``YY``11``1911
```

Oracle 数据库以 24 小时格式存储时间。如果未输入时间部分，则默认情况下，日期字段中的时间为 。在仅时间条目中，日期部分默认为当前月份的第一天。`HH:MI:SS``00:00:00 A.M`

另请参阅：

- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS182)，了解有关世纪和日期格式掩码的更多信息
- 有关日期时间格式代码的信息的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00212)
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS202)，了解如何使用日期时间数据类型执行算术运算





###### 时间戳数据类型

数据类型是数据类型的扩展。`TIMESTAMP``DATE`

```
TIMESTAMP`除了存储在数据类型中的信息外，还存储秒的小数部分。数据类型对于存储精确的时间值非常有用，例如在必须跟踪事件顺序的应用程序中。`DATE``TIMESTAMP
```

数据类型和是时区感知的。当用户选择数据时，该值将调整为用户会话的时区。此数据类型可用于跨地理区域收集和评估日期信息。`DATETIME``TIMESTAMP WITH TIME ZONE``TIMESTAMP WITH LOCAL TIME ZONE`

另请参阅：

[Oracle 数据库 SQL 语言参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00203)了解有关在时间戳列中创建和输入数据的语法的详细信息





##### 罗维德数据类型

存储在数据库中的每一行都有一个地址。Oracle 数据库使用数据类型来存储数据库中每一行的地址 （rowid）。`ROWID`

Rowids分为以下几类：

- 物理 rowid 将行的地址存储在堆组织的表、表集群以及表和索引分区中。
- 逻辑 rowid 将行的地址存储在按索引组织的表中。
- 外部 rowid 是外部表中的标识符，例如通过网关访问的 DB2 表。它们不是标准的 Oracle 数据库 rowid。

称为[**通用 rowid**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-288B0853-9B77-4A7F-AEE9-8924EA7877A7) 或 urowid 的数据类型支持所有类型的 rowid。





###### 使用行

Oracle 数据库在内部使用 rowid 来构建索引。

[**B 树索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8D6D0C64-6AC8-4B22-A9AF-1B62F61AE10B)是最常见的类型，它包含按范围划分的键的有序列表。每个键都与一个 rowid 相关联，该 rowid 指向关联行的地址以便快速访问。

最终用户和应用程序开发人员还可以将 rowid 用于几个重要功能：

- Rowid 是访问特定行的最快方法。
- Rowid 提供了查看表的组织方式的功能。
- rowid 是给定表中行的唯一标识符。

您还可以创建包含使用数据类型定义的列的表。例如，可以定义一个数据类型为列的异常表，以存储违反完整性约束的行的 rowid。使用数据类型定义的列的行为与其他表列类似：值可以更新，依此类推。`ROWID``ROWID``ROWID`





###### 罗维德伪列

Oracle 数据库中的每个表都有一个名为 的伪列。`ROWID`

伪列的行为类似于表[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-175D4923-5C7E-4FF0-A69B-C4D8F3D93A3D)，但实际上并不存储在表中。可以从伪列中进行选择，但不能插入、更新或删除其值。伪列也类似于没有参数的 SQL [**函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5611828A-3621-4527-AEB1-12017A454E94)。不带参数的函数通常为结果集中的每一行返回相同的值，而伪列通常为每一行返回不同的值。

伪列的值是表示每行地址的字符串。这些字符串的数据类型为 。当通过执行 或 列出表的结构时，此伪列不明显，伪列也不占用空间。但是，可以使用保留字作为列名的 SQL 查询检索每行的 rowid。`ROWID``ROWID``SELECT``DESCRIBE``ROWID`

下面的示例查询伪列以显示雇员 100 的表中行的 rowid：`ROWID``employees`

```
CopySQL> SELECT ROWID FROM employees WHERE employee_id = 100;

ROWID
------------------
AAAPecAAFAAAABSAAA
```

另请参阅：

- "[行格式](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-684E6324-A874-4304-8015-5634199BEE81)"
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00306)，了解如何按地址识别行
- 了解 rowid 类型的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF50998)





##### 设置模型和数据类型的格式

格式**模型**是一种字符文本，用于描述存储在字符串中的日期时间或数字数据的格式。格式模型不会更改数据库中值的内部表示形式。

将字符串转换为日期或数字时，格式模型确定数据库如何解释字符串。在 SQL 中，可以使用格式模型作为 和 函数的参数来格式化要从数据库返回的值或格式化要存储在数据库中的值。`TO_CHAR``TO_DATE`

以下语句选择部门 80 中员工的工资，并使用该函数将这些工资转换为具有数字格式模型指定格式的字符值：`TO_CHAR``'$99,990.99'`

```
CopySQL> SELECT last_name employee, TO_CHAR(salary, '$99,990.99') AS "SALARY"
  2  FROM   employees
  3  WHERE  department_id = 80 AND last_name = 'Russell';
 
EMPLOYEE                  SALARY
------------------------- -----------
Russell                    $14,000.00
```

下面的示例使用带有格式掩码的函数更新雇用日期，以将字符串转换为值：`TO_DATE``'YYYY MM DD'``'1998 05 20'``DATE`

```
CopySQL> UPDATE employees
  2  SET hire_date = TO_DATE('1998 05 20','YYYY MM DD')
  3  WHERE last_name = 'Hunold';
```

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00210)，了解有关格式模型的更多信息





#### 完整性约束

**完整性约束**是限制表中一列或多列的值的命名规则。

数据完整性规则可防止将无效数据输入到表中。此外，当存在某些依赖项时，约束可以防止删除表。

如果启用了约束，则数据库会在输入或更新数据时检查数据。Oracle 数据库可防止输入不符合约束的数据。如果禁用了约束，则 Oracle 数据库允许不符合约束的数据进入数据库。

在[示例 2-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B0DFC5A7-E482-4E17-A6F5-FF476A92DC73__CBBEHJCH) 中，该语句指定了 、 、 和 列的约束。约束子句标识约束的列和条件。这些约束可确保指定的列不包含空值。例如，尝试插入没有作业 ID 的新员工会生成错误。`CREATE TABLE``NOT NULL``last_name``email``hire_date``job_id`

您可以在创建表时或之后创建约束。如果需要，可以暂时禁用约束。数据库将约束存储在[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)中。

另请参阅：

- “[数据](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-6A89FF39-AD42-4399-BD1B-E51ECEE50B4E)完整性”，了解完整性约束
- “数据字典概述”以了解[数据字典](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-9B9ABE1C-A1E3-464F-8936-978250DC3E1F)
- 了解 SQL 约束子句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52180)





#### 表存储

Oracle 数据库使用表空间中的数据**段**来保存表数据。

段包含由数据块组成的盘区。表的数据段（或表集群的[**集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)数据段）位于表所有者的默认表空间或语句中指定的表空间中。`CREATE TABLE`

另请参阅：

“[用户](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-EFB292CB-87EA-42AA-808C-BD85E540BACC)细分”，了解细分的类型及其创建方式





##### 表组织

默认情况下，表被组织为堆，这意味着数据库将行放置在最适合的位置，而不是按用户指定的顺序放置。因此，堆组织的表是行的无序集合。

注：按索引组织的表使用不同的组织原则。

当用户添加行时，数据库会将行放在数据段中的第一个可用空间中。不保证按插入行的顺序检索行。

该表是堆组织的表。它具有部门 ID、姓名、经理 ID 和位置 ID 的列。插入行时，数据库会将它们存储在适合的任何位置。表段中的数据块可能包含以下示例中显示的无序行：`hr.departments`

```
Copy50,Shipping,121,1500
120,Treasury,,1700
70,Public Relations,204,2700
30,Purchasing,114,1700
130,Corporate Tax,,1700
10,Administration,200,1700
110,Accounting,205,1700
```

表中所有行的列顺序相同。数据库通常按照列在语句中列出的顺序存储列，但不能保证此顺序。例如，如果表具有 类型的列，则 Oracle 数据库始终将此列存储在行的最后。此外，如果向表中添加新列，则新列将成为存储的最后一列。`CREATE TABLE``LONG`

表可以包含虚拟列，与普通列不同，[**虚拟列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E95FC6AD-C932-4DE2-9D7B-B98D1168E7DA)不占用磁盘空间。数据库通过计算一组用户指定的表达式或函数来按需派生虚拟列中的值。您可以为虚拟列编制索引，收集有关它们的统计信息，并创建完整性约束。因此，虚拟列与非虚拟列非常相似。

另请参阅：

- "[按索引组织的表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DAEC075B-C16D-4A57-898C-70EBCB364F0C)"
- 了解虚拟列的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54465)





##### 行存储

数据库将行存储在数据块中。包含少于 256 列的数据的表的每一行都包含在一个或多个行段中。

如果可能，Oracle 数据库会将每一行存储为一个[**行段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4C16E45D-79AF-40D5-ACE2-CE2B301CA97B)。但是，如果无法将所有行数据插入到单个数据块中，或者对现有行的更新导致行超出其数据块，则数据库将使用多个行段存储该行。

表集群中的行包含与非聚集表中的行相同的信息。此外，表集群中的行包含引用它们所属的集群键的信息。

另请参阅：

“数据块格式”，了解[数据块](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-754ECC03-DD58-4B49-95D1-B98A23B508B2)的组成部分





##### 行块的行

**rowid** 实际上是行的 10 字节物理地址。

堆组织的表中的每一行都有一个对此表唯一的 rowid，该 rowid 对应于行段的物理地址。对于表集群，同一数据块中不同表中的行可以具有相同的 rowid。

Oracle 数据库在内部使用 rowid 来构建索引。例如，[**B 树索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8D6D0C64-6AC8-4B22-A9AF-1B62F61AE10B)中的每个键都与指向关联行地址的 rowid 相关联，以便快速访问。物理 rowid 提供对表行的最快访问，使数据库能够在短短的单个 I/O 中检索行。

另请参阅：

- “[Rowid Format”了解 rowid](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-684E6324-A874-4304-8015-5634199BEE81) 的结构
- “B[树索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-FC93A85B-C237-4249-AD1E-FF54576ED050)”，了解B树索引的类型和结构





##### 空值的存储

**空**值是列中没有值。空值表示缺失、未知或不适用的数据。

如果 null 位于具有数据值的列之间，则会存储在数据库中。在这些情况下，它们需要 1 个字节来存储列的长度（零）。行中的尾随 null 不需要存储，因为新的行标题表示前一行中的其余列为 null。例如，如果表的最后三列为 null，则不会为这些列存储任何数据。

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30037)，了解有关空值的更多信息





#### 表压缩

数据库可以使用表压缩来减少**表**所需的存储量。

压缩可节省磁盘空间，减少数据库缓冲区缓存中的内存使用量，并在某些情况下加快查询执行速度。表压缩对数据库应用程序是透明的。





##### 基本表压缩和高级行压缩

基于字典的表压缩为堆组织的表提供了良好的压缩率。

Oracle 数据库支持以下类型的基于字典的表压缩：

- 基本表压缩

  这种类型的压缩适用于大容量加载操作。数据库不压缩使用常规 DML 修改的数据。必须使用[**直接路径 INSERT**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-73D6FDFE-E38D-49F2-A5A5-B6BDB2FD297C) 操作、操作或联机表重定义来实现基本的表压缩。`ALTER TABLE . . . MOVE`

- 高级行压缩

  这种类型的压缩适用于 OLTP 应用程序，并压缩由任何 SQL 操作操作的数据。数据库实现了具有竞争力的压缩率，同时使应用程序能够在与未压缩表上的 DML 大致相同的时间内执行 DML。

对于上述压缩类型，数据库以[**行主格式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68A36A9F-BD3E-4245-909F-D68B3D056352)存储压缩的行。一行的所有列存储在一起，后跟下一行的所有列，依此类推。数据库将重复值替换为对存储在块开头的符号表的简短引用。因此，数据库重新创建未压缩数据所需的信息存储在数据块本身中。

压缩数据块看起来很像普通数据块。大多数适用于常规数据块的数据库特性和功能也适用于压缩块。

您可以在表空间、表、分区或子分区级别声明压缩。如果在表空间级别指定，则默认情况下将压缩在表空间中创建的所有表。

示例 2-4 表级压缩

以下语句对表应用高级行压缩：`orders`

```
CopyALTER TABLE oe.orders ROW STORE COMPRESS ADVANCED;
```

示例 2-5 分区级压缩

以下分部语句示例为一个分区指定高级行压缩，为另一个分区指定基本表压缩：`CREATE TABLE`

```
CopyCREATE TABLE sales (
    prod_id     NUMBER     NOT NULL,
    cust_id     NUMBER     NOT NULL, ... )
 PCTFREE 5 NOLOGGING NOCOMPRESS
 PARTITION BY RANGE (time_id)
 ( partition sales_2013 VALUES LESS THAN(TO_DATE(...)) ROW STORE COMPRESS BASIC,
   partition sales_2014 VALUES LESS THAN (MAXVALUE) ROW STORE COMPRESS ADVANCED );
```

另请参阅：

- “行[格式](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-D993A749-93D0-448C-BDC8-330D805AC481)”，了解如何在行中存储值
- “数据块压缩”了解[压缩数据块](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-B248DC2A-3F65-42CF-ACA5-0B096CFCFC46)的格式
- “[SQL*](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-A6BF29E2-70E6-46F8-8BF9-E321113A3670)Loader”，了解如何使用 SQL*Loader 进行直接路径加载
- 《Oracle 数据库管理员指南》和[《Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA94151)》，了解表压缩





##### 混合柱式压缩

使用混合列压缩时，数据库将一组行的同一列存储在一起。数据块不以行主格式存储数据，而是使用行方法和列式方法的组合。

将具有相同数据类型和相似特征的列数据存储在一起，可显著增加压缩带来的存储节省。数据库压缩由任何 SQL 操作操作的数据，尽管直接路径加载的压缩级别更高。数据库操作对压缩对象透明地工作，因此不需要更改应用程序。

注意：混合列压缩和内存中列存储（IM 列存储）密切相关。主要区别在于混合列压缩优化磁盘存储，而 IM 列存储优化内存存储。

另请参阅：

“[内存中区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-80C1C6A3-3E48-4868-ACA1-370C4D341209)”，了解有关 IM 列存储的详细信息





###### 混合柱式压缩的类型

如果基础存储支持混合列式压缩，则可以根据需要指定不同类型的压缩。

压缩选项包括：

- 仓库压缩

  这种类型的压缩经过优化以节省存储空间，适用于数据仓库应用程序。

- 存档压缩

  这种类型的压缩针对最大压缩级别进行了优化，适用于历史数据和不变的数据。

混合列式压缩针对 Oracle Exadata 存储上的数据仓库和决策支持应用进行了优化。Oracle Exadata 利用 Oracle Exadata 存储服务器不可或缺的处理能力、内存和 Infiniband 网络带宽，最大限度地提高了使用混合列式压缩压缩的表的查询性能。

其他 Oracle 存储系统支持混合列式压缩，并可节省与 Oracle Exadata 存储相同的空间，但无法提供相同级别的查询性能。对于这些存储系统，混合列式压缩非常适合对不经常访问的旧数据进行数据库内存档。





###### 压缩单元

混合列式压缩使用称为**压缩单元**的逻辑构造来存储一组行。

将数据加载到表中时，数据库以列格式存储行组，并将每列的值存储在一起并压缩在一起。数据库压缩一组行的列数据后，数据库会将数据放入压缩单元中。

例如，将混合列式压缩应用于表。在每天结束时，您用物料和销售数量填充表，物料 ID 和日期形成复合主键。下表显示了 中行的子集。`daily_sales``daily_sales`

表2-2 示例表daily_sales

| Item_ID | 日期       | Num_Sold | Shipped_From | 进货 |
| :------ | :--------- | :------- | :----------- | :--- |
| 1000    | 01-六月-18 | 2        | 仓库1        | Y    |
| 1001    | 01-六月-18 | 0        | 仓库3        | N    |
| 1002    | 01-六月-18 | 1        | 仓库3        | N    |
| 1003    | 01-六月-14 | 0        | 仓库2        | N    |
| 1004    | 01-六月-18 | 2        | 仓库1        | N    |
| 1005    | 01-六月-18 | 1        | 仓库2        | N    |

假定此行子集存储在一个压缩单元中。混合列压缩将每列的值存储在一起，然后使用多种算法压缩每列。数据库根据各种因素选择算法，包括列的数据类型、列中实际值的基数以及用户选择的压缩级别。

如下图所示，每个压缩单元可以跨越多个数据块。特定列的值可能会也可能不会跨越多个块。

图 2-4 压缩单元

![Description of Figure 2-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/sagug004.gif)
[“图 2-4 压缩单元”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/sagug004.html)

如果混合列式压缩不会节省空间，则数据库将以该格式存储数据。在这种情况下，数据库将 OLTP 压缩应用于驻留在混合列压缩段中的块。`DBMS_COMPRESSION.COMP_BLOCK`

另请参阅：

- "[行锁 （TX）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-92D38952-A7A0-486F-9547-BDB6E624F125)"
- [Oracle 数据库许可信息用户手册](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBLIC2152)，了解混合列式压缩的许可要求
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13948)了解如何使用混合列式压缩
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`CREATE TABLE`
- [Oracle 数据库 PL/SQL 包和类型参考以了解该包](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS236)`DBMS_COMPRESSION`



###### DML 和混合柱式压缩

混合列压缩对不同类型的 DML 操作中的行锁定有影响。

直接路径载荷和传统刀片

将数据加载到使用混合列式压缩的表中时，可以使用常规插入或直接路径加载。直接路径加载锁定整个表，从而降低并发性。

Oracle数据库 12c版本 2 （12.2） 在混合列式压缩格式中添加了对传统阵列插入的支持。传统阵列插件的优点是：

- 插入的行使用行级锁，这会增加并发性。
- 自动数据优化 （ADO） 和热图支持行级别策略的混合列压缩。因此，数据库可以对符合条件的块使用混合列压缩，即使段的其他部分发生 DML 活动也是如此。

当应用程序使用常规数组插入时，Oracle 数据库会在满足以下条件时以压缩单元存储行：

- 该表存储在 ASSM 表空间中。
- 兼容级别为 12.2.0.1 或更高版本。
- 表定义满足现有的混合列压缩表约束，包括没有类型的列，也没有行依赖项。`LONG`

传统插入会生成重做和撤消。因此，由常规 DML 语句创建的压缩单元将与 DML 一起回滚或提交。数据库会自动执行索引维护，就像存储传统数据块中的行一样。

更新和删除

默认情况下，如果对压缩单元中的任何行应用了更新或删除，数据库将锁定压缩单元中的所有行。若要避免此问题，可以选择为表启用行级锁定。在这种情况下，数据库仅锁定受更新或删除操作影响的行。

另请参阅：

- "[自动分段空间管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-4AF2D61A-8675-4D48-97A4-B20F401ADA16)"
- "[行锁 （TX）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-92D38952-A7A0-486F-9547-BDB6E624F125)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13494)了解如何执行常规插入
- 了解该语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01604)`INSERT`





### 表集群概述

表**集群**是一组共享公共列并将相关数据存储在同一块中的表。

当表聚集时，单个数据块可以包含来自多个表的行。例如，块可以存储 和 表中的行，而不是仅存储单个表中的行。`employees``departments`

群集[**键是群集**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0721296C-D83A-4EA4-80F2-44AC3F1E9112)表共有的一个或多个列。例如，和 表共享列。您可以在创建表集群以及创建添加到表集群的每个表时指定集群键。`employees``departments``department_id`

集群键值是一组特定行的集群键列的值。包含相同集群键值的所有数据（如 ）在物理上存储在一起。每个集群键值在集群和集群索引中只存储一次，无论不同表包含该值的多少行。`department_id=20`

打个比方，假设人力资源经理有两个书柜：一个装有员工文件夹框，另一个装有部门文件夹框。用户经常要求特定部门中所有员工的文件夹。为了便于检索，经理将所有盒子重新排列在一个书柜中。她按部门 ID 划分框。因此，部门 20 中员工的所有文件夹和部门 20 本身的文件夹都在一个框中;部门 100 中员工的文件夹和部门 100 的文件夹位于另一个框中，依此类推。

当主要查询（但未修改）表并且经常一起查询或联接表中的记录时，请考虑对聚类分析表。由于表集群将不同表的相关行存储在相同的数据块中，因此正确使用的表集群与非聚集表相比具有以下优点：

- 群集表联接的磁盘 I/O 减少。
- 改进了聚集表联接的访问时间。
- 存储相关表和索引数据所需的存储空间较少，因为不会为每一行重复存储集群键值。

通常，群集表不适用于以下情况：

- 这些表经常更新。
- 这些表经常需要[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)。
- 表需要截断。



#### 索引群集概述

索引集群是使用索引来定位数据的表**集群**。集群**索引是集群**键上的 B 树索引。必须先创建聚类索引，然后才能将任何行插入到聚簇表中。

例 2-6 创建表集群和关联索引

假设您使用集群键创建集群，如以下示例所示：`employees_departments_cluster``department_id`

```
CopyCREATE CLUSTER employees_departments_cluster
   (department_id NUMBER(4))
SIZE 512;

CREATE INDEX idx_emp_dept_cluster 
   ON CLUSTER employees_departments_cluster;
```

因为未指定子句，所以是索引群集。前面的示例创建一个以群集键命名的索引。`HASHKEYS``employees_departments_cluster``idx_emp_dept_cluster``department_id`

示例 2-7 在索引集群中创建表

您可以在集群中创建 and 表，将列指定为集群键，如下所示（省略号标记列规范所在的位置）：`employees``departments``department_id`

```
CopyCREATE TABLE employees ( ... )
   CLUSTER employees_departments_cluster (department_id);
 
CREATE TABLE departments ( ... )
   CLUSTER employees_departments_cluster (department_id);
```

假定您将行添加到 和 表中。数据库将 和 中每个部门的所有行物理存储在相同的数据块中。数据库将行存储在堆中，并使用索引查找它们。`employees``departments``employees``departments`

[图 2-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-CC31365B-83B0-4E09-A047-BF1B79AC887A__I30164) 显示了表群集，其中包含 和 。数据库将部门 20 中的员工的行存储在一起，部门 110 中的员工一起存储行，依此类推。如果表未聚集在一起，则数据库无法确保将相关行存储在一起。`employees_departments_cluster``employees``departments`

图 2-5 聚集表数据

![Description of Figure 2-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt023.gif)
[“图 2-5 聚集表数据”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt023.html)

B 树集群索引将集群键值与包含数据的块的数据库块地址 （DBA） 相关联。例如，键 20 的索引条目显示包含部门 20 中员工数据的块的地址：

```
Copy20,AADAAAA9d
```

集群索引是单独管理的，就像非集群表上的索引一样，并且可以存在于与表集群不同的表空间中。

另请参阅：

- "[索引简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DE7A95BC-6E4A-47EA-9FC5-B85B54F8CF41)"
- Oracle [数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN018)了解如何创建和管理索引集群
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01201)`CREATE CLUSTER`





#### 哈希集群概述

哈希集群类似于索引**集群**，只是索引键被替换为**哈希函数**。不存在单独的群集索引。在哈希群集中，数据是索引。

对于索引表或索引群集，Oracle 数据库使用存储在单独索引中的键值来查找表行。若要在索引表或表集群中查找或存储行，数据库必须至少执行两个 I/O：

- 一个或多个 I/O，用于在索引中查找或存储键值
- 另一个 I/O 用于读取或写入表或表簇中的行

要在哈希群集中查找或存储行，Oracle 数据库会将哈希函数应用于行的群集键值。生成的哈希值对应于集群中的数据块，数据库代表发出的语句读取或写入该数据块。

哈希是存储表数据以提高数据检索性能的一种可选方法。当满足以下条件时，哈希集群可能是有益的：

- 查询表的频率远高于修改表的频率。
- 经常使用相等条件查询哈希键列，例如 。对于此类查询，将对集群键值进行哈希处理。哈希键值直接指向存储行的磁盘区域。`WHERE department_id=20`
- 您可以合理地猜测哈希键的数量以及每个键值存储的数据大小。





##### 哈希集群创建

要创建哈希集群，请使用与索引集群相同的语句，但添加了哈希键。群集的哈希值数取决于哈希键。`CREATE CLUSTER`

集群键与索引集群的键一样，是由集群中的表共享的单列键或组合键。哈希键值是插入到群集键列中的实际值或可能[**值**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C3BAC9AD-DE26-4C9F-B27E-B45D2401B230)。例如，如果群集键为 ，则哈希键值可以是 10、20、30 等。`department_id`

Oracle 数据库使用哈希函数，该函数接受无限数量的哈希键值作为输入，并将它们排序到有限数量的存储桶中。每个存储桶都有一个唯一的数字 ID，称为[**哈希值**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-385E8505-A9C0-488E-9BC8-5DEEF23C0CD2)。每个哈希值映射到存储与哈希键值对应的行的块的数据库块地址（部门 10、20、30 等）。

在以下示例中，可能存在的部门数为 100，因此设置为 ：`HASHKEYS``100`

```
CopyCREATE CLUSTER employees_departments_cluster
   (department_id NUMBER(4))
SIZE 8192 HASHKEYS 100;
```

创建 后，您可以在集群中创建 和 表。然后，可以将数据加载到哈希群集中，就像在索引群集中一样。`employees_departments_cluster``employees``departments`

另请参阅：

- "[索引群集概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-CC31365B-83B0-4E09-A047-BF1B79AC887A)"
- Oracle [数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN019)了解如何创建和管理哈希集群





##### 哈希群集查询

在哈希集群的查询中，数据库确定如何对用户输入的键值进行哈希处理。

例如，用户经常执行如下查询，为：`p_id`

```
CopySELECT *
FROM   employees
WHERE  department_id = :p_id;
 
SELECT * 
FROM   departments 
WHERE  department_id = :p_id;

SELECT * 
FROM   employees e, departments d 
WHERE  e.department_id = d.department_id
AND    d.department_id = :p_id;
```

如果用户在 中查询员工，则数据库可能会将此值哈希为存储桶 77。如果用户在 = 中查询员工，则数据库可能会将此值哈希为存储桶 15。数据库使用内部生成的哈希值来查找包含所请求部门的员工行的块。`department_id``=20``department_id``10`

下图将哈希集群段描述为块的水平行。如图所示，查询可以在单个 I/O 中检索数据。

图 2-6 从哈希群集中检索数据

![Description of Figure 2-6 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt329.gif)
[“图 2-6 从哈希群集检索数据”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt329.html)

哈希群集的限制是对非索引群集键进行范围扫描不可用。假设在哈希集群创建中创建的哈希[集群](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-391EC9EF-A34A-4A49-A9E4-9BF5B7324E9E)不存在单独的索引。对 ID 介于 20 和 100 之间的部门的查询无法使用哈希算法，因为它无法对 20 到 100 之间的每个可能值进行哈希处理。由于不存在索引，因此数据库必须执行完全扫描。

另请参阅：

"[索引范围扫描](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-E1BD4FBF-8A6D-4EF8-8892-7B1CBFA9D5C6)"





##### 哈希集群变体

单表哈希集群是哈希集群的优化版本，一次仅支持一个表。哈希键和行之间存在一对一映射。

当用户需要按主键快速访问表时，单表哈希群集可能非常有用。例如，用户经常按 在表中查找员工记录。`employees``employee_id`

排序哈希群集存储与哈希函数的每个值对应的行，以便数据库可以按[**排序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AFC062EE-E4F1-4B7A-ADBA-02AB939B21E6)顺序有效地返回它们。数据库在内部执行优化排序。对于始终按排序顺序使用数据的应用程序，此技术可能意味着更快地检索数据。例如，应用程序可能始终对表的列进行排序。`order_date``orders`

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01901)了解如何创建单表和排序哈希集群





##### 哈希群集存储

Oracle 数据库为哈希集群分配的空间与索引集群不同。

在[哈希群集创建](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-391EC9EF-A34A-4A49-A9E4-9BF5B7324E9E)示例中，指定可能存在的部门数，而指定与每个部门关联的数据的大小。数据库根据以下公式计算存储空间值：`HASHKEYS``SIZE`

```
CopyHASHKEYS * SIZE / database_block_size
```

因此，如果在[哈希集群创建](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-391EC9EF-A34A-4A49-A9E4-9BF5B7324E9E)中显示的示例中块大小为 4096 字节，则数据库至少向哈希集群分配 200 个块。

Oracle 数据库不限制可以插入群集的哈希键值的数量。例如，即使 是 ，也没有什么能阻止您在表中插入 200 个唯一的部门。但是，当哈希值的数量超过哈希键的数量时，哈希集群检索的效率会降低。`HASHKEYS``100``departments`

为了说明检索问题，假设[图 100-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-86E4A2CB-430D-49D0-933B-59292797A397__CBBGGEGH) 中的块 6 完全填满了部门 20 的行。用户在表中插入一个包含 43 的新部门。部门数量超过该值，因此数据库哈希值 43 到哈希值 77，这与用于 20 的哈希值相同。将多个输入值哈希为同一输出值称为[**哈希冲突**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2B7DCF40-8C20-439C-8DFD-E8F3EDE8B8FF)。`department_id``departments``HASHKEYS``department_id``department_id`

当用户将行插入部门 43 的群集时，数据库无法将这些行存储在已满的块 100 中。数据库将块 100 链接到新的溢出块（例如块 200），并将插入的行存储在新块中。块 100 和 200 现在都有资格存储任一部门的数据。如图 [2-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-793CA829-2827-4F95-BE23-600B0E955DFF__CIHFHBFE) 所示，部门 20 或 43 的查询现在需要*两个* I/O 来检索数据：块 100 及其关联的块 200。您可以通过重新创建具有不同值的集群来解决此问题。`HASHKEYS`

图 2-7 发生哈希冲突时从哈希群集检索数据

![Description of Figure 2-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt331.gif)
[“发生哈希冲突时图 2-7 从哈希群集检索数据”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt331.html)

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11762)了解如何管理哈希集群中的空间





### 属性集群表概述

属性群集表是一个堆组织的表，它根据用户指定的**群集**指令将数据存储在磁盘上。这些指令指定单个或多个表中的列。

指令如下：

- 该指令根据指定的列对表中的数据进行排序。`CLUSTERING ... BY LINEAR ORDER`

  当查询限定聚类分析子句中指定的列的前缀时，请考虑使用聚类分析，这是默认设置。例如，如果 的查询经常指定客户 ID 或同时指定客户 ID 和产品 ID，则可以使用线性列顺序 、 对表中的数据进行聚类。`BY LINEAR ORDER``sh.sales``cust_id``prod_id`

- 该指令使用类似于 Z 顺序函数的特殊算法对一个或多个表中的数据进行排序，该算法允许多列 I/O 减少。`CLUSTERING ... BY INTERLEAVED ORDER`

  当查询指定各种列组合时，请考虑使用聚类分析。例如，如果查询以不同的顺序指定不同的维度，则可以根据这些维度中的列对表中的数据进行聚类。`BY INTERLEAVED ORDER``sh.sales``sales`

属性聚类分析仅适用于[**直接路径 INSERT**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-73D6FDFE-E38D-49F2-A5A5-B6BDB2FD297C) 操作。对于常规 DML，它被忽略。

本节包含以下主题：

- [属性集群表的优点](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-F11E6356-4A48-4A4C-BAFF-3A558F839701)
- [连接属性聚集表](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B775275F-E1FE-48DA-81B4-351F3C00E3A3)
- [使用区域减少 I/O](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-F42B7024-3C45-4424-8098-E96F68ACF679)
- [具有线性排序的属性聚集表](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B62B0C6C-5D0B-4529-BD63-79FE6F18AA81)
- [具有交错排序的属性聚集表](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-F07E2574-9DC6-45E0-8EEA-C8196406505B)





#### 属性集群表的优点

属性集群表的主要优点是减少了 I/O，这可以显著降低表扫描的 I/O 开销和 CPU 开销。I/O 减少可以与区域一起发生，也可以通过磁盘上更紧密的物理接近来减少物理 I/O 来减少群集值。

属性群集表具有以下优点：

- 您可以根据星型schema中的维度列对事实数据表进行聚类。

  在星型schema中，大多数查询限定维度表而不是事实数据表，因此按事实数据表列进行聚类分析无效。Oracle 数据库支持对维度表中的列进行聚类分析。

- I/O 减少可能发生在几种不同的情况下：

  - 与 Oracle Exadata Storage Indexes、Oracle 内存中最小/最大修剪或区域映射一起使用时
  - 在 OLTP 应用程序中，用于限定前缀并使用线性顺序属性聚类分析的查询
  - 在用于聚类分析的聚类分析列的子集上`BY INTERLEAVED ORDER`

- 属性聚类可以改进数据压缩，并通过这种方式间接提高表扫描成本。

  当磁盘上相同的值彼此接近时，数据库可以更轻松地压缩它们。

- Oracle 数据库不会产生索引的存储和维护成本。

另请参阅：

[Oracle 数据库数据仓库指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8919)了解属性群集表的更多优势





#### 连接属性聚集表

基于联接列的属性聚类分析称为**联接属性聚类分析**。与表聚类相比，联接属性聚类表不会将一组表的数据存储在同一数据库块中。

例如，考虑一个属性聚集表 ，与维度表联接。该表仅包含表中的行，但行的顺序基于从表联接的列的值。在数据移动、直接路径插入和操作期间执行相应的联接。相反，如果 和 位于标准表集群中，则数据块将包含两个表中的行。`sales``products``sales``sales``products``CREATE TABLE AS SELECT``sales``products`

另请参阅：

[*Oracle 数据库数据仓库指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8917)，了解有关联接属性聚类的更多信息





#### 使用区域减少 I/O

**区域**是一组连续的数据块，用于存储相关列的最小值和最大值。

当 SQL 语句包含存储在区域中的列的谓词时，数据库会将谓词值与区域中存储的最小值和最大值进行比较。这样，数据库就可以确定在 SQL 执行期间要读取哪些区域。

I/O 减少是指跳过不包含数据库满足查询所需的数据的表或索引块的能力。这种减少可以显著降低表扫描的 I/O 和 CPU 开销。





##### 区域地图

区域**映射**是一种独立的访问结构，用于将数据块划分为区域。Oracle 数据库将每个区域映射实现为一种**物化视图**。

每当在表上指定时，数据库都会在指定的聚类列上自动创建区域映射。区域映射将列的最小值和最大值与属性群集表中的连续数据块相关联。属性聚集表使用区域映射来执行 I/O 减少。`CLUSTERING`

您可以创建不使用区域映射的属性集群表。您还可以创建没有属性集群表的区域映射。例如，您可以在行自然排序在一组列上的表上创建区域映射，例如交易按时间排序的股票交易表。执行 DDL 语句来创建、删除和维护区域映射。

另请参阅：

- "[实例化视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-2822B62B-CAF3-4DCE-B4D6-5E677FB8A829)"
- [Oracle 数据库数据仓库指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8935)了解有关区域映射的更多信息





##### 区域的目的

对于区域的松散类比，请考虑使用鸽子孔书柜的销售经理，这类似于数据块。

每个鸽子洞都有收据（行），描述出售给客户的衬衫，按发货日期排序。在这个类比中，区域地图就像一堆索引卡。每张牌对应一个鸽洞“区域”（连续范围），例如鸽洞1-10。对于每个区域，该卡列出了存储在该区域的收据的最短和最长发货日期。

当有人想知道哪些衬衫在特定日期发货时，经理会翻转卡片，直到她来到包含请求日期的日期范围，记下鸽子洞区域，然后只在此区域中搜索请求的收据。通过这种方式，经理避免了在书柜的每个鸽子孔中搜索收据。





##### 区域映射的工作原理：示例

此示例说明区域映射如何修剪其谓词包含常量的查询中的数据。

假设您创建下表：`lineitem`

```
CopyCREATE TABLE lineitem 
  ( orderkey      NUMBER        , 
    shipdate      DATE          ,
    receiptdate   DATE          ,
    destination   VARCHAR2(50)  ,
    quantity      NUMBER        );
```

该表包含 4 个数据块，每个块 2 行。[表 2-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-768037FC-1946-47A1-B35B-286A9C91A19D__CIHJIJIG) 显示了表格的 8 行。`lineitem`

表 2-3 行项目表的数据块

| 块   | 订单键 | 发货日期  | 收货日期  | 目的地    | 数量 |
| :--- | :----- | :-------- | :-------- | :-------- | :--- |
| 1    | 1      | 1-1-2014  | 1-10-2014 | San_Fran  | 100  |
| 1    | 2      | 1-2-2014  | 1-10-2014 | San_Fran  | 200  |
| 2    | 3      | 1-3-2014  | 1-9-2014  | San_Fran  | 100  |
| 2    | 4      | 1-5-2014  | 1-10-2014 | San_Diego | 100  |
| 3    | 5      | 1-10-2014 | 1-15-2014 | San_Fran  | 100  |
| 3    | 6      | 1-12-2014 | 1-16-2014 | San_Fran  | 200  |
| 4    | 7      | 1-13-2014 | 1-20-2014 | San_Fran  | 100  |
| 4    | 8      | 1-15-2014 | 1-30-2014 | San_Jose  | 100  |

可以使用该语句在表上创建区域映射。每个区域包含 2 个块，并存储 、 和列的最小值和最大值。[表 2-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-768037FC-1946-47A1-B35B-286A9C91A19D__CIHHDJJB) 显示了区域映射。`CREATE MATERIALIZED ZONEMAP``lineitem``orderkey``shipdate``receiptdate`

表 2-4 行项目表的区域映射

| 区块范围 | 最小订单密钥 | 最大订单键 | 最小发货日期 | 最长发货日期 | 最小收货日期 | 最长收货日期 |
| :------- | :----------- | :--------- | :----------- | :----------- | :----------- | :----------- |
| 1-2      | 1            | 4          | 1-1-2014     | 1-5-2014     | 1-9-2014     | 1-10-2014    |
| 3-4      | 5            | 8          | 1-10-2014    | 1-15-2014    | 1-15-2014    | 1-30-2014    |

执行以下查询时，数据库可以读取区域映射，然后仅扫描块 1 和块 2，因此跳过块 3 和 4，因为日期介于最小日期和最大日期之间：`1-3-2014`

```
CopySELECT * FROM lineitem WHERE shipdate = '1-3-2014';
```

另请参阅：

- [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8935)，了解如何使用区域映射
- 语句语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`CREATE MATERIALIZED ZONEMAP`





#### 具有线性排序的属性聚集表

表的线性排序方案根据用户指定的属性按特定顺序将行划分为多个区域。Oracle 数据库支持对通过主外键关系连接的单个或多个表进行线性排序。

例如，该表将 和 列划分为多个区域，然后将这些范围聚集在磁盘上。为表指定指令时，当谓词指定前缀列或指令中的所有列时，可能会发生显著的 I/O 减少。`sales``cust_id``prod_id``BY LINEAR ORDER`

假设 的查询通常指定客户 ID 或客户 ID 和产品 ID 的组合。您可以创建属性群集表，以便此类查询受益于 I/O 减少：`sales`

```
CopyCREATE TABLE sales
(
   prod_id     NOT NULL NUMBER
,  cust_id     NOT NULL NUMBER
,  amount_sold NUMBER(10,2) ...
)
CLUSTERING 
  BY LINEAR ORDER (cust_id, prod_id)
  YES ON LOAD YES ON DATA MOVEMENT
  WITH MATERIALIZED ZONEMAP;
```

同时限定列和 或前缀的查询会遇到 I/O 减少。仅符合条件的查询不会经历显著的 I/O 减少，因为 是子句的后缀。以下示例显示数据库如何在表扫描期间减少 I/O。`cust_id``prod_id``cust_id``prod_id``prod_id``BY LINEAR ORDER`

示例 2-8 仅指定cust_id

应用程序发出以下查询：

```
CopySELECT * FROM sales WHERE cust_id = 100;
```

因为表是集群，所以数据库只能读取包含 值的区域。`sales``BY LINEAR ORDER``cust_id``100`

示例 2-9 指定prod_id和cust_id

应用程序发出以下查询：

```
CopySELECT * FROM sales WHERE cust_id = 100 AND prod_id = 2300;
```

由于表是集群，因此数据库只能读取包含 和 值的区域。`sales``BY LINEAR ORDER``cust_id``100``prod_id``2300`

另请参阅：

- [*Oracle 数据库数据仓库指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8923)，了解如何使用线性排序对表进行群集
- 有关子句语法和语义的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`BY LINEAR ORDER`





#### 具有交错排序的属性聚集表

交错排序使用类似于 *Z 顺序*的技术。

交错排序使数据库能够基于聚类分析列中的任何谓词子集修剪 I/O。交错排序对于数据仓库中的维度层次结构非常有用。

与具有线性排序的属性群集表一样，Oracle 数据库支持对通过主外键关系连接的单个或多个表进行交错排序。属性聚集表以外的表中的列必须通过外键链接并联接到属性聚集表。

大型数据仓库经常在[**星型schema**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2634049A-9DD8-4D5A-89BD-A6B72EF2C169)中组织数据。[**维度**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3089C278-6C49-4110-A10C-A95586E5868F)表使用父子层次结构，并通过[**外键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EEE8A67D-6B0E-468E-9554-48FEE552BC9A)连接到[**事实数据表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B6DD258C-FFA5-4CDC-B5FB-98B3B9F20F99)。通过按交错顺序对事实数据表进行聚类，数据库可以使用特殊函数在表扫描期间跳过维度列中的值。

示例 2-10 交错排序示例

假设数据仓库包含一个事实数据表及其二维表：和 。大多数查询在表层次结构和产品层次结构上都有谓词。您可以对表使用交错排序，如以下示例中的 partial 语句所示：`sales``customers``products``customers``(cust_state_province, cust_city)``(prod_category, prod_subcategory)``sales`

```
CopyCREATE TABLE sales
(
   prod_id NUMBER NOT NULL
,  cust_id NUMBER NOT NULL
,  amount_sold NUMBER(10,2) ...
)
CLUSTERING sales
   JOIN products ON (sales.prod_id = products.prod_id)
   JOIN customers ON (sales.cust_id = customers.cust_id)
   BY INTERLEAVED ORDER
   (
     (  products.prod_category
     ,  products.prod_subcategory
     ),
     (  customers.cust_state_province
     ,  customers.cust_city
     )
   )
WITH MATERIALIZED ZONEMAP;
```

注：`BY INTERLEAVED ORDER` 子句中指定的列不必位于实际维度表中，但它们必须通过主-外键关系进行连接。

假设应用程序查询联接中的 、 和表。查询指定谓词中的 和 列，如下所示：`sales``products``customers``customers.prod_category``customers_cust_state_province`

```
CopySELECT cust_city, prod_sub_category, SUM(amount_sold)
FROM   sales, products, customers
WHERE  sales.prod_id = products.prod_id 
AND    sales.cust_id = customers.cust_id
AND    customers.prod_category = 'Boys' 
AND    customers.cust_state_province = 'England - Norfolk' 
GROUP BY cust_city, prod_sub_category;
```

在前面的查询中，和列是示例中所示的聚类分析定义的一部分。在扫描表期间，数据库可以查询区域映射并仅访问该区域中的 rowid。`prod_category``cust_state_province``CREATE TABLE``sales`

另请参阅：

- "[尺寸概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-84D64C39-D8E8-4706-B4E3-519FE2CEE4C2)"
- [*Oracle 数据库数据仓库指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8927)，了解如何使用交错排序对表进行群集
- 有关子句语法和语义的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`BY INTERLEAVED ORDER`





### 临时表概述

**临时表**保存仅在事务或会话期间存在的数据。

临时表中的数据是会话专用的。每个会话只能查看和修改自己的数据。

您可以创建**全局临时表或****私有临时表**。下表显示了它们之间的本质区别。

表2-5 临时表特性

| 特征           | 全球                                                         | 私人                                                         |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 命名规则       | 与永久表相同                                                 | 必须以`ORA$PTT_`                                             |
| 表定义的可见性 | 所有会话                                                     | 仅创建表的会话                                               |
| 存储表定义     | 磁盘                                                         | 仅内存                                                       |
| 类型           | 特定于事务 （） 或特定于会话 （`ON COMMIT DELETE ROWS``ON COMMIT PRESERVE ROWS`) | 特定于事务 （） 或特定于会话 （`ON COMMIT DROP DEFINITION``ON COMMIT PRESERVE DEFINITION`) |

第三种类型的临时表（称为**游标持续时间临时表**）由数据库为某些类型的查询自动创建。

另请参阅：

[Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-C1AE164B-E99F-418A-9B2A-1ADB036048DF)，了解有关游标持续时间临时表的更多信息



#### 临时表的用途

临时表在必须缓冲结果集的应用程序中很有用。

例如，计划应用程序使大学生能够创建可选的学期课程计划。全局临时表中的一行表示每个计划。在会话期间，计划数据是私有的。当学生选择时间表时，应用程序会将所选时间表的行移动到永久表中。在会话结束时，数据库会自动删除全局临时表中的计划数据。

专用临时表对于动态报告应用程序很有用。例如，客户资源管理 （CRM） 应用程序可能无限期地以同一用户身份连接，同时有多个会话处于活动状态。每个会话都会创建一个为每个新[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)命名的专用临时表。应用程序可以对每个会话使用相同的表名，但会更改定义。数据和定义仅对会话可见。表定义将一直持续到事务结束或手动删除表为止。`ORA$PTT_crm`





#### 临时表中的段分配

与永久表一样，全局临时表是在数据字典中静态定义的持久对象。对于私有临时表，元数据仅存在于内存中，但可以驻留在磁盘上的临时表空间中。

对于全局和私有临时表，数据库在会话首次插入数据时分配临时段。在会话中加载数据之前，该表显示为空。对于特定于事务的临时表，数据库在事务结束时解除分配临时段。对于特定于会话的临时表，数据库在会话结束时解除分配临时段。

另请参阅：

"[临时段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-BFC69020-DECA-4F2D-8BED-57A612A4E7C8)"





#### 临时表创建

该语句创建一个临时表。`CREATE ... TEMPORARY TABLE`

指定 或 。在这两种情况下，该子句都指定表数据是特定于事务的（默认）还是特定于会话的。您可以为数据库本身创建一个临时表，而不是为每个 PL/SQL 存储过程创建一个临时表。`GLOBAL TEMPORARY TABLE``PRIVATE TEMPORARY TABLE``ON COMMIT`

您可以使用该语句为全局（非私有）临时表创建索引。这些索引也是临时的。索引中的数据与临时表中的数据具有相同的会话或事务范围。您还可以在全局临时表上创建[**视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1274BCF5-2EC1-4752-B9CE-998A85A83307)或[**触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8BA32C58-ACF3-4B6B-941F-586DE399D22A)。`CREATE INDEX`

另请参阅：

- "[视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-15E7AEDB-9A3F-4B31-AD2D-66253CC822E5)"
- "[触发器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-40297ADF-0968-42F8-B8B9-84AD6ADCBE63)"
- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11633)了解如何创建和管理临时表
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`CREATE ... TEMPORARY TABLE`





### 外部表概述

外部**表访问外部**源中的数据，就像此数据位于数据库的表中一样。

数据可以采用提供访问驱动程序的任何格式。您可以使用 SQL（串行或并行）、PL/SQL 和 Java 来查询外部表。



#### 外部表的用途

当 Oracle 数据库应用程序必须访问非关系数据时，外部表非常有用。

例如，基于 SQL 的应用程序可能需要访问其记录采用以下形式的文本文件：

```
Copy100,Steven,King,SKING,515.123.4567,17-JUN-03,AD_PRES,31944,150,90
101,Neena,Kochhar,NKOCHHAR,515.123.4568,21-SEP-05,AD_VP,17000,100,90 
102,Lex,De Haan,LDEHAAN,515.123.4569,13-JAN-01,AD_VP,17000,100,90
```

可以创建外部表，将文本文件复制到外部表定义中指定的位置，然后使用 SQL 查询文本文件中的记录。同样，可以使用外部表授予对 JSON 文档或 LOB 的只读访问权限。

在[**数据仓库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0881E18F-D245-4980-8272-64964B64E3CC)环境中，外部表对于执行提取、转换和加载 （ETL） 任务很有价值。例如，使用外部表可以将数据加载阶段与转换阶段进行管道传输。此技术消除了在数据库内暂存数据以准备在数据库内进一步处理的需要。

可以在虚拟列或非虚拟列上对外部表进行分区。此外，还可以创建混合分区[**表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9BAA7917-D479-4DCF-85B2-5B4BE0F891EE)，其中某些分区是内部分区，一些分区是外部分区。与内部分区一样，外部也受益于性能增强，例如分区修剪和分区联接。例如，您可以使用分区的外部表来分析存储在 Hadoop 分布式文件系统 （HDFS） 或 NoSQL 数据库上的大量非关系数据。

另请参阅：

"[分区表](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-BCC6F209-3AF4-4517-A3AB-DFE5E4543649)"



#### 对象存储中的数据

外部表可用于访问对象中的数据 商店。

除了支持访问驻留在操作系统文件中的外部数据之外 和大数据源，Oracle 支持访问对象存储中的外部数据。对象 存储在云中很常见，并提供扁平schema来管理个人 对象，任何类型的带有元数据的非结构化数据，通过将它们分组为简单 器皿。尽管对象存储主要是数据存储schema 云，它也可以用作本地存储硬件。

您可以使用包访问对象存储中的数据，或者 通过手动定义外部表。Oracle 强烈建议使用该软件包，因为它提供了额外的功能和 与Oracle自治数据库完全兼容。`DBMS_CLOUD``DBMS_CLOUD`





#### 外部表访问驱动程序

**访问驱动程序**是解释数据库外部数据的 API。访问驱动程序在数据库内运行，数据库使用驱动程序读取外部表中的数据。访问驱动程序和外部表层负责对数据文件中的数据执行所需的转换，以便它与外部表定义匹配。

下图表示外部数据的 SQL 访问。

图 2-8 外部表

![Description of Figure 2-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt231.gif)
[“图 2-8 外部表”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt231.html)

Oracle 为外部表提供以下访问驱动程序：

- `ORACLE_LOADER`（默认）

  允许使用 SQL*加载程序支持的大多数格式访问外部文件。 不能使用驱动程序创建、更新或追加到外部文件。`ORACLE_LOADER`

- `ORACLE_DATAPUMP`

  使您能够卸载或加载外部数据。卸载操作从数据库中读取数据，并将数据插入到由一个或多个外部文件表示的外部表中。创建外部文件后，数据库无法更新或追加数据。加载操作读取外部表并将其数据加载到数据库中。

- `ORACLE_HDFS`

  支持提取存储在 Hadoop 分布式文件系统 （HDFS） 中的数据。

- `ORACLE_HIVE`

  允许访问存储在 Apache Hive 数据库中的数据。源数据可以存储在HDFS，HBase，Cassandra或其他系统中。与其他访问驱动程序不同，您无法指定位置，因为从外部元数据存储中获取位置信息。`ORACLE_HIVE`

- `ORACLE_BIGDATA`

  支持对存储在结构化和结构化和 非结构化格式，包括 Apache Parquet、Apache Avro、Apache ORC 和 文本格式。您还可以使用此驱动程序查询本地数据，这很有用 用于测试和较小的数据集。





#### 外部表创建

在内部，创建外部表意味着在数据字典中创建元数据。与普通表不同，外部表不描述存储在数据库中的数据，也不描述数据在外部的存储方式。相反，外部表元数据描述了外部表图层必须如何向数据库*显示*数据。

语句由两部分组成。外部表定义描述列类型。此定义类似于一个视图，它使 SQL 能够查询外部数据，而无需将其加载到数据库中。语句的第二部分将外部数据映射到列。`CREATE TABLE ... ORGANIZATION EXTERNAL`

外部表是只读的，除非使用访问驱动程序创建。对外部表的限制包括不支持索引列和列对象。`CREATE TABLE AS SELECT``ORACLE_DATAPUMP`

另请参阅：

- [*Oracle 数据库实用程序*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL011)，了解外部表
- [*Oracle 数据库管理员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01507)，了解如何管理外部表、外部连接和目录对象
- 有关创建和查询外部表的信息的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54502)



### 区块链表概述

区块链表是为集中式区块链应用程序设计的仅追加**表**。

在 Oracle 区块链表中，对等方是信任数据库来维护防篡改账本的数据库用户。账本作为区块链表实现，由应用程序定义和管理。现有应用程序可以防止欺诈，而无需新的基础结构或编程模型。虽然交易吞吐量低于标准表，但区块链表的性能优于去中心化区块链。

区块链表是仅追加的，因为唯一允许的 DML 是命令。该表不允许 、、 和直接路径加载。数据库事务可以跨越区块链表和标准表。例如，单个事务可以将行插入到一个标准表和两个不同的区块链表中。`INSERT``UPDATE``DELETE``MERGE``TRUNCATE`



#### 行链

在区块链表中，行链是一系列通过散列方案链接在一起的**行**。

行链由数据库实例 ID 和链 ID 的唯一组合标识。区块链表中的一行正好属于一行链。单个表支持多个行链。

注意：标准表中的链接行与区块链表中的行链正交。只有“链”这个词是相同的。

链中的每一行都有一个唯一的序列号。数据库对每个链的行使用 SHA2-512 哈希计算对行进行排序。每个插入行的哈希派生自链中先前插入的行的哈希值和插入行的**行内容**。



#### 行内容

行**内容**是一个连续的字节序列，其中包含行的列数据和链中前一行的哈希值。

创建区块链表时，数据库会创建多个隐藏列。例如，您可以创建包含列和 ：`bank_ledger``bank``deposit`

```
CopyCREATE BLOCKCHAIN TABLE bank_ledger (bank VARCHAR2 (128), deposit NUMBER)
  NO DROP UNTIL 31 DAYS IDLE 
  NO DELETE UNTIL 31 DAYS AFTER INSERT
  HASHING USING "SHA2_512" VERSION "v1";
```

数据库会自动创建前缀为 ： 、、 和其他前缀的隐藏列。这些无法更改或管理的隐藏列实现了防篡改算法。此算法通过在提交时按特定顺序获取唯一的表级锁来避免死锁。`ORABCTAB``ORABCTAB_INST_ID$``ORABCTAB_CHAIN_ID$``ORABCTAB_SEQ_NUM$`

注意：区块链表的行内容存储在标准数据块中。在此版本中 在 Oracle 数据库中，区块链表不支持表集群。

实例 ID、链 ID 和序列号唯一标识行。每行都有一个独立于平台的 SHA2-512 哈希，该哈希存储在隐藏列中。哈希基于插入行的内容和链中上一行的哈希。`ORABCTAB_HASH$`

行的列值的数据格式由列元数据和内容中的字节组成。列元数据是一个 20 字节的结构，用于描述表中的位置、数据类型、null 状态和字节长度等特征。列内容是表示行中值的字节集。例如，值的 ASCII 表示形式为 。您可以使用 SQL 中的函数来获取列元数据和内容。`Chase``43 68 61 73 65``DUMP`

哈希计算的行内容包括来自多个列的列数据格式：链中上一行的哈希值、用户定义的列和固定数量的隐藏列。



#### 区块链表的用户界面

与标准表一样，区块链表由 SQL 创建，支持标量数据类型、LOB 和分区。您还可以为区块链表创建索引和触发器。

要创建区块链表，请使用语句。区块链表具有由子句指定的保留期。可以使用 删除该表。`CREATE BLOCKCHAIN TABLE``NO DROP UNTIL n DAYS IDLE``DROP TABLE`

Oracle 区块链表支持以下接口：

- 该包使您能够对表行执行各种操作。例如，要将签名应用于以前插入的行的内容，请使用该过程。要验证行是否未被篡改，请使用 。要在保留期（由子句指定）过后删除行，请使用 。`DBMS_BLOCKCHAIN_TABLE``SIGN_ROW``VERIFY_ROWS``NO DELETE``DELETE_ROWS`
- 该包提供了检索列的字节值的过程。您可以检索计算哈希或用户签名所依据的行数据的行内容。`DBMS_TABLE_DATA`
- 该视图显示表元数据，例如行保留期、允许删除表之前的不活动期和哈希算法。`DBA_BLOCKCHAIN_TABLES`

注意：

- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-43470B0C-DE4A-4640-9278-B066901C3926)了解如何管理区块链表
- [Oracle 数据库 PL/SQL 包和类型参考以了解该包](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS-GUID-B469E277-978E-4378-A8C1-26D3FF96C9A6)`DBMS_BLOCKCHAIN_TABLE`
- [Oracle 数据库 PL/SQL 包和类型参考以了解该包](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS-GUID-C04E9DA8-C59F-4E11-9E75-44AAAFA57E89)`DBMS_TABLE_DATA`
- 了解视图的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-2E7FFA31-6241-474E-BA88-5EB5B8F69245)`DBA_BLOCKCHAIN_TABLES`



### 不可变概述 表

不可变表是只读表，可防止未经授权的数据 内部人员的修改和人为导致的意外数据修改 错误。

遭到入侵或流氓的员工可以尝试未经授权的修改，这些员工 有权访问内部凭据。

可以将新行添加到不可变表中，但不能将现有行添加到不可变表中 改 性。必须为不可变表和行指定保留期 在不可变表中。在指定的行保留期后，行将过时 时期。只能从不可变表中删除过时的行。

不可变表包含系统生成的隐藏列。这些列是 与区块链表相同。插入行时，将 和列。其余系统生成的隐藏列的值设置为 。`ORABCTAB_CREATION_TIME$``ORABCTAB_USER_NUMBER$``NULL`

使用不可变表不需要更改现有应用程序。





### 对象表概述

对象表是一种特殊的表，其中每行表示一个**对象**。

Oracle 对象类型是具有名称、属性和方法的用户定义**类型**。对象类型可以将实际实体（如客户和采购订单）建模为数据库中的对象。

对象类型定义逻辑结构，但不创建存储。下面的示例创建一个名为 的对象类型：`department_typ`

```
CopyCREATE TYPE department_typ AS OBJECT
   ( d_name     VARCHAR2(100),
     d_address  VARCHAR2(200) );
/
```

下面的示例创建一个以对象类型命名的对象表，然后在表中插入一行。表的属性（列）派生自对象类型的定义。`departments_obj_t``department_typ``departments_obj_t`

```
CopyCREATE TABLE departments_obj_t OF department_typ;
INSERT INTO departments_obj_t VALUES ('hr', '10 Main St, Sometown, CA');
```

与关系列一样，对象表可以只包含一种事物的行，即与表声明类型相同的对象实例。默认情况下，对象表中的每个行对象都有一个关联的逻辑对象标识符 （OID），用于在对象表中唯一标识它。对象表的 OID 列是隐藏列。

另请参阅：

- Oracle 数据库对象关系[开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADOBJ001)，了解 Oracle 数据库中的对象关系功能
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01506)`CREATE TYPE`

## 3 索引和按索引组织的表

索引是可以加快对表行的访问的schema对象。按索引组织的表是存储在索引结构中的表。

本章包含以下部分：

- [索引简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DE7A95BC-6E4A-47EA-9FC5-B85B54F8CF41)
- [B树索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-FC93A85B-C237-4249-AD1E-FF54576ED050)
- [位图索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-B15C4817-7748-456D-9740-8B9628AF9F47)
- [基于函数的索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9AD7651D-0F0D-4FC6-A984-5845F0224EE6)
- [应用程序域索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9586EB86-4B84-4A43-A66D-958776FE558B)
- [按索引组织的表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DAEC075B-C16D-4A57-898C-70EBCB364F0C)





### 索引简介

**索引**是与表或**表集群**关联的可选结构，有时可以加快数据访问速度。

索引是在逻辑上和物理上独立于与其关联的对象中的数据的schema对象。因此，您可以删除或创建索引，而不会对索引表产生物理影响。

注意：如果删除索引，则应用程序仍可正常工作。但是，以前编制索引的数据的访问速度可能会较慢。

打个比方，假设人力资源经理有一个纸板箱架子。包含员工信息的文件夹随机插入到框中。员工 Whalen （ID 200） 的文件夹是框 10 底部的 1 个文件夹，而 King （ID 100） 的文件夹位于框 3 的底部。要查找文件夹，管理器从下到上查看框 1 中的每个文件夹，然后在框之间移动，直到找到该文件夹。为了加快访问速度，经理可以创建一个索引，按顺序列出每个员工 ID 及其文件夹位置：

```
CopyID 100: Box 3, position 1 (bottom)
ID 101: Box 7, position 8 
ID 200: Box 1, position 10
.
.
.
```

同样，经理可以为员工姓氏、部门 ID 等创建单独的索引。

本节包含以下主题：

- [索引的优缺点](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-A444A178-67BE-45E2-8D2F-A64B95E1D31F)
- [索引可用性和可见性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-D0C53854-D92E-49D0-822A-39F3E7573752)
- [键和列](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-104A7F88-1BFE-4FF6-A5AD-4439C0E7F929)
- [复合索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-ABE1DE2A-59CC-4ADE-86A5-426B16459464)
- [唯一和非唯一索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-F6EFE752-18FA-4BCE-BDE0-F2C386361187)
- [索引的类型](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-ACA0308E-5F01-4236-81D3-D0CDE5CB6695)
- [数据库如何维护索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-1DA0A7D9-1EAB-40B8-B882-75B8EC9498D7)
- [索引存储](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-832C2B66-912B-4E1C-B4B5-AA40F49E4970)





#### 索引的优缺点

索引的缺失或存在不需要更改任何 SQL 语句的措辞。

索引是对单行数据的快速访问路径。它只影响执行速度。给定已编制索引的数据值，索引将直接指向包含该值的行的位置。

当索引存在于表的一个或多个列上时，数据库在某些情况下可以从表中检索一小组随机分布的行。索引是减少磁盘 I/O 的众多方法之一。如果堆组织的表没有索引，则数据库必须执行[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)才能找到值。例如，对未编制索引的表中的位置[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)要求数据库搜索每个块中的每一行。随着数据量的增加，此方法不能很好地扩展。`2700``hr.departments`

索引的缺点包括：

- 手动创建索引通常需要深入了解数据模型、应用程序和数据分布。
- 随着数据的变化，您必须重新访问以前有关索引的决策。索引可能不再有用，或者可能需要新索引。
- 索引占用磁盘空间。
- 当索引数据上发生 DML 时，数据库必须更新索引，这会产生性能开销。

注意：从 Oracle Database 19c 开始，Oracle 数据库可以持续监控应用程序工作负载，自动创建和管理索引。自动索引是作为以固定间隔运行的数据库任务实现的。

在以下情况下，请考虑创建索引：

- 索引列经常被查询，并返回表中总行数的一小部分。
- 索引列上存在参照[**完整性约束**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-67F8FE8C-EBA5-4796-820A-8919982A1411)。索引是避免全表锁定的一种方法，否则在更新父表[**主键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)、合并到父表或从父表中删除时，将需要全表[**锁定**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6D016291-A487-4F88-BE0B-ACF8FA2AE72C)。
- 唯一键约束将放置在表上，并且您希望手动指定索引和所有索引选项。

另请参阅：

- [《Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-E4149397-FF37-4367-A12F-675433715904)》，了解有关自动索引的更多信息
- [Oracle 数据库许可信息用户手册，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBLIC-GUID-0F9EB85D-4610-4EDF-89C2-4916A0E7AC87)详细了解不同版本和服务支持哪些功能





#### 索引可用性和可见性

索引是可用（默认）还是不可用、可见（默认）或不可见。

这些属性定义如下：

- 可用性

  被[**优化程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)忽略的[**不可用索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5EEB4F35-818F-4478-8BE3-F70CF22CD11F)不由 DML 操作维护。不可用的索引可以提高大容量负载的性能。您可以使索引不可用，然后重新生成它，而不是删除索引并在以后重新创建它。不可用的索引和索引分区不占用空间。当您使可用索引不可用时，数据库将删除其索引[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。

- 能见度

  [**不可见索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B60609DA-2397-4715-B7E2-75AEC3FAD0BF)由 DML 操作维护，但默认情况下不由优化程序使用。使索引不可见是使其不可用或删除索引的替代方法。不可见索引对于在删除索引之前测试索引的删除或临时使用索引而不影响整个应用程序特别有用。

另请参阅：

“优化器概述”，了解[优化器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)如何选择执行计划





#### 键和列

**键**是一组列或表达式，您可以基于其构建索引。

尽管这些术语通常可以互换使用，但索引和键是不同的。索引是存储在数据库中的结构，用户使用 SQL 语句进行管理。键严格来说是一个逻辑概念。

以下语句在示例表的列上创建一个索引：`customer_id``oe.orders`

```
CopyCREATE INDEX ord_customer_ix ON orders (customer_id);
```

在前面的语句中，列是索引键。索引本身名为 。`customer_id``ord_customer_ix`

注：主键和唯一键自动具有索引，但您可能希望在[**外键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EEE8A67D-6B0E-468E-9554-48FEE552BC9A)上创建索引。

另请参阅：

- "[数据完整性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-6A89FF39-AD42-4399-BD1B-E51ECEE50B4E)"
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF-GUID-1F89BBC0-825F-4215-AF71-7588E31D8BFE)语法和语义`CREATE INDEX`





#### 复合索引

复合索引（也称为**串联**索引）是表中多个列的**索引**。

按对将检索数据的查询最有意义的顺序将列放在复合索引中。表中的列不必相邻。

复合索引可以加快子句引用复合索引中列的全部或前导部分的语句的数据检索速度。因此，定义中使用的列的顺序很重要。通常，最常访问的列排在第一位。`SELECT``WHERE`

例如，假设应用程序经常查询表中的 、 和列。还假设 具有高[**基数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5CD22620-6D7A-40DC-BA09-EE3B5339C7F8)，这意味着非重复值的数量与表行的数量相比很大。使用以下列顺序创建索引：`last_name``job_id``salary``employees``last_name`

```
CopyCREATE INDEX employees_ix
   ON employees (last_name, job_id, salary);
```

访问所有三列、仅访问列或仅访问 和 列的查询使用此索引。在此示例中，不访问列的查询不使用索引。`last_name``last_name``job_id``last_name`

注意：在某些情况下，例如当前导列的基数非常低时，数据库可能会使用此索引的跳过扫描（请参阅“[索引跳过扫描](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-BB75CC6E-90E5-457F-A4A0-0ABBEB755181)”）。

当多个索引满足以下任一条件时，同一表上可以存在具有相同列顺序的多个索引：

- 索引的类型不同。

  例如，可以在同一列上创建位图和 B 树索引。

- 索引使用不同的分区方案。

  例如，可以创建本地分区的索引和全局分区的索引。

- 索引具有不同的唯一性属性。

  例如，可以在同一组列上创建唯一索引和非唯一索引。

例如，非分区索引、全局分区索引和本地分区索引可以按相同顺序存在于相同的表列中。任何时候只能看到一个具有相同顺序的相同列数的索引。

此功能使您能够迁移应用程序，而无需删除现有索引并使用不同的属性重新创建它。此外，当索引键不断增加时，此功能在 OLTP 数据库中很有用，从而导致数据库将新条目插入同一组索引块。为了缓解此类“热点”，可以将索引从未分区索引演变为全局分区索引。

如果同一组列上的索引在类型或分区方案上没有差异，则这些索引必须使用不同的列排列。例如，以下 SQL 语句指定有效的列排列：

```
CopyCREATE INDEX employee_idx1 ON employees (last_name, job_id);
CREATE INDEX employee_idx2 ON employees (job_id, last_name);
```

另请参阅：

[Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-05F3C3B0-DB80-489C-B749-01653FDE8E09)了解有关在同一列集上创建多个索引的更多信息





#### 唯一和非唯一索引

索引可以是唯一的，也可以是非唯一的。唯一索引保证表中没有两行在键列中具有重复值。

例如，应用程序可能要求没有两个员工具有相同的员工 ID。在唯一索引中，每个数据值都有一个 [**rowid**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-647822F1-EFF1-4E26-BE22-D54081BE1C7B)。叶块中的数据仅按键排序。

非唯一索引允许在索引列或列中重复值。例如，表的列可能包含多个值。对于非唯一索引，rowid 按排序顺序包含在键中，因此非唯一索引按索引键和 rowid（升序）排序。`first_name``employees``Mike`

Oracle 数据库不会为所有键列都为空的表行编制索引，但位图索引或群集键列值为[**空**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8854502F-2B8F-4ABC-98FA-BBFC3695A964)的情况除外。





#### 索引的类型

Oracle 数据库提供了多种索引方案，这些方案提供了互补的性能功能。

B 树索引是标准索引类型。它们非常适合高选择性索引（每个索引条目对应的几行）和主键索引。用作串联索引，[**B 树索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8D6D0C64-6AC8-4B22-A9AF-1B62F61AE10B)可以检索按索引列排序的数据。B 树索引具有下表中显示的子类型。

表3-1 B树指数亚型

| B树索引子类型  | 描述                                                         | 了解更多                                                     |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 按索引组织的表 | 索引组织的表不同于堆组织的表，因为数据本身就是索引。         | "[按索引组织的表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DAEC075B-C16D-4A57-898C-70EBCB364F0C)" |
| 反向键索引     | 在这种类型的索引中，索引键的字节是颠倒的，例如，103存储为301。字节的反转将插入内容分散到索引中，分布在许多块上。 | "[反向键索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-2646BDA9-F776-4C98-9487-C7EBC2EECF0B)" |
| 降序索引       | 这种类型的索引按降序存储一个或多个特定列上的数据。           | "[升序和降序索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-8C2EA2EC-18E5-4E4A-BF74-D1DE86D7F24A)" |
| B 树聚类索引   | 这种类型的索引按降序存储一个或多个特定列上的数据。           | "[升序和降序索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-8C2EA2EC-18E5-4E4A-BF74-D1DE86D7F24A)" |

下表显示了不使用 B 树结构的索引类型。

表 3-2 不使用 B 树结构的索引

| 类型               | 描述                                                         | 了解更多                                                     |
| :----------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 位图和位图联接索引 | 在位图索引中，索引项使用位图指向多行。相反，B 树索引条目指向单行。位图联接索引是用于联接两个或多个表的位图索引。 | "[位图索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-B15C4817-7748-456D-9740-8B9628AF9F47)" |
| 基于函数的索引     | 这种类型的索引包括由函数（如函数）转换或包含在表达式中的列。B 树或位图索引可以基于函数。`UPPER` | "[基于函数的索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9AD7651D-0F0D-4FC6-A984-5845F0224EE6)" |
| 应用程序域索引     | 用户为特定于应用程序的域中的数据创建此类型的索引。物理索引不需要使用传统的索引结构，可以作为表存储在 Oracle 数据库中，也可以作为文件存储在外部。 | "[应用程序域索引概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9586EB86-4B84-4A43-A66D-958776FE558B)" |

另请参阅：

- 了解如何管理索引的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-E4149397-FF37-4367-A12F-675433715904)
- [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-CDC8B946-2375-4E5F-B50E-DE1E79EAE4CD)，了解不同的索引访问路径





#### 数据库如何维护索引

创建索引后，数据库会自动维护和使用索引。

索引会自动将数据更改反映到其基础表中。更改的示例包括添加、更新和删除行。无需用户操作。

索引数据的检索性能几乎保持不变，即使插入了行也是如此。但是，表上存在许多索引会降低 [**DML**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5F2F112-1B33-41B5-B63D-9DC8F99A369D) 性能，因为数据库还必须更新索引。

另请参阅：

- [《Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-E4149397-FF37-4367-A12F-675433715904)》，了解有关自动索引的更多信息
- [Oracle 数据库许可信息用户手册，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBLIC-GUID-0F9EB85D-4610-4EDF-89C2-4916A0E7AC87)详细了解不同版本和服务支持哪些功能





#### 索引存储

Oracle 数据库将索引数据存储在索引段中。

数据块中可用于索引数据的空间是数据块大小减去块开销、条目开销、rowid 和每个索引值的一个长度字节。

索引段的表空间是所有者的默认表空间，或者是语句中专门命名的[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA66891C-71B2-4D55-8F64-0E427AE24E88)。为了便于管理，您可以将索引存储在与其表不同的表空间中。例如，您可以选择不备份仅包含索引的表空间，这些索引可以重建，从而减少备份所需的时间和存储。`CREATE INDEX`

另请参阅：

“索引块[概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-82531CDF-407E-4D70-AFD0-8E8929B72783)”，了解索引块的类型（根、分支和叶），以及如何在块中存储索引条目





### B树索引概述

B 树是*平衡树*的缩写，是最常见的数据库索引类型。**B 树索引**是划分为范围的有序值列表。通过将键与行或行范围相关联，B 树为各种查询（包括完全匹配和范围搜索）提供了出色的检索性能。

下图说明了 B 树索引的结构。该示例显示列上的索引，该索引是表中的外键列。`department_id``employees`

图 3-1 B 树索引的内部结构

![图 3-1 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt244.gif)
[“图 3-1 B 树索引的内部结构”的描述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt244.html)

本节包含以下主题：

- [分支块和叶块](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-89A9F85F-BE0E-4596-AEC3-CAF0D821B1CA)
- [索引扫描](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-D54BD14D-0065-4B61-B2F6-5567913B16CD)
- [反向键索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-2646BDA9-F776-4C98-9487-C7EBC2EECF0B)
- [升序和降序索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-8C2EA2EC-18E5-4E4A-BF74-D1DE86D7F24A)
- [索引压缩](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-33AEA2E3-1355-4224-BB39-890A71784062)





#### 分支块和叶块

B树索引有两种类型的块：用于搜索的**分支块**和用于存储键值的**叶块**。B 树索引的上层分支块包含指向较低级索引块的索引数据。

[在图 3-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-FC93A85B-C237-4249-AD1E-FF54576ED050__I5765) 中，根分支块有一个条目，它指向下一个分支级别中最左侧的块。此分支块包含诸如 和 之类的条目。这些条目中的每一个都指向一个叶块，其中包含落在该范围内的键值。`0-40``0-10``11-19`

B树指数是平衡的，因为所有叶块自动保持相同的深度。因此，从索引中的任何位置检索任何记录所需的时间大致相同。索引的高度是从根块到叶块所需的块数。分支级别是高度减去 1。在[图 3-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-FC93A85B-C237-4249-AD1E-FF54576ED050__I5765) 中，索引的高度为 3，分支级别为 2。

分支块存储在两个键之间做出分支决策所需的最小键前缀。此技术使数据库能够在每个分支块上容纳尽可能多的数据。分支块包含指向包含键的子块的指针。键和指针的数量受块大小的限制。

叶块包含每个索引数据值和用于查找实际行的相应 rowid。每个条目按（键、行）排序。在叶块中，键和 rowid 链接到其左右同级条目。叶块本身也是双重连接的。在[图 3-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-FC93A85B-C237-4249-AD1E-FF54576ED050__I5765) 中，最左边的叶块 （） 链接到第二个叶块 （）。`0-10``11-19`

注：包含字符数据的列中的索引基于数据库字符集中字符的二进制值。





#### 索引扫描

在索引**扫描**中，数据库通过使用语句指定的索引列值遍历索引来检索行。如果数据库扫描索引以查找值，则它将在 n 个 I/O 中找到此值，其中 *n* 是 B 树索引的高度。这是 Oracle 数据库索引背后的基本原则。

如果 SQL 语句仅访问索引列，则数据库直接从索引而不是表中读取值。如果该语句除了访问索引列之外还访问非索引列，则数据库将使用 rowid 来查找表中的行。通常，数据库通过交替读取索引块和表块来检索表数据。

另请参阅：

[Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-B33945C3-CCC0-4D35-AF62-DB80FD4256A6)了解有关索引扫描的详细信息





##### 全索引扫描

在**完整索引扫描**中，数据库按顺序读取整个索引。如果 SQL 语句中的谓词 （ 子句） 引用索引中的列，并且在某些情况下未指定谓**词**，则可以使用完整的索引扫描。完全扫描可以消除排序，因为数据是按索引键排序的。`WHERE`

例 3-1 全索引扫描

假设应用程序运行以下查询：

```
复制选择department_id、last_name、薪水
来自员工
其中工资> 5000
按department_id、last_name排序;
```

在此示例中，、 和 是索引中的复合键。Oracle 数据库对索引执行全面扫描，按排序顺序（按部门 ID 和姓氏排序）读取索引，并根据 salary 属性进行筛选。这样，数据库将扫描一组小于表的数据，该表包含的列数多于查询中包含的列数，并避免对数据进行排序。`department_id``last_name``salary``employees`

完全扫描可以读取索引条目，如下所示：

```
复制50，阿特金森，2800，罗维德
60，奥斯汀，4800，罗维德
70，贝尔，10000，罗维德
80，亚伯，11000，罗维德
80，安德，6400，罗维德
110，奥斯汀，7200，罗维德
.
.
.
```





##### 快速全索引扫描

快速全索引扫描是一种**全索引扫描**，其中数据库访问索引本身中的数据而不访问表，数据库不按特定顺序读取索引块。

当同时满足以下两个条件时，快速完整索引扫描是[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)的替代方法：

- 索引必须包含查询所需的所有列。
- 包含所有 null 的行不得出现在查询结果集中。为了保证此结果，索引中至少有一列必须具有：
  - 约束`NOT NULL`
  - 应用于列的谓词，用于防止在查询结果集中考虑空值

例 3-2 快速完整索引扫描

假定应用程序发出以下查询，其中不包含子句：`ORDER BY`

```
复制选择last_name，薪水
来自员工;
```

该列具有非 null 约束。如果姓氏和薪水是索引中的复合键，则快速完整索引扫描可以读取索引条目以获取请求的信息：`last_name`

```
复制百达，2900，罗维德
阿特金森，2800，罗维德
兹洛特键，10500，罗维德
奥斯汀，7200，罗维德
贝尔，10000，罗维德
奥斯汀，4800，罗维德
.
.
.
```





##### 索引范围扫描

索引**范围**扫描是对索引的有序扫描，其中在条件中指定了索引的一个或多个前导列，索引键可以有 0、1 或多个值。

[**条件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5AA8627-E7DC-487B-8D4B-2DE3F1497A83)指定一个或多个表达式和逻辑（布尔）运算符的组合。它返回的值为 、 或 。`TRUE``FALSE``UNKNOWN`

数据库通常使用索引范围扫描来访问选择性数据。[**选择性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA830B4F-E5E8-4CCC-A960-0FA0E2F8DE12)是查询选择的表中行的百分比，0 表示没有行，1 表示所有行。选择性与查询谓词（如 ）或谓[**词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-891CF9E9-78CD-470C-9C4A-D65A101B2C38)的组合相关联。当值接近 0 时，谓词的选择性会降低，当值接近 1 时，谓词的选择性会降低（或非选择性）。`WHERE last_name LIKE 'A%'`

例如，用户查询姓氏以 开头的员工。假定该列已编制索引，其条目如下所示：`A``last_name`

```
CopyAbel,rowid
Ande,rowid
Atkinson,rowid
Austin,rowid
Austin,rowid
Baer,rowid
.
.
.
```

数据库可以使用范围扫描，因为列是在谓词中指定的，并且每个索引键可以有多个 rowid。例如，两个员工被命名为 Austin，因此两个 rowid 与密钥相关联。`last_name``Austin`

索引范围扫描可以在两端都有界，例如在查询 ID 介于 10 和 40 之间的部门时，也可以仅在一侧有界，例如在查询 ID 超过 40 的查询中。为了扫描索引，数据库在叶块中向后或向前移动。例如，扫描 10 到 40 之间的 ID 会查找包含最低键值 10 或更大的第一个索引叶块。然后，扫描水平地通过叶节点的链接列表进行，直到找到大于 40 的值。





##### 索引唯一扫描

与索引范围扫描相反，索引**唯一扫描**必须具有与索引键关联的 0 或 1 rowid。

当谓词使用相等运算符引用索引键中的所有列时，数据库将执行唯一扫描。索引唯一扫描在找到第一条记录后立即停止处理，因为不可能有第二条记录。`UNIQUE`

例如，假设用户运行以下查询：

```
CopySELECT *
FROM   employees
WHERE  employee_id = 5;
```

假定该列是主键，并使用如下条目编制索引：`employee_id`

```
Copy1,rowid
2,rowid
4,rowid
5,rowid
6,rowid
.
.
.
```

在这种情况下，数据库可以使用索引唯一扫描来查找 ID 为 5 的员工的 rowid。





##### 索引跳过扫描

**索引跳过扫描**使用复合索引的逻辑子索引。数据库“跳过”单个索引，就像搜索单独的索引一样。

如果复合索引的前导列中只有很少的非重复值，而索引的非前导键中有许多非重复值，则跳过扫描非常有用。当查询谓词中未指定复合索引的前导列时，数据库可以选择跳过索引扫描。

例 3-3 跳过复合索引的扫描

假设您为表中的客户运行以下查询：`sh.customers`

```
CopySELECT * FROM sh.customers WHERE cust_email = 'Abbey@company.example.com';
```

该表具有一列，其值为 或 。假定列 （， ） 上存在复合索引。以下示例显示了索引条目的一部分：`customers``cust_gender``M``F``cust_gender``cust_email`

```
CopyF,Wolf@company.example.com,rowid
F,Wolsey@company.example.com,rowid
F,Wood@company.example.com,rowid
F,Woodman@company.example.com,rowid
F,Yang@company.example.com,rowid
F,Zimmerman@company.example.com,rowid
M,Abbassi@company.example.com,rowid
M,Abbey@company.example.com,rowid
```

数据库可以使用此索引的跳过扫描，即使子句中未指定。`cust_gender``WHERE`

在跳过扫描中，逻辑子索引的数量由前导列中的非重复值的数量决定。在前面的示例中，前导列有两个可能的值。数据库在逻辑上将索引拆分为一个带有键的子索引和一个带有键的第二个子索引。`F``M`

在搜索其电子邮件为 的客户的记录时，数据库首先使用值搜索子索引，然后搜索具有值的子索引。从概念上讲，数据库按如下方式处理查询：`Abbey@company.example.com``F``M`

```
CopySELECT * FROM sh.customers WHERE cust_gender = 'F' 
  AND cust_email = 'Abbey@company.example.com'
UNION ALL
SELECT * FROM sh.customers WHERE cust_gender = 'M'
  AND cust_email = 'Abbey@company.example.com';
```

另请参阅：

[Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-B7C62F0F-EB7C-422C-919D-D86456A74A60)了解有关跳过扫描的更多信息





##### 指数聚类因子

**索引聚类因子**测量与索引值（如员工姓氏）相关的行顺序。随着阶数的增加，聚类因子减小。

聚类因子可用作使用索引读取整个表所需的 I/O 数的粗略度量：

- 如果聚类因子较高，则 Oracle 数据库在较大的索引范围扫描期间执行相对较高的 I/O 数。索引条目指向随机表块，因此数据库可能必须一遍又一遍地读取和重读相同的块，以检索索引指向的数据。
- 如果聚类因子较低，则 Oracle 数据库在大索引范围扫描期间执行的 I/O 数量相对较少。区域中的索引键往往指向相同的数据块，因此数据库不必一遍又一遍地读取和重读相同的块。

聚类因子与索引扫描相关，因为它可以显示：

- 数据库是否将使用索引进行大范围扫描
- 相对于索引键的表组织程度
- 如果行必须按索引键排序，是否应考虑使用按索引组织的表、分区或表簇

例 3-4 聚类因子

假设该表适合两个数据块。[表 3-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9F572458-50AF-4B7C-BC84-807FB815AC39__CHDEIDBA) 描述了两个数据块中的行（省略号表示未显示的数据）。`employees`

表3-3 员工表中两个数据块的内容

| 数据块 1                                                     | 数据块 2                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| `100 Steven    King    SKING    ... 156 Janette   King    JKING    ... 115 Alexander Khoo    AKHOO    ... . . . 116 Shelli  Baida     SBAIDA   ... 204 Hermann Baer      HBAER    ... 105 David   Austin    DAUSTIN  ... 130 Mozhe   Atkinson  MATKINSO ... 166 Sundar  Ande      SANDE    ... 174 Ellen   Abel      EABEL    ...` | `   149 Eleni    Zlotkey EZLOTKEY ... 200 Jennifer Whalen  JWHALEN  ... . . . 137 Renske   Ladwig  RLADWIG  ... 173 Sundita  Kumar   SKUMAR   ... 101 Neena    Kochar  NKOCHHAR ...` |

行按姓氏顺序存储在块中（以粗体显示）。例如，数据块 1 中的底行描述 Abel，下一行向上描述 Ande，依此类推，直到数据块 1 中顶行代表 Steven King。块 2 中的底行描述 Kochar，下一行描述 Kumar，依此类推，直到 Zlotkey 块的最后一行。

假定姓氏列上存在索引。每个名称条目对应于一个 rowid。从概念上讲，索引条目如下所示：

```
CopyAbel,block1row1
Ande,block1row2
Atkinson,block1row3
Austin,block1row4
Baer,block1row5
.
.
.
```

假定员工 ID 列上存在单独的索引。从概念上讲，索引条目可能如下所示，员工 ID 分布在两个块中几乎随机的位置：

```
Copy100,block1row50
101,block2row1
102,block1row9
103,block2row19
104,block2row39
105,block1row4
.
.
.
```

以下语句查询这两个索引的聚类因子视图：`ALL_INDEXES`

```
CopySQL> SELECT INDEX_NAME, CLUSTERING_FACTOR 
  2  FROM ALL_INDEXES 
  3  WHERE INDEX_NAME IN ('EMP_NAME_IX','EMP_EMP_ID_PK');
 
INDEX_NAME           CLUSTERING_FACTOR
-------------------- -----------------
EMP_EMP_ID_PK                       19
EMP_NAME_IX                          2
```

的聚类因子较低，这意味着单个叶块中的相邻索引条目倾向于指向同一数据块中的行。的聚类因子很高，这意味着同一叶块中的相邻索引条目指向相同数据块中的行的可能性要小得多。`EMP_NAME_IX``EMP_EMP_ID_PK`

另请参阅：

要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-E39825BA-70AC-45D8-AF30-C7FF561373B6)`ALL_INDEXES`





#### 反向键索引

**反向键索引**是一种 B 树索引，它在保持列顺序的同时物理反转每个索引键的字节。

例如，如果索引键是 ，并且如果以十六进制形式为此键存储的两个字节位于标准 B 树索引中，则反向键索引会将字节存储为 。`20``C1,15``15,C1`

反转键解决了 B 树索引右侧叶块的争用问题。在 Oracle 实际应用程序集群 （Oracle RAC） 数据库中，多个实例重复修改同一块时，此问题尤其严重。例如，在表中，订单的主键是连续的。集群中的一个实例添加顺序 20，而另一个实例添加 21，每个实例将其密钥写入索引右侧的同一叶块。`orders`

在反向键索引中，字节顺序的反转会在索引中的所有叶键之间分配插入。例如，在标准键索引中相邻的键（如 20 和 21）现在存储在单独的块中。因此，用于插入顺序键的 I/O 分布更均匀。

由于索引中的数据在存储时不按列键排序，因此反向键排列消除了在某些情况下运行索引范围扫描查询的能力。例如，如果用户对大于 20 的订单 ID 发出查询，则数据库无法从包含此 ID 的块开始，然后水平地通过叶块。





#### 升序和降序索引

在**升序索引**中，Oracle 数据库按升序存储数据。默认情况下，字符数据按值的每个字节中包含的二进制值、数字数据从最小到最大数字以及日期从最早值到最新值排序。

有关升序索引的示例，请考虑以下 SQL 语句：

```
CopyCREATE INDEX emp_deptid_ix ON hr.employees(department_id); 
```

Oracle 数据库对列上的表进行排序。它按升序加载升序索引和相应的 rowid 值，从 开始。当它使用索引时，Oracle 数据库将搜索排序的值，并使用关联的 rowid 来查找具有请求值的行。`hr.employees``department_id``department_id``0``department_id``department_id`

通过在语句中指定关键字，可以创建[**降序索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-77ADFA8C-BBA8-4E2D-B122-2D490FC35CFE)。在这种情况下，索引按降序存储一个或多个指定列上的数据。如果列上[表3-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9F572458-50AF-4B7C-BC84-807FB815AC39__CHDEIDBA)中的索引是降序的，则包含的叶块将位于树的左侧，块位于右侧。通过降序索引的默认搜索是从最高到最低值。`DESC``CREATE INDEX``employees.department_id``250``0`

当查询对某些列进行升序排序而对其他列进行降序排序时，降序索引非常有用。例如，假设您在 和 列上创建一个复合索引，如下所示：`last_name``department_id`

```
CopyCREATE INDEX emp_name_dpt_ix ON hr.employees(last_name ASC, department_id DESC); 
```

如果用户按升序（A 到 Z）查询姓氏，按降序（从高到低）查询部门 ID，则数据库可以使用此索引来检索数据，并避免对其进行排序的额外步骤。`hr.employees`

另请参阅：

- [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-E2353939-DFBD-444A-94BC-2497E2A418D1)，了解有关升序和降序索引搜索的更多信息
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53994)，了解 和 选项的说明`ASC``DESC``CREATE INDEX`





#### 索引压缩

为了减少索引中的空间，Oracle 数据库可以采用不同的压缩算法。







##### 前缀压缩

Oracle 数据库可以使用**前缀**压缩（也称为键压缩）来**压缩** B 树索引或索引组织的表中部分主键列值。前缀压缩可以大大减少索引占用的空间。

未压缩的索引条目具有一个部分。使用前缀压缩的索引条目有两个部分：前缀条目（分组部分）和后缀条目（唯一或几乎唯一部分）。数据库通过在索引块中的后缀条目之间共享前缀条目来实现压缩。

注：如果未将键定义为具有唯一段，则数据库通过将 rowid 附加到分组段来提供一个键。

默认情况下，唯一索引的前缀由除最后一个之外的所有键列组成，而非唯一索引的前缀由所有键列组成。假设您在表的两列上创建一个复合的唯一索引，如下所示：`oe.orders`

```
复制
在订单上创建唯一的索引orders_mod_stat_ix（order_mode，order_status）;
```

在前面的示例中，索引键可能是 。rowid 存储在条目的密钥数据部分，而不是密钥本身的一部分。`online,0`

注：如果在单个列上创建唯一索引，则 Oracle 数据库无法使用前缀键压缩，因为不存在通用前缀。

或者，假设您在相同的列上创建一个非唯一索引：

```
复制
在订单上创建索引orders_mod_stat_ix （ order_mode， order_status ）;
```

还假定 和 列中出现重复值。索引块可以具有如下例所示的条目：`order_mode``order_status`

```
复制在线，0，AAAPvCAAFAAAAFaAAa
在线，0，AAAPvCAAFAAAAFaAAg
在线，0，AAAPvCAAFAAAAFaAAl
online，2，AAAPvCAAFAAAAFaAAm
在线，3，AAAPvCAAFAAAAFaAAq
在线，3，AAAPvCAAFAAAAFaAAt
```

在前面的示例中，键前缀将由 和 值的串联组成，如 中所示。后缀包含在 rowid 中，如 中所示。rowid 使整个索引条目唯一，因为 rowid 本身在数据库中是唯一的。`order_mode``order_status``online,0``AAAPvCAAFAAAAFaAAa`

如果前面示例中的索引是使用默认前缀压缩（由关键字指定）创建的，则将压缩重复的键前缀（如 和 ）。从概念上讲，数据库按如下方式实现压缩：`COMPRESS``online``0``online``3`

```
复制在线，0
AAAPvCAAFAAAAFaAAa
AAAPvCAAFAAAAFaAAg
AAAPvCAAFAAAAFaAAl
在线，2
AAAPvCAAFAAAAFaAAm
在线，3
AAAPvCAAFAAAAFaAAq
AAAPvCAAFAAAAFaAAt
```

后缀条目（rowid）构成索引行的压缩版本。每个后缀条目都引用一个前缀条目，该前缀条目与后缀存储在同一索引块中。

或者，您可以在创建使用前缀压缩的索引时指定前缀长度。例如，如果指定 ，则前缀为 ，后缀为 。对于索引块示例中的值，索引将分解出前缀的重复出现，这些前缀可以在概念上表示如下：`COMPRESS 1``order_mode``order_status,rowid``online`

```
复制在线
0，AAAPvCAAFAAAAFaAAa
0，AAAPvCAAFAAAAFaAAg
0，AAAPvCAAFAAAAFaAAl
2，AAAPvCAAFAAAAFaAAm
3，AAAPvCAAFAAAAFaAAq
3，AAAPvCAAFAAAAFaAAt
```

索引每个叶块最多存储一次特定前缀。仅压缩 B 树索引的叶块中的键。在分支块中，键后缀可以被截断，但键不会被压缩。

另请参阅：

- [*《Oracle 数据库管理员指南》，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11692)了解如何使用压缩索引
- [*Oracle 数据库 VLDB 和分区指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG1111)，了解如何对分区索引使用前缀压缩
- [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53999)，了解 *`key_compression`* 子句的说明`CREATE INDEX`





##### 高级索引压缩

从 Oracle 数据库 12c 第 1 版 （12.1.0.2） 开始，高级索引压缩改进了堆组织表上受支持索引的传统前缀**压缩**。

高级索引压缩的优势

前缀压缩对支持的索引类型、压缩率和易用性有限制。与对每个块使用固定重复键消除的前缀压缩不同，高级索引压缩基于每个块使用自适应重复键消除。高级索引压缩的主要优点是：

- 数据库使用许多内部算法（如列内级前缀、重复键消除和 rowid 压缩）自动为每个块选择最佳压缩。与前缀压缩不同，高级索引压缩不需要用户了解数据特征。
- 高级压缩适用于非唯一*索引和*唯一索引。前缀压缩在某些非唯一索引上效果很好，但在前导列没有很多重复的索引上，比率较低。
- 压缩索引的使用方式与未压缩索引相同。索引支持相同的访问路径：唯一键查找、范围扫描和快速完全扫描。
- 索引可以从父表或包含表空间继承高级压缩。

高级索引压缩的工作原理

高级索引压缩在块级别工作，为每个块提供最佳压缩。数据库使用以下技术：

- 在索引创建期间，当叶块已满时，数据库会自动将块压缩到最佳级别。
- 当由于 DML 而重新组织索引块时，如果数据库可以为传入的索引条目创建足够的空间，则不会发生块拆分。但是，在没有高级索引压缩的 DML 期间，当块变满时，总是会发生索引块拆分。

高级索引压缩 HIGH

在 Oracle Database 12c Release 2 （12.2） 之前的版本中，高级索引压缩的唯一形式是低压缩 （）。现在，您还可以指定高压缩 （），这是默认值。带有该选项的高级索引压缩具有以下优点：`COMPRESS ADVANCED LOW``COMPRESS ADVANCED HIGH``HIGH`

- 在大多数情况下提供更高的压缩率，同时还提高了访问索引的查询的性能
- 采用比高级低压缩更复杂的压缩算法
- 将数据存储在压缩单元中，这是一种特殊的磁盘格式

注意：当您应用`高`压缩时，所有块都有压缩。应用 `LOW` 压缩时，数据库可能会使某些块保持未压缩状态。您可以使用统计信息来确定有多少块未压缩。

示例 3-5 创建具有高级高压缩的索引

此示例为表上的索引启用高级索引压缩：`hr.employees`

```
CopyCREATE INDEX hr.emp_mndp_ix
  ON hr.employees(manager_id, department_id)
  COMPRESS ADVANCED;
```

以下查询显示了压缩的类型：

```
CopySELECT COMPRESSION FROM DBA_INDEXES WHERE INDEX_NAME ='EMP_MNDP_IX';

COMPRESSION
-------------
ADVANCED HIGH
```

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN14308)，了解如何启用高级索引压缩
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53999)，了解 *`key_compression`* 子句的说明`CREATE INDEX`
- 要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-E39825BA-70AC-45D8-AF30-C7FF561373B6)`ALL_INDEXES`





### 位图索引概述

在位图索引中，数据库存储每个索引键的**位图**。在传统的 B 树索引中，一个索引条目指向一行。在位图索引中，每个索引键存储指向多行的指针。

位图索引主要用于数据仓库或查询以即席方式引用许多列的环境。可能需要位图索引的情况包括：

- 索引列的[**基数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5CD22620-6D7A-40DC-BA09-EE3B5339C7F8)较低，即非重复值的数量与表行的数量相比较小。
- 索引表是只读的，或者不受 DML 语句的重大修改。

对于数据仓库示例，该表的列仅包含两个可能的值：和 。假设对特定性别的客户数的查询很常见。在这种情况下，该列将是位图索引的候选项。`sh.customers``cust_gender``M``F``customers.cust_gender`

位图中的每个位对应于一个可能的 rowid。如果设置了位，则具有相应 rowid 的行包含键值。映射函数将位位置转换为实际的 rowid，因此位图索引提供与 B 树索引相同的功能，尽管它使用不同的内部表示形式。

如果更新了单行中的索引列，则数据库将锁定索引键条目（例如，或），而不是映射到更新行的单个位。由于键指向许多行，因此索引数据的 DML 通常会锁定所有这些行。因此，位图索引不适用于许多 [**OLTP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-709E943F-FF0E-4AA6-979A-C4CB2A7B0C29) 应用程序。`M``F`

另请参阅：

- [Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-B5E41901-933E-4A31-B5D6-9771FD435EC0)了解有关位图索引的更多信息
- [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG-GUID-76BAA645-A219-4FF5-AFD4-B6FA8C1473FB)数据仓库指南，了解如何在数据仓库中使用位图索引





#### 示例：单个表上的位图索引

在此示例中，表的某些列是位图索引的候选项。`sh.customers`

请考虑以下查询：

```
CopySQL> SELECT cust_id, cust_last_name, cust_marital_status, cust_gender
  2  FROM   sh.customers 
  3  WHERE  ROWNUM < 8 ORDER BY cust_id;
 
   CUST_ID CUST_LAST_ CUST_MAR C
---------- ---------- -------- -
         1 Kessel              M
         2 Koch                F
         3 Emmerson            M
         4 Hardy               M
         5 Gowen               M
         6 Charles    single   F
         7 Ingram     single   F
 
7 rows selected.
```

和列的基数较低，而 和 没有。因此，位图索引可能适用于 和 。位图索引可能对其他列没有用。相反，这些列上唯一的 B 树索引可能会提供最有效的表示和检索。`cust_marital_status``cust_gender``cust_id``cust_last_name``cust_marital_status``cust_gender`

[表 3-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-4D0B3A22-51F7-4F6E-8F95-B6AD7F9A2729__CBBGCGFC) 说明了前面示例中所示的列输出的位图索引。它由两个单独的位图组成，每个性别一个。`cust_gender`

表 3-4 一列的示例位图

| 价值 | 第 1 行 | 第 2 行 | 第 3 行 | 第 4 行 | 第 5 行 | 第 6 行 | 第 7 行 |
| :--- | :------ | :------ | :------ | :------ | :------ | :------ | :------ |
| `M`  | 1       | 0       | 1       | 1       | 1       | 0       | 0       |
| `F`  | 0       | 1       | 0       | 0       | 0       | 1       | 1       |

映射函数将位图中的每个位转换为表的 rowid。每个位值取决于表中相应行的值。例如，值的位图包含 a 作为其第一个位，因为性别位于表的第一行。位图具有 a 表示第 2、6 和 7 行中的位，因为这些行不包含其值。`customers``M``1``M``customers``cust_gender='M'``0``M`

注：与 B 树索引不同，位图索引可以包含完全由空值组成的键。索引空值对于某些 SQL 语句很有用，例如使用聚合函数 `COUNT` 的查询。

调查客户人口统计趋势的分析师可能会问：“我们有多少女性客户是单身或离婚的？此问题对应于以下 SQL 查询：

```
CopySELECT COUNT(*) 
FROM   customers  
WHERE  cust_gender = 'F' 
AND    cust_marital_status IN ('single', 'divorced'); 
```

位图索引可以通过计算生成的位图中的值数来有效地处理此查询，如[表 3-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-4D0B3A22-51F7-4F6E-8F95-B6AD7F9A2729__CBBGEJDG) 所示。为了识别满足条件的客户，Oracle 数据库可以使用生成的位图来访问该表。`1`

表 3-5 两列的示例位图

| 价值                         | 第 1 行 | 第 2 行 | 第 3 行 | 第 4 行 | 第 5 行 | 第 6 行 | 第 7 行 |
| :--------------------------- | :------ | :------ | :------ | :------ | :------ | :------ | :------ |
| `M`                          | 1       | 0       | 1       | 1       | 1       | 0       | 0       |
| `F`                          | 0       | 1       | 0       | 0       | 0       | 1       | 1       |
| `single`                     | 0       | 0       | 0       | 0       | 0       | 1       | 1       |
| `divorced`                   | 0       | 0       | 0       | 0       | 0       | 0       | 0       |
| `single`或 ，和`divorced``F` | 0       | 0       | 0       | 0       | 0       | 1       | 1       |

位图索引可以有效地合并与子句中的多个条件对应的索引。在访问表本身之前，将筛选出满足某些（但不是全部）条件的行。这种技术通常可以显著缩短响应时间。`WHERE`





#### 位图联接索引

位图联接索引是用于**联接**两个或多个表的**位图索引**。

对于表列中的每个值，索引将相应行的 rowid 存储在索引表中。相反，标准位图索引是在单个表上创建的。

位图联接索引是通过提前执行限制来减少必须联接的数据量的有效方法。有关位图联接索引何时有用的示例，假设用户经常查询具有特定作业类型的员工数。典型的查询可能如下所示：

```
CopySELECT COUNT(*) 
FROM   employees, jobs 
WHERE  employees.job_id = jobs.job_id 
AND    jobs.job_title = 'Accountant';
```

前面的查询通常使用索引 on 检索 的行，然后检索作业 ID，并使用索引 on 来查找匹配的行。若要从索引本身而不是从表扫描中检索数据，可以创建位图联接索引，如下所示：`jobs.job_title``Accountant``employees.job_id`

```
CopyCREATE BITMAP INDEX employees_bm_idx 
ON     employees (jobs.job_title) 
FROM   employees, jobs
WHERE  employees.job_id = jobs.job_id;
```

如下图所示，索引键为 ，索引表为 。`jobs.job_title``employees`

图 3-2 位图连接索引

![图 3-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt239.gif)
[“图 3-2 位图联接索引”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt239.html)

从概念上讲，是以下查询中显示的 SQL 查询中列的索引（包括示例输出）。索引中的键指向表中的行。查询会计人数可以使用索引来避免访问 和 表，因为索引本身包含请求的信息。`employees_bm_idx``jobs.title``job_title``employees``employees``jobs`

```
CopySELECT jobs.job_title AS "jobs.job_title", employees.rowid AS "employees.rowid"
FROM   employees, jobs
WHERE  employees.job_id = jobs.job_id
ORDER BY job_title;
 
jobs.job_title                      employees.rowid
----------------------------------- ------------------
Accountant                          AAAQNKAAFAAAABSAAL
Accountant                          AAAQNKAAFAAAABSAAN
Accountant                          AAAQNKAAFAAAABSAAM
Accountant                          AAAQNKAAFAAAABSAAJ
Accountant                          AAAQNKAAFAAAABSAAK
Accounting Manager                  AAAQNKAAFAAAABTAAH
Administration Assistant            AAAQNKAAFAAAABTAAC
Administration Vice President       AAAQNKAAFAAAABSAAC
Administration Vice President       AAAQNKAAFAAAABSAAB
.
.
.
```

在数据仓库中，[**连接条件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6DF529B9-611D-4C00-BAF8-614E86BCB39E)是维度表的主键列与事实数据表中的外键列之间的等[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DD43111-489E-4F08-9949-AD0C21858DCB)（它使用相等运算符）。位图联接索引在存储方面有时比实例化联接视图更有效，后者是提前具体化联接的替代方法。

另请参阅：

[Oracle 数据库数据仓库指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG9047)了解有关位图联接索引的详细信息





#### 位图存储结构

Oracle 数据库使用 B 树索引结构来存储每个索引键的位图。

例如，如果 是位图索引的键列，则一个 B 树存储索引数据。叶块存储各个位图。`jobs.job_title`

例 3-6 位图存储示例

假定该列具有唯一值 、 和其他几个值。此索引的位图索引条目具有以下组件：`jobs.job_title``Shipping Clerk``Stock Clerk`

- 作为索引键的职务
- 一系列行的低行和高行
- 区域中特定行的位图

从概念上讲，此索引中的索引叶块可以包含如下条目：

```
CopyShipping Clerk,AAAPzRAAFAAAABSABQ,AAAPzRAAFAAAABSABZ,0010000100
Shipping Clerk,AAAPzRAAFAAAABSABa,AAAPzRAAFAAAABSABh,010010
Stock Clerk,AAAPzRAAFAAAABSAAa,AAAPzRAAFAAAABSAAc,1001001100
Stock Clerk,AAAPzRAAFAAAABSAAd,AAAPzRAAFAAAABSAAt,0101001001
Stock Clerk,AAAPzRAAFAAAABSAAu,AAAPzRAAFAAAABSABz,100001
.
.
.
```

同一职务出现在多个条目中，因为 rowid 范围不同。

会话将一个员工的作业 ID 从 更新为 。在这种情况下，会话需要独占访问旧值 （） 和新值 （） 的索引键条目。Oracle 数据库会锁定这两个条目指向的行，但不锁定指向的行或任何其他键，直到提交为止。`Shipping Clerk``Stock Clerk``Shipping Clerk``Stock Clerk``Accountant``UPDATE`

位图索引的数据存储在一个段中。Oracle 数据库将每个位图存储在一个或多个位图中。每个部分都占据单个数据块的一部分。

另请参阅：

“[用户](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-EFB292CB-87EA-42AA-808C-BD85E540BACC)细分”解释了不同类型的细分，以及如何创建细分





### 基于函数的索引概述

基于函数的索引计算涉及一个或多个列的函数或表达式的值，并将其存储在**索引**中。基于函数的索引可以是 B 树或位图索引。

索引函数可以是算术表达式，也可以是包含 SQL 函数、用户定义的 PL/SQL 函数、包函数或 C 标注的表达式。例如，函数可以将两列中的值相加。

另请参阅：

- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-EF5392C6-C38A-4206-BD47-353AD7793557)了解如何创建基于函数的索引
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS-GUID-44AD4D28-A056-4977-B2F7-AC1BC50EDC87)，了解有关使用基于函数的索引的更多信息
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53993)，了解基于函数的索引的限制和使用说明





#### 基于函数的索引的使用

基于函数的索引对于计算在其子句中包含函数的语句非常有效。仅当函数包含在查询中时，数据库才使用基于函数的索引。但是，当数据库处理和语句时，它仍必须计算函数以处理语句。`WHERE``INSERT``UPDATE`

例3-7 基于算术表达式的索引

例如，假设您创建以下基于函数的索引：

```
复制创建索引emp_total_sal_idx
 对员工（12 * 工资 * commission_pct、薪水、commission_pct）;
```

数据库在处理如下查询时可以使用上述索引（包括部分示例输出）：

```
复制选择employee_id、last_name、first_name、
 12*工资*commission_pct作为“年薪”
来自员工
其中（12 * 工资 * commission_pct） < 30000
按“年度销售”描述订购;

EMPLOYEE_ID LAST_NAME FIRST_NAME年度 SAL
----------- ------------------------- -------------------- ----------
 159史密斯·林赛28800
 151伯恩斯坦大卫28500
 152大厅彼得27000
 160多兰路易丝27000
 175赫顿艾丽莎26400
 149兹洛特基埃莱尼25200
 169布鲁姆哈里森24000
```

示例 3-8 基于 UPPER 函数的索引

在 SQL 函数上定义的基于函数的索引*`column_name`*或*`column_name`*便于不区分大小写的搜索。例如，假设 中的列包含大小写混合的字符。在表上创建以下基于函数的索引：`UPPER(``)``LOWER(``)``first_name``employees``hr.employees`

```
复制创建索引emp_fname_uppercase_idx
在员工（上（first_name）;
```

索引可以简化如下查询：`emp_fname_uppercase_idx`

```
复制选择*
来自员工
其中上（first_name）=“奥黛丽”;
```

示例 3-9 为表中的特定行编制索引

基于函数的索引对于仅索引表中的特定行也很有用。例如，表中的列具有 或 作为值。若要仅对行编制索引，可以编写一个函数，该函数为行以外的任何行返回 null 值。您可以按如下方式创建索引：`cust_valid``sh.customers``I``A``A``A`

```
复制创建索引cust_valid_idx
在客户上（当“A”然后“A”结束时cust_valid）;
```

另请参阅：

- [*Oracle 数据库全球化支持指南，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NLSPG294)了解有关语言索引的信息
- [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF51173)，了解有关 SQL 函数的更多信息





#### 使用基于函数的索引进行优化

对于子句中包含表达式的查询，优化程序可以对基于函数的索引使用索引范围扫描。`WHERE`

当谓词具有高度选择性时，即当它选择相对较少的行时，范围扫描[**访问路径**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-56F7FB03-3499-4D51-8D23-F86C45194F09)特别有用。在[示例 3-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-9B3F9FB8-6A17-442B-A294-06CD8096CC10__GUID-66A7BA6D-17B4-4F72-A490-81D10C4A58D6) 中，如果索引是在表达式 上构建的，则[**优化程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)可以使用索引范围扫描。`12*salary*commission_pct`

[**虚拟列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E95FC6AD-C932-4DE2-9D7B-B98D1168E7DA)对于加快对从表达式派生的数据的访问也很有用。例如，可以将虚拟列定义为 并在 上创建基于函数的索引。`annual_sal``12*salary*commission_pct``annual_sal`

优化程序通过解析 SQL 语句中的表达式，然后比较语句的表达式树和基于函数的索引来执行表达式匹配。此比较不区分大小写，并忽略空格。

另请参阅：

- "[优化器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)"
- [Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-245F23B2-24AF-44D8-9F12-99FD1215E878)了解有关收集统计信息的更多信息
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-3BBC0224-E218-422F-803A-B2FE56906E44)，了解如何向表中添加虚拟列





### 应用程序域索引概述

**应用程序域**索引是特定于应用程序的自定义索引。

广泛的索引可以：

- 适应自定义复杂数据类型（如文档、空间数据、图像和视频剪辑）的索引（请参阅“[非结构化数据](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-B39E395E-99FF-4FF1-AC65-E581BD53EFA9)”)
- 利用专门的索引技术

可以将特定于应用程序的索引管理例程封装为 indextype schema对象，然后在表列或对象类型的属性上定义域索引。可扩展的索引可以有效地处理特定于应用程序的运算符。

称为*磁带盒*的应用软件控制域索引的结构和内容。数据库与应用程序交互以生成、维护和搜索域索引。索引结构本身可以作为索引组织的表存储在数据库中，也可以作为文件存储在外部。

另请参阅：

Oracle 数据库数据磁带[*开发人员指南，了解有关在 Oracle 数据库*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADDCI110)可扩展性schema中使用数据磁带库的信息





### 按索引组织的表概述

**索引组织的表**是存储在 B 树索引结构变体中的表。相反，堆**组织的表**在适合的位置插入行。

在按索引组织的表中，行存储在表的主键上定义的索引中。B 树中的每个索引条目还存储非键列值。因此，索引就是数据，数据就是索引。应用程序使用 SQL 语句操作按索引组织的表，就像堆组织的表一样。

为了类比索引组织的表，假设人力资源经理有一个装满纸板箱的书箱。每个盒子都标有一个数字（1、2、3、4 等），但这些盒子不会按顺序放在货架上。相反，每个框都包含一个指针，指向序列中下一个框的架子位置。

包含员工记录的文件夹存储在每个框中。文件夹按员工 ID 排序。员工 King 的 ID 为 100，这是最低的 ID，因此他的文件夹位于框 1 的底部。员工 101 的文件夹位于 100 的顶部，102 位于 101 的顶部，依此类推，直到框 1 已满。序列中的下一个文件夹位于框 2 的底部。

在此类比中，按员工 ID 对文件夹进行排序可以有效地搜索文件夹，而无需维护单独的索引。假设用户请求员工 107、120 和 122 的记录。管理器可以按顺序搜索文件夹并检索找到的每个文件夹，而不是在一个步骤中搜索索引并在单独的步骤中检索文件夹。

按索引组织的表通过主键或键的有效前缀提供对表行的更快访问。叶块中存在行的非键列可避免额外的数据块 I/O。例如，员工 100 的工资存储在索引行本身中。此外，由于行按主键顺序存储，因此主键或前缀的范围访问涉及最少的块 I/O。另一个好处是避免了单独主键索引的空间开销。

当相关数据片段必须存储在一起或数据必须按特定顺序物理存储时，索引组织的表非常有用。此类表的典型用途是用于信息检索、空间数据和 [**OLAP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A6734D1E-A45B-4BE3-ABF8-F6201A40F6B3) 应用程序。

另请参阅：

- "[Oracle 空间和图形概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-F3C48565-B360-40F2-A201-239D614139B5)"
- "[奥拉普](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-8905A5A6-1546-47E8-A7D7-C83E9D7F4903)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01506)了解如何管理按索引组织的表
- [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL866)，了解如何使用按索引组织的表提高性能
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54492)`CREATE TABLE ... ORGANIZATION INDEX`





#### 按索引组织的表特征

数据库系统通过操作 B 树索引结构对按索引组织的表执行所有操作。

下表总结了按索引组织的表和按堆组织的表之间的差异。

表 3-6 堆组织表与索引组织表的比较

| 堆组织表                                                     | 按索引组织的表                                       |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| rowid 唯一标识行。可以选择性地定义主键约束。                 | 主键唯一标识行。必须定义主键约束。                   |
| [**伪列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-175D4923-5C7E-4FF0-A69B-C4D8F3D93A3D)中的物理 rowid 允许构建二级索引。`ROWID` | 伪列中的逻辑 rowid 允许构建二级索引。`ROWID`         |
| 可以通过 rowid 直接访问单个行。                              | 可以通过主键间接实现对单个行的访问。                 |
| 顺序[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)按某种顺序返回所有行。 | 完全索引扫描或快速完整索引扫描按某种顺序返回所有行。 |
| 可以与其他表一起存储在[**一个表集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)中。 | 不能存储在表集群中。                                 |
| 可以包含数据类型的列和 [**LOB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A85748CE-C4D4-43ED-BD49-29AFC4AD3A02) 数据类型的列。`LONG` | 可以包含 LOB 列，但不能包含列。`LONG`                |
| 可以包含虚拟列（仅支持关系堆表）。                           | 不能包含虚拟列。                                     |

[图 3-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-279309E0-3D53-47C5-8FA8-249BD835C88A__CHDJGJHG) 说明了按索引组织的表的结构。叶块包含表的行，按主键顺序排序。例如，第一个叶块中的第一个值显示部门 ID 为 、部门名称 、经理 ID 和位置 ID 。`departments``20``Marketing``201``1800`

图 3-3 按索引组织的表

![图 3-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt272.gif)
[“图 3-3 索引组织的表”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt272.html)

例 3-10 扫描索引组织的表

索引组织的表将所有数据存储在同一结构中，不需要存储 rowid。[如图 3-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-279309E0-3D53-47C5-8FA8-249BD835C88A__CHDJGJHG) 所示，索引组织的表中的叶块 1 可能包含按主键排序的条目如下：

```
Copy20,Marketing,201,1800
30,Purchasing,114,1700
```

按索引组织的表中的叶块 2 可能包含如下条目：

```
Copy50,Shipping,121,1500
60,IT,103,1400
```

按主键顺序扫描按索引组织的表行将按以下顺序读取块：

1. 区块 1
2. 区块 2

例 3-11 堆组织表扫描

要将堆组织的表中的数据访问与索引组织的表进行对比，假设堆组织的表段的块 1 包含如下行：`departments`

```
Copy50,Shipping,121,1500
20,Marketing,201,1800
```

块 2 包含同一表的行，如下所示：

```
Copy30,Purchasing,114,1700
60,IT,103,1400
```

此堆组织的表的 B 树索引叶块包含以下条目，其中第一个值是主键，第二个值是 rowid：

```
Copy20,AAAPeXAAFAAAAAyAAD
30,AAAPeXAAFAAAAAyAAA
50,AAAPeXAAFAAAAAyAAC
60,AAAPeXAAFAAAAAyAAB
```

按主键顺序扫描表行将按以下顺序读取表段块：

1. 区块 1
2. 区块 2
3. 区块 1
4. 区块 2

因此，此示例中的块 I/O 数是索引组织示例中的两倍。

另请参阅：

- "[表组织](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-4C718D65-D7AF-4596-9A31-C11938047224)"

  了解有关堆组织表的详细信息

- "[逻辑存储结构简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-52FE1A8C-74EA-4B81-B1AC-69FD34252659)"

  详细了解段和数据块之间的关系





#### 具有行溢出区域的索引组织的表

创建按索引组织的表时，可以将单独的段指定为行溢出区域。

在按索引组织的表中，B 树索引条目可能很大，因为它们包含整行，因此包含条目的单独段很有用。相比之下，B树条目通常很小，因为它们由键和rowid组成。

如果指定了行溢出区域，则数据库可以将索引组织的表中的行划分为以下部分：

- 索引条目

  此部分包含所有主键列的列值、指向行溢出部分的物理 rowid，以及可选的一些非键列。此部分存储在索引段中。

- 溢流部分

  此部分包含其余非键列的列值。此部分存储在溢出存储区段中。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11685)，了解如何使用 的子句设置行溢出区域`OVERFLOW``CREATE TABLE`
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54499)`CREATE TABLE ... OVERFLOW`





#### 按索引组织的表上的二级索引

二级索引是按索引组织的表上的**索引**。

从某种意义上说，二级索引是索引上的索引。它是一个独立的schema对象，与按索引组织的表分开存储。

Oracle 数据库对索引组织的表使用称为逻辑行 Rowid 的行标识符。[**逻辑 rowid**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-92AE2643-9DA4-4364-942F-81F006759302) 是表主键的 base64 编码表示形式。逻辑 rowid 长度取决于主键长度。

由于插入，索引叶块中的行可以在块内或块之间移动。按索引组织的表中的行不会像堆组织的行那样迁移。由于按索引组织的表中的行没有永久物理地址，因此数据库使用基于主键的逻辑 rowid。

例如，假定表是按索引组织的。该列存储每个部门的 ID。该表按如下方式存储行，最后一个值作为位置 ID：`departments``location_id`

```
Copy10,Administration,200,1700
20,Marketing,201,1800
30,Purchasing,114,1700
40,Human Resources,203,2400
```

列上的二级索引可能具有如下索引条目，其中逗号后面的值是逻辑 rowid：`location_id`

```
Copy1700,*BAFAJqoCwR/+ 
1700,*BAFAJqoCwQv+
1800,*BAFAJqoCwRX+
2400,*BAFAJqoCwSn+
```

二级索引使用既不是主键也不是主键前缀的列，提供对按索引组织的表的快速有效的访问。例如，查询 ID 大于 1700 的部门名称可以使用二级索引来加快数据访问速度。

另请参阅：

- “[Rowid 数据类型](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-0258C4C2-2BF2-445F-B1E1-F282A57A6859)”以了解有关 rowid 和伪列使用的更多信息`ROWID`

- "[链接和迁移的行](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-49D4E586-57BF-4310-9EE9-2DD54108E651)"

  了解为什么迁移行，以及为什么迁移会增加 I/O 的数量

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11696)，了解如何在按索引组织的表上创建二级索引

- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG003)，了解如何在索引组织的表分区上创建二级索引





##### 逻辑吵闹和物理猜测

二级索引使用逻辑 rowid 来查找表行。

逻辑 rowid 包括**物理猜测**，这是索引条目首次创建时的物理 rowid。Oracle 数据库可以使用物理猜测直接探测索引组织的表的叶块，从而绕过主键搜索。当行的物理位置更改时，逻辑 rowid 仍然有效，即使它包含过时的物理猜测也是如此。

对于堆组织的表，二级索引的访问涉及扫描二级索引和额外的 I/O 来获取包含该行的数据块。对于按索引组织的表，二级索引的访问会有所不同，具体取决于物理猜测的用途和准确性：

- 在没有物理猜测的情况下，访问涉及两个索引扫描：扫描二级索引，然后扫描主键索引。
- 通过物理猜测，访问取决于其准确性：
  - 通过准确的物理猜测，访问涉及辅助索引扫描和额外的 I/O，以提取包含该行的数据块。
  - 对于不准确的物理猜测，访问涉及辅助索引扫描和 I/O 以获取错误的数据块（如猜测所示），然后按主键值对索引组织表进行索引唯一扫描。





##### 按索引组织的表上的位图索引

按索引组织的表上的二级索引可以是**位图索引**。位图索引存储每个索引键的位图。

当位图索引存在于按索引组织的表上时，所有位图索引都使用堆组织的映射表。映射表存储按索引组织的表的逻辑行 ID。每个映射表行为相应的索引组织的表行存储一个逻辑 rowid。

数据库使用搜索键访问位图索引。如果数据库找到键，则位图条目将转换为物理 rowid。对于堆组织的表，数据库使用物理 rowid 来访问基表。对于按索引组织的表，数据库使用物理 rowid 来访问映射表，这反过来又生成数据库用于访问索引组织的表的逻辑 rowid。下图说明了表查询的索引访问。`departments_iot`

图 3-4 按索引组织的表上的位图索引

![图 3-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt330.gif)
[“图 3-4 索引组织的表上的位图索引”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt330.html)

注：在按索引组织的表中移动行不会使基于该按索引组织的表构建的位图索引不可用。

另请参阅：

“[Rowids of Row Pieces](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-83BDB6CC-8CE1-44FE-9BCB-B018AC316FFC)”，了解物理和逻辑 rowid 之间的区别

## 4 分区、视图和其他schema对象

尽管表和索引是最重要和最常用的模式对象，但数据库支持许多其他类型的模式对象，本章将讨论其中最常见的模式对象。

本章包含以下部分：

- [分区概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-91498562-1809-4E67-B7AD-9718ED60DEFF)
- [分片表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-4C8C435A-4CB0-4094-A77C-5AD4737BBB16)
- [视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-15E7AEDB-9A3F-4B31-AD2D-66253CC822E5)
- [实例化视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-2822B62B-CAF3-4DCE-B4D6-5E677FB8A829)
- [序列概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-29E19A46-D91F-4EEB-BD0C-E65A89F2F59B)
- [尺寸概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-84D64C39-D8E8-4706-B4E3-519FE2CEE4C2)
- [同义词概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-4977D7F8-B766-4F4A-8FF6-B8496DED3DF2)





### 分区概述

在 Oracle 数据库中，分区使您能够将非常大的表和索引分解为更小且更易于管理的部分，称为**分区**。每个分区都是一个独立的对象，具有自己的名称和可选的存储特征。

为了进行说明分区的类比，假设人力资源经理有一个包含员工文件夹的大框。每个文件夹都列出员工雇用日期。查询通常是针对特定月份雇用的员工进行的。满足此类请求的一种方法是在员工雇用日期创建一个索引，该索引指定分散在整个框中的文件夹的位置。相比之下，分区策略使用许多较小的框，每个框包含给定月份雇用的员工的文件夹。

使用较小的盒子有几个优点。当要求检索 6 月份雇用的员工的文件夹时，人力资源经理可以检索 6 月份的框。此外，如果任何小盒子暂时损坏，其他小盒子仍然可用。搬办公室也变得更容易，因为经理可以搬几个小箱子，而不是移动一个沉重的箱子。

从应用程序的角度来看，仅存在一个schema对象。SQL 语句无需修改即可访问分区表。分区对于许多不同类型的数据库应用程序非常有用，尤其是那些管理大量数据的数据库应用程序。好处包括：

- 提高可用性

  分区不可用不会导致对象不可用。查询[**优化器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)会自动从[**查询计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)中删除未引用的分区，以便在分区不可用时查询不受影响。

- 更轻松地管理schema对象

  分区对象具有可以集体或单独管理的片段。[**DDL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64F19D78-A73F-44A5-AA2E-60EBC800CB22) 语句可以操作分区，而不是整个表或索引。因此，您可以分解资源密集型任务，例如重建索引或表。例如，可以一次移动一个表分区。如果出现问题，则只需重做分区移动，而不必重做表移动。此外，删除分区可以避免执行大量语句。`DELETE`

- 减少了 [**OLTP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-709E943F-FF0E-4AA6-979A-C4CB2A7B0C29) 系统中对共享资源的争用

  在某些 OLTP 系统中，分区可以减少对共享资源的争用。例如，DML 分布在许多段上，而不是一个段上。

- 增强的数据仓库中的查询性能

  在[**数据仓库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0881E18F-D245-4980-8272-64964B64E3CC)中，分区可以加快即席查询的处理速度。例如，包含一百万行的销售表可以按季度进行分区。

另请参阅：

[Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG00101)，了解分区简介





#### 分区特征

表或索引的每个分区必须具有相同的逻辑属性，例如列名、数据类型和约束。

例如，表中的所有分区共享相同的列和约束定义。但是，每个分区可以具有单独的物理属性，例如它所属的表空间。





##### 分区键

分区**键**是一组由一列或多列组成的列，用于确定分区表中每一行应位于的分区。每一行都明确地分配给单个分区。

在表中，可以将列指定为范围分区的键。数据库根据此列中的日期是否在指定范围内将行分配给分区。Oracle 数据库使用分区键自动将插入、更新和删除操作定向到相应的分区。`sales``time_id`





##### 分区策略

Oracle 分区提供了多种分区策略，用于控制数据库将数据放入分区的方式。基本策略是范围、列表和哈希分区。

[**单级**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-33A45DE7-008D-4724-9BCC-9CEA6ED95337)分区仅使用一种数据分发方法，例如，仅列表分区或仅范围分区。在[**复合**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2CBB2535-77AE-43F7-97C9-5AB9543A4742)分区中，表由一种数据分布方法分区，然后使用第二种数据分布方法将每个分区进一步划分为子分区。例如，可以将 的列表分区和 的范围子分区用于 。`channel_id``time_id`

例 4-1 分区表的示例行集

此分区示例假定您要使用以下行填充分区表：`sales`

```
复制  PROD_ID    CUST_ID TIME_ID   CHANNEL_ID   PROMO_ID QUANTITY_SOLD AMOUNT_SOLD
---------- ---------- --------- ---------- ---------- ------------- -----------
      116      11393 05-JUN-99          2        999             1       12.18
       40     100530 30-NOV-98          9         33             1       44.99
      118        133 06-JUN-01          2        999             1       17.12
      133       9450 01-DEC-00          2        999             1       31.28
       36       4523 27-JAN-99          3        999             1       53.89
      125       9417 04-FEB-98          3        999             1       16.86
       30        170 23-FEB-01          2        999             1         8.8
       24      11899 26-JUN-99          4        999             1       43.04
       35       2606 17-FEB-00          3        999             1       54.94
       45       9491 28-AUG-98          4        350             1       47.45 
```





###### 范围分区

在范围分区中，数据库根据分区键的值范围将行映射到**分区**。范围分区是最常见的分区类型，通常与日期一起使用。

假设您使用以下 SQL 语句创建为分区表，并将列作为分区键：`time_range_sales``time_id`

```
复制创建表time_range_sales
 （ prod_id编号（6）
 、cust_id编号
 、time_id日期
 ， channel_id字符（1）
 ， promo_id编号（6）
 ， quantity_sold编号（3）
 ， amount_sold编号（10，2）
 )
按范围划分 （time_id）
 （分区SALES_1998小于 （TO_DATE（'01-JAN-1999'，'DD-MON-YYYY'）），
 分区SALES_1999小于 （TO_DATE（'01-JAN-2000'，'DD-MON-YYYY'）），
 分区SALES_2000小于 （TO_DATE（'01-JAN-2001'，'DD-MON-YYYY'）），
 分区SALES_2001小于（最大值）的值
 );
```

之后，加载[示例 4-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-D3245D07-22AF-4F96-8F87-E70CF7A67914__BABCHIID) 中的行。该代码显示了四个分区中的行分布。数据库根据子句中指定的规则，根据值为每一行选择分区。范围分区键值确定指定分区的非包含上限。`time_range_sales``time_id``PARTITION BY RANGE`



###### 间隔分区

**间隔**分区是范围分区的扩展。

如果插入的数据超出现有范围分区，则 Oracle 数据库会自动创建指定间隔的分区。例如，您可以创建一个销售历史记录表，该表将每个月的数据存储在单独的分区中。

间隔分区使您能够避免显式创建范围分区。您可以对几乎每个范围分区的表使用间隔分区，并对新分区使用固定间隔。除非创建具有不同间隔的范围分区，或者除非始终设置特定的分区属性，否则请考虑使用间隔分区。

按间隔分区时，必须至少指定一个范围分区。范围分区键值确定范围分区的高值，称为[**转换点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B22E1450-CB82-4771-ACF3-0243C4748951)。数据库会自动为值超出转换点的数据创建间隔分区。每个间隔分区的下边界是前一个范围或间隔分区的包含上限。因此，在[示例 4-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-385857B7-3AEF-48DD-A965-3CBD2A18E5C3__GUID-20408ADA-536A-4812-A4D2-14008BE09D3A) 中，值位于分区中。`01-JAN-2011``p2`

数据库为转换点以外的数据创建间隔分区。间隔分区通过指示数据库创建指定范围或间隔的分区来扩展范围[**分区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-553D825F-C025-4BA5-80F3-86BBC6047B03)。当插入到表中的数据超过所有现有范围分区时，数据库会自动创建分区。在[示例 4-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-385857B7-3AEF-48DD-A965-3CBD2A18E5C3__GUID-20408ADA-536A-4812-A4D2-14008BE09D3A) 中，分区包含分区键值大于或等于 的行。`p3``time_id``01-JAN-2013`

例 4-2 间隔分区

假设您创建一个具有四个不同宽度的分区的销售表。您指定在 1 年 2013 月 <> 日的转换点以上，数据库应每隔一个月创建分区。分区的上限表示过渡点。分区及其下的所有分区都位于范围部分中，而其上方的所有分区都属于间隔部分。`p3``p3`

```
CopyCREATE TABLE interval_sales
    ( prod_id        NUMBER(6)
    , cust_id        NUMBER
    , time_id        DATE
    , channel_id     CHAR(1)
    , promo_id       NUMBER(6)
    , quantity_sold  NUMBER(3)
    , amount_sold    NUMBER(10,2)
    ) 
  PARTITION BY RANGE (time_id) 
  INTERVAL(NUMTOYMINTERVAL(1, 'MONTH'))
    ( PARTITION p0 VALUES LESS THAN (TO_DATE('1-1-2010', 'DD-MM-YYYY'))
    , PARTITION p1 VALUES LESS THAN (TO_DATE('1-1-2011', 'DD-MM-YYYY'))
    , PARTITION p2 VALUES LESS THAN (TO_DATE('1-7-2012', 'DD-MM-YYYY'))
    , PARTITION p3 VALUES LESS THAN (TO_DATE('1-1-2013', 'DD-MM-YYYY')) );
```

您插入 10 年 2014 月 <> 日当天进行的销售：

```
CopySQL> INSERT INTO interval_sales VALUES (39,7602,'10-OCT-14',9,null,1,11.79);

1 row created.
```

的查询显示数据库为 10 月 <> 日促销创建了一个新分区，因为销售日期晚于转换点：`USER_TAB_PARTITIONS`

```
CopySQL> COL PNAME FORMAT a9
SQL> COL HIGH_VALUE FORMAT a40
SQL> SELECT PARTITION_NAME AS PNAME, HIGH_VALUE 
  2  FROM USER_TAB_PARTITIONS WHERE TABLE_NAME = 'INTERVAL_SALES';

PNAME     HIGH_VALUE
--------- ----------------------------------------
P0        TO_DATE(' 2007-01-01 00:00:00', 'SYYYY-M
          M-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIA
P1        TO_DATE(' 2008-01-01 00:00:00', 'SYYYY-M
          M-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIA
P2        TO_DATE(' 2009-07-01 00:00:00', 'SYYYY-M
          M-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIA
P3        TO_DATE(' 2010-01-01 00:00:00', 'SYYYY-M
          M-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIA
SYS_P1598 TO_DATE(' 2014-11-01 00:00:00', 'SYYYY-M
          M-DD HH24:MI:SS', 'NLS_CALENDAR=GREGORIA
```

另请参阅：

[Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG-GUID-C121EA1B-2725-4464-B2C9-EEDE0C3C95AB)，了解有关间隔分区的更多信息





###### 列表分区

在**列表**分区中，数据库使用离散值列表作为每个分区的分区键。分区键由一列或多列组成。

可以使用列表分区来控制各个行映射到特定分区的方式。通过使用列表，您可以在用于标识相关数据集的键未方便地排序时对相关数据集进行分组和组织。

例 4-3 列表分区

假设使用以下语句创建为列表分区表，其中列是分区键：`list_sales``channel_id`

```
CopyCREATE TABLE list_sales
   ( prod_id        NUMBER(6)
   , cust_id        NUMBER
   , time_id        DATE
   , channel_id     CHAR(1)
   , promo_id       NUMBER(6)
   , quantity_sold  NUMBER(3)
   , amount_sold    NUMBER(10,2)
   )
PARTITION BY LIST (channel_id)
 ( PARTITION even_channels VALUES ('2','4'),
   PARTITION odd_channels VALUES ('3','9')
 ); 
```

然后，使用[示例 4-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-D3245D07-22AF-4F96-8F87-E70CF7A67914__BABCHIID) 中的行加载表。该代码显示了两个分区中的行分布。数据库根据子句中指定的规则，根据值为每一行选择分区。值为 2 或 4 的行存储在分区中，而值为 3 或 9 的行存储在分区中。`channel_id``PARTITION BY LIST``channel_id``EVEN_CHANNELS``channel_id``ODD_CHANNELS`





###### 哈希分区

在哈希分区中，数据库根据数据库应用于用户指定的分区键的哈希算法将行映射到**分区**。

行的目标由数据库应用于该行的内部[**哈希函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DDDDC4BC-ADB8-40D7-9733-60CED8E4A83E)确定。当分区数为 2 的幂时，哈希算法会在所有分区中创建大致均匀的行分布。

哈希分区对于划分大型表以提高可管理性非常有用。您不必管理一个大表，而是有几个较小的部分。单个哈希分区的丢失不会影响其余分区，并且可以独立恢复。哈希分区在具有高更新争用的 [**OLTP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-709E943F-FF0E-4AA6-979A-C4CB2A7B0C29) 系统中也很有用。例如，将段分为多个部分，每个部分都会更新，而不是遇到争用的单个段。

假设使用以下语句创建分区表，并将列作为分区键：`hash_sales``prod_id`

```
CopyCREATE TABLE hash_sales
   ( prod_id        NUMBER(6)
   , cust_id        NUMBER
   , time_id        DATE
   , channel_id     CHAR(1)
   , promo_id       NUMBER(6)
   , quantity_sold  NUMBER(3)
   , amount_sold    NUMBER(10,2)
   )
PARTITION BY HASH (prod_id)
PARTITIONS 2; 
```

然后，使用[示例 4-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-D3245D07-22AF-4F96-8F87-E70CF7A67914__BABCHIID) 中的行加载表。该代码显示了两个分区中可能的行分布。这些分区的名称是系统生成的。

插入行时，数据库会尝试在分区之间随机均匀地分布行。不能指定放置行的分区。数据库应用哈希函数，其结果确定哪个分区包含该行。

另请参阅：

- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG003)，了解如何创建分区
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54655)示例`CREATE TABLE ... PARTITION BY`



###### 引用分区

在**引用分区**中，子表的分区策略仅通过与父表的外键关系来定义。对于父表中的每个分区，子表中正好存在一个相应的分区。父表将父记录存储在特定分区中，子表将子记录存储在相应的分区中。

例如，表是表的父级，主键和外键在 上定义。这些表按引用进行分区。例如，如果数据库将订单 233 存储在 的分区中，则数据库将订单 233 的所有行项目存储在 的分区中。如果将分区添加到 ，则数据库会自动添加到 。`orders``line_items``order_id``Q3_2015``orders``Q3_2015``line_items``Q4_2015``orders``Q4_2015``line_items`

引用分区的优点是：

- 通过对父表和子表使用相同的分区策略，可以避免复制所有分区键列。此策略减少了非规范化的手动开销，并节省了空间。
- 对父表的维护操作会自动在子表上进行。例如，将分区添加到主表时，数据库会自动将此添加项传播到其后代。
- 数据库会自动使用父表和子表中分区的分区连接，从而提高性能。

可以将引用分区与所有基本分区策略（包括间隔分区）一起使用。还可以将引用分区表创建为复合分区表。

例 4-4 创建引用分区表

此示例创建一个父表订单，该订单在 上按范围分区。引用分区的子表由四个分区 、、 和 创建，其中每个分区都包含与相应父分区中的订单对应的行。`order_date``order_items``Q1_2015``Q2_2015``Q3_2015``Q4_2015``order_items`

```
CopyCREATE TABLE orders
    ( order_id           NUMBER(12),
      order_date         DATE,
      order_mode         VARCHAR2(8),
      customer_id        NUMBER(6),
      order_status       NUMBER(2),
      order_total        NUMBER(8,2),
      sales_rep_id       NUMBER(6),
      promotion_id       NUMBER(6),
      CONSTRAINT orders_pk PRIMARY KEY(order_id)
    )
  PARTITION BY RANGE(order_date)
    ( PARTITION Q1_2015 VALUES LESS THAN (TO_DATE('01-APR-2015','DD-MON-YYYY')),
      PARTITION Q2_2015 VALUES LESS THAN (TO_DATE('01-JUL-2015','DD-MON-YYYY')),
      PARTITION Q3_2015 VALUES LESS THAN (TO_DATE('01-OCT-2015','DD-MON-YYYY')),
      PARTITION Q4_2015 VALUES LESS THAN (TO_DATE('01-JAN-2006','DD-MON-YYYY'))
    );

CREATE TABLE order_items
    ( order_id           NUMBER(12) NOT NULL,
      line_item_id       NUMBER(3)  NOT NULL,
      product_id         NUMBER(6)  NOT NULL,
      unit_price         NUMBER(8,2),
      quantity           NUMBER(8),
      CONSTRAINT order_items_fk
      FOREIGN KEY(order_id) REFERENCES orders(order_id)
    )
    PARTITION BY REFERENCE(order_items_fk);
```

另请参阅：

[Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG-GUID-54D18B18-6838-4115-9389-E1FB0D20A8CA)，了解引用分区概述



###### 复合分区

在**复合**分区中，表通过一种数据分发方法进行分区，然后使用第二种数据分发方法将每个分区进一步细分为子分区。因此，复合分区结合了基本的数据分发方法。给定分区的所有子分区表示数据的逻辑子集。

复合分区具有以下几个优点：

- 根据 SQL 语句，在一个或两个维度上进行分区修剪可能会提高性能。
- 查询可能能够在任一维度上使用完全或部分分区联接。
- 您可以对单个表执行并行备份和恢复。
- 分区数大于单级分区，这可能有利于并行执行。
- 如果许多语句可以从分区修剪或分区连接中受益，则可以实现滚动窗口以支持历史数据，并且仍然可以在另一个维度上进行分区。
- 可以根据分区键的标识以不同的方式存储数据。例如，您可能决定以只读的压缩格式存储特定产品类型的数据，并保持其他产品类型数据未压缩。

范围、列表和哈希分区有资格作为复合分区表的子分区策略。下图提供了范围哈希和范围列表复合分区的图形视图。

图 4-1 复合范围列表分区

![图 4-1 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/vldbg009.gif)
[“图 4-1 复合范围列表分区”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/vldbg009.html)

数据库将复合分区表中的每个子分区存储为单独的[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。因此，子分区属性可能不同于表的属性或子分区所属的分区。

另请参阅：

[Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-BE424ACC-F746-4CA8-973C-F578CF98FF10)，了解有关复合分区的更多信息





#### 分区表

分区**表**由一个或多个分区组成，这些分区单独管理，可以独立于其他分区运行。

表可以是分区的，也可以是非分区的。即使分区表仅包含一个分区，此表也不同于不能向其添加分区的非分区表。

另请参阅：

分区表示例的“[分区特征](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-E3C5EDAA-01F2-4077-915E-133045C43095)”

“索引[组织表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DAEC075B-C16D-4A57-898C-70EBCB364F0C)”，了解索引组织的表的用途和特征，这些表还可以从提供改进的可管理性、可用性和性能的分区中受益。



##### 分区表的段

分区表由一个或多个表分区段组成。

如果创建名为 的分区表，则不会为此表分配任何表[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。相反，数据库将每个表分区的数据存储在其自己的分区段中。每个表分区段都包含表数据的一部分。`hash_products`

对外部[**表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1B18B978-29DD-4961-BD39-86838CB5F7D0)进行分区时，所有分区都驻留在数据库外部。在混合分区表中，某些分区存储在段中，而其他分区存储在外部。例如，表的某些分区可能存储在数据文件中，而其他分区可能存储在电子表格中。`sales`

另请参阅：

- "[外部表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97FC9DFF-A6CF-46CD-9F6F-D88A37C0E79C)"

- "[细分市场概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-7DA83E64-9FF1-45A7-A9AC-D4997DDE0866)"

  了解对象和线段之间的关系



##### 分区表的压缩

堆组织表的部分或全部分区可以以压缩格式存储。

压缩可节省空间并加快查询执行速度。因此，压缩在插入和更新操作量较小的数据仓库等环境中以及在 OLTP 环境中非常有用。

您可以声明表空间、表或表分区的[**表压缩**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9C21768F-A722-47F1-B54C-5563BDA38074)属性。如果在表空间级别声明，则默认情况下会压缩在表空间中创建的表。您可以更改表的压缩属性，在这种情况下，更改仅适用于进入该表的新数据。因此，单个表或分区可能包含压缩块和未压缩块，这保证了数据大小不会因压缩而增加。如果压缩可能会增加块的大小，则数据库不会将其应用于块。

另请参阅：

- “表压缩”，了解表压缩的类型，包括基本、高级行和混合列式[压缩](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-54EE5325-0894-4869-B3AD-8912D9B4A329)
- [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8913)数据仓库指南，了解数据仓库中的表压缩





#### 分区索引

分区索引是与分区表一样，已划分为更小且更易于管理的部分的**索引**。

全局索引的分区独立于创建它们的表，而本地索引自动链接到表的分区方法。与分区表一样，分区索引可提高可管理性、可用性、性能和可伸缩性。

下图显示了索引分区选项。

图 4-2 索引分区选项

![Description of Figure 4-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt301.gif)
[“图 4-2 索引分区选项”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt301.html)

另请参阅：

- “索引[简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DE7A95BC-6E4A-47EA-9FC5-B85B54F8CF41)”，了解唯一索引和非唯一索引之间的区别，以及不同的索引类型
- [Oracle 数据库 VLDB 和分区指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG00203)了解有关分区索引以及如何确定要使用的类型的详细信息





##### 本地分区索引

在本地分区索引中，索引与其表在相同的列上**分区**，具有相同的分区数和相同的分区边界。

每个索引分区只与基础表的一个分区相关联，因此索引分区中的所有键仅引用存储在单个表分区中的行。这样，数据库会自动将索引分区与其关联的表分区同步，从而使每个表索引对独立。

本地分区索引在数据仓库环境中很常见。本地索引具有以下优点：

- 可用性提高，因为使分区中的数据无效或不可用的操作仅影响此分区。
- 简化了分区维护。移动表分区时，或者当数据老化出分区时，只需重建或维护关联的本地索引分区。在全局索引中，必须重建或维护所有索引分区。
- 如果发生分区的时间点恢复，则可以将索引恢复到恢复时间（请参阅“[数据文件恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-7F5703F9-CAE5-4736-895B-B45A51974A7C)”）。不需要重新生成整个索引。

哈希分区中的示例显示了分区表的创建语句，使用列作为[分区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-4BF963D2-948F-45C5-B015-B5E329A513D0)键。下面的示例在表的列上创建本地分区索引：`hash_sales``prod_id``time_id``hash_sales`

```
CopyCREATE INDEX hash_sales_idx ON hash_sales(time_id) LOCAL;
```

在[图 4-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-4A4464E1-500F-4BB6-85E4-7D2E637A47FF__CFAIJFJI) 中，该表有两个分区，因此有两个分区。每个索引分区都与不同的表分区相关联。索引分区索引表分区中的行，而索引分区索引表分区中的行。`hash_products``hash_sales_idx``SYS_P38``SYS_P33``SYS_P39``SYS_P34`

图 4-3 本地索引分区

![Description of Figure 4-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt302.gif)
[“图 4-3 本地索引分区”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt302.html)

不能显式将分区添加到本地索引。相反，仅当您将分区添加到基础表时，才会将新分区添加到本地索引。同样，不能从本地索引显式删除分区。相反，仅当您从基础表中删除分区时，才会删除本地索引分区。

与其他索引一样，可以在分区表上创建[**位图索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-20C91FE3-E7A0-44AC-8AC1-9C4301877B65)。唯一的限制是位图索引必须是分区表的本地索引，它们不能是全局索引。全局位图索引仅在非分区表上受支持。





###### 本地前缀和不带前缀的索引

本地分区索引有前缀或无前缀。

索引子类型定义如下：

- 本地前缀索引

  在这种情况下，分区键位于索引定义的前沿。在范围分区的示例中，表按 上的范围进行[分区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-BF8A8838-DA69-4872-A42A-0C64FA3BD967)。此表上的本地前缀索引将作为其列表中的第一列。`time_range_sales``time_id``time_id`

- 本地非前缀索引

  在这种情况下，分区键不在索引列列表的前缘，根本不需要在列表中。在本地分区索引中的示例中，索引是本地无前缀的，因为[分区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-4A4464E1-500F-4BB6-85E4-7D2E637A47FF)键不在前缘上。`hash_sales_idx``product_id`

这两种类型的索引都可以利用分区[**消除**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-17D46EB4-6C99-419E-86D7-91C4370BE8BF)（也称为*分区修剪*），当优化程序通过从考虑范围中排除分区来加快数据访问速度时，就会发生这种情况。查询是否可以消除分区取决于[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)[**谓词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-891CF9E9-78CD-470C-9C4A-D65A101B2C38)。使用本地前缀索引的查询始终允许消除索引分区，而使用本地无前缀索引的查询可能不允许。

另请参阅：

[Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG1251)，了解如何使用带前缀和不带前缀的索引





###### 本地分区索引存储

与表分区一样，本地索引分区存储在其自己的段中。每个段包含总索引数据的一部分。因此，由四个分区组成的本地索引不是存储在单个索引段中，而是存储在四个单独的段中。

另请参阅：

[*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54053)示例`CREATE INDEX ... LOCAL`





##### 全局分区索引

**全局分区索引**是独立于创建它的基础表进行分区的 B 树索引。单个索引分区可以指向任何或所有表分区，而在本地分区索引中，索引分区和表分区之间存在一对一奇偶校验。

通常，全局索引对于 OLTP 应用程序非常有用，在这些应用程序中，快速访问、数据完整性和可用性非常重要。在 OLTP 系统中，表可以按一个键（例如列）进行分区，但应用程序可能需要使用许多不同的键（例如，按 或 ）访问数据。在这种情况下，全局索引可能很有用。`employees.department_id``employee_id``job_id`

例如，假设您从“[范围分区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-BF8A8838-DA69-4872-A42A-0C64FA3BD967)”在表上创建一个全局分区索引。在此表中，1998 年的销售行存储在一个分区中，1999 年的销售行存储在另一个分区中，依此类推。下面的示例在列上创建一个按区域分区的全局索引：`time_range_sales``channel_id`

```
CopyCREATE INDEX time_channel_sales_idx ON time_range_sales (channel_id)
   GLOBAL PARTITION BY RANGE (channel_id)
      (PARTITION p1 VALUES LESS THAN (3),
       PARTITION p2 VALUES LESS THAN (4),
       PARTITION p3 VALUES LESS THAN (MAXVALUE));
```

如图 [4-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-A4544386-B1BF-418E-8B32-CFB069FF55DB__CFAEBFFA) 所示，全局索引分区可以包含指向多个表分区的条目。索引分区指向 a 为 2 的行，索引分区指向 a 为 3 的行，索引分区指向 a 为 4 或 9 的行。`p1``channel_id``p2``channel_id``p3``channel_id`

图 4-4 全局分区索引

![Description of Figure 4-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt300.gif)
[“图 4-4 全局分区索引”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt300.html)

另请参阅：

- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG1256)，了解如何管理全局分区索引
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54012)以了解`GLOBAL PARTITION``CREATE INDEX`





#### 分区表的部分索引

**分部**索引是与关联分区表的索引属性关联的索引。

通过关联，您可以指定为哪些表分区编制索引。分部索引具有以下优点：

- 未编制索引的表分区可避免消耗不必要的索引存储空间。

- 加载和查询的性能可以提高。

  在 Oracle Database 12c 之前，交换分区操作需要对关联的全局索引进行物理更新，以将其保留为可用。从 Oracle Database 12c 开始，如果分区维护操作中涉及的分区不是部分全局索引的一部分，则该索引仍然可用，而无需任何全局索引维护。

- 如果在创建索引时仅索引某些表分区，并且稍后为其他分区编制索引，则可以减少创建索引所需的排序空间。

您可以为表的各个分区打开或关闭索引。对于已关闭索引的所有表分区，部分本地索引没有可用的索引分区。全局索引（无论是否分区）都会从已关闭索引的所有分区中排除数据。数据库不支持强制实施唯一约束的索引的部分索引。

图 4-5 显示了与[图 4-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-D3223210-7B9A-4DB0-A213-F819E0DAF316__CHDGFHDC) 中相同的全局索引，只是全局索引是部分索引。表分区，并将索引属性设置为 ，因此部分全局索引不会为它们编制索引。`SALES_1998``SALES_2000``OFF`

图 4-5 部分全局分区索引

![Description of Figure 4-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt342.png)
[“图 4-5 部分全局分区索引”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt342.html)



### 分片表概述

在 Oracle 数据库中，分片使您能够将大型表分解为更易于管理的部分，称为分片，这些部分可以存储在多个数据库中。

每个数据库都托管在具有自己的本地资源（CPU、内存、闪存或磁盘）的专用服务器上。 此类配置中的每个数据库称为**分片**。 所有碎片一起组成 向上单个逻辑数据库，称为**分片 数据库**。

水平分区涉及跨分片拆分数据库表，以便每个分片包含具有相同列但行子集不同的表。以这种方式拆分的表也称为**分片表**。

下图显示了跨三个分片水平分区的表。

图 4-6 跨分片水平分区表

![图 4-6 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin_3v_134a.png)
[“图 4-6 跨分片的水平分区表”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin_3v_134a.html)

分片基于无共享硬件基础设施，它消除了单点故障，因为分片不共享 CPU、内存或存储设备等物理资源。分片在软件方面也是松散耦合的;它们不运行群集件。

分片通常托管在专用服务器上。这些服务器可以是商用硬件或工程系统。分片可以在单个实例或 Oracle RAC 数据库上运行。它们可以放置在本地、云中或混合本地和云配置中。

从数据库管理员的角度来看，SDB 由多个数据库组成，这些数据库可以集体或单独管理。但是，从应用程序的角度来看，SDB 看起来像单个数据库：分片的数量和跨这些分片的数据分布对数据库应用程序是完全透明的。

分片适用于适用于分片数据库schema的自定义 OLTP 应用程序。使用分片的应用程序必须具有定义良好的数据模型和数据分发策略（一致的哈希、范围、列表或复合），主要使用分片键访问数据。分片键的示例包括 、 或 。`customer_id``account_no``country_id`

另请参阅：

[使用预言机分片](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SHARD-GUID-0F39B1FB-DCF9-4C8A-A2EA-88705B90C5BF)



#### 分片表

分片表是在多个数据库（称为分片）中划分为更小且更易于管理的部分的表。

Oracle 分片基于 Oracle 数据库分区实现 特征。Oracle 分片本质上是分布式分区，因为它扩展了 通过支持跨分片分布表分区进行分区。

分区分布在表空间级别的分片上，基于 分片键。密钥的示例包括客户 ID、帐号和国家/地区 ID。

分片键支持以下数据类型：

- `NUMBER`
- `INTEGER`
- `SMALLINT`
- `RAW`
- `(N)VARCHAR`
- `(N)VARCHAR2`
- `(N)CHAR`
- `DATE`
- `TIMESTAMP`

分片表的每个分区驻留在单独的表空间中，并且每个 表空间与特定分片相关联。根据分片方法， 关联可以自动建立，也可以由管理员定义。

即使分片表的分区位于多个分片中，但 应用程序，表的外观和行为与分区表完全相同 单个数据库。应用程序发出的 SQL 语句永远不必引用分片 或者取决于分片的数量及其配置。

示例 4-5 分片表

熟悉的表分区 SQL 语法指定了应如何跨分片对行进行分区。例如，以下 SQL 语句创建一个分片表，根据分片键跨分片水平分区表：`cust_id`

```
CopyCREATE SHARDED TABLE customers 
( cust_id     NUMBER NOT NULL
, name        VARCHAR2(50)
, address     VARCHAR2(250)
, region      VARCHAR2(20)
, class       VARCHAR2(3)
, signup      DATE
CONSTRAINT cust_pk PRIMARY KEY(cust_id)
)
PARTITION BY CONSISTENT HASH (cust_id)
PARTITIONS AUTO
TABLESPACE SET ts1
;
```

上表按一致哈希进行分区，一致性哈希是可缩放分布式系统中常用的一种特殊类型的哈希分区。此技术会自动跨分片分布表空间，以提供数据和工作负载的均匀分布。请注意，不支持分表上的全局索引，但支持本地索引。

表空间集

Oracle 分片将表空间创建和管理为一个称为**表空间集**的单元。该子句指定 应自动确定分区数。这种类型的哈希 在分片之间迁移数据时提供了更大的灵活性和效率，即 对于弹性可扩展性很重要。`PARTITIONS AUTO`

表空间是 SDB 中数据分布的逻辑单元。分区在分片之间的分布是通过在驻留在不同分片上的表空间中自动创建分区来实现的。为了尽量减少多分片连接的数量，相关表的相应分区始终存储在同一个分片中。分表的每个分区都存储在单独的表空间中。

注：表空间集仅支持 Oracle 托管文件。 

不能独立于整个表空间集删除或更改单个表空间。

`TABLESPACE SET`不能与用户自定义分片方法一起使用。

**相关主题**

- [分片schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/introduction-to-oracle-database.html#GUID-8F1E6C26-A65A-4D62-B236-BFE3DA6CD43F)
- [使用预言机分片](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SHARD-GUID-0F39B1FB-DCF9-4C8A-A2EA-88705B90C5BF)





### 视图概述

**视图**是一个或多个表的逻辑表示形式。实质上，视图是存储的查询。

视图从它所基于的表（称为*基表*）派生其数据。基表可以是表或其他视图。对视图执行的所有操作实际上都会影响基表。您可以在使用表的大多数位置使用视图。

注：实例化视图使用与标准视图不同的数据结构。

视图使您能够为不同类型的用户定制数据的表示形式。视图通常用于：

- 通过限制对表中一组预定行或列的访问来提供额外的表安全性

  例如，[图 4-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-15E7AEDB-9A3F-4B31-AD2D-66253CC822E5__I5739) 显示了视图如何不显示基表的 或 列。`staff``salary``commission_pct``employees`

- 隐藏数据复杂性

  例如，可以使用联接定义单个视图，[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)是多个表中相关列或行的集合。但是，该视图隐藏了此信息实际上源自多个表的事实。查询还可能使用表信息执行大量计算。因此，用户可以查询视图，而无需知道如何执行联接或计算。

- 以与基表不同的角度呈现数据

  例如，可以重命名视图的列，而不会影响视图所基于的表。

- 将应用程序与基表定义中的更改隔离开来

  例如，如果视图的定义查询引用四列表的三列，并且向表中添加了第五列，则视图的定义不受影响，并且使用该视图的所有应用程序都不受影响。

有关使用视图的示例，请考虑具有多列和多行的表。若要允许用户仅查看其中的五列或仅查看特定行，可以按如下所示创建视图：`hr.employees`

```
CopyCREATE VIEW staff AS
  SELECT employee_id, last_name, job_id, manager_id, department_id
  FROM   employees;
```

与所有子查询一样，定义视图的查询不能包含子句。下图说明了名为 的视图。请注意，视图仅显示基表中的五列。`FOR UPDATE``staff`

图 4-7 视图

![Description of Figure 4-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt045.gif)
[“图 4-7 视图”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt045.html)

另请参阅：

- "[实例化视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-2822B62B-CAF3-4DCE-B4D6-5E677FB8A829)"
- 了解如何管理视图的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11774)
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01504)`CREATE VIEW`





#### 视图的特征

与表不同，不会为视图分配存储空间，也不会为视图分配数据。相反，视图由查询定义，该查询从视图引用的基表中提取或派生数据。由于视图基于其他对象，因此除了在数据字典中定义视图的查询的存储之外，它不需要存储。

视图依赖于其引用的对象，这些对象由数据库自动处理。例如，如果删除并重新创建视图的基表，则数据库将确定视图定义是否可以接受新基表。





##### 视图中的数据操作

由于视图派生自表，因此它们有许多相似之处。用户可以查询视图，并且有一些限制，他们可以对视图执行 DML。对视图执行的操作会影响视图的某些基表中的数据，并受基表的完整性约束和触发器的约束。

下面的示例创建表的视图：`hr.employees`

```
复制创建视图staff_dept_10为
选择employee_id、last_name、job_id、
 manager_id， department_id
来自员工
其中 department_id = 10
带有选中选项约束staff_dept_10_cnst;
```

定义查询仅引用部门 10 的行。创建具有约束的视图，以便针对视图发出的 和 语句不会导致视图无法选择的行。因此，可以插入部门 10 中员工的行，但不能插入部门 30 中的行。`CHECK OPTION``INSERT``UPDATE`

另请参阅：

[*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF55299)，了解语句中的子查询限制`CREATE VIEW`





##### 如何在视图中访问数据

Oracle 数据库将视图定义存储在数据字典中，作为定义视图的查询文本。

在 SQL 语句中引用视图时，Oracle 数据库将执行以下任务：

1. 将针对视图的查询（尽可能）与定义视图和任何基础视图的查询合并

   Oracle 数据库会优化合并的查询，就像您在不引用视图的情况下发出查询一样。因此，Oracle 数据库可以在任何引用的基表列上使用索引，无论这些列是在视图定义中引用的，还是在针对视图的用户查询中引用的。

   有时，Oracle 数据库无法将视图定义与用户查询合并。在这种情况下，Oracle 数据库可能不会使用引用列上的所有索引。

2. 解析[**共享 SQL 区域中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E0BE3164-B0A9-4ED8-AD19-2048ADFFC9BB)的合并语句

   仅当现有共享 SQL 区域中没有包含类似语句时，*Oracle* 数据库才会解析引用新共享 SQL 区域中视图的语句。因此，视图提供了减少与共享 SQL 关联的内存使用的好处。

3. 执行 SQL 语句

下面的示例演示查询视图时的数据访问。假设您基于 和 表创建：`employees_view``employees``departments`

```
CopyCREATE VIEW employees_view AS 
  SELECT employee_id, last_name, salary, location_id
  FROM   employees JOIN departments USING (department_id)
  WHERE  department_id = 10; 
```

用户执行以下查询：`employees_view`

```
CopySELECT last_name 
FROM   employees_view
WHERE  employee_id = 200;
```

Oracle 数据库合并视图和用户查询以构造以下查询，然后执行该查询以检索数据：

```
CopySELECT last_name
FROM   employees, departments
WHERE  employees.department_id = departments.department_id 
AND    departments.department_id = 10 
AND    employees.employee_id = 200;
```

另请参阅：

- "[共享 SQL 区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-0DBEB809-0660-4A04-ADF6-CABE4F6DF0B8)"
- "[优化器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)"
- 了解查询优化的 [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL193)





#### 可更新的联接视图

**联接**视图的子句中有多个表或视图。`FROM`

在下面的示例中，视图联接 和 表，仅包括部门 10 或 30 中的员工：`staff_dept_10_30``employees``departments`

```
CopyCREATE VIEW staff_dept_10_30 AS
SELECT employee_id, last_name, job_id, e.department_id
FROM   employees e, departments d
WHERE  e.department_id IN (10, 30)
AND    e.department_id = d.department_id;
```

可更新联接视图（也称为*可修改联接*视图）涉及两个或多个基表或[**视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F510D35A-83C5-4974-B6F0-5E4073F73DE1)，并允许 DML 操作。可更新视图在语句的顶级子句中包含多个表，并且不受子句的限制。`FROM``SELECT``WITH READ ONLY`

若要本质上可更新，视图必须满足多个条件。例如，一般规则是联接视图上的 、 或操作一次只能修改一个基表。以下数据字典视图查询显示该视图是可更新的：`INSERT``UPDATE``DELETE``USER_UPDATABLE_COLUMNS``staff_dept_10_30`

```
CopySQL> SELECT TABLE_NAME, COLUMN_NAME, UPDATABLE 
  2  FROM   USER_UPDATABLE_COLUMNS 
  3  WHERE  TABLE_NAME = 'STAFF_DEPT_10_30';
 
TABLE_NAME                     COLUMN_NAME                    UPD
------------------------------ ------------------------------ ---
STAFF_DEPT_10_30               EMPLOYEE_ID                    YES
STAFF_DEPT_10_30               LAST_NAME                      YES
STAFF_DEPT_10_30               JOB_ID                         YES
STAFF_DEPT_10_30               DEPARTMENT_ID                  YES
```

联接视图的所有可更新列都必须映射到[**键保留**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-481043B7-88C3-4492-8949-68ECE8077702)表的列，该表是基础表的每一行在查询输出中最多出现一次的表。在视图中， 是表的主键，因此表中的每一行在结果集中最多出现一次，从而使表键保留。该表不是键保留的，因为它的每一行可能在结果集中出现多次。`staff_dept_10_30``department_id``departments``employees``employees``departments`

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11782)了解如何更新联接视图





#### 对象视图

正如视图是虚拟表一样，对象视图也是虚拟**对象**表。视图中的每一行都是一个对象，它是**对象类型的**一个实例。对象类型是用户定义的数据类型。

您可以检索、更新、插入和删除关系数据，就像将其存储为对象类型一样。还可以定义具有对象数据类型列的视图，例如对象、集合和集合（嵌套表和集合）。`REF``VARRAY`

与关系视图一样，对象视图只能显示数据库管理员希望用户看到的数据。例如，对象视图可以显示有关 IT 程序员的数据，但省略有关工资的敏感数据。下面的示例创建一个对象，然后基于此对象创建视图：`employee_type``it_prog_view`

```
复制将类型employee_type创建为对象
(
 employee_id数 （6），
 last_name 瓦尔查尔2 （25），
 job_id 瓦尔查尔2 （10）
);
/

创建employee_type的视图it_prog_view
 对象标识符 （employee_id） 为
选择“e.employee_id”、“e.last_name”e.job_id
从员工 e
其中job_id = 'IT_PROG';
```

对象视图在原型设计或过渡到面向对象的应用程序时非常有用，因为视图中的数据可以从关系表中获取并访问，就像将表定义为对象表一样。您可以运行面向对象的应用程序，而无需将现有表转换为不同的物理结构。

另请参阅：

- [*Oracle 数据库对象关系开发人员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADOBJ7026)，了解对象类型和对象视图
- 了解该语句的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01506)`CREATE TYPE`





### 实例化视图概述

**实例化视图**是已作为schema对象预先存储或“具体化”的查询结果。查询的子句可以命名表、视图或实例化视图。`FROM`

实例化视图通常充当[**复制**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A011519D-7113-462D-B9A5-9BAC31E50B8D)中的[**主**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9C63F1D2-89B7-4AAF-B10F-325A82078B76)表和数据仓库中[**的事实数据表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B6DD258C-FFA5-4CDC-B5FB-98B3B9F20F99)。具体化视图汇总、计算、复制和分发数据。它们适用于各种计算环境，例如：

- 在数据仓库中，具体化视图可以计算和存储从聚合函数（如总和和平均值）生成的数据。

  [**摘要**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6952CA8E-DB69-4C4B-887F-9624565B1835)是一种聚合视图，它通过预先计算联接和聚合操作并将结果存储在表中来减少查询时间。实例化视图等效于摘要。您还可以使用实例化视图来计算带或不带聚合的联接。

- 在使用 XStream 和 Oracle GoldenGate 实现的具体化视图复制中，视图包含来自单个时间点的表的完整或部分副本。具体化视图在分布式站点上复制数据，并同步在多个站点执行的更新。这种形式的复制适用于数据库并不总是连接到网络的环境，例如现场销售。

- 在移动计算环境中，实例化视图可以将数据子集从中央服务器下载到移动客户端，定期从中央服务器刷新，并由客户端将更新传播到中央服务器。

在复制环境中，实例化视图与另一个数据库（称为 [**master 数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DC13C5A2-6D35-4169-B546-C8B8AC393163)）中的表共享数据。与主站点上的实例化视图关联的表是主表。[图 4-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-2822B62B-CAF3-4DCE-B4D6-5E677FB8A829__CFACFDIG) 说明了一个数据库中基于另一个数据库中的主表的具体化视图。对主表的更新将复制到实例化视图数据库。

图 4-8 实例化视图

![Description of Figure 4-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt260.gif)
[“图 4-8 物化视图”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt260.html)

另请参阅：

- “[信息共享](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-1E03C284-42EE-4542-AB79-A966AD7BEA47)”，了解如何使用 XStream 和 Oracle GoldenGate 进行复制
- “[数据仓库体系结构（基础）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-8B11C762-AF20-4B7A-A95B-D5423FE7B646)”以了解有关摘要的更多信息
- [Oracle Database XStream 指南，了解 XStream](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-5939CB6C-8BA9-4594-8F96-B0453D246722) 简介
- [`http://www.oracle.com/technetwork/middleware/goldengate/documentation/index.html`](http://www.oracle.com/technetwork/middleware/goldengate/documentation/index.html) 了解有关Oracle金门的更多信息
- 了解该语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01302)`CREATE MATERIALIZED VIEW`





#### 物化视图的特征

实例化视图共享索引和非实例化视图的某些特征。

实例化视图在以下方面与索引类似：

- 它们包含实际数据并占用存储空间。
- 当主表中的数据发生更改时，可以刷新它们。
- 当用于查询重写操作时，它们可以提高 SQL 执行的性能。
- 它们的存在对 SQL 应用程序和用户是透明的。

实例化视图类似于非实例化视图，因为它表示其他表和视图中的数据。与索引不同，用户可以使用语句直接查询实例化视图。根据所需的刷新类型，还可以使用 DML 语句更新视图。`SELECT`

下面的示例基于示例schema中的三个主表创建并填充实例化聚合视图：`sh`

```
CopyCREATE MATERIALIZED VIEW sales_mv AS 
  SELECT t.calendar_year, p.prod_id, SUM(s.amount_sold) AS sum_sales
  FROM   times t, products p, sales s
  WHERE  t.time_id = s.time_id 
  AND    p.prod_id = s.prod_id
  GROUP BY t.calendar_year, p.prod_id;
```

下面的示例删除表 ，这是 的主表，然后查询 。查询选择数据是因为行与主表中的数据分开存储（具体化）。`sales``sales_mv``sales_mv`

```
CopySQL> DROP TABLE sales;

Table dropped.

SQL> SELECT * FROM sales_mv WHERE ROWNUM < 4;
 
CALENDAR_YEAR    PROD_ID  SUM_SALES
------------- ---------- ----------
         1998         13  936197.53
         1998         26  567533.83
         1998         27  107968.24
```

可以对实例化视图进行分区。可以在分区表上定义实例化视图，并在实例化视图上定义一个或多个索引。

另请参阅：

[Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG-GUID-A7AE8E5D-68A5-4519-81EB-252EAAF0ADFF)数据仓库指南，了解如何在数据仓库中使用物化视图





#### 实例化视图的刷新方法

数据库通过在更改基表后刷新实例化视图中的数据来维护数据。刷新方法可以是增量刷新，也可以是完全刷新。





##### 完全刷新

**完全刷新**将执行定义实例化视图的查询。最初创建实例化视图时，将进行完全刷新，除非实例化视图引用预构建的表，或者您将该表定义为 。`BUILD DEFERRED`

完全刷新可能会很慢，尤其是在数据库必须读取和处理大量数据的情况下。您可以在创建实例化视图后随时执行完全刷新。





##### 增量刷新

**增量**刷新（也称为*快速刷新*）仅处理对现有数据的更改。此方法消除了从一开始就重建实例化视图的需要。仅处理更改可能会导致非常快的刷新时间。



您可以按需刷新实例化视图，也可以定期刷新实例化视图。或者，可以在与其基表相同的数据库中配置实例化视图，以便在事务提交对基表的更改时刷新。

快速刷新采用以下任一形式：

- 基于日志的刷新

  在这种类型的刷新中，实例化视图日志或直接加载程序日志会记录对基表的更改。实例化视图日志是一个schema对象，它记录对基表的更改，以便可以增量刷新在基表上定义的实例化视图。每个实例化视图日志都与单个基表相关联。

- 分区更改跟踪 （PCT） 刷新

  仅当对基表进行分区时，PCT 刷新才有效。PCT 刷新将删除受影响的物化视图分区或受影响的数据部分中的所有数据，然后重新计算它们。数据库使用修改后的基表分区来标识视图中受影响的分区或部分数据。对基表执行分区维护操作时，PCT 刷新是唯一可用的增量刷新方法。





##### 就地刷新和就地刷新

对于完整和增量方法，数据库可以就地刷新实例化视图，这会直接在视图上刷新语句，或者刷新不适当的语句。

异地刷新会创建一个或多个外部表，对它们执行 refresh 语句，然后将实例化视图或受影响的分区与外部表切换。此技术在刷新期间实现高可用性，尤其是在刷新语句需要很长时间才能完成时。

Oracle 数据库 12c 引入了同步刷新，这是一种错位刷新。同步刷新不会修改基表的内容，而是使用同步刷新包中的 API，通过同时将这些更改应用于基表和实例化视图来确保一致性。此方法使一组表和在其上定义的实例化视图始终保持同步。在数据仓库中，同步刷新方法非常适合，原因如下：

- 增量数据的加载受到严格控制，并定期发生。
- 表及其实例化视图通常以相同的方式进行分区，或者它们的分区通过功能依赖项相关联。

另请参阅：

[Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG03003)，了解如何刷新具体化视图





#### 查询重写

**查询重写将**按照主表编写的用户请求转换为语义上等效的请求，其中包括具体化视图。

当基表包含大量数据时，计算聚合或联接既昂贵又耗时。由于实例化视图包含预先计算的聚合和联接，因此查询重写可以使用实例化视图快速回答查询。

[**查询转换器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-648CCA52-2DB0-405D-9737-B7CB9B8E7CBC)以透明方式重写请求以使用实例化视图，不需要用户干预，也不需要引用 SQL 语句中的实例化视图。由于查询重写是透明的，因此可以添加或删除具体化视图，而不会使应用程序代码中的 SQL 失效。

通常，重写查询以使用实例化视图而不是详细信息表可缩短响应时间。下图显示了为原始查询和重写的查询生成[**执行计划的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)数据库，并选择成本最低的计划。

图 4-9 查询重写

![Description of Figure 4-9 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt334.gif)
[“图 4-9 查询重写”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt334.html)

另请参阅：

- “[优化器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)”以了解有关查询转换的更多信息
- [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG-GUID-DB76286B-8557-446B-A6CC-BC987C378076)，了解如何使用查询重写





### 序列概述

**序列**是一个schema对象，多个用户可以从中生成唯一的整数。序列生成器提供了一种高度可伸缩且性能良好的方法来为数字数据类型生成代理键。





#### 序列特性

序列定义指示有关序列的一般信息，包括其名称以及序列是上升还是下降。

序列定义还指示：

- 数字之间的间隔
- 数据库是否应在内存中缓存生成的序列号集
- 达到限制时序列是否应循环

下面的示例在示例schema中创建序列。应用程序可以使用此序列在将行添加到表中时提供客户 ID 号。`customers_seq``oe``customers`

```
CopyCREATE SEQUENCE customers_seq
START WITH      1000
INCREMENT BY    1
NOCACHE
NOCYCLE;
```

对返回的第一个引用。第二个返回。每个后续引用返回的值比前一个引用大 1。`customers_seq.nextval``1000``1001`

另请参阅：

- [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG34000)，介绍了如何创建序列的教程
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11796)了解如何在 SQL 语句中引用序列
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01314)`CREATE SEQUENCE`





#### 并发访问序列

同一序列生成器可以为多个表生成数字。

生成器可以自动创建主键，并跨多行或表协调键。例如，序列可以为表和表生成主键。`orders``customers`

序列生成器在多用户环境中非常有用，可用于生成唯一编号，而不会产生磁盘 I/O 或事务锁定的开销。例如，两个用户同时在表中插入新行。通过使用序列为列生成唯一编号，任何用户都不必等待对方输入下一个可用的订单号。该序列会为每个用户自动生成正确的值。`orders``order_id`

引用序列的每个用户都可以访问其当前序列号，这是[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)中生成的最后一个序列。用户可以发出语句以生成新的序列号或使用会话上次生成的当前编号。会话中的语句生成序列号后，该语句仅可用于此会话。如果单个序列号是在最终回滚的事务中生成和使用，则可以跳过这些序列号。

警告：如果您的应用程序需要一组无间隙的数字，则不能使用 Oracle 序列。必须使用自己开发的代码序列化数据库中的活动。

另请参阅：

“数据[并发性和一致性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E8CBA9C5-58E3-460F-A82A-850E0152E95C)”，了解会话如何同时访问数据





### 尺寸概述

典型的数据仓库有两个重要组成部分：维度和事实。

**维度**是用于指定业务问题的任何类别，例如时间、地理位置、产品、部门和分销渠道。**事实**数据是与一组特定维度值（例如，销售单位或利润）关联的事件或实体。

多维请求的示例包括：

- 显示 2013 年和 2014 年按地理位置维度（从州到国家/地区）递增的聚合级别显示所有产品的总销售额。
- 创建我们运营的交叉表格分析，显示 2013 年和 2014 年南美地区的费用。包括所有可能的小计。
- 根据10年汽车产品销售收入列出亚洲十大销售代表，并对其佣金进行排名。

许多多维问题需要汇总数据和数据集比较，通常跨越时间、地理位置或预算。

创建维度允许更广泛地使用查询重写功能。通过透明地重写查询以使用实例化视图，数据库可以提高查询性能。

另请参阅：

“数据仓库[和商业智能概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-E1451108-464E-4B5F-B173-11212278E308)”，了解数据仓库和 OLTP 数据库之间的差异





#### 维度的层次结构

**维度表**是一种逻辑结构，用于定义列对或列集之间的分层（父/子）关系。

例如，维度可以指示在行中，列表示列的值，列表示列的值。`city``state``state``country`

在客户维度中，客户可以汇总到城市、州、国家/地区、子区域和区域。数据分析通常从维度层次结构中的较高级别开始，如果情况需要进行此类分析，则逐渐向下钻取。

子级别的每个值都与父级别的一个且仅一个值相关联。层次结构关系是从层次结构的一个级别到层次结构中的下一个级别的功能依赖关系。

维度未分配数据存储。维度信息存储在维度表中，而事实信息存储在事实数据表中。

另请参阅：

- 了解维度的 [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG-GUID-106BE703-0D67-41F1-8CAC-6432B95FBF82)
- [Oracle OLAP 用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OLAUG300)，了解如何创建维度





#### 创建维度

您可以使用 SQL 语句创建维度。`CREATE DIMENSION`

此语句指定：

- 多个子句，每个子句标识维度中的一个列或列集`LEVEL`
- 指定相邻级别之间的父/子关系的一个或多个子句`HIERARCHY`
- 可选子句，每个子句标识与单个级别关联的附加列或列集`ATTRIBUTE`

以下语句用于在示例schema中创建维度：`customers_dim``sh`

```
CopyCREATE DIMENSION customers_dim 
   LEVEL customer   IS (customers.cust_id)
   LEVEL city       IS (customers.cust_city) 
   LEVEL state      IS (customers.cust_state_province) 
   LEVEL country    IS (countries.country_id) 
   LEVEL subregion  IS (countries.country_subregion) 
   LEVEL region     IS (countries.country_region) 
   HIERARCHY geog_rollup (
      customer      CHILD OF
      city          CHILD OF 
      state         CHILD OF 
      country       CHILD OF 
      subregion     CHILD OF 
      region 
   JOIN KEY (customers.country_id) REFERENCES country )
   ATTRIBUTE customer DETERMINES
   (cust_first_name, cust_last_name, cust_gender, 
    cust_marital_status, cust_year_of_birth, 
    cust_income_level, cust_credit_limit) 
   ATTRIBUTE country DETERMINES (countries.country_name);
```

维度中的列可以来自同一个表（非规范化），也可以来自多个表（完全规范化或部分规范化）。例如，规范化时间维度可以包括日期表、月表和年表，其连接条件将每个日期行连接到月行，将每个月行连接到年行。在完全非规范化的时间维度中，日期、月份和年份列位于同一表中。无论是规范化还是非规范化，都必须在语句中指定列之间的分层关系。`CREATE DIMENSION`

另请参阅：

适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01206)`CREATE DIMENSION`





### 同义词概述

**同义词**是schema对象的别名。例如，您可以为表或视图、序列、PL/SQL 程序单元、用户定义的对象类型或其他同义词创建同义词。由于同义词只是一个别名，因此除了在数据字典中的定义外，它不需要存储。

同义词可以简化数据库用户的 SQL 语句。同义词对于隐藏基础schema对象的标识和位置也很有用。如果必须重命名或移动基础对象，则只需重新定义同义词。基于同义词的应用程序无需修改即可继续工作。

您可以创建私有和公共同义词。私有同义词位于特定用户的schema中，该用户可以控制其对其他人的可用性。公共同义词归命名的用户组所有，每个数据库用户都可以访问。`PUBLIC`

例 4-6 公共同义词

假设数据库管理员创建了一个以表命名的公共同义词。然后，用户连接到schema并计算同义词引用的表中的行数。`people``hr.employees``oe`

```
复制SQL>为人力资源员工创建公共同义词人;
 
创建同义词。
 
SQL> CONNECT oe
输入密码：密码已连接。

SQL> 从人员中选择计数（*）;

计数（*）
----------
 107
```

请谨慎使用公共同义词，因为它们会使数据库整合更加困难。如以下示例所示，如果另一个管理员尝试创建公共同义词，则创建将失败，因为数据库中只能存在一个公共同义词。过度使用公共同义词会导致应用程序之间的命名空间冲突。`people``people`

```
复制SQL> 为OE.customers创建公共同义词人;
为 OE创建公共同义词人员。
 *
第 1 行错误：
ORA-00955：名称已被现有对象使用

SQL>选择所有者、SYNONYM_NAME、TABLE_OWNER TABLE_NAME
 2 来自DBA_SYNONYMS
 3 其中SYNONYM_NAME=“人”;
 
所有者SYNONYM_NAME TABLE_OWNER TABLE_NAME
---------- ------------ ----------- ----------
公众人物 人力资源员工
```

同义词本身不是安全的。当您授予对同义词的对象权限时，您实际上是在授予对基础对象的权限。同义词仅充当语句中对象的别名。`GRANT`

另请参阅：

- [*Oracle 数据库管理员指南，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11805)了解如何管理同义词
- 适用于语法和语义的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01401)`CREATE SYNONYM`

## 5 数据完整性

本章说明完整性约束如何强制实施与数据库关联的业务规则，并防止将无效信息输入表中。

本章包含以下部分：

- [数据完整性简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-A8893CD7-8B19-42AA-8550-9713071FA679)
- [完整性约束的类型](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-1C9665AD-A444-4AFB-984F-6385FCBEA64E)
- [完整性约束的状态](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-97D4BB23-FD4B-4FB6-BE21-E5F8C43BD94F)

另请参阅：

“[表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-F845B1A7-71E3-4312-B66D-BC16C198ECE5)”，了解列的背景和完整性约束的必要性





### 数据完整性简介

数据必须保持**数据完整性**，即遵守数据库管理员或应用程序开发人员确定的业务规则。

业务规则指定必须始终为真或必须始终为假的条件和关系。例如，每个公司都定义了自己的有关工资、员工数量、库存跟踪等的策略。





#### 保证数据完整性的技术

在设计数据库应用程序时，开发人员有多种选择来保证存储在数据库中的数据的完整性。

这些选项包括：

- 使用触发的存储数据库过程强制实施业务规则
- 使用存储过程完全控制对数据的访问
- 在数据库应用程序的代码中强制实施业务规则
- 使用 Oracle 数据库完整性约束，这是在列或对象级别定义的规则，用于限制数据库中的值

另请参阅：

- “触发器概述”解释了[触发器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-40297ADF-0968-42F8-B8B9-84AD6ADCBE63)的目的和类型
- “[服务器端编程简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-6B5D98B7-A25D-4187-B3A9-43629E214635)”解释了存储过程的目的和特征





#### 完整性约束的优点

完整性约束是使用 SQL 创建和删除的schema对象。若要强制实施数据完整性，请尽可能使用完整性约束。

与强制实施数据完整性的替代方法相比，完整性约束的优势包括：

- 声明性易用性

  由于使用 SQL 语句定义完整性约束，因此在定义或更改表时不需要其他编程。SQL 语句易于编写并消除了编程错误。

- 集中式规则

  完整性约束是为表定义的，并存储在[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)中。因此，所有应用程序输入的数据必须遵守相同的完整性约束。如果规则在表级别更改，则应用程序不需要更改。此外，应用程序可以使用数据字典中的元数据立即通知用户违规行为，甚至在数据库检查 SQL 语句之前也是如此。

- 加载数据时的灵活性

  您可以暂时禁用完整性约束，以避免在加载大量数据时产生性能开销。数据加载完成后，可以重新启用完整性约束。

另请参阅：

- "[数据字典概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-9B9ABE1C-A1E3-464F-8936-978250DC3E1F)"
- Oracle 数据库 [2 天开发人员](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG32200)指南和 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS004)，了解如何维护数据完整性
- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11537)了解如何管理完整性约束





### 完整性约束的类型

Oracle 数据库使您能够在表和列级别应用约束。

作为列或属性定义的一部分指定的约束是内联规范。指定为表定义一部分的约束是外联规范。

[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E0D85C39-5CB4-4E85-A9AB-3834FA6F09C7)是某些类型的完整性约束的定义中包含的列或列集。键描述关系型数据库的表和列之间的关系。键中的单个值称为[**键值**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-034BA760-3056-4791-A624-03BB28B82AFD)。

下表描述了约束的类型。每个都可以内联或外联指定，但 除外，它必须是内联的。`NOT NULL`

表 5-1 完整性约束的类型

| 约束类型   | 描述                                                         | 参见                                                         |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `NOT NULL` | 允许或禁止插入或更新指定列中包含 [**null**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8854502F-2B8F-4ABC-98FA-BBFC3695A964) 的行。 | "[不为空的完整性约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-CF2E06A6-6A35-46CE-808E-305A459457CC)" |
| 唯一键     | 禁止多行在同一列或列组合中具有相同的值，但允许某些值为 null。 | "[独特的约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-077C26A1-49C3-4E72-AE1D-7CEDD997917A)" |
| 主键       | 组合约束和唯一约束。它禁止多行在同一列或列组合中具有相同的值，并禁止值为 null。`NOT NULL` | "[主键约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-E1033BB9-0F67-4E59-82AC-B8B572FD82BB)" |
| 外键       | 将列指定为外键，并在外键与主键或唯一键（称为[**引用键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B1E1A035-9C29-43EB-84AA-0A9CD4482530)）之间建立关系。 | "[外键约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-7CD73D16-EA1A-4AA8-AA7D-4288557395B8)" |
| 检查       | 要求数据库值遵守指定的条件。                                 | "[检查约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-5AF9C206-0139-4506-96DE-F6AD1D41CD41)" |
| `REF`      | 指示允许对列中的值进行的数据操作类型以及这些操作如何影响相关值。在对象关系型数据库中，称为 的内置数据类型封装对指定对象类型的行对象的引用。列上的参照完整性约束可确保 具有 的行对象。`REF``REF``REF``REF` | 了解约束的 [Oracle 数据库对象关系开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADOBJ00805)`REF` |

另请参阅：

- "[表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-F845B1A7-71E3-4312-B66D-BC16C198ECE5)"
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52180)，了解有关约束类型的更多信息





#### 不为空的完整性约束

约束要求表的列不包含空值。**空**值是缺少值。默认情况下，表中的所有列都允许空值。`NOT NULL`

```
NOT NULL`约束适用于不得缺少值的列。例如，表需要列中的值。尝试插入没有电子邮件地址的员工行会生成错误：`hr.employees``email
CopySQL> INSERT INTO hr.employees (employee_id, last_name) values (999, 'Smith');
.
.
.
ERROR at line 1:
ORA-01400: cannot insert NULL into ("HR"."EMPLOYEES"."EMAIL")
```

仅当表不包含任何行或指定默认值时，才能添加具有约束的列。`NOT NULL`

另请参阅：

- [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG32220)，了解向表添加约束的示例`NOT NULL`
- [Oracle 数据库 SQL 语言参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30038)了解使用约束的限制`NOT NULL`
- 了解何时使用约束的 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS265)`NOT NULL`





#### 独特的约束

**唯一键约束**要求列或列集中的每个值都是唯一的。表的任何行都不能在具有唯一键约束的单列（唯一**键**）或一组列（**复合唯一键**）中具有重复值。

注：术语*键*仅指完整性约束中定义的列。由于数据库通过在键列上隐式创建或重用索引来强制实施唯一约束，因此术语唯一键有时会被错误地用作唯一*键约束*或*唯一*[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)的同义词。

唯一键约束适用于不允许重复值的任何列。唯一约束不同于主键约束，主键约束的目的是唯一地标识每个表行，并且通常包含除了唯一之外没有意义的值。唯一键的示例包括：

- 客户电话号码，其中主键是客户编号
- 部门名称，其中主键是部门编号

如[示例 2-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-B0DFC5A7-E482-4E17-A6F5-FF476A92DC73__CBBEHJCH) 所示，表的列上存在唯一键约束。声明的相关部分如下：`email``hr.employees`

```
复制创建表员工 （ ...
 ， 电子邮件 瓦尔查尔2（25）
 约束emp_email_nn不空...
 、约束emp_email_uk唯一（电子邮件） ... ）;
```

该约束可确保没有两个员工具有相同的电子邮件地址，如以下示例所示：`emp_email_uk`

```
复制SQL>选择employee_id，last_name，来自员工的电子邮件，其中电子邮件=“PFAY”;
 
EMPLOYEE_ID LAST_NAME电子邮件
----------- ------------------------- -------------------------
 202费伊·

SQL>插入员工（employee_id，last_name，电子邮件，hire_date，job_id）
 1 个值（999，'Fay'，'PFAY'，SYSDATE，'ST_CLERK'）;
.
.
.
第 1 行错误：
ORA-00001：唯一约束（HR.EMP_EMAIL_UK） 违反
```

除非还定义了约束，否则 null 始终满足唯一键约束。因此，具有唯一键约束和约束的列是典型的。这种组合强制用户在唯一键中输入值，并消除了新行数据与现有行数据冲突的可能性。`NOT NULL``NOT NULL`

注：由于对多个列的唯一键约束的搜索机制，部分空复合唯一键约束的非空列中不能具有相同的值。

例 5-1 唯一约束

```
复制SQL>选择employee_id，last_name，来自员工的电子邮件，其中电子邮件=“PFAY”;
 
EMPLOYEE_ID LAST_NAME电子邮件
----------- ------------------------- -------------------------
 202费伊·

SQL>插入员工（employee_id，last_name，电子邮件，hire_date，job_id）
 1 个值（999，'Fay'，'PFAY'，SYSDATE，'ST_CLERK'）;
.
.
.
第 1 行错误：
ORA-00001：唯一约束（HR.EMP_EMAIL_UK） 违反
```

另请参阅：

- "[唯一和非唯一索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-F6EFE752-18FA-4BCE-BDE0-F2C386361187)"
- [*Oracle 数据库 2 天开发人员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG192)，了解向表添加约束的示例`UNIQUE`





#### 主键约束

在**主键**约束中，受约束的一个或多个列组中的值唯一标识行。每个表可以有一个主键，该**主键**实际上命名行并确保不存在重复的行。

主键可以是自然键，也可以是代理项。[**自然键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C697AA5E-12D3-40DC-A5D2-BC7DFDF3E945)是由表中的现有属性组成的有意义的标识符。例如，自然键可以是查找表中的邮政编码。相比之下，[**代理键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-615CBF3E-BEBE-40A1-AE81-5B2F3275ABF3)是系统生成的递增标识符，可确保表中的唯一性。通常，[**序列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E55254A3-D483-4311-8637-1FFEB6BD25BF)会生成代理键。

主键约束的 Oracle 数据库实现保证以下语句为真：

- 在指定的列或一组列中没有两行具有重复的值。
- 主键列不允许空值。

需要主键的典型情况是员工的数字标识符。每个员工必须有一个唯一的 ID。员工必须由表中的一行且仅由一行描述。`employees`

[唯一约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-077C26A1-49C3-4E72-AE1D-7CEDD997917A)中的示例指示现有雇员的雇员 ID 为 202，其中雇员 ID 是主键。以下示例演示尝试添加具有相同雇员 ID 的员工和没有 ID 的雇员：

```
CopySQL> INSERT INTO employees (employee_id, last_name, email, hire_date, job_id)    
  1  VALUES (202,'Chan','JCHAN',SYSDATE,'ST_CLERK');
.
.
.
ERROR at line 1:
ORA-00001: unique constraint (HR.EMP_EMP_ID_PK) violated

SQL> INSERT INTO employees (last_name) VALUES ('Chan');
.
.
.
ERROR at line 1:
ORA-01400: cannot insert NULL into ("HR"."EMPLOYEES"."EMPLOYEE_ID")
```

数据库使用[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)强制实施主键约束。通常，为列创建的主键约束会隐式创建唯一索引和约束。请注意此规则的以下例外情况：`NOT NULL`

- 在某些情况下，就像创建具有[**可延迟约束**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19E5560E-9730-4A50-9C26-4E95C4AD81AE)的主键一样，生成的索引不是唯一的。

  注：您可以使用创建唯一索引语句显式`创建唯一索引`。

- 如果在创建主键约束时存在可用索引，则该约束将重用此索引，并且不会隐式创建一个索引。

默认情况下，隐式创建的索引的名称是主键约束的名称。还可以为索引指定用户定义的名称。可以通过在用于创建约束的 or 语句中包含子句来指定索引的存储选项。`ENABLE``CREATE TABLE``ALTER TABLE`

另请参阅：

[Oracle 数据库 2 天开发人员](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG193)指南和 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00607)，了解如何向表添加主键约束





#### 外键约束

每当两个表包含一个或多个公共列时，Oracle 数据库都可以通过**外键**约束（也称为*引用完整性约束*）强制实施两个表之间的关系。

外键约束要求对于定义约束的列中的每个值，其他指定的其他表和列中的值必须匹配。参照完整性规则的一个示例是员工只能为现有部门工作。

下表列出了与参照完整性约束关联的术语。

表 5-2 参照完整性约束项

| 术语         | 定义                                                         |
| :----------- | :----------------------------------------------------------- |
| 外键         | 引用引用键的约束定义中包含的列或列集。例如，中的列是引用 中的列的外键。`department_id``employees``department_id``departments`外键可以定义为多个列。但是，复合外键必须引用具有相同列数和相同数据类型的复合主键或唯一键。外键的值可以与引用的主键值或唯一键值匹配，也可以为 null。如果复合外键的任何列为 null，则键的非 null 部分不必与父键的任何相应部分匹配。 |
| 引用的键     | 外键引用的表的唯一键或主键。例如，中的列是 中列的引用键。`department_id``departments``department_id``employees` |
| 依赖表或子表 | 包含外键的表。此表取决于引用的唯一键或主键中存在的值。例如，该表是 的子表。`employees``departments` |
| 引用表或父表 | 子表的外键引用的表。正是此表的引用键确定子表中是否允许特定的插入或更新。例如，该表是 的父级。`departments``employees` |

[图 5-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-7CD73D16-EA1A-4AA8-AA7D-4288557395B8__I3773) 显示了列上的外键。它保证此列中的每个值都必须与列中的值匹配。因此，列中不能存在错误的部门编号。`employees.department_id``departments.department_id``employees.department_id`

图 5-1 参照完整性约束

![图 5-1 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt056.gif)
[“图 5-1 参照完整性约束”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt056.html)

另请参阅：

Oracle 数据库 [2 天开发人员](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG195)指南和 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00611)，了解如何向表添加外键约束





##### 自参照完整性约束

**自引用完整性约束是引用**同一表中的父键的外键。

在下图中，自引用约束可确保列中的每个值都对应于列中的现有值。例如，雇员 102 的经理必须存在于表中。此约束消除了列中员工编号错误的可能性。`employees.manager_id``employees.employee_id``employees``manager_id`

图 5-2 单个表引用约束

![图 5-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt057.gif)
[“图 5-2 单表引用约束”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt057.html)





##### 空值和外键

关系模型允许外键的值与引用的主键值或唯一键值匹配，或者为 null。例如，中的行可能未指定部门 ID。`hr.employees`

如果复合外键的任何列为 null，则键的非 null 部分不必与父键的任何相应部分匹配。例如，表可能在 和 列上包含复合外键，但为 null。`reservations``table_id``date``table_id`





##### 父键修改和外键

外键和父键之间的关系对删除父键有影响。例如，如果用户尝试删除此部门的记录，则此部门中员工的记录会发生什么情况？

修改父键时，参照完整性约束可以指定要对子表中的依赖行执行以下操作：

- 删除或更新时不执行任何操作

  在正常情况下，如果结果会违反引用完整性，则用户无法修改引用的键值。例如，if 是 的外键，并且如果员工属于特定部门，则尝试删除此部门的行将违反约束。`employees.department_id``departments`

- 级联删除

  删除包含引用键值的行时，删除将级联 （），从而导致子表中具有依赖外键值的所有行也被删除。例如，删除 中的行会导致删除此部门中所有员工的行。`DELETE CASCADE``departments`

- 设置为 null 的删除

  删除操作会在删除包含引用键值的行时设置 null （），从而导致子表中具有依赖外键值的所有行将这些值设置为 null。例如，删除部门行会将此部门中员工的列值设置为 null。`DELETE SET NULL``department_id`

[表 5-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-FB419C3E-7C1E-4881-B77D-D09A57C741A6__G14265) 概述了对父表中的键值和子表中的外键值执行不同的引用操作所允许的 DML 语句。

表 5-3 更新和删除不允许的 DML 语句

| DML 声明             | 针对父表发出                                           | 针对子表发出                                       |
| :------------------- | :----------------------------------------------------- | :------------------------------------------------- |
| `INSERT`             | 如果父键值是唯一的，则始终正常                         | 仅当外键值存在于父键中或部分或全部为 null 时才确定 |
| `UPDATE NO` `ACTION` | 如果语句不会在子表中留下任何没有引用父键值的行，则允许 | 如果新外键值仍引用引用的键值，则允许               |
| `DELETE NO` `ACTION` | 如果子表中没有行引用父键值，则允许                     | 始终正常                                           |
| `DELETE CASCADE`     | 始终正常                                               | 始终正常                                           |
| `DELETE SET` `NULL`  | 始终正常                                               | 始终正常                                           |

注意：Oracle 数据库的`外键`完整性约束不支持的其他引用操作可以使用数据库触发器强制执行。请参阅“[触发器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-40297ADF-0968-42F8-B8B9-84AD6ADCBE63)”。

另请参阅：

[*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52202)以了解该条款`ON DELETE`





##### 索引和外键

通常，应为外键编制索引。唯一的例外是匹配的唯一键或主键永远不会更新或删除。

为子表中的外键编制索引具有以下优点：

- 防止子表上出现全表锁定。相反，数据库在索引上获取行锁。
- 无需对子表进行[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)。例如，假设用户从表中删除部门 10 的记录。如果未编制索引，则必须扫描数据库以查看部门 10 中是否存在任何员工。`departments``employees.department_id``employees`

另请参阅：

- “锁和外键”解释了已编制索引和未编制索引的[外键](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-261F98F8-F7B4-49A9-9BE8-11F2B1F4609B)列的锁定行为
- “索引简介”解释了[索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DE7A95BC-6E4A-47EA-9FC5-B85B54F8CF41)的目的和特征





#### 检查约束

对一列或一组列的**检查约束**要求指定**条件**对于每一行为 true 或未知。

如果 DML 导致约束的条件计算结果为 false，则回滚 SQL 语句。检查约束的主要好处是能够强制实施非常具体的完整性规则。例如，可以使用检查约束在表中强制实施以下规则：`hr.employees`

- 该列的值不得大于 10000。`salary`
- 该列的值必须不大于工资。`commission`

下面的示例创建最大工资约束，并演示当语句尝试插入包含超过最大值的工资的行时会发生什么情况：`employees`

```
CopySQL> ALTER TABLE employees ADD CONSTRAINT max_emp_sal CHECK (salary < 10001);
SQL> INSERT INTO employees (employee_id,last_name,email,hire_date,job_id,salary)
  1  VALUES (999,'Green','BGREEN',SYSDATE,'ST_CLERK',20000);
.
.
.
ERROR at line 1:
ORA-02290: check constraint (HR.MAX_EMP_SAL) violated
```

单个列可以有多个在其定义中引用该列的检查约束。例如，该列可能有一个阻止值超过 10000 的约束和一个阻止小于 500 的值的单独约束。`salary`

如果列存在多个检查约束，则必须设计这些约束，使其用途不冲突。不能假定条件的评估顺序。数据库不会验证检查条件是否互斥。

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52204)，了解检查约束的限制





### 完整性约束的状态

作为约束定义的一部分，您可以指定 Oracle 数据库应如何以及何时强制实施约束，从而确定约束状态。





#### 检查修改的数据和现有数据

通过数据库，您可以指定约束是应用于现有数据还是应用于未来数据。如果启用了约束，则数据库会在输入或更新新数据时检查新数据。不符合约束的数据无法进入数据库。

例如，启用约束可保证以后的每一行都有一个部门 ID。如果禁用约束，则表可以包含违反约束的行。`NOT NULL``employees.department_id`

可以将约束设置为以下任一验证模式：

- `VALIDATE`

  现有数据必须符合约束。例如，启用约束并将其设置为检查每个现有行是否具有部门 ID。`NOT NULL``employees.department_id``VALIDATE`

- `NOVALIDATE`

  现有数据不需要符合约束。实际上，这是一种“相信我”模式。例如，如果您确定加载到表中的每笔销售都有日期，则可以在日期列上创建约束并将该约束设置为 。未强制约束通常仅对实例化视图和查询重写有用。`NOT NULL``NOVALIDATE`

  对于模式中的约束，该参数指示优化程序可以使用该约束来确定连接信息。即使约束不用于验证数据，它也可以为实例化视图启用更复杂的查询重写，并使数据仓库工具能够从数据字典中检索约束信息。缺省值为 ，这意味着优化程序实际上不知道约束。`NOVALIDATE``RELY``NORELY`

和 的行为始终取决于约束是启用还是禁用。下表总结了这些关系。`VALIDATE``NOVALIDATE`

表 5-4 检查修改后的数据和现有数据

| 修改后的数据 | 现有数据     | 总结                                                         |
| :----------- | :----------- | :----------------------------------------------------------- |
| `ENABLE`     | `VALIDATE`   | 现有和未来的数据必须遵守约束。如果现有行违反约束，则尝试将新约束应用于填充的表会导致错误。 |
| `ENABLE`     | `NOVALIDATE` | 数据库检查约束，但不必对所有行都为 true。因此，现有行可以违反约束，但新行或修改的行必须符合规则。此模式通常用于包含已验证其完整性的现有数据的数据仓库。 |
| `DISABLE`    | `VALIDATE`   | 数据库禁用约束，删除其索引，并阻止修改受约束的列。           |
| `DISABLE`    | `NOVALIDATE` | 约束未被选中，也不一定为 true。                              |

另请参阅：

了解约束状态的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52214)





#### 当数据库检查约束的有效性时

每个约束都处于不可延迟（默认）或可延迟状态。此状态确定 Oracle 数据库何时检查约束的有效性。

下图显示了可延迟约束的选项。

图 5-3 可延后约束的选项

![图 5-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt313.gif)
[“图 5-3 可延迟约束的选项”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt313.html)





##### 不可延约束

在**不可延期**约束中，Oracle 数据库永远不会将约束的有效性检查推迟到事务结束。相反，数据库会在每条语句的末尾检查约束。如果违反了约束，则语句将回滚。

例如，列存在不可递延的约束。如果会话尝试插入没有姓氏的行，则数据库会立即回滚该语句，因为违反了约束。不插入任何行。`NOT NULL``employees.last_name``NOT NULL`





##### 可递延约束

**可递延**约束允许事务使用该子句来延迟对此约束的检查，直到发出语句。如果对数据库所做的更改可能违反约束，则此设置有效地使您能够禁用约束，直到所有更改都完成。`SET CONSTRAINT``COMMIT`

您可以设置数据库检查可延迟约束时的默认行为。您可以指定以下任一属性：

- `INITIALLY IMMEDIATE`

  数据库在每个语句执行后立即检查约束。如果违反了约束，则数据库将回滚该语句。

- `INITIALLY DEFERRED`

  数据库在发出 时检查约束。如果违反了约束，则数据库将回滚事务。`COMMIT`

假定 上的可延迟约束设置为 。用户创建包含 100 个语句的事务，其中一些语句具有 的空值。当用户尝试提交时，数据库将回滚所有 100 条语句。但是，如果将此约束设置为 ，则数据库不会回滚事务。`NOT NULL``employees.last_name``INITIALLY DEFERRED``INSERT``last_name``INITIALLY IMMEDIATE`

如果约束导致操作，则数据库将此操作视为导致该操作的语句的一部分，无论约束是延迟的还是即时的。例如，删除 中的行会导致删除引用已删除部门行的所有行。在这种情况下，从 中删除的操作被视为针对 执行的语句的一部分。`departments``employees``employees``DELETE``departments`

另请参阅：

有关约束属性及其默认值的信息的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52216)





#### 约束检查示例

以下示例有助于说明 Oracle 数据库何时执行约束检查。

假设以下情况：

- 该表具有“[自参照完整性约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-EF16D0D5-EB95-440A-9FFA-E890DFBB7C64)”中所示的结构。`employees`
- 自引用约束使列中的条目依赖于列的值。`manager_id``employee_id`





##### 示例：当不存在父键值时在外键列中插入值

此示例涉及在表中插入第一行。当前不存在行，那么如果列中的值无法引用列中的现有值，如何输入行？`employees``manager_id``employee_id`

一些可能性是：

- 如果列上未定义约束，则可以为第一行的列输入 null。`manager_id``NOT NULL``manager_id`

  由于外键中允许空值，因此 Oracle 数据库将此行插入到表中。

- 您可以在 和 列中输入相同的值，指定员工是他或她自己的经理。`employee_id``manager_id`

  这种情况揭示了 Oracle 数据库在语句执行*后*执行其约束检查。若要允许在父键和外键中输入具有相同值的行，数据库必须首先插入新行，然后确定表中是否有任何行具有与新行对应的行。`employee_id``manager_id`

- 多行语句（如具有嵌套语句的语句）可以插入相互引用的行。`INSERT``INSERT``SELECT`

  例如，第一行可能有 200 用于员工 ID，300 用于经理 ID，而第二行可能有 300 用于员工 ID，200 用于经理。约束检查将推迟到语句完全执行。数据库插入所有行，然后检查所有行是否存在约束冲突。`INSERT`

在解析语句之前，默认值将作为语句的一部分包含在语句中。因此，默认列值受所有完整性约束检查的约束。`INSERT`





##### 示例：更新所有外键和父键值

在此示例中，自引用约束使列中的条目依赖于列的值。`manager_id``employees``employee_id`

公司已被出售。由于此次销售，所有员工编号必须更新为当前值加 5000，以与新公司的员工编号协调。如下图所示，一些员工也是经理：

图 5-4 更新前的员工表

![图 5-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt058.gif)
[“图 5-4 更新前的员工表”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt058.html)

由于经理编号也是员工编号，因此经理编号也必须增加 5000。您可以执行以下 SQL 语句来更新值：

```
CopyUPDATE employees SET employee_id = employee_id + 5000,
  manager_id = manager_id + 5000;
```

尽管定义了约束来验证每个值是否与值匹配，但前面的语句是有效的，因为数据库在语句完成后会有效地检查约束。[图 5-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-8AA33487-F1D7-4EC8-ADC1-04A4EEF7974B__I3784) 显示了数据库在检查约束之前执行整个 SQL 语句的操作。`manager_id``employee_id`

图 5-5 约束检查

![Description of Figure 5-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt059.gif)
[“图 5-5 约束检查”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt059.html)

本节中的示例说明了 and 语句期间的约束检查机制，但数据库对所有类型的 DML 语句使用相同的机制。数据库对所有类型的约束使用相同的机制，而不仅仅是自引用约束。`INSERT``UPDATE`

注：[**对视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1274BCF5-2EC1-4752-B9CE-998A85A83307)或[**同义词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FBC00D26-94DC-4BA6-82D0-60A7F29CB81D)的操作受基表上定义的完整性约束的约束。

## 6 数据字典和动态性能视图

每个 Oracle 数据库的只读引用表和视图的中心集统称为**数据字典**。**动态性能**视图是在数据库打开和使用时不断更新的特殊视图。

本章包含以下部分：

- [数据字典概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-9B9ABE1C-A1E3-464F-8936-978250DC3E1F)
- [动态性能视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-4093F62A-CA16-4054-B441-279D15CE03B3)
- [数据库对象元数据](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-926FD457-4DBD-45D5-82BD-98E54BF22D78)





### 数据字典概述

Oracle 数据库的一个重要部分是其数据字典，它是一组只读表，提供有关数据库的管理元数据。

数据字典包含如下信息：

- 数据库中每个[**schema对象的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)定义，包括列的默认值和完整性约束信息
- 为schema对象分配和当前使用的空间量
- Oracle 数据库用户的名称、授予用户的特权和角色，以及与用户相关的审核信息

数据字典是每个 Oracle 数据库数据管理的核心部分。例如，数据库执行以下操作：

- 访问数据字典以查找有关用户、schema对象和存储结构的信息
- 每次发出 DDL 语句时修改数据字典

由于 Oracle 数据库将数据字典数据存储在表中，就像其他数据存储一样，因此用户可以使用 SQL [**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)数据。例如，用户可以运行语句来确定其权限、其schema中存在哪些表、这些表中存在哪些列、索引是否基于这些列构建等。`SELECT`

另请参阅：

- "[schema对象简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-72E247B5-F39A-47F1-9445-72D9221F57E3)"
- "[用户帐户](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-CE700CE1-BF1B-48C0-A905-50CEE055C4BC)"
- "[数据定义语言 （DDL） 语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-C25B548B-363A-4FE5-B4EE-784502BAAD08)"





#### 数据字典的内容

数据字典由基表和视图组成。

这些对象定义如下：

- 基表

  它们存储有关数据库的信息。只有 Oracle 数据库才能写入和读取这些表。用户很少直接访问基表，因为它们是规范化的，并且大多数数据都以神秘格式存储。

- 视图

  它们使用联接和子句将基表数据解码为有用的信息（如用户名或表名）以简化信息。视图包含数据字典中所有对象的名称和说明。某些视图可供所有数据库用户访问，而其他视图仅供管理员访问。`WHERE`

通常，数据字典视图按集分组。在许多情况下，一个集合由三个视图组成，其中包含类似的信息，并通过其前缀相互区分，如下表所示。通过查询相应的视图，您只能访问与您相关的信息。

表 6-1 数据字典视图集

| 前缀    | 用户访问     | 内容               | 笔记                                                         |
| :------ | :----------- | :----------------- | :----------------------------------------------------------- |
| `DBA_`  | 数据库管理员 | 所有对象           | 某些视图具有包含对管理员有用的信息的附加列。`DBA_`           |
| `ALL_`  | 所有用户     | 用户具有权限的对象 | 包括用户拥有的对象。这些视图遵循当前启用的角色集。           |
| `USER_` | 所有用户     | 用户拥有的对象     | 带有前缀的视图通常不包括列 。此列在视图中隐含为发出查询的用户。`USER_``OWNER``USER_` |

并非所有视图集都有三个成员。例如，数据字典包含一个视图，但没有视图。`DBA_LOCK``ALL_LOCK`

系统提供的视图包含所有数据字典视图的名称和缩写说明。此视图的以下查询包括部分示例输出：`DICTIONARY`

```
复制SQL> SELECT * FROM DICTIONARY
  2  ORDER BY TABLE_NAME;

TABLE_NAME                     COMMENTS
------------------------------ ----------------------------------------
ALL_ALL_TABLES                 Description of all object and relational
                               tables accessible to the user
 
ALL_APPLY                      Details about each apply process that
                               dequeues from the queue visible to the
                               current user
.
.
.
```

另请参阅：

- "[视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-15E7AEDB-9A3F-4B31-AD2D-66253CC822E5)"
- 有关数据字典视图及其列的完整列表的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-8865F65B-EF6D-44A5-B0A1-3179EFF0C36A)





##### 带有前缀DBA_的视图

带有前缀的视图显示整个数据库中的所有相关信息。 视图仅供管理员使用。`DBA_``DBA_`

以下示例查询显示有关数据库中所有对象的信息：

```
CopySELECT OWNER, OBJECT_NAME, OBJECT_TYPE
FROM   DBA_OBJECTS
ORDER BY OWNER, OBJECT_NAME;
```

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11047)了解有关管理权限的详细信息





##### 带有前缀ALL_的视图

带有前缀的视图是指用户对数据库的整体视角。`ALL_`

除了用户拥有的schema对象之外，这些视图还返回有关用户通过公共或显式授予特权和角色有权访问的schema对象的信息。

例如，以下查询返回有关您有权访问的所有对象的信息：

```
CopySELECT OWNER, OBJECT_NAME, OBJECT_TYPE 
FROM   ALL_OBJECTS
ORDER BY OWNER, OBJECT_NAME; 
```

由于视图遵循当前启用的角色集，因此查询结果取决于启用的角色，如以下示例所示：`ALL_`

```
CopySQL> SET ROLE ALL;
 
Role set.
 
SQL> SELECT COUNT(*) FROM ALL_OBJECTS;
 
COUNT(*)
----------
68295
 
SQL> SET ROLE NONE;
 
Role set.
 
SQL> SELECT COUNT(*) FROM ALL_OBJECTS;
 
COUNT(*)
----------
53771
```

应用程序开发人员在[**存储过程中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-21B42148-517A-4B25-B1E1-DBC165DE7A43)使用视图时应认识到角色的影响，默认情况下不启用角色。`ALL_`





##### 带有前缀USER_的视图

典型数据库用户最可能感兴趣的视图是带有前缀的视图。`USER_`

这些观点：

- 在数据库中引用用户的专用环境，包括有关用户创建的schema对象、用户授予的授权等的元数据
- 仅显示与用户相关的行，返回视图中信息的子集`ALL_`
- 具有与其他视图相同的列，只是该列是隐含的`OWNER`
- 为方便起见，可以有缩写的同义词`PUBLIC`

例如，以下查询返回schema中包含的所有对象：

```
CopySELECT OBJECT_NAME, OBJECT_TYPE 
FROM   USER_OBJECTS
ORDER BY OBJECT_NAME;
```





##### 双桌

`DUAL`是数据字典中的一个小表，Oracle 数据库和用户编写的程序可以引用该表以保证已知结果。

当值必须仅返回一次（例如，当前日期和时间）时，双表非常有用。所有数据库用户都有权访问 。`DUAL`

该表有一列称为，一行包含值。以下示例查询以执行算术运算：`DUAL``DUMMY``X``DUAL`

```
CopySQL> SELECT ((3*4)+5)/3 FROM DUAL;
 
((3*4)+5)/3
-----------
 5.66666667
```

另请参阅：

有关该表的详细信息，Oracle [数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF20036)`DUAL`





#### 数据字典的存储

数据字典基表是在任何 Oracle 数据库中创建的第一个对象。

数据库的所有数据字典表和视图都存储在表空间中。因为表空间在数据库打开时始终处于联机状态，所以数据字典在数据库打开时始终可用。`SYSTEM``SYSTEM`

另请参阅：

“系统表空间”以获取有关[表空间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-C1500AE3-17CD-4EF8-A83C-66A058C92CF5)的更多信息`SYSTEM`





#### Oracle 数据库如何使用数据字典

Oracle 数据库用户帐户拥有数据字典的所有基表和用户可访问的视图。`SYS`

在数据库操作期间，Oracle 数据库会读取数据字典，以确定schema对象是否存在以及用户是否具有对它们的适当访问权限。Oracle 数据库会不断更新数据字典，以反映数据库结构、审计、授权和数据的变化。

例如，如果用户创建名为 的表，则数据库会向数据字典添加新行，这些行反映了新表、列、段、盘区和对表具有的权限。下次查询字典视图时，此新信息可见。`hr``interns``hr`

数据字典基表中的数据*是 Oracle 数据库正常运行所必需的*。只有 Oracle 数据库应写入或更改数据字典信息。任何 Oracle 数据库*用户都不应*更改schema中包含的行或schema对象，因为此类活动可能会损害[**数据完整性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9DE527B3-8901-4F4C-A18F-D2C2C307AFE1)。安全管理员必须严格控制此中央帐户。`SYS`

警告：更改或操作数据字典表中的数据可能会对数据库操作产生永久性不利影响。

另请参阅：

"[系统和系统schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97709804-7430-4BD0-AFF4-727B74F6997E)"





##### 数据字典视图的公共同义词

Oracle 数据库为许多数据字典视图创建公共**同义词**，以便用户可以方便地访问它们。

安全性管理员还可以为系统范围内使用的schema对象创建其他公共同义词。Oracle 建议不要对私有schema对象和公共同义词使用相同的名称。

另请参阅：

"[同义词概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-4977D7F8-B766-4F4A-8FF6-B8496DED3DF2)"





##### 数据字典缓存

大部分数据字典信息都在**数据字典缓存**中，因为数据库不断需要这些信息来验证用户访问和验证schema对象的状态。

缓存通常包含分析信息。描述表及其列的列不缓存在字典缓存中，但可以缓存在**数据库缓冲区缓存**中。`COMMENTS`

另请参阅：

"[数据字典缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-66430838-7862-4389-96B5-795B99A72473)"





##### 其他程序和数据字典

其他 Oracle 数据库产品可以引用现有视图并创建自己的其他数据字典表或视图。

Oracle 建议编写引用数据字典的程序的应用程序开发人员使用公共同义词而不是基础表。同义词不太可能在版本之间更改。





### 动态性能视图概述

在整个运行过程中，Oracle 数据库维护一组记录当前数据库活动的虚拟表。

这些视图是动态的，因为它们在数据库打开和使用时会不断更新。视图有时称为 *V$ 视图*，因为它们的名称以 开头。`V$`

动态性能视图包含如下信息：

- 系统和[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)参数
- 内存使用和分配
- 文件状态（包括 [**RMAN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-13364DE9-0E15-488B-89E5-622316EC9796) 备份文件）
- 作业和任务的进度
- 数据库执行
- 统计信息和指标

动态性能视图具有以下主要用途：

- [**Oracle Enterprise Manager**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BE4BCB6A-5413-4FC3-86DF-FBEF66047F9C) 使用这些视图来获取有关数据库的信息。
- 管理员可以使用这些视图进行性能监视和调试。

另请参阅：

- "[Oracle企业管理器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-BE08A8FA-501A-418E-AD32-3E42AE762026)"
- 有关动态性能视图完整列表的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN003)





#### 动态性能视图的内容

动态性能视图称为固定视图，因为数据库管理员无法更改或删除动态*性能视图*。但是，数据库管理员可以查询和创建表上的视图，并向其他用户授予对这些视图的访问权限。

```
SYS`拥有动态性能表，其名称以 开头。在这些表上创建视图，然后创建前缀为 .例如，视图包含有关数据文件的信息。该视图包含有关所有动态性能表和视图的信息。`V_$``V$``V$DATAFILE``V$FIXED_TABLE
```

对于几乎每个视图，都存在相应的视图。在 Oracle Real Application Clusters （Oracle RAC） 中，查询视图会从所有合格的数据库实例中检索视图信息。`V$``GV$``GV$``V$`

使用数据库配置助手 （DBCA） 创建数据库时，Oracle 会自动创建数据字典。Oracle 数据库会自动运行该脚本，其中包含视图的定义和动态性能视图的公共同义词。必须运行才能创建这些视图和同义词。`catalog.sql``catalog.sql`

另请参阅：

- "[数据库服务器网格](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-D7DB2FC7-88D9-487E-A826-4D0086B150DD)"
- “[数据库安装和配置工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-87ACF317-FEBC-418C-9BE6-253F2C43F482)”以了解 DBCA
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11082)，了解如何手动运行`catalog.sql`
- Oracle [真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD718)，了解如何在 Oracle RAC 中使用性能视图





#### 动态性能视图的存储

动态性能视图基于从数据库内存结构构建的虚拟表。

视图不是存储在数据库中的传统表。不保证视图的读取一致性，因为数据是动态更新的。

由于动态性能视图不是 true 表，因此数据取决于数据库和[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的状态。例如，可以查询数据库何时启动但未装入。但是，在装入数据库之前，无法进行查询。`V$INSTANCE``V$BGPROCESS``V$DATAFILE`

另请参阅：

"[数据并发性和一致性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E8CBA9C5-58E3-460F-A82A-850E0152E95C)"





### 数据库对象元数据

该包提供了用于提取数据库对象的完整定义的接口。`DBMS_METADATA`

这些定义可以表示为 XML 或 SQL DDL。Oracle 数据库提供两种风格的界面：用于编程控制的灵活、复杂的界面，以及用于即席查询的简化界面。

另请参阅：

[Oracle 数据库 PL/SQL 包和类型参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS026)了解有关以下内容的更多信息`DBMS_METADATA`

## 第二部分 Oracle数据访问

**结构化查询语言 （SQL）** 是一种高级声明性计算机语言，所有程序和用户都使用它访问 Oracle 数据库中的数据。**PL/SQL** 和 **Java** 是服务器端过程语言，使您能够将数据逻辑存储在数据库本身中。

本部分包含以下章节：

- [.SQL](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-DA48618A-A6BB-421A-A10A-02859D8ED9AD)
- [服务器端编程：PL/SQL 和 Java](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-D4A154D2-DF56-45DA-863C-BED5DA6BDA34)

## 7 .SQL

本章概述了**结构化查询语言 （SQL）** 以及 Oracle 数据库如何处理 SQL 语句。

本章包括以下主题：

- [数据库简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-CBD8FE77-BA6F-4241-A71C-2ADDDF43EA7F)
- [SQL 语句概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-662EE4B0-7D5E-43F5-806D-A2AE404D77BF)
- [优化器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)
- [SQL 处理概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-0E8DFE97-F2DD-4183-8A4B-1EA9087E9E37)





### 数据库简介

SQL（发音为*续集*）是一种基于集合的高级声明性计算机语言，所有程序和用户都使用它访问 Oracle 数据库中的数据。

尽管某些 Oracle 工具和应用程序屏蔽了 SQL 的使用，但所有数据库任务都是使用 SQL 执行的。任何其他数据访问方法都会绕过 Oracle 数据库中内置的安全性，并可能危及数据安全性和完整性。

SQL 为关系型数据库（如 Oracle 数据库）提供了一个接口。SQL 将以下任务统一为一种一致的语言：

- 创建、替换、更改和删除对象
- 插入、更新和删除表行
- 查询数据
- 控制对数据库及其对象的访问
- 保证数据库的一致性和完整性

SQL可以交互使用，这意味着语句是手动输入到程序中的。SQL 语句也可以嵌入到用不同语言（如 C 或 Java）编写的程序中。

另请参阅：

- “[服务器端编程简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-6B5D98B7-A25D-4187-B3A9-43629E214635)”和“[客户端数据库编程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-87F23274-B506-486B-8775-880016095EF5)”
- 有关 SQL 简介的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF001)





#### SQL 数据访问

计算机语言有两大类：非过程**性**语言，描述应该*做什么*，以及**过程语言**，如C++和Java，描述应该*如何*做事。

SQL是声明性的，因为用户指定他们想要的结果，而不是如何派生它。例如，以下语句查询姓氏以 开头的员工的记录：`K`

数据库执行生成过程的工作，以导航数据并检索请求的结果。SQL 的声明性特性使您能够在逻辑级别处理数据。只有在操作数据时，才需要关注实现细节。

```
复制SELECT   last_name, first_name
FROM     hr.employees
WHERE    last_name LIKE 'K%'
ORDER BY last_name, first_name;
```

数据库在一个步骤中检索满足[**条件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5AA8627-E7DC-487B-8D4B-2DE3F1497A83)的所有行（也称为[**谓词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-891CF9E9-78CD-470C-9C4A-D65A101B2C38)）。数据库可以将这些行作为一个单元传递给用户、另一个 SQL 语句或应用程序。应用程序不需要逐个处理行，开发人员也不需要知道行是如何物理存储或检索的。`WHERE`

所有 SQL 语句都使用优化器，优化器是数据库的一个组件，用于确定访问所请求数据的最有效方法。Oracle 数据库还支持可用于使优化程序更好地执行其工作的技术。

另请参阅：

有关 SQL 语句和 SQL 其他部分（如运算符、函数和格式模型）的详细信息，Oracle [数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF002)





#### SQL 标准

Oracle 努力遵循行业公认的标准，并积极参与 SQL 标准委员会。

行业认可的委员会是美国国家标准协会（ANSI）和国际标准化组织（ISO）。ANSI和ISO/IEC都接受SQL作为关系型数据库的标准语言。

SQL 标准由十个部分组成。一部分（SQL/RPR：2012）是2102年新增的。2011年修订了其他五个部分。对于其他四个部分，2008年版本保持不变。

Oracle SQL 包括对 ANSI/ISO 标准 SQL 语言的许多扩展，[**Oracle**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-48DAF4AC-49FB-453A-A48B-AF225FEA600B) 数据库工具和应用程序提供了额外的语句。SQL*Plus、SQL Developer 和 Oracle Enterprise Manager 工具使您能够针对 Oracle 数据库以及可用于这些工具的任何其他语句或函数运行任何 ANSI/ISO 标准 SQL 语句。

另请参阅：

- “数据库管理员工具”和“[数据库开发人员工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-D1C1BC1D-03C7-4A18-BB88-0D76F311DAF0)”
- Oracle [Database SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF019)，了解 Oracle SQL 和标准 SQL 之间的差异
- [SQL*Plus 用户指南 和 SQL*Plus 命令参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-BF1995BD-EF9B-4EA2-9B32-7BFACDEB79DA)，包括它们与 SQL 语句的区别





### SQL 语句概述

对 Oracle 数据库中的信息执行的所有操作都使用 SQL **语句**运行。SQL 语句是由标识符、参数、变量、名称、数据类型和 SQL **保留字**组成的计算机程序或指令。

注意：SQL 保留字在 SQL 中具有特殊含义，不应用于任何其他目的。例如，`SELECT` 和 `UPDATE` 是保留字，不应用作表名。

SQL 语句必须等效于完整的 SQL 语句，例如：

```
复制
选择last_name，department_id员工
```

Oracle 数据库仅运行完整的 SQL 语句。如下所示的片段会生成错误，指示需要更多文本：

```
复制
选择last_name;
```

Oracle SQL 语句分为以下几类：

- [数据定义语言 （DDL） 语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-C25B548B-363A-4FE5-B4EE-784502BAAD08)
- [数据操作语言 （DML） 语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-90EA5D9B-76F2-4916-9F7E-CF0D8AA1A09D)
- [事务控制语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-73F24816-881A-4849-B8A7-EA9B446A24A7)
- [会话控制语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-261BEAAC-0897-465D-9137-D201CE80675C)
- [系统控制声明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-9D63E5DD-E0EF-42AE-B460-74165BB016F3)
- [嵌入式 SQL 语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-AE8D7440-ED46-4FE8-9475-F3D0AD2E19CF)





#### 数据定义语言 （DDL） 语句

数据定义语言 （**DLL）** 语句定义、结构更改和删除schema对象。

DDL 使您能够更改对象的属性，而无需更改访问该对象的应用程序。例如，您可以向人力资源应用程序访问的表中添加列，而无需重写该应用程序。您还可以使用 DDL 在数据库用户在数据库中执行工作时更改对象的结构。

更具体地说，DDL 语句使您能够：

- 创建、更改和删除schema对象和其他数据库结构，包括数据库本身和数据库用户。大多数 DDL 语句都以关键字 、 或 开头。`CREATE``ALTER``DROP`

- 删除schema对象中的所有数据，而不删除这些对象的结构 （）。`TRUNCATE`

  注意：与 DELETE 不同，`TRUNCATE` 不会生成[**撤消数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-297B963A-989C-4720-B061-A2352FF72892)，这使得它比 `DELETE` 更快。``此外，`TRUNCATE` 不会调用删除触发器

- 授予和撤消特权和角色 （、）。`GRANT``REVOKE`

- 打开和关闭审核选项 （， ）。`AUDIT``NOAUDIT`

- 向[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)添加注释 （）。`COMMENT`

例 7-1 DDL 语句

下面的示例使用 DDL 语句创建表，然后使用 DML 在表中插入两行。然后，该示例使用 DDL 更改表结构，向用户授予和撤消对此表的读取权限，然后删除该表。`plants`

```
复制创建工作台植物
 （plant_id数字主键，
 common_name 瓦尔查尔2（15） ）;

插入植物值（1，“非洲紫”）;# DML 语句

插入植物值（2，“阿玛丽利斯”）;# DML 语句

改变工作台植物添加
 （ latin_name 瓦尔查尔2（40） ）;

格兰特读到植物给斯科特;

从斯科特那里撤销对植物的阅读;

落台植物;
```

隐式发生在数据库执行 DDL 语句之前，或者紧接着发生。在前面的示例中，两个语句后跟一个语句，因此数据库提交这两个语句。如果语句成功，则数据库提交此语句;否则，数据库将回滚此语句。无论哪种情况，这两个语句都已经提交。`COMMIT``COMMIT``ROLLBACK``INSERT``ALTER TABLE``INSERT``ALTER TABLE``INSERT`

另请参阅：

- “[数据库安全概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-4D6D2B67-1B65-476D-852A-976E9D153EEC)”以了解特权和角色
- Oracle 数据库 [2 天开发人员](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG30000)指南和 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01503)，了解如何创建schema对象
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS187)，了解阻塞和非阻塞 DDL 之间的区别
- 有关 DDL 语句列表的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30041)





#### 数据操作语言 （DML） 语句

数据操作语言 （**DML**） 语句查询或操作现有schema对象中的数据。

DDL 语句更改数据库的结构，而 DML 语句查询或更改内容。例如，更改表的结构，而向表中添加一行或多行。`ALTER TABLE``INSERT`

DML 语句是最常用的 SQL 语句，使您能够：

- 从一个或多个表或视图中检索或提取数据 （）。`SELECT`
- 通过指定列值列表或使用[**子查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C1CDE912-86C4-4495-8959-0CF8196189B2)来选择和操作现有数据，将新数据行添加到表或视图 （） 中。`INSERT`
- 更改表或视图的现有行中的列值 （）。`UPDATE`
- 有条件地更新行或将行插入到表或[**视图中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1274BCF5-2EC1-4752-B9CE-998A85A83307) （）。`MERGE`
- 从表或视图中删除行 （）。`DELETE`
- 查看 SQL 语句的[**执行计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361) （ ）。`EXPLAIN``PLAN`
- 锁定表或视图，暂时限制其他用户的访问 （ ）。`LOCK``TABLE`

以下示例使用 DML 查询表。该示例使用 DML 将一行插入到 中，更新此行，然后将其删除：`employees``employees`

```
CopySELECT * FROM employees;

INSERT INTO employees (employee_id, last_name, email, job_id, hire_date, salary)
  VALUES (1234, 'Mascis', 'JMASCIS', 'IT_PROG', '14-FEB-2008', 9000);

UPDATE employees SET salary=9100 WHERE employee_id=1234;

DELETE FROM employees WHERE employee_id=1234;
```

构成逻辑工作单元的 DML 语句集合称为[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)。例如，转账交易可能涉及三个离散操作：减少储蓄账户余额、增加支票账户余额以及将转账记录在账户历史记录表中。与 DDL 语句不同，DML 语句不会隐式提交当前事务。

另请参阅：

- "[DML 和 DDL 处理之间的差异](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-290D145D-07B9-4AF7-A91E-BCC444D21487)"
- "[交易简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-31319EA7-994C-4D25-8814-0214ABD3CBDA)"
- [Oracle数据库2天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG20000)，了解如何查询和操作数据
- DML 语句列表的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30042)





##### 选择语句

**查询**是从表或视图中检索数据的操作。

```
SELECT`是唯一可用于查询数据的 SQL 语句。从执行语句中检索的数据集称为**结果集**。`SELECT
```

下表显示了语句中常见的两个必需关键字和两个关键字。该表还将语句的功能与关键字相关联。`SELECT``SELECT`

表 7-1 SQL 语句中的关键字

| 关键词     | 必填？ | 描述                                                         | 能力 |
| :--------- | :----- | :----------------------------------------------------------- | :--- |
| `SELECT`   | 是的   | 指定应在结果中显示的列。投影生成表中列的子集。[**表达式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E2141FFA-A7B2-4113-BEEE-2401FC38AB2E)是一个或多个值、运算符和解析为值的 SQL 函数的组合。在关键字之后和子句之前显示的表达式列表称为[**选择列表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71197B02-49AE-43D6-B9A2-E3887B36D823)。`SELECT``FROM` | 投影 |
| `FROM`     | 是的   | 指定应从中检索数据的表或视图。                               | 加入 |
| `WHERE`    | 不     | 指定筛选行的条件，从而生成表中行的子集。条件指定一个或多个表达式和逻辑（布尔）运算符的组合，并返回值 、 或 。`TRUE``FALSE``UNKNOWN` | 选择 |
| `ORDER BY` | 不     | 指定行的显示顺序。                                           |      |

另请参阅：

适用于语法和语义的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01702)`SELECT`





##### 加入

**联接**是合并来自两个或多个表、视图或实例化视图的行的查询。

下面的示例联接 and 表 （ 子句），仅选择满足指定条件的行 （ 子句），并使用投影从两列 （） 检索数据。SQL 语句之后的示例输出。`employees``departments``FROM``WHERE``SELECT`

```
CopySELECT email, department_name
FROM   employees 
JOIN   departments
ON     employees.department_id = departments.department_id
WHERE  employee_id IN (100,103)
ORDER BY email;

EMAIL                     DEPARTMENT_NAME
------------------------- ------------------------------
AHUNOLD                   IT
SKING                     Executive
```

下图表示上述查询中显示的联接中的投影和选择操作。

图 7-1 投影和选择

![图 7-1 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt290.gif)
[“图 7-1 投影和选择”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt290.html)

大多数联接在子句或子句中至少有一个[**联接条件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6DF529B9-611D-4C00-BAF8-614E86BCB39E)，用于比较两列，每列来自不同的表。数据库组合了行对，每行包含每个表中的一行，其连接条件的计算结果为 。优化程序根据连接条件、索引和表的任何可用统计信息确定数据库连接表的顺序。`FROM``WHERE``TRUE`

联接类型包括：

- 内联接

  内部连接是两个或多个表的连接，仅返回满足[**连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C275B9B4-5209-4DFB-86FD-2635881971F3)条件的行。例如，如果连接条件为 ，则不返回不满足此条件的行。`employees.department_id=departments.department_id`

- 外连接

  外连接返回满足[**连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-61D9CE46-D3B4-4E22-81F9-5170CC2B20BD)条件的所有行，还返回一个表中没有另一个表中的行满足条件的行。

  表 A 和 B 的[**左外连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5B6697AD-111B-4293-91EF-1BAB303534E8)的结果始终包含左侧表 *A* 的所有记录，即使连接条件与右侧表 *B* 中的记录不匹配也是如此。如果*不存在*来自 B 的匹配行，则 B 列包含 *B* 中不匹配的行的 null。例如，如果并非所有员工都在部门中，则 （左表） 和 （右表） 的左外联接将检索中的所有行，即使 中没有行满足联接条件 （ 为 null）。`employees``departments``employees``departments``employees.department_id`

  表 A 和 B 的[**右外连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6D63E1DD-4066-416C-AF21-DC6A6AF58750)的结果包含右侧表 *B* 的所有记录，即使连接条件与左侧表 *A* 中的行不匹配也是如此。如果不存在来自 A 的匹配行，则 A 列包含 *A* 中不匹配的行的空值。例如，如果并非所有部门都有员工，则 （左表） 和 （右表） 的右外联接将检索中的所有行，即使 中没有行满足联接条件也是如此。`employees``departments``departments``employees`

  完全外联接是左外联接和右[**外联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3A2D0F05-0133-465B-B66D-CA3AE275EC40)的组合。

- 笛卡尔乘积

  如果连接查询中的两个表没有连接条件，则数据库将执行[**笛卡尔连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2FFB73C6-7BE4-489A-A1BA-D39445C136D5)。一个表的每一行都与另一个表的每一行合并。例如，如果有 107 行并且有 27 行，则笛卡尔积包含 107*27 行。笛卡尔乘积很少有用。`employees``departments`

另请参阅：

- 了解联接的 [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL242)
- 有关联接的详细说明和示例的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30046)





##### 子查询

**子查询**是嵌套在另一个 SQL 语句中的语句。当必须执行多个查询来解决单个问题时，子查询非常有用。`SELECT`

语句的每个查询部分称为[**查询块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-53DFB7AA-B16E-421D-B592-CBF715742D93)。在以下查询中，括号中的子查询是内部查询块：

```
CopySELECT first_name, last_name 
FROM   employees
WHERE  department_id 
IN     ( SELECT department_id 
         FROM departments 
         WHERE location_id = 1800 );
```

内部语句检索位置 ID 为 1800 的部门的 ID。外部查询块需要这些部门 ID，该块检索子查询提供其 ID 的部门中员工的姓名。`SELECT`

SQL 语句的结构不会强制数据库首先执行内部查询。例如，数据库可以将整个查询重写为 和 的连接，以便子查询永远不会自行执行。再举一个例子，虚拟私有数据库（VPD）功能可以使用子句限制员工的查询，使数据库先查询员工，然后再获取部门ID。优化程序确定检索所请求行的最佳步骤序列。`employees``departments``WHERE`

另请参阅：

"[虚拟专用数据库 （VPD）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-89DB0C3C-A36F-4254-8C82-020F5F6DE31F)"





#### 事务控制语句

事务控制语句管理 DML 语句所做的更改，并将 DML 语句分组到事务中。

这些语句使您能够：

- 使对事务的更改永久化 （）。`COMMIT`

- 撤消事务中自事务开始 （） 或保存点 （） 以来的更改。[**保存点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ED9601F2-D0A2-4FE5-83A8-8F7F9E9E0D18)是事务上下文中用户声明的中间标记。`ROLLBACK``ROLLBACK TO SAVEPOINT`

  注意：ROLLBACK 语句结束事务，但 `ROLLBACK TO SAVEPOINT` 不会。``

- 设置可以回滚到的点 （）。`SAVEPOINT`

- 为事务建立属性 （ ）。`SET``TRANSACTION`

- 指定是在每个 DML 语句之后检查可延迟[**完整性约束**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-67F8FE8C-EBA5-4796-820A-8919982A1411)，还是在提交事务时检查 （）。`SET CONSTRAINT`

下面的示例启动一个名为 的事务。该示例创建一个保存点，更新员工工资，然后将事务回滚到保存点。该示例将薪水更新为不同的值并提交。`Update salaries`

```
CopySET TRANSACTION NAME 'Update salaries';

SAVEPOINT before_salary_update;

UPDATE employees SET salary=9100 WHERE employee_id=1234 # DML

ROLLBACK TO SAVEPOINT before_salary_update;

UPDATE employees SET salary=9200 WHERE employee_id=1234 # DML

COMMIT COMMENT 'Updated salaries';
```

另请参阅：

- "[交易简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-31319EA7-994C-4D25-8814-0214ABD3CBDA)"
- "[当数据库检查约束的有效性时](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-ED1E9D21-EDFB-4AAD-9193-87D576F67761)"
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30043)，了解事务控制语句





#### 会话控制语句

会话控制语句动态管理用户**会话**的属性。

会话是数据库实例内存中的一个逻辑实体，表示当前用户登录到数据库的状态。会话从数据库对用户进行身份验证开始持续，直到用户断开连接或退出数据库应用程序。

会话控制语句使您能够：

- 通过执行专用功能（如设置默认日期格式 （））来更改当前会话。`ALTER SESSION`
- 为当前会话启用和禁用角色，这些角色是权限组 （）。`SET ROLE`

以下语句将会话的默认日期格式动态更改为：`'YYYY MM DD-HH24:MI:SS'`

```
CopyALTER SESSION 
   SET NLS_DATE_FORMAT = 'YYYY MM DD HH24:MI:SS';
```

会话控制语句不会隐式提交当前事务。

另请参阅：

- "[连接和会话](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-3A11FF2F-50EE-4839-A1A6-F746DFF634AB)"
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30044)`ALTER SESSION`





#### 系统控制声明

系统控制语句更改**数据库实例**的属性。

唯一的系统控制语句是 。它使您能够更改设置，例如共享服务器的最小数量、终止会话以及执行其他系统级任务。`ALTER SYSTEM`

系统控制语句的示例包括：

```
CopyALTER SYSTEM SWITCH LOGFILE; 

ALTER SYSTEM KILL SESSION '39, 23';
```

该语句不会隐式提交当前事务。`ALTER SYSTEM`

另请参阅：

适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00902)`ALTER SYSTEM`





#### 嵌入式 SQL 语句

嵌入式 SQL 语句将 DDL、DML 和事务控制语句合并到过程语言程序中。.

嵌入式语句与 Oracle 预编译器一起使用。嵌入式 SQL 是将 SQL 合并到过程语言应用程序中的一种方法。另一种方法是使用过程 API，例如开放式数据库连接 （ODBC） 或 Java 数据库连接 （JDBC）。

嵌入式 SQL 语句使您能够：

- 定义、分配和释放[**游标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D1D3E8DD-CD5C-4C0D-93E4-DE0BF0BD53A3) （、、）。`DECLARE CURSOR``OPEN``CLOSE`
- 指定数据库并连接到该数据库 （， ）。`DECLARE DATABASE``CONNECT`
- 分配变量名称 （）。`DECLARE STATEMENT`
- 初始化描述符 （）。`DESCRIBE`
- 指定如何处理错误和警告条件 （）。`WHENEVER`
- 解析并运行 SQL 语句 （、、）。`PREPARE``EXECUTE``EXECUTE IMMEDIATE`
- 从数据库中检索数据 （）。`FETCH`

另请参阅：

“[服务器端编程简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-6B5D98B7-A25D-4187-B3A9-43629E214635)”和“[客户端 API](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-73D7F3B6-47B7-400B-8F3C-BE904400C0FC)”





### 优化器概述

要了解 Oracle 数据库如何处理 SQL 语句，必须了解称为优化**器的**数据库部分（也称为查询优化器或*基于开销的优化器*）。所有 SQL 语句都使用优化器来确定访问指定数据的最有效方法。





#### 优化器的使用

优化程序生成描述可能的执行方法的执行计划。

优化程序通过考虑多个信息源来确定哪个执行计划最有效。例如，优化程序会考虑查询条件、可用访问路径、为系统收集的统计信息和提示。

要执行 DML 语句，Oracle 数据库可能必须执行许多步骤。每个步骤要么从数据库中物理检索数据行，要么为发出语句的用户准备数据行。数据库用于执行语句的步骤会极大地影响语句的运行速度。处理 DML 语句的许多不同的方法通常是可能的。例如，访问表或索引的顺序可能会有所不同。

在确定 SQL 语句的最佳执行计划时，优化程序执行以下操作：

- 表达式和条件的评估
- 检查完整性约束以了解有关数据的更多信息并基于此元数据进行优化
- 语句转换
- 优化器目标的选择
- 访问路径的选择
- 连接顺序的选择

优化程序生成处理查询的大多数可能方法，并为生成的执行计划中的每个步骤分配成本。选择成本最低的计划作为要执行的[**查询计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)。

注意：您可以获取 SQL 语句的执行计划，而无需执行计划。只有数据库实际用于执行查询的执行计划才被正确地称为查询计划。

您可以通过设置优化器目标和收集优化器的代表性统计信息来影响优化器选择。例如，可以将优化程序目标设置为以下任一目标：

- 总吞吐量

  该提示指示优化程序尽快将结果的最后一行发送到客户端应用程序。`ALL_ROWS`

- 初始响应时间

  该提示指示优化程序尽快将第一行发送到客户端。`FIRST_ROWS`

典型的最终用户交互式应用程序将受益于初始响应时间优化，而批处理模式的非交互式应用程序将受益于总吞吐量优化。

另请参阅：

- [Oracle 数据库 PL/SQL 包和类型参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS059)了解有关使用`DBMS_STATS`
- [Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL202)了解有关优化器和使用提示的详细信息





#### 优化器组件

优化器包含三个主要组件：转换器、估计器和计划生成器。

下图描述了这些组件：

图 7-2 优化器组件

![图 7-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt287.gif)
[“图 7-2 优化器组件”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt287.html)

优化器的输入是经过分析的查询。优化程序执行以下操作：

1. 优化程序接收已解析的查询，并根据可用的访问路径和提示为 SQL 语句生成一组可能的计划。
2. 优化程序根据数据字典中的统计信息估计每个计划的成本。成本是与使用特定计划执行语句所需的预期资源使用成比例的估计值。
3. 优化程序比较计划的成本，并选择成本最低的计划（称为查询计划）传递给行源生成器。

另请参阅：

- "[SQL 解析](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-B3F2B5B8-B679-4A7C-B1E8-286F36319FCB)"
- "[SQL 行源生成](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-A8B73B3C-991F-4E91-8AA5-DEFBDFAB0539)"





##### 查询转换器

查询**转换器**确定更改查询的形式是否有帮助，以便优化程序可以生成更好的执行计划。查询转换器的输入是已分析的查询，优化程序将其表示为一组查询块。

另请参阅：

"[查询重写](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-C2F8D519-A8E9-4793-A053-36B4C4060B62)"





##### 估计

**估算器**确定给定执行计划的总体成本。

估算器生成三种不同类型的度量值来实现这一目标：

- 选择性

  此度量值表示行集中的一小部分行。选择性与查询谓词（如 ）或谓词的组合相关联。`last_name='Smith'`

- 基数

  此度量值表示行集中的行数。

- 成本

  此度量表示使用的工作单位或资源。查询优化器使用磁盘 I/O、CPU 使用情况和内存使用情况作为工作单元。

如果统计数据可用，则估计器使用它们来计算度量。统计数据提高了测量的准确性。





##### 计划生成器

计划**生成器**会为提交的查询尝试不同的计划。优化程序选择成本最低的计划。

对于每个嵌套子查询和未合并的视图，优化程序都会生成一个子计划。优化程序将每个子计划表示为单独的[**查询块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-53DFB7AA-B16E-421D-B592-CBF715742D93)。计划生成器通过尝试不同的访问路径、联接方法和联接顺序来探索查询块的各种计划。

[**自适应查询优化**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-687D126F-F8FD-4308-B95B-7D4B2D5406FC)功能根据语句执行期间收集的统计信息更改计划。所有自适应机制都可以为与默认计划不同的语句执行最终计划。自适应优化使用动态计划（在语句执行期间在子计划之间进行选择）或重新优化（在当前执行后更改执行计划）。

另请参阅：

- "[应用程序和 SQL 调优](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-6AF46C02-62A0-4302-A981-8A10EDF7F966)"
- [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL202)，了解优化器组件和自适应优化





#### 访问路径

**访问路径**是查询用于检索行的技术。

例如，使用索引的查询与不使用索引的查询具有不同的访问路径。通常，索引访问路径最适合检索一小部分表行的语句。完全扫描对于访问表的大部分更有效。

数据库可以使用多个不同的访问路径从表中检索数据。以下是代表性列表：

- 全表扫描

  这种类型的扫描从表中读取所有行，并筛选出不符合选择条件的行。数据库按顺序扫描段中的所有数据块，包括高[**水位线 （HWM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3F5ACB2-94C8-483F-B427-1981836D0609) 下的数据块，用于分隔已用空间和未使用空间的数据块（请参阅“[段空间和高水位线](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE)”）。

- 罗维德扫描

  行的 [**rowid**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-647822F1-EFF1-4E26-BE22-D54081BE1C7B) 指定包含该行的数据文件和数据块以及该行在该块中的位置。数据库首先从语句子句或通过索引扫描获取所选行的 rowid，然后根据其 rowid 定位每个选定行。`WHERE`

- 索引扫描

  此扫描在索引中搜索 SQL 语句访问的索引列值（请参阅“[索引扫描](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-D54BD14D-0065-4B61-B2F6-5567913B16CD)”）。如果语句仅访问索引的列，则 Oracle 数据库直接从索引读取索引列值。

- 群集扫描

  集群扫描从存储在索引[**表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)集群中的表中检索数据，其中具有相同集群键值的所有行都存储在同一个数据块中（请参阅“[索引集群概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-CC31365B-83B0-4E09-A047-BF1B79AC887A)”）。数据库首先通过扫描聚类索引来获取所选行的 rowid。Oracle 数据库根据此行查找行。

- 哈希扫描

  哈希扫描在哈希簇中查找行，其中具有相同散列值的所有行都存储在同一个数据块中（请参阅“[散列簇概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-22771373-D8B8-4A76-9F08-1567489269BB)”）。数据库首先通过将哈希函数应用于语句指定的集群键值来获取[**哈希**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DDDDC4BC-ADB8-40D7-9733-60CED8E4A83E)值。然后，Oracle 数据库扫描包含具有此哈希值的行的数据块。

优化程序根据语句的可用访问路径以及使用每个访问路径或路径组合的估计开销来选择访问路径。

另请参阅：

《Oracle 数据库 [2 天 + 性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPPT170)》和[《Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL228)》，了解访问路径





#### 优化器统计信息

**优化程序统计信息**是描述有关数据库和数据库中对象的详细信息的数据集合。统计信息提供了优化程序在评估访问路径时可用的数据存储和分布的统计正确图片。

优化程序统计信息包括以下内容：

- 表统计信息

  其中包括行数、块数和平均行长度。

- 列统计信息

  其中包括列中非重复值和空值的数量以及数据的分布。

- 指数统计

  其中包括叶块的数量和索引级别。

- 系统统计

  其中包括 CPU 和 I/O 性能和利用率。

Oracle 数据库会自动收集所有数据库对象的优化器统计信息，并将这些统计信息作为自动维护任务进行维护。您还可以使用该包手动收集统计信息。此 PL/SQL 包可以修改、查看、导出、导入和删除统计信息。`DBMS_STATS`

注意：优化器统计信息是为查询优化而创建的，并存储在数据字典中。不要将这些统计信息与通过动态性能视图显示的性能统计信息混淆。

优化器统计信息顾问是内置的诊断软件，用于分析当前收集统计信息的方式、现有统计信息收集作业的有效性以及收集的统计信息的质量。优化器统计顾问维护规则，这些规则体现了基于当前功能集的 Oracle 最佳实践。通过这种方式，顾问始终为统计信息收集提供最新的建议。

另请参阅：

- [Oracle 数据库 2 天 + 性能](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPPT007)调优[指南和 Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL389)，了解如何收集和管理统计信息
- 要了解的 [Oracle 数据库 PL/SQL 包和类型参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS059)`DBMS_STATS`





#### 优化器提示

**提示**是 SQL 语句中的注释，用作对优化程序的指令。

有时，应用程序设计者（其有关特定应用程序数据的信息比优化程序可用的信息更多）可以选择更有效的方式来运行 SQL 语句。应用程序设计者可以使用 SQL 语句中的提示来指定语句的运行方式。以下示例说明了提示的用法。

示例 7-2 带有FIRST_ROWS提示的 SELECT 执行计划

假设交互式应用程序运行返回 50 行的查询。此应用程序最初仅提取要呈现给最终用户的查询的前 25 行。您希望优化程序生成一个计划，该计划尽快获取前 25 条记录，以便用户不会被迫等待。您可以使用提示将此指令传递给优化程序，如以下示例中的语句和输出所示：`SELECT``AUTOTRACE`

```
复制选择 /*+ FIRST_ROWS（25） */ employee_id，department_id
来自人力资源员工
其中department_id >50;

------------------------------------------------------------------------
|编号 |运营 |姓名 |行 |字节
------------------------------------------------------------------------
|0 |选择声明 | |26 |182
|1 |按索引 ROWID 访问表数 |员工 |26 |182
|* 2 |索引范围扫描 |EMP_DEPARTMENT_IX | |
------------------------------------------------------------------------
```

在此示例中，执行计划显示优化程序在列上选择一个索引来查找部门 ID 超过 25 的前 50 行。优化程序使用从索引检索的 rowid 从表中检索记录并将其返回到客户端。第一条记录的检索通常几乎是即时的。`employees.department_id``employees``employees`

示例 7-3 无提示的 SELECT 执行计划

假设您执行相同的语句，但没有优化程序提示：

```
复制选择employee_id，department_id
来自人力资源员工
其中department_id >50;
 
------------------------------------------------------------------------
|编号 |运营 |姓名 |行 |字节 |因为
------------------------------------------------------------------------
|0 |选择声明 | |50 |350 |
|* 1 |查看 |指数$_join$_001 |50 |350 |
|* 2 |哈希连接 | | | |
|* 3 |索引范围扫描 |EMP_DEPARTMENT_IX |50 |350 |
|4 |索引快速全扫描|EMP_EMP_ID_PK |50 |350 |
```

在这种情况下，执行计划连接两个索引以尽快返回请求的记录。优化程序不会像[示例 7-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-FC019793-FC08-46DB-A74C-8BF6C60ACECB__CHDBEDFI) 那样重复从一个索引转到另一个表，而是选择范围扫描以查找部门 ID 超过 50 的所有行，并将这些行放在[**哈希表中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1EBD10A8-7E0A-45B9-94CB-0859F4773082)。然后，优化程序选择读取索引。对于此索引中的每一行，它会探测哈希表以查找部门 ID。`EMP_DEPARTMENT_IX``EMP_EMP_ID_PK`

在这种情况下，在索引范围扫描完成之前，数据库无法将第一行返回到客户端。因此，此生成的计划将需要更长的时间才能返回第一条记录。[与示例 7-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-FC019793-FC08-46DB-A74C-8BF6C60ACECB__CHDBEDFI) 中的计划（通过索引 rowid 访问表）不同，该计划使用多块 I/O，从而导致读取量较大。读取操作可以更快地返回整个结果集的最后一行。`EMP_DEPARTMENT_IX`

另请参阅：

[Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL260)，了解如何使用优化器提示





### SQL 处理概述

本节介绍 Oracle 数据库如何处理 SQL 语句。具体而言，本节介绍了数据库处理 DDL 语句以创建对象、DML 以修改数据以及查询以检索数据的方式。





#### SQL 处理的各个阶段

SQL 处理的一般阶段是解析、优化、行源生成和执行。根据语句，数据库可能会省略其中一些步骤。

下图描述了常规阶段：

图 7-3 SQL 处理的各个阶段

![图 7-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt250.gif)
[“图 7-3 SQL 处理阶段”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt250.html)





##### SQL 解析

SQL 处理的第一阶段是 **SQL 解析**。此阶段涉及将 SQL 语句的各个部分分离为可由其他例程处理的数据结构。

当应用程序发出 SQL 语句时，应用程序会对数据库进行解析调用，以准备要执行的语句。parse 调用将打开或创建一个游标，[**游标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D1D3E8DD-CD5C-4C0D-93E4-DE0BF0BD53A3)是特定于会话的[**专用 SQL 区域的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B296BAF-BAC8-4DE7-8128-464F4BA3C366)句柄，该区域保存已分析的 SQL 语句和其他处理信息。游标和专用 SQL 区域位于 [**PGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19927E75-4983-4D59-A03D-C630E9908897) 中。

在解析调用期间，数据库将执行以下检查：

- 语法检查
- 语义检查
- 共享池检查

前面的检查标识在*语句执行之前*可以找到的错误。某些错误无法通过解析捕获。例如，数据库仅在语句执行期间才会遇到[**死锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E33D1853-7F99-4FDD-9CC7-D6308E943D61)或数据转换错误。

另请参阅：

"[锁和死锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-C1971E9B-849A-4634-9575-4F8FAD697750)"





##### SQL 优化

**查询优化**是选择执行 SQL 语句的最有效方法的过程。

数据库根据收集的有关正在访问的实际数据的统计信息优化查询。优化程序使用行数、数据集大小和其他因素来生成可能的执行计划，并为每个计划分配数字成本。数据库使用成本最低的计划。

数据库必须对每个唯一的 DML 语句至少执行一次硬解析，并在此解析期间执行优化。DDL 永远不会优化，除非它包含 DML 组件（如需要优化的子查询）。

另请参阅：

- "[优化器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)"
- [Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL193)了解有关查询优化器的详细信息





##### SQL 行源生成

**行源生成器**是从优化器接收最佳执行计划并生成可由数据库其余部分使用的迭代计划（称为**查询计划**）的软件。

查询计划采用步骤组合的形式。每个步骤返回一个[**行集**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C23DF6EB-4BE3-46E7-98B5-E3DCA2E01E4A)。此集中的行要么由下一步使用，要么在最后一步中返回到发出 SQL 语句的应用程序。

行[**源**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BE1723B5-DDC4-4896-9C77-C9B2FA8EA453)是由执行计划中的步骤返回的行集，以及可以迭代处理行的控制结构。行源可以是表、视图或联接或分组操作的结果。





##### SQL 执行

在执行期间，SQL 引擎执行行源生成器生成的树中的每个行源。这是 DML 处理中唯一的必填步骤。

在执行期间，如果数据不在内存中，则数据库会将数据从磁盘读入内存。数据库还会取出确保数据完整性所需的任何锁和闩锁，并记录在 SQL 执行期间所做的任何更改。处理 SQL 语句的最后阶段是关闭游标。

如果数据库配置为使用内存中列存储（IM [**列存储**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A19D33EA-7BAA-42C0-9E13-6AF686E2A976)），则数据库会尽可能透明地将查询路由到 IM 列存储，否则将路由到磁盘和数据库缓冲区缓存。单个查询还可以使用 IM 列存储、磁盘和缓冲区缓存。例如，查询可能联接两个表，其中只有一个表缓存在 IM 列存储中。

另请参阅：

- "[内存中区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-80C1C6A3-3E48-4868-ACA1-370C4D341209)"
- [*Oracle 数据库 SQL 调优指南，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL271)了解有关执行计划和语句的详细信息`EXPLAIN PLAN`





#### DML 和 DDL 处理之间的差异

Oracle Database 处理 DDL 的方式与 DML 不同。

例如，创建表时，数据库不会优化语句。相反，Oracle 数据库解析 DDL 语句并执行命令。`CREATE TABLE`

与 DDL 相比，大多数 DML 语句都有一个查询组件。在查询中，执行游标会将查询生成的行放入结果集中。

数据库可以一次读取一行或成组读取结果集行。在提取中，数据库选择行，如果查询请求，则对行进行排序。每次连续的读取都会检索结果的另一行，直到读取最后一行。

另请参阅：

[Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS134)，了解如何处理 DDL、事务控制和其他类型的语句

## 8 服务器端编程：PL/SQL 和 Java

SQL 解释了结构化查询语言 （SQL） 语言以及数据库如何处理 **SQL** 语句。本章解释存储在数据库中的过程语言/SQL （PL/SQL） 或 Java 程序如何使用 SQL。

本章包括以下主题：

- [服务器端编程简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-6B5D98B7-A25D-4187-B3A9-43629E214635)
- [PL/SQL 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-1E17CED5-73C6-4C10-85F1-A2CB4D5F9855)
- [Oracle 数据库中的 Java 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-DDFED855-D1F3-4AB2-8FD3-B2A1B3C922D7)
- [触发器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-40297ADF-0968-42F8-B8B9-84AD6ADCBE63)

另请参阅：

“[SQL](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-DA48618A-A6BB-421A-A10A-02859D8ED9AD)”用于SQL语言的概述





### 服务器端编程简介

在非过程语言（如 SQL）中，指定了要操作的数据集，但没有指定要执行的操作或执行这些操作的方式。

在过程语言程序中，大多数语句执行依赖于先前或后续语句以及 SQL 中不可用的控制结构，如循环或条件分支。为了说明过程语言和非过程语言之间的区别，假设以下 SQL 语句查询该表：`employees`

```
复制SELECT employee_id, department_id, last_name, salary FROM employees;
```

前面的语句请求数据，但不对数据应用逻辑。但是，假设您希望应用程序根据工资和部门绩效确定数据集中的每个员工是否值得加薪。加薪的必要条件是员工在过去五年内获得的加薪不超过三次。如果需要加薪，那么申请者必须调整工资并通过电子邮件发送给经理;否则，应用程序必须更新报表。

问题是需要条件逻辑和程序流控制的过程数据库应用程序如何使用 SQL。基本开发方法如下：

- 使用客户端编程将 SQL 语句嵌入到用过程语言（如 C、C++ 或 Java）编写的应用程序中

  您可以将 SQL 语句放在源代码中，并在编译之前将其提交给[**预编译器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FDCF892E-6AD5-4AC9-9D1D-A9C7D106D21D)或 Java 转换器。或者，您可以省去预编译步骤，并使用 Java 数据库连接 （JDBC） 或 Oracle 调用接口 （OCI） 等 API 使应用程序能够与数据库进行交互。

- 使用服务器端编程开发驻留在数据库中的数据逻辑

  应用程序可以显式调用用PL / SQL（发音为*P L续集*）或Java编写的存储子程序（过程和函数）。还可以创建名为程序单元的触发器，该[**触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8BA32C58-ACF3-4B6B-941F-586DE399D22A)存储在数据库中，并在响应指定事件时调用。

本章介绍第二种方法。服务器端编程的主要优点是内置于数据库中的功能可以部署在任何地方。数据库而不是应用程序确定在给定操作系统上执行任务的最佳方式。此外，子程序通过将应用程序处理集中在服务器上来提高可伸缩性，使客户端能够重用代码。由于子程序调用快速高效，因此单个调用可以启动计算密集型存储子程序，从而减少网络流量。

您可以使用以下语言在 Oracle 数据库中存储数据逻辑：

- PL/SQL

  PL/SQL是SQL的Oracle数据库过程扩展。PL/SQL与数据库集成，支持所有Oracle SQL语句、函数和数据类型。用数据库 API 编写的应用程序可以调用 PL/SQL 存储的子程序，并将 PL/SQL 代码块发送到数据库执行。

- 爪哇岛

  Oracle 数据库还为开发、存储和部署 Java 应用提供支持。Java 存储的子程序在数据库中运行，并且独立于在中间层运行的程序。Java存储的子程序使用与PL / SQL类似的执行模型与SQL交互。

另请参阅：

- “[客户端数据库编程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-87F23274-B506-486B-8775-880016095EF5)”，了解如何使用预编译器和 API 嵌入 SQL
- Oracle 数据库 [2 天开发人员指南，介绍 Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG10000)应用开发
- [Oracle数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00109)，了解如何选择编程环境





### PL/SQL 概述

PL/SQL 提供了一种服务器端的存储过程语言，该语言易于使用、与 SQL 无缝、健壮、可移植且安全。您可以使用称为 *PL/SQL 单元*的过程对象访问和操作数据库数据。

PL/SQL单元通常分类如下：

- [**PL/SQL 子程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4BF65C07-E5DD-454C-8AD0-E38EF5672CE4)是存储在数据库中的 PL/SQL 块，可以从应用程序中按名称调用。创建子程序时，数据库将分析子程序并将其解析的表示形式存储在数据库中。可以将子程序声明为过程或函数。
- [**PL/SQL 匿名**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-97C2CD46-CE4D-4A23-B44D-815A1E8F0906)块是出现在应用程序中的 PL/SQL 块，未命名或存储在数据库中。在许多应用程序中，PL/SQL 块可以出现在 SQL 语句可以出现的任何位置。

PL/SQL编译器和解释器嵌入在Oracle SQL Developer中，为开发人员在客户端和服务器上提供一致且可利用的开发模型。此外，PL/SQL 存储过程可以从多个数据库客户端（如 Pro*C、JDBC、ODBC 或 OCI）以及 Oracle Reports 和 Oracle Forms 调用。

另请参阅：

- "[面向数据库开发人员的工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-D1C1BC1D-03C7-4A18-BB88-0D76F311DAF0)"
- Oracle 数据库 PL/SQL [语言参考，了解有关 PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS001) 的完整信息，包括软件包





#### PL/SQL 子程序

PL/SQL 子程序是一个命名的 PL/SQL 块，它允许调用方提供只能输入、只能输出或输入和输出值的参数。

子程序解决特定问题或执行相关任务，并充当模块化、可维护的数据库应用程序的构建块。子程序是PL/SQL[**过程或PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2210901-18F2-43C0-B0CC-6953E94CD7EF)[**函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1DBC272B-41F6-43A9-A894-D7E714017E2B)。过程和函数是相同的，只是函数始终向调用方返回单个值，而过程则不返回。本章中的*术语PL/SQL*过程是指过程或函数。

另请参阅：

- [Pro*C/C++ 程序员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-2F2833F4-62F3-4FC7-8FC1-B742E44727B0)和 [Pro*COBOL 程序员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPCB006)，了解这些语言的存储过程
- [Oracle Database PL/SQL Language Reference](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS174)





##### PL/SQL子程序的优势

与客户端编程相比，服务器端编程具有许多优点。

优点包括：

- 改进的性能

  - 与发出单个 SQL 语句或将整个 PL/SQL 块的文本发送到 Oracle 数据库相比，应用程序必须通过网络发送的信息量很小，因为信息只发送一次，然后在使用时调用。
  - 过程的编译形式在数据库中随时可用，因此在执行时不需要编译。
  - 如果该过程存在于 [**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 的[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中，则数据库无需从磁盘检索它，并且可以立即开始执行。

- 内存分配

  由于存储过程利用 Oracle 数据库的共享内存功能，因此它必须仅将过程的单个副本加载到内存中，以供多个用户执行。在用户之间共享代码可显著降低应用程序的数据库内存需求。

- 提高生产率

  存储过程可提高开发效率。通过围绕一组通用过程设计应用程序，可以避免冗余编码。例如，可以编写过程来操作表中的行。任何应用程序都可以调用这些过程，而无需重写 SQL 语句。如果数据管理方法发生更改，则只需修改过程，而不必修改使用这些过程的应用程序。`employees`

  存储过程可能是实现代码重用的最佳方式。由于用连接到数据库的任何语言编写的任何客户端应用程序都可以调用存储过程，因此它们在所有环境中提供最大的代码重用。

- 正直

  存储过程可提高应用程序的完整性和一致性。通过围绕一组通用过程开发应用程序，可以降低编码错误的可能性。

  例如，您可以测试子程序以保证它返回准确的结果，并且在验证后，在任意数量的应用程序中重用它，而无需重新测试。如果更改了过程引用的数据结构，则只能重新编译该过程。调用该过程的应用程序不一定需要修改。

- 通过定义者权限程序确保安全性

  存储过程可以帮助强制实施数据安全性。[**定义者的权限 PL/SQL 过程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-743039B9-002B-48D5-AE43-001BCDBEAA3E)以其所有者的权限执行，而不是其当前[用户的权限。](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-197053D8-1AA8-4B0F-BEE1-8C8AD2DBD0C6)因此，您可以限制用户执行的数据库任务，方法是仅允许用户通过以定义者的权限运行的过程和函数访问数据。

  例如，您可以授予用户对更新表的过程的访问权限，但不授予对表本身的访问权限。当用户调用该过程时，该过程将以其所有者的权限运行。仅具有运行过程的权限（但没有查询、更新或从基础表中删除的权限）的用户可以调用该过程，但不能以任何其他方式操作表数据。

- 使用调用程序的权限过程继承的权限和schema上下文

  [**调用者的权限 PL/SQL 过程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-25256D39-4B45-410E-8CEA-2463E6934152)以当前用户的权限在当前用户的schema中执行。换句话说，调用者的权限过程不绑定到特定用户或schema。调用程序的权限过程使应用程序开发人员能够轻松地集中应用程序逻辑，即使基础数据在用户schema之间划分也是如此。

  例如，在表上运行更新过程的用户可以更新工资，而运行相同过程的用户仅限于更新地址数据。`hr_manager``hr.employees``hr_clerk`

另请参阅：

- "[数据库安全概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-4D6D2B67-1B65-476D-852A-976E9D153EEC)"
- Oracle 数据库 PL/SQL [语言参考，了解 PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS008) 子程序概述
- [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG50010)，了解有关定义者和调用者权限的更多信息





##### 创建 PL/SQL 子程序

独立存储子程序是使用 or 语句在模式级别创建的子程序。包中定义的子程序称为包**子程序**，被视为包的一部分。`CREATE PROCEDURE``CREATE FUNCTION`

数据库将子程序作为模式对象存储在数据字典中。子程序有一个规范，其中包括任何参数的描述和一个主体。

例 8-1 PL/SQL 过程

此示例显示了独立 PL/SQL 过程的创建语句的一部分。该过程在表中插入一行。`hire_employees``employees`

```
CopyCREATE PROCEDURE hire_employees 
  (p_last_name VARCHAR2, p_job_id VARCHAR2, p_manager_id NUMBER, 
   p_hire_date DATE, p_salary NUMBER, p_commission_pct NUMBER, 
   p_department_id NUMBER)
IS 
BEGIN
.
.
.
  INSERT INTO employees (employee_id, last_name, job_id, manager_id, hire_date, 
    salary, commission_pct, department_id)
  VALUES (emp_sequence.NEXTVAL, p_last_name, p_job_id, p_manager_id, 
          p_hire_date, p_salary, p_commission_pct, p_department_id);
.
.
.
END;
```

另请参阅：

- [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG41000)，了解如何创建子程序
- [Oracle Database PL/SQL Language Reference](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS01373) 了解该语句`CREATE PROCEDURE`





##### PL/SQL子程序的执行

用户可以通过多种方式交互地执行子程序。

选项包括：

- 使用 Oracle 工具，例如 SQL*Plus 或 SQL Developer
- 在数据库应用程序（如 Oracle 窗体或预编译器应用程序）的代码中显式调用它
- 在另一个过程或触发器的代码中显式调用它

下图显示了调用 的不同数据库应用程序。`hire_employees`

图 8-1 存储过程的多次执行

![Description of Figure 8-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt073.gif)
[“图 8-1 存储过程的多次执行”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt073.html)

或者，特权用户可以使用 Oracle Enterprise Manager 或 SQL*Plus 使用如下语句运行该过程：`hire_employees`

```
CopyEXECUTE hire_employees ('TSMITH', 'CLERK', 1037, SYSDATE, 500, NULL, 20); 
```

前面的语句在表中插入了一条新记录。`TSMITH``employees`

存储过程取决于其主体中引用的对象。数据库会自动跟踪和管理这些依赖项。例如，如果以影响此过程的方式更改过程引用的表的定义，则必须重新编译该过程以验证它是否仍按设计工作。通常，数据库会自动管理此类依赖项管理。`employees``hire_employees`

另请参阅：

- “[数据库开发人员工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-D1C1BC1D-03C7-4A18-BB88-0D76F311DAF0)”，了解有关 SQL*Plus 和 SQL Developer 的更多信息
- “[客户端数据库编程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-87F23274-B506-486B-8775-880016095EF5)”以了解有关预编译器的更多信息
- Oracle Database PL/SQL 语言参考，了解如何使用 [PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS008) 子程序
- [SQL*Plus 用户指南和参考以了解](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQPUG043)该命令`EXECUTE`





#### PL/SQL 包

**PL/SQL 包**是一组相关的子程序，以及它们使用的游标和变量，一起存储在数据库中，以便作为一个单元继续使用。打包的子程序可以由应用程序或用户显式调用。

Oracle 数据库包括许多提供的软件包，这些软件包扩展了数据库功能并提供对 SQL 功能的 PL/SQL 访问。例如，该软件包允许来自 PL/SQL 和 SQL 的 HTTP 标注访问 Internet 上的数据或调用 Oracle Web Server Cartridges。可以在创建应用程序时使用提供的包，也可以在创建自己的存储过程时将其用作创意来源。`UTL_HTTP`





##### PL/SQL 软件包的优势

PL/SQL 包为应用程序开发人员提供了许多优势。

优点包括：

- 封装

  包使您能够在命名的存储单元中封装或分组存储过程、变量、数据类型等。封装在开发过程中提供了更好的组织，也提供了更大的灵活性。您可以创建规范并引用公共过程，而无需实际创建包正文。封装简化了权限管理。授予包的权限可使被授权者可以访问包构造。

- 数据安全

  包定义的方法使您能够指定哪些变量、游标和过程是公共的和私有的。公共意味着包的用户可以直接访问它。私有意味着它对包的用户是隐藏的。

  例如，一个包可以包含 10 个过程。您可以定义包，以便只有三个过程是公共的，因此可供包的用户执行。其余过程是私有的，只能由包中的过程访问。不要将公共和专用包变量与对 的授权混淆。`PUBLIC`

- 更好的性能

  首次调用包中的过程时，整个包将以小块的形式加载到内存中。此负载在一次操作中完成，而不是独立过程所需的单独负载。当调用相关的打包过程时，不需要磁盘 I/O 即可在内存中运行编译的代码。

  可以替换和重新编译包主体，而不会影响规范。因此，引用包的构造（始终通过规范）的schema对象不需要重新编译，除非还替换了包规范。通过使用包，可以最大限度地减少不必要的重新编译，从而减少对整体数据库性能的影响。





##### 创建 PL/SQL 包

您可以分两部分创建包：规范和正文。包规范声明包的所有公共构造，而包正文定义包的所有构造（公共和私有）。

下面的示例演示创建 包规范的语句的一部分，该语句封装了用于管理雇员数据库的多个子程序。包的每个部分都是使用不同的语句创建的。`employees_management`

```
CopyCREATE PACKAGE employees_management AS 
  FUNCTION hire_employees (last_name VARCHAR2, job_id VARCHAR2, manager_id NUMBER, 
    salary NUMBER, commission_pct NUMBER, department_id NUMBER) RETURN NUMBER; 
  PROCEDURE fire_employees(employee_id NUMBER); 
  PROCEDURE salary_raise(employee_id NUMBER, salary_incr NUMBER); 
.
.
.
  no_sal EXCEPTION;
END employees_management;
```

规范声明了函数、过程和异常。所有这些公共程序对象都可供有权访问包的用户使用。`hire_employees``fire_employees``salary_raise``no_sal`

该语句定义规范中声明的对象。必须在与包相同的schema中创建包正文。创建包后，可以开发调用任何这些公共过程或函数的应用程序，或者引发包的任何公共异常。`CREATE PACKAGE BODY`

另请参阅：

[Oracle Database PL/SQL Language Reference](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS01371) 了解该语句`CREATE PACKAGE`





##### 执行 PL/SQL 包子程序

数据库触发器、存储的子程序、3GL 应用程序和 Oracle 工具可以引用包内容。

下图显示了调用包中的过程和函数的数据库应用程序。`employees_management`

图 8-2 调用 PL/SQL 包中的子程序

![图 8-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt075.gif)
[“图 8-2 调用 PL/SQL 包中的子程序”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt075.html)

数据库应用程序根据需要显式调用打包过程。被授予包的权限后，用户可以显式运行其中包含的任何过程。例如，SQL*Plus 可以发出以下语句来运行包过程：`employees_management``hire_employees`

```
CopyEXECUTE employees_management.hire_employees ('TSMITH', 'CLERK', 1037, SYSDATE, 500, NULL, 20);
```

另请参阅：

- Oracle Database PL/SQL [语言参考，了解 PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS009) 软件包简介
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS009)，了解如何编写 PL/SQL 软件包代码





#### PL/SQL 匿名块

PL/SQL 匿名块是一个未命名的、非持久性的 PL/SQL 单元。

匿名块的典型用途包括：

- 启动对子程序和包构造的调用
- 隔离异常处理
- 通过将代码嵌套在其他 PL/SQL 块中来管理控制

匿名块不具有存储子程序的代码重用优势。[表 8-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-76EA9A76-8D25-4FF5-A6D1-4F358B0651AA__CHDJGEBD) 总结了两种类型的 PL/SQL 单元之间的差异。

表8-1 匿名块和子程序的区别

| 是PL / SQL单元...      | 匿名块 | 子程序 |
| :--------------------- | :----- | :----- |
| 用名字指定？           | 不     | 是的   |
| 每次重用都编译？       | 不     | 不     |
| 存储在数据库中？       | 不     | 是的   |
| 可由其他应用程序调用？ | 不     | 是的   |
| 能够返回绑定变量值？   | 是的   | 是的   |
| 能够返回函数值？       | 不     | 是的   |
| 能够接受参数吗？       | 不     | 是的   |

匿名块由可选的声明性部分、可执行部分以及一个或多个可选的异常处理程序组成。以下示例匿名块将员工姓氏选择到变量中并打印姓名：

```
CopyDECLARE
  v_lname VARCHAR2(25);
BEGIN
  SELECT last_name 
    INTO v_lname
  FROM employees
  WHERE employee_id = 101;
  DBMS_OUTPUT.PUT_LINE('Employee last name is '||v_lname);
END;
```

Oracle 数据库编译 PL/SQL 块并将其放置在 SGA 的共享池中，但它不会将源代码或编译版本存储在数据库中，以便在当前实例之外重用。与触发器不同，每次将匿名块加载到内存中时都会对其进行编译。共享 SQL 允许重用和共享共享池中的匿名 PL/SQL 块，直到它们从共享池中清除。

另请参阅：

[Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS311)，了解有关匿名 PL/SQL 块的更多信息





#### PL/SQL 语言结构

PL/SQL 模块可以包含各种不同的 PL/SQL 语言结构。

这些构造包括以下内容：

- 变量和常量

  可以在过程、函数或包中声明这些构造。您可以在 SQL 或 PL/SQL 语句中使用变量或常量来捕获或在需要时提供值。

- 游标

  您可以在过程、函数或包中显式声明[**游标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D1D3E8DD-CD5C-4C0D-93E4-DE0BF0BD53A3)，以便于 Oracle 数据库数据的面向记录处理。PL/SQL 引擎也可以隐式声明游标。

- 异常

  PL/SQL 允许您显式处理在处理 PL/SQL 代码期间出现的内部和用户定义的错误条件，称为*异常*。

PL/SQL可以运行[**动态SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4962BC92-A7FC-471D-BE50-4650A791E3E7)语句，其完整文本在运行时之前是未知的。动态 SQL 语句存储在运行时输入到程序中或由程序生成的字符串中。此技术使您能够创建常规用途过程。例如，可以创建一个过程，该过程对在运行时之前不知道名称的表进行操作。

另请参阅：

- 有关动态 SQL 的详细信息，Oracle [数据库 PL/SQL 包和类型参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS011)
- [Oracle 数据库 PL/SQL 包和类型参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS058)了解如何在包中使用动态 SQL`DBMS_SQL`





#### PL/SQL 集合和记录

许多编程技术使用集合类型，如数组、包、列表、嵌套表、集合和树。

为了支持数据库应用程序中的收集技术，PL/SQL 提供了数据类型和 .这些类型使您能够声明关联数组、嵌套表和可变大小数组。`TABLE``VARRAY`





##### 收集

**PL/SQL 集合**是一组有序的元素，所有元素的类型都相同。

每个元素都有一个唯一的下标，用于确定其在集合中的位置。若要创建集合，请首先定义集合类型，然后声明该类型的变量。

集合的工作方式与大多数第三代编程语言中的数组类似。此外，集合可以作为参数传递。因此，您可以使用它们将数据列移入和移出数据库表，或者在客户端应用程序和存储的子程序之间移动。





##### 记录

**PL/SQL 记录**是一个复合变量，可以存储不同类型的数据值，类似于 C、C++ 或 Java 中的结构类型。记录对于保存表行中的数据或表行中的某些列非常有用。

假设您有关于员工的数据，例如姓名、薪水和雇用日期。这些项目在类型上不同，但在逻辑上相关。包含每个项目的字段的记录允许您将数据视为逻辑单元。

可以使用该属性声明表示表行或从游标读取的行的记录。使用用户定义的记录，您可以声明自己的字段。`%ROWTYPE`

另请参阅：

Oracle Database PL/SQL 语言参考，了解如何使用 [PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS005) 记录





#### PL/SQL 如何运行

PL/SQL支持解释执行和本机执行。

在解释执行中，PL / SQL源代码被编译为所谓的字节码表示。作为 Oracle 数据库的一部分实现的便携式虚拟计算机运行此字节码。

本机执行在计算密集型单元上提供最佳性能。在这种情况下，PL/SQL单元的源代码直接编译为给定平台的目标代码。此目标代码链接到 Oracle 数据库。

[**PL/SQL 引擎**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DA886C43-D6F7-41D4-9CD8-63770DA864B1)定义、编译和运行 PL/SQL 单元。此引擎是许多 Oracle 产品（包括 Oracle 数据库）的特殊组件。虽然许多 Oracle 产品都具有 PL/SQL 组件，但本主题专门介绍可存储在 Oracle 数据库中并使用 Oracle Database PL/SQL 引擎进行处理的 PL/SQL 单元。每个 Oracle 工具的文档都描述了其 PL/SQL 功能。

下图说明了 Oracle 数据库中包含的 PL/SQL 引擎。

图 8-3 PL/SQL 引擎和 Oracle 数据库

![图 8-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt070.gif)
[“图 8-3 PL/SQL 引擎和 Oracle 数据库”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt070.html)

PL/SQL 单元存储在数据库中。当应用程序调用存储过程时，数据库会将编译的 PL/SQL 单元加载到[**系统全局区域 （SGA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78C0E867-233A-4857-B9FE-A3852A9B7BDF) 中的[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中。PL/SQL 和 SQL 语句执行器协同工作以处理过程中的语句。

您可以从另一个 PL/SQL 块调用存储过程，该块可以是匿名块或其他存储过程。例如，可以从 Oracle 窗体调用存储过程。

在 Oracle 数据库上执行的 PL/SQL 过程可以调用用 C 编程语言编写并存储在共享库中的外部过程或函数。C 例程在与 Oracle 数据库不同的地址空间中运行。

另请参阅：

- “共享池”以了解有关[共享池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1CB2BA23-4386-46DA-9146-5FE0E4599AC6)的目的和内容的更多信息
- Oracle Database PL/SQL [语言参考，了解 PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS00103) schema
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS1402)，了解有关外部过程的更多信息





### Oracle 数据库中的 Java 概述

Java已经成为首选的面向对象的编程语言。

Java 包括以下功能：

- Java 虚拟机 （JVM），为平台独立性提供基础
- 自动化存储管理技术，如垃圾回收
- 借用 C 并强制强类型的语言语法

注意：本章假定您对 Java 语言有一定的了解。

该数据库为 Java 程序提供了一个动态数据处理引擎，该引擎支持复杂的查询和多个数据视图。客户端请求被组装为数据查询，以便立即处理。查询结果是动态生成的。

Java 和 Oracle 数据库的组合可帮助您创建基于组件、以网络为中心的应用程序，这些应用程序可以根据业务需求的变化轻松更新。此外，您还可以将应用程序和数据存储从桌面移动到智能网络和以网络为中心的服务器上。更重要的是，您可以从任何客户端设备访问这些应用程序和数据存储。

下图显示了传统的双层客户端/服务器配置，其中客户端调用 Java 存储过程的方式与调用 PL/SQL 子程序的方式相同。

图 8-4 双层客户端/服务器配置

![图 8-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt236.gif)
[“图 8-4 双层客户端/服务器配置”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt236.html)

另请参阅：

Oracle Database [2 Day + Java 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPJD101)，介绍如何将 Java 与 Oracle Database 结合使用





#### Java 虚拟机 （JVM） 概述

**JVM**是运行已编译的Java代码的虚拟处理器。

Java 源代码编译为独立于平台的低级机器指令（称为*字节码*）。Java 字节码通过 JVM 解释为依赖于平台的操作。





##### Oracle JVM概述

**Oracle JVM**是一个标准的，与Java兼容的环境，可以运行任何纯Java应用程序。它与JLS和JVM规范兼容。

Oracle JVM支持标准的Java二进制格式和API。此外，Oracle 数据库遵循标准 Java 语言语义，包括在运行时动态加载类。

下图说明了 Oracle Java 应用程序如何驻留在 Java 核心类库之上，这些库驻留在 Oracle JVM 之上。因为 Oracle Java 支持系统位于数据库中，所以 JVM 与数据库库交互，而不是直接与操作系统交互。

图 8-5 Java 组件结构

![图 8-5 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt206.gif)
[“图 8-5 Java 组件结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt206.html)

与其他Java环境不同，Oracle JVM嵌入在Oracle数据库中。Oracle JVM和典型的客户端JVM之间存在一些重要的差异。例如，在标准 Java 环境中，通过在命令行上发出以下命令，通过解释器运行 Java 应用程序，其中 *`classname`* 是 JVM 首先解释的类的名称：

```
Copyjava classname
```

上述命令使应用程序在操作系统上的进程中运行。但是，如果不使用命令行界面，则必须将应用程序加载到数据库中，发布界面，然后在数据库[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)中运行应用程序。

另请参阅：

请参阅 Oracle [Database Java Developer's Guide，了解 Oracle](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=JJDEV01300) JVM 和典型客户端 JVM 之间的其他差异。





##### Oracle JVM的主要组件

Oracle JVM 通过共享其内存堆并直接访问其关系数据，在与数据库内核相同的进程空间和地址空间中运行。此设计优化了内存使用并提高了吞吐量。

Oracle JVM为Java对象提供了一个运行时环境。它完全支持 Java 数据结构、方法调度、异常处理和语言级线程。它还支持所有核心 Java 类库，包括 、、 和 。`java.lang``java.io``java.net``java.math``java.util`

下图显示了 Oracle JVM 的主要组件。

图 8-6 Oracle JVM 的主要组件

![图 8-6 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt254.gif)
[“图 8-6 Oracle JVM 的主要组件”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt254.html)

Oracle JVM在数据库模式中嵌入了标准的Java命名空间。此功能允许 Java 程序访问存储在 Oracle 数据库和整个企业中的应用程序服务器中的 Java 对象。

此外，Oracle JVM与数据库的可扩展共享内存schema紧密集成。Java 程序无需用户干预即可高效地使用调用、会话和对象生存期。因此，Oracle JVM和中间层Java业务对象可以扩展，即使它们具有会话长状态。

另请参阅：

Oracle [Database Java Developer's Guide 中](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=JJDEV01300)，了解 Oracle JVM 主要组件的描述





#### Java 编程环境

Oracle 为企业应用开发人员提供端到端的 Java 解决方案，用于创建、部署和管理 Java 应用。

该解决方案由客户端和服务器端编程接口、支持 Java 开发的工具以及与 Oracle 数据库集成的 Java 虚拟机组成。所有这些产品都与Java标准兼容。

Java 编程环境包含以下附加功能：

- Java 存储过程作为 PL/SQL 的 Java 等效项和配套项。Java 存储过程与 PL/SQL 紧密集成。您可以从 PL/SQL 包调用 Java 存储过程，也可以从 Java 存储过程调用过程。
- 用于访问 SQL 数据的 JDBC 和 SQLJ 编程接口。
- 有助于开发、加载和管理类的工具和脚本。





##### Java 存储过程

Java **存储过程**是发布到 SQL 并存储在数据库中的 Java 方法。

与PL / SQL子程序一样，Java过程可以直接使用SQL*Plus等产品调用，也可以间接使用触发器调用。您可以从任何 Oracle Net 客户端（OCI、预编译器或 JDBC）访问它。

要发布 Java 方法，请编写调用规范，这些规范将 Java 方法名称、参数类型和返回类型映射到其 SQL 对应项。当由客户端应用程序调用时，Java 存储过程可以接受参数、引用 Java 类并返回 Java 结果值。

通过引用调用规范的名称来调用 Java 方法的应用程序。运行时系统在 Oracle 数据字典中查找调用规范定义，并运行相应的 Java 方法。

此外，您可以使用Java独立于PL / SQL开发功能强大的程序。Oracle数据库提供了Java编程语言和JVM的完全兼容的实现。

另请参阅：

[Oracle Database Java Developer's Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-AE1E5C4B-A077-4D1E-8821-6A7142BF1FEA) 介绍了如何用 Java 编写存储过程，如何从 PL/SQL 访问它们，以及如何从 Java 访问 PL/SQL 功能





##### Java 和 PL/SQL 集成

您可以从 Java 调用现有的 PL/SQL 程序，也可以从 PL/SQL 调用 Java 程序。此解决方案保护和利用您的 PL/SQL 和 Java 代码。

Oracle 数据库提供了两种不同的方法来从 Java 访问 SQL 数据：JDBC 和 SQLJ。JDBC 在客户端和服务器上都可用，而 SQLJ 仅在客户端上可用。





###### JDBC 驱动程序

JDBC 是一种数据库访问协议，使您能够连接到数据库并运行对数据库的 SQL 语句和查询。

核心 Java 类库仅提供一个 JDBC API。但是，JDBC 旨在使供应商能够提供为特定数据库提供必要的专用化的驱动程序。Oracle 提供了下表中所示的不同 JDBC 驱动程序。`java.sql`

表 8-2 JDBC 驱动程序

| 司机                      | 描述                                                         |
| :------------------------ | :----------------------------------------------------------- |
| JDBC 瘦驱动程序           | 您可以使用 JDBC 瘦驱动程序编写访问 Oracle SQL 数据的纯 Java 应用程序和小程序。JDBC 瘦驱动程序特别适用于基于 Web 的应用程序和小程序，因为您可以从网页动态下载它，类似于任何其他 Java 小程序。 |
| JDBC OCI 驱动程序         | JDBC OCI 驱动程序访问特定于 Oracle 的本机代码（即非 Java 代码）以及客户端或中间层上的库，与 JDBC 瘦驱动程序相比，性能提升，但代价是显著增大了大小和客户端安装。 |
| JDBC 服务器端内部驱动程序 | 当 Java 代码在服务器上运行时，Oracle 数据库使用服务器端内部驱动程序。它允许在服务器上的Oracle JVM中运行的Java应用程序访问本地定义的数据，即使用JDBC访问同一系统和同一进程中的数据。它提供了性能提升，因为它能够直接使用底层的Oracle RDBMS库，而无需在Java代码和SQL数据之间建立干预网络连接的开销。通过在服务器上支持相同的 Java-SQL 接口，Oracle 数据库在部署代码时不需要重新设计代码。 |

另请参阅：

- "[ODBC 和 JDBC](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-C5A31D66-F743-4BAC-9698-4B2058E3D8A9)"
- Oracle Database [2 Day + Java](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPJD-GUID-2ADAB75C-88C9-4956-98C3-FE0ED96444CA) Developer's Guide 和 [Oracle Database JDBC Developer's Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-D6975767-9F5A-4B30-8910-9298DDD7FEF0)





###### SQLJ

**SQLJ** 是一种 ANSI 标准，用于在 Java 程序中嵌入 SQL 语句。您可以使用客户端 SQLJ 程序。此外，您可以将 SQLJ 程序与 JDBC 结合使用。

注意：从 Oracle Database 12c Release 2 （12.2） 开始，Oracle 数据库不支持运行*服务器端* SQLJ 代码，包括在数据库环境中运行存储过程、函数和触发器。

SQLJ 提供了一种简单但功能强大的方法来开发从 Java 访问数据库的客户端和中间层应用程序。开发人员使用 SQLJ 编写程序，然后使用 SQLJ 转换器将嵌入式 SQL 转换为基于 JDBC 的纯 Java 代码。在运行时，程序可以使用标准 JDBC 驱动程序与多供应商数据库进行通信。

下面的示例演示一个简单的 SQLJ 可执行语句：

```
CopyString name;
#sql  { SELECT first_name INTO :name FROM employees WHERE employee_id=112 };
System.out.println("Name is " + name + ", employee number = " + employee_id);
```

另请参阅：

- "[SQLJ](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-575F8325-3839-45ED-B370-2292D208D9C3)"
- [Oracle Database SQLJ 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-B3A3C319-5C61-40C6-B3FB-37C2BD98AD48)





### 触发器概述

数据库**触发器**是用PL / SQL或Java编写的编译存储程序单元，在某些情况下，Oracle数据库会自动调用（“触发”）。

每当发生以下操作之一时，都会触发触发器：

1. 由任何用户发出的特定表或视图上的 [**DML**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5F2F112-1B33-41B5-B63D-9DC8F99A369D) 语句

   DML 语句修改schema对象中的数据。例如，插入和删除行是 DML 操作。

2. 由特定用户或任何用户发布的 [**DDL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64F19D78-A73F-44A5-AA2E-60EBC800CB22) 语句

   DDL 语句定义schema对象。例如，创建表和添加列是 DDL 操作。

3. 数据库事件

   用户登录或注销、错误以及数据库启动或关闭是可以调用触发器的事件。

触发器是类似于子程序的schema对象，但在调用方式上有所不同。子程序由用户、应用程序或触发器显式运行。触发器在发生触发事件时由数据库隐式调用。

另请参阅：

- “[SQL 语句概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-662EE4B0-7D5E-43F5-806D-A2AE404D77BF)”以了解 DML 和 DDL
- "[数据库实例启动和关闭概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-5FCFB104-8365-4E7B-87A1-736E65D6658F)"





#### 触发器的优点

正确使用触发器使您能够构建和部署更可靠且更有效地使用数据库的应用程序。

可以使用触发器执行以下操作：

- 自动生成派生列值
- 防止无效交易
- 提供审核和事件日志记录
- 记录有关表访问的信息

可以使用触发器强制实施所有客户端应用程序通用的低级别业务规则。例如，多个应用程序可以访问该表。如果此表上的触发器确保插入数据的格式，则不需要在每个客户端中重现此业务逻辑。由于应用程序无法绕过触发器，因此将自动使用触发器中的业务逻辑。`employees`

可以使用触发器和完整性约束来定义和强制实施任何类型的完整性规则。但是，Oracle 强烈建议您仅使用触发器来强制实施无法使用[**完整性约束**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-67F8FE8C-EBA5-4796-820A-8919982A1411)定义的复杂业务规则。

过度使用触发器可能会导致复杂的相互依赖关系，在大型应用程序中可能难以维护。例如，当调用触发器时，其触发器操作中的 SQL 语句可能会触发其他触发器，从而导致级联触发器，从而产生意外效果。

另请参阅：

- "[数据完整性简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-A8893CD7-8B19-42AA-8550-9713071FA679)"
- [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG50000)
- [Oracle 数据库 PL/SQL 语言参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS2002)了解为应用规划触发器时的准则和限制





#### 触发器的类型

触发器可以根据其调用方式和执行的操作类型进行分类。

Oracle 数据库支持以下类型的触发器：

- 行触发器

  每次表受触发语句影响时，都会触发[**行触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-24EF0C74-72E4-4455-8C95-C52A1CDDF81C)。例如，如果语句更新多行，则行触发器会针对受 .如果触发语句不影响任何行，则不会运行行触发器。如果触发器操作中的代码依赖于触发语句提供的数据或受影响的行，则行触发器非常有用。`UPDATE`

- 语句触发器

  语句[**触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-85D25BFF-A802-4DAB-B86C-A41EFCA11B6E)代表触发语句触发一次，而不考虑触发语句影响的行数。例如，如果语句从表中删除 100 行，则语句级触发器仅触发一次。如果触发器操作中的代码不依赖于触发语句提供的数据或受影响的行，则语句触发器很有用。`DELETE`

- `INSTEAD OF`触发器

  [**INSTEAD OF 触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9BB0F932-40F0-4727-85A1-904E162405D0)由 Oracle 数据库触发，而不是执行触发语句。这些触发器可用于透明地修改无法直接通过 DML 语句修改的视图。

- 事件触发器

  您可以使用触发器将有关数据库事件的信息发布到订阅者。事件触发器分为以下几类：

  - [**系统事件触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EFE577C5-037A-4974-8358-F3761AC70601)可能由数据库实例启动和关闭或错误消息等事件引起。
  - 由于与用户登录和注销、DDL 语句和 DML 语句相关的事件，将触发[**用户事件触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54BD71CF-7D44-4CB2-9FC4-90F5CA8EF110)。

另请参阅：

- [Oracle 数据库 2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG51000)
- [Oracle Database PL/SQL Language Reference](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS2005)





#### 触发器的计时

您可以定义触发器计时 - 触发器操作是在触发语句之前还是之后运行。

简单触发器是表上的单个[**触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2B4F37A3-7EB0-455F-8704-32C072C25198)，可用于为以下计时点之一指定操作：

- 在解雇声明之前
- 在受触发语句影响的每一行之前
- 在受触发语句影响的每一行之后
- 解雇声明后

对于语句和行触发器，触发器可以在对数据库进行更改之前增强安全性并启用业务规则。该触发器非常适合记录操作。`BEFORE``AFTER`

[**复合触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AE8C3B7A-EF80-4452-9C4D-4094E21BFC9E)可以在多个定时点触发。复合触发器有助于对一种方法进行编程，在这种方法中，为各种时序点实现的操作共享公共数据。

另请参阅：

[Oracle 数据库 PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS2005)，了解复合触发器





#### 触发器的创建

该语句创建或替换数据库触发器。`CREATE TRIGGER`

PL/SQL 触发器具有以下常规语法形式：

```
CopyCREATE TRIGGER trigger_name
  triggering_statement
  [trigger_restriction]
BEGIN
 triggered_action;
END;
```

PL/SQL 触发器具有以下基本组件：

- 触发器名称

  该名称在同一schema中的其他触发器名称中必须是唯一的。例如，名称可能是 。`part_reorder_trigger`

- 触发器事件或语句

  触发事件或语句是导致调用触发器的 SQL 语句、数据库事件或用户事件。例如，用户更新表。

- 触发限制

  触发器限制指定触发触发器必须包含的布尔[**表达式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E2141FFA-A7B2-4113-BEEE-2401FC38AB2E)。例如，除非可用部件的数量小于当前的再订购量，否则不会调用触发器。`true`

- 触发的操作

  触发操作是包含发出触发语句且触发器限制计算结果为 true 时要运行的 SQL 语句和代码的过程。例如，用户在挂单表中插入一行。

另请参阅：

- Oracle 数据库 [2 天开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG52000)和 [Oracle 数据库 PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS2004)，了解如何创建触发器
- 了解该语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01405)`CREATE TRIGGER`



##### 示例：创建触发器语句

此示例创建一个触发器，该触发器在行项目表上执行 、 或 语句时触发。`INSERT``UPDATE``DELETE`

假设您使用以下语句创建 和 表。该表包含每个唯一订单的一行，而表包含订单中每个项目的一行。`orders``lineitems``orders``lineitems`

```
复制创建表订单
（order_id数字主键，
 /* 其他属性 */
 line_items_count 数字默认值 0 ）;

创建表格订单项
（ order_id 参考订单，
 seq_no数，
 /* 其他属性 */
 限制行项主键（order_id，seq_no） ）;
```

以下语句创建一个示例触发器，该触发器使用订单中的项数自动更新表：`orders`

```
CopyCREATE OR REPLACE TRIGGER lineitems_trigger
  AFTER INSERT OR UPDATE OR DELETE ON lineitems 
  FOR EACH ROW
BEGIN
  IF (INSERTING OR UPDATING)
  THEN
    UPDATE orders SET line_items_count = NVL(line_items_count,0)+1
    WHERE order_id = :new.order_id;
  END IF;
  IF (DELETING OR UPDATING)
  THEN
    UPDATE orders SET line_items_count = NVL(line_items_count,0)-1
    WHERE order_id = :old.order_id;
  END IF;
END;
/
```

在 中，触发语句是表上的 、 或。不存在触发限制。为更改的每一行调用触发器。触发器可以访问受触发语句影响的当前行的旧列值和新列值。要修改的表的每一列都存在两个相关名：旧值 （） 和新值 （）。如果会话更新或插入订单的行，则在操作之后，触发器将计算此顺序中的项目数，并使用计数更新表。`lineitems_trigger``INSERT``UPDATE``DELETE``lineitems``:old``:new``lineitems``orders`



##### 示例：调用行级触发器

在此方案中，客户启动两个订单，并在订单中添加和删除订单项。

该方案基于[示例：创建触发器语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-355D97A1-A490-477F-9888-278624393ABF)中创建的触发器。

表 8-3 行级触发器方案

| SQL 语句                                                     | 触发的 SQL 语句                                              | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `SQL>插入订单 （order_id）值 （78）;  已创建 1 行。`         |                                                              | 客户创建 ID 为 78 的订单。此时，客户订单中没有商品。由于不会对表执行任何操作，因此不会调用触发器。`lineitems` |
| `SQL>插入订单 （order_id）值 （92）;  已创建 1 行。`         |                                                              | 客户创建 ID 为 92 的单独订单。此时，客户订单中没有商品。由于不会对表执行任何操作，因此不会调用触发器。`lineitems` |
| `SQL>插入到行项 （order_id、seq_no） 值 （78，1）;  已创建 1 行。` | `更新订单 设置line_items_count = NVL（空，0）+1 其中order_id = 78;` | 客户将物料添加到订单 78。调用触发器。触发语句将订单 78 的行项目计数从 0 增加到 1。`INSERT` |
| `SQL>插入到行项 （order_id、seq_no） 值 （78，2）;  已创建 1 行。` | `更新订单 设置line_items_count = NVL（1，0）+1 其中order_id = 78;` | 客户向订单 78 添加附加物料。调用触发器。触发语句将订单 78 的行项目计数从 1 增加到 2。`INSERT` |
| `SQL>选择*从订单; ORDER_ID LINE_ITEMS_COUNT --------- ---------------- 78 2 92 0` |                                                              | 客户查询两个订单的状态。78号令包含两个项目。订单 92 不包含任何项目。 |
| `SQL>从行项目中选择*;  ORDER_ID SEQ_NO ---------- ---------- 78 1 78 2` |                                                              | 客户查询订单项的状态。每个项目都由订单 ID 和序列号唯一标识。 |
| `SQL>更新订单项 设置order_id = 92; 更新了 2 行。`            | `更新订单 设置line_items_count = NVL（空，0）+1 其中 order_id = 92; 更新订单 设置line_items_count = NVL（2，0）-1 其中order_id = 78;``更新订单 设置line_items_count = NVL（1，0）+1 其中 order_id = 92; 更新订单 设置line_items_count = NVL（1，0）-1 其中order_id = 78;` | 客户将订单 78 中的行项目移动到订单 92。该语句更改表中的 2 行，每行调用触发器一次。`UPDATE``lineitems`每次调用触发器时，都会满足触发器中的两个条件。第一个条件递增订单 92 的计数，而第二个条件减少订单 78 的计数。因此，总共运行四个语句。`IF``UPDATE` |
| `SQL>选择*从订单; ORDER_ID LINE_ITEMS_COUNT --------- ---------------- 78 0 92 2` |                                                              | 客户查询两个订单的状态。净效应是订单 92 的行项目计数从 0 增加到 2，而订单 78 的行项目计数从 2 减少到 0。 |
| `SQL> SELECT * FROM lineitems;   ORDER_ID     SEQ_NO ---------- ----------        92          1        92          2` |                                                              | The customer queries the status of the line items. Each item is uniquely identified by the order ID and the sequence number. |
| `SQL>从行项中删除;  删除了 2 行。`                           | `更新订单 设置line_items_count = NVL（2，0）-1 其中 order_id = 92;  更新订单 设置line_items_count = NVL（1，0）-1 其中 order_id = 92;` | 客户现在从所有订单中删除所有订单项。该语句更改表中的 2 行，每行调用触发器一次。对于每个触发器调用，仅满足触发器中的一个条件。每次条件将订单 92 的计数减少 1。因此，总共运行两个语句。`DELETE``lineitems``IF``UPDATE` |
| `SQL>选择*从订单; ORDER_ID LINE_ITEMS_COUNT --------- ---------------- 78 0 92 0 SQL>从行项目中选择*;  未选择任何行` |                                                              | 客户查询两个订单的状态。这两个订单都不包含订单项。客户还会查询行项目的状态。不存在任何项目。 |





#### 触发器的执行

Oracle 数据库使用与子程序执行相同的步骤在内部执行触发器。

唯一细微的区别是，如果用户帐户有权运行触发语句，则它有权触发触发器。除此例外情况外，数据库验证和运行触发器的方式与存储的子程序相同。

另请参阅：

[Oracle 数据库 PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS020)，了解有关触发器执行的更多信息





#### 触发器的存储

Oracle 数据库将 PL/SQL 触发器以编译形式存储在数据库模式中，就像 PL/SQL 存储过程一样。

当语句提交时，编译后的 PL/SQL 代码存储在数据库中。共享池将删除 PL/SQL 触发器的源代码。`CREATE TRIGGER`

下图显示了一个数据库应用程序，其中包含隐式调用 PL/SQL 触发器的 SQL 语句。触发器与其关联的表分开存储。

图 8-7 触发器

![Description of Figure 8-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt076.gif)
[“图 8-7 触发器”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt076.html)

Java 触发器的存储方式与 PL/SQL 触发器相同。但是，Java 触发器引用使用语句单独编译的 Java 代码。因此，创建 Java 触发器涉及创建 Java 代码和创建引用此 Java 代码的触发器。`CALL`

另请参阅：

[Oracle 数据库 PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS2007)，了解如何编译和存储触发器

## 第三部分 Oracle事务管理

事务管理是使用事务来确保数据并发性和一致性。

本部分包含以下章节：

- [数据并发性和一致性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E8CBA9C5-58E3-460F-A82A-850E0152E95C)
- [交易](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-B97790CB-DF82-442D-B9D5-50CCE6BF9FBD)

## 9 数据并发性和一致性

本章介绍 Oracle 数据库如何在多用户数据库环境中维护一致的数据。

本章包含以下部分：

- [数据并发性和一致性简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-7AD41DFA-04E5-4738-B744-C4407170411C)
- [Oracle 数据库事务隔离级别概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-2A0FDFF0-5F72-4476-BFD2-060A20EA1685)
- [Oracle 数据库锁定机制概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-AD0CEE83-2F33-4906-94E1-3D1022924C63)
- [自动锁概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E926E638-0161-4389-887B-4A31A529478A)
- [手动数据锁概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-A4E54CD6-7232-489D-86A4-412EAF8A8DB7)
- [用户定义锁概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-D63FD030-44CD-4FD7-970A-C98C8CC4AC42)





### 数据并发性和一致性简介

在单用户数据库中，用户可以修改数据，而不必担心其他用户同时修改相同的数据。但是，在多用户数据库中，多个同时事务中的语句可能会更新相同的数据。同时执行的事务必须产生有意义且一致的结果。

多用户数据库必须提供以下内容：

- 保证用户可以同时访问数据（[**数据并发**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D7E696DB-944C-4798-B70D-5C2381FE971F))
- 确保每个用户都能看到一致的数据视图（[**数据一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B016467E-5663-4AC8-B54D-181CA1B8198E)），包括用户自己的事务和其他用户的已提交事务所做的可见更改

为了描述事务并发运行时的一致事务行为，数据库研究人员定义了称为[**可序列化性的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-41BC7551-23D4-4778-8109-B886FBFC85EE)事务隔离模型。可序列化事务在环境中运行，使其看起来好像没有其他用户在修改数据库中的数据。

虽然事务之间的这种隔离程度通常是可取的，但在可序列化模式下运行许多应用程序可能会严重损害应用程序吞吐量。完全隔离并发运行的事务可能意味着一个事务无法对另一个事务查询的表中执行插入。简而言之，现实世界的考虑通常需要在完美的事务隔离和性能之间做出折衷。

Oracle 数据库通过使用[**多版本一致性模型**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FCCF7DC5-C860-4F1C-8811-03AE76597104)以及各种类型的锁和事务来维护数据一致性。通过这种方式，数据库可以向多个并发用户呈现数据视图，每个视图与一个时间点一致。由于不同版本的数据块可以同时存在，因此事务可以读取[**在查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)所需的时间点提交的数据版本，并返回与单个时间点一致的结果。

另请参阅：

“[数据完整性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-6A89FF39-AD42-4399-BD1B-E51ECEE50B4E)”和“[交易](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-B97790CB-DF82-442D-B9D5-50CCE6BF9FBD)”





#### 多版本读取一致性

在 Oracle 数据库中，多版本控制是同时实现多个数据版本的能力。Oracle 数据库保持多版本读取一致性。

Oracle 数据库的查询具有以下特征：

- 读取一致性查询

  查询返回的数据在单个时间点内已提交且一致。

  注意：Oracle 数据库*从不允许*[**脏**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E3E574ED-BCBE-4217-8206-D2BD6F075A39)读，当一个事务读取另一个事务中未提交的数据时，就会发生脏读。

  为了说明脏读的问题，假设一个事务更新了列值而不提交。第二个事务读取更新的脏（未提交）值。第一个会话回滚事务，以便列具有其旧值，但第二个事务继续使用更新的值，从而损坏数据库。脏读会损害[**数据完整性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9DE527B3-8901-4F4C-A18F-D2C2C307AFE1)、违反外键并忽略唯一约束。

- 非阻塞查询

  数据的读取器和写入者不会相互阻塞。

另请参阅：

"[锁定行为摘要](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-1D60EFCC-03F4-4A04-B099-1B4DE5D02C47)"





##### 语句级读取一致性

Oracle 数据库始终强制实施**语句级读取一致性**，从而保证单个查询返回的数据在单个时间点提交且一致。

单个 SQL 语句一致的时间点取决于事务隔离级别和查询的性质：

- 在已提交读取隔离级别中，此点是打开*语句*的时间点。例如，如果语句在 SCN 1000 处打开，则此语句与 SCN 1000 一致。`SELECT`
- 在可序列化或只读事务中，此点是*事务*开始的时间。例如，如果事务从 SCN 1000 开始，并且此事务中出现多个语句，则每个语句都与 SCN 1000 一致。`SELECT`
- 在闪回查询操作 （） 中，该语句显式指定时间点。例如，您可以查询上周四下午 2 点显示的表。`SELECT ... AS OF``SELECT`

另请参阅：

了解闪回查询的 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS01003)





##### 事务级读取一致性

Oracle 数据库还可以为事务中的所有查询提供读取一致性，称为**事务级读取一致性**。

在这种情况下，事务中的每个语句都会看到*来自同一*时间点的数据。这是交易开始的时间。

可序列化事务进行的查询将看到事务本身所做的更改。例如，更新然后查询的事务将看到更新。事务级读取一致性产生可重复的读取，并且不会向幻像读取公开查询。`employees``employees`





##### 读取一致性和撤消段

若要管理多版本读取一致性模型，数据库必须在同时查询和更新表时创建读取一致性数据集。

Oracle 数据库通过[**撤消数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-297B963A-989C-4720-B061-A2352FF72892)实现读取一致性。

每当用户修改数据时，Oracle 数据库都会创建撤消条目，并将其写入撤消段。撤消段包含未提交或最近提交的事务更改的数据的旧值。因此，数据库中可以存在相同数据的不同时间点的多个版本。数据库可以使用不同时间点的数据快照来提供数据的读取一致性视图并启用非阻塞查询。

在单实例和 Oracle 实际应用集群 （Oracle RAC） 环境中保证读取一致性。Oracle RAC 使用称为缓存融合的缓存到缓存块传输机制将数据块的读取一致性映像从一个数据库实例传输到另一个数据库实例。

另请参阅：

- "[撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-6E206D3A-E0E7-4B23-9C41-516FB35BC3FE)"

  了解撤消存储

- “[内部 LOB](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-3C50EAB8-FC39-4BB3-B680-4EACCE49E866)”，了解 LOB 的读取一致性机制





###### 读取一致性：示例

此示例显示一个查询，该查询使用撤消数据在已提交的读取隔离级别中提供语句级读取一致性。

图 9-1 已提交读取隔离级别的读取一致性

![Description of Figure 9-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt069.gif)
[“Figure 9-1 读取提交隔离级别的读取一致性”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt069.html)

当数据库代表查询检索数据块时，数据库确保每个块中的数据反映查询开始时块的内容。数据库根据需要回滚对块的更改，以将块重建到查询开始处理的时间点。

数据库使用称为 [**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C) 的内部排序机制来保证事务的顺序。当语句进入执行阶段时，数据库将确定查询开始执行时记录的 SCN。在[图 9-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-00A3688F-1219-423C-A5ED-4B8F25BEEAFB__BABFDBAJ) 中，此 SCN 为 10023。查询仅看到与 SCN 10023 相关的已提交数据。`SELECT`

[在图 9-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-00A3688F-1219-423C-A5ED-4B8F25BEEAFB__BABFDBAJ) 中，SCN 在 10023 之后的块表示数据已更改，如 SCN 10024 *之后*的两个块所示。该语句需要与提交的更改一致的块版本。数据库将当前数据块复制到新的缓冲区，并应用撤消数据来重建以前版本的块。这些重建的数据块称为*一致性读取 （CR） 克隆*。`SELECT`

[在图 9-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-00A3688F-1219-423C-A5ED-4B8F25BEEAFB__BABFDBAJ) 中，数据库创建两个 CR 克隆：一个块与 SCN 10006 一致，另一个块与 SCN 10021 一致。数据库返回查询的重建数据。通过这种方式，Oracle 数据库可以防止脏读。

另请参阅：

“[数据库缓冲区缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-4FF66585-E469-4631-9225-29D75594CD14)”和“[系统更改编号 （SCN）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-A2615547-94D2-4346-B156-64C534C5E9E4)”





###### 读取一致性和感兴趣的事务列表

每个段区块的**区块头**都包含一个**感兴趣的交易列表（ITL）。**

数据库使用国际交易日志来确定当数据库开始修改区块时交易是否未提交。

国际交易日志中的条目描述了哪些交易的行被锁定，哪些行包含已提交和未提交的更改。国际交易日志指向撤消段中的交易表，该表提供了关于对数据库进行更改的时间的信息。

从某种意义上说，区块头包含影响区块中每一行的交易的最近历史记录。and 语句的参数控制保留的事务历史记录量。`INITRANS``CREATE TABLE``ALTER TABLE`

另请参阅：

了解参数的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54481)`INITRANS`



##### 读取一致性和延迟插入

称为延迟插入的特殊类型的**插入**不使用标准读取一致性机制。

延迟插入使用提示插入到指定为 的表中。数据库将这些插入内容缓冲在大型池中，而不是缓冲区高速缓存中。数据库不会使用重做和撤消来跟踪更改。相反，当空间管理协调器 （SMCO） 将缓冲区写入磁盘时，数据库会自动提交更改。更改无法回滚。`MEMOPTIMIZE_WRITE``MEMOPTIMIZE FOR WRITE`

延迟刀片与传统刀片在以下重要方面有所不同：

- 驻留在大型池中的数据（应用程序假定已提交）可能会丢失。例如，数据库实例可能会在将更改保存到磁盘之前失败，即使应用程序报告已保存更改也是如此。
- 不允许直接从内存读取数据。在后台进程将更改写入磁盘之前，编写器无法读取自己的更改。在将已提交的更改写入磁盘之前，任何读取器都无法看到这些更改。

必须避免数据丢失的客户端应用程序应在写入大型池后保留数据的本地副本。客户端可以使用包来跟踪写入内存的持久性，并使用包强制数据库写入磁盘。`DBMS_MEMOPTIMIZE``DBMS_MEMOPTIMIZE_ADMIN`

另请参阅：

- "[用于延迟插入的大型池缓冲区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-07D4439A-8E4E-4FBC-A403-1B0F0B9E0058)"
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF-GUID-65F447C4-6914-4823-9691-F15D52DB74D7)，了解有关提示的更多信息`MEMOPTIMIZE FOR WRITE`





#### 锁定机制

通常，多用户数据库使用某种形式的数据锁定来解决与数据并发性、一致性和完整性相关的问题。

[**锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6D016291-A487-4F88-BE0B-ACF8FA2AE72C)是一种防止访问同一资源的事务之间进行破坏互的机制。

另请参阅：

"[Oracle 数据库锁定机制概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-AD0CEE83-2F33-4906-94E1-3D1022924C63)"





#### ANSI/ISO 事务隔离级别

已被ANSI和ISO / IEC采用的SQL标准定义了四个级别的事务隔离。这些级别对事务处理吞吐量有不同程度的影响。

这些隔离级别是根据并发执行的事务之间必须防止的现象定义的。可预防的现象是：

- 脏读

  事务读取由另一个尚未提交的事务写入的数据。

- 不可重复（模糊）读取

  事务重新读取它以前读取的数据，并发现另一个已提交的事务已修改或删除数据。例如，用户查询一行，然后查询同一行，却发现数据已更改。

- 幻影阅读

  事务重新运行返回一组满足搜索条件的行的查询，并发现另一个已提交的事务插入了满足该条件的其他行。

  例如，事务查询员工数。五分钟后，它执行相同的查询，但现在这个数字增加了一个，因为另一个用户插入了新员工的记录。满足查询条件的数据比以前多，但与模糊读取不同，以前读取的数据保持不变。

SQL 标准根据允许在特定隔离级别运行的事务所经历的现象定义了四个隔离级别。[表9-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-7F2C6927-5482-4144-B43B-5E90EF4E055B__G35628)显示了这些水平。

表9-1 按隔离级别划分的可预防读取现象

| 隔离级别   | 脏读   | 不可重复读取 | 幻影读取 |
| :--------- | :----- | :----------- | :------- |
| 读取未提交 | 可能   | 可能         | 可能     |
| 已提交读取 | 不可能 | 可能         | 可能     |
| 可重复读取 | 不可能 | 不可能       | 可能     |
| 序列 化    | 不可能 | 不可能       | 不可能   |

Oracle 数据库提供已提交读取（默认）和可序列化隔离级别。此外，数据库还提供只读模式。

另请参阅：

- “[Oracle 数据库事务](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-2A0FDFF0-5F72-4476-BFD2-060A20EA1685)隔离级别概述”，了解读取提交、可序列化和只读隔离级别
- Oracle 数据库 SQL [语言参考，讨论 Oracle 数据库是否符合 SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF019) 标准





### Oracle 数据库事务隔离级别概述

事务隔离级别的 ANSI 标准是根据每个隔离级别允许或阻止的现象定义的。

Oracle 数据库提供事务隔离级别：

- [读取提交的隔离级别](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-DB571DA8-864F-4FE9-93B9-3EC2DD0604FE)
- [可序列化隔离级别](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-8DA9A191-4CA3-4B1A-995F-4B17471C2738)
- [只读隔离级别](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-371C3622-540E-490C-BD83-F12CE4CF39C6)

另请参阅：

- [Oracle数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS99999)，了解有关事务隔离级别的更多信息
- 要了解的 Oracle Database SQL Language Reference 和 [Oracle Database PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS00608) [Language Reference](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF55422)`SET TRANSACTION ISOLATION LEVEL`





#### 读取提交的隔离级别

在**已提交的读取隔离级别**中，事务执行的每个查询都只能看到查询开始之前提交的数据，而不是事务。

此隔离级别是默认级别。它适用于很少有事务可能发生冲突的数据库环境。

已提交读取事务中的查询可避免读取在查询过程中提交的数据。例如，如果查询扫描百万行表的一半，并且如果另一个事务提交对行 950，000 的更新，则查询在读取第 950，000 行时不会看到此更改。但是，由于数据库不阻止其他事务修改查询读取的数据，因此其他事务可能会在查询执行*之间*更改数据。因此，运行同一查询两次的事务可能会遇到模糊读取和幻像。





##### 已提交读取隔离级别的读取一致性

数据库为每个查询提供一致的结果集，保证数据一致性，用户无需执行任何操作。

[**隐式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E802CBDA-5F3B-40CF-9749-612F0E0E4A35)查询（如语句中的子句隐含的查询）保证一组一致的结果。但是，隐式查询中的每个语句不会看到 DML 语句本身所做的更改，而是看到进行更改之前存在的数据。`WHERE``UPDATE`

如果列表包含 PL/SQL 函数，则数据库在语句级别对在 PL/SQL 函数代码中运行的 SQL 应用语句级读取一致性，而不是在父 SQL 级别。例如，函数可以访问其数据由其他用户更改和提交的表。对于函数的每次执行，都会建立一个新的读取一致性快照。`SELECT``SELECT`

另请参阅：

"[子查询](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-65D6723C-88E2-44E3-85D1-A719BB5F075E)"





##### 已提交读取事务中的写入冲突

在已提交的读取事务中，当事务尝试更改由未提交的并发事务更新的行时，会发生**冲突写入**。

阻止行修改的事务有时称为**阻塞事务**。已提交读取事务等待阻塞事务结束并释放其行锁。

选项如下：

- 如果阻塞事务回滚，则等待事务将继续更改先前锁定的行，就好像其他事务从未存在过一样。
- 如果阻塞事务提交并释放其锁，则等待事务将继续对新更改的行进行预期更新。

下表显示了事务 1（可以是可序列化的或已提交的读取）如何与已提交的读取事务 2 交互。它显示了称为[**丢失更新**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F9DA6F63-B518-44C5-B98B-2425680EB498)的经典情况。事务 1 所做的更新不在表中，*即使事务 1 提交了更新*。设计处理丢失更新的策略是应用程序开发的重要组成部分。

表 9-2 已提交读取事务中的冲突写入和丢失的更新

| 第一节                                                       | 第一节                                                       | 解释                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `SQL>选择last_name， 员工工资 last_name在何处 （“班达”、“格林”， “提示”）;  LAST_NAME工资 ------------- ---------- 班达 6200 格林 9500` | 无操作。                                                     | 会话 1 查询班达、格林和辛茨的工资。没有找到名为 Hintz 的员工。 |
| `SQL>更新员工 设置工资 = 7000 其中 last_name = '班达';`      | 无操作。                                                     | 会话 1 通过更新班达工资开始交易。事务 1 的缺省隔离级别为 。`READ COMMITTED` |
| 无操作。                                                     | `SQL>设置事务 隔离级别 读取已提交;`                          | 会话 2 开始事务 2，并将隔离级别显式设置为 。`READ COMMITTED` |
| 无操作。                                                     | `SQL>选择last_name， 员工工资 last_name在何处 （“班达”、“格林”， “提示”）;  LAST_NAME工资 ------------- ---------- 班达 6200 格林 9500` | 事务 2 查询 Banda、Greene 和 Hintz 的工资。Oracle 数据库使用读取一致性来显示事务 1 进行未提交更新之前班达的工资。 |
| 无操作。                                                     | `SQL>更新员工 SET工资=9900 其中last_name='格林';`            | 事务 2 成功更新了 Greene 的薪水，因为事务 1 仅锁定了班达行。 |
| `SQL>插入到 员工（employee_id， last_name，电子邮件， hire_date，job_id） 值 （210， '提示'， 'JHINTZ'， SYSDATE， “SH_CLERK”）;` | 无操作。                                                     | 事务 1 为员工 Hintz 插入一行，但不提交。                     |
| 无操作。                                                     | `SQL>选择last_name， 员工工资 last_name在何处 （“班达”、“格林”， “提示”）;  LAST_NAME工资 ------------- ---------- 班达 6200 格林 9900` | 事务 2 查询员工 Banda、Greene 和 Hintz 的工资。交易2看到了格林工资的更新。事务 2 没有看到交易 1 对班达的薪水进行未承诺的更新或对 Hintz 的插入。 |
| 无操作。                                                     | `SQL>更新员工集 薪水 = 6300 其中 last_name = '班达'; -- 提示不返回` | 事务 2 尝试更新当前被事务 1 锁定的 Banda 的行，从而创建冲突的写入。事务 2 等到事务 1 结束。 |
| `SQL> 提交;`                                                 | 无操作。                                                     | 事务 1 提交其工作，结束事务。                                |
| 无操作。                                                     | `更新了 1 行。  SQL>`                                        | 班达行的锁现已释放，因此交易 2 继续更新班达的工资。          |
| 无操作。                                                     | `SQL>选择last_name， 员工工资 last_name在何处 （“班达”、“格林”， “提示”）;  LAST_NAME工资 ------------- ---------- 班达 6300 格林 9900 辛茨` | 事务 2 查询员工 Banda、Greene 和 Hintz 的工资。事务 1 提交的 Hintz 插入现在对事务 2 可见。交易 2 看到了自己对班达工资的更新。 |
| 无操作。                                                     | `犯;`                                                        | 事务 2 提交其工作，结束事务。                                |
| `SQL>选择last_name， 员工工资 last_name在何处 （“班达”、“格林”， “提示”）;  LAST_NAME工资 ------------- ---------- 班达 6300 格林 9900 辛茨` | 无操作。                                                     | 会话 1 查询 Banda、Greene 和 Hintz 的行。班达的工资是6300，这是交易2所做的更新。交易 7000 将班达的工资更新为 1 现在“丢失”。 |

另请参阅：

- “[使用锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E6FB4581-CD65-4C18-AFDD-ACB3243238D3)”了解丢失的更新
- “行锁 [（TX）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-92D38952-A7A0-486F-9547-BDB6E624F125)”，了解数据库获取行锁的时间和原因





#### 可序列化隔离级别

在**可序列化隔离级别**中，事务仅看到事务开始时提交的更改（而不是查询）以及事务本身所做的更改。

可序列化事务在环境中运行，使其看起来好像没有其他用户在修改数据库中的数据。可序列化隔离适用于以下环境：

- 使用仅更新几行的大型数据库和短事务
- 两个并发事务修改相同行的可能性相对较低
- 运行时间较长的事务主要是只读的

在可序列化隔离中，通常在语句级别获得的读取一致性扩展到整个事务。事务读取的任何行在重新读取时都保证相同。任何查询都保证在事务期间返回相同的结果，因此无论查询运行了多长时间，其他事务所做的更改都对查询不可见。可序列化事务不会遇到脏读、模糊读或幻像读。

Oracle 数据库允许可序列化事务仅在可序列化事务开始时*已提交其他*事务对行所做的更改时修改行。当可序列化事务尝试更新或删除在可序列化事务开始*后*提交的其他事务更改的数据时，数据库将生成错误：

```
CopyORA-08177: Cannot serialize access for this transaction
```

当可序列化事务失败并出现错误时，应用程序可以执行多个操作，包括：`ORA-08177`

- 将执行的工作提交到该点
- 执行其他（但不同）语句，也许在回滚到事务中较早建立[**的保存点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ED9601F2-D0A2-4FE5-83A8-8F7F9E9E0D18)之后
- 回滚整个事务

下表显示了可序列化事务如何与其他事务交互。如果可序列化事务在可序列化事务开始后未尝试更改另一个事务提交的行，则可以避免序列化访问问题。

表 9-3 可序列化事务

| 第一节                                                       | 第一节                                                       | 解释                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `SQL> SELECT last_name, salary FROM employees WHERE  last_name  IN ('Banda',  'Greene', 'Hintz');  LAST_NAME         SALARY ------------- ---------- Banda               6200 Greene              9500` | 无操作。                                                     | 会话 1 查询班达、格林和辛茨的工资。没有找到名为 Hintz 的员工。 |
| `SQL> UPDATE employees  SET salary = 7000  WHERE last_name='Banda';` | 无操作。                                                     | 会话 1 通过更新班达工资开始交易 1。缺省隔离级别为 。`READ COMMITTED` |
| 无操作。                                                     | `SQL> SET TRANSACTION  ISOLATION LEVEL SERIALIZABLE;`        | 会话 2 开始事务 2 并将其设置为隔离级别。`SERIALIZABLE`       |
| 无操作。                                                     | `SQL> SELECT last_name, salary FROM employees  WHERE last_name IN  ('Banda', 'Greene', 'Hintz');  LAST_NAME        SALARY ------------ ---------- Banda              6200 Greene             9500` | 事务 2 查询 Banda、Greene 和 Hintz 的工资。Oracle 数据库使用读取一致性来显示事务 1 进行未提交更新*之前*班达的工资。 |
| 无操作。                                                     | `SQL> UPDATE employees  SET salary = 9900  WHERE last_name = 'Greene';` | 事务 2 成功更新格林工资，因为只有班达行被锁定。              |
| `SQL> INSERT INTO employees  (employee_id, last_name,  email, hire_date, job_id)  VALUES (210, 'Hintz',  'JHINTZ', SYSDATE,'SH_CLERK');` | 无操作。                                                     | 事务 1 为员工 Hintz 插入一行。                               |
| `SQL> COMMIT;`                                               | 无操作。                                                     | 事务 1 提交其工作，结束事务。                                |
| `SQL> SELECT last_name, salary  FROM employees  WHERE last_name IN  ('Banda', 'Greene', 'Hintz');  LAST_NAME         SALARY ------------- ---------- Banda               7000 Greene              9500 Hintz` | `SQL> SELECT last_name, salary FROM employees  WHERE last_name IN ('Banda', 'Greene', 'Hintz');  LAST_NAME        SALARY ------------- --------- Banda              6200 Greene             9900` | 会话 1 查询员工 Banda、Greene 和 Hintz 的工资，并查看事务 1 提交的更改。会话 1 看不到事务 2 进行的未提交的 Greene 更新。事务 2 查询员工 Banda、Greene 和 Hintz 的工资。Oracle 数据库读取一致性可确保事务 1 提交的 Hintz 插入和 Banda 更新对事务 2 *不*可见。交易2看到了格林工资的更新。 |
| 无操作。                                                     | `COMMIT;`                                                    | 事务 2 提交其工作，结束事务。                                |
| `SQL> SELECT last_name, salary  FROM employees  WHERE last_name IN  ('Banda', 'Greene', 'Hintz');  LAST_NAME         SALARY ------------- ---------- Banda               7000 Greene              9900 Hintz` | `SQL> SELECT last_name, salary FROM employees  WHERE last_name IN  ('Banda', 'Greene', 'Hintz');  LAST_NAME        SALARY ------------- --------- Banda              7000 Greene             9900 Hintz` | 这两个会话都查询Banda，Greene和Hintz的薪水。每个会话都会看到事务 1 和事务 2 所做的所有已提交更改。 |
| `SQL> UPDATE employees  SET salary = 7100  WHERE last_name = 'Hintz';` | 无操作。                                                     | 会话 1 通过更新 Hintz 工资开始事务 3。事务 3 的缺省隔离级别为 。`READ COMMITTED` |
| 无操作。                                                     | `SQL> SET TRANSACTION  ISOLATION LEVEL SERIALIZABLE;`        | 会话 2 开始事务 4 并将其设置为隔离级别。`SERIALIZABLE`       |
| 无操作。                                                     | `SQL> UPDATE employees  SET salary = 7200  WHERE last_name = 'Hintz'; -- prompt does not return` | 事务 4 尝试更新 Hintz 的薪水，但由于事务 3 锁定了 Hintz 行而被阻止。事务 4 排在事务 3 后面。 |
| `SQL> COMMIT;`                                               | 无操作。                                                     | 事务 3 提交其对 Hintz 工资的更新，结束交易。                 |
| 无操作。                                                     | `UPDATE employees  SET salary = 7200  WHERE last_name = 'Hintz' * ERROR at line 1:  ORA-08177: can't  serialize access for  this transaction` | 结束事务 3 的提交会导致事务 4 中的 Hintz 更新失败并显示错误。出现问题错误的原因是事务 3 在事务 4 开始*后*提交了 Hintz 更新。`ORA-08177` |
| 无操作。                                                     | `SQL> ROLLBACK;`                                             | 会话 2 回滚事务 4，从而结束事务。                            |
| 无操作。                                                     | `SQL> SET TRANSACTION  ISOLATION LEVEL SERIALIZABLE;`        | 会话 2 开始事务 5 并将其设置为隔离级别。`SERIALIZABLE`       |
| 无操作。                                                     | `SQL> SELECT last_name,  salary FROM employees  WHERE last_name IN  ('Banda', 'Greene', 'Hintz');  LAST_NAME         SALARY ------------- ---------- Banda               7000 Greene              9900 Hintz               7100` | 事务 5 查询 Banda、Greene 和 Hintz 的工资。事务 3 提交的 Hintz 工资更新是可见的。 |
| 无操作。                                                     | `SQL> UPDATE employees  SET salary = 7200  WHERE last_name='Hintz'; 1 row updated.` | 事务 5 将 Hintz 薪水更新为不同的值。由于事务 3 所做的 Hintz 更新在事务 5 开始*之前*提交，因此避免了序列化访问问题。**注意：**如果在事务 5 开始后，其他事务更新并提交了 Hintz 行，则序列化访问问题将再次发生。 |
| 无操作。                                                     | `SQL> COMMIT; `                                              | 会话 2 提交更新没有任何问题，结束事务。                      |

另请参阅：

- "[行锁 （TX）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-92D38952-A7A0-486F-9547-BDB6E624F125)"
- "[事务控制概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361)"





#### 只读隔离级别

只读隔离级别类似于可序列化的**隔离级别**，但只读事务不允许在事务中修改数据，除非用户是 。`SYS`

只读事务不容易受到错误的影响。只读事务对于生成报告非常有用，其中的内容必须与事务开始的时间一致。`ORA-08177`

Oracle 数据库通过根据需要从撤消段重建数据来实现读取一致性。由于撤消段以循环方式使用，因此数据库可以覆盖撤消数据。长时间运行的报表存在以下风险：读取一致性所需的撤消数据可能已被其他事务重用，从而引发错误。设置撤消保留期（即数据库在覆盖旧撤消数据之前尝试[**保留旧的撤消**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F02E3C0D-EFBF-4FAA-84B8-1BCF0BD2166A)数据的最短时间）可以适当地避免此问题。`snapshot too old`

另请参阅：

- "[撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-6E206D3A-E0E7-4B23-9C41-516FB35BC3FE)"
- Oracle [数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11465)了解如何设置撤消保留期





### Oracle 数据库锁定机制概述

**锁**是一种防止破坏互的机制。

当交互错误地更新数据或错误地更改访问共享数据的事务之间的基础数据结构时，交互是破坏性的。锁在维护数据库并发性和一致性方面起着至关重要的作用。





#### 锁定行为摘要

数据库维护几种不同类型的锁，具体取决于获取锁的操作。

通常，数据库使用两种类型的锁：独占锁和共享锁。在行或表等资源上只能获取一个独占锁，但在单个资源上可以获取多个共享锁。

锁会影响读取器和编写器的交互。读取器是对资源的查询，而编写器是修改资源的语句。以下规则总结了 Oracle 数据库对读取器和写入器的锁定行为：

- 仅当由编写器修改时，才会锁定行。

  当语句更新一行时，事务仅获取此行的锁。通过在行级别锁定表数据，数据库可以最大程度地减少对相同数据的争用。正常情况下[脚 1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#fn_1)数据库不会将行锁定升级到块或表级别。

- 行的编写器阻止同一行的并发编写器。

  如果一个事务正在修改行，则行锁会阻止另一个事务同时修改同一行。

- 读取器从不阻止编写器。

  由于行的读取器不会锁定它，因此编写器可以修改此行。唯一的例外是语句，它是一种特殊类型的语句，*可以*锁定它正在读取的行。`SELECT ... FOR UPDATE``SELECT`

- 作家永远不会阻止读者。

  当编写器更改行时，数据库使用撤消数据为读者提供一致的行视图。

  注意：在挂起的分布式事务的非常特殊的情况下，数据读取器可能必须等待相同数据块的写入器。

另请参阅：

- 要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF55370)`SELECT ... FOR UPDATE`
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12233)，了解与不确定分布式事务相关的等待





#### 锁的使用

在单用户数据库中，锁不是必需的，因为只有一个用户在修改信息。但是，当多个用户访问和修改数据时，数据库必须提供一种方法来防止同时修改相同的数据。

锁满足以下重要的数据库要求：

- 一致性

  在用户完成之前，其他会话不得更改会话正在查看或更改的数据。

- 正直

  数据和结构必须以正确的顺序反映对它们所做的所有更改。

Oracle 数据库通过其锁定机制在事务之间提供数据并发性、一致性和完整性。锁定会自动发生，无需用户操作。

锁的需求可以通过单行的并发更新来说明。在以下示例中，一个简单的基于 Web 的应用程序向最终用户提供员工电子邮件和电话号码。应用程序使用如下所示的语句来修改数据：`UPDATE`

```
CopyUPDATE employees
SET    email = ?, phone_number = ?
WHERE  employee_id = ?
AND    email = ?
AND    phone_number = ?
```

在前面的语句中，子句中的电子邮件和电话号码值是指定员工的原始未修改值。此更新可确保应用程序修改的行在应用程序上次读取后未更改，并将其显示给用户。通过这种方式，应用程序避免了丢失更新的问题，其中一个用户覆盖了另一个用户所做的更改，从而有效地丢失了第二个用户的更新（[表 9-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-8A15F1B2-3F64-49E7-929D-4768B2DB7DD7__CHDBBCEI) 显示了丢失更新的示例）。`UPDATE``WHERE`

[表 9-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E6FB4581-CD65-4C18-AFDD-ACB3243238D3__GUID-6F6A0A32-87B1-4F60-A3A4-C5EDBB157F82) 显示了两个会话尝试大致同时修改表中同一行时的事件顺序。`employees`

表 9-4 行锁定示例

| T    | 第一节                                                       | 第一节                                                       | 描述                                                         |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| t0   | `SELECT employee_id as ID,        email, phone_number  FROM   hr.employees  WHERE  last_name='Himuro';``ID  EMAIL   PHONE_NUMBER --- ------- ------------ 118 GHIMURO 515.127.4565` |                                                              | 在会话 1 中，用户查询 Himuro 记录并显示employee_id （）、电子邮件 （） 和电话号码 （） 属性。`hr1``hr.employees``118``GHIMURO``515.127.4565` |
| t1   |                                                              | `SELECT employee_id as ID,       email, phone_number  FROM   hr.employees  WHERE  last_name='Himuro';``ID  EMAIL   PHONE_NUMBER --- ------- ------------ 118 GHIMURO 515.127.4565` | 在会话 2 中，用户查询 Himuro 记录并显示employee_id （）、电子邮件 （） 和电话号码 （） 属性。`hr2``hr.employees``118``GHIMURO``515.127.4565` |
| t2   | `UPDATE hr.employees SET  phone_number='515.555.1234' WHERE employee_id=118 AND email='GHIMURO' AND phone_number =  '515.127.4565'; 1 row updated.` |                                                              | 在会话 1 中，用户将行中的电话号码更新为 ，这将获取行上的锁。`hr1``515.555.1234``GHIMURO` |
| t3   |                                                              | `UPDATE hr.employees SET  phone_number='515.555.1235' WHERE employee_id=118 AND email='GHIMURO' AND phone_number =  '515.127.4565'; -- SQL*Plus does not show -- a row updated message or -- return the prompt.` | 在会话 2 中，用户尝试更新同一行，但由于当前正在处理该行而被阻止。`hr2``hr1`尝试的更新几乎与更新同时发生。`hr2``hr1` |
| t4   | `COMMIT; Commit complete.`                                   |                                                              | 在会话 1 中，用户提交事务。`hr1`提交使 Himuro 的更改永久化，并取消阻止一直在等待的会话 2。 |
| t5   |                                                              | `0 rows updated.`                                            | 在会话 2 中，用户发现该行的修改方式使其不再与其谓词匹配。`hr2``GHIMURO`由于谓词不匹配，因此会话 2 不更新任何记录。 |
| t6   | `UPDATE hr.employees SET  phone_number='515.555.1235' WHERE employee_id=118 AND email='GHIMURO' AND  phone_number='515.555.1234'; 1 row updated.` |                                                              | 在会话 1 中，用户意识到它使用错误的电话号码更新了行。用户启动新事务并将行中的电话号码更新为 ，这将锁定该行。`hr1``GHIMURO``515.555.1235``GHIMURO` |
| t7   |                                                              | `SELECT employee_id as ID,        email, phone_number  FROM   hr.employees  WHERE  last_name='Himuro';``ID  EMAIL   PHONE_NUMBER --- ------- ------------ 118 GHIMURO 515.555.1234` | 在会话 2 中，用户查询 Himuro 记录。该记录显示会话 1 在 t4 处提交的电话号码更新。Oracle 数据库读取一致性可确保会话 2 不会看到在 t6 处所做的未提交的更改。`hr2``hr.employees` |
| t8   |                                                              | `UPDATE hr.employees SET  phone_number='515.555.1235  WHERE employee_id=118 AND email='GHIMURO' AND phone_number = '515.555.1234'; -- SQL*Plus does not show -- a row updated message or -- return the prompt.` | 在会话 2 中，用户尝试更新同一行，但由于当前正在处理该行而被阻止。`hr2``hr1` |
| t9   | `ROLLBACK; Rollback complete.`                               |                                                              | 在会话 1 中，用户回滚事务，从而结束事务。`hr1`               |
| t10  |                                                              | `1 row updated.`                                             | 在会话 2 中，电话号码更新成功，因为会话 1 更新已回滚。该行与其谓词匹配，因此更新成功。`GHIMURO` |
| t11  |                                                              | `COMMIT; Commit complete.`                                   | 会话 2 提交更新，结束事务。                                  |

Oracle 数据库在执行 SQL 语句时自动获取必要的锁。例如，在数据库允许会话修改数据之前，会话必须首先锁定数据。锁使会话能够独占地控制数据，以便在释放锁之前，任何其他事务都无法修改锁定的数据。

由于 Oracle 数据库的锁定机制与事务控制密切相关，因此应用程序设计人员只需正确定义事务，Oracle 数据库会自动管理锁定。用户永远不需要显式锁定任何资源，尽管 Oracle 数据库还允许用户手动锁定数据。

以下各节介绍对于理解 Oracle 数据库如何实现数据并发非常重要的概念。

另请参阅：

[Oracle 数据库 PL/SQL 包和类型参考以了解该包](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS393)，其中包含可帮助防止丢失更新的子程序`OWA_OPT_LOCK`





#### 锁定模式

Oracle 数据库自动使用最低适用级别的限制性来提供最高程度的数据并发性，同时提供故障安全的数据完整性。

级别限制越少，可供其他用户访问的数据就越多。相反，级别限制越大，其他交易在他们可以获取的锁类型中就越有限。

Oracle 数据库在多用户数据库中使用两种锁定模式：

- 独占锁定模式

  此模式可防止共享关联的资源。事务在修改数据时获得[**独占锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-745FDB36-B218-4F25-BCB1-61D696DB8814)。第一个以独占方式锁定资源的事务是唯一可以更改资源的事务，直到释放独占锁。

- 共享锁定模式

  此模式允许共享关联的资源，具体取决于所涉及的操作。读取数据的多个用户可以共享数据，每个用户都持有共享锁，以防止需要独占[**锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A0909390-32EF-4122-B892-659E0F04C709)的写入器并发访问。多个事务可以获取同一资源的共享锁。

假定事务使用语句来选择单个表行。事务获取独占行锁和行共享表锁。行锁允许其他会话修改锁定行*以外的*任何行，而表锁则阻止会话更改表的结构。因此，数据库允许执行尽可能多的语句。`SELECT ... FOR UPDATE`





#### 锁转换和升级

Oracle 数据库根据需要执行**锁转换**。

在锁转换中，数据库会自动将限制性较低的表锁转换为限制性较高的表锁。例如，假设事务为员工发出 a，稍后更新锁定的行。在这种情况下，数据库会自动将行共享表锁转换为行独占表锁。事务为事务中插入、更新或删除的所有行保留独占行锁。由于行锁是在最高限制级别下获取的，因此不需要或执行锁转换。`SELECT ... FOR UPDATE`

锁转换不同于锁升级，锁升级发生在将多个锁保持在某个粒度级别（例如，行）并且数据库将[**锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A2BBC47-0538-40B6-8BB3-E60DAE25F32F)提升到更高的粒度级别（例如，表）时。如果会话锁定了表中的许多行，则某些数据库会自动将行锁定升级到单个表。锁的数量减少，但锁定的限制性增加。

*Oracle 数据库从不升级锁。*锁升级会大大增加死锁的可能性。假设系统正在尝试代表事务 1 升级锁，但由于事务 2 持有的锁而无法升级。如果事务 2 还需要对相同数据进行锁升级才能继续，则会创建死锁。





#### 锁定持续时间

Oracle 数据库在发生某些事件时自动释放锁，以便事务不再需要该资源。

通常，数据库在事务期间保存由事务中的语句获取的锁。这些锁可防止破坏性干扰，例如脏读、丢失更新和来自并发事务的破坏性 [**DDL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64F19D78-A73F-44A5-AA2E-60EBC800CB22)。

注：由于未编制索引的外键而对子表执行的表锁在语句期间保持，而不是在事务期间保持。此外，`DBMS_LOCK`包使用户定义的锁可以随意释放和分配，甚至可以在事务边界上保持。

Oracle 数据库在提交或回滚时释放事务中的语句获取的所有锁。Oracle 数据库还会在回滚到保存点时释放在[**保存点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ED9601F2-D0A2-4FE5-83A8-8F7F9E9E0D18)之后获取的锁。但是，只有不等待以前锁定的资源的事务才能获取对现在可用资源的锁定。等待事务将继续等待，直到原始事务完全提交或回滚。

另请参阅：

- 显示事务等待行为的“[表 10-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-07517D95-D5F9-4851-B737-B076336CED13__CHDGIIFB)”
- “[用户定义锁概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-D63FD030-44CD-4FD7-970A-C98C8CC4AC42)”以了解更多信息`DBMS_LOCK`





#### 锁和死锁

**死锁**是两个或多个用户等待彼此锁定的数据的情况。死锁会阻止某些事务继续工作。

Oracle 数据库会自动检测死锁，并通过回滚死锁中涉及的一个语句来释放一组冲突的行锁来解决冲突。数据库向进行[**语句级回滚**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-187EACC0-1FDD-498A-BEAD-892AC03B50D0)的事务返回相应的消息。回滚的语句属于检测死锁的事务。通常，应显式回滚信号事务，但它可以在等待后重试回滚语句。

[表 9-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-C1971E9B-849A-4634-9575-4F8FAD697750__BABICGEE) 说明了死锁中的两个事务。

表 9-5 死锁事务

| T    | 第一节                                                       | 第一节                                                       | 解释                                                         |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| t0   | `SQL> UPDATE employees   SET salary = salary*1.1  WHERE employee_id = 100; 1 row updated.` | `SQL> UPDATE employees  SET  salary = salary*1.1  WHERE employee_id = 200; 1 row updated.` | 会话 1 启动事务 1 并更新员工 100 的工资。会话 2 启动事务 2 并更新员工 200 的工资。不存在任何问题，因为每个事务仅锁定它尝试更新的行。 |
| t1   | `SQL> UPDATE employees   SET salary = salary*1.1  WHERE employee_id = 200; -- prompt does not return` | `SQL> UPDATE employees  SET salary = salary*1.1  WHERE employee_id = 100; -- prompt does not return` | 事务 1 尝试更新当前被事务 200 锁定的员工 2 行。事务 2 尝试更新当前被事务 100 锁定的员工 1 行。导致死锁的原因是两个事务都无法获取继续或终止所需的资源。无论每个事务等待多长时间，都会持有冲突的锁。 |
| t2   | `UPDATE employees       * ERROR at line 1: ORA-00060: deadlock detected while waiting for resource SQL>` |                                                              | 事务 1 发出死锁信号并回滚在 t1 发出的语句。但是，在 t0 上进行的更新不会回滚。提示在会话 1 中返回。`UPDATE`**注意：**死锁中只有一个会话实际上会出现死锁错误，但任一会话都可能出现错误。 |
| t3   | `SQL> COMMIT; Commit complete.`                              |                                                              | 会话 1 提交在 t0 处进行的更新，结束事务 1。未提交在 t1 尝试更新失败。 |
| t4   |                                                              | `1 row updated. SQL>`                                        | 执行事务 1 中被事务 2 阻止的 t1 处的更新。将返回提示。       |
| t5   |                                                              | `SQL> COMMIT; Commit complete.`                              | 会话 2 提交在 t0 和 t1 处进行的更新，从而结束事务 2。        |

当事务显式覆盖 Oracle 数据库的默认锁定时，通常会发生死锁。由于 Oracle 数据库不会升级锁，也不会对查询使用读锁定，而是使用行级（而不是页级）锁，因此死锁很少发生。

另请参阅：

- "[手动数据锁概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-A4E54CD6-7232-489D-86A4-412EAF8A8DB7)"
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00203)，了解如何在显式锁定表时处理死锁





### 自动锁概述

Oracle 数据库代表事务自动锁定资源，以防止其他事务执行需要独占访问同一资源的操作。

数据库根据资源和正在执行的操作，自动获取不同限制级别的不同类型的锁。

注：数据库在执行简单读取时从不锁定行。

Oracle 数据库锁分为下表中显示的类别。

表 9-6 锁类别

| 锁     | 描述                                                         | 了解更多                                                     |
| :----- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| DML 锁 | 保护数据。例如，表锁锁定整个表，而行锁锁定所选行。           | "[DML 锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-6D4F7A79-A5F1-470A-ADEF-8888565DE84F)" |
| DDL 锁 | 保护schema对象的结构，例如，表和视图的字典定义。               | "[DDL 锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-5015CC53-4059-4CD6-B892-F211E8BDE2F9)" |
| 系统锁 | 保护内部数据库结构，如数据文件。闩锁、互斥锁和内部锁是完全自动的。 | "[系统锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-19E6C804-8D75-4D05-ACD2-11915687307A)" |





#### DML 锁

**DML** 锁（也称为*数据锁*）保证多个用户同时访问的数据的完整性。

例如，DML 锁可防止两个客户购买在线书商提供的图书的最后一本。DML 锁可防止同时发生冲突的 DML 或 DDL 操作的破坏性干扰。

DML 语句自动获取以下类型的锁：

- [行锁 （TX）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-92D38952-A7A0-486F-9547-BDB6E624F125)
- [表锁 （TM）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-B6B075B7-DE83-45EF-8A9E-1C1F71F72598)

在以下各节中，每种类型的锁定或锁定模式后面的括号中的首字母缩略词是 Oracle 企业管理器（企业管理器）的锁监视器中使用的缩写。企业管理器可能会显示任何表锁定的 TM，而不是指示表锁定的模式（如 RS 或 SRX）。

另请参阅：

"[Oracle企业管理器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-BE08A8FA-501A-418E-AD32-3E42AE762026)"





##### 行锁 （TX）

**行锁**，也称为 *TX* 锁，是单行表上的锁。事务为由 、、 或 语句修改的每一行获取行锁。行锁一直存在，直到事务提交或回滚。`INSERT``UPDATE``DELETE``MERGE``SELECT``... FOR``UPDATE`

行锁主要用作排队机制，以防止两个事务修改同一行。数据库始终以独占模式锁定已修改的行，以便其他事务在持有锁的事务提交或回滚之前无法修改该行。行锁定提供尽可能精细的粒度锁定，从而提供最佳的并发性和吞吐量。

注：如果事务由于数据库[**实例故障**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A3F6C6D9-6351-4886-BA47-5BD688AECA4B)而终止，则块级恢复会在恢复整个事务之前使行可用。

如果事务获取了行的锁，则该事务还会获取包含该行的表的锁。表锁可防止冲突的 DDL 操作，这些操作将覆盖当前事务中的数据更改。[图 9-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-92D38952-A7A0-486F-9547-BDB6E624F125__BABJHGCE) 说明了表中第三行的更新。Oracle 数据库会自动在更新的行上放置一个独占锁，在表上放置一个子独占锁。

图 9-2 行锁和表锁

![图 9-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt265.gif)
[“图 9-2 行和表锁”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt265.html)





###### 行锁和并发

此方案说明了 Oracle 数据库如何使用行锁进行并发。

三个会话同时查询相同的行。会话 1 和 2 继续对不同的行进行未提交的更新，而会话 3 不进行任何更新。每个会话都会看到其自己的未提交更新，但不会看到任何其他会话的未提交更新。

表 9-7 数据并发示例

| T    | 第一节                                                       | 第一节                                                       | 第一节                                                       | 解释                                                         |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| t0   | `SELECT employee_id,       salary FROM   employees WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          600` | `SELECT employee_id,       salary  FROM   employees WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          600` | `SELECT employee_id,        salary  FROM   employees WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          600` | 三个不同的会话同时查询员工100和101的ID和工资。每个查询返回的结果是相同的。 |
| t1   | `UPDATE hr.employees SET salary =       salary+100 WHERE   employee_id=100;` |                                                              |                                                              | 会话 1 更新员工 100 的工资，但不承诺。在更新中，编写器仅获取更新行的行级别锁，从而防止其他编写器修改此行。 |
| t2   | `SELECT employee_id,       salary  FROM   employees  WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          612 101          600` | `SELECT employee_id,       salary FROM   employees WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          600` | `SELECT employee_id,        salary  FROM   employees WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          600` | 每个会话同时发出原始查询。会话 1 显示了 t612 更新产生的 1 工资。会话 2 和 3 中的读取器立即返回行，并且不等待会话 1 结束其事务。数据库使用多版本读取一致性来显示会话 1 中更新之前存在的工资。 |
| t3   |                                                              | `UPDATE hr.employee  SET  salary =         salary+100  WHERE     employee_id=101;` |                                                              | 会话 2 更新员工 101 的工资，但不提交事务。在更新中，编写器仅获取更新行的行级锁，防止其他编写器修改此行。 |
| t4   | `SELECT employee_id,       salary  FROM   employees  WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          612 101          600` | `SELECT employee_id,       salary FROM   employees  WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          700` | `SELECT employee_id,        salary  FROM   employees WHERE  employee_id IN ( 100, 101 );``EMPLOYEE_ID  SALARY -----------  ------ 100          512 101          600` | 每个会话同时发出原始查询。会话 1 显示由 t612 更新产生的 1 工资，但不显示会话 101 中员工 2 的工资更新。会话 2 中的读者显示会话 2 中的工资更新，但不显示会话 1 中的工资更新。会话 3 中的读取器使用读取一致性来显示会话 1 和 2 修改之前的工资。 |

另请参阅：

- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF55505)
- 要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30121)`V$LOCK`





###### 行锁的存储

与某些使用锁管理器在内存中维护锁列表的数据库不同，Oracle 数据库将锁信息存储在包含锁定行的数据块中。

数据库使用排队机制来获取行锁。如果事务需要锁定未锁定的行，则事务会在数据块中放置锁定。此事务修改的每一行都指向存储在[**块头**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78394D5D-A1F6-4978-8F13-028185F514B5)中的事务 ID 的副本。

当交易结束时，交易ID保留在区块头中。如果其他事务想要修改行，则它使用事务 ID 来确定锁是否处于活动状态。如果锁处于活动状态，则会话会要求在释放锁时收到通知。否则，事务将获取锁。

另请参阅：

- “数据块概述”以了解有关[数据块](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-1AED5140-E820-436C-BEB7-2A985524911E)标头的更多信息
- 要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30291)`V$TRANSACTION`





##### 表锁 （TM）

表锁（也称为 *TM 锁*）在**表**被带有子句或语句的 、 修改时由事务获取。`INSERT``UPDATE``DELETE``MERGE``SELECT``FOR UPDATE``LOCK TABLE`

DML 操作需要表锁来代表事务保留对表的 DML 访问权限，并防止与事务冲突的 DDL 操作。

可以在以下任何模式下保持表锁：

- 行共享 （RS）

  此锁也称为*子共享表锁 （SS），*表示在表上持有锁的事务已锁定表中的行并打算更新它们。行共享锁定是限制最少的表锁定模式，为表提供最高程度的并发性。

- 行独占表锁定 （RX）

  此锁，也称为*次独占表锁 （SX），*通常表示持有锁的事务已更新表行或发出。SX 锁允许其他事务在同一表中同时查询、插入、更新、删除或锁定行。因此，SX 锁允许多个事务同时获取同一表的 SX 和子共享表锁。`SELECT ... FOR UPDATE`

- 共享表锁定 （S）

  事务持有的共享表锁允许其他事务查询该表（不使用），但仅当单个事务持有共享表锁时，才允许更新。由于多个事务可能同时持有共享表锁，因此持有此锁不足以确保事务可以修改表。`SELECT ... FOR UPDATE`

- 共享行独占表锁定 （SRX）

  此锁也称为共享*子独占表锁 （SSX），比共享表锁*更具限制性。一次只有一个事务可以获取给定表上的 SSX 锁。事务持有的 SSX 锁允许其他事务查询表（除外），但不允许更新表。`SELECT ... FOR UPDATE`

- 专用表锁 （X）

  此锁是最严格的，禁止其他事务执行任何类型的 DML 语句或在表上放置任何类型的锁。

另请参阅：

- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF55504)
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS007)，了解有关表锁的更多信息





##### 锁和外键

Oracle 数据库可最大程度地提高父键相对于依赖外键的并发控制。

锁定行为取决于外键列是否编制索引。如果未为外键编制索引，则子表可能会更频繁地被锁定，将发生死锁，并发性将降低。因此，外键几乎总是应该被索引。唯一的例外是匹配的唯一键或主键永远不会更新或删除。





###### 锁和未编制索引的外键

当子表的外键列上不存在索引时，数据库在子表上获取全表锁，并且会话修改父表中的主键（例如，删除行或修改主键属性）或将行合并到父表中。

当满足以下两个条件时，数据库将在子表上获取全表锁：

- 子表的外键列上不存在索引。
- 会话修改父表中的主键（例如，删除行或修改主键属性）或将行合并到父表中。

注：插入到父表中不会获取阻止子表上的 DML 的阻塞表锁。在插入的情况下，数据库在子表上获取一个锁，该锁阻止结构更改，但不能阻止对现有或新添加的行的修改。

假设该表是 的父级，其中包含未编制索引的外键。下图显示了修改表中部门 60 的主键属性的会话。`hr.departments``hr.employees``employees.department_id``departments`

图 9-3 具有未索引外键的锁定机制

![图 9-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt308.gif)
[“图 9-3 具有未索引外键的锁定机制”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt308.html)

[在图 9-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-0D5DA0E0-28DF-498A-B2E5-B9207AC2BAE6__I8589) 中，数据库在部门 60 的主键修改期间获取全表锁。此锁使其他会话能够查询，但不能更新表。例如，会话无法更新员工电话号码。表上的锁定在表上的主键修改完成后立即释放。如果 中的多行进行了主键修改，则会针对 中修改的每一行获取并释放一次表锁定。`employees``employees``employees``departments``departments``employees``departments`

注：子表上的 DML 不会获取父表上的表锁。





###### 锁和索引外键

当为子表中的外键列编制索引，并且会话修改父表中的主键（例如，删除行或修改主键属性）或将行合并到*父表中时*，数据库*不会*在子表上获取全表锁。

父表上的锁可防止事务获取独占表锁，但不会阻止主键修改期间父表*或*子表上的 DML。如果在父表上进行主键修改，而在子表上进行更新，则最好使用此情况。

[图 9-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-02E89C3B-91C8-4ACD-A43B-55C1DC970D16__I8605) 显示了具有索引列的子表。事务从中删除部门 280。此删除不会导致数据库在表上获取全表锁，如“[锁和未编制索引的外键](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-0D5DA0E0-28DF-498A-B2E5-B9207AC2BAE6)”中所述的情况。`employees``department_id``departments``employees`

图 9-4 具有索引外键的锁定机制

![图 9-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt309.gif)
[“图 9-4 具有索引外键的锁定机制”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt309.html)

如果子表指定 ，则从父表中删除可能会导致从子表中删除。例如，删除部门 280 可能会导致删除已删除部门中员工的记录。在这种情况下，等待和锁定规则与从父表中删除行后从子表中删除行相同。`ON DELETE CASCADE``employees`

另请参阅：

- "[外键约束](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-7CD73D16-EA1A-4AA8-AA7D-4288557395B8)"
- "[索引简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-DE7A95BC-6E4A-47EA-9FC5-B85B54F8CF41)"





#### DDL 锁

**数据字典 （DDL） 锁**在正在进行的 DDL 操作作用于或引用对象时保护schema对象的定义。

在 DDL 操作期间，只有修改或引用的单个schema对象才会被锁定。数据库从不锁定整个数据字典。

Oracle 数据库代表任何需要它的 DDL 事务自动获取 DDL 锁。用户无法显式请求 DDL 锁。例如，如果用户创建[**存储过程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-21B42148-517A-4B25-B1E1-DBC165DE7A43)，则 Oracle 数据库会自动获取过程定义中引用的所有schema对象的 DDL 锁。DDL 锁可防止在过程编译完成之前更改或删除这些对象。





##### 独家 DDL 锁

独占 DDL 锁可防止其他会话获取 DDL 或 DML 锁。

大多数 DDL 操作都需要资源的独占 DDL 锁，以防止对可能修改或引用同一schema对象的其他 DDL 操作进行破坏性干扰。例如，不允许在向表添加列时删除表，反之亦然。`DROP TABLE``ALTER TABLE`

独占 DDL 锁在 DDL 语句执行和自动提交期间持续存在。在获取独占 DDL 锁期间，如果另一个操作在schema对象上保留了另一个 DDL 锁，则获取将等到释放较旧的 DDL 锁，然后继续。

另请参阅：

“[共享 DDL](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-C6696CA2-D3B8-4CE0-AAB1-CFF040431B6E) 锁”描述了不需要独占锁来防止破坏性干扰的情况





##### 共享 DDL 锁

资源的共享 DDL 锁可防止对冲突的 DDL 操作进行破坏性干扰，但允许类似 DDL 操作的数据并发。

例如，当运行语句时，包含事务将获取所有引用表的共享 DDL 锁。其他事务可以并发创建引用相同表的过程，并获取相同表上的并发共享 DDL 锁，但任何事务都不能在任何引用的表上获取独占 DDL 锁。`CREATE``PROCEDURE`

共享 DDL 锁定在 DDL 语句执行和自动提交期间持续。因此，持有共享 DDL 锁的事务可以保证引用的schema对象的定义在事务期间保持不变。





##### 可破解解析锁

**解析锁**由 SQL 语句或 PL/SQL 程序单元为其引用的每个模式对象持有。

获取解析锁，以便在更改或删除引用的对象时可以使关联的[**共享 SQL 区域**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E0BE3164-B0A9-4ED8-AD19-2048ADFFC9BB)失效。解析锁称为*可破解解析锁*，因为它不允许任何 DDL 操作，并且可以中断以允许冲突的 DDL 操作。

在 SQL 语句执行的解析阶段，在[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中获取解析锁。只要该语句的共享 SQL 区域保留在共享池中，就会保持锁。

另请参阅：

"[共享池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1CB2BA23-4386-46DA-9146-5FE0E4599AC6)"





#### 系统锁

Oracle 数据库使用各种类型的系统锁来保护内部数据库和内存结构。用户无法访问这些机制，因为用户无法控制其发生或持续时间。





##### 锁 存

**锁存器**是一种简单的低级序列化机制，用于协调多用户对共享数据结构、对象和文件的访问。

闩锁可保护共享内存资源在被多个进程访问时免受损坏。具体而言，锁存器可保护数据结构免受以下情况的影响：

- 多个会话并发修改
- 被一个会话读取，同时被另一个会话修改
- 访问时内存的释放（老化）

通常，单个闩锁可保护 SGA 中的多个对象。例如，DBW 和 LGWR 等后台进程从[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)分配内存以创建数据结构。为了分配此内存，这些进程使用序列化访问的共享池闩锁，以防止两个进程尝试同时检查或修改共享池。分配内存后，其他进程可能需要访问共享池区域，例如[**库缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FEEB5344-9D82-4727-911A-7F14CDC76D73)，这是解析所必需的。在这种情况下，进程仅闩锁库缓存，而不闩锁整个共享池。

与排队闩锁（如行锁）不同，闩锁不允许会话排队。当闩锁可用时，请求闩锁的第一个会话将获得对它的独占访问权限。当进程在循环中重复请求闩锁时，就会发生闩锁旋转现象，而当进程在续订闩锁请求之前释放 CPU 时，就会发生[**闩锁休眠**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B25EC28-1C69-4810-BA53-52D9E88401BC)现象。

通常，Oracle 进程在操作或查看数据结构时会在极短的时间内获取锁存器。例如，在处理单个员工的工资更新时，数据库可以获取并释放数千个闩锁。闩锁的实现取决于操作系统，尤其是在进程是否等待闩锁以及等待闩锁多长时间方面。

闭锁的增加意味着并发性的降低。例如，过多的[**硬解析**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1BFB2AF7-BC88-4A93-B9AA-C75CA62C5824)操作会造成对库缓存闩锁的争用。该视图包含每个闩锁的详细闩锁使用情况统计信息，包括请求和等待每个闩锁的次数。`V$LATCH`

另请参阅：

- "[SQL 解析](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-B3F2B5B8-B679-4A7C-B1E8-286F36319FCB)"
- 要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30108)`V$LATCH`
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-03F070F3-81DF-4649-820C-DAD28AEF0871)，了解等待事件统计信息





##### 互斥体

**互斥对象 （mutex）** 是一种低级机制，可防止内存中的对象在并发进程访问时老化或损坏。互斥锁类似于闩锁，但闩锁通常保护一组对象，而互斥锁保护单个对象。

互斥体有几个好处：

- 互斥锁可以减少争用的可能性。

  由于闩锁保护多个对象，因此当进程尝试同时访问其中任何一个对象时，它可能会成为瓶颈。通过序列化对单个对象而不是组的访问，互斥锁提高了可用性。

- 互斥锁比锁存器消耗更少的内存。

- 在共享模式下，互斥锁允许多个会话并发引用。





##### 内部锁

内部锁是比闩锁和互斥锁更高层次、更复杂的机制，具有多种用途。

数据库使用以下类型的内部锁：

- 字典缓存锁

  这些锁的持续时间非常短，在修改或使用条目时保存在字典缓存中的条目上。它们保证正在解析的语句不会看到不一致的对象定义。字典缓存锁可以是共享的，也可以是独占的。共享锁在解析完成时释放，而独占锁在 DDL 操作完成时释放。

- 文件和日志管理锁

  这些锁保护各种文件。例如，内部锁保护[**控制文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)，以便一次只有一个进程可以更改它。另一个锁协调联机重做日志文件的使用和存档。锁定数据文件以确保多个实例以共享模式装入数据库，或者一个实例以独占模式装入数据库。由于文件和日志锁指示文件的状态，因此这些锁必须长时间保持。

- 表空间和撤消段锁

  这些锁可保护表空间并撤消段。例如，访问数据库的所有实例必须就表空间是联机还是脱机达成一致。撤消段已锁定，以便只有一个数据库实例可以写入段。

另请参阅：

"[数据字典缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-66430838-7862-4389-96B5-795B99A72473)"





### 手动数据锁概述

您可以手动覆盖 Oracle 数据库默认锁定机制。

Oracle 数据库会自动执行锁定，以确保数据并发性、数据完整性和语句级读取一致性。但是，在以下情况下，覆盖默认锁定非常有用：

- 应用程序需要事务级读取一致性或可重复读取。

  在这种情况下，查询必须在事务期间生成一致的数据，而不反映其他事务的更改。可以通过使用显式锁定、只读事务、可序列化事务或重写默认锁定来实现事务级读取一致性。

- 应用程序要求事务对资源具有独占访问权限，以便事务不必等待其他事务完成。

您可以在会话或事务级别覆盖 Oracle 数据库自动锁定。在会话级别，会话可以使用语句设置所需的事务隔离级别。在事务级别，包含以下 SQL 语句的事务将覆盖 Oracle 数据库默认锁定：`ALTER SESSION`

- 声明`SET TRANSACTION ISOLATION LEVEL`
- 语句（锁定表，或者与视图一起使用时锁定基表）`LOCK TABLE`
- 声明`SELECT ... FOR UPDATE`

上述语句获取的锁在事务结束后释放，或者回滚到 savepoint 释放它们。

如果在任何级别覆盖了 Oracle 数据库默认锁定，则数据库管理员或应用程序开发人员应确保覆盖锁定过程正常运行。锁定过程必须满足以下条件：保证数据完整性，数据并发性可接受，死锁不可能或得到适当处理。

另请参阅：

- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01605)，了解 和 的描述`LOCK TABLE``SELECT`
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00203)，了解如何手动锁定表





### 用户定义锁概述

借助 Oracle 数据库锁管理服务，您可以为特定应用定义自己的锁。

例如，您可以创建一个锁来序列化对文件系统上消息日志的访问。由于保留用户锁与 Oracle 数据库锁相同，因此它具有所有 Oracle 数据库锁功能，包括死锁检测。用户锁永远不会与 Oracle 数据库锁冲突，因为它们使用前缀 标识。`UL`

Oracle 数据库锁定管理服务可通过软件包中的过程获得。您可以在 PL/SQL 块中包含以下语句：`DBMS_LOCK`

- 请求特定类型的锁
- 为锁指定一个可在相同实例中的另一个过程中识别的唯一名称
- 更改锁类型
- 松开锁

另请参阅：

- Oracle 数据库[开发指南，了解有关 Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS1002)锁管理服务的更多信息
- [Oracle 数据库 PL/SQL 包和类型参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS021)了解相关信息`DBMS_LOCK`

------



脚注图例

脚注1：

在处理分布式两阶段提交时，数据库可能会在特殊情况下短暂阻止读取访问。具体而言，如果查询在准备和提交阶段之间启动，并尝试在提交之前读取数据，则数据库可能会将锁从行级别升级到块级别，以保证读取一致性。

## 10 交易

本章定义事务并描述数据库如何处理事务。

本章包含以下部分：

- [交易简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-31319EA7-994C-4D25-8814-0214ABD3CBDA)
- [事务控制概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361)
- [事务防护概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-47BCD081-8FFF-4D13-A0B1-F531521BC6C3)
- [应用程序连续性概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-0B463F72-73C9-4EB6-B98D-5EC828CDB1E7)
- [自治交易概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-C0C61571-5175-400D-AEFC-FDBFE4F87188)
- [分布式事务概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-47231512-4A3E-4E59-86BD-332E1FB88A88)





### 交易简介

**事务**是包含一个或多个 SQL 语句的逻辑原子工作单元。

事务对 SQL 语句进行分组，以便它们要么全部提交（这意味着它们应用于数据库），要么全部回滚，这意味着它们从数据库中撤消。Oracle 数据库为每个事务分配一个称为[**事务 ID**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71C31D71-F2E8-4FB9-9010-062C1C407CEF) 的唯一标识符。

所有 Oracle 事务都遵循数据库事务的基本属性，称为 [**ACID 属性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2684886B-AB0E-4F65-9B24-688511AED791)。ACID 是以下内容的首字母缩写词：

- 原子数

  事务的所有任务都已执行或不执行。没有部分交易。例如，如果事务开始更新 100 行，但系统在更新 20 行后失败，则数据库会将更改回滚到这 20 行。

- 一致性

  事务将数据库从一个一致状态带到另一个一致状态。例如，在借记储蓄账户并贷记支票账户的银行交易中，故障不得导致数据库仅贷记一个账户，这会导致数据不一致。

- 隔离

  在提交事务之前，事务的效果对其他事务不可见。例如，更新表的一个用户看不到另一个用户同时进行的未提交的更改。因此，在用户看来，事务似乎是串行执行的。`hr.employees``employees`

- 耐久性

  已提交事务所做的更改是永久性的。事务完成后，数据库通过其恢复机制确保事务中的更改不会丢失。

事务的使用是数据库管理系统与文件系统区别的最重要方式之一。





#### 交易示例：账户借方和贷方

为了说明交易的概念，请考虑银行数据库。

当客户将资金从储蓄账户转移到支票账户时，交易必须包含三个单独的操作：

- 减少储蓄账户
- 增加支票账户
- 在交易日志中记录交易记录

Oracle 数据库必须允许两种情况。如果所有三个 SQL 语句都使帐户保持适当的平衡，则可以将事务的效果应用于数据库。但是，如果资金不足、账号无效或硬件故障等问题阻止了事务中的一两个语句完成，则数据库必须回滚整个事务，以便所有帐户的余额正确。

下图说明了银行交易记录。第一个语句从储蓄账户 500 中减去 3209 美元。第二份报表将 500 美元添加到支票账户 3208。第三条语句将传输记录插入到日记帐表中。最后一条语句提交事务。

图 10-1 银行交易

![Description of Figure 10-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt025.gif)
[“图 10-1 银行交易”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt025.html)





#### 交易结构

数据库事务由一个或多个语句组成。

具体而言，事务由以下内容之一组成：

- 一个或多个数据操作语言 （DML） 语句，它们共同构成对数据库的原子更改
- 一种数据定义语言 （DDL） 语句

事务有开始和结束。

另请参阅：

- "[SQL 语句概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-662EE4B0-7D5E-43F5-806D-A2AE404D77BF)"
- 有关 SQL 语句类型的帐户的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF-GUID-E1749EF5-2264-44DF-99EF-AEBEB943BED6)





##### 交易开始

当遇到第一个可执行的 SQL 语句时，事务开始。

[**可执行**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2F2F02A4-2405-4A0A-ABAF-91DB48DD4B82) SQL 语句是生成对[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的调用的 SQL 语句，包括 DML 和 DDL 语句以及该语句。`SET TRANSACTION`

事务开始时，Oracle 数据库会将事务分配给可用的撤消数据段，以记录新事务的[**撤消**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-297B963A-989C-4720-B061-A2352FF72892)条目。在分配撤消段和事务表槽之前，不会分配[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BFF71130-2760-4C64-8829-7772C803FBE7) ID，这发生在第一个 DML 语句期间。事务 ID 对于事务是唯一的，表示撤消段编号、槽和序列号。

以下示例执行一个语句以开始事务并查询有关该事务的详细信息：`UPDATE``V$TRANSACTION`

```
CopySQL> UPDATE hr.employees SET salary=salary; 

107 rows updated.
 
SQL> SELECT XID AS "txn id", XIDUSN AS "undo seg", XIDSLOT AS "slot", 
  2  XIDSQN AS "seq", STATUS AS "txn status"
  3  FROM V$TRANSACTION;
 
txn id             undo seg       slot        seq txn status
---------------- ---------- ---------- ---------- ----------------
0600060037000000          6          6         55 ACTIVE
```

另请参阅：

"[撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-6E206D3A-E0E7-4B23-9C41-516FB35BC3FE)"





##### 交易结束

交易可以在不同的情况下结束。

发生以下任一操作时，事务结束：

- 用户发出*不带*子句的 or 语句。`COMMIT``ROLLBACK``SAVEPOINT`

  在[**提交**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0680EB2C-ADF4-431A-A259-FB2227E5AA93)中，用户显式或隐式请求将事务中的更改永久化。事务所做的更改是永久性的，只有在事务提交后才能对其他用户可见。

- 用户运行 DDL 命令，如 、 、 或 。`CREATE``DROP``RENAME``ALTER`

  数据库在每个 DDL 语句之前和之后发出隐式语句。如果当前事务包含 DML 语句，则 Oracle 数据库首先提交事务，然后将 DDL 语句作为新的单语句事务运行和提交。`COMMIT`

- 用户正常退出大多数 Oracle 数据库实用程序和工具，从而导致隐式提交当前事务。用户断开连接时的提交行为取决于应用程序且可配置。

  注意：应用程序应始终在程序终止之前显式提交或撤消事务。

- 客户端进程异常终止，导致使用存储在事务表和撤消段中的元数据隐式回滚事务。

一个事务结束后，下一个可执行 SQL 语句会自动启动下一个事务。下面的示例执行 以启动事务，以语句结束事务，然后执行 以启动新事务（请注意，事务 ID 不同）：`UPDATE``ROLLBACK``UPDATE`

```
CopySQL> UPDATE hr.employees SET salary=salary; 
107 rows updated.
 
SQL> SELECT XID, STATUS FROM V$TRANSACTION;
 
XID              STATUS
---------------- ----------------
0800090033000000 ACTIVE
 
SQL> ROLLBACK;
 
Rollback complete.
 
SQL> SELECT XID FROM V$TRANSACTION;
 
no rows selected
 
SQL> UPDATE hr.employees SET last_name=last_name;
 
107 rows updated.
 
SQL> SELECT XID, STATUS FROM V$TRANSACTION;
 
XID              STATUS
---------------- ----------------
0900050033000000 ACTIVE
```

另请参阅：

- “示例[交易：帐户借方和贷方](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-A049FE81-8B67-4386-B599-9CDD7E6B6C59)”，以获取以提交结尾的交易示例。
- 要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01110)`COMMIT`





#### 语句级原子性

Oracle 数据库支持语句级原子性，这意味着 SQL **语句是一个原子**工作单元，要么完全成功，要么完全失败。

成功的语句不同于已提交的事务。如果数据库将单个 SQL 语句作为原子单元解析并运行而不会出错，则单个 SQL 语句将成功执行，就像在多行更新中更改所有行时一样。

如果 SQL 语句在执行过程中导致错误，则表示该语句不成功，因此将回滚该语句的所有效果。此操作是[**语句级回滚**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-187EACC0-1FDD-498A-BEAD-892AC03B50D0)。此操作具有以下特征：

- 不成功的 SQL 语句只会导致它自己执行的工作丢失。

  不成功的语句不会导致当前事务中之前的任何工作的丢失。例如，如果“[示例交易：帐户借方和贷方](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-A049FE81-8B67-4386-B599-9CDD7E6B6C59)”中第二条语句的执行导致错误并回滚，则不会回滚第一个语句执行的工作。第一个语句可以由用户显式提交或回滚。`UPDATE``UPDATE``UPDATE`

- 回滚的效果就像从未运行过该语句一样。

  原子语句的任何副作用（例如，在执行语句时调用的触发器）都被视为原子语句的一部分。要么作为原子语句的一部分生成的所有工作都成功，要么没有成功。

导致语句级回滚的错误的一个示例是尝试插入重复的主[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)。死[**锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E33D1853-7F99-4FDD-9CC7-D6308E943D61)中涉及的单个 SQL 语句（即对相同数据的竞争）也可能导致语句级回滚。但是，在 SQL 语句解析期间发现的错误（如语法错误）尚未运行，因此不会导致语句级回滚。

另请参阅：

- "[SQL 解析](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-B3F2B5B8-B679-4A7C-B1E8-286F36319FCB)"
- "[锁和死锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-C1971E9B-849A-4634-9575-4F8FAD697750)"
- "[触发器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-40297ADF-0968-42F8-B8B9-84AD6ADCBE63)"





#### 系统更改编号 （SCN）

**系统更改编号 （SCN）** 是 Oracle 数据库使用的逻辑内部时间戳。

SCN 对数据库中发生的事件进行排序，这对于满足事务的 ACID 属性是必需的。Oracle 数据库使用 SCN 标记 SCN，在该 SCN 之前，已知所有更改都在磁盘上，以便恢复避免应用不必要的重做。数据库还使用 SCN 标记一组数据不存在重做的位置，以便可以停止恢复。

SCN 以单调递增的顺序出现。Oracle 数据库可以像使用时钟一样使用 SCN，因为观察到的 SCN 指示逻辑时间点，并且重复的观测返回相等或更大的值。如果一个事件的 SCN 低于另一个事件，则它在数据库中发生的时间较早。多个事件可能共享同一个 SCN，这意味着它们在数据库中同时发生。

每个事务都有一个 SCN。例如，如果事务更新行，则数据库将记录发生此更新的 SCN。此事务中的其他修改具有相同的 SCN。当事务提交时，数据库会记录此提交的 SCN。

Oracle 数据库在[**系统全局区域 （SGA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78C0E867-233A-4857-B9FE-A3852A9B7BDF) 中递增 SCN。当事务修改数据时，数据库会将新的 SCN 写入分配给该事务的撤消数据段。然后，日志编写器进程立即将事务的提交记录写入联机[**重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)。提交记录具有事务的唯一 SCN。Oracle 数据库还使用 SCN 作为其[**实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)恢复和[**媒体恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-938A3E7D-CC65-496C-9DB3-3CFC45AFA8DD)机制的一部分。

另请参阅：

- "[实例恢复概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-728C6BE1-5687-4DC5-B570-D2042C88F935)"
- "[备份和恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCE361D9-B486-43B4-B4FD-5722A93203F0)"





### 事务控制概述

**事务控制**是对 DML 语句所做的更改以及将 DML 语句分组到事务中的管理。

通常，应用程序设计人员关注事务控制，以便在逻辑单元中完成工作并保持数据一致。

事务控制涉及使用以下语句，如“[事务控制语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-73F24816-881A-4849-B8A7-EA9B446A24A7)”中所述：

- 该语句结束当前事务，并使事务中执行的所有更改永久化。 还会擦除事务中的所有保存点并释放事务锁定。`COMMIT``COMMIT`
- 该语句反转当前事务中完成的工作;它会导致自上次或丢弃以来的所有数据更改。该语句撤消自上次保存点以来的更改，但不会结束整个事务。`ROLLBACK``COMMIT``ROLLBACK``ROLLBACK TO SAVEPOINT`
- 该语句标识事务中的某个点，稍后可以回滚到该点。`SAVEPOINT`

[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中的会话说明了事务控制的基本概念。

表 10-1 事务控制

| T    | 会期                                                         | 解释                                                         |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| t0   | `COMMIT;`                                                    | 此语句结束会话中的任何现有事务。                             |
| t1   | `SET TRANSACTION NAME 'sal_update';`                         | 此语句开始一个事务并将其命名为 。`sal_update`                |
| t2   | `UPDATE employees    SET salary = 7000     WHERE last_name = 'Banda';` | 此报表将班达的工资更新为 7000。                              |
| t3   | `SAVEPOINT after_banda_sal;`                                 | 此语句创建一个名为 的保存点，使此事务中的更改能够回滚到此点。`after_banda_sal` |
| t4   | `UPDATE employees    SET salary = 12000     WHERE last_name = 'Greene';` | 此声明将格林的薪水更新为 12000。                             |
| t5   | `SAVEPOINT after_greene_sal;`                                | 此语句创建一个名为 的保存点，使此事务中的更改能够回滚到此点。`after_greene_sal` |
| t6   | `ROLLBACK TO SAVEPOINT    after_banda_sal;`                  | 此语句将事务回滚到 t3，撤消对 Greene 在 t4 处的薪水的更新。事务*尚未*结束。`sal_update` |
| t7   | `UPDATE employees    SET salary = 11000     WHERE last_name = 'Greene';` | 此报表将格林的薪水更新为 11000 在交易中。`sal_update`        |
| t8   | `ROLLBACK;`                                                  | 此语句回滚事务中的所有更改，结束事务。`sal_update`           |
| t9   | `SET TRANSACTION NAME 'sal_update2';`                        | 此语句在会话中开始一个新事务并将其命名为 。`sal_update2`     |
| t10  | `UPDATE employees    SET salary = 7050     WHERE last_name = 'Banda';` | 此报表将班达的工资更新为 7050。                              |
| t11  | `UPDATE employees    SET salary = 10950     WHERE last_name = 'Greene';` | 此声明将格林的薪水更新为 10950。                             |
| t12  | `COMMIT;`                                                    | 此语句提交在事务中所做的所有更改，结束事务。提交保证更改保存在联机重做日志文件中。`sal_update2` |

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30043)，了解事务控制语句





#### 交易名称

事务名称是用户指定的可选标记，用于提醒事务正在执行的工作。使用语句命名事务，如果使用语句，则必须是事务的第一个语句。`SET TRANSACTION``...``NAME`

在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，第一个事务被命名，第二个事务被命名。`sal_update``sal_update2`

事务名称具有以下优点：

- 监视长时间运行的事务和解决可疑的分布式事务更容易。
- 您可以在应用程序中查看事务名称以及事务 ID。例如，数据库管理员可以在监视系统活动时在 Oracle 企业管理器（企业管理器）中查看事务名称。
- 数据库将事务名称写入事务审计重做记录，因此您可以使用 LogMiner 在重做日志中搜索特定事务。
- 可以使用事务名称在数据字典视图中查找特定事务，例如 。`V$TRANSACTION`

另请参阅：

- "[Oracle企业管理器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-BE08A8FA-501A-418E-AD32-3E42AE762026)"
- 要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30291)`V$TRANSACTION`
- 要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01705)`SET TRANSACTION`





#### 活跃交易

活动事务是已启动但尚未提交或回滚的**事务**。

在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，修改事务中数据的第一个语句是对 Banda 工资的更新。从成功执行此更新到语句结束事务，事务处于活动状态。`sal_update``ROLLBACK``sal_update`

事务所做的数据更改是临时的，直到事务提交或回滚。在事务结束之前，数据的状态如下表所示。

表 10-2 事务结束前的数据状态

| 州                                                     | 描述                                                         | 了解更多                                                     |
| :----------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Oracle 数据库已在 SGA 中生成撤消信息。                 | 撤消数据包含由事务的 SQL 语句更改的旧数据值。                | "[已提交读取隔离级别的读取一致性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-432C4EDC-F7F2-467C-B85F-4E82D3D58A2F)" |
| Oracle 数据库已在 SGA 的联机重做日志缓冲区中生成重做。 | 重做日志记录包含对数据块的更改和对撤消块的更改。             | "[重做日志缓冲区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-C2AD1BF6-A5AE-42E9-9677-0AA08126864B)" |
| 已对 SGA 的数据库缓冲区进行了更改。                    | 存储在 SGA 的数据库缓冲区中的已提交事务的数据更改不一定由[**数据库编写器 （DBW）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C27AAA54-E60B-49BC-AB04-7B3848EBAFD6) 立即写入数据文件。磁盘写入可以在提交之前或之后发生。 | "[数据库缓冲区缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-4FF66585-E469-4631-9225-29D75594CD14)" |
| 受数据更改影响的行将被锁定。                           | 其他用户无法更改受影响行中的数据，也无法看到未提交的更改。   | "[锁定行为摘要](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-1D60EFCC-03F4-4A04-B099-1B4DE5D02C47)" |





#### 保存点

**保存点**是事务上下文中用户声明的中间标记。

在内部，保存点标记解析为 SCN。保存点将多头交易分成较小的部分。

如果在长事务中使用保存点，则可以选择稍后回滚在事务中当前点之前执行的工作，但在事务中声明的保存点之后。因此，如果您犯了错误，则无需重新提交每个语句。[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 创建了保存点，以便对 Greene 工资的更新可以回滚到此保存点。`after_banda_sal`





##### 回滚到保存点

回滚到未提交的事务中的保存点意味着撤消在指定的保存点之后所做的任何更改，但这并不意味着事务本身的回滚。

当事务回滚到保存点时（如[在表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中运行 时），将发生以下情况：`ROLLBACK TO SAVEPOINT after_banda_sal`

1. Oracle 数据库仅回滚在保存点之后运行的语句。

   在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，导致 Greene 回滚，但 Banda 没有回滚。`ROLLBACK TO SAVEPOINT``UPDATE``UPDATE`

2. Oracle 数据库保留语句中指定的保存点，但所有后续保存点都将丢失。`ROLLBACK TO SAVEPOINT`

   在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，导致保存点丢失。`ROLLBACK TO SAVEPOINT``after_greene_sal`

3. Oracle 数据库释放在指定保存点之后获取的所有表锁和行锁，但保留在保存点之前获取的所有数据锁。

交易保持活动状态，可以继续。

另请参阅：

- 了解 和 语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01610)`ROLLBACK``SAVEPOINT`
- [Oracle 数据库 PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS00608)，了解事务处理和控制





##### 排队的事务

根据方案，在回滚到保存点后，等待以前锁定的资源的事务可能仍会被阻止。

当一个事务被另一个事务阻塞时，它会在阻塞事务本身上排队，以便整个阻塞事务必须提交或回滚才能继续被阻止的事务。

在下表所示的方案中，会话 1 回滚到在执行 DML 语句之前创建的保存点。但是，会话 2 仍被阻止，因为它正在等待会话 1 事务完成。

表 10-3 回滚到保存点示例

| T    | 第一节                                          | 第一节                                          | 第一节                                          | 解释                                                         |
| :--- | :---------------------------------------------- | :---------------------------------------------- | :---------------------------------------------- | :----------------------------------------------------------- |
| t0   | `更新员工 SET工资=7000 其中last_name= “班达”;`  |                                                 |                                                 | 会话 1 开始事务。会话在行 （TX） 上放置一个独占锁，在表上放置一个次独占表锁 （SX）。`Banda` |
| t1   | `保存点 after_banda_sal;`                       |                                                 |                                                 | 会话 1 创建一个名为 的保存点。`after_banda_sal`              |
| t2   | `更新员工 SET工资=12000 其中last_name= “格林”;` |                                                 |                                                 | 会话 1 锁定该行。`Greene`                                    |
| t3   |                                                 | `更新员工 SET工资=14000 其中last_name= “格林”;` |                                                 | 会话 2 尝试更新该行，但无法获取锁，因为会话 1 在此行上具有锁。会话 2 中未开始任何事务。`Greene` |
| t4   | `反转 要保存点 after_banda_sal;`                |                                                 |                                                 | 会话 1 回滚对 工资的更新，从而释放 的行锁定。不会释放在 t0 处获取的表锁。`Greene``Greene`此时，会话 2 *仍*被会话 1 阻止，因为会话 2 在尚未完成的会话 1 *事务*上排队。 |
| t5   |                                                 |                                                 | `更新员工 SET工资=11000 其中last_name= “格林”;` | 该行当前已解锁，因此会话 3 获取用于更新该行的锁。此语句在会话 3 中开始事务。`Greene``Greene` |
| t6   | `犯;`                                           |                                                 |                                                 | 会话 1 提交，结束其事务。会话 2 现在排队等待更新到会话 3 中事务后面的行。`Greene` |

另请参阅：

“[锁定持续时间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-DB33AD91-8A4E-44CE-A6B2-654909143E5F)”以了解有关 Oracle 数据库何时释放锁定的更多信息





#### 事务回滚

未提交事务的回滚会撤消事务中 SQL 语句对数据执行的任何更改。

回滚事务后，事务中完成的工作的影响将不再存在。在回滚整个事务时，Oracle 数据库在不引用任何保存点的情况下执行以下操作：

- 使用相应的撤消段撤消事务中所有 SQL 语句所做的所有更改

  每个活动事务的事务表条目都包含一个指向事务的所有撤消数据的指针（按应用程序的相反顺序）。数据库从撤消段读取数据，撤消操作，然后将撤消条目标记为已应用。因此，如果事务插入一行，则回滚会删除它。如果事务更新了行，则回滚将反转更新。如果事务删除了一行，则回滚会重新插入该行。在[表10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA)中，格林和班达的工资更新相反。`ROLLBACK`

- 释放事务持有的所有数据锁

- 擦除事务中的所有保存点

  在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，删除保存点。该语句删除了保存点。`ROLLBACK``after_banda_sal``after_greene_sal``ROLLBACK TO SAVEPOINT`

- 结束事务

  在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，使数据库处于与执行初始后相同的状态。`ROLLBACK``COMMIT`

回滚的持续时间是修改的数据量的函数。

另请参阅：

- "[撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-6E206D3A-E0E7-4B23-9C41-516FB35BC3FE)"
- 了解该命令的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-94551F0C-A47F-43DE-BC68-9B1C1ED38C93)`ROLLBACK`





#### 事务提交

提交结束当前事务，并使事务中执行的所有更改永久化。

在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，第二个事务以显式语句开头和结尾。这两个声明所产生的变化现在成为永久性的。`sal_update2``COMMIT``UPDATE`

当事务提交时，将执行以下操作：

- 数据库为 生成 的 SCN。`COMMIT`

  关联[**撤消表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78A7FBF2-2EB5-4BD6-AECC-D61A5AEF1158)的内部事务表记录事务已提交。事务的相应唯一 SCN 被分配并记录在事务表中。

- [**日志编写器进程 （LGWR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E96BC851-0B78-4250-8EAB-26EBDF4FE5A6) 进程将重做日志缓冲区中的剩余重做日志条目写入联机重做日志，并将事务 SCN 写入联机重做日志。*此原子事件构成事务的提交。*

- Oracle 数据库释放对行和表的锁定。

  排队等待未提交事务持有的锁的用户可以继续其工作。

- Oracle 数据库删除保存点。

  在[表 10-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-5BB15405-8A03-47DE-8A20-63E1B83E1361__CHDCIJGA) 中，事务中不存在保存点，因此未擦除任何保存点。`sal_update`

- Oracle 数据库执行[**提交清理**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5E20E19B-FC72-40E3-A129-306B52DC9607)。

  如果包含已提交交易数据的已修改区块仍在SGA中，并且没有其他会话在修改它们，则数据库将从区块中删除与锁有关的交易信息（ITL条目）。

  理想情况下，清理块，以便后续人员不必执行此任务。如果某一行不存在ITL条目，则不会锁定该行。如果某一行存在一个ITL条目，那么它可能已被锁定，因此会话必须检查撤消段标题，以确定这个感兴趣的交易是否已提交。如果感兴趣的事务已提交，则会话会清除块，从而生成重做。但是，如果先前清除了国际交易日志，则不需要检查和清理。`COMMIT``SELECT``COMMIT`

  注：由于块清理会生成重做，因此查询可能会生成重做，从而导致在下一个[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)期间写入块。

- Oracle 数据库将事务标记为完成。

事务提交后，用户可以查看更改。

通常，无论事务大小如何，提交都是快速操作。提交的速度不会随着事务中修改的数据大小而增加。提交中最长的部分是 LGWR 执行的物理磁盘 I/O。但是，LGWR 花费的时间减少了，因为它一直在后台以增量方式写入重做日志缓冲区的内容。

默认行为是 LGWR 同步将重做写入联机重做日志，并让事务在向用户返回提交之前等待缓冲重做在磁盘上。但是，为了降低事务提交延迟，应用程序开发人员可以指定异步写入重做，以便事务无需等待重做在磁盘上，并且可以立即从调用中返回。`COMMIT`

另请参阅：

- "[可序列化隔离级别](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-8DA9A191-4CA3-4B1A-995F-4B17471C2738)"
- "[锁定机制](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-AD960556-7F7B-4242-8B91-6DA22AABA27D)"
- “[后台进程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D8AE1B78-69D5-4F0F-8BE3-C91AA2514F2D)”，了解有关 LGWR 的更多信息
- [Oracle 数据库 PL/SQL 包和类型参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS592)了解有关异步提交的更多信息





### 事务防护概述

事务**防护**是应用程序可用于提供**事务幂等性的** API，即数据库保留有保证的提交结果的能力，该结果指示事务是否已提交并完成。Oracle Database 为 JDBC thin、OCI、OCCI 和 ODP.Net 提供了 API。

[**可恢复的错误**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2F7DE61F-BD7C-4A89-91E6-CE0D193E8294)是由外部系统故障引起的，与正在执行的应用程序会话逻辑无关。前台进程、网络、节点、存储和数据库发生计划内和计划外停机后，会发生可恢复的错误。如果中断中断了客户端应用程序和数据库之间的连接，则应用程序会收到断开连接错误消息。连接断开时正在运行的事务称为[**正在进行的事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4A49C543-CD3B-4F01-BF01-21F15CEABEE1)。

若要决定是重新提交事务还是将结果（已提交或未提交）返回给客户端，应用程序必须确定正在进行的事务的结果。在 Oracle Database 12c 之前，返回到客户端的提交消息不是持久性的。检查事务并不能保证它在检查后不会提交，允许重复事务和其他形式的逻辑损坏。例如，用户可能会在在线购买图书时刷新 Web 浏览器，并为同一本书支付两次费用。

另请参阅：

- "[交易简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-31319EA7-994C-4D25-8814-0214ABD3CBDA)"
- 了解事务防护的 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS1062)
- [Oracle 真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD8423)，了解如何为事务防护配置服务





#### 事务保护的好处

从 Oracle 数据库 12c 开始，事务防护为应用程序提供了一种工具，用于在可恢复中断后确定正在进行的事务的状态。

使用事务保护，应用程序可以确保事务执行不超过一次。例如，如果在线书店应用程序确定以前提交的提交失败，则该应用程序可以安全地重新提交。

事务防护提供了一个最多一次执行的工具，以避免应用程序执行重复提交。事务防护为每个事务提供已知结果。

Transaction Guard 是 Oracle 数据库的核心功能。应用程序连续性在屏蔽最终用户中断时使用事务防护。如果没有事务防护，应用程序在出错后重试可能会导致提交重复的事务。

另请参阅：

- “应用程序连续性概述”，了解应用程序[连续性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-0B463F72-73C9-4EB6-B98D-5EC828CDB1E7)，它与事务防护配合使用，帮助开发人员实现高应用程序可用性
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS924)，了解事务防护，包括支持和包含的事务类型





#### 事务防护的工作原理

本节介绍丢失提交消息的问题，以及事务防护如何使用逻辑事务 ID 来解决问题。





##### 丢失提交消息

在设计幂等性时，开发人员必须解决提交提交语句后通信失败的问题。提交消息不会保留在数据库中，因此在失败后无法检索。

下图是客户端应用程序和数据库之间交互的高级表示形式。

图 10-2 丢失提交消息

![图 10-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt356.png)
[“图 10-2 丢失提交消息”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt356.html)

在标准提交情况下，数据库提交事务并向客户端返回成功消息。在[图 10-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-E567DC50-32EC-440E-9352-18E8AD79340B__CIHEHJGB) 中，客户端提交一个 commit 语句并收到一条消息，指出通信失败。发生此类故障的原因有多种，包括数据库实例故障或网络中断。在这种情况下，客户端不知道事务的状态。

通信失败后，数据库可能仍在运行提交，并且不知道客户端已断开连接。检查事务状态并不能保证活动事务在检查后不会提交。如果客户端由于此信息过期而重新发送提交，则数据库可能会重复该事务，从而导致逻辑损坏。





##### 逻辑事务标识

Oracle 数据库通过使用称为**逻辑事务 ID** 的全局唯一标识符来解决通信故障。

此 ID 包含会话首次连接时分配的逻辑会话号，以及每次会话提交或回滚时更新的正在运行的提交号。[脚 1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#fn_1)从应用程序的角度来看，逻辑事务 ID 唯一标识在会话上提交的失败的最后一个数据库事务。

对于从客户端提交一个或多个事务的每个往返行程，数据库将存储一个逻辑事务 ID。此 ID 可以为提交数据的每次往返访问的应用程序与数据库之间的交互提供事务幂等性。

最多一次协议通过要求数据库执行以下操作来访问提交结果：

- 在约定的重试保留期内维护逻辑事务 ID
- 提交时保留逻辑事务 ID

在事务运行时，数据库和客户端都持有逻辑事务 ID。数据库在身份验证时、从连接池借用时以及每次从执行一个或多个提交操作的客户端驱动程序的往返时为客户端提供逻辑事务 ID。

在应用程序可以确定可恢复错误后的最后一个事务的结果之前，应用程序使用 Java、OCI、OCCI 或 ODP.Net API 获取客户端上保存的逻辑事务 ID。然后，应用程序使用逻辑事务 ID 调用 PL/SQL 过程，以确定上次提交的结果：已提交（或）和用户调用已完成（或）。`DBMS_APP_CONT.GET_LTXID_OUTCOME``true``false``true``false`

使用事务防护时，当错误可恢复且会话上的最后一个事务尚未提交时，应用程序可以重播事务。当最后一个事务提交且用户调用已完成时，应用程序可以继续。应用程序可以使用事务保护将已知结果返回到客户端，以便客户端可以决定要执行的下一个操作。

另请参阅：

- 了解逻辑事务 ID 的 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS324)
- [Oracle 数据库 PL/SQL 包和类型参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS73456)，了解有关该过程的更多信息`DBMS_APP_CONT.GET_LTXID_OUTCOME`





#### 事务防护：示例

在这种情况下，由于可恢复的错误，提交消息丢失。

事务防护使用逻辑事务 ID 来保留语句的结果，确保事务存在已知结果。`COMMIT`

图 10-3 检查逻辑事务状态

![图 10-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt365.png)
[“图 10-3 逻辑事务状态检查”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt365.html)

在[图 10-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-6AEE7250-D39B-4DB7-BF71-E2C1841BF598__CIHGGHBA) 中，数据库通知应用程序事务是否提交以及最后一个用户调用是否完成。然后，应用程序可以将结果返回给最终用户。可能性是：

- 如果事务已提交且用户调用已完成，则应用程序可以将结果返回给最终用户并继续。
- 如果事务已提交但用户调用未完成，则应用程序可以将结果返回给最终用户，并显示警告。示例包括丢失的绑定或丢失的处理行数。一些应用程序依赖于额外的信息，而其他应用程序则不依赖于。
- 如果未提交用户调用，则应用程序可以将此信息返回给最终用户，或安全地重新提交。协议是有保证的。当提交状态返回 false 时，将阻止最后一次提交。

另请参阅：

[Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS8000)，了解如何使用事务防护





### 应用程序连续性概述

**应用程序连续性尝试**通过在计划外和计划内中断后重播不完整的应用程序请求来屏蔽应用程序的中断。在此上下文中，请求是应用程序的工作单元。

通常，请求对应于单个数据库连接上单个 Web 请求的 DML 语句和其他数据库调用。通常，请求由从连接池签出和签入数据库连接之间进行的调用来划分。

本节包含以下主题：

- [应用程序连续性的好处](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-0B2F6AD0-92ED-431D-BEB6-10DFC3715FCC)
- [应用程序连续性体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-2E973242-2B39-42FC-AA16-CD97B460B6D2)





#### 应用程序连续性的好处

开发人员面临的一个基本问题是如何屏蔽最终用户丢失的数据库会话。

应用程序连续性尝试通过在任何组件中断数据库和客户端之间的会话时还原数据库会话来解决会话丢失问题。还原的数据库会话包括所有状态、游标、变量和最新事务（如果存在）。



##### 应用程序连续性用例

在典型情况下，客户端向数据库提交了请求，该数据库已建立事务和非事务状态。

客户端的状态保持最新状态，可能包含输入的数据、返回的数据以及缓存的数据和变量。但是，应用程序需要在其中运行的数据库会话状态将丢失。

如果客户端请求已启动一个或多个事务，则应用程序将面临以下可能性：

- 如果*已*发出提交，则返回给客户端的提交消息不持久。客户端不知道请求是否已提交，以及它处于非事务处理状态的位置。
- 如果尚未发出提交，或者已发出但未执行，则会回滚正在进行的事务，并且必须使用处于正确状态的会话重新提交。

如果重播成功，则计划内和计划外中断的数据库用户服务不会中断。如果数据库检测到应用程序看到的数据中的更改并可能对其执行操作，则拒绝重播。当超过允许的开始重播时间、应用程序使用受限调用或应用程序已使用该方法显式禁用重播时，不会尝试重播。`disableReplay`

另请参阅：

[Oracle 真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-70D9CDC4-0C86-432B-A04E-1618AF5C35A4)，详细了解应用连续性如何适用于数据库会话



##### 计划内维护的应用程序连续性

计划内中断的应用程序连续性使应用程序能够继续对可以可靠地耗尽或迁移的数据库会话进行操作。

定期维护不会中断应用程序工作。应用程序连续性使活动工作时间从其当前位置排出到当前不受维护影响的新位置。在排出间隔结束时，会话可能会保留在计划维护的数据库实例上。应用程序连续性可以将这些会话故障转移到幸存的站点，并重新提交任何正在进行的事务，而不是强制断开这些会话的连接。

启用应用程序连续性后，数据库可以执行以下操作：

- 在维护期间，不报告传入或现有工作的错误
- 将活动数据库会话重定向到其他功能服务
- 在维护期间和之后根据需要重新平衡数据库会话

使用 SRVCTL 实用程序、全局数据服务控制实用程序 （GDSCTL） 和 Oracle Data Guard Broker 的 and 服务属性控制计划内维护期间的排水行为。该包提供底层基础结构。`drain_timeout``stop_option``DBMS_SERVICE`

另请参阅：

- [Oracle 真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-BD699AEB-9F85-42A8-8687-5A979918938D)，了解更多信息应用连续性
- [Oracle 数据库 PL/SQL 包和类型参考以](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS-GUID-C11449DC-EEDE-4BB8-9D2C-0A45198C1928)了解更多信息`DBMS_SERVICE`
- 适用于 SRVCTL 命令参考的 [Oracle 实际应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD-GUID-C2D37BAB-DA98-49B4-A777-F2B3AA8D2E7A)
- 适用于 GDSCTL 命令参考的 [Oracle 数据库全局数据服务概念和管理指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GSMUG-GUID-77AC1ABB-9401-4ECB-B31D-60C46D405595)





#### 应用程序连续性体系结构

应用程序连续性的关键组件是运行时、重新连接和重播。

阶段如下：

1. 正常运行时间

   在此阶段，应用程序连续性执行以下任务：

   - 识别数据库请求
   - 确定本地调用和数据库调用是否可重放
   - 构建代理对象以启用重播（如有必要）和管理队列
   - 保留原始调用并验证这些调用，直到数据库请求结束或重播被禁用

2. 重新连接

   此阶段由可恢复的错误触发。应用程序连续性执行以下任务：

   - 确保为数据库请求启用重播
   - 管理超时
   - 获取与数据库的新连接，然后验证这是有效的数据库目标
   - 使用事务防护确定最后一个事务是否成功提交（不会重新提交已提交的事务）

3. 重播

   应用程序连续性执行以下任务：

   - 重播队列中保留的呼叫
   - 如果在重播期间出现用户可见的结果更改，则禁用重播
   - 不允许提交，但允许提交最后一次调用（遇到错误）

成功重播后，请求将从故障点继续。

另请参阅：

- "[事务防护概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-47BCD081-8FFF-4D13-A0B1-F531521BC6C3)"
- [Oracle 实际应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-91427DA2-2C5F-46E9-93D4-B5FF6427A69B)，了解有关应用连续性的更多信息
- Oracle Database JDBC [*Developer's Guide 和 Oracle Database*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=JJDBC29059) JDBC [*Java API 参考，了解有关 JDBC*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=JAJDB) 和应用程序连续性的更多信息





### 自治交易概述

自治事务是一个独立的事务，可以从另一个事务调用，这是主**事务**。您可以暂停调用事务，执行 SQL 操作并在自治事务中提交或撤消这些操作，然后恢复调用事务。

自治事务对于必须独立执行的操作非常有用，无论调用事务是提交还是回滚。例如，在股票购买交易中，您希望提交客户数据，而不管整个股票购买是否完成。此外，您希望将错误消息记录到调试表中，即使整个事务回滚也是如此。

自主交易具有以下特征：

- 自治事务不会看到主事务所做的未提交的更改，并且不会与主事务共享锁或资源。
- 提交自治事务时，自治事务中的更改对其他事务可见。因此，用户可以访问更新的信息，而无需等待主事务提交。
- 自治事务可以启动其他自治事务。除了资源限制之外，对可以调用的自治事务级别没有限制。

在PL/SQL中，自治事务在*自治范围内*执行，这是一个标有编译指示的例程。在此上下文中，例程包括顶级匿名 PL/SQL 块和 PL/SQL 子程序和触发器。[**杂注**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0ED5CC20-407D-42A1-AF92-8816691861DE)是指示编译器执行编译选项的指令。杂注指示数据库，此过程在执行时将作为独立于其父事务的新自治事务执行。`AUTONOMOUS_TRANSACTION``AUTONOMOUS_TRANSACTION`

下图显示了控制如何从主例程 （MT） 流向自治例程，然后再流向自治例程。主例程是，自治例程是。自治例程可以在控制返回到主例程之前提交多个事务（AT1 和 AT2）。`proc1``proc2`

图 10-4 事务控制流

![图 10-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt288.gif)
[“图 10-4 事务控制流”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt288.html)

当您进入自治例程的可执行部分时，主例程将挂起。退出自治例程时，主例程将恢复。

在[图 10-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-C0C61571-5175-400D-AEFC-FDBFE4F87188__CHDDGDCJ) 中，内部不仅使它自己的工作永久化，而且在其会话中执行的任何未完成工作都是永久性的。但是，in 仅使事务中执行的工作永久化。因此，事务 AT1 和 AT2 中的语句对 MT 事务没有影响。`COMMIT``proc1``COMMIT``proc2``proc2``COMMIT`

另请参阅：

Oracle [数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00205)和 [Oracle Database PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS00609)，了解如何使用自治事务





### 分布式事务概述

分布式事务是包含一个或多个语句的事务，这些语句使用称为数据库链接的schema对象更新**分布式**数据库的两个或多个不同节点上的数据。

分布式数据库是分布式系统中的一组数据库，对于应用程序来说，这些[**数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DB7296DF-74E0-45E1-9BC2-5052DD543214)可以显示为单个数据源。数据库[**链接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C8C6E07-BE1F-4BC9-93C3-CF6D1D15DC42)描述一个数据库实例如何登录到另一个数据库实例。

与本地数据库上的事务不同，分布式事务更改多个数据库上的数据。因此，分布式事务处理更加复杂，因为数据库必须将事务中的更改作为原子单元进行协调。整个事务必须提交或回滚。Oracle 数据库必须协调网络上的事务控制并保持数据一致性，即使发生网络或系统故障也是如此。

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN031)了解如何管理分布式事务





#### 两阶段提交

**两阶段提交机制**保证参与分布式事务*的所有数据库要么*全部提交，要么全部撤消事务中的语句。该机制还保护由完整性约束、远程过程调用和触发器执行的隐式 DML。

在多个数据库之间的两阶段提交中，一个数据库协调分布式事务。启动节点称为*全局协调器*。协调器询问其他数据库是否准备好提交。如果任何数据库响应 no，则回滚整个事务。如果所有数据库都投赞成票，则协调器将广播一条消息，使每个数据库上的提交永久化。

两阶段提交机制对发出分布式事务的用户是透明的。事实上，用户甚至不需要知道交易是分布式的。表示事务结束的语句会自动触发两阶段提交机制。在数据库应用程序的主体中包含分布式事务不需要编码或复杂的语句语法。`COMMIT`

另请参阅：

- 了解两阶段提交机制的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12222)
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-6CD5C9A7-54B9-4FA2-BA3C-D6B4492B9EE2)





#### 有疑问的交易

当两阶段提交被任何类型的系统或网络故障中断时，就会发生**可疑分布式事务**。

例如，两个数据库向协调数据库报告它们已准备好提交，但协调数据库实例在收到消息后立即失败。准备提交的两个数据库现在在等待结果通知时处于挂起状态。

恢复程序 （） 后台进程会自动解析未决分布式事务的结果。修复故障并重新建立通信后，每个本地 Oracle 数据库的进程会自动在所有涉及的节点上一致地提交或回滚任何不确定的分布式事务。`RECO``RECO`

如果发生长期故障，Oracle 数据库使每个本地管理员能够手动提交或撤消由于故障而存在疑问的任何分布式事务。此选项使本地数据库管理员能够释放由于长期故障而无限期保留的任何锁定资源。

如果必须将数据库恢复到过去的时间，则数据库恢复工具使其他站点的数据库管理员能够将其数据库返回到较早的时间点。此操作可确保全局数据库保持一致。

另请参阅：

- "[恢复器工艺](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-9FF900D1-7DB8-4D41-8D34-8E99AF650CEC)"
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12252)，了解如何管理有疑问的事务

------



脚注图例

脚注1：

对于 Oracle Real Application Clusters （Oracle RAC），逻辑事务 ID 包含数据库实例编号作为前缀。

## 第四部分 Oracle 数据库存储结构

本部分介绍 Oracle 数据库的基本结构体系结构，包括逻辑和物理存储结构。

本部分包含以下章节：

- [物理存储结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-FFA872E1-7F63-4DC5-8A35-F21394AB4595)
- [逻辑存储结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-13CE5EDA-8C66-4CA0-87B5-4069215A368D)

## 11 物理存储结构

Oracle 数据库的物理数据库结构可在操作系统级别查看。

本章包含以下部分：

- [物理存储结构简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-56DFECE5-FB81-494F-9AB8-25F120A1BDDC)
- [数据文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-008A1F08-9C75-4E9F-A70B-41FB942C60B4)
- [控制文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-90EAC9F2-B396-4C59-9821-B03BF7B6BCD0)
- [联机重做日志概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-47557C86-E551-46B5-B28E-28D6C500694E)





### 物理存储结构简介

RDBMS 的一个特征是逻辑数据结构（如表、视图和索引）独立于物理存储结构。

由于物理结构和逻辑结构是分开的，因此您可以管理数据的物理存储，而不会影响对逻辑结构的访问。例如，重命名数据库文件不会重命名存储在其中的表。

Oracle 数据库是一组将 Oracle 数据存储在持久存储中的文件。本节讨论发出语句时生成的数据库文件：`CREATE DATABASE`

- 数据文件和临时文件

  [**数据文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C93C8397-3433-4A72-B9CE-040FE01A7EE8)是由 Oracle 数据库创建的持久存储中的物理文件，包含表和索引等数据结构。临时文件是属于临时表空间的数据[**文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5760E541-E0BB-4246-A423-E725E599A9D0)。数据库以其他程序无法读取的 Oracle 专有格式将数据写入这些文件。

- 控制文件

  控制文件是跟踪数据库物理组件的根[**文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)。

- 联机重做日志文件

  [**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)是一组文件，其中包含对数据所做的更改的记录。

数据库[**实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)是一组管理数据库文件的内存结构。下图显示了实例与其管理的文件之间的关系。

图 11-1 数据库实例和数据库文件

![Description of Figure 11-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt223.gif)
[“图 11-1 数据库实例和数据库文件”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt223.html)

另请参阅：

- 了解如何创建数据库的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN002)
- 适用于语义和语法的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01204)`CREATE DATABASE`





#### 存储数据库文件的机制

有几种机制可用于分配和管理这些文件的存储。

最常见的机制包括：

- Oracle Automatic Storage Management （Oracle ASM）

  Oracle ASM包括一个专为Oracle数据库设计的文件系统。

- 操作系统文件系统

  大多数 Oracle 数据库将文件存储在文件系统中，[**文件系统**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-42D41D4D-C3AC-4D24-AC60-674A872EA211)是在连续磁盘地址空间内构建的数据结构。所有操作系统都有文件管理器，可将磁盘空间分配和释放到文件系统中的文件中。

  文件系统允许将磁盘空间分配给许多文件。每个文件都有一个名称，并显示为 Oracle 数据库等应用程序的连续地址空间。数据库可以创建、读取、写入、调整大小和删除文件。

  文件系统通常构建在由[**称为逻辑卷管理器 （LVM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EA829FC2-5C9F-4455-B85C-78103EF28531) 的软件包构建的[**逻辑卷**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F8C2E256-9271-43EC-B8CC-DD2B114EB270)之上。LVM 使多个物理磁盘的各个部分能够组合成一个连续的地址空间，该地址空间在更高层的软件中显示为一个磁盘。

- 集群文件系统

  集群文件系统是一种分布式文件系统，它是协作为其客户端提供高性能服务的服务器[**集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1D41A705-62A5-4DC1-A1C9-96781B91492A)。在 Oracle RAC 环境中，群集文件系统使共享存储显示为群集环境中许多计算机共享的文件系统。对于群集文件系统，群集中计算机的故障不会使文件系统不可用。但是，在操作系统文件系统中，如果通过 NFS 或其他方式共享文件的计算机出现故障，则文件系统不可用。

数据库采用上述存储机制的组合。例如，数据库可以将控制文件和联机重做日志文件存储在传统文件系统中，将一些用户数据文件存储在原始分区中，其余数据文件存储在 Oracle ASM 中，并将重做日志文件存档到群集文件系统中。

另请参阅：

- "[Oracle Automatic Storage Management （Oracle ASM）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-7FEC2249-4A21-4967-B951-8979D72030AF)"
- Oracle Database [2 Day DBA](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS12062) 了解如何使用 Oracle Enterprise Manager Database Express （EM Express） 查看数据库存储结构
- [Oracle 数据库管理员指南：](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12595)通过查询数据库视图查看数据库存储结构





#### Oracle Automatic Storage Management （Oracle ASM）

Oracle **ASM** 是适用于 Oracle 数据库文件的高性能、易于管理的存储解决方案。Oracle ASM 是一个卷管理器，提供专为数据库使用而设计的文件系统。

与传统文件系统和存储管理器相比，Oracle ASM 具有以下几个优势：

- 简化与存储相关的任务，如创建和布局数据库以及管理磁盘空间
- 跨物理磁盘分布数据以消除热点并跨磁盘提供统一的性能
- 在存储配置更改后自动重新平衡数据

要使用 Oracle ASM，您需要为 Oracle 数据库分配分区磁盘，并具有条带化和镜像首选项。Oracle ASM 管理磁盘空间，在所有可用资源之间分配 I/O 负载以优化性能，同时无需手动调整 I/O 调整。例如，您可以增加数据库的磁盘大小或将数据库的某些部分移动到新设备，而无需关闭数据库。





##### Oracle ASM 存储组件

Oracle Database 可以将数据文件作为 Oracle ASM 文件存储在 Oracle ASM 磁盘组中。在磁盘组中，Oracle ASM 公开数据库文件的文件系统接口。

下图显示了使用 Oracle ASM 的数据库中存储组件之间的关系。该图描述了Oracle ASM文件和数据文件之间的关系，尽管Oracle ASM可以存储其他类型的文件。鱼尾纹符号表示一对多关系。

图 11-2 Oracle ASM 组件

![Description of Figure 11-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt267.gif)
[“图 11-2 Oracle ASM 组件”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt267.html)

[图 11-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-4C41D30C-D48D-4075-935C-7E495BD8A2B0__CHDDFHJC) 说明了以下 Oracle ASM 概念：

- Oracle ASM 磁盘

  Oracle ASM 磁盘是预配到 [**Oracle ASM 磁盘**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-952316A5-5254-42D0-9915-1A05C6808B3D)组的存储设备。Oracle ASM 磁盘可以是物理磁盘或分区、存储阵列中的逻辑单元号 （LUN）、逻辑卷或网络连接文件。

  可以在数据库运行时在磁盘组中添加或删除 Oracle ASM 磁盘。将磁盘添加到磁盘组时，可以分配磁盘名称，或者会自动为磁盘指定 Oracle ASM 磁盘名称。

- Oracle ASM 磁盘组

  Oracle ASM 磁盘组是作为逻辑单元管理的 [**Oracle ASM 磁盘**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-85D5EEA3-5127-4F08-AC1C-A2C660F21D92)的集合。磁盘组中的数据结构是独立的，会占用磁盘组中的一些磁盘空间。

  在磁盘组中，Oracle ASM 公开 Oracle 数据库文件的文件系统接口。存储在磁盘组中的文件内容均匀分布或条带化，以消除热点并在磁盘之间提供统一的性能。

- Oracle ASM 文件

  Oracle ASM 文件是存储在 [**Oracle ASM**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-321EBEC0-62F7-4E6C-B850-F3B4CCC70692) 磁盘组中的文件。Oracle数据库在文件方面与Oracle ASM进行通信。数据库可以将数据文件、控制文件、联机重做日志文件和其他类型的文件存储为 Oracle ASM 文件。当数据库请求时，Oracle ASM 会创建一个 Oracle ASM 文件，并为其分配一个以加号 （） 开头的名称，后跟磁盘组名称，如 中所示。`+``+DISK1`

  注：Oracle ASM 文件可以与其他存储管理选项（如第三方文件系统）共存。此功能简化了将 Oracle ASM 集成到预先存在的环境中的过程。

- Oracle ASM 扩展数据块

  Oracle ASM [**扩展数据块是 Oracle ASM**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-66437E19-5BD1-4596-966B-49585960F7AB) 文件的一部分。Oracle ASM 文件由一个或多个文件扩展数据块组成。每个 Oracle ASM 扩展数据块由特定磁盘上的一个或多个分配单元组成。

  注：Oracle ASM 数据区不同于用于在[**分段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)中存储数据[**的范围**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C56D833A-B3D3-4B85-AAB4-334F7CF3F5E9)。

- Oracle ASM 分配单元

  [**Oracle ASM**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4FB19E48-1098-49B9-AC9D-6B33D1E6E950) 分配单元是磁盘组中的基本分配单元。分配单元是 Oracle ASM 分配的最小连续磁盘空间。一个或多个分配单元构成一个 Oracle ASM 扩展数据块。

另请参阅：

[《Oracle 自动存储管理管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OSTMG036)了解有关 Oracle ASM 的更多信息





##### Oracle ASM 实例

Oracle ASM 实例是管理 Oracle **ASM 磁盘的特殊 Oracle 实例**。

Oracle ASM 和数据库实例都需要对 Oracle ASM 磁盘组中的磁盘进行共享访问。Oracle ASM 实例管理磁盘组的元数据，并向数据库实例提供文件布局信息。数据库实例将 I/O 定向到 Oracle ASM 磁盘，而无需通过 Oracle ASM 实例。

Oracle ASM 实例基于与数据库实例相同的技术构建。例如，Oracle ASM 实例具有与数据库实例类似的[**系统全局区域 （SGA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78C0E867-233A-4857-B9FE-A3852A9B7BDF) 和后台进程。但是，Oracle ASM 实例无法挂载数据库，并且执行的任务比数据库实例少。

[图 11-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-65165176-D495-4B44-AE0D-0686349826EB__CHDBEEGI) 显示了具有一个 Oracle ASM 实例和两个数据库实例的单节点配置，每个实例都与不同的单实例数据库相关联。Oracle ASM 实例管理元数据，并为存储两个数据库数据的 Oracle ASM 文件提供空间分配。一个 Oracle ASM 磁盘组有四个 Oracle ASM 磁盘组，另一个磁盘组有两个磁盘。两个数据库实例都可以访问磁盘组。

图 11-3 Oracle ASM 实例和数据库实例

![Description of Figure 11-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt266.gif)
[“图 11-3 Oracle ASM 实例和数据库实例”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt266.html)

另请参阅：

[《Oracle 自动存储管理管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-BC612D35-5399-4A35-843E-CF76E3D3CDB5)了解有关 Oracle ASM 的更多信息





#### Oracle 托管文件和用户管理文件

**Oracle 托管**文件是一种文件命名策略，使您能够根据数据库对象而不是文件名指定操作。例如，您可以在不指定其数据文件名称的情况下创建表空间。

Oracle 托管文件使管理员无需直接管理数据库中的操作系统文件。Oracle ASM 需要 Oracle Managed Files。

注：此功能不会影响管理文件（如跟踪文件、审核文件和警报日志）的创建或命名。

使用用户管理的文件，您可以直接管理数据库中的操作系统文件。您决定文件结构和命名。例如，在创建表空间时，您可以设置表空间数据文件的名称和路径。

通过初始化参数，您可以为特定类型的文件指定文件系统目录。Oracle 托管文件功能可确保数据库创建唯一的文件，并在不再需要时将其删除。数据库内部使用标准文件系统接口创建和删除存储在[**快速恢复区域**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F4B1B3D-4831-42FA-A53B-E34BA9D1BBB0)中的数据文件和临时文件、控制文件以及与恢复相关的文件。

Oracle 托管文件不会消除现有功能。您可以在手动管理旧文件的同时创建新文件。因此，数据库可以混合使用 Oracle 托管文件和用户管理的文件。

另请参阅：

- "[诊断文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-E329D228-F334-4506-84C1-EC030032C228)"
- Oracle [数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN003)，了解如何使用 Oracle 托管文件





### 数据文件概述

在操作系统级别，Oracle 数据库将数据库数据存储在称为**数据文件**的结构中。每个 Oracle 数据库必须至少有一个数据文件。





#### 数据文件的使用

Oracle 数据库以物理方式将表空间数据存储在数据文件中。

每个未分区**的模式对象**和对象的每个分区都存储在其自己的段中，该**段**仅属于一个表空间。例如，非分区表的数据存储在单个段中，而该段又存储在一个表空间中。表空间和数据文件密切相关，但有重要区别：

- 每个表空间由一个或多个数据文件组成，这些文件符合运行 Oracle 数据库的操作系统。

- 数据库的数据集中存储在位于数据库的每个表空间中的数据文件中。

- 段可以跨越一个或多个数据文件，但不能跨越多个表空间。

- 数据库必须具有 和 表空间。Oracle 数据库会在数据库创建期间自动为表空间分配任何数据库的第一个数据文件。`SYSTEM``SYSAUX``SYSTEM`

  表空间包含[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)，即一组包含数据库元数据的表。通常，数据库还具有撤消表空间和临时[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78A7FBF2-2EB5-4BD6-AECC-D61A5AEF1158)（通常称为 ）。`SYSTEM``TEMP`

下表显示了表空间、数据文件和段之间的关系。

图 11-4 数据文件和表空间

![Description of Figure 11-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt037.gif)
[“图 11-4 数据文件和表空间”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt037.html)

另请参阅：

- "[表空间概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-3502CA78-FBC9-4927-B455-0ECB22E53066)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN012)了解如何管理数据文件





#### 永久和临时数据文件

**永久表空间**包含持久性schema对象。永久表空间中的对象存储在数据文件中。

[**临时表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D49FAC9A-79CC-436C-9656-4A1C94A50A2D)仅在会话期间包含模式对象。本地管理的临时表空间具有临时文件（临时文件），它们是旨在以哈希、排序和其他操作存储数据的特殊文件。临时文件还会在内存中存在空间不足时存储结果集数据。

临时文件类似于永久数据文件，但以下情况除外：

- 永久数据库对象（如表）永远不会存储在临时文件中。

- 临时文件始终设置为模式，这意味着它们永远不会为它们生成重做。媒体恢复无法识别临时文件。`NOLOGGING`

- 不能将临时文件设为只读。

- 不能使用该语句创建临时文件。`ALTER``DATABASE`

- 创建临时文件或调整其大小时，不能始终保证为指定的文件大小分配磁盘空间。在 Linux 和 UNIX 等文件系统上，临时文件被创建为*稀疏文件*。在这种情况下，磁盘块不是在创建文件或调整大小时分配的，而是在首次访问块时分配的。

  注：稀疏文件支持快速临时文件创建和调整大小;但是，稍后访问临时文件时，磁盘空间可能会不足。

- 临时文件信息显示在数据字典视图和动态性能视图中，但不显示在 或 视图中。`DBA_TEMP_FILES``V$TEMPFILE``DBA_DATA_FILES``V$DATAFILE`

另请参阅：

- "[临时表空间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-93848D41-A32B-494F-87A0-A090FF1B2E9A)"
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11504)，了解如何管理临时文件





#### 联机和脱机数据文件

每个数据文件都处于联机（可用）或脱机（不可用）状态。

您可以通过使单个数据文件或临时文件脱机或联机来更改它们的可用性。数据库无法访问脱机数据文件，直到它们联机。

您可能出于多种原因使数据文件脱机，包括执行脱机备份或阻止损坏。如果数据库无法写入数据文件，则数据库会自动使该文件脱机。

与数据文件一样，表空间本身是脱机或联机的。当您在联机表空间中使数据文件脱机时，表空间本身将保持联机状态。您可以通过使表空间本身脱机来使表空间的所有数据文件暂时不可用。

从 Oracle 数据库 12c 开始，您可以使用该语句在数据库打开并访问文件时将联机数据文件从一个物理文件移动到另一个物理文件。可以使用此技术实现以下目标：`ALTER DATABASE MOVE DATAFILE`

- 将表空间从一种存储移动到另一种存储
- 将不常访问的数据文件移动到成本较低的存储
- 将表空间设为只读，并将其数据文件移动到一次写入存储，例如一次写入多次读取 （WORM） 驱动器
- 将数据库移动到 Oracle ASM 中

另请参阅：

- "[联机和脱机表空间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-DBE61726-0DE6-4A85-A49B-9F5587234A87)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11426)了解如何更改数据文件可用性
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13837)了解如何移动在线数据文件
- 要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00802)`ALTER DATABASE . . . MOVE DATAFILE`





#### 数据文件结构

Oracle 数据库通过分配指定的磁盘空间量加上数据文件头的开销，为表空间创建数据文件。运行 Oracle 数据库的操作系统负责在将文件分配给数据库之前清除文件中的旧信息和授权。

数据文件头包含有关数据文件的元数据，例如其大小和[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919) [**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C)。每个标头都包含一个绝对文件编号（唯一标识数据库中的数据文件）和一个相对文件编号（唯一标识表空间中的数据文件）。

当 Oracle 数据库首次创建数据文件时，分配的磁盘空间将被格式化，但不包含任何用户数据。但是，数据库保留空间来保存数据，以供关联表空间的未来段使用。随着表空间中的数据增长，Oracle 数据库使用数据文件中的可用空间为分段分配扩展数据块。

下图说明了数据文件中不同类型的空间。使用盘区（表示它们包含分段数据）或空闲（表示它们可以重用）。随着时间的推移，表空间中对象的更新和删除可能会产生一些空白空间，这些空间单独不够大，无法重用于新数据。这种类型的空白空间称为*碎片自由空间*。

图 11-5 数据文件中的空间

![Description of Figure 11-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt273.gif)
[“图 11-5 数据文件中的空间”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt273.html)

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11459)，了解如何查看数据文件信息





### 控制文件概述

数据库控制文件是一个仅与一个数据库关联的小型二进制**文件**。每个数据库都有一个唯一的控制文件，但允许多个相同的副本。





#### 控制文件的使用

Oracle 数据库使用控制文件来查找数据库文件并管理数据库的状态。

控制文件包含如下信息：

- 数据库名称和数据库唯一标识符 （DBID）
- 数据库创建的时间戳
- 有关数据文件、联机重做日志文件和存档重做日志文件的信息
- 表空间信息
- RMAN 备份

控制文件用于以下用途：

- 它包含有关打开数据库所需的数据文件、联机重做日志文件等的信息。

  控制文件跟踪数据库的结构更改。例如，当管理员添加、重命名或删除数据文件或联机重做日志文件时，数据库将更新控制文件以反映此更改。

- 它包含在数据库未打开时必须可访问的元数据。

  例如，控制文件包含恢复数据库所需的信息，包括检查点。[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)指示重做流中的 [**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C)，需要从中开始实例恢复。检查点 SCN 之前提交的每个更改都保证保存在磁盘上的数据文件中。检查点进程至少每三秒在控制文件中记录有关在线重做日志中的检查点位置的信息。

Oracle 数据库在数据库使用期间连续读取和写入控制文件，并且必须在数据库打开时可供写入。例如，恢复数据库涉及从控制文件中读取数据库中包含的所有数据文件的名称。其他操作（如添加数据文件）会更新存储在控制文件中的信息。

另请参阅：

- "[实例恢复概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-728C6BE1-5687-4DC5-B570-D2042C88F935)"
- "[检查点流程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D3174B3E-BCCA-473F-961E-84A36FD5C372)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN006)了解如何管理控制文件





#### 多个控制文件

Oracle 数据库支持同时打开多个相同的控制文件并将其写入同一数据库。通过在不同磁盘上多路复用控制文件，数据库可以实现冗余，从而避免单点故障。



注：Oracle 建议您维护多个控制文件副本，每个副本位于不同的磁盘上。

如果控制文件变得不可用，则数据库实例在尝试访问损坏的控制文件时将失败。当存在其他当前控制文件副本时，您可以重新装入数据库并打开它而不进行[**媒体恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-938A3E7D-CC65-496C-9DB3-3CFC45AFA8DD)。但是*，如果数据库*的所有控制文件都丢失了，则数据库实例将失败，需要介质恢复。如果由于当前副本不可用而必须使用控制文件的较旧备份，则介质恢复并不简单。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN10064)，了解如何维护多个控制文件
- Oracle 数据库备份和恢复[用户指南，了解如何备份和恢复](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV154)控制文件





#### 控制文件结构

有关数据库的信息存储在控制文件的不同部分中。每个部分都是有关数据库某个方面的一组记录。

例如，控制文件中的一个部分跟踪数据文件并包含一组记录，每个数据文件一个记录。每个部分存储在多个逻辑控制文件块中。记录可以跨越部分中的块。

控制文件包含以下类型的记录：

- 循环重用记录

  [**循环重用记录**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BC76F728-0DBE-4E79-8145-E70F2880FBAA)包含非关键信息，如果需要，这些信息可以覆盖。当所有可用的记录槽都已满时，数据库将展开控制文件以便为新记录腾出空间，或者覆盖最旧的记录。示例包括有关存档重做日志文件和 RMAN 备份的记录。

- 非循环重用记录

  [**非循环重用记录**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ADD6541A-2F2A-4DCE-A881-9B7F7A0499ED)包含不经常更改且无法覆盖的关键信息。信息的示例包括表空间、数据文件、联机重做日志文件和重做线程。Oracle 数据库从不重用这些记录，除非从表空间中删除相应的对象。

您可以查询动态性能视图（也称为视图）以查看存储在控制文件中的信息。例如，可以查询以获取数据库名称和 DBID。但是，只有数据库可以修改控制文件中的信息。`V$``V$DATABASE`

读取和写入控制文件块不同于读取和写入数据块。对于控制文件，Oracle 数据库直接从磁盘读取和写入程序全局区域 （PGA）。每个进程为控制文件块分配一定量的 PGA 内存。

另请参阅：

- "[动态性能视图概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-4093F62A-CA16-4054-B441-279D15CE03B3)"
- 了解视图的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30044)`V$CONTROLFILE_RECORD_SECTION`
- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10020)`CONTROL_FILE_RECORD_KEEP_TIME`





### 联机重做日志概述

恢复的最关键结构是**联机重做日志**，它由两个或多个预分配文件组成，这些文件在发生更改时存储对数据库的更改。联机重做日志记录对数据文件的更改。





#### 使用在线重做日志

数据库维护联机重做日志文件以防止数据丢失。具体而言，在实例发生故障后，在线重做日志文件使 Oracle 数据库能够恢复尚未写入数据文件的已提交数据。

服务器进程将每个事务同步写入重做日志缓冲区，然后 LGWR 进程将其写入联机[**重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BADF3CFF-08C6-42E8-A05E-DEB83502572A)。联机重做日志的内容包括未提交的事务以及schema和对象管理语句。

当数据库对撤消段进行更改时，数据库也会将这些更改写入联机重做日志。因此，联机重做日志始终包含永久对象的撤消数据。您可以将数据库配置为将临时对象的所有撤消数据存储在临时[**撤消段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E374AF09-977A-43CB-B3A2-39EC9818BD0B)中，从而节省空间并提高性能，或者允许数据库在联机重做日志中存储永久和临时撤消数据。

Oracle 数据库仅使用联机重做日志进行恢复。但是，管理员可以通过 Oracle LogMiner 实用程序中的 SQL 接口查询联机重做日志文件（请参阅“[Oracle LogMiner](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D2E36A56-0571-4857-8D41-BBCC833403E5)”）。重做日志文件是有关数据库活动的历史信息的有用来源。

另请参阅：

- "[实例恢复概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-728C6BE1-5687-4DC5-B570-D2042C88F935)"
- "[临时撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-311EBE7D-F01F-4E52-9B8B-DBF84116207D)"
- “[流程schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-85D9852E-5BF1-4AC0-9E5A-49F0570DBD7A)”了解 Oracle 流程
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13740)了解临时撤消段
- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10326)`TEMP_UNDO_ENABLED`





#### Oracle 数据库如何写入联机重做日志

数据库实例的联机重做日志称为**重做线程**。

在单实例配置中，只有一个实例访问数据库，因此只存在一个重做线程。但是，在 Oracle Real Application Clusters （Oracle RAC） 配置中，多个实例同时访问一个数据库，每个实例都有自己的重做线程。每个实例的单独重做线程可避免争用一组联机重做日志文件。

联机重做日志由两个或多个联机重做日志文件组成。Oracle 数据库至少需要两个文件，以确保一个文件始终可供写入，以防另一个文件正在清除或存档过程中。

另请参阅：

Oracle [真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD704)，了解 Oracle RAC 中的在线重做日志组





##### 在线重做日志切换

Oracle 数据库一次仅使用一个联机重做日志文件来存储从重做日志缓冲区写入的记录。

[**日志编写器进程 （LGWR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E96BC851-0B78-4250-8EAB-26EBDF4FE5A6) 进程主动写入的联机重做日志文件称为[**当前联机重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B9F8AD18-CFA3-44C3-A945-5649EC90911C)。

当数据库停止写入一个联机重做日志文件并开始写入另一个日志文件时，将发生[**日志切换**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1A479613-DF95-469C-9C3B-D7DBA54F77F7)。通常，当当前联机重做日志文件已满且必须继续写入时，会发生切换。但是，您可以将日志切换配置为定期进行，而不管当前联机重做日志文件是否已填满，并手动强制日志切换。

日志编写器循环写入联机重做日志文件。当日志编写器填充最后一个可用的联机重做日志文件时，进程将写入第一个日志文件，重新启动循环。[图 11-6](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-26BC209A-999D-4606-84F4-D408A9809232__I1006202) 说明了重做日志的循环写入。

图 11-6 重用联机重做日志文件

![Description of Figure 11-6 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin054.gif)
[“图 11-6 联机重做日志文件的重用”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin054.html)

[图 11-6](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-26BC209A-999D-4606-84F4-D408A9809232__I1006202) 中的数字显示了 LGWR 写入每个联机重做日志文件的顺序。当日志切换并且日志编写器开始写入每个文件时，数据库会为每个文件分配一个新的[**日志序列号**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BD3B74B9-51B3-4E09-AAAD-76D0EA6FDE25)。当数据库重用联机重做日志文件时，此文件将接收下一个可用的日志序列号。

填充的联机重做日志文件可供重用，具体取决于存档模式：

- 如果禁用了存档（这意味着数据库处于模式），则在[**数据库编写器 （DBW**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C27AAA54-E60B-49BC-AB04-7B3848EBAFD6)） 将其中记录的更改检查点（写入）到磁盘后，可以使用填充的联机重做日志文件。`NOARCHIVELOG`
- 如果启用了归档，这意味着数据库处于 [**ARCHIVELOG 模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1AA9F015-FD15-4A08-BE06-04F0A6797782)，则在将更改写入数据文件*并*归档文件后，日志编写器可以使用填充的联机重做日志文件。

在某些情况下，可能会阻止日志编写器重用现有的联机重做日志文件。实例恢复需要活动的联机重做日志文件，而实例恢复不需要[**非活动的联机重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A47F1A1B-4332-4B13-BD18-AB3EB62A0EE5)。此外，联机重做日志文件可能正在清除过程中。

另请参阅：

- "[后台进程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D8AE1B78-69D5-4F0F-8BE3-C91AA2514F2D)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN007)了解如何管理在线重做日志





##### 联机重做日志文件的多个副本

Oracle 数据库可以在不同的位置自动维护两个或多个相同的在线重做日志副本。

联机重做[**日志组由联机重做**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E9B9AD20-B224-4631-8654-D91DEBEAEB0A)日志文件及其冗余副本组成。每个相同的副本都是联机重做日志组的成员。每个组由一个数字定义，例如组 1、组 2 等。

维护联机重做日志组的多个成员可防止重做日志丢失。理想情况下，成员的位置应位于单独的磁盘上，以便一个磁盘的故障不会导致整个联机重做日志丢失。

在[图 11-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-A06B2CEF-E7A8-47B5-A0F8-E3DBE102BCD1__I1006259) 中，和是组 1 的相同成员，而 和 是组 2 的相同成员。组中的每个成员的大小必须相同。LGWR 并发写入组 1（成员和），然后同时写入组 2（成员和），然后写入组 1，依此类推。LGWR 从不同时向不同组的成员写入。`A_LOG1``B_LOG1``A_LOG2``B_LOG2``A_LOG1``B_LOG1``A_LOG2``B_LOG2`

图 11-7 联机重做日志文件的多个副本

![Description of Figure 11-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt270.gif)
[“图 11-7 联机重做日志文件的多个副本”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt270.html)

注意：Oracle 建议您多路复用联机重做日志。如果需要恢复，日志文件的丢失可能是灾难性的。多路复用联机重做日志时，数据库必须增加其执行的 I/O 量。根据您的系统，此额外的 I/O 可能会影响整体数据库性能。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11309)，了解如何维护联机重做日志文件的多个副本
- Oracle Data Guard [概念和管理，了解在 Data Guard](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SBYDB00400) 配置的成员之间自动传输重做数据





##### 存档的重做日志文件

存档的重做日志文件是联机**重做**日志组的已填充成员的副本。该文件不被视为数据库的一部分，而是由数据库创建并写入用户指定位置的联机重做日志文件的脱机副本。

存档的重做日志文件是备份和恢复策略的关键部分。您可以使用存档的重做日志文件执行以下操作：

- 恢复数据库备份
- 更新[**备用数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-728D4956-0F56-4D39-A63A-2E3FF5CCEDE4)
- 使用 Oracle LogMiner 实用程序获取有关数据库历史记录的信息

生成存档重做日志文件的操作称为[**存档**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-193831AB-AC65-4926-A9CC-76F05CA25BFF)。此操作可以是自动的，也可以是手动的。仅当数据库处于模式时，才有可能。`ARCHIVELOG`

存档的重做日志文件包括联机重做日志组的相同成员的重做条目和日志序列号。在“[联机重做日志文件的多个副本](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-A06B2CEF-E7A8-47B5-A0F8-E3DBE102BCD1)”中，文件 和 是组 1 的相同成员。如果数据库处于模式，并且启用了自动存档，则[**存档程序进程 （ARCn）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EB5F3C2A-5046-4301-96CC-ADD66DD13167) 将存档其中一个文件。如果已损坏，则进程可以存档。存档的重做日志包含从启用存档时开始存在的每个重做日志组的副本。`A_LOG1``B_LOG1``ARCHIVELOG``A_LOG1``B_LOG1`

另请参阅：

- "[Oracle日志矿工](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D2E36A56-0571-4857-8D41-BBCC833403E5)"
- "[数据文件恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-7F5703F9-CAE5-4736-895B-B45A51974A7C)"
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN008)，了解如何管理存档的重做日志
- [Oracle 数据卫士概念和管理](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SBYDB4752)，了解如何配置备用重做日志存档





#### 在线重做日志的结构

联机重做日志文件包含重做记录。

重做记录由一组变化向量组成，每个向量描述对[**数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)的更改。例如，对表中工资的更新会生成一条重做记录，用于描述对表的数据段块、撤消段数据块和撤消[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2CDB4221-D152-4C89-BB2B-4A7FC6DA340B)的[**事务表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BFF71130-2760-4C64-8829-7772C803FBE7)的更改。`employees`

重做记录具有更改的所有相关元数据，包括以下内容：

- 更改的 SCN 和时间戳
- 生成更改的事务的事务 ID
- 提交事务（如果已提交）时的 SCN 和时间戳
- 进行更改的操作类型
- 修改后的数据细分受众群的名称和类型

另请参阅：

"[数据块概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-1AED5140-E820-436C-BEB7-2A985524911E)"

## 12 逻辑存储结构

本章介绍逻辑存储结构的性质和关系。这些结构由 Oracle 数据库创建和识别，操作系统不知道这些结构。

本章包含以下部分：

- [逻辑存储结构简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-52FE1A8C-74EA-4B81-B1AC-69FD34252659)
- [数据块概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-1AED5140-E820-436C-BEB7-2A985524911E)
- [盘区概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-E3D8E030-A056-40AC-9B7E-8C957E28EE75)
- [细分市场概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-7DA83E64-9FF1-45A7-A9AC-D4997DDE0866)
- [表空间概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-3502CA78-FBC9-4927-B455-0ECB22E53066)





### 逻辑存储结构简介

Oracle 数据库为数据库中的所有数据分配逻辑空间。

数据库空间分配的逻辑单元是数据块、扩展数据块、段和表空间。在物理级别，数据存储在磁盘上的数据文件中。数据文件中的数据存储在操作系统块中。

下图是物理存储和逻辑存储的实体关系图。鱼尾纹符号表示一对多关系。

图 12-1 逻辑和物理存储

![Description of Figure 12-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt227.gif)
[“图 12-1 逻辑和物理存储”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt227.html)

另请参阅：

"[物理存储结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-FFA872E1-7F63-4DC5-8A35-F21394AB4595)"





#### 逻辑存储层次结构

线段包含一个或多个盘区，每个盘区包含多个数据块。

下图显示了表空间内数据块、扩展数据块和段之间的关系。在此示例中，一个段具有存储在不同数据文件中的两个扩展数据块。

图 12-2 表空间中的段、扩展数据块和数据块

![Description of Figure 12-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt027.gif)
[“Figure 12-2 表空间中的段、扩展数据块和数据块”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt027.html)

从最低粒度级别到最高粒度级别，Oracle 数据库可存储数据

- [**数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)是 Oracle 数据库中数据存储的最小逻辑单元。

  一个逻辑数据块对应于特定数量的物理磁盘空间字节，例如 2 KB。数据块是 Oracle 数据库可以使用或分配的最小存储单元。

- [**范围**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C56D833A-B3D3-4B85-AAB4-334F7CF3F5E9)是一组逻辑上连续的数据块，分配给存储特定类型的信息

  在上图中，24 KB 扩展数据块具有 12 个数据块，而 72 KB 扩展数据块具有 36 个数据块。

- [**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)是为特定数据库对象（如[**表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DA8F7E11-B6AF-4ED3-B2A9-B5741E9AE2D4)）分配的一组扩展数据块。

  例如，表的数据存储在其自己的[**数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2CDB4221-D152-4C89-BB2B-4A7FC6DA340B)段中，而 的每个索引存储在其自己的[**索引段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BDF74E0F-51FF-44C5-9A3B-26B8ACBB683C)中。每个使用存储的数据库对象都由一个段组成。`employees``employees`

- [**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA66891C-71B2-4D55-8F64-0E427AE24E88)是包含一个或多个段的数据库存储单元。

  每个段属于一个且仅属于一个表空间。因此，段的所有扩展数据块都存储在同一个表空间中。在表空间中，段可以包含来自多个数据文件的扩展数据块，如上图所示。例如，线段的一个盘区可能存储在 中，而另一个盘区存储在 中。单个扩展数据块永远不能跨越数据文件。`users01.dbf``users02.dbf`

另请参阅：

"[数据文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-008A1F08-9C75-4E9F-A70B-41FB942C60B4)"





#### 逻辑空间管理

Oracle 数据库必须使用逻辑空间管理来跟踪和分配表空间中的扩展数据块。

当数据库对象需要扩展数据块时，数据库必须具有查找和提供扩展数据块的方法。同样，当对象不再需要扩展数据块时，数据库必须具有使可用扩展数据块的方法。

Oracle 数据库根据您创建的类型管理表空间中的空间。您可以创建以下任一类型的表空间：

- 本地管理的表空间（默认）

  数据库使用表空间本身中的位图来管理扩展数据块。因此，本地管理的表空间为位图留出了一部分表空间。在表空间中，数据库可以使用自动段空间管理 （ASSM） 或手动段空间管理 （MSSM） 来管理段。

- 字典管理的表空间

  数据库使用[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)来管理盘区。

[图 12-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5E81D8A9-2D4C-4991-9D64-B23DD476E22F__BABDJBGD) 显示了表空间中逻辑空间管理的替代方法。

图 12-3 逻辑空间管理

![Description of Figure 12-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt268.gif)
[“图 12-3 逻辑空间管理”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt268.html)

另请参阅：

"[数据字典概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-9B9ABE1C-A1E3-464F-8936-978250DC3E1F)"





##### 本地管理的表空间

本地管理的表空间在数据文件头中维护位图，以跟踪数据文件正文中的可用空间和已用空间。

每个位对应于一组块。分配或释放空间时，Oracle 数据库会更改位图值以反映块的新状态。

下图是位图管理的存储的概念表示形式。标头中的 A 表示已用空间，而 A 表示可用空间。`1``0`

图 12-4 位图管理的存储

![Description of Figure 12-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt332.gif)
[“图 12-4 位图管理的存储”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt332.html)

本地管理的表空间具有以下优点：

- 避免使用数据字典管理盘区

  如果消耗或释放扩展数据块中的空间会导致另一个操作消耗或释放数据字典表或撤消段中的空间，则递归操作可能会在字典管理的表空间中发生。

- 自动跟踪相邻的可用空间

  这样，数据库就无需合并自由盘区。

- 自动确定本地管理的盘区的大小

  或者，所有扩展数据块在本地管理的表空间中可以具有相同的大小，并覆盖对象存储选项。

注：Oracle 强烈建议将本地管理的表空间与自动段空间管理结合使用。

段空间管理是从包含段的表空间继承的属性。在本地管理的表空间中，数据库可以自动或手动管理段。例如，表空间中的段可以自动管理，而表空间中的段可以手动管理。`users``tools`





###### 自动分段空间管理

**自动段空间管理 （ASSM）** 方法使用位图来管理表空间中的空间。

位图具有以下优点：

- 简化管理

  ASSM 避免了手动确定许多存储参数的正确设置的需要。只有一个关键的 SQL 参数控制空间分配：。此参数指定要在块中保留的空间百分比以供将来更新（请参阅“[数据块中的可用空间百分比](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-ECB2069B-A7DC-4D3D-A345-D3216CAEDB6E)”）。`PCTFREE`

- 提高并发性

  多个事务可以搜索单独的可用数据块列表，从而减少争用和等待。对于许多标准工作负载，使用 ASSM 的应用程序性能优于使用 MSSM 的经过良好调整的应用程序的性能。

- 空间与 Oracle 实际应用集群 （Oracle RAC） 环境中实例的动态亲和力

ASSM 效率更高，是永久本地管理的表空间的默认值。

注意：本章假定在逻辑存储空间的所有讨论中使用 ASSM。





###### 手动分段空间管理

传统的**手动段空间管理 （MSSM）** 方法使用称为可用列表的链表来管理段中的**可用**空间。

对于具有可用空间的数据库对象，空闲列表会跟踪[**高水位标记 （HWM） （HWM） 下的块，高水位标记 （HWM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3F5ACB2-94C8-483F-B427-1981836D0609) 是已使用和尚未使用的段空间之间的分界线。使用块时，数据库会根据需要将块放在可用列表上或从空闲列表中删除块。

除了 之外，MSSM 还要求您使用 SQL 参数（如 、 和 ）控制空间分配。 设置当前使用的块中必须存在的可用空间百分比，以便数据库将其放入可用列表。例如，如果在语句中设置为 ，则在使用不到 40% 的块空间之前，无法将行插入到段的块中。`PCTFREE``PCTUSED``FREELISTS``FREELIST GROUPS``PCTUSED``PCTUSED``40``CREATE TABLE`

例如，假设您在表中插入一行。数据库检查表的可用列表以查找第一个可用块。如果该行不适合该块，并且该块中的已用空间大于或等于 ，则数据库将从列表中删除该块并搜索另一个块。如果从块中删除行，则数据库将检查块中的已用空间现在是否小于 。如果是这样，则数据库将块放在空闲列表的开头。`PCTUSED``PCTUSED`

一个对象可能有多个空闲列表。这样，对表执行 DML 的多个会话可以使用不同的列表，这可以减少争用。每个数据库会话在其会话期间仅使用一个空闲列表。

[如图 12-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-71C6DECB-E7D0-4511-9BA1-127AAE8851EF__BABJABGH) 所示，您还可以创建具有一个或多个空闲列表组的对象，这些组是*空闲列表*的集合。每个组都有一个*主自由*列表，用于管理组中的各个*进程空闲列表*。免费列表（尤其是免费列表组）的空间开销可能很大。

图 12-5 自由列表组

![Description of Figure 12-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt320.gif)
[“图 12-5 自由列表组”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt320.html)

手动管理区段空间可能很复杂。您必须调整 和 以减少行迁移并避免浪费空间。例如，如果段中每个使用的块都是半满的，如果是，则数据库不允许插入到这些块中的任何一个中。由于微调空间分配参数的难度，Oracle 强烈建议使用 ASSM。在 ASSM 中，确定是否可以将新行插入到块中，但它不使用空闲列表并忽略 。`PCTFREE``PCTUSED``PCTUSED``40``PCTFREE``PCTUSED`

另请参阅：

- "[链接和迁移的行](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-49D4E586-57BF-4310-9EE9-2DD54108E651)"
- 了解本地管理的表空间的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11360)
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN10065)了解有关自动分段空间管理的更多信息
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30011)，了解存储参数，例如`PCTFREE``PCTUSED`





##### 字典管理的表空间

字典管理的表空间使用数据字典来管理其扩展数据块。

每当分配或释放数据块以供重用时，Oracle 数据库都会更新数据字典中的表。例如，当表需要扩展数据块时，数据库将查询数据字典表并搜索空闲扩展数据块。如果数据库找到空间，则修改一个数据字典表，并在另一个数据字典表中插入一行。通过这种方式，数据库通过修改和移动数据来管理空间。

数据库在后台执行以获取数据库对象空间的 SQL 是[**递归 SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-31B21CCC-5324-4B86-A58A-2BC7DF57AB33)。频繁使用递归 SQL 可能会对性能产生负面影响，因为必须序列化对数据字典的更新。本地管理的表空间（缺省值）可避免此性能问题。

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11392)，了解如何将表空间从字典托管迁移到本地托管





### 数据块概述

Oracle 数据库以称为**数据**块（也称为 *Oracle 块*或*页面*）的单元管理数据库数据文件中的逻辑存储空间。数据块是数据库 I/O 的最小单位。





#### 数据块和操作系统块

在物理级别，数据库数据存储在由操作系统块组成的磁盘文件中。

操作系统[**块是操作系统**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D3D87FDB-24AD-4B10-A61E-1E6F40FCE562)可以读取或写入的最小数据单位。相反，Oracle 块是一种逻辑存储结构，其大小和结构对操作系统来说是未知的。

下图显示操作系统块的大小可能与数据块不同。数据库请求多个数据块中的数据，而不是操作系统块。

图 12-6 数据块和操作系统块

![Description of Figure 12-6 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt293.gif)
[“图 12-6 数据块和操作系统块”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt293.html)

当数据库请求数据块时，操作系统会将此操作转换为对永久存储中的数据的请求。数据块与操作系统块的逻辑分离具有以下含义：

- 应用程序不需要确定磁盘上数据的物理地址。
- 数据库数据可以在多个物理磁盘上进行条带化或镜像。





##### 数据库块大小

每个数据库都有一个数据库块大小。

初始化参数设置创建数据库时的数据块大小。大小是为 和 表空间设置的，并且是所有其他表空间的默认值。除非通过重新创建数据库，否则无法更改数据库块大小。`DB_BLOCK_SIZE``SYSTEM``SYSAUX`

如果未设置，则默认数据块大小特定于操作系统。数据库的标准数据块大小为 4 KB 或 8 KB。如果数据块和操作系统块的大小不同，则数据块大小必须是操作系统块大小的倍数。`DB_BLOCK_SIZE`

另请参阅：

- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10031)`DB_BLOCK_SIZE`
- [Oracle 数据库管理员](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11106)指南和 [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA94404)，了解如何选择块大小





##### 表空间块大小

您可以创建块大小与设置不同的单个表空间。`DB_BLOCK_SIZE`

将[**可传输表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3AC6538-2722-4916-BD9F-EDAB8318CCCD)移动到其他平台时，非标准块大小可能很有用。

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11107)，了解如何为表空间指定非标准块大小





#### 数据块格式

每个数据块都有一个格式或内部结构，使数据库能够跟踪块中的数据和可用空间。无论数据块包含表、索引还是表集群数据，此格式都是相似的。

下图显示了未压缩数据块的格式。

图 12-7 数据块格式

![Description of Figure 12-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt028.gif)
[“图 12-7 数据块格式”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt028.html)

另请参阅：

“数据块压缩”以了解[压缩块](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-B248DC2A-3F65-42CF-ACA5-0B096CFCFC46)





##### 数据块开销

Oracle 数据库使用块**开销**来管理块本身。块开销不可用于存储用户数据。

如“数据块[格式](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-754ECC03-DD58-4B49-95D1-B98A23B508B2)”所示，块开销包括以下部分：

- 块头

  此部分包含有关块的一般信息，包括磁盘地址和段类型。对于交易管理的区块，[**区块头**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78394D5D-A1F6-4978-8F13-028185F514B5)包含活动和历史交易信息。

  每个更新区块的交易都需要一个[**交易条目**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B7820ED2-E8D7-40B3-AAAE-2B8F935C220C)。Oracle 数据库最初在块头中为事务条目保留空间。在分配给支持事务更改的段的数据块中，当标头空间耗尽时，可用空间还可以保存事务条目。事务条目所需的空间取决于操作系统。但是，大多数操作系统中的事务条目大约需要 23 个字节。

- 表目录

  对于[**堆组织的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-861D8FCE-B86C-46B3-AA01-35066D24F4CF)表，此目录包含有关其行存储在此块中的表的元数据。在表集群中，多个表可以在同一块中存储行。

- 行目录

  对于堆组织的表，此目录描述块的数据部分中行的位置。数据库可以在块底部的任何位置放置一行。行地址记录在行目录向量的一个插槽中。

  rowid 指向特定的文件、块和行号。例如，在 rowid 中，final 表示行号。行号是行目录中条目的索引。行目录条目包含指向数据块上行位置的指针。如果数据库在块内移动行，则数据库将更新行目录条目以修改指针。行列保持不变。`AAAPecAAFAAAABSAAA``AAA`

  数据库在行目录中分配空间后，删除行后数据库不会回收此空间。因此，当前为空但以前最多有 50 行的块将继续为行目录分配 100 个字节。仅当会话在块中插入新行时，数据库才会重用此空间。

块开销的某些部分的大小是固定的，但总大小是可变的。平均而言，块开销总计为 84 到 107 字节。





##### 行格式

块的行数据部分包含实际数据，例如表行或索引键条目。正如每个数据块都有内部格式一样，每一行都有一种行格式，使数据库能够跟踪行中的数据。

Oracle 数据库将行存储为可变长度记录。行包含在一个或多个部分中。每个部分称为[**一个行段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4C16E45D-79AF-40D5-ACE2-CE2B301CA97B)。每个行段都有一个行标题和列数据。

下图显示了行的格式。

图 12-8 行段的格式

![Description of Figure 12-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt043.gif)
[“图 12-8 行段的格式”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt043.html)





###### 行标题

Oracle 数据库使用行标题来管理存储在块中的行段。

行标题包含如下信息：

- 行段中的列

- 位于其他数据块中的行片段

  如果可以将整行插入到单个数据块中，则 Oracle 数据库会将该行存储为一行段。但是，如果无法将所有行数据插入到单个块中，或者更新导致现有行超出其块，则数据库会将该行存储在多个行段中。数据块通常每行只包含一个行段。

- 表集群的集群键

一个块中完全包含的行至少具有 3 个字节的行标头。

另请参阅：

- "[链接和迁移的行](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-49D4E586-57BF-4310-9EE9-2DD54108E651)"
- "[表集群概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-04AADD81-E5C2-498B-B857-DF2A37DD3520)"





###### 列数据

在行标题之后，列数据部分将实际数据存储在行中。行段通常按语句中列出的顺序存储列，但不能保证此顺序。例如，类型的列是最后创建的。`CREATE TABLE``LONG`

如图“[行格式](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-D993A749-93D0-448C-BDC8-330D805AC481)”中的图所示，对于行段中的每一列，Oracle数据库分别存储列长和数据。所需的空间取决于数据类型。如果列的数据类型是可变长度的，则保存值所需的空间可能会随着数据的更新而增大和缩小。

每行在数据块标头的行目录中都有一个插槽。插槽指向行的开头。

另请参阅：

“表存储”和“[索引](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-832C2B66-912B-4E1C-B4B5-AA40F49E4970)[存储](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-85BE900A-0047-4B7C-A992-F1E35B640CA3)”





###### 行格式

Oracle 数据库使用 **rowid** 来唯一标识行。在内部，rowid 是一个结构，用于保存数据库访问行所需的信息。rowid 不是物理存储在数据库中，而是从存储数据的文件和块推断出来的。

扩展的 rowid 包括数据对象编号。此 rowid 类型对每行的物理地址使用基数 64 编码。编码字符为 、、 和 。`A-Z``a-z``0-9``+``/`

例 12-1 ROWID 伪列

下面的示例查询[**伪列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-175D4923-5C7E-4FF0-A69B-C4D8F3D93A3D)以显示雇员 100 的表中行的扩展 rowid：`ROWID``employees`

```
CopySQL> SELECT ROWID FROM employees WHERE employee_id = 100;
 
ROWID
------------------
AAAPecAAFAAAABSAAA
```

下图说明了扩展 rowid 的格式。

图 12-9 ROWID 格式

![Description of Figure 12-9 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt249.gif)
[“图 12-9 ROWID 格式”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt249.html)

扩展的 rowid 以四件式格式显示，格式分为以下组件：`OOOOOOFFFBBBBBBRRR`

- `OOOOOO`

  数据对象编号标识段（示例查询中的数据对象）。为每个数据库段分配一个数据对象编号。同一段中的schema对象（如[**表集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)）具有相同的数据对象编号。`AAAPec`

- `FFF`

  表空间相对数据文件编号标识包含行的数据文件（示例查询中的文件）。`AAF`

- `BBBBBB`

  数据块编号标识包含行的块（示例查询中的块）。块号相对于其数据文件，而不是相对于其表空间。因此，具有相同块号的两行可以驻留在同一表空间的不同数据文件中。`AAAABS`

- `RRR`

  行号标识块中的行（示例查询中的行）。`AAA`

将 rowid 分配给行段后，rowid 可以在特殊情况下更改。例如，如果启用了行移动，则 rowid 可能会因为分区键更新、闪回表操作、收缩表操作等而更改。如果禁用了行移动，则在使用 Oracle 数据库实用程序导出和导入行时，rowid 可能会更改。

注：在内部，数据库执行行移动，就像对行进行物理删除并重新插入一样。但是，行移动被视为更新，这对触发器有影响。

另请参阅：

- "[罗维德数据类型](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-0258C4C2-2BF2-445F-B1E1-F282A57A6859)"
- 了解 rowid 的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF50998)





#### 数据块压缩

数据库可以使用**表压缩**来消除数据块中的重复值。本节介绍使用压缩的数据块的格式。

使用基本表和高级行压缩的数据块的格式与未压缩块基本相同。不同之处在于块开头的符号表存储行和列的重复值。数据库将这些值的出现替换为对符号表的简短引用。

例 12-2 压缩数据块的格式

假设以下行存储在七列表的数据块中：`sales`

```
Copy2190,13770,25-NOV-00,S,9999,23,161
2225,15720,28-NOV-00,S,9999,25,1450
34005,120760,29-NOV-00,P,9999,44,2376
9425,4750,29-NOV-00,I,9999,11,979
1675,46750,29-NOV-00,S,9999,19,1121
```

当对此表应用基本表或高级行压缩时，数据库将用符号引用替换重复值。以下压缩的概念表示显示了符号替换和替换：`*``29-NOV-00``%``9999`

```
Copy2190,13770,25-NOV-00,S,%,23,161
2225,15720,28-NOV-00,S,%,25,1450
34005,120760,*,P,%,44,2376
9425,4750,*,I,%,11,979
1675,46750,*,S,%,19,1121
```

表 [12-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-B248DC2A-3F65-42CF-ACA5-0B096CFCFC46__BABCFDJG) 从概念上表示将符号映射到值的符号表。

表 12-1 符号表

| 象征 | 价值         | 列   | 行      |
| :--- | :----------- | :--- | :------ |
| *    | 29-十一月-00 | 3    | 958-960 |
| %    | 9999         | 5    | 956-960 |

另请参阅：

"[表压缩](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-54EE5325-0894-4869-B3AD-8912D9B4A329)"





#### 数据块中的空间管理

当数据库自下而上填充数据块时，行数据和块头之间的可用空间量会减少。

数据块中的可用空间也会在更新期间缩小，例如将尾随 null 值更改为非 null 值时。数据库管理数据块中的可用空间，以优化性能并避免浪费空间。

注：本节假定使用自动段空间管理。





##### 数据块中的可用空间百分比

SQL 参数设置保留为现有行更新可用空间的数据块的最小百分比。 对于防止行迁移和避免浪费空间非常重要。`PCTFREE``PCTFREE`

例如，假设您创建一个只需要偶尔更新的表，其中大多数更新不会增加现有数据的大小。您可以在语句中指定参数，如下所示：`PCTFREE``CREATE``TABLE`

```
CopyCREATE TABLE test_table (n NUMBER) PCTFREE 20;
```

[图 12-10](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-ECB2069B-A7DC-4D3D-A345-D3216CAEDB6E__BABHHIDA) 显示了 的设置如何影响空间管理。随着时间的推移，数据库将行添加到块中，导致行数据向块头向上增长，而块头本身又向下向行数据扩展。该设置可确保*至少* 20% 的数据块可用。例如，数据库阻止语句填充块，以便行数据和标头总共占用总块空间的 90%，只剩下 10% 的可用空间。`PCTFREE``20``PCTFREE``INSERT`

图 12-10 免费

![Description of Figure 12-10 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt029.gif)
[“图12-10 PCT免费”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt029.html)

注意：此讨论不适用于不使用 `PCTFREE` 存储参数或空闲列表的 [**LOB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A85748CE-C4D4-43ED-BD49-29AFC4AD3A02) 数据类型。

另请参阅：

- "[LOB 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-E918382E-0E0A-444C-ABD3-BCC6EFC0AB38)"
- 有关参数语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF52292)`PCTFREE`





##### 优化数据块中的可用空间

虽然可用空间的百分比不能*小于* ，但可用空间量可以*更大*。例如，设置为 20% 可防止可用空间总量下降到块的 5%，但允许 50% 的块可用。`PCTFREE``PCTFREE`





###### 通过增加可用空间进行优化

某些 DML 语句可以增加数据块中的可用空间。

以下语句可以增加空间：

- `DELETE`语句

- `UPDATE`将现有值更新为较小值或增加现有值并强制迁移行的语句

- `INSERT`使用高级行压缩的表上的语句

  如果语句用数据填充块，则数据库调用块压缩，这可能会导致块具有更多的可用空间。`INSERT`

在以下条件下，释放的空间可用于语句：`INSERT`

- 如果语句位于同一事务中，并且位于释放空间的语句之后，则该语句可以使用该空间。`INSERT`
- 如果该语句与释放空间的语句（可能由其他用户运行）位于不同的事务中，并且如果需要空间，则该语句可以使用可用的空间，但只能在其他事务提交之后使用。`INSERT`

另请参阅：

了解高级行压缩的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13948)





###### 通过合并碎片空间进行优化

释放的空间可能与数据块中可用空间的主要区域相邻，也可能不相邻。非连续自由空间称为*碎片空间*。

下图显示了具有不连续可用空间的数据块。

图 12-11 具有碎片空间的数据块

![Description of Figure 12-11 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt210.gif)
[“图 12-11 具有碎片空间的数据块”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt210.html)

仅当满足以下条件时，Oracle 数据库*才会*自动、透明地合并数据块的可用空间：

- or 语句尝试使用包含足够可用空间的块来包含新的行段。`INSERT``UPDATE`
- 可用空间是分段的，因此行段无法插入块的连续部分。

合并后，可用空间量与操作前的可用空间量相同，但空间现在是连续的。[图 12-12](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-D25D436C-02D2-4AA5-B14A-7A7FA2C665C9__BABIIACD) 显示了空间合并后的数据块。

图 12-12 合并可用空间后的数据块

![Description of Figure 12-12 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt211.gif)
[“合并可用空间后的图 12-12 数据块”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt211.html)

Oracle 数据库仅在上述情况下执行合并，否则性能会因为数据块中可用空间的连续合并而降低。





##### 链接和迁移的行

Oracle 数据库使用链接和迁移来管理太大而无法放入单个块的行。

注意：标准表中的链接行不同于区块链表中的行链。Oracle 数据库使用不同的技术来管理区块链表中的行。

可能出现以下情况：

- 首次插入时，该行太大，无法放入一个数据块中。

  在[**行链中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F47A5E4-2B7F-4101-AA04-E9641F71AC7F)，Oracle 数据库将行的数据存储在为段保留的一个或多个数据块链中。行链接最常发生在大行中。示例包括包含数据类型为 或 的列的行，或包含大量列的行。在这些情况下，行链接是不可避免的。`LONG``LONG RAW`

- 将更新最初适合一个数据块的行，以便增加总行长度，但没有足够的可用空间来容纳更新的行。

  在[**行迁移**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CF217247-B358-44B4-9AB6-7FC1557230B7)中，Oracle 数据库会将整行移动到新的数据块，前提是该行可以放入新块中。迁移行的原始行段包含指向包含迁移行的新块的指针或“转发地址”。迁移行的行 rowid 不会更改。

- 一行的列超过 255 列。

  Oracle 数据库只能在一行中存储 255 列。因此，如果将一行插入到具有 1000 列的表中，则数据库将创建 4 个行段，通常链接在多个块上。

[图 12-13](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-49D4E586-57BF-4310-9EE9-2DD54108E651__BABFBDIH) 描述了在数据块中插入大行的过程。该行对于左侧块来说太大，因此数据库通过将第一行段放在左块中，将第二行段放在右块中来链接行。

图 12-13 行链接

![Description of Figure 12-13 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt316.gif)
[“图 12-13 行链接”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt316.html)

[图 12-14](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-49D4E586-57BF-4310-9EE9-2DD54108E651__BABBGEGE)，左侧块包含一行，该行已更新，因此该行现在对于该块来说太大。数据库将整行移动到右侧块，并在左侧块中保留指向迁移行的指针。

图 12-14 行迁移

![Description of Figure 12-14 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt306.gif)
[“图 12-14 行迁移”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt306.html)

链接或迁移行时，检索数据所需的 I/O 会增加。出现这种情况的原因是，Oracle 数据库必须扫描多个块才能检索行的信息。例如，如果数据库执行一个 I/O 来读取索引，执行一个 I/O 来读取未迁移的表行，则需要额外的 I/O 来获取迁移行的数据。

段顾问（可手动和自动运行）是一个 Oracle 数据库组件，用于识别具有可用空间用于回收的区段。顾问可以提供有关具有大量可用空间或过多链接行的对象的建议。

另请参阅：

- “行存储”和“行[块的行”](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-83BDB6CC-8CE1-44FE-9BCB-B018AC316FFC)
- "[区块链表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-7F4B8FBE-DEB8-4424-8B6D-B5252DECE427)"
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01401)了解如何回收浪费的空间
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-07836086-3C62-4A4A-8392-25A8C34C4A66)，了解如何减少链式行和迁移行





#### 索引块概述

索引块是一种特殊类型的数据块，其管理空间的方式与表**块**不同。Oracle 数据库使用索引块来管理索引中的逻辑存储空间。





##### 索引块的类型

索引包含根块、分支块和叶块。

块类型定义如下：

- 根块

  此块标识索引的入口点。

- 分支块

  数据库在搜索索引键时在分支块中导航。

- 叶块

  这些块包含指向关联行的索引键值 rowid。叶块按排序顺序存储键值，以便数据库可以有效地搜索键值范围内的所有行。





##### 索引条目的存储

索引条目存储在索引块中的方式与数据块中的表行相同 块部分中的索引条目不是按二进制顺序存储，而是存储在堆中。

数据库管理索引块中的行目录不同于管理数据块中的目录。行目录中的条目（而不是索引块正文中的条目）按键值排序。例如，在行目录中，索引键的目录条目先于索引键的目录条目，依此类推。`000000``111111`

行目录中条目的排序提高了索引扫描的效率。在范围扫描中，数据库必须读取范围中指定的所有索引键。数据库遍历分支块以标识包含第一个键的叶块。由于对行目录中的条目进行排序，因此数据库可以使用二叉搜索来查找区域中的第一个索引键，然后按顺序浏览行目录中的条目，直到找到最后一个键。这样，数据库就可以避免读取叶块正文中的所有键。

另请参阅：

"[数据块开销](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-D12A9269-54D8-4765-9E92-CEDDC98F1468)"





##### 重用索引块中的插槽

数据库可以重用索引块中的空间。

例如，应用程序可以将值插入到列中，然后删除该值。当行需要空间时，数据库可以重用以前由已删除值占用的索引槽。

索引块通常比堆组织的表块具有更多的行。在单个索引块中存储许多行的能力使数据库更容易维护索引，因为它避免了频繁拆分块以存储新数据。

索引不能合并自身，但您可以手动将其与带有 or 选项的语句合并。例如，如果使用 的值填充列，然后删除包含偶数的行，则索引将包含 250，000 个空槽。仅当数据库可以插入适合包含空槽的索引块的数据时，数据库才会重用槽。`ALTER INDEX``REBUILD``COALESCE``1``500000`





##### 合并索引块

索引合并将现有索引数据压缩到位，如果重组释放块，则在索引结构中保留空闲块。因此，合并不会释放索引块用于其他用途，也不会导致索引重新分配块。

Oracle 数据库不会自动压缩索引：您必须运行带有 或 选项的语句。`ALTER INDEX``REBUILD``COALESCE`

[图 12-15](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-84CF442F-B8CB-4BFA-9878-743F39EBB48F__BABIBCII) 显示了合并索引之前的列索引。前三个叶块仅部分已满，如灰色填充线所示。`employees.department_id`

图 12-15 合并前的索引

![Description of Figure 12-15 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt294.gif)
[“合并前的图 12-15 索引”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt294.html)

图 12-16 显示了合并索引后的[图 12-15](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-84CF442F-B8CB-4BFA-9878-743F39EBB48F__BABJACFA) 中的索引。如灰色填充线所示，前两个叶块现在已满，第三个叶块已释放。

图 12-16 合并后的索引

![Description of Figure 12-16 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt295.gif)
[“图12-16合并后的索引”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt295.html)

另请参阅：

- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11720)了解如何合并和重建索引
- 了解该语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00617)`COALESCE`





### 盘区概述

扩展数据块是由逻辑上连续的数据块组成的数据库存储单元。由于 RAID 条带化和文件系统实施，数据块可以物理分布在磁盘上。





#### 扩展数据块的分配

默认情况下，数据库会在创建数据段时为其分配初始范围。范围始终包含在一个数据文件中。

尽管尚未向线段添加任何数据，但初始范围中的数据块仅保留给此区段。每个段的第一个数据块包含该段中盘区的目录。[图 12-17](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-C205981E-182A-466D-B151-090455F9ECE7__BABFIFCF) 显示了以前不包含数据的数据文件中线段中的初始范围。

图 12-17 线段的初始范围

![Description of Figure 12-17 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt274.gif)
[“图 12-17 段的初始范围”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt274.html)

如果初始扩展数据块已满，并且需要更多空间，则数据库会自动为此段分配增量扩展数据块。增量范围是为线段创建的后续范围。

分配算法取决于表空间是本地管理的还是字典管理的。在本地管理的情况下，数据库在数据文件的位图中搜索相邻的空闲块。如果数据文件空间不足，则数据库将在另一个数据文件中查找。段的扩展数据块始终位于同一表空间中，但可能位于不同的数据文件中。

[图 12-18](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-C205981E-182A-466D-B151-090455F9ECE7__BABGHIED) 显示数据库可以为表空间中任何数据文件中的段分配扩展数据块。例如，段可以在 中分配初始扩展数据块，然后在 中分配第一个增量扩展数据块，然后在 中分配下一个扩展数据块。`users01.dbf``users02.dbf``users01.dbf`

图 12-18 段的增量范围

![Description of Figure 12-18 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt278.gif)
[“图 12-18 段的增量范围”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt278.html)

新分配的扩展数据块虽然是空闲的，但可能不是没有旧数据的。在 ASSM 中，Oracle 数据库在开始使用扩展数据块时会格式化新分配的扩展数据块，但仅根据需要设置。

注意：本节适用于串行操作，其中一个[**服务器进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E660AC1C-B704-4DC1-A35A-DB49EFB34F4A)解析并运行语句。数据库在并行 SQL 语句中以不同的方式分配扩展数据块，这需要多个服务器进程。

另请参阅：

- "[段空间和高水位线](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11660)了解如何手动分配扩展数据块





#### 解除分配盘区

通常，用户段的扩展数据块不会返回到表空间，除非您使用语句删除对象。`DROP`

例如，如果删除表中的所有行，则数据库不会回收数据块以供表空间中的其他对象使用。您也可以使用包删除段。`DBMS_SPACE_ADMIN`

注：在撤消段中，如果 Oracle 数据库具有指定的`“最佳`大小”或数据库处于[**自动撤消管理模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-31B8DD86-BD6D-446D-A35D-B5BF3654DF9E)，则会定期解除分配一个或多个扩展数据块。

在某些情况下，您可以手动释放空间。Oracle 段顾问可帮助根据对象的碎片级别确定对象是否有可用于回收的空间。以下技术可以释放盘区：

- 使用联机区段收缩来回收区段中的碎片空间。段收缩是一种联机的就地操作。通常，数据压缩可以提高缓存利用率，并且在[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)中需要读取的块更少。
- 将非分区表或表分区的数据移动到新段中，并选择性地移动到具有配额的其他表空间中。
- 重新生成或合并索引。
- 截断表或表群集，这将删除所有行。默认情况下，Oracle 数据库会解除分配已删除行使用的所有空间，但存储参数指定的空间除外。从 Oracle 数据库 11g 第 2 版 （11.2.0.2） 开始，您还可以使用删除整个段的选项。`MINEXTENTS``TRUNCATE``DROP ALL STORAGE`
- 解除分配未使用的空间，这将释放数据库段高水位线端的未使用空间，并使该空间可用于表空间中的其他段。

释放扩展数据块后，Oracle 数据库会修改本地管理的表空间的数据文件中的位图，以将重新获得的扩展数据块反映为可用空间。释放的盘区块中的任何数据都将无法访问。

另请参阅：

- "[合并索引块](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-84CF442F-B8CB-4BFA-9878-743F39EBB48F)"
- "[撤消表空间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-29C6EBF7-64AB-468E-A8CD-6ED36677D604)"
- "[段空间和高水位线](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE)"
- Oracle [数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01401)，了解如何回收段空间





#### 盘区的存储参数

每个分段都由以扩展数据块表示的存储参数定义。这些参数控制 Oracle 数据库如何为段分配可用空间。

存储设置按以下优先级顺序确定，列表中较高的设置将覆盖列表较低的设置：

1. 段存储条款
2. 表空间存储子句
3. Oracle数据库默认值

本地管理的表空间可以具有统一的扩展数据块大小，也可以具有由系统自动确定的可变扩展数据块大小：

- 对于统一扩展数据块，可以指定扩展数据块大小或使用默认大小 1 MB。表空间中的所有扩展数据块都具有此大小。本地管理的临时表空间只能使用此类型的分配。
- 对于自动分配的盘区，Oracle 数据库会确定其他盘区的最佳大小。

对于本地管理的表空间，无法在表空间级别指定某些存储参数。但是，您可以在段级别指定这些参数。在这种情况下，数据库将所有参数一起使用来计算段的初始大小。内部算法确定每个盘区的后续大小。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11361)，了解创建本地管理的表空间时的扩展数据块管理注意事项
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF30013)，了解存储子句中的选项





### 细分市场概述

段是一组扩展数据块，其中包含表空间中逻辑存储结构的所有数据。

例如，Oracle 数据库分配一个或多个扩展数据块以形成表的数据段。数据库还会分配一个或多个扩展数据块，以形成表上索引的索引段。

Oracle 数据库自动或手动管理段空间。本节假定使用 ASSM。

另请参阅：

“[逻辑空间管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5E81D8A9-2D4C-4991-9D64-B23DD476E22F)”以了解有关 ASSM 的更多信息





#### 用户细分

数据库中的单个数据段存储一个用户对象的数据。

有不同类型的细分。用户细分的示例包括：

- 表、表分区或表集群
- [**LOB 或 LOB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A85748CE-C4D4-43ED-BD49-29AFC4AD3A02) 分区
- 索引或索引分区

每个未分区的对象和对象分区都存储在其自己的段中。例如，如果索引有五个分区，则五个段包含索引数据。





##### 用户细分创建

默认情况下，数据库使用延迟段创建在创建表、索引和分区时仅更新数据库元数据。

当用户将第一行插入表或分区时，数据库将为表或分区、其 LOB 列及其索引创建段。延迟段创建可避免不必要地使用数据库资源。例如，安装应用程序可能会创建数千个对象，从而占用大量磁盘空间。其中许多对象可能永远不会使用。

包管理空对象的段。您可以使用此 PL/SQL 软件包执行以下操作：`DBMS_SPACE_ADMIN`

- 手动具体化未创建段的空表或分区的段
- 从当前分配了空段的空表或分区中删除段

为了最好地说明对象创建和区段创建之间的关系，假设延迟区段创建已禁用。您可以按如下方式创建一个表：

```
CopyCREATE TABLE test_table (my_column NUMBER);
```

如图 [12-19](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-733C09AF-70D1-4D53-A34A-5521115A596E__BABCHBJC) 所示，数据库为表创建一个段。

图 12-19 创建用户区段

![Description of Figure 12-19 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt246.gif)
[“图 12-19 创建用户区段”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt246.html)

创建具有主键或唯一[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)的表时，Oracle 数据库会自动为此键创建索引。再次假设延迟分段创建已禁用。您可以按如下方式创建一个表：

```
CopyCREATE TABLE lob_table (my_column NUMBER PRIMARY KEY, clob_column CLOB);
```

[图 12-20](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-733C09AF-70D1-4D53-A34A-5521115A596E__BABJJADA) 显示 的数据存储在一个段中，而隐式创建的索引存储在另一个段中。此外，CLOB 数据存储在其自己的段中，其关联的 CLOB 索引也是如此。因此，该语句导致创建*四个*不同的段。`lob_table``CREATE TABLE`

图 12-20 多个段

![Description of Figure 12-20 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt245.gif)
[“图 12-20 多个段”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt245.html)

注：表的段和此表的索引不必占用相同的表空间。

创建区段时，数据库将分配一个或多个盘区。对象的存储参数确定如何分配每个段的扩展数据块。这些参数会影响与对象关联的数据段的数据检索和存储效率。

另请参阅：

- "[内部 LOB](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-3C50EAB8-FC39-4BB3-B680-4EACCE49E866)"
- "[盘区的存储参数](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-38EC39DC-D9A2-41AD-8AD4-0E1A8A91FFED)"
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13319)，了解如何管理延迟段创建
- 适用于语法的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01402)`CREATE TABLE`





#### 临时段

处理查询时，Oracle 数据库通常需要临时工作区来执行 SQL 语句的中间阶段。

可能需要[**临时段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-12B9FBED-5452-4D45-A43A-B33AB6DE9390)的典型操作包括排序、[**哈希**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-90B8C458-65EB-4868-9CC5-175955A7AD91)和合并位图。在创建索引时，Oracle 数据库还会将索引段放入临时段中，然后在索引完成后将其转换为永久段。

如果可以在内存中执行操作，Oracle 数据库不会创建临时段。但是，如果无法使用内存，则数据库会自动在磁盘上分配一个临时段。





##### 为查询分配临时段

Oracle 数据库在用户会话期间根据需要为查询分配临时分段，并在查询完成时删除这些分段。对临时分段的更改不会记录在联机重做日志中，但临时分段上的空间管理操作除外。

数据库在分配给用户的临时表空间中创建临时段。表空间的缺省存储特征决定了临时段中扩展数据块的特征。由于临时段的分配和解除分配频繁发生，因此最佳实践是为临时段创建至少一个特殊表空间。数据库跨磁盘分配 I/O，并避免碎片化和其他带有临时段的表空间。`SYSTEM`

注：在本地管理 `SYSTEM` 时，必须在创建数据库时定义缺省临时表空间。本地管理的 `SYSTEM` 表空间不能用于缺省临时存储器。

另请参阅：

- "[联机重做日志概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-47557C86-E551-46B5-B28E-28D6C500694E)"
- 了解如何创建临时表空间的 [*Oracle 数据库管理员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11366)
- 适用于语法和语义的 [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01403)`CREATE TEMPORARY TABLESPACE`





##### 为临时表和索引分配段

Oracle 数据库可以为临时表及其索引分配临时段。

临时表保存仅在事务或会话期间存在的数据。每个会话仅访问为其自身分配的盘区，而无法访问为其他会话分配的盘区。

Oracle 数据库在全局临时表的第一个段进入表时为该表分配段，并仅在需要时为专用临时表分配段。插入可以显式发生，也可以由于 .数据库为表及其索引分配段，为索引创建根页，并分配任何段。`INSERT``CREATE TABLE AS SELECT``LOB`

当前用户的临时表空间为临时表分配段。例如，分配给 is 的临时表空间和分配给 is 的临时表空间。在这种情况下， 将临时数据存储在段中，同时将临时数据存储在段中。`user1``temp1``user2``temp2``user1``temp1``user2``temp2`

另请参阅：

- "[临时表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-23B23DCF-7482-4585-9C63-AC073C5DE224)"
- 了解如何创建临时表的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-A48CB362-FC15-4A26-8386-906A55F6788E)





#### 撤消段

Oracle 数据库维护事务操作的记录，统称为**撤消数据**。

Oracle 数据库使用撤消数据执行以下操作：

- 回滚[**活动事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6A310BE1-83AB-4C87-ABE1-09CD847A31FB)
- 恢复已终止的事务
- 提供[**读取一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A2D92FBD-9C36-432E-A44F-0462DB2E5527)
- 执行一些逻辑闪回操作

Oracle 数据库将撤消数据存储在数据库内，而不是外部日志中。撤消数据存储在与数据块一样更新的块中，对这些块的更改会生成重做记录。通过这种方式，Oracle 数据库可以高效地访问撤消数据，而无需读取外部日志。

永久对象的撤消数据存储在[**撤消表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78A7FBF2-2EB5-4BD6-AECC-D61A5AEF1158)中。Oracle 数据库提供了一种完全自动化的机制（称为自动撤消管理模式），用于管理撤消表空间中的[**撤消**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-31B8DD86-BD6D-446D-A35D-B5BF3654DF9E)段和空间。

数据库将撤消数据分为两个流。临时撤消流仅封装由对临时对象的更改生成的撤消记录，而永久撤消流仅封装永久对象的撤消记录。数据库独立管理临时和永久撤消。撤消分离通过执行以下操作来减少存储并提高性能：

- 使您能够配置最适合永久表和临时表工作负载的永久和撤消表空间大小
- 减小写入联机重做日志的重做大小
- 避免备份临时撤消数据的需要

在活动数据卫士实例上，全局临时表上的 DML 要求在临时撤消段中生成撤消。

另请参阅：

- "[使用在线重做日志](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-B7EB99F2-0D79-4E22-BBB6-75191035DE8D)"
- "[临时撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-311EBE7D-F01F-4E52-9B8B-DBF84116207D)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13740)了解临时撤消段
- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10326)`TEMP_UNDO_ENABLED`





##### 撤消区段和事务

当事务启动时，数据库将事务绑定（分配）到当前撤消表空间中的撤消段，从而绑定（分配）到事务**表**。在极少数情况下，如果数据库实例没有指定的撤消表空间，则事务将绑定到系统撤消段。

多个活动事务可以同时写入同一撤消段或不同的段。例如，事务 T1 和 T2 都可以写入撤消段 U1，或者 T1 可以写入 U1，而 T2 写入撤消段 U2。

从概念上讲，撤消段中的范围形成一个环。事务写入一个撤消范围，然后写入环中的下一个范围，依此类推。[图 12-21 显示了两个事务 T1 和 T2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-BB42D7D8-2C93-4F5B-B0C1-6361AEEF4B37__BABGAFCA)，它们从撤消段的第三个范围 （E3） 开始写入，并继续写入第四个范围 （E4）。

图 12-21 撤消段中分配的盘区环

![Description of Figure 12-21 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt328.gif)
[“图 12-21 撤消段中分配的盘区环”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt328.html)

在任何给定时间，事务仅按顺序写入撤消段中的一个扩展数据块，称为事务的*当前扩展数据块*。多个活动事务可以同时写入相同的当前数据块或不同的当前扩展数据块。[图 12-21 显示了事务 T1 和 T2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-BB42D7D8-2C93-4F5B-B0C1-6361AEEF4B37__BABGAFCA) 同时写入范围 E3。在撤消范围内，数据块仅包含一个事务的数据。

当当前撤消扩展数据块填满时，需要空间的第一个事务会检查环中下一个分配的扩展数据块的可用性。如果下一个扩展数据块*不包含*来自活动事务的数据，则此扩展数据块将成为当前扩展数据块。现在，所有需要空间的事务都可以写入新的当前范围。[在图 12-22](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-BB42D7D8-2C93-4F5B-B0C1-6361AEEF4B37__BABEHGDD) 中，当 E4 已满时，T1 和 T2 继续写入 E1，覆盖 E1 中的非活动撤消数据。

图 12-22 撤消段中分配的盘区循环使用

![Description of Figure 12-22 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt327.gif)
[“图 12-22 撤消段中分配的盘区循环使用”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt327.html)

如果下一个扩展数据块包含来自活动事务的数据，则数据库必须分配*新的扩展数据*块。[图 12-23](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-BB42D7D8-2C93-4F5B-B0C1-6361AEEF4B37__BABFECCE) 显示了 T1 和 T2 写入 E4 的场景。当 E4 填满时，事务无法继续写入 E1，因为 E1 包含活动的撤消条目。因此，数据库会为此撤消段分配新的盘区 （E5）。事务继续写入 E5。

图 12-23 为撤消段分配新盘区

![Description of Figure 12-23 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt326.gif)
[“图 12-23 撤消线段的新扩展数据块的分配”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt326.html)

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN013)了解如何管理撤消段





##### 事务回滚

发出语句时，数据库使用撤消记录回滚未提交的事务对数据库所做的更改。`ROLLBACK`

在恢复期间，数据库将从联机重做日志应用的任何未提交的更改回滚到数据文件。撤消记录通过在其他用户更改数据的同时为访问数据的用户维护数据的先前映像来提供[**读取一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A2D92FBD-9C36-432E-A44F-0462DB2E5527)。





##### 临时撤消段

临时撤消段是仅用于**临时撤消**数据的可选空间管理容器。

对临时表的更改的撤消记录都是特定于会话的，并且仅对读取一致性和事务回滚有用。在 Oracle Database 12c 之前，数据库始终将这些记录存储在联机重做日志中。由于对临时对象的更改不会记录在联机重做日志中，因此将临时对象的撤消写入临时撤消段可节省联机重做日志和存档重做日志文件中的空间。数据库不会记录对撤消的更改或对临时表的更改，从而提高了性能。

您可以设置初始化参数，以便临时表将撤消数据存储在临时撤消段中。当此参数为 时，数据库将从临时表空间分配临时撤消段。`TEMP_UNDO_ENABLED``TRUE`

另请参阅：

- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13740)了解临时撤消段
- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10326)`TEMP_UNDO_ENABLED`





#### 段空间和高水位线

为了管理空间，Oracle 数据库会跟踪分段中块的状态。**高水位线 （HWM）** 是段中的点，超过该点的数据块将未格式化且从未使用过。

MSSM 使用空闲列表来管理区段空间。创建表时，不会格式化段中的任何块。当会话首次在表中插入行时，数据库会在空闲列表中搜索可用的块。如果数据库没有找到可用的块，则它预先格式化一组块，将它们放在空闲列表中，然后开始将数据插入到块中。在 MSSM（全表扫描）中，全表扫描会读取 HWM 下*的所有*块。

ASSM 不使用免费列表，因此必须以不同的方式管理空间。当会话首次将数据插入表中时，数据库将格式化单个位图块，而不是像 MSSM 中那样预先格式化一组块。位图跟踪段中块的状态，取代空闲列表。数据库使用位图查找空闲块，然后在用数据填充之前格式化每个块。ASSM 在块之间分散插入以避免并发问题。

ASSM 段中的每个数据块都处于以下状态之一：

- 在硬件之上

  这些块未格式化，从未使用过。

- 在硬件下方

  这些块处于以下状态之一：

  - 已分配，但当前未格式化且未使用
  - 格式化并包含数据
  - 格式化为空，因为数据已删除

[图 12-24](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE__BABJIIAI) 将 ASSM 段描述为一系列水平块。创建表时，HWM 位于左侧段的开头。由于尚未插入任何数据，因此段中的所有块都未格式化且从未使用过。

图 12-24 创建表时的 HWM

![Description of Figure 12-24 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt275.gif)
[“创建表时的图 12-24 HWM”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt275.html)

假设事务将行插入到段中。数据库必须分配一组块来保存行。分配的块低于 HWM。数据库设置此组中的位图块的格式以保存元数据，但不预先设置组中其余块的格式。

[在图 12-25](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE__BABJGIBJ) 中，分配了 HWM 下方的块，而 HWM 上方的块既未分配也不格式化。发生插入时，数据库可以写入具有可用空间的任何块。低高水位线（低 HWM）标记已知所有块都已格式化的点，因为它们包含数据或以前包含的数据。

图 12-25 硬件和低硬件

![图 12-25 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt276.gif)
[“图 12-25 HWM 和低 HWM”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt276.html)

[在图 12-26](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE__CHDBFGBB) 中，数据库在 HWM 和低 HWM 之间选择一个块并写入该块。数据库可以很容易地选择 HWM 和低 HWM 之间的任何其他块，或者低于低 HWM 且具有可用空间的任何块。[在图 12-26](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE__CHDBFGBB) 中，新填充块两侧的块未格式化。

图 12-26 硬件和低硬件

![Description of Figure 12-26 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt333.gif)
[“图 12-26 HWM 和低 HWM”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt333.html)

低 HWM 在[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)中很重要。由于 HWM 下方的块仅在使用时进行格式化，因此某些块可能未格式化，如图 [12-26](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE__CHDBFGBB) 所示。因此，数据库读取位图块以获取低 HWM 的位置。数据库读取低 HWM 之前的所有块，因为它们已知已格式化，然后仅仔细读取低 HWM 和 HWM 之间的格式化块。

假定新事务在表中插入行，但位图指示 HWM 下的可用空间不足。[在图 12-27](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE__BABFHJIC) 中，数据库将 HWM 向右推进，分配一组新的未格式化块。

图 12-27 推进 HWM 和低 HWM

![Description of Figure 12-27 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt277.gif)
[“图 12-27 推进 HWM 和低 HWM”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt277.html)

当 HWM 和低 HWM 之间的块已满时，HWM 向右前进，低 HWM 前进到旧 HWM 的位置。随着数据库随着时间的推移插入数据，HWM 继续向右前进，而低 HWM 始终落后于它。除非手动重建、截断或收缩对象，否则 HWM 永远不会后退。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN10161)，了解如何在线缩减区段
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01707)`TRUNCATE TABLE`





### 表空间概述

**表空间**是段的逻辑存储容器。段是占用存储空间的数据库对象，例如表和索引。在物理级别，表空间将数据存储在一个或多个数据文件或临时文件中。

数据库必须具有 和 表空间。下图显示了典型数据库中的表空间。以下各节介绍表空间类型。`SYSTEM``SYSAUX`

图 12-28 表空间

![Description of Figure 12-28 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt319.gif)
[“图 12-28 表空间”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt319.html)





#### 永久表空间

**永久表空间**对持久模式对象进行分组。表空间中对象的段以物理方式存储在数据文件中。

为每个数据库用户分配一个缺省永久表空间。非常小的数据库可能只需要缺省值和表空间。但是，Oracle 建议您至少创建一个表空间来存储用户和应用程序数据。您可以使用表空间来实现以下目标：`SYSTEM``SYSAUX`

- 控制数据库数据的磁盘空间分配

- 为数据库用户分配配额（空间限额或限制）

- 使单个表空间联机或脱机，而不会影响整个数据库的可用性

- 执行单个表空间的备份和恢复

- 使用 Oracle 数据泵实用程序导入或导出应用程序数据

- 创建一个[**可传输的表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3AC6538-2722-4916-BD9F-EDAB8318CCCD)空间，您可以将该表空间从一个数据库复制或移动到另一个数据库，甚至可以跨平台

  通过传输表空间来移动数据可能比导出/导入或卸载/加载相同数据快几个数量级，因为传输表空间仅涉及复制数据文件和集成表空间元数据。传输表空间时，还可以移动索引数据。

另请参阅：

- "[Oracle 数据泵导出和导入](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCDD0FBF-0AD2-45E1-B723-21CC72ADDCD6)"
- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01101)了解如何传输表空间
- Oracle [数据库实用程序了解 Oracle](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL100) 数据泵





##### 系统表空间

表空间是创建数据库时包含在数据库中的必需管理表空间。Oracle 数据库用于管理数据库。`SYSTEM``SYSTEM`

表空间包含以下信息，全部归用户所有：`SYSTEM``SYS`

- 数据字典
- 包含有关数据库的管理信息的表和视图
- 已编译的存储对象，如触发器、过程和包

表空间像任何其他表空间一样进行管理，但需要更高级别的特权，并且在某些方面受到限制。例如，不能重命名或删除表空间。`SYSTEM``SYSTEM`

默认情况下，Oracle 数据库将所有新创建的用户表空间设置为本地管理。在具有本地管理的表空间的数据库中，不能创建字典管理的表空间（已弃用）。但是，如果您手动执行语句并接受缺省值，则表空间将受到字典管理。您可以将现有的字典管理的表空间迁移到本地管理的格式。`SYSTEM``CREATE DATABASE``SYSTEM``SYSTEM`

注：Oracle 强烈建议您使用数据库配置助手 （DBCA） 创建新数据库，以便缺省情况下所有表空间（包括 `SYSTEM）`都在本地进行管理。

另请参阅：

- “联机[和脱机](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-DBE61726-0DE6-4A85-A49B-9F5587234A87)表空间”，以获取有关表空间永久联机状态的信息`SYSTEM`
- “[数据库安装和配置工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-87ACF317-FEBC-418C-9BE6-253F2C43F482)”以了解 DBCA
- 《[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11393)》，了解如何创建或迁移到本地管理的表空间`SYSTEM`
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01204)`CREATE DATABASE`





##### 西索表空间

表空间是表空间的辅助表空间。`SYSAUX``SYSTEM`

由于是以前需要自己的表空间的许多 Oracle 数据库功能和产品的默认表空间，因此它减少了数据库所需的表空间数。它还减少了表空间上的负载。`SYSAUX``SYSTEM`

数据库创建或升级会自动创建表空间。在正常的数据库操作期间，数据库不允许删除或重命名表空间。如果表空间变得不可用，则核心数据库功能仍可运行。使用表空间的数据库功能部件可能会失败，或者功能有限。`SYSAUX``SYSAUX``SYSAUX``SYSAUX`

另请参阅：

了解表空间的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN00203)`SYSAUX`





##### 撤消表空间

撤消表空间是为系统管理的撤消数据保留的本地管理的**表空间**。

与其他永久表空间一样，撤消表空间包含数据文件。这些文件中的撤消块按范围分组。

另请参阅：

"[撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-6E206D3A-E0E7-4B23-9C41-516FB35BC3FE)"





###### 自动撤消管理模式

撤消表空间要求数据库处于**缺省自动撤消模式**。

自动模式消除了手动管理撤消段的复杂性。数据库会自动调整自身，以提供撤消数据的最佳保留，以满足可能需要此数据的长时间运行的查询。

新安装的 Oracle 数据库会自动创建撤消表空间。早期版本的 Oracle 数据库可能不包含撤消表空间，而是使用旧版回滚段，称为[**手动撤消管理模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D30B79E4-A641-4521-98C2-6F500A553736)。升级到 Oracle 数据库 11g 或更高版本时，可以启用自动撤消管理模式并创建撤消表空间。Oracle 数据库包含一个撤消顾问，可提供有关撤消环境的建议并帮助实现撤消环境的自动化。

一个数据库可以包含多个撤消表空间，但一次只能使用一个。当实例尝试打开数据库时，Oracle 数据库会自动选择第一个可用的撤消表空间。如果没有可用的撤消表空间，则实例将在没有撤消表空间的情况下启动，并将撤消数据存储在表空间中。不建议将撤消数据存储在 中。`SYSTEM``SYSTEM`

另请参阅：

- 了解自动撤消管理的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11461)
- [Oracle 数据库升级指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=UPGRD-GUID-3BC7D6F1-8060-4A00-800E-A00C2F621634)，了解如何迁移到自动撤消管理模式





###### 自动撤消保留

**撤消保留期**是 Oracle 数据库在覆盖旧撤消数据之前尝试保留的最短时间。

撤消保留很重要，因为长时间运行的查询可能需要较旧的块映像来提供[**读取一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A2D92FBD-9C36-432E-A44F-0462DB2E5527)。此外，某些 Oracle 闪回功能可能依赖于撤消可用性。

通常，希望尽可能长时间地保留旧的撤消数据。事务提交后，回滚或事务恢复不再需要撤消数据。如果撤消表空间有用于新事务的空间，则数据库可以保留旧的撤消数据。当可用空间不足时，数据库将开始覆盖已提交事务的旧撤消数据。

Oracle 数据库会自动为当前撤消表空间提供最佳的撤消保留。数据库收集使用情况统计信息，并根据这些统计信息和撤消表空间大小调整保留期。如果撤消表空间配置了该选项，并且未指定最大大小，则撤消保留调整会有所不同。在这种情况下，如果空间允许，数据库会将撤消保留期调整为略长于运行时间最长的查询。`AUTOEXTEND`

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-049380AF-220F-43C0-81B2-27DCD7953574)了解有关自动调整撤消保留的更多详细信息



##### 影子表空间

影子表空间是用于**影子丢失写保护**的大文件**表空间**。

注：卷影丢失写保护与使用 `DB_LOST_WRITE_PROTECT` 初始化参数和备用数据库配置的丢失写保护无关。



###### 影子表空间的用途

阴影丢失写保护提供快速检测和对**丢失写**的即时响应。

当 I/O 子系统确认块写入完成（即使写入未发生）或块的先前映像覆盖当前映像时，会发生数据块丢失写入。

未检测到的丢失写入可能会导致数据损坏，因为不正确的数据可用于其他 DML 事务。例如，事务可以从一个表中读取旧的和不正确的数据，然后基于此数据更新数百个其他表。这样，数据损坏可以蔓延到整个数据库。

卷影丢失写保护具有以下优点：

- 它会在标准 DML、SQL*加载程序常规路径加载、直接路径加载和 RMAN 备份使用丢失的写入之前检测到丢失的写入。
- 不需要备用数据库，如 Oracle 数据库 11g 中引入的丢失写保护。
- 您可以为特定表空间和数据文件启用卷影丢失写保护。您不需要跟踪所有数据。
- 您可以将一个影子表空间替换为另一个影子表空间以更改其配置或位置。
- 您可以暂停和恢复表空间或数据文件的卷影丢失写保护。
- 您可以使用单个语句为整个非 CDB 或 PDB 启用或禁用它。请注意，该表指示是否为 PDB 启用跟踪。`ALTER DATABASE ... LOST WRITE TRACKING``PROP$`

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00802)，了解有关该子句的更多信息`LOST WRITE TRACKING`



###### 影子表空间的工作原理

丢失写保护需要两个表空间：影子表空间和非影子表空间，其块由影子表空间跟踪。

下图提供了一个示例方案。表空间中的数据文件，并由影子表空间跟踪。影子表空间仅跟踪表空间中的数据文件。`TBS1``TBS2``DBF6``TBS3`

![Description of cncpt390.eps follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt390.png)
[插图 cncpt390 的说明.eps](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt390.html)

一个[**跟踪数据文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8A0DABA5-3509-4298-B206-C379910EC038)映射到影子表空间中的一个[**阴影盘区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A32C405-187E-47FB-85C7-2B56E9C34286)。跟踪数据文件中的每个数据块在影子块中都有一个相应的条目。此条目包含跟踪的数据块的 SCN。从磁盘读取跟踪的数据块时，卷影丢失写保护会将卷影表空间中块的 SCN 与跟踪数据块中最近写入的 SCN 进行比较。如果卷影条目的 SCN 大于正在读取的数据块，则表示发生了写入丢失，提示错误。

阴影范围的大小具有大量额外空间，以防止自动调整数据文件的大小导致阴影范围变得太大。如果手动或自动调整追踪数据文件的大小，并且阴影范围需要增大，则数据库将尝试调整追踪数据的大小。如果影子表空间中没有足够的空间，则数据库会将警告写入警报日志，并跟踪尽可能多的数据块。

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-23154DE0-B2AA-4D73-BBCA-73ED5786FF2B)，了解如何管理卷影丢失写保护



###### 影子表空间的用户界面

您可以使用该命令启用和禁用卷影丢失写保护。`ALTER DATABASE`

要使卷影丢失写保护保护特定表空间或数据文件，必须满足以下条件：

- 您必须使用该语句为整个非 CDB 或 PDB 启用卷影丢失写保护。`ALTER DATABASE ENABLE LOST WRITE PROTECTION`

  注意：在 CDB 中，如果在根目录中启用影子丢失写保护，则 PDB 不会继承它。必须为要保护的每个 PDB 启用卷影丢失写保护。

- 您必须已使用该子句为要保护的表空间或数据文件启用了影子丢失写保护。`ENABLE LOST WRITE PROTECTION`

  为表空间启用影子丢失写保护时，表空间的所有数据文件都将受到保护，添加到表空间的任何数据文件也将受到保护。请注意，您无法在临时表空间或其他丢失的写表空间上启用丢失写保护。

- 您必须通过使用带有子句的语句创建了一个或多个影子表空间。`CREATE BIGFILE TABLESPACE``LOST WRITE PROTECTION`

Oracle 数据库会自动将跟踪的数据文件分配给特定的影子表空间。不能指定用于特定数据文件的影子表空间。

以下数据字典视图监视影子表空间：

- `DBA_TABLESPACES`

  通过查询显示哪些表空间是影子表空间。

- `DBA_DATA_FILES.LOST_WRITE_PROTECT`

  显示是否为数据文件启用了丢失的写保护

- `USER_TABLESPACES.LOST_WRITE_PROTECT`

  显示是否为特定表空间打开了丢失的写保护。 不指示是否为表空间打开了丢失的写入：您必须改为查看。`DBA_DATA_FILES``USER_TABLESPACES`

另请参阅：

- "[数据损坏](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-CEA4D714-A143-4F9F-8EED-EE5A6B29B3C3)"
- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-23154DE0-B2AA-4D73-BBCA-73ED5786FF2B)了解如何管理影子表空间
- 了解该语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01403)`CREATE TABLESPACE`
- 要了解的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-B28A7D79-24E3-49B5-B948-7C2277CB1FB8)`DBA_TABLESPACES`



###### 示例：配置丢失写保护

此示例为一组表空间启用影子丢失写跟踪。

在此示例中，您的目标是保护非 CDB 中的 和 表空间。您还希望保护表空间中的数据文件，并且仅保护此数据文件。执行以下操作：`salestbs``hrtbs``oetbs01.dbf``oetbs`

1. 以 身份登录到数据库。`SYSTEM`

2. 创建单个影子表空间，如下所示：

   ```
   CopyCREATE BIGFILE TABLESPACE shadow_lwp1 
     DATAFILE 'shadow_lwp1_df' SIZE 10M LOST WRITE PROTECTION;
   ```

3. 为整个数据库启用丢失写保护，如下所示：

   ```
   CopyALTER DATABASE ENABLE LOST WRITE PROTECTION;
   ```

4. 为 和表空间启用卷影丢失写保护，如下所示：`salestbs``hrtbs`

   ```
   CopyALTER TABLESPACE salestbs ENABLE LOST WRITE PROTECTION;
   ALTER TABLESPACE hrtbs ENABLE LOST WRITE PROTECTION;
   ```

5. 为数据文件启用阴影丢失写保护，如下所示：`oetbs01.dbf`

   ```
   CopyALTER DATABASE DATAFILE 'oetbs01.dbf' ENABLE LOST WRITE PROTECTION;
   ```

另请参阅：

- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN-GUID-23154DE0-B2AA-4D73-BBCA-73ED5786FF2B)了解如何管理影子表空间
- 了解该语句的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01403)`CREATE TABLESPACE`





#### 临时表空间

**临时表空间**包含仅在会话期间保留的瞬态数据。任何永久模式对象都不能驻留在临时表空间中。临时**文件存储临时**表空间数据。

临时表空间可以提高内存中不适合的多个排序操作的并发性。这些表空间还提高了排序期间空间管理操作的效率。



##### 共享和本地临时表空间

临时表空间可以是共享的，也可以是本地的。

共享临时表空间将临时文件存储在共享磁盘上，以便所有数据库实例都可以访问临时[**空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-66347815-8AB8-4E23-9B86-F3748CB46AA6)。相反，本地临时[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3B1784FE-857F-4421-B6F8-17105AEBB6B7)为每个数据库实例存储单独的非共享临时文件。本地临时表空间对于 Oracle Real Application Clusters 或 Oracle Flex Clusters 非常有用。

注意：本地临时表空间是 Oracle 数据库 12c 第 2 版 （12.2） 中的新增功能。在以前的发行版中，共享的临时表空间简称为*临时表空间*。从此版本开始，除非另有说明，否则术语临时表空间是指共享的*临时表空间*。

您可以为只读和读/写数据库实例创建本地临时表空间。当许多只读实例访问单个数据库时，本地临时表空间可以提高涉及排序、哈希聚合和连接的查询的性能。优点是：

- 通过使用本地而不是共享磁盘存储提高 I/O 性能
- 避免昂贵的跨实例临时空间管理
- 通过消除磁盘空间元数据管理来提高实例启动性能

下表比较了共享和本地临时表空间的特征。

表 12-2 共享和本地临时表空间

| 共享临时表空间                              | 本地临时表空间                                               |
| :------------------------------------------ | :----------------------------------------------------------- |
| 使用语句创建。`CREATE TEMPORARY TABLESPACE` | 使用语句创建。`CREATE LOCAL TEMPORARY TABLESPACE`**注意：**本地临时表空间始终是[**大文件表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-02B4A6A1-8828-47C9-A921-11966359363E)，但在创建语句中不需要关键字。`BIGFILE` |
| 为数据库创建单个临时表空间。                | 为每个数据库实例创建单独的临时表空间。该选项仅为只读实例创建表空间。该选项为所有实例（只读和读/写）创建表空间。`FOR LEAF``FOR ALL` |
| 支持表空间组。                              | 不支持表空间组。                                             |
| 将临时文件元数据存储在控制文件中。          | 将控制文件中的所有实例通用的临时文件元数据和 SGA 中特定于实例的元数据（例如，用于分配的位图、当前临时文件大小和文件状态）存储。 |

另请参阅：

"[Oracle 数据库实例简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-2942B648-70FA-47B4-8950-0CC6884B1F80)"



##### 默认临时表空间

为每个数据库用户帐户分配一个缺省共享临时表空间。如果数据库包含本地临时表空间，那么还会为每个用户帐户分配缺省本地临时存储器。

您可以使用 or 语句为用户帐户指定不同的临时表空间。Oracle 数据库对未为其指定其他临时表空间的用户使用系统级默认临时表空间。`CREATE USER``ALTER USER`

另请参阅：

[Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01503)，了解有关该语句的更多信息`CREATE USER`



###### 创建缺省临时表空间

创建数据库时，默认临时存储取决于表空间是否在本地管理。`SYSTEM`

下表显示了 Oracle 数据库在创建数据库时如何选择默认临时表空间。

表 12-3 创建默认临时表空间

| 系统表空间是否在本地管理？ | CREATE DATABASE 语句是否指定了缺省临时表空间？ | 然后数据库...                                                |
| :------------------------- | :--------------------------------------------- | :----------------------------------------------------------- |
| 是的                       | 是的                                           | 使用指定的表空间作为默认值。                                 |
| 是的                       | 不                                             | 创建临时表空间。                                             |
| 不                         | 是的                                           | 使用指定的表空间作为默认值。                                 |
| 不                         | 不                                             | 用于默认临时存储。数据库在[**警报日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ACC7727F-41AE-47B1-AADB-2585EE828792)中写入警告，指出建议使用缺省临时表空间。`SYSTEM` |

创建数据库后，您可以使用该语句更改数据库的缺省临时表空间。`ALTER DATABASE DEFAULT TEMPORARY TABLESPACE`

注：您不能使缺省临时表空间永久化。

另请参阅：

- "[永久和临时数据文件](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-D59095AD-F79B-4C54-BBED-798E510B049E)"
- 了解如何创建默认临时表空间的 [*Oracle 数据库管理员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11090)
- [*Oracle 数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53870)，了解 和 的子句的语法`DEFAULT TEMPORARY TABLESPACE``CREATE DATABASE``ALTER DATABASE`



###### 访问临时存储

如果用户分配了临时表空间，则数据库首先访问它;否则，数据库将访问缺省临时表空间。数据库访问查询的临时表空间后，不会切换到其他表空间。

用户查询可以访问共享或本地临时存储。此外，用户可以为只读实例分配一个默认本地临时表空间，并为读/写实例分配另一个默认本地临时表空间。

对于读/写实例，数据库为共享临时表空间提供更高的优先级。对于只读实例，数据库会为本地临时表空间提供更高的优先级。如果数据库实例是读/写的，则数据库将按以下顺序搜索空间：

1. 是否向用户分配了共享临时表空间？
2. 是否为用户分配了本地临时表空间？
3. 数据库缺省临时表空间是否有空间？

如果上述任何问题的答案是肯定的，则数据库将停止搜索并从指定的表空间中分配空间;否则，将从数据库缺省本地临时表空间分配空间。

如果数据库实例是只读的，则数据库将按以下顺序搜索空间：

1. 是否为用户分配了本地临时表空间？
2. 分配的数据库缺省本地临时表空间是否有空间？
3. 是否向用户分配了共享临时表空间？

如果上述任何问题的答案是肯定的，则数据库将停止搜索并从指定的表空间分配空间;否则，将从数据库缺省共享临时表空间分配空间。





#### 表空间模式

表空间模式决定了表空间的可访问性。





##### 读/写和只读表空间

每个表空间都处于写入模式，该模式指定是否可以写入。

互斥模式如下：

- 读/写模式

  用户可以读取和写入表空间。所有表空间最初都创建为读/写。和表空间和临时表空间是永久读/写的，这意味着它们不能设置为只读。`SYSTEM``SYSAUX`

- 只读模式

  阻止对表空间中的数据文件执行写入操作。只读表空间可以驻留在只读介质（如 DVD 或 WORM 驱动器）上。

  只读表空间消除了对数据库的大型静态部分执行备份和恢复的需要。只读表空间不会更改，因此不需要重复备份。如果在介质故障后恢复数据库，则不需要恢复只读表空间。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11379)，了解如何将表空间更改为只读或读/写模式
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53606)`ALTER TABLESPACE`
- [Oracle 数据库备份和恢复用户指南，了解有关恢复](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89370)的更多信息





##### 联机和脱机表空间

只要数据库处于打开状态，表空间就可以处于联机（可访问）或脱机（不可访问）。

表空间通常是在线的，以便用户可以使用其数据。表空间和临时表空间不能脱机。`SYSTEM`

表空间可以自动或手动脱机。例如，您可以使表空间脱机以进行维护或备份和恢复。当遇到某些错误时，数据库会自动使表空间脱机，例如当[**数据库编写器 （DBW）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C27AAA54-E60B-49BC-AB04-7B3848EBAFD6) 进程多次尝试写入数据文件时失败时。尝试访问脱机表空间中的表的用户会收到错误。

当表空间脱机时，数据库将执行以下操作：

- 数据库不允许后续 DML 语句引用脱机表空间中的对象。脱机表空间不能由 Oracle 数据库以外的任何实用程序读取或编辑。
- 具有引用该表空间中的数据的已完成语句的活动事务在事务级别不受影响。
- 数据库将与这些已完成语句对应的撤消数据保存在表空间的延迟撤消段中。当表空间联机时，数据库会根据需要将撤消数据应用于表空间。`SYSTEM`

另请参阅：

- "[联机和脱机数据文件](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-A9ADC3BA-D991-4CA6-A4CA-8953A75AEF9D)"
- "[数据库编写器进程 （DBW）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-DC9CBDED-3978-450A-9D7A-0A94CE8FF233)"
- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12490)了解如何更改表空间可用性





#### 表空间文件大小

表空间可以是大文件表空间或**小文件表空间**。这些表空间在执行未显式引用数据文件或临时文件的 SQL 语句方面无法区分。

区别如下：

- 小文件表空间可以包含多个数据文件或临时文件，但这些文件不能像大文件表空间中一样大。这是默认表空间类型。

- 大文件表空间包含一个非常大的数据文件或临时文件。这种类型的表空间可以执行以下操作：

  - 增加数据库的存储容量

    数据库中数据文件的最大数量是有限的，因此增加每个数据文件的大小会增加总体存储。

  - 减轻管理许多数据文件和临时文件的负担

    大文件表空间通过 Oracle 托管文件和自动存储管理 （Oracle ASM） 简化了文件管理，无需添加新文件和处理多个文件。

  - 对表空间而不是单个文件执行操作

    大文件表空间使表空间成为磁盘空间管理、备份和恢复等的主要单元。

  大文件表空间仅支持具有 ASSM 的本地管理的表空间。但是，本地管理的撤消和临时表空间可以是大文件表空间，即使手动管理段也是如此。

另请参阅：

- "[备份和恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCE361D9-B486-43B4-B4FD-5722A93203F0)"
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01102)，了解如何管理大文件表空间

## 第五部分 Oracle实例schema

本部分介绍 Oracle 数据库实例的基本结构体系结构。

本部分包含以下章节：

- [Oracle数据库实例](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-67247052-CE3F-44D2-BA3E-7067DEF4B6D5)
- [内存schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-913335DF-050A-479A-A653-68A064DCCA41)
- [流程schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-85D9852E-5BF1-4AC0-9E5A-49F0570DBD7A)
- [应用和 Oracle 网络服务体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-8A4A6339-417F-4E7C-997B-68206F38A6EC)

## 13 Oracle数据库实例

本章介绍 Oracle 数据库实例的性质、与实例关联的参数和诊断文件，以及在实例创建和打开和关闭数据库期间发生的情况。

本章包含以下部分：

- [Oracle 数据库实例简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-2942B648-70FA-47B4-8950-0CC6884B1F80)
- [数据库实例启动和关闭概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-5FCFB104-8365-4E7B-87A1-736E65D6658F)
- [检查点概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-A6959126-0ECF-40A2-880D-D74A1BFB5BC4)
- [实例恢复概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-728C6BE1-5687-4DC5-B570-D2042C88F935)
- [参数文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-BB6ADD85-55FD-42C4-A847-80F0BACDE790)
- [诊断文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-E329D228-F334-4506-84C1-EC030032C228)





### Oracle 数据库实例简介

数据库**实例**是一组管理数据库文件的内存结构。

在物理级别，CDB 是由语句创建的磁盘上的一组文件。CDB 包含一个或多个用户创建的 PDB。PDB 在属于 CDB 的整个数据文件集中包含自己的一组数据文件。数据库实例管理与 CDB 及其 PDB 关联的数据，并为其用户提供服务。`CREATE DATABASE`

每个正在运行的 CDB 都与至少一个 Oracle 数据库实例相关联。因为实例存在于内存中，而数据库（在最狭义的意义上）是磁盘上的一组文件，所以实例可以在没有数据库的情况下存在，数据库可以在没有实例的情况下存在。





#### 数据库实例结构

启动实例时，Oracle 数据库会分配一个称为**系统全局区域 （SGA）** 的内存区域，并启动一个或多个**后台进程**。

SGA有多种用途，包括：

- 维护许多进程和线程同时访问的内部数据结构
- 缓存从磁盘读取的数据块
- 在将重做数据写入联机重做日志文件之前缓冲重做数据
- 存储 SQL 执行计划

在单台计算机上运行的 Oracle 进程共享 SGA。Oracle 进程与 SGA 关联的方式因操作系统而异。

数据库实例包括后台进程。服务器进程以及在这些进程中分配的进程内存也存在于实例中。当服务器进程终止时，实例将继续运行。

下图显示了 Oracle 数据库实例的主要组件。

图 13-1 数据库实例

![Description of Figure 13-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt325.gif)
[“图 13-1 数据库实例”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt325.html)

另请参阅：

- "[系统全球区域 （SGA） 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-24EDB8CD-8279-4CED-82AF-642FC01A4A73)"
- "[后台进程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D8AE1B78-69D5-4F0F-8BE3-C91AA2514F2D)"





#### 数据库实例配置

Oracle 数据库在单实例配置或 Oracle Real Application Clusters （Oracle RAC） 配置中运行。这些配置是互斥的。

在单实例配置中，数据库和数据库实例之间存在一对一关系。在 Oracle RAC 中，数据库和数据库实例之间存在一对多关系。

下图显示了可能的数据库实例配置。

图 13-2 数据库实例配置

![Description of Figure 13-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt296.gif)
[“图 13-2 数据库实例配置”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt296.html)

无论是在单实例还是 Oracle RAC 配置中，数据库实例一次只与一个数据库关联。您可以启动一个数据库实例并装入（将实例与一个数据库关联），但不能使用同一实例同时**装入**两个数据库。

注：除非另有说明，否则本章讨论单实例数据库配置。

多个实例可以在同一台计算机上并发运行，每个实例访问自己的数据库。例如，一台计算机可以承载两个不同的数据库：和 。一个数据库实例管理 ，而另一个实例管理 。`prod1``prod2``prod1``prod2`

另请参阅：

Oracle [真实应用集群管理和部署指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD900)了解特定于 Oracle RAC 的信息



#### 读/写和只读实例

每个数据库实例都是读/写或只读的。

[**读/写数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5C6F9AB8-385E-409E-A7EB-60FD4CAF893C)（默认）可以处理 DML，并支持来自客户端应用程序的直接连接。相比之下，[**只读数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2BC0C5BC-491A-4DAD-849A-04C8F8E4AC3A)可以处理查询，但不支持修改 DML（、、 和 ）或直接客户端连接。`UPDATE``DELETE``INSERT``MERGE`

注意：除非本手册中另有说明，否则对数据库实例的所有引用均指读/写实例。

在以前的发行版中，所有数据库实例（除非它们访问备用数据库）都是读/写的。从 Oracle 数据库 12c 第 2 版 （12.2） 开始，只读实例和读/写实例可以在单个数据库中共存。此配置对于同时查询和修改数据的并行 SQL 语句很有用，因为读/写实例和只读实例都可以查询，而读/写实例会修改。

与读写实例不同，只读实例具有以下特点：

- 只能打开已由读/写实例打开的数据库
- 禁用许多后台进程，包括检查点和存档程序进程，这些进程不是必需的
- 可以挂载禁用的重做线程或没有任何[**在线重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)的线程

要将实例指定为只读，请将初始化参数设置为 。参数的默认值为 。`INSTANCE_MODE``READ_ONLY``READ_WRITE`

另请参阅：

- “后台进程概述”以了解有关检查点和存档程序[后台进程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D8AE1B78-69D5-4F0F-8BE3-C91AA2514F2D)的更多信息
- "[联机重做日志概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-47557C86-E551-46B5-B28E-28D6C500694E)"
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-E4995F56-001F-4124-8CC0-30EACD6794E3)，了解有关初始化参数的更多信息`INSTANCE_MODE`





#### 数据库实例的持续时间

数据库实例从使用该命令创建数据库实例时开始，在终止时结束。`STARTUP`

在此期间，数据库实例可以将自身与一个且只能与一个数据库关联。此外，实例只能装入数据库一次，关闭数据库一次，打开数据库一次。关闭或关闭数据库后，必须启动*其他*实例以装入并打开此数据库。

下表说明了一个数据库实例尝试重新打开以前关闭的数据库。

表13-1 实例时长说明

| 陈述                                                         | 解释                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| `SQL> STARTUP ORACLE instance started.  Total System Global Area  468729856 bytes Fixed Size                  1333556 bytes Variable Size             440403660 bytes Database Buffers           16777216 bytes Redo Buffers               10215424 bytes Database mounted. Database opened.` | 该命令创建一个实例，该实例装入并打开数据库。`STARTUP`        |
| `SQL> SELECT  TO_CHAR(STARTUP_TIME,'MON-DD-RR HH24:MI:SS')  AS "Inst Start Time" FROM V$INSTANCE;  Inst Start Time ------------------ JUN-18-14 13:14:48` | 此查询显示当前实例的启动时间。                               |
| `SQL> SHUTDOWN IMMEDIATE`                                    | 实例关闭数据库并关闭，结束此实例的生存期。                   |
| `SQL> STARTUP Oracle instance started. . . .`                | 该命令创建一个新实例，然后装入并打开数据库。`STARTUP`        |
| `SQL> SELECT  TO_CHAR(STARTUP_TIME, 'MON-DD-RR HH24:MI:SS') AS "Inst Start Time" FROM V$INSTANCE;  Inst Start Time ------------------ JUN-18-14 13:16:40` | 此查询显示当前实例的启动时间。不同的开始时间表明此实例与关闭数据库的实例不同。 |



#### 数据库实例的标识

多个数据库实例可以驻留在单个主机上。因此，您必须有一种指定要访问的实例的方法。

Oracle [**最佳灵活schema （OFA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D8B36584-1666-43AB-84A4-AB6D662AA952) 规则是一组配置准则，旨在确保 Oracle 安装井井有条。本节中的示例假定 OFA 体系结构。

本节包含以下主题：

- [Oracle基目录](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-3801CE55-0C42-479A-8A56-B47321706BD4)
- [Oracle主目录](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-4CFE4386-F75B-44B0-805A-2944F4ADF833)
- [Oracle 系统标识符 （SID）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-8BB8140D-63ED-454E-AAC3-1964F80D102D)

另请参阅：

[适用于 Linux 的 Oracle 数据库安装指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LABDI-GUID-34434C8B-EBEE-497A-BB92-26B43561B6B1)，了解 OFA 的概述



##### Oracle基目录

Oracle 基目录存储 Oracle 产品的二进制文件。

Oracle 基目录是 Oracle 数据库安装所有者的数据库主目录。主机上可以安装许多 Oracle 数据库，以及许多 Oracle 数据库软件安装所有者。

以下示例显示了操作系统用户帐户的 Oracle 基目录：`oracle`

```
Copy/u01/app/oracle
```

在前面的路径中，是挂载点，是应用程序软件的子树。`/u01/``/u01/app/`

另请参阅：

[适用于 Linux 的 Oracle 数据库安装指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LABDI-LADBI-GUID-3B198883-0AD1-4AB2-9007-059AE32240F0)，了解 Oracle 基础的概述



##### Oracle主目录

Oracle **主目录是 Oracle** 数据库的软件位置。

您必须为每个新安装的 Oracle 数据库软件指定一个新的 Oracle 主目录。默认情况下，Oracle 主目录是 Oracle 基 （） 目录树中的后代。`ORACLE_BASE`

可以在同一主机上的单个 Oracle 基目录内的不同 Oracle 主目录中多次安装此版本或数据库软件的早期版本。由不同用户帐户拥有的不同版本的多个数据库可以同时共存。

以下示例显示了三个不同 Oracle 主目录的完整路径名，它们都位于 的同一 Oracle 基目录中：`/u01/app/oracle/`

```
Copy/u01/app/oracle/product/12.1.0/dbhome_1
/u01/app/oracle/product/12.1.0/dbhome_2
/u01/app/oracle/product/18.0.0/dbhome_1
```

Oracle base （） 之后的路径名部分包括产品版本号（例如 ）和 Oracle 主目录相对目录（例如 ）。该目录包含两个单独的 Oracle 主目录：和 。`/u01/app/oracle/``12.1.0``dbhome_1``/u01/app/oracle/product/12.1.0/``dbhome_1``dbhome_2`

从 Oracle Database 18c 开始，您可以创建只读的 Oracle 主目录作为软件映像。只读的 Oracle 主目录存储二进制文件等静态文件。Oracle 基主目录 （） 位于 中，存储特定于 [**Oracle 主目录**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EF78DA71-8FC0-4E6D-B554-CCA1D036D59F)的动态文件。Oracle 基本配置目录 （） 由 Oracle Base 中的所有 Oracle 主目录共享，用于存储特定于实例的动态文件。`ORACLE_BASE_HOME``ORACLE_BASE/homes/home_name``ORACLE_BASE_CONFIG`

在下面的示例中，第一个路径是只读的 Oracle 主目录，第二个路径是此 Oracle 主目录的 Oracle 基本主目录：

```
Copy/u01/app/oracle/product/18.0.0/ro_dbhome_1
/u01/app/oracle/homes/ro_dbhome_1
```

另请参阅：

Oracle [Database Installation Guide for Linux for Oracle](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LADBI-GUID-8599FF25-C020-4E03-93D2-8D92ADA240A8)，了解 Oracle 主页的概述





##### Oracle 系统标识符 （SID）

**系统标识符 （SID）** 是特定主机上 Oracle 数据库实例的唯一名称。

在 UNIX 和 Linux 上，Oracle 数据库使用 SID 和 Oracle 主值来创建共享内存的密钥。此外，Oracle 数据库默认使用 SID 来查找初始化参数文件，该文件定位相关文件，例如数据库控制文件。

在大多数平台上，环境变量设置 SID，变量设置 Oracle 主页。连接到数据库实例时，客户端可以在 Oracle 网络连接中指定 SID 或使用网络服务名称。Oracle 数据库将服务名称转换为 和 。`ORACLE_SID``ORACLE_HOME``ORACLE_HOME``ORACLE_SID`

传统的读写 Oracle 主页包含特定于实例的文件。但是，当 Oracle 主目录为只读时，特定于实例的文件将单独存储在 Oracle 数据库中。在任一情况下，名称包含 SID 的文件都驻留在 Oracle 基本配置目录 （） 的子目录中。由于这种分离，用户可以使用现有只读 Oracle 主目录中的软件创建数据库，然后使用驻留在新的只读 Oracle 主目录中的软件启动此数据库的实例。`dbs``ORACLE_BASE_CONFIG`

另请参阅：

- "[服务名称](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-C931A159-E1FE-4DB3-A811-510C42516683)"
- 了解如何指定 Oracle SID 的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11074)





### 数据库实例启动和关闭概述

数据库**实例**提供对数据库的用户访问权限。实例和数据库可以处于各种状态。





#### 实例和数据库启动概述

通常，您手动启动实例，然后挂载并打开数据库，使其可供用户使用。可以使用 SQL*Plus 命令、Oracle Enterprise Manager （Enterprise Manager） 或 SRVCTL 实用程序来执行这些步骤。`STARTUP`

要使用 Oracle Net 启动数据库实例，必须满足以下条件：

- 数据库在 Oracle 网络侦听器中静态注册。
- 您的客户端以该特权连接到数据库。`SYSDBA`

侦听器创建一个专用服务器，该服务器可以启动数据库实例。

下图显示了数据库从关闭状态进展到打开状态。

图 13-3 实例和数据库启动顺序

![Description of Figure 13-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt212.gif)
[“图 13-3 实例和数据库启动顺序”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt212.html)

数据库从关闭状态进入打开数据库状态时将经历以下阶段。

表 13-2 实例启动步骤

| 阶段 | 挂载状态                       | 描述                                                         | 了解更多                                                     |
| :--- | :----------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 1    | 实例在未装入数据库的情况下启动 | 实例已启动，但尚未与数据库关联。                             | "[如何启动实例](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-189ADDB5-1E71-4924-8371-F5B2EFB5B304)" |
| 2    | 数据库装入                     | 实例启动并通过读取其[**控制文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)与数据库关联。数据库不对用户开放。 | "[如何装入数据库](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-8180290B-A8B5-493D-91F0-EAE677A6A319)" |
| 3    | 数据库打开                     | 实例已启动并与打开的数据库相关联。授权用户可以访问数据文件中包含的数据。 | "[如何打开数据库](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-46EC6A61-6065-4CE8-BBDA-5A969FE54D36)" |

另请参阅：

- "[Oracle网络侦听器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-D6E2465E-E8E6-4B95-95D3-B9581E264ED1)"
- "[控制文件概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-90EAC9F2-B396-4C59-9821-B03BF7B6BCD0)"
- 了解如何启动实例的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN10063)
- 了解如何使用 SRVCTL 的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN5032)





##### 使用管理员权限连接

数据库启动和关闭是功能强大的管理选项，仅限于使用管理员权限连接到 Oracle 数据库的用户。

普通用户无法控制 Oracle 数据库的当前状态。根据操作系统，以下条件之一为用户建立管理员权限：

- 用户的操作系统权限使他或她能够使用管理员权限进行连接。
- 用户被授予特殊的系统特权，数据库使用密码文件通过网络对数据库管理员进行身份验证。

以下特殊系统特权允许访问数据库实例，即使数据库未打开也是如此：

- `SYSDBA`
- `SYSOPER`
- `SYSBACKUP`
- `SYSDG`
- `SYSKM`

对上述特权的控制不在数据库本身之外。当您以系统权限连接到数据库时，您将处于 拥有的schema中。以 身份连接时，您将处于公共schema中。 特权是特权的子集。`SYSDBA``SYS``SYSOPER``SYSOPER``SYSDBA`

另请参阅：

- "[系统和系统schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97709804-7430-4BD0-AFF4-727B74F6997E)"
- “数据库[安全概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-4D6D2B67-1B65-476D-852A-976E9D153EEC)”，了解数据库管理员的密码文件和身份验证
- [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG577)，了解如何管理管理权限
- 了解系统权限的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11048)
- [Oracle 数据库安装指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GINST)，了解有关操作系统权限组的更多信息





##### 如何启动实例

当 Oracle 数据库启动实例时，它会通过各个阶段进行。

阶段如下：

1. 在特定于平台的默认位置搜索服务器参数文件，如果未找到，则搜索文本[**初始化参数文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-96DC327C-8DBE-4B23-BEA5-9207A5CCD83E)（使用 或 参数指定将覆盖默认行为）`STARTUP``SPFILE``PFILE`
2. 读取参数文件以确定初始化参数的值
3. 根据初始化参数设置分配 SGA
4. 启动Oracle后台进程
5. 打开警报日志和跟踪文件，并以有效的参数语法将所有显式参数设置写入[**警报日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ACC7727F-41AE-47B1-AADB-2585EE828792)

在此阶段，没有数据库与实例关联。需要状态的方案包括数据库创建以及某些备份和恢复操作。`NOMOUNT`

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN00202)了解如何使用服务器参数文件管理初始化参数





##### 如何装入数据库

实例**装入**数据库以将数据库与此实例关联。

为了挂载数据库，实例获取初始化参数中指定的数据库控制文件的名称并打开这些文件。Oracle 数据库读取控制文件以查找打开数据库时将尝试访问的数据文件和联机重做日志文件的名称。`CONTROL_FILES`

在[**装入的数据库中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FEB61320-F0D4-404D-A25B-E9C1D61E066B)，数据库是关闭的，只有数据库管理员才能访问。管理员可以在完成特定维护操作时保持数据库关闭。但是，数据库不可用于正常操作。

如果 Oracle 数据库允许多个实例同时装入同一数据库，则初始化参数设置可以使数据库可供多个实例使用。数据库行为取决于以下设置：`CLUSTER_DATABASE`

- 如果 是（缺省值）用于装入数据库的第一个实例，则只有此实例可以装入数据库。`CLUSTER_DATABASE``false`
- 如果 是第一个实例，则如果其他实例的参数设置设置为 。可以装入数据库的实例数受创建数据库时指定的预定最大值的限制。`CLUSTER_DATABASE``true``CLUSTER_DATABASE``true`

另请参阅：

- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11152)了解如何挂载数据库
- [Oracle 真实应用集群管理和部署指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-1A66952C-D02A-4465-9D7A-0EFEDF809F4E)了解有关将多个实例与单个数据库配合使用的更多信息





##### 如何打开数据库

打开装入的数据库可使其可用于正常的数据库操作。

任何有效用户都可以连接到打开的数据库并访问其信息。通常，数据库管理员打开数据库以使其可供常规使用。

打开数据库时，Oracle 数据库将执行以下操作：

- 打开撤消表空间以外的表空间中的联机数据文件

  如果表空间在先前关闭数据库时处于脱机状态，则当数据库重新打开时，表空间及其相应的数据文件将处于脱机状态。

- 获取撤消表空间

  如果存在多个撤消表空间，则初始化参数指定要使用的撤消表空间。如果未设置此参数，则选择第一个可用的撤消表空间。`UNDO_TABLESPACE`

- 打开联机重做日志文件

另请参阅：

- "[联机和脱机表空间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-DBE61726-0DE6-4A85-A49B-9F5587234A87)"
- "[数据修复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-BCE6455B-0E49-4835-B9AB-2BC70F673F88)"





###### 只读模式

默认情况下，数据库以**读/写模式**打开。在此模式下，用户可以对数据进行更改，从而在联机重做日志中生成重做。或者，您可以以**只读模式**打开，以防止用户事务修改数据。

注：缺省情况下，物理[**备用数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-728D4956-0F56-4D39-A63A-2E3FF5CCEDE4)以只读方式打开。

只读模式将数据库访问限制为只读事务，只读事务无法写入数据文件或联机重做日志文件。但是，数据库可以执行恢复或操作来更改数据库状态，而无需生成重做。例如，在只读模式下：

- 数据文件可以脱机和联机。但是，您不能使永久表空间脱机。
- 可以恢复脱机数据文件和表空间。
- 控制文件仍可用于有关数据库状态的更新。
- 使用该语句创建的临时表空间是读/写的。`CREATE TEMPORARY TABLESPACE`
- 可以继续写入操作系统审核跟踪、跟踪文件和警报日志。

另请参阅：

- [Oracle数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11154)，了解如何以只读模式打开数据库
- [Oracle 数据卫士概念和管理](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SBYDB00706)





###### 数据库文件检查

如果实例尝试打开数据库时不存在任何数据文件或重做日志文件，或者文件存在但未通过一致性测试，则数据库将返回错误。可能需要恢复介质。

另请参阅：

"[备份和恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCE361D9-B486-43B4-B4FD-5722A93203F0)"





#### 数据库和实例关闭概述

在典型用例中，您手动关闭数据库，使用户在执行维护或其他管理任务时无法使用数据库。可以使用 SQL*Plus 命令或企业管理器来执行这些步骤。`SHUTDOWN`

下图显示了从打开状态到持续关机的进度。

图 13-4 实例和数据库关闭顺序

![图 13-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt281.gif)
[“图 13-4 实例和数据库关闭序列”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt281.html)

每当打开的数据库持续关闭时，Oracle 数据库都会自动执行以下步骤。

表 13-3 一致关机的步骤

| 阶段 | 挂载状态       | 描述                                               | 了解更多                                                     |
| :--- | :------------- | :------------------------------------------------- | :----------------------------------------------------------- |
| 1    | 数据库已关闭   | 数据库已装入，但联机数据文件和重做日志文件已关闭。 | "[如何关闭数据库](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-B4C89F06-EED1-448C-AA14-41DF2BD07B3A)" |
| 2    | 数据库已卸载   | 实例已启动，但不再与数据库的控制文件关联。         | "[如何卸载数据库](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-949F8140-35AD-4BF8-AFA8-AD1F525D4CAF)" |
| 3    | 数据库实例关闭 | 数据库实例不再启动。                               | "[如何关闭实例](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-425B8CA6-73A1-47A0-972C-2D0802A57DE5)" |

Oracle 数据库不会在实例故障或 中执行上述所有步骤，这会立即终止实例。`SHUTDOWN ABORT`

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11156)，了解如何关闭数据库





##### 关机模式

具有 或特权的数据库管理员可以使用 SQL*Plus 命令或企业管理器关闭数据库。该命令具有确定关机行为的选项。`SYSDBA``SYSOPER``SHUTDOWN``SHUTDOWN`

下表总结了不同关机模式的行为。

表 13-4 数据库关闭模式

| 数据库行为                                                   | 流产 | 立即的 | 事务 | 正常 |
| :----------------------------------------------------------- | :--- | :----- | :--- | :--- |
| 允许新用户连接                                               | 不   | 不     | 不   | 不   |
| 等待当前会话结束                                             | 不   | 不     | 不   | 是的 |
| 等待当前交易结束                                             | 不   | 不     | 是的 | 是的 |
| 执行[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)并关闭打开的文件 | 不   | 是的   | 是的 | 是的 |

可能的陈述是：`SHUTDOWN`

- `SHUTDOWN ABORT`

  此模式适用于紧急情况，例如没有其他形式的关机成功时。这种关机模式是最快的。但是，后续打开此数据库可能需要更长的时间，因为必须执行实例恢复才能使数据文件保持一致。

  由于不对打开的数据文件执行检查点操作，因此必须先进行实例恢复，然后才能重新打开数据库。其他关闭模式不需要在数据库重新打开之前恢复实例。`SHUTDOWN``ABORT`

  注意：在 CDB 中，在 PDB 上发出 `SHUTDOWN ABORT` 等效于在非 CDB 上发出 `SHUTDOWN INSTANT`。

- `SHUTDOWN IMMEDIATE`

  此模式通常是仅次于的最快模式。Oracle 数据库会终止任何正在执行的 SQL 语句并断开用户的连接。活动事务将终止，未提交的更改将回滚。`SHUTDOWN``ABORT`

- `SHUTDOWN TRANSACTIONAL`

  此模式阻止用户启动新事务，但在关闭之前等待所有当前事务完成。此模式可能需要大量时间，具体取决于当前事务的性质。

- `SHUTDOWN NORMAL`

  这是关机的默认模式。数据库在关闭之前等待所有连接的用户断开连接。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11156)，了解不同的关机模式
- [SQL*Plus 用户指南和参考以了解](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQPUG124)该命令`SHUTDOWN`





##### 如何关闭数据库

数据库关闭操作隐式在数据库关闭中。操作的性质取决于数据库关闭是正常还是异常。





###### 在正常关闭期间如何关闭数据库

当数据库作为 的一部分关闭时，除 以外的任何选项时，Oracle 数据库将 SGA 中的数据写入数据文件和联机重做日志文件。`SHUTDOWN``ABORT`

之后，数据库关闭联机数据文件和联机重做日志文件。离线表空间的所有脱机数据文件都已关闭。当数据库重新打开时，任何脱机的表空间都将保持脱机状态。

在此阶段，数据库已关闭，无法访问以进行正常操作。关闭数据库后，控制文件保持打开状态。





###### 在异常关闭期间如何关闭数据库

如果发生异常终止，则打开的数据库实例将立即关闭和关闭数据库。`SHUTDOWN ABORT`

在异常关闭时，Oracle 数据库不会将 SGA 缓冲区中的数据写入数据文件并重做日志文件。随后重新打开数据库需要实例恢复，Oracle 数据库会自动执行实例恢复。





##### 如何卸载数据库

关闭数据库后，Oracle 数据库将卸载数据库以将其与实例解除关联。

卸载数据库后，Oracle 数据库会关闭数据库的控制文件。此时，数据库实例仍保留在内存中。





##### 如何关闭实例

数据库关闭的最后一步是关闭实例。当数据库实例关闭时，SGA 将停止占用内存，并且后台进程将终止。

在异常情况下，数据库实例可能无法完全关闭。内存结构可能不会从内存中删除，或者其中一个后台进程可能不会终止。当存在前一个实例的残余时，后续实例启动可能会失败。在这种情况下，您可以通过删除前一个实例的残余，然后启动新实例或发出语句来强制启动新实例。`SHUTDOWN ABORT`

在某些情况下，进程清理本身可能会遇到错误，这可能导致进程监视器 （PMON） 或实例终止。动态初始化参数指定延迟内部生成的实例故障的秒数。此延迟使您有机会做出响应。启动延迟终止时，数据库会将一条消息写入[**警报日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ACC7727F-41AE-47B1-AADB-2585EE828792)。在某些情况下，通过允许隔离某些数据库资源，实例可以避免终止。`INSTANCE_ABORT_DELAY_TIME`

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11156)，了解有关数据库关闭的更多详细信息
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-F15A6EC9-1F4F-4DB7-9981-FFC1F181559F)，了解有关初始化参数的更多信息`INSTANCE_ABORT_DELAY_TIME`





### 检查点概述

**检查点**通常是一致数据库关闭、实例恢复和 Oracle 数据库操作中的关键机制。

该术语具有以下相关含义：

- 指示**检查点位置**的数据结构，即必须开始实例恢复的重做流中的 [**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C)

  检查点位置由数据库缓冲区高速缓存中最早的脏缓冲区确定。检查点位置充当指向重做流的指针，并存储在控制文件和每个数据文件头中。

- 将数据库缓冲区高速缓存中修改的[**数据库缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)写入磁盘

另请参阅：

"[系统更改编号 （SCN）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-A2615547-94D2-4346-B156-64C534C5E9E4)"





#### 检查站的目的

Oracle 数据库使用检查点来实现多个目标。

目标包括以下内容：

- 减少实例或介质故障时的恢复时间
- 确保数据库定期将缓冲区缓存中的脏缓冲区写入磁盘
- 确保数据库在一致关闭期间将所有提交的数据写入磁盘





#### 当 Oracle 数据库启动检查点时

**检查点进程 （CKPT）** 负责将检查点写入数据文件头和控制文件。

检查点在各种情况下都会发生。例如，Oracle 数据库使用以下类型的检查点：

- 线程检查点

  数据库将特定目标之前的特定线程中重做修改的所有缓冲区写入磁盘。数据库中所有实例上的线程检查点集就是**数据库检查点**。线程检查点在以下情况下发生：

  - 一致的数据库关闭
  - `ALTER SYSTEM CHECKPOINT`陈述
  - 在线重做日志切换
  - `ALTER DATABASE BEGIN BACKUP`陈述

- 表空间和数据文件检查点

  数据库将重做在特定目标之前修改的所有缓冲区写入磁盘。表空间检查点是一组数据文件检查点，表空间中的每个数据文件对应一个检查点。这些检查点在各种情况下发生，包括使表空间只读或使其正常脱机、收缩数据文件或执行 。`ALTER TABLESPACE BEGIN BACKUP`

- 增量检查点

  增量检查点是一种线程检查点，部分目的是避免在联机重做日志开关上写入大量块。DBW 至少每三秒检查一次，以确定它是否有工作要做。当 DBW 写入脏缓冲区时，它会前进检查点位置，导致 CKPT 将检查点位置写入控制文件，但不写入数据文件头。

其他类型的检查点包括实例和媒体恢复检查点以及删除或截断schema对象时的检查点。

另请参阅：

- "[检查点流程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D3174B3E-BCCA-473F-961E-84A36FD5C372)"
- Oracle [真实应用集群管理和部署指南，了解有关 Oracle](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD039) RAC 中的全局检查点的信息





### 实例恢复概述

**实例恢复**是将联机重做日志中的记录应用于数据文件以重建在最近检查点之后所做的更改的过程。

当管理员尝试打开以前以不一致方式关闭的数据库时，会自动进行实例恢复。





#### 实例恢复的目的

实例恢复可确保数据库在实例故障后处于一致状态。由于 Oracle 数据库管理数据库更改的方式，数据库的文件可能会处于不一致状态。

[**重做线程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68F9BFC2-703C-48FF-BE8C-236FE3BC8977)是实例生成的所有更改的记录。单实例数据库有一个重做线程，而 Oracle RAC 数据库有多个重做线程，每个数据库实例一个重做线程。

提交[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)时，[**日志编写器进程 （LGWR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E96BC851-0B78-4250-8EAB-26EBDF4FE5A6) 会将内存中剩余的重做条目和事务 SCN 写入[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)。但是，[**数据库编写器 （DBW）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C27AAA54-E60B-49BC-AB04-7B3848EBAFD6) 进程会在最有效的时间将修改后的数据块写入数据文件。因此，数据文件中可能暂时存在未提交的更改，而数据文件中尚不存在已提交的更改。

如果打开的数据库实例由于语句或异常终止而失败，则可能导致以下情况：`SHUTDOWN ABORT`

- 事务提交的数据块不会写入数据文件，仅显示在[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)中。这些更改必须重新应用于数据文件。
- 数据文件包含实例失败时尚未提交的更改。必须回滚这些更改以确保事务一致性。

实例恢复仅使用在线重做日志文件和当前在线数据文件来同步数据文件并确保它们一致。

另请参阅：

- “数据库[编写器进程 （DBW）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-DC9CBDED-3978-450A-9D7A-0A94CE8FF233)”和“[数据库缓冲区缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-4FF66585-E469-4631-9225-29D75594CD14)”
- "[数据并发性和一致性简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-7AD41DFA-04E5-4738-B744-C4407170411C)"





#### 当 Oracle 数据库执行实例恢复时

是否需要实例恢复取决于重做线程的状态。

当数据库实例以读/写模式打开时，重做线程在控制文件中标记为打开，当实例始终关闭时，重做线程被标记为关闭。如果重做线程在控制文件中标记为打开，但没有活动实例保存与这些线程对应的线程排队，则数据库需要实例恢复。

Oracle 数据库在以下情况下会自动执行实例恢复：

- 在单实例数据库或 Oracle RAC 数据库的所有实例发生故障后，数据库将首次打开。这种形式的实例恢复也称为**崩溃恢复**。Oracle 数据库一起恢复已终止实例的联机重做线程。
- Oracle RAC 数据库的某些实例（但不是全部）会失败。实例恢复由配置中幸存的实例自动执行。

SMON 后台进程执行实例恢复，自动应用联机重做。无需用户干预。

另请参阅：

- "[系统监视器进程 （SMON）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-21393D94-CA2D-4551-BD20-28BEFDC98631)"
- Oracle [真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD063)，了解 Oracle RAC 数据库中的实例恢复





#### 检查点对实例恢复的重要性

实例恢复使用检查点来确定必须对数据文件应用哪些更改。检查点位置保证 SCN *低于*检查点 SCN 的每个已提交更改都保存到数据文件中。

下图描述了联机重做日志中的重做线程。

图 13-5 联机重做日志中的检查点位置

![Description of Figure 13-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt282.gif)
[“图 13-5 联机重做日志中的检查点位置”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt282.html)

在实例恢复期间，数据库必须应用在检查点位置和重做线程结束之间发生的更改。[如图 13-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-19F515DA-AA77-4138-853B-1C41A759D76E__BABFHDCH) 所示，某些更改可能已写入数据文件。但是，只有 SCN 低于检查点位置的更改才能*保证*在磁盘上。

另请参阅：

[Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-E281EB31-5762-4945-9497-BBB923A6FF50)了解如何限制实例恢复时间





#### 实例恢复阶段

实例恢复的第一阶段称为**缓存恢复**或**前滚**，并将联机重做日志中记录的所有更改重新应用于数据文件。

由于联机重做日志包含撤消数据，因此前滚也会重新生成相应的撤消段。前滚会根据需要通过尽可能多的联机重做日志文件进行，以便及时前滚数据库。前滚后，数据块包含联机重做日志文件中记录的所有已提交更改。这些文件还可能包含未提交的更改，这些更改要么在失败之前保存到数据文件中，要么记录在联机重做日志中并在缓存恢复期间引入。

前滚后，必须撤消任何未提交的更改。Oracle 数据库使用检查点位置，这保证 SCN 低于检查点 SCN 的每个已提交更改都保存在磁盘上。Oracle 数据库应用撤消块来回滚故障之前写入的数据块中或在缓存恢复期间引入的数据块中未提交的更改。此阶段称为**回滚**或[**事务恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C71AA6BE-1272-4B2C-BEDD-1A1F5720046E)。

下图说明了前滚和回滚，这是从数据库实例故障中恢复所需的两个步骤。

图 13-6 基本实例恢复步骤：前滚和回滚

![图 13-6 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt196.gif)
[“图 13-6 基本实例恢复步骤：前滚和回滚”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt196.html)

Oracle 数据库可以根据需要同时回滚多个事务。失败时处于活动状态的所有事务都标记为已终止。新事务可以自行回滚单个块以获取所需的数据，而不是等待 SMON 进程回滚终止的事务。

另请参阅：

- “撤消[区段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-6E206D3A-E0E7-4B23-9C41-516FB35BC3FE)”以了解有关撤消数据的更多信息
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-75455F43-DE5E-456C-BBC7-A28A782EE9D9)讨论实例恢复机制和调优





### 参数文件概述

要启动数据库实例，Oracle 数据库必须读取**服务器**参数文件（建议使用）或**文本初始化参数文件**（旧版实现）。这些文件包含配置参数的列表。

要手动创建数据库，您必须使用参数文件启动实例，然后发出语句。因此，即使数据库本身不存在，实例和参数文件也可以存在。`CREATE DATABASE`





#### 初始化参数

**初始化**参数是影响实例基本操作的配置参数。实例在启动时从文件中读取初始化参数。

Oracle 数据库提供了许多初始化参数，以优化其在各种环境中的操作。只需显式设置其中的几个参数，因为默认值通常就足够了。





##### 初始化参数的函数组

初始化参数属于不同的功能组。

大多数初始化参数属于以下组之一：

- 命名实体（如文件或目录）的参数
- 为进程、数据库资源或数据库本身设置限制的参数
- 影响容量的参数，例如 SGA 的大小（这些参数称为**变量参数**）)

数据库管理员对变量参数特别感兴趣，因为他们可以使用这些参数来提高数据库性能。





##### 基本和高级初始化参数

初始化参数分为两组：基本和高级。

通常，必须仅设置和调整大约 30 个基本参数才能获得合理的性能。基本参数设置数据库名称、控制文件的位置、数据库块大小和撤消表空间等特征。

在极少数情况下，可能需要修改高级参数以获得最佳性能。高级参数使专家 DBA 能够调整 Oracle 数据库的行为以满足独特的要求。

Oracle 数据库在数据库软件随附的初学者初始化参数文件中提供值，或数据库配置助手为您创建的值。您可以编辑这些 Oracle 提供的初始化参数并添加其他参数，具体取决于您的配置以及您计划如何调整数据库。对于参数文件中未包含的相关初始化参数，Oracle 数据库提供默认值。

另请参阅：

- "[用于数据库安装和配置的工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-87ACF317-FEBC-418C-9BE6-253F2C43F482)"
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12541)了解如何指定初始化参数
- 有关初始化参数类型的说明的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN001)
- [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30176)参考，了解 [SQL*Plus 用户指南和语法参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQPUG123)`V$PARAMETER``SHOW PARAMETER`

#### 服务器参数文件

**服务器参数文件**是初始化参数的存储库。

服务器参数文件具有以下关键特征：

- 只有 Oracle 数据库读取和写入服务器参数文件。
- 一个数据库只有一个服务器参数文件。此文件必须驻留在数据库主机上。
- 服务器参数文件是二进制文件，不能由文本编辑器修改。
- 存储在服务器参数文件中的初始化参数是永久性的。数据库实例运行时对参数所做的任何更改都可以在实例关闭和启动后保留。

服务器参数文件消除了为客户端应用程序维护多个文本初始化参数文件的需要。服务器参数文件最初是使用该语句从文本初始化参数文件生成的。它也可以由数据库配置助手直接创建。`CREATE SPFILE`

另请参阅：

- 《[Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11115)了解有关服务器参数文件的更多信息
- 要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01315)`CREATE SPFILE`





#### 文本初始化参数文件

**文本初始化**参数文件是包含初始化参数列表的文本文件。

这种类型的参数文件是参数文件的旧版实现，具有以下关键特征：

- 启动或关闭数据库时，文本初始化参数文件必须与连接到数据库的客户端应用程序位于同一主机上。
- 文本初始化参数文件是基于文本的，而不是二进制的。
- Oracle 数据库可以读取但不能写入文本初始化参数文件。要更改参数值，您必须使用文本编辑器手动更改文件。
- 对初始化参数值的更改仅对当前实例有效。您必须手动更新文本初始化参数文件并重新启动实例才能知道更改。`ALTER SYSTEM`

文本初始化参数文件包含一系列对，每行一个。例如，初始化参数文件的一部分可能如下所示：`key=value`

```
Copydb_name=sample
control_files=/disk1/oradata/sample_cf.dbf
db_block_size=8192
open_cursors=52
undo_management=auto
shared_pool_size=280M
pga_aggregate_target=29M
.
.
.
```

为了说明文本参数文件可能产生的可管理性问题，假定您使用计算机，并且必须能够在任一计算机上使用 SQL*Plus 启动数据库。在这种情况下，必须存在两个单独的文本初始化参数文件，每台计算机上一个，如图 [13-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-2F760754-174C-4A30-800C-8A147561B64C__BABEEAJB) 所示。服务器参数文件解决了参数文件激增的问题。`clienta``clientb`

图 13-7 多个初始化参数文件

![Description of Figure 13-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt247.gif)
[“图 13-7 多个初始化参数文件”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt247.html)

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11099)，了解有关文本初始化参数文件的更多信息
- 要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01308)`CREATE PFILE`





#### 修改初始化参数值

您可以调整初始化参数以修改数据库的行为。参数的分类是**静态**的还是**动态**的，决定了如何修改它们。

下表总结了这些差异。

表 13-5 静态和动态初始化参数

| 特征                                                         | 静态的 | 动态 |
| :----------------------------------------------------------- | :----- | :--- |
| 需要修改参数文件（文本或服务器）                             | 是的   | 不   |
| 在设置生效之前需要重新启动数据库实例                         | 是的   | 不   |
| 在 [Oracle 数据库引用](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN00102)初始化参数条目中描述为“可修改” | 不     | 是的 |
| 只能对数据库或实例进行修改                                   | 是的   | 不   |

静态参数包括 、 和 。动态参数分为会话级参数（仅影响当前用户会话）和**系统级参数**（影响数据库和所有**会话**）。例如， 是系统级参数，而 是会话级参数。`DB_BLOCK_SIZE``DB_NAME``COMPATIBLE``MEMORY_TARGET``NLS_DATE_FORMAT`

参数**更改的范围取决于**更改何时生效。使用服务器参数文件启动实例后，可以使用该语句更改系统级参数的值，如下所示：`ALTER SYSTEM SET`

- `SCOPE=MEMORY`

  更改仅适用于数据库实例。如果关闭并重新启动数据库，则更改不会保留。

- `SCOPE=SPFILE`

  更改适用于服务器参数文件，但不会影响当前实例。因此，在重新启动实例之前，更改不会生效。

  注：更改 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN00102)中描述为不可修改的参数的值时，必须指定 `SPFILE`。

- `SCOPE=BOTH`

  Oracle 数据库将更改写入内存和服务器参数文件。这是数据库使用服务器参数文件时的默认作用域。

数据库将初始化参数的新值和旧值打印到警报日志中。作为预防措施，数据库会验证基本参数的更改，以防止将无效值写入服务器参数文件。

另请参阅：

- "[特定于区域设置的设置](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-FD06164D-2938-497D-B26D-D7603D08B3AD)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11119)了解如何更改初始化参数设置
- 有关所有初始化参数说明的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN001)
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF00902)`ALTER SYSTEM`





### 诊断文件概述

Oracle 数据库包括故障诊断**能力基础设施**，用于预防、检测、诊断和解决数据库问题。问题包括严重错误，例如代码错误、元数据损坏和客户数据损坏。

高级故障诊断基础结构的目标如下：

- 主动检测问题
- 在检测到问题后限制损坏和中断
- 减少问题诊断和解决时间
- 通过启用对跟踪文件进行分区、允许用户定义每段大小和要保留的最大段数以及在达到用户指定的磁盘空间限制后禁用跟踪来提高可管理性
- 通过 Oracle 支持服务简化客户交互

多租户容器数据库 （CDB） 和非 CDB 具有体系结构差异。除非另有说明，否则本节假定非 CDB 的体系结构。

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN13884)，了解如何在 CDB 中管理诊断文件





#### 自动诊断存储库

**自动诊断存储库 （ADR）** 是基于文件的存储库，用于存储数据库诊断数据，例如跟踪文件、警报日志、DDL 日志和运行状况监视器报告。

ADR的主要特征包括：

- 统一目录结构
- 一致的诊断数据格式
- 统一的工具集

上述特征使客户和 Oracle 支持部门能够跨多个 Oracle 实例、组件和产品关联和分析诊断数据。

ADR 位于数据库*外部*，这使得 Oracle 数据库能够在物理数据库不可用时访问和管理 ADR。数据库实例可以在创建数据库之前创建 ADR。





##### 问题和事件

ADR 主动跟踪**问题**，即数据库中的严重错误。

严重错误表现为内部错误，例如 或其他严重错误。每个问题都有一个问题**键**，即描述问题的文本字符串。`ORA-600`

当问题多次发生时，ADR 会为每次出现创建一个带时间戳**的事件**。事件由数字**事件 ID** 唯一标识。发生事件时，ADR 会向企业管理器发送**事件警报**。严重错误的诊断和解决通常从事件警报开始。

由于问题可能会在短时间内生成许多事件，因此 ADR 在达到特定阈值后将洪水控制应用于事件生成。**洪水控制**事件会生成警报日志条目，但不生成事件转储。这样，ADR 会通知您正在发生严重错误，而不会使系统过载诊断数据。

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11257)，了解有关故障诊断基础设施的详细信息





##### 替代性争议解决机制结构

**ADR 基础是 ADR** 根目录。

ADR 基可以包含多个 ADR 主目录，其中每个 [**ADR 主**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-89658C05-F8DE-4DEC-9F79-E28B229C87CC)目录是 Oracle 产品或组件实例的所有诊断数据（跟踪、转储、警报日志等）的根目录。例如，在具有共享存储和 Oracle ASM 的 Oracle RAC 环境中，每个数据库实例和每个 Oracle ASM 实例都有自己的 ADR 主目录。

[图 13-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-C1510B39-9583-4B97-8E69-8A5B7EB7B356__BABBCEEE) 说明了数据库实例的 ADR 目录层次结构。其他 Oracle 产品或组件（如 Oracle ASM 或 Oracle Net Services）的其他 ADR 主目录可以存在于此层次结构中，位于同一 ADR 基数下。

图 13-8 Oracle 数据库实例的 ADR 目录结构

![Description of Figure 13-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin077.gif)
[“Oracle 数据库实例的 Figure 13-8 ADR 目录结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin077.html)

如以下 Linux 示例所示，当您在创建数据库*之前*使用唯一的 SID 和数据库名称启动实例时，Oracle 数据库默认在主机文件系统中创建 ADR 作为目录结构。SID 和数据库名称构成 ADR 主页中文件的路径名的一部分。

示例 13-1 创建 ADR

```
Copy% setenv ORACLE_SID osi
% echo "DB_NAME=dbn" > init.ora
% sqlplus / as sysdba
.
.
. 
Connected to an idle instance.
 
SQL> STARTUP NOMOUNT PFILE="./init.ora"
ORACLE instance started.
 
Total System Global Area  146472960 bytes
Fixed Size                  1317424 bytes
Variable Size              92276176 bytes
Database Buffers           50331648 bytes
Redo Buffers                2547712 bytes
 
SQL> COL NAME FORMAT a21
SQL> COL VALUE FORMAT a60
SQL> SELECT NAME, VALUE FROM V$DIAG_INFO;
 
NAME                  VALUE
--------------------- --------------------------------------------------------
Diag Enabled          TRUE
ADR Base              /d1/3910926111/oracle/log
ADR Home              /d1/3910926111/oracle/log/diag/rdbms/dbn/osi
Diag Trace            /d1/3910926111/oracle/log/diag/rdbms/dbn/osi/trace
Diag Alert            /d1/3910926111/oracle/log/diag/rdbms/dbn/osi/alert
Diag Incident         /d1/3910926111/oracle/log/diag/rdbms/dbn/osi/incident
Diag Cdump            /d1/3910926111/oracle/log/diag/rdbms/dbn/osi/cdump
Health Monitor        /d1/3910926111/oracle/log/diag/rdbms/dbn/osi/hm
Default Trace File    /d1/3910926111/oracle/log ... osi/trace/osi_ora_6825.trc
Active Problem Count  0
Active Incident Count 0
```





#### 警报日志

每个数据库都有一个**警报日志**，这是一个 XML 文件，其中包含按时间顺序排列的数据库消息和错误的日志。

警报日志内容包括以下内容：

- 所有内部错误 （）、块损坏错误 （） 和[**死锁**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E33D1853-7F99-4FDD-9CC7-D6308E943D61)错误 （`ORA-600``ORA-1578``ORA-60`)
- 管理操作，如 SQL*Plus 命令、、 和`STARTUP``SHUTDOWN``ARCHIVE LOG``RECOVER`
- 与共享服务器和调度程序进程的功能相关的几条消息和错误
- 实例化视图自动刷新期间的错误

Oracle 数据库使用警报日志作为在企业管理器 GUI 中显示信息的替代方法。如果管理操作成功，则 Oracle 数据库会将一条消息作为“已完成”写入警报日志，并带有时间戳。

首次启动数据库实例时，Oracle 数据库会在[图 13-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-C1510B39-9583-4B97-8E69-8A5B7EB7B356__BABBCEEE) 所示的子目录中创建警报日志，即使尚未创建数据库也是如此。此文件采用 XML 格式。trace 子目录包含一个纯文本警报日志，其一部分显示在以下示例中：`alert`

```
CopyFri Nov 02 12:41:58 2014
SMP system found. enable_NUMA_support disabled (FALSE)
Starting ORACLE instance (normal)
CLI notifier numLatches:3 maxDescs:189
LICENSE_MAX_SESSION = 0
LICENSE_SESSIONS_WARNING = 0
Initial number of CPU is 2
Number of processor cores in the system is 2
Number of processor sockets in the system is 2
Shared memory segment for instance monitoring created
Picked latch-free SCN scheme 3
Using LOG_ARCHIVE_DEST_1 parameter default value as /disk1/oracle/dbs/arch
Autotune of undo retention is turned on.
IMODE=BR
ILAT =10
LICENSE_MAX_USERS = 0
SYS auditing is disabled
NOTE: remote asm mode is local (mode 0x1; from cluster type)
Starting up:
Oracle Database 12c Enterprise Edition Release 12.1.0.1.0 - 64bit Production
With the Partitioning, Advanced Analytics and Real Application Testing options.
.
.
.
Using parameter settings in client-side pfile 
System parameters with nondefault values:
  processes                = 100
  sessions                 = 172
```

如[示例 13-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-C1510B39-9583-4B97-8E69-8A5B7EB7B356__BABGCIDC) 所示，查询以查找警报日志。`V$DIAG_INFO`





#### DDL 日志

DDL 日志与警报日志具有相同的格式和基本行为，但仅包含 **DDL** 语句和详细信息。数据库将 DDL 信息写入其自己的文件，以减少警报日志中的混乱。

DDL 日志记录是 DDL 文本，可以选择使用补充信息进行扩充。每个 DDL 语句都有一个日志记录。DDL 日志存储在 ADR 主目录的子目录中。`log/ddl`





#### 跟踪文件

**跟踪文件**是包含用于调查问题的诊断数据的文件。此外，跟踪文件还可以为优化应用程序或实例提供指导。

另请参阅：

"[性能和调优](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-045B9963-F53D-427C-87B7-04858B22D4D8)"





##### 跟踪文件的类型

每个服务器和后台进程都可以定期写入关联的跟踪文件。这些文件包含有关进程环境、状态、活动和错误的信息。

SQL 跟踪工具还创建跟踪文件，这些文件提供有关各个 SQL 语句的性能信息。您可以通过多种方式启用对客户端标识符、服务、模块、操作、会话、实例或数据库的跟踪。例如，可以在包中执行相应的过程或设置事件。`DBMS_MONITOR`

另请参阅：

- "[会话控制语句](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-261BEAAC-0897-465D-9137-D201CE80675C)"
- 了解跟踪文件、转储和核心文件的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11263)
- 了解应用跟踪的 [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL791)





##### 跟踪文件的位置

ADR 将跟踪文件存储在子目录中。跟踪文件名取决于平台，并使用扩展名 。`trace``.trc`

通常，数据库后台进程跟踪文件名包含 Oracle SID、后台进程名称和操作系统进程号。进程的跟踪文件示例是。`RECO``mytest_reco_10355.trc`

服务器进程跟踪文件名包含 Oracle SID、字符串和操作系统进程号。服务器进程跟踪文件名的一个示例是。`ora``mytest_ora_10304.trc`

有时跟踪文件具有相应的跟踪元数据文件，这些文件以扩展名 .这些文件包含称为**跟踪映射**的结构信息，数据库用于搜索和导航。`.trm`

另请参阅：

- "[图 13-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-C1510B39-9583-4B97-8E69-8A5B7EB7B356__BABBCEEE)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12484)了解如何查找跟踪文件





##### 跟踪文件的分段

当跟踪文件大小有限时，数据库可能会自动将其拆分为最多五个段。段是与活动跟踪文件同名但附加了段号的单独文件，如 中所示。`ora_1234_2.trc`

每个段通常为 由 设置的限制的 20%。当所有段的总大小超过限制时，数据库将删除最旧的段（尽管从不删除第一个段，其中可能包含有关进程初始状态的相关信息），然后创建一个新的空段。`MAX_DUMP_FILE_SIZE`

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11244)了解如何控制跟踪文件的大小





#### 诊断转储

**诊断转储**文件是一种特殊类型的跟踪文件，其中包含有关状态或结构的详细时间点信息。

跟踪往往是诊断数据的连续输出。相比之下，转储通常是响应事件的诊断数据的一次性输出。





##### 跟踪转储和事件

大多数转储都是由于事件而发生的。

事件发生时，数据库会将一个或多个转储写入为事件创建的事件目录。事件转储还包含文件名中的事件编号。

在事件创建期间，应用程序可能会将堆或系统状态转储作为操作的一部分。在这种情况下，数据库会将转储名称追加到事件文件名，而不是默认跟踪文件名。例如，由于进程中发生事件，数据库会创建文件 。事件中的转储会生成文件 ，其中 是事件的数字 ID。作为事件的一部分创建的堆转储操作会生成堆转储文件 ，其中 是跟踪转储的数字 ID。`prod_ora_90348.trc``prod_ora_90348_incident_id.trc``incident_id``prod_ora_90348_incident_id_dump_id.trc``dump_id`

## 14 内存schema

本章讨论数据库实例的内存体系结构。

本章包含以下部分：

- [Oracle 数据库内存结构简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1A40F9B9-EB2F-4060-9007-7B26C033A774)
- [用户全球区域概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-61B574AB-8493-4D43-8B30-0050A30550AD)
- [计划全球区域 （PGA） 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-859795E2-87CD-442B-B36F-584A77755F59)
- [系统全球区域 （SGA） 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-24EDB8CD-8279-4CED-82AF-642FC01A4A73)
- [软件代码区概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-EE4E1B4E-1C00-499F-B00E-2637B7E19963)

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN00207)了解配置和管理内存的说明





### Oracle 数据库内存结构简介

启动实例时，Oracle 数据库会分配内存区域并启动后台进程。

内存区域存储如下信息：

- 程序代码
- 有关每个已连接[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)的信息，即使它当前未处于活动状态
- 程序执行期间所需的信息，例如，从中获取行的[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)的当前状态
- 在进程之间共享和通信的信息，例如[**锁定**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6D016291-A487-4F88-BE0B-ACF8FA2AE72C)数据
- 磁盘上也存在的缓存数据，例如数据块和重做记录

另请参阅：

"[流程schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-85D9852E-5BF1-4AC0-9E5A-49F0570DBD7A)"





#### 基本内存结构

Oracle 数据库包括多个内存区域，每个内存区域包含多个子组件。

与 Oracle 数据库相关的基本内存结构包括：

- 系统全局区域 （SGA）

  SGA 是一组共享内存结构，称为 *SGA 组件*，其中包含一个 Oracle 数据库实例的数据和控制信息。所有服务器和后台进程共享 SGA。SGA 中存储的数据示例包括缓存数据块和共享 SQL 区域。

- 计划全球区域 （PGA）

  PGA 是一个非共享内存区域，其中包含专门供 Oracle 进程使用的数据和控制信息。Oracle 数据库在 Oracle 进程启动时创建 PGA。

  每个服务器进程和后台[**进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E660AC1C-B704-4DC1-A35A-DB49EFB34F4A)都存在一个 PGA。单个 PGA 的集合是总实例 PGA 或[**实例 PGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8341392A-07AD-45A0-8E71-E330584EEE74)。数据库初始化参数设置实例 PGA 的大小，而不是单个 PGA 的大小。

- 用户全局区域 （UGA）

  UGA 是与用户会话关联的内存。

- 软件代码区

  软件代码区是内存的一部分，用于存储正在运行或可以运行的代码。Oracle 数据库代码存储在软件区域中，该区域通常与用户程序位于不同的位置，即更独占或受保护的位置。

下图说明了这些内存结构之间的关系。

图 14-1 Oracle 数据库内存结构

![Description of Figure 14-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt217.gif)
[“图 14-1 Oracle 数据库内存结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt217.html)





#### Oracle数据库内存管理

内存管理涉及在数据库需求更改时维护 Oracle 实例内存结构的最佳大小。Oracle 数据库根据内存相关初始化参数的设置来管理内存。

内存管理的基本选项如下：

- 自动内存管理

  您可以指定数据库实例内存的目标大小。实例会自动调整到目标内存大小，根据需要在 SGA 和实例 PGA 之间重新分配内存。

- 自动共享内存管理

  此管理模式是部分自动化的。您可以为 SGA 设置目标大小，然后选择为 PGA 设置聚合目标大小或单独管理 PGA 工作区。

- 手动内存管理

  您无需设置总内存大小，而是设置许多初始化参数来单独管理 SGA 和实例 PGA 的组件。

如果使用数据库配置助手 （DBCA） 创建数据库并选择基本安装选项，则缺省情况下将自动内存管理。

另请参阅：

- “[内存管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D39DB708-CC94-4EE6-ACDA-ACED36DA4DA5)”，了解有关 DBA 内存管理选项的更多信息
- “[数据库安装和配置工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-87ACF317-FEBC-418C-9BE6-253F2C43F482)”以了解 DBCA
- 了解内存管理选项的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11197)





### 用户全球区域概述

UGA 是会话内存，它是为会话变量（如登录信息）和数据库会话所需的其他信息分配的内存。本质上，UGA 存储会话状态。

下图描述了 UGA。

图 14-2 用户全局区域 （UGA）

![Description of Figure 14-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt222.gif)
[“图 14-2 用户全局区域 （UGA）”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt222.html)

如果会话将 [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FE40E95B-5EB8-46D6-8ED2-5DB2D26C8726) 包加载到内存中，则 UGA 包含包状态，即在特定时间存储在所有*包*变量中的值集。当包子程序更改变量时，包状态会更改。默认情况下，包变量对于会话是唯一的，并在会话的生存期内保持不变。

[**OLAP 页池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D802897B-B87B-462C-9E55-5C36226CE128)也存储在 UGA 中。此池管理 [**OLAP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A6734D1E-A45B-4BE3-ABF8-F6201A40F6B3) 数据页，这些数据页等效于数据块。页面池在 OLAP 会话开始时分配，并在会话结束时释放。每当用户查询维度对象（如[**多维数据集**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A41DC92E-57F1-4ECB-96EA-E641EEC33748)）时，OLAP 会话都会自动打开。

UGA 必须在会话的生存期内可用于数据库会话。因此，使用[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)连接时，无法将 UGA 存储在 PGA 中，因为 PGA 特定于单个进程。因此，当使用共享服务器连接时，UGA 存储在 SGA 中，使任何共享服务器进程都可以访问它。使用[**专用服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8B14C804-9D68-471C-A581-5AEE673A9FCD)连接时，UGA 存储在 PGA 中。

另请参阅：

- "[PL/SQL 包](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-87FA8137-A449-4542-8869-441C63810C63)"
- "[连接和会话](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-3A11FF2F-50EE-4839-A1A6-F746DFF634AB)"
- 了解共享服务器连接的 [Oracle 数据库网络服务管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG210)
- Oracle OLAP [用户指南，了解 Oracle OLAP](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OLAUG100) 的概述





### 计划全球区域 （PGA） 概述

PGA 是特定于操作系统或线程的内存，不由系统上的其他进程或线程共享。由于 PGA 是特定于流程的，因此永远不会在 SGA 中分配。

PGA 是一个内存堆，其中包含专用或共享服务器进程所需的会话相关变量。服务器进程分配它在 PGA 中所需的内存结构。

PGA的类比是文件职员使用的临时台面工作区。在此类比中，文件职员是代表客户（客户端进程）执行工作的服务器进程。职员清理台面的一部分，使用工作区存储有关客户请求的详细信息并对客户请求的文件夹进行排序，然后在工作完成后放弃空间。

下图显示了未为共享服务器配置的实例的实例 PGA（所有 PGA 的集合）。您可以使用初始化参数设置实例 PGA 的目标最大大小。单个PGA可以根据需要增长到此目标规模。

图 14-3 实例 PGA

![图 14-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt218.gif)
[“图 14-3 实例 PGA”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt218.html)

注意：后台进程还会分配自己的 PGA。此讨论仅侧重于服务器进程 PGA。

另请参阅：

"[内存管理方法摘要](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-17DC29B0-9741-4B80-8091-D9E1A886B357)"





#### 职业高尔夫球协会的内容

PGA细分为不同的区域，每个区域都有不同的目的。

下图显示了专用服务器会话的 PGA 的可能内容。并非所有PGA区域在每种情况下都存在。

图14-4 PGA内容

![Description of Figure 14-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt219.gif)
[“图 14-4 PGA 内容”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt219.html)





##### 专用 SQL 区域

**专用 SQL 区域**保存有关已解析的 SQL 语句的信息和其他特定于会话的信息以进行处理。

当服务器进程执行 SQL 或 PL/SQL 代码时，该进程使用专用 SQL 区域来存储[**绑定变量**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-456A73CB-75F4-4197-B1CD-12A51A1CBDC7)值、查询执行状态信息和查询执行工作区。

不要将 PGA 中的*专用* SQL 区域与在 SGA 中存储执行计划的*共享* SQL 区域混淆。相同或不同会话中的多个专用 SQL 区域可以指向 SGA 中的单个执行计划。例如，在一个会话中执行 20 次，在不同会话中执行 10 次同一查询可以共享同一个计划。每个执行的专用 SQL 区域不共享，可能包含不同的值和数据。`SELECT * FROM sales`

[**游标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D1D3E8DD-CD5C-4C0D-93E4-DE0BF0BD53A3)是特定专用 SQL 区域的名称或句柄。如下图所示，您可以将游标视为客户端上的指针和服务器端的状态。由于游标与专用 SQL 区域密切相关，因此这些术语有时可以互换使用。

图 14-5 光标

![Description of Figure 14-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt324.gif)
[“图 14-5 光标”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt324.html)

专用 SQL 区域分为以下区域：

- 运行时区域

  此区域包含查询执行状态信息。例如，运行时区域跟踪到目前为止在[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)中检索到的行数。

  Oracle 数据库创建运行时区域作为执行请求的第一步。对于 [**DML**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5F2F112-1B33-41B5-B63D-9DC8F99A369D) 语句，当 SQL 语句关闭时，将释放运行时区域。

- 持久区域

  此区域包含[**绑定变量**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-456A73CB-75F4-4197-B1CD-12A51A1CBDC7)值。执行 SQL 语句时，会在运行时向 SQL 语句提供绑定变量值。仅当游标关闭时，才会释放持久区域。

客户端进程负责管理专用 SQL 区域。私有 SQL 区域的分配和解除分配在很大程度上取决于应用程序，尽管客户端进程可以分配的私有 SQL 区域的数量受初始化参数的限制。`OPEN_CURSORS`

尽管大多数用户依赖于数据库实用程序的自动游标处理，但 Oracle 数据库编程接口为开发人员提供了对游标的更多控制。通常，应用程序应关闭所有不会再次使用的打开游标，以释放持久区域并最大程度地减少应用程序用户所需的内存。

另请参阅：

- "[共享 SQL 区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-0DBEB809-0660-4A04-ADF6-CABE4F6DF0B8)"
- Oracle [数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00903)和 [Oracle Database PL/SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS00602)，了解如何使用游标





##### SQL 工作区

**工作区**是用于内存密集型操作的 PGA 内存的专用分配。

例如，排序运算符使用排序区域对一组行进行排序。同样，哈希[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2587A67-E1CB-4F35-8830-4599717C47BC)运算符使用哈希区域从其左侧输入生成[**哈希表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1EBD10A8-7E0A-45B9-94CB-0859F4773082)，而位图合并使用位图合并区域合并从多个[**位图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-85F90309-D2DA-455C-A726-81C33043566E)索引扫描中检索到的数据。

以下示例显示了与其[**查询计划的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)：`employees``departments`

```
CopySQL> SELECT * 
  2  FROM   employees e JOIN departments d 
  3  ON     e.department_id=d.department_id 
  4  ORDER BY last_name;
.
.
.
--------------------------------------------------------------------------------
| Id| Operation           | Name        | Rows  | Bytes | Cost (%CPU)| Time    |
--------------------------------------------------------------------------------
| 0 | SELECT STATEMENT    |             |   106 |  9328 |    7  (29)| 00:00:01 |
| 1 |  SORT ORDER BY      |             |   106 |  9328 |    7  (29)| 00:00:01 |
|*2 |   HASH JOIN         |             |   106 |  9328 |    6  (17)| 00:00:01 |
| 3 |    TABLE ACCESS FULL| DEPARTMENTS |    27 |   540 |    2   (0)| 00:00:01 |
| 4 |    TABLE ACCESS FULL| EMPLOYEES   |   107 |  7276 |    3   (0)| 00:00:01 |
--------------------------------------------------------------------------------
```

在前面的示例中，运行时区域跟踪全表扫描的进度。会话在哈希区域中执行哈希联接，以匹配两个表中的行。排序发生在排序区域中。`ORDER BY`

如果操作员要处理的数据量不适合工作区，则 Oracle 数据库会将输入数据分成更小的部分。通过这种方式，数据库处理内存中的一些数据片段，同时将其余数据片段写入临时磁盘存储以供以后处理。

启用自动 PGA 内存管理时，数据库会自动调整工作区大小。您还可以手动控制和调整工作区的大小。有关详细信息，请参阅“[内存管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D39DB708-CC94-4EE6-ACDA-ACED36DA4DA5)”。

通常，较大的工作区域可以显著提高操作员的性能，但代价是内存消耗更高。理想情况下，工作区的大小足以容纳其关联的 SQL 运算符分配的输入数据和辅助内存结构。否则，响应时间会增加，因为部分输入数据必须缓存在磁盘上。在极端情况下，如果工作区的大小与输入数据大小相比太小，则数据库必须对数据片段执行多次传递，从而大大增加响应时间。

另请参阅：

- 《[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11233)》，了解如何使用自动 PGA 管理
- [Oracle 数据库性能调优指南，了解如何调优](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA346) PGA 内存





#### 专用和共享服务器模式下的 PGA 用法

PGA 内存分配取决于数据库是使用专用服务器连接还是共享服务器连接。

下表显示了差异。

表 14-1 专用服务器和共享服务器之间的内存分配差异

| 内存区域                          | 专用服务器       | 共享服务器       |
| :-------------------------------- | :--------------- | :--------------- |
| 会话内存的性质                    | 私人             | 共享             |
| 持久区域的位置                    | 职业高尔夫球协会 | 新加坡金融管理局 |
| DML 和 DDL 语句的运行时区域的位置 | 职业高尔夫球协会 | 职业高尔夫球协会 |

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-1EC99B97-38DC-4061-A2F5-3890828616B5)，了解如何为共享服务器配置数据库





### 系统全球区域 （SGA） 概述

**SGA** 是一个读/写内存区域，它与 Oracle 后台进程一起构成一个数据库实例。

注意：服务器和后台进程不驻留在 SGA 中，而是存在于单独的内存空间*中*。

代表用户执行的所有服务器进程都可以读取实例 SGA 中的信息。在数据库操作期间，多个进程写入 SGA。

每个数据库实例都有自己的 SGA。Oracle 数据库会在实例启动时自动为 SGA 分配内存，并在实例关闭时回收内存。当您使用 SQL*Plus 或 Oracle Enterprise Manager 启动实例时，SGA 的大小如下图所示：

```
CopySQL> STARTUP
ORACLE instance started.
 
Total System Global Area  368283648 bytes
Fixed Size                  1300440 bytes
Variable Size             343935016 bytes
Database Buffers           16777216 bytes
Redo Buffers                6270976 bytes
Database mounted.
Database opened.
```

[如图 14-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-02378E7A-865B-456B-8725-1E73D16A34BE__CHDHAHIJ) 所示，SGA 由多个内存组件组成，这些组件是用于满足特定类别的内存分配请求的内存池。除重做日志缓冲区之外的所有 SGA 组件都以称为*颗粒*的连续内存单位分配和释放空间。颗粒大小因平台而异，由总 SGA 大小决定。

您可以查询视图以获取有关 SGA 组件的信息。`V$SGASTAT`

最重要的SGA组件如下：

- [数据库缓冲区缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-4FF66585-E469-4631-9225-29D75594CD14)
- [内存中区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-80C1C6A3-3E48-4868-ACA1-370C4D341209)
- [重做日志缓冲区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-C2AD1BF6-A5AE-42E9-9677-0AA08126864B)
- [共享池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1CB2BA23-4386-46DA-9146-5FE0E4599AC6)
- [大型游泳池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1ECB5213-AC4E-4BB4-9113-91C761676B34)
- [爪哇池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-51234BB8-1976-4670-8BC5-BB0E3D3BA12D)
- [固定 SGA](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-F18E4E7F-2ED9-4734-A6E4-4E77D0561C19)
- [可选的与性能相关的 SGA 子区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-9933962C-2D8C-4EC6-9FBE-E9F4AA1B4851)

另请参阅：

- "[Oracle 数据库实例简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-2942B648-70FA-47B4-8950-0CC6884B1F80)"
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-8059B22B-0F5F-4492-A6D0-256E6FDF1E59)，了解有关粒度调整的更多信息





#### 数据库缓冲区缓存

**数据库**缓冲区高速缓存（也称为*缓冲区高速缓存*）是存储从数据文件中读取的数据块副本的内存区域。

缓冲区是[**缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F789350A-9B90-4361-9BEF-68DECB15E755)管理器在其中临时缓存当前或最近使用的数据块的主内存地址。并发连接到数据库实例的所有用户共享对缓冲区缓存的访问权限。





##### 数据库缓冲区缓存的用途

Oracle 数据库使用缓冲区缓存来实现多个目标。

目标包括：

- 优化物理 I/O

  数据库更新缓存中的数据块，并将有关更改的元数据存储在重做日志缓冲区中。之后，数据库会将重做缓冲区写入联机重做日志，但不会立即将数据块写入数据文件。相反，[**数据库编写器 （DBW）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C27AAA54-E60B-49BC-AB04-7B3848EBAFD6) 在后台执行延迟写入。`COMMIT`

- 将经常访问的块保留在缓冲区缓存中，并将不经常访问的块写入磁盘

  启用数据库智能闪存缓存（闪存缓存）后，部分缓冲区缓存可以驻留在闪存缓存中。此缓冲区缓存扩展存储在一个或多个闪存磁盘设备上，这些设备是使用闪存的固态存储设备。数据库可以通过在闪存中缓存缓冲区而不是从磁盘读取来提高性能。

  使用 和 初始化参数配置多个闪存设备。缓冲区缓存跟踪每个设备，并将缓冲区均匀地分配给设备。`DB_FLASH_CACHE_FILE``DB_FLASH_CACHE_SIZE`

  注：数据库智能闪存缓存仅在 Solaris 和 Oracle Linux 中可用。

另请参阅：

了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10315)`DB_FLASH_CACHE_FILE`





##### 缓冲状态

数据库使用内部算法来管理缓存中的缓冲区。

缓冲区可以处于以下任何互斥状态：

- 闲置

  缓冲区可供使用，因为它从未使用过或当前未使用。这种类型的缓冲区是数据库最容易使用的。

- 干净

  此缓冲区之前使用过，现在包含截至某个时间点的块的读取一致性版本。该块包含数据，但“干净”，因此不需要检查点。数据库可以固定块并重复使用它。

- 脏

  缓冲区包含尚未写入磁盘的已修改数据。数据库在重用块之前必须对块执行检查点操作。

每个缓冲区都有访问模式：固定或自由（未固定）。缓冲区“固定”在缓存中，以便在用户会话访问缓冲区时不会耗尽内存。多个会话不能同时修改固定缓冲区。





##### 缓冲模式

当客户端请求数据时，Oracle 数据库会以当前模式或一致模式从数据库缓冲区缓存中检索缓冲区。

模式差异如下：

- 电流模式

  当前[**模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FEFF09C7-3935-4DA6-B85B-BB1350B79C14) get，也称为数据库块 get，是对当前出现在缓冲区缓存中的*块*的检索。例如，如果一个未提交的事务更新了一个块中的两行，那么当前模式 get 会检索包含这些未提交行的块。数据库在修改语句期间最频繁地使用 db 块获取，修改语句必须仅更新块的当前版本。

- 一致模式

  [**一致读取获取**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F881B50F-FA19-48CB-B512-05841067F42C)是对块的读取一致性版本的检索。此检索可能会使用[**撤消数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-297B963A-989C-4720-B061-A2352FF72892)。例如，如果未提交的事务更新了块中的两行，并且单独会话中的查询请求了该块，则数据库将使用撤消数据创建此块的读取一致性版本（称为*一致性读取克隆*），该版本不包括未提交的更新。通常，查询以一致模式检索块。

另请参阅：

- "[读取一致性和撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-8DC0D1D1-C2B1-4237-9B77-27889B6467C1)"
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN103)，了解数据库统计信息的说明，例如数据库块获取和一致性读取获取





##### 缓冲区 I/O

逻辑 I/O（也称为缓冲区 **I/O**）是指缓冲区缓存中*缓冲区*的读取和写入。

当在内存中找不到请求的缓冲区时，数据库将执行物理 I/O 以将缓冲区从闪存缓存或磁盘复制到内存中。然后，数据库执行逻辑 I/O 来读取缓存的缓冲区。





###### 缓冲区替换算法

若要使缓冲区访问高效，数据库必须决定在内存中缓存哪些缓冲区，以及从磁盘访问哪些缓冲区。

数据库使用以下算法：

- 基于 LRU 的块级替换算法

  这种复杂的算法（默认算法）使用最近最少使用的 （LRU） 列表，其中包含指向脏和非脏缓冲区的指针。LRU 列表有热端和冷端。冷缓冲区是最近未使用的[**缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B427531D-6550-4071-A0C2-C46BAE6680A1)。[**热缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6CBD65A1-DC66-44DF-B642-42EC36FE4984)经常被访问，并且最近已被使用。从概念上讲，只有一个 LRU，但对于[**数据并发**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D7E696DB-944C-4798-B70D-5C2381FE971F)，数据库实际上使用多个 LRU。

- 基于温度的对象级替换算法

  从 Oracle 数据库 12c 第 1 版 （12.1.0.2） 开始，自动大表缓存功能使表扫描能够在以下情况下使用不同的算法：

  - 并行查询

    在单实例和 Oracle 实际应用集群 （Oracle RAC） 数据库中，当初始化参数设置为非零值且设置为 or 时，并行查询可以使用大表缓存。`DB_BIG_TABLE_CACHE_PERCENT_TARGET``PARALLEL_DEGREE_POLICY``auto``adaptive`

  - 串行查询

    仅在单实例配置中，当初始化参数设置为非零值时，串行查询可以使用大表缓存。`DB_BIG_TABLE_CACHE_PERCENT_TARGET`

  当表不适合内存时，数据库会根据访问模式决定要缓存的缓冲区。例如，如果常用表只有 95% 的内存适合内存，那么数据库可能会选择将 5% 的块保留在磁盘上，而不是循环地将块读取到内存中并将块写入磁盘，这种现象称为*抖动*。缓存多个大型对象时，数据库会认为较常用的表较热，而不太常用的表较冷，这会影响缓存哪些块。初始化参数设置使用此算法的缓冲区缓存的百分比。`DB_BIG_TABLE_CACHE_PERCENT_TARGET`

  注意：本文档介绍基于 LRU 的块级替换算法。

另请参阅：

[Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-A553169D-C6CD-443E-88C3-B746D5E32923)，了解有关基于温度的算法的更多信息





###### 缓冲区写入

**数据库编写器 （DBW）** 进程定期将冷、脏的缓冲区写入磁盘。

DBW 在以下情况下写入缓冲区：

- 服务器进程找不到用于将新块读入数据库缓冲区高速缓存的干净缓冲区。

  缓冲区脏污后，可用缓冲区的数量会减少。如果该数字低于内部阈值，并且需要干净的缓冲区，则服务器进程会向 DBW 发出写入信号。

  数据库使用 LRU 来确定要写入的脏缓冲区。当脏缓冲区到达 LRU 的冷端时，数据库会将它们从 LRU 移动到写入队列。DBW 将队列中的缓冲区写入磁盘，如果可能，请使用多块写入。此机制可防止 LRU 的末端被脏缓冲区堵塞，并允许找到干净的缓冲区以供重用。

- 数据库必须推进检查点，[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)是重做线程中必须从实例[**恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)开始的位置。

- 表空间将更改为只读状态或脱机。

另请参阅：

- "[数据库编写器进程 （DBW）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-DC9CBDED-3978-450A-9D7A-0A94CE8FF233)"
- [Oracle 数据库性能](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-F2D11BC8-986F-4A8B-A37F-530BE9EB2DA8)调优指南，了解如何诊断和调优缓冲区写入问题





###### 缓冲区读取

当未使用的缓冲区数较少时，数据库必须从缓冲区缓存中删除缓冲区。

算法取决于是否启用了闪存缓存：

- 闪存缓存已禁用

  数据库根据需要重用每个干净缓冲区，覆盖它。如果以后需要覆盖的缓冲区，则数据库必须从磁盘读取它。

- 已启用闪存缓存

  DBW 可以将干净缓冲区的主体写入闪存缓存，从而可以重用其内存中缓冲区。数据库将缓冲区标头保存在主存储器的 LRU 列表中，以跟踪缓冲区正文在闪存缓存中的状态和位置。如果以后需要此缓冲区，则数据库可以从闪存缓存而不是从磁盘读取它。

当客户端进程请求缓冲区时，服务器进程会在缓冲区缓存中搜索缓冲区。如果数据库在内存中找到缓冲区，则会发生缓存命中。搜索顺序如下：

1. 服务器进程在缓冲区缓存中搜索整个缓冲区。

   如果进程找到整个缓冲区，则数据库将执行此缓冲区的[**逻辑读取**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-267C24F9-BB8A-4D14-8513-0D7DC97D8F8D)。

2. 服务器进程在闪存缓存 LRU 列表中搜索缓冲区标头。

   如果进程找到缓冲区标头，则数据库将对缓冲区正文从闪存缓存执行到内存中缓存的优化物理读取。

3. 如果进程在内存中*找不到*缓冲区（缓存未命中），则服务器进程将执行以下步骤：

   1. 将块从磁盘上的数据文件复制到内存中（物理读取）
   2. 对读入内存的缓冲区执行逻辑读取

[图 14-6](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-57D00A42-6C41-4655-A268-691E84158294__BGBHEHBG) 说明了缓冲区搜索顺序。扩展缓冲区缓存包括内存中缓冲区缓存（包含整个缓冲区）和闪存缓存（包含缓冲区主体）。在图中，数据库在缓冲区缓存中搜索缓冲区，但找不到缓冲区，而是将其从磁盘读入内存。

图 14-6 缓冲区搜索

![图 14-6 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt304.gif)
[“图 14-6 缓冲区搜索”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt304.html)

通常，通过缓存命中访问数据比通过缓存未命中更快。缓冲区缓存[**命中率**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-51C6BAE1-58AA-4C6A-9FC3-5C4014DB2470)衡量数据库在缓冲区缓存中找到请求块而无需从磁盘读取它的频率。

数据库可以从数据文件或[**临时文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5760E541-E0BB-4246-A423-E725E599A9D0)执行物理读取。从数据文件读取后跟逻辑 I/O。当内存不足强制数据库将数据写入临时表并在以后读回时，会发生从[**临时**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-41501962-A37B-4D37-BAF2-59030048FE08)文件读取。这些物理读取绕过缓冲区缓存，不会产生逻辑 I/O。

另请参阅：

[Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-186EEE2D-11A1-401A-B9B2-E72325F972BC)，了解如何计算缓冲区缓存命中率





###### 缓冲区触摸计数

数据库使用触摸计数测量 LRU 列表中缓冲区的访问频率。此机制使数据库能够在固定缓冲区时递增计数器，而不是在 LRU 列表中不断随机播放缓冲区。

注：数据库不会以物理方式移动内存中的块。移动是指针在列表上位置的更改。

固定缓冲区时，数据库将确定其触摸计数上次递增的时间。如果计数在三秒前递增，则计数递增;否则，计数保持不变。三秒规则可防止缓冲区上的引脚突发计数尽可能多的触摸。例如，会话可能会在数据块中插入几行，但数据库将这些插入视为一次触摸。

如果缓冲区位于 LRU 的冷端，但其接触计数较高，则缓冲区将移动到热端。如果触摸计数较低，则缓冲区会从缓存中老化。





##### 缓冲池

**缓冲池**是缓冲区的集合。

数据库缓冲区高速缓存分为一个或多个缓冲池，它们以大致相同的方式管理块。池对于老化或缓存块没有完全不同的算法。

您可以手动配置单独的缓冲池，将数据保留在缓冲区缓存中，或者在使用数据块后立即使缓冲区可用于新数据。然后，您可以将特定schema对象分配给相应的缓冲池，以控制块从缓存中老化的方式。例如，您可以将段划分为热、暖和冷缓冲池。

可能的缓冲池如下：

- 默认池

  此池是通常缓存块的位置。除非手动配置单独的池，否则默认池是唯一的缓冲池。其他池的可选配置对默认池没有影响。

  从 Oracle 数据库 12c 第 1 版 （12.1.0.2） 开始，[**大表缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-46A51ED5-DC39-47B0-9592-81C56414487B)是默认池的可选部分，它使用基于温度的对象级替换算法。在单实例和 Oracle RAC 数据库中，当初始化参数设置为非零值且设置为 or 时，并行查询可以使用大表缓存。仅在单实例配置中，串行查询可以在设置时使用大表缓存。`DB_BIG_TABLE_CACHE_PERCENT_TARGET``PARALLEL_DEGREE_POLICY``auto``adaptive``DB_BIG_TABLE_CACHE_PERCENT_TARGET`

- 保持池

  此池适用于经常访问但由于空间不足而超出默认池的块。保留缓冲池的目的是将对象保留在内存中，从而避免 I/O 操作。

  注意：Keep 池管理缓冲区的方式与其他池相同：它不使用特殊算法来固定缓冲区。“保留”一词是一种命名约定。可以将要保留的表放在较大的保留池中，也可以将不想保留的表放在较小的回收池中。

- 回收池

  此池适用于不经常使用的块。回收池可防止对象占用缓存中不必要的空间。

数据库具有标准块大小。您可以创建块大小与标准大小不同的表空间。每个非默认块大小都有自己的池。Oracle 数据库管理这些池中的块的方式与管理默认池的方式相同。

下图显示了使用多个池时缓冲区缓存的结构。缓存包含默认池、保留池和回收池。默认块大小为 8 KB。缓存包含单独的表空间池，这些表空间使用 2 KB、4 KB 和 16 KB 的非标准块大小。

图 14-7 数据库缓冲区缓存

![Description of Figure 14-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt220.gif)
[“图 14-7 数据库缓冲区缓存”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt220.html)

另请参阅：

- "[数据库块大小](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-39B58094-478C-4DD9-8419-504439F4E8F7)"
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11222)了解有关缓冲池的更多信息
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA315)了解如何使用多个缓冲池
- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-122865EE-4589-434D-8DD5-4E201C6CC739)`DB_BIG_TABLE_CACHE_PERCENT_TARGET`





##### 缓冲区和全表扫描

数据库使用复杂的算法来管理表扫描。缺省情况下，当必须从磁盘读取缓冲区时，数据库会将缓冲区插入到 LRU 列表的中间。这样，热块可以保留在缓存中，这样就不需要再次从磁盘读取它们。

[**全**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)表扫描会带来问题，该扫描按顺序读取表[**高水位线 （HWM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3F5ACB2-94C8-483F-B427-1981836D0609) 下的所有行。假设表段中块的总大小大于缓冲区缓存的大小。对此表进行完全扫描可能会清除缓冲区缓存，从而阻止数据库维护经常访问的块的缓存。

另请参阅：

"[段空间和高水位线](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-5050DCC5-DBBD-4B57-AB14-D83A480B9AAE)"





###### 全表扫描的默认模式

默认情况下，数据库对全表扫描采用保守的方法，仅当表大小占缓冲区缓存的一小部分时，才将小表加载到内存中。

为了确定是否应缓存中型表，数据库使用一种算法，该算法合并了上次表扫描之间的间隔、缓冲区缓存的老化时间戳以及缓冲区缓存中的剩余空间。

对于非常大的表，数据库通常使用直接[**路径读取**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F824D5F8-5826-48F6-AB0D-7855B73BFB4B)，将块直接加载到 PGA 中并完全绕过 SGA，以避免填充缓冲区缓存。对于中等大小的表，数据库可以使用直接读取或缓存读取。如果它决定使用缓存读取，则数据库会将块放在 LRU 列表的末尾，以防止扫描有效地清除缓冲区缓存。

从 Oracle 数据库 12c 第 1 版 （12.1.0.2） 开始，数据库实例的缓冲区缓存会自动执行内部计算，以确定内存是否足以在实例 SGA 中完全缓存数据库，以及在访问时缓存表是否有利于性能。如果整个数据库可以完全容纳在内存中，并且满足各种其他内部条件，则 Oracle 数据库会将数据库中的所有表视为小表，并认为它们符合缓存条件。但是，数据库不会缓存标有该属性的 LOB。`NOCACHE`





###### 并行查询执行

执行全表扫描时，数据库有时可以通过使用多个并行执行服务器来缩短响应时间。

在某些情况下，当数据库具有大量内存时，数据库可以在系统全局区域 （SGA） 中缓存并行查询数据，而不是使用直接路径读取到程序全局区域 （PGA）。通常，由于潜在的资源使用，并行查询发生在低并发数据仓库中。

另请参阅：

- [Oracle 数据库数据仓库指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-452FBA23-6976-4590-AA41-1369647AD14D)了解数据仓库简介
- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG010)，了解有关并行执行的更多信息





###### 缓存属性

在极少数情况下，不需要缺省高速缓存行为，您可以使用 来更改将大型表中的块读入数据库缓冲区高速缓存的方式。`ALTER TABLE ... CACHE`

对于设置了属性的表，数据库不会强制或固定缓冲区缓存中的块。相反，数据库以与任何其他表块相同的方式将块从缓存中老化。使用此选项时要小心，因为对大型表的完全扫描可能会清除缓存中的大多数其他块。`CACHE`

注意：正在执行`更改表...`缓存不*会导致*表被缓存。





###### 保持属性

对于大型表，可以使用 使扫描将这些表的块加载到保留池中。`ALTER TABLE ... STORAGE BUFFER_POOL KEEP`

将表放入保留池会更改缓冲区缓存中存储块的部分。数据库不是在默认缓冲池中缓存块，而是将它们缓存在保留缓冲池中。没有单独的算法控件来保留池缓存。

另请参阅：

- 有关子句和属性的信息，Oracle [*数据库 SQL 语言参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF54597)`CACHE``KEEP`
- [*Oracle 数据库性能调优指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-DE6B6C6E-D947-45FF-B189-F0271B86DB10)，了解如何解释缓冲区缓存咨询统计信息





###### 强制完整数据库缓存模式

若要在某些情况下提高性能，可以显式执行语句以启用**强制完整数据库缓存模式**。`ALTER DATABASE ... FORCE FULL DATABASE CACHING`

与自动的默认模式相反，强制完整数据库缓存模式将整个数据库（包括 LOB）视为有资格在数据库缓冲区缓存中进行缓存。此模式从 Oracle 数据库 12c 版本 1 （12.1.0.2） 开始可用。`NOCACHE`

注：启用强制完整数据库高速缓存模式不会强制数据库进入内存。相反，整个数据库*有资格*缓存在缓冲区缓存中。Oracle 数据库仅在访问表时缓存表。

Oracle 建议您仅在每个实例的缓冲区缓存大小大于数据库大小时启用强制完整数据库缓存模式。此准则适用于单实例数据库和 Oracle RAC 数据库。但是，当 Oracle RAC 应用程序分区良好时，当所有实例的组合缓冲区缓存（具有用于处理实例之间重复缓存块的额外空间）大于数据库大小时，您可以启用强制完整数据库缓存模式。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN14237)，了解如何启用强制完整数据库缓存模式
- 有关语句的详细信息，Oracle [数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF56678)`ALTER DATABASE ... FORCE FULL DATABASE CACHING`





#### 重做日志缓冲区

**重做日志缓冲区**是 SGA 中的一个循环缓冲区，用于存储描述对数据库所做的更改的重做条目。

重做记录是一种数据结构，其中包含重建或[**重做**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F73D3BEC-7C9E-4BE0-A30F-D7E1DA4F217A)通过 DML 或 DDL 操作对数据库所做的更改所需的信息。数据库恢复将重做条目应用于数据文件以重建丢失的更改。

数据库处理将重做条目从用户内存空间复制到 SGA 中的重做日志缓冲区。重做条目占用缓冲区中的连续顺序空间。后台[**进程日志编写器 （LGWR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E96BC851-0B78-4250-8EAB-26EBDF4FE5A6) 将重做日志缓冲区写入磁盘上的活动联机重做日志组。[图 14-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-C2AD1BF6-A5AE-42E9-9677-0AA08126864B__BGBFDAHB) 显示了此重做缓冲区活动。

图 14-8 重做日志缓冲区

![Description of Figure 14-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt226.gif)
[“图 14-8 重做日志缓冲区”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt226.html)

LGWR 按顺序将数据块写入磁盘，而 DBW 将数据块分散写入磁盘。分散写入往往比顺序写入慢得多。由于 LGWR 使用户能够避免等待 DBW 完成其缓慢写入，因此数据库提供了更好的性能。

初始化参数指定 Oracle 数据库在缓冲重做条目时使用的内存量。与其他 SGA 组件不同，重做日志缓冲区和固定 SGA 缓冲区不会将内存划分为颗粒。`LOG_BUFFER`

另请参阅：

- “[日志编写器进程 （LGWR）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-B6BE2C31-1543-4504-9763-6FFBBF99DC85)”和“[检查点对实例恢复的重要性](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-19F515DA-AA77-4138-853B-1C41A759D76E)”
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11302)了解有关联机重做日志的信息





#### 共享池

**共享池**缓存各种类型的程序数据。

例如，共享池存储解析的 SQL、PL/SQL 代码、系统参数和数据[**字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)信息。共享池几乎涉及数据库中发生的每个操作。例如，如果用户执行 SQL 语句，则 Oracle 数据库将访问共享池。

共享池分为几个子组件，其中最重要的组件如图 [14-9](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1CB2BA23-4386-46DA-9146-5FE0E4599AC6__BGBIAJIG) 所示。

图 14-9 共享池

![Description of Figure 14-9 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt225.gif)
[“图 14-9 共享池”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt225.html)

本节包括以下主题：

- [库缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-DE757E9C-3437-408A-8598-3EB4C8E2A3B0)
- [数据字典缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-66430838-7862-4389-96B5-795B99A72473)
- [服务器结果缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-675AAFFB-E915-4197-8159-C0CF1C009973)
- [预留池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-A1D3C388-AB6B-4FD1-BD40-FEDB8CF307F8)





##### 库缓存

**库缓存**是一种共享池内存结构，用于存储可执行的 SQL 和 PL/SQL 代码。

此缓存包含共享 SQL 和 PL/SQL 区域以及控制结构，例如锁和库缓存句柄。在共享服务器体系结构中，库缓存还包含专用 SQL 区域。

执行 SQL 语句时，数据库会尝试重用以前执行的代码。如果库缓存中存在 SQL 语句的解析表示形式并且可以共享，则数据库将重用该代码，称为[**软解析**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A9D78636-6F7B-472B-8AC6-4B07C775DE00)或*库缓存命中*。否则，数据库必须生成应用程序代码的新可执行版本，称为[**硬分析**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1BFB2AF7-BC88-4A93-B9AA-C75CA62C5824)或*库缓存未命中*。





###### 共享 SQL 区域

数据库表示它在共享 SQL 区域和专用 SQL 区域中运行的每个 SQL 语句。

数据库使用共享 SQL 区域来处理 SQL 语句的第一次出现。所有用户都可以访问此区域，并包含语句解析树和执行[**计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)。唯一语句仅存在一个共享 SQL 区域。每个发出 SQL 语句的会话在其 PGA 中都有一个专用 SQL 区域。提交相同语句的每个用户都有一个指向同一共享 SQL 区域的专用 SQL 区域。因此，单独 PGA 中的许多专用 SQL 区域可以与同一共享 SQL 区域相关联。

数据库会自动确定应用程序何时提交类似的 SQL 语句。数据库既考虑由用户和应用程序直接发出的 SQL 语句，也考虑由其他语句在内部发出的递归 SQL 语句。

数据库执行以下步骤：

1. 检查共享池以查看语法和语义上相同的语句是否存在共享 SQL 区域：

   - 如果存在相同的语句，则数据库使用共享 SQL 区域来执行该语句的后续新实例，从而减少内存消耗。
   - 如果不存在相同的语句，则数据库将在共享池中分配新的共享 SQL 区域。语法相同但语义不同的语句使用[**子游标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8230A43B-CD9B-4A64-9D59-182F747A0BD5)。

   在任一情况下，用户的专用 SQL 区域都指向包含语句和执行计划的共享 SQL 区域。

2. 代表会话分配专用 SQL 区域

   专用 SQL 区域的位置取决于为会话建立的连接。如果会话通过共享服务器连接，则部分专用 SQL 区域将保留在 SGA 中。

[图 14-10](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-0DBEB809-0660-4A04-ADF6-CABE4F6DF0B8__BGBGFFFF) 显示了一个专用服务器体系结构，其中两个会话在其自己的 PGA 中保留相同 SQL 语句的副本。在共享服务器中，此副本位于 UGA 中，当不存在大型池时，UGA 位于大型池或共享池中。

图 14-10 专用 SQL 区域和共享 SQL 区域

![Description of Figure 14-10 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt252.gif)
[“图 14-10 专用 SQL 区域和共享 SQL 区域”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt252.html)

另请参阅：

- "[专用 SQL 区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-8C561EE3-04BC-44A9-BED0-19CDBA566810)"
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA562)了解有关管理库缓存的更多信息
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS99965)，了解有关共享 SQL 的更多信息





###### 程序单元和库缓存

库缓存包含PL / SQL程序和Java类的可执行形式。这些项目统称为*程序单元*。

数据库处理程序单元的方式与 SQL 语句类似。例如，数据库分配一个共享区域来保存PL / SQL程序的解析，编译形式。数据库分配一个专用区域来保存特定于运行程序的会话的值，包括本地、全局和包变量，以及用于执行 SQL 的缓冲区。如果多个用户运行同一个程序，则每个用户都维护其专用 SQL 区域的单独副本，该副本保存特定于会话的值，并访问单个共享 SQL 区域。

如前所述，数据库处理 PL/SQL 程序单元中的各个 SQL 语句。尽管这些 SQL 语句起源于 PL/SQL 程序单元，但它们使用共享区域来保存其解析的表示形式，并为运行该语句的每个会话使用专用区域。





###### 共享池中内存的分配和重用

数据库在解析新的 SQL 语句时分配共享池内存，除非该语句是 DDL，它不被视为可共享的。分配的内存大小取决于语句的复杂性。

通常，共享池中的项目会一直保留，直到数据库根据最近最少使用的 （LRU） 算法将其删除。数据库允许许多会话使用的共享池项目保留在内存中，只要它们有用，即使创建该项的数据库进程终止也是如此。此机制最大限度地减少了 SQL 语句的开销和处理。如果新项目需要空间，则数据库将释放不经常使用的项目消耗的内存。

该语句将删除共享池中的所有信息，更改[**全局数据库名称**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2820B9D9-E349-4A2D-9BDA-E0B3BD1772D1)也是如此。`ALTER SYSTEM FLUSH SHARED_POOL`

另请参阅：

- [Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-E04CF45D-CC70-4122-9BAC-EAB5B4D0E17A)概述共享 SQL 区域的生命周期
- 有关使用 Oracle [数据库 SQL 语言参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF53120)了解有关使用`ALTER SYSTEM FLUSH SHARED_POOL`
- 有关动态视图的信息的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30246)`V$SQL``V$SQLAREA`





##### 数据字典缓存

**数据字典**是数据库表和视图的集合，其中包含有关数据库、其结构及其用户的引用信息。

Oracle 数据库在 SQL 语句解析过程中频繁访问数据字典。Oracle 数据库经常访问数据字典，因此指定了以下特殊内存位置来保存字典数据：

- 数据字典缓存

  此缓存保存有关数据库对象的信息。缓存也称为行缓存，因为它将数据保存为*行*而不是缓冲区。

- 库缓存

所有服务器进程共享这些缓存以访问数据字典信息。

另请参阅：

- "[数据字典和动态性能视图](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-dictionary-and-dynamic-performance-views.html#GUID-BDF5B748-EB43-4B48-938E-89099069C3BB)"
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA593)，了解如何为数据字典缓存分配额外内存





##### 服务器结果缓存

**服务器结果缓存**是共享池中的内存池。与缓冲池不同，服务器结果缓存保存结果集而不是数据块。

服务器结果缓存包含 SQL 查询结果缓存和 [**PL/SQL 函数结果缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9804DF97-092F-48A5-827B-67F1065ADAB3)，它们共享相同的基础结构。

注：客户端结果缓存不同于服务器结果缓存。客户端缓存在应用程序级别配置，位于客户端内存中，而不是数据库内存中。

另请参阅：

- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11228)了解有关调整结果缓存大小的信息
- 有关软件包的信息，Oracle [数据库 PL/SQL 包和类型参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS202)`DBMS_RESULT_CACHE`
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA638)了解有关客户端结果缓存的详细信息





###### SQL 查询结果缓存

SQL 查询结果缓存是存储查询结果和查询片段的服务器**结果缓存**的子集。

大多数应用程序都受益于这种性能改进。考虑一个重复运行同一语句的应用程序。如果结果已缓存，则数据库会立即返回它们。通过这种方式，数据库避免了重读块和重新计算结果的昂贵操作。`SELECT`

执行查询时，数据库将搜索内存以确定结果缓存中是否存在结果。如果结果存在，则数据库将从内存中检索结果，而不是执行查询。如果未缓存结果，则数据库将执行查询，将结果作为输出返回，然后将结果存储在结果缓存中。每当事务修改用于构造缓存结果的数据库对象的数据或元数据时，数据库都会自动使缓存结果失效。

用户可以使用[**提示**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B2534A3C-7E63-45E3-A61F-3746124B7CCA)对查询或查询片段进行批注，以指示数据库应将结果存储在 SQL 查询结果缓存中。初始化参数确定 SQL 查询结果缓存是用于所有查询（如果可能）还是仅用于带批注的查询。`RESULT_CACHE``RESULT_CACHE_MODE`

另请参阅：

- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10270)，了解有关初始化参数的更多信息`RESULT_CACHE_MODE`
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF20004)以了解提示`RESULT_CACHE`





###### PL/SQL 函数结果缓存

**PL/SQL** 函数结果缓存是存储函数结果集的服务器结果缓存的子集。

如果没有缓存，每次调用 1000 秒的函数 1 次调用将需要 1000 秒。使用缓存时，具有相同输入的 1000 个函数调用*总共*可能需要 1 秒。结果缓存的良好候选项是依赖于相对静态数据的函数。

PL/SQL 函数代码可以包含缓存其结果的请求。调用此函数后，系统会检查缓存。如果缓存包含具有相同参数值的先前函数调用的结果，则系统会将缓存的结果返回给调用程序，并且不会重新执行函数体。如果缓存不包含结果，则系统会执行函数体并将结果（对于这些参数值）添加到缓存中，然后再将控制权返回给调用程序。

注：您可以指定 Oracle 数据库用于计算缓存结果的数据库对象，以便在更新其中任何一个对象时，缓存结果将变为无效，必须重新计算。

缓存可以累积许多结果 - 调用每个结果缓存函数时使用的每个参数值的唯一组合都有一个结果。如果数据库需要更多内存，则会老化一个或多个缓存结果。

另请参阅：

- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS333)，了解有关 PL/SQL 函数结果缓存的更多信息
- Oracle Database PL/SQL [语言参考，了解有关 PL/SQL](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS00817) 函数结果缓存的更多信息





##### 预留池

保留池是共享**池**中的一个内存区域，Oracle 数据库可以使用该区域来分配大型连续内存块。

数据库以块为单位从共享池分配内存。分块允许将大型对象（超过 5 KB）加载到缓存中，而无需单个连续区域。这样，数据库可以减少由于碎片而导致连续内存不足的可能性。

Java、PL/SQL 或 SQL 游标通常可能会从共享池中进行大于 5 KB 的分配。为了使这些分配最有效地进行，数据库为保留池隔离了少量共享池。

另请参阅：

[Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA605)，了解如何配置预留池





#### 大型游泳池

**大型池**是一个可选内存区域，用于大于适合共享池的内存分配。

大型池可以为以下各项提供大量内存分配：

- 用于共享服务器和 [**Oracle XA 接口的 UGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4805B3F4-1858-473B-A802-3496C73CE818)（用于事务与多个数据库交互的情况）
- 并行执行中使用的消息缓冲区
- Recovery Manager （RMAN） I/O 从属设备的缓冲区
- 延迟插入的缓冲区（带有提示的插入）`MEMOPTIMIZE_WRITE`

下图描述了大型池。

图 14-11 大型池

![Description of Figure 14-11 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt221.png)
[“图 14-11 大型池”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt221.html)

另请参阅：

- “[查询协调器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-6487F7FA-2299-4428-8588-7937BD8675D3)”，用于获取有关为并行执行分配内存的信息
- “[调度程序请求和响应队列](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-EC8F8778-02B7-4CF9-9E6F-A5D88C777235)”，了解如何为共享服务器分配会话内存
- 了解 Oracle XA 的 [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS017)
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA609)了解有关大型池的详细信息



##### 大型池内存管理

大型池管理内存的方式与共享池不同，共享池使用 LRU 列表，以便部分内存可能会老化。

大型池没有 LRU 列表。当数据库为数据库会话分配大型池内存时，除非会话释放此内存，否则无法释放此内存。一旦释放了一部分内存，其他进程就可以使用它。通过从大型池中分配会话内存，数据库可以避免共享池中可能发生的碎片。



##### 用于延迟插入的大型池缓冲区

对于称为延迟插入的特殊类型的**插入**，数据库从大型池中分配缓冲区。

对于来自物联网 （IoT） 应用程序的快速“即发即弃”插入，数据库基础schema会产生性能开销。例如，代码路径包括缓冲区缓存导航、缓冲区引脚和并发保护。阵列插入可以最大限度地降低这些成本，但阵列必须在客户端构建，这对于物联网应用程序来说并不常见。若要解决此问题，Oracle 应用程序可以使用提示将行插入到指定为 的表中。`MEMOPTIMIZE FOR WRITE`

插入操作被延迟，因为它们在大型池中缓冲，然后由后台进程异步写入磁盘。数据库按如下方式处理延迟插入：

1. 应用程序将插入发送到中间层，中间层可以聚合数据。虽然物联网应用程序几乎总是将插入发送到中间层，但也可以将插入直接发送到数据库。例如，使用 SQL*Plus 将插入直接发送到数据库。`MEMOPTIMIZE_WRITE`

2. 中间层将插入的聚合写入数据库服务器。

3. （可选）中间层客户端保留它在上一步中写入的数据的本地副本。

4. 服务器进程将数据写入大型池中的一个或多个缓冲区。

   为了避免争用，每个缓冲区都有自己的内部锁定机制。此锁定机制独立于数据库缓冲区高速缓存用于其缓冲区的锁定机制。基本写入过程如下：

   1. 实例启动后，第一个插入操作从大型池中分配缓冲区。`MEMOPTIMIZE_WRITE`
   2. 编写器从可用缓冲区列表中选择缓冲区。
   3. 如果所选缓冲区未锁定，并且此缓冲区具有可用空间，则客户端将写入缓冲区，并使用特定于会话的序列号标记每个缓冲区写入。如果没有，则编写器返回到上一步，并以这种方式继续，直到找到缓冲区或在大型池中释放了足够的空间。

5. 数据库从缓冲的数据创建服务器端数组。

6. 空间管理协调器 （SMCO） 及其帮助程序进程 （W*nnn*） 使用标准数据块格式将阵列异步写入磁盘。

   与标准插入不同，延迟插入会自动提交，无法回滚。数据库按照插入在会话中出现的顺序将插入提交到给定对象。不能保证对象或会话*之间的*排序。

   数据库支持约束和索引维护，就像常规插入一样。但是，数据库在写入磁盘期间执行评估，而不是写入大型池。

   注意：为了获得最佳性能，Oracle 建议禁用约束。

下图描述了延迟插入的工作流。

图 14-12 延迟插入机制

![Description of Figure 14-12 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt_pb_002a.png)
[“图 14-12 延迟插入机制”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt_pb_002a.html)

另请参阅：

- "[读取一致性和延迟插入](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-ED6AFF56-F998-4E80-9D6B-105B2610ECAC)"
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA-GUID-CFADC9EA-2E2F-4EBB-BA2C-3663291DCC25)了解如何将表指定为`MEMOPTIMIZE FOR WRITE`
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF-GUID-903F8043-0254-4EE9-ACC1-CB8AC0AF3423)`INSERT`
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-D33BB2FE-94A7-475F-B8C8-CC9AC61B502F)以了解有关`MEMOPTIMIZE_POOL_SIZE`





#### 爪哇池

Java **池**是一个内存区域，用于在 Java 虚拟机 （JVM） 中存储所有特定于会话的 Java 代码和数据。此内存包括在调用结束时迁移到 Java 会话空间的 Java 对象。

对于专用服务器连接，Java 池包括每个 Java 类的共享部分，包括方法和只读内存（如代码向量），但不包括每个会话的每个会话的 Java 状态。对于共享服务器，池包括每个类的共享部分和一些用于每个会话状态的 UGA。每个 UGA 都会根据需要增长和收缩，但总 UGA 大小必须适合 Java 池空间。

Java 池顾问统计信息提供有关用于 Java 的库高速缓存的信息，并预测 Java 池大小的变化如何影响解析速率。当设置为 或更高时，Java 池顾问程序在内部打开。这些统计信息会在顾问程序关闭时重置。`statistics_level``TYPICAL`

另请参阅：

- [Oracle Database Java Developer's Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=JJDEV01000)
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA589)，了解包含 Java 池咨询统计信息的视图





#### 固定 SGA

**固定的SGA**是一个内部清洁区域。

例如，固定的 SGA 包含：

- 有关后台进程需要访问的数据库和实例状态的一般信息
- 进程之间通信的信息，例如有关锁的信息

固定 SGA 的大小由 Oracle 数据库设置，无法手动更改。固定的 SGA 大小可以因版本而异。

另请参阅：

"[自动锁概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-E926E638-0161-4389-887B-4A31A529478A)"



#### 可选的与性能相关的 SGA 子区域

某些 SGA 子区域仅针对特定性能功能启用。

本节包含以下主题：

- [内存中区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-80C1C6A3-3E48-4868-ACA1-370C4D341209)
- [内存优化池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-D58DC90F-0ABB-4B1E-96C1-6094A04A5E12)



##### 内存中区域

内存中区域是可选的 SGA 组件，其中包含内存中列存储（IM **列存储**）。

IM 列存储包含针对快速扫描进行优化的[**列式格式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DDC39B24-BE95-406A-986F-D760308CA26D)的表、分区和实例化视图的副本。IM 列存储是对数据库缓冲区缓存的补充，后者以传统的行格式存储数据。

注意：若要启用 IM 列存储，必须具有“Oracle 数据库内存中”选项。

另请参阅：

[Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=INMEM-GUID-EEA265EE-8FBA-4457-8C3F-315B9EEA2224)内存中指南，了解有关内存中区域和 IM 列存储的更多信息



##### 内存优化池

**memoptimize 池**存储指定为 .`MEMOPTIMIZE FOR READ`

此结构为基于键的查询（如 .为了减少端到端响应时间，客户端通过网络直接从 SGA 拉取请求的缓冲区，从而避免 CPU 和操作系统开销。应用程序可以从 memoptimize 池中受益，而无需更改代码。`SELECT * FROM cust WHERE cid = 10`

内存优化池包含两部分：

- 内存优化缓冲区

  为了避免磁盘 I/O，数据库会永久锁定 memoptimize 池中表的缓冲区，直到表被标记为 。memoptimize 缓冲区使用与数据库缓冲区缓存中的缓冲区相同的结构。但是，memoptimize 池中的缓冲区与数据库缓冲区缓存完全分开，不计入其大小。memoptimize缓冲区占据了memoptimize池的75%。`MEMOPTIMIZE FOR READ``NO MEMOPTIMIZE FOR READ`

- 哈希索引

  [**哈希索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE5E8238-C900-46DB-A688-6A5D0BDFEA7C)是一种非持久性段数据结构。数据库将哈希索引分配为多个不连续的内存单元。每个单元都包含多个哈希桶。单独的映射结构将内存单元与主键相关联。哈希索引占据了内存优化池的 25%。

图 14-13 内存优化池

![Description of Figure 14-13 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt_pb_001a.png)
[“图 14-13 内存优化池”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt_pb_001a.html)

要启用 memoptimize 池，请将初始化参数设置为整数值（默认情况下禁用池）。该值指定要分配给池的 SGA 量。该值*确实*计入 ，但数据库*不会*自动增大和收缩 memoptimize 池。例如，如果为 10 GB，如果为 1 GB，则除了内存优化池之外，总共有 9 GB 可用于 SGA 内存。`MEMOPTIMIZE_POOL_SIZE``MEMOPTIMIZE_POOL_SIZE``SGA_TARGET``SGA_TARGET``MEMOPTIMIZE_POOL_SIZE`

要更改 memoptimize 池的大小，必须手动设置并重新启动数据库实例。不能使用 动态更改池大小。`MEMOPTIMIZE_POOL_SIZE``ALTER SYSTEM`

该软件包使您能够将表显式填充到 memoptimize 池中。`DBMS_MEMOPTIMIZE`

另请参阅：

- "[自动内存管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-C7AFB6E3-195E-4269-A871-D514CD9A84BE)"
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA-GUID-9752E93D-55A7-4584-B09B-9623B33B5CCF)，了解如何通过启用内存优化池来提高查询性能
- [Oracle 数据库 PL/SQL 包和类型参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS-GUID-49F0E799-97F0-41E7-9CD3-24AE3CAA8105)了解有关该包的更多信息`DBMS_MEMOPTIMIZE`
- [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF-GUID-F9CE0CC3-13AE-4744-A43C-EAC7A71AAAB6)，了解更多信息`CREATE TABLE ... MEMOPTIMIZE FOR READ`
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-D33BB2FE-94A7-475F-B8C8-CC9AC61B502F)以了解有关`MEMOPTIMIZE_POOL_SIZE`





### 软件代码区概述

**软件代码区**是内存的一部分，用于存储正在运行或可以运行的代码。Oracle 数据库代码存储在软件区域中，该区域通常比用户程序的位置更具排他性和保护性。

软件区域的大小通常是静态的，仅在更新或重新安装软件时更改。这些区域所需的大小因操作系统而异。

软件区域是只读的，可以共享或非共享安装。某些数据库工具和实用程序（如 Oracle Forms 和 SQL*Plus）可以共享安装，但有些则不能。如果可能，将共享数据库代码，以便所有用户都可以访问它，而无需在内存中有多个副本，从而减少主内存并全面提高性能。如果在同一台计算机上运行，则数据库的多个实例可以将同一数据库代码区与不同的数据库一起使用。

注意：安装共享软件的选项并非适用于所有操作系统，例如，在运行 Microsoft Windows 的 PC 上。有关详细信息，请参阅特定于操作系统的文档。

## 15 流程schema

本章讨论 Oracle 数据库中的进程。

本章包含以下部分：

- [流程简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-FB843ADE-8DDD-4F83-8EB9-D4B5E4B6B022)
- [客户端流程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-6B71F47F-D097-42F0-BB71-1F5270F867E1)
- [服务器进程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-310F28E9-793A-4816-87CB-FDB54AB68957)
- [后台进程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D8AE1B78-69D5-4F0F-8BE3-C91AA2514F2D)





### 流程简介

**进程**是操作系统中的一种机制，可以运行一系列步骤。

进程执行体系结构取决于操作系统。例如，在 Windows 上，Oracle 后台进程是进程内的执行线程。在 Linux 和 UNIX 上，Oracle 进程要么是操作系统进程，要么是操作系统进程中的线程。

进程运行代码模块。所有连接的 Oracle 数据库用户都必须运行以下模块才能访问[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)：

- 应用程序或 Oracle 数据库实用程序

  数据库用户运行向数据库发出 SQL 语句的数据库应用程序（如[**预编译器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FDCF892E-6AD5-4AC9-9D1D-A9C7D106D21D)程序或数据库工具（如 SQL*Plus）。

- Oracle数据库代码

  每个用户都有代表他或她执行的 Oracle 数据库代码，用于解释和处理应用程序的 SQL 语句。

进程通常在其自己的专用内存区域中运行。大多数进程可以定期写入关联的跟踪文件。

另请参阅：

- "[跟踪文件](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-5206D90F-E288-4B60-83E9-F92A0C6E94AD)"
- "[数据库管理员工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-FA659979-25B7-4611-AA8D-48B5404301FE)"
- "[面向数据库开发人员的工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-D1C1BC1D-03C7-4A18-BB88-0D76F311DAF0)"





#### 流程类型

数据库实例包含多个进程或与多个进程交互。

进程分为以下类型：

- [**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)运行应用程序或 Oracle 工具代码。

- Oracle [**进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DD083580-0AAF-4728-9186-BE1E319020DD)是运行 Oracle 数据库代码的执行单元。在多线程体系结构中，Oracle 进程可以是操作系统进程或操作系统进程中的线程。Oracle 流程包括以下子类型：

  - 后台进程从数据库实例开始，并执行维护任务，例如执行[**实例恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)、清理[**进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8EFE210D-EE23-42A9-B4F0-7EF79C9315EE)、将重做缓冲区写入磁盘等。

  - [**服务器进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E660AC1C-B704-4DC1-A35A-DB49EFB34F4A)根据客户端请求执行工作。

    例如，这些进程分析 SQL 查询，将它们放在[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中，为每个查询创建和执行[**查询计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)，以及从数据库缓冲区缓存或磁盘读取[**缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)。

    注：服务器进程以及在这些进程中分配的进程内存在数据库实例中运行。当服务器进程终止时，实例将继续运行。

  - 从进程为后台进程或服务器进程执行其他任务。

过程结构因操作系统和 Oracle 数据库选项的选择而异。例如，您可以为专用服务器或[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)连接的已连接用户配置代码。在共享服务器体系结构中，运行数据库代码的每个服务器进程都可以为多个客户端进程提供服务。

[图 15-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-B9B8BB8D-FB3D-46BC-AFBD-346A69BAB3EC__BABHJDHD) 显示了使用专用服务器连接的[**系统全局区域 （SGA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78C0E867-233A-4857-B9FE-A3852A9B7BDF) 和后台进程。对于每个用户连接，客户端进程都会运行应用程序。此客户端进程不同于运行数据库代码的专用服务器进程。每个客户端进程都与其自己的服务器进程相关联，该服务器进程具有自己的[**程序全局区域 （PGA）。**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-76021F69-AC7A-4D8D-A308-A7B8AC072EEF)

图 15-1 Oracle 进程和 SGA

![Description of Figure 15-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt283.gif)
[“图 15-1 Oracle 进程和 SGA”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt283.html)

另请参阅：

- “[专用服务器体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-94AFB4A0-4979-4B48-A19A-0D9178771FB1)”和“[共享服务器体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-F3281DD9-B210-463E-B572-173816D2B161)”
- 您的 Oracle 数据库操作系统特定文档，了解有关配置选择的更多详细信息
- 了解视图的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN30186)`V$PROCESS`





#### 多进程和多线程 Oracle 数据库系统

多进程 Oracle 数据库（也称为多用户 Oracle 数据库）使用多个进程来运行 Oracle 数据库代码的不同部分，并为用户运行其他 Oracle 进程 — 每个连接的用户一个进程或多个用户共享的一个或多个进程。

大多数数据库都是多用户的，因为数据库的主要优点是同时管理多个用户所需的数据。数据库实例中的每个进程都执行特定的作业。通过将数据库和应用程序的工作划分为多个进程，多个用户和应用程序可以同时连接到一个实例，同时系统提供良好的性能。

在 Oracle Database 12c 之前的版本中，Oracle 进程不会在 UNIX 和 Linux 系统上作为线程运行。从 Oracle Database 12c 开始，多线程 Oracle [**数据库模型使 Oracle**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A0106836-D69F-4157-A3D9-04842A99FDC8) 进程能够在单独的地址空间中作为操作系统线程执行。安装 Oracle 数据库 12c 时，数据库将以进程模式运行。必须将初始化参数设置为 才能在线程模式下运行数据库。在线程模式下，UNIX 和 Linux 上的一些后台进程作为进程运行（每个进程包含一个线程），而其余的 Oracle 进程作为进程内的线程运行。`THREADED_EXECUTION``TRUE`

在以线程模式运行的数据库中，PMON 和 DBW 可能作为操作系统进程运行，而 LGWR 和 CMON 可能作为单个进程中的线程运行。两个前台进程和一个并行执行 （PX） 服务器进程可能在第二个操作系统进程中作为线程运行。第三个操作系统进程可能包含多个前台线程。因此，“Oracle进程”并不总是意味着“操作系统进程”。

注意：当初始化参数设置为 时，不支持操作系统身份验证。`THREADED_EXECUTION``TRUE`

例 15-1 查看 Oracle 进程元数据

该视图包含连接到数据库实例的每个 Oracle 进程的一行。例如，可以在 SQL*Plus 中运行以下查询，以获取每个进程的操作系统进程 ID 和操作系统线程 ID：`V$PROCESS`

```
CopyCOL SPID FORMAT a8
COL STID FORMAT a8
SELECT SPID, STID, PROGRAM FROM V$PROCESS ORDER BY SPID;
```

查询生成以下部分示例输出：

```
CopySPID   STID   PROGRAM
-----  -----  ---------------------------
7190   7190   oracle@samplehost (PMON) 
7192   7192   oracle@samplehost (PSP0) 
7194   7194   oracle@samplehost (VKTM) 
7198   7198   oracle@samplehost (SCMN) 
7198   7200   oracle@samplehost (GEN0) 
7202   7202   oracle@samplehost (SCMN) 
7202   7204   oracle@samplehost (DIAG) 
7198   7205   oracle@samplehost (DBRM) 
7202   7206   oracle@samplehost (DIA0) 
.
.
.
```

另请参阅：

- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA477)了解如何使用该视图`V$PROCESS`
- 了解初始化参数的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN10335)`THREADED_EXECUTION`





### 客户端流程概述

当用户运行应用程序（如 Pro*C 程序或 SQL*Plus）时，操作系统会创建一个客户端进程（有时称为用户进程）来运行*用户*应用程序。客户端应用程序具有链接到其中的 Oracle 数据库库，这些库提供与数据库通信所需的 API。





#### 客户端和服务器进程

客户端进程与直接与实例交互的 Oracle 进程有很大不同。

为客户端进程提供服务的 Oracle 进程可以读取和写入 SGA，而客户端进程则不能。客户端进程可以在数据库主机以外的主机上运行，而 Oracle 进程不能。

例如，假定客户端主机上的用户启动 SQL*Plus，然后在数据库实例未启动时通过网络连接到其他主机上的数据库：`sample`

```
CopySQL> CONNECT SYS@inst1 AS SYSDBA
Enter password: *********
Connected to an idle instance.
```

在客户机主机上，搜索 或 的进程仅显示客户机进程：`sqlplus``sample``sqlplus`

```
Copy% ps -ef | grep -e sample -e sqlplus | grep -v grep
clientuser 29437 29436  0 15:40 pts/1    00:00:00 sqlplus           as sysdba
```

在数据库主机上，搜索 或 的进程将显示具有非本地连接但没有客户端进程的服务器进程：`sqlplus``sample`

```
Copy% ps -ef | grep -e sample -e sqlplus | grep -v grep
serveruser 29441     1  0 15:40 ?        00:00:00 oraclesample (LOCAL=NO)
```

另请参阅：

“[如何](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-189ADDB5-1E71-4924-8371-F5B2EFB5B304)启动实例”以了解客户端在实例未启动时如何连接到数据库





#### 连接和会话

数据库**连接**是客户端进程和数据库实例之间的物理通信路径。

在连接期间，使用可用的进程间通信机制或网络软件建立通信路径。通常，连接发生在客户端进程与服务器进程或调度程序之间，但也可能发生在客户端进程和 Oracle 连接管理器 （CMAN） 之间。

数据库[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)是数据库实例内存中的一个逻辑实体，表示当前用户登录到数据库的状态。例如，当数据库使用密码对用户进行身份验证时，将为该用户建立会话。会话从数据库对用户进行身份验证开始，一直持续到用户断开连接或退出数据库应用程序为止。

单个连接可以建立 0、1 或多个会话。会话是独立的：一个会话中的提交不会影响其他会话中的事务。

注意：如果配置了 Oracle Net 连接[**池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-50E2A9E3-613B-460D-B815-E36205D4FB05)，则连接可能会断开，但会话保持不变。

单个数据库用户可以同时存在多个会话。如下图所示，用户可以有多个数据库连接。在专用服务器连接中，数据库代表每个连接创建一个服务器进程。只有导致创建专用服务器的客户端进程使用它。在共享服务器连接中，许多客户端进程访问单个共享服务器进程。`hr`

图 15-2 每个连接一个会话

![图 15-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt237.gif)
[“图 15-2 每个连接一个会话”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt237.html)

[图 15-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-3A11FF2F-50EE-4839-A1A6-F746DFF634AB__BABBCEEF) 说明了用户具有单个数据库连接，但此连接具有两个会话的情况。`hr`

图 15-3 一个连接中的两个会话

![图 15-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt238.gif)
[“图 15-3 一个连接中的两个会话”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt238.html)

生成 SQL 语句执行统计信息的自动跟踪报告将重新创建[图 15-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-3A11FF2F-50EE-4839-A1A6-F746DFF634AB__BABBCEEF) 中的场景。

[示例 15-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-3A11FF2F-50EE-4839-A1A6-F746DFF634AB__BABGDIIB) 中的命令实际上结束*会话*，而不是连接。`DISCONNECT`

示例 15-2 连接和会话

下面的示例以用户身份将 SQL*Plus 连接到数据库并启用跟踪，从而创建一个新会话（包括示例输出）：`SYSTEM`

```
CopySQL> SELECT SID, SERIAL#, PADDR FROM V$SESSION WHERE USERNAME = USER;

SID SERIAL# PADDR
--- ------- --------
 90      91 3BE2E41C
 
SQL> SET AUTOTRACE ON STATISTICS;
SQL> SELECT SID, SERIAL#, PADDR FROM V$SESSION WHERE USERNAME = USER;
 
SID SERIAL# PADDR
--- ------- --------
 88      93 3BE2E41C
 90      91 3BE2E41C
...
SQL> DISCONNECT
```

该命令实际上结束*会话*，而不是连接。打开新终端并以其他用户身份连接到实例，以下查询显示与该地址的连接仍处于活动状态。`DISCONNECT``3BE2E41C`

```
CopySQL> CONNECT dba1@inst1
Password: ********
Connected.
SQL> SELECT PROGRAM FROM V$PROCESS WHERE ADDR = HEXTORAW('3BE2E41C');

PROGRAM
------------------------------------------------
oracle@stbcs09-1 (TNS V1-V3)
```

另请参阅：

"[共享服务器体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-F3281DD9-B210-463E-B572-173816D2B161)"





#### 数据库操作

在数据库监视的上下文中，**数据库操作**是两个时间点之间的会话活动，由最终用户或应用程序代码定义。

**简单的数据库操作**可以是单个 SQL 语句，也可以是单个 PL/SQL 过程或函数。复合数据库操作是一组单个操作或**复合操作**。

若要监视、比较和调整任务，可以将大量任务划分为数据库操作，并将操作细分为多个阶段。用例是运行速度比正常情况慢的 PL/SQL 批处理作业。通过将作业配置为数据库操作，可以识别和调整作业中代价高昂的步骤。

数据库操作的每次执行都由一对属性唯一标识：操作名称和执行 ID。一个会话可以通过指定其会话 ID 和序列号来启动或停止另一个会话中的数据库操作。

同一数据库操作的两个匹配项可以使用相同的名称但不同的执行 ID 同时执行。具有相同名称的数据库操作的每次执行可以包含不同的语句。

您可以使用 PL/SQL 包创建和管理数据库操作。您可以使用 、 和 监视操作。`DBMS_SQL_MONITOR``V$SQL_MONITOR``V$SQL_PLAN_MONITOR``V$SQL_MONITOR_SESSTAT`

另请参阅：

- [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL789)，了解如何监控数据库操作
- [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG-GUID-D66210E5-9F35-45C8-B310-FC4D764B4FEC)，了解如何监控长时间运行的负载
- [Oracle 数据库 PL/SQL 包和类型参考以](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS-GUID-13874A73-369E-42CD-9C43-A12F1B3BDEC6)了解更多信息`DBMS_SQL_MONITOR`
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-79E97A84-9C27-4A5E-AC0D-C12CB3E748E6)以了解有关`V$SQL_MONITOR`





### 服务器进程概述

Oracle 数据库创建服务器进程来处理连接到实例的客户端进程的请求。客户端进程始终通过单独的服务器进程与数据库通信。

代表数据库应用程序创建的服务器进程可以执行以下一项或多项任务：

- 解析和运行通过应用程序发出的 SQL 语句，包括创建和执行[**查询计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)
- 执行 PL/SQL 代码
- 将数据块从数据文件读取到数据库缓冲区缓存中（DBW 后台进程的任务是将修改后的块写回磁盘）
- 以应用程序可以处理信息的方式返回结果

另请参阅：

"[SQL 处理的各个阶段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-1B95E60C-99C5-446D-9C6B-5D16EFE59ACF)"





#### 专用服务器进程

在专用服务器连接中，客户端连接与一个且仅与一个服务器进程相关联。

在 Linux 上，连接到数据库实例的 20 个客户端进程由 20 个服务器进程提供服务。每个客户端进程直接与其服务器进程通信。此服务器进程在会话期间专用于其客户端进程。服务器进程将特定于进程的信息和 UGA 存储在其 PGA 中。

另请参阅：

- "[专用服务器schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-94AFB4A0-4979-4B48-A19A-0D9178771FB1)"
- "[专用和共享服务器模式下的 PGA 用法](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-26FCB7D9-7B1D-4F5A-88AA-1DB1E0ACD2BE)"





#### 共享服务器进程

在共享服务器连接中，客户端应用程序通过网络连接到**调度程序**进程，而不是服务器进程。例如，20 个客户端进程可以连接到单个调度程序进程。

调度程序进程接收来自已连接客户端的请求，并将其放入大型池中的请求队列中。第一个可用的共享服务器进程从队列中获取请求并对其进行处理。然后，共享服务器将结果放入调度程序响应队列中。调度程序进程监视此队列并将结果传输到客户端。

与专用服务器进程一样，共享服务器进程也有自己的 PGA。但是，会话的 UGA 位于 SGA 中，以便任何共享服务器都可以访问会话数据。

另请参阅：

- "[共享服务器体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-F3281DD9-B210-463E-B572-173816D2B161)"
- "[大型游泳池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1ECB5213-AC4E-4BB4-9113-91C761676B34)"



#### Oracle 数据库如何创建服务器进程

数据库以各种方式创建服务器进程，具体取决于连接方法。

连接方式如下：

- 留给

  SQL*Plus、OCI 客户端或其他客户端应用程序直接生成服务器进程。

- Oracle网络侦听器

  客户端应用程序通过侦听器连接到数据库。

- 专属经纪人

  这是一个创建前台进程的数据库进程。与侦听器不同，代理驻留在数据库实例中。使用专用代理时，客户端连接到侦听器，然后侦听器将连接移交给专用代理。

当连接*不使用*遗赠时，数据库将按如下方式创建服务器进程：

1. 客户端应用程序从侦听器或代理请求新连接。
2. 侦听器或代理启动新进程或线程的创建。
3. 操作系统创建新的进程或线程。
4. Oracle 数据库初始化各种组件和通知。
5. 数据库移交连接和特定于连接的代码。

或者，如果使用专用代理连接方法，则可以使用该软件包预先创建服务器进程池。在这种情况下，进程管理器 （PMAN） 后台进程监视预先创建的进程池，这些进程等待与客户端请求关联。当连接需要服务器进程时，数据库将跳过进程创建的步骤 2-4，仅执行步骤 5。此优化可提高性能。`DBMS_PROCESS`

注意：

- Oracle 数据库 PL/SQL 包[和类型参考，了解 PL/SQL 包](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN104)`DBMS_PROCESS`
- 了解 PMAN 后台进程的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN104)





### 后台进程概述

后台进程是多进程 Oracle 数据库使用的其他进程。后台进程执行操作数据库所需的维护任务，并最大限度地提高多个用户的性能。

每个后台进程都有一个单独的任务，但与其他进程一起工作。例如，LGWR 进程将数据从重做日志缓冲区写入[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)。当已填充的重做日志文件准备好存档时，LGWR 会发出另一个进程的信号来存档重做日志文件。

Oracle 数据库在数据库实例启动时自动创建后台进程。一个实例可以有许多后台进程，并非所有后台进程始终存在于每个数据库配置中。以下查询列出了数据库上运行的后台进程：

```
复制选择PNAME
从 V$流程
其中 PNAME 不为空
按 PNAME 排序;
```

本节包括以下主题：

- [强制后台进程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-2E691FEA-9027-47E4-A3D0-1B235BBA295A)
- [可选后台进程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-028BA4D6-F9BC-4F36-AD98-0FE3A191ED02)
- [从进程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-BD43E5D1-82C1-4997-8461-7CBBAFC7ED49)

另请参阅：

有关所有后台进程说明的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN104)





#### 强制后台进程

强制后台进程存在于所有典型的数据库配置中。

默认情况下，这些进程在读/写数据库实例中运行，该实例以最小配置的初始化参数文件启动。只读数据库实例会禁用其中一些进程。

本节介绍以下必需的后台进程：

- [进程监视器进程 （PMON） 组](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-B5CA9579-53DB-442C-A85F-F21FD334833A)
- [流程经理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-CFD15DE0-4CB6-4D22-BDA3-5EA48C9DC6A2)
- [侦听器注册流程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-9641E79F-7A45-4AB6-9A89-BF7D4C25269A)
- [系统监视器进程 （SMON）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-21393D94-CA2D-4551-BD20-28BEFDC98631)
- [数据库编写器进程 （DBW）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-DC9CBDED-3978-450A-9D7A-0A94CE8FF233)
- [日志编写器进程 （LGWR）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-B6BE2C31-1543-4504-9763-6FFBBF99DC85)
- [检查点流程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D3174B3E-BCCA-473F-961E-84A36FD5C372)
- [可管理性监控流程（MMON 和 MMNL）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D175CA2B-20FE-4D5D-9A89-5CAA279479EC)
- [恢复器工艺](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-9FF900D1-7DB8-4D41-8D34-8E99AF650CEC)

另请参阅：

- "[读/写和只读实例](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-04EF1A27-8001-46D8-9516-69C9DC9A81BF)"
- [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN104)，了解其他强制流程的说明，包括 MMAN、DIAG、VKTM、DBRM 和 PSP0
- Oracle [Real Application Clusters](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD7275) Administration and Deployment Guide 和 Oracle Clusterware [Administration and Deployment Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=CWADD90953)，了解有关特定于 Oracle RAC 和 Oracle Clusterware 的后台进程的更多信息





##### 进程监视器进程 （PMON） 组

**PMON 组包括 PMON**、清理主进程 （CLMN） 和清理帮助程序进程 （CL*nn*）。这些进程负责监视和清理其他进程。

PMON 组监督缓冲区缓存的清理和客户端进程使用的资源的释放。例如，PMON 组负责重置活动事务表的状态，释放不再需要的锁，以及从活动进程列表中删除已终止进程的进程 ID。

数据库必须确保释放已终止进程持有的资源，以便其他进程可以使用这些资源。否则，进程最终可能会被阻止或停滞在争用中。



###### 进程监视器进程 （PMON）

**进程监视器 （PMON）** 检测其他后台进程的终止。如果服务器或调度程序进程异常终止，则 PMON 组负责执行进程恢复。进程终止可能有多种原因，包括操作系统终止命令或语句。`ALTER SYSTEM KILL SESSION`



###### 清理主进程 （CLMN）

PMON 将清理工作委派给清理主进程 （CLMN）。检测异常终止的任务仍由 PMON 完成。

CLMN 会定期清理已终止的进程、已终止的会话、事务、网络连接、空闲会话、分离的事务和已超过其空闲超时的分离网络连接。



###### 清理帮助程序进程 （CLnn）

CLMN 将清理工作委托给 CL*nn* 帮助程序进程。

CL*nn* 进程有助于清理已终止的进程和会话。帮助程序进程的数量与要完成的清理工作量和当前的清理效率成正比。

清理进程可能会被阻止，从而阻止它继续清理其他进程。此外，如果多个进程需要清理，则清理时间可能很长。由于这些原因，Oracle 数据库可以并行使用多个帮助程序进程来执行清理，从而缓解性能下降的问题。

和 视图包含有关 CLMN 清理的元数据。对于每个清理过程，视图包含一行。例如，如果为 ，则进程当前正在进行清理。`V$CLEANUP_PROCESS``V$DEAD_CLEANUP``V$CLEANUP_PROCESS``V$CLEANUP_PROCESS.STATE``BUSY`

另请参阅：

[Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-B219D499-E80A-4FE5-8562-21CB7FD2AF69)以了解有关`V$CLEANUP_PROCESS`



###### 数据库资源隔离

如果进程或会话终止，则 PMON 组会将保留的资源释放到数据库。在某些情况下，PMON 组可以自动隔离损坏的、不可恢复的资源，以便不会立即强制数据库实例终止。

PMON 组继续对保存隔离资源的进程或会话执行尽可能多的清理。该视图包含元数据，例如资源类型、消耗的内存量、导致隔离的 Oracle 错误等。`V$QUARANTINE`

另请参阅：

[Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN-GUID-2686217E-C55A-4E10-8C1F-2B3E00D8FBCA)以了解有关`V$QUARANTINE`



##### 流程经理

**进程管理器 （PMAN）** 监督多个后台进程，包括共享服务器、池服务器和作业队列进程。

PMAN 监视、生成和停止以下类型的进程：

- 调度程序和共享服务器进程
- 数据库驻留连接池的连接代理和共用服务器进程
- 作业队列进程
- 可重新启动的后台进程





##### 侦听器注册流程

**侦听器注册过程 （LREG）** 向 Oracle 网络侦听器注册有关数据库实例和调度程序进程的信息。

当实例启动时，LREG 会轮询侦听器以确定它是否正在运行。如果侦听器正在运行，则 LREG 会向其传递相关参数。如果它未运行，则 LREG 会定期尝试联系它。

注意：在 Oracle Database 12c 之前的版本中，PMON 执行侦听器注册。

另请参阅：

"[Oracle网络侦听器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-D6E2465E-E8E6-4B95-95D3-B9581E264ED1)"





##### 系统监视器进程 （SMON）

**系统监视器进程 （SMON）** 负责各种系统级清理职责。

分配给SMON的职责包括：

- 如有必要，在实例启动时执行实例恢复。在 Oracle RAC 数据库中，一个数据库实例的 SMON 进程可以对失败的实例执行实例恢复。
- 恢复在实例恢复期间由于文件读取或表空间脱机错误而跳过的已终止事务。SMON 在表空间或文件重新联机时恢复事务。
- 清理未使用的临时段。例如，Oracle 数据库在创建索引时分配扩展数据块。如果操作失败，则 SMON 将清理临时空间。
- 在字典管理的表空间中合并连续的可用扩展数据块。

SMON 会定期检查是否需要。如果其他进程检测到需要 SMON，则可以调用 SMON。





##### 数据库编写器进程 （DBW）

**数据库编写器进程 （DBW）** 将数据库缓冲区的内容写入数据文件。DBW 进程将数据库缓冲区缓存中修改的缓冲区写入磁盘。

尽管一个数据库编写器进程 （DBW0） 足以满足大多数系统的需求，但您可以配置其他进程（DBW1 到 DBW9、DBWa 到 DBWz 以及 BW36 到 BW99），以便在系统大量修改数据时提高写入性能。这些附加的 DBW 进程在单处理器系统上没有用。

在以下情况下，DBW 进程将脏缓冲区写入磁盘：

- 当服务器进程在扫描阈值数量的缓冲区后找不到干净的可重用缓冲区时，它会向 DBW 发出写入信号。如果可能，DBW 在执行其他处理时将脏缓冲区异步写入磁盘。
- DBW 定期写入缓冲区以推进检查点，[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)是[**重做线程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68F9BFC2-703C-48FF-BE8C-236FE3BC8977)中实例恢复开始的位置。检查点的日志位置由缓冲区缓存中最早的脏缓冲区确定。

在许多情况下，DBW 写入的块分散在整个磁盘中。因此，写入往往比 LGWR 执行的顺序写入慢。DBW 尽可能执行多块写入以提高效率。在多块写入中写入的块数因操作系统而异。

另请参阅：

- "[数据库缓冲区缓存](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-4FF66585-E469-4631-9225-29D75594CD14)"
- "[检查点概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-A6959126-0ECF-40A2-880D-D74A1BFB5BC4)"
- [Oracle 数据库性能调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-01C9C892-4C0B-4524-82B3-146D1C191BDD)提供有关配置、监控和调优 DBW 的建议





##### 日志编写器进程 （LGWR）

**日志编写器进程 （LGWR）** 管理联机重做日志缓冲区。

LGWR 将缓冲区的一部分写入联机重做日志。通过将修改数据库缓冲区、将脏缓冲区分散写入磁盘和执行快速顺序重做写入磁盘的任务分开，数据库提高了性能。

在以下情况下，LGWR 将写入自上次写入以来复制到缓冲区中的所有重做条目：

- 用户提交事务。

- 发生联机重做[**日志切换**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1A479613-DF95-469C-9C3B-D7DBA54F77F7)。

- 自LGWR上次撰写以来已经过去了三秒钟。

- 重做日志缓冲区已满三分之一或包含 1 MB 的缓冲数据。

- DBW 必须将修改后的缓冲区写入磁盘。

  在 DBW 可以写入脏缓冲区之前，数据库必须将与缓冲区更改（[**预写协议**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A20D57FC-78FF-4F09-868E-849806568EE7)）关联的重做记录写入磁盘。如果 DBW 发现某些重做记录尚未写入，它会向 LGWR 发出信号以将记录写入磁盘，并等待 LGWR 完成，然后再将数据缓冲区写入磁盘。

另请参阅：

"[事务提交](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-C3FE1082-94AA-4BE8-98F2-480205D99DCA)"





###### LGWR 和提交

Oracle 数据库使用快速提交机制来提高已提交事务的性能。

当用户发出语句时，将为事务分配一个**系统更改编号 （SCN）。**LGWR 将提交记录放入重做日志缓冲区中，并立即将其与提交 SCN 和事务的重做条目一起写入磁盘。`COMMIT`

重做日志缓冲区是循环的。当 LGWR 将重做日志缓冲区中的重做条目写入联机重做日志文件时，服务器进程可以在重做日志缓冲区中已写入磁盘的条目上复制新条目。LGWR 通常写入速度足够快，以确保缓冲区中始终有空间可用于新条目，即使访问在线重做日志很繁重也是如此。

包含事务提交记录的重做条目的原子写入是确定事务已提交的单个事件。Oracle 数据库向提交事务返回成功代码，尽管数据缓冲区尚未写入磁盘。对数据块的相应更改将推迟到 DBW 将它们写入数据文件时有效。

注意：LGWR 可以在事务提交之前将重做日志条目写入磁盘。仅当事务稍后提交时，受重做条目保护的更改才会成为永久性更改。

当活动频繁时，LGWR 可以使用组提交。例如，用户提交，导致 LGWR 将事务的重做条目写入磁盘。在此写入过程中，其他用户提交。LGWR 无法写入磁盘以提交这些事务，直到其上一次写入完成。完成后，LGWR 可以在一次操作中写入等待事务（尚未提交）的重做条目列表。这样，数据库可以最大程度地减少磁盘 I/O 并最大限度地提高性能。如果提交请求以较高的速率继续，则 LGWR 的每次写入都可以包含多个提交记录。





###### LGWR 和无法访问的文件

LGWR 同步写入联机重做日志文件的活动镜像组。

如果无法访问日志文件，则 LGWR 将继续写入组中的其他文件，并将错误写入 LGWR 跟踪文件和[**警报日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ACC7727F-41AE-47B1-AADB-2585EE828792)。如果组中的所有文件都已损坏，或者组由于尚未存档而不可用，则 LGWR 无法继续运行。

另请参阅：

- “[Oracle 数据库如何写入联机](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-09A16A4D-A618-4339-826E-E398A6B0FBF1)重做日志”和“[重做日志缓冲区](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-C2AD1BF6-A5AE-42E9-9677-0AA08126864B)”
- [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA553)性能调优指南，了解有关如何监控和调优 LGWR 性能的信息





##### 检查点流程

**检查点进程 （CKPT）** 使用检查点信息更新控制文件和数据文件头，并向 DBW 发出信号以将块写入磁盘。检查点信息包括检查点位置、SCN 和联机重做日志中用于开始恢复的位置。

如图 [15-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D3174B3E-BCCA-473F-961E-84A36FD5C372__BABEACIA) 所示，CKPT 不会将数据块写入数据文件或将重做块写入在线重做日志文件。

图 15-4 检查点进程

![图 15-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt228.gif)
[“图 15-4 检查点进程”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt228.html)

另请参阅：

"[检查点概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-A6959126-0ECF-40A2-880D-D74A1BFB5BC4)"





##### 可管理性监控流程（MMON 和 MMNL）

**可管理性监视器进程 （MMON**） 执行许多与**自动工作负载存储库 （AWR）** 相关的任务。

例如，当**指标**违反其阈值时，MMON 会写入、拍摄快照并捕获最近修改的 SQL 对象的统计信息值。

可管理性监视器精简版进程 （MMNL） 将统计信息从 SGA 中的活动会话历史记录 （ASH） 缓冲区写入磁盘。当 ASH 缓冲区已满时，MMNL 将写入磁盘。

另请参阅：

“[自动工作负载存储库 （AWR）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-1C0B57E9-1D1D-4C48-8A3D-5F56160435ED)”和“[活动会话历史记录 （ASH）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-12C38C77-BD4A-4D0D-8A67-FF7BF2167C77)”





##### 恢复器工艺

在分布式数据库中，**恢复程序进程 （RECO）** 会自动解决分布式事务中的故障。

节点的 RECO 进程会自动连接到不确定分布式事务中涉及的其他数据库。当 RECO 在数据库之间重新建立连接时，它会自动解析所有未决事务，从每个数据库的挂起事务表中删除与已解析事务对应的任何行。

另请参阅：

[Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12287)了解有关分布式系统中事务恢复的更多信息





#### 可选后台进程

可选后台进程是未定义为必需的任何后台进程。

大多数可选的后台进程特定于任务或功能。例如，支持 Oracle ASM 的后台进程仅在启用此功能时可用。

本节介绍一些常见的可选过程：

- [归档程序进程 （ARCn）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-7D7CB783-4CE9-4005-8D1D-B3FED61BF887)
- [作业队列进程（CJQ0 和 Jnnn）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-C67612E5-CA83-4AE0-B56D-05993A8B38F9)
- [闪回数据存档流程 （FBDA）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-20C38AD6-B413-4D04-A21C-A7B81280A153)
- [空间管理协调员流程 （SMCO）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-CBC4114F-88A1-442C-9327-7D36460E9EFC)

另请参阅：

- "[Oracle Database Advanced Queue （AQ）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-7CCB29F5-6B3B-4D15-B428-D10A6BFB35D5)"
- [Oracle 数据库参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN104)了解特定于 AQ 和 Oracle ASM 的后台进程的说明





##### 归档程序进程 （ARC*n*)

**存档程序进程 （ARCn）** 在发生重做日志切换后将联机重做日志文件复制到脱机存储。

这些进程还可以收集事务重做数据并将其传输到[**备用数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-728D4956-0F56-4D39-A63A-2E3FF5CCEDE4)目标。仅当数据库处于归档[**日志模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1AA9F015-FD15-4A08-BE06-04F0A6797782)并启用了自动归档时，ARC*n* 进程*才*存在。

另请参阅：

- "[存档的重做日志文件](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-4E3F6CAA-453F-4518-83B9-B3A3CCF11B2E)"
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11337)，了解如何调整归档程序进程数
- [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA553)性能调优指南，了解如何调优归档器性能





##### 作业队列进程（CJQ0 和 Jnnn）

**队列进程**通常以批处理模式运行用户作业。作业是计划运行一次或多次的用户定义任务。

例如，可以使用作业队列在后台计划长时间运行的更新。给定开始日期和时间间隔，作业队列进程将尝试在该间隔的下一次出现时运行作业。

Oracle 数据库动态管理作业队列进程，从而使作业队列客户端能够在需要时使用更多作业队列进程。数据库在新进程空闲时使用的资源时释放它们。

动态作业队列进程可以按给定间隔并发运行多个作业。事件的顺序如下：

1. 作业协调器进程 （CJQ0） 由 Oracle 调度程序根据需要自动启动和停止。协调器进程会定期从系统表中选择需要运行的作业。选择的新作业按时间排序。`JOB$`
2. 协调器进程动态生成作业队列从进程 （Jnnn） 以运行作业。
3. 作业队列进程运行 CJQ0 进程选择执行的作业之一。每个作业队列进程一次运行一个作业直至完成。
4. 进程完成单个作业的执行后，它会轮询更多作业。如果没有计划执行作业，则它会进入睡眠状态，定期从该状态唤醒并轮询更多作业。如果进程未找到任何新作业，则在预设间隔后终止。

初始化参数表示可以在实例上并发运行的最大作业队列进程数。但是，客户端不应假定所有作业队列进程都可用于作业执行。`JOB_QUEUE_PROCESSES`

注：如果初始化参数 `JOB_QUEUE_PROCESSES` 设置为 0，则不会启动协调器进程。

另请参阅：

- "[Oracle调度程序](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-077CBA84-5099-4550-AA11-250B301B609A)"
- 了解 Oracle 调度程序作业的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN034)
- 了解 AQ 后台进程的 [Oracle 数据库高级排队用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADQUE2530)





##### 闪回数据存档流程 （FBDA）

**闪回数据存档过程 （FBDA）** 将跟踪表的历史行存档到闪回数据存档中。

当跟踪表上包含 DML 的事务提交时，此过程会将已更改行的前映像存储到闪回数据存档中。它还将元数据保留在当前行上。

FBDA 自动管理闪回数据存档的空间、组织和保留。此外，该过程还会跟踪跟踪事务的存档时间。





##### 空间管理协调员流程 （SMCO）

SMCO 流程协调各种空间管理相关任务的执行。

典型任务包括主动空间分配和空间回收。SMCO 动态生成从进程 （W*nnn*） 来实现任务。

另请参阅：

[Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS01011)，了解闪回数据归档和时态历史记录功能





#### 从进程

从进程是代表其他进程执行工作的后台进程。

本节介绍 Oracle 数据库使用的一些从进程。

另请参阅：

Oracle 数据库参考，了解 [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN104)从进程的说明





##### I/O 从进程

I/O 从进程 （Innn） 模拟不支持它的系统和设备的异步 I/O。

在异步 I/O 中，传输没有计时要求，使其他进程能够在传输完成之前启动。

例如，假设应用程序将 1000 个块写入不支持异步 I/O 的操作系统上的磁盘。每次写入按顺序进行，并等待确认写入成功。使用异步磁盘，应用程序可以批量写入块并执行其他工作，同时等待操作系统响应所有块都已写入。

为了模拟异步 I/O，一个进程监督多个从进程。调用程序进程将工作分配给每个从进程，每个从进程等待每次写入完成，并在完成后向调用程序报告。在真正的异步 I/O 中，操作系统等待 I/O 完成并向进程报告，而在模拟异步 I/O 中，从属服务器等待并向调用者报告。

该数据库支持不同类型的 I/O 从站，包括：

- 用于恢复管理器 （RMAN） 的 I/O 从站

  使用 RMAN 备份或恢复数据时，您可以对磁盘和磁带设备使用 I/O 从站。

- 数据库写入器从属

  如果使用多个数据库编写器进程是不切实际的，例如当计算机有一个 CPU 时，则数据库可以在多个从进程上分配 I/O。DBW 是扫描缓冲区缓存 LRU 列表中以查找要写入磁盘的块的唯一进程。但是，I/O 从站为这些块执行 I/O。

另请参阅：

- Oracle 数据库备份和恢复用户指南，了解有关用于[备份和恢复](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV90069)操作的 I/O 从站的更多信息
- [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-01C9C892-4C0B-4524-82B3-146D1C191BDD)，了解有关数据库写入器从属服务器的更多信息





##### 并行执行 （PX） 服务器进程

在**并行执行**中，多个进程同时协同工作以运行单个 SQL 语句。

通过在多个进程之间划分工作，Oracle 数据库可以更快地运行语句。例如，四个流程在一年中处理四个不同的季度，而不是一个流程单独处理所有四个季度。

并行执行与串行执行形成对比，[**在串行**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-02F8D8C0-F2BC-44CF-8383-9803180F76F7)执行中，单个服务器进程执行顺序执行 SQL 语句所需的所有处理。例如，要执行[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)，例如 ，一个服务器进程执行所有工作，如图 [15-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-B25C8454-BFBD-40F7-AF80-5029C93AAE42__BABDHFIC) 所示。`SELECT * FROM employees`

图 15-5 串行全表扫描

![图 15-5 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt016.gif)
[“图 15-5 串行全表扫描”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt016.html)

并行执行可缩短对大型数据库（如数据仓库）执行数据密集型操作的响应时间。对称多处理 （SMP） 和集群系统从并行执行中获得最大的性能优势，因为语句处理可以在多个 CPU 之间拆分。并行执行还可以使某些类型的 [**OLTP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-709E943F-FF0E-4AA6-979A-C4CB2A7B0C29) 和混合系统受益。

在 Oracle RAC 系统中，特定服务的服务放置控制并行执行。具体而言，并行进程在配置服务的节点上运行。默认情况下，Oracle 数据库仅在提供用于连接到数据库的服务的实例上运行并行进程。这不会影响其他并行操作，例如并行恢复或查询处理。`GV$`

另请参阅：

- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG010)，了解有关并行执行的更多信息
- [Oracle 真实应用集群管理和部署指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD7124)了解在 Oracle RAC 环境中并行执行的注意事项





###### 查询协调员

在并行执行中，服务器进程充当**查询**协调器（也称为*并行执行协调器*）。

查询协调员负责以下工作：

1. 解析查询
2. 分配和控制并行执行服务器进程
3. 向用户发送输出

给定查询的[**查询计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)，协调器将 SQL 查询中的每个运算符分解为并行部分，按查询中指定的顺序运行它们，并集成执行[**运算符**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4BC5B7D2-6483-4742-AD66-E0B7C39047E3)的并行执行服务器生成的部分结果。

分配给单个操作的并行执行服务器数是操作的[**并行度**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C5F5E0B5-C13F-42F3-B8C4-ADCB4290C980)。同一 SQL 语句中的多个操作都具有相同的并行度。





###### 生产者和消费者

并行执行服务器分为生产者和使用者。生产者负责处理他们的数据，然后将其分发给需要它的消费者。

数据库可以使用各种技术执行分发。两种常见的技术是广播和哈希。在广播中，每个生产者将行发送给所有使用者。在哈希中，数据库在一组键上计算哈希函数，并使每个使用者负责哈希值的子集。

[图 15-6](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-61E6A6E3-3477-44F5-9E8D-12F607BF2D83__BABIDAFF) 表示在并行执行以下语句时生产者和使用者之间的相互作用：

```
CopySELECT * FROM employees ORDER BY last_name;
```

执行计划实现对表的完全扫描。扫描后跟检索到的行。扫描操作中涉及的所有生产者进程都将行发送到执行排序的相应使用者进程。`employees`

图 15-6 生产者和消费者

![图 15-6 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/vldbg013.gif)
[“图 15-6 生产者和消费者”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/vldbg013.html)





###### 颗粒

在并行执行中，表动态划分为荷载单元。每个单元称为**颗粒**，是访问数据时的最小工作单元。

基于块的颗粒是由单个并行执行服务器（也称为 *PX 服务器*）读取的表的一系列数据块，用作名称格式。为了在并行服务器进程之间均匀分配工作，颗粒数始终远高于请求的 DOP。`Pnnn`

[图 15-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-DC997182-FB4F-4FD2-ACCD-654E1D623239__I3086) 显示了该表的并行扫描。`employees`

图 15-7 并行全表扫描

![Description of Figure 15-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt017.gif)
[“图 15-7 并行全表扫描”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt017.html)

数据库在执行时将颗粒映射到并行执行服务器。当并行执行服务器完成读取与颗粒对应的行并且颗粒保留时，它会从查询协调器获取另一个颗粒。此操作将一直持续到读取表为止。执行服务器将结果发送回协调器，协调器将这些片段组装到所需的[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)中。

另请参阅：

- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG010)，了解如何使用并行执行
- [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG8371)，了解建议的并行性初始化参数

## 16 应用和 Oracle 网络服务体系结构

本章定义应用程序体系结构，并描述 Oracle 数据库和数据库应用程序在分布式处理环境中的工作方式。本材料几乎适用于所有类型的 Oracle 数据库环境。

本章包含以下部分：

- [Oracle 应用schema概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-9868FA17-14C8-476E-8FB2-ABC6079C2FF4)
- [Oracle 网络服务schema概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-136C7637-89B5-4C5A-B186-E06F86CE2359)
- [程序界面概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-CDA565D5-091A-4794-BA5A-F66A13941275)





### Oracle 应用schema概述

在本章的上下文中，应用程序**体系结构**是指数据库应用程序连接到 Oracle 数据库的计算环境。

本节包含以下主题：

- [客户端/服务器体系结构概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-C0113B6B-4377-4950-BFD4-CAC9FAB072DA)
- [多层体系结构概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-A65D8A2C-2DE0-4438-A042-54A3C07FF006)
- [网格体系结构概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-DD9E93CC-ED99-4998-BE3C-41C20B0995A3)





#### 客户端/服务器体系结构概述

在 Oracle 数据库环境中，数据库应用程序和数据库被分离到一个**客户端/服务器体系结构**中。

组件如下：

- [**客户端**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F642154F-091E-4D5A-9562-401324055F1F)运行数据库应用程序，例如 SQL*Plus 或 Visual Basic 数据输入程序，该程序访问数据库信息并与用户交互。
- [**服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A3046A66-CC14-47F6-8F91-BDF097F1CA05)运行 Oracle 数据库软件，并处理对 Oracle 数据库进行并发共享数据访问所需的功能。

尽管客户端应用程序和数据库可以在同一台计算机上运行，但当客户端部分和服务器部分由通过网络连接的不同计算机运行时，通常会实现更高的效率。以下各节讨论 Oracle 数据库客户端/服务器体系结构中的变体。





##### 分布式处理

使用多个主机处理单个任务称为**分布式处理**。

前端和后端处理发生在不同的计算机上。[在图 16-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-E8724DB4-A0BC-4ED9-83A1-BDC55CA15FAE__I7696) 中，客户端和服务器位于通过 Oracle 网络服务连接的不同主机上。

图 16-1 客户端/服务器体系结构和分布式处理

![Description of Figure 16-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt083.gif)
[“图 16-1 客户端/服务器体系结构和分布式处理”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt083.html)

[图 16-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-E8724DB4-A0BC-4ED9-83A1-BDC55CA15FAE__CHDJDFJG) 是描述[**分布式数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DB7296DF-74E0-45E1-9BC2-5052DD543214)的变体。在此示例中，一个主机上的数据库访问位于另一个主机上的单独数据库上的数据。

图 16-2 客户端/服务器体系结构和分布式数据库

![Description of Figure 16-2 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt240.gif)
[“图 16-2 客户端/服务器体系结构和分布式数据库”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt240.html)

注：本章的其余部分适用于一台服务器上有一个数据库的环境。





##### 客户端/服务器体系结构的优点

分布式处理环境中的 Oracle 数据库客户端/服务器schema具有许多优势。

好处包括：

- 客户端应用程序不负责执行数据处理。相反，它们请求用户输入，从服务器请求数据，然后使用客户端工作站或终端的显示功能（例如，使用图形或电子表格）分析和呈现此数据。
- 客户端应用程序不依赖于数据的物理位置。即使数据被移动或分发到其他数据库服务器，应用程序也无需修改即可继续运行。
- Oracle 数据库利用其底层操作系统的多任务和共享内存功能。因此，它为其客户端应用程序提供了尽可能高的并发性、数据完整性和性能。
- 客户端工作站或终端可以针对数据的呈现进行优化（例如，通过提供图形和鼠标支持），而服务器可以针对数据的处理和存储进行优化（例如，通过具有大量内存和磁盘空间）。
- 在网络环境中，您可以使用廉价的客户端工作站有效地访问服务器的远程数据。
- 数据库可以随着系统的增长而扩展。您可以添加多个服务器以在整个网络中分配数据库处理负载（水平扩展），也可以将数据库移动到小型计算机或大型机以利用较大系统的性能（垂直扩展）。无论哪种情况，数据和应用程序都只需很少或无需修改即可维护，因为 Oracle 数据库可以在系统之间移植。
- 在网络环境中，共享数据存储在服务器上，而不是存储在所有计算机上，从而更容易、更高效地管理并发访问。
- 在网络环境中，客户端应用程序使用 SQL 语句向服务器提交数据库请求。收到后，服务器会处理每个 SQL 语句，并将结果返回给客户端。网络流量最小化，因为只有请求和结果通过网络传送。

另请参阅：

[《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN028)了解有关分布式数据库的更多信息





#### 多层体系结构概述

在传统的多层体系结构中，应用程序服务器为客户端提供数据，并充当客户端和数据库服务器之间的接口。

此体系结构允许使用应用程序服务器执行以下操作：

- 验证客户端（如 Web 浏览器）的凭据
- 连接到数据库服务器
- 执行请求的操作

多层体系结构的示例如图 [16-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-A65D8A2C-2DE0-4438-A042-54A3C07FF006__I5360) 所示。

图 16-3 多层体系结构环境

![Description of Figure 16-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt121.gif)
[“图 16-3 多层体系结构环境”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt121.html)





##### 客户

客户端发起要在数据库服务器上执行的操作的请求。

客户端可以是 Web 浏览器或其他最终用户程序。在多层体系结构中，客户端通过一个或多个应用程序服务器连接到数据库服务器。





##### 应用程序服务器

应用程序服务器为客户机提供对数据的访问。它充当客户端与一个或多个数据库服务器之间的接口，并承载应用程序。

应用程序服务器允许瘦客户机（即配备最少软件配置的客户机）访问应用程序，而无需对客户机进行持续维护。应用程序服务器还可以为客户机执行数据重新格式化，从而减少客户机工作站上的负载。

应用程序服务器在数据库服务器上为此客户机执行操作时，假定客户机的标识。最佳做法是限制应用程序服务器的特权，以防止它在客户机操作期间执行不需要和不需要的操作。





##### 数据库服务器

数据库服务器代表客户机提供应用程序服务器请求的数据。数据库执行查询处理。

数据库服务器可以代表客户机和它自己审计应用程序服务器执行的操作。例如，客户机操作可以请求要在客户机上显示的信息，而应用程序服务器操作可以请求与数据库服务器的连接。

在统一审核中，数据库可以将应用程序上下文（特定于应用程序的名称/值对）追加到统一审核跟踪中的记录。您可以配置数据库写入数据库审核记录的应用程序上下文。

另请参阅：

- "[数据访问监控](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-B4C43A8E-A9CF-42C1-947E-FA234CF49B62)"
- "[数据库审计](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-377114CE-BCB9-4135-A8EE-44FFA43F1D6E)"





##### 面向服务的体系结构 （SOA）

数据库可以在传统的多层或**面向服务的体系结构 （SOA）** 环境中充当 Web 服务提供程序。

SOA 是一种多层体系结构，依赖于支持通过网络进行计算机到计算机交互的服务。在 SOA 上下文中，服务是一个自给自足的功能端点，它具有定义良好的功能和服务级别协议，可以监视和管理，并且可以帮助强制实施策略合规性。

SOA 服务通常实现为可通过 HTTP 协议访问的 Web 服务。它们基于 XML 标准，如 WSDL 和 SOAP。

Oracle Database Web Service 功能是作为 Oracle XML DB 的一部分实现的，必须由 DBA 专门启用。然后，应用程序可以通过数据库 Web 服务完成以下操作：

- 提交 SQL 或 XQuery 查询并以 XML 格式接收结果
- 调用独立的 PL/SQL 函数并接收结果
- 调用 PL/SQL 包函数并接收结果

数据库 Web 服务提供了一种将 Web 服务添加到应用程序环境的简单方法，而无需应用程序服务器。但是，通过应用程序服务器（如 Oracle Fusion 中间件）调用 Web 服务可在 SOA 环境中提供安全性、可扩展性、UDDI 注册和可靠的消息传递。但是，由于数据库 Web 服务很容易与 Oracle Fusion 中间件集成，因此它们可能适合于优化 SOA 解决方案。

另请参阅：

- "[PL/SQL 子程序](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-7C398775-F4FB-47A2-AED5-458E00FB1E35)"
- [Oracle XML 开发人员工具包程序员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDB-GUID-108279B4-0315-4D8D-86A2-6487767ED280)了解有关启用和使用数据库 Web 服务的信息
- Oracle 融合中间件文档，了解有关 SOA 和 Web 服务的更多信息





#### 网格体系结构概述

在 Oracle 数据库环境中，网格计算是一种计算schema，可有效地将大量服务器和存储汇集到灵活的按需**计算**资源中。

模块化硬件和软件组件可以按需连接和重新连接，以满足企业不断变化的需求。

另请参阅：

“网格[计算概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-7223657D-9CF6-4C4D-954C-C2A1B5B46696)”，了解有关服务器和存储网格的更多详细信息





### Oracle 网络服务schema概述

**Oracle 网络服务**是一套网络组件，可在分布式异构计算环境中提供企业级连接解决方案。

Oracle 网络服务支持从应用程序到数据库实例的网络会话，以及从数据库实例到另一个[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的网络会话。

Oracle 网络服务提供位置透明性、集中式配置和管理以及快速安装和配置。它还允许您最大限度地利用系统资源并提高性能。[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)体系结构增加了应用程序的可伸缩性和同时连接到数据库的客户端数量。虚拟接口 （VI） 协议将大部分消息传递负担放在高速网络硬件上，从而释放了 CPU。

Oracle 网络服务使用各种网络支持的通信协议或应用程序编程接口 （API） 来提供分布式数据库和分布式处理。建立网络会话后，Oracle 网络服务充当客户端应用程序和数据库服务器的数据信使，建立和维护连接并交换消息。Oracle 网络服务可以执行这些任务，因为它存在于网络中的每台计算机上。

本节包含以下主题：

- [Oracle 网络服务的工作原理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-3D96B45B-5C62-462C-9A2F-04F8A5098DD6)
- [Oracle网络侦听器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-D6E2465E-E8E6-4B95-95D3-B9581E264ED1)
- [专用服务器schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-94AFB4A0-4979-4B48-A19A-0D9178771FB1)
- [共享服务器体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-F3281DD9-B210-463E-B572-173816D2B161)
- [数据库驻留连接池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-531EEE8A-B00A-4C03-A2ED-D45D92B3F797)

另请参阅：

Oracle [数据库网络服务管理员指南，了解 Oracle 网络](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG1511)schema概述





#### Oracle 网络服务的工作原理

Oracle 数据库协议接受来自 Oracle 应用程序接口的 SQL 语句，然后打包它们以传输到 Oracle 数据库。

传输通过受支持的行业标准更高级别的协议或 API 进行。来自 Oracle 数据库的回复通过相同的更高级别的通信机制打包。这项工作独立于网络操作系统进行。

根据运行 Oracle 数据库的操作系统，数据库服务器的 Oracle 网络服务软件可能包含驱动程序软件并启动其他后台进程。

另请参阅：

Oracle Database Net Services [Administrator's Guide 了解有关 Oracle Net Services](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG1511) 工作原理的更多信息





#### Oracle网络侦听器

Oracle 网络侦听器（侦听器）是一个服务器端进程，用于**侦听**传入的客户端连接请求并管理到数据库的流量。当数据库实例启动时，以及在其生命周期中的不同时间，实例会联系侦听器并建立到该实例的通信路径。



服务注册使侦听器能够确定数据库服务及其服务处理程序是否可用。[**服务处理程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6ACAAC31-792E-45BD-94FB-9DD7A420B32D)是充当数据库连接点的专用[**服务器进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E660AC1C-B704-4DC1-A35A-DB49EFB34F4A)或调度程序。在注册期间，LREG 进程为侦听器提供实例名称、数据库服务名称以及服务处理程序的类型和地址。此信息使侦听器能够在客户端请求到达时启动服务处理程序。

下图显示了两个数据库，每个数据库位于单独的主机上。数据库环境由两个侦听器提供服务，每个侦听器位于单独的主机上。每个数据库实例中运行的 LREG 进程与两个侦听器通信以注册数据库。

图 16-4 两个侦听器

![Description of Figure 16-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt315.png)
[“图 16-4 两个侦听器”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt315.html)

[图 16-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-D6E2465E-E8E6-4B95-95D3-B9581E264ED1__CHDIBHAD) 显示了浏览器建立 HTTP 连接和客户端通过侦听器建立数据库连接。侦听器不需要驻留在数据库主机上。

图 16-5 侦听器体系结构

![Description of Figure 16-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt311.gif)
[“图 16-5 侦听器体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt311.html)

客户端通过侦听器建立连接的基本步骤是：

1. [**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)或其他数据库请求连接。
2. 侦听器选择适当的服务处理程序来为客户端请求提供服务，并将请求转发到处理程序。
3. 客户端进程直接连接到服务处理程序。侦听器不再参与通信。

另请参阅：

“客户端进程概述”和“[服务器进程概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-310F28E9-793A-4816-87CB-FDB54AB68957)”





##### 服务名称

**服务名称**是用于客户端连接的服务的逻辑表示形式。

当客户端连接到侦听器时，它会请求连接到服务。当数据库实例启动时，它会向侦听器注册自身，以按名称提供一个或多个服务。因此，侦听器充当客户端和实例之间的中介，并将连接请求路由到正确的位置。

侦听器已知的单个服务可以标识一个或多个数据库实例。此外，单个数据库实例可以向侦听器注册一个或多个服务。连接到服务的客户端无需指定所需的实例。

[图 16-6](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-C931A159-E1FE-4DB3-A811-510C42516683__CHDFGAED) 显示了一个与两个服务关联的单实例数据库，以及 .这些服务使不同的客户端能够以不同的方式标识同一数据库。数据库管理员可以限制或保留系统资源，从而允许为请求这些服务之一的客户端分配更好的资源。`book.example.com``soft.example.com`

图 16-6 与一个数据库关联的多个服务

![Description of Figure 16-6 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt314.gif)
[“图 16-6 与一个数据库关联的多个服务”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt314.html)

另请参阅：

[《Oracle 数据库网络服务管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG008)》，了解有关命名方法的更多信息





##### 服务注册

在 Oracle Net 中，服务注册是 LREG 进程向侦听器动态**注册**实例信息的功能。

此信息使侦听器能够将客户端连接请求转发到相应的服务处理程序。LREG 为侦听器提供有关以下内容的信息：

- 数据库提供的数据库服务的名称
- 与服务关联的数据库实例的名称及其当前和最大负载
- 可用于实例的服务处理程序（调度程序和专用服务器），包括其类型、协议地址以及当前和最大负载

服务注册是动态的，不需要在文件中进行配置。动态注册可减少多个数据库或实例的管理开销。`listener.ora`

初始化参数列出实例所属的服务。启动时，每个实例都会向属于相同服务的其他实例的侦听器注册。在数据库操作期间，每个服务的实例将有关 CPU 使用率和当前连接计数的信息传递给同一服务中的所有侦听器。此通信支持动态负载平衡和连接故障转移。`SERVICE_NAMES`

另请参阅：

- "[侦听器注册流程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-9641E79F-7A45-4AB6-9A89-BF7D4C25269A)"
- [Oracle 数据库网络服务管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG1080)，了解有关服务注册的更多信息
- Oracle [真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD7273)，了解 Oracle RAC 中的实例注册和客户端/服务连接





#### 专用服务器schema

在专用服务器体系结构中，代表每个客户端进程创建的服务器进程称为**专用服务器**进程（或*影子进程*）。

专用服务器进程独立于客户端进程，仅代表客户端进程执行操作，如图 [16-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-94AFB4A0-4979-4B48-A19A-0D9178771FB1__CHDEECGC) 所示。

图 16-7 使用专用服务器进程的 Oracle 数据库

![Description of Figure 16-7 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt303.gif)
[“图 16-7 使用专用服务器进程的 Oracle 数据库”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt303.html)

客户端进程和服务器进程之间存在 1：1 的比率。即使用户未主动发出数据库请求，专用服务器进程仍会保留 — 尽管它处于非活动状态，并且可以在某些操作系统上分页。

[图 16-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-94AFB4A0-4979-4B48-A19A-0D9178771FB1__CHDEECGC) 显示了在联网计算机上运行的用户和服务器进程。但是，如果同一台计算机同时运行客户端应用程序和数据库代码，但如果在单个进程中运行这两个程序，则主机操作系统无法保持这两个程序的分离，则也会使用专用服务器体系结构。Linux就是这种操作系统的一个例子。

在专用服务器体系结构中，用户和服务器进程使用不同的机制进行通信：

- 如果客户端进程和专用服务器进程在同一台计算机上运行，则程序接口使用主机操作系统的进程间通信机制来执行其作业。
- 如果客户端进程和专用服务器进程在不同的计算机上运行，则程序接口提供程序之间的通信机制（如网络软件和Oracle Net服务）。

未充分利用的专用服务器有时会导致操作系统资源的低效使用。考虑具有专用服务器进程的订单输入系统。当店员将订单输入数据库时，客户下订单。对于大多数事务，职员正在与客户交谈，而专用于职员客户端进程的服务器进程处于空闲状态。在大多数事务中不需要服务器进程，如果系统管理太多进程，则对于其他职员输入订单，系统可能会变慢。对于这种类型的应用程序，共享服务器体系结构可能更可取。

另请参阅：

[Oracle 数据库网络服务管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG185)，了解有关专用服务器进程的更多信息





#### 共享服务器体系结构

在共享服务器体系结构中，调度程序将多个传入的网络会话请求定向到**共享服务器**进程池

共享池消除了对每个连接专用服务器进程的需求。池中的空闲共享服务器进程从公共队列中选取请求。

共享服务器的潜在好处如下：

- 减少操作系统上的进程数

  少量共享服务器可以执行与许多专用服务器相同的处理量。

- 减少实例 PGA 内存

  每个专用或共享服务器都有一个 PGA。更少的服务器进程意味着更少的 PGA 和更少的进程管理。

- 提高应用程序的可伸缩性和可同时连接到数据库的客户端数量

- 当客户端连接和断开连接速率较高时，可能比专用服务器更快

共享服务器有几个缺点，包括在某些情况下响应时间较慢、功能支持不完整以及设置和调整的复杂性增加。作为一般准则，仅当与数据库的并发连接数超过操作系统可以处理的数量时，才使用共享服务器。

共享服务器体系结构中需要以下过程：

- 将客户端进程连接到调度程序或专用服务器的网络侦听器（侦听器是 Oracle 网络服务的一部分，而不是 Oracle 数据库）

  注：要使用共享服务器，客户端进程必须通过 Oracle 网络服务进行连接，即使该进程与 Oracle 数据库实例在同一台计算机上运行也是如此。

- 一个或多个[**调度程序进程 （Dnnn）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-44794465-800D-48D2-ACB5-851066E3AF91)

- 一个或多个共享服务器进程

数据库可以同时支持共享服务器和专用服务器连接。例如，一个客户端可以使用专用服务器进行连接，而另一个客户端可以使用共享服务器连接到同一数据库。

另请参阅：

- [Oracle 数据库网络服务管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG154)了解有关共享服务器体系结构的详细信息
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN00502)，了解如何为共享服务器配置数据库





##### 调度程序请求和响应队列

来自用户的请求是单个 API 调用，是用户 SQL 语句的一部分。

当用户进行调用时，将执行以下操作：

1. 调度程序将请求放在请求队列中，下一个可用的共享服务器进程将在其中拾取该请求。

   请求队列位于 SGA 中，对于实例的所有调度程序进程都是通用的。

2. 共享服务器进程检查公共请求队列中是否有新请求，以先进先出的方式选取新请求。

3. 一个共享服务器进程在队列中选取一个请求，并对数据库进行所有必要的调用以完成此请求。

   不同的服务器进程可以处理每个数据库调用。因此，分析查询、读取第一行、读取下一行和关闭结果集的请求可能分别由不同的共享服务器处理。

4. 当服务器进程完成请求时，它会将响应放在调用调度程序的响应队列上。每个调度程序都有自己的响应队列。

5. 调度程序将完成的请求返回到相应的客户端进程。

例如，在订单输入系统中，每个职员的客户端流程都连接到调度员。职员发出的每个请求都会发送到此调度员，调度程序将请求放入队列中。下一个可用的共享服务器拾取请求，为其提供服务，并将响应放入响应队列中。请求完成后，职员仍与调度程序保持连接，但处理请求的共享服务器将被释放并可用于其他请求。当一个职员与客户交谈时，另一个职员可以使用相同的共享服务器进程。

[图 16-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-EC8F8778-02B7-4CF9-9E6F-A5D88C777235__BEIDDFDG) 显示了客户端进程如何通过 API 与调度程序通信，以及调度程序如何将用户请求传达给共享服务器进程。

图 16-8 共享服务器配置和进程

![Description of Figure 16-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt067.gif)
[“图 16-8 共享服务器配置和进程”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt067.html)

另请参阅：

"[大型游泳池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-1ECB5213-AC4E-4BB4-9113-91C761676B34)"





###### 调度程序进程 （D*nnn*)

**调度程序**进程使客户端进程能够共享有限数量的服务器进程。

您可以为单个数据库实例创建多个调度程序进程。调度程序进程的最佳数量，具体取决于操作系统限制和每个进程的连接数。

注：连接到调度程序的每个客户端进程都必须使用 Oracle 网络服务，即使这两个进程在同一主机上运行也是如此。

调度程序进程按如下方式建立通信：

1. 实例启动时，网络侦听器进程将打开并建立用户连接到 Oracle 数据库的通信路径。

2. 每个调度程序进程都为侦听器进程提供一个地址，调度程序在该地址侦听连接请求。

   必须为数据库客户机将使用的每个网络协议配置并启动至少一个调度程序进程。

3. 当客户端进程发出连接请求时，侦听器确定客户端进程是否应使用共享服务器进程：

   - 如果侦听器确定需要共享服务器进程，则侦听器返回负载最轻的调度程序进程的地址，客户端进程直接连接到调度程序。
   - 如果进程无法与调度程序通信，或者客户端进程请求专用服务器，则侦听器将创建专用服务器进程并建立适当的连接。

另请参阅：

[Oracle 数据库网络服务管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG012)，了解如何配置调度程序





###### 共享服务器进程 （S*nnn*)

每个共享服务器进程在共享服务器配置中为多个客户端请求提供服务。

共享服务器进程和专用服务器进程提供相同的功能，但共享服务器进程不与特定客户端进程关联。相反，共享服务器进程为共享服务器配置中的任何客户端请求提供服务。

共享服务器进程的 PGA 不包含 UGA 数据，所有共享服务器进程都必须可以访问这些数据。共享服务器 PGA 仅包含特定于进程的数据。

所有与会话相关的信息都包含在 SGA 中。每个共享服务器进程都必须能够访问所有会话的数据空间，以便任何服务器都可以处理来自任何会话的请求。SGA 中为每个会话的数据空间分配空间。

另请参阅：

"[计划全球区域 （PGA） 概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-859795E2-87CD-442B-B36F-584A77755F59)"





##### 共享服务器的受限操作

连接到调度程序进程时无法执行特定的管理活动，包括关闭或启动实例以及介质恢复。

这些活动通常在与管理员权限连接时执行。要在配置了共享服务器的系统中以管理员权限进行连接，必须指定使用的是专用服务器进程。

另请参阅：

[Oracle 数据库网络服务管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG327)了解正确的连接字符串语法





#### 数据库驻留连接池

数据库驻留连接池 （DRCP） 为典型的 Web 应用程序方案提供专用服务器的连接池。

Web 应用程序通常会建立数据库连接，短暂使用该连接，然后释放它。通过DRCP，数据库可以扩展到数万个同时连接。

DRCP 具有以下优点：

- 补充中间层连接池，这些连接池在中间层进程中的线程之间共享连接。
- 允许在多个中间层进程之间共享数据库连接。这些中间层进程可能属于相同或不同的中间层主机。
- 显著减少支持许多客户端连接所需的关键数据库资源。例如，DRCP 减少了数据库所需的内存，并提高了数据库和中间层的可伸缩性。可用服务器池还降低了重新创建客户端连接的成本。
- 为具有多进程、单线程应用程序服务器（如 PHP 和 Apache ）的体系结构提供池化，这些服务器无法执行中间层连接池。

DRCP 使用池服务器，这相当于专用服务器进程（不是共享**服务器**进程）和数据库会话的组合。池服务器模型避免了为短时间内需要服务器的每个连接专用服务器开销。

从数据库驻留连接池获取连接的客户端连接到称为连接代理的 Oracle 后台进程。连接代理实现池功能，并在来自客户端进程的入站连接之间多路复用池服务器。

[如图 16-9](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-531EEE8A-B00A-4C03-A2ED-D45D92B3F797__CHDHGCAC) 所示，当客户端需要数据库访问权限时，连接代理从池中选取服务器进程并将其移交给客户端。客户端直接连接到服务器进程，直到请求得到服务。服务器完成后，服务器进程将释放到池中。来自客户端的连接将恢复到代理。

图 16-9 DRCP

![Description of Figure 16-9 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt312.gif)
[“图 16-9 DRCP”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt312.html)

在 DRCP 中，释放资源会使会话保持不变，但不再与连接（服务器进程）关联。与共享服务器不同，此会话将其 UGA 存储在 PGA 中，而不是 SGA 中。客户端可以在检测到活动时透明地重新建立连接。

另请参阅：

- "[连接和会话](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-3A11FF2F-50EE-4839-A1A6-F746DFF634AB)"
- Oracle Database Administrator's Guide 和 [Oracle Call Interface Programmer's Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNOCI9110) 以了解有关 DRCP 的更多信息





### 程序界面概述

**程序接口**是数据库应用程序和Oracle数据库之间的软件层。

程序接口执行以下功能：

- 提供安全屏障，防止客户端进程对 SGA 的破坏性访问
- 充当通信机制，格式化信息请求、传递数据以及捕获和返回错误
- 转换和转换数据，特别是在不同类型的计算机之间或外部用户程序数据类型

**Oracle 代码**充当服务器，代表应用程序（客户端）执行数据库任务，例如从数据块中获取行。程序界面由几个部分组成，由Oracle数据库软件和特定于操作系统的软件提供。





#### 程序接口结构

程序界面由几个不同的组件组成。

这些组件包括：

- Oracle 调用接口 （OCI） 或 Oracle 运行时库 （SQLLIB）
- 程序接口的客户端或用户端
- 各种 Oracle 网络服务驱动程序（特定于协议的通信软件）
- 操作系统通信软件
- 程序接口的服务器端或 Oracle 数据库端（也称为 OPI）

程序界面的用户端和Oracle数据库端运行Oracle软件，驱动程序也是如此。





#### 程序接口驱动程序

驱动程序是一种传输数据的软件，通常通过网络传输数据。

驱动程序执行连接、断开连接、信号错误和测试错误等操作。驱动程序特定于通信协议。

默认驱动程序始终存在。可以安装多个驱动程序（如异步或 DECnet 驱动程序），并选择其中一个作为默认驱动程序，但允许用户通过在连接时指定驱动程序来使用其他驱动程序。

不同的进程可以使用不同的驱动程序。一个进程可以与单个数据库或使用不同 Oracle 网络服务驱动程序的多个数据库建立并发连接。

另请参阅：

- 有关选择、安装和添加驱动程序的详细信息的系统安装和配置指南
- [Oracle 数据库网络服务管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG1013)，了解 JDBC 驱动程序





#### 适用于操作系统的通信软件

将用户端连接到程序接口的Oracle数据库端的最低级软件是主机操作系统提供的通信软件。

DECnet，TCP / IP，LU6.2和ASYNC就是例子。通信软件可以由 Oracle 提供，但通常与硬件供应商或第三方软件供应商分开购买。

## 第六部分 Oracle 数据库管理和应用开发

本部分介绍对数据库管理员和应用程序开发人员至关重要的主题。

本部分包含以下章节：

- [面向数据库管理员和开发人员的主题](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-AEE1C84E-C1DA-4FF7-959F-79F44A7C2AFA)
- [数据库管理员的概念](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-8ED4D6B3-BF1D-4095-9BCD-6E5CCFDBE27C)
- [面向数据库开发人员的概念](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-77975EB5-81DD-4F31-BCC9-0537235B8653)

## 17 面向数据库管理员和开发人员的主题

本章总结了对数据库管理员和开发人员都很重要的常见数据库主题，并提供指向其他手册的指针，而不是数据库功能的详尽说明。

本章包含以下部分：

- [数据库安全概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-4D6D2B67-1B65-476D-852A-976E9D153EEC)
- [高可用性概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-5A26C2FD-EB17-4DF6-AC43-F73B98573707)
- [网格计算概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-7223657D-9CF6-4C4D-954C-C2A1B5B46696)
- [数据仓库和商业智能概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-E1451108-464E-4B5F-B173-11212278E308)
- [Oracle 信息集成概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-95778ED0-753B-4A2F-9AFF-1B4AB4E0A742)

另请参阅：

“[数据库管理员概念](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-8ED4D6B3-BF1D-4095-9BCD-6E5CCFDBE27C)”（针对特定于 DBA 的主题）和“数据库开发人员概念”（针对特定于数据库开发人员的主题）和“数据库开发人员概念”（针对特定于[数据库开发人员](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-77975EB5-81DD-4F31-BCC9-0537235B8653)的主题）





### 数据库安全概述

通常，**数据库安全**涉及用户身份验证、加密、访问控制和监控。

本节包含以下主题：

- [用户帐户](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-CE700CE1-BF1B-48C0-A905-50CEE055C4BC)
- [数据库身份验证](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-AE69001D-BABC-49E0-9D57-B64E2437747C)
- [加密](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-089EA93B-59AA-49D4-9EDD-B5D1C5B1D27F)
- [Oracle数据修订](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-BFFE53DD-5EEE-49C2-AF17-3F6DEAF7A6D1)
- [取向](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-A1B1E653-483F-4F2F-931D-12A32AB0C2E0)
- [数据访问监控](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-B4C43A8E-A9CF-42C1-947E-FA234CF49B62)





#### 用户帐户

每个 Oracle 数据库都有一个有效数据库用户的列表。

数据库包含多个默认帐户，包括默认管理帐户。您可以根据需要创建用户帐户。您还可以将应用程序用户配置为访问 Oracle 数据库。`SYSTEM`

若要访问数据库，用户必须提供有效的用户名和身份验证凭据。凭据可以是密码、Kerberos 票证或公钥基础结构 （PKI） 证书。您可以配置数据库安全性以根据失败的登录尝试锁定帐户。

通常，数据库[**访问控制**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-629E6254-1445-4A2B-AC98-08045A654263)涉及限制数据访问和数据库活动。例如，您可以限制用户查询指定的表或执行指定的数据库语句。

另请参阅：

- "[系统和系统schema](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97709804-7430-4BD0-AFF4-727B74F6997E)"
- 了解管理用户帐户的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11042)
- [Oracle 数据库实际应用安全管理员和开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBFSG20000)，了解如何配置应用用户





##### 特权

**用户特权**是运行特定 SQL 语句的权限。

特权分为以下几类：

- 系统权限

  这是在数据库中执行特定操作或对特定类型的任何对象执行操作的权限。例如，和是系统权限。`CREATE USER``CREATE SESSION`

- 对象权限

  这是对对象执行特定操作（例如，查询表）的权限。权限类型由数据库定义。`employees`

权限由其他用户自行决定授予用户。管理员应向用户授予权限，以便他们可以完成其作业所需的任务。良好的安全实践包括仅向需要该特权才能完成必要工作的用户授予特权。

另请参阅：

- 了解视图的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN29027)`SESSION_PRIVS`





##### 角色

角色是一组命名的相关权限，用户可以将其授予其他用户或**角色**。角色有助于管理数据库应用程序或用户组的权限。

[图 17-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-4BE5B93D-E95A-475F-A9C8-EBFC7481E259__I1011899) 描述了角色的常见用法。角色 、 和 分配给不同的用户。应用程序角色 （包括执行应用程序的权限）分配给具有 and 角色的用户。应用程序角色 （包括执行应用程序的权限）分配给具有 and 角色的用户。`PAY_CLERK``MANAGER``REC_CLERK``ACCTS_PAY``ACCTS_PAY``PAY_CLERK``MANAGER``ACCTS_REC``ACCTS_REC``REC_CLERK``MANAGER`

图 17-1 角色的常见用法

![Description of Figure 17-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt082.gif)
[“图 17-1 角色的常见用法”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt082.html)

另请参阅：

- [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG004)，了解如何使用角色实现安全性
- 了解如何管理角色的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11240)





##### 权限分析

**权限分析**机制根据指定条件捕获数据库的权限使用情况。

通过这种方式，您可以捕获运行应用程序模块或执行特定 SQL 语句所需的权限。例如，您可以查找用户在特定数据库会话期间行使的权限。

在生产数据库中，特权与角色、角色与角色以及角色与用户之间的关系可能很复杂。权限分析使您能够识别复杂系统中不必要授予的权限。根据对捕获结果的分析，您可以删除不必要的授权或重新配置特权授权以使数据库更安全。

另请参阅：

[Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG-GUID-44CB644B-7B59-4B3B-B375-9F9B96F60186)，了解权限分析。





##### 用户配置文件

在系统资源的上下文中，**用户配置文件**是一组命名的资源限制和密码参数，用于限制用户的数据库使用情况和数据库实例资源。

配置文件可以限制用户的并发会话数、每个会话可用的 CPU 处理时间以及可用的逻辑 I/O 量。例如，配置文件可以将用户限制为文书任务所需的系统资源。`clerk`

注：最好使用数据库资源管理器来限制资源并使用配置文件来管理密码。

配置文件为共享一组属性的用户提供单一参考点。您可以将配置文件分配给一组用户，将默认配置文件分配给所有其他用户。每个用户在任何时间点最多分配了一个配置文件。

另请参阅：

- "[缓冲区 I/O](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-D1429BAA-6543-4B34-93DB-C8F33D497B53)"
- [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG20244)，了解如何使用配置文件管理资源
- 适用于语法和语义的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01310)`CREATE PROFILE`





#### 数据库身份验证

在 Oracle 数据库中，数据库**身份验证**是用户向数据库提供凭据的过程，通过该过程验证凭据并允许访问数据库。

验证标识会为进一步的交互建立信任关系。身份验证还可以通过将访问和操作链接到特定标识来实现问责制。

Oracle 数据库提供了不同的身份验证方法，包括：

- 数据库身份验证

  Oracle 数据库可以使用密码、Kerberos 票证或 PKI 证书对用户进行身份验证。Oracle 还支持符合 RADIUS 标准的设备进行其他形式的身份验证，包括生物识别技术。在 Oracle 数据库中创建用户时，必须指定身份验证类型。

- 操作系统的身份验证

  某些操作系统允许 Oracle 数据库使用其维护的信息对用户进行身份验证。通过操作系统身份验证后，用户可以连接到数据库，而无需指定用户名或密码。

非管理数据库用户帐户不得执行数据库操作，例如关闭或启动数据库。这些操作需要 、、 或特权。`SYSDBA``SYSOPER``SYSBACKUP``SYSDG`

另请参阅：

- "[使用管理员权限连接](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-921ADB75-43B0-4F84-BAA5-F90EE649877F)"
- 了解身份验证方法的 [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG491)
- 了解管理身份验证的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11046)





#### 加密

Oracle 数据库加密是使用密钥和**加密**算法将数据转换为不可读格式的过程。

加密通常用于满足法规遵从性要求，例如与支付卡行业数据安全标准 （PCI-DSS） 或违规通知法律相关的要求。例如，必须加密信用卡号、社会保险号或患者健康信息。





##### 网络加密

在客户端和服务器之间通过网络传输数据时对其进行加密称为**网络加密**。

入侵者可以使用网络数据包嗅探器捕获在网络上传输的信息，然后将其假脱机到文件中以供恶意使用。加密网络上的数据可以防止此类活动。





##### 透明数据加密

Oracle 高级安全**透明数据**加密使您能够加密单个表列或表空间。

当用户将数据插入加密列时，数据库会自动加密数据。当用户选择列时，数据将被解密。这种形式的加密是透明的，提供高性能，并且易于实现。

透明数据加密包括行业标准加密算法，例如高级加密标准 （AES） 和内置密钥管理。

另请参阅：

[Oracle 数据库高级安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ASOAG600)





#### Oracle数据修订

Oracle 数据编校是 Oracle 高级安全的一部分，使您能够屏蔽（**编校**）低权限用户或应用查询的数据。当用户查询数据时，密文会实时发生。

数据编校支持以下编校函数类型：

- 完整数据编校

  在这种情况下，数据库将编辑表或视图中指定列的全部内容。例如，姓氏的列显示单个空格。`VARCHAR2`

- 部分数据编校

  在这种情况下，数据库会编辑显示输出的部分内容。例如，应用程序可以提供以 结尾的信用卡号。您可以将正则表达式用于完全密文和部分密文。正则表达式可以根据搜索模式编辑数据。例如，您可以使用正则表达式来编辑特定的电话号码或电子邮件地址。`1234``xxxx-xxxx-xxxx-1234`

- 随机数据编辑

  在这种情况下，数据库将数据显示为随机生成的值，具体取决于列的数据类型。例如，数字可以显示为 。`1234567``83933895`

数据修订不是一个全面的安全解决方案。例如，它不会阻止直接连接的特权用户对编辑的数据执行推理攻击。此类攻击识别已编辑的列，并通过消除过程尝试通过重复猜测存储值的 SQL 查询来返回实际数据。为了检测和防止来自特权用户的推理和其他攻击，Oracle 建议将 Oracle 数据编辑与相关的数据库安全产品（如 Oracle Audit Vault 和 Database Firewall）以及 Oracle Database Vault 配对。

数据编校的工作方式如下：

- 使用该包为指定的表创建编校策略。`DBMS_REDACT`
- 在策略中，指定预定义的密文函数。
- 数据库是显示列的实际值还是已编辑的值取决于策略。如果数据已编辑，则在向用户显示之前，编校将立即出现在顶级选择列表中。

以下示例添加完整数据编校策略以编校表的员工 ID （） 列：`employee_id``hr.employees`

```
CopyBEGIN
 DBMS_REDACT.ADD_POLICY(
   object_schema    => 'hr'
,  object_name      => 'employees'
,  column_name      => 'employee_id'
,  policy_name      => 'mask_emp_ids'
,  function_type    => DBMS_REDACT.FULL
,  expression       => '1=1'
);
END;
/
```

在前面的示例中，表达式设置（计算结果为 ）将密文应用于未被授予权限的用户。`true``EXEMPT REDACTION POLICY`

另请参阅：

- 了解数据修订的 [Oracle 数据库高级安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ASOAG596)
- 要了解的 [Oracle 数据库 PL/SQL 包和类型参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS73800)`DBMS_REDACT`





#### 取向

Oracle 数据库提供了许多技术来控制对数据的访问。本节总结了其中的一些技术。





##### Oracle数据库保管库

**Oracle 数据库保管库**限制用户对应用数据的特权访问。

从 Oracle Database 12c 开始，Oracle Database Vault 扩展了标准的数据库审计数据结构。此外，如果迁移到统一审核，则数据库会将审核记录写入 Oracle 安全文件中的统一审核跟踪，从而集中 Oracle 数据库的审核记录。

您可以使用 Oracle 数据库保险库来控制访问数据库、数据和应用的时间、位置和方式。因此，您可以解决常见的安全问题，例如防范内部威胁、遵守法规要求以及强制实施职责分离。

为了使 Oracle 数据库保管库管理员负责，数据库强制审核对 Oracle 数据库保管库元数据所做的配置更改。这些更改包括创建、修改和删除任何与 Oracle 数据库保管库相关的实施，授予和撤销受保护角色，以及 Oracle 数据泵和作业计划程序等组件的授权。

另请参阅：

- [Oracle 数据库保管库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DVADM001)
- Oracle 数据库安全指南，了解 Oracle 数据库保管库审计与 [Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG419)原生审计的集成





##### 虚拟专用数据库 （VPD）

**Oracle 虚拟专用数据库 （VPD）** 使您能够在行和列级别实施安全性。

[**安全策略**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-32A45E86-59CE-4EA9-984E-CEF23EBF912E)建立了保护数据库免受意外或恶意破坏数据或损坏数据库基础结构的方法。

当权限和角色等安全保护不够细粒度时，VPD 非常有用。例如，您可以允许所有用户访问该表，但创建安全策略以限制与该用户位于同一部门的员工的访问。`employees`

实质上，数据库将动态子句添加到针对应用 Oracle VPD 安全策略的表、[**视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1274BCF5-2EC1-4752-B9CE-998A85A83307)或[**同义词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FBC00D26-94DC-4BA6-82D0-60A7F29CB81D)发出的 SQL 语句中。该子句仅允许其凭据通过安全策略的用户访问受保护的数据。`WHERE``WHERE`

另请参阅：

[Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG007)





##### Oracle标签安全 （OLS）

Oracle 标签安全 **（OLS）** 使您能够使用**安全标签**分配数据分类和控制访问。您可以为数据或用户分配标签。

分配给数据时，标签可以作为隐藏列附加到表，从而为 SQL 提供透明度。例如，可以将包含高度敏感数据的行标记为 ，将不太敏感的行标记为 。当用户尝试访问数据时，OLS 会将用户标签与数据标签进行比较，并确定是否授予访问权限。与 VPD 不同，OLS 提供开箱即用的安全策略和用于定义和存储标签的元数据存储库。`HIGHLY SENSITIVE``SENSITIVE`

如果启用了统一审核，则数据库将提供一个基于策略的框架来配置和管理审核选项。您可以对不同类型的操作（包括 OLS 操作）的审核选项进行分组，并将其另存为审核策略。然后，您可以启用或禁用该策略以强制实施基础审核选项。

每当创建 OLS 策略时，数据库都会将该策略的标签列添加到数据库审核跟踪表中。OLS 审核可以将审核记录（包括 OLS 管理员操作的记录）写入统一审核跟踪。

另请参阅：

- "[统一审计跟踪](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-14D880B2-386D-4907-9504-1384AC471B74)"
- [*Oracle 标签安全管理员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OLSAG001)





#### 数据访问监控

Oracle 数据库提供了多种工具和技术来监控用户活动。审核是监视数据访问的主要机制。





##### 数据库审计

数据库审计是对所选用户数据库操作的监视和记录。

您可以配置统一的审计[**策略来审计**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BEEC3CE3-5978-49A6-9ABF-E38DA3A9ECF8)以下内容：

- SQL 语句、系统权限、模式对象和角色（作为直接授予它们的一组系统权限）

- 管理和非管理用户

- 应用程序上下文值

  [**应用程序上下文**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-913900A4-A2F5-43E6-8308-A511109A4FB6)是指定命名空间中的属性名称/值对。应用程序在对数据库执行操作之前设置各种上下文。例如，应用程序存储指示应用程序事件状态的模块名称和客户端 ID 等信息。应用程序可以配置上下文，以便将有关它们的信息追加到审核记录中。

- 为真实应用安全、Oracle 数据库保险库、Oracle 标签安全、Oracle 数据泵和 Oracle SQL*Loader 直接路径事件创建策略

统一审核跟踪可以捕获恢复管理器事件，您可以在数据字典视图中查询这些事件。您不会为恢复管理器事件创建统一的审核策略。`UNIFIED_AUDIT_TRAIL`

您还可以使用[**细化**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A3D10A1B-C0F9-4125-BA7E-F7DBF62213E1)审核来审核特定的表列，并在策略创建期间关联事件处理程序。对于统一和精细的审核，您可以创建策略来测试捕获表上的特定数据库操作或活动发生时间的条件。例如，您可以审核晚上 9：00 之后访问的表。

审核的原因包括：

- 使未来对当前行动负责
- 根据用户的责任阻止用户（或其他人，例如入侵者）采取不当操作
- 调查、监视和记录可疑活动
- 满足合规性的审计要求

从 Oracle 数据库 12c 开始，使用统一审核时，默认情况下会启用数据库审核。您可以通过启用审核策略来控制数据库审核。但是，必须先将数据库迁移到统一审核，然后才能使用统一审核。

另请参阅：

- 有关统一审计的详细信息，Oracle [数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG006)
- [Oracle 数据库升级指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=UPGRD52810)，了解如何迁移到统一审核





###### 审核策略

您可以使用单个 SQL 语句创建指定一组审计选项的命名统一审计策略。这些选项可以指定要在数据库内审核的系统权限、操作或角色。

在审计策略中，您可以选择设置一个条件，可以为每个语句评估一次，为会话评估一次，或为数据库实例评估一次条件。事件的审核取决于对适用审核策略条件的评估结果。如果条件的计算结果为 ，则数据库将生成审核记录。`true`

以下示例创建一个策略，该策略审核表上的活动，除非用户从受信任的终端登录，并且：`hr.employees``term1``term2`

```
复制创建审核策略 员工表审核
 操作更新人力资源员工，删除员工操作
 当SYS_CONTEXT（“用户环境”、“主机名”）不在
 （“术语 1”、“术语 2”）评估每个会话;
```

以下语句为用户启用策略，并且：`hr``hrvp`

```
复制
审计政策 员工表按人力资源、人力资源审计;
```

您可以将统一审计策略应用于任何数据库用户，包括管理用户，如 、 等。但是，只有在使用该语句打开数据库后才能读取审核策略。因此，在数据库打开之前，始终审核来自管理用户的顶级操作。数据库打开后，审核策略配置将生效。`SYSDBA``SYSOPER``ALTER DATABASE OPEN`

启用统一审核后，数据库会自动审核对审核设置的更改。数据库还审核数据库实例的启动和关闭。

另请参阅：

[*Oracle 数据库安全指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG60612)，了解如何管理审计策略





###### 审核管理员角色

要执行审核，您必须被授予适当的系统权限。

Oracle 数据库提供以下系统提供的审核管理员角色：

- `AUDIT_ADMIN`

  该角色管理数据库的审核设置。具有此角色的用户有权执行以下操作：`AUDIT_ADMIN`

  - 创建、更改和删除审核策略，包括细粒度审核策略
  - 为每个业务需求启用或禁用审核策略
  - 查看审核记录
  - 管理和清理审核跟踪

- `AUDIT_VIEWER`

  该角色适用于只需要查看和分析数据的用户。具有此角色的用户仅有权查看审核跟踪内容。`AUDIT_VIEWER`

另请参阅：

[Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG006)，了解有关审计的更多信息





##### 统一审计跟踪

审计记录对于检测和识别未经授权的数据访问至关重要。

Oracle 数据库可以为指定的事件配置审核。如果事件在用户会话期间发生，则数据库将生成审核记录。

审核[**跟踪**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-83C7FE4B-A07C-4422-8A51-0AD3A455E3A1)是存储审核记录的位置。[**统一审计跟踪**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AD326D47-1C01-4B79-AE57-FC5280708154)是 Oracle 数据库 12c 中的新增功能，可为来自所有类型的审计的审计记录提供统一存储。您必须手动从以前版本的传统审计跟踪迁移到统一审计。

审核包括标准和细粒度审核，还包括对以下事件的审核，包括从管理用户执行这些事件：

- Oracle数据泵
- SQL*加载程序直接路径加载
- Oracle数据库保管库
- Oracle标签安全
- 恢复管理器
- 真正的应用程序安全性

统一审核跟踪是只读的，存储在schema中。默认情况下，表空间存储来自所有源的审计记录。您可以使用包提供新的表空间。`AUDSYS``SYSAUX``DBMS_AUDIT_MGMT`

该视图从审计跟踪中检索审计记录，并以表格形式显示它们。该列存储已配置的应用程序上下文属性的值。您可以使用该语句在审核记录中包含上下文属性的值。例如，以下语句从命名空间捕获和属性：`UNIFIED_AUDIT_TRAIL``APPLICATION_CONTEXTS``AUDIT``MODULE``CLIENT_INFO``userenv`

```
CopyAUDIT CONTEXT NAMESPACE userenv ATTRIBUTES MODULE, CLIENT_INFO BY hr;
```

根据审核的组件（例如 Oracle 数据库保管库），可以使用其他与审核跟踪相关的统一视图。

另请参阅：

- [Oracle 数据库安全指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG630)，了解统一审计跟踪
- [Oracle 数据库升级指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=UPGRD52810)，了解如何迁移数据库以使用统一审核
- 了解视图的 [Oracle 数据库参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=REFRN29162)`UNIFIED_AUDIT_TRAIL`





##### 企业经理审计支持

Oracle Enterprise Manager （Enterprise Manager） 使您能够执行大多数与审计相关的任务。

任务包括：

- 启用和禁用审核

- 在审核语句和schema对象时管理对象

  例如，企业管理器使您能够显示和搜索当前审核语句、权限和对象的属性。

- 查看和配置与审计相关的初始化参数

- 显示审计报告

另请参阅：

企业管理器联机帮助





##### Oracle 审计保管库和数据库防火墙

Oracle 审计保险库和数据库防火墙 （Oracle AVDF） 为数据库提供了第一道防线，并整合了来自数据库、操作系统和目录的审计数据。

基于 SQL 语法的引擎在未经授权的 SQL 流量到达数据库之前对其进行监视和阻止。对于合规性报告和警报，Oracle AVDF 将来自网络的数据库活动数据*与*详细的审计数据相结合。您可以定制审核和监视控制以满足企业安全要求。

另请参阅：

Oracle 数据库安全指南，了解其他安全资源，如 Oracle 审计保险库和[数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DBSEG-GUID-91DB199F-50F3-4A86-8876-1579149A1930)防火墙





### 高可用性概述

可用性是应用程序、服务或功能按需可用的程度。

例如，在线书商使用的 [**OLTP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-709E943F-FF0E-4AA6-979A-C4CB2A7B0C29) 数据库在购买客户可以访问的范围内可用。可靠性、可恢复性、及时的错误检测和连续操作是高可用性的主要特征。

高可用性在数据库环境中的重要性与停机成本（即资源不可用的时间）相关联。停机时间可分为计划内或计划外。设计高可用性环境时的主要挑战是检查停机的所有可能原因并制定处理它们的计划。





#### 高可用性和计划外停机

Oracle 数据库提供高可用性解决方案，可预防、容忍和减少所有类型的计划外故障造成的停机时间。

计划外停机可以按其原因分类：

- [站点故障](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-E2274F65-A278-43D2-84ED-3BF490F90B80)
- [计算机故障](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-F6CB937A-3AFD-4179-A763-C58F984ED1D0)
- [存储故障](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-021D2BE7-6690-469F-A7D9-D8AC9F6D3B70)
- [数据损坏](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-CEA4D714-A143-4F9F-8EED-EE5A6B29B3C3)
- [人为错误](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-088B804A-DF09-475F-B168-961E16708DDA)





##### 站点故障

当事件导致应用程序的全部或大部分停止处理或速度降低到不可用的服务级别时，就会发生**站点故障**。

站点故障可能会影响数据中心或数据中心支持的应用程序子集的所有处理。示例包括扩展的站点范围的电源或网络故障、导致数据中心无法运行的自然灾害，或对操作或站点的恶意攻击。

防止站点故障的最简单形式是使用 RMAN 创建数据库备份并将其存储在异地。您可以将数据库还原到另一台主机。但是，此技术可能很耗时，并且备份可能不是最新的。通过在 Data Guard 环境中维护一个或多个备用数据库，您可以在生产站点发生故障时提供连续的数据库服务。

另请参阅：

- Oracle 数据库备份和恢复用户指南，了解有关 RMAN 以及[备份和恢复](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89341)解决方案的信息
- [Oracle 数据卫士概念和管理，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SBYDB00010)介绍备用数据库





##### 计算机故障

当运行数据库的系统由于已关闭或不再可访问而变得不可用时，会发生计算机故障中断。

计算机故障的示例包括硬件和操作系统故障。下表中的 Oracle 功能可防止或帮助响应计算机故障。

表 17-1 计算机故障防护

| 特征             | 描述                                                         | 了解更多                                                     |
| :--------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 企业网格         | 在 Oracle Real Applications Cluster （Oracle RAC） 环境中，Oracle 数据库在一个集群中的两个或多个系统上运行，同时访问单个共享数据库。单个数据库系统跨越多个硬件系统，但在应用程序中显示为单个数据库。 | "[网格计算概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-7223657D-9CF6-4C4D-954C-C2A1B5B46696)" |
| Oracle数据卫士   | 通过 Data Guard，您可以维护生产数据库（称为[**备用数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-728D4956-0F56-4D39-A63A-2E3FF5CCEDE4)）的一个或多个副本，这些副本可以驻留在不同的大陆或同一数据中心。如果主数据库由于中断而不可用，则 Data Guard 可以将任何备用数据库切换到主要角色，从而最大限度地减少停机时间。 | [Oracle 数据卫士概念和管理](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SBYDB00830) |
| 全球数据服务     | 全局数据服务框架可自动并集中配置、维护和监视数据库云。全局数据服务为云提供的服务启用负载平衡和故障转移。从本质上讲，全局数据服务提供了一组数据库，其优势与Oracle Real Application Clusters（Oracle RAC）提供的单个数据库相同。 | [Oracle 数据库全局数据服务概念和管理指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GSMUG-GUID-415B8BB5-5C8D-4C78-8E76-43DB1648E467) |
| 快速启动故障恢复 | 计划外停机的常见原因是系统故障或故障。Oracle 数据库中的**快速启动故障恢复技术**会自动限制数据库[**实例恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)时间。 | [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-E281EB31-5762-4945-9497-BBB923A6FF50) |





##### 存储故障

当保存部分或全部数据库内容的存储因已关闭或不再可访问而变得不可用时，会发生**存储故障**中断。存储故障的示例包括磁盘驱动器或存储阵列的故障。

下表显示了除 Oracle Data Guard 之外的存储故障。

表 17-2 存储故障解决方案

| 溶液                                               | 描述                                                         | 了解更多                                                     |
| :------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Oracle Automatic Storage Management （Oracle ASM） | Oracle ASM 是用于 Oracle 数据库文件的卷管理器和文件系统，支持单实例 Oracle 数据库和 Oracle RAC 配置。Oracle ASM 是 Oracle 推荐的存储管理解决方案，它提供了传统卷管理器和文件系统的替代方案。 | "[Oracle Automatic Storage Management （Oracle ASM）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-7FEC2249-4A21-4967-B951-8979D72030AF)" |
| 备份和恢复                                         | 恢复管理器 （RMAN） 实用程序可以备份数据、从以前的备份还原数据，以及恢复到故障发生之前对该数据的更改。 | "[备份和恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCE361D9-B486-43B4-B4FD-5722A93203F0)" |

另请参阅：

[《Oracle 自动存储管理管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OSTMG036)了解有关 Oracle ASM 的更多信息





##### 数据损坏

当硬件、软件或网络组件导致读取或写入损坏的数据时，就会发生**数据损坏**。

数据损坏的一个示例是导致磁盘读取或写入错误的卷管理器错误。数据损坏很少见，但可能会对数据库产生灾难性影响，从而对企业产生灾难性影响。

除了 Data Guard 和 Recovery Manager 之外，Oracle 数据库还支持以下形式的数据损坏防护：

- 丢失写入问题的解决方案

  当 I/O 子系统确认[**数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)完成而未发生写入时，就会[**发生写入丢失**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3B93C4C1-D08B-4320-BE13-1D4EC3EAC47B)。在后续的块读取中，I/O 子系统返回数据块的过时版本，该版本可用于更新数据库的其他块，从而损坏它。Oracle 数据库解决方案如下：

  - 使用备用数据库的写保护丢失

    在 Oracle 数据库 11g 中引入的标准丢失写保护中，您可以在主数据库和备用数据库上启用初始化参数。每个数据库在联机重做日志中记录缓冲区缓存块读取。当备用数据库在受管恢复期间应用重做时，它会读取相应的块，并将 SCN 与重做日志中的 SCN 进行比较，从而检测差异。`DB_LOST_WRITE_PROTECT`

  - 使用影子表空间的写保护丢失

    对于影[**子丢失写保护**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-830F578A-3B85-44CC-9861-4D47E5677884)，您可以创建一个[**影子表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D3D0D837-AE1D-446C-BD91-F22A4A5DA14A)。影子表空间包含[**跟踪数据文件中的每个数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8A0DABA5-3509-4298-B206-C379910EC038)块的简短描述记录，包括 SCN。

    如果启用了影子丢失写保护 （），并且数据库更新了跟踪的数据块，则数据库会将 SCN 写入相应的影子表空间。读取跟踪的数据块时，数据库会查找影子条目，然后将其与跟踪的数据块进行比较。如果影子条目的 SCN 大于跟踪块，则发生了写入丢失。`ALTER DATABASE ENABLE LOST WRITE TRACKING`

    卷影丢失写保护的优点是在不使用备用数据库的情况下检测丢失的写。此外，由于备用丢失写保护固有的延迟，当检测到丢失的写时，此块可能已经损坏了数据库的其他部分。为了防止数据损坏，影子丢失写保护会在使用丢失的写操作*之前*对其进行检测。

- 数据块损坏检测

  [**块损坏**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5E547C75-9814-499E-AF42-69950EE331C1)是不是公认的 Oracle 格式或其内容内部不一致的数据块。多个数据库组件和实用程序（包括 RMAN）可以检测到损坏的块并将其记录在 中。如果环境使用活动数据卫士备用数据库，则可以自动修复损坏。`V$DATABASE_BLOCK_CORRUPTION`

- 数据恢复顾问

  数据恢复顾问是一种 Oracle 工具，可自动诊断数据故障，确定并提供适当的修复选项，并根据用户的请求执行修复。

- 事务保护和应用程序连续性

  数据库会话中断（无论是计划内还是计划外）都可能使最终用户不确定其工作状态。在某些情况下，用户可以重新提交已提交的事务，从而导致逻辑数据损坏。事务[**防护提供事务幂**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FA547925-576A-4FD8-BA44-AED3AE438856)[**等性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-09AF097B-326A-454D-8125-43BA717DAC0E)，使数据库能够保留有保证的提交结果，指示事务是否已提交并完成。应用程序连续性（包括事务保护）使应用程序能够在[**出现可恢复的错误**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2F7DE61F-BD7C-4A89-91E6-CE0D193E8294)后针对数据库重播事务，并从事务中断的位置继续。

另请参阅：

- "[事务防护概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-47BCD081-8FFF-4D13-A0B1-F531521BC6C3)"
- Oracle 数据库备份和恢复用户指南，了解有关 RMAN 以及[备份和恢复](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89341)解决方案的信息





##### 人为错误

当提交导致数据库中的数据在逻辑上损坏或不可用的无意或恶意操作时，会发生**人为错误中断**。人为错误中断对服务级别的影响可能会有很大差异，具体取决于受影响数据的数量和关键性质。

许多研究将人为错误列为停机的最大原因。Oracle 数据库提供了强大的工具，可帮助管理员快速诊断这些错误并从中恢复。它还包括使最终用户能够在没有管理员参与的情况下从问题中恢复的功能。

Oracle 数据库建议采用以下形式的保护措施来防止人为错误：

- 限制用户访问

  防止错误的最佳方法是限制用户对数据和服务的访问权限。Oracle 数据库提供了广泛的安全工具，通过对用户进行身份验证，然后允许管理员仅授予用户履行职责所需的权限来控制用户对应用数据的访问。

- Oracle闪回技术

  Oracle 闪回技术是 Oracle 数据库中的一系列人为纠错功能。Oracle Flashback 提供了一个 SQL 接口，用于快速分析和修复人为错误。例如，您可以执行：

  - 局部损伤的细粒度手术分析和修复
  - 快速纠正更广泛的损伤
  - 在行、事务、表、表空间和数据库级别恢复

- Oracle日志矿工

  Oracle LogMiner 是一种关系工具，使您能够使用 SQL 来读取、分析和解释在线文件。

另请参阅：

- "[Oracle日志矿工](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D2E36A56-0571-4857-8D41-BBCC833403E5)"
- "[数据库安全概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-4D6D2B67-1B65-476D-852A-976E9D153EEC)"
- Oracle 数据库[备份和恢复用户指南和](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89342) [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS1008)，了解有关 Oracle 闪回功能的更多信息
- [Oracle 数据库实用程序](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL1553)了解有关 Oracle LogMiner 的更多信息





#### 高可用性和计划内停机时间

计划内停机同样会对运营造成中断，尤其是在支持多个时区用户的全球性企业中。在这种情况下，设计一个系统以最大程度地减少计划内中断（如日常操作、定期维护和新部署）非常重要。

计划内停机时间可以按其原因分类：

- [系统和数据库更改](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-8E7BB980-F2AA-41BB-A5A1-FF6187BFDA51)
- [数据更改](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-01305828-65CB-4F60-90C8-CA496B0DD78E)
- [应用程序更改](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-DC35B1D9-C44A-455A-9ADF-74E8FAB01818)





##### 系统和数据库更改

当您执行例行和定期维护操作以及新部署（包括在数据库中的组织数据结构之外发生的对操作环境的计划更改）时，会发生计划的系统更改。

示例包括添加或删除 CPU 和群集节点（*节点*是数据库实例所在的计算机）、升级系统硬件或软件以及迁移系统平台。

Oracle 数据库提供**动态资源调配**，作为针对计划的系统和数据库更改的解决方案：

- 数据库的动态重新配置

  Oracle 数据库可动态适应硬件和数据库配置的各种更改，包括从 SMP 服务器添加和删除处理器，以及使用 Oracle ASM 添加和删除存储阵列。例如，Oracle 数据库监视操作系统以检测 CPU 数量的变化。如果初始化参数设置为默认值，则数据库工作负载可以动态利用新添加的处理器。`CPU_COUNT`

- 自动整定内存管理

  Oracle 数据库使用非集中式策略来释放和获取 [**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 和 [**PGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19927E75-4983-4D59-A03D-C630E9908897) 的每个子组件中的内存。Oracle 数据库通过提示操作系统将内存颗粒传输到需要内存的组件来自动调整内存。

- 自动分发数据文件、控制文件和在线重做日志文件

  Oracle ASM 通过自动将数据文件、控制文件和日志文件分布到所有可用磁盘，实现数据文件、控制文件和日志文件的布局，从而自动化并简化它们的布局。

另请参阅：

- "[内存管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D39DB708-CC94-4EE6-ACDA-ACED36DA4DA5)"
- 请参阅 [Oracle 自动存储管理管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OSTMG036)了解有关 Oracle ASM 的更多信息





##### 数据更改

当 Oracle 数据库对象的逻辑结构或物理组织发生更改时，就会发生计划内的数据更改。这些更改的主要目标是提高性能或可管理性。示例包括表重定义、添加表分区以及创建或重建索引。

Oracle 数据库通过在线重组和重新定义最大限度地减少数据更改的停机时间。此体系结构使您能够在数据库打开时执行以下任务：

- 执行联机表重定义，这使您能够在不显著影响表可用性的情况下修改表结构
- 创建、分析和重新组织索引
- 移动表分区

另请参阅：

- "[索引和按索引组织的表](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/indexes-and-index-organized-tables.html#GUID-797E49E6-2DCE-4FD4-8E4A-6E761F1383D1)"
- "[分区概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-91498562-1809-4E67-B7AD-9718ED60DEFF)"
- [《Oracle 数据库管理员指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01514)了解如何在线更改数据结构





##### 应用程序更改

计划的应用程序更改可能包括对数据、schema和程序的更改。这些更改的主要目标是提高性能、可管理性和功能。例如，应用程序升级。

Oracle 数据库支持以下解决方案，可最大限度地减少更改应用数据库对象所需的应用停机时间。

表 17-3 最小化停机时间的解决方案

| 溶液                                                         | 描述                                                         | 了解更多                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 滚动数据库修补程序更新                                       | Oracle 数据库支持以滚动方式将补丁应用于 Oracle RAC 系统的节点。 |                                                              |
| 滚动数据库版本升级                                           | Oracle 数据库通过使用 Data Guard SQL 应用和逻辑备用数据库，支持以滚动方式安装数据库软件升级和应用补丁集，数据库停机时间几乎为零。 | [*Oracle数据库升级指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=UPGRD52810) |
| 基于版本的重新定义                                           | 基于版本的重新定义使您能够在使用应用程序时升级应用程序的数据库对象，从而最大限度地减少或消除停机时间。Oracle 数据库通过在称为[**版本的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FC181DAA-83CC-4134-AE64-E34B6E215989)专用环境中更改（重新定义）数据库对象来完成此任务。 | [*Oracle数据库开发指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS020) |
| 带有默认选项的 [**DDL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64F19D78-A73F-44A5-AA2E-60EBC800CB22)`WAIT` | DDL 语句要求内部结构上的独占锁（请参阅“[DDL 锁](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-5015CC53-4059-4CD6-B892-F211E8BDE2F9)”）。在以前的版本中，如果 DDL 语句无法获取锁，它们将失败。使用该选项指定的 DDL 可解决此问题。`WAIT` |                                                              |
| 创建处于禁用状态的触发器                                     | 可以在禁用状态下创建触发器，以确保在启用[**触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8BA32C58-ACF3-4B6B-941F-586DE399D22A)之前成功编译代码。 | [*Oracle Database PL/SQL Language Reference*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNPLS1609) |





### 网格计算概述

称为网格计算的计算schema有效地将大量服务器和存储汇集到一个灵活的按需资源中，以满足所有企业**计算**需求。

[**数据库服务器网格**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8291F0BB-F3FA-47BF-9F9D-FD956A9190CA)是连接在一起以在一个或多个数据库上运行的商用服务器的集合。数据库存储网格是低成本模块化存储阵列的集合，组合在一起并由数据库服务器[**网格**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9A6DDEE7-62BD-4215-B533-ED3BB31CF53A)中的计算机访问。

使用数据库服务器和存储网格，可以构建系统资源池。您可以根据业务优先级动态分配和取消分配这些资源。

[图 17-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-7223657D-9CF6-4C4D-954C-C2A1B5B46696__BABHGDHA) 说明了网格企业计算环境中的数据库服务器网格和数据库存储网格。

图 17-2 网格计算环境

![图 17-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/haovw004.gif)
[“图 17-2 网格计算环境”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/haovw004.html)

另请参阅：

[`http://www.gridforum.org/`](http://www.gridforum.org/) 了解标准组织全球电网论坛 （GGF）





#### 数据库服务器网格

Oracle Real Application Clusters （Oracle RAC） 支持多个实例共享对 Oracle 数据库的访问。实例通过互连进行链接。

在 Oracle RAC 环境中，Oracle 数据库在集群中的两个或多个系统上运行，同时访问单个共享数据库。Oracle RAC 通过提供跨多个低成本服务器的单个数据库，但在应用程序看来却是单个统一的数据库系统，从而实现数据库服务器网格。

[**Oracle 集群件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-372B855F-24EE-4AE5-93E8-7BF23918CEB1)是一种软件，它使服务器能够像一台服务器一样一起运行。每个服务器看起来都像任何独立服务器。但是，每个服务器都有相互通信的附加进程，以便单独的服务器像一台服务器一样协同工作。Oracle 集群件提供运行集群所需的所有功能，包括节点成员资格和消息传递服务。

另请参阅：

- Oracle [真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD7279)，了解如何管理 Oracle RAC 数据库
- Oracle Clusterware [Administration and Deployment Guide 了解如何管理和部署 Oracle Clusterware](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=CWADD1111)





##### 可扩展性

在数据库服务器网格中，Oracle RAC 使您能够随着容量需求的增加向群集添加节点。

Oracle RAC 中实施的缓存融合技术使您能够在不更改应用的情况下扩展容量。因此，您可以逐步扩展系统以节省成本，并且无需用较大的单节点系统替换较小的单节点系统。

您可以以增量方式将节点添加到群集，而不是将现有系统替换为更大的节点。网格即插即用简化了在群集中添加和删除节点的过程，从而更轻松地在动态预配的环境中部署群集。网格即插即用还支持以独立于位置的方式管理数据库和服务。SCAN 使客户端能够连接到数据库服务，而不考虑其在网格中的位置。

另请参阅：

- [Oracle 真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD7274)，了解有关缓存融合的更多信息
- 适用于您的平台的 [Oracle 数据库安装指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GINST)，了解如何使用网格命名服务启用网格即插即用
- [Oracle 群集件管理和部署指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=CWADD92403)了解有关配置网格命名服务以启用网格即插即用的详细信息





##### 容错

在高可用性体系结构中，**容错**是针对体系结构中组件故障提供的保护。

Oracle RAC schema的一个关键优势是多节点提供的固有容错能力。由于物理节点独立运行，因此一个或多个节点的故障不会影响群集中的其他节点。

故障转移可能发生在网格上的任何节点上。在极端情况下，Oracle RAC 系统提供数据库访问，即使除一个节点之外的所有节点都关闭。此体系结构使一组节点可以透明地联机或脱机以进行维护，而群集的其余部分继续提供数据库访问。

Oracle RAC 提供与 Oracle 客户端和连接池的内置集成。借助此功能，应用程序会立即通过终止连接的池收到任何故障通知。应用程序避免等待 TCP 超时，并可以立即采取适当的恢复操作。Oracle RAC 将[**侦听器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BB455218-EA2E-4E4A-A546-7AA5126B1811)与 Oracle 客户端和连接池集成在一起，以创建最佳的应用吞吐量。Oracle RAC 可以根据事务发生时的负载来平衡集群工作负载。

另请参阅：

- "[数据库驻留连接池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-531EEE8A-B00A-4C03-A2ED-D45D92B3F797)"
- [Oracle 真实应用集群管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RACAD076)，了解有关自动负载管理的更多信息





##### 服务业

Oracle RAC 支持的服务可以对数据库工作负载进行分组，并将工作路由到分配以提供服务的最佳实例。

服务表示具有通用属性、性能阈值和优先级的应用程序的工作负载。您可以定义业务策略并将其应用于这些服务，以执行任务，例如为高峰处理时间分配节点或自动处理服务器故障。使用服务可确保在需要的时间和时间应用系统资源以实现业务目标。

服务与数据库资源管理器集成，使您能够限制实例中的服务可以使用的资源。此外，Oracle 调度程序作业可以使用服务运行，而不是使用特定实例。

另请参阅：

- "[数据库资源管理器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-308CCFA9-830F-442B-BA81-F03B9B6BCE49)"
- 了解数据库资源管理器和 Oracle 调度程序的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11841)





#### Oracle Flex Clusters

从 Oracle Database 12c 开始，您可以在大型集群中配置 Oracle Clusterware 和 Oracle Real Application Clusters。

这些大型集群（称为 [**Oracle Flex 集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-067B27CE-FE08-46FC-888C-298D0870B283)）包含两种类型的节点，这些节点排列在中心辐射型schema中：中心节点和叶节点。集线器节点紧密连接，可以直接访问共享存储，并充当一个或多个叶节点的定位点。叶节点与中心节点松散连接，可能无法直接访问共享存储。

另请参阅：

- [Oracle 集群件管理和部署指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=CWADD92560)，了解有关 Oracle Flex 集群的更多信息
- [《Oracle 网格基础设施安装和升级指南》，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=CWGEN)了解有关 Oracle Flex 集群部署的更多信息





#### 数据库存储网格

DBA 或存储管理员可以使用 Oracle ASM 界面指定数据库存储网格中 Oracle ASM 应跨所有服务器和存储平台管理的磁盘。Oracle ASM 对磁盘空间进行分区，并在提供给 Oracle ASM 的磁盘之间均匀分布数据。此外，当在数据库存储网格中添加或删除存储阵列中的磁盘时，Oracle ASM 会自动重新分发数据。

另请参阅：

- "[Oracle Automatic Storage Management （Oracle ASM）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/physical-storage-structures.html#GUID-7FEC2249-4A21-4967-B951-8979D72030AF)"
- [*《Oracle 自动存储管理管理员指南》，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OSTMG30000)了解有关集群式 Oracle ASM 的更多信息





### 数据仓库和商业智能概述

**数据仓库**是用于查询和分析而不是事务处理的关系型数据库。

例如，数据仓库可以跟踪历史股票价格或所得税记录。仓库通常包含派生自历史交易数据的数据，但也可以包含来自其他源的数据。

除了关系型数据库之外，数据仓库环境还包括多个工具。典型的环境包括 [**ETL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1145ABBB-D2C9-4321-B5E4-6435053062F0) 解决方案、[**OLAP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A6734D1E-A45B-4BE3-ABF8-F6201A40F6B3) 引擎、客户端分析工具和其他收集数据并将其交付给用户的应用程序。





#### 数据仓库和 OLTP

引入数据仓库的一种常见方法是参考 William Inmon 提出的数据仓库的特征。

特点如下：[脚 1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#fn_1)

- 以学科为导向

  数据仓库使您能够按主题（如销售）定义数据库。

- 综合

  数据仓库必须将来自不同源的数据放入一致的格式。它们必须解决诸如计量单位之间的命名冲突和不一致等问题。当他们实现这一目标时，他们被称为整合。

- 非易失性

  仓库的目的是使您能够分析发生的情况。因此，数据进入仓库后，数据不应更改。

- 时变

  数据仓库的重点是随时间的变化。

数据仓库和 OLTP 数据库有不同的要求。例如，为了发现业务趋势，数据仓库必须维护大量数据。相反，良好的性能要求历史数据定期从 OLTP 系统移动到存档。[表 17-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-CECAA9E9-2458-4000-BCF1-28EC249C5F56__BABICJGA) 列出了数据仓库和 OLTP 之间的差异。

表 17-4 数据仓库和 OLTP 系统

| 特性     | 数据仓库                                                     | 高龄                                                         |
| :------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 工作量   | 旨在适应即席查询。你可能事先不知道数据仓库的工作负载，因此应对其进行优化，使其在各种可能的查询中表现良好。 | 仅支持预定义操作。您的应用程序可能经过专门调整或设计为仅支持这些操作。 |
| 数据修改 | ETL 过程使用批量数据修改技术定期更新。数据仓库的最终用户不会直接更新数据库。 | 受最终用户定期发布的单个 [**DML**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5F2F112-1B33-41B5-B63D-9DC8F99A369D) 声明的约束。OLTP 数据库始终是最新的，并反映每个业务事务的当前状态。 |
| schema设计 | 使用非规范化或部分非规范化的schema（如星型schema）来优化查询性能。 | 使用完全规范化的schema来优化 DML 性能并保证数据一致性。        |
| 典型操作 | 典型的查询会扫描数千或数百万行。例如，用户可以请求上个月所有客户的总销售额。 | 典型的操作仅访问少数记录。例如，用户可以检索单个客户的当前订单。 |
| 史料     | 存储数月或数年的数据以支持历史分析。                         | 仅存储几周或几个月的数据。根据需要保留历史数据以满足当前事务的要求。 |

另请参阅：

- [Oracle 数据库数据仓库指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG001)更详细地介绍了数据库仓库
- [Oracle 数据库 VLDB 和分区指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=VLDBG006)，用于更详细地描述 OLTP 系统





#### 数据仓库schema

数据仓库及其体系结构因业务需求而异。





##### 数据仓库体系结构（基础）

在简单的数据仓库体系结构中，最终用户直接访问从多个源系统传输到数据仓库的数据。

下图显示了一个示例体系结构。

图 17-3 数据仓库的体系结构

![Description of Figure 17-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt170.gif)
[“图 17-3 数据仓库的体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt170.html)

上图显示了传统OLTP系统的元数据和原始数据以及摘要数据。[**摘要**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6952CA8E-DB69-4C4B-887F-9624565B1835)是一种聚合视图，它通过预先计算昂贵的联接和聚合操作并将结果存储在表中来提高查询性能。例如，汇总表可以包含按区域和产品划分的销售总和。摘要也称为**实例化视图**。

另请参阅：

了解基本物化视图的 [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG008)





##### 数据仓库体系结构（带暂存区域）

某些数据仓库使用**暂存区域**，这是在进入仓库之前对数据进行预处理的地方。暂存区域简化了构建摘要和管理仓库的任务。

下图描述了暂存区域。

图 17-4 具有暂存区域的数据仓库的体系结构

![Description of Figure 17-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt171.gif)
[“图 17-4 具有暂存区域的数据仓库的体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt171.html)

另请参阅：

[Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG014)，了解不同的传输机制





##### 数据仓库体系结构（具有暂存区域和数据集市）

您可能希望为组织内的不同组自定义仓库体系结构。您可以通过将仓库中的数据传输到数据集市（为特定业务或项目设计的独立数据库）来实现此目标。通常，数据集市包括许多汇总表。

[图 17-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-61F21973-1003-42DC-A90F-3D273C56C362__I32153) 将采购、销售和库存信息分离到独立的数据集市中。财务分析师可以查询数据集市以获取有关购买和销售的历史信息。

图 17-5 具有暂存区域和数据集市的数据仓库的体系结构

![Description of Figure 17-5 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt172.gif)
[“图 17-5 具有暂存区域和数据集市的数据仓库的体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt172.html)

另请参阅：

了解转换机制的 [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG013)





#### 提取、转换和加载 （ETL） 概述

从源系统提取数据并将其引入仓库的过程通常称为 ETL：提取、转换和加载。ETL 是指一个广泛的过程，而不是三个明确定义的步骤。

在典型方案中，从一个或多个操作系统中提取数据，然后物理传输到目标系统或中间系统进行处理。根据运输方式的不同，在此过程中可能会发生一些转换。例如，通过网关直接访问远程目标的 SQL 语句可以将两列连接为语句的一部分。`SELECT`

Oracle 数据库本身并不是一个 ETL 工具。但是，Oracle 数据库提供了一组丰富的功能，可供 ETL 工具和定制的 ETL 解决方案使用。Oracle 数据库提供的 ETL 功能包括：

- 可传输的表空间

  您可以在不同的计算机体系结构和操作系统之间传输表空间。可传输表空间是在两个 Oracle 数据库之间移动大量数据的最快方法。

- 表函数

  [**表函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-385D1E32-8068-4A47-9E93-4E79946342A4)是用户定义的 PL/SQL 函数，它返回行集合（嵌套表或虚拟数组）。表函数可以生成一组行作为输出，并且可以接受一组行作为输入。表函数支持以流水线和并行方式执行在 PL/SQL、C 或 Java 中实现的转换，而无需中间临时表。

- 外部表

  外部表使外部数据能够直接并行联接，而无需先将其加载到数据库中。因此，外部表支持加载阶段与转换阶段的流水线。

- 表压缩

  为了减少磁盘使用和内存使用，您可以以压缩格式存储表和分区表。使用[**表压缩**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9C21768F-A722-47F1-B54C-5563BDA38074)通常可以更好地纵向扩展只读操作和更快的查询执行。

另请参阅：

- "[表压缩](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-54EE5325-0894-4869-B3AD-8912D9B4A329)"
- "[外部表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97FC9DFF-A6CF-46CD-9F6F-D88A37C0E79C)"
- [*Oracle 数据库数据仓库指南，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG011)了解 ETL 概述
- [*Oracle 数据库管理员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN01101)





#### 商业智能

**商业智能**是对组织信息的分析，以帮助做出业务决策。

分析应用程序和商业智能主要由向上和向下钻取层次结构以及比较聚合值来主导。Oracle 数据库提供了多种技术来支持此类操作。





##### 分析型 SQL

Oracle 数据库引入了许多用于执行分析操作的 SQL 操作。这些操作包括排名、移动平均、累计总和、报告比率和同期比较。

例如，Oracle 数据库支持以下形式的分析 SQL。

表 17-5 分析 SQL

| 分析 SQL 的类型 | 描述                                                         | 了解更多                                                     |
| :-------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 用于聚合的 SQL  | [**聚合函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F86B89CC-8F23-4574-9116-398B76967894)（如 返回基于一组行的单个结果行）。聚合是数据仓库的基础。为了提高仓库中的聚合性能，数据库提供了对子句的扩展，以使查询和报告更轻松、更快捷。`COUNT``GROUP BY` | 了解聚合的 [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG020) |
| 用于分析的 SQL  | 分析[**函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CD67C7C6-A81C-477D-AE4A-6EF16B8DB6BC)（如聚合一组行（称为*窗口*）以返回多行作为结果集。Oracle 使用一系列分析 SQL 函数提供先进的 SQL 分析处理功能。例如，这些分析函数使您能够计算排名、百分位数和移动窗口。`MAX` | [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG021)，了解用于分析和报告的 SQL |
| 用于建模的 SQL  | 使用该子句，可以从查询结果创建多维数组，并将规则应用于此数组以计算新值。例如，您可以按国家/地区对销售视图中的数据进行分区，并对每个国家/地区执行由多个规则定义的模型计算。一条规则可以将 2008 年产品的销售额计算为 2006 年和 2007 年的销售额总和。`MODEL` | 了解 SQL 建模的 [Oracle 数据库数据仓库指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG022) |

另请参阅：

了解 SQL 函数的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF51173)



##### 分析视图

**分析视图**扩展了数据集的内容并简化了商业智能应用程序的开发。

分析视图具有以下特征：

- 数据使用分层和维度概念进行组织。
- 连接、聚合和度量计算规则嵌入在分析视图中。
- 可以使用 SQL DDL 在数据库中的现有表、视图和其他对象上进行分层。
- 可以使用简单的 SQL 进行查询。

另请参阅：

[Oracle 数据库数据仓库指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DWHSG-GUID-D384C4EE-1671-4F89-BC69-2D3133194869)了解分析视图概述





##### 奥拉普

Oracle 在线分析处理 （**OLAP**） 在跨多个维度分析数据时提供本机多维存储和快速响应时间。OLAP 使分析人员能够在交互式会话期间快速获得复杂迭代查询的答案。

Oracle OLAP 具有以下主要特征：

- Oracle OLAP 集成在数据库中，因此您可以使用标准的 SQL 管理、查询和报告工具。
- OLAP 引擎在 Oracle 数据库的内核中运行。
- 维度对象以其本机多维格式存储在 Oracle 数据库中。
- 多维数据集和其他维度对象是 Oracle 数据字典中表示的第一类[**数据**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)对象。
- 通过向 Oracle 数据库用户和角色授予和撤销权限，以标准方式管理数据安全性。

Oracle OLAP 提供了简单性的强大功能：一个数据库、标准管理和安全性，以及标准接口和开发工具。

另请参阅：

- "[**奥拉普**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A6734D1E-A45B-4BE3-ABF8-F6201A40F6B3)"
- "[尺寸概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/partitions-views-and-other-schema-objects.html#GUID-84D64C39-D8E8-4706-B4E3-519FE2CEE4C2)"
- Oracle OLAP [*用户指南，了解 Oracle OLAP*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OLAUG100) 的概述





##### Oracle高级分析

Oracle 高级分析选项将 Oracle 数据库扩展为用于大数据分析的综合高级分析平台。

Oracle 高级分析可在数据库中提供预测分析、数据挖掘、文本挖掘、统计分析、高级数值计算和交互式图形。Oracle 高级分析具有以下组件：

- [Oracle数据挖掘](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-7BB4AEBA-A212-4EE3-96FA-420EF5CEE90E)
- [OracleR企业版](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-2E23E217-B6F8-4570-863D-7786493F8E06)





###### Oracle数据挖掘

在商业智能中，数据挖掘是使用复杂的数学算法来分割**数据**并评估未来事件的概率。

数据挖掘的典型应用包括呼叫中心、ATM、电子商务关系管理 （ERM） 和业务规划。Oracle 数据挖掘器使数据分析师能够快速分析数据、定位最佳客户、打击欺诈，并找到有助于其业务更好地竞争的重要相关性和模式。

Oracle 数据挖掘解决方案提供作为本机 SQL 函数运行的数据挖掘算法，可实现高性能的数据库内模型构建和模型部署。Oracle 数据挖掘可以挖掘表、视图、星型模式、事务数据和非结构化数据。

Oracle Data Mining 支持 PL/SQL API 和 SQL 函数进行模型评分。因此，Oracle 数据库为应用开发人员提供了一个基础设施，将数据挖掘与数据库应用无缝集成。

Oracle Data Miner是一个SQL开发人员扩展，为Oracle数据挖掘提供了一个GUI。

另请参阅：

[Oracle 数据挖掘概念](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=DMCON002)





###### OracleR企业版

**R** 是一种用于统计计算和图形的开源语言和环境。Oracle R Enterprise 使 R 为企业和大数据做好了准备。

Oracle R Enterprise 专为解决涉及大量数据的问题而设计，将 R 与 Oracle 数据库集成在一起。可以运行 R 命令和脚本，对存储在 Oracle 数据库中的数据进行统计和图形分析。还可以开发、优化和部署利用数据库的并行性和可伸缩性来自动执行数据分析的 R 脚本。数据分析师只需一步即可运行 R 包并为分析应用程序开发 R 脚本，而无需学习 SQL。

另请参阅：

[Oracle R 企业用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OREUG)





### Oracle 信息集成概述

随着组织的发展，能够在多个数据库和应用程序之间共享信息变得越来越重要。

共享信息的基本方法如下：

- 固结

  您可以将信息整合到单个数据库中，这样就无需进一步集成。Oracle RAC、网格计算、多租户schema和 Oracle VPD 使您能够将信息整合到单个数据库中。

- 联邦

  您可以保持信息分散，并提供用于联合此信息的工具，使其看起来像在单个虚拟数据库中。

- 共享

  您可以共享信息，从而可以在多个数据存储和应用程序中维护信息。

本节重点介绍用于联合和共享信息的 Oracle 解决方案。





#### 联合访问

联合访问的基础是**分布式环境**，它是相互无缝通信的不同系统网络。

环境中的每个系统称为*一个节点*。用户直接连接到的系统称为**本地系统**。此用户访问的其他系统是**远程系统**。

分布式环境使应用程序能够访问和交换来自本地和远程系统的数据。可以同时访问和修改所有数据。





##### 分布式 SQL

分布式 SQL 同步访问和更新分布在多个数据库中的数据。Oracle 分布式数据库系统对用户是透明的，使其看起来像单个 Oracle 数据库。

分布式 SQL 包括分布式查询和分布式事务。Oracle 分布式数据库体系结构提供了查询和事务的透明度。例如，标准 DML 语句的工作方式与在非分布式数据库环境中的工作方式相同。此外，应用程序使用标准 SQL 语句 、 和 来控制事务。`COMMIT``SAVEPOINT``ROLLBACK`

另请参阅：

- "[分布式事务概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/transactions.html#GUID-47231512-4A3E-4E59-86BD-332E1FB88A88)"
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN031)了解如何管理分布式事务





##### 数据库链接

数据库**链接**是两个物理数据库之间的连接，使客户端能够将它们作为一个逻辑数据库进行访问。

Oracle 数据库使用数据库链接使一个数据库上的用户能够访问远程数据库中的对象。本地用户可以访问指向远程数据库的链接，而无需成为远程数据库上的用户。

[图 17-6](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-21CDA659-B77E-41F6-9BF3-4408837B5223__BABIHEBI) 显示了用户使用全局名称访问远程数据库上的表的示例。同义词隐藏远程schema对象的标识和位置。`hr``employees``hq.example.com``employees`

图 17-6 数据库链接

![图 17-6 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt243.gif)
[“图 17-6 数据库链接”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt243.html)

另请参阅：

了解数据库链接的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12150)





#### 信息共享

任何集成的核心都是在企业中的应用程序之间共享数据。





##### Oracle黄金门

Oracle GoldenGate 是一款基于日志的异步实时数据复制产品。

Oracle GoldenGate 跨异构数据库、硬件和操作系统环境实时移动大量事务数据，且影响最小。它优化了实时信息访问和可用性，因为它：

- 支持涉及 Oracle 数据库和非 Oracle 数据库的异构混合的复制
- 保持任务关键型系统的持续可用性，从而最大限度地减少计划内维护期间的停机时间
- 支持整个企业的实时数据集成
- 自动配置分[**表分片**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9F0249A0-E7A2-44A0-A08A-6E4259C692C1)之间的双向复制

典型的环境包括捕获、泵送和交付过程。每个进程都可以在大多数流行的操作系统和数据库上运行，包括 Oracle 数据库和非 Oracle 数据库。可以复制部分或全部数据。这些进程中的任何数据都可以针对异构环境和不同的数据库schema进行操作。

Oracle GoldenGate 支持多主机复制、中心辐射型部署、数据整合和数据转换。因此，Oracle GoldenGate 使您能够确保关键系统每周 24 天、每天 7 小时运行，并将相关数据分布在整个企业中以优化决策。

另请参阅：

- 使用 Oracle [Sharding 了解如何使用 Oracle Sharding](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SHARD-GUID-0F39B1FB-DCF9-4C8A-A2EA-88705B90C5BF)
- [`http://www.oracle.com/technetwork/middleware/goldengate/documentation/index.html`](http://www.oracle.com/technetwork/middleware/goldengate/documentation/index.html)





##### Oracle Database Advanced Queue （AQ）

高级队列 （AQ） 是一个与 Oracle 数据库集成的强大且功能丰富的消息队列系统。

当组织具有必须相互通信的不同系统时，邮件环境可以提供一种标准、可靠的方法来在这些系统之间传输关键信息。

一个示例用例是在总部的 Oracle 数据库中输入订单的企业。输入订单时，企业使用 AQ 将订单 ID 和订单日期发送到仓库中的数据库。这些消息提醒仓库的员工有关订单的信息，以便他们可以填写和装运订单。





###### 消息队列和出队列

高级队列将用户消息存储在称为*队列的*抽象存储单元中。

**排队**是生产者将消息放入队列的过程。出列是使用者从队列中检索消息的过程。

对显式取消排队的支持允许开发人员使用 XStream 和 Oracle GoldenGate 可靠地交换消息。他们还可以利用 Oracle GoldenGate 的更改捕获和传播功能通知应用程序更改。

[图 17-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-C7C1C711-9008-40FF-BE2A-E8EEAC28428F__CJAHHFBE) 显示了一个示例应用程序，该应用程序通过高级队列显式排队和取消排队消息，使其能够与使用不同消息传递系统的合作伙伴共享信息。排队后，消息可以在取消排队到合作伙伴的应用程序之前进行转换和传播。

图 17-7 Oracle 消息队列

![图 17-7 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt310.gif)
[“图 17-7 Oracle 消息队列”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt310.html)





###### Oracle 数据库高级队列功能

Oracle 数据库高级队列 （AQ） 支持消息队列系统的所有标准功能。

功能包括：

- 异步应用程序集成

  Oracle 数据库 AQ 提供了多种消息排队方式。捕获过程或同步捕获可以隐式捕获消息，或者应用程序和用户可以显式捕获消息。

- 可扩展的集成schema

  许多应用都与以 Oracle 数据库为中心的分布式中心辐射型模型集成。Oracle 数据库上的分布式应用程序与同一中心中的队列进行通信。多个应用程序共享同一个队列，无需添加队列来支持其他应用程序。

- 异构应用集成

  Oracle Database AQ 为应用程序提供了 Oracle 类型系统的全部功能。它包括对标量数据类型、具有继承功能的 Oracle 数据库对象类型的支持、XML 数据的其他运算符以及 .`XMLType``ANYDATA`

- 旧版应用程序集成

  Oracle Messaging Gateway 将 Oracle 数据库应用程序与其他消息队列系统（如 Websphere MQ 和 Tibco）集成在一起。

- 基于标准的 API 支持

  Oracle Database AQ 支持行业标准 API：SQL、JMS 和 SOAP。使用 SQL 所做的更改将自动捕获为消息。

另请参阅：

[Oracle 数据库高级队列用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADQUE0100)

------



脚注图例

脚注1：

*Building the Data Warehouse*，John Wiley and Sons，1996年。

## 18 数据库管理员的概念

本部分介绍数据库管理员的职责、工具和基本知识。

本章包含以下部分：

- [数据库管理员的职责](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-18D90D4B-35EE-45C7-B00D-CDA6ECAD5D89)
- [数据库管理员工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-FA659979-25B7-4611-AA8D-48B5404301FE)
- [面向数据库管理员的主题](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-C12266D6-81D4-4637-83EC-A8D7E6430A3B)





### 数据库管理员的职责

数据库管理员 （DBA） 的主要职责是使其用户可以使用企业数据。

DBA 必须与开发人员密切合作，以确保他们的应用程序有效利用数据库，并与系统管理员密切合作，以确保物理资源充足且有效使用。

Oracle DBA 负责了解 Oracle 数据库schema以及数据库的工作原理。DBA 可以期望执行以下任务：

- 安装、升级和修补 Oracle 数据库软件
- 设计数据库，包括确定需求、创建逻辑设计（概念模型）和物理数据库设计
- 创建Oracle数据库
- 开发和测试备份和恢复战略，定期备份 Oracle 数据库，并在发生故障时恢复它们
- 配置网络环境以使客户端能够连接到数据库
- 启动和关闭数据库
- 管理数据库的存储
- 管理用户和安全性
- 管理数据库对象，如表、索引和视图
- 监视和调整数据库性能
- 调查、收集数据并向 Oracle 支持服务报告任何关键数据库错误
- 评估和测试新的数据库功能

用户类型及其角色和职责取决于数据库环境。小型数据库可能有一个 DBA。一个非常大的数据库可能会将 DBA 职责划分给多个专家，例如，安全官员、备份操作员和应用程序管理员。

另请参阅：

- [Oracle 数据库 2 天](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS037) DBA 介绍 DBA 任务
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS037)，更深入地介绍 DBA 概念和任务





### 数据库管理员工具

Oracle 提供了多种用于管理数据库的工具。

本节介绍一些常用工具：

- [Oracle企业管理器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-BE08A8FA-501A-418E-AD32-3E42AE762026)
- [SQL*加](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-6959296B-A487-4806-9BF6-564AE05C6D01)
- [用于数据库安装和配置的工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-87ACF317-FEBC-418C-9BE6-253F2C43F482)
- [用于 Oracle 网络配置和管理的工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-74CB09E3-EEAA-4FF5-8563-88015FD2439C)
- [数据移动和分析工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-70A70ABD-02A4-41F8-9DDD-16B7F6937035)





#### Oracle企业管理器

Oracle Enterprise Manager（**Enterprise Manager**）是一个基于Web的系统管理工具，用于管理Oracle数据库，Exadata数据库机器，Fusion Middleware，Oracle应用程序，服务器，存储以及非Oracle硬件和软件。





##### Oracle企业管理器云控制

Oracle Enterprise Manager Cloud Control（Cloud Control）是一个基于 Web 的界面，可为管理员提供跨 Oracle 技术堆栈和非 Oracle 组件的完整监控。

有时，快速应用程序通知 （FAN） 的组件可能变得不可用或遇到性能问题。在这种情况下，云控制会显示自动生成的警报，以便管理员可以采取适当的恢复操作。

云控制的组件包括：

- Oracle管理服务 （OMS）

  OMS 功能部件是一组 J2EE 应用程序，它们呈现云控制的界面，与所有 Oracle 管理代理程序一起使用以处理监视信息，并使用企业管理器存储库作为其持久性数据存储。

- Oracle管理代理

  这些代理是部署在每个受监视主机上的进程，用于监视主机上的所有目标，将此信息传达给 OMS，并维护主机及其目标。

- Oracle管理存储库

  存储库是 Oracle 数据库中的schema，其中包含有关由云控制管理的管理员、目标和应用程序的所有可用信息。

另请参阅：

- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12110)，了解如何使用云控制管理数据库
- 云控制的联机帮助





##### Oracle Enterprise Manager Database Express 12c

Oracle Enterprise Manager Database Express （EM Express） 是内置于 Oracle 数据库中的 Web 管理产品。它不需要特殊的安装或管理。

EM Express 包含云控制中的关键性能管理和基本管理页面。这些页面包括以下内容：

- 数据库主页
- 实时 SQL 监控
- 灰烬分析

您可以通过 EM Express 控制台在线访问这些功能，也可以通过活动报告技术离线访问这些功能。从体系结构的角度来看，EM Express 没有中间层或中间件组件，确保其在数据库服务器上的开销可以忽略不计。

使用 EM Express，您可以执行管理任务，例如管理用户安全性以及管理数据库内存和存储。您还可以查看有关数据库的性能和状态信息。

另请参阅：

[Oracle 数据库 2 天 + 性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS031)，了解如何使用 EM Express 管理数据库





#### SQL*加

**SQL\*Plus** 是每个 Oracle 数据库安装中包含的交互式批处理查询工具。

它具有在连接到数据库时充当客户端的命令行用户界面。SQL*Plus 有自己的命令和环境。它使您能够输入和执行 SQL、PL/SQL、SQL*Plus 和操作系统命令，以执行以下任务：

- 根据查询结果设置格式、执行计算、存储和打印
- 检查表和对象定义
- 开发和运行批处理脚本
- 管理数据库

您可以使用 SQL*Plus 以交互方式生成报告，以批处理方式生成报告，并将结果输出到文本文件、屏幕或 HTML 文件，以便在 Internet 上浏览。您可以使用 HTML 输出工具动态生成报告。

另请参阅：

[SQL*Plus 用户指南和参考，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQPUG002)以了解有关 SQL*Plus 的更多信息





#### 用于数据库安装和配置的工具

Oracle 提供了多种工具来简化安装和配置 Oracle 数据库软件的任务。

下表描述了支持的工具。

表 18-1 数据库安装和配置工具

| 工具                        | 描述                                                         | 了解更多                                                     |
| :-------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Oracle 通用安装程序 （OUI） | OUI 是一个 GUI 实用程序，可用于查看、安装和卸载 Oracle 数据库软件。联机帮助可指导您完成安装。 | 指导您完成安装的联机帮助                                     |
| 数据库升级助手 （DBUA）     | DBUA 以交互方式指导您完成数据库升级，并为新版本配置数据库。DBUA 通过执行通常手动执行的所有任务来自动执行升级。DBUA 为表空间和[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)等配置选项提供建议。 | Oracle 数据库 2 天 DBA 学习如何使用 [DBUA 升级数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS024) |
| 数据库配置助手 （DBCA）     | DBCA 为创建和配置数据库提供了图形界面和引导式工作流。此工具使您能够从 Oracle 提供的模板创建数据库，也可以创建自己的数据库和模板。 | Oracle 数据库[管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN12479)，了解如何使用 DBCA 创建数据库 |





#### 用于 Oracle 网络配置和管理的工具

**Oracle 网络服务**在分布式异构计算环境中提供企业级连接解决方案。Oracle Net是Oracle Net Services的一个组件，它支持从客户端应用程序到数据库的网络会话。

您可以使用以下工具来配置和管理 Oracle 网络服务：

- Oracle网络管理器

  此工具使您能够在本地客户端或服务器主机上为 Oracle 主目录配置 Oracle 网络服务。您可以使用 Oracle 网络管理器配置命名、命名方法、配置文件和侦听器。您可以使用 Oracle Enterprise Manager 控制台或作为独立应用程序启动 Oracle Net Manager。

- Oracle 网络配置助手

  此工具在软件安装期间自动运行。该助手使您能够在安装过程中配置基本网络组件，包括侦听器名称和协议地址、命名方法、文件中的网络服务名称以及目录服务器使用情况。`tnsnames.ora`

- 侦听器控制实用程序

  侦听器控制实用程序使您能够配置侦听器以接收客户端连接。您可以通过企业管理器或作为独立的命令行应用程序访问该实用程序。

- Oracle 连接管理器控制实用程序

  使用此命令行实用工具可以管理 Oracle 连接管理器，Oracle 连接管理器是一个路由器，通过该路由器可以将客户端[**连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-403DE106-1DB5-4A06-ACFD-BE1E348955C8)请求发送到其下一跃点或直接发送到数据库。可以使用实用程序命令在一个或多个 Oracle 连接管理器上执行基本管理功能。此外，您还可以查看和更改参数设置。

另请参阅：

- "[Oracle网络侦听器](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-D6E2465E-E8E6-4B95-95D3-B9581E264ED1)"
- "[Oracle 网络服务schema概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/application-and-networking-architecture.html#GUID-136C7637-89B5-4C5A-B186-E06F86CE2359)"
- 《Oracle 数据库网络服务[管理员指南》，了解有关 Oracle 网络服务](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NETAG005)工具的更多信息





#### 数据移动和分析工具

Oracle 数据库包括多个实用程序，可帮助进行数据移动和分析。

例如，可以使用数据库实用程序执行以下操作：

表18-2 数据移动和分析任务

| 任务                                         | 了解更多                                                     |
| :------------------------------------------- | :----------------------------------------------------------- |
| 将数据从操作系统文件加载到 Oracle 数据库表中 | "[SQL*Loader](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-A6BF29E2-70E6-46F8-8BF9-E321113A3670)" |
| 将数据和元数据从一个数据库移动到另一个数据库 | "[Oracle 数据泵导出和导入](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCDD0FBF-0AD2-45E1-B723-21CC72ADDCD6)" |
| 通过 SQL 接口查询重做日志文件                | "[Oracle日志矿工](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D2E36A56-0571-4857-8D41-BBCC833403E5)" |
| 管理Oracle数据库数据                         | "[ADR 命令解释器 （ADRCI）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-3F5B1954-D81A-43A1-8BB8-E7ECBA8FAC40)" |

其他任务包括使用 DBVERIFY 对脱机数据库或数据文件执行物理数据结构完整性检查，或者使用 DBNEWID 实用程序更改操作数据库的数据库标识符 （DBID） 或数据库名称。

注意：

另请参阅：

- “备份和恢复”，了解与[备份和恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCE361D9-B486-43B4-B4FD-5722A93203F0)相关的工具
- [Oracle 数据库实用程序](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL013)，了解 DBVERIFY 和 DBNEWID





##### SQL*Loader

SQL*Loader 将数据从外部文件（称为数据文件（不要与内部数据库数据*文件*混淆））加载到数据库表中。它具有强大的数据解析引擎，对数据文件中数据的格式几乎没有限制。

可以使用 SQL*加载程序执行以下操作：

- 将数据从多个数据文件加载到多个表中

  将要加载的数据存储在 SQL*加载程序数据文件中。SQL*Loader 控制文件是一个文本文件，其中包含 [**DDL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64F19D78-A73F-44A5-AA2E-60EBC800CB22) 指令，SQL*Loader 使用这些指令来确定在何处查找数据、如何解析和解释数据、在何处插入数据等。

  注：SQL*Loader 数据文件和控制文件与 Oracle 数据库数据文件和控制文件无关。

- 控制负载操作的各个方面

  例如，您可以有选择地加载数据、指定数据字符集、使用 SQL 函数操作数据、在指定列中生成唯一的顺序键值等。您还可以生成复杂的错误报告。

- 使用常规路径、直接路径或外部表加载

  常规路径加载执行 SQL 语句以填充表。相比之下，[**直接路径 INSERT**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-73D6FDFE-E38D-49F2-A5A5-B6BDB2FD297C) 通过格式化数据块并将其直接写入数据文件来消除大部分数据库开销。直接写入对[**高于高水位线 （HWM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3F5ACB2-94C8-483F-B427-1981836D0609) 的块进行操作，并直接写入磁盘，绕过[**数据库缓冲区缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)。直接读取直接从磁盘读取到 [**PGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19927E75-4983-4D59-A03D-C630E9908897)，再次绕过缓冲区缓存。`INSERT`

  外部表加载为数据文件中包含的数据创建[**外部表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1B18B978-29DD-4961-BD39-86838CB5F7D0)。加载执行语句以将数据文件中的数据插入到目标表中。`INSERT`

典型的 SQL*加载程序会话将 SQL*加载程序控制文件和一个或多个数据文件作为输入。输出是 Oracle 数据库、日志文件、错误文件，可能还有丢弃文件。下图说明了典型 SQL*加载程序会话的流程。

图 18-1 SQL*加载程序会话

![图 18-1 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt271.gif)
[“图 18-1 SQL*加载程序会话”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt271.html)

还可以使用 SQL*加载程序快速模式，当您在 SQL*Loader 命令中指定参数时，将激活该模式，如以下示例所示：`table`

```
Copy% sqlldr hr table=employees
```

不允许使用控制文件，这使得 SQL*Loader 更易于使用。SQL*Loader 不是分析控制文件，而是使用表列定义来确定输入数据类型。SQL*Loader 做了几个默认假设，包括字符集、字段分隔符以及数据、日志和错误文件的名称。您可以使用命令行参数覆盖许多默认值。

另请参阅：

- "[外部表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97FC9DFF-A6CF-46CD-9F6F-D88A37C0E79C)"
- "[字符集](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-57374356-61C4-45B1-8A05-3353FD034202)"
- [Oracle 数据库实用程序](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL003)了解 SQL*Loader





##### Oracle 数据泵导出和导入

Oracle 数据泵支持将数据和元数据从一个数据库高速移动到另一个数据库。

此技术是以下 Oracle 数据库数据移动实用程序的基础：

- 数据泵导出（导出）

  导出是一种实用程序，用于将数据和元数据卸载到一组称为*转储文件集*的操作系统文件中。转储文件集由一个或多个包含表数据、数据库对象元数据和控制信息的二进制文件组成。

- 数据泵导入（导入）

  导入是用于将导出转储文件集加载到数据库中的实用程序。还可以使用 Import 直接从没有干预文件的源数据库加载目标数据库，从而允许导出和导入操作同时运行，从而最大限度地减少总运行时间。

Oracle 数据泵由以下不同部分组成：

- 命令行客户端和`expdp``impdp`

  这些客户端调用包以执行 Oracle 数据泵操作。`DBMS_DATAPUMP`

- PL/SQL 包，也称为数据泵 API`DBMS_DATAPUMP`

  此 API 提供高速导入和导出功能。

- PL/SQL 包，也称为**元数据 API**`DBMS_METADATA`

  加载和卸载元数据的所有进程都使用此 API，该 API 以 XML 格式存储对象定义。

下图显示了 Oracle Data Pump 如何与 SQL*Loader 和外部表集成。如图所示，SQL*Loader 与外部表 API 和数据泵 API 集成，以将数据加载到外部表中。Oracle Enterprise Manager Cloud Control（Cloud Control）和可传输表空间等客户端可以使用 Oracle Data Pump 基础设施。

图 18-2 Oracle 数据泵体系结构

![图 18-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt261.png)
[“图 18-2 Oracle 数据泵体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt261.html)

另请参阅：

- "[外部表概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-97FC9DFF-A6CF-46CD-9F6F-D88A37C0E79C)"
- "[PL/SQL 包](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-87FA8137-A449-4542-8869-441C63810C63)"
- Oracle [数据库实用程序](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL100)，了解 Oracle 数据泵的概述
- [Oracle 数据库 PL/SQL 包和类型参考，了解 和](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS356)`DBMS_DATAPUMP``DBMS_METADATA`





##### Oracle日志矿工

Oracle LogMiner 使您能够通过 SQL 接口查询重做日志文件。

重做日志文件中包含的数据的潜在用途包括：

- 查明数据库的逻辑损坏（如在应用程序级别发生的错误）何时开始
- 检测用户错误
- 确定在事务级别执行细粒度恢复必须执行的操作
- 使用趋势分析确定哪些表获得最多的更新和插入
- 通过 LogMiner 综合关系接口分析系统行为并审核数据库使用情况，以重做日志文件

LogMiner可以通过命令行界面或通过Oracle LogMiner Viewer GUI访问，GUI是Enterprise Manager的一部分。

另请参阅：

[Oracle 数据库实用程序](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL1553)了解有关 LogMiner 的更多信息





##### ADR 命令解释器 （ADRCI）

**ADRCI** 是一个命令行实用程序，可用于调查问题、查看运行状况检查报告以及打包首次故障数据并将其上载到 Oracle 支持部门。

还可以使用该实用程序查看[**自动诊断存储库 （ADR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C46C2565-A02E-4512-8E47-CB7CCB25425D) 中跟踪文件的名称并查看[**警报日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ACC7727F-41AE-47B1-AADB-2585EE828792)。ADRCI 具有丰富的命令集，可以交互方式或在脚本中使用。

另请参阅：

- "[自动诊断存储库](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-8E4BC033-4704-4FF5-A459-0E1EBF2D35B8)"
- Oracle 数据库[实用程序和 Oracle](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SUTIL700) [数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11257)了解有关 ADR 和 ADRCI 的更多信息





### 面向数据库管理员的主题

本节介绍对 DBA 最重要的主题，这些主题尚未在手册的其他部分讨论。

本节包含以下主题：

- [备份和恢复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-DCE361D9-B486-43B4-B4FD-5722A93203F0)
- [内存管理](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D39DB708-CC94-4EE6-ACDA-ACED36DA4DA5)
- [资源管理和任务调度](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-EB2AB7CA-8F3A-4A2B-AA0A-8E9D138D8B75)
- [性能和调优](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-045B9963-F53D-427C-87B7-04858B22D4D8)





#### 备份和恢复

备份和恢复是一组概念、过程和策略，用于保护数据库免受介质故障或用户错误导致的数据丢失。

[**备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3E8FA828-167D-4C7F-A7A3-36A80F34546C)是数据的副本。备份可以包括数据库的关键部分，例如数据文件、[**服务器参数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D068D7A7-ECF5-49F2-A055-B6F668E96D0C)文件和控制文件。示例备份和恢复方案是导致数据文件丢失的磁盘驱动器故障。如果存在丢失文件的备份，则可以还原和恢复它。将数据还原到丢失前的状态所涉及的操作称为[**媒体恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-938A3E7D-CC65-496C-9DB3-3CFC45AFA8DD)。

本节包含以下主题：

- [备份和恢复技术](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-71AC5772-3143-40C4-86EC-93367FB85B2A)
- [恢复管理器体系结构](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-7E046FF6-AD1E-4A05-B55F-5049EBCD6427)
- [数据库备份](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-27DFFB35-0A8E-4435-97B1-726A48419DC6)
- [数据修复](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-BCE6455B-0E49-4835-B9AB-2BC70F673F88)
- [零数据丢失恢复一体机](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-89C1FA97-474D-412E-905E-59D08E26BBBF)

另请参阅：

- Oracle 数据库备份和恢复[用户指南，了解备份和恢复概念和](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV8001)任务
- 适用于 Microsoft Windows [*的 Oracle 数据库平台指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NTQRF285)，了解如何使用卷影复制服务 （VSS） 应用程序在 Microsoft Windows 上备份和恢复数据库





##### 备份和恢复技术

可以使用恢复管理器或用户管理的技术来备份、还原和恢复 Oracle 数据库。

这两种方法的主要区别如下：

- [**恢复管理器 （RMAN）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C93A3B47-4AE8-4AB7-A370-C8395A7B42AA)

  RMAN 是一个 Oracle 数据库实用程序，它与 Oracle 数据库集成以执行备份和恢复活动，包括在备份的每个数据库的控制文件中维护历史备份元数据的存储库。RMAN 还可以在不同的数据库中维护一个称为[**恢复目录**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2366988A-C3CA-4B75-B59F-69AC00678629)的集中式备份存储库。RMAN 是 Oracle 数据库的一项功能，不需要单独安装。

  RMAN 与 Oracle 安全备份集成，后者提供可靠、集中的磁带备份管理，保护文件系统数据和 Oracle 数据库文件。Oracle 安全备份 SBT 界面使您能够使用 RMAN 在磁带和基于 Internet 的 Web 服务（如 Amazon S3）之间备份和还原数据库文件。Oracle 安全备份支持 SAN 和 SCSI 环境中的几乎所有磁带驱动器和磁带库。

- 用户管理技术

  作为 RMAN 的替代方法，您可以使用操作系统命令，例如用于备份和还原文件的 Linux 和用于媒体恢复的 SQL*Plus 命令。Oracle 完全支持用户管理的备份和恢复，但建议使用 RMAN，因为它与 Oracle 数据库集成并简化了管理。`dd``RECOVER`

另请参阅：

- Oracle 数据库备份和恢复[用户指南，了解备份和恢复](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89341)解决方案概述
- Oracle 安全备份[管理员指南，了解 Oracle 安全备份](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=OBADM-GUID-8823172F-5367-4255-A209-83975273C3B3)概述





##### 恢复管理器体系结构

RMAN 和 Oracle 安全备份既可以从命令行访问，也可以从企业管理器云控制（云控制）访问。

云控制为 RMAN 提供了图形前端和调度工具。输入作业参数，然后指定作业计划。云控制在指定的时间或指定的重复间隔运行 RMAN，以执行备份和恢复操作。云控制通过一组向导提供对 RMAN 的访问。这些向导根据对数据库、可用备份和数据恢复目标的分析，引导您完成各种恢复过程。

通过使用云控制，可以执行本文档中概述的更简单的还原和恢复方案。您还可以使用更复杂的恢复和恢复技术，例如时间点恢复和 Oracle 闪回操作，从而可以有效地修复介质故障和用户错误。使用云控制通常比 RMAN 命令行客户端简单。

下图显示了一个示例 RMAN 体系结构。RMAN 客户机可通过云控制访问，它使用目标数据库上的服务器会话将数据备份到磁盘或磁带。RMAN 可以使用备份元数据更新外部恢复目录。

图 18-3 RMAN 体系结构

![Description of Figure 18-3 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt318.gif)
[“图 18-3 RMAN 体系结构”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt318.html)

无论您使用哪种备份和恢复技术，Oracle 都建议您配置[**快速恢复区域**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F4B1B3D-4831-42FA-A53B-E34BA9D1BBB0)。此数据库管理的目录、文件系统或 [**Oracle ASM 磁盘组**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-85D5EEA3-5127-4F08-AC1C-A2C660F21D92)集中备份和恢复文件，包括活动控制文件、联机和存档的重做日志文件以及备份。Oracle 数据库恢复组件与快速恢复区域交互，以确保数据库可恢复性。

另请参阅：

- [Oracle 数据库 2 天 DBA](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMQS009)，了解如何使用 Recovery Manager 执行备份和恢复
- [Oracle 数据库管理员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11103)了解有关如何设置和管理快速恢复区域的信息





##### 数据库备份

数据库备份可以是物理备份，也可以是逻辑备份。

物理备份是备份和恢复策略中的主要关注点，是物理数据库文件的副本。您可以使用 RMAN 或操作系统实用程序进行物理备份。

相反，逻辑备份包含表、存储过程和其他逻辑数据。您可以使用 Oracle 数据库实用程序（如数据泵导出）提取逻辑数据，并将其存储在二进制文件中。逻辑备份可以补充物理备份。

物理备份粒度大，可传输性有限，但速度非常快。逻辑备份具有精细粒度和完整的可传输性，但比物理备份慢。

另请参阅：

了解物理和逻辑备份的 [Oracle 数据库备份和恢复用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89335)





###### 完整和部分数据库备份

**整个数据库**备份是数据库中每个数据文件以及控制文件的备份。整个数据库备份是最常见的备份类型。

部分数据库备份包括数据库的子集：单个表空间或数据文件。表空间备份是一个表空间或多个表空间中所有数据文件的备份。表空间备份（无论是一致还是不一致）仅在数据库以模式运行时才有效，因为需要重做以使恢复的表空间与数据库的其余部分保持一致。`ARCHIVELOG`





###### 一致和不一致的备份

整个数据库备份要么是一致的，要么是不一致的。

在[**一致备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9758D2DA-4550-4F4F-8965-12A8AE13FFCD)中，所有读/写数据文件和控制文件具有相同的[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919) [**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C)，从而保证这些文件包含此 SCN 之前的所有更改。这种类型的备份在还原后不需要恢复。

只有在一致关闭后才能对数据库进行一致备份，并且是在模式下运行的数据库的唯一有效备份选项。其他备份选项需要介质恢复以保持一致性，如果不应用存档的重做日志文件，这是不可能的。`NOARCHIVELOG`

注：如果在不应用重做的情况下还原一致的整个数据库备份，则会丢失备份后进行的所有事务。

在不[**一致的备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AE098906-D0EA-4E45-B6E6-C5794E460114)中，读/写数据文件和控制文件不能保证具有相同的检查点 SCN，因此可能会丢失更改。所有联机备份必然不一致，因为在进行备份时可以修改数据文件。

不一致的备份提供了卓越的可用性，因为您不必关闭数据库即可进行完全保护数据库的备份。如果数据库在模式下运行，并且备份存档的重做日志和数据文件，则不一致的备份可以成为健全的备份和恢复策略的基础。`ARCHIVELOG`

另请参阅：

- "[关机模式](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-CD115A39-2FAE-4B94-BB3E-59818AD42803)"
- [Oracle 数据库备份和恢复用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89479)，了解有关不一致备份的更多信息





###### 备份集和映像副本

RMAN 命令生成映像副本或备份集。`BACKUP`

备份类型有所不同，如下所示：

- 图像复制

  映像副本是数据文件、控制文件或存档重做日志文件的逐位磁盘[**副本**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5F0E0899-96CD-40CC-872A-B07919D519D4)。您可以使用操作系统实用程序或 RMAN 创建物理文件的映像副本，并使用任一工具还原它们。

  注意：与操作系统副本不同，RMAN 会验证文件中的块，并将映像副本记录在 RMAN 存储库中。

- 备份集

  RMAN 还可以以称为备份集的专有格式创建[**备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2FB70E0-E30F-403F-9742-376C6576DAC3)。备份集包含来自一个或多个数据文件、存档的重做日志文件、控制文件或服务器参数文件的数据。备份集的最小单元是称为[**备份条目**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E12020FC-321F-4D7E-A821-487EE833143E)的二进制文件。备份集是 RMAN 可以将备份写入顺序设备（如磁带驱动器）的唯一形式。

  备份集使磁带设备能够连续流式传输。例如，RMAN 可以将慢速、中速和快速磁盘中的块混合到一个备份集中，以便磁带设备具有恒定的块输入。映像副本对于磁盘非常有用，因为您可以增量更新它们，也可以就地恢复它们。

另请参阅：

[*Oracle 数据库备份和恢复用户指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV002)，了解有关备份集和映像副本的更多信息





##### 数据修复

虽然有几个问题会停止数据库的正常运行或影响 I/O 操作，但只有一些问题需要 DBA 干预和数据修复。

在以下情况下通常需要数据修复：

- 介质故障

  当数据库外部的问题阻止数据库读取或写入文件时，会发生介质故障。典型的介质故障包括物理故障（如磁盘磁头崩溃）以及覆盖、删除或损坏数据库文件。介质故障不如用户或应用程序错误常见，但必须为这些错误做好合理的备份和恢复策略。

- 用户错误

  用户或应用程序可能会对数据库进行不需要的更改，例如错误更新、删除表的内容或删除数据库对象。良好的备份和恢复策略使您能够将数据库返回到所需状态，同时将对数据库可用性的影响降至最低，并且 DBA 工作量最小。

通常，有多种方法可以解决上述问题。本节总结了其中一些解决方案。

另请参阅：

- "[人为错误](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-088B804A-DF09-475F-B168-961E16708DDA)"
- [Oracle 数据库备份和恢复用户指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89703)了解数据修复概念





###### Oracle闪回技术

Oracle 数据库提供了一组称为 **Oracle 闪回技术**的功能，支持查看过去的数据状态，以及及时来回缠绕数据，而无需恢复备份。

根据数据库更改，闪回功能通常可以更快地撤消不需要的更改，并且与媒体恢复相比，对可用性的影响更小。以下闪回功能与备份和恢复最相关：

- 闪回数据库

  在非 CDB 中，可以将 Oracle 数据库回退到以前的时间，以更正由逻辑数据损坏或用户错误导致的问题。闪回数据库还可用于补充 Data Guard、Data Recovery Advisor 以及同步克隆数据库。闪回数据库不会还原文件或对文件执行介质恢复，因此不能使用它来纠正介质故障，如磁盘崩溃。

- 闪回 PDB

  在多租户容器数据库 （CDB） 中，可以回退可插入数据库 （PDB），而不会影响其他 PDB。还可以创建 PDB 还原点，并将 PDB 回退到此还原点，而不会影响其他 [**PDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D756A71D-5645-45AD-AC2E-5925E908F73C)。

- 闪回表

  您可以使用单个 SQL 语句将表倒退到指定的时间点。您可以在数据库处于联机状态时还原表数据以及关联的索引、触发器和约束，从而撤消对指定表的更改。闪回表不能解决物理损坏，例如磁盘损坏或数据段和索引不一致。

- 闪回掉落

  您可以撤消操作的效果。闪回丢弃比恢复机制（如时间点恢复）快得多，并且不会导致丢失最近的事务或停机。`DROP TABLE`

另请参阅：

- [Oracle 数据库备份和恢复用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89342)，了解有关闪回功能的更多信息
- Oracle 数据库 [SQL 语言](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01801)参考和 [*Oracle 数据库备份和恢复参考*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RCMRF194)，了解该语句`FLASHBACK DATABASE`





###### 数据恢复顾问

使用数据恢复顾问诊断数据故障，为您的环境提供最佳修复选项，以及执行和验证修复。

数据[**恢复顾问**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0B1CA606-6DB8-434B-898D-B449AD9993CE)工具会自动诊断持久性数据故障，提供适当的修复选项，并根据用户的请求执行修复。通过提供用于自动化数据修复的集中式工具，数据恢复顾问提高了 Oracle 数据库的可管理性和可靠性，从而有助于缩短恢复时间。

该数据库包括用于运行检查的运行状况监视器框架。*检查器*是向运行状况监视器注册的操作或过程，用于评估数据库或其组件的运行状况。运行状况评估称为*数据完整性检查*，可以被动或主动调用。

故障是由数据完整性检查检测到的持续性数据损坏。故障通常是被动检测的。涉及损坏数据的数据库操作会导致错误，该错误会自动调用数据完整性检查，以在数据库中搜索与错误相关的故障。如果诊断出故障，则数据库会将其记录在自动存储库 （ADR） 中。

数据库检测到故障并将其存储在 ADR 中后，数据恢复顾问会自动确定最佳修复选项及其对数据库的影响。通常，数据恢复顾问会为每个故障或故障组生成手动和自动修复选项。

在提供自动修复选项之前，数据恢复顾问会针对特定环境以及完成建议修复所需的介质组件的可用性对其进行验证。如果您选择自动修复，则 Oracle 数据库会为您执行它。数据恢复顾问验证修复是否成功并关闭相应的故障。

另请参阅：

[Oracle 数据库备份和恢复用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV246)，了解如何使用数据恢复顾问





###### 阻止媒体恢复

块介质恢复是一种在数据文件联机时恢复和恢复损坏的数据块的技术。

[**块损坏**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5E547C75-9814-499E-AF42-69950EE331C1)是不是公认的 Oracle 格式或其内容内部不一致的数据块。如果检测到块损坏，并且只有少数块损坏，则块恢复可能比数据文件恢复更可取。

另请参阅：

- "[数据损坏](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/topics-for-database-administrators-and-developers.html#GUID-CEA4D714-A143-4F9F-8EED-EE5A6B29B3C3)"
- [Oracle 数据库备份和恢复用户指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV89781)，了解如何执行块介质恢复





###### 数据文件恢复

数据文件恢复修复丢失或损坏的当前数据文件或控制文件。它还可以恢复表空间在没有该选项的情况下脱机时丢失的更改。`OFFLINE``NORMAL`

如果还原数据文件或控制文件的备份，或者数据文件在没有该选项的情况下脱机，则需要媒体恢复。如果联机数据文件需要媒体恢复，则无法打开数据库，在媒体恢复完成之前，需要媒体恢复的数据文件也无法联机。`OFFLINE``NORMAL`

要还原数据文件或控制文件的物理备份，需要重建它并使其可用于 Oracle 数据库。恢复备份就是应用存档的重做日志文件来重建丢失的更改。RMAN 还可以使用增量备份恢复数据文件，其中仅包含上次备份后修改的数据块。

与自动将更改应用于联机文件的实例恢复不同，媒体恢复必须由用户调用，并将存档的重做日志文件应用于还原的备份。数据文件媒体恢复只能对脱机数据文件或数据库中未由任何数据库实例打开的数据文件进行操作。

数据文件介质恢复因是否应用所有更改而异：

- 完全恢复

  完全恢复会将存档和联机重做日志中包含的*所有*重做更改应用于备份。通常，在介质故障损坏数据文件或控制文件后执行完全介质恢复。您可以对数据库、表空间或数据文件执行完全恢复。

- 不完全恢复

  不完整恢复（也称为数据库[**时间点恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-576051B8-32B4-4FE8-9485-50109C6D4BC8)）会导致数据库的非当前版本。在这种情况下，您不会应用还原备份后生成的所有重做。通常，执行时间点数据库恢复以在无法使用 Oracle 闪回数据库时撤消用户错误。

  若要执行不完整的恢复，必须从要在恢复的时间之前创建的备份还原所有数据文件，然后在恢复完成时使用该选项打开数据库。重置日志会创建一个从日志序列 1 开始的新日志序列号流。`RESETLOGS`

  注意：如果当前数据文件可用，则闪回数据库是DBPITR的替代方法。

  表空间时间点恢复 （TSPITR） 功能允许您将一个或多个表空间恢复到比数据库其余部分早的时间点。

另请参阅：

- "[实例恢复概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/oracle-database-instance.html#GUID-728C6BE1-5687-4DC5-B570-D2042C88F935)"
- [Oracle 数据库备份和恢复用户指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=BRADV117)了解介质恢复概念





##### 零数据丢失恢复一体机

云级零数据丢失恢复一体机（通常称为**恢复一体机**）是一种集成系统，可显著减少企业中所有 Oracle 数据库的数据丢失和备份开销。

恢复一体机与 RMAN 集成，使用云规模、容错硬件和存储，为大量数据库部署集中式备份和恢复策略。恢复一体机会持续验证备份的可恢复性。





###### 恢复一体机的优势

集中式恢复一体机执行大多数数据库备份和恢复处理，使备份的存储利用率、性能和可管理性更加高效。

主要好处如下：

- 消除数据丢失

  恢复一体机使用以下技术消除了数据中心中大多数数据库所经历的数据丢失风险：

  - 将重做更改从受保护数据库的 SGA 连续传输到恢复一体机，称为[**实时重做传输**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E2E4CEC0-AFE0-457D-9560-6E6F39C4DC38)
  - 复制到远程恢复设备
  - 由集中式恢复一体机进行的自动磁带备份
  - 端到端数据库块验证

- 最小的备份开销

  通过将工作卸载到恢复一体机（恢复一体机管理统一磁盘池中多个数据库的备份），可以最大程度地减少数据库服务器上的备份开销。RMAN 永久增量备份策略包括对恢复一体机进行初始第 0 级备份，所有后续[**增量备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EF38C61D-5301-4C79-81DC-129F6FC5BF08)都处于第 1 级。恢复一体机通过将级别 0 与级别 1 备份组合在一起来创建[**虚拟完整备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8804188E-EEFF-44EC-9E5F-8A6A8295A150)。恢复一体机在块级别持续压缩、删除重复数据并验证备份。

- 提高端到端数据保护可见性

  云控制提供了恢复一体机管理的备份生命周期的完整端到端视图，从启动 RMAN 备份到将其存储在磁盘、磁带上或复制到下游恢复一体机。安装企业管理器零数据丢失恢复一体机插件（恢复一体机插件）可实现监视和管理。

- 云规模保护

  恢复一体机可扩展以支持数十到数百或数千个数据库。该体系结构的关键组件如下：

  - 恢复一体机通过保护策略简化管理，该策略定义为与该[**策略**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C0444C9D-9420-4933-8947-974573A09BEE)关联的每个数据库强制实施的[**恢复时段目标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F4D0DF97-755D-44D8-BB30-2C998FAF5D08)。保护策略通过将数据库分组到具有共享特征的层中来提高可管理性。
  - 使用保护策略，恢复一体机根据每个受保护数据库的恢复时段目标管理备份存储空间。这种面向数据库的精细空间管理方法消除了像第三方设备那样在存储卷级别管理空间的需要。
  - 恢复一体机可以通过以简单的模块化方式添加计算和存储资源来扩展，以适应备份流量、存储使用量和数据库数量的增加。





###### 恢复一体机环境

**受保护**的数据库是将数据备份到恢复一体机的客户机数据库。

下图显示了一个示例环境，其中包括六个受保护的数据库和两个恢复设备。每个数据库都使用零数据丢失恢复设备备份模块（[**恢复设备备份模块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-44120A0C-8834-4DF0-BF06-B9BDA797C44D)）进行备份。此模块是 Oracle 提供的 SBT 库，RMAN 使用它通过网络将备份传输到恢复一体机。

图 18-4 恢复一体机环境

![图 18-4 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/amagd_vm_025.png)
[“图 18-4 恢复一体机环境”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/amagd_vm_025.html)

驻留在每个恢复设备上的恢复[**设备元数据数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5344CAFE-B53D-4C47-B07D-ABBC56E1E8EE)管理存储在恢复目录中的元数据。将备份发送到恢复设备的所有受保护数据库都必须使用此恢复目录。备份位于[**恢复一体机存储**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E2C49C85-3CEF-4245-A70C-631B4F192763)位置，该位置是一组 Oracle ASM 磁盘组。

注意：数据库可以使用恢复设备作为其恢复目录，而不将其用作备份存储库。

管理员使用云控制来管理和监视环境。云控制为每个数据库提供整个备份生命周期的“单一管理平台”视图，无论备份驻留在磁盘、磁带还是其他恢复一体机上。





#### 内存管理

内存管理涉及在数据库需求更改时维护 Oracle 实例内存结构的最佳大小。初始化参数设置确定如何管理 SGA 和实例 PGA 内存。

[图 18-5](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-D39DB708-CC94-4EE6-ACDA-ACED36DA4DA5__BGBEJAJI) 显示了内存管理选项的决策树。以下各节详细介绍了这些选项。

图 18-5 内存管理方法

![图 18-5 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt242.gif)
[Description of "Figure 18-5 Memory Management Methods"](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt242.html)

See Also:

"[Memory Architecture](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-913335DF-050A-479A-A653-68A064DCCA41)" to learn more about the SGA and PGA





##### Automatic Memory Management

In **automatic memory management**, Oracle Database manages the SGA and instance PGA memory completely automatically. This method is the simplest and is strongly recommended by Oracle.

The only user-specified controls are the target memory size initialization parameter () and optional maximum memory size initialization parameter (). Oracle Database tunes to the target memory size, redistributing memory as needed between the SGA and the instance PGA. `MEMORY_TARGET``MEMORY_MAX_TARGET`

The SGA can contain the [**In-Memory Column Store**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A19D33EA-7BAA-42C0-9E13-6AF686E2A976) (IM column store) or [**memoptimize pool**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BE14DEE8-A53C-4B30-96FE-41079CF056C8), both of which are optional. No matter which memory management method you use, size the IM column store with the initialization parameter, and the memoptimize pool with the initialization parameter. The IM column store size are memoptimize pool are included in the memory target, but are not managed by the automatic resize algorithm. For example, if you set to 5 GB and to 1 GB, then the overall memory target is 5 GB (not 6 GB), and the is always 1 GB. `INMEMORY_SIZE``MEMOPTIMIZE_POOL_SIZE``MEMORY_TARGET``INMEMORY_SIZE``INMEMORY_SIZE`

The following graphic shows a database that sometimes processes jobs submitted by online users and sometimes batch jobs. Using automatic memory management, the database automatically adjusts the size of the [**large pool**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D9A10657-F0EF-4D84-AB58-852CD58BF0B4) and [**database buffer cache**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363) depending on which type of jobs are running. Note that the graphic does not depict the IM column store or memoptimize area.

Figure 18-6 Automatic Memory Management

![Description of Figure 18-6 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt256.gif)
[Description of "Figure 18-6 Automatic Memory Management"](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt256.html)

如果使用 DBCA 创建数据库并选择基本安装选项，则 Oracle 数据库默认启用自动内存管理。

另请参阅：

- "[内存中区域](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-80C1C6A3-3E48-4868-ACA1-370C4D341209)"
- "[内存优化池](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/memory-architecture.html#GUID-D58DC90F-0ABB-4B1E-96C1-6094A04A5E12)"
- 了解自动内存管理的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11199)





##### SGA 的共享内存管理

您可以通过使用自动共享内存管理设置 SGA 大小或手动调整 SGA 组件来手动控制 SGA 的大小。

如果未启用自动内存管理，则系统必须使用 SGA 的共享内存管理。可以通过以下任一形式进行共享内存管理：

- 自动共享内存管理

  此模式使您能够更直接地控制 SGA 的大小，并且是禁用自动内存管理时的默认设置。数据库将总 SGA 调整为目标大小，并动态调整 SGA 组件的大小。如果您使用的是服务器参数文件，则 Oracle 数据库会在数据库实例关闭期间记住自动调整的组件的大小。

- 手动共享内存管理

  在此模式下，您可以设置多个单个 SGA 组件的大小，并持续手动调整各个 SGA 组件。您可以完全控制各个 SGA 组件的尺寸。当禁用自动内存管理和自动共享内存管理时，数据库默认使用此模式。

  注：禁用自动内存管理后，在某些情况下，数据库可以根据用户工作负载自动调整共享池和缓冲区缓存的相对大小。

另请参阅：

- 了解共享内存管理的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11203)

- 我的 Oracle 支持说明 1269139.1 了解有关手动模式下自动调整大小的更多信息：

  [`https://support.oracle.com/CSP/main/article?cmd=show&type=NOT&id=1269139.1`](https://support.oracle.com/CSP/main/article?cmd=show&type=NOT&id=1269139.1)





##### 实例 PGA 的内存管理

如果未启用自动内存管理，则 Oracle 数据库将使用自动或手动 PGA 内存管理。

以下模式可用于管理 PGA 内存：

- 自动 PGA 内存管理

  禁用自动内存管理 （） 并将其设置为非零值时，数据库将使用自动 PGA 内存管理。在此模式下，指定实例 PGA 的“软”目标大小。目标为软目标，因为它仅适用于可以选择使用临时空间而不是 PGA 的特定类型的内存分配。数据库根据此目标调整实例 PGA 的大小，并动态调整各个 PGA 的大小。如果未显式设置目标大小，则数据库会自动配置合理的默认值。`MEMORY_TARGET``PGA_AGGREGATE_TARGET``PGA_AGGREGATE_TARGET`

  初始化参数动态设置 PGA 内存的实例范围的硬限制。由于参数响应不断变化的内存条件，因此无需显式设置参数值。默认情况下，设置为以下各项中的较大者：`PGA_AGGREGATE_LIMIT``PGA_AGGREGATE_LIMIT`

  - 2 千兆字节
  - 初始化参数设置的200%`PGA_AGGREGATE_TARGET`
  - （初始化参数设置值）* 3 MB`PROCESSES`

  后台进程会定期将 PGA 大小与 设置的限制进行比较。如果达到或超过限制，则此过程将使用最不可调的 PGA 内存终止对会话的调用。如果这些会话仍然没有释放足够的内存，则它们也会终止。`PGA_AGGREGATE_LIMIT`

- 手动 PGA 内存管理

  禁用自动内存管理并将其设置为 时，数据库默认为手动 PGA 管理。以前版本的 Oracle 数据库要求 DBA 手动为每种类型的 SQL [**运算符**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4BC5B7D2-6483-4742-AD66-E0B7C39047E3)（如排序或[**哈希联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2587A67-E1CB-4F35-8830-4599717C47BC)）指定最大工作区大小。事实证明，这种技术非常困难，因为工作量总是在变化。尽管 Oracle 数据库支持手动 PGA 内存管理方法，但 Oracle 强烈建议使用自动内存管理。`PGA_AGGREGATE_TARGET``0`

另请参阅：

了解 PGA 内存管理的 [*Oracle 数据库性能调优指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA346)





##### 内存管理方法摘要

内存管理可以是自动的，也可以是手动的。

如果未启用自动内存管理，则必须分别为 SGA 配置一种内存管理方法，为 PGA 配置一种内存管理方法。

注：当对整个数据库实例禁用自动内存管理时，Oracle 数据库默认启用自动 PGA 内存管理。

下表包括初始化参数和初始化参数。两者都控制可选的内存区域。`INMEMORY_SIZE``MEMOPTIMIZE_POOL_SIZE`

表 18-3 内存管理方法

| 实例   | 新加坡金融管理局 | 职业高尔夫球协会 | 描述                                                         | 初始化参数                                                   |
| :----- | :--------------- | :--------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 自动   | 不适用           | 不适用           | 数据库根据单个实例目标大小调整实例的大小。                   | 您设置：数据库实例的总内存目标大小 （`MEMORY_TARGET`)数据库实例的可选最大内存大小 （`MEMORY_MAX_TARGET`)SGA 中 IM 列存储 （） 的可选大小`INMEMORY_SIZE` |
| 不适用 | 自动             | 自动             | 数据库根据 SGA 目标自动调整 SGA。数据库根据 PGA 目标自动调整 PGA。 | 您设置：SGA 目标大小 （`SGA_TARGET`)可选 SGA 最大尺寸 （`SGA_MAX_SIZE`)SGA 中 IM 列存储 （） 的可选大小`INMEMORY_SIZE`SGA 中内存优化池的可选大小 （`MEMOPTIMIZE_POOL_SIZE`)PGA 聚合目标大小 （`PGA_AGGREGATE_TARGET`)[脚 1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#fn_1)数据库会自动配置初始化参数。您可以手动设置此参数。`PGA_AGGREGATE_LIMIT` |
| 不适用 | 自动             | 手动             | 数据库根据 SGA 目标自动调整 SGA。您可以手动控制 PGA，为每种类型的 SQL [**运算符**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4BC5B7D2-6483-4742-AD66-E0B7C39047E3)设置最大工作区大小。 | 您设置：SGA 目标大小 （`SGA_TARGET`)可选 SGA 最大尺寸 （`SGA_MAX_SIZE`)SGA 中 IM 列存储的可选大小 （`INMEMORY_SIZE`)SGA 中内存优化池的可选大小 （`MEMOPTIMIZE_POOL_SIZE`)PGA 工作区参数，例如 、 和`SORT_AREA_SIZE``HASH_AREA_SIZE``BITMAP_MERGE_AREA_SIZE` |
| 不适用 | 手动             | 自动             | 您可以通过设置单个组件尺寸来手动控制 SGA。数据库根据 PGA 目标自动调整 PGA。 | 您设置：共享池大小 （`SHARED_POOL_SIZE`)缓冲区缓存大小 （`DB_CACHE_SIZE`)大型泳池面积（`LARGE_POOL_SIZE`)Java 池大小 （`JAVA_POOL_SIZE`)SGA 中 IM 列存储 （） 的可选大小`INMEMORY_SIZE`SGA 中内存优化池的可选大小 （`MEMOPTIMIZE_POOL_SIZE`)PGA 聚合目标大小 （`PGA_AGGREGATE_TARGET`)[脚 2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#fn_2)数据库会自动配置初始化参数。您可以手动设置此参数。`PGA_AGGREGATE_LIMIT` |
| 不适用 | 手动             | 手动             | 您必须手动配置 SGA 组件大小。您可以手动控制 PGA，为每种类型的 SQL 运算符设置最大工作区大小。 | 您必须手动配置 SGA 组件大小。您设置：共享池大小 （`SHARED_POOL_SIZE`)缓冲区缓存大小 （`DB_CACHE_SIZE`)大型泳池面积（`LARGE_POOL_SIZE`)Java 池大小 （`JAVA_POOL_SIZE`)SGA 中 IM 列存储 （） 的可选大小`INMEMORY_SIZE`SGA 中内存优化池的可选大小 （`MEMOPTIMIZE_POOL_SIZE`)PGA 工作区参数，例如 、 和`SORT_AREA_SIZE``HASH_AREA_SIZE``BITMAP_MERGE_AREA_SIZE` |

脚注1

数据库会自动配置初始化参数。您也可以选择手动设置此参数。`PGA_AGGREGATE_LIMIT`



脚注2

数据库会自动配置初始化参数。您也可以选择手动设置此参数。`PGA_AGGREGATE_LIMIT`



另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11236)，因为并非所有平台都提供自动内存管理





#### 资源管理和任务调度

Oracle 数据库提供的工具可帮助您管理资源和安排任务以减少对用户的影响。

在具有许多活动用户的数据库中，资源管理是数据库管理的重要组成部分。消耗过多资源的会话可能会阻止其他会话执行其工作。一个相关的问题是如何安排任务，以便它们在最佳时间运行。Oracle 数据库提供了帮助解决这些问题的工具。





##### 数据库资源管理器

Oracle 数据库资源管理器（资源管理器）提供对分配给用户帐户、应用程序和服务的数据库资源的精细控制。资源管理器主要充当看门人，减慢某些作业运行缓慢的速度，以便其他作业可以快速运行。

PL/SQL 软件包解决了操作系统无法很好地管理的许多资源分配问题，包括：`DBMS_RESOURCE_MANAGER`

- 开销过大
- 调度效率低下
- 资源分配不当
- 无法管理特定于数据库的资源

资源管理器通过使数据库能够更好地控制硬件资源的分配和数据库内工作的优先级，从而帮助克服上述问题。您可以根据会话属性将会话分类为组，然后将资源分配给这些组以优化硬件利用率。可以使用资源管理器设置 PDB 内存消耗的限制。

根据数据库管理员指定的资源计划将资源分配给用户。该计划指定如何在资源使用者组（按资源要求分组的用户会话）之间分配资源。资源计划指令将资源使用者组与计划相关联，并指定如何将资源分配给该组。

[图 18-7](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-308CCFA9-830F-442B-BA81-F03B9B6BCE49__CHDGHHBF) 显示了在白天同时运行 OLTP 应用程序和报告应用程序的组织的简单资源计划。当前活动的计划 在三个资源使用者组之间分配 CPU 资源。具体来说，分配了 75% 的 CPU 时间，分配了 15%，并接收剩余的 10%。`DAYTIME``OLTP``REPORTS``OTHER_GROUPS`

图 18-7 简单资源计划

![图 18-7 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin078.gif)
[“图 18-7 简单资源计划”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin078.html)

资源管理器可以解决的一个问题是失控查询，可以使用 SQL 监视器进行监视。资源管理器使你能够指定阈值来识别和响应失控的 SQL 语句。例如，您可以指定使用者组中每个前台进程的 CPU 时间、运行时间、物理或逻辑 I/O 以及 PGA 使用率的阈值。作为响应，资源管理器可以切换到优先级较低的使用者组、终止 SQL 语句或记录阈值冲突。

另请参阅：

- 了解如何使用资源管理器的 [*Oracle 数据库管理员指南*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN027)
- Oracle Database PL/SQL 包[*和类型参考，了解如何使用 PL/SQL 包*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS050)`DBMS_RESOURCE_MANAGER`





##### Oracle调度程序

Oracle 调度程序（Scheduler）使数据库管理员和应用开发人员能够控制在数据库环境中执行各种任务的时间和位置。

调度程序提供了复杂的企业调度功能，您可以使用这些功能：

- 根据时间或事件计划作业执行
- 以模拟业务需求的方式安排作业处理
- 管理和监视作业
- 在群集环境中执行和管理作业

程序对象（程序）包含有关计划程序将运行的命令的元数据，包括任何参数的默认值。计划对象（计划）包含有关运行日期和时间以及定期模式的信息。作业对象（作业）将程序与计划相关联。若要定义执行的内容和时间，请分配程序、计划和作业之间的关系。

调度程序在 PL/SQL 包中作为一组函数和过程实现。您可以使用此包或企业管理器创建和操作计划程序对象。由于调度程序对象是标准数据库对象，因此您可以使用系统和对象特权控制对它们的访问。`DBMS_SCHEDULER`

[图 18-8](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-077CBA84-5099-4550-AA11-250B301B609A__CHDHJDBE) 显示了调度程序的基本体系结构。作业表是所有作业的容器，每个数据库一个表。作业协调器后台进程会根据需要自动启动和停止。当必须运行作业时，作业从属服务器由协调器唤醒 从属服务器从作业表中收集元数据并运行作业。

图 18-8 调度程序组件

![Description of Figure 18-8 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/admin062.gif)
[“图 18-8 调度程序组件”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/admin062.html)

另请参阅：

- "[作业队列进程（CJQ0 和 Jnnn）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-C67612E5-CA83-4AE0-B56D-05993A8B38F9)"
- 了解调度程序的 [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN033)





#### 性能和调优

作为 DBA，您负责 Oracle 数据库的性能。通常，性能问题是由不可接受的响应时间（即完成指定工作负载的时间）或吞吐量（可在指定时间内完成的工作量）引起的。

典型的问题包括：

- 中央处理器瓶颈
- 内存结构过小
- I/O 容量问题
- 低效或高负载的 SQL 语句
- 调整 SQL 语句后出现意外的性能回归
- 并发和争用问题
- 数据库配置问题

调优的总体目标通常是缩短响应时间、提高吞吐量或两者兼而有之。一个具体且可衡量的目标可能是“将指定语句的响应时间缩短到 5 秒以下”。这个目标是否可实现取决于DBA可能控制或可能不受控制的因素。通常，调优是通过以最有效的方式使用数据库资源来实现特定、可衡量和可实现的调优目标的努力。`SELECT`

Oracle 性能方法基于识别和消除数据库中的瓶颈，以及开发高效的 SQL 语句。应用 Oracle 性能方法涉及以下任务：

- 执行预调整准备
- 定期主动调整数据库
- 在用户报告性能问题时被动地调整数据库
- 识别、调优和优化高负载 SQL 语句

本节介绍 Oracle 数据库性能调优的基本方面，包括顾问的使用。Oracle 数据库顾问就如何应对关键数据库管理挑战提供具体建议，涵盖空间、性能和撤消管理等广泛领域。

另请参阅：

[Oracle 数据库 2 天 +](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-6203E485-FA06-4EE3-9003-4449FBDE214B) 性能调优指南和 Oracle [数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-C8B23C09-35B5-4F0E-90B2-272805EC4062)提供了了解如何实现 Oracle 性能方法的信息





##### 数据库自我监控

自我监控在数据库执行其常规操作时进行，确保数据库在出现问题时知道问题。Oracle 数据库可以发送服务器生成的警报，以通知您即将发生的问题。

当出现问题或数据与指标（如每秒物理读取数或 SQL 响应时间）的预期值不匹配时，将自动生成警报。[**指标**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-09DBC6B7-8D29-45DD-B033-B10A882269E3)是累积统计数据中的变化率。服务器生成的警报可以基于用户指定的阈值级别，也可以基于事件发生。

服务器生成的警报不仅可以识别问题，有时还会建议如何解决报告的问题。例如，快速恢复区域空间不足的警报，建议删除过时的备份或添加额外的磁盘空间。

另请参阅：

[Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN11247)





##### 自动工作负载存储库 （AWR）

**自动工作负载存储库 （AWR）** 是历史性能数据的存储库，其中包括系统、会话、单个 SQL 语句、分段和服务的累积统计信息。

AWR 统计信息是性能调优的基础。通过自动收集数据库统计信息以进行问题检测和调整，AWR 是数据库自我管理的基础。

如下图所示，数据库在 SGA 中存储最近的 AWR 统计信息。默认情况下，MMON 进程每小时收集一次统计信息并创建 AWR 快照。[**AWR 快照**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A32367A4-F1EB-43B2-9458-54986FC74A9D)是在特定时间捕获的一组性能统计信息。数据库将快照写入表空间。AWR 管理快照空间，根据可配置的快照保留策略清除较旧的快照。`SYSAUX`

图 18-9 自动工作负载存储库 （AWR）

![Description of Figure 18-9 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt279.gif)
[“图 18-9 自动工作负载存储库 （AWR）”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt279.html)

[**AWR 基线**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19E46AF0-A587-422B-8A06-CEF094E47F6A)是通常在系统在峰值负载下运行良好的时间段内采用的统计速率的集合。您可以将一对或一系列 AWR 快照指定为基准。通过使用 AWR 报告将性能不佳期间捕获的统计信息与基线进行比较，您可以诊断问题。

称为AutoTask的自动化维护基础schema说明了Oracle数据库如何使用AWR进行自我管理。通过分析 AWR 数据，AutoTask 可以确定维护任务的需求，并安排它们在 Oracle 调度程序维护时段中运行。任务的示例包括收集[**优化器的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)统计信息和运行自动区段顾问。

另请参阅：

- "[可管理性监控流程（MMON 和 MMNL）](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/process-architecture.html#GUID-D175CA2B-20FE-4D5D-9A89-5CAA279479EC)"
- "[西索表空间](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-E4055936-C426-4B5C-8811-32FF98284F16)"
- 了解 AWR 的 [Oracle 数据库性能调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA169)
- [Oracle 数据库管理员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADMIN0235)，了解如何管理自动维护任务





##### 自动数据库监视器 （ADDM）

使用在 AWR（自动工作负载存储库）中捕获的统计信息，ADDM 会自动主动诊断数据库性能，并确定如何解决已识别的问题。您也可以手动运行 ADDM。

[**自动数据库诊断监视器 （ADDM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F89BDBAC-398F-4568-8041-C0D1611598E0) 是内置于 Oracle 数据库中的自我顾问。

ADDM 采用整体方法提高系统性能，使用时间作为组件之间的通用货币。ADDM 可识别 Oracle 数据库中消耗时间最多的区域。例如，数据库可能花费过多时间等待空闲数据库缓冲区。ADDM 深入分析以确定问题的根本原因，而不仅仅是症状，并报告问题对 Oracle 数据库的整体影响。在此过程中发生的开销最小。

在许多情况下，ADDM 会推荐解决方案并量化预期的性能优势。例如，ADDM 可能会建议对硬件、数据库配置、数据库schema或应用程序进行更改。如果提出建议，则 ADDM 会报告时间效益。使用时间作为衡量标准可以比较问题或建议。

除了报告潜在的性能问题外，ADDM 还记录了数据库中没有问题的区域。对数据库性能没有显著影响的子组件（如 I/O 和内存）在早期阶段从分类树中删除。ADDM 列出了这些子组件，以便您可以快速看到在这些区域中执行操作几乎没有什么好处。

另请参阅：

Oracle 数据库 [2 天 + 性能调优指南和 Oracle 数据库性能](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPPT021)[调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA02602)





##### 活动会话历史记录 （ASH）

**活动会话历史记录 （ASH）** 每秒对活动数据库会话进行采样，将数据写入内存和持久存储。ASH 是数据库自我管理框架的一个组成部分，可用于诊断性能问题。

与自动工作负载存储库 （AWR） 收集的实例级统计信息不同，数据库在会话级别收集 ASH 统计信息。[**活动会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ABE53BC0-1FEF-4304-86B2-06BFF5A4576D)是使用 CPU 且未等待空闲等待类中的事件的会话。

您可以使用企业管理器或 SQL 脚本生成 ASH 报告，以收集在指定持续时间内收集的会话统计信息。您可以将 ASH 报告用于：

- 分析自动数据库诊断监视器 （ADDM） 未识别的短期性能问题
- 按各种维度或其组合（如时间、会话、模块、操作或 SQL ID）进行范围或目标性能分析

例如，用户通知您数据库在晚上 10：00 到晚上 10：02 之间运行缓慢。但是，2 分钟的性能下降仅占 AWR 快照间隔的一小部分，从晚上 10：00 到晚上 11：00，并且不会出现在 ADDM 结果中。ASH 报告可以帮助确定暂时性问题的根源。

另请参阅：

Oracle 数据库 [2 天 + 性能调优指南和 Oracle 数据库性能](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPPT065)[调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGDBA278)





##### 应用程序和 SQL 调优

Oracle 数据库完全自动化了 SQL 调优过程。

ADDM 可识别消耗异常高系统资源的 SQL 语句，从而导致性能问题。此外，AWR 会自动捕获 CPU 和共享内存消耗方面的顶级 SQL 语句。高负载 SQL 语句的识别会自动进行，无需干预。





###### 解释计划声明

语句等工具使您能够查看优化程序选择的执行计划。`EXPLAIN PLAN`

```
EXPLAIN PLAN`显示指定 SQL 查询的查询计划（如果该查询现在在当前会话中执行）。其他工具包括Oracle Enterprise Manager和SQL*Plus命令。`AUTOTRACE
```

另请参阅：

要了解的 [Oracle 数据库 SQL 语言参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SQLRF01601)`EXPLAIN PLAN`



###### 优化器统计顾问

优化器统计信息顾问是一种诊断软件，用于分析当前收集统计信息的方式、现有统计信息收集作业的有效性以及收集的统计信息的质量。优化程序统计信息顾问程序使用与自动数据库诊断监视器 （ADDM）、SQL 性能分析器和其他顾问程序相同的顾问程序框架。

与依赖于最佳实践的传统方法相比，优化程序统计信息顾问具有以下优点：

- 提供易于理解的报告
- 提供脚本以实现必要的修复，*而无需*更改应用程序代码
- 在维护时段中运行每天命名一次的预定义任务`AUTO_STATS_ADVISOR_TASK`
- 在包中提供一个 API，使您能够手动创建和运行任务、在数据字典视图中存储结果和建议、为任务生成报告以及在必要时实施更正`DBMS_STATS`
- 与现有工具集成，如 Oracle Enterprise Manager（Enterprise Manager）

优化程序统计信息顾问维护规则，这些规则是 Oracle 提供的标准，顾问程序执行检查时所依据的标准。这些规则体现了基于当前功能集的 Oracle 最佳实践。如果最佳做法因版本而异，则优化程序统计信息顾问程序规则也会更改。通过这种方式，顾问始终提供最新的建议。

优化程序统计信息顾问检查统计信息收集过程，然后生成结果报告，这些结果违反了规则。如果顾问提出建议，并且根据这些建议提出操作，则可以自动实施操作或生成可编辑的可执行 PL/SQL 脚本。

顾问任务在维护时段内自动运行，但您也可以按需运行它。

另请参阅：

- [Oracle 数据库 SQL 调优指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL-GUID-054F4B76-DD57-46EE-98EA-0FF04F49D1B3)了解有关优化器统计顾问的更多信息
- [Oracle 数据库 PL/SQL 包和类型参考以了解该包](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ARPLS150)`DBMS_STATS`





###### SQL 优化顾问

自动 SQL 优化的接口是 SQL 优化顾问，它在系统维护时段内作为维护任务自动运行。

在每次自动运行期间，顾问程序都会选择数据库中的高负载 SQL 查询，并生成优化这些查询的建议。

SQL 优化顾问建议分为以下类别：

- 统计分析
- SQL 剖析
- 访问路径分析
- SQL 结构分析

SQL [**概要文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E54F3CED-F5B8-4367-923E-BCFB67319D3A)包含特定于 SQL 语句的附加统计信息，并使优化程序能够生成更好的[**执行计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)。本质上，SQL 配置文件是一种分析查询的方法。[**访问路径**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-56F7FB03-3499-4D51-8D23-F86C45194F09)和 SQL 结构分析对于调优正在开发的应用程序或自行开发的生产应用程序都很有用。

SQL 优化顾问的一个主要优点是解决方案来自优化器，而不是外部工具。因此，调优由负责执行计划和 SQL 性能的数据库组件执行。调优过程可以考虑 SQL 语句过去的执行统计信息，并定制此语句的优化程序设置。

另请参阅：

- "[优化器概述](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-3F42B1AA-530A-4144-8179-F0074832AF81)"
- Oracle 数据库 [2 天 + 性能调优指南和](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPPT160) [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL540)





###### SQL 访问顾问

使用 SQL 访问顾问可帮助您分析 SQL 查询，并确定优化schema对象或优化查询的方法。

SQL 访问顾问提供了有关如何优化数据访问路径的建议。具体而言，它建议如何通过分区、实例化视图、索引和具体化视图日志来提高数据库性能。

schema对象（如分区和索引）对于优化复杂的数据密集型查询至关重要。但是，这些对象的创建和维护可能非常耗时，并且空间要求可能很高。SQL 访问顾问通过为指定的工作负荷推荐数据结构来帮助实现性能目标。

可以使用向导或使用包从企业管理器运行 SQL 访问顾问。 由可从任何PL / SQL程序调用的分析和咨询功能和程序的集合组成。`DBMS_ADVISOR``DBMS_ADVISOR`

另请参阅：

Oracle 数据库 [2 天 + 性能调优指南和](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPPT170) [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL591)





###### SQL 计划管理

通过使用 SQL 计划管理仅执行经过测试和验证的计划来管理 SQL 执行计划。

[**SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D75689FA-8F43-4BA6-9764-1BDFA1DB28FC) 计划管理是一种预防性机制，它使优化程序能够自动管理执行计划，从而确保数据库仅使用经过验证的计划。此机制可以生成 SQL [**计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F9730C73-DF8D-4360-B0E6-CB8B381D1447)基线，该基线是可重复 SQL 语句的一个或多个已接受计划的集合。基线的效果是优化程序将其选择限制为基线中已验证的计划。

从 Oracle Database 12c 开始，数据库可以使用自适应 SPM。SPM Evolve Advisor 每天在计划的维护时段内运行，对所有未接受的计划进行排名，然后在该时段内对尽可能多的计划执行测试执行。SPM Evolve Advisor 在 SQL 计划基线中选择成本最低的已接受计划，以与每个未接受的计划进行比较。如果未接受的计划比现有接受的计划表现得足够好，则顾问接受该计划。否则，顾问会将计划保留为未接受，并更新上次验证日期。

另请参阅：

- "[数据库管理员工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html#GUID-FA659979-25B7-4611-AA8D-48B5404301FE)"
- 了解 SQL 计划管理的 [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL202)

## 19 面向数据库开发人员的概念

Oracle 数据库开发人员创建并维护数据库应用。本节简要概述了数据库开发人员的工作和可用的开发工具。

本节包含以下主题：

- [数据库开发人员的职责](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-27B26DB7-18D0-47DE-BE8B-67A44BD12347)
- [面向数据库开发人员的工具](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-D1C1BC1D-03C7-4A18-BB88-0D76F311DAF0)
- [面向数据库开发人员的主题](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-2F65ADC7-44DA-4D71-B828-EE6E1C7C12B2)





### 数据库开发人员的职责

Oracle 开发人员负责创建或维护使用 Oracle 技术堆栈的应用程序的数据库组件。

Oracle 开发人员要么开发新应用，要么将现有应用转换为在 Oracle 数据库环境中运行。出于这个原因，开发人员与数据库管理员密切合作，共享知识和信息。

Oracle 数据库开发人员可以期望参与以下任务：

- 实现应用程序所需的数据模型
- 创建schema对象
- 实施数据完整性规则
- 为新的开发项目选择编程环境
- 编写使用 SQL 语句的服务器端 PL/SQL 或 Java 子程序和客户端过程代码
- 使用所选开发工具创建应用程序界面
- 建立全球化支持环境以开发全球化应用程序
- 在不同数据库中实例化应用程序，以便在生产环境中进行开发、测试、培训和部署



另请参阅：

- Oracle 数据库 [2 天开发人员指南，介绍 Oracle 数据库](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG10000)开发中的介绍和基于 GUI 的教程
- [Oracle 数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-EBCEA9FE-4F25-40DF-B5FD-682C3692E92F)，深入讨论数据库设计、面向开发人员的 SQL 和面向开发人员的 PL/SQL 等主题





### 面向数据库开发人员的工具

Oracle 提供了多种用于开发数据库应用程序的工具。本节介绍一些常用的开发工具。





#### SQL 开发人员

SQL Developer 是数据库开发人员使用 **SQL***Plus 编辑和开发基本任务的便捷方式。

SQL Developer是SQL[***Plus**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-727830E8-1F52-4BC2-8DB6-827760DF00A3)的图形版本，用Java编写，支持SQL和PL / [**SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C1CD2191-1A39-4182-9907-D71900A623C4)开发。您可以使用标准数据库身份验证连接到任何 Oracle 数据库schema。SQL 开发人员使您能够：

- 浏览、创建、编辑和删除schema对象
- 执行 SQL 语句
- 编辑和调试 PL/SQL 程序单元
- 操作和导出数据
- 创建和显示报表

SQL Developer在默认的Oracle数据库安装和免费下载中可用。

另请参阅：

Oracle [Database 2 Day](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG12200) Developer's Guide 和 [Oracle SQL Developer User's](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=RPTUG10000) Guide 了解如何使用 SQL Developer





#### Oracle应用快递

**Oracle Application Express** 是用于 Oracle 数据库的 Web 应用程序开发工具。Oracle 应用快速解决方案使用用户界面主题、导航控件、表单处理程序和灵活报告等内置功能来加速应用开发。

Oracle Application Express 随数据库一起安装，由表中的数据和 PL/SQL 代码组成。当您运行应用程序时，您的浏览器会发送一个 URL 请求，该请求将转换为 Oracle Application Express PL/SQL 调用。数据库处理PL / SQL后，结果将作为HTML中继回浏览器。每次请求或提交页面时都会发生此循环。

您可以将Oracle Application Express与嵌入式PL / SQL网关一起使用。网关在数据库的 Oracle XML DB HTTP 服务器中运行，并提供必要的基础结构来创建动态应用程序。[如图 19-1](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-BCF7C5C0-AD67-478A-8105-095CF33101B0__CHDDEJFJ) 所示，嵌入式 PL/SQL 网关通过消除中间层来简化应用程序schema。

图 19-1 具有嵌入式 PL/SQL 网关的应用程序快速

![Description of Figure 19-1 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt317.gif)
[“图 19-1 具有嵌入式 PL/SQL 网关的应用程序快速”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt317.html)





#### Oracle JDeveloper

**Oracle JDeveloper** 是一个集成开发环境 （IDE），用于使用 Java、XML、Web 服务和 SQL 的最新行业标准构建面向服务的应用程序。

[**Oracle JDeveloper**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-505A2BBD-F8D1-45F2-82A7-31E8E1F8943A) 支持完整的软件开发生命周期，具有用于建模、编码、调试、测试、分析、调优和部署应用的集成功能。

Oracle JDeveloper将Windows用于各种应用程序开发工具。例如，在创建 Java 应用程序时，可以使用 Java 可视编辑器和组件面板等工具。除了这些工具之外，Oracle JDeveloper 还提供了一系列导航器来帮助您组织和查看项目内容。

另请参阅：

- [Oracle 数据库 2 天 + Java 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPJD-GUID-3F5E954A-D922-4870-96A9-2D389D72692C)，了解如何使用 JDeveloper
- 您可以从以下 URL 下载 JDeveloper：[`http://www.oracle.com/technetwork/developer-tools/jdev/downloads/`](http://www.oracle.com/technetwork/developer-tools/jdev/downloads/)





#### Oracle Developer Tools for Visual Studio .NET

**Oracle Developer Tools for** Visual Studio .NET 是一组与 Visual Studio .NET 环境集成的应用程序工具。

Oracle [**Developer Tools for Visual Studio .NET**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC0BA89B-A2B8-4B6F-A0E0-2D66FE7AFA00) 工具提供对 Oracle 功能的 GUI 访问，使用户能够执行各种应用程序开发任务，并提高开发效率和易用性。

Oracle 开发人员工具支持使用 Visual Basic、C# 和其他 .NET 语言对 .NET 存储过程进行编程和实现。这些过程是用 .NET 语言编写的，包含 SQL 或 PL/SQL 语句。





### 面向数据库开发人员的主题

本节介绍对数据库开发人员最重要的主题，这些主题尚未在手册的其他部分讨论。

本节包含以下主题：

- [应用程序设计和调优原则](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-0B18B469-8BC5-4AAD-9DF6-699C687D344A)
- [客户端数据库编程](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-87F23274-B506-486B-8775-880016095EF5)
- [全球化支持](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-2EB557BD-C60C-4D1D-A95C-084DE360B0DA)
- [非结构化数据](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-B39E395E-99FF-4FF1-AC65-E581BD53EFA9)





#### 应用程序设计和调优原则

Oracle 开发人员必须设计、创建和调优数据库应用，以实现安全性和性能目标。

以下应用程序设计和调整原则是有用的准则：

- 了解 Oracle 数据库的工作原理

  作为开发人员，您希望在最短的时间内针对 Oracle 数据库开发应用程序，这需要利用数据库体系结构和功能。例如，不了解 Oracle 数据库数据并发控制和多版本化读取一致性可能会使应用程序破坏数据的完整性、运行缓慢并降低可扩展性。了解事务防护和应用程序连续性的工作原理可以避免编写不必要的异常处理代码。

- 使用绑定变量，除非您有充分的理由不使用它们

  当查询使用绑定变量时，数据库可以编译一次，并将[**查询计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78BCF1CD-1865-4AEB-8F14-AFA4FF1981BF)存储在[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中。如果再次执行相同的语句，则数据库可以执行[**软分析**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A9D78636-6F7B-472B-8AC6-4B07C775DE00)并重用该计划。相比之下，[**硬解析**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1BFB2AF7-BC88-4A93-B9AA-C75CA62C5824)需要更长的时间并使用更多的资源。使用绑定变量允许软解析非常有效，并且是数据库希望开发人员的工作方式。

- 在数据库服务器而不是客户端中实现完整性约束

  使用主键和外键可以在多个应用程序中重用数据。在客户端中对规则进行编码意味着其他客户端在针对数据库运行时无法访问这些规则。

- 构建具有代表性数据和会话活动的测试环境

  模拟实时生产环境的测试环境具有多种优势。例如，您可以对应用程序进行基准测试，以确保其可缩放且性能良好。此外，还可以使用测试环境来衡量数据库更改对性能的影响，并确保升级和修补程序正常工作。

- 以良好性能为目标设计数据模型

  通常，尝试使用通用数据模型会导致性能不佳。设计良好的数据模型可以尽可能高效地回答最常见的查询。例如，数据模型应使用提供最佳性能的索引类型。部署后进行调整是不可取的，因为对逻辑和物理结构的更改可能很困难或不可能。

- 定义明确的性能目标并保留指标的历史记录

  开发的一个重要方面是准确确定应用程序的预期性能和扩展方式。例如，使用包括预期用户负载、每秒事务数、可接受的响应时间等的指标。良好做法要求您维护性能指标的历史记录。通过这种方式，您可以主动和被动地监视性能。

- 检测应用程序代码

  良好的开发实践包括向应用程序添加调试代码。生成跟踪文件的功能对于调试和诊断性能问题非常有用。

另请参阅：

- "[SQL 解析](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/sql.html#GUID-B3F2B5B8-B679-4A7C-B1E8-286F36319FCB)"
- "[数据并发性和一致性简介](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-7AD41DFA-04E5-4738-B744-C4407170411C)"
- "[完整性约束的优点](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-integrity.html#GUID-FBAEAD76-CC71-40BF-B133-6EBCC2AA5A9D)"
- [Oracle 数据库 2 天开发人员指南，](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDDDG70000)了解设计数据库应用时的注意事项
- [Oracle 数据库 SQL 调优指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TGSQL133)，了解如何设计应用以提高性能





#### 客户端数据库编程

可以使用预编译器或 Java 转换器将 SQL 语句放在源代码中，也可以使用 API 使应用程序能够与数据库交互。

有两种基本技术使过程数据库应用程序能够使用 SQL：使用 PL/SQL 和 Java 进行服务器端编程，以及使用预编译器和 API（如 Java 数据库连接 （JDBC） 或 Oracle 调用接口 （OCI））进行客户端编程。

另请参阅：

[Oracle数据库开发指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00109)，了解如何选择编程环境

[服务器端编程：PL/SQL 和 Java](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-D4A154D2-DF56-45DA-863C-BED5DA6BDA34) 回顾





##### 嵌入式 SQL

从历史上看，客户端/服务器程序使用嵌入式 SQL 与数据库进行交互。





###### Oracle预编译器

客户端/服务器程序通常使用 Oracle 预编译器编写，Oracle **预编译器**是一种编程工具，使您能够在高级程序中嵌入 SQL 语句。

例如，Oracle Pro*C/C++ 预编译器使您能够在 C 或C++源文件中嵌入 SQL 语句。Oracle 预编译器也可用于 COBOL 和 FORTRAN。

预编译器具有多种优点，包括：

- 提高工作效率，因为您通常编写的代码比同等的 OCI 应用程序少
- 使您能够创建高度自定义的应用程序
- 允许密切监视资源使用、SQL 语句执行和各种运行时指示器
- 节省时间，因为预编译器（而不是您）将每个嵌入式 SQL 语句转换为对 Oracle 数据库运行时库的调用
- 使用对象类型转换器将 Oracle 数据库对象类型和集合映射到要在 Pro*C/C++ 应用程序中使用的 C 数据类型
- 提供对象类型和集合的编译时类型检查以及从数据库类型到 C 数据类型的自动类型转换

包含 SQL 语句的客户端应用程序是主机程序。该程序是用主机语言编写的。在主机程序中，可以将完整的 SQL 语句与完整的 C 语句混合使用，并在 SQL 语句中使用 C 变量或结构。嵌入 SQL 语句时，必须以关键字开头，并以分号结尾。Pro*C/C++ 将语句转换为对运行时库 SQLLIB 的调用。`EXEC SQL``EXEC SQL`

许多嵌入式 SQL 语句与其交互式语句的区别仅在于添加新子句或使用程序变量。下面的示例比较交互式语句和嵌入式语句：`ROLLBACK`

```
CopyROLLBACK;           -- interactive
EXEC SQL ROLLBACK;  -- embedded
```

这些语句具有相同的效果，但您将在交互式 SQL 环境（如 SQL Developer）中使用第一个语句，在 Pro*C/C++ 程序中使用第二个语句。

预编译器接受主机程序作为输入，将嵌入式 SQL 语句转换为标准数据库运行时库调用，并生成可以按常规方式编译、链接和运行的源程序。[图 19-2](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-0255CEA8-F1DB-47B4-9115-2E165443BFBD__BABDJCFJ) 说明了开发使用预编译器的程序的典型步骤。

图 19-2 使用预编译器进行程序开发

![图 19-2 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt253.gif)
[“图 19-2 使用预编译器进行程序开发”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt253.html)

另请参阅：

[Pro*C/C++ 程序员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-20CBCC27-EC6B-4651-92CC-7E008BD73611)，完整描述 Pro*C/C++ 预编译器





###### SQLJ

**SQLJ** 是 ANSI SQL-1999 标准，用于在 Java 源代码中嵌入 SQL 语句。SQLJ 为 Java 数据库连接 （JDBC） API 提供了一种更简单的替代方案，用于从 Java 访问客户端 SQL 数据。

SQLJ 接口是 Pro* 接口的 Java 等效项。在 Java 源代码中插入 SQL 语句。之后，您将 Java 源文件提交给 SQLJ 转换器，该转换器将嵌入式 SQL 转换为基于 JDBC 的纯 Java 代码。

另请参阅：

"[SQLJ](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/server-side-programming.html#GUID-BCCC0B04-0B9C-45BA-A34A-46051F0643E1)"





##### 客户端接口

如今，大多数开发人员都使用 API 将 SQL 嵌入到他们的数据库应用程序中。

例如，用于使程序能够与Oracle数据库通信的两个常用API是开放数据库连接（ODBC）和JDBC。Oracle 调用接口 （OCI） 和 Oracle C++ 调用接口 （OCCI） 是客户端编程的另外两个常见 API。





###### OCI 和 OCCI

作为预编译器的替代方案，Oracle 提供了 OCI 和 OCCI API。

OCI 允许您使用主机编程语言（如 C）操作数据库中的数据和schema。 OCCI 是一种面向对象的接口，适用于C++。这两个 API 都使开发人员能够使用本机子程序调用来访问 Oracle 数据库并控制 SQL 执行。

在某些情况下，OCI 提供比更高级别的接口更好的性能或更多的功能。OCI 和 OCCI 提供许多功能，包括：

- 支持通过 Oracle 数据库提供的所有 SQL [**DDL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64F19D78-A73F-44A5-AA2E-60EBC800CB22)、[**DML**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5F2F112-1B33-41B5-B63D-9DC8F99A369D)、查询和事务控制功能
- 即时客户端，一种在磁盘空间出现问题时部署应用程序的方法
- 线程管理、连接池、全球化函数以及从 C 应用程序直接路径加载数据

OCI 和 OCCI 以动态运行时库 （OCILIB） 的形式提供标准数据库访问和检索功能库。此库可以在运行时在应用程序中链接。因此，您可以像非数据库应用程序一样编译和链接 OCI 或 OCCI 程序，避免单独的预处理或预编译步骤。[图 19-3](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-AC6284BA-C4CB-409E-84CE-C39220974F43__CHDIFEAD) 说明了开发过程。

图 19-3 使用 OCI 或 OCCI 的开发过程

![图 19-3 的说明如下](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/cncpt307.gif)
[“图 19-3 使用 OCI 或 OCCI 的开发过程”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/cncpt307.html)

另请参阅：

- [Oracle 调用接口程序员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNOCI16114)
- [Oracle C++ Call Interface Programmer's Guide](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=LNCPP001)





###### ODBC 和 JDBC

ODBC 是一个标准 API，它使应用程序能够连接到数据库，然后准备和运行 SQL 语句。

ODBC 独立于编程语言、数据库和操作系统。ODBC 的目标是使任何应用程序能够访问任何数据库中包含的数据。

数据库[**驱动程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-99819F56-4349-4F08-A37D-0DBED964BCA3)是位于应用程序和数据库之间的软件。驱动程序将应用程序进行的 API 调用转换为数据库可以处理的命令。通过使用 ODBC 驱动程序，应用程序可以访问任何数据源，包括存储在电子表格中的数据。ODBC 驱动程序执行 ODBC 标准和数据库之间的所有映射。

Oracle 提供的 Oracle ODBC 驱动程序使符合 ODBC 的应用程序能够访问 Oracle 数据库。例如，用 Visual Basic 编写的应用程序可以使用 ODBC 查询和更新 Oracle 数据库中的表。

JDBC 是一个低级 Java 接口，使 Java 应用程序能够与 Oracle 数据库进行交互。与 ODBC 一样，JDBC 是一个独立于供应商的 API。JDBC标准由Sun Microsystems定义，并通过接口实现。`java.sql`

JDBC 标准使各个提供商能够使用自己的 JDBC 驱动程序实现和扩展该标准。Oracle 为客户端编程提供了以下 JDBC 驱动程序：

- JDBC 瘦驱动程序

  此纯 Java 驱动程序驻留在客户端，无需安装 Oracle 客户端。它独立于平台，可用于小程序和应用程序。

- JDBC OCI 驱动程序

  此驱动程序与 Oracle 客户端安装一起驻留在客户端。它只能与应用程序一起使用。JDBC OCI 驱动程序是用 C 和 Java 编写的，它将 JDBC 调用转换为 OCI 调用。

以下代码片段来自使用 JDBC OCI 驱动程序创建对象并查询表的 Java 程序：`Statement``dual`

```
Copy// Create a statement
Statement stmt = conn.createStatement();
 
// Query dual table
ResultSet rset = stmt.executeQuery("SELECT 'Hello World' FROM DUAL");
```

另请参阅：

Oracle [数据库开发](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADFNS00103)指南和 [Oracle Database 2 Day + Java 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=TDPJD-GUID-2ADAB75C-88C9-4956-98C3-FE0ED96444CA)，了解有关 JDBC 的更多信息





#### 全球化支持

Oracle 数据库全球化支持使您能够以本地语言存储、处理和检索数据。

全球化支持使您能够开发可从世界任何地方同时访问和运行的多语言应用程序和软件。

编写全球化数据库应用程序的开发人员必须执行以下操作：

- 了解 Oracle 数据库全球化支持体系结构，包括不同字符集、区域、语言和语言排序定义的属性
- 了解其中层编程环境的全球化功能，包括它如何与数据库的区域设置模型进行交互和同步
- 设计和编写能够同时支持在不同操作系统上运行的多个客户端的代码，具有不同的字符集和区域设置要求

例如，应用程序可能需要呈现用户界面的内容，并以本机用户的语言和区域设置首选项处理数据。例如，应用程序必须处理多字节汉字数据，以正确的区域格式显示消息和日期，并处理 7 位 ASCII 数据，而无需用户更改设置。

另请参阅：

[Oracle 数据库全球化支持指南，了解有关全球化](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NLSPG001)的更多信息





##### 全球化支持环境

全球化支持环境包括客户端应用程序和数据库。您可以通过在客户端和服务器上设置参数和环境变量来控制与语言相关的操作，这些参数和环境变量可能存在于不同的位置。

注意：在以前的版本中，Oracle 将全球化支持功能称为本地语言支持 （NLS） 功能。NLS 实际上是全球化支持的一个子集，它提供了选择本地语言并以特定字符集存储数据的功能。

Oracle 数据库为以下功能提供全球化支持：

- 母语和领土
- 日期、时间、数字和货币的本地格式
- 日历系统（公历、日本帝国、泰国佛陀等）
- 多个字符集，包括 Unicode
- 字符语义





###### 字符集

全球化支持的一个关键组件是字符集，它是用于在计算机屏幕上显示*字符*的编码方案。

以下区别在应用程序开发中很重要：

- [**数据库字符集**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D0DA31F4-3B06-4126-9104-996CA599769C)确定数据库中可以表示哪些语言。字符集在创建数据库时指定。

  注：创建数据库后，更改其字符集通常非常昂贵，需要花费时间和资源。此操作可能需要通过导出整个数据库并将其导入回来来转换所有字符数据。

- 客户端字符集是客户端应用程序输入或显示的数据的[**字符集**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2D39D86F-60FA-469D-AC97-E9C493BBA567)。客户端和数据库的字符集可以不同。

一组字符（例如，字母字符、表意文字、符号、标点符号和控制字符）可以编码为字符集。编码字符集为字符集中的每个字符分配一个唯一的数字代码，称为代码点或编码值。代码点在全局环境中很重要，因为可能需要在不同字符集之间转换数据。

计算机行业使用许多编码字符集。这些集在可用字符数、可用字符、分配给每个字符的代码点等方面有所不同。Oracle 数据库支持大多数国家、国际和供应商特定的编码字符集标准。

Oracle 数据库支持以下编码字符集类：

- 单字节字符集

  每个字符占用一个字节。7 位字符集的一个示例是 US7ASCII。8 位字符集的一个示例是 WE8DEC。

- 多字节字符集

  每个字符占用多个字节。多字节集通常用于亚洲语言。

- 统一码

  通用编码字符集使您能够使用单个字符集以任何语言存储信息。Unicode 为每个字符提供唯一的代码值，而不考虑平台、程序或语言。

另请参阅：

了解字符集迁移的 [Oracle 数据库全球化支持指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NLSPG011)





###### 特定于区域设置的设置

**区域设置**是运行系统或程序的语言和文化环境。NLS 参数确定客户端和数据库上特定于区域设置的行为。

数据库会话在代表客户端执行语句时使用 NLS 设置。例如，数据库为客户端正确使用千位分隔符。通常，客户端主机上的环境变量指定服务器会话和客户端应用程序的区域设置。流程如下：`NLS_LANG`

1. 当客户端应用程序启动时，它会从环境设置初始化客户端 NLS 环境。

   在本地执行的所有 NLS 操作（例如在 Oracle 开发人员应用程序中显示格式）都使用这些设置。

2. 客户端在连接时将定义的信息传达给数据库。`NLS_LANG`

3. 数据库会话根据客户端传达的设置初始化其 NLS 环境。

   如果客户端未指定设置，则会话将使用初始化参数文件中的设置。仅当客户端未指定任何 NLS 设置时，数据库才使用初始化参数设置。如果客户端指定了一些 NLS 设置，则其余的 NLS 设置默认。

代表客户端应用程序启动的每个会话都可以在与其他会话相同或不同的区域设置中运行。例如，一个会话可能使用德语区域设置，而另一个会话使用法语区域设置。此外，每个会话可能指定了相同或不同的语言要求。

下表显示了使用不同设置的两个客户端。用户在每个主机上启动 SQL*Plus，登录到与 相同的数据库，并同时运行相同的查询。由于浮点数的区域设置特定于区域设置，每个会话的结果会有所不同。`NLS_LANG``hr`

表 19-1 特定于区域设置的 NLS 设置

| t    | 客户端主机 1                                                 | 客户端主机 2                                                 |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| t0   | `$ NLS_LANG=American_America.US7ASCII $ export NLS_LANG `    | `$ NLS_LANG=German_Germany.US7ASCII $ export NLS_LANG`       |
| t1   | `$ sqlplus /nolog SQL> CONNECT hr@proddb Enter password: ******* SQL> SELECT 999/10 FROM DUAL; 999/10  ----------  99.9` | `$ sqlplus /nolog  SQL> CONNECT hr@proddb  Enter password: *******  SQL> SELECT 999/10 FROM DUAL;    999/10  ----------  99,9` |

另请参阅：

了解 NLS 设置的 [Oracle 数据库全球化支持指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NLSPG189)





##### Oracle全球化开发工具包

**Oracle 全球化开发工具包 （GDK）** 包括全面的编程 API。

API 可用于 Java 和 PL/SQL，包括代码示例和文档，用于解决创建全局应用程序时遇到的许多设计、开发和部署问题。GDK 简化了开发过程，并降低了开发用于支持全球环境的 Internet 应用程序的成本。

GDK主要由两部分组成：用于Java的GDK和用于PL/SQL的GDK。GDK for Java 为 Java 应用程序提供全球化支持。GDK for PL/SQL 为 PL/SQL 编程环境提供全球化支持。这两个部分提供的功能并不相同。

另请参阅：

[Oracle 数据库全球化支持指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=NLSPG008)





#### 非结构化数据

非结构化数据是未分解为较小逻辑结构的数据。

传统的关系模型处理适合简单表的简单结构化数据。Oracle 数据库还提供对非结构化数据的支持，这些数据无法分解为标准组件。非结构化数据包括文本、图形图像、视频剪辑和声音波形。

Oracle 数据库包含用于处理非结构化内容的数据类型。这些数据类型在数据库中显示为本机类型，可以使用 SQL 进行查询。





##### Oracle 数据库中的 XML 概述

Oracle XML DB 是一组与高性能 XML 操作、存储和检索相关的 **Oracle** 数据库技术。Oracle XML DB 通过以可互操作的方式包含 SQL 和 XML 数据模型来提供本机 XML 支持。

Oracle XML DB适用于任何Java或PL / SQL应用程序，其中应用程序处理的部分或全部数据使用XML表示。例如，应用程序可能具有大量必须引入、生成、验证和搜索的 XML 文档。

Oracle XML DB 提供了许多功能，包括：

- 本机数据类型，可以表示数据库中的 XML 文档，以便 SQL 可以访问该文档`XMLType`
- 支持 XML 标准，如 XML Schema、XPath、XQuery、XSLT 和 DOM
- `XMLIndex`，支持从高度结构化到完全非结构化的所有形式的 XML 数据

下面的示例创建一个类型的表：`orders``XMLType`

```
CopyCREATE TABLE orders OF XMLType;
CREATE DIRECTORY xmldir AS path_to_folder_containing_XML_file;
INSERT INTO orders
  VALUES (XMLType(BFILENAME('XMLDIR','purOrder.xml'),NLS_CHARSET_ID('AL32UTF8')));
```

前面的示例还创建一个 SQL 目录对象，该对象是数据库中主计算机上物理[**目录**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE43E596-FA4A-4E1B-B137-599F6EE0A0A5)的逻辑名称。此目录包含 XML 文件。该示例将文件中的 XML 内容插入到表中。`purOrder.xml``orders`

[**Oracle XML 开发人员工具包 （XDK）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6626FEED-EA06-44B2-959C-023A276BCFFA) 包含用于读取、操作、转换和查看 XML 文档的基本构建块，无论是在文件系统上还是在数据库中。API 和工具可用于 Java、C 和 C++。生产版 Oracle XDK 附带商业再分发许可证。

例 19-1 XMLType

```
CopyCREATE TABLE orders OF XMLType;
CREATE DIRECTORY xmldir AS path_to_folder_containing_XML_file;
INSERT INTO orders
  VALUES (XMLType(BFILENAME('XMLDIR','purOrder.xml'),NLS_CHARSET_ID('AL32UTF8')));
```

另请参阅：

- [Oracle XML DB 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDB0100)
- [Oracle XML 开发人员工具包程序员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDK100)



##### Oracle 数据库中的 JSON 概述

Oracle 数据库为 JavaScript 对象表示法 （JSON） 数据提供本机支持，包括查询和索引。

本节包含以下主题：

- [什么是 JSON？](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-D69639C8-FDD1-46EA-85A6-9933AE87918B)
- [JSON 和 XML](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-8E1D04DF-A97B-456B-9804-58F639AB6F0F)
- [对 JSON 的本机数据库支持](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-A063B6D1-2613-4B2A-B32E-DF84F69AA1B3)



###### 什么是 JSON？

**JavaScript 对象表示法 （JSON）** 是一种独立于语言、基于文本的数据格式，可以表示对象、数组和标量数据。各种编程语言都可以解析和生成 JSON 数据。

JSON 通常用作数据交换语言。它通常用于序列化结构化数据并通过网络（通常在服务器和 Web 应用程序之间）交换它。JSON是运行用HTML嵌入式JavaScript编写的应用程序的Web浏览器中的主要数据格式。

[**JavaScript 对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4279C4E9-4FA2-4B2B-8C62-AFCDD49CC941)是零对或多对属性名称和关联的 JSON 值的关联数组。JSON 对象是 JavaScript [**对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3875464F-A973-4558-A5AE-0354C88E49C9)文本，它写为括在大括号中的属性列表，名称-值对用逗号分隔，每对的名称和值用冒号分隔。对象属性有时称为*键*。对象属性名称/值对有时称为对象*成员*。

示例 19-2 JSON 对象

此示例显示表示采购订单的 JSON 对象，该对象具有顶级属性名称 、、 和 。`PONumber``Reference``Requestor``User``Costcenter``ShippingInstruction``Special Instructions``AllowPartialShipment``LineItems`

```
Copy{ "PONumber"             : 1600,
  "Reference"            : "ABULL-20140421",
  "Requestor"            : "Alexis Bull",
  "User"                 : "ABULL",
  "CostCenter"           : "A50",
  "ShippingInstructions" : { "name"   : "Alexis Bull",
                             "Address": { "street"  : "200 Sporting Green",
                                          "city"    : "South San Francisco",
                                          "state"   : "CA",
                                          "zipCode" : 99236,
                                          "country" : "United States of America" },
                             "Phone" : [ { "type" : "Office", "number" : "909-555-7307" },
                                         { "type" : "Mobile", "number" : "415-555-1234" } ] },
  "Special Instructions" : null,
  "AllowPartialShipment" : false,
  "LineItems"            : [ { "ItemNumber" : 1,
                               "Part"       : { "Description" : "One Magic Christmas",
                                                "UnitPrice"   : 19.95,
                                                "UPCCode"     : 13131092899 },
                               "Quantity"   : 9.0 },
                             { "ItemNumber" : 2,
                               "Part"       : { "Description" : "Lethal Weapon",
                                                "UnitPrice"   : 19.95,
                                                "UPCCode"     : 85391628927 },
                               "Quantity"   : 5.0 } ] }
```

在前面的示例中，大多数属性都具有字符串值。、、 和具有数值。 并将对象作为值。 有一个数组作为值。`PONumber``zipCode``ItemNumber``Quantity``Shipping Instructions``Address``LineItems`

注意：[Oracle XML DB 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDB6247)，更全面地了解 JSON



###### JSON 和 XML

JSON 和 XML 通常用作数据交换语言。与关系数据不同，JSON 数据和 XML 数据都可以在数据库中存储、索引和查询，而无需任何定义数据的schema。

由于其简单的定义和功能，JSON 数据通常比 XML 数据更易于生成、解析和处理。它也更容易让人类学习和使用。下表描述了 JSON 和 XML 之间的进一步差异。

表 19-2 JSON 和 XML 之间的差异

| 特征                           | 杰伦 | .XML                                       |
| :----------------------------- | :--- | :----------------------------------------- |
| 适用于简单的结构化数据         | 是的 | 是的，但也支持半结构化数据和复杂结构化数据 |
| 适用于混合内容                 | 不   | 是的                                       |
| 缺少属性、命名空间、继承和替换 | 是的 | 不                                         |
| 重视订购                       | 不   | 是的                                       |
| 主要用于文档而不是数据         | 不   | 是的                                       |
| 包括日期数据类型               | 不   | 是的                                       |

注意：[Oracle 数据库 JSON 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-C347AC02-31E4-49CE-9F74-C7C0F339D68E)，用于更全面地比较 XML 和 JSON



###### 对 JSON 的本机数据库支持

JSON广泛存储在缺乏关系型数据库功能的noSQL数据库中。相比之下，Oracle 数据库通过事务、索引、声明性查询和视图等功能原生支持 JSON。

您可以像访问其他数据库数据一样访问存储在数据库中的 JSON 数据，包括使用 OCI、.NET 和 JDBC。与使用 SQL 数据类型存储的 XML 数据不同，JSON 数据使用 、 或 进行存储。通过使用 Oracle SQL，您可以对 JSON 数据执行以下操作：`XMLType``VARCHAR2``BLOB``CLOB`

- 将 JSON 数据与非 JSON 关系数据联接。
- 使用 SQL 函数和 从关系数据生成 JSON 文档。`json_object``json_array`
- 使用 SQL 函数将 JSON 数据投影为关系格式。`json_table`
- 创建检查约束以在列中强制实施 JSON 数据。数据库使用 check 约束来确认该列是 JSON 的 JSON，用于特定于 JSON 的操作（如简化语法）。`is_json`
- 将 JSON 文档作为 PL/SQL 对象进行操作。
- 使用 SQL 函数并接受 Oracle JSON 路径表达式作为参数，并将其与目标 JSON 数据进行匹配。`json_query``json_value`
- 索引 JSON 数据。
- 查询存储在外部表中的 JSON 数据。
- 使用 Oracle GoldenGate 复制包含 JSON 数据的列的表。

文本 JSON 数据始终使用 Unicode 字符集，UTF8 或 UTF16。Oracle 数据库在解析和查询 JSON 数据时在内部使用 UTF8。如果此类处理的输入或输出的数据必须与 UTF8 采用不同的字符集，则会自动执行适当的字符集转换。

示例 19-3 创建、加载和查询包含 JSON 列的表

在此示例中，您将使用 JSON 列创建表，然后插入一些简单的 JSON 数据。某些数据被省略 （）。`j_purchaseorder``po_document``...`

```
CopyCREATE TABLE j_purchaseorder
   (id          RAW (16) NOT NULL,
    date_loaded TIMESTAMP WITH TIME ZONE,
    po_document CLOB
      CONSTRAINT ensure_json CHECK (po_document IS JSON));

INSERT INTO j_purchaseorder
  VALUES (SYS_GUID(),
          SYSTIMESTAMP,
          '{"PONumber"             : 1600,
            "Reference"            : "ABULL-20140421",
            "Requestor"            : "Alexis Bull",
            "User"                 : "ABULL",
            "CostCenter"           : "A50",
            "ShippingInstructions" : {...}
            "Special Instructions" : null,
            "AllowPartialShipment" : true,
            "LineItems"            : [...]}');
```

以下查询提取 for JSON 列中的对象：`PONumber``po_document`

```
CopySELECT po.po_document.PONumber FROM j_purchaseorder po;
```

注意：Oracle [*Database JSON 开发人员指南，*](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-D7BCE045-EF6D-47E9-9BB2-30C01933248E)更全面地了解 Oracle 数据库中的 JSON 支持





##### LOB 概述

大型对象 （LOB） 数据类型使您能够以二进制或字符格式存储和操作大型非结构化数据块。

[**大型对象 （LOB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-59E4E37C-186B-490C-87C2-36AD5541091E) 数据类型提供对数据的高效、随机、分段访问。





###### 内部 LOB

内部 LOB 将数据存储在数据库本身而不是外部文件中。

内部 LOB 包括以下内容：

- `CLOB`（字符 LOB），在数据库字符集中存储大量文本，如文本或 XML 文件
- `NCLOB`（国家字符集 LOB），用于存储 Unicode 数据
- `BLOB`（二进制 LOB），将大量二进制信息存储为位流，不受字符集转换的影响

数据库存储 LOB 的方式与其他数据类型不同。创建 LOB 列会隐式创建 LOB 段和 LOB 索引。包含始终存储在一起的 LOB 段和 LOB 索引的表空间可能与包含表的表空间不同。

注意：有时，数据库可以将少量 LOB 数据存储在表本身中，而不是存储在单独的 LOB 段中。

LOB 段将数据存储在称为*块*的片段中。区块是一组逻辑上连续的数据块，是 LOB 的最小分配单位。表中的一行存储一个名为 *LOB 定位器的*指针，该指针指向 LOB 索引。查询表时，数据库使用 LOB 索引快速查找 LOB 区块。

数据库管理 LOB 段的读取一致性的方式与其他数据不同。数据库不使用撤消数据来记录更改，而是将之前的图像存储在段本身中。当事务更改 LOB 时，数据库会分配一个新区块并将旧数据保留在原位。如果事务回滚，则数据库将回滚对索引所做的更改，索引指向旧块。

另请参阅：

- "[用户细分创建](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/logical-storage-structures.html#GUID-733C09AF-70D1-4D53-A34A-5521115A596E)"
- "[读取一致性和撤消段](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html#GUID-8DC0D1D1-C2B1-4237-9B77-27889B6467C1)"





###### 外部 LOB

（二进制文件大对象或 LOB）是外部大对象。`BFILE`

A 是外部 LOB，因为数据库在操作系统中存储指向文件的指针。外部数据是只读的。`BFILE`

A 使用目录对象来查找数据。占用的空间量取决于目录对象名称的长度和文件名的长度。`BFILE`

A 不使用与内部 LOBS 相同的读取一致性机制，因为二进制文件位于数据库外部。如果文件中的数据发生更改，则从同一二进制文件中重复读取可能会产生不同的结果。`BFILE`





###### 安全文件

安全文件 LOB 存储是两种存储类型之一;另一种类型是基本文件 LOB 存储。

LOB 参数启用高级功能，包括压缩和重复数据删除（高级压缩选项的一部分）和加密（高级安全选项的一部分）。从 Oracle Database 12c 开始，SecureFiles 是 LOB 的默认存储机制。`SECUREFILE`

另请参阅：

- "[Oracle数据类型](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/tables-and-table-clusters.html#GUID-A8F3420D-093C-449F-87E4-6C3DDFA8BCFF)"
- [《Oracle 数据库安全文件和大型对象开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADLOB4444)》，了解有关 LOB 数据类型的更多信息





##### Oracle概述

Oracle **文本（Text）**是一种与Oracle数据库集成的全文检索技术。Oracle 文本索引存储在文件系统、数据库或 Web 上的任何文档或文本内容。可以根据其文本内容、元数据或属性搜索这些文档。

Oracle 文本具有以下优点：

- Oracle 文本允许在单个 SQL 语句中将文本搜索与常规数据库搜索相结合。文本索引位于数据库中，文本查询在 Oracle 数据库进程中运行。[**优化程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)可以为任何查询选择最佳[**执行计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)，从而为涉及文本和结构化条件的即席查询提供最佳性能。
- 您可以将 Oracle Text 与 XML 数据一起使用。特别是，您可以结合使用 Oracle 文本索引，同时利用 XML 和全文索引。`XMLIndex`
- Oracle 文本 SQL API 使创建和维护 Oracle 文本索引和运行搜索变得简单直观。

对于用例，假设您必须为销售电子设备的拍卖网站创建目录索引。每天都会添加新的广告资源。项目描述、投标日期和价格必须存储在一起。应用程序需要良好的混合查询响应时间。首先，创建并填充表。然后，使用 Oracle 文本创建一个索引，您可以使用语句中的运算符查询该索引。`catalog``CTXCAT``CATSEARCH``SELECT ... WHERE CATSEARCH`

[图 19-4](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-developers.html#GUID-9DC67BF2-1624-4F2D-A839-AEC6D334F72F__CHDBFDIB) 说明了目录表、其索引以及使用运算符查询索引的目录应用程序之间的关系。`CTXCAT``CATSEARCH`

图 19-4 目录查询应用程序

![Description of Figure 19-4 follows](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img/ccapp017.gif)
[“图 19-4 目录查询应用程序”的说明](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/img_text/ccapp017.html)

另请参阅：

- Oracle 文本[应用程序开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=CCAPP9001)和 [Oracle 文本参考](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=GUID-4775F5FE-4569-4DF4-A7CA-B20EC6880CAB)
- [Oracle XML DB 开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=ADXDB1000)，了解如何对 XML 数据执行全文搜索





##### Oracle 空间和图形概述

Oracle 空间和图形（空间和图形）包括用于空间数据和分析以及物理、逻辑、网络以及社交和语义图形应用的高级功能。

空间要素提供schema和函数，便于在 Oracle 数据库中存储、检索、更新和查询空间要素集合。空间数据的一个示例是路线图。空间数据指示地图上对象的地球位置（例如经度和纬度）。渲染地图时，此空间数据可以将对象的位置投影到二维纸上。地理信息系统 （GIS） 可以存储、检索和呈现此地球相对空间数据。当 Oracle 数据库存储此空间数据时，可以使用空间和图形来操作和检索此数据，并将此数据与其他数据相关联。

另请参阅：

[Oracle 空间和图形开发人员指南](https://docs.oracle.com/pls/topic/lookup?ctx=en/database/oracle/oracle-database/19/cncpt&id=SPATL010)

## 词汇表



### 访问驱动程序

在外部表基础结构中，解释数据库的外部数据的 API。访问驱动程序在数据库内运行，数据库使用驱动程序读取外部表中的数据。



### 访问路径

从数据库中检索数据的方法。例如，使用索引的查询和使用[**全表扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BF9B54D6-892E-4C3B-8536-38958ACC069D)的查询使用不同的访问路径。



### 酸性

所有 Oracle 数据库事务都必须遵守的数据库[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)的基本属性。ACID 是原子性、一致性、隔离性和持久性的首字母缩写。



### 活动联机重做日志文件

联机重做日志文件，可能包含数据库实例恢复所需的数据。



### 活动会话

正在使用 CPU 且未等待空闲等待类中的事件的数据库[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)。



### 活动会话历史记录 （ASH）

数据库自我管理框架的一部分，每秒对活动数据库会话进行采样，将数据写入内存和持久存储。



### 活跃交易

已启动但尚未提交或回滚的[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)。



### 自适应查询优化

一组功能，使自适应优化器能够对执行计划进行运行时调整，并发现可导致更好的[**优化器统计信息**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6ED81319-C187-4496-B914-287ECA165AA0)的其他信息。当现有统计信息不足以生成最佳计划时，自适应优化非常有用。



### 阿德姆

自动数据库诊断监视器。一种 Oracle 数据库基础设施，使数据库能够诊断其自身的性能并确定如何解决已识别的问题。



### 美国存托凭证

自动诊断存储库。基于文件的分层数据存储，用于管理信息，包括网络跟踪和日志记录。



### 美国存托凭证基数

ADR 根目录。ADR 基可以包含多个 ADR 主目录，其中每个 ADR 主目录是 Oracle 产品或组件实例的所有诊断数据（跟踪、转储、警报日志等）的根目录。



### 美国存托凭证主页

Oracle 产品或组件实例的所有诊断数据（跟踪、转储、警报日志等）的根目录。例如，在具有共享存储和 Oracle ASM 的 Oracle RAC 环境中，每个数据库实例和每个 Oracle ASM 实例都有自己的 ADR 主目录。



### 高级索引压缩

对堆组织表上支持的唯一和非唯一索引的[**前缀压缩**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EDE0399E-E9CD-4FF3-97C5-1DB08D7A27AE)的扩展和增强。与对每个块使用固定重复键消除的前缀压缩不同，高级压缩在每个块的基础上使用自适应重复键消除。



### 高级行压缩

一种表压缩类型，适用于 OLTP 应用程序，用于压缩由任何 SQL 操作操作的数据。

另请参阅[**基本表压缩**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BD5DBF88-965C-4B6D-BF79-8126B54937C4)。



### 聚合函数

诸如此类的函数，对一组行进行操作以返回单个行作为结果。`COUNT`



### 警报日志

提供按时间顺序排列的数据库消息和错误的日志的文件。警报日志存储在 [**ADR**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCD0CFFB-557E-4043-8D82-0D4E4F972B25) 中。



### 分析功能

对一组行进行操作以返回多行作为结果的函数。



### 分析查询

回答业务问题的“假设”查询。通常，分析查询涉及联接和聚合，并且需要扫描非常大量的输入数据以生成相对较少的输出。



### 分析视图

一种封装事实数据的聚合、计算和联接的视图类型。分析视图使用维度模型组织数据。它们允许您轻松地向数据集添加聚合和计算，并在可以使用相对简单的 SQL 查询的视图中呈现数据。



### 反联接

一个[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)，它从[**谓词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-891CF9E9-78CD-470C-9C4A-D65A101B2C38)的左侧返回行，而谓词的右侧没有相应的行。



### 应用

在应用程序根目录中，应用程序是由普通用户创建的一组命名的、受版本控制的数据和元数据。应用程序可能包括应用程序通用用户、应用程序公共对象或前面的多个对象和组合。



### 应用程序体系结构

数据库应用程序连接到 Oracle 数据库的计算环境。两种最常见的数据库体系结构是客户端/服务器和多层。



### 应用程序容器

插入到应用程序根目录的应用程序 PDB 的命名集。应用程序容器可能包含应用程序种子。



### 应用程序上下文

指定命名空间中的属性名称/值对。应用程序在对数据库执行操作之前设置各种上下文。



### 应用程序连续性

一种功能，允许在出现使数据库会话不可用的可恢复错误后，以无中断和快速的方式重播针对数据库的请求。



### 应用程序域索引

特定于应用程序的自定义[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)。



### 应用程序 PDB

插入到[**应用程序容器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F939B8E5-8DCE-4831-9B81-224C1D6DC1AA)中的 [**PDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6932E25-775E-4FF1-BB08-F8999629093C)。



### 应用程序根目录

应用程序容器中的根容器。每个应用程序[**容器只有一个应用程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F939B8E5-8DCE-4831-9B81-224C1D6DC1AA)根。应用程序根与 [**CDB 根**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C63428A-905A-4918-95AA-F3BBA3D2B825)共享一些特征，因为它可以包含公共对象，并与 [**PDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6932E25-775E-4FF1-BB08-F8999629093C) 共享某些特征，因为它是使用该语句创建的。`CREATE PLUGGABLE DATABASE`



### 应用服务器

在客户端和一个或多个数据库服务器之间提供接口并承载应用程序的软件。



### 存档压缩

用 指定的混合列式压缩。此类型使用比 更高的压缩比，对于压缩将长期存储的数据非常有用。`COLUMN STORE COMPRESS FOR ARCHIVE``COLUMN STORE COMPRESS FOR QUERY`



### 存档的重做日志文件

已由 Oracle 数据库存档的[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)的成员。存档的重做日志文件可以应用于媒体恢复中的数据库备份。



### 存档日志模式

一种数据库模式，用于存档[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)。



### 归档程序进程 （ARCn）

存档联机重做日志文件的后台进程。



### 归档

生成存档重做日志文件的操作。



### 升序索引

按升序存储数据的[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)。默认情况下，字符数据按值的每个字节中包含的二进制值、数字数据从最小到最大数字以及日期从最早值到最新值排序。



### 属性簇表

一个堆组织的表，它根据用户指定的聚类分析指令将数据存储在磁盘上。



### 审计跟踪

存储审核记录的位置。



### 自动数据库诊断监视器 （ADDM）

请参阅[**添加。**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-46E714E7-BFA6-496D-8CB0-FDAB01E3577F)



### 自动诊断存储库 （ADR）

请参阅[**美国存托凭证**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCD0CFFB-557E-4043-8D82-0D4E4F972B25)。



### 自动内存管理

Oracle 数据库完全自动管理 SGA 和实例 PGA 内存的模式。



### 自动分段空间管理 （ASSM）

一种存储空间管理方法，它使用位图来管理段空间而不是空闲列表。



### 自动撤消管理模式

数据库的一种模式，在该模式下，它自动管理专用撤消表空间中的[**撤消空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78A7FBF2-2EB5-4BD6-AECC-D61A5AEF1158)。

另请参阅[**手动撤消管理模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D30B79E4-A641-4521-98C2-6F500A553736)。



### 自动工作负载存储库 （AWR）

请参阅[**AWR**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8D591F0E-6B03-4E0B-9AE0-A4DA0A8F0B51)。



### 自主交易

可以从另一个事务调用的独立事务，称为主[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)。



### AWR

自动工作负载存储库 （AWR）。每个 Oracle 数据库中的内置存储库。Oracle 数据库会定期对其重要统计信息和工作负载信息进行快照，并将其存储在 AWR 中。



### AWR 基线

通常在系统在峰值负载下运行良好的时间段内采用的统计速率集合



### AWR 快照

AWR 在特定时间捕获的一组性能统计信息。



### B树索引

像倒挂的树一样组织的[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)。B树索引有两种类型的块：用于搜索的分支块和存储值的叶块。叶块包含每个索引数据值和用于查找实际行的相应 rowid。“B”代表“平衡”，因为所有叶块自动保持相同的深度。



### 后台进程

一个[**过程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE16A399-01B9-4229-B013-AA9119B3D193)，它合并了原本由为每个[**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)运行的多个 Oracle 程序处理的功能。后台进程异步执行 I/O 并监视其他 Oracle 进程。

另请参阅[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC);[**Oracle流程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DD083580-0AAF-4728-9186-BE1E319020DD)。



### 备份

数据的副本。备份可以包括数据库的关键部分，例如数据文件、服务器参数文件和控制文件。



### 备份件

备份集的最小单位。



### 备份集

一种专有的 RMAN 备份格式，包含来自一个或多个数据文件、存档重做日志文件或控制文件或服务器参数文件的数据。



### 基本表压缩

一种用于大容量加载操作的表压缩类型。必须使用直接路径操作、操作或联机表重定义来实现基本表压缩。`INSERT``ALTER TABLE . . . MOVE`



### 大表缓存

[**数据库缓冲区高速缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)的可选集成部分，它使用基于温度的对象级替换算法，而不是传统的基于 LRU 的块级替换算法。



### 大文件表空间

包含一个非常大的数据文件或临时文件的表空间。



### 绑定变量

SQL 语句中的一个占位符，必须将其替换为有效的值或值地址，语句才能成功执行。通过使用绑定变量，可以编写在运行时接受输入或参数的 SQL 语句。以下示例显示用作绑定变量的查询：`v_empid`

```
复制
从员工中选择 *，其中 employee_id = ：v_empid;
```



### 位图索引

一种数据库索引，其中数据库存储每个[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)键的位图，而不是 rowid 列表。



### 位图联接索引

两个或多个表的连接位图[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)。



### 位图合并

合并从位图索引扫描中检索到的[**位图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-20C91FE3-E7A0-44AC-8AC1-9C4301877B65)的操作。例如，如果 和 列具有位图索引，则当[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)[**谓词**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-891CF9E9-78CD-470C-9C4A-D65A101B2C38)为 时，数据库可以使用位图合并。`gender``DOB``WHERE gender='F' AND DOB > 1966`



### 阻止损坏

不是公认的 Oracle 格式或其内容内部不一致[**的数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)。



### 区块头

数据块的一部分，包括有关块类型、[**块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)地址以及[**有时交易**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)信息的信息。



### 块开销

数据块中的空间，用于存储管理[**块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)所需的元数据。开销包括[**块头**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78394D5D-A1F6-4978-8F13-028185F514B5)、表目录和行目录。



### 分支块

在 B 树索引中，数据库用于搜索的块。叶块存储索引条目。B 树索引的上层分支块包含指向较低级索引块的索引数据。



### 缓冲区

[**数据库缓冲区高速缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)中的主内存地址。缓冲区缓存从磁盘读取的当前和最近使用的数据块。当需要新块时，数据库可以用新数据块替换旧[**数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)。



### 缓冲区缓存命中率

数据库在缓冲区缓存中找到请求的块而不需要从磁盘读取它的频率的度量。



### 缓冲区标头

存储有关[**缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F789350A-9B90-4361-9BEF-68DECB15E755)的元数据的内存结构。



### 缓冲池

SGA 中的缓冲区集合。



### 商业智能

分析组织的信息，以帮助做出业务决策。



### 字节语义

将字符串视为字节序列。字符串和字符串长度的偏移量以字节表示。



### 缓存恢复

[**实例恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)的自动阶段，其中 Oracle 数据库将[**联机重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)中的所有已提交和未提交更改应用于受影响的数据块。



### 基数

非重复值与表行数的比率。百万行表中只有两个不同值的列的基数较低。



### 笛卡尔连接

一种连接，其中一个或多个表与语句中的任何其他表没有任何[**连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)条件。[**优化程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)将一个数据源中的每一行与另一个数据源中的每一行联接在一起，从而创建两个集合的笛卡尔积。



### 国开行

至少包含一个 [**PDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6932E25-775E-4FF1-BB08-F8999629093C) 的 Oracle 数据库安装。PDB 在 Oracle Net 客户端看来是传统的 Oracle 数据库。每个 Oracle 数据库要么是 CDB，要么是[**非 CDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B2710CAA-8F00-40B3-97AB-4521D2147EE8)。



### 国开行管理员

管理 CDB 的数据库管理员。[**PDB 管理员**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6E44D9F6-9FE1-4FEA-998A-51ACA5775AF5)管理 CDB 内的各个 PDB。



### 国开行车队

可作为一个逻辑 CDB 进行管理的不同 CDB 的集合。



### 国开行还原点

在 CDB 中，这指的是在连接到根目录时以及未指定 For 可插拔数据库子句时创建的还原点。与 PDB 还原点不同，CDB 还原点可供所有 PDB 使用。



### 国开行根

在[**多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 中，所有 PDB 所属的schema、schema对象和非schema对象的集合。每个 CDB 只有一个根[**容器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7C93E38B-7E45-4693-9B11-C9AB38A2E7D3)，用于存储管理 PDB 所需的系统元数据。所有 PDB 都属于 CDB 根目录。



### 字符编码

将给定曲目中的每个字符与代码单元配对以方便数据存储的代码。



### 字符语义

将字符串视为字符序列。字符串的偏移量和字符串长度以字符（字符代码）表示。



### 字符集

用于在计算机屏幕上显示字符的编码方案。



### 检查约束

对一列或一组列的约束，要求指定条件对每一行都为 true 或未知。



### 检查站

\1. 标记检查点位置的数据结构，检查点位置是必须开始[**实例恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)的重做线程中的 SCN。检查点记录在控制文件和每个数据[**文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)头中，是恢复的关键元素。

\2. [**将数据库缓冲区缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)中的脏数据块写入磁盘。[**数据库编写器 （DBW）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C27AAA54-E60B-49BC-AB04-7B3848EBAFD6) 进程将块写入磁盘，以将缓冲区缓存与数据文件同步。



### 检查点流程

使用检查点信息更新控制文件和数据文件头并发出信号以将块写入磁盘的后台进程。



### 子游标

包含其文本存储在父游标中的语句的计划、编译环境和其他信息的游标。父游标是数字，第一个子游标是数字，依此类推。子游标引用的 SQL 文本与父游标完全相同，但不同。例如，带有文本的两个语句在引用不同schema中命名的表时使用不同的游标。`0``1``SELECT * FROM mytable``mytable`



### 循环重用记录

一种控制文件记录，其中包含非关键信息，如果需要，这些信息可以覆盖。当所有可用的记录槽都已满时，数据库将展开控制文件以便为新记录腾出空间，或者覆盖最旧的记录。



### 客户

在[**客户端/服务器体系结构**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F0D8417-F8ED-4D91-BB81-1F86499ADD69)中，与用户交互的前端数据库应用程序。客户端部分没有数据访问责任。



### 客户端字符集

客户端应用程序输入或显示的数据的字符集。客户端和数据库的字符集可以不同。



### 客户端进程

执行应用程序或 Oracle 工具代码[**的进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE16A399-01B9-4229-B013-AA9119B3D193)。当用户运行客户端应用程序（如 SQL*Plus）时，操作系统会创建客户端进程来运行应用程序。

另请参阅[**Oracle流程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DD083580-0AAF-4728-9186-BE1E319020DD)。



### 客户端/服务器体系结构

基于两个CPU之间的处理分离的软件体系结构，一个充当事务中的[**客户端**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F642154F-091E-4D5A-9562-401324055F1F)，请求和接收服务，另一个充当在事务中提供服务的服务器。



### 集群文件系统

分布式文件系统，它是一组服务器，它们协作以为其客户端提供一致性和高性能。



### 集群索引

群集键上的 [**B 树索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8D6D0C64-6AC8-4B22-A9AF-1B62F61AE10B)。



### 群集密钥

在表[**集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)中，聚集表共有的一个或多个列。例如，和 表共享列。在创建表集群和创建添加到表集群的每个表时指定集群键。`employees``departments``department_id`



### 冷缓冲液

数据库缓冲区高速缓存中最近未使用的缓冲区。



### 列

表中表示数据域的[**垂直**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DA8F7E11-B6AF-4ED3-B2A9-B5741E9AE2D4)间距。表定义包括表名和列集。每列都有一个名称和数据类型。



### 列式格式

驻留在内存中列存储中的对象的基于列的格式。列格式与数据库用于在数据库缓冲区高速缓存和数据文件中存储对象的行格式形成对比。



### 犯

结束数据库事务并使[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)中执行的所有更改永久化的操作。



### 提交清理

提交后自动从区块中删除与锁相关的[**交易**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)信息（ITL条目）。仅当包含已提交交易数据的已修改区块仍在[**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4)中，并且没有其他会话正在修改这些区块时，数据库才会删除ITL条目。



### 共同角色

[**存在于多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 的所有容器中的角色。



### 完全刷新

定义实例化视图的查询的执行。最初创建实例化视图时，将进行完全刷新，除非实例化视图引用预构建的表，或者您将该表定义为 。`BUILD DEFERRED`



### 复合数据库操作

单个数据库会话中两个时间点之间的活动。



### 综合指数

表中多列的索引。



### 复合分区

一种分区策略，其中表由一种数据分发方法分区，然后使用第二种数据分发方法将每个分区进一步划分为子分区。



### 复合唯一键

具有唯一键约束的一组两列或更多列。



### 复合触发器

可以在多个定时点触发的触发器。例如，复合触发器可能会在触发语句之前和之后触发。



### 压缩单元

在混合列式压缩中，这指的是存储一组行的逻辑构造。将数据加载到表中时，数据库以列格式存储行组，并将每列的值存储在一起并压缩在一起。数据库压缩一组行的列数据后，数据库会将数据放入压缩单元中。



### 级联索引

请参阅[**复合索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-72B92AE9-C3AA-4D8E-967F-9D50847387FE)。



### 条件

返回值 、 或 的 SQL 语句中的一个或多个表达式和逻辑运算符的组合。例如，条件的计算结果始终为 。`TRUE``FALSE``UNKNOWN``1=1``TRUE`



### 写入冲突

在已提交读取事务中，这指的是当事务尝试更改由未提交的并发事务更新的行时发生的情况。



### 连接

[**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)和 Oracle [**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)之间的通信路径。

另请参阅[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)。



### 连接池

一种资源利用率和用户可伸缩性功能，可通过有限数量的协议连接到共享[**服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)来最大化会话数。



### 一致备份

可以使用该选项打开的[**整个数据库备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E76C2836-8ACD-40DC-836D-6EE259606CC8)，而无需执行媒体恢复。就其性质而言，整个数据库的一致备份不需要使重做的应用保持一致。`RESETLOGS`

另请参阅[**不一致的备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AE098906-D0EA-4E45-B6E6-C5794E460114)。



### 一致读取获取

检索数据库缓冲区缓存中与特定 SCN（[**读取一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A2D92FBD-9C36-432E-A44F-0462DB2E5527)的一部分）一致的块版本。如果数据库需要一个块来满足查询，并且数据库缓冲区缓存中没有块与正确的 SCN 一致，则数据库会尝试从撤消数据中获取块的正确版本。



### 容器

在[**多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 中，为根数据库或 PDB。



### 上下文

一组应用程序定义的属性，用于验证和保护应用程序。SQL 语句为上下文创建命名空间。`CREATE CONTEXT`



### 控制文件

一个二进制文件，它记录数据库的物理结构，并包含[**重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F24A4593-5E47-4D06-B9D6-0061D288373C)的名称和位置、数据库创建的时间戳、当前日志序列号、[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)信息等。



### 立方体

具有相同维度和其他共享特征的度量值的组织。多维数据集的边缘包含[**维度**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-350D7C67-87F9-410C-A2AD-C2C5F3BB2339)成员，而多维数据集的主体包含数据值。



### 电流模式获取

检索缓冲区缓存中当前存在的数据块版本，而不使用[**读取一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A2D92FBD-9C36-432E-A44F-0462DB2E5527)。在当前模式下，一次只有一个版本的块存在。



### 当前联机重做日志文件

日志编写器 （LGWR） 进程正在主动写入的联机重做日志文件。



### 光标

[**PGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19927E75-4983-4D59-A03D-C630E9908897) 中[**专用 SQL 区域的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B296BAF-BAC8-4DE7-8128-464F4BA3C366)句柄或名称。由于游标与专用 SQL 区域密切相关，因此这些术语有时可以互换使用。



### 数据块

Oracle 数据库中数据存储的最小逻辑单元。数据块的其他名称包括 Oracle 块或页面。一个数据块对应于磁盘上特定字节数的物理空间。

另请参阅[**范围**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C56D833A-B3D3-4B85-AAB4-334F7CF3F5E9);[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。



### 数据并发

许多用户同时访问相同的数据。多用户数据库管理系统必须提供足够的并发控制，以便数据不能不正确地更新或更改，从而损害[**数据完整性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9DE527B3-8901-4F4C-A18F-D2C2C307AFE1)。

另请参阅[**数据一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B016467E-5663-4AC8-B54D-181CA1B8198E)。



### 数据一致性

多用户数据库中每个用户的一致数据视图。

另请参阅[**数据并发**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D7E696DB-944C-4798-B70D-5C2381FE971F)。



### 数据损坏

当硬件、软件或网络组件导致读取或写入损坏的数据时发生的错误。



### 数据字典

数据库表和视图的只读集合，其中包含有关数据库、其结构及其用户的引用信息。



### 数据字典缓存

[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中保存[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)信息的内存区域。数据字典缓存也称为行缓存，因为它将数据保存为*行*而不是缓冲区，后者保存整个数据块。



### 数据字典 （DDL） 锁

一种锁，用于在正在进行的 DDL 操作作用于或引用schema对象时保护该对象的定义。Oracle 数据库代表任何需要它的 DDL 事务自动获取 DDL 锁。用户无法显式请求 DDL 锁。



### 数据字典视图

[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)中表或其他视图的预定义视图。数据字典视图以前缀 、 或 开头。`DBA_``ALL_``USER_`



### 数据文件

磁盘上的物理文件，由 Oracle 数据库创建，包含数据库的数据。数据文件可以位于操作系统文件系统或 [**Oracle ASM 磁盘组中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-85D5EEA3-5127-4F08-AC1C-A2C660F21D92)。



### 数据完整性

规定可接受数据标准的业务规则。这些规则通过使用完整性约束和触发器应用于数据库，以防止无效数据输入。



### 数据链路

在 [**PDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6932E25-775E-4FF1-BB08-F8999629093C) 中，指向根中的数据（而不是元数据）的内部机制。例如，AWR 数据驻留在根目录中。每个 PDB 使用对象链接指向根中的 AWR 数据，从而使视图（如 和）在每个单独的容器中可访问。`DBA_HIST_ACTIVE_SESS_HISTORY``DBA_HIST_BASELINE`



### 数据库整合

将数据从一个或多个非 CDB 移动到[**多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 的一般过程。



### 数据挖掘

自动搜索大量数据存储，以查找超越简单分析的模式和趋势。



### 数据恢复顾问

一种 Oracle 数据库基础设施，可自动诊断持续性数据故障，向用户提供修复选项，并根据用户请求执行修复。



### 数据细分受众群

包含非聚集表、表分区或[**表集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)数据的[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。

另请参阅[**范围**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C56D833A-B3D3-4B85-AAB4-334F7CF3F5E9)。



### 数据类型

在 SQL 中，这指的是与[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F1D9AA5F-C66A-4D5F-A84C-8D7360DE3BE5)值或常量关联的一组固定属性。示例包括 和 。Oracle 数据库以不同的方式处理不同数据类型的值。`VARCHAR2``NUMBER`



### 数据仓库

专为[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)和分析而不是 [**OLTP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-709E943F-FF0E-4AA6-979A-C4CB2A7B0C29) 而设计的关系型数据库。



### 数据库访问控制

限制数据访问和数据库活动。例如，限制用户查询指定的表或执行指定的数据库语句。



### 数据库应用程序

与数据库交互以访问和操作数据的软件程序。



### 数据库身份验证

用户向数据库提供凭据的过程，该过程验证凭据并允许访问数据库。



### 数据库块大小

创建数据库集时的数据块大小。大小是为 和 表空间设置的，并且是所有其他表空间的默认值。除非通过重新创建数据库，否则无法更改数据库块大小。`SYSTEM``SYSAUX`



### 数据库缓冲区高速缓存

[**系统全局区域 （SGA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78C0E867-233A-4857-B9FE-A3852A9B7BDF) 中保存数据块副本的部分。并发连接到[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的所有客户端进程共享对缓冲区缓存的访问。



### 数据库字符集

一种字符编码方案，用于确定数据库中可以表示哪些语言。



### 数据库整合

将数据从一个或多个非 CDB 移动到[**多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 的一般过程。



### 数据库驱动程序

位于应用程序和 Oracle 数据库之间的软件。驱动程序将应用程序进行的 API 调用转换为数据库可以处理的命令。通过使用 ODBC 驱动程序，应用程序可以访问任何数据源，包括存储在电子表格中的数据。ODBC 驱动程序执行 ODBC 标准和数据库之间的所有映射。



### 数据库实例

[**系统全局区域 （SGA）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78C0E867-233A-4857-B9FE-A3852A9B7BDF) 和后台进程的组合。一个实例与一个且仅与一个数据库相关联。每个数据库实例要么是[**读/写**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5C6F9AB8-385E-409E-A7EB-60FD4CAF893C)数据库实例，要么是[**只读数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2BC0C5BC-491A-4DAD-849A-04C8F8E4AC3A)。在 Oracle 实际应用集群配置中，多个实例访问单个数据库。



### 数据库链接

一个数据库中的[**schema对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)，使用户能够访问另一个数据库中的对象。



### 数据库管理系统

控制数据存储、组织和检索的软件。



### 数据库对象

数据库中可以使用 SQL 操作的对象。schema对象（如表和索引）驻留在schema中。非schema对象（如目录和角色）不驻留在schema中。



### 数据库操作

在数据库监视的上下文中，这指的是包含 SQL 语句、PL/SQL 块或两者的组合的逻辑实体。



### 数据库时间点恢复

一种导致数据库非当前版本的媒体恢复。在这种情况下，您不会应用还原备份后生成的所有重做。



### 数据库安全

涉及用户身份验证、加密、访问控制和监视的数据库管理方面。



### 数据库服务器

在多用户环境中可靠地管理大量数据的服务器，以便用户可以同时访问相同的数据。数据库服务器还可以防止未经授权的访问，并为故障恢复提供有效的解决方案。



### 数据库服务器网格

连接在一起以在一个或多个数据库上运行的商用服务器的集合。



### 数据库服务

一个或多个数据库实例的命名表示形式。Oracle 数据库的服务名称通常是其全局数据库名称。客户端使用服务名称连接到一个或多个数据库实例。



### 数据库存储网格

低成本模块化存储阵列的集合，组合在一起并由[**数据库服务器网格**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8291F0BB-F3FA-47BF-9F9D-FD956A9190CA)中的计算机访问。



### 数据库用户

可通过其登录到 Oracle 数据库的帐户。



### 数据库编写器 （DBW）

将[**数据库缓冲区缓存中的缓冲区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)写入数据文件的[**后台进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8EFE210D-EE23-42A9-B4F0-7EF79C9315EE)。



### DDL

数据定义语言。包括定义或更改数据结构的语句，例如 或。`CREATE TABLE``ALTER INDEX`



### 僵局

两个或多个用户正在等待彼此锁定的数据的情况。这种死锁在Oracle数据库中很少见。



### 声明性语言

一种非过程语言，描述了应该做什么，现在如何做。SQL和Prolog是声明式语言的例子。SQL是声明性的，因为用户指定他们想要的结果，而不是如何派生它。



### 专用服务器

服务器进程处理单个[**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)的请求的数据库配置。

另请参阅[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)。



### 可递延约束

一种约束，它允许语句在发出语句之前延迟约束检查。通过可延迟约束，您可以在进行可能违反约束的更改时暂时禁用约束。`SET CONSTRAINT``COMMIT`



### 延迟插入

在指定为 的表中插入带有提示的内容。延迟插入无法回滚，并且不使用数据库缓冲区高速缓存的一致性机制。后台进程将延迟插入异步写入数据文件。`MEMOPTIMIZE_WRITE``MEMOPTIMIZE FOR WRITE`



### 定义者的权利 PL/SQL 程序

以所有者（而不是当前用户）的权限执行的过程。



### 并行度

与单个操作关联的并行执行服务器数。并行执行旨在有效地使用多个 CPU。Oracle 数据库并行执行框架使您能够显式选择特定的并行度，也可以依靠 Oracle 数据库自动控制它。



### 依赖对象

在schema对象依赖项中，这指的是其定义引用另一个对象的对象。例如，如果对象 A 的定义引用对象 B，则 A 是 B 上的依赖对象。



### 降序指数

一种索引，其中数据按降序存储在指定的一个或多个列上。



### 尺寸

对数据进行分类以使用户能够回答业务问题的结构。常用的维度是客户、产品和时间。



### 维度表

一个关系表，用于存储星型或雪花schema中[**维度**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-350D7C67-87F9-410C-A2AD-C2C5F3BB2339)的全部或部分值。维度表通常包含维度键、级别和属性的列。



### 直接路径插入

数据库将数据直接写入数据文件，绕过[**数据库缓冲区缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7913177D-8183-4CC5-8F59-816FE66DA363)。数据库将插入的数据追加到表中的现有数据中。`INSERT`



### 直接路径读取

绕过 SGA 的单块或多块读取 PGA。



### 目录对象

一个数据库对象，它指定服务器文件系统上外部二进制文件 LOB （BFILE） 和[**外部表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1B18B978-29DD-4961-BD39-86838CB5F7D0)数据所在的目录的别名。所有目录对象都在单个命名空间中创建，不归单个schema所有。



### 脏读

当一个事务读取另一个事务写入的未提交数据时发生的情况。Oracle 数据库*绝不*允许脏读。



### 调度

请参阅[**调度程序进程 （Dnnn）。**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-44794465-800D-48D2-ACB5-851066E3AF91)



### 调度程序进程 （D*nnn*)

仅当使用共享服务器配置时，才存在可选的后台进程。每个调度程序进程负责将请求从连接的客户端进程路由到可用的[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)进程并返回响应。



### 分布式数据库

分布式系统中的一组数据库，可以作为单个数据源对应用程序显示。



### 分布式环境

相互无缝通信的不同系统网络。



### 分布式处理

应用程序在网络中的不同计算机之间分配其任务时发生的操作。



### 分布式事务

包含单独或作为组更新[**分布式数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DB7296DF-74E0-45E1-9BC2-5052DD543214)节点上数据的语句的事务。Oracle 数据库使用两阶段提交机制确保分布式事务中数据的完整性。



### 二甲醚

数据操作语言。包括 、、 和 等语句。`SELECT``INSERT``UPDATE``DELETE`



### DML 锁

一种锁，可防止同时发生冲突的 DML 或 DDL 操作的破坏性干扰。DML 语句自动获取行锁和表锁。



### 动态性能视图

在数据库打开和使用时不断更新的特殊视图。动态性能视图有时称为 *V$ 视图*。



### 动态 SQL

其完整文本在运行时之前未知的 SQL。动态 SQL 语句存储在运行时输入到程序中或由程序生成的字符串中。



### 版

可在其中重新定义数据库对象的专用环境。基于版本的重定义使您能够在使用应用程序时升级应用程序的数据库对象，从而最大限度地减少或消除停机时间。



### 加密

使用密钥和加密算法将数据转换为不可读格式的过程。



### Equijoin.

具有包含相等运算符的连接条件的连接。



### 电子离

提取、转换和加载 （ETL）。从源系统提取数据并将其引入[**数据仓库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0881E18F-D245-4980-8272-64964B64E3CC)的过程。



### 独占锁

阻止共享关联资源的锁。在释放锁之前，获取资源独占锁的第一个事务是唯一可以更改资源的事务。



### 可执行的 SQL 语句

生成对数据库实例的调用的 SQL 语句，包括 DML 和 DDL 语句以及该语句。`SET TRANSACTION`



### 执行计划

数据库用于执行 SQL 语句的步骤组合。每个步骤要么从数据库中物理检索数据行，要么为发出语句的用户准备数据行。您可以使用[**提示**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B2534A3C-7E63-45E3-A61F-3746124B7CCA)覆盖执行计划。



### 表达

一个或多个值、运算符和解析为值的 SQL 函数的组合。例如，表达式的计算结果为 。通常，表达式采用其组件的数据类型。`2*2``4`



### 程度

分配用于存储特定类型信息的多个连续数据块。[**线段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)由一个或多个盘区组成。

另请参阅[**数据块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)。



### 外部表

一个只读表，其元数据存储在数据库中，但其数据存储在数据库外部的文件中。数据库使用描述外部表的元数据来公开其数据，就好像它们是关系表一样。



### 提取、转换和加载 （ETL）

请参阅[**ETL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1145ABBB-D2C9-4321-B5E4-6435053062F0)。



### 事实

表示业务度量的数据，例如销售或成本数据。



### 事实数据表

包含事实数据的数据[**仓库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0881E18F-D245-4980-8272-64964B64E3CC)的星型schema中的表。事实数据表通常有两种类型的列：包含事实的列和[维度表的](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-350D7C67-87F9-410C-A2AD-C2C5F3BB2339)外键。



### 快速全索引扫描

[**一种完整索引扫描**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C5A8562E-0675-4FC3-BCCF-7429D69248C5)，其中数据库使用多块读取读取索引中的所有块，然后丢弃分支块，不按特定顺序返回索引块。



### 快速恢复区

存储与恢复相关的文件（如控制文件和联机重做日志副本、存档的[**重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)、闪回日志和 RMAN 备份）的可选磁盘位置。



### 容错

高可用性体系结构针对体系结构中的组件故障提供的保护。



### 田

在表中，行和列的交集。



### 文件系统

在连续磁盘地址空间内构建的数据结构。



### 细粒度审计

一种数据库审核类型，使您能够审核特定的表列，并在策略创建期间关联事件处理程序。



### 固定 SGA

包含各种信息的内部内务管理区域，包括有关数据库和实例状态的一般信息，以及进程之间通信的信息。



### 闪回数据存档流程 （FBDA）

将跟踪表的历史行存档到闪回数据存档的后台进程。当跟踪表上包含 DML 的事务提交时，此过程会将已更改行的前映像存储到闪回数据存档中。它还将元数据保留在当前行上。



### 强制完整数据库缓存模式

通过执行语句手动启用的缓存模式。与默认缓存模式不同，Oracle 数据库缓存整个数据库，即使用该属性指定的 LOB。`ALTER DATABASE ... FORCE FULL DATABASE CACHING``NOCACHE`



### 外键

一种[**完整性约束**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-67F8FE8C-EBA5-4796-820A-8919982A1411)，要求一列或一组列中的每个值都与相关表的唯一[**键或主键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)中的值匹配。外键的完整性约束定义在引用的数据被更改时指示数据库行为的操作。



### 外键约束

Oracle 数据库强制实施包含一个或多个公共列的两个表之间的关系的约束。约束要求对于定义约束的列中的每个值，其他指定的其他表和列中的值必须匹配。例如，[**参照完整性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-830D7D6F-0992-49EA-B586-1DCD0A1CDA68)规则可能规定员工只能为现有部门工作。



### 格式化模型

描述字符串中日期时间格式的字符文本。



### 免费列表

称为可用列表的链表，用于在[**手动区段空间管理 （MSSM） 中管理**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9993E2FF-445C-4A06-8008-DBDC9F84800C)区段中的可用空间。对于具有可用空间的数据库对象，空闲列表会跟踪高水位标记下的块，高水位标记是已使用和尚未使用的段空间之间的分界线。使用块时，数据库会根据需要将块放在可用列表上或从空闲列表中删除块。



### 全索引扫描

一种[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)扫描，其中数据库仅读取根和左侧分支块以查找第一个叶块，然后使用单个块 I/O 按索引排序顺序读取叶块。



### 完全外部联接

两个表之间的联接，返回内联接的结果以及[**左外联接**和](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5B6697AD-111B-4293-91EF-1BAB303534E8)[**右外联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6D63E1DD-4066-416C-AF21-DC6A6AF58750)的结果。



### 全表扫描

对表数据的扫描，其中数据库按顺序读取表中的所有行，并筛选出不符合选择条件的行。数据库扫描[**高水位线 （HWM）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F3F5ACB2-94C8-483F-B427-1981836D0609) 下的所有格式化数据块。



### 功能

一个schema对象，类似于 [**PL/SQL 过程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2210901-18F2-43C0-B0CC-6953E94CD7EF)，始终返回单个值。



### 基于函数的索引

一种索引，用于计算涉及一个或多个列的函数或表达式的值并将其存储在索引中。



### 万国数据

查看[**全球数据服务 （GDS）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1E28461D-197F-4A18-ADD3-65652596846E)



### 万国数据目录

元数据存储库，位于 Oracle 数据库中，与 [**GDS 配置**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4A10F40F-5FE8-471C-B9E5-CE3C65D3CB12)相关联。每个云都有一个且只有一个目录。



### 万国数据配置

由 GDS 框架集成到单个虚拟服务器中的一组数据库，提供一个或多个全局服务，同时确保高性能、可用性和资源的最佳利用。

另请参阅[**全球服务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-ACE64A77-31A7-490B-B58E-391B4647F24D)。



### 万国数据池

[**GDS 配置**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4A10F40F-5FE8-471C-B9E5-CE3C65D3CB12)中的一组数据库，提供一组唯一的全局服务，属于特定的管理域。



### 万国数据区域

[**GDS 配置**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4A10F40F-5FE8-471C-B9E5-CE3C65D3CB12)中的逻辑边界，其中包含地理位置接近的数据库客户机和服务器。



### 全球数据服务

用于复制数据库的自动化工作负载管理解决方案。数据库服务是一个或多个数据库实例的命名表示形式。GDS 在一组复制的数据库中实现 Oracle 数据库服务模型。



### 全局数据库名称

数据库名称 （） 和网络域 （） 的组合，例如 。全局数据库域在网络中是唯一的。`DB_NAME``DB_DOMAIN``orcl.example.com`



### 全局分区索引

独立于索引表上使用的分区方案进行分区的 B 树索引。单个索引分区可以指向任何或所有表分区。



### 全球服务

通过数据复制同步的多个数据库提供的[**数据库服务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0D13CE85-B751-40CA-A51B-79C8976A199F)。



### 全球服务经理

全球数据服务框架中的中央管理工具。[**GDS 配置**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4A10F40F-5FE8-471C-B9E5-CE3C65D3CB12)的每个 [**GDS 区域中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54772959-26E7-4235-A71C-50981D18E6FC)必须至少存在一个全局服务管理器。



### 全局临时表

一种特殊的临时表，用于在特定持续时间内存储中间会话专用数据。



### 颗粒

并行性的基本工作单元。Oracle 数据库将并行执行的操作（例如，表扫描、表更新或索引创建）划分为粒度。并行执行进程一次执行一个颗粒的操作。



### 网格计算

一种计算体系结构，它协调大量服务器和存储以充当单个大型计算机。



### 电网基础设施

为企业网格体系结构提供基础结构的软件。在集群中，该软件包括Oracle Clusterware和[**Oracle ASM**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-998902D4-E565-468F-8D80-0F5151310F5A)。对于独立服务器，此软件包括Oracle ASM。Oracle 数据库将这些产品组合到一个称为**网格主页**的软件安装中。



### 硬解析

数据库为生成应用程序代码的新可执行版本而执行的步骤。如果[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中不存在已提交语句的已分析表示形式，则数据库必须执行硬解析而不是[**软解析**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A9D78636-6F7B-472B-8AC6-4B07C775DE00)。



### 哈希集群

一种类似于索引集群的[**表集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)类型，但索引键替换为哈希函数。不存在单独的群集索引。在哈希群集中，数据是索引。



### 哈希冲突

将多个输入值哈希为相同的输出值。



### 哈希函数

对任意长度的输入值进行操作并返回固定长度哈希值的[**函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5611828A-3621-4527-AEB1-12017A454E94)。



### 哈希索引

内存[**优化池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BE14DEE8-A53C-4B30-96FE-41079CF056C8)中的内部结构，按主键索引内存区域。



### 哈希联接

一种[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)，其中数据库使用两个表或数据源中较小的一个在内存中生成[**哈希表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1EBD10A8-7E0A-45B9-94CB-0859F4773082)。数据库扫描较大的表，探测哈希表中匹配行的地址。



### 哈希键值

在哈希群集中，插入到群集键列中的实际值或可能值。例如，如果群集键为 ，则哈希键值可以是 10、20、30 等。`department_id`



### 哈希分区

一种分区策略，它根据数据库应用于用户指定的分区键的哈希算法将行映射到分区。行的目标由数据库应用于该行的内部哈希函数确定。哈希算法旨在跨设备均匀分布行，以便每个分区包含大约相同数量的行。



### 哈希表

一种内存中数据结构，用于将联接键与[**哈希联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2587A67-E1CB-4F35-8830-4599717C47BC)中的行相关联。例如，在 [和 表的连接](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)中，连接键可能是部门 ID。哈希[**函数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DDDDC4BC-ADB8-40D7-9733-60CED8E4A83E)使用[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)键生成哈希值。此哈希值是数组中的索引，即哈希表。`employees``departments`



### 哈希值

在哈希集群中，标识存储桶的唯一数字 ID。Oracle 数据库使用哈希函数，该函数接受无限数量的哈希键值作为输入，并将它们排序到有限数量的存储桶中。每个哈希值映射到存储与哈希键值对应的行的块的数据库块地址（部门 10、20、30 等）。



### 散列法

一种数学技术，其中无限的输入值集映射到一组有限的输出值，称为哈希值。哈希对于在哈希表中快速查找数据非常有用。



### 堆组织的表

数据行不按特定顺序存储在磁盘上的表。缺省情况下， 会创建一个按堆组织的表。`CREATE TABLE`



### 分层数据库

以树结构组织数据的数据库。每个父记录都有一个或多个子记录，类似于文件系统的结构。



### 高水位线

[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)中已使用空间和未使用空间之间的边界。



### 提示

通过 SQL 语句中的注释传递给[**优化程序**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-54114749-0A81-41D7-8E16-7B76D93CEE2B)的指令。优化程序使用提示为语句选择[**执行计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)。



### 热缓冲液

数据库缓冲区高速缓存中经常访问且最近使用的缓冲区。



### 人为错误中断

提交导致数据库中的数据在逻辑上损坏或不可用的无意或恶意操作时发生的中断。



### 混合柱式压缩

一种混合方法，它使用行和列技术来压缩数据块中的数据。称为压缩单元的逻辑构造用于存储一组混合列压缩行。



### 混合分区表

一个表，其中某些分区存储在数据文件段中，某些分区存储在外部数据源中。



### 图像复制

数据文件、控制文件或存档的重做日志文件的逐位磁盘副本。您可以使用操作系统实用程序或 RMAN 创建物理文件的映像副本，并使用任一工具还原它们。



### 隐式查询

[**DML**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5F2F112-1B33-41B5-B63D-9DC8F99A369D) 语句的一个组件，用于检索不带[**子查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C1CDE912-86C4-4495-8959-0CF8196189B2)的数据。未显式包含语句的 、 或语句使用隐式查询来检索要修改的行。`UPDATE``DELETE``MERGE``SELECT`



### IM 列存储

一个可选的 SGA 区域，以针对快速扫描优化的列格式存储表和分区的副本。



### 内存中列存储

请参阅 [**IM 列存储**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BB43F8DB-0885-40BF-A99D-068C997F1C6C)。



### 非活动联机重做日志文件

实例恢复不需要的联机重做日志文件。



### 备份不一致

备份中的某些文件包含在[**检查点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-95DBDA37-4C57-444F-B660-D52B4A99D919)之后所做的更改的备份。与一致备份不同，不一致的[**备份**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9758D2DA-4550-4F4F-8965-12A8AE13FFCD)要求[**媒体恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-938A3E7D-CC65-496C-9DB3-3CFC45AFA8DD)保持一致。



### 增量刷新

仅处理[**对实例化视图中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CE465DAF-5DC8-46A8-BE51-2D0DDEB6ADFB)现有数据的更改的刷新。此方法消除了[**完全刷新**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B6619E0B-2A6D-494F-BED0-8CC5BA25B16A)的需要。



### 永久增量备份战略

将初始级别 0 备份执行到[**恢复一体机**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AFBC216B-28EA-40F5-9AD5-B5FB7B278F22)的策略，所有后续增量备份都在级别 1 进行。恢复一体机通过将初始级别 0 与后续级别 1 备份相结合来创建虚拟完整备份。



### 指数

与非聚集表、表[**分区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19BC4E2E-B549-4A99-8FE5-3FCA24BD52D4)或[**表集群**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)关联的可选schema对象。在某些情况下，索引可以加快数据访问速度。



### 索引块

一种特殊类型的数据块，其管理空间的方式与表块不同。



### 索引集群

使用索引查找数据的表集群。集群索引是集群键上的 B 树索引。



### 索引聚类因子

相对于索引值（如姓氏）的行顺序度量。此值在行存储中的顺序越多，聚类因子就越低。



### 索引范围扫描

对具有以下特征的索引进行有序扫描：

- 索引的一个或多个前导列在条件中指定。[**条件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B5AA8627-E7DC-487B-8D4B-2DE3F1497A83)指定一个或多个表达式和逻辑（布尔）运算符的组合，并返回值 、 或 。`TRUE``FALSE``UNKNOWN`
- 索引键可以有 0、1 或更多值。



### 索引扫描

通过使用语句指定的索引列值遍历索引来检索行。



### 索引段

存储未分区索引或索引[**分区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19BC4E2E-B549-4A99-8FE5-3FCA24BD52D4)数据的[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。



### 索引跳过扫描

使用复合索引的逻辑子索引的索引扫描。数据库“跳过”单个索引，就像搜索单独的索引一样。



### 索引唯一扫描

必须具有与索引键关联的 0 或 1 行 id 的索引扫描。当谓词使用相等运算符引用索引键中的所有列时，数据库将执行唯一扫描。`UNIQUE`



### 按索引组织的表

其存储组织是主 B 树[**索引**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3CDC5A7E-10A5-4F63-9ED3-49A74D001CA5)的变体的表。与[**堆组织的表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-861D8FCE-B86C-46B3-AA01-35066D24F4CF)不同，数据按[**主键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)顺序存储。



### 疑点分布式事务

一种分布式事务，其中两阶段提交被任何类型的系统或网络故障中断。



### 机上交易

在中断中断客户端应用程序和数据库之间的连接时运行的事务。



### 信息系统

用于存储和处理信息的正式系统。



### 初始化参数

影响[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)操作的配置参数，例如 或。初始化参数的设置存储在基于文本的[**初始化**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB20DD0-D924-465A-9FDF-0A13A990340C)参数文件或二进制[**服务器参数文件中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D068D7A7-ECF5-49F2-A055-B6F668E96D0C)。`DB_NAME``SGA_TARGET`



### 初始化参数文件

包含[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的[**初始化参数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB20DD0-D924-465A-9FDF-0A13A990340C)设置的文本文件。



### 内联接

两个或多个表的连接，仅返回满足连接条件的行。



### 实例故障

由于硬件故障、Oracle 内部错误或语句而导致[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的终止。`SHUTDOWN ABORT`



### 实例 PGA

数据库实例中单个 PGA 的集合。



### 实例恢复

当[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)在发生故障后重新启动时，自动将重做日志记录应用于未提交的数据块。



### 而不是触发器

由 Oracle 数据库触发而不是执行触发语句的[**触发器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8BA32C58-ACF3-4B6B-941F-586DE399D22A)。这些触发器可用于透明地修改无法直接通过 DML 语句修改的视图。



### 正直

请参阅[**数据完整性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9DE527B3-8901-4F4C-A18F-D2C2C307AFE1)。



### 完整性约束

为[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F1D9AA5F-C66A-4D5F-A84C-8D7360DE3BE5)定义规则的声明性方法。完整性约束强制实施业务规则并防止将无效信息输入表中。



### 感兴趣的交易清单

块头中的信息，用于确定数据库开始修改块时事务是否未提交。国际交易日志中的条目描述了哪些交易的行被锁定，哪些行包含已提交和未提交的更改。



### 间隔分区

范围分区的扩展，指示数据库创建指定范围或间隔的分区。当插入到表中的数据超过所有现有范围分区时，数据库会自动创建分区。



### 隐形索引

由 DML 操作维护但默认情况下不由优化程序使用的索引。使索引不可见是使其不可用或删除索引的替代方法。



### 调用者的权限 PL/SQL 过程

使用当前用户的权限在当前用户的schema中执行的过程。



### 爪哇池

在 Java 虚拟机 （JVM） 中存储所有特定于会话的 Java 代码和数据的内存区域。



### Java Publisher （JPublisher）

生成 Java 类以表示 Java 客户机程序中的数据库实体（如 SQL 对象和 PL/SQL 包）的实用程序。



### Java 存储过程

发布到 SQL 并存储在数据库中的 Java 方法。



### JavaScript 对象

由零对或多对属性名称和关联的 [**JavaScript 对象表示法 （JSON）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-84C9D2CB-ED43-4BFB-AA8E-A60205477885) 值组成的关联数组。



### JavaScript Object Notation （JSON）

一种独立于语言、基于文本的数据格式，可以表示对象、数组和标量数据。



### 作业队列进程

运行用户作业（通常以批处理模式）的可选后台进程。作业是计划运行一次或多次的用户定义任务。



### 加入

从子句中指定的多个表中检索数据的语句。连接类型包括内连接、外连接和笛卡尔连接。`FROM`



### 连接属性聚类

在[**属性聚类表中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE2182EF-D02C-45D6-B435-2EBAC4C14301)，基于联接列的聚类分析。



### 连接条件

一种条件，用于比较[**联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71A4D429-D0A6-4979-AACA-EDE5F4BCFC8B)中的两列，每列来自不同的表。数据库组合了行对，每行包含每个表中的一行，其连接条件的计算结果为 。`TRUE`



### 联接视图

其定义在子句中包含多个表或视图的视图。`FROM`



### JSON 对象

一个 JavaScript 对象文本，写为括在大括号中的属性。

另请参阅 [**JavaScript Object Notation （JSON）。**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-84C9D2CB-ED43-4BFB-AA8E-A60205477885)



### JVM

运行已编译的 Java 代码的虚拟处理器。



### .key

定义某些类型的完整性约束中包含的列或列集。



### 按键压缩

请参阅[**前缀压缩**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EDE0399E-E9CD-4FF3-97C5-1DB08D7A27AE)。



### 按键压缩

[**前缀压缩**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EDE0399E-E9CD-4FF3-97C5-1DB08D7A27AE)的替代名称。



### 关键值

键中的单个值。



### 键保留表

联接查询中的表，其中每行在查询输出中最多出现一次。



### 大型对象 （LOB）

请参阅 [**LOB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A85748CE-C4D4-43ED-BD49-29AFC4AD3A02)。



### 大型游泳池

[**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 中的可选区域，为共享服务器和 [**Oracle XA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4805B3F4-1858-473B-A802-3496C73CE818) 的备份和还原操作、I/O 服务器进程以及[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)内存提供大量内存分配。



### 门闩

一种低级序列化控制机制，用于保护 [**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 中的共享数据结构不被同时访问。



### 闩锁睡眠

进程在续订闩锁请求之前释放 CPU 时发生的现象。



### 闩锁旋转

当进程在循环中重复请求闩锁时发生的现象。



### 叶块

在 B 树索引中，存储索引条目的较低级别的块。B 树索引的上层分支块包含指向较低级索引块的索引数据。



### 左外连接

表 A 和 B 的左外连接的结果包含左侧表 *A* 的所有记录，即使连接条件与右侧表 *B* 中的记录不匹配也是如此。例如，如果执行 （左） 到 （右） 的左外联接，并且某些员工不在部门中，则查询将返回 中没有匹配项的行。`employees``departments``employees``departments`



### 库缓存

[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中的内存区域。此缓存包括共享 SQL 区域、专用 SQL 区域（在[**共享服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E94CE0E3-CC86-4F46-B8EF-54945F026326)配置中）、[**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA) 过程和包以及控制结构（如锁和库缓存句柄）。



### 列表分区

一种[**分区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3709F53A-185F-420B-B9F6-C5B0382CA731)策略，它使用离散值列表作为每个分区的分区键。可以使用列表分区来控制各个行映射到特定分区的方式。通过使用列表，您可以在用于标识相关数据集的键未方便地排序时对相关数据集进行分组和组织。



### 听者

侦听传入的客户端连接请求并管理到数据库的网络流量的进程。



### 侦听器注册流程

向 Oracle 网络侦听器注册有关数据库实例和调度程序进程的信息的过程。



### 字面

固定数据值。



### LOB

大对象。大型对象包括以下 SQL 数据类型：、、 和 。这些数据类型设计用于存储较大的数据。`BLOB``CLOB``NCLOB``BFILE`



### 本地分区索引

在与其表相同的列上分区的索引，具有相同的分区数和相同的分区边界。索引分区和表分区之间存在一对一奇偶校验。



### 本地角色

在 CDB 中，仅存在于单个 PDB 中的角色，就像非 CDB 中的角色仅存在于非 CDB 中一样。与通用角色不同，本地角色可能仅包含在[**角色**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E3EB68E5-49CA-4AC5-B7DD-DDA430ABA261)所在的容器中应用的角色和特权。



### 本地临时表空间

驻留在本地存储上并由特定数据库实例访问的[**临时表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D49FAC9A-79CC-436C-9656-4A1C94A50A2D)。相反，共享[**共享临时表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-66347815-8AB8-4E23-9B86-F3748CB46AA6)驻留在共享存储上，可供所有数据库实例访问。



### 现场

在全球化支持的上下文中，系统或程序正在运行的语言和文化环境。



### 本地管理的表空间

使用存储在每个数据文件中的位图来管理扩展数据的[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA66891C-71B2-4D55-8F64-0E427AE24E88)。相反，字典管理的表空间使用[**数据字典**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6A3934F-BA6D-464F-9612-C683E20514A4)来管理空间。



### 锁

一种数据库机制，可防止访问共享资源（如表、行或系统对象）的事务之间的破坏互，用户不可见。锁的主要类别是 DML 锁、DDL 锁以及闩锁和内部锁。



### 锁转换

将限制性较低的表锁自动转换为限制性较高的表锁。例如，假设事务为员工发出 a，稍后更新锁定的行。在这种情况下，数据库会自动将行共享表锁转换为行独占表锁。`SELECT ... FOR UPDATE`



### 锁定升级

在某些数据库中，当多个锁保持在一个粒度级别（例如，行）并且数据库将锁提升到更高的粒度级别（例如，表）时，会出现这种情况。*Oracle 数据库从不升级锁。*



### 日志序列号

唯一标识重做日志文件中一组[**重做**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F24A4593-5E47-4D06-B9D6-0061D288373C)记录的数字。当数据库填充一个[**联机重做**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)日志文件并切换到另一个日志文件时，数据库会自动为新文件分配一个日志序列号。



### 日志开关

[**日志编写器进程 （LGWR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E96BC851-0B78-4250-8EAB-26EBDF4FE5A6) 停止写入活动重做日志文件并切换到下一个可用重做日志文件的点。当活动的重做日志文件被重做记录填充或手动启动切换时，LGWR 会切换。



### 日志编写器进程 （LGWR）

负责[**重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F24A4593-5E47-4D06-B9D6-0061D288373C)缓冲区管理的[**后台进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8EFE210D-EE23-42A9-B4F0-7EF79C9315EE) - 将重做日志缓冲区写入[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)。LGWR 写入自上次写入以来复制到缓冲区中的所有重做条目。



### 逻辑 I/O

读取和写入数据库缓冲区缓存中的缓冲区。



### 逻辑读取

读取数据库缓冲区高速缓存中的缓冲区。



### 逻辑行

按索引组织的表的 rowid。逻辑 rowid 是表主键的 base64 编码表示形式。



### 逻辑事务标识

从应用程序角度定义事务的全局唯一标识符。逻辑事务 ID 绑定到数据库[**事务 ID**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-71C31D71-F2E8-4FB9-9010-062C1C407CEF)。



### 逻辑卷

虚拟磁盘分区。



### 逻辑卷管理器 （LVM）

大多数操作系统都提供的一种软件包，它使多个物理磁盘的各个部分能够组合成一个连续的地址空间，该地址空间在更高层的软件中显示为一个磁盘。



### 查找表

包含代码列和关联值列的表。例如，作业代码对应于作业名称。与一对[**主从表中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8601BE8C-F9BB-4748-9DEB-DA7CCF8C5138)的主表相比，查找表不是获取详细结果集（如员工列表）的方法。相反，用户查询表（如员工列表），然后将结果集联接到查找表。`employees`



### 丢失更新

[**一种数据完整性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9DE527B3-8901-4F4C-A18F-D2C2C307AFE1)问题，其中一个数据编写器覆盖另一个写入器修改相同数据的更改。



### 丢失写入

当数据库认为它已将块写入持久存储，但块未写入或已写入块的先前版本时发生的数据损坏。



### 可管理性监视进程 （MMON）

执行与自动工作负载存储库 （AWR） 相关的许多任务的后台进程。例如，当指标违反其阈值时，MMON 会写入、拍摄快照并捕获最近修改的 SQL 对象的统计信息值。



### 尾数

浮点数中包含其有效数字的部分。



### 手动分段空间管理 （MSSM）

一种传统的空间管理方法，它使用称为可用列表的链表来管理段中的可用空间。



### 手动撤消管理模式

一种数据库模式，其中撤消块存储在用户管理的撤消段中。在[**自动撤消管理模式下**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-31B8DD86-BD6D-446D-A35D-B5BF3654DF9E)，撤消块存储在系统管理的专用撤消表空间中。



### 主数据库

[**在复制**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A011519D-7113-462D-B9A5-9BAC31E50B8D)中，复制到订阅服务器数据库的数据源。master 数据库上的复制代理从 master 数据库的事务日志中读取记录。它将对复制元素的更改转发到订阅服务器上的复制代理。然后，订阅服务器数据库上的复制代理将应用更新。



### 主站点

在[**复制**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A011519D-7113-462D-B9A5-9BAC31E50B8D)环境中，[**实例化视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CE465DAF-5DC8-46A8-BE51-2D0DDEB6ADFB)与之共享数据的不同数据库。



### 主表

在[**复制**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A011519D-7113-462D-B9A5-9BAC31E50B8D)环境中，这指的是与[**主站点**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AC6F5FAF-9FB8-4616-A18B-542B18697170)上的[**实例化视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CE465DAF-5DC8-46A8-BE51-2D0DDEB6ADFB)关联的表。



### 主-从表

明细表与主表具有[**外键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EEE8A67D-6B0E-468E-9554-48FEE552BC9A)关系。例如，明细表具有主表的外键。与[**查阅表格**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E6748CDC-732A-4FCD-94B2-F98A06F5D7A0)不同，通常查询主表，然后将其联接到明细表。例如，用户可以查询表中的某个部门，然后使用此结果查找该部门中的员工。`employees``departments``departments`



### 物化视图

存储查询结果的schema对象。查询的子句可以命名表、视图和其他实例化视图。`FROM`

另请参阅[**视图**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1274BCF5-2EC1-4752-B9CE-998A85A83307)。



### 媒体恢复

对数据[**块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)或备份[**数据文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C93C8397-3433-4A72-B9CE-040FE01A7EE8)进行重做或增量备份的应用。



### 内存优化池

一个 SGA 池，用于存储指定为 的堆组织表的缓冲区和相关结构。`MEMOPTIMIZE FOR READ`



### 度量

累积统计量的变化率



### 装入的数据库

已启动并打开数据库[**控制文件的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)。



### 多租户容器数据库 （CDB）

见[**国开行**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-135FF536-DE9B-40CF-9F42-C246762BD77F)。



### 多线程Oracle数据库模型

使 Oracle 进程能够在单独的地址空间中作为操作系统线程执行的模型。在线程模式下，UNIX 和 Linux 上的一些后台进程作为包含一个线程的进程运行，而其余的 Oracle 进程作为进程内的线程运行。



### 多层体系结构

一种体系结构，其中一个或多个应用程序服务器为客户端提供数据，并充当客户端和数据库服务器之间的接口。



### 多版本一致性模型

一种模型，使数据库能够向多个并发用户呈现数据视图，每个视图与一个时间点一致。



### 多版本控制

数据库同时具体化多个数据版本的能力。



### 互斥对象（互斥锁）

一种低级机制，可防止内存中的对象在并发进程访问时老化或损坏。



### 自然钥匙

由表中的现有属性组成的有意义的标识符。例如，自然键可以是查找表中的邮政编码。



### 网络数据库

一种数据库类型，类似于分层数据库，其中记录具有多对多关系，而不是一对多关系。



### 网络加密

在客户端和服务器之间通过网络传输数据时对其进行加密。



### 非国开行

不是[**多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 的 Oracle 数据库。在Oracle Database 12c之前，所有数据库都是非CDB。从 Oracle 数据库 12c 开始，每个数据库都必须是 CDB 或非 CDB。



### 非循环复用记录

包含不经常更改且无法覆盖的关键信息的控制文件记录。信息的示例包括表空间、数据文件、联机重做日志文件和重做线程。Oracle 数据库从不重用这些记录，除非从表空间中删除相应的对象。



### 不可延期约束

其有效性检查永远不会延迟到事务结束的约束。相反，数据库会在每条语句的末尾检查约束。如果违反了约束，则语句将回滚。



### 零

[**行**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-14228D8A-2E66-49A7-B041-DFB6CA759D8C)的[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F1D9AA5F-C66A-4D5F-A84C-8D7360DE3BE5)中缺少值。空值表示缺失、未知或不适用的数据。



### 对象表

一种特殊的表，其中每行表示一个对象。



### 对象类型

抽象化实际实体（如采购订单）的[**schema对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)。属性对实体的结构进行建模，而方法实现应用程序可以对实体执行的操作。



### 对象视图

虚拟对象表。视图中的每一行都是一个对象，它是用户定义数据类型的实例。



### 对象关系型数据库管理系统 （ORDBMS）

实现面向对象功能（如用户定义类型、继承和多态性）的 RDBMS。



### 奥拉普

在线分析处理。OLAP 的特点是对历史数据进行动态、维度分析。



### OLAP 页面池

UGA 中管理 OLAP 数据页的池，等效于数据块。页面池在 OLAP 会话开始时分配，并在会话结束时释放。



### 高龄

在线交易处理。OLTP 系统针对快速可靠的事务处理进行了优化。与[**数据仓库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0881E18F-D245-4980-8272-64964B64E3CC)系统相比，大多数 OLTP 交互涉及的行数相对较少，但涉及的表组较大。



### 在线重做日志

记录对 Oracle 数据库数据文件和控制[**文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)所做的所有更改的两个或多个联机[**重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F24A4593-5E47-4D06-B9D6-0061D288373C)的集合。对数据库进行更改时，Oracle 数据库会在重做缓冲区中生成重做记录。[**日志编写器进程 （LGWR）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E96BC851-0B78-4250-8EAB-26EBDF4FE5A6) 进程将重做日志缓冲区的内容写入联机[**重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-BADF3CFF-08C6-42E8-A05E-DEB83502572A)。



### 在线重做日志组

联机重做日志文件及其冗余副本。



### 操作系统块

操作系统可以读取或写入的最小数据单位。



### 算子

\1. 在内存管理中，操作员控制数据流。示例包括排序、[**哈希联接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D2587A67-E1CB-4F35-8830-4599717C47BC)和[**位图合并**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-85F90309-D2DA-455C-A726-81C33043566E)运算符。

\2. 在 SQL 中，运算符操作称为*操作数*或*参数*的数据项并返回结果。关键字或特殊字符表示运算符。例如，星号 （） 表示乘法运算符。`*`



### 优化

内置数据库软件，通过考虑与引用的对象和语句中指定的条件相关的因素来确定执行 SQL 语句的最有效方法。



### 优化器统计信息

有关优化程序用于为每个 SQL 语句选择最佳执行计划的数据库对象的详细信息。类别包括表统计信息（如行数）、索引统计信息（如 B 树级别）、系统统计信息（如 CPU 和 I/O 性能）和列统计信息（如空值数）。



### Oracle应用快递

适用于 Oracle 数据库的 Web 应用程序开发工具。Oracle 应用快速解决方案使用用户界面主题、导航控件、表单处理程序和灵活报告等内置功能来加速应用开发。



### Oracleschema

Oracle 数据库用于管理数据库的内存和[**进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE16A399-01B9-4229-B013-AA9119B3D193)结构。



### Oracle ASM

Oracle Automatic Storage Management （Oracle ASM）。用于数据库文件的卷管理器和文件系统。Oracle ASM 是 Oracle 推荐的存储管理解决方案，它提供了传统卷管理器和文件系统的替代方案。



### Oracle ASM 分配单元

ASM 磁盘组中的基本分配单位。分配单元是 Oracle ASM 分配的最小连续磁盘空间。一个或多个分配单元构成一个 Oracle ASM 扩展数据块。



### Oracle ASM 磁盘

置备到 Oracle ASM 磁盘组的存储设备。Oracle ASM 磁盘可以是物理磁盘或分区、存储阵列中的逻辑单元号 （LUN）、逻辑卷或网络连接文件。



### Oracle ASM 磁盘组

作为逻辑单元管理的一个或多个 [**Oracle ASM**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-998902D4-E565-468F-8D80-0F5151310F5A) 磁盘。磁盘组的 I/O 会自动分布到组中的所有磁盘上。



### Oracle ASM 范围

Oracle ASM 文件的一部分。Oracle ASM 文件由一个或多个文件扩展数据块组成。每个 Oracle ASM 扩展数据块由特定磁盘上的一个或多个分配单元组成。



### Oracle ASM 文件

存储在 Oracle ASM 磁盘组中的文件。数据库可以将数据文件、控制文件、联机重做日志文件和其他类型的文件存储为 Oracle ASM 文件。



### Oracle ASM 实例

管理Oracle ASM磁盘的特殊Oracle实例。Oracle ASM 实例和数据库实例都需要对 Oracle ASM 磁盘组中的磁盘进行共享访问。Oracle ASM 实例管理磁盘组的元数据，并向数据库实例提供文件布局信息。



### Oracle Automatic Storage Management （Oracle ASM）

请参阅[**Oracle ASM**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-998902D4-E565-468F-8D80-0F5151310F5A)。



### Oracle基地

Oracle 基目录是 Oracle 数据库安装所有者的数据库主目录。由环境变量指定的目录是 Oracle 目录树的根目录。`ORACLE_BASE`



### Oracle基本配置目录

包含特定于实例的配置文件的目录。

对于读写 Oracle 主页，Oracle 基本主页 （）、Oracle 基本配置目录 （） 和 [**Oracle 主页**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5375FC57-08EA-48EB-B5CF-6A41423E94D3)是相同的。对于只读的 Oracle 主目录，Oracle 基本配置目录包含[**由 Oracle 基本主页中的所有 Oracle**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EF78DA71-8FC0-4E6D-B554-CCA1D036D59F) 主目录共享的配置文件。为了防止命名冲突，每个文件名都包含 SID（系统标识符）。`ORACLE_BASE_HOME``ORACLE_BASE_CONFIG`



### Oracle基地主页

存储与 [**Oracle 主**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5375FC57-08EA-48EB-B5CF-6A41423E94D3)目录关联的数据库实例的配置文件的目录。

对于读写 Oracle 主页，Oracle 基本主页 （）、Oracle 基本配置目录 （） 和 Oracle 主页是相同的。对于只读的 Oracle 主目录，Oracle 基本主页是位于 [**Oracle 基础**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-7FA5621D-C5DA-4E34-B6B7-C06CBC5314C8)的子目录中的特定于主目录的目录。`ORACLE_BASE_HOME``ORACLE_BASE_CONFIG``homes/home_name`



### Oracle集群件

一组组件，使服务器能够像一台服务器一样一起运行。Oracle Clusterware是使用Oracle RAC的要求，它是[**Oracle RAC**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-010EAA7B-5E4D-4F1A-9723-96A4BC80B725)运行平台所需的唯一集群件。



### Oracle连接管理器

一种路由器，通过该路由器可以将客户端连接请求发送到其下一跃点或直接发送到数据库服务器。



### Oracle数据修订

Oracle 高级安全系统的一项功能，可用于屏蔽（编辑）低权限用户或应用程序查询的数据。



### Oracle数据库

位于磁盘上的一组文件，用于存储数据。由于数据库[**实例和数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)紧密相连，因此术语 Oracle 数据库通常用于指代实例和*数据库*。



### Oracle数据库保管库

一种数据库安全功能，用于控制访问数据库、数据和应用程序的时间、位置和方式。



### Oracle Developer Tools for Visual Studio .NET

一组与 Visual Studio .NET 环境集成的应用程序工具。这些工具提供对 Oracle 功能的 GUI 访问，使用户能够执行各种应用程序开发任务，并提高开发效率和易用性。



### Oracle企业管理器

一种系统管理工具，提供对 Oracle 数据库环境的集中管理。



### Oracle闪回技术

一组功能，支持查看过去的数据状态，以及及时来回缠绕数据，而无需还原备份。



### Oracle Flex Clusters

使用 Oracle Clusterware 和 Oracle Real Application Clusters 配置的大型集群。这些群集包含以中心辐射型体系结构排列的两种类型的节点：中心节点和叶节点。



### Oracle 全球化开发工具包 （GDK）

一个开发工具包，包括适用于 Java 和 PL/SQL 的综合编程 API、代码示例和文档，用于解决创建全局应用程序时遇到的许多设计、开发和部署问题。



### Oracle主页

Oracle 数据库安装的操作系统位置。Oracle 主目录可以是读/写或只读的。



### Oracle JDeveloper

一个集成开发环境 （IDE），用于使用 Java、XML、Web 服务和 SQL 的最新行业标准构建面向服务的应用程序。



### Oracle JVM

一个标准的、与 Java 兼容的环境，可以运行任何纯 Java 应用程序。



### Oracle托管文件

一种数据库文件命名策略，使数据库管理员能够根据数据库对象而不是文件名指定操作。Oracle 托管文件使管理员无需直接管理数据库中的操作系统文件。



### Oracle多媒体

一种使 Oracle 数据库能够存储、管理和检索图像、DICOM 格式的医学图像和其他对象、音频、视频或其他异构媒体数据与其他企业信息集成的技术。



### Oracle网

支持客户端应用程序和 Oracle 数据库之间网络会话的通信软件。建立网络会话后，Oracle Net 充当客户端应用程序和数据库的数据传送者。



### Oracle网络侦听器

驻留在服务器上的进程，其职责是侦听传入的客户端连接请求并管理到服务器的流量。当客户端请求与数据库的网络会话时，Oracle 网络侦听器（通常称为*侦听器*）会收到该请求。如果客户机信息与侦听器信息匹配，则侦听器将授予与数据库服务器的连接。



### Oracle网络服务

一套网络组件，可在分布式异构计算环境中提供企业范围的连接解决方案。Oracle Net Services 包括 Oracle Net、listener、Oracle Connection Manager、Oracle Net Configuration Assistant 和 Oracle Net Manager。



### Oracle最佳灵活schema （OFA）

一组配置准则，用于确保 Oracle 安装井井有条。



### Oracle流程

运行 Oracle 数据库代码的执行单元。进程执行体系结构取决于操作系统。Oracle 进程包括服务器进程和后台进程。



### Oracle RAC

Oracle真正的应用集群。允许多个并发数据库实例共享单个物理数据库的选项。



### Oracle真实应用集群

请参阅[**Oracle RAC**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-010EAA7B-5E4D-4F1A-9723-96A4BC80B725)。



### Oracle分片

OLTP 应用程序的一项功能，它支持在无共享体系结构中的 Oracle 数据库池中分发和复制数据。应用程序将池作为称为[**分片数据库 （SDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1D5F394A-E198-4366-B76D-3AD34EBF692F) 的单个逻辑数据库进行访问。



### Oracle空间和图形

一组用于空间数据和分析以及物理、逻辑、网络、社交和语义图应用程序的高级功能。空间要素提供schema和函数，便于在 Oracle 数据库中存储、检索、更新和查询空间要素集合。



### Oracle数据库

用于 SQL 的 ANSI 标准的实现。Oracle SQL 支持许多超出标准 SQL 的功能。



### Oracle（文本）

与 Oracle 数据库集成的全文检索技术。



### Oracle虚拟专用数据库 （VPD）

一种安全功能，使您能够创建安全策略以在行和列级别控制数据库访问。实质上，VPD 将动态子句添加到针对应用 VPD 安全策略的表、视图或同义词发出的 SQL 语句中。`WHERE`



### Oracle XA

允许全局事务由 Oracle 数据库以外的[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)管理器协调的外部接口。



### Oracle数据库

一组与高性能 XML 操作、存储和检索相关的 Oracle 数据库技术。Oracle XML DB 通过以可互操作的方式包含 SQL 和 XML 数据模型来提供本机 XML 支持。



### Oracle XML Developer's Kit （XDK）

一个开发人员工具包，其中包含用于读取、操作、转换和查看 XML 文档的基本构建基块，无论是在文件系统上还是在数据库中。API 和工具可用于 Java、C 和 C++。生产版 Oracle XDK 附带商业再分发许可证。



### 外联接

一种连接，它返回满足连接条件的所有行，并返回一个表中没有其他行满足连接条件的部分或全部行。



### 并行执行

应用多个 CPU 和 I/O 资源来执行单个数据库操作。



### 解析锁

锁由 SQL 语句或 PL/SQL 程序单元为其引用的每个模式对象持有。获取解析锁，以便在更改或删除引用的对象时可以使关联的共享 SQL 区域失效。



### 部分索引

与关联分区表的索引属性关联的索引。



### 分区

与其他分区共享相同逻辑属性的表或索引的一部分。例如，表中的所有分区共享相同的列和约束定义。每个分区都是一个独立的对象，具有自己的名称和可选的存储特征。



### 分区消除

从查询计划中排除分区。优化程序是否可以从考虑范围中消除分区取决于查询谓词。使用本地前缀索引的查询始终允许消除索引分区，而使用本地无前缀索引的查询可能不允许。



### 分区键

一组一个或多个列，用于确定分区表中每一行应位于的分区。每一行都明确地分配给单个分区。



### 分区索引

划分为更小且更易于管理的部分的索引。与分区表一样，分区索引可提高可管理性、可用性、性能和可伸缩性。



### 分区表

具有一个或多个分区的表，每个分区都单独管理，并且可以独立于其他分区运行。



### 分区

将非常大的表和索引分解为更小且更易于管理的部分（称为分区）的能力。



### .PDB

在[**多租户容器数据库 （CDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D4A51B19-8C03-4C98-81CE-15883B87E6E0) 中，这指的是schema、schema对象和非schema对象的可移植集合，在 Oracle Net 客户端看来是传统的 Oracle 数据库 （[**非 CDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B2710CAA-8F00-40B3-97AB-4521D2147EE8)）。



### PDB 管理员

管理一个或多个 PDB 的数据库管理员。国家开发银行管理员管理整个[**国家开发银行**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-24233CA1-CF2F-4E02-B202-83DB0571DDB9)。



### PDB 还原点

在 CDB 中，这指的是仅适用于特定 PDB 的还原点。相反，CDB 还原点可供所有 PDB 使用。



### PDB/非CDB兼容性保证

在多租户体系结构中，保证 PDB 的行为与从与 Oracle Net 连接的客户端看到的非 CDB 相同。



### 性能概况

一个或一组 PDB 的系统资源、CPU、并行执行服务器和内存的指定份额。



### 永久表空间

包含持久schema对象的表空间。每个不是临时表空间的表空间都是永久表空间。



### 职业高尔夫球协会

计划全球区域。包含[**服务器进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E660AC1C-B704-4DC1-A35A-DB49EFB34F4A)的数据和控制信息的内存缓冲区。

另见[**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4)。



### 物理猜测

首次创建索引条目时的物理 rowid。Oracle 数据库可以使用物理猜测直接探测任何索引组织的表的叶块，从而绕过主键搜索。



### PL/SQL

过程语言/SQL。[**对 SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-30430C74-B2C1-43A0-B7FF-64111B786BC5) 的 Oracle 数据库过程语言扩展。PL/SQL 使您能够将 SQL 语句与编程构造（如过程、函数和包）混合使用。



### PL/SQL 匿名块

出现在应用程序中，但未命名或存储在数据库中的 PL/SQL 块。在许多应用程序中，PL/SQL 块可能出现在 SQL 语句可以出现的地方。



### PL/SQL 集合

一组有序的元素，所有元素的类型都相同。每个元素都有一个唯一的下标，用于确定其在集合中的位置。



### PL/SQL 引擎

用于定义、编译和运行 PL/SQL 程序单元的工具。此引擎是许多 Oracle 产品（包括 Oracle 数据库）的特殊组件。



### PL/SQL 函数

一个[**模式对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)，它由一组 SQL 语句和其他 [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA) 构造组成，组合在一起，存储在数据库中，并作为一个单元运行以解决特定问题或执行一组相关任务，并且始终向调用方返回单个值。



### PL/SQL 函数结果缓存

存储函数结果集的[**服务器结果缓存**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-34DB86C1-6E79-489F-B07A-CEF3316FB818)的子集。



### PL/SQL 软件包

相关 PL/SQL 类型、变量和子程序的逻辑分组。



### PL/SQL 程序

由一组 SQL 语句和其他 [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA) 构造组成的[**模式对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)，组合在一起，存储在数据库中，并作为一个单元运行以解决特定问题或执行一组相关任务。



### PL/SQL记录

可以存储不同类型的数据值的复合变量，类似于 C、C++ 或 Java 中的类型。记录对于保存表行中的数据或表行中的特定列非常有用。`struct`



### PL/SQL 子程序

可以使用一组参数调用的命名 PL/SQL 块



### 计划生成器

优化程序的一部分，它为给定查询块尝试不同的访问路径、联接方法和联接顺序，以查找成本最低的计划。



### 可插拔数据库 （PDB）

请参阅[**PDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D6932E25-775E-4FF1-BB08-F8999629093C)。



### 人口

将数据传输到 IM 列存储。总体不会将*新*数据插入数据库;相反，它将*现有*数据引入内存并以列格式存储。



### 编译指示

指示编译器执行编译选项的指令。例如，杂注指示数据库，此过程在执行时将作为独立于其父事务的新自治事务执行。`AUTONOMOUS_TRANSACTION`



### 精度

浮点数中的总位数。您可以以 p *`s`* 的形式指定一个定点数，其中 *`p`* 表示*``*精度。`NUMBER``(``,``)`



### 预编译程序

一种编程工具，使您能够将 SQL 语句嵌入到用 C、C++ 或 COBOL 等语言编写的高级源程序中。



### 谓语

SQL 语句中的条件。`WHERE`



### 前缀压缩

消除按[**索引组织的表中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FD628CF1-3A67-4171-92BB-D4A74119ACD9)重复出现的[**主键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8640EFA5-276C-4812-A078-1F21F55F4200)列值。前缀压缩以前称为*密钥压缩*。



### 主键

唯一标识表中行的列或列集。每个表只能定义一个主[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E0D85C39-5CB4-4E85-A9AB-3834FA6F09C7)。



### 主键约束

不允许在一列或一组列中出现重复值和 null 的[**完整性约束**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-67F8FE8C-EBA5-4796-820A-8919982A1411)。



### 专用 SQL 区域

内存中的一个区域，用于保存已分析的语句和其他要处理的信息。专用 SQL 区域包含[**绑定变量**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-456A73CB-75F4-4197-B1CD-12A51A1CBDC7)值、查询执行状态信息和[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)执行工作区等数据。



### 特权

运行特定类型的 SQL 语句的权限，或访问属于其他用户的对象、运行 PL/SQL 包等的权限。权限类型由 Oracle 数据库定义。



### 权限分析

一种根据指定条件捕获数据库特权使用情况的安全机制。例如，您可以查找用户在特定数据库会话期间行使的权限。



### 程序语言

一种描述应该*如何*做的事*，而不是应该*做什么的语言（如在声明性语言中）。C++和Java是过程语言的例子。



### 过程

操作系统中可以运行一系列步骤的机制。通过将 Oracle 数据库和数据库应用程序的工作划分为多个进程，多个用户和应用程序可以同时连接到单个数据库实例。

另请参阅[**后台进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8EFE210D-EE23-42A9-B4F0-7EF79C9315EE);[**Oracle流程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DD083580-0AAF-4728-9186-BE1E319020DD);[**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)。



### 过程监视器 （PMON）

检测其他后台进程终止的后台进程。如果服务器或调度程序进程异常终止，则[**进程监视器 （PMON） 组**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-97D32D55-2985-46A7-88E0-A2EFF9853391)负责执行进程恢复。



### 进程监视器 （PMON） 组

负责监视和清理其他进程的后台进程组。PMON 组包括进程[**监视器 （PMON）、**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E896B640-871D-433F-B44C-340E12B0DE7F)清理主进程 （CLMN） 和清理帮助程序进程 （CL*nn*）。



### 计划全球区域 （PGA）

见[**PGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19927E75-4983-4D59-A03D-C630E9908897)。



### 程序界面

数据库应用程序和 Oracle 数据库之间的软件层。



### 受保护的数据库

备份由[**恢复一体**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AFBC216B-28EA-40F5-9AD5-B5FB7B278F22)机管理的客户端数据库。



### 保护政策

一组属性，用于控制[**恢复一体机**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AFBC216B-28EA-40F5-9AD5-B5FB7B278F22)存储和维护备份数据的方式。每个受保护的数据库只分配给一个保护策略，该策略控制该客户机备份处理的所有方面。



### 伪列

未存储在表中但行为类似于表列的列。



### 查询

从表或视图中检索数据的操作。例如，是查询。`SELECT * FROM employees`

另请参阅[**隐式查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E802CBDA-5F3B-40CF-9749-612F0E0E4A35);[**子查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C1CDE912-86C4-4495-8959-0CF8196189B2)。



### 查询块

顶级语句、子查询或未合并视图。`SELECT`



### 查询协调员

在并行执行中，协调[**并行执行**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC15AD4C-1930-4E8F-A57D-C9DD800EAB14)服务器的用户[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)或影子进程。如果可能，并行执行服务器并行执行每个操作。并行服务器执行完语句后，查询协调器将执行无法并行执行的任何工作部分。最后，查询协调器将任何结果返回给用户。



### 查询优化

选择执行 SQL 语句的最有效方法的过程。



### 查询计划

用于执行查询的[**执行计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)。



### 查询重写

一种优化技术，它将根据主表编写的用户请求转换为语义等效的请求（包括具体化视图）。



### 查询转换器

一个优化器组件，用于确定是否可以将原始 SQL 语句重写为语义等效的 SQL 语句，开销较低。



### R

用于统计计算和图形的语言和环境。



### 范围分区

一种分区类型[**，**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3709F53A-185F-420B-B9F6-C5B0382CA731)其中数据库根据分区键的值范围将行映射到分区。范围分区是最常见的分区类型，通常与日期一起使用。



### 德玛

远程直接内存访问。一种通信协议，使客户端能够通过网络从数据库服务器的内存 （DRAM） 传输数据，而无需消耗服务器端 CPU。



### 读取提交的隔离级别

一种隔离级别，它保证事务执行的查询只能看到查询开始之前提交的数据，而不是事务。



### 读取一致性

用户看到的数据的一致视图。例如，在语句级读取一致性中，SQL 语句看到的数据集在整个语句执行过程中保持不变。

另请参阅[**数据并发**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D7E696DB-944C-4798-B70D-5C2381FE971F);[**数据一致性**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B016467E-5663-4AC8-B54D-181CA1B8198E)。



### 读/写数据库实例

可以处理 DML 并支持直接客户端连接的[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)。默认情况下，数据库实例是读/写的。



### 只读数据库

仅可用于查询且无法修改的数据库。



### 只读数据库实例

无法处理 DML 且不支持客户端连接的[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)。



### 只读隔离级别

类似于可序列化隔离级别的隔离级别，但有一个例外：只读事务不允许在事务中修改数据，除非用户是 。`SYS`



### 实时重做传输

将重做更改从受保护数据库的 SGA 持续传输到[**恢复一体机**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AFBC216B-28EA-40F5-9AD5-B5FB7B278F22)。实时重做传输使 RMAN 能够提供接近 0 的恢复点目标。通常，RMAN 可以在发生故障时一秒钟内恢复。受保护的数据库在生成重做条目时直接从 [**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 写入恢复设备。



### 可恢复的错误

由于外部系统故障而产生的一类错误，与正在执行的应用程序会话逻辑无关。在网络、节点、存储和数据库的计划内和计划外中断之后，会发生可恢复的错误。不可恢复错误的一个示例是提交无效的数据值。



### 恢复器工艺

在分布式数据库中，自动解决分布式事务中的故障的后台进程。



### 恢复一体机

零数据丢失恢复设备的缩短名称。恢复一体机是专为保护 Oracle 数据库而设计的 Oracle 集成系统。它与 RMAN 集成，使用云规模、完全容错的硬件和存储，为整个企业的数百到数千个数据库提供集中的永久增量备份策略。



### 恢复一体机备份模块

Oracle 提供的 SBT 库，[**RMAN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-13364DE9-0E15-488B-89E5-622316EC9796) 使用它通过网络将受保护数据库的备份发送到恢复一体机。该库必须安装在受保护数据库使用的每个 Oracle 主目录中。

该模块用作 RMAN 在分配或配置备份到恢复一体机的通道时引用的 SBT 介质管理库。RMAN 使用此模块执行到恢复一体机的所有备份，以及完整备份集的所有恢复。



### 恢复一体机元数据数据库

在恢复一体机内运行的 Oracle 数据库。此数据库存储配置数据，例如用户定义、保护策略定义和客户端数据库定义。元数据数据库还存储备份元数据，包括增量存储的内容。



### 恢复一体机存储位置

恢复一体机中存储备份的一组 Oracle ASM 磁盘组。可以在多个受保护的数据库之间共享存储位置。每个恢复一体机都包含名为 的默认恢复一体机存储位置。`DELTA`



### 恢复目录

位于 Oracle 数据库中的集中式备份存储库。恢复目录包含有关 RMAN 备份的元数据。



### 恢复管理器 （RMAN）

参见 [**RMAN。**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-13364DE9-0E15-488B-89E5-622316EC9796)



### 恢复时段目标

受保护的数据库必须可恢复以满足业务需求的时间间隔。对于保护[**策略**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C0444C9D-9420-4933-8947-974573A09BEE)中的每个[**受保护数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5A467949-812F-4BC3-B7EA-33E5CEAEE5F7)，恢复设备会尝试确保磁盘上最早的备份能够支持时间点恢复到指定间隔内的任何时间（例如，过去 7 天），从当前时间向后计数。



### 递归 SQL

数据库在后台执行以获取数据库对象空间的 SQL。您可以将递归SQL视为“副作用”SQL。



### 重做日志

一组文件，用于保护内存中尚未写入数据文件的已更改数据库数据。重做日志可以由两部分组成：联机重做日志和存档[**重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)。



### 重做日志缓冲区

[**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 中存储重做条目的内存结构 - 对数据库所做的更改的日志。数据库将重做日志缓冲区中存储的重[**做条目写入联机重做日志文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)，数据库在需要[**实例恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)时使用该文件。



### 重做记录

[**联机重做日志**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2A8BC112-AB70-4B06-9F85-FE975861CEE0)中的记录，其中包含一组更改向量，每个向量描述对数据块所做的更改。每个重做日志文件都由重做记录组成。



### 重做线程

[**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)生成的重做。



### 引用分区

一种分区策略，其中子表仅通过与父表的外键关系进行定义。对于父表中的每个分区，子表中正好存在一个相应的分区。



### 引用的键

在外键关系中，这指的是外键所引用的主键或唯一键。例如，在通用schema中，列是外键，列是引用的键。`employees.department_id``departments.department_id`



### 引用的对象

在schema对象依赖项中，由另一个对象的定义引用的对象。例如，如果对象 A 的定义引用对象 B，则 B 是 A 的引用对象。



### 参照完整性

在一个表中的键上定义的规则，用于保证该[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E0D85C39-5CB4-4E85-A9AB-3834FA6F09C7)中的值与相关表中键中的值（引用的值）匹配。



### 关系

一组元组。



### 关系型数据库

符合关系模型的数据库，将数据存储在一组简单关系中。



### 关系型数据库管理系统 （RDBMS）

一种管理系统，它将数据移动到关系型数据库中，存储数据并检索数据，以便应用程序可以对其进行操作。



### 重播上下文

在“应用程序连续性”中，数据库在正常应用程序运行时返回到客户端驱动程序的不透明信息。



### 复制

在多个数据库中共享数据库对象和数据的过程。



### 预留池

[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中的内存区域，Oracle 数据库可用于分配大型连续内存块。



### 资源计划

资源计划指令的容器，该指令指定如何将资源分配给资源使用者组。



### 资源计划指令

使用者组中会话的 CPU、物理 I/O 或逻辑 I/O 消耗的一组限制和控制。



### 还原点

用户定义的名称与与创建还原点的时间对应的数据库的 [**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C) 相关联。



### 结果集

从执行语句时检索到的数据集。`SELECT`



### 反向键索引

一种 B 树索引，它在保持列顺序的同时物理反转每个索引键的字节。例如，如果索引键是 ，并且如果以十六进制形式为此键存储的两个字节位于标准 B 树索引中，则反向键索引会将字节存储为 。`20``C1,15``15,C1`



### 右外连接

表 A 和 B 的右外连接的结果包含右侧表 *B* 的所有记录，即使连接条件与左侧表 *A* 中的记录不匹配也是如此。例如，如果执行 （左） 到 （右） 的右外联接，并且某些部门不包含任何员工，则查询将返回 中没有匹配项的行。`employees``departments``departments``employees`



### 马兰

恢复管理器。用于备份、还原和恢复 Oracle 数据库的 Oracle 数据库实用程序。



### 角色

可以授予数据库用户或其他角色的一组特权。



### 排

对应于[**表中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DA8F7E11-B6AF-4ED3-B2A9-B5741E9AE2D4)单个记录的一组[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F1D9AA5F-C66A-4D5F-A84C-8D7360DE3BE5)信息。数据库将行存储在数据块中。



### 行链接

Oracle 数据库必须将行存储在一系列或块链中，因为它太大而无法放入单个块中。



### 行锁定

单行表上的锁。事务为由 、、 或 语句修改的每一行获取行锁。`INSERT``UPDATE``DELETE``MERGE``SELECT ... FOR UPDATE`



### 行主要格式

一种表存储类型，其中一行的所有列存储在一起，后跟下一行的所有列，依此类推。



### 行迁移

Oracle 数据库将行从一个数据块移动到另一个数据块的情况，因为该行变得太大而无法容纳在原始[**块**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2141C31D-6752-4260-91CE-99B4CC557247)中。



### 行片

行存储在可变长度记录中。此记录分为一个或多个行段。每个行段都有一个行标题和列数据。



### 行集

执行计划中的步骤返回的一组行。



### 行源

一种迭代控制结构，用于处理一组行并生成一组行。



### 行源生成器

从优化器接收最佳计划并输出 SQL 语句的执行计划的软件。



### 行触发器

每次表受触发语句影响时触发的触发器。例如，如果语句更新多行，则行触发器会针对受 .`UPDATE`



### 罗维德

数据库中行的全局唯一地址。



### 示例schema

一组相互链接的schema，使 Oracle 文档和 Oracle 教学材料能够说明常见的数据库任务。



### 保存点

事务中可回滚到的事务中的命名 SCN。



### 规模

在浮点数中，从小数点到最低有效位数的位数。您可以以 *`p`* s 的形式指定定点数，其中 *`s`* 表示刻*``*度。`NUMBER``(``,``)`



### 图式

数据库对象的命名集合，包括逻辑结构，如表和索引。schema具有拥有它的数据库用户的名称。



### schema对象

[**存储在schema**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D55ED7A6-3BC4-4A16-981F-92E7E905A64D)中的数据的逻辑结构。schema对象的示例包括表、索引、序列和数据库链接。



### schema对象依赖关系

一个对象对另一个对象的引用。例如，视图包含引用表或视图的[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)，或者 [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA) 子程序调用其他子程序。



### 单片机

系统更改编号。数据库排序基元。SCN 的值是对数据库进行更改的逻辑时间点。



### 二级索引

按索引组织的表上的索引。从某种意义上说，它是索引上的索引。



### 安全文件 LOB 存储

安全文件 LOB 存储是 LOB 的默认存储机制。LOB 参数启用高级功能，包括压缩和重复数据删除（高级压缩选项的一部分）和加密（高级安全选项的一部分）。`SECUREFILE`



### 安全策略

一组方法，用于保护数据库免遭意外或恶意破坏数据或损坏数据库基础结构。



### 段

为特定数据库对象（如表、索引或[**表群集**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1C56177E-6BEE-4FE7-B45E-38298CDB946D)）分配的一组扩展数据块。用户区段、撤消区段和临时区段都是类型的区段。



### 选择列表

在语句中，这指的是在关键字之后和子句之前显示的表达式列表。`SELECT``SELECT``FROM`



### 选择性

指示谓词或谓词组合检索的行集比例的值，例如 。选择性 of 表示没有行通过谓词测试，而值 of 表示所有行都通过测试。`WHERE last_name = 'Smith'``0``1`

形容词*选择性*大致意思是“挑剔”。因此，高选择性查询返回的行比例较低（选择性接近 ），而非选择性查询返回高比例的行（选择性接近 ）。`0``1`



### 自行加入

表与自身的联接。



### 自参照完整性约束

外键引用同一表中的父键的约束。例如，约束可以确保列中的每个值都对应于列中的现有值。`employees.manager_id``employees.employee_id`



### 序列

为表列生成唯一编号的序列号列表的[**schema对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)。



### 串行执行

单个服务器进程执行顺序执行 SQL 语句的所有必要处理。



### 可序列化性

一种事务隔离模型，它使事务能够在一个环境中运行，该环境看起来好像没有其他用户在修改数据库中的数据。



### 可序列化隔离级别

一种隔离级别，可确保事务仅看到事务开始时提交的更改（而不是查询）以及事务本身所做的更改。



### 服务器

在[**客户端/服务器体系结构**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F0D8417-F8ED-4D91-BB81-1F86499ADD69)中，这指的是运行 Oracle 软件并处理并发共享数据访问所需功能的计算机。服务器接收并处理源自[**客户端**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F642154F-091E-4D5A-9562-401324055F1F)应用程序的 SQL 和 PL/SQL 语句。



### 服务器参数文件

包含由数据库读取和写入的[**初始化参数**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB20DD0-D924-465A-9FDF-0A13A990340C)设置的服务器端二进制文件。



### 服务器进程

与[**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)和 Oracle 数据库通信以满足用户请求的 [**Oracle 进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DD083580-0AAF-4728-9186-BE1E319020DD)。服务器进程与数据库实例相关联，但不是实例的一部分。



### 服务器结果缓存

共享池中的内存池。此内存池由 SQL 查询结果缓存（存储 SQL 查询结果）和 PL/SQL 函数结果缓存（存储 PL/SQL 函数返回的值）组成。



### 服务处理程序

在 Oracle Net 中，这指的是充当数据库连接点的专用服务器进程或调度程序。



### 服务名称

在 Oracle Net 中，这指的是用于客户端连接的服务的逻辑表示形式。



### 服务注册

Oracle Net 中的一种功能，通过该功能，侦听器注册[**进程 （LREG）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B6A31D8-2E67-4475-BA5F-3DE9FFC0461A) 向侦听器动态注册实例信息，使侦听器能够将客户端连接请求转发到相应的服务处理程序。



### 面向服务的体系结构 （SOA）

依赖于支持通过网络进行计算机到计算机交互的服务的多层体系结构。



### 会期

数据库实例内存中的一个逻辑实体，表示当前用户登录到[**数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的状态。单个[**连接**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-59148E2F-E535-4AD7-AE87-4D41CD40B5B8)可以建立 0、1 或多个会话。



### 新加坡金融管理局

系统全局区域。一组共享内存结构，其中包含一个 Oracle [**数据库实例**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CFB1A30E-76B6-44EA-839E-9E63C8DA31AC)的数据和控制信息。



### 阴影范围

影子表空间中的[**盘区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-C56D833A-B3D3-4B85-AAB4-334F7CF3F5E9)。阴影范围和[**追踪数据文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8A0DABA5-3509-4298-B206-C379910EC038)之间存在一对一映射。



### 影子丢失写保护

一种数据保护功能，它使用[**影子表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D3D0D837-AE1D-446C-BD91-F22A4A5DA14A)自动检测任何[**跟踪数据文件中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8A0DABA5-3509-4298-B206-C379910EC038)丢失[**的写入**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3B93C4C1-D08B-4320-BE13-1D4EC3EAC47B)。



### 影子表空间

为[**卷影丢失写保护**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-830F578A-3B85-44CC-9861-4D47E5677884)启用的表空间。表空间跟踪存储在[**跟踪数据文件中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8A0DABA5-3509-4298-B206-C379910EC038)的数据块的 SCN 和其他元数据。单个影子表空间可能包含许多常规数据文件的描述性数据。



### 碎片

参与[**分片**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2432BED1-A63A-436D-937C-78F72E343E03)配置的单个数据库。



### 分片目录数据库

存储[**分片数据库 （SDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1D5F394A-E198-4366-B76D-3AD34EBF692F)） 配置数据并提供其他功能（如跨分片查询和集中管理）的数据库。



### 碎片导演

一个 [**GDS**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9DF0EA4A-B2FB-4470-872F-4AE9881C1011) 基础schema组件，它使用[**全局服务管理器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A2D20DC2-EB89-4944-BEA8-9FEFB395C0A2)提供从应用层到单个[**分片**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E31B18D6-85A8-4DFF-9A2E-8F806AA7C313)的请求的直接路由。



### 分片数据库 （SDB）

在分片体系结构中，这指的是对应用程序显示为单个逻辑数据库的[**分片**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2432BED1-A63A-436D-937C-78F72E343E03)集合。



### 分片表

在[**分片数据库 （SDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1D5F394A-E198-4366-B76D-3AD34EBF692F) 中水平拆分的表，以便每个[**分片**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E31B18D6-85A8-4DFF-9A2E-8F806AA7C313)包含具有相同列但行子集不同的表。



### 分片

一种数据层体系结构，其中数据跨独立数据库进行水平分区。分片是一种无共享数据库schema，因为分片不共享 CPU、内存或存储设备等物理资源。分片在软件方面也是松散耦合的;它们不运行群集件。



### 分片键

[**分表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-9F0249A0-E7A2-44A0-A08A-6E4259C692C1)的分区键。



### 共享锁定

一种锁，允许多个事务共享关联的资源，具体取决于所涉及的操作。多个事务可以获取同一资源的共享锁。



### 共享池

包含共享内存构造（如共享 SQL 区域）的 [**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4) 部分。



### 共享服务器

一种数据库配置，它使多个客户端进程能够共享少量服务器进程。

另请参阅[**专用服务器**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-8B14C804-9D68-471C-A581-5AEE673A9FCD)。



### 共享 SQL 区域

[**共享池**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8)中的一个区域，其中包含 SQL 语句的分析树和执行[**计划**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2DF33B85-94BB-44F3-93B7-06916FB18361)。唯一语句仅存在一个共享 SQL 区域。



### 共享临时表空间

驻留在共享存储上并由所有数据库实例访问的[**临时表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D49FAC9A-79CC-436C-9656-4A1C94A50A2D)。从 Oracle 数据库 12*c* 第 2 版 （12.2） 开始，临时表空间可以是共享表空间，也可以是本地表空间。在以前的发行版中，所有临时表空间都是共享的临时表空间。



### 共享撤消模式

对整个 [**CDB**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-135FF536-DE9B-40CF-9F42-C246762BD77F) 使用一组撤消数据文件。



### 简单的数据库操作

单个 SQL 语句，或单个 PL/SQL 过程或函数。



### 简单触发器

表上的触发器，可用于指定恰好一个计时点的操作。例如，触发器可能会在触发语句之前触发。



### single-level partitioning

A partitioning strategy that uses only one method of data distribution, for example, only list partitioning or only range partitioning.



### site failure

An event that causes all or a significant portion of an application to stop processing or slow to an unusable service level.



### smallfile tablespace

A tablespace that can contain multiple data files or temp files, but the files cannot be as large as in a [**bigfile tablespace**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-02B4A6A1-8828-47C9-A921-11966359363E).



### soft parse

The reuse of existing code when the parsed representation of a submitted SQL statement exists in the [**shared pool**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-64AFFF3A-C836-44F9-A25C-86CE4B9B16A8) and can be shared.

See also [**hard parse**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1BFB2AF7-BC88-4A93-B9AA-C75CA62C5824).



### software code area

A portion of memory that stores code that is being run or can be run.



### sorted hash cluster

A hash cluster that stores the rows corresponding to each value of the hash function in such a way that the database can efficiently return them in sorted order. The database performs the optimized sort internally.



### SQL

Structured Query Language. A nonprocedural language to access a relational database. Users describe in SQL what they want done, and the SQL language compiler automatically generates a procedure to navigate the database and perform the task. **Oracle SQL** includes many extensions to the ANSI/ISO standard SQL language.

See also [**SQL\*Plus**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-727830E8-1F52-4BC2-8DB6-827760DF00A3); [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA).



### SQL Developer

A graphical version of SQL*Plus, written in Java, that supports development in SQL and PL/SQL.



### SQL parsing

SQL 处理的这一阶段，涉及将 SQL 语句的各个部分分离为可由其他例程处理的数据结构。



### SQL 计划基线

在 SQL 计划管理中，可重复 SQL 语句的一组或多个已接受的计划。SQL 计划基线的效果是优化程序将其选择限制为基线中已验证的计划。



### SQL 计划管理

一种预防性机制，使优化程序能够自动管理执行计划，确保数据库仅使用已验证的计划。



### SQL 配置文件

在自动调整 SQL 语句期间构建的一组辅助信息。SQL 概要文件之于 SQL 语句，就像统计信息之于表一样。优化程序可以使用 SQL 配置文件来改进基数和选择性估计，这反过来又引导优化程序选择更好的计划。



### SQL查询结果缓存

服务器结果缓存的子集，用于存储查询结果和查询片段。



### SQL*加

用于对 Oracle 数据库运行 [**SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-30430C74-B2C1-43A0-B7FF-64111B786BC5) 语句的 Oracle 工具。



### SQLJ

一种 ANSI 标准，用于在 Java 程序中嵌入 SQL 语句。您可以将 SQLJ 程序与 JDBC 结合使用。



### 备用数据库

生产数据库的独立副本，可用于高可用性环境中的灾难保护。



### 星型schema

一种关系schema，其设计表示维度数据模型。星型schema由一个或多个事实数据表以及一个或多个通过外键关联的维度表组成。

另见[**尺寸表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3089C278-6C49-4110-A10C-A95586E5868F);[**事实数据表**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B6DD258C-FFA5-4CDC-B5FB-98B3B9F20F99)。



### 状态对象

会话级结构，包含有关数据库资源（如 SGA 中的进程、会话和事务）状态的元数据。



### 语句触发器

代表触发语句触发一次的触发器，而不考虑触发语句影响的行数。



### 语句级原子性

SQL 语句作为完全成功或完全失败的原子工作单元的特征。



### 语句级读取一致性

保证单个查询返回的数据在单个时间点提交且一致。



### 语句级回滚

一种数据库操作，在该操作中，由于失败的 SQL 语句在执行过程中导致错误而回滚该语句的效果。



### 存储过程

Oracle 数据库存储在数据库中的命名 [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA) 块或 Java 程序。应用程序可以按名称调用存储过程。



### 流池

存储缓冲队列消息的内存池。



### 结构化查询语言 （SQL）

请参阅 [**SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-30430C74-B2C1-43A0-B7FF-64111B786BC5)。



### 子查询

嵌套在另一个 SQL 语句中的[**查询**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCF91C9F-A98A-498F-A84B-58A0FA16CD6E)。与隐式查询不同，子查询使用语句来检索数据。`SELECT`



### 总结

在数据仓库中，这指的是一种聚合视图，它通过预先计算联接和聚合操作并将结果存储在表中来减少查询时间。



### 代理键

系统生成的递增标识符，用于确保表中的唯一性。通常，序列会生成代理键。



### 同义词

[**schema对象的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)别名。您可以使用同义词来提供数据独立性和位置透明度。



### 系统更改编号 （SCN）

请参阅[**SCN**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-4B14A746-A8B3-4123-A02A-3FC1C293042C)。



### 系统事件触发器

由错误消息或数据库实例启动和关闭等事件引起的事件触发器。



### 系统全局区域 （SGA）

见[**SGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3F87437B-614A-472E-B691-F09D4A310DE4)。



### 系统监视器进程 （SMON）

负责各种系统级清理职责的后台进程，包括实例恢复、恢复在实例恢复期间跳过的已终止事务、清理未使用的临时段以及合并字典管理的表空间中的连续可用扩展数据块。



### 桌子

Oracle 数据库中数据存储的基本单位。表中的数据存储在行和列中。



### 表群集

一个[**schema对象**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC18AB9A-E51B-4B90-941C-44F0C35851F5)，其中包含来自一个或多个表的数据，所有这些表都有一个或多个共同的列。在表集群中，数据库将共享同一集群[**键**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-E0D85C39-5CB4-4E85-A9AB-3834FA6F09C7)的所有表中的所有行存储在一起。



### 表压缩

压缩数据段以减少[**堆组织的**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-861D8FCE-B86C-46B3-AA01-35066D24F4CF)表或表[**分区**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-19BC4E2E-B549-4A99-8FE5-3FCA24BD52D4)中的磁盘空间。



### 表函数

用户定义的 PL/SQL 函数，用于返回行集合（嵌套表或虚拟数组）。可以通过在语句中的子句内调用 table 函数，从此集合中进行选择，就好像它是数据库表一样。`TABLE``SELECT`



### 表锁

表上的锁，当表被 、、、 或 语句修改时，事务获取该锁。`INSERT``UPDATE``DELETE``MERGE``SELECT ... FOR UPDATE``LOCK TABLE`



### 表空间

将相关逻辑结构组合在一起的数据库存储单元。数据库数据文件存储在表空间中。



### 表空间集

[**Oracle 分**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0A55D36B-1CF7-43DA-9EF8-45A133E92335)片中的表空间分布在[**分片数据库 （SDB）**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-1D5F394A-E198-4366-B76D-3AD34EBF692F) 中并作为一个单元进行管理。



### 临时文件

属于临时[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA66891C-71B2-4D55-8F64-0E427AE24E88)的文件。临时表空间中的临时文件不能包含永久数据库对象。



### 临时段

当 SQL 语句需要临时数据库区域才能完成执行时，Oracle 数据库创建的[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。



### 临时表

一个表，用于保存[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)或[**会话**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0F44C072-9841-4E2E-B846-FB16A2E54139)持续时间内的中间结果集。只有当前会话才能查看临时表中的数据。



### 临时表空间

只能包含仅在会话持续时间内保留的瞬态数据的表空间。任何永久模式对象都不能驻留在临时表空间中。

每个临时表空间要么是共享的临时表空间，要么是[**本地临时表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-3B1784FE-857F-4421-B6F8-17105AEBB6B7)。除非另有说明，否则术语“临时表空间”是指*共享的临时表空间*。



### 临时撤消段

仅用于临时撤消数据的可选空间管理容器。



### 跟踪文件

包含用于调查问题的诊断数据的管理文件。Oracle 数据库将跟踪文件写入 [**ADR**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-CCD0CFFB-557E-4043-8D82-0D4E4F972B25)。



### 跟踪的数据文件

其块 SCN 由影[**子表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-D3D0D837-AE1D-446C-BD91-F22A4A5DA14A)跟踪的数据文件，启用[**影子丢失写保护**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-830F578A-3B85-44CC-9861-4D47E5677884)。



### 交易

包含一个或多个 SQL 语句的逻辑工作单元。事务中的所有语句一起[**提交**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-0680EB2C-ADF4-431A-A259-FB2227E5AA93)或回滚。事务的使用是数据库管理系统与文件系统区别的最重要方式之一。



### 交易输入

区块头中的空间，这是更新区块的每个交易所需的空间。在分配给支持事务更改的段的数据块中，当标头空间耗尽时，可用空间还可以保存事务条目。



### 事务守卫

一种数据库功能，它使用[**逻辑事务 ID**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-B87A5F1E-E193-4A3D-AEAE-5EFE8DFFB3DA) 来防止客户端应用程序在[**出现可恢复的错误**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-2F7DE61F-BD7C-4A89-91E6-CE0D193E8294)后提交重复事务的可能性。



### 交易编号

标识符对于[**事务**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-212D8EA1-D704-4D7B-A72D-72001965CE45)是唯一的，表示撤消段号、槽号和序列号。



### 事务幂等性

返回事务的保证结果的能力：它是否提交以及调用是否已完成。



### 交易名称

用户指定的可选标记，用于提醒事务正在执行的工作。使用语句命名事务。`SET TRANSACTION ... NAME`



### 事务恢复

[**实例恢复**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-FFDBC27D-CE99-49C7-8BB9-C8C2D8D52801)阶段，在该阶段中回滚未提交的事务。



### 事务表

撤消段中的数据结构，用于保存使用撤消段的事务的事务标识符。



### 事务级读取一致性

保证事务中所有查询的读取一致性。事务中的每个语句都看到来自同一时间点的数据，即事务开始的时间。



### 过渡点

由范围分区键值确定的范围分区的高值。



### 透明数据加密

加密单个表列或表空间的数据库功能。当用户将数据插入加密列时，数据库会自动加密数据。当用户选择列时，数据将被解密。这种形式的加密是透明的，提供高性能，并且易于实现。



### 可传输表空间

可以在数据库之间复制或移动的表空间。Oracle 数据泵为可传输的表空间提供基础设施。



### 触发

在修改表或视图或发生特定用户或数据库操作时触发的 [**PL/SQL**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-68532EDC-3324-48DE-9AD5-52CD2EC671EA) 或 Java 过程。过程显式运行，而触发器隐式运行。



### 元

一组无序的属性值。



### 两阶段提交机制

分布式数据库中的一种机制，它保证参与分布式事务的所有数据库要么全部提交，要么全部撤消事务中的语句。



### 乌加

用户全局区域。存储会话变量（如登录信息）的会话内存，还可以包含 [**OLAP**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-A6734D1E-A45B-4BE3-ABF8-F6201A40F6B3) 池。



### 撤消数据

事务操作的记录，主要是在提交之前。数据库可以使用撤消数据在逻辑上反转 SQL 语句的效果。撤消数据存储在撤消段中。



### 撤消保留期

数据库在覆盖旧撤消数据之前尝试保留它的最短时间。



### 撤消段

[**撤消表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-78A7FBF2-2EB5-4BD6-AECC-D61A5AEF1158)中的[**段**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EC12AA68-8C89-43B3-B1F9-3AABF7CAEB9F)。



### 撤消表空间

启用[**自动撤消管理模式**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-31B8DD86-BD6D-446D-A35D-B5BF3654DF9E)时包含撤消段的[**表空间**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AA66891C-71B2-4D55-8F64-0E427AE24E88)。



### 统一码

一种通用编码字符集，可以使用单个字符集以任何语言存储信息。



### 统一审计策略

一种策略，可用于配置对 SQL 语句、系统权限、schema对象、角色、管理和非管理用户、应用程序上下文值以及各种应用程序和事件的策略创建的审核。



### 统一审计跟踪

审计跟踪为来自所有类型的审计的审计记录提供统一的存储。



### 唯一键

具有唯一键约束的单个列。



### 唯一键约束

一种完整性约束，要求一列或一组列中的每个值都是唯一的。



### 通用罗维德

可以存储所有类型的 rowid 的数据类型。Oracle 使用通用 rowid 来存储索引组织和非 Oracle 表的地址。



### 不可用的索引

不由 DML 操作维护且优化程序忽略的索引。所有索引都可用（默认）或不可用。



### 可更新的联接视图

在两个或多个基表或视图上定义并允许 DML 操作的视图。



### 用户事件触发器

由于与用户登录和注销、DDL 语句和 DML 语句相关的事件而触发的事件触发器。



### 用户全局区域 （UGA）

参见 [**UGA**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-733B290C-18F1-4DE9-839A-132198E2639E)。



### 用户名

Oracle 数据库和其他用户已知用户的名称。每个用户名都与一个密码相关联，必须输入这两个密码才能连接到 Oracle 数据库。



### 用户权限

运行特定 SQL 语句的权限。



### 用户进程

请参阅[**客户端进程**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-6F3BBCE8-F471-41E8-8C98-F4C62A85862B)。



### 用户个人资料

一组命名的资源限制和密码参数，用于限制用户的数据库使用情况和数据库实例资源。



### 视图

在一个或多个表中定制数据表示。视图实际上并不包含或存储数据，而是从它们所基于的表中派生数据。



### 虚拟列

未存储在磁盘上的[**列**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-F1D9AA5F-C66A-4D5F-A84C-8D7360DE3BE5)。数据库通过计算一组表达式或函数来按需派生虚拟列中的值。



### 虚拟完整备份

截至一个不同时间点的完整数据库映像，由[**恢复应用装置**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-AFBC216B-28EA-40F5-9AD5-B5FB7B278F22)通过索引受保护数据库中的增量备份来高效维护。虚拟完整备份包含来自多个增量备份的各个块。例如，如果在星期一使用 SCN 0 执行第 10000 级备份，并在星期二使用 SCN 1 执行增量级别 11000 备份，则[**恢复一体机元数据数据库**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-5344CAFE-B53D-4C47-B07D-ABBC56E1E8EE)将显示当前到 SCN 0 的虚拟级别 11000 备份。



### 仓库压缩

用 指定的混合列式压缩。这种类型的压缩在数据仓库中很有用。`COLUMN STORE COMPRESS FOR QUERY`



### 整个数据库备份

[**控制文件**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-DF498605-D186-451B-87AA-73DF396AD599)和属于数据库的所有数据文件的备份。



### 工作区域

用于内存密集型操作的 PGA 内存的专用分配。



### 预写协议

该协议要求在数据库编写器进程可以写入脏缓冲区之前，数据库必须将与缓冲区更改关联的重做记录写入磁盘。



### 区

在区域映射中，区域是一组连续的数据块，用于存储相关列的最小值和最大值。



### 区域地图

在[**属性集群表中**](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/Chunk520365104.html#GUID-EE2182EF-D02C-45D6-B435-2EBAC4C14301)，区域映射是一种独立的访问结构，用于将数据块划分为区域。