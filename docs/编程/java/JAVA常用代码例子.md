# JAVA常用代码例子

## 1.文件夹深层遍历

根据文件夹路径，遍历该文件夹下的所有文件和文件夹，包含子文件夹的文件夹以及文件。

```java
import java.io.File;

public class Test {

	/**
	 * 使用例
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		iterateFiles("D:\\我的笔记\\github-notebook\\notebook\\docs\\编程");
	}

	/**
	 * 深层遍历文件夹
	 * 1.遍历该文件夹下的所有文件和文件夹
	 * 2.包含子文件夹的文件夹以及文件
     * 3.文件夹路径最后不含"\\"
	 * @param filepath 文件夹路径
	 */
	private static void iterateFiles(String filepath)
	{
		File file=new File(filepath);
		if(file.isFile())
		{
			// 如果是文件
			System.out.println(file.getPath()+"\t"+file.getName());
			return;
		}else{
			// 如果是文件夹
			System.out.println(file.getName()+"下面的所有文件：");
			String[] files=file.list();
			for(int i=0;i<files.length;i++)
			{
				iterateFiles(file.getAbsolutePath()+File.separatorChar+files[i]);
			}
		}
	}    
}
```

## 2.文件夹单层遍历

根据文件夹路径，遍历该文件夹下的所有文件和文件夹，不包含子文件夹的文件夹以及文件。

```java
import java.io.File;

public class Test {

	/**
	 * 使用例
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		iterateFile("C:\\Users\\Jerry\\eclipse-workspace\\DongManDownload");
	}

	/**
	 * 单层遍历文件夹
	 * 1.遍历该文件夹下的所有文件和文件夹
	 * 2.不包含子文件夹的文件夹以及文件
     * 3.文件夹路径最后不含"\\"
	 * 
	 * @param filepath 文件夹路径
	 */
	private static void iterateFile(String filepath) {
		File file = new File(filepath);
		String[] files = file.list();

		// 如果不是文件夹
		if(!file.isFile()) {
			System.out.println("当前路径不是文件夹!");
			return ;
		}

		// 如果是文件夹
		for (int i = 0; i < files.length; i++) {
			File f = new File(file.getAbsolutePath()+File.separatorChar+files[i]);
			if(!f.isFile()) {
				System.out.println("文件夹："+f.getPath());
			}else {
				System.out.println("文件："+f.getPath());
			}
		}
	}
}

```

## 3.按比例修改PNG图片尺寸

```java

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class XiuGaiTuPianChiCun {
	/**
	 * 修改新的尺寸后，保存到新的文件夹下 文件夹路径最后不含"\\"
	 * 
	 * @param inputImagePath  修改前的图片的文件夹路径
	 * @param outputImagePath 修改后的图片的文件夹路径
	 * @param newWidth        替换为你想要的新宽度
	 */
	private static void resizeImage(String inputImagePath, String outputImagePath, int newWidth) {
		try {
			File inputFile = new File(inputImagePath);
			BufferedImage inputImage = ImageIO.read(inputFile);

			// 计算等比例缩放后的高度
			int originalWidth = inputImage.getWidth();
			int originalHeight = inputImage.getHeight();
			int newHeight = (int) Math.round((double) newWidth / originalWidth * originalHeight);

			// 创建一个新的BufferedImage，并进行等比例缩放
			BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, inputImage.getType());
			Graphics2D g2d = resizedImage.createGraphics();
			g2d.drawImage(inputImage, 0, 0, newWidth, newHeight, null);
			g2d.dispose();

			// 保存缩放后的图片
			ImageIO.write(resizedImage, "png", new File(outputImagePath));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 遍历文件夹
	 * 
	 * @param filepath    修改前的图片的文件夹路径
	 * @param newfilepath 修改后的图片的文件夹路径
	 * @param newWidth    替换为你想要的新宽度
	 */
	private static void iterateFile(String filepath, String newfilepath, int newWidth) {
		File file = new File(filepath);
		// System.out.println(file.getName());
		if (file.isFile()) {
			String inputImagePath = file.getPath();
			String outputImagePath = newfilepath + "\\" + file.getName();

			resizeImage(inputImagePath, outputImagePath, newWidth);

			// 是文件
			System.out.println(file.getPath() + "\t" + file.getName());
			return;
		} else {
			System.out.println(file.getName() + "下面的所有文件：");
			String[] files = file.list();
			for (int i = 0; i < files.length; i++) {
				iterateFile(file.getAbsolutePath() + File.separatorChar + files[i], newfilepath, newWidth);
			}
		}
	}

	/**
	 * 使用例
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		iterateFile("D:\\Jerry\\Desktop\\change\\images", "D:\\Jerry\\Desktop\\change\\images_new", 550);
	}
}
```

## 4.反射+自定义注解，实现单项目Check

**工程目录结构**

![](images\4-1.png)

**自定义注解类，SingleItemCheck.java**

```java
package demo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 自定义注解
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface SingleItemCheck {

	// 容许的最大长度
	int maxlength();
}

```

**Entity类，StudentEntity.java，添加自定义注解**

```java
package demo.entity;

import demo.SingleItemCheck;

public class StudentEntity {

	@SingleItemCheck(maxlength=10)
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

```

**Test.java类，实现对添加了自定义注解的字段，进行最大长度的Check。**

```java
package demo;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

import demo.entity.StudentEntity;

public class Test {

	/**
	 * 执行Check
	 * 
	 * @param entityClass
	 * @throws SecurityException
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public static void validation(Object o) throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {

		// 遍历Field
		Field[] fields = o.getClass().getDeclaredFields();
		for (Field field : fields) {
			// 放开权限
			field.setAccessible(true);

			// 遍历Field的所有注解
			Annotation[] fieldAnnotations = field.getAnnotations();
			for (Annotation fieldAnnotation : fieldAnnotations) {

				// 对指定类型的注解进行分析
				if ("interface demo.SingleItemCheck".equals(fieldAnnotation.annotationType().toString())) {
					SingleItemCheck singleItemCheck = (SingleItemCheck) fieldAnnotation;

					// 取得注解的值
					int maxlength = singleItemCheck.maxlength();
					// 取得Field的值
					Object value = field.get(o);
					// 取得Field的长度
					int length = value.toString().length();

					// 判断
					if (length > maxlength) {
						System.out.println(field.getName() + "的长度超过了" + maxlength);
					} else {
						System.out.println(field.getName() + "的长度没有超过" + maxlength);
					}
				}
			}
			field.setAccessible(false);
		}
	}

	public static void main(String[] args) throws Exception {
		StudentEntity se = new StudentEntity();
		se.setName("蜡笔小新蜡笔小新蜡笔小");
		validation(se);

		StudentEntity se1 = new StudentEntity();
		se1.setName("蜡笔小新蜡笔小新蜡");
		validation(se1);
	}
}

```

运行Test.java。
<font color=#999AAA >运行结果如下：</font>

<table>
<tr>
<td align="left">
<font size='2'>name的长度超过了10<br>
<font size='2'>name的长度没有超过10<br>
</td>
</tr>
</table>
## 5.筛选浏览器收藏夹里的无效链接

```java
package demo.jianruibin;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

@SuppressWarnings("resource")
public class QuickLNKCheck {
    public static void main(String[] args) throws IOException{
         QuickLNKCheck qlc = new QuickLNKCheck();
         // 收藏夹路径
         qlc.getFiles(new File("C:\\Users\\Jerry\\Favorites"));
    }

    /**
     * 遍历所有收藏夹文件，并判断收藏的url是否有效
     * @param files
     * @throws IOException
     */
    public void getFiles(File files) throws IOException {
        if (files != null && files.listFiles() != null) {
            for (File file : files.listFiles()) {
                this.getFiles(file);
                // 如果file是文件的场合
                if (!file.isDirectory()) {
                    // 获取url
                    String url = getURL(file);

                    // ping url，并判断url是否有效
                    if (url == null || !ping(url)) {
                        System.out.println(file.getAbsolutePath());
                        System.out.println(url);
                        System.out.println("状态：失效\n");
                    }
                }
            }
        }
    }

    /**
     * 获取Internet的url文件的url信息
     * 
     * @param file Internet的url文件
     * @return url字符串
     */
    public String getURL(File file) {
        try {
            FileInputStream fis = new FileInputStream(file);
            BufferedReader reader = new BufferedReader(new InputStreamReader(fis));

            // 读取文件信息
            String str = null;
            while ((str = reader.readLine()) != null) {
                if (str != null && str.length() > 3 && str.substring(0,3).equals("URL")) {
                    // 返回URL
                    return str.substring(4);
                }
            }

            fis.close();
            reader.close();
        } catch (IOException e) {
            return null;
        }
        return null;
    }

    /**
     * ping url，并获得ping的结果
     * @param url
     * @return
     */
    public static boolean ping(String url) {
        try {
            final URLConnection connection = new URL(url).openConnection();
            connection.connect();
            return true;
        } catch (final MalformedURLException e) {
            return false;
        } catch (final IOException e) {
            return false;
        }
    }
}

```

