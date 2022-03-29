/**
 *
 * 信息切换
 * 详细用法请参考：http://v3.spice.lh/javascript/msgChange
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
        termsObj     : ''
        , imageSrc   : ''
        , changeType : 'color'
        , typeAttr   : 'data-type'
        , valueAttr  : 'data-value'
        , typeSetAttr: 'data-set-value'
        , disabledClass        : 'is-disabled'
        , currentClass         : 'is-selected'
        , lineClass            : 'msg-line'
        , stockClass           : 'events-calculate-num'
        , cloudZoomClosestClass: '.events-detail-img'
        , cloudZoom            : null
    }

    var defaultFunc = {
        getImgUrl: function(imgList, index){
            if( !imgList.small && typeof index =='number' ){
                return {
                    small       : imgList[1].content[index].small
                    , middle    : imgList[0].content[index].medium
                    , big       : imgList[0].content[index].standard
                }    
            }else{
                return imgList
            }
        }
        , getCloudzoom: function(imgList, self, index){
            var imgObj = defaultFunc.getImgUrl(imgList, index);
            return '<img class="" src="' + imgObj.middle + '" data-cloudzoom="zoomImage: \'' + imgObj.big + '\'" />';
        }
        , getThumList: function(imgList, self){
            return $.map(imgList[1].content, function(src, index){
                var imgSrc = defaultFunc.getImgUrl(imgList, index)
                    , imgSrcStr = JSON.stringify(imgSrc);
                return '<li' + (index == 0 ? ' class="is-selected"' : '') + " data-img-src='"+ imgSrcStr +"'" + '>\
                            <a class="thumbnail">\
                                <img src="' + src.small + '" />\
                            </a>\
                            <i></i>\
                        </li>';
            }).join('\n');
        }
        , getTemplate: function(imgList, self){
            return '<a>' + defaultFunc.getCloudzoom(imgList, self, 0) + '</a>\
                    <div class="scroll scroll-gallery">\
                        <div>\
                            <ul>' + defaultFunc.getThumList(imgList, self) + '</ul>\
                        </div>\
                    </div>';
        }
    }

    var MsgChange = function(self, option){
        var $self  = this
        $self.opt = $.extend({}, defaultOptions, option)
        $self.elem = self
        $self.init()
    }

    MsgChange.prototype = {
        init: function(){
            var self = this
                , opt = self.opt

            //判断数据是否存在，不存在不往下执行
            if(!opt.termsObj || $.isEmptyObject(opt.termsObj)) return false

            self.tapElemList = self.getTapElemList()

            self.initElemStatus()
            self.tapElemList
                .off('tap')
                .on('tap', function(){
                    var $self = $(this)
                        , type = $self.attr(opt.typeAttr)
                        , value = $self.attr(opt.valueAttr)
                        , oldValue = $self.parent().find('.' + opt.currentClass).attr(opt.valueAttr)

                    if($self.hasClass(opt.disabledClass)) return false

                    $self
                        .toggleClass(opt.currentClass)
                        .siblings().removeClass(opt.currentClass);

                    if( type == opt.changeType && oldValue != value){
                        $(opt.cloudZoomClosestClass, self.elem).html( defaultFunc.getTemplate(opt.imageSrc[value], self) )
                        //self.destroy();
                        self.init();
                    }
                    var $calculateElem = $('.' + opt.stockClass, self.elem)
                        , $calculateInput = $('input', $calculateElem)
                        , $calculateData = $calculateElem.data('spice.calculateNum');
                    self.calculateMax = $calculateData.opt.max;

                    $calculateInput.val( $calculateData ? $calculateData.opt.min : 1 );

                    self.elem.trigger('spice.msgChange-tap', {
                        self: self
                        , data: self.initElemStatus()
                        , tapElem: $self
                        , type: type
                        , value: value
                        , selectList: self.getSelected()
                    });

                });

            var $li = $(opt.cloudZoomClosestClass + ' li', self.elem);
            $li.off('tap').on('tap', function(){
                var $self = $(this)
                    , index = $self.index()
                    , imgList = $self.attr('data-img-src')
                    , imgListSrc = $.parseJSON(imgList)
                    , $a = $('>a:eq(0)', $self.closest(opt.cloudZoomClosestClass));
                $a.html( defaultFunc.getCloudzoom(imgListSrc, self) );
                //调用放大镜回调
                self.opt.cloudZoom && $.isFunction(self.opt.cloudZoom) && self.opt.cloudZoom('[data-cloudzoom]');
                $self.addClass(opt.currentClass).siblings().removeClass(opt.currentClass);

                self.elem.trigger('spice.msgChange-thumb', {
                    self: self
                    , tapElem: $self
                })
            });
            //初始化时，绑定放大镜效果
            $li.eq(0).trigger('tap');

        }
        , getSelected: function(){
            return $('.' +this.opt.lineClass + ' .' + this.opt.currentClass, this.elem)
        }
        , getSelectedValue: function(){
            var self = this
            return $.map(self.getSelected(), function(i, o){
                        return $(i).attr(self.opt.valueAttr)
                    })
        }
        , getTapElemLine: function(){
            var self = this
                , opt = self.opt
            return $('.' + opt.lineClass, self.elem).filter(function(){
                        return self.getTapElemList( this ).length > 0
                    })
        }
        , getTapElemList: function($elem){
            return $('[' + this.opt.typeAttr + '][' + this.opt.valueAttr + ']', $elem || this.elem)
        }
        , _dataStock: {}
        , _dataChangeObj: {}
        , initElemStatus: function(){
            var self = this
                , opt = self.opt
                , $selectElem = self.getSelected()
                , selectElemVal = []
                , data = {
                    changeObj: {}
                    , newStock: {}
                }
                , _dataStock = self._dataStock
                , _dataChangeObj = self._dataChangeObj

            // 没有选中条件时，将禁用项全部还原
            if( $selectElem.length == 0 ){
                self.tapElemList.removeClass(opt.disabledClass)
            }else{

                $.each($selectElem, function(i, elem){
                    selectElemVal.push( $(elem).attr(opt.valueAttr) )
                })
                
                var allSelectStr = selectElemVal.join(';')

                if( _dataStock[ allSelectStr ] ){
                    data.newStock = _dataStock[ allSelectStr ]
                    data.changeObj = _dataChangeObj[ allSelectStr ]
                }else{
                    $.each(opt.termsObj, function(i, o){
                        $.each( i.split(';'), function(iIndex, iValue){
                            var $tagElem = $('[' + opt.valueAttr + '="' + iValue + '"]', self.elem)
                                , $currentSiblings = $tagElem.siblings( '.' + opt.currentClass )
                                , tagAttrValue = $currentSiblings.attr( opt.valueAttr )
                                , terms = []
                                , _selectElemVal = $currentSiblings.length == 0 
                                                            ? selectElemVal 
                                                            : $.spice.difference(selectElemVal, [tagAttrValue])

                            $.each(_selectElemVal, function(slcI, slcV){
                                terms.push( i.indexOf(slcV) >= 0 )
                            })
                            terms = $.inArray(false, terms) == -1

                            if( $currentSiblings.length == 0 ){
                                if( terms ){
                                    data.changeObj[i] = o
                                    data.newStock[iValue] = ( data.newStock[iValue] || 0 ) + parseInt(o.stock)
                                }
                            }else{
                                if( _selectElemVal.length == 0 || terms ){
                                    data.newStock[iValue] = ( data.newStock[iValue] || 0 ) + parseInt(o.stock)
                                }
                            }

                        } )
                    })
                    _dataStock[ allSelectStr ] = data.newStock
                    _dataChangeObj[ allSelectStr ] = data.changeObj
                }

                // 根据库存数量重新计算是否禁用或者不禁用
                $.each(data.newStock, function(i, o){
                    if( o == 0 ){
                        $('[' + opt.valueAttr + '="' + i + '"]', self.elem).addClass(opt.disabledClass)
                    }else{
                        $('[' + opt.valueAttr + '="' + i + '"]', self.elem).removeClass(opt.disabledClass)
                    }
                    
                })

                //获取库存
                var stock = data.newStock[selectElemVal[0]]
                if( stock > self.calculateMax ){
                    $('.' + self.opt.stockClass, self.elem).removeAttr('data-stock');
                }else{
                  $('.' + opt.stockClass, self.elem).attr('data-stock', stock);          
                }

                self.setValue(data.changeObj);

                return data

            }
            
        }
        , setValue: function(datajson){
            var self = this;
            $.each(datajson, function(i, o){

                $.each(o, function(key, val){

                    var price = $.trim(o['price'])
                        , salePrice = $.trim(o['salePrice']); 
                    if(key == 'price' || key == 'salePrice'){
                        if(!salePrice || price == salePrice){
                            $('['+ self.opt.typeSetAttr +'="price"]', self.elem).html( price );
                        }else{
                            $('['+ self.opt.typeSetAttr +'="price"]', self.elem).html( salePrice + '<del>' + price + '</del>' );
                        }
                    }else{
                        $('['+ self.opt.typeSetAttr +'="' + key + '"]', self.elem).html( val );    
                    }

                }); 
            }); 
        }
        , destroy: function(){
            var self = this
            self.tapElemList.off('tap')
            self.tapElemList
                .removeClass(self.opt.disabledClass)
                .removeClass(self.opt.currentClass)
        }
    }

    function Plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false

        var rtn = {}
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.msgChange')

            data = new MsgChange($self, option)
            rtn[index] = data
        })
        if( $(selector).length == 1 ){
            rtn = rtn[0]
        }
        return rtn
    }

    //$.fn.msgChange             = plugin;
    //$.fn.msgChange.Constructor = msgChange;
    $.spice.msgChange = Plugin;

})(jQuery);