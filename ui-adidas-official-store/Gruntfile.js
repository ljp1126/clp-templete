var fs = require('fs'),
	path = require('path');

	// 监控引用的less
	function checkForModifiedImports(lessFile, mTime, include) {
		fs.readFile(lessFile, "utf8", function(err, data) {
			var lessDir = path.dirname(lessFile),
				regex = /@import "(.+?)(\.less)?";/g,
				shouldInclude = false,
				match;
			while ((match = regex.exec(data)) !== null) {
				var importFile = lessDir + '/' + match[1] + '.less';
				if (fs.existsSync(importFile)) {
					var stat = fs.statSync(importFile);
					if (stat.mtime > mTime) {
						shouldInclude = true;
						break;
					}
				}
			}
			include(shouldInclude);
		});
	}
	// 监控引用的EJS
	function checkForModifiedEjs(htmlFile, mTime, include) {
		fs.readFile(htmlFile, "utf8", function(err, data) {
			var htmlDir = path.dirname(htmlFile),
				regex = /<%include (.+?)(\.html)? %>/g,
				shouldInclude = false,
				match;
			while ((match = regex.exec(data)) !== null) {
				var ejsFile = htmlDir + '/' + match[1] + '.html';
				if (fs.existsSync(ejsFile)) {
					var stat = fs.statSync(ejsFile);
					if (stat.mtime > mTime) {
						shouldInclude = true;
						break;
					}
				}
			}
			include(shouldInclude);
		});
	}


module.exports = function(grunt) {

	//配置项
	grunt.initConfig({
		//读取package.json的内容，形成个json数据
		pkg: grunt.file.readJSON('package.json')
			//清理
			,
		newer: {
			options: {
				override: function(detail, include) {
					if (detail.task === 'less') {
						checkForModifiedImports(detail.path, detail.time, include);
					} else if (detail.task === 'ejs') {
						checkForModifiedEjs(detail.path, detail.time, include);
					} else {
						include(false);
					}
				}
			}
		},
		clean: {
			build: {
				src: ['./build/*', 'html']
			}
		},
		less: {
			build: {
				options: {
					compress: false,
					yuicompress: false,
					optimization: 2
				},
				files: [{
					expand: true,
					cwd: 'target/css',
					src: ['*.less', '!*副本.less'],
					dest: 'build/css',
					ext: '.css'
				}, {
					expand: true,
					cwd: 'target/modules',
					src: ['**/*.less', '!**/*副本.less'],
					dest: 'build/modules',
					ext: '.css'
				}, {
					'build/guideline/guideline.css': 'target/guideline/guideline.less'
				}]
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			buildLibs: {
				files: [{
					expand: true,
					cwd: './libs/',
					src: ['**/*.css', '!**/*.min.css'],
					dest: './libs/'
				}]
			}
		},
		copy: {
			fonts: {
				files: [{
					expand: true,
					cwd: './target/fonts/',
					src: ['**/*'],
					dest: './build/fonts/'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: './target/images/',
					src: ['**/*'],
					dest: './build/images/'
				}]
			},
			mailtemplate: {
				files: [{
					expand: true,
					cwd: './target/mailtemplate/',
					src: ['**/*'],
					dest: './build/mailtemplate/'
				}]
			},
			libs: {
				files: [{
					expand: true,
					cwd: './libs',
					src: ['**/*'],
					dest: 'build/libs'
				}]
			},
			libsMin: {
				files: [{
					expand: true,
					cwd: './target/libs',
					src: ['**/*'],
					dest: './libs'
				}]
			},
			js: {
				files: [{
					expand: true,
					cwd: 'target/js',
					src: ['**/*'],
					dest: 'build/js'
				}]
			},
			guideline: {
				files: [{
					expand: true,
					cwd: 'target/guideline',
					src: ['**/*', '!**/*.less'],
					dest: 'build/guideline'
				}]
			},
			modules: {
				files: [{
					expand: true,
					cwd: 'target/modules',
					src: ['**/*', '!**/*.less'],
					dest: 'build/modules'
				}]
			}
		},
		ejs: {
			build: {
				options: {
					tpl: function(url) {
						return fs.readFileSync(__dirname + '\\target\\' + url, 'utf8');
					}
				},
				cwd: './target',
				src: ['*.html'],
				dest: './html',
				expand: true,
				ext: '.html'
			}
		},
		uglify: {
			buildLibs: {
				options: {
					mangle: true, //是否混淆变量名
					preserveComments: function(o, m) {
						if (m.pos == 0 && m.col == 0) {
							return true;
						}
					}
				},
				files: [{
					expand: true,
					cwd: './libs/',
					src: ['**/*.js', '!**/*.min.js'],
					dest: './libs/'
				}]
			}
		},
		html_template: {
			options: {
				beautify: {
					indent_size: 4,
					indent_with_tabs: true
				}
			},
			build_html: {
				expand: true,
				cwd: './html',
				src: '**/*.html',
				dest: './build'
			}
		},
		watch: {
			styles: {
				// files: ['target/css/**/*.less', 'target/modules/**/**/*.less'],
				files: ['target/css/**/*.less', 'target/modules/**/**/*.less', 'target/guideline/*.less'],
				tasks: ['newer:less:build'],
				options: {
					nospawn: true
				}
			},
			html: {
				//files: ['target/**/*.html'],
				files: ['target/**/*.html', 'target/guideline/*.html'],
				tasks: ['newer:ejs:build']
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'build/**/*.*',
						'html/**/*.*',
						'target/**/*.*'
					]
				},
				options: {
					watchTask: true,
					notify: false //关闭页面通知
						,
					open: false //启动不打开页面
						,
					server: {
						baseDir: ['./build',
							'./html',
							'./target',
							'./static',
							'./'
						]
					},
					port: 3100,
					ghostMode: {
						clicks: false,
						forms: false,
						scroll: false
					},
					files: ['./build',
						'./html',
						'./target',
						'./static',
						'./',
						'!target/**/*.html',
						'!target/**/*.less'
					]
				}
			}
		}
	});

	// 加载指定插件任务
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-html-template')
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', ['默认全部任务'], [
		'clean:build', 'browserSync', 'ejs:build', 'less:build', 'watch'
	]);

	grunt.registerTask('build', ['build'], [
		'clean:build',
		'ejs:build',
		'html_template',
		'less:build',
		'copy:fonts',
		'copy:images',
		'copy:mailtemplate',
		'copy:libs',
		'copy:js',
		'copy:guideline',
		'copy:modules'
	]);


	grunt.registerTask('libs', ['buildLibs'], [
		'copy:libsMin',
		'uglify:buildLibs',
		'cssmin:buildLibs'
	]);
};