<font color=#999AAA >部分运行结果如下：</font>

<table>
<tr>
<td align="left">
<font size='2'>C:\Users\Jerry\Favorites\Links\个人开发\elasticsearch-head.url<br>
<font size='2'>http://localhost:9100/<br>
<font size='2'>状态：失效<br>
</td>
</tr>
</table>

## 6.统计字符串里每一个字符重复的次数。

对于指定的字符串，计算相同字符的数量，并将结果用HashMap存储，然后遍历

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Test {

   public static void main(String[] args) {
       String randLetterInfo = "ajfoaifjalfajweoagaefalwfgjaoevawjaiwefjawoefiaf";

       Test test = new Test();
       test.countCharOfStr(randLetterInfo);
   }

   /**
    * 计算特定字符的重复的次数数，并打印到控制台
    *
    * @param inputLetterInfo 字符串
    */
   public void countCharOfStr(String inputLetterInfo) {
       char[] letterCharArray = inputLetterInfo.toCharArray();

       Map<Character, Integer> opMap = new HashMap<>();
       for (char c : letterCharArray) {
           opMap.put(c, opMap.get(c) == null ? 1 : opMap.get(c) + 1);
       }

       Iterator iter = opMap.keySet().iterator();
       while (iter.hasNext()) {
           char c = (Character) iter.next();
           System.out.println(c + " = " + opMap.get(c));
       }
   }
}

```

<font color=#999AAA >运行结果如下：</font>

<table>
<tr>
<td align="left">
<font size='3'>a = 12<br>
<font size='3'>e = 5<br>
<font size='3'>f = 8<br>
<font size='3'>v = 1<br>
<font size='3'>w = 5<br>
<font size='3'>g = 2<br>
<font size='3'>i = 3<br>
<font size='3'>j = 6<br>
<font size='3'>l = 2<br>
<font size='3'>o = 4<br>
</td>
</tr>
</table>

## 7.字符在不同编码下占内存字节大小

参考：[Java不同编码方式，中英文字符所占字节数](https://blog.csdn.net/weixin_33724570/article/details/86393877)
<font color=#999AAA >代码如下：</font>

```java
public class Test {

    public static void main(String[] args){

        String[] charsetNames={    
                                    "UTF-8",
                                    "UTF-16",
                                    "UTF-16BE",
                                    "UTF-16LE",
                                    "UTF-32",
                                    "UTF-32BE",
                                    "UTF-32LE",
                                    "UNICODE",
                                    "GBK",
                                    "GB2312",
                                    "GB18030",
                                    "ISO8859-1",
                                    "BIG5",
                                    "ASCII"
                               }; 


        for(int i=0;i<charsetNames.length;i++){
            printByteLength(charsetNames[i]);
        }

    }

    /**
     * String类的不带参数的getBytes()方法会以程序所运行平台的默认编码方式为准来进行转换，
     * 在不同环境下可能会有不同的结果，因此建议使用指定编码方式的getBytes(String charsetName)方法。
     */
    public static void printByteLength(String charsetName){
        String en="a";    //一个英文字符
        String zh="啊";    //一个中文字符
        try {
            System.out.println(charsetName+"编码英文字符所占字节数:"+en.getBytes(charsetName).length);
            System.out.println(charsetName+"编码中文字符所占字节数:"+zh.getBytes(charsetName).length);
            System.out.println();
        } catch (UnsupportedEncodingException e) {
            System.out.println("非法编码格式！");
        }
    }
}
```
<font color=#999AAA >运行结果如下：</font>
<table>
<tr>
<td align="left">
<font size='2'>UTF-8编码英文字符所占字节数:1<br>
<font size='2'>UTF-8编码中文字符所占字节数:3<br>
<br>
<font size='2'>UTF-16编码英文字符所占字节数:4<br>
<font size='2'>UTF-16编码中文字符所占字节数:4<br>
<br>
<font size='2'>UTF-16BE编码英文字符所占字节数:2<br>
<font size='2'>UTF-16BE编码中文字符所占字节数:2<br>
<br>
<font size='2'>UTF-16LE编码英文字符所占字节数:2<br>
<font size='2'>UTF-16LE编码中文字符所占字节数:2<br>
<br>
<font size='2'>UTF-32编码英文字符所占字节数:4<br>
<font size='2'>UTF-32编码中文字符所占字节数:4<br>
<br>
<font size='2'>UTF-32BE编码英文字符所占字节数:4<br>
<font size='2'>UTF-32BE编码中文字符所占字节数:4<br>
<br>
<font size='2'>UTF-32LE编码英文字符所占字节数:4<br>
<font size='2'>UTF-32LE编码中文字符所占字节数:4<br>
<br>
<font size='2'>UNICODE编码英文字符所占字节数:4<br>
<font size='2'>UNICODE编码中文字符所占字节数:4<br>
<br>
<font size='2'>GBK编码英文字符所占字节数:1<br>
<font size='2'>GBK编码中文字符所占字节数:2<br>
<br>
<font size='2'>GB2312编码英文字符所占字节数:1<br>
<font size='2'>GB2312编码中文字符所占字节数:2<br>
<br>
<font size='2'>GB18030编码英文字符所占字节数:1<br>
<font size='2'>GB18030编码中文字符所占字节数:2<br>
<br>
<font size='2'>ISO8859-1编码英文字符所占字节数:1<br>
<font size='2'>ISO8859-1编码中文字符所占字节数:1<br>
<br>
<font size='2'>BIG5编码英文字符所占字节数:1<br>
<font size='2'>BIG5编码中文字符所占字节数:2<br>
<br>
<font size='2'>ASCII编码英文字符所占字节数:1<br>
<font size='2'>ASCII编码中文字符所占字节数:1<br>
</td>
</tr>
</table>

## 8.取得字符串对应的Unicode码

参考：[Java把字符串转Unicode](https://www.cnblogs.com/kinglearnjava/p/4883302.html)
<font color=#999AAA >代码如下：</font>
```java
import java.util.regex.*;
public class Test{  
    private static StringBuilder sb = new StringBuilder();
    private static Pattern p = Pattern.compile("\\\\u[\\da-f]{4}");

    public static void main(String[] args){
        String s2 = stringToUnicode("抓住楼主枪毙两分钟");
        System.out.println(s2);
    }

    public static String stringToUnicode(String s){
        sb.setLength(0);//清零
        StringBuilder tmp = new StringBuilder();
        for(int i = 0; i < s.length(); i++){
            sb.append("\\u"); //以 \ u开头
            tmp.setLength(0); //清零
            tmp.append(Integer.toHexString(s.charAt(i)).toLowerCase());
            while(tmp.length() < 4){
                tmp.insert(0, 0);
            }
            sb.append(tmp);
        }
        return sb.toString();
    }

    public static String unicodeToString(String s){
        s = s.toLowerCase();
        sb.setLength(0);
        Matcher m = p.matcher(s);
        while(m.find()){
            sb.append((char)Integer.parseInt(m.group().substring(2), 16));
        }
        return sb.toString();
    }
}
```
<font color=#999AAA >运行结果如下：</font>
<table>
<tr>
<td align="left">
\u6293\u4f4f\u697c\u4e3b\u67aa\u6bd9\u4e24\u5206\u949f
</td>
</tr>
</table>

## 9.取得Java变量的默认值

参考：[Java变量的默认值和初始化](https://www.cnblogs.com/slyfox/p/9703910.html)
<font color=#999AAA >代码如下：</font>
```java
public class Test {

    int i;
    long l;
    boolean b;
    float f;
    double d;
    char c;
    String s;
    Object o;
    int[] ints;

    public void printAll() {
        System.out.println("Java各数据类型的初始值如下\n" +
                "int:" + i + "\n" +
                "long:" + l + "\n" +
                "boolean:" + b + "\n" +
                "float:" + f + "\n" +
                "double:" + d + "\n" +
                "char:" + c + "\n" +
                "String:" + s + "\n" +
                "Object:" + o + "\n" +
                "int[]:" + ints + "\n"
        );
    }

    public static void main(String[] args){
        Test t = new Test();
        t.printAll();
    }
}
```
<font color=#999AAA >运行结果如下：</font>
<table>
<tr>
<td align="left">
<font size='3'>Java各数据类型的初始值如下<br>
<font size='3'>int：0<br>
<font size='3'>long：0<br>
<font size='3'>boolean：false<br>
<font size='3'>float：0.0<br>
<font size='3'>double：0.0<br>
<font size='3'>char: &nbsp;<br>
<font size='3'>String：null<br>
<font size='3'>Object：null<br>
<font size='3'>int[]：null<br>
</td>
</tr>
</table>

**char的默认值是：\u0000(即NULL)**

## 10.编程解决数学问题

**“计算3个10以内的数字，与合计值相除后，商的第3位小数大于4，共有多少个数的组合满足条件”类似问题**

**求与合计相除，小数位大于4的数字组合**

1 + 3 + 4 + 9 = 17
1 / 17 ≈ 0.05882
3 / 17 ≈ 0.17647
4 / 17 ≈ 0.23529
9 / 17 ≈ 0.52941
可以发现，每一个商的第三位都是大于等于5的数，四舍五入后会进位。
下面的程序可以生成符合这样条件的数据。
```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;
import java.util.stream.IntStream;

