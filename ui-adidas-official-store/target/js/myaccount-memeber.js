$(function(){



//	账户信息
	$(".e-modify-password").on("tap", function () {

        $(this).parent().siblings().slideToggle();

    });

    $(".account-btn a").on("tap", function () {

        $(this).parents('.personal-data-modify').slideUp();

    });

//  个人信息
    $(".btn-modify").on("tap", function () {

        $(this).parent().hide().siblings().show();

    });

    $(".personal-btn a").on("tap", function () {

        $(this).parents('.personal-data-modify').slideUp().hide().siblings().show();
        $('html,body').animate({
			scrollTop: 0
		}, 200);
    });

//	性别选择
	$(".gender a").on("tap", function () {

        $(this).addClass("active").siblings().removeClass("active");

    });

//  爱好
    $(".form-remeber").on("tap", function () {
        $(this).find('i').toggleClass("is-active");
    });

//	订阅提示
	var tipsActiveDialog = $.spice.dialog({
		dialogClass: 'tipsActive-dialog',
		content: '<p><i class="icon icon-prompt-dialog"></i>您将不会收到来自adidas的最新资讯和新品通知</p>',
//		autoClose: 3000,
		showMask: false,
		isRemove: false
	});

	$('.small-tips .form-remeber').on("tap", function () {
		var _this = $(this);
		if( _this.find('i').hasClass('is-active')){
			_this.parent().removeClass('tips-active');
		}else{
			_this.parent().addClass('tips-active');
		}
	});

	var _wW = $(window).width();
	if(_wW>1024){

		//  省市区
	    $.spice.citySelect('.events-city-simulation', {
	        btnClass: '.events-city-text'
	        , contentClass: '.events-city-content'
	        , defaultText:['请选择省份','请选择城市']
	        , isIscroll: true
	        , tinyscrollbarConfig: {
	            wheelLock: true,
	            touchLock: false
	        }
	    });

	    //	生日
		$.spice.ymdSelect('.events-ymd-simulation', {
	        btnClass: '.events-ymd-text'
	        , contentClass: '.events-ymd-content'
	        , year:[1900, 2017]
	        , isIscroll: true
	        , tinyscrollbarConfig: {
	            wheelLock: true,
	            touchLock: false
	        }
	    });
	}else{

		/*$('.small-tips .form-remeber').on("tap", function () {
			var _this = $(this);
			if( _this.find('i').hasClass('is-active')){
				tipsActiveDialog.hide();
			}else{
				tipsActiveDialog.show();
			}
		});*/

		//  省市区
		$.spice.citySelect('.events-city-simulation', {
            defaultText:['请选择省份','请选择城市']
            , isIscroll: true
        });

        //	生日
		$.spice.ymdSelect('.events-ymd-simulation', {
	        year:[1900, 2017]
	        , isIscroll: true
	    });
	}

	var _w, _h;
	$(window).on('resize.orders', function() {
		_w = $.spice.getWindowWidth();
		_h = $(window).height();

		/*订单列表商品超2个显示个数*/
		$('.product-multiple-list').each(function(){
			var _this = $(this),
				this_length = _this.find('.thumbnail').length;

			if (_w > 1250) {
				if(this_length > 5){
					_this.find('.thumbnail:eq(5)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(4)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
			}else if(_w <= 1250 && _w > 1100){
				if(this_length > 4){
					_this.find('.thumbnail:eq(4)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(3)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
			}else{
				if(this_length > 3){
					_this.find('.thumbnail:eq(3)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(2)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
			}

            if (_w < 1025) {
                // 翻页
                // num 可控制提前或者延后加载
                // 默认 loading 图标出现就执行
                var page = 0;
                $.spice.visualArea('.list-loading-wrap', {
                    num: -100,
                    callBack: function(elem) {
                        ++page;
                        if (page <= 5) {

                            var template = $('#product-template').html(),
                                html = '';
                            for (var i = 0; i < 4; i++) {
                                html += template;
                            };
                            $('.events-orders-item .goods-item-box').append(html);

                            //spice.lazyLoad();
                            $('.list-loading-wrap').show();
                        } else {
                            //隐藏loading图标
                            $('.list-loading-wrap').hide();
                        }
                    }
                });
            }

		});

		/*评价带赠品按钮定位*/
		$('.product-show .product-list-item').each(function(){
			if (_w > 1024) {
				if($(this).find('> div').hasClass('gift-product-info')){
					var gift_product_info_H = ($(this).find('.gift-product-info').height()+22)/2;
					$(this).find('.btn-wrapper').css('margin-top',-gift_product_info_H);
				}
			}else{
				$(this).find('.btn-wrapper').removeAttr('style');
			}
		});


        // //小屏幕placeholder
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
	}).trigger('resize.orders');

	// 公共提示弹层模板（3秒后消失）
	var successfulDialog1 = $.spice.dialog({
		dialogClass: 'automatic-out-dialog'
		, content: '<i class="icon icon-fault"></i>很抱歉，您的密码修改失败，请重试'
		, autoClose: 3000
		, showMask: false
		, isRemove: false
	});
	//测试用，开发时，请重新定义class或id绑事件
	$(document).on('tap','.account-btn .btn-blue', function(event) {
		event.preventDefault();
		successfulDialog1.show();
	});

	/*显示隐藏密码*/
	$('.personal-data-modify .form-group .form-input input').on('focus',function(){
		$(this).siblings('.events-eye').show();
	});
	$('.personal-data-modify .form-group .form-input input').on('blur',function(){
		if($(this).val() == '' || $(this).val() == 'none'){
			$(this).siblings('.events-eye').hide();
		}
	});
	$(document).on('tap','.personal-data-modify .events-eye',function(event) {
		if($(this).siblings('input').attr('type') == 'password'){
			$(this).removeClass('eye-hide').siblings('input').attr('type','text');
		}else{
			$(this).addClass('eye-hide').siblings('input').attr('type','password');
		}
	});

	//7-2 新增添加邮箱
	var ruleDialog = $.spice.dialog({
		template: $('#rule-dialog').html(),
		dialogClass: 'rule-dialog',
		initEvent: function (e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function () {
				dialog.hide();
			});

			//光标
			var windowScrollTopFlag = 0;
			dialog.elem.on('dialog.show-before', function () {
				windowScrollTopFlag = $(window).scrollTop();
				$('html,body').css({
					'height': '100%'
				});
				dialog.elem.css({
					'position': 'absolute',
					'height': window.innerHeight
				});
			});
			dialog.elem.on('dialog.hide-before', function () {
				$('html,body').css({
					'height': ''
				});
				$(window).scrollTop(windowScrollTopFlag);
			});
			//光标 end
		}
	});
	$('.e-personal-data-mail').on('tap', function () {
		ruleDialog.show();
	});
	$('.e-form-input-code').on('tap',function() {
		var _this = $(this);
		if (!_this.hasClass('is-disabled')) {
			_this.addClass('is-disabled');

			// 验证码倒计时
			var codeCountdown
			countdown = 60;
			$('.e-form-input-txt').removeClass('none');
			_this.text('已发送(' + countdown + 's)');
			codeCountdown = setInterval(function () {

				countdown--;
				_this.text('已发送(' + countdown + 's)');

				if (countdown < 0) {
					clearTimeout(codeCountdown);
					_this.removeClass('is-disabled');
					_this.text('重新发送');
					$('.e-form-input-txt').addClass('none');
				}
			}, 1000);
		}
		if (!$('.acquire-code').hasClass('is-disabled')) {
			_this.addClass('is-disabled');
		}
	});
	$("#mazey-mail").blur(function () {
		var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
		var obj = $("#mazey-mail").val();
		if (!reg.test(obj)) {
			$('.form-input-mail').addClass('is-error');
		} else {
			$('.form-input-mail').removeClass('is-error');
		}
	})

	// 7-3 新增设置密码
	var ruleDialogs = $.spice.dialog({
		template: $('#rule-dialog-password').html(),
		dialogClass: 'rule-dialog-password',
		initEvent: function (e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function () {
				dialog.hide();
			});
			//光标
			var windowScrollTopFlags = 0;
			dialog.elem.on('dialog.show-before', function () {
				windowScrollTopFlags = $(window).scrollTop();
				$('html,body').css({
					'height': '100%'
				});
				dialog.elem.css({
					'position': 'absolute',
					'height': window.innerHeight
				});
			});
			dialog.elem.on('dialog.hide-before', function () {
				$('html,body').css({
					'height': ''
				});
				$(window).scrollTop(windowScrollTopFlags);
			});
			//光标 end
		}
	});
	$('.e-modify-password-setting').on('tap', function () {
		ruleDialogs.show();
	});
	
	//input 苹果光标偏移
	if (spice.iPhone) {
		spice.fixedInput(ruleDialog);
		alert('1')
	}
	if (spice.iPhone) {
		spice.fixedInput(ruleDialogs);
		alert('1')
	}

	/*显示隐藏密码*/
	$('.rule-dialog-password .personal-data-modify .form-group .form-input input').on('focus', function () {
		$(this).siblings('.events-eye').show();
	});
	$('.rule-dialog-password .personal-data-modify .form-group .form-input input').on('blur', function () {
		if ($(this).val() == '' || $(this).val() == 'none') {
			$(this).siblings('.events-eye').hide();
		}
	});


})
