## 项目实际使用
**1. 设计稿：\\10.88.9.23\web前端组\设计稿\AD（首页、plp、pdp。其他页面没设计稿，按toolkit自由发挥）
**2. 项目代码分支：dev-global-style-refresh
**3. guideline访问网址：https://toolkit-adidas-group.netlify.com/adidas/icons  密码：passw0rd  0==零
**4. icon：toolkit里有的就用toolkit里的字体icon，没有的就弄到icon-new.png里
	 用toolkit里字体的icon 请加class：icon-a-font
	 class：icon-a-font 用于区分是调用字体icon 或 icon.png
**5. 改版全站 样式、规范 已toolkit为准
**6. 1024px 走pc端样式
		1024px 走pc端样式
			1024px 走pc端样式
**7. 样式、结构修改
	 结构在原来的html上修改
	 样式新建css，全部新建在 new-style 目录下，用 @import 方式 在原css最底下引入


## 目录介绍

**1. build**
build目录是自动生成的目录，所有项目使用的代码都会在这个目录下，也是开发获取静态页面等的唯一目录。

**2. html**
html目录是自动生成的目录，且不需要提交，格式化页面时使用。

**3. static**
static用于存放项目中的静态资源，且不是静态页面转动态页面时的必须素材，如：活动图片、视频等。

**4. target**
target目录为开发目录，如：html、css、js

	# 存放页面的公共模板
	./_includes

	# 页面的样式
	./css

	# 页面的字体
	./fonts

	# 页面guideline
	./guideline

	# 页面公共图片，如：图标
	./images

	# 页面脚本
	./js

	# 插件库
	./libs

	# 邮件模板
	./mailtemplate

	# 所有页面
	./*.html

## 如何使用

**1. 安装nodejs环境**

**2. 安装淘宝NPM镜像**
	npm install -g cnpm --registry=https://registry.npm.taobao.org
	官网：https://npm.taobao.org/
	安装完成之后，npm 换成 cnpm

**3. 分别安装Grunt，已安装过的可以忽略**
	cnpm install grunt-cli -g

**4. 初始化项目依赖**
	cnpm install

**5. 运行项目**
	* 首次grunt build前先grunt libs下压缩libs，
	  之后可不grunt libs
	* 开发项目执行命令：grunt
	* build项目执行命令：grunt build
	* libs里内容有改变执行命令(压缩libs目录)：grunt libs


## 目录
**modules**
	**_includes/modules**
		公用模块结构
	**css/modules**
		公用模块样式


## 文件
**1.icon.less**
	只能写 icon 的宽、高、坐标
	pc 间距10px
	@2x 间距20px

**2.公共方法**
	utilities.less

**3.公共样式**
	variables.less


** glass-adidas.less修改 **
删除 p{line-height:22px;margin-bottom:16px}
删除 .gl-list,ol,ul{font-size:16px;line-height:22px}
https://toolkit-adidas-group.netlify.com/adidas/static/media/foundations/icon-adidas-customization.a08d4177.svg
路径改为： ../images/icon-adidas-customization.svg
https://toolkit-adidas-group.netlify.com/adidas/static/media/foundations/icon-adidas-personalization.7ec823f3.svg
路径改为： ../images/icon-adidas-personalization.svg

spice 弹层默认按钮 加新样式class
