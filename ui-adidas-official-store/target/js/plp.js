$(function() {
	if ($.spice.getWindowWidth() < 1024){
		//筛选吸顶
		var windowTopHeaderLP = 0,
			falg = false;
		$(window).on('scroll.headerScrollLPLP', function () {
			var $scrollsT = $(this).scrollTop(),
				$header = $('.header-fixed'),
				headerH = $header.outerHeight(true),
				toppagingFixTop = $('.top-paging-fix').offset().top,
				headerBannerboxH = 0;
			if ($(".header-banner-box").hasClass('header-banner-show')) {
				headerBannerboxH = $(".header-banner-box").outerHeight(true);
			} else {
				headerBannerboxH = 0;
			}
			if ($scrollsT >= toppagingFixTop) {
				$(".top-paging-fix-find").addClass('top-paging-fixed').addClass('top-paging-fix-find1');
				if ($scrollsT > windowTopHeaderLP) {
					windowTopHeaderLP = $scrollsT;
					if (!falg) {
						console.log(2)
						$(".top-paging-fix-find").css({ top: 0 });
						falg = true;
					}
					
				} else {
					windowTopHeaderLP = $scrollsT;
					if (falg) {
						console.log(1)
						$(".top-paging-fix-find").css({ top: (headerH + headerBannerboxH) });
						falg = false;
					}
				}
			} else {
				$(".top-paging-fix-find").removeClass('top-paging-fixed').removeClass('top-paging-fix-find1').removeAttr('style');
			}
			// 
		}).trigger('scroll.headerScrollLPLP');
	}
   
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

				if(!$('.filter-wrapper ul li').hasClass('is-active')){
					$('.selected-filters').fadeOut('300', function() {
						$('.selected-filters-content').empty();
						$(this).addClass('none');
					});
				}

			}
		});

	// 清除全部
		$('.clear-all').on('tap', function() {
			$('.filter-wrapper ul li').removeClass('is-active').find('i').removeClass('is-active');

			$('.selected-filters').fadeOut('300', function() {
				$('.selected-filters-content').empty();
				$(this).addClass('none');
			});
		});

	// 清除单个
	$('.filter-item').live('tap', function (event) {
			event.stopPropagation();
			var _this = $(this),
				_thisText = $('span:eq(1)', _this).text();
				console.log(_thisText);

			_this.fadeOut('300', function() {
				$(this).remove();

				$('.filter-wrapper ul li a:contains('+ _thisText +')').parent().removeClass('is-active').find('i').removeClass('is-active');
			});
			if ($('.selected-filters-content-new .filter-item').length === 1) {
				$('.selected-filters').fadeOut('0', function () {
					$('.selected-filters-content-new').empty();
					$(this).addClass('none');
				});
			}

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
			var $this = $(this).parent('.filter-movement');
			$('li:gt(4)', $this).not('.filter-view-more').toggleClass('none');
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

	var listNavFlag = true;
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
			if(listNavFlag){
				$('.list-nav-left').removeAttr('style');
				listNavFlag = false;
			}
			var $freeShipping = $('.list-free-shipping')
			if( $freeShipping.length!= 0 ){
				$('.list-free-shipping a').height($freeShipping.prev().outerHeight(true))
			}
		}

	}).trigger('resize.plp');

	//mb点击筛选条件
	var headerHs = $('.header-fixed').outerHeight(true),
		headerBannerboxHs = 0;
	if ($(".header-banner-box").hasClass('header-banner-show')) {
		headerBannerboxHs = $(".header-banner-box").outerHeight(true);
	} else {
		headerBannerboxHs = 0;
	}
	//mob点击top  banner  7-17
	$('.events-banner-close').on('tap', function () {
		if ($.spice.getWindowWidth() < 1024) {
			$('.events-list-left').css({
				'padding-top': headerHs
			})
			$('.e-list-nav-left-background').css({
				'top': headerHs
			})
			headerBannerboxHs = 0;
		}else{
			$('.events-list-left').css({
				'padding-top': 0
			})
			$('.e-list-nav-left-background').css({
				'top': 0
			})
		}
	})
	//mob点击top  banner  end
	$('.m-list-filter-btn').live("tap",function(){
		$('.list-nav-left').show();
		$('html,body').animate({
			scrollTop: 0
		}, 0);
		$('.list-nav-left .filter-container').css('overflow-y','scroll');
		setTimeout(function(){
			$('html,body').css({
				'overflow': 'hidden',
				'position': 'fixed',
				'height': '100' + '%'
			});
		},0);
		$('.list-nav-left-background').css('right','0');
		/*filterIscroll = new IScroll('.list-nav-left .filter-container', {
						scrollX: false,
						scrollY: true,
						mouseWheel: true,
						preventDefaultException: {
							tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|IMG|P|I|LABEL)$/
						}
					});*/
		$(".top-paging-fix").removeClass('top-paging-fixed').removeAttr('style');
		$('.events-list-left').css({
			'padding-top': headerHs + headerBannerboxHs
		})
		$('.e-list-nav-left-background').css({
			'top': headerHs + headerBannerboxHs
		})
		$(".clear-all-content").parents(".filter-main").removeClass("none");
		$(".clear-all-content").addClass("block-sm");
	});
	$('.e-list-nav-left-background,.clear-all-finish').on('tap', function (event){
		event.stopPropagation();
		$('html,body').css({
			'overflow': 'hidden',
			'position': 'fixed',
			'height': '100' + '%'
		});
		$('html,body,.list-nav-left .filter-container').removeAttr('style');
		$('.list-nav-left-background').css('z-index','1')
		$('.list-nav-left-background').stop(true, true).animate({
			right: '100%'
		},0, function(){
			$('.list-nav-left').css({'display': 'none'})
			$('.list-nav-left-background').css('z-index', '10')
		})
		$(".clear-all-content").removeClass("block-sm");
		return false;
	})
	$('.filter-results-container .btn').on("tap",function(){
		$('.list-nav-left').hide();
		$('html,body,.list-nav-left .filter-container').removeAttr('style');
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
	// var videoDialog = $.spice.dialog({
	// 	template: $('#dialog-plp-video-template').html(),
	// 	dialogClass: "video-dialog dialog-plp-video",
	// 	btnSuccessClass: '.btn',
	// 	initEvent: function(e) {}
	// });

	// $('.list-video-banner .list-bannner-content a').on('tap', function() {
	// 	var windowW = $(window).width();
	// 	if (windowW > 1025) {
	// 		videoDialog.show(function() {
	// 			var plpVideo = $('#plp-video')
	// 			plpVideo[0].play();
	// 			plpVideo.on('ended', function() {
	// 				videoDialog.hide();
	// 			})
	// 			var dialog = videoDialog.elem;
	// 			dialog.on('tap', function(e) {
	// 				if (!$(e.target).hasClass('dialog') || !$(e.target).closest('.dialog').length != 0) {
	// 					plpVideo[0].pause();
	// 				}
	// 			});
	// 		});
	// 	} else {
	// 		var $closestItem = $(this).closest('.list-video-banner')
	// 		$closestItem.addClass('is-active')
	// 		var plpVideo = $('#plp-video-m');
	// 		plpVideo[0].play();
	// 		plpVideo.on('ended', function() {
	// 			$closestItem.removeClass('is-active')
	// 		})
	// 	}
	// })

	var bannerVideoTimer = null;
	$('.list-video-banner .list-bannner-content a').on('tap', function(e) {
		e.preventDefault();

		var _this = $(this),
			videoCode = _this.data('videoCode'),
			_thisParents = _this.parents('.list-bannner-content');

		if ($.spice.getWindowWidth() > 1024) {
			openVideo(videoCode, 'true');
		}else{

			var $closestItem = $(this).closest('.list-video-banner')
			$closestItem.addClass('is-active')

			if ($(".video-content", _thisParents).is(':empty')) {
				var videoContent = $(".video-content", _thisParents),
					videoSrc = "https://p.bokecc.com/player?vid=" + videoCode + "&siteid=6293AC06BFB87D25&autoStart=true&playerid=36764A827EC1263B&playertype=1",
					objScript = document.createElement("script");

				objScript.setAttribute("src", videoSrc);
				objScript.setAttribute("type", "text/javascript");
				videoContent.append(objScript);
			}

			bannerVideoTimer = setInterval(function () {
				var plpVideo = $('video', $closestItem);
				if (plpVideo.length) {
					plpVideo[0].play();
					plpVideo.on('ended', function() {
						$closestItem.removeClass('is-active')
					})

					clearInterval(bannerVideoTimer)
				}
			}, 100)
		}
	});


// 查看更多
		$('.look-more>a').on('tap', function(e) {
			var _this = $(this),
				_thisSib = _this.parent().siblings();

			if (_thisSib.hasClass('none')) {
				e.preventDefault();
				_this.html('<span class="pick-up">收起</span>');
				_thisSib.removeClass('none');
			}else{
				e.preventDefault();
				_this.html('<span>查看更多</span>');
				_thisSib.eq(8).nextAll().not('.look-more').addClass('none');

			}
		});
	// 收起，展开 end


//确认关闭


$(".close").on('tap',function(e){
	e.preventDefault();
	$('.usp-dialog').hide();
})



	// MOB端sticky head吸顶
		if ($('.usp-header-article').length && $.spice.getWindowWidth() < 1025) {
			$('.container').addClass('usp-header-fixed')
		}
	// MOB端sticky head吸顶 end

	// 4-8 update
	$('.list-cont-right-new .product-grid-con .list-item').each(function(){
		var $this = $(this),
		colorItem = $this.find('.mob-color-box .color-item').length;
		if($.spice.getWindowWidth() < 1025 && colorItem > 8){
			$this.find('.mob-color-box').addClass('color-ellipsis-box');
		}
		if($.spice.getWindowWidth() < 375 && colorItem > 6){
			$this.find('.mob-color-box').addClass('color-ellipsis-box');
		}
	})
	//新增主筛选项highlight
	if ($.spice.getWindowWidth() < 1024) {
		//正常方法
		// var swiper1 = new Swiper('.swiper-container-od-jacket', {
		// 	slidesPerView: 'auto',
		// 	spaceBetween: 0,
		// 	prevButton: '.swiper-button-prev1',
		// 	nextButton: '.swiper-button-next1',
		// 	slidesPerGroup: 2,
		// 	initialSlide: 3,
		// 	breakpoints: {
		// 		1024: {
		// 			slidesPerGroup: 2
		// 		}
		// 	}
		// });

		//判断如果是最后一帧的时候
		//属性 设计第几帧 initialSlide
		var swiper1 = new Swiper('.swiper-container-od-jacket', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			prevButton: '.swiper-button-prev1',
			nextButton: '.swiper-button-next1',
			slidesPerGroup: 2,
			initialSlide: 3,
			breakpoints: {
				1024: {
					slidesPerGroup: 2
				}
			}
		});
	}

	//
	var loadImgFun = function (imgArr, fn) {
		// 图片加载fun
		var loadImgLen = 0,
			errImgLen = 0

		var imgdefereds = [];
		$(imgArr).each(function () {
			var defered = $.Deferred();
			$(this).on('load', function () {
				defered.resolve();
				loadImgLen++
			}).on('error', function () {
				defered.resolve();
				errImgLen++
			})
			if (this.complete) setTimeout(function () {
				defered.resolve();
			}, 200);
			imgdefereds.push(defered);
		})
		$.when.apply(null, imgdefereds).done(function () {
			if (fn && $.isFunction(fn)) {
				fn()
			}
		});

	}
	
	//内容盖在kv上 
	$('.breadcrumb').addClass('breadcrumb-top');
	$('.list-right-highlight').addClass('list-right-highlight-top');
	// if ($.spice.getWindowWidth() > 1024) {
	// 	loadImgFun($('.list-right-highlight img'), function () {
	// 		var listrighthighlightTop = $('.list-right-highlight').offset().top,
	// 			listrighthighlightHei = $('.list-right-highlight').outerHeight(true),
	// 			articlelistwidthHei = $('.article-list-width').outerHeight(true)
	// 			breadcrumbHei = $('.breadcrumb').outerHeight(true)

	// 		$('.breadcrumb').css({
	// 			'margin-top': -(listrighthighlightHei + articlelistwidthHei + breadcrumbHei + 10)
	// 		})
	// 		console.log(listrighthighlightHei)
	// 	})
	// }	


	//内容盖在kv上  end


	//左侧filter 冻结效果
	if ($.spice.getWindowWidth() > 1024) {
		var $window = $(window);
		var $realtiveBox = $(".list-content-all"),
			$needFixed = $(".events-list-left"),
			saveScrollT = $window.scrollTop(),
			direction, //true向下,false向上
			headerBannerboxH = 0,
			_bottom = 0,
			$header = $('.header-fixed'),
			headerH = $header.outerHeight(true),
			state;
		if ($(".header-banner-box").hasClass('header-banner-show')) {
			headerBannerboxH = $(".header-banner-box").outerHeight(true);
		} else {
			headerBannerboxH = 0;
		}
		var _top = headerBannerboxH + headerH;
		// $window.on("scroll.Y", function (e) {
		$(window).on('scroll.worldCupScrollClpFilter', function () {
			var _wST = $window.scrollTop();
			direction = _wST >= saveScrollT;
			saveScrollT = _wST;
			// if (!$('body').hasClass('events-spice-standard')) return;
			var _wH = $window.height(),
				_fH = $needFixed.outerHeight(),
				_rH = $realtiveBox.outerHeight(),
				_fOT = $needFixed.offset().top,
				_rOT = $realtiveBox.offset().top,
				_wHT = _wST + _wH,
				_fHT = _fH + _fOT,
				_rHT = _rH + _rOT,
				_vBeforeH = _rOT - _wST > 0 ? _rOT - _wST : 100,
				_vAfterH = _wHT - _rHT > 0 ? _wHT - _rHT : 0,
				_vH = _wH - _vBeforeH - _vAfterH;
			if (_fH > _rH || _wST < _rOT - _top) {
				if (state !== "init") {
					state = "init";
					$needFixed.removeAttr("style");
				}
				return;
			}
			if (_vH > _fH) {
				if (state !== "small") {
					state = "small";
					$needFixed.css({
						"position": "fixed",
						"bottom": "auto",
						"top": _top
					})
				}
				return
			}
			if (direction) { //向下滚
				if (_wHT > _rHT) {
					if (state !== 1) {
						state = 1;
						$needFixed.css({
							"position": "absolute",
							"bottom": "auto",
							"top": _rH - _fH
						})
					}
				} else if (_wHT > _fHT + _bottom) {
					if (state !== 2) {
						state = 2;
						$needFixed.css({
							"position": "fixed",
							"top": "auto",
							"bottom": _bottom + "px"
						})
					}
				} else if (state !== 3 && state !== 2) {
					state = 3;
					$needFixed.css({
						"position": "absolute",
						"bottom": "auto",
						"top": _fOT - _rOT
					})
				}
			} else { //向上滚
				if (_wST + _top <= _fOT) {
					if (state !== 4) {
						state = 4;
						$needFixed.css({
							"position": "fixed",
							"bottom": "auto",
							"top": _top
						})
					}
				} else {
					if (state !== 5) {
						state = 5;
						$needFixed.css({
							"position": "absolute",
							"bottom": "auto",
							"top": _fOT - _rOT
						})
					}
				}
			}
		// }).trigger("scroll.Y");
		}).trigger('scroll.worldCupScrollClpFilter');
	}
	// if ($.spice.getWindowWidth() > 1024) {
	// 	var windowTopClp = 0,
	// 		wW = $(window).width();
	// 	$(window).on('scroll.worldCupScrollClpFilter', function () {
	// 		var $scrollTopCLp = $(this).scrollTop(),
	// 			listnavleft = $('.list-nav-left'),
	// 			listnavleftTop = listnavleft.offset().top,
	// 			listnavleftHei = $('.list-nav-left').outerHeight(true),
	// 			listrightcontent = $('.list-right-content'),
	// 			listrightcontentTop = listrightcontent.offset().top,
	// 			listrightcontentHei = $('.list-right-content').outerHeight(true),
	// 			productgridcon = $('.product-grid-con').outerHeight(true),
	// 			bodyH = $("body").height(),
	// 			bodyW = $("body").width(),
	// 			cartContentW = $(".article-list-container").width(),
	// 			cartLeftW = $(".product-grid-standard").width(),
	// 			footerH = $(".footer").height(),
	// 			guessYouIikeH = $(".list-content-foot-kv").height() + 60,
	// 			cartRightH = $(".list-nav-left").height(),
	// 			positionTop = bodyH - footerH - guessYouIikeH - cartRightH,
	// 			rightLeft = (bodyW - cartContentW) / 2;
	// 			listnavleftHeis = (listnavleftHei / 2)
	// 			if ($(".header-banner-box").hasClass('header-banner-show')) {
	// 				headerBannerboxH = $(".header-banner-box").outerHeight(true);
	// 			} else {
	// 				headerBannerboxH = 0;
	// 			}
	// 		if ($scrollTopCLp > (listnavleftTop + listnavleftHei) / 2 && $scrollTopCLp < listrightcontentTop + productgridcon) {
	// 			$('.list-nav-left').addClass("cart-right-fixed-clp")
	// 				// $(".cart-right-fixed-clp").css({left: rightLeft + 'px' })
	// 			if ($scrollTopCLp >= windowTopClp) {
	// 				windowTopClp = $scrollTopCLp;
	// 				$('.cart-right-fixed-clp').css({
	// 					'top': 'auto',
	// 					'bottom': '0px'
	// 				})
	// 			}else{
	// 				windowTopClp = $scrollTopCLp;
	// 				if ($scrollTopCLp <= (listnavleftTop + listnavleftHei) / 2){
	// 					$('.list-nav-left').removeClass('cart-right-fixed-clp').removeAttr('style');
	// 					$('.list-nav-left').css({
	// 						'position': 'absolute',
	// 						'top': (listnavleftTop + listnavleftHei) / 2 + 'px'
	// 					})
	// 				}else{
	// 					$('.list-nav-left').removeAttr('style');
	// 					$('.list-nav-left').css({
	// 						'position': 'fixed',
	// 						'top': 80 + headerBannerboxH +'px'
	// 					})

	// 				}
	// 				// $('.list-nav-left').removeClass('cart-right-fixed-clp').removeAttr('style');
	// 				// $('.list-nav-left').css({
	// 				// 	'top': $scrollTopCLp - listnavleftHeis
	// 				// })
	// 			}
	// 		}else{
	// 			$('.list-nav-left').removeAttr('style');
	// 			$('.list-nav-left').removeClass('cart-right-fixed-clp').removeAttr('style');
	// 			console.log(1)
	// 		}
			
	// 	}).trigger('scroll.worldCupScrollClpFilter');
	// }

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
