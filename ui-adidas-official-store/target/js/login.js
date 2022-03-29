
$(function () {

    $(".form-remeber").on("tap", function () {
        $(this).find('i').toggleClass("is-active");
    });

    $('.events-btn-git-code').on('tap', function() {
        var _this = $(this);
        if (!_this.hasClass('is-disabled')) {
            _this.addClass('is-disabled');

            // 验证码倒计时
            var codeCountdown
            countdown = 60;

            _this.text('已发送('+countdown + 's)');
            codeCountdown = setInterval(function() {

                countdown--;
                _this.text('已发送('+countdown + 's)');

                if (countdown < 0) {
                    clearTimeout(codeCountdown);
                    _this.removeClass('is-disabled');
                    _this.text('获取验证码');
                }
            }, 1000);
        }
        if (!$('.acquire-code').hasClass('is-disabled')){
            _this.addClass('is-disabled');
        }
    });

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

    $.spice.ymdSelect('.events-ymd-simulation', {
        btnClass: '.events-ymd-text'
        , contentClass: '.events-ymd-content'
        , year:[1900, 2017]
        , isIscroll: true
	});
	$.spice.ymdSelect('.events-ymd-default', {
		year:[1900, 2017],
		callBack: function(val, elem){
			console.log(val, elem)
		}
    });
    $.spice.citySelect('.events-city-default', {
        defaultText: ['请选择省份', '请选择城市'],
        callBack: function (val, elem) {
            console.log(val, elem)
        }
    });

    $('.show-mobb > h4 > i').on('tap',function(){
        $(this).toggleClass('active');
        $(this).parents('.show-mobb').find('.login-detial ,.h4-explain').toggleClass('none');
    })

    $('.not-me').on('tap',function(){

        $(this).parent('.ziliao').hide();
        $('.notne-show').show();

    });
    // 登录输入可清除
    $('.events-clears ').on('input propertychange', function() {
        var _this = $(this),
            _thisVal = _this.val(),
            _thisParents = _this.parents('.form-input ')

        if (_thisVal !== '' && _thisVal !== null) {
            _this.siblings('.e-login-clears').removeClass('none')
        }else{
            _this.siblings('.e-login-clears').addClass('none')
        }
    })
    // 清除input框内容
    $('.e-login-clears').on('tap', function() {
        $('.events-clears').removeAttr('value');
        $('.events-clears').trigger('propertychange');
    })
    //新增短信登陆
        //短信登陆
    if ($.spice.getWindowWidth() > 1024) {
        $('.e-login-detial-account').on('tap', function () {
            $(".login-detial-account").removeClass('none');
            $('.login-detial-mobile').addClass('none');
            $(this).children('h4').addClass('login-detial-border');
            $('.e-login-detial-mobile').children().removeClass('login-detial-border');
            $(".form-input-code").removeClass('none');
            $(".forget-mobile-02").removeClass('none');
        });
        //账号密码登陆
        $('.e-login-detial-mobile').on('tap', function () {
            $(".login-detial-mobile").removeClass('none');
            $('.login-detial-account').addClass('none');
            $(this).children('h4').addClass('login-detial-border');
            $('.e-login-detial-account').children().removeClass('login-detial-border');
            $(".form-input-code").addClass('none');
            $(".form-input-code-01").addClass('block');
            $(".forget-mobile-02").addClass('none');
        });
    }
    if ($.spice.getWindowWidth() < 1024){
        $(".login-detial-account").addClass('none');
        $('.login-detial-mobile').removeClass('none');
        $('.e-forget-mobile-code').removeClass('none');
        $(".e-forget-mobile").addClass('none');
        $('.forget-mobile-02').removeClass('block-sm');
        $(".e-forget-mobile").on('tap', function () {
            $(".login-detial-mobile").removeClass('none');
            $('.login-detial-account').addClass('none');
            $('.e-forget-mobile-code').removeClass('none');
            $(this).addClass('none');
            $('.e-login-detial-mobile').removeClass('none-sm');
            $('.e-login-detial-account').addClass('none-sm');
            $('.forget-mobile-02').addClass('none-sm');
            $('.forget-mobile-02').removeClass('block-sm');

        })
        $('.e-forget-mobile-code').on('tap', function () {
            $(".login-detial-account").removeClass('none');
            $('.login-detial-mobile').addClass('none');
            $('.e-forget-mobile').removeClass('none');
            $(this).addClass('none');
            $('.e-login-detial-account').removeClass('none-sm');
            $('.e-login-detial-mobile').addClass('none-sm');
            $('.forget-mobile-02').removeClass('none-sm');
            $('.forget-mobile-02').addClass('block-sm');
        })
    }
    //新增激活页面邮箱验证
    $("#mazey").blur(function(){
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        var obj = $("#mazey").val();
        if (!reg.test(obj)) {
            $('.form-group-mail').addClass('is-error');
        } else {
            $('.form-group-mail').removeClass('is-error');
        }
    })
});