public class Calculator {

	private enum COMPAREMOD {
		DAYU, DENGYU, XIAOYU
	}

	public Calculator() {
		// 第几位小数
		int bdNum1 = 3;
		// 大于等于小于 数字几
		int bdNum2 = 4;

		// 计算100次，任意三个100以内的数，共有多少个数满足条件，与合计值相除后，商的第3位小数大于4
		// doHalfAdjustRandom(100, bdNum1, bdNum2, COMPAREMOD.DAYU);

		// 计算3个10以内的数字，共有多少个数满足条件，与合计值相除后，商的第3位小数大于4。
		int max = 9;
		int count = 0;
		for (int i = 1; i <= max; i++) {
			for (int j = 1; j <= max; j++) {
				for (int k = 1; k <= max; k++) {
					if (doHalfAdjustRecycle2(bdNum1, bdNum2, COMPAREMOD.DAYU, i, j, k)) {
						count += 1;
					}
				}
			}
		}
		if (count != 0) {
			System.out.println("恭喜你，找到了" + count + "个这样的数！");
		} else {
			System.out.println("很遗憾，没找到！");
		}

		count = 0;
		// 计算4个10以内的数字，共有多少个数满足条件，与合计值相除后，商的第3位小数大于4。
		for (int i = 1; i <= 32767; i++) {
			if (doHalfAdjustRecycle2(bdNum1, bdNum2, COMPAREMOD.DAYU, i, i + 1, i + 2, i + 3)) {
				count += 1;
			}
		}
		if (count != 0) {
			System.out.println("恭喜你，找到了" + count + "个这样的数！");
		} else {
			System.out.println("很遗憾，没找到！");
		}
	}

	/**
	 * 通过targetRecycle次运算，任意三个随机数，计算它们分别与合计的值进行除算，得到的商中满足条件的组合。
	 * 
	 * @param targetRecycle   随机循环次数
	 * @param compareNumIndex 第几位小数
	 * @param comparedNum     和哪个数字进行比较
	 * @param mode            比较是大于等于还是等于
	 * @return
	 */
	private boolean doHalfAdjustRandom(int targetRecycle, int compareNumIndex, int comparedNum, COMPAREMOD mode) {
		return doHalfAdjustRecycleRandom(targetRecycle, 0, compareNumIndex, comparedNum, mode);
	}

	/**
	 * @param targetRecycle   随机循环次数
	 * @param currentRecycle  随机循环当前次数
	 * @param compareNumIndex 第几位小数
	 * @param comparedNum     和哪个数字进行比较
	 * @param mode            比较是大于等于还是等于
	 * @return
	 */
	private boolean doHalfAdjustRecycleRandom(int targetRecycle, int currentRecycle, int compareNumIndex,
			int comparedNum, COMPAREMOD mode) {
		BigDecimal zero = new BigDecimal(0);
		BigDecimal num1 = null;
		BigDecimal num2 = null;
		BigDecimal num3 = null;
		try {
			Random r = new Random();
			num1 = new BigDecimal(r.nextInt(100));
			num2 = new BigDecimal(r.nextInt(100));
			num3 = new BigDecimal(r.nextInt(100));
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (num1 == zero || num2 == zero || num3 == zero) {
			return false;
		}

		BigDecimal sum = num1.add(num2).add(num3);

		BigDecimal result1 = num1.divide(sum, 5, RoundingMode.UP);
		BigDecimal result2 = num2.divide(sum, 5, RoundingMode.UP);
		BigDecimal result3 = num3.divide(sum, 5, RoundingMode.UP);

		int locThreshold1 = Integer.parseInt(result1.toString().substring(compareNumIndex + 1, compareNumIndex + 2));
		int locThreshold2 = Integer.parseInt(result2.toString().substring(compareNumIndex + 1, compareNumIndex + 2));
		int locThreshold3 = Integer.parseInt(result3.toString().substring(compareNumIndex + 1, compareNumIndex + 2));
		if (compare(comparedNum, mode, locThreshold1, locThreshold2, locThreshold3)) {
			System.out.println(num1 + "+" + num2 + "+" + num3 + "=" + sum);
			System.out.println(num1 + "/" + sum + "=" + result1.toString().substring(0, compareNumIndex + 2));
			System.out.println(num2 + "/" + sum + "=" + result2.toString().substring(0, compareNumIndex + 2));
			System.out.println(num3 + "/" + sum + "=" + result3.toString().substring(0, compareNumIndex + 2));
			System.out.println("****************\n");
			// return true;
		}

		if (targetRecycle == currentRecycle) {
			System.out.println("计算结束");
			return false;
		} else {
			return doHalfAdjustRecycleRandom(targetRecycle, currentRecycle + 1, compareNumIndex, comparedNum, mode);
		}
	}

	/**
	 * 指定任意个数的数字，计算它们分别与合计的值进行除算，得到的商中满足条件的组合。
	 * 
	 * @param targetRecycle   随机循环次数
	 * @param currentRecycle  随机循环当前次数
	 * @param compareNumIndex 第几位小数
	 * @param comparedNum     和哪个数字进行比较
	 * @param mode            比较是大于等于还是等于
	 * @return
	 */
	private boolean doHalfAdjustRecycle2(int compareNumIndex, int comparedNum, COMPAREMOD mode, int... numParamArray) {

		// numParamArray的合计
		BigDecimal sum = new BigDecimal(IntStream.of(numParamArray).sum());

		// 商的集合
		BigDecimal[] thres = new BigDecimal[numParamArray.length];
		for (int i = 0; i < thres.length; i++) {

			// 求每一个数除以合计的商，第compareNumIndex+3位小数四舍五入。
			thres[i] = new BigDecimal(numParamArray[i]).divide(sum, compareNumIndex + 3, RoundingMode.FLOOR);

			// 求第compareNumIndex位小数
			int locThreshold = Integer
					.parseInt(thres[i].toString().substring(compareNumIndex + 1, compareNumIndex + 2));

			// 如果第compareNumIndex位的小数值不满足要求，则返回false，终止程序
			if (!compare(comparedNum, mode, locThreshold)) {
				return false;
			}
		}

		for (int i = 0; i < numParamArray.length; i++) {
			System.out.println(
					numParamArray[i] + "/" + sum + "≈" + thres[i].toString().substring(0, compareNumIndex + 2));
		}
		System.out.println("****************\n");
		return true;
	}

	/**
	 * num与comparedNum做比较
	 * 
	 * @param comparedNum 正整数
	 * @param mode        比较模式：大于，等于，小于
	 * @param num         正整数
	 * @return
	 */
	private boolean compare(int comparedNum, COMPAREMOD mode, int... numParamArray) {
		for (int i = 0; i < numParamArray.length; i++) {
			int compareSrc = numParamArray[i];
			if (mode == COMPAREMOD.DAYU) {
				if (compareSrc <= comparedNum)
					return false;
			} else if (mode == COMPAREMOD.DENGYU) {
				if (compareSrc != comparedNum)
					return false;
			} else {
				if (compareSrc >= comparedNum)
					return false;
			}
		}
		return true;
	}

	public static void main(String[] args) {
		Calculator c = new Calculator();
	}

}
```

**计算结果**
>1/6≈0.166
>
>1/6≈0.166
>
>4/6≈0.666
>
>****************
>
>
>
>1/6≈0.166
>
>4/6≈0.666
>
>1/6≈0.166
>
>****************
>
>
>
>1/13≈0.076
>
>4/13≈0.307
>
>8/13≈0.615
>
>****************
>
>
>
>1/15≈0.066
>
>7/15≈0.466
>
>7/15≈0.466
>
>****************
>
>
>
>1/13≈0.076
>
>8/13≈0.615
>
>4/13≈0.307
>
>****************
>
>
>
>2/7≈0.285
>
>2/7≈0.285
>
>3/7≈0.428
>
>****************
>
>
>
>2/12≈0.166
>
>2/12≈0.166
>
>8/12≈0.666
>
>****************
>
>
>
>2/7≈0.285
>
>3/7≈0.428
>
>2/7≈0.285
>
>****************
>
>
>
>2/12≈0.166
>
>5/12≈0.416
>
>5/12≈0.416
>
>****************
>
>
>
>2/16≈0.125
>
>7/16≈0.437
>
>7/16≈0.437
>
>****************
>
>
>
>2/12≈0.166
>
>8/12≈0.666
>
>2/12≈0.166
>
>****************
>
>
>
>3/7≈0.428
>
>2/7≈0.285
>
>2/7≈0.285
>
>****************
>
>
>
>3/16≈0.187
>
>6/16≈0.375
>
>7/16≈0.437
>
>****************
>
>
>
>3/16≈0.187
>
>7/16≈0.437
>
>6/16≈0.375
>
>****************
>
>
>
>4/6≈0.666
>
>1/6≈0.166
>
>1/6≈0.166
>
>****************
>
>
>
>4/13≈0.307
>
>1/13≈0.076
>
>8/13≈0.615
>
>****************
>
>
>
>4/14≈0.285
>
>4/14≈0.285
>
>6/14≈0.428
>
>****************
>
>
>
>4/15≈0.266
>
>4/15≈0.266
>
>7/15≈0.466
>
>****************
>
>
>
>4/17≈0.235
>
>4/17≈0.235
>
>9/17≈0.529
>
>****************
>
>
>
>4/14≈0.285
>
>5/14≈0.357
>
>5/14≈0.357
>
>****************
>
>
>
>4/14≈0.285
>
>6/14≈0.428
>
>4/14≈0.285
>
>****************
>
>
>
>4/15≈0.266
>
>7/15≈0.466
>
>4/15≈0.266
>
>****************
>
>
>
>4/13≈0.307
>
>8/13≈0.615
>
>1/13≈0.076
>
>****************
>
>
>
>4/17≈0.235
>
>9/17≈0.529
>
>4/17≈0.235
>
>****************
>
>
>
>5/12≈0.416
>
>2/12≈0.166
>
>5/12≈0.416
>
>****************
>
>
>
>5/14≈0.357
>
>4/14≈0.285
>
>5/14≈0.357
>
>****************
>
>
>
>5/12≈0.416
>
>5/12≈0.416
>
>2/12≈0.166
>
>****************
>
>
>
>5/14≈0.357
>
>5/14≈0.357
>
>4/14≈0.285
>
>****************
>
>
>
>6/16≈0.375
>
>3/16≈0.187
>
>7/16≈0.437
>
>****************
>
>
>
>6/14≈0.428
>
>4/14≈0.285
>
>4/14≈0.285
>
>****************
>
>
>
>6/19≈0.315
>
>6/19≈0.315
>
>7/19≈0.368
>
>****************
>
>
>
>6/21≈0.285
>
>6/21≈0.285
>
>9/21≈0.428
>
>****************
>
>
>
>6/16≈0.375
>
>7/16≈0.437
>
>3/16≈0.187
>
>****************
>
>
>
>6/19≈0.315
>
>7/19≈0.368
>
>6/19≈0.315
>
>****************
>
>
>
>6/21≈0.285
>
>9/21≈0.428
>
>6/21≈0.285
>
>****************
>
>
>
>7/15≈0.466
>
>1/15≈0.066
>
>7/15≈0.466
>
>****************
>
>
>
>7/16≈0.437
>
>2/16≈0.125
>
>7/16≈0.437
>
>****************
>
>
>
>7/16≈0.437
>
>3/16≈0.187
>
>6/16≈0.375
>
>****************
>
>
>
>7/15≈0.466
>
>4/15≈0.266
>
>4/15≈0.266
>
>****************
>
>
>
>7/16≈0.437
>
>6/16≈0.375
>
>3/16≈0.187
>
>****************
>
>
>
>7/19≈0.368
>
>6/19≈0.315
>
>6/19≈0.315
>
>****************
>
>
>
>7/15≈0.466
>
>7/15≈0.466
>
>1/15≈0.066
>
>****************
>
>
>
>7/16≈0.437
>
>7/16≈0.437
>
>2/16≈0.125
>
>****************
>
>
>
>8/13≈0.615
>
>1/13≈0.076
>
>4/13≈0.307
>
>****************
>
>
>
>8/12≈0.666
>
>2/12≈0.166
>
>2/12≈0.166
>
>****************
>
>
>
>8/13≈0.615
>
>4/13≈0.307
>
>1/13≈0.076
>
>****************
>
>
>
>8/26≈0.307
>
>9/26≈0.346
>
>9/26≈0.346
>
>****************
>
>
>
>9/17≈0.529
>
>4/17≈0.235
>
>4/17≈0.235
>
>****************
>
>
>
>9/21≈0.428
>
>6/21≈0.285
>
>6/21≈0.285
>
>****************
>
>
>
>9/26≈0.346
>
>8/26≈0.307
>
>9/26≈0.346
>
>****************
>
>
>
>9/26≈0.346
>
>9/26≈0.346
>
>8/26≈0.307
>
>****************
>
>
>
>恭喜你，找到了51个这样的数！
>
>很遗憾，没找到！
>
>

**连续数字的验证**

使用下面的程序，可以使用更大的数据去验证，是否存在连续的数字符合这样的计算方式。**
执行结果是没有找到，大概率是不存在的。
```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;
import java.util.stream.IntStream;

public class Calculator2 {

