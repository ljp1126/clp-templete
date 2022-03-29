$(function() {
	//订阅弹层
	var subscribeDialog = $.spice.dialog({
		template: $('#subscribe-dialog').html(),
		dialogClass: 'pdp-info-dialog subscribe-dialog',
		initEvent: function(e) {
			var dialog = e.data.dialog
			$('.btn', dialog.elem).on('tap', function() {
				dialog.hide()
			})

			// 是否成年
			$('.e-adult-checkbox', dialog.elem).on('tap', function() {
				var _this = $(this)
				$('.icon-checked', this).toggleClass('is-active');
			});

			// 提交订阅信息
			$('.e-submit', dialog.elem).on('tap', function() {
				if (true) {
					subscribeSuccessDialog.show()
				}
			});
		}
	});

	//订阅成功弹层
	var subscribeSuccessDialog = $.spice.dialog({
		template: $('#subscribe-success-dialog').html(),
		dialogClass: 'pdp-info-dialog subscribe-success-dialog',
		initEvent: function(e) {
			var dialog = e.data.dialog
			$('.btn', dialog.elem).on('tap', function() {
				dialog.hide()
			})
		}
	});

	// 触发订阅弹层
	$('.e-subscribe').on('tap', function() {
		subscribeDialog.show();
	})


})
