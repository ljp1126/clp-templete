$(function () {
	// 登陆注册弹层
	$(".e-draw-handle").on('tap', function() {
		$(".extract-row").addClass('none')
		$(".login-register-tamplate").removeClass('none');
	});

	// 登陆注册弹层关闭按钮
	$(".e-close-login-register").on('tap', function() {
		$(".login-register-tamplate").addClass('none');		
		$(".extract-row").removeClass('none')
	});

	// 查看活动规则弹框
	var regularDialog = $.spice.dialog({
		template: $('#active-regular').html(),
		dialogClass: 'active-regular-box',
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.btn-close', dialog.elem).on('tap', function() {
				$('.active-regular-box').animate({
					right: -100 + '%'
				}, 300, function() {
					dialog.hide();
				});
			});
		}
	});

	$(".e-link-handle").on('tap', function(event) {
		event.preventDefault();
		regularDialog.show();
	});

	// 开始抽取弹框
	var resultDialog = $.spice.dialog({
		template: $('#extract-result').html(),
        dialogClass: 'extract-result-box',
        maskClose : false,
		initEvent: function(e) {

		}
	});


	// 开始抽奖
	$('.e-start-handle').on('tap', function(event) {
		event.preventDefault();
		var _this = $(this);
		$('.start-draw-inner-size').addClass('none');
		$(".start-draw-inner-btn").addClass('none');

		// 抽奖loading 效果
		_this.addClass('is-loading');

		// 抽奖结果弹层显示（开始抽取loading效果仅为参考，实际以后台返回为准）
		// setTimeout(function(){
			resultDialog.show();
		// }, 3000);
    });

    resultDialog.elem.on('dialog.show-after', function (e) {
        $('.e-start-handle').removeClass('is-loading');
        $('.extract-row').fadeOut();
    })

    resultDialog.elem.on('dialog.hide-before', function (e) {
        // $('.extract-row').fadeIn();
    })

	// 填写信息弹框
	var informationDialog = $.spice.dialog({
		template: $('#editor-information').html(),
		dialogClass: 'editor-information-box',
		maskClose : false,
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.btn-close', dialog.elem).on('tap', function() {
				$('.editor-information-box').animate({
					right: -100 + '%'
				}, 300, function() {
					dialog.hide();
				});
            });
            
            $('.btn-close', dialog.elem).addClass('none')
			// checkbox
			$('.event-check-box').on('tap',function(){
				var _this = $(this);
				 _this.find('i').toggleClass('is-active');

			})
		}
	});

	informationDialog.elem.on('dialog.show-before', function() {
		$('html, body').css({
			'width': '100%',
			'height': '100%'
		});
	});

	informationDialog.elem.on('dialog.hide-after', function() {
		$('html, body').css({
			'width': '',
			'height': ''
		});
	});

	$(".e-editor-handle").on('tap', function(event) {
		event.preventDefault();
		informationDialog.show();
		resultDialog.hide();
	});

	// 填写信息提交结果弹框
	var submitDialog = $.spice.dialog({
		template: $('#submit-result').html(),
		dialogClass: 'submit-result-box',
		maskClose : false,
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.btn-close', dialog.elem).on('tap', function() {
				$('.submit-result-box').animate({
					right: -100 + '%'
				}, 300, function() {
					dialog.hide();
				});
            });
            
            $('.btn-close', dialog.elem).addClass('none')
		}
    });
    
    submitDialog.elem.on('dialog.show-before', function () {
        $.spice.tools.changeImageSrc();
    })

	$(".e-submit-handle").on('tap', function(event) {
		event.preventDefault();
		informationDialog.hide();
		submitDialog.show();
	});



});