	private enum COMPAREMOD {
		DAYU, DENGYU, XIAOYU
	}

	public Calculator2() {
		// 第几位小数
		int bdNum1 = 3;
		// 大于等于小于 数字几
		int bdNum2 = 4;

		boolean blrst = false;
		int count = 0;
		// 计算4个10以内的数字，共有多少个数满足条件，与合计值相除后，商的第3位小数大于4。
		for (BigDecimal i = new BigDecimal(1); i.compareTo(new BigDecimal("1000000000000")) != -1; i
				.add(new BigDecimal(1))) {
			BigDecimal n0 = i.add(new BigDecimal(0));
			BigDecimal n1 = i.add(new BigDecimal(1));
			BigDecimal n2 = i.add(new BigDecimal(2));
			BigDecimal n3 = i.add(new BigDecimal(3));
			BigDecimal n4 = i.add(new BigDecimal(4));
			BigDecimal n5 = i.add(new BigDecimal(5));
			BigDecimal n6 = i.add(new BigDecimal(6));
			BigDecimal n7 = i.add(new BigDecimal(7));
			BigDecimal n8 = i.add(new BigDecimal(8));
			BigDecimal n9 = i.add(new BigDecimal(9));
			if (doHalfAdjustRecycle2(bdNum1, bdNum2, COMPAREMOD.DAYU, n0, n1, n2, n3, n4, n5, n6, n7, n8, n9)) {
				count += 1;
				blrst = true;
			}
		}
		if (blrst) {
			System.out.println("恭喜你，找到了" + count + "个这样的数！");
		} else {
			System.out.println("计算结束，没找到！");
		}
	}

	/**
	 * 指定任意个数的数字，计算它们分别与合计的值进行除算，得到的商中满足条件的组合。
	 * 
	 * @param targetRecycle   随机循环次数
	 * @param currentRecycle  随机循环当前次数
	 * @param compareNumIndex 第几位小数
	 * @param comparedNum     和哪个数字进行比较
	 * @param mode            比较是大于等于还是等于
	 * @return
	 */
	private boolean doHalfAdjustRecycle2(int compareNumIndex, int comparedNum, COMPAREMOD mode,
			BigDecimal... numParamArray) {

		// numParamArray的合计
		// BigDecimal sum = new BigDecimal(IntStream.of(numParamArray).sum());
		BigDecimal sum = new BigDecimal(0);
		for (int i = 0; i < numParamArray.length; i++) {
			sum = sum.add(numParamArray[i]);
		}

		// 商的集合
		BigDecimal[] thres = new BigDecimal[numParamArray.length];
		for (int i = 0; i < thres.length; i++) {

			// 求每一个数除以合计的商，第compareNumIndex+3位小数四舍五入。
			thres[i] = numParamArray[i].divide(sum, compareNumIndex + 3, RoundingMode.FLOOR);

			// 求第compareNumIndex位小数
			BigDecimal locThreshold = new BigDecimal(
					thres[i].toString().substring(compareNumIndex + 1, compareNumIndex + 2));

			// 如果第compareNumIndex位的小数值不满足要求，则返回false，终止程序
			if (!compare(new BigDecimal(comparedNum), mode, locThreshold)) {
				return false;
			}
		}

		for (int i = 0; i < numParamArray.length; i++) {
			System.out.println(
					numParamArray[i] + "/" + sum + "≈" + thres[i].toString().substring(0, compareNumIndex + 2));
		}
		System.out.println("****************\n");
		return true;
	}

	/**
	 * num与comparedNum做比较
	 * 
	 * @param comparedNum 正整数
	 * @param mode        比较模式：大于，等于，小于
	 * @param num         正整数
	 * @return
	 */
	private boolean compare(BigDecimal comparedNum, COMPAREMOD mode, BigDecimal... numParamArray) {
		for (int i = 0; i < numParamArray.length; i++) {
			BigDecimal compareSrc = numParamArray[i];
			if (mode == COMPAREMOD.DAYU) {
				if (compareSrc.compareTo(comparedNum) != 1)
					return false;
			} else if (mode == COMPAREMOD.DENGYU) {
				if (compareSrc.compareTo(comparedNum) != 0)
					return false;
			} else {
				if (compareSrc.compareTo(comparedNum) != -1)
					return false;
			}
		}
		return true;
	}

