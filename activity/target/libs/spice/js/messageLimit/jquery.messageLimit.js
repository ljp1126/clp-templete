(function($){

	"use strict";

	var defaultOptions = {
            counterClass: 'events-messageCounter'
            , isCounter: true
            , maxCount: 150
            , minCount: 0
            , isFullwidth: false
            , isCutoff: true
            , keyUpCheck: true
            , maxClass: 'is-maxLen'
            , minClass: 'is-minLen'
            , callBackKeyUp: null
            , blurCheck: true
            , errorClass: 'is-error'
            , messageClass: 'help-block'
            , maxMessage: '评论不能大于30字'
            , minMessage: '评论不能小于10字'
            , callBackBlur: null
        };

    var defaultFunc = {
        getLength : function(isFullwidth, textarea){
            if (isFullwidth) {
                return $.spice.getStringLength(textarea.val());
            } else{
                return textarea.val().length;
            }
        }
    	, setLimit : function(self){
            var $textarea = self.elem.find('textarea')
                , l
                , lmax = self.opt.maxCount;

            //获取已输入字数
            l = defaultFunc.getLength(self.opt.isFullwidth, $textarea);
            
            //判断是否截取val
            l > lmax && $textarea.val($textarea.val().substring(0, lmax));
            
        }

        , setCount : function(self){
            var $textarea = self.elem.find('textarea')
                , $count = self.elem.find( '.' + self.opt.counterClass )
                //, $record = self.elem.find( '.' + self.opt.recordClass )
                , isCounter = self.opt.isCounter
                , l
                , lmax = self.opt.maxCount;

            //获取已输入字数
            l = defaultFunc.getLength(self.opt.isFullwidth, $textarea);

            //输入剩余字数
            // $count.html(lmax-l<0?0:(lmax-l));
            // $record.html(l);

            if ( isCounter ) {
                $count.html(lmax-l<0?0:(lmax-l));
            } else{
                $count.html(l);
            }
        }
        , valCheck : function(self){
            var $textarea = self.elem.find('textarea')
                , l
                , b
                , lmax = self.opt.maxCount
                , lmin = self.opt.minCount;

            //获取已输入字数
            l = defaultFunc.getLength(self.opt.isFullwidth, $textarea);

            //判断是否添加报错样式
            if ( l > lmax && lmax > 0) {
                b = 'isMax';
            } else if( l < lmin && lmin > 0 ){
                b = 'isMin';
            } else{
                b = 'isPermited'
            }

            return {
                'len' : l
                , 'state' : b
            }
        }
        , errorCheck : function(self){
            var $textarea = self.elem.find('textarea')
                , $help = self.elem.find('.' + self.opt.messageClass)
                , l
                , b
                , m = ''
                , lmax = self.opt.maxCount
                , lmin = self.opt.minCount;

            //获取已输入字数
            l = defaultFunc.getLength(self.opt.isFullwidth, $textarea);

            if ( l > lmax ) m = self.opt.maxMessage;
            if ( l < lmin ) m = self.opt.minMessage;

            if ( m == '' ) {
                self.elem.removeClass( self.opt.errorClass );
            } else{
                self.elem.addClass( self.opt.errorClass );
                $help.html(m);
            }
        }

    }


    var MessageLimit = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    MessageLimit.prototype = {
    	init: function(){
            var self = this
                , opt = self.opt
                , $textarea = self.elem.find('textarea')
                , hasMaxLength = 'maxLength' in document.createElement('textarea');

            //设置最大值计数
            opt.maxCount > 0 && opt.isCounter && self.elem.find( '.' + opt.counterClass ).html( opt.maxCount )

            //设置maxlength
            opt.maxCount > 0 && opt.isCutoff && hasMaxLength && $textarea.attr({'maxLength': opt.maxCount});

            $textarea.on({
                'keypress.MessageLimit': function(){
                    //当存在最大值
                    if ( opt.maxCount > 0  ) {
                        //判断是否截取内容
                        opt.isCutoff && !hasMaxLength && defaultFunc.setLimit(self);
                        //判断是否设置计数
                        //defaultFunc.setCount(self);
                    }
                    
                    
                }
                , 'keyup.MessageLimit input.MessageLimit' : function(){
                    //获取当个字数和状态
                    var o = defaultFunc.valCheck(self);

                    //当存在最大值
                    if ( opt.maxCount > 0  ) {
                        //判断是否截取内容
                        opt.isCutoff && !hasMaxLength && defaultFunc.setLimit(self);
                        //判断是否设置计数
                        defaultFunc.setCount(self);
                    }

                    if ( opt.keyUpCheck ) {
                        switch(o.state)
                        {
                        case 'isMax':
                          self.elem.addClass( opt.maxClass ).removeClass( opt.minClass );
                          break;
                        case 'isMin':
                          self.elem.addClass( opt.minClass ).removeClass( opt.maxClass );
                          break;
                        default:
                          self.elem.removeClass( opt.maxClass +' '+ opt.minClass );
                        }
                    }

                    //回调
                    $.isFunction(opt.callBackKeyUp) && opt.callBackKeyUp( o.len , self );
                } 
                , 'blur.MessageLimit' : function(){
                    //获取当个字数和状态
                    var o = defaultFunc.valCheck(self);

                    opt.blurCheck && defaultFunc.errorCheck(self);
                    defaultFunc.setCount(self);

                    //回调
                    $.isFunction(opt.callBackBlur) && opt.callBackBlur( o.len , self );
                }

            });

        }


    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.MessageLimit');
            if (!data) $self.data('spice.MessageLimit', (data = new MessageLimit($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.spice.MessageLimit = plugin;

    

})(jQuery);


