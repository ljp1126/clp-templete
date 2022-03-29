/**
 *
 * 图片360旋转
 * 详细用法请参考：http://v3.spice.lh/javascript/drag360
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
    //存储默认参数
    var defaultOptions = {
            imgSrc: '/docs/images/360/surface%i%.jpg'
            , imgNum: 36
            , scale: 10
            , animate: false
            , speed: 70
            , callBack: null
        };

    var defaultFunc = {
            namespace: '.drag360'
            , loadImg: function(self){
                var imgNum = self.opt.imgNum
                    , imgSrc = self.opt.imgSrc
                    , imgList = [];

                for(var i = 1; i <= imgNum; i++){
                    imgList.push( imgSrc.replace('%i%', i) );
                }

                $.when.apply($, $(imgList).map(function(i, el) {
                    if (el) {
                        var def = $.Deferred();
                        var img = new Image();
                        img.onload = function () {
                            def.resolve();
                            var inLoad = self.elem.data('data-in-load');
                            if(!inLoad){
                                inLoad = 1;
                            }else{
                                ++inLoad;
                            }
                            self.elem.data('data-in-load', inLoad);
                            self.opt.callBack && $.isFunction(self.opt.callBack) && self.opt.callBack( Math.ceil(100*inLoad/imgNum)+'%' );
                        }
                        img.src = el;
                        return def.promise();
                    }
                    return true;
                })).done(function(){
                    if( $('img.drag-loading', self.elem).length != 0 ){
                        $('img.drag-loading', self.elem).fadeOut('slow');
                        $('img.drag-image', self.elem).fadeIn('slow', function() {
                            setTimeout(function(){
                                defaultFunc.scrollHover(self);
                                defaultFunc.animate( self );
                            }, 400);
                        });
                    }else{
                        defaultFunc.scrollHover(self);
                        defaultFunc.animate( self );
                    }
                });
            }
            , setImgSrc: function(self, i){
                $('img.drag-image', self.elem).attr('src', self.opt.imgSrc.replace('%i%', i));
            }
            , animate: function( self ){
                var opt = self.opt
                    , current = self.elem.attr('data-current') || 0;
                ++current;
                self.elem.attr('data-current', current);
                defaultFunc.setImgSrc(self, current);
                var animate = opt.animate, speed = opt.speed;
                if( animate && speed && $.isNumeric(speed) ){
                    self.elem.data('spice.drag360.animate', true);
                    if( current > opt.imgNum ){
                        self.elem.attr('data-current', 1);
                        defaultFunc.setImgSrc(self, 1);
                        self.elem.data('spice.drag360.animate', false);
                    }else{
                        setTimeout(function(){
                            defaultFunc.animate( self );
                        }, speed);
                    }
                }
            }
            , sx: 0
            , mx: 0
            , scrollHover: function(self){

                var mousemove = $.spice.mousemove + defaultFunc.namespace
                    , mouseup = $.spice.mouseup + defaultFunc.namespace
                    , mousedown = $.spice.mousedown + defaultFunc.namespace;

                $('body,html')
                    .on(mousedown, function(e){
                        var $self = $(this);

                        //如果当前点击元素处理动画状态，退出拖拽
                        if( !!self.elem.data('spice.drag360.animate') ) return false;

                        //判断当前点击元素是否在360°旋转的区域内
                        if($.contains(self.elem[0], e.target)){
                            //如果不是移动端，点击元素直接添加阻止浏览器默认事件
                            if(!$.spice.hasTouch) e.preventDefault();

                            if( $(e.target).hasClass('btn') || $(e.target).closest('.btn').length != 0 ){

                                var $btn = $(e.target).hasClass('btn') ? $(e.target) : $(e.target).closest('.btn');
                                var opt = self.opt
                                    , speed = opt.speed
                                    , interval = null;
                                if( speed && $.isNumeric(speed) ){
                                    interval = setInterval(function(){
                                                    var current = self.elem.attr('data-current') || 0;

                                                    if( $btn.hasClass('btn-drag-next') ){
                                                        ++current;
                                                        if( current > opt.imgNum ){
                                                            current = 1;
                                                        }
                                                    }else{
                                                        --current;
                                                        if( current <= 0 ){
                                                            current = opt.imgNum;
                                                        }
                                                    }

                                                    self.elem.attr('data-current', current);
                                                    defaultFunc.setImgSrc(self, current);
                                                }, speed);
                                }
                                $self.off(mouseup).on(mouseup, function(e){
                                    interval && clearInterval( interval );
                                });

                            }else{
                                var exy = $.spice.getEventXY(e), num = 0;
                                defaultFunc.sx = exy.x;
                                defaultFunc.mx = 0;

                                $self.on(mousemove, function(e){
                                    var exy = $.spice.getEventXY(e);
                                    defaultFunc.mx = exy.x;
                                    if(Math.abs(defaultFunc.mx - defaultFunc.sx) > 8) e.preventDefault();
                                    var i = (defaultFunc.mx - defaultFunc.sx)/self.opt.scale;

                                    num = parseInt((+self.elem.attr('data-current') + i + Math.abs(Math.floor(i/self.opt.imgNum))*self.opt.imgNum)%self.opt.imgNum) + 1;
                                    defaultFunc.setImgSrc(self, num);

                                })
                                .on(mouseup, function(e){
                                    //鼠标松开，移除绑定事件
                                    $self.off(mousemove).off(mouseup);
                                    self.elem.attr('data-current', num);
                                    //defaultFunc.scrollInertia(self);
                                });
                            }
                            
                        }
                        
                    });

            }
    };

    var drag360 = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    drag360.prototype = {
        init: function(){
            defaultFunc.loadImg(this);
        }
        , destroy: function(){
            this.elem.removeData('data-in-load');
            defaultFunc.setImgSrc(this, 1);
            $('body,html').off($.spice.mousedown + defaultFunc.namespace);
        }
    }

    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.drag360');
            if (!data) $self.data('spice.drag360', (data = new drag360($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    return plugin;

}, 'drag360');