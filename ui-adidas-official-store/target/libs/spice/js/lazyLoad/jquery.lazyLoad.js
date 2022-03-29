/**
 *
 * 图片延迟加载
 * 详细用法请参考：http://v3.spice.lh/javascript/lazyload
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0
 *
 */
;(function($, factory, pluginName){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = factory($);
    }else{
        $.spice[pluginName] = factory($);
    }
})(jQuery, function($){
	return function(selector, option){
		if( !(selector && !$.isPlainObject(selector)) ) return false;
		var config = $.extend({
				attr 		: 'lazy-src'	//默认属性名，存图片实际路径
				, timeout 	: 200			//延时显示，渐隐渐现效果
				, parents 	: null			//img父级元素，不传则为img本身
				, prestrain : 0 			//控制预加载行数
				, callBack 	: null 			//回调函数
	        }, (option||{}) );

		var $self = $(selector)
			, $W = $(window)
			, throttled = $.spice.throttle(function() {
			    var wh = $W.height(), sh = $W.scrollTop()+wh;
				$self.each(function(i, n){
					var img = $(n);
					$('<img src="'+img.attr('src')+'" />')
		                    .on("load", function() {
								var ip = config.parents ? img.parents(config.parents) : img
									, it = ip.offset().top
									, ih = ip.height();
								if(sh > it - ih*config.prestrain){
									var lazySrc = img.attr(config.attr);
				                    if (!lazySrc) return;
				                    $("<img src='"+lazySrc+"' />")
					                    .on("load", function() {
											img
												.css({opacity:0})
				                        		.attr('src', lazySrc)
				                        		.removeAttr(config.attr)
				                        		.animate({opacity: 1}, config.timeout);
				                        	config.callBack && $.isFunction(config.callBack) && config.callBack(img);
					                    });
								}

		                    });
					
				});
			}, $.spice.config.throttleTime)
			, debounced = $.spice.debounce(function() {
			    $W.trigger('scroll.lazyLoad');
			}, $.spice.config.debounceTime);
			
			$W
			.off('scroll.lazyLoad')
			.on('scroll.lazyLoad', throttled)
			.resize(debounced).trigger('scroll.lazyLoad');
	}
}, 'lazyLoad');