/**
 *
 * 插件模版
 * 详细用法请参考：http://xxxx/
 * 如果链接无法访问，请联系：xxxx
 *
 * @ author 
 * @ version 
 *
 */

(function($){

    "use strict";

    //存储默认参数
    var defaultOptions = {
            
        };

    var defaultFunc = {
        
    };

    var dropdown = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    dropdown.prototype = {
        init: function(){

        }
    }

    function plugin(option) {
        var rtn = [];
        this.each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.dropdown');
            if (!data) $self.data('spice.dropdown', (data = new dropdown($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.fn.dropdown             = plugin;
    $.fn.dropdown.Constructor = dropdown;

})(jQuery);