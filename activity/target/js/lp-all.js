$(function () {

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
			$('.events-menus-nav > li > a', $mNavbarMenu).on('tap', function() {
				var _this = $(this);
				
				if (_w <= 1024) {

					if (!_this.parent().hasClass('is-open')) {
						_this.parent().siblings().find($('.sub-menu')).stop(true, true).slideUp('fast', function () {
							_this.parent().siblings().removeClass('is-open');
						});

						$('.sub-menu', _this.parent()).stop(true, true).slideDown('400');
						_this.parent().addClass('is-open');
					}else{
						$('.sub-menu', _this.parent()).stop(true, true).slideUp('fast', function() {
							_this.parent().removeClass('is-open');
						});
					}

					// 如果有下级菜单，禁用跳转
					if ($('.sub-menu', _this.parent()).length) {
						return false;
					}

				}

			});

			// 召唤侧边栏三级菜单
				$('.sub-menu-ul > li > a', $mNavbarMenu).on('tap', function() {
					if (_w <= 1024) {
						var _this = $(this);

						if (!_this.parent().hasClass('is-open')) {
							_this.parent().siblings().find($('.three-menu')).stop(true, true).slideUp('fast', function () {
								_this.parent().siblings().removeClass('is-open');
							});

							$('.three-menu', _this.parent()).stop(true, true).slideDown('400');
							_this.parent().addClass('is-open');
						}else{
							$('.three-menu', _this.parent()).stop(true, true).slideUp('fast', function() {
								_this.parent().removeClass('is-open');
							});
						}

						// 如果有下级菜单，禁用跳转
						if ($('.three-menu', _this.parent()).length) {
							return false;
						}
					}
				});

	// mobile 侧边栏 end


});
