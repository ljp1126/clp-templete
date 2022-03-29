$(function() {
	// 顶部、订单筛选tab
	$('.events-nav-tab ul li').on('tap', function() {
		var index = $(this).index();
		$(this).addClass('is-active').siblings().removeClass('is-active');

		$('.my-subscriptions-box .my-subscriptions-item').eq(index).addClass('is-active').siblings().removeClass('is-active');
	});

	//删除订阅弹层
	var delSubscriptionsDialog = $.spice.dialog({
		title: '确定要删除该订阅商品吗？',
		dialogClass: 'del-subscriptions-dialog',
		maskClose: false,
		buttons: {
			'取消': {
				btnClass: 'btn-black',
				btnEvent: function(e) {
					$('.product-container .will-del').removeClass('will-del');
					//隐藏弹出层
					e.data.dialog.hide();
				}
			},
			'确定': {
				btnClass: 'btn-blue',
				btnEvent: function(e) {
					// 删除指定商品
					$('.product-container .will-del').fadeOut('300', function() {
						$(this).remove();
					});

					//隐藏弹出层
					e.data.dialog.hide();
				}
			}
		}
	});

	// 删除订阅
	$('.my-subscriptions-box').on('tap', '.e-del', function() {
		var _this = $(this),
			_thisItem = _this.parents('.thumbnail').parent();

		_thisItem.addClass('will-del');
		delSubscriptionsDialog.show()
	});

})
