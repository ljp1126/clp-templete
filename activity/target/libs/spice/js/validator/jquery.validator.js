(function($){

	"use strict";

	var defaultOptions = {
            submitBtn: '.spice-form-btn-submit'
            , formGroup: '.spice-form-group'
            , validateAttr: 'spice-data-term'
            , errorBlockClass: '.spice-msg-block > span'
            , errorAddClass: 'spice-error'
            , successAddClass: 'spice-success'
        };

    var rEmail = '^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$'
        , rMobile = '^(1[3-9]{1}[0-9]{1})\\d{8}$'

    var defaultFunc = {

    }


    var validator = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    validator.prototype = {
    	init: function(){
            var self = this
                , opt = self.opt
                , elem = self.elem

            self.validateElem()

            $(opt.submitBtn, elem).on('tap', function(){
                $('['+ opt.validateAttr +']', elem)
                    .trigger( 'keyup.spice-keyup' )
                    .trigger( 'radio.spice-radio' )
                    .trigger( 'change.spice-change' )
                    .trigger( 'checkbox.spice-checkbox' )

                $('select', $('['+ opt.validateAttr +']', elem))
                    .trigger( 'change.spice-change' )

                $('li.spice-current', $('['+ opt.validateAttr +']', elem))
                    .trigger('tap.spice-change')

                $(this).trigger( 'spice.validator-submit' )
            })
        }
        , getErrorElem: function(){
            return $('.' + this.opt.errorAddClass, this.elem)
        }
        , getDataTerm: function( $validateElem ){
            var dataTerm = $validateElem.attr( this.opt.validateAttr )
            // 如果存在初始化设置，就使用该条件，否则使用 false
            return dataTerm ? $.parseJSON( dataTerm ) : false
        }
        , validateElem: function(){
            var self = this
                , opt = this.opt
                , $elem = $(opt.formGroup, this.elem)

            $.each($elem, function(i, elemBox){
                var $elemBox = $( elemBox )
                    , $validateElem = $('['+ opt.validateAttr +']', $elemBox)

                if( $validateElem.length == 0 ) return

                var tagName = $validateElem[0].tagName
                    , elemOpt = {
                        // 初始化定义
                        $elemBox: $elemBox
                        , $validateElem: $validateElem
                        , $errorBlock:  $(opt.errorBlockClass, $elemBox)
                        , $elem: $elem
                    }

                if( tagName == 'INPUT' ){
                    var inputType = $validateElem.attr('type')
                    if( inputType == 'text' || inputType == 'password' ){
                        self._validateInputText( elemOpt )
                    }else if( inputType == 'radio' ){
                         self._validateInputRadio( elemOpt )
                    }else if( inputType == 'checkbox' ){
                        self._validateInputCheckbox( elemOpt )
                    }
                }else if( tagName == 'TEXTAREA' ){
                    self._validateInputText( elemOpt )
                }else if( tagName == 'SELECT' ){
                    self._validateSelect( elemOpt )
                }
                // 验证省市联动
                else if( $validateElem.hasClass('spice-dropdown') ){
                    self._validateSelect( elemOpt )
                }
            })

        }
        , _removeError: function(elemOpt){
            elemOpt.$elemBox.removeClass( this.opt.errorAddClass )
            elemOpt.$errorBlock.html( '' )
        }
        , _setErrorMsg: function(elemOpt, errorMsg){
            var self = this
                , opt = self.opt
            // 显示一些提示信息
            // 如果错误信息存在，则添加错误 class ，删除成功 class
            if( errorMsg ){
                elemOpt.$elemBox.addClass( opt.errorAddClass )
                elemOpt.$elemBox.removeClass( opt.successAddClass )
                elemOpt.$validateElem.trigger('spice.validator-error')
            }else{
                elemOpt.$elemBox.removeClass( opt.errorAddClass )
                elemOpt.$elemBox.addClass( opt.successAddClass )
                elemOpt.$validateElem.trigger('spice.validator-success')
            }
            elemOpt.$errorBlock.html( errorMsg )
        }
        , _validateInputText: function( elemOpt ){
            var self = this
                , opt = self.opt
                , $validateElem = elemOpt.$validateElem
                , errorMsg

            if( $validateElem.length == 0 ) return false

            var dataTerm = self.getDataTerm( $validateElem )
            
            elemOpt = $.extend(elemOpt, {
                // 初始化定义
                placeholder: $.trim( $validateElem.attr('placeholder') )

                // 自定义条件参数
                , dataTerm: dataTerm
                , minlength: +dataTerm['minlength']
                , maxlength: +dataTerm['maxlength']
                , pattern: dataTerm['pattern']
                , required: dataTerm['required']
                , match: $.trim( dataTerm['match'] )
                , type: dataTerm['type']
                , errorStandard: dataTerm['errorStandard']
                , errorPattern: dataTerm['errorPattern']
                , errorLength: dataTerm['errorLength']
                , errorMatch: dataTerm['errorMatch']
            })

            // 判断手机号码
            // 如果没有传入正则，则使用默认的
            if(elemOpt.type == 'mobile'){
                elemOpt.pattern = elemOpt.pattern || rMobile
            }

            // 判断邮箱地址
            // 如果没有传入正则，则使用默认的
            if(elemOpt.type == 'email'){
                elemOpt.pattern = elemOpt.pattern || rEmail
            }

            elemOpt.$validateElem
                .on('focus.spice-focus', function(){
                    $(this).trigger('spice.validator-focus', $(this))
                })
                .on('keyup.spice-keyup blur.spice-blur', function(e){
                    var $self = $(this)
                        , value = $.trim( $self.val() )
                        , errorMsg = ''

                    if( !elemOpt.dataTerm ) return false

                    // 如果 value 不存在
                    // 或者 value 与 placeholder 的值相等（对于不兼容 placeholder 属性的浏览器）
                    // Boolean(required)
                    if( !value || value == elemOpt.placeholder ){
                        errorMsg = elemOpt.errorStandard
                    }
                    // 如果 value 不在设置的区间内
                    // 获取报错信息
                    // 并且不需要比较相同
                    else if( (value.length < elemOpt.minlength || value.length > elemOpt.maxlength) && !elemOpt.match ){
                        errorMsg = elemOpt.errorLength || elemOpt.errorStandard
                    }
                    // 如果正则验证存在，则判断是否通过验证
                    // 并且不需要比较相同
                    else if( elemOpt.pattern && !elemOpt.match ){
                        var reg = new RegExp( elemOpt.pattern )
                        if( !reg.test( value ) ){
                            errorMsg = elemOpt.errorPattern || elemOpt.errorStandard
                        }
                    }
                    // 判断需要重复输入的值
                    else if( elemOpt.match ){
                        var $match = $(elemOpt.match, elemOpt.$elem.parent())
                            , matchVal = $match.val()

                        if( value != matchVal ){
                            errorMsg = elemOpt.errorMatch
                        }
                    }

                    // 如果该项为非必填项
                    // 并且 value 为空时，则不显示报错信息
                    if( !Boolean(elemOpt.required) && (!value || value == elemOpt.placeholder) ){
                        self._removeError(elemOpt)
                        elemOpt.$elemBox
                            .removeClass( opt.errorAddClass )
                            .removeClass( opt.successAddClass )
                        return false
                    }

                    self._setErrorMsg(elemOpt, errorMsg)

                    $self.trigger('spice.validator-' + e.type)
                    
                })

        }
        , _validateInputRadio: function( elemOpt ){
            var self = this
                , opt = self.opt
                , $validateElem = elemOpt.$validateElem
                , errorMsg

            if( $validateElem.length == 0 ) return false

            var dataTerm = self.getDataTerm( $validateElem )
                , name = $validateElem.attr('name')
                , $checkedInput = $('input[type=radio][name=' + name + ']', self.elem)

            $validateElem.on('radio.spice-radio', function(e){
                if( Boolean(dataTerm.required) ){
                    var $checkedInputRadio = $checkedInput.filter(':checked')
                    if( $checkedInputRadio.length <= 0 ){
                        errorMsg = dataTerm['errorStandard']
                        self._setErrorMsg(elemOpt, errorMsg)
                        elemOpt.$validateElem.trigger('spice.validator-error')
                    }else{
                        self._removeError(elemOpt)
                        elemOpt.$validateElem.trigger('spice.validator-success')
                    }
                }
            })

            $checkedInput.on('tap', function(){
                var $self = $(this)
                    , name = $self.attr('name')
                    , $checkedInputRadio = $checkedInput.filter(':checked')
                if( $checkedInputRadio.length > 0 ){
                    self._removeError(elemOpt)
                    elemOpt.$elemBox.addClass( opt.successAddClass )
                    elemOpt.$validateElem.trigger('spice.validator-success')
                }
            })

        }
        , _validateSelect: function( elemOpt ){
            var self = this
                , opt = self.opt
                , $validateElem = elemOpt.$validateElem
                , errorMsg

            if( $validateElem.length == 0 ) return false

            var dataTerm = self.getDataTerm( $validateElem )

            var $select = $validateElem
                , $cSelect = $('select', $validateElem)
                , $menuSelect = $('li', $validateElem)
                , selectValidator = function($self){
                    var value = $.trim( $self.val() )
                        , errorMsg = ''
                        , validateElemLength = $select.length
                        , selectLength = $select.filter(function(){
                                return $.trim( $(this).val() )
                            }).length
                        , $dropdown = $self.closest('.spice-dropdown')
                        , $cSelf = $dropdown.length > 0 ? $dropdown : $self

                    if( $self[0].tagName == 'LI' ){
                        $select = $('li.spice-current', $validateElem)
                        value = $self.attr('spice-data-value')
                        validateElemLength = $select.length
                        selectLength = $select.filter(function(){
                                return $(this).attr('spice-data-value')
                            }).length
                    }

                    // 当选中的个数等于零 并且为不必填选项时
                    // 清空错误提示
                    if( selectLength == 0 && !Boolean(dataTerm.required) ){
                        $validateElem.removeClass(opt.errorAddClass).removeClass(opt.successAddClass)
                        self._removeError(elemOpt)
                        elemOpt.$elemBox
                            .removeClass( opt.errorAddClass )
                            .removeClass( opt.successAddClass )
                        $validateElem.trigger('spice.validator-success')
                        return false
                    }

                    // 判断选中个数是否是应该选中的个数并且选中的个数不为零
                    // 或者为必填选项
                    if( (selectLength != validateElemLength && selectLength != 0) || (Boolean(dataTerm.required) && !value) ){
                        errorMsg = dataTerm['errorStandard']
                        self._setErrorMsg(elemOpt, errorMsg)
                        if( value ){
                            $cSelf.removeClass(opt.errorAddClass)
                            $cSelf.addClass(opt.successAddClass)
                        }else{
                            $cSelf.addClass(opt.errorAddClass)
                            $cSelf.removeClass(opt.successAddClass)
                        }
                    }else{
                        $cSelf.removeClass(opt.errorAddClass)
                        $cSelf.addClass(opt.successAddClass)
                        self._setErrorMsg(elemOpt, errorMsg)
                        self._removeError(elemOpt)
                    }
                }

            // 全模拟
            if( $menuSelect.length > 0 ){
                $select = $menuSelect

                $validateElem.on('tap.spice-change', 'li', function(){
                    selectValidator( $(this) )
                })

                return false
            }

            // 默认select和半模拟
            if( $cSelect.length > 0 ){
                $select = $cSelect
            }

            $select.on('change.spice-change', function(e){
                selectValidator( $(this) )
            })
        }
        , _validateInputCheckbox: function( elemOpt ){
            var self = this
                , opt = self.opt
                , $validateElem = elemOpt.$validateElem
                , errorMsg

            if( $validateElem.length == 0 ) return false

            var dataTerm = self.getDataTerm( $validateElem )

            $validateElem.on('checkbox.spice-checkbox', function(e){
                if( Boolean(dataTerm.required) ){
                    if( $validateElem.is(':checked') ){
                        self._removeError(elemOpt)
                        elemOpt.$validateElem.trigger('spice.validator-success')
                    }else{
                        errorMsg = dataTerm['errorStandard']
                        self._setErrorMsg(elemOpt, errorMsg)
                    }
                }
            })

            $validateElem.on('tap', function(){
                var $self = $(this)
                if( Boolean(dataTerm.required) ){
                    if( $self.is(':checked') ){
                        errorMsg = ''
                        self._removeError(elemOpt)
                    }else{
                        errorMsg = dataTerm['errorStandard']
                    }
                    self._setErrorMsg(elemOpt, errorMsg)
                }else{
                    elemOpt.$elemBox
                        .removeClass( opt.errorAddClass )[$self.is(':checked') ? 'addClass': 'removeClass']( opt.successAddClass )
                    elemOpt.$validateElem.trigger('spice.validator-success')
                }
            })
        }

    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.validator');
            if (data){
                data.destroy();
            }
            $self.data('spice.validator', (data = new validator($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.spice.validator = plugin;

    

})(jQuery);