	public static void main(String[] args) {
		Calculator2 c = new Calculator2();
	}

}

```

## 11.刀杀鸡游戏

开发环境：
操作系统Win10。
[1.下载Java 8，提取码：2bp4](https://pan.baidu.com/s/14cpRwPV3urUBHWYXnLcNQQ) 
[2.下载软件 Eclipse 2020-12，提取码：soft ](https://blog.csdn.net/u011159350/article/details/113704086) 
><font size="5" color="red">[下载本博客的实例工程代码，提取码：rsmt ](https://pan.baidu.com/s/17uQrLd_adOs0OUyoUEBWCg) </font>

### 1 解释
#### 1.0 棋子介绍
蓝方：胡蜂、 癞痢、洋枪、老虎、人、刀、鸡、火箭
红方：胡蜂、 癞痢、洋枪、老虎、人、刀、鸡、火箭
#### 1.1  这个版本功能
- 功能1 ，棋局重新开始
- 功能2，同一电脑的游戏客户端，不能启动多个
- 功能3，棋子选择、翻转
- 功能4，棋子移动，只能在规定的16个方格内移动
- 功能5，定义规则吃子，
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则1：自己家的火箭可移动，可吃所有对家棋子，吃子后自爆
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则2：自己家的刀不能移动，只能被自己家的人拿
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则3：自己家的洋枪不能移动，只能被自己家的癞痢拿
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则4：自己家的胡蜂吃对家的癞痢
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则5：自己家的抗枪的癞痢可以吃对家的老虎
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则6：自己家的老虎吃人
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则7：自己家的带刀的人吃对家的鸡
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规则8：自己家的鸡吃对家的胡蜂
#### 1.2 已知故障
##### 问题1
- 棋局如果棋局像下面图片这样，如果红人没有拿刀红方的刀，则永远不能杀对面的鸡；蓝方的癞痢没有拿到蓝方的洋枪，就死了，这时还没有火箭，则蓝方洋枪永远存在不会消失。等等，类似的僵局怎么处理。
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2994f044a12eed73c4d4fa0361c6a5e4.png)
##### 问题2
人拿刀前后和癞痢背枪前后没有在画面上做出区分，应该是“人”和“刀”同时存在，但位置错开，癞痢和洋枪同样。
#### 1.3 期待改善的方向
##### 改善目标1
目前棋子上的图片是从网上截屏得到的，很是丑陋，需要美化棋子按钮的图片
##### 改善目标2
吃子的过程应该有画面变化的特效和声音提示的特效，这个没有做。
##### 改善目标3
这个版本游戏只能自己和自己下，很是无趣。应该增加人机对弈、人人对弈。
##### 改善目标4
主窗体UI也需要改善。
##### 改善目标5
代码需要优化改善，将规则独立开来。可以通过使用新的图片、变更棋盘横竖线的数量、吃子规则，然后就能成为新的怀旧棋牌游戏。
### 2 效果
#### 2.1.刚启动
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f7f68879f444b4dc40236c48b3675b94.png)
#### 2.2.点击棋牌
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2ec286f07c14cbe6d0280221952f989a.png)
#### 2.3 吃子
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/16a7357fdb2a3ca8d0e3e2209cab0ec9.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1683bded7517bb480c300c9ac796108e.png)

### 3 代码目录
#### 3.0.代码结构
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8e58b7316be6bb891269ee733ce645a8.png)


#### 3.1.Team.java
```java
package site.jianruibin.kkc;

/**
 * 队伍
 * @author 见瑞彬
 *
 */
public enum Team {
    RED
    ,BLUE
}
```
#### 3.2.ChessSide.java
```java
package site.jianruibin.kkc;

/**
 * 棋牌正反面状态
 * @author 见瑞彬
 *
 */
public enum ChessSide {
    /** 背面 */
    REVERSE_SIDE
    /** 正面 */
    , FRONT_SIDE
}
```
#### 3.3.StartGame.java
```java
package site.jianruibin.kkc;

import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;

import sun.jvmstat.monitor.MonitorException;
import sun.jvmstat.monitor.MonitoredHost;
import sun.jvmstat.monitor.MonitoredVm;
import sun.jvmstat.monitor.MonitoredVmUtil;
import sun.jvmstat.monitor.VmIdentifier;

public class StartGame {

    public static void main(String[] args) throws MonitorException, URISyntaxException {

        // 获取监控主机
        MonitoredHost local = MonitoredHost.getMonitoredHost("localhost");
        // 取得所有在活动的虚拟机集合
        Set<?> vmlist = new HashSet<Object>(local.activeVms());
        // 遍历集合，输出PID和进程名
        int startCount = 0;
        for (Object process : vmlist) {
            MonitoredVm vm = local.getMonitoredVm(new VmIdentifier("//" + process));
            // 获取类名
            String processname = MonitoredVmUtil.mainClass(vm, true);
            if (processname.contains("site.jianruibin.kkc.StartGame")) {
                startCount++;
            }
            // System.out.println(process + " ------> " + processname);
        }

        // 防止多个客户端被启动
        if (startCount <= 1) {
            GameWindow gw = new GameWindow();
            gw.showWindow();
        } else {
            System.out.println("重复启动了");
        }
    }

}
```
#### 3.4.GameWindow.java

```java
package site.jianruibin.kkc;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionAdapter;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class GameWindow extends JFrame implements ActionListener {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public static int GAME_WINDOW_WIDTH = 700;
    public static int GAME_WINDOW_HEIGHT = 655;

    /** 重开按钮 */
    private JButton restartBtn = null;
    /** 关闭按钮 */
    JButton closeBtn = null;
    JLabel titleLbl = null;

    ChessBoard panel = null;

    private Point mouseMoveStartPoint = null;

    JFrame client = null;

    public void showWindow() {
        // 大小宽高
        this.setSize(GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
        // 位置居中
        this.setLocationRelativeTo(null);

        // 添加网格按钮面板
        panel = new ChessBoard();
        this.add(panel, BorderLayout.CENTER);

        titleLbl = new JLabel("刀杀鸡");
        Font font = new Font("Dialog",Font.BOLD,25);
        titleLbl.setFont(font);
        titleLbl.setBounds(GameWindow.GAME_WINDOW_WIDTH - 120, 20, 100, 40);
        panel.add(titleLbl);

        // 重新开始按钮
        restartBtn = new JButton("重新开始");
        restartBtn.setFocusPainted(false);
        restartBtn.setBorderPainted(false);
        restartBtn.setBackground(Color.WHITE);
        restartBtn.addActionListener(this);
        restartBtn.setBounds(GameWindow.GAME_WINDOW_WIDTH - 120, 80, 100, 40);
        restartBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mouseEntered(e);
                setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            }
        });
        panel.add(restartBtn);

        // 添加关闭事件
        closeBtn = new JButton("关闭");
        closeBtn.setFocusPainted(false);
        closeBtn.setBorderPainted(false);
        closeBtn.setBackground(Color.WHITE);
        closeBtn.setBounds(GameWindow.GAME_WINDOW_WIDTH - 120, 140, 100, 40);
        closeBtn.addActionListener(this);
        closeBtn.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mouseEntered(e);
                setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            }
        });
        panel.add(closeBtn);

        client = this;

        this.addMouseMotionListener(new MouseMotionAdapter() {

            @Override
            public void mouseDragged(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mouseDragged(e);

                Point mouseMoveEndPoint = getMousePosition();
                if (mouseMoveEndPoint == null) {
                    return;
                }
                double nowx = mouseMoveEndPoint.getX() - mouseMoveStartPoint.getX() + client.getX();
                double nowy = mouseMoveEndPoint.getY() - mouseMoveStartPoint.getY() + client.getY();
                client.setLocation(new Point((int) nowx, (int) nowy));

            }

        });

        this.addMouseListener(new MouseAdapter() {

            @Override
            public void mousePressed(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mousePressed(e);

                mouseMoveStartPoint = getMousePosition();
            }

            @Override
            public void mouseEntered(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mouseEntered(e);
                setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
            }

        });

        // 宽高不可改动
        this.setResizable(false);
        // 无边框
        this.setUndecorated(true);
        // 设定关闭事件
        this.setDefaultCloseOperation(3);
        this.setVisible(true);
        this.validate();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 重新开始按钮点击事件
        if (e.getSource() == restartBtn) {
            // 更新画面
            this.remove(panel);
            panel = new ChessBoard();
            panel.add(restartBtn);
            panel.add(closeBtn);
            panel.add(titleLbl);
            this.add(panel, BorderLayout.CENTER);
            this.revalidate();
        } else if (e.getSource() == closeBtn) {
            System.exit(0);
        }
    }
}

```
#### 3.5.Command.java

```java
package site.jianruibin.kkc;

public class Command {

    public static long OpNo;

