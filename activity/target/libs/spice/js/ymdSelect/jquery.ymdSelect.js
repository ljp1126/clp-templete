/**
 *
 * 省市区联动效果
 * 详细用法请参考：http://v3.spice.lh/javascript/ymdSelect
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0
 *
 */

(function($){

    "use strict";

    //存储默认参数
    var defaultOptions = {
            defaultText: ['年', '月', '日']
            , btnClass: null
            , contentClass: null
            , btnAddClass: 'open'
            , year: [1900, 2016]
            , callBack  : null
            , defaultError: true
            , tinyscrollbarCallBack: null
            , tinyscrollbarConfig: {}
            , customScroll: null
            , isIscroll: false
        };

    var defaultFunc = {
        defaultSelect: function($elem, self){
            var opt = self.opt, elem = self.elem;
            $elem.on('change', function(ev, whe){
                var $self = $(this)
                    , btn = $self.prev('.btn')
                    , index = +$self.attr('ymd-index')
                    , val = $('option:selected', $self).attr('value')
                    , text = $('option:selected', $self).text();
                // 删除默认选中的值，防止影响之后的选择
                $self.removeAttr('ymd-curval');
                // 如果选择框为半模拟的，则动态赋值
                if(btn.length != 0){
                    $('span:eq(0)', btn).html( text );
                }

                if( opt.defaultError && !whe ){
                    if( !val ){
                        (btn.length != 0 ? btn.closest('.form-select') : $self)
                            .addClass('is-error')
                            .removeClass('is-success');
                    }else{
                        (btn.length != 0 ? btn.closest('.form-select') : $self)
                            .removeClass('is-error')
                            .addClass('is-success');
                    }
                    self.elem[$.inArray(true, self.isError()) == -1 ? 'removeClass' : 'addClass' ]('is-error');
                    self.elem[$.inArray(true, self.isError()) == -1 ? 'addClass' : 'removeClass' ]('is-success');
                }

                // 当前select change完成后，需要刷新相邻的select的数据
                ++index;
                var $nextSelect = $('[ymd-index='+( index )+']', elem)
                    , curval = $nextSelect.attr('ymd-curval');

                if($nextSelect.length == 0){
                    opt.callBack && $.isFunction(opt.callBack) && opt.callBack(defaultFunc.getDefaultSelectVal(elem), elem, whe);
                    return false;
                }

                $nextSelect
                    .removeAttr('ymd-curval')
                    .html( defaultFunc.getOptionHtml(index, curval, self) ).trigger('change', [whe]);

            });
        }
        , hide: function(btnClass){
            var $subMenu = $('.sub-menu', '.form-select');
            $subMenu.hide();
            $subMenu.prev().removeClass(btnClass);
        }
        , getSimulationSelectVal: function(opt, elem){
            return $.map($(opt.contentClass, elem), function(n){
                var $slc = $('li.selected', n);
                return $slc.attr('ymd-value');
            });
        }
        , simulationSelect: function($elem, self){
            var opt = self.opt
                , elem = self.elem
                , index = +$elem.attr('ymd-index')
                , $btn = self.pcdBtn.eq(index);
            $btn.on('tap', function(){
                var $subMenu = $elem.closest('.sub-menu')
                    , tinyscrollbarConfig = opt.tinyscrollbarConfig
                    , customScroll = opt.customScroll;             
                if($subMenu.is(':visible')){
                    defaultFunc.hide(opt.btnAddClass);
                    return false;
                }
                defaultFunc.hide(opt.btnAddClass);

                $btn.addClass(opt.btnAddClass);
                $subMenu.show();
                // $.spice.tools.tinyscrollbar({
                //     elem: $subMenu
                // });
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
                        elem: $subMenu
                        , options: tinyscrollbarConfig
                        , isIscroll: opt.isIscroll
                    });
                }
            });
            $elem.on('tap', 'li', function(ev, whe){
                var $self = $(this)
                    , $parent = $self.parent()
                    , index = +$parent.attr('ymd-index')
                    , val = $self.attr('ymd-value');

                $self.addClass('selected').siblings().removeClass('selected');
                $parent.removeAttr('ymd-curval');

                //赋值并隐藏弹出层
                var $span = $('span:eq(0)', $self.closest('.sub-menu').prev());
                //如果选择的值与当前的值一样，则不触发 change 事件
                if($span.html() == val){
                    defaultFunc.hide(opt.btnAddClass);
                    return false;
                }

                if( opt.defaultError && !whe ){
                    if( !val ){
                        $self.closest('.form-select')
                            .addClass('is-error')
                            .removeClass('is-success');
                    }else{
                        $self.closest('.form-select')
                            .removeClass('is-error')
                            .addClass('is-success');
                    }
                    self.elem[$.inArray(true, self.isError()) == -1 ? 'removeClass' : 'addClass' ]('is-error');
                    self.elem[$.inArray(true, self.isError()) == -1 ? 'addClass' : 'removeClass' ]('is-success');
                }

                $span.html( $self.text() );
                defaultFunc.hide(opt.btnAddClass);

                //当前select change完成后，需要刷新相邻的select的数据
                ++index;
                var $nextSelect = $('[ymd-index=' + index + ']', elem)
                    , curval = $nextSelect.attr('ymd-curval');
                if($nextSelect.length == 0){
                    opt.callBack && $.isFunction(opt.callBack) && opt.callBack(defaultFunc.getSimulationSelectVal(opt, elem), elem, whe);
                    return false;
                }

                $nextSelect
                    .html( defaultFunc.getOptionHtml(index, curval, self) );

                var $li = $('li.selected', $nextSelect);
                if($li.length == 0){
                    $li = $('li:eq(0)', $nextSelect);
                }
                $li.trigger('tap', [whe]);

            });
        }
        , getDefaultSelectVal: function(elem){
            return $.map($('select', elem), function(n){
                return $('option:selected', n).attr('value');
            });
        }
        , activate: function($elem, self){
            if(self.isDefault){
                defaultFunc.defaultSelect($elem, self);
            }else{
                defaultFunc.simulationSelect($elem, self);
            }            
        }
        , leapYear: function(year){
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    return true;
                }
            } else {
                if ((year % 4) == 0) {
                    return true;
                }
            }
            return false;
        }
        , getOptionStr: function(text, curval, self, b){
            return self.isDefault ? 
                        (
                            b 
                            ?
                            (self.opt.defaultText ? '<option value="">' + text + '</option>' : '')
                            :
                            '<option value="' + text + '" ' + (curval == text ? 'selected' : '') + '>' + text + '</option>'
                        )
                        :
                        (
                            b 
                            ?
                            (self.opt.defaultText ? '<li ymd-value=""><a>' + text + '</a></li>' : '')
                            :
                            '<li ymd-value="' + text + '"' + (curval == text ? ' class="selected"' : '') + '><a>' + text + '</a></li>'
                        );
                        
        }
        , getOptionHtml: function(index, curval, self){
            var options = ''
                , opt = self.opt
                , selectVal = self.isDefault
                                ?
                                defaultFunc.getDefaultSelectVal(self.elem)
                                :
                                defaultFunc.getSimulationSelectVal(opt, self.elem)
                , year = +selectVal[0]
                , month = +selectVal[1];

            options = defaultFunc.getOptionStr(opt.defaultText[index] || '', curval, self, true);

            if( index === 0 && $.isArray(opt.year) && opt.year.length == 2){
                var yearStart = opt.year[0]
                    , yearEnd = opt.year[1]
                    , curYear = yearEnd + 1;

                if( yearStart <= yearEnd ){
                    while( curYear-- > opt.year[0] ){
                        options += defaultFunc.getOptionStr(curYear, curval, self);
                    }
                }
            }else if(index === 1){
                if( year ){
                    var month = 0;
                    while( ++month <= 12 ){
                        options += defaultFunc.getOptionStr(month, curval, self);
                    }
                }
            }else if(index === 2){
                var day = 0
                    , maxDay = 0;

                if(year && month){
                    if( month == 2 ){
                        if (defaultFunc.leapYear(year) ) { 
                            maxDay = 29; 
                        }else{
                            maxDay = 28;
                        }
                    }else if( $.inArray(month, [1, 3, 5, 7, 8, 10, 12]) != -1 ){
                        maxDay = 31;
                    }else{
                        maxDay = 30;
                    }
                    while( ++day <= maxDay ){
                        options += defaultFunc.getOptionStr(day, curval, self);
                    }
                }
            }

            return options;
        }
    }

    var ymdSelect = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    ymdSelect.prototype = {
        init: function(){
            var self = this
                , opt = self.opt;

            var isDefault = self.isDefault = !(opt.btnClass && opt.contentClass);

            if(isDefault){
                self.select = $('select', self.elem);
            }else{
                self.select = $(opt.contentClass, self.elem);
                self.pcdBtn = $(opt.btnClass, self.elem);
            }

            //如果页面中没有找到元素，直接退出以下操作
            if(self.select.length == 0) return false;

            $.each(self.select, function(index, elem){
                var $elem = $(elem)
                    , curval = $elem.attr('ymd-curval');

                //设置默认参数，方便之后取值
                $elem.attr({'ymd-index': index}).html( defaultFunc.getOptionHtml(index, curval, self) );

                //绑定事件
                defaultFunc.activate($elem, self);

            });

            if(isDefault){
                self.select.eq(0).trigger('change', ['default']);
            }else{
                var $li = $('li.selected', self.select.eq(0));
                if($li.length == 0){
                    $li = $('li:eq(0)', self.select.eq(0));
                }
                $li.trigger('tap', ['default']);
                $('html').on('tap', function(e){
                    var $elem = $(e.target);
                    if(!($elem.hasClass('form-select') || $elem.parents('.form-select').length != 0)){
                        defaultFunc.hide(opt.btnAddClass);
                    }
                });
            }

        }
        , getSelectVal: function(){
            return (this.isDefault ? defaultFunc.getDefaultSelectVal(this.elem) : defaultFunc.getSimulationSelectVal(this.opt, this.elem));
        }
        , setSelectVal: function(ymd){
            if(!$.isArray(ymd) || ymd.length == 0) return false;
            if(this.select){
                this.select.attr('ymd-curval', function(){
                    return ymd[$(this).attr('ymd-index')];
                });

                var $select = null;
                if(this.isDefault){
                    $('option', this.select.eq(0)).removeAttr('selected');
                    $select = $('option:contains('+ymd[0]+')', this.select.eq(0));
                    if($select.length === 0){
                        $select = $('option[value='+ymd[0]+']', this.select.eq(0));
                    }
                    $select.attr('selected', 'selected');
                    this.select.eq(0).trigger('change', ['default']);
                }else{
                    $('li', this.select.eq(0)).removeAttr('class');
                    $select = $('li:contains('+ymd[0]+')', this.select.eq(0));
                    if($select.length === 0){
                        $select = $('li[ymd-value='+ymd[0]+']', this.select.eq(0));
                    }
                    $select.addClass('selected').trigger('tap', ['default']);
                } 
            }                       
        }
        , isError: function(){
            var error = [];
            $.each(this.getSelectVal(), function(i, v){
                error.push( !v.split('-')[0] ? true : false );
            });
            return error;
        }
    }

    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.ymdSelect');
            if (!data) $self.data('spice.ymdSelect', (data = new ymdSelect($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    //$.fn.ymdSelect             = plugin;
    //$.fn.ymdSelect.Constructor = ymdSelect;
    $.spice.ymdSelect = plugin;

})(jQuery);