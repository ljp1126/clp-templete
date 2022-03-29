/**
 *
 * 菜单下拉框
 * 详细用法请参考：http://v3.spice.lh/javascript/menus
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0
 *
 */

(function($){

    "use strict";

    //存储默认参数
    var defaultOptions = {
            events: $.spice.click
            , dropElem: '.events-menus'
            , showElem: '.sub-menu'
            //设置显示的方式，可设置 string {show \ slideDown \ fadeIn}
            , showAnimate: 'show'
            //设置隐藏的方式，可设置 string {hide \ slideUp \ fadeOut}
            , hideAnimate: 'hide'
            //设置动画执行的时间，可设置 string or number {'slow','normal', or 'fast'}
            , speed: ['normal', 'normal']
        };

    var menus = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    menus.prototype = {
        init: function(){
            var $self = this
                , opt = $self.opt
                , elem = $self.elem
                , $dropElem = $(opt.dropElem, elem);

            if($.type(opt.events) == 'array'){
                $dropElem
                    .on(opt.events[0], function(){
                        var $elem = $(opt.showElem, this);
                        $self.show($elem);
                    })
                    .on(opt.events[1], function(){
                        var $elem = $(opt.showElem, this);
                        $self.hide($elem);
                    });
            }else{
                $dropElem.on(opt.events, function(){
                    var $elem = $(this).siblings(opt.showElem);
                    if($elem.length === 0){
                        $elem = $(this).parent().siblings(opt.showElem);
                    }
                    $self[$elem.is(':visible') ? 'hide' : 'show']($elem);
                });
            }
        }
        /**
         * 取消所有正在运行的动画
         *
         */
        , stop: function(){
            $(this.opt.showElem).each(function(i, j){
                $(j).stop(true, true);
            });
        }
        /**
         * 显示菜单
         *
         */
        , show: function(elem){
            var $self = this;
            $self.stop();
            elem.stop(true, true).delay(0)[$self.opt.showAnimate]($self.opt.speed[0], function(){
                $self.elem.trigger('menuShow', {self: $self});
            });
        }
        /**
         * 隐藏菜单
         *
         */
        , hide: function(elem){
            var $self = this;
            elem.stop(true, true)[$self.opt.hideAnimate]($self.opt.speed[1], function(){
                $self.elem.trigger('menuHide', {self: $self});
            });
        }
        , destroy: function(){
            this.stop();
            $(this.opt.dropElem, this.elem).off();
        }
    }

    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.menus');
            if (!data) $self.data('spice.menus', (data = new menus($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    //$.fn.menus             = plugin;
    //$.fn.menus.Constructor = menus;
    $.spice.menus = plugin;

})(jQuery);