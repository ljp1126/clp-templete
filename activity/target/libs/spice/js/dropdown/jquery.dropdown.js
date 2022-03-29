/**
 *
 * 按钮下拉框
 * 详细用法请参考：http://v3.spice.lh/javascript/dropdown
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
    var defaultOptions = {
            dropElem: '.btn'
            , addClass: 'is-open'
            , showElem: '.sub-menu'
            , showElemTap: 'li'
            , showElemTapCallBack: null
            , showCallBack: null
            , hideCallBack: null
            , tinyscrollbarCallBack: null
            , tinyscrollbarConfig: {}
            , customScroll: null
            , isIscroll: false
            , disabledClass: 'is-disabled'
        }
        , toggle = [];

    var dropdown = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    dropdown.prototype = {
        init: function(){
            var $self = this
                , opt = $self.opt
                , elem = $self.elem
                , $dropElem = $(opt.dropElem, elem)
                , $showElem = $(opt.showElem, elem)
                , tinyscrollbarConfig = opt.tinyscrollbarConfig
                , customScroll = opt.customScroll;

            $dropElem.off('tap.dropdown').on('tap.dropdown', function(){
                $self.hideAllMenu(elem);
                if($showElem.is(':visible')){
                    $showElem.hide();
                    elem.removeClass(opt.addClass);
                    opt.hideCallBack && $.isFunction(opt.hideCallBack) && opt.hideCallBack($self);
                }else{
                    $showElem.show();
                    elem.addClass(opt.addClass);
                    opt.showCallBack && $.isFunction(opt.showCallBack) && opt.showCallBack($self);

                    if( customScroll ){
                        $.isFunction(customScroll) && customScroll($self);
                    }else{
                        if( !tinyscrollbarConfig.callBack ){
                            tinyscrollbarConfig.callBack = function( o ){
                                opt.tinyscrollbarCallBack && $.isFunction(opt.tinyscrollbarCallBack) && opt.tinyscrollbarCallBack($self, o);
                            }
                        }

                        // 滚动条
                        $.spice.tools.tinyscrollbar({
                            elem: $('.tinyscrollbar', elem)
                            , options: tinyscrollbarConfig
                            , isIscroll: opt.isIscroll
                        });
                    }
                    
                }
            });

            $showElem.off('tap.dropdown').on('tap.dropdown', function( e ){
                if( $( e.target ).hasClass('scrollbar') || $( e.target ).closest('.scrollbar').length != 0 ){

                }else{
                    // $dropElem.trigger('tap.dropdown');
                }                
            });

            // 下拉内容点击
            $(opt.showElemTap, $showElem).off('tap.dropdown').on('tap.dropdown', function(e){
                e.preventDefault();
                // 如果点击的是禁用元素，则不关闭下拉，也不执行回调
                if( $(this).hasClass(opt.disabledClass) ) return false;

                opt.showElemTapCallBack && $.isFunction(opt.showElemTapCallBack) && opt.showElemTapCallBack($(this), $self);
                $dropElem.trigger('tap.dropdown');
                
            });
        }
        , hideAllMenu: function(elem){
            var self = this;
            $.each(toggle, function(i, j){
                $(self.opt.showElem, $(j).not(elem)).hide();
            });
        }
        , destroy: function(){
            $(this.opt.dropElem, this.elem).off('tap.dropdown');

            $(this.opt.showElemTap, this.elem).off('tap.dropdown');
            $(this.opt.showElem, this.elem).off('tap.dropdown');

            $(this.opt.showElem, this.elem).hide();
            this.elem.removeClass(this.opt.addClass);

            $.spice.tools.tinyscrollbar.destroy( $('.tinyscrollbar', this.elem) );

            this.elem.removeData('spice.dropdown');
        }
        , hide: function(){
            $(this.opt.showElem, this.elem).hide();
            this.elem.removeClass(this.opt.addClass);
        }
    }

    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        $('body').off('tap.dropdown').on('tap.dropdown', function(e){
            $.each(toggle, function(index, self){
                var data = $(self).data('spice.dropdown');
                if( data ){
                    if(!$.contains($(self)[0], e.target)){
                        $(data.opt.showElem, self).hide();
                        data.elem.removeClass(data.opt.addClass);
                        data.opt.hideCallBack && $.isFunction(data.opt.hideCallBack) && data.opt.hideCallBack( data );
                    }else{
                       //data.hideAllMenu(self);
                    }
                }
            });
        });
        //toggle = $(selector);
        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.dropdown');
            toggle.push(self);
            if (!data) $self.data('spice.dropdown', (data = new dropdown($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    return plugin;
    
}, 'dropdown');