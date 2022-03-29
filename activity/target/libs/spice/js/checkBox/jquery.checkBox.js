(function($){

	"use strict";

	var defaultOptions = {
            isBan : false
            , tapCheckBoxClass : 'form-checkbox'
            , tapRadioClass : 'form-radio'
            , tapCheckAllClass : 'form-checkall'
            , tapRemoveAllClass : 'form-removeall'
            , checkBoxClass : 'form-checkbox'
            , radioClass : 'form-radio'
            , checkAllClass : 'form-checkall'
            , removeAllClass : 'form-removeall'
            , activeClass : 'on'
            , disableClass : 'is-disabled'
            , simulateClass : 'form-simulate'
            , checkCallBack : null
            , checkAllCallBack : null
            , removeAllCallBack : null
        };

    var defaultFunc = {
        setCheckBox : function(self){
            var elem = self.elem
                , opt = self.opt
                , obj = {
                    elem: elem
                    , opt: opt
                    , check : 1
                }
                , checkBox = elem.find( '.' + opt.checkBoxClass )
                , radio = elem.find( '.' + opt.radioClass )
                , checkBoxTap = elem.find( '.' + opt.tapCheckBoxClass )
                , radioTap = elem.find( '.' + opt.tapRadioClass );

            //判断是否有checkbox或radio
            checkBox.length == 0 && radio.length == 0 && (obj.check = 0);

            obj.checkBoxRow = !opt.isBan ? checkBox : checkBox.filter(':has(input:not(:disabled))');
            var damiCheckBox = checkBoxTap.filter('input:not(:disabled)');
            obj.checkBoxTap = !opt.isBan ? checkBoxTap : ( damiCheckBox.length > 0 ? damiCheckBox : checkBoxTap.filter(':has(input:not(:disabled))') );
            obj.checkBox = checkBoxTap;
            obj.checkBoxNoDis = damiCheckBox.length > 0 ? damiCheckBox : checkBoxTap.filter(':has(input:not(:disabled))');
            var damiCheckboxDis = checkBoxTap.filter(':disabled');
            obj.checkBoxDis = damiCheckboxDis.length > 0 ? damiCheckboxDis : checkBoxTap.filter(':has(input:disabled)');


            obj.radioRow = !opt.isBan ? radio : radio.filter(':has(input:not(:disabled))');
            var damiRadio = radioTap.filter('input:not(:disabled)');
            obj.radioTap = !opt.isBan ? radioTap : ( damiRadio.length > 0 ? damiRadio : radioTap.filter(':has(input:not(:disabled))') );
            obj.radio = radioTap;
            obj.radioNoDis = damiRadio.length > 0 ? damiRadio : radioTap.filter(':has(input:not(:disabled))');
            var damiRadioDis = radioTap.filter(':disabled');
            obj.radioDis = damiRadioDis.length > 0 ? damiRadioDis : radioTap.filter(':has(input:disabled)');

            obj.checkAll = elem.find( '.' + opt.checkAllClass );
            obj.checkAllTap = elem.find( '.' + opt.tapCheckAllClass );
            obj.removeAll = elem.find( '.' + opt.removeAllClass );
            obj.removeAllTap = elem.find( '.' + opt.tapRemoveAllClass );

            return obj
        }
        , checkInput : function(self, opt){
            var input = {};
            input.elem = self.is('input')? self : ( self.hasClass('form-checkbox-dami') ? self.siblings('label').find('input') : self.find('input') );
            input.isChecked = input.elem.is(':checked');
            input.isSimulate = input.elem.closest( '.' + opt.simulateClass ).length > 0 ? 1 : 0;
            input.isRadio = input.elem.is('[type="radio"]');
            input.isDisabled = input.elem.is(':disabled');

            return input
        }
        //check行状态
        , setCheck : function(input, obj){
            //添加删除class
            defaultFunc.setActiveClass(input, obj);

            !input.isChecked && defaultFunc.removeCheckAll(input, obj);

            if ( obj.opt.isBan ) {
                obj.elem.find('.'+ obj.opt.checkBoxClass + ' input:not(:checked):not(:disabled)').length == 0
                && defaultFunc.setCheckAll(input, obj);
            } else{
                obj.elem.find('.'+ obj.opt.checkBoxClass + ' input:not(:checked)').length == 0
                && defaultFunc.setCheckAll(input, obj);
            }

        }
        , setActiveClass : function(input, obj){
            if ( input.isRadio ) {
                defaultFunc.removeRowAll(input, obj);
                input.isSimulate && input.elem.closest('.' + obj.opt.radioClass)[input.isChecked ? 'addClass' : 'removeClass']( obj.opt.activeClass );
            } else{
                input.isSimulate && input.elem.closest('.' + obj.opt.checkBoxClass)[input.isChecked ? 'addClass' : 'removeClass']( obj.opt.activeClass );
            };

        }
        //选中所有行
        , setRowAll : function(input, obj){
            obj.checkBoxRow.find('input').attr('checked', 'checked');
            input.isSimulate && obj.checkBoxRow.addClass( obj.opt.activeClass );
        }
        //撤销所有行
        , removeRowAll : function(input, obj){  
            if ( input.isRadio ) {
                input.isSimulate && obj.radioRow.removeClass( obj.opt.activeClass );
            } else{
                obj.checkBoxRow.find('input').removeAttr('checked')
                input.isSimulate && obj.checkBoxRow.removeClass( obj.opt.activeClass );
            }
        }
        //选中全选按钮
        , setCheckAll : function(input, obj){
            obj.checkAll.find('input').attr('checked', 'checked');
            input.isSimulate && obj.checkAll.addClass( obj.opt.activeClass );
        }
        //撤销全选按钮
        , removeCheckAll : function(input, obj){
            obj.checkAll.find('input').removeAttr('checked');
            input.isSimulate && obj.checkAll.removeClass( obj.opt.activeClass );

        }
        , searchParent : function(self){
            var $p = self.parent()
                , p = $p.css('position');

            if ( p == 'relative' || p == 'absolute' ) {
                return $p;
            } else{
                return defaultFunc.searchParent($p);
            }
        }

    }


    var CheckBox = function(self, option){
        var $self  = this;
        $self.opt = $.extend({}, defaultOptions, option);
        $self.elem = self;
        $self.init();
    }

    CheckBox.prototype = {
    	init: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
                , obj = defaultFunc.setCheckBox(self);

            if ( !obj.check ) return;

            obj.checkBoxTap.add( obj.radioTap ).on('click.checkBox', function(e){
                e.stopPropagation();

                var $this = $(this)
                    , input = defaultFunc.checkInput($this, opt);
                if ( e.target.tagName != 'INPUT' || $this.is(':disabled') ) {
                    e.preventDefault();
                    if ( input.isChecked ) {
                        if ( !input.isRadio ) {
                            input.elem.removeAttr('checked');
                            input.isChecked = 0;
                        }
                    } else{
                        input.elem.attr('checked', 'checked');
                        input.isChecked = 1;
                    }
                }

                defaultFunc.setCheck(input, obj);
                

                opt.checkCallBack && $.isFunction(opt.checkCallBack) && opt.checkCallBack(
                    $this.hasClass(opt.tapCheckBoxClass)
                    ? {
                        elem: $this
                        , selected: obj.checkBox.eq(0).is('input') 
                                    ? obj.checkBox.filter('input:checked') 
                                    : obj.checkBox.filter(':has(input:checked)')
                        , allBox : obj.checkBox
                        , allBoxNoDis : obj.checkBoxNoDis
                    }
                    : {
                        elem: $this
                        , selected: obj.radio.eq(0).is('input') 
                                    ? obj.radio.filter('input:checked') 
                                    : obj.radio.filter(':has(input:checked)')
                        , allBox : obj.radio
                        , allBoxNoDis : obj.radioNoDis
                    }
                );
            });

            obj.checkAllTap.on('click.checkBox', function(e){
                e.stopPropagation();

                var $this = $(this)
                    , input = defaultFunc.checkInput($this, opt);

                if ( e.target.tagName != 'INPUT' || $this.is(':disabled') ) {
                    e.preventDefault();
                    if ( input.isChecked ) {
                        input.elem.removeAttr('checked');
                        input.isChecked = 0;
                    } else{
                        input.elem.attr('checked', 'checked');
                        input.isChecked = 1;
                    }
                }
                
                input.isSimulate && input.elem.closest('.' + obj.opt.checkAllClass)[input.isChecked ? 'addClass' : 'removeClass']( obj.opt.activeClass );
                input.isChecked ? defaultFunc.setRowAll(input, obj): defaultFunc.removeRowAll(input, obj);

                opt.checkAllCallBack && $.isFunction(opt.checkAllCallBack) && opt.checkAllCallBack(
                    {
                        elem: $this
                        , selected: obj.checkBox.eq(0).is('input') 
                                    ? obj.checkBox.filter('input:checked') 
                                    : obj.checkBox.filter(':has(input:checked)')
                        , allBox : obj.checkBox
                        , allBoxNoDis : obj.checkBoxNoDis
                    }
                );
                
            });

            obj.removeAllTap.on('click.checkBox', function(e){
                var $this = $(this)
                    , input = defaultFunc.checkInput($this, opt);

                input.isSimulate = 1;
                defaultFunc.removeRowAll(input, obj);
                defaultFunc.removeCheckAll(input, obj);

                opt.removeAllCallBack && $.isFunction(opt.removeAllCallBack) && opt.removeAllCallBack(
                    {
                        elem: $this
                        , selected: obj.checkBox.eq(0).is('input') 
                                    ? obj.checkBox.filter('input:checked') 
                                    : obj.checkBox.filter(':has(input:checked)')
                        , allBox : obj.checkBox
                        , allBoxNoDis : obj.checkBoxNoDis
                    }
                );
            });

            if ( !self.opt.isBan ) {
                obj.checkBoxDis.add( obj.radioDis ).each(function(i, j){
                    var $this = $(j)
                        , isInput = $this.is('input')
                        , label = isInput ? $this.closest('label') : ( $this.is('label') ? $this : $this.find('label') );

                    var $p = defaultFunc.searchParent(label)
                        , i = $('<i class="form-checkbox-dami"></i>').css({
                            'width': label.outerWidth()
                            , 'height': label.outerHeight()
                            , 'top': label.offset().top - $p.offset().top
                            , 'left': label.offset().left - $p.offset().left
                            , 'display': 'block'
                            , 'position': 'absolute'
                        }).on('tap',function(e){
                            e.stopPropagation();
                            e.preventDefault();

                            if ( $this.is('input') ) {
                                var input = defaultFunc.checkInput($this, opt);
                                if ( input.isChecked ) {
                                    if ( !input.isRadio ) {
                                        input.elem.removeAttr('checked');
                                        input.isChecked = 0;
                                    }
                                } else{
                                    input.elem.attr('checked', 'checked');
                                    input.isChecked = 1;
                                }
                                
                                defaultFunc.setCheck(input, obj);
                                // opt.checkCallBack && $.isFunction(opt.checkCallBack) && opt.checkCallBack($this.hasClass(opt.tapCheckBoxClass) ? obj.checkBoxTap : obj.radioTap , $this);
                                opt.checkCallBack && $.isFunction(opt.checkCallBack) && opt.checkCallBack(
                                    $this.hasClass(opt.tapCheckBoxClass)
                                    ? {
                                        elem: $this
                                        , selected: obj.checkBox.eq(0).is('input') 
                                                    ? obj.checkBox.filter('input:checked') 
                                                    : obj.checkBox.filter(':has(input:checked)')
                                        , allBox : obj.checkBox
                                        , allBoxNoDis : obj.checkBoxNoDis
                                    }
                                    : {
                                        elem: $this
                                        , selected: obj.radio.eq(0).is('input') 
                                                    ? obj.radio.filter('input:checked') 
                                                    : obj.radio.filter(':has(input:checked)')
                                        , allBox : obj.radio
                                        , allBoxNoDis : obj.radioNoDis
                                    }
                                );
                            } else{
                                $this.trigger('click.checkBox');
                            }
                            
                        });

                    label.after(i);
                });
            }

            
        }
        , getOptions: function(){
            var self = this
                , elem = self.elem
                , opt = self.opt
                , obj = defaultFunc.setCheckBox(self)
                , checkBoxSelected = obj.checkBox.eq(0).is('input') 
                        ? obj.checkBox.filter('input:checked') 
                        : obj.checkBox.filter(':has(input:checked)')

                , radioSelected = obj.radio.eq(0).is('input') 
                        ? obj.radio.filter('input:checked') 
                        : obj.radio.filter(':has(input:checked)')

                , checkBoxNotSelected = obj.checkBox.eq(0).is('input') 
                        ? obj.checkBox.filter(':not(input:checked)') 
                        : obj.checkBox.filter(':has(input:not(:checked))')

                , radioNotSelected = obj.radio.eq(0).is('input') 
                        ? obj.radio.filter(':not(input:checked)') 
                        : obj.radio.filter(':has(input:not(:checked))')

                return {
                    selected: checkBoxSelected.add(radioSelected)
                    , notSelected: checkBoxNotSelected.add(radioNotSelected)
                    , allBox : obj.checkBox.add(obj.radio)
                    , allBoxNoDis : obj.checkBoxNoDis.add(obj.radioNoDis)
                }
        }
        , destroy: function(){
            var self = this
                , obj = defaultFunc.setCheckBox(self);

            obj.checkBoxTap.off('click.checkBox');
            obj.radioTap.off('click.checkBox');
            obj.checkAllTap.off('click.checkBox');
            obj.removeAllTap.off('click.checkBox');

            self.elem
            .removeData('spice.CheckBox')
            .find('.form-checkbox-dami').remove();
        }

    }


    function plugin(selector, option) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function(index, self){
            var $self = $(self)
                , data  = $self.data('spice.CheckBox');
            if (data){
                data.destroy();
            }
            $self.data('spice.CheckBox', (data = new CheckBox($self, option)));
            rtn.push(data);
        });
        return rtn;
    }

    $.spice.CheckBox = plugin;

    

})(jQuery);


