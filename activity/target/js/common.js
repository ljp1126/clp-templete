// 自适应轮播
function myResGallery(obj, pcShowNum, mobShowNum) {
	var $resGallery = $('.events-guess-you-Iike', obj);

	var swiper = new Swiper($resGallery, {
		slidesPerGroup: pcShowNum,
		slidesPerView: "auto",
		centeredSlides: false,
		paginationClickable: true,
		spaceBetween: 0,
		grabCursor: false,
		pagination: '.swiper-pagination',
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		speed: 1500,
		breakpoints: {
			1024: {
				slidesPerGroup: mobShowNum,
				speed: 300
			}
		}
	});
}

/*下拉菜单*/
function spiceDropdown() {
	//pc 全模拟下拉框
	$.spice.dropdown('.events-dropdown', {
		isIscroll: true,
		tinyscrollbarConfig: {
			wheelLock: true,
			touchLock: false
		},
		showElemTapCallBack: function(s, o) {
			s.addClass('is-active').siblings().removeClass('is-active');
			$(o.opt.dropElem, o.elem).find('span:eq(0)').html(s.find('a').html());

            if($(o.elem).parents('.pdp-size-num').length){
                var $selectedInfoBox = $('.e-selected-information');

                if ($(o.elem).parents('.select-size').length) {
                    $selectedInfoBox.removeClass('none');
                    $('.size', $selectedInfoBox).removeClass('none')
                    $('.size span', $selectedInfoBox).text(s.find('a').html());
                }
            }

		}
	});
	//mobile 半模拟下拉框
	$('select', '.events-form-select').on('change', function() {
		var $self = $(this),
			optionValue = $('option:selected', this).attr('value'),
			optionDataVal = $('option:selected', this).attr('data-val');
		$('.dropdown-text', $(this).siblings('.btn')).html(optionValue);
		if(optionDataVal=='cn'){
			$(this).siblings('.btn').removeClass('btn-en').addClass('btn-cn');
		}
		if(optionDataVal=='en'){
			$(this).siblings('.btn').removeClass('btn-cn').addClass('btn-en');
        }


        if($($self).parents('.pdp-size-num').length){
            var $selectedInfoBox = $('.e-selected-information');
            if ($($self).parents('.select-numb').length) {
                $('.num', $selectedInfoBox).removeClass('none')
                $('.num span', $selectedInfoBox).text(optionValue);
            }
        }

	})
	$('select', '.events-form-select')
	.on('focus', function(){
		$(this).closest('.dropdown').addClass('is-open');
		spiceDialogRefresh();
	})
	.on('blur', function(){
		$(this).closest('.dropdown').removeClass('is-open');
		spiceDialogRefresh();
	})
}

/*弹层重置iScroll*/
function spiceDialogRefresh() {
	/*setTimeout(function() {
		$('.dialog-opacity').data('iScroll') && $('.dialog-opacity').data('iScroll').refresh();
	}, 2000);*/
}