    public static void send(String command, String chessBoardCoord, Chess chess) {
        command = command.toLowerCase();

        System.out.print("操作编号[" + OpNo + "]");

        switch (command) {
        case "start":
            System.out.println(" 开始");
            break;
        case "end":
            System.out.println(" 结束");
            System.out.println();
            break;
        case "choose":
            System.out.print(" 选择");
            System.out.print(" "+chess.getTeam()+"棋子[" + chess.getChessName()+"]");
            System.out.println();
            break;
        case "reset":
            System.out.print(" "+chess.getTeam()+"棋子[" + chess.getChessName()+"]");
            System.out.print(" 位置复原");
            System.out.println();
            break;
        case "remove":
            System.out.print(" 棋盘[" + chessBoardCoord+"]");
            System.out.print(" 移除");
            System.out.print(" "+chess.getTeam()+"棋子[" + chess.getChessName()+"]");
            System.out.println();
            break;
        case "add":
            System.out.print(" 棋盘[" + chessBoardCoord+"]");
            System.out.print(" 添加");
            System.out.print(" "+chess.getTeam()+"棋子[" + chess.getChessName()+"]");
            System.out.println();
            break;
        default:
            System.out.println();
            break;
        }

    }
}

```
#### 3.6.ChessBoard.java

```java
package site.jianruibin.kkc;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.util.Random;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 * 棋盘类
 * @author jerrybin
 *
 */
public class ChessBoard extends JPanel {
    private static final long serialVersionUID = 1L;

    /** 棋子宽(像素) */
    public static final int CHESS_WIDTH = 80;
    /** 棋子高(像素) */
    public static final int CHESS_HEIGHT = 109;
    /** 棋盘线宽度(像素) */
    public static final int CHESSBOARD_LINE_WITH = 15;
    /** 棋盘水平位置(像素) */
    public static final int CHESSBOARD_HORIZONTAL_PX = 25;
    /** 棋盘垂直位置(像素) */
    public static final int CHESSBOARD_VERTICAL_PX = 45;

    /** 棋子矩阵 */
    public static Chess[][] chessCoordinateMatrix;

    /** 棋子位置矩阵(像素) */
    public static Point[][] chessLocationMatrix;

    /** 被选中的棋子的位置(坐标X)行 1-4 */
    public static int selectedChessRowNo;

    /** 被选中的棋子的位置(坐标Y)列 1-4 */
    public static int selectedChessColNo;

    /** 被选中的棋子的位置(像素X) */
    public static int selectedChessLocationX;

    /** 被选中的棋子的位置(像素Y) */
    public static int selectedChessLocationY;

    public ChessBoard() {

        // 棋子矩阵
        chessCoordinateMatrix = new Chess[4][4];
        chessLocationMatrix = new Point[4][4];
        // 设置布局
        this.setLayout(null);

        // 随机生成16个数，用于随机每个位置的棋子身份
        int[] randChessIdArray = randomNumber16();

        int k = 0;
        // 第1行到第4行循环
        for (int rowNo = 1; rowNo <= 4; rowNo++) {
            // 第1列到第4列循环
            for (int colNo = 1; colNo <= 4; colNo++) {

                // 依次获取当前棋子ID
                int heroid = randChessIdArray[k];
                // 为随机ID的数组计数
                k++;

                // 初始化网格按钮
                switch (heroid) {
                case 0:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "胡蜂");
                    break;
                case 1:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "癞痢");
                    break;
                case 2:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "洋枪");
                    break;
                case 3:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "老虎");
                    break;
                case 4:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "人");
                    break;
                case 5:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "刀");
                    break;
                case 6:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "鸡");
                    break;
                case 7:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.RED, "火箭");
                    break;
                case 8:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "胡蜂");
                    break;
                case 9:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "癞痢");
                    break;
                case 10:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "洋枪");
                    break;
                case 11:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "老虎");
                    break;
                case 12:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "人");
                    break;
                case 13:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "刀");
                    break;
                case 14:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "鸡");
                    break;
                case 15:
                    chessCoordinateMatrix[rowNo - 1][colNo - 1] = new Chess(Team.BLUE, "火箭");
                    break;
                }

                int point_x = CHESSBOARD_HORIZONTAL_PX + CHESSBOARD_LINE_WITH * colNo + CHESS_WIDTH * (colNo - 1);
                int point_y = CHESSBOARD_VERTICAL_PX + CHESSBOARD_LINE_WITH * rowNo + CHESS_HEIGHT * (rowNo - 1);

                // 初始化棋子位置(像素)
                chessCoordinateMatrix[rowNo - 1][colNo - 1].setBounds(point_x, point_y, CHESS_WIDTH, CHESS_HEIGHT);
                // 记录棋盘上每一个点的位置(像素)
                chessLocationMatrix[rowNo - 1][colNo - 1] = new Point(point_x, point_y);
                // 设定网格按钮(x,y)坐标
                chessCoordinateMatrix[rowNo - 1][colNo - 1].setRowNo(rowNo);
                chessCoordinateMatrix[rowNo - 1][colNo - 1].setColNo(colNo);

                // 设定棋子初始图标
                ImageIcon defaultIcon = new ImageIcon("images/default.jpg");
                chessCoordinateMatrix[rowNo - 1][colNo - 1].setIcon(defaultIcon);

                // 棋盘添加棋子
                this.add(chessCoordinateMatrix[rowNo - 1][colNo - 1]);
            }
        }
    }

    /**
     * 随机生成16个不同的数
     *
     * @return
     */
    private int[] randomNumber16() {
        int[] idGroup = new int[16];
        for (int i = 0; i < 16; i++) {
            while (true) {
                Random rand = new Random();
                int tempid = rand.nextInt(16);
                if (i != 0) {
                    // 随机数是否重复
                    boolean hasSame = false;
                    for (int j = 0; j < i; j++) {
                        if (idGroup[j] == tempid) {
                            hasSame = true;
                            break;
                        }
                    }
                    // 如果不重复，获得新随机数
                    if (!hasSame) {
                        idGroup[i] = tempid;
                        break;
                    }
                } else {
                    idGroup[i] = tempid;
                    break;
                }
            }
        }
        return idGroup;
    }

    @Override
    public void paint(Graphics g) {
        super.paint(g);

        // 绘制棋盘线
        g.setColor(Color.getHSBColor(0, 0, 0));
        // 水平线1
        g.fillRect(CHESSBOARD_HORIZONTAL_PX, CHESSBOARD_VERTICAL_PX, CHESS_WIDTH * 4 + CHESSBOARD_LINE_WITH * 5, CHESSBOARD_LINE_WITH);
        // 水平线2
        g.fillRect(CHESSBOARD_HORIZONTAL_PX, CHESSBOARD_VERTICAL_PX + CHESSBOARD_LINE_WITH + CHESS_HEIGHT, CHESS_WIDTH * 4 + CHESSBOARD_LINE_WITH * 5, CHESSBOARD_LINE_WITH);
        // 水平线3
        g.fillRect(CHESSBOARD_HORIZONTAL_PX, CHESSBOARD_VERTICAL_PX + CHESSBOARD_LINE_WITH * 2 + CHESS_HEIGHT * 2, CHESS_WIDTH * 4 + CHESSBOARD_LINE_WITH * 5, CHESSBOARD_LINE_WITH);
        // 水平线4
        g.fillRect(CHESSBOARD_HORIZONTAL_PX, CHESSBOARD_VERTICAL_PX + CHESSBOARD_LINE_WITH * 3 + CHESS_HEIGHT * 3, CHESS_WIDTH * 4 + CHESSBOARD_LINE_WITH * 5, CHESSBOARD_LINE_WITH);
        // 水平线5
        g.fillRect(CHESSBOARD_HORIZONTAL_PX, CHESSBOARD_VERTICAL_PX + CHESSBOARD_LINE_WITH * 4 + CHESS_HEIGHT * 4, CHESS_WIDTH * 4 + CHESSBOARD_LINE_WITH * 5, CHESSBOARD_LINE_WITH);

        // 垂直线1
        g.fillRect(CHESSBOARD_HORIZONTAL_PX, CHESSBOARD_VERTICAL_PX, CHESSBOARD_LINE_WITH, CHESS_HEIGHT * 4 + CHESSBOARD_LINE_WITH * 5);
        // 垂直线2
        g.fillRect(CHESSBOARD_HORIZONTAL_PX + CHESSBOARD_LINE_WITH * 1 + CHESS_WIDTH * 1, CHESSBOARD_VERTICAL_PX, CHESSBOARD_LINE_WITH, CHESS_HEIGHT * 4 + CHESSBOARD_LINE_WITH * 5);
        // 垂直线3
        g.fillRect(CHESSBOARD_HORIZONTAL_PX + CHESSBOARD_LINE_WITH * 2 + CHESS_WIDTH * 2, CHESSBOARD_VERTICAL_PX, CHESSBOARD_LINE_WITH, CHESS_HEIGHT * 4 + CHESSBOARD_LINE_WITH * 5);
        // 垂直线4
        g.fillRect(CHESSBOARD_HORIZONTAL_PX + CHESSBOARD_LINE_WITH * 3 + CHESS_WIDTH * 3, CHESSBOARD_VERTICAL_PX, CHESSBOARD_LINE_WITH, CHESS_HEIGHT * 4 + CHESSBOARD_LINE_WITH * 5);
        // 垂直线5
        g.fillRect(CHESSBOARD_HORIZONTAL_PX + CHESSBOARD_LINE_WITH * 4 + CHESS_WIDTH * 4, CHESSBOARD_VERTICAL_PX, CHESSBOARD_LINE_WITH, CHESS_HEIGHT * 4 + CHESSBOARD_LINE_WITH * 5);

        ImageIcon img = new ImageIcon("images/chessboard_background.jpg");
        JLabel imgLabel = new JLabel(img);// 将背景图放在标签里
        this.add(imgLabel, new Integer(Integer.MIN_VALUE));// 注意这里是关键，将背景标签添加到jfram的LayeredPane面板里。
        imgLabel.setBounds(0, 0, img.getIconWidth(), img.getIconHeight());// 设置背景标签的

    }

    public void setTopShow(Chess chess) {
        int index = 0;
        for (int i = 0; i < this.getComponentCount(); i++) {
            Chess c = (Chess) this.getComponent(i);
            if (c != chess) {
                this.remove(c);
                this.add(c, index);
                index++;
            }
        }
        this.remove(chess);
        this.add(chess, index);
    }
}

