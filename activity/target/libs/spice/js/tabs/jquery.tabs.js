/**
 *
 * 插件模版
 * 详细用法请参考：http://xxxx/
 *
 * @ author 
 * @ version 
 *
 */

(function($){

    "use strict";

    //存储默认参数
    var defaultOptions = {
            tabsConfig: {
                standard:{
                    show: {
                        easing: 'show'
                        , speed: 0
                    }
                    , hide: {
                        easing: 'hide'
                        , speed: 0
                    }
                }
                , medium:{
                    show: {
                        easing: 'show'
                        , speed: 0
                    }
                    , hide: {
                        easing: 'hide'
                        , speed: 0
                    }
                }
                , small:{
                    show: {
                        easing: 'slideDown'
                        , speed: 'normal'
                    }
                    , hide: {
                        easing: 'slideUp'
                        , speed: 'normal'
                    }
                }
            }
            , resize: $.spice.config.resize
            , titlecontainer: 'spice-md-tabs-title'
            , titleItemLable: 'li' 
            , contentContainer: 'spice-md-tabs-content' 
            , contentItem: 'spice-md-tabs-item'
            , mobileTitle: 'spice-md-tabs-item-title'
            , content: 'spice-md-tabs-item-content'
            , currentClass: 'is-active'
            , tinyscrollbarCallBack: null
            , tinyscrollbarConfig: {}
            , customScroll: null
            , isIscroll: false
            , mediaTinyscrollbar: {
                small: false
                , medium: true
                , standard: true
            }
            , TinyscrollbarDisabledClass: 'is-inhert'
            , callBack: function(objT, objC){
 
            }
        };

    var tabs = function(elem, option){
        var self  = this
            self.elem = $(elem);

        self.opt = $.extend({}, defaultOptions, option);
        self.init();
    }

    tabs.prototype = {
        init: function(){
            var self = this
                , $elem = self.elem
                , opt = self.opt
                , $title = $('.' + opt.titlecontainer, $elem)
                , $titleItem = $(opt.titleItemLable, $title)
                , $contentContainer = $('.' + opt.contentContainer, $elem)
                , $contentItem = $('.' + opt.contentItem, $contentContainer)
                , $mobileTitle = $('.' + opt.mobileTitle, $contentItem)
                , $content = $('.' + opt.content, $contentItem);

            self.$titleItem = $titleItem;
            self.$contentItem = $contentItem;
            self.$content = $content;
            self.$mobileTitle = $mobileTitle;

            if( $mobileTitle.length <= 0 ){
                $titleItem.each(function(index, el) {
                    $(el).find('a').clone().prependTo( $contentItem.eq( index ) ).wrap('<div class=' + opt.mobileTitle + '></div>');
                });
                $mobileTitle = $('.' + opt.mobileTitle, $contentItem)
            }


            var tabsScreenDebounce = $.spice.resizeScreenDebounce({
                isRetinaCheck: false
                , callBack: function(media){
                    var resizeMedia = opt.tabsConfig[media];
                    self.tinysScrollBar(opt.mediaTinyscrollbar, media);


                    $titleItem.off('tap').on('tap', function(event) {
                        var $self = $(this)
                            , index = $self.index()  
                            , $contentCurrent = $contentItem.eq( index )
                            , $contentCurrentItem = $contentCurrent.find('.' + opt.content)
                            , $contentOld = $contentItem.filter('.' + opt.currentClass)
                            , $contentOldItem = $contentOld.find('.' + opt.content);

                        if( !self.isNotAnimate() || $self.hasClass(opt.currentClass) ){
                            return false;
                        }

                        $self.addClass( opt.currentClass ).siblings().removeClass( opt.currentClass );
                        $contentCurrent.addClass( opt.currentClass ).siblings().removeClass( opt.currentClass );

                        if( resizeMedia.show.easing == 'fadeIn' ){
                            if( $contentOldItem.height() < $contentCurrentItem.height()){
                                $contentOldItem.css({
                                    position: 'absolute'
                                    , top: 0
                                });
                            }else{
                                $contentCurrentItem.css({
                                    position: 'absolute'
                                    , top: 0
                                }); 
                            }
                        }
                        $contentCurrentItem.stop(true, true)[resizeMedia.show.easing](resizeMedia.show.speed, function(){

                            self.tinysScrollBar(opt.mediaTinyscrollbar, media);
                            opt.callBack && $.isFunction(opt.callBack) && opt.callBack($self, $contentCurrentItem);
                        });
                        $('.' + opt.content + ':visible', $contentItem)
                                .not($contentCurrentItem[0])[resizeMedia.hide.easing](resizeMedia.hide.speed, function(){
                            if( resizeMedia.show.easing == 'fadeIn' ){
                                $content.css({
                                    position: 'relative'
                                }); 
                            }
                        });
                    });
                    
                    // mobile
                    $mobileTitle.off('tap').on('tap', function(event){
                        var $self = $(this)
                            , $contentCurrent = $self.closest('.' + opt.contentItem)
                            , $contentCurrentItem = $self.siblings('.' + opt.content)
                            , index = $contentCurrent.index();

                        if( !self.isNotAnimate() || $contentCurrent.hasClass(opt.currentClass) ){
                            return false;
                        }
                        $contentCurrentItem[resizeMedia.show.easing](resizeMedia.show.speed, function(){

                            self.tinysScrollBar(opt.mediaTinyscrollbar, media);
                            opt.callBack && $.isFunction(opt.callBack) && opt.callBack($self, $contentCurrentItem);
                        });
                        $contentCurrent.addClass(opt.currentClass)
                                        .siblings().removeClass(opt.currentClass)
                                        .find('.' + opt.content)[resizeMedia.hide.easing](resizeMedia.hide.speed, function(){

                                        });
                        $titleItem.removeClass(opt.currentClass).eq( index ).addClass(opt.currentClass);
                    });                 
                }
            });
            $(window)
            .off('resize.tabsScreenDebounce')
            .on('resize.tabsScreenDebounce', tabsScreenDebounce)
            .trigger('resize.tabsScreenDebounce');
        }
        , tinysScrollBar: function(mediaTinyscrollbar, media){
            var self = this
                , $elem = self.elem;

                if( !mediaTinyscrollbar[media] ){
                    $('.tinyscrollbar .viewport', $elem).addClass(self.opt.TinyscrollbarDisabledClass);
                }else{
                    $('.tinyscrollbar .viewport', $elem).removeClass(self.opt.TinyscrollbarDisabledClass);
                }
                
                if( self.opt.customScroll ){
                    $.isFunction(self.opt.customScroll) && self.opt.customScroll(self);
                }else{
                    if( !self.opt.tinyscrollbarConfig.callBack ){
                        self.opt.tinyscrollbarConfig.callBack = function( o ){
                            self.opt.tinyscrollbarCallBack && $.isFunction(self.opt.tinyscrollbarCallBack) && self.opt.tinyscrollbarCallBack(self, o);
                        }
                    }
                    //滚动条
                    $.spice.tools.tinyscrollbar({
                            elem: $('.tinyscrollbar', $elem)
                            , options: self.opt.tinyscrollbarConfig
                            , isIscroll: self.opt.isIscroll
                        }); 
                }
        }
        , getCurrentElem: function(){
            var self = this
                , windoww = $(window).width();
            return windoww > 767 ? $(self.$titleItem).filter('.' + self.opt.currentClass) : $(self.$contentItem).filter('.' + self.opt.currentClass).find('.' + self.opt.mobileTitle);
        }
        , contentHeight: function(){
            var self = this
                , $contentCurrentItem = $(self.$contentItem).filter('.' + self.opt.currentClass);
            return $( '.' + self.opt.content, $contentCurrentItem ).outerHeight(true);
        }
        , isNotAnimate: function(){
            var sz = [ ];
            $.each(this.$content, function(i, elem){
                sz.push( $(elem).is(':not(:animated)') );
            });
            return $.inArray(false, sz) < 0
        }
        , destroy: function(){
            var self= this
            self.$titleItem.off('tap').removeClass(self.opt.currentClass).eq( 0 ).addClass(self.opt.currentClass);
            self.$mobileTitle.off('tap');
            self.$contentItem.removeClass(self.opt.currentClass).eq( 0 ).addClass(self.opt.currentClass);
            self.$content.removeAttr('style');
            self.$content.data('spice.tinyscrollbar') && self.$content.data('spice.tinyscrollbar').remove();
            self.elem.removeData('spice.tabs');
        }
    }

    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.tabs');
            if (data){
                data.destroy();
            }
            $self.data('spice.tabs', (data = new tabs($self, option)));
            rtn.push(data);
        });
        return rtn;
    }


    $.spice.tabs = plugin;

})(jQuery);