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
运行结果如下：

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
    <div style="border:1px">
        <tr><td>name的长度超过了10</td></tr>
        <tr><td>name的长度没有超过10</td></tr>
    </div>
</body>
</html>

