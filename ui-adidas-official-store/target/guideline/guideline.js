$(function() {
	$('li', '.gl-grid-left').click(function() {
		$('body,html').animate({
			scrollTop: $('#' + $(this).attr('data')).offset().top
		}, 100);

		console.log($('#' + $(this).attr('data')).offset().top);
	});

	// dialog
		var infoDialog = $.spice.dialog({
			dialogClass: 'dialog-common-prompt',
			title: '提示',
			content: '你确定要删除这件商品吗？你确定要清空购物车吗？',
			buttons: {
				'取消': {
					btnClass: 'btn-cancel',
					btnEvent: function(e) {
						//隐藏弹出层
						e.data.dialog.hide();
						console.log('取消');
					}
				},
				'确认': {
					btnClass: 'btn-success btn-blue',
					btnEvent: function(e) {
						//隐藏弹出层
						e.data.dialog.hide();
						console.log('确认');
					}
				}
			}
		});
		//调用show方法，可直接显示弹出层
		$('.e-dialog-show').on('tap', function() {
			infoDialog.show();
		});
	// dialog end


});
