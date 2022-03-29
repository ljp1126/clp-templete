$(function () {
	// 文字轮播
		$.spice.kvScroll('.events-topinfo-scroll', {
			type: 'scroll-loop',
			autoPlay: true,
			loop: true,
			btn: false,
			time: 5000
		});

		// 文字轮播高度
			var $topinfoLi = $('.events-topinfo-scroll li'),
				topinfoLiHeightArr,
				topinfoLiMaxHeight,
				topinfoLiHeightSum;


			$(window).on('resize.setTopinfoLiMaxHeight', function() {
				if ($topinfoLi.length < 1) return false;

				topinfoLiHeightArr = [];
				topinfoLiMaxHeight = 0;
				topinfoLiHeightSum = 0;

				$topinfoLi.css({
					height: ''
				});

				$topinfoLi.each(function(index, el) {
					topinfoLiHeightArr.push($(el).outerHeight(true))
					topinfoLiHeightSum += $(el).outerHeight(true)
				});

				if (topinfoLiHeightSum/$topinfoLi.length !== topinfoLiHeightArr[0] ) {
					topinfoLiMaxHeight = Math.max.apply(null, topinfoLiHeightArr);
					$topinfoLi.css({
						height: topinfoLiMaxHeight
					});
				}

			}).trigger('resize.setTopinfoLiMaxHeight');
		// 文字轮播高度 end

	// 文字轮播关闭
		$('.events-top-info-close').on('tap', function() {
			var _this = $(this),
				_thisP = _this.parents('.section-top-info');

			$('.events-topinfo-scroll').fadeOut(70);
			_thisP.slideUp(50);

			$(window).off('resize.setTopinfoLiMaxHeight');

		});

		// 首页kv
		var window_w = $(window).width();
		if(window_w>1024){
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
				callBack:function(){
					if(flag){
						var $this = $('.events-scroll-kv').data('spice.kvScroll');
						$this.btnNext.off('tap').on('tap', function(){
			            	$this.scroller($this.curPage+1,300);
			            });
			            $this.btnPrev.off('tap').on('tap', function(){
			            	$this.scroller($this.curPage-1,300);
			            });
			            $this.dotsA.off('tap').on('tap', function(){
			            	$this.scroller($(this).index() + 1,300);
			            });
			            flag = false;
					}
				}
			});
		}else{
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
				callBack:function(){}
			});
		}

	var _w = '', _h = '';
	//公共响应
		$(window).on('resize.index', function() {
			var _w = $(window).width() + $.spice.getScrollbarWidth();
				_h = $(window).height();
		}).trigger('resize.index');


	// mobile footer栏
		var $mNavbarMenu = $('.m-menu-footer');
		// 召唤侧边栏二级菜单
			$('.events-menus-nav > li > a', $mNavbarMenu).on('tap', function(e) {
				var _this = $(this);

				if (_w <= 1024) {

					if (!_this.parent().hasClass('is-open')) {
						_this.parent().siblings().find($('.sub-menu')).stop(true, true).slideUp('fast', function () {
							_this.parent().siblings().removeClass('is-open');
						});

						$('.sub-menu', _this.parent()).stop(true, true).slideDown('400', function () {
							$('html,body').animate({
								scrollTop: _this.offset().top
							}, 'fast');
						});
						_this.parent().addClass('is-open');
					}else{
						$('.sub-menu', _this.parent()).stop(true, true).slideUp('fast', function() {
							_this.parent().removeClass('is-open');
						});
					}

					// 如果有下级菜单，禁用跳转
					if ($('.sub-menu', _this.parent()).length) {
						e.preventDefault();
						return false;
					}

				}

			});

			// 召唤侧边栏三级菜单
				$('.sub-menu-ul > li > a', $mNavbarMenu).on('tap', function(e) {
					if (_w <= 1024) {
						var _this = $(this);

						if (!_this.parent().hasClass('is-open')) {
							_this.parent().siblings().find($('.three-menu')).stop(true, true).slideUp('fast', function () {
								_this.parent().siblings().removeClass('is-open');
							});

							$('.three-menu', _this.parent()).stop(true, true).slideDown('400', function () {
								$('html,body').animate({
									scrollTop: _this.offset().top
								}, 'fast');
							});
							_this.parent().addClass('is-open');
						}else{
							$('.three-menu', _this.parent()).stop(true, true).slideUp('fast', function() {
								_this.parent().removeClass('is-open');
							});
						}

						// 如果有下级菜单，禁用跳转
						if ($('.three-menu', _this.parent()).length) {
							e.preventDefault();
							return false;
						}
					}
				});

	// mobile 侧边栏 end

	/*首页弹层*/
	var welcomeDialog = $.spice.dialog({
		template: $('#welcome-dialog').html(),
		dialogClass: 'welcome-dialog'
	});
	// welcomeDialog.show(function () {
	// 	setTimeout(function() {
	// 		$('.welcome-dialog').data('iScroll') && $('.welcome-dialog').data('iScroll').destroy();
	// 		$('.welcome-dialog .dialog-scroll-wrap').removeAttr('style');
	// 	},1600);
	// });

});