$(function() {
	//存储spice对象
	var spc = $.spice,
		$window = $(window);

	//如果该页面没有引入 jquery.spice.js 则不执行一下操作
	if (!spc || $.isEmptyObject(spc)) return false;

	//用于存储其他的公用方法
	spice = window.spice || {};
	spice.headermask = $.spice.mask({
		maskClass: 'spice-header-mask'
	});


	// 图片延迟加载
	//判断图片延迟加载插件是否加载，如果当前页面有图片延迟加载插件，则继续往下执行
	if (!!spc.lazyLoad) {
		spice.lazyLoad = function(options, elem) {
			$.spice.lazyLoad((elem || 'img[lazy-src]'),
				$.extend({}, {}, options)
			);
		}
		spice.lazyLoad();
	}

	// 下拉框
	spiceDropdown();
	// 下拉框 end

	// 水印
	$.spice.placeholder('input[type=text], input[type=password], textarea');

	// 换图
	$.spice.tools.changeImageSrc();

	/*input 获取焦点事件*/
	$('.form-input input,.form-input textarea').live('focus',function(){
		$(this).removeClass('is-error is-success is-textarea').parent('.form-input').removeClass('is-error is-success is-textarea');
	})

	/*mobile弹层重置iScroll*/
	$(document).on('blur','.dialog-opacity input', function(e) {
		spiceDialogRefresh();
	});
	$(document).on('focus','.dialog-opacity input', function(e) {
		spiceDialogRefresh();
	});
	$(document).on('blur','.dialog-opacity textarea', function(e) {
		spiceDialogRefresh();
	});
	$(document).on('focus','.dialog-opacity textarea', function(e) {
		spiceDialogRefresh();
	});

	/*视频弹层*/
	/*var videoDialog = $.spice.dialog({
		template: $('#video-dialog').html()
        , dialogClass: 'video-dialog'
    });
	$('.banner-iterm-video').on('tap', function(e) {
        e.preventDefault();
        var windowW = $(window).width();
		if( windowW > 1025 ){
			videoDialog.show(function(){
				var plpVideo = $('#video');
				//plpVideo[0].load();
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
			if($.spice.android){
				videoDialog.show(function(){
					var plpVideo = $('#video');
					plpVideo[0].play();
					plpVideo.on('ended', function(){
					})
				})
			}else{
				var plpVideo = $('#video');
				plpVideo[0].play();
				plpVideo.on('ended', function(){
				})
			}
		}

	});*/

	var loadImgFun = function(imgArr, fn) {
		// 图片加载fun
		var loadImgLen = 0,
			errImgLen = 0

		var imgdefereds = [];
		$(imgArr).each(function() {
			var defered = $.Deferred();
			$(this).on('load', function() {
				defered.resolve();
				loadImgLen++
			}).on('error', function() {
				defered.resolve();
				errImgLen++
			})
			if (this.complete) setTimeout(function() {
				defered.resolve();
			}, 200);
			imgdefereds.push(defered);
		})
		$.when.apply(null, imgdefereds).done(function() {
			if (fn && $.isFunction(fn)) {
				fn()
			}
		});

	}
	$('.e-banner-iterm-video').each(function (index, el) {
		var videoCode = $('.video-code', el).data('video-code'),
			videoId = 'banner-video-' + index;

		if ($.spice.getWindowWidth() > 1024) {
			loadImgFun($('.video-code img', el), function () {
				$('.video-content', el).show().css({
					'height': $('.video-code img', el).outerHeight(true)
				})
				$('.video-code img', el).css({
					'visibility': 'hidden'
				})
			})

			// 请求视频源地址
			var videoUrl = 'http://cm14-ccm1-2.play.bokecc.com/flvs/ca/QxEDF/ulb7dB0auP-20.mp4?t=1523688717&key=E64260078207669C66626BFE995D88F8';

			$('.video-content', el).html('<video id="'+ videoId +'" src="'+ videoUrl +'" muted preload="meta"></video>');

			$('#' + videoId)[0].play();

			$('#' + videoId)[0].addEventListener('canplaythrough', function() {
				console.log('视频准备就绪，开始播放');
				this.play()
			});

			$('#' + videoId)[0].addEventListener('ended', function() {
				this.play()
			});
        }
	})

    $('.e-banner-iterm-video .video-code').on('tap', function(e) {
        e.preventDefault();
        var _this = $(this),
            videoCode = _this.data('videoCode');


        if ($.spice.getWindowWidth() <= 1024) {
            openVideo(videoCode, 'true');
        }

    });

    $(window).on('resize.bannerItermVideoSize', function () {
        if ($.spice.getWindowWidth() <= 1024) return false;

        $('.e-banner-iterm-video').each(function (index, val) {
            if ($(val).length > 0) {
                $(val).css({
                    'height': $(val).siblings('.video-code').outerHeight(true)
                })
            }
        })
    }).trigger('resize.bannerItermVideoSize');

    /*视频弹层 end*/

	//公共响应

	// 猜你喜欢轮播
		myResGallery('.you-might-like', 4, 2);
		myResGallery('.myaccount-might-like', 3, 2);
	// 猜你喜欢轮播 end

	// myaccount mobile菜单下拉
		$(document).on('tap', '.myaccount-left-top', function(){
			var _this = $(this),
				$myaccountLeft = _this.parent('.myaccount-left'),
				$icon = $('.icon-caret', _this),
				_dataText = $icon.data('text');

			if (_this.hasClass('is-active')) {
				_this.removeClass('is-active');
				_this.siblings('.events-left-nav-item').stop(true, true).slideUp();

				$myaccountLeft.next('.e-myaccount-nav-mask').stop(true, true).fadeOut();

				$icon.attr('data-value', _dataText.show)
			}else{
				_this.addClass('is-active');
				_this.siblings('.events-left-nav-item').stop(true, true).slideDown();

				$myaccountLeft.next('.e-myaccount-nav-mask').stop(true, true).fadeIn();

				$icon.attr('data-value', _dataText.hide)
			}
		});
	// myaccount mobile菜单下拉 end

	var _w, _h;
	$(window).on('resize.common', function() {
		_w = $.spice.getWindowWidth();
		_h = $(window).height();

		if (_w <= 1024) {

			// 侧边栏身高
				$('.navbar-menu').height(_h-60+'px');
			// 侧边栏身高 end

		} else {

			// 侧边栏身高
				$('html,body,.header-search > div').removeAttr('style');
				$('.navbar-menu').removeAttr('style');
			// 侧边栏身高 end

			// myaccount mobile菜单下拉
			$('.myaccount-left-top').removeClass('is-active');
			$('.events-left-nav-item').removeAttr('style');
			// myaccount mobile菜单下拉 end

			// 清除mobile侧边栏效果
				var headerMenu = $('.header .navbar-menu');
				if (headerIScroll) {

					if ($('.events-scroll-kv').length) {
						// 关闭侧边栏，恢复轮播
						$('.events-scroll-kv').data('spice.kvScroll').start();
					}

					$('.events-m-menu').removeClass('is-active');
					headerIScroll.destroy();
					$('.events-header-scroll .scroller-wrap').removeAttr('style');
					$('.nav-pills .sub-menu', headerMenu).removeAttr('style');
					$('.nav-pills li', headerMenu).removeClass('is-open');
					$('.three-menu').removeAttr('style');
				}
		}


	}).trigger('resize.common');


	//mobile回到顶部
	$('.events-backtop').on('tap', function() {
		$('html,body').animate({
			scrollTop: 0
		}, 500);
	});

	var headerIScroll;

	// 导航下拉
		var subMenuTime;
		$('.events-spice-standard .events-menus-nav > li').live('mouseenter', function() {
			var _this = $(this);
			if (_this.find('.sub-menu').is(':hidden')) {
				subMenuTime = setTimeout(function() {
					_this.addClass('active');
					_this.find('.sub-menu').stop(true, true).slideDown('fast');
				}, 100);
			}
		}).live('mouseleave', function() {
			$(this).removeClass('active');
			clearTimeout(subMenuTime);
			$('.sub-menu', this).stop(true, true).slideUp('fast');
		});
	// 导航下拉 end

	// mobile 侧边栏
		var $navbarMenu = $('.navbar-menu');

		$('.events-menus-nav > li', $navbarMenu).each(function (index, el) {
			$(el).attr('data-position-top', $(el).position().top)
		})

		// 召唤侧边栏
			$('.events-m-menu').on('tap', function() {
				var _this = $(this),
					_thisHasActive = _this.hasClass('is-active');

				// 关闭收索框
					$('.m-search').removeClass('is-open');
					$('.form-search').hide();
					$('.container').removeAttr('style');
					$('.navbar-menu').css({'padding-top': 0});
					$('.search-box').hide();

					if ($('.usp-header-article').length) {
						$('.usp-header-article').css({
							'top': 60 + 'px'
						});
					}



				if (_w <= 1024) {

					headerIScroll = new IScroll('.events-header-scroll', {
						mouseWheel: true,
						preventDefaultException: {
							tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|P|I)$/
						}
					})

					if (!_thisHasActive) {
						if ($('.events-scroll-kv').length) {
							// 展开侧边栏，暂停轮播
							$('.events-scroll-kv').data('spice.kvScroll').stop();
						}
						_this.addClass('is-active');
						$('.header-left .events-m-menu').addClass('is-active');
						$('.events-menu-top').stop(true, true).animate({
							left: 0
						}, 500);
						$navbarMenu.stop(true, true).animate({
							left: 0
						}, 500, function() {
							$('html,body').css({
								'overflow': 'hidden',
								'position': 'fixed',
								'height': '100' + '%'
							});
						});
						$('.navbar-menu-background').stop(true, true).animate({
							right: 0
						}, 500);
					} else {
						_this.removeClass('is-active');
						$('.header-left .events-m-menu').removeClass('is-active');
						// 关闭侧边栏，恢复轮播
						if ($('.events-scroll-kv').length) {
							$('.events-scroll-kv').data('spice.kvScroll').start();
						}
						var _time = setInterval(function () {
							$('.events-header-scroll-background').css({ 'z-index': '0' })
						}, 0)
						$('.events-header-scroll-background').stop(true, true).animate({
							right: '100%',
						}, 300, function () {
							$('.events-menu-top').stop(true, true).animate({
								left: -100 + '%'
							},500);
							clearInterval(_time)
							$('.events-header-scroll-background').css({ 'z-index': '998' })
							$navbarMenu.stop(true, true).animate({
								left: -100 + '%'
							}, 500, function () {
								// console.log('侧边栏隐藏');
								$('html,body').removeAttr('style');
							});
						})
					}
				}

				return false;
			});

			// 点击menu 背景层关闭弹层
			$('.events-header-scroll-background').on('tap', function(event) {
				event.stopPropagation();
				$('.events-menu-top .events-m-menu').trigger('tap')
			});

		// 召唤侧边栏二级菜单
			$('.events-menus-nav > li > a', $navbarMenu).on('tap', function(e) {
				var _this = $(this),
					$li = _this.parent('li'),
					liPositionTop = $li.data('position-top');

				if (_w <= 1024) {
					if (!_this.parent().hasClass('is-open')) {
						_this.parent().siblings().find($('.sub-menu')).stop(true, true).slideUp('fast', function () {
							_this.parent().siblings().removeClass('is-open');
						});

						$('.sub-menu', _this.parent()).stop(true, true).slideDown('400', function () {
							headerIScroll.refresh();
							headerIScroll.scrollBy(0, -(Math.abs(liPositionTop) - Math.abs(headerIScroll.absStartY)), 300)
						});
						_this.parent().addClass('is-open');
					}else{
						$('.sub-menu', _this.parent()).stop(true, true).slideUp('fast', function() {
							_this.parent().removeClass('is-open');
							headerIScroll.refresh();
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
				$('.sub-menu-ul > li > a', $navbarMenu).on('tap', function(e) {
					if (_w <= 1024) {
						var _this = $(this),
							$li = _this.closest('li');
						if (!_this.parent().hasClass('is-open')) {
							_this.parent().siblings().find($('.three-menu')).stop(true, true).slideUp('fast', function () {
								_this.parent().siblings().removeClass('is-open');
							});

							$('.three-menu', _this.parent()).stop(true, true).slideDown('400', function () {
								headerIScroll.refresh();
								headerIScroll.scrollToElement($li.get(0), 300)
							});
							_this.parent().addClass('is-open');
						}else{
							$('.three-menu', _this.parent()).stop(true, true).slideUp('fast', function() {
								_this.parent().removeClass('is-open');
								headerIScroll.refresh();
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

	// 搜索框
		var search_h = $(window).height();
		var searchBox = $('.nav-bar .header-search');
		$('.form-search input', searchBox).on('focus', function() {
			$(this).parents('.header-search').addClass('form-search-open');
			$('.search-box').removeAttr('style');
		});

		//显示搜索结果
		$('.form-search input', searchBox).bind('input propertychange', function() {
			var _this = $(this),
				_thisP = _this.parents('.header-search');

			$('.search-box', _thisP).find('.search-before-content').hide().siblings('.search-after-content').show();
			$('.search-box', _thisP).stop(true, true).slideDown('fast',function(){
				//mob判断搜索结果高度
				if (_w < 1025) {
					var search_h= $('.search-box',searchBox).height()
						, search_box_h = _h-110;
						//, search_box_h = search_h-110;
					if(search_h > search_box_h){
						$('.search-box',searchBox).css({
							'height':search_box_h +'px',
							'overflow-y':'auto'
						});
						$('html,body').css({
							'overflow': 'hidden',
							'position': 'fixed',
							'height': '100' + '%'
						});
					}else{}
				}
			});

		});
		//收起搜索结果
		/*$('.search-box', searchBox).on('mouseleave', function() {
			if (_w > 1024) {
				$(this).stop(true, true).slideUp('fast');
			}
		});*/
		// 搜索结果选择
		$('.search-box .search-word ul li a', searchBox).live('tap', function() {
			var _this = $(this),
				_thisP = _this.parents('.header-search'),
				_data = _this.html();
				//_dataUrl = _this.attr('data-url');
			$('.form-search input', _thisP).val(_data);
			//location.href = _dataUrl;
		});

		// 清除并关闭搜索框
		$('.eventssearch-clear').on('tap', function() {
			var _this = $(this),
				_thisP = _this.parents('.form-search');

			$('input', _thisP).val('');
			$('.search-box').slideUp('fast').find('>div').removeAttr('style');
			_this.parents('.header-search').removeClass('form-search-open');
		});

		// mobile 召唤搜索框
			$('.m-search').on('tap', function() {
				var _this = $(this),
					_thisP = _this.parents('.header-search');

				if (_w <= 1024) {
					if ($('.events-m-menu').hasClass('is-active')) {
						if (!_this.hasClass('is-open')) {
							$('.form-search').stop(true, true).slideDown('400');
							$('.navbar-menu').animate({
								'padding-top': 50 + 'px'
							}, 400, function () {
								_this.addClass('is-open');
							});

						} else {
							_this.addClass('is-open');
							$('.navbar-menu').animate({
								'padding-top': 0 + 'px'
							}, 400,function () {
								_this.removeClass('is-open');
							});
							$('.search-box').removeAttr('style').stop(true, true).slideUp('0');
							$('.form-search').stop(true, true).slideUp('400').find('input').val('');
						}

					}else{
						var $uspHeader = $('.usp-header-article');

						if (!_this.hasClass('is-open')) {
							$('.form-search').stop(true, true).slideDown('400');
							if ($('.header-banner-box').hasClass('.header-banner-show') === false){
								$('.container').animate({
									// 'padding-top': 110 + 'px'
									//'padding-top': ($uspHeader.length ? (50 + $uspHeader.outerHeight(true)) : 50) + 'px'
								}, 400, function () {
									_this.addClass('is-open');
								});
							}else{
								$('.container').animate({
									// 'padding-top': 110 + 'px'
									//'padding-top': ($uspHeader.length ? (110 + $uspHeader.outerHeight(true)) : 110) + 'px'
								}, 400, function () {
									_this.addClass('is-open');
								});
							}


							if ($uspHeader.length) {
								$uspHeader.animate({
									'top': 110 + 'px'
								}, 400);
							}

						} else {
							_this.addClass('is-open');
							if ($('.header-banner-box').hasClass('.header-banner-show') === false) {
								$('.container').animate({
									// 'padding-top': 60 + 'px'
									//'padding-top': ($uspHeader.length ? (0 + $uspHeader.outerHeight(true)) : 60) + 'px'
								}, 400, function () {
									_this.removeClass('is-open');
								});
							}else{
								$('.container').animate({
									// 'padding-top': 60 + 'px'
									//'padding-top': ($uspHeader.length ? (60 + $uspHeader.outerHeight(true)) : 60) + 'px'
								}, 400, function () {
									_this.removeClass('is-open');
								});
							}


							if ($uspHeader.length) {
								$uspHeader.animate({
									'top': 60 + 'px'
								}, 400);
							}

							$('.search-box').removeAttr('style').stop(true, true).slideUp('0');
							$('.form-search').stop(true, true).slideUp('400').find('input').val('');
							$('html,body').removeAttr('style');
						}
					}

				}

			});

	// 搜索框 end

	//邮件订阅
	$('.mail-subscription').on('tap',function(e){
		e.preventDefault();
		$(this).addClass('is-active');
		$(this).parents('.header-top').siblings('.mail-subscription-content').slideToggle(400);
		$(this).parents('.header-fixed').toggleClass('mail-subscription-open');
	})
	//单选
	$('.form-choice-btn .form-choice-btn-radio').on('tap',function(e){
		$(this).addClass('is-active').siblings('.form-choice-btn-radio').removeClass('is-active');
	});
	//复选
	$('.form-choice-btn .form-choice-btn-checked').on('tap',function(e){
		$(this).toggleClass('is-active');
	});
	//邮件订阅 end

	//点击非目标区域隐藏展开的内容(如搜索框)
	$("body").on("tap",function(e){
		var $target = $(e.target);
		//邮件订阅
		if(!$target.hasClass("mail-subscription") && $target.parents(".mail-subscription").length == 0){
            $(".mail-subscription").removeClass("is-active");
		}
		//搜索框
		if(!$target.hasClass("form-search") && $target.parents(".form-search").length == 0
			&& !$target.hasClass("search-box") && $target.parents(".search-box").length == 0){
            $(".header-search").removeClass("form-search-open");
			$('.search-box').slideUp('fast').find('>div').removeAttr('style');
		}
	});

	// 二维码显示
	$('.events-wechat-code').on('mouseenter', function() {
		$('.events-wechat-code').siblings('.wechat-code-box').stop(true, true).fadeIn(300);
	}).on('mouseleave', function() {
		$('.events-wechat-code').siblings('.wechat-code-box').stop(true, true).fadeOut(300);
	});
	// 二维码显示 end



	// usp弹层
	var _w,_h;

	var uspHeaderDialog1 = $.spice.dialog({
        template: $('#usp-dialog-1').html(),
        dialogClass: 'pdp-info-dialog usp-dialog'
    });
    $(document).on('tap','.events-spice-standard .usp-content-1', function(e) {
        e.preventDefault();
        uspHeaderDialog1.show();
    });
    var uspHeaderDialog2 = $.spice.dialog({
        template: $('#usp-dialog-2').html(),
        dialogClass: 'pdp-info-dialog usp-dialog'
    });
    $(document).on('tap','.events-spice-standard .usp-content-2', function(e) {
        e.preventDefault();
        uspHeaderDialog2.show();
    });
    var uspHeaderDialog3 = $.spice.dialog({
        template: $('#usp-dialog-3').html(),
        dialogClass: 'pdp-info-dialog usp-dialog'
    });
    $(document).on('tap','.events-spice-standard .usp-content-3', function(e) {
        e.preventDefault();
        uspHeaderDialog3.show();
    });
    var mobUspHeaderDialog = $.spice.dialog({
        template: $('#mobile-usp-dialog').html(),
        dialogClass: 'pdp-info-dialog usp-dialog mobile-usp-dialog'
    });
    $(document).on('tap',
    	'.events-spice-medium .event-usp-header ul li,.events-spice-small .event-usp-header ul li',
    	function(e) {
	        e.preventDefault();
	        mobUspHeaderDialog.show();
	    });
    $(document).on('tap','.dialog-close-btn a', function(e) {
	        e.preventDefault();
	        mobUspHeaderDialog.hide();
	    });
	$(window).on('resize.usp-header', function(){
		if($(window).width()<1025){
			uspHeaderDialog1.hide();
			uspHeaderDialog2.hide();
			uspHeaderDialog3.hide();
			if ($('.usp-header').data('spice.kvScroll')) {
				$('.usp-header').data('spice.kvScroll').destroy();
			}
			$('.usp-header').addClass('mob-event-usp-header');
			$.spice.kvScroll('.mob-event-usp-header', {
				type: 'fade',
				axis: 'y',
				autoPlay: true,
				loop: true,
				stopElem: false,
				time: 2000,
				btn: false
			});
		}else{
			if ($('.usp-header').data('spice.kvScroll')) {
				$('.usp-header').data('spice.kvScroll').destroy();
			}
			$('.usp-header').removeClass('mob-event-usp-header');
			mobUspHeaderDialog.hide();
		}
	}).trigger('resize.usp-header');

	/*迷你购物车样式*/
	$('.events-spice-standard .header-cart a').live('mouseenter', function() {
			$(this).parent('.header-cart').addClass('is-hover');
	}).live('mouseleave', function() {
		setTimeout(function() {
			$('.header-cart').removeClass('is-hover');
		}, 1000);
	});

	var clearDime;
	$(".form-group-btn a").live("tap",function(e){
		e.preventDefault();
		if(!$(this).hasClass('is-disabled')){
			$(this).parents('.mail-subscription-content').addClass('mail-subscription-success');
			clearDime = setTimeout(function () {
				$('.mail-subscription-content').stop(true, true).slideUp('fast');
				$('.mail-subscription-content').removeClass('mail-subscription-success');
				$('.header-fixed').removeClass('mail-subscription-open');
		    }, 20000);
	    }
	});
	$(".mail-subscription-success").live("tap",function(e){
		$('.mail-subscription-content').stop(true, true).slideUp('fast');
		$('.mail-subscription-content').removeClass('mail-subscription-success');
		$('.header-fixed').removeClass('mail-subscription-open');
		clearTimeout(clearDime);
	});

	// 公共提示弹层模板（3秒后消失）
	var successfulDialog = $.spice.dialog({
		dialogClass: 'automatic-out-dialog'
		, content: '<i class="icon icon-fault"></i>很抱歉，因网络问题您的操作没有成功，请重试'
		, autoClose: 3000
		, showMask: false
		, isRemove: false
	});
	//测试用，开发时，请重新定义class或id绑事件
	$(".event-delect").live("tap",function(event){
		event.preventDefault();
		successfulDialog.show();
	});

	//徽章选择
	$('.badge-swiper-container ul li > div').live("tap",function(e){
		if(!$(this).parent('li').hasClass('is-active')){
			$(this).parent('li').addClass('is-active');
			$(this).parent('li').siblings('.special-swiper-slide').addClass('special-radio');
			$(this).parents('.special-diy-shirt').find('.custom-fee').show();
		}
	});
	$('.badge-swiper-container ul li .icon-delete-picture').live("tap",function(e){
		$(this).parent('li').removeClass('is-active');
		$(this).parent('li').siblings('.special-swiper-slide').removeClass('special-radio');
		$(this).parents('.special-diy-shirt').find('.custom-fee').hide();
	});

	/*团购弹层*/
	var groupPurchaseDialog = $.spice.dialog({
		template: $('#group-purchase-dialog').html(),
		dialogClass: 'pdp-info-dialog customized-dialog'
	});
	$('.group-purchase a').on('tap', function(e) {
		e.preventDefault();
		groupPurchaseDialog.show();
	});


	/*下单时间倒计时*/
	setInterval("countDown()", 1000);





    // mobile header 滚动效果
        var windowTopHeader = 0;
        $(window).on('scroll.headerScroll', function() {
            if ($.spice.getWindowWidth() > 1024) return false;

            var scrolls = $(this).scrollTop(),
                $header = $('.header-fixed'),
                headerH = $header.outerHeight(true),
				headerban = $('.header-banner-box').outerHeight(true)
				if (scrolls >= windowTopHeader) {
					windowTopHeader = scrolls;
					if (scrolls >= headerH+headerban) {
						$header.css({
							'top': - headerH
						})
						setTimeout(function () {
							$('.header-banner-box').css({
								'top': - headerban
							})
						}, 100)
					}
				} else {
					windowTopHeader = scrolls;
					if($('.header-banner-box').hasClass('header-banner-show')){
						$header.css({
							'top': $('.header-banner-box').innerHeight()
						})
						setTimeout(function () {
							$('.header-banner-box').css({
								'top': ''
							})
						}, 100)

					}else{
						$header.css({
							'top': ''
						})
						setTimeout(function () {
							$('.header-banner-box').css({
								'top': ''
							})
						}, 100)

					}
				}
			}).trigger('scroll.headerScroll');


        var windowTopHeaderCLP = 0;
        $(window).on('scroll.headerScrollCLP', function() {
            var scrolls = $(this).scrollTop(),
                $header = $('.header-fixed'),
                headerH = $header.outerHeight(true);

            if (scrolls >= windowTopHeaderCLP) {
                windowTopHeaderCLP = scrolls;
                if (scrolls >= headerH) {
                    $header.css({
                        'top': - headerH
                    })
                }
            } else {
                windowTopHeaderCLP = scrolls;
                $header.css({
                    'top': ''
                })
            }
		}).trigger('scroll.headerScrollCLP');




		//clp顶部修改
	// $('.header-banner-box img').load(function () {
	// 	var headerHban = $('.header-banner-box').outerHeight(true)
	// 	console.log(headerHban)
	// 	var windowTopHeaderCLP = 0,
	// 		$header = $('.header-fixed'),
	// 		headerbox = $('.header-banner-box').hasClass('header-banner-show'),
	// 		headerH = $header.outerHeight(true);

	// 	if (headerbox == true) {
	// 		$('.container').css({ 'padding-top': headerHban + headerH })
	// 		$('.header-fixed').css('top', headerHban)
	// 		$(window).on('scroll.headerScrollCLP', function () {
	// 			var scrolls = $(this).scrollTop(),
	// 				$header = $('.header-fixed');
	// 			if (scrolls >= windowTopHeaderCLP) {
	// 				windowTopHeaderCLP = scrolls;
	// 				if (scrolls >= headerH) {
	// 					$header.css({
	// 						'top': - headerH
	// 					})
	// 					setTimeout(function () {
	// 						$('.header-banner-box').css({
	// 							'top': - headerHban
	// 						})
	// 					}, 100)
	// 				}
	// 			} else {
	// 				windowTopHeaderCLP = scrolls;
	// 				headerbox = $('.header-banner-box').hasClass('header-banner-show')
	// 				if (headerbox == false) {
	// 					$header.css({
	// 						'top': ''
	// 					})
	// 				} else {
	// 					$header.css({
	// 						'top': headerHban
	// 					})
	// 				}

	// 				setTimeout(function () {
	// 					$('.header-banner-box').css({
	// 						'top': 0
	// 					})
	// 				}, 100)

	// 			}
	// 		}).trigger('scroll.headerScrollCLP');
	// 	} else {
	// 		$(window).on('scroll.headerScrollCLP', function () {
	// 			var scrolls = $(this).scrollTop();
	// 			// $header = $('.header-fixed'),
	// 			// headerH = $header.outerHeight(true);

	// 			if (scrolls >= windowTopHeaderCLP) {
	// 				windowTopHeaderCLP = scrolls;
	// 				if (scrolls >= headerH) {
	// 					$header.css({
	// 						'top': - headerH
	// 					})
	// 				}
	// 			} else {
	// 				windowTopHeaderCLP = scrolls;
	// 				$header.css({
	// 					'top': ''
	// 				})
	// 			}
	// 		}).trigger('scroll.headerScrollCLP');
	// 	}
	// });
    // mobile header 滚动效果 end


	// min cart

		// 全选
		$('.e-minicart-checkbox-select-all').on('tap', function () {
			var _this = $(this),
				$iconChecked = $('.icon-checked-min-cart', _this),
				$mincartTinyscrollbar = $('.events-mincart-tinyscrollbar'),
				$itemElem = $('> .viewport > .overview > ul > li .e-checkbox', $mincartTinyscrollbar),
				$itemElemIconChecked = $('.icon-checked-min-cart', $mincartTinyscrollbar)

			if ($iconChecked.hasClass('is-active')) {
				$iconChecked.removeClass('is-active')
				$itemElemIconChecked.removeClass('is-active')
			}else{
				$iconChecked.addClass('is-active')
				$itemElemIconChecked.addClass('is-active')
			}
		})

		// 单选
		$('.events-mincart-tinyscrollbar .e-checkbox').on('tap', function () {
			var _this = $(this),
			$iconChecked = $('.icon-checked-min-cart', _this),
			$mincartTinyscrollbar = _this.parents('.events-mincart-tinyscrollbar'),
			$ul = $('> .viewport > .overview > ul', $mincartTinyscrollbar)
			$itemElem = $('> li', $ul),
			itemElemLen = $itemElem.length;


			if ($iconChecked.hasClass('is-active')) {
				$iconChecked.removeClass('is-active')
			}else{
				$iconChecked.addClass('is-active')
			}

			console.log($ul.find('> li .e-checkbox .icon-checked-min-cart.is-active').length , itemElemLen);
			console.log($ul.find('> li .e-checkbox .icon-checked-min-cart.is-active').length === itemElemLen);

			// 判断数量，触发全选
			if ($ul.find('> li .e-checkbox .icon-checked-min-cart.is-active').length === itemElemLen) {
				$('.e-minicart-checkbox-select-all .icon-checked-min-cart').addClass('is-active')
			}else{
				$('.e-minicart-checkbox-select-all .icon-checked-min-cart').removeClass('is-active')
			}

		})

		// 数量加减
		if ($('.e-min-cart-calculate-num').length) {
			$.spice.calculateNum('.e-min-cart-calculate-num', {
				btnMinus: '.events-minus',
				btnPlus: '.events-plus',
				textInput: '.events-input',
				max: 10,
				min: 1,
				callBack: function(s, o) {
					if( o <= s.opt.min ){
						$(s.opt.minus).addClass('is-disabled');
						$(s.opt.plus).removeClass('is-disabled');
					}else if( o >= s.opt.max ){
						$(s.opt.plus).addClass('is-disabled');
						$(s.opt.minus).removeClass('is-disabled');
					}else{
						$(s.opt.minus).removeClass('is-disabled');
						$(s.opt.plus).removeClass('is-disabled');
					}
				}
			});
		}


		var tinyscrollbarFlag = false,
			cartSubMenuTime = null,
			cartSubMenuLeaveTime = null
		$(document).on('mouseenter','.events-spice-standard .header-cart', function() {
			var _this = $(this),
				minCartNum = $('.events-mincart-tinyscrollbar ul li').length;
			if(minCartNum > 0){
				if (_this.find('.minicart-box').length) {
					cartSubMenuTime && clearTimeout(cartSubMenuTime)
					cartSubMenuLeaveTime && clearTimeout(cartSubMenuLeaveTime)
					cartSubMenuTime = setTimeout(function() {
						_this.find('.minicart-box').stop(true, true).slideDown('fast')
						// min cart 滚动条（改变内容需要刷新滚动条）
						if (!tinyscrollbarFlag) {
							$.spice.tinyscrollbar('.events-mincart-tinyscrollbar', {
								wheelLock: true,
								touchLock: false,
								callBack: function(o) {
								}
							})
							tinyscrollbarFlag = true
						}
						// 如果滚动条插件调用过就刷新滚动条
						$('.events-mincart-tinyscrollbar').data('spice.tinyscrollbar') && $('.events-mincart-tinyscrollbar').data('spice.tinyscrollbar').update()
					}, 100)
				}
			}
		}).on('mouseleave','.events-spice-standard .header-cart', function() {
			var _this = $(this)
				cartSubMenuTime && clearTimeout(cartSubMenuTime)
				cartSubMenuLeaveTime && clearTimeout(cartSubMenuLeaveTime)
				cartSubMenuLeaveTime = setTimeout(function() {
					_this.find('.minicart-box').stop(true, true).slideUp('fast')
				}, 600)
		})
		$(document).on('tap','.header-cart .events-mincart-del', function() {
			var _this = $(this);
			_this.parents('.mincart-item').parent('li').animate({opacity:0},300,function(){
				_this.parents('.mincart-item').parent('li').remove();
				$('.events-mincart-tinyscrollbar').data('spice.tinyscrollbar') && $('.events-mincart-tinyscrollbar').data('spice.tinyscrollbar').update();

				var minCartNum = $('.events-mincart-tinyscrollbar ul li').length;
				$('.header-cart > a span').html(minCartNum);
				if(minCartNum==0){
					$('.header-cart .minicart-box').stop(true, true).slideUp('fast');
				}
			});
		})

	// min cart end

	//4-11 header fixed
	var $headerFixed = $('.header-fixed');
	if($('.header-banner-box').hasClass('header-banner-show')){
		setTimeout(function() {
			var headerH = $headerFixed.innerHeight(),
				headerBannerH = $('.header-banner-box img').height();

			$('#wrapper').addClass('page-header-fixed');
			$headerFixed.css({
				'top': headerBannerH + 'px'
			})
			$('.container').css({
				'padding-top': headerH+headerBannerH + 'px'
			});
		}, 300);
	}else{
		$('#wrapper').removeClass('page-header-fixed');
		$('.header-fixed,.container').removeAttr('style');
	};

	$(document).on('tap','.events-banner-close', function() {
		// if (_w < 1024){
		// 	if ($('.header-banner-box').hasClass('header-banner-show') == false){
		// 		$('.container').css({
		// 			'padding-top': 60 + 'px'
		// 		});
		// 	}
		// }else{
		// 	$('.container').css({
		// 		'padding-top': $headerFixed.innerHeight()
		// 	});
		// }

		// if ($('.header-fixed').hasClass('.header-fixed-no') === false) {
		// 	$('.header-fixed').css({
		// 		'top': 0
		// 	})
		// }
		$('.header-banner-box').stop(true, true).slideUp('fast').removeClass('header-banner-show');
		$('.container').css({
			'padding-top': $headerFixed.innerHeight()
		});
		$headerFixed.css({
			'top': 0
		})
		//$headerFixed.removeClass('header-fixed-no');
		// if ($('.header-banner-box').hasClass('header-banner-show') == true){
		// 	$('.container').css({
		// 		'padding-top': $headerFixed.innerHeight()
		// 	});
		// }
		// return false;
	});
	$(document).on('tap', '.events-banner-close-foot', function () {
		setTimeout(function () {
			$('.banner-fixed-bottom').removeClass('block-sm').hide();
		}, 300);
	});
	// $(window).on('scroll.headerFixed', function() {
	// 	if($('.header-banner-box').hasClass('header-banner-show') && $.spice.getWindowWidth() > 1024){
	// 		let wScrollTop = $(window).scrollTop(),
	// 			headerH = $headerFixed.innerHeight(),
	// 			headerBannerH = $('.header-banner-box').outerHeight(true);
	// 			$headerFixed[wScrollTop > headerBannerH ? 'removeClass' : 'addClass']('header-fixed-no')
	// 			$(".header-banner-box img").load(function () {
	// 				console.log($('.header-banner-box').outerHeight(true))
	// 				$headerFixed.css({
	// 					'position': 'fixed',
	// 					'top': $('.header-banner-box').outerHeight(true)
	// 				})
	// 				$('.container').css({
	// 					'padding-top': $('.header-banner-box').outerHeight(true) + headerH
	// 				})
	// 			});

	// 		console.log(headerH+'a')
	// 		// if (wScrollTop > headerBannerH){
	// 			// if ($('.header-banner-box').hasClass('.header-banner-show') === false) {
	// 			// 		$('.header-fixed').css({
	// 			// 			'top': headerBannerH + 'px'
	// 			// 		})
	// 				// $('.header-banner-box').addClass('header-banner-box-fixed');
	// 			// }
	// 		// }else{
	// 			// $('.header-banner-box').removeClass('header-banner-box-fixed');
	// 		// }

	// 		// if(wScrollTop > headerBannerH){
	// 			// $('.container').css({
	// 			// 	'padding-top': headerH + 'px'
	// 			// });
	// 		// }else{
	// 			// $('.header-banner-box,.header-fixed,.container').removeAttr('style');
	// 		// }

	// 	}
	// }).trigger('scroll.headerFixed')
	// header fixed end

});

/*cc视频方法*/
function openVideo(vid, autoStart) {
	var videoDialog = $.spice.dialog({
		template: $('#video-dialog').html()
        , dialogClass: 'video-dialog'
    });
	videoDialog.show(function(){
		var videoContent = $(".video-content", videoDialog.elem),
			videoSrc = "https://p.bokecc.com/player?vid=" + vid + "&siteid=6293AC06BFB87D25&autoStart=" + autoStart + "&playerid=36764A827EC1263B&playertype=1",
			objScript = document.createElement("script");

		objScript.setAttribute("src", videoSrc);
		objScript.setAttribute("type", "text/javascript");
		videoContent.append(objScript);

		// $(document).on('tap','.ccH5PlayBtn,.adrPlayBtn',function(){
		// 	$(this).siblings('video')[0].play();
		// });

		$(document).on('tap','.ccH5playerBox .ccH5PlayBtn,.adrPlayBtn',function(){
			$('.ccH5playerBox .ccH5PlayBtn,.adrPlayBtn').trigger('click');
		});

		$(document).on('tap','.ccH5playerBox .ccH5TogglePlay',function(){
			$('.ccH5playerBox .ccH5TogglePlay').trigger('click');
		});

		$(document).on('tap','.ccH5playerBox .ccH5TogglePause',function(){
			$('.ccH5playerBox .ccH5TogglePause').trigger('click');
		});

		$(document).on('tap','.ccH5playerBox .ccH5FullsBtn',function(){
			$('.ccH5playerBox .ccH5FullsBtn').trigger('click');
		});

		$(document).on('tap','.video-dialog,.dialog-close',function(e){
			var $target = $(e.target);
			if(!$target.hasClass("video-content") && $target.parents(".video-content").length == 0){
	            $('.video-dialog').remove();
			}
		});
	});
}

/*订单30分钟倒计时*/

/*下单时间 ordersTime 模拟，开发应从数据库获取*/
var newDate = new Date();
var ordersTime = newDate.getTime();

function countDown() {
	/*当前时间*/
	var currentTime = new Date();
	/*倒计时时间=下单时间+30分钟(1800000毫秒)-当前时间*/
	var t = ordersTime + 1800000 - currentTime;

	var d = Math.floor(t / 1000 / 60 / 60 / 24);
	var h = Math.floor(t / 1000 / 60 / 60 % 24);
	var m = Math.floor(t / 1000 / 60 % 60);
	var s = Math.floor(t / 1000 % 60);
	if (d < 0) {
		$(".count-down-text").parents('.count-down').hide();
	} else {
		//var hrsold = h+daysold*24;
		var daysold = d;
		var hrsold = h;
		var minsold = m;
		var seconds = s;
		//天数取三位,不足时前边补0
		if (d < 10) {
			daysold = d;
		}
		//小时取两位,不足补0
		if (hrsold < 10) {
			hrsold = "0" + h;
		}
		//分数取两位,不足补0
		if (minsold < 10) {
			minsold = "0" + m;
		}
		//秒数取两位,不足补0
		if (seconds < 10) {
			seconds = "0" + s;
		}
		$(".count-down-text").html(minsold+":"+seconds);
		currentTime = Number(currentTime) + 1000;
	}
};
$(function(){
	// 登录输入可清除
    $('.form-input input').on('input propertychange', function() {
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
		var _this = $(this);
    	_this.prev("input").removeAttr('value').trigger('propertychange');
    });

	var inputClearsTimer = null;
    $('.form-input input').blur(function(event) {
		clearTimeout(inputClearsTimer);
		var _this = $(this);
    	inputClearsTimer = setTimeout(function(){
			_this.siblings('.e-login-clears').addClass('none');
		}, 300);
    });

    // $('.form-input input').focus(function(event) {
    // 	var _this = $(this)
    // 	_this.siblings('.e-login-clears').removeClass('none');
    // });
})
