(function($){

    "use strict";

    var defaultOptions = {
            contents: null
            , url: ''
            , dataTerm: ''
            , pageName: ''
            , curPageName: 'spice-data-cur-page'
            , maxPageName: 'spice-data-max-page'
            , dataTermName: 'spice-data-term'
            , zoneClass: 'spice-rollingload-zone'
            , markClass: 'spice-rollingload-mark'
            , scrollArea: 'window'
            , num: 0
            , buildHtml: null
            , callBack: null
            , htmlTemplate: ''

            //, isCooperation: false

        };

    var defaultFunc = {
        checkMask: function(i, maxi, self){
            if ( i + 1 >maxi ) {
                $( '.' + self.opt.markClass ).find('>*').hide();
            }
        }
    }


    var rollingload = function(self, option, index){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.opt.fnIndex = index;
        $self.elem = self;
        $self.init();
    }

    rollingload.prototype = {
        init: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
            
            elem.data('spice.rollingloadIndex', opt.fnIndex)
            
            var $scrollArea = opt.scrollArea == 'window' ? $(window) : $( '.' + opt.scrollArea )
                , $zone = elem.find( '.' + opt.zoneClass )
                , $mark = elem.find( '.' + opt.markClass )

            self.isRequesting = 1

            $scrollArea.off('scroll.rollingload' + opt.fnIndex).on('scroll.rollingload' + opt.fnIndex, function(){
                var $W = $(this);
                
                if ($W.scrollTop() + $W.height() > $mark.offset().top - opt.num) {

                    if ( self.isRequesting ) {
                        self.isRequesting = 0;

                        var oSet = {}
                            , attrDataTerm = elem.attr(opt.dataTermName)
                            , curPage = elem.attr(opt.curPageName)
                            , maxPage = elem.attr(opt.maxPageName);

                        //判断是否翻页
                        if ( curPage && maxPage ) {
                            curPage++ 
                            //当前页为最大页时return
                            if ( curPage > maxPage ) return
                            //添加page名
                            if ( opt.pageName ) { oSet[opt.pageName] = curPage }
                        }
                        if ( opt.url ) {
                            //判断是否有dataTerm
                            attrDataTerm = $.parseJSON(attrDataTerm);
                            if ( opt.dataTerm || attrDataTerm ) {
                                oSet = $.extend({}, oSet, attrDataTerm ? attrDataTerm : opt.dataTerm)
                            }
                            var str = ''
                                , o = $.spice.syncXhr( opt.url , oSet );     
                        }else {
                            var str = ''
                                , o = opt.contents
                        }
                        if ( !o ) return

                        if ( opt.buildHtml && $.isFunction(opt.buildHtml) ) {
                            self.curPage = curPage;
                            self.maxPage = maxPage;
                            if ( opt.htmlTemplate ) {
                                var template = Handlebars.compile( opt.htmlTemplate );
                                str = opt.buildHtml( o, self ,template);
                            } else{
                                str = opt.buildHtml( o, self );
                            }
                        } else{
                            str = o;
                        }
                        //添加结构
                        $zone.append(str);

                        //判断是否隐藏loading图
                        if ( curPage && maxPage ) {
                            defaultFunc.checkMask(curPage, maxPage, self)
                            elem.attr(opt.curPageName, curPage)
                        }else{
                            self.curPage = 1;
                            self.maxPage = 1;
                            defaultFunc.checkMask(1, 1, self)
                        }

                        opt.callBack && $.isFunction(opt.callBack) && opt.callBack( o, self );

                        self.isRequesting = 1;

                        if ($W.scrollTop() + $W.height() > $mark.offset().top - opt.num) {
                            $scrollArea.trigger('scroll.rollingload' + opt.fnIndex);
                        }
                    }
                }
            }).trigger('scroll.rollingload' + opt.fnIndex);


        }

        , destroy: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
                , index = elem.data('spice.rollingloadIndex')
            
            var $scrollArea = opt.scrollArea == 'window' ? $(window) : $( '.' + opt.scrollArea )

            $scrollArea.off('scroll.rollingload' + index);

            elem.removeData('spice.rollingload');
        }

        , refresh: function(curPage, maxPage){
            var self = this
                , elem = self.elem
                , opt = self.opt

            if ( curPage && maxPage ) {
                self.curPage = curPage;
                self.maxPage = maxPage;
                elem.attr( opt.curPageName , curPage )
                elem.attr( opt.maxPageName , maxPage )
            } else{
                delete self.curPage
                delete self.maxPage
            } 
            self.isRequesting = 1
            $( '.' + opt.markClass ).find('>*').removeAttr('style');
        }

    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.rollingload');
            if (data){
                data.destroy();
            }

            $self.data('spice.rollingload', (data = new rollingload($self, option, $.spice.rollingload.fnIndex)));
            $.spice.rollingload.fnIndex += 1
            rtn.push(data);
        });
        return rtn;
    }

    $.spice.rollingload = plugin;
    $.spice.rollingload.fnIndex = 0;
    

})(jQuery);


