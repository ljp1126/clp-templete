(function($){

	"use strict";

	var defaultOptions = {
            url: ''
            , queryKey : ''
            , searchUrl : '/?search='
            , checkData: null
            , inputClass: 'form-input-searchbox'
            , submenuClass: 'sub-menu-searchbox'
            , ulClass: 'sub-menu-ul-searchbox'
            , btnClass: 'link-btn-searchbox'
            , activeClass: 'selected'
            , datahref: 'data-href'
            , tinyscrollbarCallBack: null
            , tinyscrollbarConfig: {}
            , customScroll: null
            , isIscroll: false
        };

    var defaultFunc = {
        setMenu: function(str, menu, self){
            var elem = self.elem
                , opt = self.opt
                , $menu = menu
                , li = $(str);

            self.elem.find( '.' + opt.ulClass ).html(li)

            $menu.find('li').on('tap',function(){
                var $this = $(this)
                    , val = $.trim( $this.find('a').text() )
                    , href = $this.attr( opt.datahref )
                    , $input = self.elem.find( '.' + opt.inputClass );

                $menu.hide();
                $input.val( val );

                defaultFunc.linkJump(href, self);
            });
            $menu.show();

        }
        , setLi: function(o, self){
            var str = []
                , a = o.search;

            for (var i = 0; i < a.length; i++) {
                str.push('<li '+ self.opt.datahref +'='+ a[i].keyword + ' ><a>' + a[i].text +'</a></li>')
            }

            return str.join('')
        }

        , hideMenu: function(self){
            var $menu = self.elem.find( '.' + self.opt.submenuClass );

            !$menu.is('select') && $menu.hide()
        }

        , showMenu: function(input, self){
            var $input = input
                , $menu = self.elem.find( '.' + self.opt.submenuClass );

            if( $menu.find('li').length > 0 ) {
                $menu.show();
            }else {
                var val = $input.val()
                    , placeholder = $input.attr('placeholder');

                if ( val != '' && val != placeholder ) {
                    $input.trigger('keyup.SearchBox');
                } 
            }

            
        }
        , linkJump: function(link, self){

            if (link) { window.location.href= self.opt.searchUrl + link }
            
        }

    }


    var SearchBox = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    SearchBox.prototype = {
    	init: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
                , $input = elem.find( '.' + opt.inputClass )
                , $menu = elem.find( '.' + opt.submenuClass )
                , $linkBtn = elem.find( '.' + opt.btnClass );

            $input.on('keyup.SearchBox', function(e){
                var $this = $(this)
                    , key = e.keyCode
                    , val = $this.val()
                    , $menu = self.elem.find( '.' + self.opt.submenuClass )
                    , $li = $menu.find('li')
                    , $input = self.elem.find( '.' + self.opt.inputClass );

                //判断是否有值
                if ( val == '' ) {
                    defaultFunc.hideMenu(self);
                }else {
                    //判断是否是回车键
                    if ( key == 13  ) {

                        defaultFunc.hideMenu(self);

                        var liOn = $menu.find('.' + self.opt.activeClass );
                        liOn.length > 0 && $this.val( $.trim( liOn.find('a').text() ) );

                        var datahref = liOn.attr( self.opt.datahref )
                            , link = datahref ? datahref : $this.val()

                        defaultFunc.linkJump(link, self);

                    } else{
                        if ( key != 37 && key != 38 && key != 39 && key != 40 && key != 9) {
                            var obj = {}
                            obj[opt.queryKey] = val;

                            if ( !self.opt.url || !self.opt.queryKey ) return false;

                            var str = ''
                                , o = $.spice.syncXhr( self.opt.url , obj );

                            if ( !o ) {
                                defaultFunc.hideMenu(self);
                                return false
                            }

                            if ( opt.checkData && $.isFunction(opt.checkData) ) {
                                str = opt.checkData( o, self );
                            } else{
                                if( typeof o == 'object' ){
                                    str = defaultFunc.setLi(o, self);
                                } else{
                                    str = o;
                                }
                                
                            }

                            defaultFunc.setMenu(str, $menu, self);
                            
                            
                            // 滚动条
                            var tinyscrollbarConfig = opt.tinyscrollbarConfig
                                , customScroll = opt.customScroll;
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
                    }
                }

                
            });
    
            //上下移动事件
            $input.on('keydown.SearchBox', function(e){
                var key = e.keyCode
                    , $menu = self.elem.find( '.' + self.opt.submenuClass )
                    , $li = $menu.find('li')
                    , $thisLi = $menu.find('li.' + self.opt.activeClass )
                    , lmax = $li.length -1;

                //向下选择
                if ( key == 40 ) {
                    var $nextLi = $thisLi.next();
                    $thisLi = $nextLi.length == 0 ? $li.eq(0) : $nextLi ;

                    $li.removeClass( self.opt.activeClass );
                    $thisLi.addClass( self.opt.activeClass );

                    var liH = $li.eq(0).innerHeight()
                        , mT = Math.abs( parseInt( $menu.find('.overview').css('marginTop') ) )
                        , liT = liH * ( $li.index($thisLi) + 1) - mT
                        , Vh = $menu.find('.viewport').height();

                    if( $nextLi.length == 0 ) {
                        $menu.data('spice.tinyscrollbar') && $menu.data('spice.tinyscrollbar').update( 0 );
                    }else if ( liT - Vh > 0 ) {
                        $menu.data('spice.tinyscrollbar') && $menu.data('spice.tinyscrollbar').update( liT - Vh +mT );
                    }
                }

                //向上选择
                if ( key == 38 ) {
                    var $prevLi = $thisLi.prev();
                    $thisLi = $prevLi.length == 0 ? $li.eq(-1) : $prevLi ;

                    $li.removeClass( self.opt.activeClass );
                    $thisLi.addClass( self.opt.activeClass );

                    var liH = $li.eq(0).innerHeight()
                        , mT = Math.abs( parseInt( $menu.find('.overview').css('marginTop') ) )
                        , liT = liH * ( $li.index($thisLi) )
                        , Vh = $menu.find('.viewport').height();

                    if( $prevLi.length == 0 ) {
                        $menu.data('spice.tinyscrollbar') && $menu.data('spice.tinyscrollbar').update( $menu.find('.overview').height() - Vh );
                    }else if ( mT - liT > 0 ) {
                        $menu.data('spice.tinyscrollbar') && $menu.data('spice.tinyscrollbar').update( liT );
                    }
                }

            });

            $(document).on('tap.SearchBox', function(e){
                var target = $(e.target);

                if ( target.closest( '.' + self.opt.submenuClass ).length == 0 && target.closest( '.' + self.opt.inputClass ).length == 0 ) {
                    defaultFunc.hideMenu(self);
                }
            });

            $input.on('focus.SearchBox', function(){
                defaultFunc.showMenu($(this), self);

            });


            $linkBtn.on('tap.SearchBox', function(){
                var $input = self.elem.find( '.'+ opt.inputClass );

                defaultFunc.linkJump( $input.val() , self);
                
            });


        }

        , destroy: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
                , $input = elem.find( '.' + opt.inputClass )
                , $linkBtn = elem.find( '.' + opt.btnClass );

            self.elem.removeData('spice.SearchBox')

            $input
            .off('keyup.SearchBox')
            .off('keydown.SearchBox')
            .off('focus.SearchBox');

            $linkBtn.off('tap.SearchBox');

            $(document).off('tap.SearchBox');
        }

    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.SearchBox');
            if (data){
                data.destroy();
            }
            $self.data('spice.SearchBox', (data = new SearchBox($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.spice.SearchBox = plugin;

    

})(jQuery);


