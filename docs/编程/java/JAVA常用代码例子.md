# JAVA常用代码例子

## 文件夹深层遍历

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

## 文件夹单层遍历

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

## 按比例修改PNG图片尺寸

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

