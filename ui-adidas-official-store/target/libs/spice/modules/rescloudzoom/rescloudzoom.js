(function($){

	"use strict";

	var defaultOptions = {
            imgClass: 'rescloudzoom-images'
            , cloudzoomConfig: {
                standard:{
                    animationTime: 300
                    , easeTime: 0
                    , zoomWidth: 200
                    , zoomHeight: 300
                    , zoomOffsetX: 20
                }
                , medium:{
                    animationTime: 300
                    , easeTime: 0
                    , zoomPosition: 'inside'
                }
                , small:''
            }

            , isRetinaCheck: false
            , resize: $.spice.config.resize

        };

    var defaultFunc = {
        setCloudzoom: function( media, self ){
            var elem = self.elem
                , opt = self.opt
                , o = opt.cloudzoomConfig[media]
                , img = elem.find('.'+ opt.imgClass )

            img.each(function(i, j){
                var $this = $(j)
                if ( $this.data('CloudZoom') ) {
                    $this.data('CloudZoom').destroy();
                    $('.cloudzoom-blank, .cloudzoom-zoom-inside').remove();
                }

                o && $.spice.cloudZoom( $this, o);
            })

        }
        , removeCloudzoom: function(self){
            var elem = self.elem
                , img = elem.find('.'+ self.opt.imgClass )

            img.each(function(i, j){
                var $this = $(j)
                if ( $this.data('CloudZoom') ) {
                    $this.data('CloudZoom').destroy();
                    $('.cloudzoom-blank, .cloudzoom-zoom-inside').remove();
                }

            })

        }
    }


    var rescloudzoom = function(self, option, index){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.opt.fnIndex = index;
        $self.elem = self;
        $self.init();
    }

    rescloudzoom.prototype = {
        init: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt

            if (elem.data('spice.rescloudzoomConfig')) {
                this.destroy();
            }
            elem.data('spice.rescloudzoomConfig', opt)

            var obj = $.extend({}, opt, {
                callBack: function( media ){
                    defaultFunc.setCloudzoom( media, self );
                    $('.cloudzoom-blank, .cloudzoom-zoom-inside').remove();
                }
            });
            var resizeScreenDebounce = $.spice.resizeScreenDebounce(obj);

            $(window).on( ('resize.rescloudzoom' + opt.fnIndex) , function(){
                defaultFunc.removeCloudzoom( self );
                resizeScreenDebounce();
            }).trigger('resize.rescloudzoom' + opt.fnIndex);
            
        }

        , destroy: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
                , index = elem.data('spice.rescloudzoomConfig').fnIndex
                , img = elem.find('.'+ opt.imgClass )

            img.each(function(i, j){
                var $this = $(j)
                if ( $this.data('CloudZoom') ) {
                    $this.data('CloudZoom').destroy();
                    $('.cloudzoom-blank, .cloudzoom-zoom-inside').remove();
                }
            })
            
            $(window).off('resize.rescloudzoom' + index);
            elem.removeData('spice.rescloudzoomConfig');
        }
        , reset: function(obj){
            defaultFunc.setCloudzoom( this.elem.data('media'), this );

        }

    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.rescloudzoom');
            if (data){
                data.destroy();
            }

            $self.data('spice.rescloudzoom', (data = new rescloudzoom($self, option, $.spice.rescloudzoom.fnIndex)));
            $.spice.rescloudzoom.fnIndex += 1
            rtn.push(data);
        });

        

        return rtn;
    }

    $.spice.rescloudzoom = plugin;
    $.spice.rescloudzoom.fnIndex = 0;
    

})(jQuery);


