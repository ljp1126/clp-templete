/**
 *
 * 结合现有插件封装的可多次重复利用的插件代码段
 * 详细用法请参考：http://v3.spice.lh/javascript/tools
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0 
 *
 */

(function($){

	var spice = $.spice
		, tools = spice.tools = {};
	
    // 数量加减
    function calculateNum(){
        // 判断数量加减插件是否加载，如果当前页面有数量加减插件，则继续往下执行
        if( !!spice.calculateNum ){
            spice.calculateNum( arguments[0].elem, arguments[0].options );
        }
    }

    // 调用方法为： $.spice.tools.calculateNum();
    tools.calculateNum = function(opt){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {
                    btnMinus: '.events-minus'
                    , btnPlus: '.events-plus'
                    , textInput: '.events-input'
                    , max: 10
                    , min: 0
            }, opt.options);

        opt.elem = opt.elem || '.events-calculate-num';
        
        calculateNum.apply(this, [opt]);
    }
    // 根据频幕宽度切换图片
    // 调用方法为： $.spice.tools.changeImageSrc();
    tools.changeImageSrc = function(opt){

        if ( !(this instanceof arguments.callee) ) return new spice.tools.changeImageSrc(opt);

        if( !$.isPlainObject(opt) ) opt = {};


        this.opt = $.extend({}, this.opt, opt);

        this.init();
    }


    tools.changeImageSrc.prototype = {
        opt:{
            elem: 'img[data-image]'
            , lazyData : 'lazysrc'
            , highName : 'high'
            , normalName : 'normal'
            , callBack : null
        }
        , init: function(){
            var self = this
                , opt = self.opt
                , elem = $( self.opt.elem );

            self.preMedia = null;

            $(window).on('resize.changeSrc', function(){
                var $img = $( self.opt.elem )
                    , media = self._checkMedia(self, opt);
                
                media.isChanged && self._setSrc(self, $img, media.mediaNow);
            }).trigger('resize.changeSrc');

        }

        , _checkMedia : function(self, opt){
            var obj = !!opt.config ? opt.config : $.spice.config.resize
                , sortByObj = spice.sortBy(obj)
                , invertObj = spice.invert(obj)
                , doChange
                , media;
            
            var wW = spice.getWindowWidth();

            $.each(sortByObj, function(i, v){
                if(i === 0){
                    if(wW <= v){
                        media = invertObj[v];
                    }
                }
                if(sortByObj[i+1]){
                    if(wW <= sortByObj[i+1] && wW >= v){
                        media = invertObj[v];
                    }
                }else{
                    if( wW > v ){
                        media = invertObj[v];
                    }
                }
            });

            doChange = self.preMedia == media ? false : true;
            self.preMedia = media;

            return {
                isChanged : doChange //是否越界
                , mediaNow : media //当前设备名
            };
        }

        , _setSrc: function(self, img, media){

            img.each(function(i, j){
                var $this = $(j)
                    , srcJson = $.parseJSON( $this.attr('data-image') )
                    , dpr = window.devicePixelRatio
                    , n = dpr > 1 ? self.opt.highName : self.opt.normalName
                    , srcO = srcJson[media]
                    , src = $.isPlainObject(srcO) ? ( srcO[n] ? srcO[n] : srcO[self.opt.normalName] ) : srcO;
                    self.media = media


                if ( $this.attr( self.opt.lazyData ) ) {
                    $this.attr(self.opt.lazyData, src);

                    self.opt.callBack && $.isFunction(self.opt.callBack) && self.opt.callBack( $this, self );
                } else{
                    var $img = $this.clone(true);

                    $img.attr({
                        'src': src
                    });
                    
                    $this.replaceWith($img);

                    self.opt.callBack && $.isFunction(self.opt.callBack) && self.opt.callBack( $img, self );
                }
                
            });
        }

    }
    // 放大镜效果
    function cloudZoom(){
        // 判断放大镜效果插件是否加载，如果当前页面有放大镜效果插件，则继续往下执行
        if( !!spice.cloudZoom ){
            spice.cloudZoom( arguments[0].elem, arguments[0].options );
        }
    }

    // 原图旁边放大
    // 调用方法为： $.spice.tools.cloudZoom();
    tools.cloudZoom = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {
                            animationTime: 300
                            , easeTime: 0
                            , zoomWidth: 200
                            , zoomHeight: 350
                            , zoomOffsetX: 0
                        }, opt.options);

        opt.elem = opt.elem || '.events-cloudzoom';

        var $cloudzoom = $(opt.elem);
        if($cloudzoom.length != 0){
            $('.cloudzoom-blank').remove();
            $.each($cloudzoom, function(i, elem){
                var cz = $(elem).data('CloudZoom');
                    cz && cz.destroy();
               cloudZoom.apply(this, [opt]);
            });
        }
    }

    // 原图放大
    // 调用方法为： $.spice.tools.cloudZoomInside();
    tools.cloudZoomInside = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                            animationTime: 300
                            , easeTime: 0
                            , zoomWidth: 200
                            , zoomHeight: 350
                            , zoomOffsetX: 20
                            , zoomPosition: 'inside'
                        }, opt.options);

        opt.elem = opt.elem || '.events-cloudzoom-inside';

        var $cloudzoom = $(opt.elem);
        if($cloudzoom.length != 0){
            $('.cloudzoom-blank').remove();
            $.each($cloudzoom, function(i, elem){
                var cz = $(elem).data('CloudZoom');
                    cz && cz.destroy();
               cloudZoom.apply(this, [opt]);
            });
        }
    }

    // 图片延迟加载
    function dropdown(){
        // 判断图片延迟加载插件是否加载，如果当前页面有图片延迟加载插件，则继续往下执行
        if( !!spice.dropdown ){
            spice.dropdown( arguments[0].elem, arguments[0].options );
        }
    }

    // 调用方法为： $.spice.tools.dropdown();
    tools.dropdown = function(opt){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {}, opt.options);

        opt.elem = opt.elem || '.events-dropdown';
        
        dropdown.apply(this, [opt]);
    }
    // 轮播
    function kvScroll(){
        // 判断轮播插件是否加载，如果当前页面有轮播插件，则继续往下执行
        if( !!spice.kvScroll ){
            spice.kvScroll( arguments[0].elem, arguments[0].options );
        }
    }

    // 默认效果，从右往左滑动
    // 当滑动到最后一帧时，还可以再次往后滑动，并到达第一帧，依次循环轮播
    // 调用方法为： $.spice.tools.kvScroll();
    tools.kvScroll = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {
                        type: 'scroll-loop'
                        , autoPlay: true
                        , loop: true
                        , dot: {
                            style: 'dot'
                        }
                    }, opt.options);

        opt.elem = opt.elem || '.events-kvScroll';

        kvScroll.apply(this, [opt]);
    }

    // 默认效果，从右往左滑动
    // 当滑动到最后一帧时，还可以再次往后滑动，并到达第一帧，依次循环轮播
    // 调用方法为： $.spice.tools.kvScrollX();
    tools.kvScrollX = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'scroll-loop'
                    , autoPlay: true
                    , loop: true
                    , dot: {
                        style: 'dot'
                    }
                }, opt.options);

        // 只允许使用 scroll 进行轮播
        if(opt.options.type != 'scroll' && opt.options.type != 'scroll-loop'){
            opt.options.type = 'scroll-loop';
        }

        // 强制设置滚动为 x 方向
        opt.options['axis'] = 'x';

        opt.elem = opt.elem || '.events-kvScroll-x';

        kvScroll.apply(this, [opt]);
    }

    // 默认效果，从下往上滑动
    // 当滑动到最后一帧时，还可以再次往后滑动，并到达第一帧，依次循环轮播
    // 调用方法为： $.spice.tools.kvScrollY();
    tools.kvScrollY = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'scroll-loop'
                    , autoPlay: true
                    , loop: true
                    , axis: 'y'
                }, opt.options);

        // 只允许使用 scroll 进行轮播
        if(opt.options.type != 'scroll' && opt.options.type != 'scroll-loop') opt.options.type = 'scroll-loop';

        // 强制设置滚动为 y 方向
        opt.options['axis'] = 'y';

        opt.elem = opt.elem || '.events-kvScroll-y';

        kvScroll.apply(this, [opt]);
    }

    // 渐隐渐现图片切换效果
    // 调用方法为： $.spice.tools.scrollFade();
    tools.kvScrollFade = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'fade'
                    , autoPlay: true
                    , loop: true
                    , dot: {
                        style: 'dot'
                    }
                }, opt.options);

        // 只允许使用 fade 进行轮播
        opt.options.type = 'fade';

        opt.elem = opt.elem || '.events-kvScroll-fade';

        kvScroll.apply(this, [opt]);
    }

    // 多图轮播效果
    // 调用方法为： $.spice.tools.scrollGallery();
    tools.scrollGallery = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'gallery'
                    , autoPlay: false
                    , loop: false
                    , moveNum: 2
                }, opt.options);

        // 只允许使用 gallery 进行轮播
        opt.options.type = 'gallery';

        opt.elem = opt.elem || '.events-kvScroll-gallery';

        kvScroll.apply(this, [opt]);
    }

    // x轴多图轮播效果
    // 调用方法为： $.spice.tools.scrollGalleryX();
    tools.scrollGalleryX = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'gallery'
                    , autoPlay: false
                    , loop: false
                    , moveNum: 2
                    , axis: 'x'
                }, opt.options);

        //只允许使用 gallery 进行轮播
        opt.options.type = 'gallery';
        // 强制设置滚动为 x 方向
        opt.options['axis'] = 'x';

        opt.elem = opt.elem || '.events-kvScroll-gallery-x';

        kvScroll.apply(this, [opt]);
    }

    // y轴多图轮播效果
    // 调用方法为： $.spice.tools.scrollGalleryY();
    tools.scrollGalleryY = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'gallery'
                    , autoPlay: false
                    , loop: false
                    , moveNum: 2
                    , axis: 'y'
                }, opt.options);

        // 只允许使用 gallery 进行轮播
        opt.options.type = 'gallery';
        // 强制设置滚动为 y 方向
        opt.options['axis'] = 'y';

        opt.elem = opt.elem || '.events-kvScroll-gallery-y';

        kvScroll.apply(this, [opt]);
    }

    // 多图轮播响应效果
    // 调用方法为： $.spice.tools.scrollGalleryRes();
    tools.scrollGalleryRes = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};
        opt.options = $.extend({}, {
                    type: 'gallery'
                    , autoPlay: false
                    , loop: false
                    , moveNum: 1
                    , axis: 'x'
                }, opt.options);

        // 只允许使用 gallery 进行轮播
        opt.options.type = 'gallery';
        // 强制设置滚动为 x 方向
        opt.options['axis'] = 'x';

        opt.elem = opt.elem || '.events-kvScroll-gallery-res';

        var $gallery = $(opt.elem)
            , $li = $('li', $gallery)
            , liBlockLength = $('li:not([class*=none])', $gallery).length
            , liLength = $li.length;

        kvScroll.apply(this, [opt]);

        $('ul', $gallery).css({width: (liLength/liBlockLength)*100+'%'});
        $li.css({width:(100/liLength)+'%'}).removeClass('none');
    }
    // 图片延迟加载
    function lazyLoad(){
        // 判断图片延迟加载插件是否加载，如果当前页面有图片延迟加载插件，则继续往下执行
        if( !!spice.lazyLoad ){
            spice.lazyLoad( arguments[0].elem, arguments[0].options );
        }
    }

    // 调用方法为： $.spice.tools.lazyLoad();
    tools.lazyLoad = function(opt){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {}, opt.options);

        opt.elem = opt.elem || 'img[lazy-src]';
        
        lazyLoad.apply(this, [opt]);
    }
    // 水印效果
    function placeholder(){
        // 判断水印插件是否加载，如果当前页面有水印插件，则继续往下执行
        if( !!spice.placeholder ){
            spice.placeholder( arguments[0].elem, arguments[0].options );
        }
    }

    // 调用方法为： $.spice.tools.placeholder();
    tools.placeholder = function(opt){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {}, opt.options);

        opt.elem = opt.elem || 'input[type=text], textarea';
        
        placeholder.apply(this, [opt]);
    }
    // 滚动条插件
    function tinyscrollbar(){
        //判断移动端是否用iscroll
        if ( arguments[0].isIscroll && $.spice.hasTouch ) {
            var $elem = $( arguments[0].elem );
            //获取iscroll参数
            var o = $.extend(true, {}, { 
                    preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ } 
                    , scrollbars: true
                    , interactiveScrollbars: true
                }, arguments[0].isIscroll.options)

            //判断是否有滚动条，有则刷新，没有则添加
            if ( $elem.data('iscroll') ) {
                $elem.data('iscroll').refresh();
            } else{
                $elem.data('iscroll', new IScroll( $('.viewport', $elem)[0], o ));
            }
        } else{
            // 判断滚动条插件是否加载，如果当前页面有滚动条插件，则继续往下执行
            if( !!spice.tinyscrollbar ){
                // 该方法可实想效果：
                // 当【内容区域】大于【可视区域】时，自动调用滚动条
                // 如果不是第一次调用，自动执行内置 resize 方法
                var $elem = $( arguments[0].elem );
                if( $elem.length != 0 ){
                    var $viewport = $('.viewport', $elem)
                        , $overview = $('.overview', $elem);

                    // 还原滚动位置，避免取值错误
                    $overview.removeAttr('style');
                    // 如果滚动内容部分的高度大于可视区域的高度
                    // 则执行滚动条插件
                    if( $overview.height() > $viewport.height() ){
                        // 如果已经执行过滚动条插件，可执行 window 的 resize，不需要多次调用
                        // 如果没有执行过插件，则执行因此
                        if( $elem.data('spice.tinyscrollbar') ){
                            $(window).trigger( 'resize.tinyscrollbar' );
                        }else{
                            spice.tinyscrollbar( $elem, arguments[0].options );
                        }
                        $('.scrollbar', $elem).removeClass('none');
                    }else{
                        $(window).trigger( 'resize.tinyscrollbar' );
                        $('.scrollbar', $elem).addClass('none');
                    }
                }
            }
        }
    } 
    
    tools.tinyscrollbar = function( opt ){
        if( !$.isPlainObject(opt) ) opt = {};

        opt.options = $.extend({}, {
                        wheelLock: false
                        , touchLock: false
                    }, opt.options);

        opt.elem = opt.elem || '.events-tinyscrollbar';

        tinyscrollbar.apply(this, [opt]);
    }
    
    tools.tinyscrollbar.destroy = function(elem){
        var $elem = $( elem );
        if( $elem.length != 0 && $.spice.tinyscrollbar ){
            if( $elem.data('spice.tinyscrollbar') ){
                $elem.data('spice.tinyscrollbar').remove();
                $elem.removeData('spice.tinyscrollbar');
            }
        }
    }
    // 回到顶部
    // 添加 events-top 类
    var $eventsTop = $('.events-top');

    $eventsTop.on('tap', function(){
        $('body, html').animate({scrollTop:0},300);
        return false;
    });

    var scrollToTop = $.spice.throttle(function() {
	     var $self = $(window)
            , sT = $self.scrollTop();
        // 当滚动的高度大于屏幕高度的时候，出现 回到顶部 按钮，否则隐藏
        $eventsTop[sT > $self.height() ? 'show' : 'hide']();
	}, $.spice.config.throttleTime);

	$(window)
		.on('scroll.scrollTop', scrollToTop)
		.trigger('scroll.scrollTop');

})(jQuery);