```
#### 3.7.Chess.java

```java
package site.jianruibin.kkc;

import java.awt.Cursor;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionAdapter;

import javax.swing.ImageIcon;
import javax.swing.JButton;

/**
 * 棋子类
 *
 * @author jerrybin
 *
 */
public class Chess extends JButton {
    private static final long serialVersionUID = -127991826054850950L;

    private static String HUFENG_1 = "胡蜂";

    private static String LALI_2 = "癞痢";

    private static String YANGQIANG_3 = "洋枪";

    private static String LAOHU_4 = "老虎";

    private static String REN_5 = "人";

    private static String DAO_6 = "刀";

    private static String JI_7 = "鸡";

    private static String HUOJIAN_8 = "火箭";

    private boolean haveGun = false;

    private boolean haveDao = false;

    /** 棋子在棋盘中的位置 水平编号 */
    private int rowNo;

    /** 棋子在棋盘中的位置 垂直编号 */
    private int colNo;

    /** 棋子状态 正面/反面 */
    private ChessSide chessSide;;

    /** 队伍 红/蓝 */
    private Team team;

    /** 棋子名称 */
    private String chessName;

    /** 全局对象 */
    private Chess myChess;

    /** 鼠标按下时在棋盘上的像素位置 */
    Point mousePressLocationOnChessBoard = null;

    /** 鼠标按下时在棋子上的像素位置 */
    Point mousePressLocationOnChess = null;

    /** 鼠标抬起时在棋盘上的像素位置 */
    Point mouseReleaseLocationOnChessBoard = null;

    /** 左侧可落子区域 */
    Rectangle leftChessRect;

    /** 右侧可落子区域 */
    Rectangle rightChessRect;

    /** 上侧可落子区域 */
    Rectangle topChessRect;

    /** 下侧可落子区域 */
    Rectangle bottomChessRect;

    /** 鼠标抬起时的棋盘X位置(像素) */
    private int releaseLocationX;

    /** 鼠标抬起时的棋盘Y位置(像素) */
    private int releaseLocationY;

