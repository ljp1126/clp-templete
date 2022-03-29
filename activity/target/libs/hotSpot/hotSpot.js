;(function($){
		
	var selRel = {
		_indexRel: 0,
		mouseover: function(elem){
			$(elem).css({'border': '1px solid red','cursor': 'pointer'});
		},
		mouseout: function(elem){
			if($(elem).hasClass('selected-rel')){ return false;}     // 如果选中该元素则不清楚样式
			$(elem).css({'border': '','cursor': ''});
		},
		click: function(elem, e, opt, posRelList){
			if($(elem).hasClass('selected-rel')){ return false;}
			
			$('.selected-rel').css({'border': '','cursor': ''});
			if($('.selected-rel').attr('class') == 'selected-rel'){
				$('.selected-rel').removeAttr('class');
			}else{
				$('.selected-rel').removeClass('selected-rel');
			}
			$(elem).addClass('selected-rel');
			if(!$(elem)[0].id){
				$(elem)[0].id = 'rel-' + this._indexRel;
				posRelList[$(elem)[0].id] = {
					width: $(elem).width(),
					height: $(elem).height()
				};
				this._indexRel++;
			}
			// 初始化canvas
			canvas.init(elem, opt, posRelList);
		}
	};
	
	var canvas = {
		hotSpot: {},
		_canvasStart: false,
		init: function(rel, opt, posRelList){
			// 创建canvas节点
			var canvas = $('<canvas id="canvas" class="canvas"></canvas>'),
				_self = this;
			canvas.css({'position': 'absolute',
						'top': '0','left': '0',
						'cursor': 'crosshair'});
			$('.canvas').remove();
			$(rel).prepend(canvas);
			canvas[0].width = $(rel).width();
			canvas[0].height = $(rel).height();
			// canvas 画热区事件
			canvas.on('mousedown', function(){
				_self.mousedown(event);
			});
			canvas.on('mousemove', function(){
				_self.mousemove(this, event);
			});
			canvas.on('mouseup', function(){
				_self.mouseup(this, rel, opt, posRelList);
			});
		},
		mousedown: function(e){
			var hotSpot = this.hotSpot = {};
			this._canvasStart = true;
			hotSpot.left = e.offsetX;
			hotSpot.top = e.offsetY;
			hotSpot.width = 0;
			hotSpot.height = 0;
		},
		mousemove: function(canvas, e){
			if(!this._canvasStart){ return false;}
			var ctx = canvas.getContext('2d'),
				hotSpot = this.hotSpot;
			hotSpot.width = e.offsetX - hotSpot.left;
			hotSpot.height = e.offsetY - hotSpot.top;
			ctx.clearRect(0,0,canvas.width,canvas.height);    // 清空画布
			ctx.strokeRect(hotSpot.left, hotSpot.top, hotSpot.width, hotSpot.height);
			ctx.save();
		},
		mouseup: function(canvas, rel, opt, posRelList){
			if(!this._canvasStart){ return false;}
			var hotSpot = this.hotSpot;
			this._canvasStart = false;
			if(hotSpot.width < 20 || hotSpot.height < 20){ return false;}
			
			canvas.width = $(rel).width();
			canvas.height = $(rel).height();
			a.init(hotSpot, rel, opt, posRelList);
		}
	};
	
	var a = {
		_indexA: 0,
		createA: function(hotSpot, rel, opt){
			var aHtml = $('<a href="javascript:;"><div class="a-drag"><span class="a-close"><span></span><span></span></span></div><span class="a-resize"></span></a>'),
				defaultCss = opt.defaultCss;
			if(opt.extandClass){
				aHtml.addClass(opt.extandClass);
			}
			aHtml.css(defaultCss.aDefulCss);
			this.refreshA(hotSpot, rel, aHtml);
			aHtml.find('.a-drag').css(defaultCss.dragCss);
			aHtml.find('.a-drag .a-close').css(defaultCss.closeCss);
			aHtml.find('.a-drag .a-close span:first-child').css(defaultCss.closeCssFirst);
			aHtml.find('.a-drag .a-close span:last-child').css(defaultCss.closeCssLast);
			aHtml.find('.a-resize').css(defaultCss.resizeCss);
			aHtml.addClass(opt.prefixClass + this._indexA);
			aHtml[0].id = opt.prefixClass + this._indexA;
			this._indexA++;
			$(rel).append(aHtml);
			return aHtml;
		},
		init: function(hotSpot, rel, opt, posRelList){
			if(hotSpot.width < 20 || hotSpot.height < 20){ return false;}
			var aHtml = this.createA(hotSpot, rel, opt);
			posRelList[$(rel)[0].id][$(aHtml)[0].id] = hotSpot;
			hotSpot = {};
			
			this.remove(rel, aHtml, posRelList);
			// 初始化drag 和 resize
			this.change(rel, aHtml, 'drag', posRelList);
			this.change(rel, aHtml, 'resize', posRelList);
		},
		refreshA: function(hotSpot, rel, currA){
			var newCss = {};
			if(typeof hotSpot.top == 'number'){
				newCss.top = (hotSpot.top/$(rel).height()*100).toFixed(2) + '%';
			}
			if(typeof hotSpot.left == 'number'){
				newCss.left = (hotSpot.left/$(rel).width()*100).toFixed(2) + '%';
			}
			if(typeof hotSpot.width == 'number'){
				newCss.width = (hotSpot.width/$(rel).width()*100).toFixed(2) + '%';
			}
			if(typeof hotSpot.height == 'number'){
				newCss.height = (hotSpot.height/$(rel).height()*100).toFixed(2) + '%';
			}
			$(currA).css(newCss);
		},
		change: function(rel, currA, changetype, posRelList){       // changetype 参数为字符串 'resize' 改变大小，或  'drag' 改变位置
			var _self = this,
				hotSpot =  {},
				moveS = {start: false};
			
			var _changemsg = function(odj, hotSpot, changetype, moveS, rel){
				var _limit = function(max, min, value){
					if(value < min){
						value = min;
					}else if(value > max){
						value = max;
					}
					return value;
				};
				if(moveS.x || moveS.y){
					if(changetype === 'drag'){
						odj.top = _limit($(rel).height() - hotSpot.height, 0, hotSpot.top  + moveS.y);
						odj.left = _limit($(rel).width() - hotSpot.width, 0, hotSpot.left + moveS.x);
					}else if(changetype === 'resize'){
						odj.height = _limit($(rel).height() - hotSpot.top, 20, hotSpot.height + moveS.y);
						odj.width = _limit($(rel).width() - hotSpot.left, 20, hotSpot.width + moveS.x);
					}
				}
			}
			$('.a-'+changetype, currA).on('mousedown', function(e){
				// 初始化相关数据
				moveS = {
					top: 0,
					left: 0,
					x: 0,
					y: 0
				};
				moveS.start = true;
				moveS.top = e.pageY;
				moveS.left = e.pageX;
				
				hotSpot = posRelList[$(rel)[0].id][$(currA)[0].id];
			});
			$(document).on('mousemove', function(e){
				if(!moveS.start){ return false;}
				var newhotSpot = {};
				moveS.x = e.pageX - moveS.left;
				moveS.y = e.pageY - moveS.top;
				
				_changemsg(newhotSpot, hotSpot, changetype, moveS, rel);
				_self.refreshA(newhotSpot, rel, currA);
			});
			$(document).on('mouseup', function(e){
				if(!moveS.start){ return false;}
				
				_changemsg(hotSpot, hotSpot, changetype, moveS, rel);
				
				moveS = {start: false};
			});
		},
		remove: function(rel, currA, posRelList){
			$('.a-close', currA).on('click', function(e){
				$(currA).remove();
				delete posRelList[$(rel)[0].id][$(currA)[0].id];
			});
		}
	};
	
	var defaultOptions = {
		extandClass: '',
		prefixClass: 'a-',
		defaultCss: {
			aDefulCss: {
				'position': 'absolute',
				'background': '#f00',
				'opacity': 0.4
			},
			dragCss: {
				'width': '100%',
				'height': '20px',
				'background': 'rgba(0,0,0,.7)',
				'cursor': 'move'
			},
			closeCss: {
				'display': 'inline-block',
				'position': 'relative',
				'float': 'right',
				'width': '20px',
				'height': '20px',
				'cursor': 'pointer'
			},
			closeCssFirst: {
				'display': 'inline-block',
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'margin': '-1px 0 0 -8px',
				'width': '16px',
				'height': '2px',
				'background': '#fff',
				'transform': 'rotate(45deg)'
			},
			closeCssLast: {
				'display': 'inline-block',
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'margin': '-1px 0 0 -8px',
				'width': '16px',
				'height': '2px',
				'background': '#fff',
				'transform': 'rotate(-45deg)'
			},
			resizeCss: {
				'display': 'inline-block',
				'position': 'absolute',
				'right': '0',
				'bottom': '0',
				'width': '8px',
				'height': '8px',
				'cursor': 'nw-resize'
			}
		}
	};
	
	var posHotSpot = function(self, option){
		var $self  = this;
		if ( !($self instanceof arguments.callee) ) return new posHotSpot(self, option);
        
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self || document.body;
        $self.posRelList = {};
        $self.init();
	};
	posHotSpot.prototype = {
		constructor: posHotSpot,
		init: function(){
			var self = this,
                elem = self.elem,
                opt = self.opt,
                posRelList = self.posRelList;
//			禁止选中
			$('*', elem).css({'-webkit-user-select': 'none','-moz-user-select': 'none','-ms-user-select': 'none'});
//			对相对定位元素添加事件
			$('*', elem).each(function(){
				if($(this).css('position') === 'relative'){
					$(this).on('mouseover', function(){
						event.stopPropagation();
						selRel.mouseover(this);
					});
					$(this).on('mouseout', function(){
						event.stopPropagation();
						selRel.mouseout(this);
					});
					$(this).on('click', function(){
						event.stopPropagation();
						selRel.click(this, event, opt, posRelList);
					});
				}
			});
			
			$(window).on('resize.rel', function(){
				self.wResize();
			});
		},
		wResize: function(){
			var self = this,
				posRelList = self.posRelList,
				canvas = $('#canvas')[0],
				posRelSel = $('#canvas').closest('.selected-rel');
			// canvas 大小重置
			if(posRelSel.length){
				canvas.width = posRelSel.width();
				canvas.height = posRelSel.height();
			}
			
			// 存储的相对定位元素，和 a 的数据刷新根据当前数据刷新
			$.each(posRelList, function(index, value){
					if(index){
						value.width = $('#' + index).width();
						value.height = $('#' + index).height();
					}
				$.each(value, function(index, value){
					if($.isPlainObject(value)){
						value.left = $('.' + index).position().left;
						value.width = $('.' + index).width();
						value.top = $('.' + index).position().top;
						value.height = $('.' + index).height();
					}
				});
			});
		},
		saveInlineHtml: function(){
			var self = this,
				content = '',
				pathName = location.pathname;
				fileName = pathName.split("/").slice(-1).toString().split(".").slice(0,1).toString();
			self.destory();
			codeHtml = '<!DOCTYPE html>' + document.getElementsByTagName("html")[0].outerHTML;
			self.save(codeHtml, fileName + '.html', 'text/html');
		},
		savePartHtml: function(){
			var self = this,
				codeHtml = '',
				posRelList = self.posRelList,
				pathName = location.pathname,
				fileName = pathName.split("/").slice(-1).toString().split(".").slice(0,1).toString();
			$.each(posRelList, function(index, value){
				$.each(value, function(index, value){
					$('#' + index).removeAttr('style');
				});
			});
			self.destory();
			codeHtml = '<!DOCTYPE html>' + document.getElementsByTagName("html")[0].outerHTML;
			self.save(codeHtml, fileName + '.html', 'text/html');
		},
		savePartCss: function(){
			var self = this,
				codeCss = '',
				posRelList = self.posRelList,
				pathName = location.pathname,
				fileName = pathName.split("/").slice(-1).toString().split(".").slice(0,1).toString();
			$.each(posRelList, function(index, value){
				var posRel = value;
				$.each(value, function(index, value){
					var relWidth = posRel.width,
						relHeight = posRel.height,
						percent = {};
					if($.isPlainObject(value)){
						percent.top = (value.top/relHeight*100).toFixed(2) + '%';
						percent.left = (value.left/relWidth*100).toFixed(2) + '%';
						percent.width = (value.width/relWidth*100).toFixed(2) + '%';
						percent.height = (value.height/relHeight*100).toFixed(2) + '%';
						codeCss += '.' + index + '{top:' + percent.top +';left:'+ percent.left +';width:'+ percent.width +';height:'+ percent.height +';}';
					}
				});
				
			});
			self.save(codeCss, fileName + '.css', 'text/css');
		},
		//  移除posRel相关事件,并移除canvas,仅保留a标签相关
		complete: function(){
			var self = this,
                elem = self.elem;
            
            $('.selected-rel').find('.canvas').remove();
			$('.selected-rel').css({'border': '','cursor': ''});
			if($('.selected-rel').attr('class') == 'selected-rel'){
				$('.selected-rel').removeAttr('class');
			}else{
				$('.selected-rel').removeClass('selected-rel');
			}
			
			$('*', elem).css({'-webkit-user-select': '','-moz-user-select': '','-ms-user-select': ''});
			$('*', elem).each(function(){
				if($(this).css('position') === 'relative'){
					$(this).off();
				}
			});
		},
		// 除生成a标签外,其他都清除
		destory: function(){
			var self = this,
				posRelList = self.posRelList;
			self.complete();
			$.each(posRelList, function(index, value){
					$('#' + index).removeAttr('id');
				$.each(value, function(index, value){
					$('#' + index).removeAttr('id').html('');
				});
			});
			$(window).off('resize.rel');
		},
		save: function(data, name, fileType){
			var export_blob = new Blob(['\ufeff' + data], { type: fileType + ';charset=UTF-8'}),
				// 将二进制对象生成可下载url
				url = window.URL.createObjectURL(export_blob),
				aDownload = document.createElement('a');
			// 设置下载路径以及下载文件名
			aDownload.href = url;
			aDownload.download = name;
			
			// 模拟点击事件,实现下载
			var clickEvent = new MouseEvent('click');
			aDownload.dispatchEvent(clickEvent);
		}
	};
	
	$.posHotSpot = posHotSpot;
	
})(jQuery);
