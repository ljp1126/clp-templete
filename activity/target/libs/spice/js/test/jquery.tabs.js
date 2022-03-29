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
            
        };

    var tabs = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
    }

    tabs.prototype = {
        
    }

    function plugin(option) {
        var rtn = [];
        this.each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.tabs');
            if (!data) $self.data('spice.tabs', (data = new tabs($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.fn.tabs             = plugin;
    $.fn.tabs.Constructor = tabs;

})(jQuery);