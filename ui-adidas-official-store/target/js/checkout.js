// 省、市、区
function spiceCitySelect(citySelectClass,btnClass,contentClass){
    $.spice.citySelect(citySelectClass, {
        btnClass: btnClass
        , contentClass: contentClass
        , defaultText:['请选择','请选择','请选择']
        , isIscroll: true
        , tinyscrollbarConfig: {
            wheelLock: true,
            touchLock: false
        }
    });
}

$(function () {
    // 游客
    if($('.order-submit-content').hasClass('order-submit-guest-content')){
        // 省、市、区
        var w_W = $(window).width();
        if(w_W < 1025){
            $.spice.citySelect('.events-city-simulation', {
                defaultText:['请选择','请选择','请选择']
                , isIscroll: true
            });
        }else{
            spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
        }
    };

    // 添加地址
    var tmpset = $('#ressselect').html(),
        address_list = $('.add-address-list').html();
    $('.events-spice-standard .event-editor,.event-address').off().live('tap', function (e) {
        e.preventDefault();
        var w_W = $(window).width(),
            w_H = $(window).height();
        if(w_W < 1025){
            $('html,body').css({
                'overflow': 'hidden',
                'position': 'fixed',
                'height': '100' + '%'
            });

            /*隐藏地址列表显示新增地址form*/
            $('.event-address-select').hide();
            $('.event-address-box').append(tmpset).show().addClass('address-box-dialog');

            /*获取地址列表内容填充mob-address-list*/
            $('.mob-address-list').html(address_list);
            $('.mob-address-list').find('.event-default-address').removeClass('none');

            // mob显示完整地址列表
            //$('.address-full').show();
            //$('.address-form-box .form-group:eq(1)').nextAll().addClass('none');

            /*增加滚动条*/
            /*$('.address-form-content > .viewport').height(w_H);
            if ($('.address-form-content .viewport .overview').height() > w_H) {
                $.spice.tinyscrollbar('.address-form-content', {
                    isIscroll: true,
                    tinyscrollbarConfig: {
                        wheelLock: true,
                        touchLock: false
                    },
                    callBack: function( o ){}
                });
                $('.address-form-content .scrollbar').addClass('scrollbar-show');
            }
            // 省、市、区
            $.spice.citySelect('.events-city-simulation', {
                defaultText:['请选择','请选择','请选择']
                , isIscroll: true
            });*/

            $('.event-add-address').off().live('tap', function (e) {
                $(this).hide();
                $('.address-box-dialog .address-form-box').slideDown();
                $('.modify-address-form-box').slideUp(100).remove();
            });
            $('.event-save-return-mb').off().live('tap', function (e) {
                $('.event-add-address').show();
                $('.address-box-dialog .address-form-box').slideUp(100);
            });
            $.spice.citySelect('.events-city-simulation', {
                defaultText:['请选择','请选择','请选择']
                , isIscroll: true
            });

        }else{
            /*隐藏地址列表显示新增地址form*/
            $('.delivery-address-top').hide();
            $('.event-address-select').hide();
            $('.event-address-box').append(tmpset).show().addClass('address-box-dialog');
            // 省、市、区
            spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
        }

    });
    $('.events-spice-medium .event-editor,.events-spice-small .event-editor').off().live('tap', function (e) {
        var $this = $(this),
            modify_address = $('#modify-address').html();
        $this.parents('.event-default-address').animate({left:"0px"}).siblings('.address-form-box').remove();
        $this.parents('.event-default-address').after(modify_address);
        $('.modify-address-form-box').slideDown();
        $this.parents('.mob-address-list-content').siblings('.address-form-box').slideUp(100).siblings('.address-form-title').find('.event-add-address').removeAttr('style');
        $.spice.citySelect('.events-city-simulation', {
            defaultText:['请选择','请选择','请选择']
            , isIscroll: true
        });
    });

    // mob显示完整地址列表
    $('.address-full').off().live('tap', function(e) {
        e.preventDefault();
        $(this).hide();
        $('.address-form-box').find('> div').removeClass('none');

        var w_W = $(window).width(),
            w_H = $(window).height();
        if(w_W < 1025){
            /*增加滚动条*/
            /*$('.address-form-content > .viewport').height(w_H);
            if ($('.address-form-content .viewport .overview').height() > w_H) {
                $.spice.tinyscrollbar('.address-form-content', {
                    isIscroll: true,
                    tinyscrollbarConfig: {
                        wheelLock: true,
                        touchLock: false
                    },
                    callBack: function( o ){}
                });
                $('.address-form-content .scrollbar').addClass('scrollbar-show');
            }*/
            // 省、市、区
            $.spice.citySelect('.events-city-simulation', {
                defaultText:['请选择','请选择','请选择']
                , isIscroll: true
            });

        }
    });

    //地址手滑
    var sx = 0,
        mx = 0,
        ex = 0;
    $('.mob-address-list .event-default-address')
        .live($.spice.mousedown, function(e) {
            sx = $.spice.getEventXY(e).x;
        })
        .live($.spice.mousemove, function(e) {
            mx = $.spice.getEventXY(e).x;
            if (Math.abs(mx - sx) > 8) e.preventDefault();

        })
        .live($.spice.mouseup, function(e) {
            ex = $.spice.getEventXY(e).x;
            var v = ex - sx;
            if (Math.abs(v) > 30) {
                if (ex - sx > 0) {
                     $(this).animate({left:"0px"});
                } else {
                    $(this).animate({left:"-160px"});
                }
            }
        });

    // 删除地址
    $('.event-delect').live('tap',function(){
        var _this = $(this),
            w_W = $(window).width(),
            event_address_list = $('.add-address-list .event-default-address').length;
        $(this).parents('.event-default-address').animate({opacity:0},500,function(){
            _this.parents('.event-default-address').remove();
            $('.add-address-list .event-default-address:eq(0)').removeClass('none');
        });
        if(w_W > 1024){
            if(event_address_list-1 <= 1){
                $('.delivery-address-bottom').hide();
            }
            if(event_address_list-1 == 0){
                $('.event-address-select').hide();
                $('.event-address-box').append(tmpset).show().addClass('address-box-dialog');
                $('.add-address-btn .event-save-return').hide();
                // 省、市、区
                spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
            };
        }

    });
    // 返回
    $('.event-save-return,.address-form-close').off().live('tap', function (e) {
        e.preventDefault();
        $('.delivery-address-top').show();
        $('.event-address-select').show();
        $('.event-address-box').hide().removeClass('address-box-dialog').empty();

        $('html,body').removeAttr('style');
    });
    // 更多地址
    $('.event-toggerress').on('tap', function() {
        var _this = $(this);

        if(_this.hasClass('is-open')) {
            _this.removeClass('is-open').find('span').html('更多地址选择');
            $('.add-address-list .distribution-list:eq(0)').nextAll().addClass('none');

        } else {
            _this.addClass('is-open').find('span').html('收起地址');
            $('.add-address-list .distribution-list').removeClass('none');
        }
    });

    // 地址、配送、支付方式切换
    $('.event-checkout-method > div,.event-default-address,.event-payment-list').live('tap',function(){
        $(this).addClass('is-active').siblings().removeClass('is-active');
    });

    // 复选按钮事件
    //加icon写法 $('.checked-select-con .checked-select .icon-checked').live('tap',function(){
    $('.checked-select-con .checked-select').live('tap',function(){
        $(this).find('.icon-checked').toggleClass('is-active');
        $(this).siblings('.invoice-box').toggleClass('none');
    });
    // 发票
    //加icon写法 $('.event-checked .icon-checked').on('tap',function(){
    $('.event-checked').on('tap',function(){
        $('.event-checked .icon-radio').removeClass('is-active');
        $(this).find('.icon-radio').addClass('is-active');
        if($(this).hasClass('invoice-company')){
            $(this).siblings('.ordinary-invoice').addClass('none');
            $(this).siblings('.value-added-tax-invoice').removeClass('none');
        }else{
            $(this).siblings('.value-added-tax-invoice').addClass('none');
            $(this).siblings('.ordinary-invoice').removeClass('none');
        }
    });
    $('.ordinary-invoice .events-dropdown .sub-menu ul li').live('tap',function(){
        if($(this).find('a').text() == '个人'){
            $(this).parents('.select-box').siblings('.form-group').addClass('none');
        }else{
            $(this).parents('.select-box').siblings('.form-group').removeClass('none');
        }
    });
    $('select', '.ordinary-invoice .events-form-select').on('change', function() {
        var $self = $(this),
            optionValue = $('option:selected', this).attr('value');
        if(optionValue == '个人'){
            $(this).parents('.select-box').siblings('.form-group').addClass('none');
        }else{
            $(this).parents('.select-box').siblings('.form-group').removeClass('none');
        }
    });
    $('.event-invoice-return').on('tap',function(){
        $(this).parents('.value-added-tax-invoice-form').addClass('none').siblings('.value-added-tax-invoice-content').removeClass('none');
    });
    $('.invoice-modify-btn').on('tap',function(){
        $(this).parents('.value-added-tax-invoice-content').addClass('none').siblings('.value-added-tax-invoice-form').removeClass('none');
    });

    // 订单摘要滚动
    $.spice.tinyscrollbar('.events-tinyscroll-y', {
        isIscroll: true,
        tinyscrollbarConfig: {
            wheelLock: true,
            touchLock: false
        },
        callBack: function( o ){}
    });

    // 优惠券、优惠码
        // 优惠码
    $('.coupon-box-top a').on('tap',function(){
        var index = $(this).index();
        $(this).addClass('is-active').siblings('a').removeClass('is-active');
        $('.coupon-content > div').eq(index).show().siblings().hide();
    });
    $('.coupon-code .form-input > a').on('tap',function(){
        var _this = $(this)
            , coupon_val = _this.siblings('input').val();

            if(coupon_val == ''){
                _this.parent('.form-input').addClass('is-error');
            }else{
                _this.siblings('p').html(coupon_val);
                if(_this.html()=='使用'){
                   _this.html('取消');
                   _this.siblings('input').hide().siblings('p').show();
                }else{
                    _this.html('使用');
                    _this.siblings('input').show().siblings('p').hide();
                }
            }
    });
        // 优惠券
    $('.coupon-select .dropdown .btn').on('tap',function(){
        var couponIscroll = null;
        $(this).parent('.dropdown').toggleClass('is-open');
        //$(this).siblings('.sub-menu').slideToggle(0);
        if($(window).width() > 1024){
            couponIscroll && couponIscroll.destroy();
            $.spice.tinyscrollbar('.coupon-tinyscrollbar', {
                isIscroll: true,
                tinyscrollbarConfig: {
                    wheelLock: true,
                    touchLock: false
                }
            });
        }else{
            if ($('.coupon-tinyscrollbar').data('spice.tinyscrollbar')) {
                $('.coupon-tinyscrollbar').data('spice.tinyscrollbar').remove();
            }
            couponIscroll = new IScroll('.coupon-tinyscrollbar .viewport', {
                        scrollX: false,
                        scrollY: true,
                        mouseWheel: true,
                        preventDefaultException: {
                            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|IMG|P|I|LABEL)$/
                        }
                    });
        }

    });
    $('.coupon-select .dropdown .sub-menu ul .coupon-item').on('tap',function(){
        if(!$(this).hasClass('is-disabled')){
            $(this).toggleClass('is-active');
        }
    });
    $('.coupon-select .dropdown .sub-menu ul .coupon-btn .events-confirm').on('tap',function(){
        $('.coupon-select .dropdown .sub-menu ul .coupon-item').each(function(){
            var _this = $(this)
                , coupon_val = $(this).find('a span').html()
                , coupon_use_content = '<li><p>'+coupon_val+'</p><a>取消</a></li>';

            $('.coupon-select .coupon-use-content ul').append(coupon_use_content);

        });

        $(this).parents('.dropdown').removeClass('is-open');
        $('.coupon-select .coupon-use-content').show();
    });
    $('.coupon-select .dropdown .sub-menu ul .coupon-btn .events-cancel').on('tap',function(){
        $(this).parents('.dropdown').removeClass('is-open');
    });
    $('.coupon-select .coupon-use-content ul li a').live('tap',function(){
        var _this = $(this);
        $(this).parent('li').animate({opacity:0},300,function(){
            _this.parent('li').remove();
            if($('.coupon-select .coupon-use-content ul li').length == 0){
                $('.coupon-select .coupon-use-content').hide();
            }
        });

    });
    // 优惠券、优惠码 end

    //提交订单弹层
    var submitordersDialog = $.spice.dialog({
        title: '请在已打开的支付窗口中完成付款',
        content: '请根据您的支付状态进行选择<br>24小时内未支付，订单会被自动取消！',
        dialogClass: 'dialog-payment',
        buttons: {
            '支付完成': {
                btnClass: 'btn-blue',
                btnEvent: function(e) {
                    //隐藏弹出层
                    e.data.dialog.hide();
                }
            },
            '重新支付': {
                btnClass: 'btn-black',
                btnEvent: function(e) {
                    //隐藏弹出层
                    e.data.dialog.hide();
                }
            }
        }
    });
    $('.event-payment').on('tap', function(e) {
        e.preventDefault();
        submitordersDialog.show();
    });

    //checkout响应
    var checkoutFlag = true;
    $(window).on('resize.checkout', function() {
        var event_address_list = $('.add-address-list .event-default-address').length,
            modify_address = $('#modify-address').html();

        if($(window).width() < 1025){
            //把优惠码、价格模块 在mob的时候 从下边移到上边
            if(checkoutFlag){
                // 3-9改版注释
                // $('.mob-commutator').insertBefore('.order-summary-box > h3:eq(0)')
                checkoutFlag = false;
            }
            /*初始判断页面有没地址*/
            if(event_address_list == 0){
                $('.delivery-address-top').hide();
                $('.mobile-empty-address').html(modify_address);
                // 省、市、区
                $.spice.citySelect('.events-city-simulation', {
                    defaultText:['请选择','请选择','请选择']
                    , isIscroll: true
                });
            }else{
                $('.mobile-empty-address').hide();
            }

        }else{
            //把优惠码、价格模块 在mob的时候 从上边移到下边
            // 3-9改版注释
            // $('.mob-commutator').insertAfter('.order-summary-box .summary-bg-box .check-product-list')
            checkoutFlag = true;

            /*初始判断页面有没地址*/
            if(event_address_list == 0){
                $('.event-address-select').hide();
                $('.event-address-box').append(tmpset).show().addClass('address-box-dialog');
                $('.add-address-btn .event-save-return').hide();
                // 省、市、区
                spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
            };
            if(event_address_list <= 1){
                $('.delivery-address-bottom').hide();
            }

        }


        //chekout小屏幕placeholder
        // if($(window).width() < 421){
        //     $(".placeholder-place").each(function(){
        //         var $this =$(this),
        //             $input =$this.find('input'),
        //             $txt =$this.find('.placeholder-txt');
        //         $txt.on('tap',function(){
        //             $input.focus();
        //         });
        //         $input.focus(function(){
        //             $txt.addClass('none');
        //         });
        //         $input.blur(function(){
        //             var tt = $(this).val();
        //             if(tt == null||tt == ""||tt == undefined){
        //                 $(".placeholder-txt").removeClass('none');
        //             }
        //             else{
        //                 $(".placeholder-txt").addClass('none');
        //             }
        //         });
        //     });
        // }
    }).trigger('resize.checkout');

    /*排队弹层*/
    var lineUpDialog = $.spice.dialog({
        template: $('#line-up').html(),
        dialogClass: 'line-up-dialog'
    });
    $('.hyper-launch-container .payment-button').on('tap', function(e) {
        e.preventDefault();
        lineUpDialog.show();
        setTimeout(function() {
            lineUpDialog.hide();
            submitordersDialog.show();
        }, 5000);
    });


    // checkout 改版
        // var customDialog = $.spice.dialog({
        //     template: $('#checkout-new-dialog-temp').html(),
        //     dialogClass: 'checkout-new-dialog checkout-new-dialog-temp',
        //     initEvent: function(e) {
        //         //弹出层初始化时需要做的事情，只会在创建弹出层的时候执行
        //         //如：初始化事件
        //         var dialog = e.data.dialog;
        //         $('.e-dialog-close', dialog.elem).on('tap', function() {
        //             dialog.hide();
        //         });
        //     }
        // });
        // //弹层显示隐藏回调
        // customDialog.elem.on('dialog.show-before', function() {
        //     // code..
        // });
        // customDialog.elem.on('dialog.show-after', function() {
        //     // code..
        // });
        // customDialog.elem.on('dialog.hide-before', function() {
        //     // code..
        // });
        // customDialog.elem.on('dialog.hide-after', function() {
        //     // code..
        // });
        // customDialog.show()

        // address dialog
            var checkoutNewAddressDialog = $.spice.dialog({
                template: $('#checkout-new-address-dialog').html(),
                dialogClass: 'checkout-new-dialog checkout-new-address-dialog',
                initEvent: function(e) {
                    //弹出层初始化时需要做的事情，只会在创建弹出层的时候执行
                    //如：初始化事件
                    var dialog = e.data.dialog;
                    $('.e-dialog-close', dialog.elem).on('tap', function() {
                        dialog.hide();
					});
					$('.address-item', dialog.elem).on('tap',function () {
                        $(this).addClass('is-active').siblings().removeClass('is-active');
                    })
                    $('.events-add-address-btn', dialog.elem).on('tap', function() {
						addressFormDialog.elem.on('dialog.show-before', function(e) {
							$('.dialog-container .title span',addressFormDialog.elem).html('新增配送地址');
						});
                        addressFormDialog.show();
                    });

                }
            });
			// 改版地址
			$('.checkout-new-container').on('tap','.event-address-info',function(){
				checkoutNewAddressDialog.show();
			});
			//地址手滑
			var sxNew = 0,
			mxNew = 0,
			exNew = 0;
			$('.checkout-new-address-dialog .address-item-list')
				.on($.spice.mousedown,'.address-item > div', function(e) {
					sxNew = $.spice.getEventXY(e).x;
				})
				.on($.spice.mousemove,'.address-item > div', function(e) {
					mxNew = $.spice.getEventXY(e).x;
					if (Math.abs(mxNew - sxNew) > 8) e.preventDefault();

				})
				.on($.spice.mouseup,'.address-item > div', function(e) {
					exNew = $.spice.getEventXY(e).x;
					var v = exNew - sxNew;
					if (Math.abs(v) > 30) {
						if (exNew - sxNew > 0) {
							$(this).animate({left:"0px"});
						} else {
							$(this).animate({left:"-62px"});
						}
					}
				});
			// 改版删除地址
			$('.checkout-new-address-dialog').on('tap','.events-btn-delete',function(){
				var _this = $(this);
				_this.parents('.address-item').animate({opacity:0},500,function(){
					_this.parents('.address-item').remove();
				});
			});
			// 改版编辑地址
			$('.checkout-new-address-dialog').on('tap','.events-btn-edit',function(){
				addressFormDialog.elem.on('dialog.show-before', function(e) {
					$('.dialog-container .title span',addressFormDialog.elem).html('编辑配送地址');
				});
				addressFormDialog.show();
			});
			// address edit & add dialog
				var addressFormDialog = $.spice.dialog({
					template: $('#address-form-dialog').html(),
					dialogClass: 'checkout-new-dialog address-form-dialog',
					initEvent: function(e) {
						var dialog = e.data.dialog;
						$('.e-dialog-close', dialog.elem).on('tap', function() {
							dialog.hide();
						});
						var $cityDefault = $('.events-city-default', dialog.elem)
						$.spice.citySelect($cityDefault, {
							callBack: function(val, elem){
								console.log(val, elem)
							}
						});

						// AD-5885 dialog input 光标
							var windowScrollTopFlag = 0;
							dialog.elem.on('dialog.show-before', function() {
								windowScrollTopFlag = $(window).scrollTop();
								$('html,body').css({
									'height': '100%'
								});
								dialog.elem.css({
									'position': 'absolute',
									'height': window.innerHeight
								});
							});
							dialog.elem.on('dialog.hide-before', function() {
								$('html,body').css({
									'height': ''
								});
								$(window).scrollTop(windowScrollTopFlag);
							});
						// AD-5885 dialog input 光标 end
					}
				});
			// address edit & add dialog end
		// address dialog end

        // Express dialog
            // 弹窗js
            var checkoutExpressDialog = $.spice.dialog({
                template: $('#checkout-new-express-dialog').html(),
                dialogClass: 'checkout-new-dialog checkout-new-express-dialog',
                initEvent: function(e) {
                    //初始化事件
                    var dialog = e.data.dialog;
                    $('.e-dialog-close', dialog.elem).on('tap', function() {
                        dialog.hide();
                    });
                    // 配送方式切换
                    $('.way-item', dialog.elem).on('tap',function () {
						$(this).addClass('is-active').siblings().removeClass('is-active');
						var wayTitle = $(this).find('.messages .way-title').html(),
						wayPayment = $(this).find('.payment').html();
						$('.event-distribution-way .distribution-way-info p span:eq(0)').html(wayTitle);
						$('.event-distribution-way .distribution-way-info p span:eq(1)').html(wayPayment);
						dialog.hide();
                    })
                }
			});
			$('.checkout-new-container').on('tap','.event-distribution-way',function(){
				checkoutExpressDialog.show();
			});
        // Express dialog end


        // payment dialog
            var selectPaymentDialog = $.spice.dialog({
                template: $('#select-payment-dialog').html(),
                dialogClass: 'checkout-new-dialog select-payment-dialog',
                initEvent: function(e) {
                    var dialog = e.data.dialog,
                        $elem=$(dialog.elem);
                    $('.e-dialog-close', dialog.elem).on('tap', function() {
                        dialog.hide();
                    });
                    //支付方式切换
                    $elem.find(".select-payment-container li").on("tap",function(){
						var _this = $(this),
							dataText = _this.data('text'),
							_thisText = _this.find('a').html();

						_this.addClass("is-active").siblings().removeClass("is-active");

						$('.payment-method-new .distribution-way-info p span:eq(0)').html('<img src="images/check/'+ dataText +'.png">');
						$('.payment-method-new .distribution-way-info p span:eq(1)').html(_thisText);
						dialog.hide();
                    })
                }
			});
			$('.payment-method-new').on('tap','h2,.distribution-way-info',function(){
				selectPaymentDialog.show()
			});
        // payment dialog end


        // coupon & code & code 2 dialog
            // 弹窗js
            var checkoutCouponDialog = $.spice.dialog({
                template: $('#checkout-new-coupon-code-dialog').html(),
                dialogClass: 'checkout-new-dialog checkout-new-coupon-code-dialog',
                initEvent: function(e) {
                    //初始化事件
                    var dialog = e.data.dialog;
                    $('.e-dialog-close', dialog.elem).on('tap', function() {
                        dialog.hide();
                    });
                    // tab切换
                    $('.coupon-tab span').on('tap', function() {
                        var _index = $(this).index();
                        $(this).addClass('is-active').siblings().removeClass('is-active');
                        $('.coupon-code-content > div').eq(_index).show().siblings().hide();
                    });
                    // 优惠券使用
                    $('.coupon-box .coupons-item').on('tap',function () {
						var _this = $(this)
						if(_this.hasClass('is-active')){
							_this.removeClass('is-active')
						}else{
							_this.addClass('is-active');
						}

						$('.no-coupon').removeClass('is-active');

						var couponData = $('.coupon-code-content .coupons').find('.is-active').attr('coupon-data')
						$('.event-coupon .distribution-way-info p span').addClass('is-active').html(couponData);
					})

                    // 不使用优惠券
                    $('.no-coupon').on('tap',function () {
                        $('.coupon-box .coupons-item').removeClass('is-active');
						$(this).addClass('is-active');
						var couponData = $('.event-coupon .distribution-way-info p span');
						couponData.removeClass('is-active').html(couponData.attr('coupon-data'));
						dialog.hide();
                    })
                    // 优惠码使用及取消
                    $('.e-code-use .btn').on('tap',function() {
						var couponData = $('.e-code-cancel').find('input').attr('value')
						$('.event-coupon .distribution-way-info p span').addClass('is-active').html(couponData);
                        $('.e-code-cancel').show();
						$('.e-code-use').hide();
						dialog.hide();
                    })
                    $('.e-code-cancel .btn').on('tap',function() {
                        $('.e-code-use').show()
						$('.e-code-cancel').hide()
						var couponData = $('.event-coupon .distribution-way-info p span');
						couponData.removeClass('is-active').html(couponData.attr('coupon-data'));
                    })
                }
			});
			$('.checkout-new-container').on('tap','.event-coupon',function(){
				checkoutCouponDialog.show();
				return false
			});
		// coupon & code & code 2 endianness dialog end

        $(window).on('scroll.mobScroll', function() {
            if ($.spice.getWindowWidth() > 1024) return false;
            var scrolls = $(window).scrollTop(),
				$headerH = $('.header-container').height(),
				// $addressH = $('.delivery-address-box').height()+15,
				$addressH = $('.delivery-address-box').height(),
				windowH = window.innerHeight,
				offsetTop = $('.mob-commutator .checked-select-con').offset().top+40;
                //console.log(scrolls+windowH,offsetTop)
            if (scrolls > $headerH+$addressH) {
                $('.submit-btn-fixed .address-info').show();
                $('.submit-btn-fixed').show();
            } else {
				$('.submit-btn-fixed .address-info').removeAttr('style');
			}
			// if(scrolls+windowH>offsetTop){
			// 	$('.submit-btn-fixed').removeAttr('style');
			// }else{
			// 	$('.submit-btn-fixed').show();
			// }
		}).trigger('scroll.mobScroll');

		var flagContainer = false;
		$(window).on('resize.checkoutMob', function(){
			if($.spice.getWindowWidth() <= 1024 ){
				if(!flagContainer){
					var windowH = window.innerHeight,
						bodyH = $('body').height(),
						footerH = $('.footer').height()+20,
						offsetTop = $('.mob-commutator .checked-select-con').offset().top+16;
						// console.log(windowH,bodyH-footerH,offsetTop)
					if(windowH>offsetTop){
						$('body,.submit-btn-fixed').removeAttr('style');
						// $('.mob-commutator .submit-button-box').addClass('block-sm');
					}else{
						// $('body').css({
						// 	'padding-bottom':'110px',
						// 	'background': '#000'
						// });
						$('.submit-btn-fixed').show();
						//$('.mob-commutator .submit-button-box').removeClass('block-sm');
					}
					flagContainer = true;
				}
			}else{
				if(flagContainer){
					$('body,.submit-btn-fixed').removeAttr('style');
					$('.submit-button-box').addClass('block-sm');
					flagContainer = false;
				}
			}
		}).trigger('resize.checkoutMob');

		// 空地址
			var $emptyddress = $('.empty-address');
			if ($emptyddress.length) {
				var $emptyCityDefault = $('.events-city-default', $emptyddress);

				$.spice.citySelect($emptyCityDefault, {
					callBack: function(val, elem){
						console.log(val, elem)
					}
				});

				// 默认地址
				$('.checked-select', $emptyddress).on('tap', function() {
					var _this = $(this)
					if (_this.hasClass('is-active')) {
						_this.removeClass('is-active')
					}else{
						_this.addClass('is-active')
					}
				});

				// 保存
				$('.e-empty-address-save', $emptyddress).on('tap', function () {
					console.log('save');
				})
			}

		// 空地址 end
    // checkout 改版 end


    //小程序提示关闭
    $('.wx-hint .e-close-btn').on('tap', function () {
        var _this = $(this),
			$wxHint = _this.parents('.wx-hint');

		$wxHint.fadeOut(function () {
			$(this).addClass('none').removeClass('block-sm')
		})
    });


});
