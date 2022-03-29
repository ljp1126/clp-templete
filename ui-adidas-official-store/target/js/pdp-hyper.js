$(function() {
	var window_w = $(window).width();
	if (window_w > 1024) {
		if ($('.events-scroll-kv').data('spice.kvScroll')) {
			$('.events-scroll-kv').data('spice.kvScroll').destroy();
		}
		var flag = true;
		$.spice.kvScroll('.events-scroll-kv', {
			type: 'scroll-loop',
			btn: true,
			autoPlay: true,
			loop: true,
			time: 3000,
			easing: 2500,
			dot: {
				style: 'dot'
			},
			callBack: function() {
				if (flag) {
					var $this = $('.events-scroll-kv').data('spice.kvScroll');
					$this.btnNext.off('tap').on('tap', function() {
						$this.scroller($this.curPage + 1, 300);
					});
					$this.btnPrev.off('tap').on('tap', function() {
						$this.scroller($this.curPage - 1, 300);
					});
					$this.dotsA.off('tap').on('tap', function() {
						$this.scroller($(this).index() + 1, 300);
					});
					flag = false;
				}
			}
		});
	} else {
		if ($('.events-scroll-kv').data('spice.kvScroll')) {
			$('.events-scroll-kv').data('spice.kvScroll').destroy();
		}
		$.spice.kvScroll('.events-scroll-kv', {
			type: 'scroll-loop',
			btn: true,
			autoPlay: true,
			loop: true,
			time: 3000,
			easing: 500,
			dot: {
				style: 'dot'
			},
			callBack: function() {}
		});
	}

	var _w = '',
		_h = '';
	//公共响应
	$(window).on('resize.index', function() {
		var _w = $(window).width() + $.spice.getScrollbarWidth();
		_h = $(window).height();
	}).trigger('resize.index');

	/*立即购买按钮弹层*/
	var infoDialog = $.spice.dialog({
		title: '',
		content: '本商品9月21日0:00至12:00期间的发售活动仅向短信受邀的adiCLUB会员开放活动参与资格。请您于9月21日中午12:00之后前往本站了解更多发售活动情况更新，感谢您的参与！<a class="events-banner-elastic">查看详情</a>',
		dialogClass: 'pdp-htper-room-info-dialog',
		buttons: {
			'确认': {
				btnClass: 'btn-blue btn-success',
				btnEvent: function(e) {
					//隐藏弹出层
					e.data.dialog.hide();	
					// $('.event-buy-now,.events-addcart').addClass('is-disabled');
					// $('.event-msg-block').addClass('msg-block-show');
				}
			}
		}
	});
	infoDialog.show();
	// $('.events-banner-elastic').on('tap', function() {
		
	// })

	$('.events-banner-elastic').on('tap', function() {
		infoDialog.hide();
		var $articleMap = $('.how-wear-video'),
			articleMapOffsetTop = Math.floor($articleMap.offset().top),
			articlewomanbtnHei = $('.header-fixed').outerHeight(true),
			headerBannerboxHs = 0;
		if ($(".header-banner-box").hasClass('header-banner-show')) {
			headerBannerboxHs = $(".header-banner-box").outerHeight(true);
		} else {
			headerBannerboxHs = 0;
		}
		$('html,body').animate({
			'scrollTop': articleMapOffsetTop - articlewomanbtnHei - headerBannerboxHs
		}, 600)
	})
});
