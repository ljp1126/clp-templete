/**
 *
 * 数量加减
 * 详细用法请参考：http://v3.spice.lh/javascript/calculateNum
 * 如果链接无法访问，请联系BZ Web 前端组
 *
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
            btnMinus: '.btn-minus'
            , btnPlus: '.btn-plus'
            , textInput: '.form-input'
            , max: 10
            , min: 0
            , callBack: null
        };

    var defaultFunc = {
        initMaxNum: function(self){
            var stock = self.elem.attr('data-stock')
                , max = self.opt.max;
            if(stock){
                if(stock <= max){
                    self.opt['_max'] = stock;
                }else{
                    self.opt['_max'] = max;
                }
            }else{
                self.opt['_max'] = max;
            }
        }
    }
    var calculateNum = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    calculateNum.prototype = {
        init: function(){
            var $self = this
                , opt = $self.opt
                , elem = $self.elem
                , $plus = opt.plus = $(opt.btnPlus, elem)
                , $minus = opt.minus = $(opt.btnMinus, elem)
                , $textInput = opt.textInput = $(opt.textInput, elem);

            //重置事件，避免重复调用
            $self.destroy();

            $plus
                .on($.spice.click, function(){
                    defaultFunc.initMaxNum($self);
                    $self.plus();
                });

            $minus
                .on($.spice.click, function(){
                    defaultFunc.initMaxNum($self);
                    $self.minus();
                });

            $plus.add( $minus )
                .on('mousedown', function(){
                    $('body').addClass('noSelect');
                })
                .on('mouseup', function(){
                    $('body').removeClass('noSelect');
                });

            $textInput
                .on('keyup'/*keypress*/, function(){
                    defaultFunc.initMaxNum($self);
                    var val = $textInput.val();
                    if( val != '' ){
                        val = Number( val );
                        if( val === 0 ){
                            val = opt.min;
                        }else{
                            val = (val && val<=opt._max &&  val>=opt.min) ? val : opt._max;
                        }
                        $textInput.val(val);
                        opt.callBack && $.isFunction(opt.callBack) && opt.callBack($self, val);
                    }
                }).on('blur', function(){
                    defaultFunc.initMaxNum($self);
                    if(!$textInput.val()){
                        $textInput.val(opt.min);
                        opt.callBack && $.isFunction(opt.callBack) && opt.callBack($self, opt.min);
                    }
                });
        }
        , plus: function(){
            var $input = this.opt.textInput
                , val = +$input.val()
                , _max = this.opt._max;
            val += 1;
            val = val <= _max ? val : _max;
            $input.val( val );

            this.opt.callBack && $.isFunction(this.opt.callBack) && this.opt.callBack(this, val);
        }
        , minus: function(){
            var $input = this.opt.textInput
                , val = +$input.val();

            val -= 1;
            val = val >= this.opt.min ? val : this.opt.min
            $input.val( val );

            this.opt.callBack && $.isFunction(this.opt.callBack) && this.opt.callBack(this, val);
        }
        , destroy: function(){
            this.opt.plus.add(this.opt.minus).off($.spice.click).removeClass('is-disabled');
			this.opt.textInput.off('keyup keypress blur').val(this.opt.min);
			this.elem.removeData('spice.calculateNum');
        }
    }

    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.calculateNum');
            if (!data) $self.data('spice.calculateNum', (data = new calculateNum($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    return plugin;

}, 'calculateNum');
