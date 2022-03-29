/**
 *
 * 省市区联动效果
 * 详细用法请参考：http://v3.spice.lh/javascript/citySelect
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.1
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
            defaultText: ['省份/直辖市', '市', '县/区']
            , defaultDataObj: window.districtJson
            , defaultDataStart: '1'
            , btnClass: null
            , btnAddClass: 'open'
            , contentClass: null
            , callBack  : null
            , defaultError: true
            , tinyscrollbarCallBack: null
            , tinyscrollbarConfig: {}
            , customScroll: null
            , isIscroll: false
        };

    var defaultFunc = {
        getPCDObj: function(val, opt){
            return val && !$.isEmptyObject(opt.defaultDataObj[val]) ? opt.defaultDataObj[val] : {};
        }
        , getDefaultSelectVal: function(elem){
            return $.map($('select', elem), function(n){
                var $slc = $('option:selected', n);
                return $slc.attr('value') + '-' + $slc.text();
            });
        }
        , defaultSelect: function($elem, self){
            var opt = self.opt, elem = self.elem;
            $elem.on('change', function(ev, whe){
                var $self = $(this)
                    , btn = $self.prev('.btn')
                    , index = +$self.attr('city-index')
                    , val = $('option:selected', $self).attr('value')
                    , text = $('option:selected', $self).text();
                //删除默认选中的值，防止影响之后的选择
                $self.removeAttr('city-curval');
                //如果选择框为半模拟的，则动态赋值
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

                var pcdObj = defaultFunc.getPCDObj(val, opt);

                //当前select change完成后，需要刷新相邻的select的数据
                var $nextSelect = $('[city-index='+(++index)+']', elem)
                    , curval = $nextSelect.attr('city-curval');
                if($nextSelect.length == 0){
                    opt.callBack && $.isFunction(opt.callBack) && opt.callBack(defaultFunc.getDefaultSelectVal(elem), elem, whe);
                    return false;
                }
                $nextSelect
                    .removeAttr('city-curval')
                    .html( defaultFunc.getOptionHtml(index, pcdObj, curval, self) ).trigger('change', [whe]);

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
                return $slc.attr('city-value') + '-' + $slc.text();
            });
        }
        , simulationSelect: function($elem, self){
            var opt = self.opt
                , elem = self.elem
                , index = +$elem.attr('city-index')
                , $btn = self.pcdBtn.eq(index);
            $btn.on('tap', function(ev){
                ev.preventDefault();
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
                ev.preventDefault();
                var $self = $(this)
                    , $parent = $self.parent()
                    , index = +$parent.attr('city-index')
                    , val = $self.attr('city-value');

                $self.addClass('selected').siblings().removeClass('selected');
                $parent.removeAttr('city-curval');

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

                var pcdObj = defaultFunc.getPCDObj(val, opt);

                //当前select change完成后，需要刷新相邻的select的数据
                var $nextSelect = $('[city-index='+(++index)+']', elem)
                    , curval = $nextSelect.attr('city-curval');
                if($nextSelect.length == 0){
                    opt.callBack && $.isFunction(opt.callBack) && opt.callBack(defaultFunc.getSimulationSelectVal(opt, elem), elem, whe);
                    return false;
                }
                $nextSelect
                    .html( defaultFunc.getOptionHtml(index, pcdObj, curval, self) );
                var $li = $('li.selected', $nextSelect);
                if($li.length == 0){
                    $li = $('li:eq(0)', $nextSelect);
                }
                $li.trigger('tap', [whe]);
            });
        }
        , activate: function($elem, self){
            if(self.isDefault){
                defaultFunc.defaultSelect($elem, self);
            }else{
                defaultFunc.simulationSelect($elem, self);
            }            
        }
        , getOptionHtml: function(index, pcdObj, curval, self){
            if(self.isDefault){
                var options = self.opt.defaultText ? '<option value="">' + (self.opt.defaultText[index] || '') + '</option>' : '';
                $.each(pcdObj, function(i, o){
                    options += '<option value="' + i + '" ' + ((i == curval || o == curval) ? 'selected' : '') + ' >' + o + '</option>';
                });
            }else{
                var options = self.opt.defaultText ? '<li city-value=""><a>' + (self.opt.defaultText[index] || '') + '</a></li>' : '';
                $.each(pcdObj, function(i, o){
                    options += '<li' + ((i == curval || o == curval) ? ' class="selected"' : '') + ' city-value="' + i + '" ><a>' + o + '</a></li>';
                });
            }           
            return options;
        }
    }

    var citySelect = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    citySelect.prototype = {
        init: function(){
            var self = this
                , opt = self.opt;

            //判断数据是否存在，不存在不往下执行
            if(!opt.defaultDataObj || $.isEmptyObject(opt.defaultDataObj)) return false;

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
                    , curval = $elem.attr('city-curval');
                //设置默认参数，方便之后取值
                $elem.attr({'city-index': index}).html( defaultFunc.getOptionHtml(index, (index == 0 ? opt.defaultDataObj[opt.defaultDataStart] : {}), curval, self) );
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
        , setSelectVal: function(city){
            if(!$.isArray(city) || city.length == 0) return false;
            if(this.select){
                this.select.attr('city-curval', function(){
                    return city[$(this).attr('city-index')];
                });

                var $select = null;
                if(this.isDefault){                
                    $('option', this.select.eq(0)).removeAttr('selected');
                    $select = $('option:contains('+city[0]+')', this.select.eq(0));
                    if($select.length === 0){
                        $select = $('option[value='+city[0]+']', this.select.eq(0));
                    }
                    $select.attr('selected', 'selected');
                    this.select.eq(0).trigger('change', ['default']);
                }else{
                    $('li', this.select.eq(0)).removeAttr('class');
                    $select = $('li:contains('+city[0]+')', this.select.eq(0));
                    if($select.length === 0){
                        $select = $('li[city-value='+city[0]+']', this.select.eq(0));
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
                , data  = $self.data('spice.citySelect');
            if (!data) $self.data('spice.citySelect', (data = new citySelect($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    return plugin;
    
}, 'citySelect');