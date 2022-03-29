(function($){

    "use strict";

    var fnList = ['position', 'enable', 'disable', 'setValue', 'getValue', 'getValues'
                        , 'changeWheel', 'isVisible', 'tap', 'show', 'hide', 'select'
                        , 'alert', 'cancel', 'init', 'trigger', 'option', 'destroy', 'getInst']
        , defaultOptions = {
                            preset: 'list'
                            , theme: 'spice-mobiscroll light'
                            , mode: 'scroller'
                            , display: 'bottom'
                            , ariaDesc: ''
                            // 自定义数据
                            , customWheels: []
                            , showLabel: false
                            , setText: '确定'
                            , cancelText: '取消'
                            , joinResult: '/'
                        }
        , defaultFunc = {
            funcList: function(elem){
                var o = {}
                $.each(fnList, function(i, v){
                    o[v] = function(fn){
                        elem.mobiscroll(v, fn)
                    }
                });
                return o;
            }
        }

    $.spice.mobIscroll = function(selector, option){
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.mobIscroll')
                , obj = $.extend({}, defaultOptions, option)
                , preset = obj.preset
                , formatResult = null;
            if (data){
                $self.mobiscroll('destroy');
            }

            if( preset == 'citySelect' ){
                formatResult = function(d, w){
                    var sz = [];
                    $.each(w[0], function(i, o){
                        sz.push( o[ d[i] ] );
                    });
                    if( $.inArray(undefined, sz) == -1 ){
                        return sz.join( obj.joinResult );
                    }else{
                        return $('.spice-mobiscroll .dwv').html();
                    }
                }
            }else if( preset == 'list' ){
                formatResult = function(d, w){
                    var sz = [];
                    $.each(w[0], function(i, o){
                        var v = o[ d[i] ];
                        if( v != 0 ){
                            sz.push( v );
                        }else if( sz.length > 0 ){
                            sz.push( v );
                        }
                    });

                    if( sz.length == 1 ){
                        sz.unshift(0);
                    }
                    return sz.join( obj.joinResult );
                }
            }

            if( !obj.formatResult && formatResult ){
                obj.formatResult = formatResult;
            }

            $self
                .mobiscroll( obj );
            $self.data('spice.mobIscroll', (data = defaultFunc.funcList($self)));
            rtn.push(data);
            $self.removeAttr('disabled');
        });
        return rtn;
    };

})(jQuery);