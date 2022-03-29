$(function() {
	var filterIscroll = null;
	// 分类模块显示隐藏
		$('.filter-wrapper span.filtername').on('tap', function(){
			var _this = $(this),
				_thisP = _this.parents('.filter-wrapper'),
				_thisUl = $('.filter-submenu', _thisP);

			_thisUl.slideToggle(300, function () {
				_thisP.toggleClass('is-active');
				filterIscroll && filterIscroll.refresh();
			});
		});
	//尺码滚动条
	$.spice.tinyscrollbar('.events-tinyscroll-filter-size', {
				wheelLock: true
				, touchLock: false
			});

	// 侧边栏选择
		$('.filter-wrapper ul:not(".filter-price") li:not(".filter-view-more")').live('tap', function() {
			var _this = $(this),
				_thisHasActive = _this.hasClass('is-active'),
				_thisP = _this.parents('.filter-wrapper'),
				filtername = $('.filtername', _thisP).text(),
				text = $('a', _this).text();


			if ($('.selected-filters').hasClass('none')) {
				$('.selected-filters').removeClass('none');
				$('.selected-filters').fadeIn(300);
			}


			if (!_thisHasActive) {
				_this.addClass('is-active');
				_this.find('.icon-checked').addClass('is-active');

				$('.selected-filters-content').append('<div class="filter-item">\
											<a>\
												<i class="icon icon-clear"></i>\
												<span class="filter-tit">'+ filtername +'：</span>\
												<span class="color-red">'+ text +'</span>\
											</a>\
										</div>');
			}else{
				_this.removeClass('is-active');
				_this.find('.icon-checked').removeClass('is-active');
				$('.selected-filters-content .filter-item span:contains('+ text +')').parents('.filter-item').fadeOut('300', function() {
					$(this).remove();
				});

			}
		});

	// 清除全部
		$('.clear-all').on('tap', function() {
			$('.filter-wrapper ul li').removeClass('is-active');

			$('.selected-filters').fadeOut('300', function() {
				$('.selected-filters-content').empty();
				$(this).addClass('none');
			});
		});

	// 清除单个
		$('.filter-item').live('tap', function() {
			var _this = $(this),
				_thisText = $('span:eq(1)', _this).text();

			_this.fadeOut('300', function() {
				$(this).remove();

				$('.filter-wrapper ul li a:contains('+ _thisText +')').parent().removeClass('is-active');
			});


			if ($('.selected-filters-content .filter-item').length === 1) {
				$('.selected-filters').fadeOut('300', function() {
					$('.selected-filters-content').empty();
					$(this).addClass('none');
				});
			}

		});

	// 返回顶部
		$('.events-back-top-fixed').on('tap', function() {
			$('html,body').animate({
				scrollTop: 0
			}, 500);
		});



	// events-pagesize  切换
		$('span:eq(1), span:eq(3)', '.events-pagesize').on('tap', function() {
			var _this = $(this),
				_thisIdex = _this.index();

			_this.addClass('is-active').siblings().removeClass('is-active');

			if (_this.parents('.top-paging-holder').length) {
				$('span', '.bottom-paging-holder .events-pagesize').removeClass('is-active');
				$('span:eq('+ _thisIdex +')', '.bottom-paging-holder .events-pagesize').addClass('is-active');
			}else{
				$('span', '.top-paging-holder .events-pagesize').removeClass('is-active');
				$('span:eq('+ _thisIdex +')', '.top-paging-holder .events-pagesize').addClass('is-active');
			}
		});


	// 尺码显示全部
		var filterColor = $('.filter-color');
		if ($('li', filterColor).length > 8) {
			filterColor.addClass('more-show');
			$('li:gt(7)', filterColor).not('.filter-view-more').addClass('none');
			$('.filter-view-more', filterColor).show();
		}
		$('.filter-view-more', filterColor).on('tap', function() {
			$('li:gt(7)', filterColor).not('.filter-view-more').toggleClass('none');
		});

	// 运动分类
		var filterMovement = $('.filter-movement');
		if ($('li', filterMovement).length > 5) {
			filterMovement.addClass('more-show');
			$('li:gt(4)', filterMovement).not('.filter-view-more').addClass('none');
			$('.filter-view-more', filterMovement).show();
		}
		$('.filter-view-more', filterMovement).on('tap', function() {
			$('li:gt(4)', filterMovement).not('.filter-view-more').toggleClass('none');
		});


	// 收起，展开
		$('.filter-view-more').on('tap', function() {
			var _this = $(this),
				_thisSib = _this.siblings();

			if (!_thisSib.hasClass('none')) {
				$('span', _this).text('收起更多');
			}else{
				$('span', _this).text('查看更多');
			}
		});
	// 收起，展开 end

	/*价格进度条*/
	$( ".price-slider" ).slider({
		range: true,
		min: 0,
		max: 1000,
		values: [ 0, 1000 ],
		slide: function( event, ui ) {
			console.log(ui.values)
			$( ".price-amount-min" ).val(ui.values[ 0 ]);
			$( ".price-amount-max" ).val(ui.values[ 1 ]);
		}
	});
	$( ".price-amount-min" ).val($( ".price-slider" ).slider( "values", 0 ));
	$( ".price-amount-max" ).val($( ".price-slider" ).slider( "values", 1 ));

	//PC 产品列表小图轮播
	myResGalleryList('.events-pro-small-img-box', 3);
	$('.events-pro-small-img-box li').live('tap', function(event) {
		event.preventDefault();
		var this_src = $(this).find('img').attr('src')
			, $viewImgBox = $(this).parents('.events-pro-small-img-box').prev();
		$(this).addClass('active').siblings('li').removeClass('active')
		$viewImgBox.find('a img').attr({ src: this_src });
	});

	$(window).on('resize.plp', function(){
		var w_W = $(window).width(),
			product_grid = $('.product-grid');

		if(w_W > 1240){
			product_grid.removeClass('product-grid-medium').removeClass('product-grid-small').addClass('product-grid-standard');
		}
		if(w_W < 1241 && w_W > 1024){
			product_grid.removeClass('product-grid-standard').removeClass('product-grid-small').addClass('product-grid-medium');
		}
		if(w_W < 1025){
			product_grid.removeClass('product-grid-standard').removeClass('product-grid-medium').addClass('product-grid-small');

			$('.list-nav-left').removeAttr('style');
			var $freeShipping = $('.list-free-shipping')
			if( $freeShipping.length!= 0 ){
				$('.list-free-shipping a').height($freeShipping.prev().outerHeight(true))
			}
		}

	}).trigger('resize.plp');

	//mb点击筛选条件
	$('.m-list-filter-btn').live("tap",function(){
		$('.list-nav-left').show();
		filterIscroll = new IScroll('.list-nav-left .filter-container', {
						scrollX: false,
						scrollY: true,
						mouseWheel: true,
						preventDefaultException: {
							tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|IMG|P|I|LABEL)$/
						}
					});
	});
	$('.filter-results-container .btn').on("tap",function(){
		$('.list-nav-left').hide();
	});

	
	//列表展示类型
	$('.events-typesetting li').on('tap', function(){
		var $self = $(this)
			, $listContent = $('.product-grid');
			if( !$self.hasClass('is-active') ){
				$self.addClass('is-active').siblings().removeClass('is-active');
				$listContent.toggleClass('show-type-list');
			}
	})


	//视频弹层显示（播放完毕自动关闭弹层）
	var videoDialog = $.spice.dialog({
				    template: $('#dialog-plp-video-template').html()
				    , dialogClass: "video-dialog dialog-plp-video"
				    , btnSuccessClass: '.btn'
				    , initEvent: function(e){
				    }
				});
	$('.list-video-banner .list-bannner-content a').on('tap', function(){
		var windowW = $(window).width();
		if( windowW > 1025 ){
			
			videoDialog.show(function(){
				var plpVideo = $('#plp-video')
				plpVideo[0].play();
				plpVideo.on('ended', function(){
					videoDialog.hide();
				})
				var dialog = videoDialog.elem;
		    	dialog.on('tap', function(e){
		    		if( !$(e.target).hasClass('dialog') || !$(e.target).closest('.dialog').length != 0){
	                	plpVideo[0].pause();
		    		}
	            });
			});	
		}else{
			var $closestItem = $(this).closest('.list-video-banner')
			$closestItem.addClass('is-active')
			var plpVideo = $('#plp-video-m');
			plpVideo[0].play();
			plpVideo.on('ended', function(){
				$closestItem.removeClass('is-active')
			})
		}
	})

});

// 自适应轮播
function myResGalleryList(obj, showNum) {
	var $resGallery = $(obj),
		showNum;

	if ($resGallery.data('spice.kvScroll')) {
		$resGallery.data('spice.kvScroll').destroy();
	}

	$('ul', $resGallery).css({
		width: '100%'
	})
	$('li:lt(' + showNum + ')', $resGallery).css({
		width: (100 / showNum) + '%'
	})
	$('li:gt(' + (showNum - 1) + ')', $resGallery).addClass('none')
	$.each($resGallery, function(i, elem) {
		if($('li', elem).length<1){
			$(this).children('.thumbnail').addClass('single-pro');
		}
		if($('li', elem).length>3){
			$.spice.tools.scrollGalleryRes({
				elem: elem,
				options: {
					moveNum: 1, //moveNum: showNum每次移动的个数
					easing: 1000,
					callBack: function (pages) {
					}
				}
			});
		}

	});
}