    public Chess(Team team, String chessName) {
        this.setFocusable(false);
        this.setBorderPainted(false);

        // 反面状态设定
        this.chessSide = ChessSide.REVERSE_SIDE;
        // 红蓝队伍设定
        this.team = team;
        // 棋子名称设定
        this.chessName = chessName;

        // 设定自己为全局对象
        myChess = this;

        this.addMouseMotionListener(new MouseMotionAdapter() {

            // 拖拽棋子事件
            @Override
            public void mouseDragged(MouseEvent e) {
                super.mouseDragged(e);

                // 如果棋子正面显示，可拖拽
                if (myChess.getButtonState() == ChessSide.FRONT_SIDE) {

                    // 棋子移动
                    int nowx = e.getX() - (int) mousePressLocationOnChess.getX() + myChess.getX();
                    int nowy = e.getY() - (int) mousePressLocationOnChess.getY() + myChess.getY();
                    myChess.setLocation(nowx, nowy);
                }
            }
        });

        this.addMouseListener(new MouseAdapter() {

            // 获取按下时位置
            @Override
            public void mousePressed(MouseEvent e) {
                super.mousePressed(e);

                Command.OpNo = System.currentTimeMillis();
                // 鼠标按下时在棋子上的像素位置
                mousePressLocationOnChess = e.getPoint();

                // 被选中棋子在棋盘的位置(坐标)
                ChessBoard.selectedChessRowNo = myChess.getRowNo();
                ChessBoard.selectedChessColNo = myChess.getColNo();
                // 被选中棋子在棋盘的位置(像素)
                ChessBoard.selectedChessLocationX = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1].getX();
                ChessBoard.selectedChessLocationY = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1].getY();
                Command.send("choose", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);

                // 把棋子在棋盘上置顶
                ChessBoard cb = (ChessBoard) myChess.getParent();
                cb.remove(myChess);
                cb.add(myChess, 0);
            }

            @Override
            public void mouseReleased(MouseEvent e) {
                super.mouseReleased(e);

                // 鼠标抬起时在棋盘上的像素位置
                Point mouseReleaseLocationOnChessBoard = myChess.getParent().getMousePosition();
                if (mouseReleaseLocationOnChessBoard == null) {
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                    return;
                }
                if (myChess.chessSide != ChessSide.REVERSE_SIDE) {
                    releaseLocationX = (int) mouseReleaseLocationOnChessBoard.getX();
                    releaseLocationY = (int) mouseReleaseLocationOnChessBoard.getY();
                    calcLocation();
                }
                Command.send("end", null, null);
            }

            @Override
            public void mouseClicked(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mouseClicked(e);

                if (myChess.chessSide == ChessSide.REVERSE_SIDE) {
                    myChess.chessSide = ChessSide.FRONT_SIDE;
                    // 图标设定
                    if (team == Team.RED) {
                        ImageIcon icon = new ImageIcon("images/红_" + chessName + ".jpg");
                        myChess.setIcon(icon);
                    } else {
                        ImageIcon icon = new ImageIcon("images/蓝_" + chessName + ".jpg");
                        myChess.setIcon(icon);
                    }
                }
            }

            @Override
            public void mouseEntered(MouseEvent e) {
                // TODO Auto-generated method stub
                super.mouseEntered(e);
                setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
            }

        });
    }

    /**
     * 位置矫正
     */
    private void calcLocation() {

        // 在棋子上下移动
        if (this.releaseLocationX >= ChessBoard.selectedChessLocationX && this.releaseLocationX <= ChessBoard.selectedChessLocationX + ChessBoard.CHESS_WIDTH) {

            // 选中第一行棋子时
            if (ChessBoard.selectedChessRowNo == 1) {
                // 向下移动
                int y = (int) ChessBoard.chessLocationMatrix[1][ChessBoard.selectedChessColNo - 1].getY();
                if (this.releaseLocationY >= y && this.releaseLocationY <= y + ChessBoard.CHESS_HEIGHT) {
                    move(2, ChessBoard.selectedChessColNo, ChessBoard.selectedChessLocationX, y);
                } else {
                    Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                }
            } else if (ChessBoard.selectedChessRowNo == 4) {
                // 选中第四行棋子时
                // 向上移动
                int y = (int) ChessBoard.chessLocationMatrix[2][ChessBoard.selectedChessColNo - 1].getY();
                if (this.releaseLocationY >= y && this.releaseLocationY <= y + ChessBoard.CHESS_HEIGHT) {
                    move(3, ChessBoard.selectedChessColNo, ChessBoard.selectedChessLocationX, y);
                } else {
                    Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                }
            } else {
                // 向上移动
                int yUP = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 2][ChessBoard.selectedChessColNo - 1].getY();
                int yDown = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo][ChessBoard.selectedChessColNo - 1].getY();
                if (this.releaseLocationY >= yUP && this.releaseLocationY <= yUP + ChessBoard.CHESS_HEIGHT) {
                    move(ChessBoard.selectedChessRowNo - 1, ChessBoard.selectedChessColNo, ChessBoard.selectedChessLocationX, yUP);
                } else if (this.releaseLocationY >= yDown && this.releaseLocationY <= yDown + ChessBoard.CHESS_HEIGHT) {
                    move(ChessBoard.selectedChessRowNo + 1, ChessBoard.selectedChessColNo, ChessBoard.selectedChessLocationX, yDown);
                } else {
                    Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                }
            }

        } else if (this.releaseLocationY >= ChessBoard.selectedChessLocationY && this.releaseLocationY <= ChessBoard.selectedChessLocationY + ChessBoard.CHESS_HEIGHT) {
            // 选中第一列棋子时
            if (ChessBoard.selectedChessColNo == 1) {
                // 向右移动
                int x = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 1][1].getX();
                if (this.releaseLocationX >= x && this.releaseLocationX <= x + ChessBoard.CHESS_WIDTH) {
                    move(ChessBoard.selectedChessRowNo, 2, x, ChessBoard.selectedChessLocationY);
                } else {
                    Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                }
            } else if (ChessBoard.selectedChessColNo == 4) {
                // 选中第四列棋子时
                // 向左移动
                int x = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 1][2].getX();
                if (this.releaseLocationX >= x && this.releaseLocationX <= x + ChessBoard.CHESS_WIDTH) {
                    move(ChessBoard.selectedChessRowNo, 3, x, ChessBoard.selectedChessLocationY);
                } else {
                    Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                }
            } else {
                // 向上移动
                int xLeft = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 2].getX();
                int xRight = (int) ChessBoard.chessLocationMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo].getX();
                if (this.releaseLocationX >= xLeft && this.releaseLocationX <= xLeft + ChessBoard.CHESS_WIDTH) {
                    move(ChessBoard.selectedChessRowNo, ChessBoard.selectedChessColNo - 1, xLeft, ChessBoard.selectedChessLocationY);
                } else if (this.releaseLocationX >= xRight && this.releaseLocationX <= xRight + ChessBoard.CHESS_WIDTH) {
                    move(ChessBoard.selectedChessRowNo, ChessBoard.selectedChessColNo + 1, xRight, ChessBoard.selectedChessLocationY);
                } else {
                    Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                    myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                }
            }
        } else {
            Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
            // 以外场合，棋子位置恢复初期
            myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
        }

    }

    /**
     * 棋子移动
     *
     * @param newRowNo 新位置坐标↓
     * @param newColNo 新位置坐标→
     * @param newx     新位置像素x→
     * @param newy     新位置像素y↓
     */
    public void move(int newRowNo, int newColNo, int newx, int newy) {
        // 获取下一步棋子对象
        Chess nextChess = ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1];
        if (nextChess != null) {
            // 如果该位置棋子正面向上
            if (nextChess.chessSide == ChessSide.FRONT_SIDE) {
                // 如果该位置有对方棋子，则吃掉
                if (nextChess.getTeam() != myChess.getTeam()) {
                    // ************* 规则 **************************
                    // 是否吃对方
                    boolean eatEnemy = false;
                    // 是否杀自己
                    boolean killSelf = false;
                    // 【规则1】如果自己是火箭，则可以吃一切，然后自毁
                    if (Chess.HUOJIAN_8.equals(myChess.getChessName())) {
                        eatEnemy = true;
                        killSelf = true;
                    } else if (Chess.YANGQIANG_3.equals(myChess.getChessName()) || Chess.DAO_6.equals(myChess.getChessName())) {
                        // 【规则2】如果自己是洋枪或刀不能独自移动
                        Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                        myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                    } else if (Chess.HUFENG_1.equals(myChess.getChessName()) && Chess.LALI_2.equals(nextChess.getChessName())) {
                        // 【规则3】胡蜂吃癞痢
                        eatEnemy = true;
                        killSelf = false;
                    } else if (Chess.LALI_2.equals(myChess.getChessName()) && myChess.isHaveGun() && Chess.LAOHU_4.equals(nextChess.getChessName())) {
                        // 【规则4】有洋枪的癞痢吃老虎
                        eatEnemy = true;
                        killSelf = false;
                    } else if (Chess.LAOHU_4.equals(myChess.getChessName()) && Chess.REN_5.equals(nextChess.getChessName())) {
                        // 【规则5】老虎吃人
                        eatEnemy = true;
                        killSelf = false;
                    } else if (Chess.REN_5.equals(myChess.getChessName()) && myChess.isHaveDao() && Chess.JI_7.equals(nextChess.getChessName())) {
                        // 【规则6】带刀的人杀鸡
                        eatEnemy = true;
                        killSelf = false;
                    } else if (Chess.JI_7.equals(myChess.getChessName()) && Chess.HUFENG_1.equals(nextChess.getChessName())) {
                        // 【规则7】鸡吃胡蜂
                        eatEnemy = true;
                        killSelf = false;
                    } else {
                        // 复原位置
                        Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                        myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                    }

                    if (eatEnemy) {
                        eat(newRowNo, newColNo, newx, newy, killSelf);
                    }
                } else {
                    if (Chess.LALI_2.equals(myChess.getChessName()) && Chess.YANGQIANG_3.equals(nextChess.getChessName())) {
                        // 【规则8】癞痢抗洋枪
                        myChess.setHaveGun(true);
                        eat(newRowNo, newColNo, newx, newy, false);
                    } else if (Chess.REN_5.equals(myChess.getChessName()) && Chess.DAO_6.equals(nextChess.getChessName())) {
                        // 【规则9】人拿刀
                        myChess.setHaveDao(true);
                        eat(newRowNo, newColNo, newx, newy, false);

                    } else {
                        // 如果该位置有其他己方棋子，则复原位置
                        Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                        myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
                    }
                }
            } else {
                Command.send("reset", null, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
                // 如果该位置反面向上，则复原位置
                myChess.setLocation(ChessBoard.selectedChessLocationX, ChessBoard.selectedChessLocationY);
            }
        } else {
            Command.send("add", newRowNo + "," + newColNo, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
            Command.send("remove", ChessBoard.selectedChessRowNo + "," + ChessBoard.selectedChessColNo, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
            // 1 .移动到新位置
            myChess.setLocation(newx, newy);
            // 2. 设定新坐标
            myChess.setRowNo(newRowNo);
            myChess.setColNo(newColNo);
            // 3 .更新新位置的棋子
            ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1] = myChess;
            // 4. 清空旧位置的棋子
            ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1] = null;
        }
        myChess.revalidate();
    }

    /**
     * 吃子
     *
     * @param newRowNo 新位置坐标↓
     * @param newColNo 新位置坐标→
     * @param newx     新位置像素x→
     * @param newy     新位置像素y↓
     * @param killSelf 是否自毁
     */
    private void eat(int newRowNo, int newColNo, int newx, int newy, boolean killSelf) {
        ChessBoard cb = (ChessBoard) myChess.getParent();
        if (!killSelf) {
            // 1 .移动到新位置
            myChess.setLocation(newx, newy);
            // 2. 设定新坐标
            myChess.setRowNo(newRowNo);
            myChess.setColNo(newColNo);
            // 3. 棋盘移除目标位置原有棋子
            Command.send("remove", newRowNo + "," + newColNo, ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1]);
            cb.remove(ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1]);
            // 4 .更新新位置的棋子
            Command.send("add", newRowNo + "," + newColNo, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
            ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1] = myChess;
            // 5. 清空旧位置的棋子
            Command.send("remove", ChessBoard.selectedChessRowNo + "," + ChessBoard.selectedChessColNo, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
            ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1] = null;
        } else {
            // 3. 棋盘移除目标位置原有棋子
            Command.send("remove", newRowNo + "," + newColNo, ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1]);
            cb.remove(ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1]);
            cb.remove(myChess);
            // 4 .清空新位置的棋子
            ChessBoard.chessCoordinateMatrix[newRowNo - 1][newColNo - 1] = null;
            // 5. 清空旧位置的棋子
            Command.send("remove", ChessBoard.selectedChessRowNo + "," + ChessBoard.selectedChessColNo, ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1]);
            ChessBoard.chessCoordinateMatrix[ChessBoard.selectedChessRowNo - 1][ChessBoard.selectedChessColNo - 1] = null;
        }
    }

    public Team getTeam() {
        return team;
    }

    public ChessSide getButtonState() {
        return chessSide;
    }

    public void setButtonState(ChessSide buttonState) {
        this.chessSide = buttonState;
    }

    @Override
    protected void paintComponent(Graphics g) {
        // TODO Auto-generated method stub
        super.paintComponent(g);
        // System.out.println("paintComponent");
    }

    @Override
    public void paint(Graphics g) {
        // TODO Auto-generated method stub
        super.paint(g);
        // System.out.println("paint");
    }

    public Rectangle getLeftChessRect() {
        return leftChessRect;
    }

    public void setLeftChessRect(Rectangle leftChessRect) {
        this.leftChessRect = leftChessRect;
    }

    public Rectangle getRightChessRect() {
        return rightChessRect;
    }

    public void setRightChessRect(Rectangle rightChessRect) {
        this.rightChessRect = rightChessRect;
    }

    public Rectangle getTopChessRect() {
        return topChessRect;
    }

    public void setTopChessRect(Rectangle topChessRect) {
        this.topChessRect = topChessRect;
    }

    public Rectangle getBottomChessRect() {
        return bottomChessRect;
    }

    public void setBottomChessRect(Rectangle bottomChessRect) {
        this.bottomChessRect = bottomChessRect;
    }

    public int getRowNo() {
        return rowNo;
    }

    public void setRowNo(int rowNo) {
        this.rowNo = rowNo;
    }

    public int getColNo() {
        return colNo;
    }

    public void setColNo(int colNo) {
        this.colNo = colNo;
    }

    public String getChessName() {
        return chessName;
    }

    public void setChessName(String chessName) {
        this.chessName = chessName;
    }

    public boolean isHaveGun() {
        return haveGun;
    }

    public void setHaveGun(boolean haveGun) {
        this.haveGun = haveGun;
    }

    public boolean isHaveDao() {
        return haveDao;
    }

    public void setHaveDao(boolean haveDao) {
        this.haveDao = haveDao;
    }

}

```
