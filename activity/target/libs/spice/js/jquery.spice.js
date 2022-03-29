/**
 *
 * 共用代码，提供常用事件、方法等
 * 详细用法请参考：http://v3.spice.lh/javascript/spice
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 3.1.0
 *
 */

;
(function($, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory($);
	} else {
		$.spice = factory($);
	}
})(jQuery, function($) {
	// 常用变量
	var ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FuncProto = Function.prototype,
		push = ArrayProto.push,
		slice = ArrayProto.slice,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty,
		nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FuncProto.bind,
		nativeCreate = Object.create,
		nav = navigator,
		ua = nav.userAgent,
		iPad = ua.match(/(iPad).*OS\s([\d_]+)/),
		iPod = ua.match(/(iPod).*OS\s([\d_]+)/i),
		namespace = '.spice',
		hasTouch = !!ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) //('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
		,
		rEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
		rMobile = /^(1[3-9]{1}[0-9]{1})\d{8}$/,
		slice = Array.prototype.slice,
		$window = $(window);

	var spice = function() {
		if (!(this instanceof arguments.callee)) return new spice();
	}

	// 一些常用事件，判断浏览器设备等
	spice.prototype = {
		// 命名空间
		namespace: namespace,
		nav: nav,
		ua: ua
			// IE内核
			,
		trident: ua.indexOf('Trident') > -1
			// opera内核
			,
		presto: ua.indexOf('Presto') > -1
			// 苹果、谷歌内核
			,
		webKit: ua.indexOf('AppleWebKit') > -1
			// 火狐内核
			,
		gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1
			// 是否为移动终端
			,
		mobile: !!ua.match(/AppleWebKit.*Mobile.*/)
			// ios终端
			,
		ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			// android终端或者uc浏览器
			,
		android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
			//, android           : ua.indexOf('Android')!=-1 || ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1 && ua.indexOf('Chrome') >= -1

		// 是否为iPhone或者QQHD浏览器
		,
		iPhone: !iPod && !iPad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
			// 是否iPad
			,
		iPad: iPad,
		iPod: iPod
			// 是否web应该程序，没有头部与底部
			,
		webApp: ua.indexOf('Safari') == -1
			// 检测该环境是否支持touch事件
			,
		hasTouch: hasTouch
			// 常用事件
			,
		mouseenter: hasTouch ? 'touchend' + namespace + ' touchcancel' + namespace : 'mouseenter' + namespace,
		mouseleave: hasTouch ? 'touchend' + namespace + ' touchcancel' + namespace : 'mouseleave' + namespace,
		mousedown: hasTouch ? 'touchstart' + namespace : 'mousedown' + namespace,
		mouseup: hasTouch ? 'touchend' + namespace + ' touchcancel' + namespace : 'mouseup' + namespace,
		mousemove: hasTouch ? 'touchmove' + namespace : 'mousemove' + namespace,
		click: hasTouch ? 'touchend' + namespace + ' touchcancel' + namespace : 'click' + namespace,
		tap: 'tap' + namespace
	}

	var spice = spice();

	// 返回body下最大的zIndex值
	spice.getMaxZIndex = function() {
		return Math.max.apply(null, $('*', document.body).map(function() {
			return $(this).css('zIndex') >>> 0;
		}).get());
	}

	// 获取不同设备下的 event
	// 传入 event 对象，兼容 pc 和 mobile
	spice.getEvent = function(e) {
		return spice.hasTouch ? e.originalEvent.changedTouches : e;
	}

	// 获取当前 event 第一个位置的 x, y
	spice.getEventXY = function(e) {
		var ev = spice.getEvent(e);
		return {
			x: ev.clientX ? ev.clientX : (ev[0] ? ev[0].pageX : 0),
			y: ev.clientY ? ev.clientY : (ev[0] ? ev[0].pageY : 0)
		};
	}

	// 返回字符串的字符长度，一个中文占两个字符长度
	spice.getStringLength = function(str) {
		var num = 0,
			i = 0,
			len = str.length,
			unicode;
		for (; i < len; i++) {
			unicode = str.charCodeAt(i);
			num += unicode > 127 ? 2 : 1;
		}
		return num;
	}

	// 本函数将字符串 str 的第 start 位起的字符串取出 strlen 个字符。
	// 若 start 为负数，则从字符串尾端算起。
	// 若可省略的参数 strlen 存在，但为负数，则表示取到倒数第 strlen 个字符。
	// str 要截取的字符串
	// start 开始点
	// strlen 截取长度
	spice.subString = function(str, start, strlen) {
		var i = 0,
			num = 0,
			unicode, rstr = '',
			len = str.length,
			sblen = spice.getStringLength(str);

		if (start < 0) {
			start = sblen + start;
		}

		if (strlen < 0 || $.type(strlen) != 'number') {
			strlen = ~~strlen + sblen;
		} else {
			strlen += start;
		}

		// 起点
		for (; i < len; i++) {
			if (num >= start) {
				break;
			}
			var unicode = str.charCodeAt(i);
			num += unicode > 127 ? 2 : 1;
		}

		// 开始取
		for (; i < len; i++) {
			var unicode = str.charCodeAt(i);
			num += unicode > 127 ? 2 : 1;

			if (num > strlen) {
				break;
			}

			rstr += str.charAt(i);
		}

		return rstr;
	}

	// 得到url所传参数的值
	spice.getURLParameter = function(key, frame) {
		var param = (frame || window).location.search,
			reg = new RegExp('[&\?]+' + key + '=([^&]*)'),
			str = '';
		if (reg.test(param)) str = RegExp.$1;
		return str;
	}

	// 元素的可视区域
	// elem 元素选择器
	// callback 元素在可视区域的回调函数
	spice.visualArea = function(elem, options) {
		if (!elem || !spice.isString(elem) || $(elem).length == 0) return false;
		var opt = {
			callBack: null,
			num: 0
		}
		opt = $.extend({}, opt, options);
		$window.off('scroll.spice.visualArea').on('scroll.spice.visualArea', function() {
			var $W = $(this);
			if ($W.scrollTop() + $W.height() > $(elem).offset().top - opt.num) {
				opt.callBack && $.isFunction(opt.callBack) && opt.callBack($(elem));
			}
		}).trigger('scroll.spice.visualArea');
	}

	// 获取浏览器滚动条宽度
	spice.getScrollbarWidth = function() {
		if (spice.android || $('body').height() <= $window.height()) {
			return 0;
		} else {
			var p = document.createElement('p'),
				styles = {
					width: '100px',
					height: '100px',
					overflowY: 'scroll'
				},
				i, scrollbarWidth;
			for (i in styles) p.style[i] = styles[i];
			document.body.appendChild(p);
			scrollbarWidth = p.offsetWidth - p.clientWidth;
			$(p).remove();
			return scrollbarWidth;
		}
	}

	// 获取 window 的宽度
	spice.getWindowWidth = function() {
		return $window.width() + spice.getScrollbarWidth();
	}

	// 获取时间戳
	spice.getTimestamp = function() {
		return (new Date()).getTime().toString();
	}

	// 获取Cookie的值
	spice.getCookie = function(cookieName) {
		var getC = document.cookie,
			reg = new RegExp(cookieName + '=([^;]*)');
		var val = '';
		if (reg.test(getC)) {
			val = RegExp.$1;
		}
		return val;
	}

	// 计算毫秒，返回毫秒数
	spice.getDates = function(temer) {
		var timeSize = ['s', 'm', 'h', 'D', 'W', 'M', 'Y'];
		var tl = temer.length;
		var str = {};
		var s = 24 * 60 * 60;
		var sum = 0;
		var arra = temer.match(/\d+\w/g);
		if (arra == null) return false;
		for (var i = 0, l = arra.length; i < l; i++) {
			new RegExp('^(\\d+)([a-z]+)$', 'i').test(arra[i]);
			str[RegExp.$2] = RegExp.$1;
		}
		if (str.s) sum = +str.s;
		if (str.m) sum += +str.m * 60;
		if (str.h) sum += +str.h * 60 * 60;
		if (str.D) sum += +str.D * s;
		if (str.W) sum += +str.W * s * 7;
		if (str.M) sum += +str.M * s * 30;
		if (str.Y) sum += +str.Y * s * 365;
		return sum * 1000;
	}

	// 设置Cookie的方法
	spice.setCookie = function(cookieName, cookieInfo) {
		var str = [];
		// 判断参数类型
		if (typeof cookieInfo == 'string') {
			str = cookieInfo;
		} else {
			if (typeof cookieInfo.values == 'object') {
				for (var o in cookieInfo.values) {
					str.push(o + '=' + cookieInfo.values[o] + '&');
				}
				str = str.join('').slice(0, -1);
			} else {
				str = cookieInfo.values;
			}
		}
		// 判断时间的存在
		var cookieStr = cookieName + '=' + str;
		if (cookieInfo.expires) {
			cookieStr += ';expires=' + new Date(new Date().getTime() + spice.getDates(cookieInfo.expires)).toGMTString();
		}
		if (cookieInfo.path) {
			cookieStr += ';path=' + cookieInfo.path;
		}
		if (cookieInfo.domain) {
			cookieStr += ';domain=' + cookieInfo.domain;
		}
		if (cookieInfo.secure === true) {
			cookieStr += ';secure';
		}
		document.cookie = cookieStr;
	}

	// 删除Cookie的方法
	spice.delCookie = function(cookieName) {
		var getC = document.cookie,
			reg = new RegExp(cookieName + '=[^;]?');
		if (reg.test(getC)) document.cookie = cookieName + '=;expires=' + new Date(-1).toGMTString();
	}

	spice.getTimeUrl = function(url) {
		var iTime = spice.getTimestamp();
		if (url.indexOf('spiceflag=') >= 0) {
			url = url.replace(/spiceflag=\d{13}/, 'spiceflag=' + iTime);
			return url;
		}
		url += (/\?/.test(url)) ? '&' : '?';
		return (url + 'spiceflag=' + iTime);
	}

	// used in building ajax data object from one form
	spice._ajaxSetValue = function(obj, name, value) {
		if (value === null) return;
		var val = obj[name];
		if (spice.isString(val)) {
			obj[name] = [val, value];
		} else if ($.isArray(val)) {
			obj[name].push(value);
		} else {
			obj[name] = value;
		}
	}

	// used in building ajax data object from one form
	spice._ajaxFieldValue = function(domNode) {
		var ret = null,
			type = (domNode.type || '').toLowerCase();
		if (domNode.name && type && !domNode.disabled) {
			if (type === 'radio' || type === 'checkbox') {
				if (domNode.checked) {
					ret = domNode.value
				}
			} else if (domNode.multiple) {
				ret = [];
				$('option', domNode).each(function() {
					if (this.selected) {
						ret.push(this.value);
					}
				});
			} else {
				ret = domNode.value;
			}
		}
		return ret;
	}

	// used in building ajax data object from one form
	spice._ajaxFormToObj = function(form) {
		if (!form) return {};
		form = spice.isString(form) ? $('#' + form).get(0) : form;
		var ret = {},
			exclude = 'file|submit|image|reset|button|';
		$.each(form.elements, function(i, e) {
			var name = e.name,
				type = (e.type || '').toLowerCase();
			if (name && type && exclude.indexOf(type) === -1 && !e.disabled) {
				spice._ajaxSetValue(ret, name, spice._ajaxFieldValue(e));
			}
		});
		return ret;
	}

	spice._ajaxOptions = function(url, data, args) {
		var options = {};
		url = spice.getTimeUrl(url);
		if (arguments.length === 1) {
			options = url;
		} else {
			options = args || {};
			options['url'] = url;
			if (data) {
				if (spice.isString(data)) {
					//data is a form id
					$.extend(options, {
						data: spice._ajaxFormToObj(data)
					});
				} else {
					$.extend(options, {
						data: data
					});
				}
			}
		}
		//console.dir(options);
		return options;
	}

	// 异步请求
	spice.asyncXhr = function(url, data, args) {
		$.ajax(spice._ajaxOptions(url, data, args));
	}

	// ajax call with GET type
	spice.asyncXhrGet = function(url, data, args) {
		var options = spice._ajaxOptions(url, data, args);
		options['type'] = 'GET';
		$.ajax(options);
	}

	// ajax call with POST type
	spice.asyncXhrPost = function(url, data, args) {
		var options = spice._ajaxOptions(url, data, args);
		options['type'] = 'POST';
		$.ajax(options);
	}

	// 同步请求
	spice.syncXhr = function(url, data, args) {
		var _data, options = spice._ajaxOptions(url, data, args);
		$.extend(options, {
			async: false,
			success: function(data, textStatus) {
				_data = data;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				_data = {};
				var exception = {};
				exception['message'] = 'Error occurs when fetching data from url:' + this.url;
				exception['cause'] = textStatus ? textStatus : errorThrown;
				_data['exception'] = exception;
			}
		});
		$.ajax(options);
		return _data;
	}

	// ajax sync call with GET type
	spice.syncXhrGet = function(url, data, args) {
		if (arguments.length === 1) {
			url['type'] = 'GET';
		} else {
			args = $.extend({}, args, {
				type: 'GET'
			});
		}
		return spice.syncXhr(url, data, args);
	}

	// ajax sync call with POST type
	spice.syncXhrPost = function(url, data, args) {
		if (arguments.length === 1) {
			url['type'] = 'POST';
		} else {
			args = $.extend({}, args, {
				type: 'POST'
			});
		}
		return spice.syncXhr(url, data, args);
	}

	// 弹出层
	spice.dialog = function(options) {
		if (options.type && options.type == 2) {
			if (!(this instanceof arguments.callee)) return new spice.dialog(options);
			var self = this;
			var opt = self.opt = $.extend({}, self.defaultOptions, options);
			self.init();
		} else {
			return spice.Dialog(options);
		}
	}
	spice.dialog.prototype = {
		getTemplate: function() {
			var self = this,
				type = self.opt.type,
				title = self.opt.title,
				content = self.opt.content,
				buttons = self.opt.buttons,
				$dialog = $('<div class="dialog">\
								<div class="dialog-container">\
									<div class="dialog-content"><div>' + (title ? ('<h4>' + title + '</h4>') : '') + (content ? ('<p>' + content + '</p>') : '') +
					'</div></div>\
								</div>\
								<i class="icon icon-close dialog-close">&times;</i>\
							</div>');

			if (buttons && $.isPlainObject(buttons)) {
				var $btnGroup = $('<div class="dialog-btn-wrap"></div>');
				$.each(buttons, function(k, v) {
					var btnClass = v.btnClass,
						btnEvent = v.btnEvent,
						btnElem = v.btnElem,
						btnHtml = btnElem || '<a class="btn' + (btnClass ? ' ' + btnClass : '') + '"><span><i></i>' + (k || '') + '</span></a>';
					$btnGroup.append(
						$(btnHtml).on('tap', {
							dialog: self
						}, (btnEvent && $.isFunction(btnEvent) ? btnEvent : (function() {})))
					);
				});
				$('.dialog-content', $dialog).after($btnGroup);
			}
			return $dialog;
		},
		defaultOptions: {
			template: '',
			dialogClass: 'spice-dialog',
			fixed: false,
			title: '',
			content: '',
			buttons: null,
			btnCloseClass: '.dialog-close',
			maskClass: 'spice-dialog-mask',
			maskClose: true,
			showMask: true,
			autoClose: false,
			speed: 500,
			isRemove: true
		},
		_trigger: function(type, o) {
			this.elem.triggerHandler(type, o);
		},
		init: function(options) {
			var self = this,
				opt = self.opt = $.extend({}, self.opt, options);
			// 删除之前的结构
			self.destroy();

			self.elem = self.createElem(opt.template);

			$.each(['initEvent'], function(i, type) {
				$.isFunction(opt[type]) && self.elem.on(type, {
					dialog: self
				}, opt[type]);
			});

			self._trigger('initEvent', [$(self.elem)]);

			self.btnClose = $((opt.btnCloseClass || '.dialog-close'), self.elem);
			if (opt.showMask) {
				self.elemMask = spice.mask();
			}

			self.elemMask && self.elemMask.elem.addClass(opt.maskClass);

			// 触发事件
			self.activate();
			$(self.elem).data('spice.dialog', self);
			return self;
		},
		activate: function() {
			var self = this;
			self.btnClose.on('tap', function() {
				self.hide();
			});
			if (self.opt.maskClose) {
				self.elemMask && self.elemMask.elem.on('tap', function() {
					self.hide();
				});
			}
		},
		refreshPosition: function(spiceDialog) {
			var spiceDialog = spiceDialog || this.elem,
				zIndex = spiceDialog.css('zIndex'),
				display = spiceDialog.css('display'),
				opacity = spiceDialog.css('opacity');

			spiceDialog.removeAttr('style'); //.hide();

			var dW = spiceDialog.outerWidth(true),
				dH = spiceDialog.outerHeight(true),
				cssStyle = {
					marginTop: -dH / 2,
					marginLeft: -dW / 2,
					left: '50%',
					top: '50%',
					position: 'fixed',
					zIndex: zIndex,
					display: display,
					opacity: opacity
				};

			if (!this.opt.fixed) {
				var wSt = $window.scrollTop(),
					wH = $window.height();
				cssStyle.position = 'absolute';
				cssStyle.marginTop = '';
				cssStyle.top = wSt + (wH - dH) / 2;
			}
			if (dH > $window.height()) {
				cssStyle.marginTop = 0;
				if (!this.opt.fixed) {
					cssStyle.top = wSt + 10;
				} else {
					cssStyle.top = 10;
				}
			}
			spiceDialog.css(cssStyle);
		},
		createElem: function(elem) {
			var self = this,
				opt = self.opt;
			var spiceDialog = $(elem || self.getTemplate()).addClass(opt.dialogClass).hide().appendTo('body');
			self.refreshPosition(spiceDialog);
			spiceDialog.css('zIndex', spice.getMaxZIndex() + 2);

			return spiceDialog;
		},
		refreshZIndex: function() {
			this.elem.css('zIndex', spice.getMaxZIndex() + 1);
			return this;
		},
		show: function(callback, speed) {
			var self = this,
				opt = self.opt;
			self.refreshPosition(this.elem);
			self.elem.fadeTo(opt.speed || speed || 0, 1, callback);
			self.elemMask && self.elemMask.show();
			self.elem.css('zIndex', spice.getMaxZIndex() + 2);
			var timeNum = self.opt.autoClose;
			if (spice.isNumber(timeNum)) {
				setTimeout(function() {
					self.hide(function() {
						opt.isRemove && self.destroy();
					});
				}, timeNum);
			}
			return self;
		},
		hide: function(callback, speed) {
			var self = this,
				opt = self.opt;
			self.elem.fadeOut(opt.speed || speed || 0, callback);
			self.elemMask && self.elemMask.hide();
			return self;
		},
		destroy: function() {
			this.elem && this.elem.remove();
			this.elemMask && this.elemMask.remove();
			return this;
		}
	}

	// 遮罩层
	spice.mask = function(options) {
		if (!(this instanceof arguments.callee)) return new spice.mask(options);
		var self = this;
		self.opt = $.extend({}, self.defaultOptions, options);
		self.elem = self.createElem();
		$(self.elem).data('spice.mask', self);
	}
	spice.mask.prototype = {
		defaultOptions: {
			maskClass: '',
			appendTo: '',
			speed: 500
		},
		createElem: function() {
			//var blackOpacity = $('.spice-black-opacity');
			//if(blackOpacity.length == 0){

			return $('<div>', {
					'class': 'spice-black-opacity' + (this.opt.maskClass ? ' ' + this.opt.maskClass : '')
				})
				//.css(this.opt.style)
				.css('zIndex', spice.getMaxZIndex() + 2)
				.appendTo(this.opt.appendTo || 'body');
			// }else{
			//     return blackOpacity;
			// }
		},
		show: function(callback, speed) {
			this.elem.stop(true, true).fadeTo(this.opt.speed || speed || 0, 0.5, callback);
			return this;
		},
		hide: function(callback, speed) {
			this.elem.stop(true, true).fadeOut(this.opt.speed || speed || 0, callback);
			return this;
		},
		setZIndex: function(zIndex) {
			this.elem.css('zIndex', zIndex);
			return this;
		},
		refreshZIndex: function() {
			this.elem.css('zIndex', spice.getMaxZIndex() - 1);
			return this;
		},
		remove: function() {
			this.elem.remove();
			return this;
		}
	}

	// spice.tips = function(options){
	//     function getTemplate(title, content){
	//         var dialog = '<div class="dialog">\
	//                         <div class="dialog-container font-text-center">'
	//                         + (title ? '<h4>' + title + '</h4>' : '')
	//                         + (content ? '<p>' + content + '</p>' : '') +
	//                         '</div>\
	//                         <a class="icon icon-close dialog-close">&times;</a>\
	//                     </div>';
	//         return dialog;
	//     }

	//     var opt = $.extend({}, {
	//             dialogClass: 'dialog-tips'
	//             , title: ''
	//             , content: ''
	//             , time: 1500
	//             , template: ''
	//         }, options)
	//         , tips = spice.dialog({
	//             dialogClass: opt.dialogClass
	//             , fixed: true
	//             , template: opt.template || getTemplate(opt.title, opt.content)
	//         });
	//     tips.show(function(){
	//         setTimeout(function(){
	//             tips.destroy();
	//         }, opt.time);
	//     });
	// }

	// 常用方法
	// spice.isUndefined = function(o){
	//     return o === undefined;
	// }
	// spice.isNull = function(o){
	//     return o === null;
	// }
	// spice.isBoolean = function(o){
	//     return toString.call(o) === '[object Boolean]';
	// }
	// spice.isString = function(o){
	//     return toString.call(o) === '[object String]';
	// }

	// 弹出层
	var spiceDialogNum = -1;
	spice._initScroll = function($elem) {
		spice._removeScroll($elem, function(id) {
			!spice.android && spice.hasTouch && $elem.data('iScroll', new IScroll('#' + id, {
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|IMG)$/
				}
			}));
		});
	}
	spice._removeScroll = function($elem, fn) {
		var id = $elem.attr('id');
		if (window.IScroll && id) {
			var iScrollData = $elem.data('iScroll');
			if (iScrollData) {
				iScrollData.destroy();
			}
			fn && fn(id);
		}
	}
	spice._refreshScroll = function($elem) {
		var id = $elem.attr('id');
		if (window.IScroll && id) {
			var iScrollData = $elem.data('iScroll');
			if (iScrollData) {
				iScrollData.refresh();
			}
		}
	}
	spice.Dialog = function(options) {
		if (!(this instanceof arguments.callee)) return new spice.Dialog(options);
		var self = this;
		var opt = self.opt = $.extend({}, self.defaultOptions, options);
		self.init();
	}
	spice.Dialog.prototype = {
		getTemplate: function(elem) {
			var self = this,
				opt = self.opt,
				type = opt.type,
				title = opt.title,
				content = opt.content,
				showMask = opt.showMask,
				buttons = self.opt.buttons,
				$dialog = $('<div class="dialog-opacity' + (!showMask ? ' dialog-opacity-transparent' : '') + '" id="spice-dialog-' + (++spiceDialogNum) + '">\
									<div class="dialog-scroll-wrap">\
										<div class="dialog-scroll-container">\
											<div class="dialog-scroll">\
												<div>' +
					(elem || '<div class="dialog">\
														<div class="dialog-container">\
															<div class="dialog-content"><div>' + (title ? ('<h4>' + title + '</h4>') : '') + (content ? ('<p>' + content + '</p>') : '') +
						'</div></div>\
														</div>\
														<i class="icon icon-close dialog-close">&times;</i>\
													</div>') + '</div>\
											</div>\
										</div>\
									</div>\
								</div>');
			if (buttons && $.isPlainObject(buttons)) {
				var $btnGroup = $('<div class="dialog-btn-wrap"></div>');
				$.each(buttons, function(k, v) {
					var btnClass = v.btnClass,
						btnEvent = v.btnEvent,
						btnElem = v.btnElem,
						btnHtml = btnElem || '<a class="btn' + (btnClass ? ' ' + btnClass : '') + '"><span><i></i>' + (k || '') + '</span></a>';
					$btnGroup.append(
						$(btnHtml).on('tap', {
							dialog: self
						}, (btnEvent && $.isFunction(btnEvent) ? btnEvent : (function() {})))
					);
				});
				$('.dialog-content', $dialog).after($btnGroup);
			}
			return $dialog;
		},
		defaultOptions: {
			template: '',
			dialogClass: 'spice-dialog',
			title: '',
			content: '',
			buttons: null,
			btnCloseClass: '.dialog-close',
			maskClose: true,
			showMask: true,
			autoClose: false,
			speed: 500,
			isRemove: true
		},
		_trigger: function(type, o) {
			this.elem.triggerHandler(type, o);
		},
		init: function(options) {
			var self = this,
				opt = self.opt = $.extend({}, self.opt, options);
			// 删除之前的结构
			self.destroy();

			self.elem = self.createElem(opt.template);

			$.each(['initEvent'], function(i, type) {
				$.isFunction(opt[type]) && self.elem.on(type, {
					dialog: self
				}, opt[type]);
			});

			self._trigger('initEvent', [$(self.elem)]);

			self.btnClose = $((opt.btnCloseClass || '.dialog-close'), self.elem);

			// 触发事件
			self.activate();
			$(self.elem).data('spice.dialog', self);
			return self;
		},
		activate: function() {
			var self = this;
			self.btnClose.on('tap', function() {
				self.hide();
			});
			if (self.opt.maskClose) {
				self.elem.on('tap', function(e) {
					var $target = $(e.target);
					if ($target.closest('.dialog').length == 0) {
						self.hide();
					}
				});
			}

		},
		createElem: function(elem) {
			var self = this,
				opt = self.opt;
			var spiceDialog = $(self.getTemplate(elem)).addClass(opt.dialogClass).hide().appendTo('body');

			spiceDialog.css('zIndex', spice.getMaxZIndex() + 1);

			return spiceDialog;
		},
		refreshZIndex: function() {
			this.elem.css('zIndex', spice.getMaxZIndex() + 1);
			return this;
		},
		show: function(callback, speed) {
			$('body, html').addClass('overflow-hidden');
			var self = this,
				opt = self.opt,
				$elem = self.elem;
			self.elem.trigger('dialog.show-before', self);
			$elem.fadeTo(self.opt.speed || speed || 0, 1, function() {
				callback && $.isFunction(callback) && callback();
				spice._initScroll($elem);
				self.elem.trigger('dialog.show-after', self);
			});
			var timeNum = self.opt.autoClose;
			if (spice.isNumber(timeNum)) {
				setTimeout(function() {
					self.hide(function() {
						opt.isRemove && self.destroy();
					});
				}, timeNum);
			}
			return self;
		},
		hide: function(callback, speed) {
			var self = this;
			self.elem.trigger('dialog.hide-before', self);
			self.elem.fadeOut(self.opt.speed || speed || 0, function() {
				callback && $.isFunction(callback) && callback();
				$('.dialog-opacity:visible').length <= 0 && $('body, html').removeClass('overflow-hidden');
				self.elem.trigger('dialog.hide-after', self);
			});
			return self;
		},
		destroy: function() {
			var $elem = this.elem;
			if ($elem && $elem.length != 0) {
				spice._removeScroll($elem);
				$elem.remove();
			}
			return this;
		}
	}

	spice.checkEmail = function(o, reg) {
		try {
			return (reg || rEmail).test(o);
		} catch (e) {
			return false;
		}
	}
	spice.checkMobile = function(o, reg) {
		try {
			return (reg || rMobile).test(o);
		} catch (e) {
			return false;
		}
	}

	// 常用touch事件封装，处理pc和mobile设备的事件兼容
	$.each('tap'.split(' '), function(i, name) {
		$.fn[name] = function(fn) {
			return fn ? this.on(name, fn) : this.trigger(name);
		};
		// jQuery < 1.8
		if ($.attrFn) {
			$.attrFn[name] = true;
		}
	});

	function triggerCustomEvent(obj, eventType, event, bubble) {
		var originalType = event.type;
		event.type = eventType;
		if (bubble) {
			$.event.trigger(event, undefined, obj);
		} else {
			$.event.dispatch.call(obj, event);
		}
		event.type = originalType;
	}
	// tap事件，处理 pc 的 `click` 和 mobile 的 `touch`
	$.event.special.tap = {
		setup: function(data, namespaces, eventHandle) {
			function init() {
				return {
					sx: 0,
					sy: 0,
					ex: 0,
					ey: 0
				}
			}
			var i = init();
			var self = $(this);
			if (spice.hasTouch && !spice.android) {
				self
					.on(spice.mousedown, function(e) {
						//e.preventDefault();
						var o = spice.getEventXY(e);
						i.sx = o.x;
						i.sy = o.y;
					})
					.on(spice.click, function(e) {
						var o = spice.getEventXY(e);
						i.ex = o.x;
						i.ey = o.y;
						if (i.sx == i.ex && i.sy == i.ey) {
							triggerCustomEvent(self[0], 'tap', e);
							i = init();
						}
					});
			} else {
				self.on('click', function(e) {
					triggerCustomEvent(self[0], 'tap', e);
				});
			}
		},
		teardown: function(namespaces) {
			$(this).off('click').off(spice.mousedown);
		}
	}

	// 创建可重用的构造函数
	var Ctor = function() {};

	// Internal function that returns an efficient (for current engines) version
	// of the passed-in callback, to be repeatedly applied in other Spice
	// functions.
	var optimizeCb = function(func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1:
				return function(value) {
					return func.call(context, value);
				};
			case 2:
				return function(value, other) {
					return func.call(context, value, other);
				};
			case 3:
				return function(value, index, collection) {
					return func.call(context, value, index, collection);
				};
			case 4:
				return function(accumulator, value, index, collection) {
					return func.call(context, accumulator, value, index, collection);
				};
		}
		return function() {
			return func.apply(context, arguments);
		};
	};

	// A mostly-internal function to generate callbacks that can be applied
	// to each element in a collection, returning the desired result — either
	// identity, an arbitrary callback, a property matcher, or a property accessor.
	var cb = function(value, context, argCount) {
		if (value == null) return spice.identity;
		if (spice.isFunction(value)) return optimizeCb(value, context, argCount);
		if (spice.isObject(value)) return spice.matches(value);
		return spice.property(value);
	};
	spice.iteratee = function(value, context) {
		return cb(value, context, Infinity);
	};

	// An internal function for creating assigner functions.
	var createAssigner = function(keysFunc) {
		return function(obj) {
			var length = arguments.length;
			if (length < 2 || obj == null) return obj;
			for (var index = 0; index < length; index++) {
				var source = arguments[index],
					keys = keysFunc(source),
					l = keys.length;
				for (var i = 0; i < l; i++) {
					var key = keys[i];
					obj[key] = source[key];
				}
			}
			return obj;
		};
	};

	// An internal function for creating a new object that inherits from another.
	var baseCreate = function(prototype) {
		if (!spice.isObject(prototype)) return {};
		if (nativeCreate) return nativeCreate(prototype);
		Ctor.prototype = prototype;
		var result = new Ctor;
		Ctor.prototype = null;
		return result;
	};

	// Collection Functions
	// --------------------

	// The cornerstone, an `each` implementation, aka `forEach`.
	// Handles raw objects in addition to array-likes. Treats all
	// sparse array-likes as if they were dense.
	spice.each = spice.forEach = function(obj, iteratee, context) {
		if (obj == null) return obj;
		iteratee = optimizeCb(iteratee, context);
		var i, length = obj.length;
		if (length === +length) {
			for (i = 0; i < length; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = spice.keys(obj);
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	};

	// Return the results of applying the iteratee to each element.
	spice.map = spice.collect = function(obj, iteratee, context) {
		if (obj == null) return [];
		iteratee = cb(iteratee, context);
		var keys = obj.length !== +obj.length && spice.keys(obj),
			length = (keys || obj).length,
			results = Array(length),
			currentKey;
		for (var index = 0; index < length; index++) {
			currentKey = keys ? keys[index] : index;
			results[index] = iteratee(obj[currentKey], currentKey, obj);
		}
		return results;
	};

	// **Reduce** builds up a single result from a list of values, aka `inject`,
	// or `foldl`.
	spice.reduce = spice.foldl = spice.inject = function(obj, iteratee, memo, context) {
		if (obj == null) obj = [];
		iteratee = optimizeCb(iteratee, context, 4);
		var keys = obj.length !== +obj.length && spice.keys(obj),
			length = (keys || obj).length,
			index = 0,
			currentKey;
		if (arguments.length < 3) {
			memo = obj[keys ? keys[index++] : index++];
		}
		for (; index < length; index++) {
			currentKey = keys ? keys[index] : index;
			memo = iteratee(memo, obj[currentKey], currentKey, obj);
		}
		return memo;
	};

	// The right-associative version of reduce, also known as `foldr`.
	spice.reduceRight = spice.foldr = function(obj, iteratee, memo, context) {
		if (obj == null) obj = [];
		iteratee = optimizeCb(iteratee, context, 4);
		var keys = obj.length !== +obj.length && spice.keys(obj),
			index = (keys || obj).length,
			currentKey;
		if (arguments.length < 3) {
			memo = obj[keys ? keys[--index] : --index];
		}
		while (index-- > 0) {
			currentKey = keys ? keys[index] : index;
			memo = iteratee(memo, obj[currentKey], currentKey, obj);
		}
		return memo;
	};

	// **Transform** is an alternative to reduce that transforms `obj` to a new
	// `accumulator` object.
	spice.transform = function(obj, iteratee, accumulator, context) {
		if (accumulator == null) {
			if (spice.isArray(obj)) {
				accumulator = [];
			} else if (spice.isObject(obj)) {
				var Ctor = obj.constructor;
				accumulator = baseCreate(typeof Ctor == 'function' && Ctor.prototype);
			} else {
				accumulator = {};
			}
		}
		if (obj == null) return accumulator;
		iteratee = optimizeCb(iteratee, context, 4);
		var keys = obj.length !== +obj.length && spice.keys(obj),
			length = (keys || obj).length,
			index, currentKey;
		for (index = 0; index < length; index++) {
			currentKey = keys ? keys[index] : index;
			if (iteratee(accumulator, obj[currentKey], currentKey, obj) === false) break;
		}
		return accumulator;
	};

	// Return the first value which passes a truth test. Aliased as `detect`.
	spice.find = spice.detect = function(obj, predicate, context) {
		var key;
		if (obj.length === +obj.length) {
			key = spice.findIndex(obj, predicate, context);
		} else {
			key = spice.findKey(obj, predicate, context);
		}
		if (key !== void 0 && key !== -1) return obj[key];
	};

	// Return all the elements that pass a truth test.
	// Aliased as `select`.
	spice.filter = spice.select = function(obj, predicate, context) {
		var results = [];
		if (obj == null) return results;
		predicate = cb(predicate, context);
		spice.each(obj, function(value, index, list) {
			if (predicate(value, index, list)) results.push(value);
		});
		return results;
	};

	// Return all the elements for which a truth test fails.
	spice.reject = function(obj, predicate, context) {
		return spice.filter(obj, spice.negate(cb(predicate)), context);
	};

	// Determine whether all of the elements match a truth test.
	// Aliased as `all`.
	spice.every = spice.all = function(obj, predicate, context) {
		if (obj == null) return true;
		predicate = cb(predicate, context);
		var keys = obj.length !== +obj.length && spice.keys(obj),
			length = (keys || obj).length,
			index, currentKey;
		for (index = 0; index < length; index++) {
			currentKey = keys ? keys[index] : index;
			if (!predicate(obj[currentKey], currentKey, obj)) return false;
		}
		return true;
	};

	// Determine if at least one element in the object matches a truth test.
	// Aliased as `any`.
	spice.some = spice.any = function(obj, predicate, context) {
		if (obj == null) return false;
		predicate = cb(predicate, context);
		var keys = obj.length !== +obj.length && spice.keys(obj),
			length = (keys || obj).length,
			index, currentKey;
		for (index = 0; index < length; index++) {
			currentKey = keys ? keys[index] : index;
			if (predicate(obj[currentKey], currentKey, obj)) return true;
		}
		return false;
	};

	// Determine if the array or object contains a given value (using `===`).
	// Aliased as `includes` and `include`.
	spice.contains = spice.includes = spice.include = function(obj, target, fromIndex) {
		if (obj == null) return false;
		if (obj.length !== +obj.length) obj = spice.values(obj);
		return spice.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
	};

	// Invoke a method (with arguments) on every item in a collection.
	spice.invoke = function(obj, method) {
		var args = slice.call(arguments, 2);
		var isFunc = spice.isFunction(method);
		return spice.map(obj, function(value) {
			return (isFunc ? method : value[method]).apply(value, args);
		});
	};

	// Convenience version of a common use case of `map`: fetching a property.
	spice.pluck = function(obj, key) {
		return spice.map(obj, spice.property(key));
	};

	// Convenience version of a common use case of `filter`: selecting only objects
	// containing specific `key:value` pairs.
	spice.where = function(obj, attrs) {
		return spice.filter(obj, spice.matches(attrs));
	};

	// Convenience version of a common use case of `find`: getting the first object
	// containing specific `key:value` pairs.
	spice.findWhere = function(obj, attrs) {
		return spice.find(obj, spice.matches(attrs));
	};

	// Return the maximum element (or element-based computation).
	spice.max = function(obj, iteratee, context) {
		var result = -Infinity,
			lastComputed = -Infinity,
			value, computed;
		if (iteratee == null && obj != null) {
			obj = obj.length === +obj.length ? obj : spice.values(obj);
			for (var i = 0, length = obj.length; i < length; i++) {
				value = obj[i];
				if (value > result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			spice.each(obj, function(value, index, list) {
				computed = iteratee(value, index, list);
				if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
					result = value;
					lastComputed = computed;
				}
			});
		}
		return result;
	};

	// Return the minimum element (or element-based computation).
	spice.min = function(obj, iteratee, context) {
		var result = Infinity,
			lastComputed = Infinity,
			value, computed;
		if (iteratee == null && obj != null) {
			obj = obj.length === +obj.length ? obj : spice.values(obj);
			for (var i = 0, length = obj.length; i < length; i++) {
				value = obj[i];
				if (value < result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			spice.each(obj, function(value, index, list) {
				computed = iteratee(value, index, list);
				if (computed < lastComputed || computed === Infinity && result === Infinity) {
					result = value;
					lastComputed = computed;
				}
			});
		}
		return result;
	};

	// Shuffle a collection, using the modern version of the
	// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	spice.shuffle = function(obj) {
		var set = obj && obj.length === +obj.length ? obj : spice.values(obj);
		var length = set.length;
		var shuffled = Array(length);
		for (var index = 0, rand; index < length; index++) {
			rand = spice.random(0, index);
			if (rand !== index) shuffled[index] = shuffled[rand];
			shuffled[rand] = set[index];
		}
		return shuffled;
	};

	// Sample **n** random values from a collection.
	// If **n** is not specified, returns a single random element.
	// The internal `guard` argument allows it to work with `map`.
	spice.sample = function(obj, n, guard) {
		if (n == null || guard) {
			if (obj.length !== +obj.length) obj = spice.values(obj);
			return obj[spice.random(obj.length - 1)];
		}
		return spice.shuffle(obj).slice(0, Math.max(0, n));
	};

	// Sort the object's values by a criterion produced by an iteratee.
	spice.sortBy = function(obj, iteratee, context) {
		iteratee = cb(iteratee, context);
		return spice.pluck(spice.map(obj, function(value, index, list) {
			return {
				value: value,
				index: index,
				criteria: iteratee(value, index, list)
			};
		}).sort(function(left, right) {
			return spice.comparator(left.criteria, right.criteria) || left.index - right.index;
		}), 'value');
	};

	// An internal function used for aggregate "group by" operations.
	var group = function(behavior) {
		return function(obj, iteratee, context) {
			var result = {};
			iteratee = cb(iteratee, context);
			spice.each(obj, function(value, index) {
				var key = iteratee(value, index, obj);
				behavior(result, value, key);
			});
			return result;
		};
	};

	// Groups the object's values by a criterion. Pass either a string attribute
	// to group by, or a function that returns the criterion.
	spice.groupBy = group(function(result, value, key) {
		if (spice.has(result, key)) result[key].push(value);
		else result[key] = [value];
	});

	// Indexes the object's values by a criterion, similar to `groupBy`, but for
	// when you know that your index values will be unique.
	spice.indexBy = group(function(result, value, key) {
		result[key] = value;
	});

	// Counts instances of an object that group by a certain criterion. Pass
	// either a string attribute to count by, or a function that returns the
	// criterion.
	spice.countBy = group(function(result, value, key) {
		if (spice.has(result, key)) result[key]++;
		else result[key] = 1;
	});

	// Safely create a real, live array from anything iterable.
	spice.toArray = function(obj) {
		if (!obj) return [];
		if (spice.isArray(obj)) return slice.call(obj);
		if (obj.length === +obj.length) return spice.map(obj, spice.identity);
		return spice.values(obj);
	};

	// Return the number of elements in an object.
	spice.size = function(obj) {
		if (obj == null) return 0;
		return obj.length === +obj.length ? obj.length : spice.keys(obj).length;
	};

	// Split a collection into two arrays: one whose elements all satisfy the given
	// predicate, and one whose elements all do not satisfy the predicate.
	spice.partition = function(obj, predicate, context) {
		predicate = cb(predicate, context);
		var pass = [],
			fail = [];
		spice.each(obj, function(value, key, obj) {
			(predicate(value, key, obj) ? pass : fail).push(value);
		});
		return [pass, fail];
	};

	// Array Functions
	// ---------------

	// Get the first element of an array. Passing **n** will return the first N
	// values in the array. Aliased as `head` and `take`. The **guard** check
	// allows it to work with `_.map`.
	spice.first = spice.head = spice.take = function(array, n, guard) {
		if (array == null) return void 0;
		if (n == null || guard) return array[0];
		return spice.initial(array, array.length - n);
	};

	// Returns everything but the last entry of the array. Especially useful on
	// the arguments object. Passing **n** will return all the values in
	// the array, excluding the last N. The **guard** check allows it to work with
	// `_.map`.
	spice.initial = function(array, n, guard) {
		return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	};

	// Get the last element of an array. Passing **n** will return the last N
	// values in the array. The **guard** check allows it to work with `_.map`.
	spice.last = function(array, n, guard) {
		if (array == null) return void 0;
		if (n == null || guard) return array[array.length - 1];
		return spice.rest(array, Math.max(0, array.length - n));
	};

	// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	// Especially useful on the arguments object. Passing an **n** will return
	// the rest N values in the array. The **guard**
	// check allows it to work with `_.map`.
	spice.rest = spice.tail = spice.drop = function(array, n, guard) {
		return slice.call(array, n == null || guard ? 1 : n);
	};

	// Trim out all falsy values from an array.
	spice.compact = function(array) {
		return $.grep(array, function(v, i) {
			if (($.isPlainObject(v) && $.isEmptyObject(v))) {
				return false;
			}
			if ($.isArray(v) && v.length == 0) {
				return false;
			}
			return v;
		});
		//return spice.filter(array, spice.identity);
	};

	// Internal implementation of a recursive `flatten` function.
	var flatten = function(input, shallow, strict, startIndex) {
		var output = [],
			idx = 0,
			value;
		for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
			value = input[i];
			if (value && value.length >= 0 && (spice.isArray(value) || spice.isArguments(value))) {
				//flatten current level of array or arguments object
				if (!shallow) value = flatten(value, shallow, strict);
				var j = 0,
					len = value.length;
				output.length += len;
				while (j < len) {
					output[idx++] = value[j++];
				}
			} else if (!strict) {
				output[idx++] = value;
			}
		}
		return output;
	};

	// Flatten out an array, either recursively (by default), or just one level.
	spice.flatten = function(array, shallow) {
		return flatten(array, shallow, false);
	};

	// Return a version of the array that does not contain the specified value(s).
	spice.without = function(array) {
		return spice.difference(array, slice.call(arguments, 1));
	};

	// Produce a duplicate-free version of the array. If the array has already
	// been sorted, you have the option of using a faster algorithm.
	// Aliased as `unique`.
	spice.uniq = spice.unique = function(array, isSorted, iteratee, context) {
		if (array == null) return [];
		if (!spice.isBoolean(isSorted)) {
			context = iteratee;
			iteratee = isSorted;
			isSorted = false;
		}
		if (iteratee != null) iteratee = cb(iteratee, context);
		var result = [];
		var seen = [];
		for (var i = 0, length = array.length; i < length; i++) {
			var value = array[i],
				computed = iteratee ? iteratee(value, i, array) : value;
			if (isSorted) {
				if (!i || seen !== computed) result.push(value);
				seen = computed;
			} else if (iteratee) {
				if (!spice.contains(seen, computed)) {
					seen.push(computed);
					result.push(value);
				}
			} else if (!spice.contains(result, value)) {
				result.push(value);
			}
		}
		return result;
	};

	// Produce an array that contains the union: each distinct element from all of
	// the passed-in arrays.
	spice.union = function() {
		return spice.uniq(flatten(arguments, true, true));
	};

	// Produce an array that contains every item shared between all the
	// passed-in arrays.
	spice.intersection = function(array) {
		if (array == null) return [];
		var result = [];
		var argsLength = arguments.length;
		for (var i = 0, length = array.length; i < length; i++) {
			var item = array[i];
			if (spice.contains(result, item)) continue;
			for (var j = 1; j < argsLength; j++) {
				if (!spice.contains(arguments[j], item)) break;
			}
			if (j === argsLength) result.push(item);
		}
		return result;
	};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	spice.difference = function(array) {
		var rest = flatten(arguments, true, true, 1);
		return spice.filter(array, function(value) {
			return !spice.contains(rest, value);
		});
	};

	// Zip together multiple lists into a single array -- elements that share
	// an index go together.
	spice.zip = function(array) {
		if (array == null) return [];
		var length = spice.max(arguments, 'length').length;
		var results = Array(length);
		while (length-- > 0) {
			results[length] = spice.pluck(arguments, length);
		}
		return results;
	};

	// Complement of _.zip. Unzip accepts an array of arrays and groups
	// each array's elements on shared indices
	spice.unzip = function(array) {
		return spice.zip.apply(null, array);
	};

	// Converts lists into objects. Pass either a single array of `[key, value]`
	// pairs, or two parallel arrays of the same length -- one of keys, and one of
	// the corresponding values.
	spice.object = function(list, values) {
		if (list == null) return {};
		var result = {};
		for (var i = 0, length = list.length; i < length; i++) {
			if (values) {
				result[list[i]] = values[i];
			} else {
				result[list[i][0]] = list[i][1];
			}
		}
		return result;
	};

	// Return the position of the first occurrence of an item in an array,
	// or -1 if the item is not included in the array.
	// If the array is large and already in sort order, pass `true`
	// for **isSorted** to use binary search.
	spice.indexOf = function(array, item, isSorted) {
		var i = 0,
			length = array && array.length;
		if (typeof isSorted == 'number') {
			i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
		} else if (isSorted && length) {
			i = spice.sortedIndex(array, item);
			return array[i] === item ? i : -1;
		}
		for (; i < length; i++)
			if (array[i] === item) return i;
		return -1;
	};

	spice.lastIndexOf = function(array, item, from) {
		var idx = array ? array.length : 0;
		if (typeof from == 'number') {
			idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
		}
		while (--idx >= 0)
			if (array[idx] === item) return idx;
		return -1;
	};

	// Returns the first index on an array-like that passes a predicate test
	spice.findIndex = function(array, predicate, context) {
		predicate = cb(predicate, context);
		var length = array != null ? array.length : 0;
		for (var i = 0; i < length; i++) {
			if (predicate(array[i], i, array)) return i;
		}
		return -1;
	};

	// Use a comparator function to figure out the smallest index at which
	// an object should be inserted so as to maintain order. Uses binary search.
	spice.sortedIndex = function(array, obj, iteratee, context) {
		iteratee = cb(iteratee, context, 1);
		var value = iteratee(obj);
		var low = 0,
			high = array.length;
		while (low < high) {
			var mid = Math.floor((low + high) / 2);
			if (spice.comparator(iteratee(array[mid]), value) < 0) low = mid + 1;
			else high = mid;
		}
		return low;
	};

	// Generate an integer Array containing an arithmetic progression. A port of
	// the native Python `range()` function. See
	// [the Python documentation](http://docs.python.org/library/functions.html#range).
	spice.range = function(start, stop, step) {
		if (arguments.length <= 1) {
			stop = start || 0;
			start = 0;
		}
		step = step || 1;

		var length = Math.max(Math.ceil((stop - start) / step), 0);
		var range = Array(length);

		for (var idx = 0; idx < length; idx++, start += step) {
			range[idx] = start;
		}

		return range;
	};

	// Function (ahem) Functions
	// ------------------

	// Determines whether to execute a function as a constructor
	// or a normal function with the provided arguments
	var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
		if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
		var self = baseCreate(sourceFunc.prototype);
		var result = sourceFunc.apply(self, args);
		if (spice.isObject(result)) return result;
		return self;
	};

	// Create a function bound to a given object (assigning `this`, and arguments,
	// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	// available.
	spice.bind = function(func, context) {
		if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
		if (!spice.isFunction(func)) throw new TypeError('Bind must be called on a function');
		var args = slice.call(arguments, 2);
		return function bound() {
			return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
		};
	};

	// Partially apply a function by creating a version that has had some of its
	// arguments pre-filled, without changing its dynamic `this` context. _ acts
	// as a placeholder, allowing any combination of arguments to be pre-filled.
	spice.partial = function(func) {
		var boundArgs = slice.call(arguments, 1);
		return function bound() {
			var position = 0;
			var args = boundArgs.slice();
			for (var i = 0, length = args.length; i < length; i++) {
				if (args[i] === spice) args[i] = arguments[position++];
			}
			while (position < arguments.length) args.push(arguments[position++]);
			return executeBound(func, bound, this, this, args);
		};
	};

	// Bind a number of an object's methods to that object. Remaining arguments
	// are the method names to be bound. Useful for ensuring that all callbacks
	// defined on an object belong to it.
	spice.bindAll = function(obj) {
		var i, length = arguments.length,
			key;
		if (length <= 1) throw new Error('bindAll must be passed function names');
		for (i = 1; i < length; i++) {
			key = arguments[i];
			obj[key] = spice.bind(obj[key], obj);
		}
		return obj;
	};

	// Memoize an expensive function by storing its results.
	spice.memoize = function(func, hasher) {
		var memoize = function(key) {
			var cache = memoize.cache;
			var address = '' + (hasher ? hasher.apply(this, arguments) : key);
			if (!spice.has(cache, address)) cache[address] = func.apply(this, arguments);
			return cache[address];
		};
		memoize.cache = {};
		return memoize;
	};

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	spice.delay = function(func, wait) {
		var args = slice.call(arguments, 2);
		return setTimeout(function() {
			return func.apply(null, args);
		}, wait);
	};

	// Defers a function, scheduling it to run after the current call stack has
	// cleared.
	spice.defer = spice.partial(spice.delay, spice, 1);

	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time. Normally, the throttled function will run
	// as much as it can, without ever going more than once per `wait` duration;
	// but if you'd like to disable the execution on the leading edge, pass
	// `{leading: false}`. To disable execution on the trailing edge, ditto.
	spice.throttle = function(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : spice.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = spice.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	spice.debounce = function(func, wait, immediate) {
		var timeout, args, context, timestamp, result;

		var later = function() {
			var last = spice.now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function() {
			context = this;
			args = arguments;
			timestamp = spice.now();
			var callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	};

	// Returns the first function passed as an argument to the second,
	// allowing you to adjust arguments, run code before and after, and
	// conditionally execute the original function.
	spice.wrap = function(func, wrapper) {
		return spice.partial(wrapper, func);
	};

	// Returns a negated version of the passed-in predicate.
	spice.negate = function(predicate) {
		return function() {
			return !predicate.apply(this, arguments);
		};
	};

	// Returns a function that is the composition of a list of functions, each
	// consuming the return value of the function that follows.
	spice.compose = function() {
		var args = arguments;
		var start = args.length - 1;
		return function() {
			var i = start;
			var result = args[start].apply(this, arguments);
			while (i--) result = args[i].call(this, result);
			return result;
		};
	};

	// Returns a function that will only be executed on and after the Nth call.
	spice.after = function(times, func) {
		return function() {
			if (--times < 1) {
				return func.apply(this, arguments);
			}
		};
	};

	// Returns a function that will only be executed up to (but not including) the Nth call.
	spice.before = function(times, func) {
		var memo;
		return function() {
			if (--times > 0) {
				memo = func.apply(this, arguments);
			}
			if (times <= 1) func = null;
			return memo;
		};
	};

	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	spice.once = spice.partial(spice.before, 2);

	// Object Functions
	// ----------------

	// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	var hasEnumBug = !{
		toString: null
	}.propertyIsEnumerable('toString');
	var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
		'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'
	];

	function collectNonEnumProps(obj, keys) {
		var nonEnumIdx = nonEnumerableProps.length;
		var proto = typeof obj.constructor === 'function' ? FuncProto : ObjProto;

		while (nonEnumIdx--) {
			var prop = nonEnumerableProps[nonEnumIdx];
			if (prop === 'constructor' ? spice.has(obj, prop) : prop in obj &&
				obj[prop] !== proto[prop] && !spice.contains(keys, prop)) {
				keys.push(prop);
			}
		}
	}

	// Retrieve the names of an object's own properties.
	// Delegates to **ECMAScript 5**'s native `Object.keys`
	spice.keys = function(obj) {
		if (!spice.isObject(obj)) return [];
		if (nativeKeys) return nativeKeys(obj);
		var keys = [];
		for (var key in obj)
			if (spice.has(obj, key)) keys.push(key);
			// Ahem, IE < 9.
			//if (hasEnumBug) collectNonEnumProps(obj, keys);
		return keys;
	};

	// Retrieve all the property names of an object.
	spice.keysIn = function(obj) {
		if (!spice.isObject(obj)) return [];
		var keys = [];
		for (var key in obj) keys.push(key);
		// Ahem, IE < 9.
		if (hasEnumBug) collectNonEnumProps(obj, keys);
		return keys;
	};

	// Retrieve the values of an object's properties.
	spice.values = function(obj) {
		var keys = spice.keys(obj);
		var length = keys.length;
		var values = Array(length);
		for (var i = 0; i < length; i++) {
			values[i] = obj[keys[i]];
		}
		return values;
	};

	// Convert an object into a list of `[key, value]` pairs.
	spice.pairs = function(obj) {
		var keys = spice.keys(obj);
		var length = keys.length;
		var pairs = Array(length);
		for (var i = 0; i < length; i++) {
			pairs[i] = [keys[i], obj[keys[i]]];
		}
		return pairs;
	};

	// Invert the keys and values of an object. The values must be serializable.
	spice.invert = function(obj) {
		var result = {};
		var keys = spice.keys(obj);
		for (var i = 0, length = keys.length; i < length; i++) {
			result[obj[keys[i]]] = keys[i];
		}
		return result;
	};

	// Return a sorted list of the function names available on the object.
	// Aliased as `methods`
	spice.functions = spice.methods = function(obj) {
		var names = [];
		for (var key in obj) {
			if (spice.isFunction(obj[key])) names.push(key);
		}
		return names.sort();
	};

	// Extend a given object with all the properties in passed-in object(s).
	spice.extend = createAssigner(spice.keysIn);

	// Assigns a given object with all the own properties in the passed-in object(s)
	// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	spice.assign = createAssigner(spice.keys);

	// Returns the first key on an object that passes a predicate test
	spice.findKey = function(obj, predicate, context) {
		predicate = cb(predicate, context);
		var keys = spice.keys(obj),
			key;
		for (var i = 0, length = keys.length; i < length; i++) {
			key = keys[i];
			if (predicate(obj[key], key, obj)) return key;
		}
	};

	// Return a copy of the object only containing the whitelisted properties.
	spice.pick = function(obj, iteratee, context) {
		var result = {},
			key;
		if (obj == null) return result;
		if (spice.isFunction(iteratee)) {
			iteratee = optimizeCb(iteratee, context);
			for (key in obj) {
				var value = obj[key];
				if (iteratee(value, key, obj)) result[key] = value;
			}
		} else {
			var keys = flatten(arguments, false, false, 1);
			obj = new Object(obj);
			for (var i = 0, length = keys.length; i < length; i++) {
				key = keys[i];
				if (key in obj) result[key] = obj[key];
			}
		}
		return result;
	};

	// Return a copy of the object without the blacklisted properties.
	spice.omit = function(obj, iteratee, context) {
		if (spice.isFunction(iteratee)) {
			iteratee = spice.negate(iteratee);
		} else {
			var keys = spice.map(flatten(arguments, false, false, 1), String);
			iteratee = function(value, key) {
				return !spice.contains(keys, key);
			};
		}
		return spice.pick(obj, iteratee, context);
	};

	// Fill in a given object with default properties.
	spice.defaults = function(obj) {
		if (!spice.isObject(obj)) return obj;
		for (var i = 1, length = arguments.length; i < length; i++) {
			var source = arguments[i];
			for (var prop in source) {
				if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		}
		return obj;
	};

	// Creates an object that inherits from the given prototype object.
	// If additional properties are provided then they will be added to the
	// created object.
	spice.create = function(prototype, props) {
		var result = baseCreate(prototype);
		if (props) spice.assign(result, props);
		return result;
	};

	// Create a (shallow-cloned) duplicate of an object.
	spice.clone = function(obj) {
		if (!spice.isObject(obj)) return obj;
		return spice.isArray(obj) ? obj.slice() : spice.extend({}, obj);
	};

	// Invokes interceptor with the obj, and then returns obj.
	// The primary purpose of this method is to "tap into" a method chain, in
	// order to perform operations on intermediate results within the chain.
	// spice.tap = function(obj, interceptor) {
	//     interceptor(obj);
	//     return obj;
	// };

	// Internal recursive comparison function for `isEqual`.
	var eq = function(a, b, aStack, bStack) {
		// Identical objects are equal. `0 === -0`, but they aren't identical.
		// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
		if (a === b) return a !== 0 || 1 / a === 1 / b;
		// A strict comparison is necessary because `null == undefined`.
		if (a == null || b == null) return a === b;
		// Unwrap any wrapped objects.
		//if (a instanceof spice) a = a._wrapped;
		//if (b instanceof spice) b = b._wrapped;
		// Compare `[[Class]]` names.
		var className = toString.call(a);
		if (className !== toString.call(b)) return false;
		switch (className) {
			// Strings, numbers, regular expressions, dates, and booleans are compared by value.
			case '[object RegExp]':
				// RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
			case '[object String]':
				// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
				// equivalent to `new String("5")`.
				return '' + a === '' + b;
			case '[object Number]':
				// `NaN`s are equivalent, but non-reflexive.
				// Object(NaN) is equivalent to NaN
				if (+a !== +a) return +b !== +b;
				// An `egal` comparison is performed for other numeric values.
				return +a === 0 ? 1 / +a === 1 / b : +a === +b;
			case '[object Date]':
			case '[object Boolean]':
				// Coerce dates and booleans to numeric primitive values. Dates are compared by their
				// millisecond representations. Note that invalid dates with millisecond representations
				// of `NaN` are not equivalent.
				return +a === +b;
		}

		var areArrays = className === '[object Array]';
		if (!areArrays) {
			if (typeof a != 'object' || typeof b != 'object') return false;

			// Objects with different constructors are not equivalent, but `Object`s or `Array`s
			// from different frames are.
			var aCtor = a.constructor,
				bCtor = b.constructor;
			if (aCtor !== bCtor && !(spice.isFunction(aCtor) && aCtor instanceof aCtor &&
					spice.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
				return false;
			}
		}
		// Assume equality for cyclic structures. The algorithm for detecting cyclic
		// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
		var length = aStack.length;
		while (length--) {
			// Linear search. Performance is inversely proportional to the number of
			// unique nested structures.
			if (aStack[length] === a) return bStack[length] === b;
		}

		// Add the first object to the stack of traversed objects.
		aStack.push(a);
		bStack.push(b);

		// Recursively compare objects and arrays.
		if (areArrays) {
			// Compare array lengths to determine if a deep comparison is necessary.
			length = a.length;
			if (length !== b.length) return false;
			// Deep compare the contents, ignoring non-numeric properties.
			while (length--) {
				if (!eq(a[length], b[length], aStack, bStack)) return false;
			}
		} else {
			// Deep compare objects.
			var keys = spice.keys(a),
				key;
			length = keys.length;
			// Ensure that both objects contain the same number of properties before comparing deep equality.
			if (spice.keys(b).length !== length) return false;
			while (length--) {
				// Deep compare each member
				key = keys[length];
				if (!(spice.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
			}
		}
		// Remove the first object from the stack of traversed objects.
		aStack.pop();
		bStack.pop();
		return true;
	};

	// Perform a deep comparison to check if two objects are equal.
	spice.isEqual = function(a, b) {
		return eq(a, b, [], []);
	};

	// Is a given array, string, or object empty?
	// An "empty" object has no enumerable own-properties.
	spice.isEmpty = function(obj) {
		if (obj == null) return true;
		if (spice.isArray(obj) || spice.isString(obj) || spice.isArguments(obj)) return obj.length === 0;
		for (var key in obj)
			if (spice.has(obj, key)) return false;
		return true;
	};

	// Is a given value a DOM element?
	spice.isElement = function(obj) {
		return !!(obj && obj.nodeType === 1);
	};

	// Is a given value an array?
	// Delegates to ECMA5's native Array.isArray
	spice.isArray = nativeIsArray || function(obj) {
		return toString.call(obj) === '[object Array]';
	};

	// Is a given variable an object?
	spice.isObject = function(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	};

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	spice.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
		spice['is' + name] = function(obj) {
			return toString.call(obj) === '[object ' + name + ']';
		};
	});

	// Define a fallback version of the method in browsers (ahem, IE < 9), where
	// there isn't any inspectable "Arguments" type.
	if (!spice.isArguments(arguments)) {
		spice.isArguments = function(obj) {
			return spice.has(obj, 'callee');
		};
	}

	// Optimize `isFunction` if appropriate. Work around an IE 11 bug (#1621).
	// Work around a Safari 8 bug (#1929)
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
		spice.isFunction = function(obj) {
			return typeof obj == 'function' || false;
		};
	}

	// Is a given object a finite number?
	spice.isFinite = function(obj) {
		return isFinite(obj) && !isNaN(parseFloat(obj));
	};

	// Is the given value `NaN`? (NaN is the only number which does not equal itself).
	spice.isNaN = function(obj) {
		return spice.isNumber(obj) && obj !== +obj;
	};

	// Is a given value a boolean?
	spice.isBoolean = function(obj) {
		return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	};

	// Is a given value equal to null?
	spice.isNull = function(obj) {
		return obj === null;
	};

	// Is a given variable undefined?
	spice.isUndefined = function(obj) {
		return obj === void 0;
	};

	// Shortcut function for checking if an object has a given property directly
	// on itself (in other words, not on a prototype).
	spice.has = function(obj, key) {
		return obj != null && hasOwnProperty.call(obj, key);
	};

	// Utility Functions
	// -----------------

	// Keep the identity function around for default iteratees.
	spice.identity = function(value) {
		return value;
	};

	// Predicate-generating functions. Often useful outside of Underscore.
	spice.constant = function(value) {
		return function() {
			return value;
		};
	};

	spice.noop = function() {};

	spice.property = function(key) {
		return function(obj) {
			return obj == null ? void 0 : obj[key];
		};
	};

	// Generates a function for a given object that returns a given property (including those of ancestors)
	spice.propertyOf = function(obj) {
		return obj == null ? function() {} : function(key) {
			return obj[key];
		};
	};

	// Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	spice.matches = function(attrs) {
		var pairs = spice.pairs(attrs),
			length = pairs.length;
		return function(obj) {
			if (obj == null) return !length;
			obj = new Object(obj);
			for (var i = 0; i < length; i++) {
				var pair = pairs[i],
					key = pair[0];
				if (pair[1] !== obj[key] || !(key in obj)) return false;
			}
			return true;
		};
	};

	// Default internal comparator for determining whether a is greater (1),
	// equal (0) or less than (-1) some object b
	spice.comparator = function(a, b) {
		if (a === b) return 0;
		var isAComparable = a >= a,
			isBComparable = b >= b;
		if (isAComparable || isBComparable) {
			if (isAComparable && !isBComparable) return -1;
			if (isBComparable && !isAComparable) return 1;
		}
		return a > b ? 1 : (b > a) ? -1 : 0;
	};

	// Run a function **n** times.
	// spice.times = function(n, iteratee, context) {
	//     var accum = Array(Math.max(0, n));
	//     iteratee = optimizeCb(iteratee, context, 1);
	//     for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	//     return accum;
	// };

	// Return a random integer between min and max (inclusive).
	spice.random = function(min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};

	// A (possibly faster) way to get the current timestamp as an integer.
	spice.now = Date.now || function() {
		return new Date().getTime();
	};

	// List of HTML entities for escaping.
	var escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&#x60;'
	};
	var unescapeMap = spice.invert(escapeMap);

	// Functions for escaping and unescaping strings to/from HTML interpolation.
	var createEscaper = function(map) {
		var escaper = function(match) {
			return map[match];
		};
		// Regexes for identifying a key that needs to be escaped
		var source = '(?:' + spice.keys(map).join('|') + ')';
		var testRegexp = RegExp(source);
		var replaceRegexp = RegExp(source, 'g');
		return function(string) {
			string = string == null ? '' : '' + string;
			return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
		};
	};
	spice.escape = createEscaper(escapeMap);
	spice.unescape = createEscaper(unescapeMap);

	// If the value of the named `property` is a function then invoke it with the
	// `object` as context; otherwise, return it.
	spice.result = function(object, property, fallback) {
		var value = object == null ? void 0 : object[property];
		if (value === void 0) {
			value = fallback;
		}
		return spice.isFunction(value) ? value.call(object) : value;
	};

	// Generate a unique integer id (unique within the entire client session).
	// Useful for temporary DOM ids.
	var idCounter = 0;
	spice.uniqueId = function(prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	};

	// By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	spice.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};

	// When customizing `templateSettings`, if you don't want to define an
	// interpolation, evaluation or escaping regex, we need one that is
	// guaranteed not to match.
	var noMatch = /(.)^/;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	var escapes = {
		"'": "'",
		'\\': '\\',
		'\r': 'r',
		'\n': 'n',
		'\u2028': 'u2028',
		'\u2029': 'u2029'
	};

	var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	var escapeChar = function(match) {
		return '\\' + escapes[match];
	};

	// JavaScript micro-templating, similar to John Resig's implementation.
	// Underscore templating handles arbitrary delimiters, preserves whitespace,
	// and correctly escapes quotes within interpolated code.
	// NB: `oldSettings` only exists for backwards compatibility.
	spice.template = function(text, settings, oldSettings) {
		if (!settings && oldSettings) settings = oldSettings;
		settings = spice.defaults({}, settings, spice.templateSettings);

		// Combine delimiters into one regular expression via alternation.
		var matcher = RegExp([
			(settings.escape || noMatch).source,
			(settings.interpolate || noMatch).source,
			(settings.evaluate || noMatch).source
		].join('|') + '|$', 'g');

		// Compile the template source, escaping string literals appropriately.
		var index = 0;
		var source = "__p+='";
		text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
			source += text.slice(index, offset).replace(escaper, escapeChar);
			index = offset + match.length;

			if (escape) {
				source += "'+\n((__t=(" + escape + "))==null?'':spice.escape(__t))+\n'";
			} else if (interpolate) {
				source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
			} else if (evaluate) {
				source += "';\n" + evaluate + "\n__p+='";
			}

			// Adobe VMs need the match returned to produce the correct offest.
			return match;
		});
		source += "';\n";

		// If a variable is not specified, place data values in local scope.
		if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

		source = "var __t,__p='',__j=Array.prototype.join," +
			"print=function(){__p+=__j.call(arguments,'');};\n" +
			source + 'return __p;\n';

		try {
			var render = new Function(settings.variable || 'obj', 'spice', source);
		} catch (e) {
			e.source = source;
			throw e;
		}

		var template = function(data) {
			return render.call(this, data, spice);
		};

		// Provide the compiled source as a convenience for precompilation.
		var argument = settings.variable || 'obj';
		template.source = 'function(' + argument + '){\n' + source + '}';

		return template;
	};

	// Add a "chain" function. Start chaining a wrapped Underscore object.
	spice.chain = function(obj) {
		var instance = spice(obj);
		instance._chain = true;
		return instance;
	};

	spice.config = {
		throttleTime: 100,
		debounceTime: 300,
		resize: {
			standard: 1024,
			medium: 768,
			small: 767
		}
	};

	//自定义边界
	spice.resizeScreenDebounce = function(obj) {
		var opt = $.extend({}, spice.config, {
			isRetinaCheck: true,
			callBack: null
		}, obj);

		var obj = opt.resize,
			sortByObj = spice.sortBy(obj),
			invertObj = spice.invert(obj)

		// 使用 debounce ，优化resize调用次数
		return spice.debounce(function() {
			var wW = spice.getWindowWidth(),
				media

			$.each(sortByObj, function(i, v) {
				if (i === 0) {
					if (wW <= v) {
						media = invertObj[v]
					}
				}
				if (sortByObj[i + 1]) {
					if (wW <= sortByObj[i + 1] && wW >= v) {
						media = invertObj[v]
					}
				} else {
					if (wW > v) {
						media = invertObj[v]
					}
				}
			})


			// 判断是否是高清屏
			if (opt.isRetinaCheck && window.devicePixelRatio > 1) {
				media += '_retina'
			}

			opt.callBack && $.isFunction(opt.callBack) && opt.callBack(media);
		}, opt.debounceTime)
	}

	var resizeScreenDebounce;
	spice.init = function(opt) {
		spice.config = $.extend({}, spice.config, opt);

		if (!resizeScreenDebounce) {

			var classList = [];
			$.each(spice.config.resize, function(i, v) {
				classList.push('events-spice-' + i + ' style-spice-' + i);
			});
			classList = classList.join(' ');

			resizeScreenDebounce = spice.resizeScreenDebounce({
				isRetinaCheck: false,
				callBack: function(media) {
					var _class = 'events-spice-' + media + ' style-spice-' + media;
					$('body')
						.removeClass(classList)
						.addClass(_class);
				}
			})
		}

		$(window)
			.off('resize.spice.screen')
			.on('resize.spice.screen', resizeScreenDebounce)
			.trigger('resize.spice.screen');

	};

	return spice;
});

(function() {
	var method;
	var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[length];
		if (!console[method]) {
			console[method] = $.noop;
		}
	}
}());
