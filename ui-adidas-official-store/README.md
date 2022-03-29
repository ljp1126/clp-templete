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


## 项目实际使用


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



