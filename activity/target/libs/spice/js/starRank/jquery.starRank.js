(function($){

	"use strict";

	var defaultOptions = {
            rankLen : 5
            , hasHalf : false
            , hasHover : true
            , defaultRank : null
            , message : null
            , messageClass : '.help-block'
            , callBack : null
            , isDefaultCallBack : true
        };

    var defaultFunc = {
        getIndex : function(self,a,t,e){
            var $this = t
                ,  $a = a
                , x = e 
                , mx = x - t.offset().left
                , p;

            if ( self.opt.hasHalf ) {
                p = mx > $this.width()/2 ? 1:0.5;
            } else{
                p = 1;
            }
            return $a.index($this)+p;

        }
        , setClass : function(a,i){
            var c = i%1 > 0 ? (i+0.5).toString()+'-1': i
                , l = i%1 > 0 ? i+0.5: i;
            a.removeClass().filter(':lt('+l+')').addClass('rank'+c);

            if ( i%1 > 0 ) {
                a.removeClass().filter(':lt('+(i-0.5)+')').addClass('rank'+(i+0.5));
                a.eq(i-0.5).addClass('rank'+ (i+0.5)+'-1' );
            } else{
                a.removeClass().filter(':lt('+i+')').addClass('rank'+i);
            }
        }
        , checkMessage : function(self){
            var m = self.opt.message
                , l = self.opt.rankLen
                , b = false;

            if ( $.isArray(m) ) {
                if ( m.length == l+1 ) {
                    b = true;
                    for (var i = 1; i < m.length; i++) {
                        if(!m[i]) {
                            b = false;
                            return b;
                        }
                    };  
                }
            }

            if ( $.type(m) == 'string' ) b = true;

            return b;

        }
        , checkRank : function(a,li){
            var b = false;
            if ( $.isArray(a) ) {
                if ( a.length == li.length ) {
                    b = true;
                    for (var i = 0; i < a.length; i++) {
                        if(!a[i] && a[i] != '') {
                            b = false;
                            return b;
                        }
                    };  
                }
            }
            return b;
        }
        , setMessage : function(self, li, i){
            var a = self.opt.message
                , c = self.opt.messageClass
                , $m = li.find(c)
                , index = i%1 > 0 ? i+0.5: i ;

            if ( $.type(a) == 'string' ){
                $m.html(a);
            } else{
                $m.html(a[index]);
            }
            

        }
        , setLiRank : function(li,i){
            li.data({
                'spice.StarRank.rank' : i
            })
        }
        , getLiRank : function(li){
            return li.data('spice.StarRank.rank');
        }
        , defaultInit : function(self, hasMessage){
            var $li = self.elem.find('li')
                , opt = self.opt
                , defaultRank = 0
                , hasDefaultRank = defaultFunc.checkRank(self.opt.defaultRank,$li);

            $li.each(function(index, s){
                var $li = $(s)
                    , $a = $li.find('.rankBox>a');

                hasDefaultRank && ( defaultRank = self.opt.defaultRank[index] );
                !defaultRank && (defaultRank = 0);
                defaultFunc.setLiRank($li, defaultRank);
                defaultFunc.setClass($a, defaultRank);
                hasMessage && defaultFunc.setMessage(self, $li, defaultRank);
                //self.opt.isDefaultCallBack && $.isFunction(opt.callBack) && opt.callBack( self ,$li , defaultRank , 'default');
                self.li = $li;
                self.index = defaultRank;
                self.opt.isDefaultCallBack && $(self.elem).trigger('StarRank.init', self);
            });
            
        }
    }


    var StarRank = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    StarRank.prototype = {
    	init: function(){
            var self = this
                , opt = self.opt
                , len = self.opt.rankLen
                , hasMessage = defaultFunc.checkMessage(self)
                , hasTouch = $.spice.hasTouch
                , UP_EV = hasTouch ? 'touchend.kvScroll' : 'mouseup.kvScroll';


            var $box = self.elem.find('.rankBox')
                , boxHtml = [];

            //设置a标签
            for (var i = 0; i < len; i++) {
                boxHtml.push('<a></a>');
            };

            $box.append( boxHtml.join('') );

            //初始化
            defaultFunc.defaultInit(self, hasMessage);

            //添加事件
            opt.hasHover && !hasTouch && $('>a', $box).on({
                'mousemove.StarRank': function(e){
                    var $this = $(this)
                        , $li = $this.closest('li')
                        , $a = $li.find('.rankBox>a')
                        , i
                        , x = $.spice.getEventXY(e).x;

                    //获取分数
                    i = defaultFunc.getIndex(self, $a, $this, x);
                    //设置星星的class
                    defaultFunc.setClass($a, i);
                    //设置后缀信息
                    hasMessage && defaultFunc.setMessage(self, $li, i);
                    
                    //回调
                    //$.isFunction(opt.callBack) && opt.callBack( self ,$li , i , 'mousemove');
                    self.li = $li;
                    self.index = i;
                    $(self.elem).trigger('StarRank.mousemove', self);

                }
                ,'mouseleave.StarRank': function(e){
                    //获取当前分数
                    var $this = $(this)
                        , $li = $this.closest('li')
                        , $a = $li.find('.rankBox>a')
                        , lenNow = defaultFunc.getLiRank($li);
                    //设置星星的class
                    defaultFunc.setClass($a, lenNow);
                    //设置后缀信息
                    hasMessage && defaultFunc.setMessage(self, $li, lenNow);

                    //回调
                    //$.isFunction(opt.callBack) && opt.callBack( self ,$li , lenNow , 'mouseleave');
                    self.li = $li;
                    self.index = lenNow;
                    $(self.elem).trigger('StarRank.mouseleave', self);
                }
            });
            
            $('>a', $box).on( UP_EV , function(e){
                    var $this = $(this)
                        , $li = $this.closest('li')
                        , $a = $li.find('.rankBox>a')
                        , i
                        , x = $.spice.getEventXY(e).x;

                    //获取分数
                    i = defaultFunc.getIndex(self, $a, $this, x);
                    //设置星星的class
                    defaultFunc.setClass($a, i);
                    //储存当前分数
                    defaultFunc.setLiRank($li, i);
                    //设置后缀信息
                    hasMessage && defaultFunc.setMessage(self, $li, i);

                    //回调
                    //$.isFunction(opt.callBack) && opt.callBack( self ,$li , i , 'tap');
                    self.li = $li;
                    self.index = i;
                    $(self.elem).trigger('StarRank.tap', self);
            });


        }
        , getRank: function(){
            var self = this
                , $li = self.elem.find('li')
                , aRank = [];
            $li.each(function(i,s){
                var r = $(this).data('spice.StarRank.rank');
                aRank.push(r);
            });

            return aRank;
        }
        , setRank: function(a){
            var aRank = a
                , b = true
                , self = this
                , opt = self.opt
                , $li = self.elem.find('li')
                , hasMessage = defaultFunc.checkMessage(self);

            //判断传入的数组是否正确
            defaultFunc.checkRank(aRank, $li) 
            //设置星数
            && $li.each(function(index, s){
                var $li = $(s)
                    , $a = $li.find('.rankBox>a')
                    , rank = aRank[index];

                !rank && (rank = 0);
                //储存分数
                defaultFunc.setLiRank($li, rank);
                //设置星星class
                defaultFunc.setClass($a, rank);
                //设置后缀信息
                hasMessage && defaultFunc.setMessage(self, $li, rank);
                //回调
                //$.isFunction(opt.callBack) && opt.callBack( $li , rank , 'default');
                self.li = $li;
                self.index = rank;
                $(self.elem).trigger('StarRank.init', self);
            });
        }
        , destroy: function(){
            var self = this
                , opt = self.opt;

            self.elem
            .removeData('spice.StarRank')
            .find('li').removeData('spice.StarRank.rank')
            .find('.rankBox').html('');

        }

    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.StarRank');
            if (data){
                data.destroy();
            }
            $self.data('spice.StarRank', (data = new StarRank($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.spice.StarRank = plugin;

    

})(jQuery);


