$(function() {
    $.spice.lazyLoad('img[lazy-src]');

	var win_w = $(window).width();
	// pdp 商品图
	var KvScrollFlag = true;
	$(window).on('resize.pdp', function() {
		var windowW = $.spice.getWindowWidth(),
			scrollY = $('.pdp-scroll-gallery-y'),
			scrollYData = scrollY.data('spice.kvScroll'),
			scrollYLiLen = $('li', scrollY).length
			liBlockLength = 6,
			bigKvScroll = $('.events-scroll-loop'),
			bigKvScrollData = bigKvScroll.data('spice.kvScroll');

		if (windowW > 1024) {
			// 清大图轮播
			if (bigKvScrollData) {
				bigKvScrollData.destroy();
				bigKvScroll.removeData('spice.kvScroll');
			}
			// 小图轮播
			$.each($('.product-scroll-s .product-scroll-s-c'), function(i, elem) {
				var $elem = $(elem),
					data = $elem.data('bud-swiper');
				if (data) {
					data.destroy(true, true);
					$elem.removeData('bud-swiper')
				}
			})
			$('.product-scroll-s-c .swiper-wrapper').removeAttr('style');

			if ($('li', scrollY).length > 6) {
				$.spice.kvScroll(scrollY, {
					type: 'gallery',
					axis: 'y',
					autoPlay: false,
					loop: false,
					moveNum: 1,
					btn: true
				});
				$(".events-scroll-wrap .scroll-gallery ul").css({
					height: (scrollYLiLen / liBlockLength) * 100 + '%'
				});
				$(".events-scroll-wrap .scroll-gallery ul li").css({
					height: (100 / scrollYLiLen) + '%'
				}).removeClass('none');
			}
			// 小图轮播 end

			/*mob加入购物车弹层关闭*/
			$('.show-minicart').removeAttr('style');

		} else {
			$('.video-player').html('');
			// 清小图轮播
			if (scrollYData) {
				scrollYData.destroy();
				scrollY.removeData('spice.kvScroll');
			}
		    if(KvScrollFlag){
				// 大图轮播
				$.spice.kvScroll(bigKvScroll, {
					type: 'scroll',
					autoPlay: false,
					loop: false,
					btn: true,
					dot: {
						style: 'dot'
					},
					callBack: function(p, o) {
						var li_index = $('ul li:eq(' + p + ')', '.events-scroll-loop');
						if ($('.scroll-background-image > div', li_index).hasClass('video-player')) {
							$('.e-zoom').hide();
							li_index.addClass('video_li');
						} else {
							$('.e-zoom').show();
						}
						$('.product-scroll-s-c ul li:eq(' + p + ')').addClass('is-active').siblings('li').removeClass('is-active');
					}
				});
				KvScrollFlag = false;
		    }
			// 大图轮播 end
			// 小图轮播
			var $elem = $('.product-scroll-s');
			if (!$('.product-scroll-s-c', $elem).data('bud-swiper')) {
				mySwiper($('.product-scroll-s-c', $elem));
			}
			// 小图轮播 end
		}

		//焦点图点击，大区域换图
		var $scrollWrap = $('.events-scroll-wrap');
		$('li', scrollY).off('tap').on('tap', function() {
			var $self = $(this),
				index = $self.index(),
				$galleryScroll = $self.closest('.scroll-gallery');
			/*视频*/
			if (windowW > 1024) {
				if ($self.hasClass('product-video')) {
					$('.e-zoom-icon').addClass('zoom-video-icon');
					$('.scroll:eq(0) li', $scrollWrap).hide().eq(index).show().addClass('cursor-style').find('.scroll-background-image >a').hide();
				} else {
					$('.e-zoom-icon').removeClass('zoom-video-icon');
					$('.scroll:eq(0) li', $scrollWrap).removeClass('cursor-style').hide().eq(index).show();
				}

				/*切换小图关闭放大镜*/
				$('.event-cloudzoom li').each(function(index, el) {
					$('img', el).data('CloudZoom') && $('img', el).data('CloudZoom').destroy();
				});
				$('.cloudzoom-blank,cloudzoom-zoom').remove();
				$('.e-zoom-icon').addClass('none');
				pdpCloudZoomFlag = false;
				/*$('.event-cloudzoom li').each(function(index, el) {
					var $self = $(this);
					$self.find('img').data('CloudZoom') && $self.find('img').data('CloudZoom').destroy();
					$('.cloudzoom-blank,cloudzoom-zoom').remove();
				});
				$('.event-cloudzoom img').data('CloudZoom') && $('.event-cloudzoom img').data('CloudZoom').destroy();
				$('.cloudzoom-blank,cloudzoom-zoom').remove();*/

			} else {
				var $scroll = $('.product-scroll-b');
				$('.scroll-dots a:eq(' + index + ')', $scroll).trigger('tap');
				/*视频*/
				if ($self.hasClass('product-video')) {
					$('.event-cloudzoom ul li:eq(' + index + ')', $scroll).addClass('video_li');
					$('.e-zoom').hide();
				} else {
					$('.e-zoom').show();
				}
			}
			$self.addClass('is-active').siblings().removeClass('is-active');
		});


	}).trigger('resize.pdp');

	/*mob点击图片播放*/
    $(document).on('tap','.video_li', function(e) {
        e.preventDefault();
        var video_src = $('.product-scroll-s-c i.icon-video-min').attr('video-src');
        openVideo(video_src,'true');
    });

	$('.how-wear-video').on('tap', function(e) {
        e.preventDefault();
        openVideo('139C71C3673D6ED39C33DC5901307461','true');
    });

	// 颜色切换
	$('.events-color-close ul li').on('tap', function() {
		// 重新绑定轮播效果
		$(window).trigger('resize.pdp');
	});
	// pdp 商品图 end


	//放大镜
	var pdpCloudZoomFlag = false;
	$('.event-cloudzoom li').on('tap', function() {
		if ($.spice.getWindowWidth() > 1024) {
			if (!pdpCloudZoomFlag) {
				$.spice.cloudZoom('.event-cloudzoom img', {
					animationTime: 10,
					easeTime: 0,
					zoomOffsetX: 0,
					zoomOffsetX: 0,
					zoomOffsetY: 0,
					zoomWidth: 360,
					zoomHeight: 514,
					lensWidth: 40,
					lensHeight: 40
				});

				$('html,body').scrollTop(1);
				$('html,body').scrollTop(0);

				$('.e-zoom-icon').addClass('none');
				pdpCloudZoomFlag = true;
			}else {
				$('.event-cloudzoom li').each(function(index, el) {
					$('img', el).data('CloudZoom') && $('img', el).data('CloudZoom').destroy();
				});
				$('.cloudzoom-blank,cloudzoom-zoom').remove();
				$('.e-zoom-icon').removeClass('none');
				pdpCloudZoomFlag = false;
			}

		} else {
			$('.event-cloudzoom li').each(function(index, el) {
				$('img', el).data('CloudZoom') && $('img', el).data('CloudZoom').destroy();
			});

			$('.cloudzoom-blank,cloudzoom-zoom').remove();
		}
	});
	$(document).on('tap', '.cloudzoom-lens', function() {
		$('.event-cloudzoom li').each(function(index, el) {
			$('img', el).data('CloudZoom') && $('img', el).data('CloudZoom').destroy();
		});
		$('.cloudzoom-blank,cloudzoom-zoom').remove();
		$('.e-zoom-icon').removeClass('none');
		pdpCloudZoomFlag = false;
	});

	$(window).on('resize.cloudzoom', function() {
		var w = $.spice.getWindowWidth();
		if (w <= 1024) {
			$('.event-cloudzoom li').each(function(index, el) {
				$('img', el).data('CloudZoom') && $('img', el).data('CloudZoom').destroy();
			});
			$('.cloudzoom-blank,cloudzoom-zoom').remove();
		}
	}).trigger('resize.cloudzoom');
	/*放大镜点击消失*/
	// $('.cloudzoom-blank,.cloudzoom-lens').off('tap').live('tap', function(event) {
	// 	$('.event-cloudzoom li').each(function(index, el) {
	// 		var $self = $(this);
	// 		$self.find('img').data('CloudZoom') && $self.find('img').data('CloudZoom').destroy();
	// 		$('.cloudzoom-blank,cloudzoom-zoom').remove();
	// 	});
	// 	$('.event-cloudzoom img').data('CloudZoom') && $('.event-cloudzoom img').data('CloudZoom').destroy();
	// 	$('.cloudzoom-blank,cloudzoom-zoom').remove();
	// 	return false;
	// });

	// mob 轮播放大 弹窗
	var win_H = $(window).height();
	$('.e-zoom').on('tap', function(event) {
		var imgIndex1 = $('.scroll-dots ').find('.active').index(),
			imgUrl = $('.events-scroll-loop.product-scroll-b').find('ul').find('li:eq(' + imgIndex1 + ')').find('img').attr('src');

		$("#zoom").find("img").attr("src", "");
		$("#zoom").find("img").attr("src", imgUrl);

		$('html,body').animate({
			scrollTop: 0
		}).css({
			'overflow': 'hidden',
			'position': 'fixed',
			'height': '100' + '%'
		});
		//$('.e-pdp-imgpop').css('height', win_H + 'px').fadeIn(100);
		$('.e-pdp-imgpop').fadeIn(100);
		$('.e-popup-mask').show();

		//$.spice.smartZoom('.smart-zoom-image');

		if( $.spice.smartZoom('.smart-zoom-image', 'isPluginActive') ){
			$.spice.smartZoom('.smart-zoom-image', 'destroy');
			$.spice.smartZoom('.smart-zoom-image');
			// $.spice.smartZoom('.smart-zoom-image', 'zoom', 3);
			setTimeout(function () {
				$('.smart-zoom-image').css({'transform':'translate3d(-75%, -75%, 0px) scale3d(3, 3, 1)','transition':'all 0.7s ease-out 0s','cursor':'move'});
			},100)
		}else{
			$.spice.smartZoom('.smart-zoom-image');
			// $.spice.smartZoom('.smart-zoom-image', 'zoom', 3);
			setTimeout(function () {
				$('.smart-zoom-image').css({'transform':'translate3d(-75%, -75%, 0px) scale3d(3, 3, 1)','transition':'all 0.7s ease-out 0s','cursor':'move'});
			},100)
		}
	})
	$('.e-pop-close').off('tap').on('tap', function(event) {
		$('html,body').removeAttr('style');

		$('.e-pdp-imgpop').fadeOut(500);
		$('.e-popup-mask').hide();
	});
	$('.e-popup-mask').click(function() {
		$('.e-pdp-imgpop').fadeOut(100);
		$(this).hide();
	});


	// 颜色选择
	$('.pdp-color ul li').on('tap', function() {
		if (!$(this).hasClass('is-active')) {
			$('.pdp-color ul li').removeClass('is-active');
			$(this).addClass('is-active');
		};
	});

	//到货通知弹窗
	var customDialog = $.spice.dialog({
		template: $('#pdp-arrival-notice-dialog').html(),
		dialogClass: 'pdp-info-dialog arrival-notice-box',
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function() {
				$('.arrival-notice-box').animate({
					right: -100 + '%'
				}, 300, function() {
					dialog.hide();
				});
			});
		}
	});
	$('.events-arrival-notice').on('tap', function(e) {
		e.preventDefault();
		customDialog.show(function() {
			//$('.arrival-notice-box').removeClass('arrival-notice-success-box');
			$('.arrival-notice-box').animate({
				right: 0
			}, 300);
		});

		/*下拉菜单*/
		spiceDropdown();

	});
	$('.events-take-notice').live('tap', function(e) {
		$(this).parents('.arrival-notice-box').addClass('arrival-notice-success-box');
	});


	// 加入购物车弹层
	if (win_w > 1024) {
		var addcarDialog = $.spice.dialog({
			template: $('#pdp-addcart-dialog').html(),
			dialogClass: 'pdp-info-dialog pdp-addcart-dialog',
			initEvent: function(e) {}
		});
		/*$('.events-addcart').on('tap', function(e) {
			e.preventDefault();
			addcarDialog.show();
		});*/
	} else if (win_w <= 1024) {
		/*$('.events-addcart').on('tap', function(e) {
			e.preventDefault();
			$('.show-minicart').show();
		});*/
		$('.ui-corner-all').on('tap', function(e) {
			e.preventDefault();
			$('.show-minicart').hide();
		})
	}


	/*定制信息弹层*/
	var customizedDialog = $.spice.dialog({
		template: $('#customized-dialog').html(),
		dialogClass: 'pdp-info-dialog customized-dialog'
	});
	$('.icon-pdp-diy-r').on('tap', function(e) {
		e.preventDefault();
		/* customizedDialog.show(); */
		customizedClauseDialog.show();
	});

	// 点击进行验证
	$(".event-validate").on("tap", function () {
		$(this).parent(".problem-box").removeClass("is-error");
		$(".event-diy-shirt").addClass("is-active");
		// show(function () {
			$(".event-mit").on("tap", function (e) {
				e.preventDefault();
				var pV = $(".event-problem-input").val();
				if (pV == "") {
					$(".event-problem").addClass("is-error");
					$(".event-validate").find("span").html("根据提示进行操作");
				}else {
					$(".event-problem").removeClass("is-error");
					$(".event-diy-shirt").hide();
					$(".event-validate").hide();
					$(".event-success").addClass("is-active");
				}
			});
		// });
	})
	//个性定制
	// $('.diy-shirt .diy-choice>div').on('tap', function() {
	// 	$('.diy-choice > div >i').removeClass('is-active');
	// 	$(this).find('i').addClass('is-active');

	// 	if ($('.choice-1').is('.is-active')) {
	// 		$('.diy-choice-1').show();
	// 		$('.diy-choice-2').hide();
	// 	} else {
	// 		$('.diy-choice-1').hide();
	// 		$('.diy-choice-2').show();
	// 	}
	// });

	//评价图片放大
	$('.events-spice-standard .evaluation-img ul li').live('tap', function(event) {
		event.preventDefault();
		var this_src = $(this).find('img').attr('src'),
			$viewImgBox = $(this).closest('ul').next('.zoom-img');
		if (!$(this).hasClass('active')) {
			$viewImgBox.removeClass('active');
		}
		$(this).toggleClass('active').siblings('li').removeClass('active')
		$(this).closest('ul').next('.zoom-img').toggleClass('active').find('img').attr({
			src: this_src
		});
	});
	var zoomTemplate = $('#pdp-zoom-img').html()
	var zoomDialog = null;
	$('.events-spice-small .events-zoom-img li, .events-spice-medium .events-zoom-img li').live('tap', function(event) {
		event.preventDefault();
		var $selfParentUl = $(this).closest('ul'),
			$zoomLi = $selfParentUl.find('li'),
			aImgSrc = [],
			liIndex = $(this).index(),
			flag = true;

		$zoomLi.each(function(index, el) {
			aImgSrc.push({
				src: $(el).find('img').attr('src')
			})
		});

		if (zoomDialog) {
			zoomDialog.destroy();
		}

		zoomDialog = $.spice.dialog({
			template: Handlebars.compile(zoomTemplate)({
				li: aImgSrc
			}),
			dialogClass: 'dialog-zoom-img'
		});
		zoomDialog.show();

		$.spice.kvScroll('.events-zoom-scroll', {
			type: 'scroll',
			autoPlay: false,
			loop: false,
			dot: {
				style: 'dot'
			},
			callBack: function(p, o) {
				if (flag) {
					if (p != liIndex) $('.events-zoom-scroll').data('spice.kvScroll').scroller(liIndex);
				}
				flag = false;
			}
		});

		$(window).trigger('resize.parameter');

	});
	$('.dialog-zoom-img').live('tap', function(e) {
		var targetStr = e.target.tagName
		if (targetStr != 'A' && targetStr != 'IMG') {
			zoomDialog.destroy();
			$('html, body').removeClass('overflow-hidden');
		}
	});
	//关闭评论图片
	$('.zoom-img .icon-close').click(function(event) {
		event.stopPropagation();
		$(this).parent('.zoom-img').removeClass('active');
	});

	/* 倒计时 */
    // setInterval("show_date_time()", 1000);
    show_date_time();
    // setInterval(show_date_time, 1000);


	/*微信弹层*/
	$('.events-spice-standard .event-wechat-btn').live('mouseenter', function() {
		$('.event-wechat-btn').siblings('.wechat-code-box').stop(true, true).fadeIn(300);
	}).live('mouseleave', function() {
		$('.event-wechat-btn').siblings('.wechat-code-box').stop(true, true).fadeOut(300);
	});

	/*定制页面轮播*/
	myResGallery('.mi-superstar-swiper', 1);


	//尺码表弹层 相关
	var _w,
		sizeDialogTmp;

	$(window).on('resize.sizeCart', function() {
		_w = $.spice.getWindowWidth();
	}).trigger('resize.sizeCart');

	var sizeDialog = $.spice.dialog({
		template: sizeDialogTmp,
		dialogClass: 'reebok-dialog size-chart-dialog',
		maskClose: false,
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function() {
				if (_w > 1024) {
					dialog.hide();
				} else {
					$('.size-chart-dialog').animate({
						left: 100 + '%'
					}, 300, function() {
						dialog.hide();
					});
				}

				sizeChartN++;
			});
		}
	});

	var sizeChartN = 1;
	// pdp女子穿戴指南
	var fingerpost = $.spice.dialog({
		template: $('#women-shoe-fingerpost').html(),
		dialogClass: 'fingerpost-winning-box',
		maskClose: true,
		initEvent: function (e) { }
	});


	fingerpost.elem.on('dialog.show-before', function () {
		$.spice.tools.changeImageSrc();
	})
	$('.events-size-fingerpost').on('tap', function (event) {
		fingerpost.show(function(){
			setTimeout(function () {
				$('.fingerpost-winning-box').data('iScroll') && $('.fingerpost-winning-box').data('iScroll').destroy();
				$('.fingerpost-winning-box .dialog-scroll-wrap').removeAttr('style');
				$('.fingerpost-winning-box').css('touch-action', 'auto');
				$('.overflow-hidden').css({
					'height': 100 + '%'
				})
			}, 0);
		});	
	})
	$('.e-close-fingerpost-btn').on('tap', function () {
		// $('.qx-winning').hide();
		fingerpost.hide();
	})
	
	$('.events-size-chart').on('tap', function() {
		if (sizeChartN == 1) {
			// 男鞋尺码对照表
			sizeDialogTmp = $('#men-shoe').html();
			sizeDialog.init(sizeDialog.opt.template = sizeDialogTmp);
		} else if (sizeChartN == 2) {
			// 女鞋尺码对照表
			sizeDialogTmp = $('#women-shoe').html();
			sizeDialog.init(sizeDialog.opt.template = sizeDialogTmp);
		} else if (sizeChartN == 3) {
			// 小童尺码对照表
			sizeDialogTmp = $('#children-shoe').html();
			sizeDialog.init(sizeDialog.opt.template = sizeDialogTmp);
		}


		if (_w > 1024) {
			sizeDialog.show(function () {
                sizeCartTableSize()
            });
		} else {
			sizeDialog.show(function() {
				$('.size-chart-dialog').animate({
					left: 0
				}, 300, function () {
                    sizeCartTableSize()
                });
			});
		}


		if ($('.events-parameter-iscroll .scroller-wrap').length) {
			$('.events-parameter-iscroll .scroller-wrap').each(function(index, el) {
				new IScroll(el, {
					preventDefault: false,
					scrollX: true,
					scrollY: false,
					scrollbars: true,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|IMG|P|I)$/
					}
				});

			});
		}

	});

	// 尺码表hover 效果
	$('.size-chart-table table .tr-hover td').live('mouseenter', function() {
		if (_w > 1024) {
			var _this = $(this),
				_thisIndex = _this.index()
				_thisParentIndex = _this.parent().index(),
				_thisBoxIndex = _this.parents('.size-chart-table').index();
			if($('.size-chart-mob').length > 1){
				if (!_this.hasClass('hover-no')) {
					_this.addClass('size-chart-this');
					_this.parent('tr').addClass('size-chart-bg');
					_this.parents('.size-chart-table').find('table tr').each(function(index, el) {
						$('td:eq(' + _thisIndex + ')', el).addClass('size-chart-bg');
					});

					_this.parents('.size-chart-content').siblings('.parameter-comparison-title').find('table td:eq(' + _thisParentIndex + ')').addClass('size-chart-this');
					_this.parents('.size-chart-content').siblings('.parameter-comparison-title').addClass('parameter-comparison-title-active');
				}
			}else{
				if (!_this.hasClass('hover-no')) {
					_this.addClass('size-chart-this');
					_this.parent('tr').addClass('size-chart-bg');
					$('.size-chart-table:eq(' + _thisBoxIndex + ') table tr').each(function(index, el) {
						$('td:eq(' + _thisIndex + ')', el).addClass('size-chart-bg');
					});

					$('.parameter-comparison-title table:eq(' + _thisBoxIndex + ') td:eq(' + _thisParentIndex + ')').addClass('size-chart-this');
					$('.parameter-comparison-title').addClass('parameter-comparison-title-active');
				}
			}
		}
	}).live('mouseleave', function() {
		if (_w > 1024) {
			var _this = $(this),
				_thisIndex = _this.index()
				_thisParentIndex = _this.parent().index(),
				_thisBoxIndex = _this.parents('.size-chart-table').index();

			_this.removeClass('size-chart-this');
			_this.parent('tr').removeClass('size-chart-bg');

			if($('.size-chart-mob').length > 1){
				_this.parents('.size-chart-table').find('table tr').each(function(index, el) {
					$('td:eq(' + _thisIndex + ')', el).removeClass('size-chart-bg');
				});

				_this.parents('.size-chart-content').siblings('.parameter-comparison-title').find('table td:eq(' + _thisParentIndex + ')').removeClass('size-chart-this');
				_this.parents('.size-chart-content').siblings('.parameter-comparison-title').removeClass('parameter-comparison-title-active');
			}else{
				$('.size-chart-table:eq(' + _thisBoxIndex + ') table tr').each(function(index, el) {
					$('td:eq(' + _thisIndex + ')', el).removeClass('size-chart-bg');
				});

				$('.parameter-comparison-title table:eq(' + _thisBoxIndex + ') td:eq(' + _thisParentIndex + ')').removeClass('size-chart-this');
				$('.parameter-comparison-title').removeClass('parameter-comparison-title-active');
			}

		}
    });

    // 屏幕尺寸改变，调整尺码表 title 高度
    $(window).on('resize.sizeCartTable', function() {
        $('.parameter-comparison-title table tr').each(function(index, el) {
            $('.parameter-comparison-title table tr:eq(' + index + ')').css({
                'height': $('.events-parameter-iscroll table tr:eq(' + index + ')').outerHeight(true)
            });
        });
    }).trigger('resize.sizeCartTable');

    // 尺码表显示时，调整尺码表 title 高度
    function sizeCartTableSize() {
        $('.parameter-comparison-title table tr').each(function(index, el) {
            $('.parameter-comparison-title table tr:eq(' + index + ')').css({
                'height': $('.events-parameter-iscroll table tr:eq(' + index + ')').outerHeight(true)
            });
        });
    }

	//尺码表弹层 相关 end

	/*定制条款弹层*/
	var customizedClauseDialog = $.spice.dialog({
		template: $('#customized-clause-dialog').html(),
		dialogClass: 'pdp-info-dialog customized-clause-dialog'
	});
	$('.diy-clause a').on('tap', function(e) {
		e.preventDefault();
		customizedClauseDialog.show();
	});


	var swiper = new Swiper($('.events-guess-you-Iike1'), {
		slidesPerView: "auto",
		centeredSlides: false,
		paginationClickable: true,
		spaceBetween: 0,
		grabCursor: false,
		pagination: '.swiper-pagination',
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		speed: 1500,

	});




	$(window).on('resize.zoom', function() {
		if ($.spice.getWindowWidth() <= 1024) {
			$('.e-zoom-icon').addClass('none');
		}
	}).trigger('resize.zoom')

	$(document).on('mousemove', '.event-cloudzoom li, .cloudzoom-blank', function(e) {
		if (!navigator.userAgent.match(/Trident\/7\./) && $.spice.getWindowWidth() > 1024) {
			$('.e-zoom-icon').removeClass('none');
			var x = e.originalEvent.x || e.originalEvent.layerX || 0;
			var y = e.originalEvent.y || e.originalEvent.layerY || 0;
			// console.log(y, $('.events-scroll-loop').offset().top);
			// console.log(x, $('.events-scroll-loop').offset().left);
			$('.e-zoom-icon').css({
				top: y-$('.events-scroll-loop').offset().top - 25 + $(window).scrollTop(),
				left: x-$('.events-scroll-loop').offset().left - 25
			});
		}else{
			$('.e-zoom-icon').addClass('none');
			return false;
		}
	}).on('mouseleave', '.event-cloudzoom li, .cloudzoom-blank', function(e) {
		$('.e-zoom-icon').addClass('none');
	});


/*2期新增*/
	/*评价下拉*/
	$('.events-evaluate-screen .btn').on('tap',function(){
        $(this).parent('.dropdown').toggleClass('is-open');
    });
    $('.events-evaluate-screen .sub-menu ul li').on('tap',function(){
    	if(!$(this).hasClass('is-disabled')){
	        var evaluate_star = $(this).find('.evaluate-item .evaluate-star').html(),
	        	evaluate_num = $(this).find('.evaluate-item .evaluate-num').html();
	        $('.events-evaluate-screen .btn .dropdown-text-star').html(evaluate_star);
	        $('.events-evaluate-screen .btn .dropdown-text-num').html(evaluate_num);
	        $(this).parents('.dropdown').removeClass('is-open');
    	}
    });
    //点击非目标区域隐藏展开的内容
	$("body").on("tap",function(e){
		var $target = $(e.target);
		if(!$target.hasClass("events-select-box") && $target.parents(".events-select-box").length == 0){
            $(".events-select-box .events-evaluate-screen").removeClass("is-open");
		}
	});

	/*立即购买按钮弹层*/
	var buyNowDialog = $.spice.dialog({
		dialogClass: 'automatic-out-dialog'
		, content: '<i class="icon icon-hook"></i>已成功加入购物车'
		, autoClose: 3000
		, showMask: false
		, isRemove: false
	});
	$(".events-addcart").on("tap",function(e){
		e.preventDefault();
		if(!$(this).hasClass('is-disabled')){
			buyNowDialog.show();
		}
	});

	/*尺码下拉判断 测试*/
	$(".pdp-size-num .events-dropdown .sub-menu ul li").on("tap",function(e){
		if(!$(this).hasClass('is-disabled')){
			if($(this).hasClass('is-sold-out')){
				$('.event-buy-now,.events-addcart').addClass('is-disabled');
				$('.event-msg-block').addClass('msg-block-show');
			}else{
				$('.event-buy-now,.events-addcart').removeClass('is-disabled');
				$('.event-msg-block').removeClass('msg-block-show');
			}
		}
	});

	/*吸低的时候尺寸未填滑到尺寸*/
	$('.event-buy-now').on('tap', function () {
		var commodityPdpsize = Math.floor($('.login-text').offset().top);
		if ($('.select-box').is('.is-error')){
			$('html,body').animate({ scrollTop: commodityPdpsize}, 500);
		}

	})
	$('.events-addcart').on('tap', function () {
		var commodityPdpsize = Math.floor($('.login-text').offset().top);
		if ($('.select-box').is('.is-error')) {
			$('html,body').animate({ scrollTop: commodityPdpsize }, 500);
		}

	})

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

	subscribeDialog.elem.on('dialog.show-before', function() {
		$('html,body').css({
			'width': '100%',
			'height': '100%'
		});

		subscribeDialog.elem.css({
			'position': 'absolute',
			'height': window.innerHeight
		});
	});

	subscribeDialog.elem.on('dialog.hide-before', function() {
		$('html,body').css({
			'width': '',
			'height': ''
		});

		subscribeDialog.elem.css({
			'position': 'absolute',
			'height': window.innerHeight
		});
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


	// 免运费弹层
		var freeFreightDialog = $.spice.dialog({
			template: $('#free-freight-dialog').html(),
			dialogClass: 'pdp-info-dialog free-freight-dialog'
		});

		$('.e-free-freight-btn').on('tap', function() {
			freeFreightDialog.show();
		});
	// 免运费弹层 end

	//mob购买按钮悬浮
		$(window).on('scroll.btnFixedScroll', function() {
			if ($.spice.getWindowWidth() > 1024 || !$('.events-addcart').hasClass('events-addcart-top')) return false;
			var scrolls = $(this).scrollTop(),
				addcartTop = $('.events-addcart-top').offset().top + 42,
				$btnFixed = $('.mob-btn-fixed');
			if (scrolls >= addcartTop) {
				$btnFixed.addClass('btn-fixed-show')
			} else {
				$btnFixed.removeClass('btn-fixed-show')
			}
		}).trigger('scroll.btnFixedScroll');

/*2期新增 end*/



	// pdp-bundle-sale-temp
		if ($('.article-bundle-sale').length) {
			var $bundleSale = $('.article-bundle-sale');

			// 选择颜色
			$('.e-color-box .color-list', $bundleSale).on('tap', function() {
				var _this = $(this),
					$overview = _this.parents('.overview');

				_this.addClass('is-active').siblings().removeClass('is-active');

				$('> ul:eq('+ _this.index() +')', $overview).removeClass('none').siblings('ul').addClass('none');
			});

			// 下拉框
			$.spice.dropdown('.e-bundle-sale-dropdown', {
				showElemTapCallBack: function(s, o) {
					s.addClass('is-active').siblings().removeClass('is-active');

					var color = $('.color-list.is-active', o.elem).data('color'),
						size = s.find('a').html()
					$(o.opt.dropElem, o.elem).find('span:eq(0)').html(color);
					$('.full-attribute', o.elem.parents('.select-box')).html('已选尺码：' + size);
				}
			});

			// mobile 查看更多组合弹层
			var bundleSaleDialog = $.spice.dialog({
				template: $('#bundle-sale-dialog').html(),
				dialogClass: 'bundle-sale-dialog',
				initEvent: function(e) {
					var dialog = e.data.dialog;
					// 绑定关闭弹层按钮
					$('.e-bundle-sale-dialog-back', dialog.elem).on('tap', function() {
						dialog.hide()
					})

					// 打开 mobile 查看更多组合 选择尺码
					$('.e-bundle-sale-dropdown .btn', dialog.elem).on('tap', function() {
						var _this = $(this),
							$li = _this.parents('li');

						$li.addClass('will-edit');

						bundleSaleSelectDialog.show();
						return false;
					});
				}
			});

			// 查看更多组合弹层显示前
			bundleSaleDialog.elem.on('dialog.show-after', function() {
				bundleSaleDialog.elem.css({
					left: '0'
				});
				// 触发后重新调用懒加载
				$.spice.lazyLoad('img[lazy-src]', {
					prestrain: 100
				});
			});

			// 查看更多组合弹层隐藏前
			bundleSaleDialog.elem.on('dialog.hide-after', function() {
				bundleSaleDialog.elem.css({
					left: '100%'
				});
			});

			// 打开 mobile 查看更多组合
			$('.e-more-combinations', $bundleSale).on('tap', function() {
				bundleSaleDialog.show();
				return false;
			});


			// mobile 查看更多组合弹层 选择尺码
			var bundleSaleSelectDialog = $.spice.dialog({
				template: $('#bundle-sale-select-dialog').html(),
				dialogClass: 'bundle-sale-select-dialog',
				initEvent: function(e) {
					var dialog = e.data.dialog;

					// 颜色切换
					$('.e-color-box .color-list', dialog.elem).on('tap', function() {
						var _this = $(this),
							$dialogContent = _this.parents('.dialog-content');

						$('> ul:eq('+ _this.index() +')', $dialogContent).removeClass('none').siblings('ul').addClass('none');
					});

					// 选择颜色，尺码
					$('.e-color-box .color-list, ul>li', dialog.elem).on('tap', function() {
						var _this = $(this);
						_this.addClass('is-active').siblings().removeClass('is-active');

						// 获取选中的尺码，颜色
						var color = $('.e-color-box .color-list.is-active', dialog.elem).data('color'),
							size = $('ul:not(.none)>li.is-active a', dialog.elem).text();

						// 写入选择的尺码，颜色
						$('.will-edit .e-bundle-sale-dropdown .dropdown-text', bundleSaleDialog.elem).html(color);

						$('.will-edit .full-attribute', bundleSaleDialog.elem).html('已选尺码：' + size);
						$('.bundle-sale-dialog').data('iScroll') && $('.bundle-sale-dialog').data('iScroll').refresh()
						return false;
					});

					// 尺码选中完成，关闭弹层
					$('ul>li', dialog.elem).on('tap', function() {
						setTimeout(function(){
							dialog.hide();
							$('.bundle-sale-dialog').data('iScroll') && $('.bundle-sale-dialog').data('iScroll').refresh()
						}, 0);
					});

				}
			});

			// 查看更多组合弹层 选择尺码显示前
			bundleSaleSelectDialog.elem.on('dialog.show-after', function() {
				// 触发后重新调用懒加载
				$.spice.lazyLoad('img[lazy-src]', {
					prestrain: 100
				});
			});

			// 查看更多组合弹层 选择尺码隐藏前
			bundleSaleSelectDialog.elem.on('dialog.hide-after', function() {
                $('.bundle-commodity li', bundleSaleDialog.elem).removeClass('will-edit');
            });


            var bundleSwiper = new Swiper ('.e-bundle-sale-swiper', {
                slidesPerView: 3.5,
                spaceBetween: 32,
                onInit: function (swiper) {
                    if ($.spice.getWindowWidth() > 1024) {
                        swiper.destroy(false, true)
                    }
                }
            });

            $(window).on('resize.bundleSwiper', function () {
                if ($.spice.getWindowWidth() > 1024) {
                    bundleSwiper && bundleSwiper.destroy(false, true)
                }else{
                    bundleSwiper && bundleSwiper.init()
                }
            }).trigger('resize.bundleSwiper')
		}
	// pdp-bundle-sale-temp end


    // pdp 全部评论弹层 mobile
        var reviewModuleDialog = $.spice.dialog({
            template: $('#review-module-dialog-m').html(),
            dialogClass: 'pdp-info-dialog review-module-dialog',
            initEvent: function(e) {
                var dialog = e.data.dialog;
                $('.dialog-close', dialog.elem).on('tap', function() {
                    reviewModuleDialog.elem.animate({
                        'top': '100%'
                    }, 300, function () {
                        dialog.hide();
                    })
                });

                $('.events-evaluate-screen .btn', dialog.elem).on('tap',function(){
                    var _this = $(this),
                        $dropdown = _this.parents('.dropdown');

                    $dropdown.toggleClass('is-open');
                });
                $('.events-evaluate-screen .sub-menu ul li', dialog.elem).on('tap',function(){
                    var _this = $(this),
                        $dropdown = _this.parents('.dropdown');

                    if(!_this.hasClass('is-disabled')){
                        var evaluate_star = $(this).find('.evaluate-item .evaluate-star').html(),
                            evaluate_num = $(this).find('.evaluate-item .evaluate-num').html();

                        $('.btn .dropdown-text-star', $dropdown).html(evaluate_star);
                        $('.btn .dropdown-text-num', $dropdown).html(evaluate_num);
                        $dropdown.removeClass('is-open');

                        dialog.elem.data('iScroll') && dialog.elem.data('iScroll').refresh();
                    }
                });
            }
        });

        var addScrollEndFlag = false;
        reviewModuleDialog.elem.on('dialog.show-after', function () {
            reviewModuleDialog.elem.animate({
                'top': 0
            }, 300)

            var reviewModuleDialogiScrollData = reviewModuleDialog.elem.data('iScroll');
            if (!addScrollEndFlag) {
                if (reviewModuleDialogiScrollData) {
                    // 滚动到底  IOS
                    reviewModuleDialogiScrollData.on('scrollEnd', function () {
                        if(this.maxScrollY == this.y){
                            console.log('end');

                            reviewModuleDialogiScrollData.refresh();
                            addScrollEndFlag = true;
                        }
                    });
                }else{
                    // 滚动到底  Android
                    reviewModuleDialog.elem.on('scroll', function(){
                        if(this.scrollHeight - this.scrollTop === this.clientHeight){
                            console.log('end');
                        }
                    });
                }
            }
        })

        $('.e-see-all').on('tap', function () {
			$('.pdp-info-dialog .user-ass').show();
			reviewModuleDialog.show();
			zmnImgCenter($(".evaluation-img ul li img"));
        })
    // pdp 全部评论弹层 mobile end

    // mobile 更改尺码选择
        $('.e-change-selected').on('tap', function() {
            var $sizeBox = $('.size-num-box'),
                sizeBoxOffsetTop = $sizeBox.offset().top;

            $('html,body').animate({
                scrollTop: sizeBoxOffsetTop - $('.header').outerHeight(true)
            }, 300);
        });
    // mobile 更改尺码选择 end

	// mobile 定制
        // 显示定制选项
        $('.diy-content-box').on('tap', '.diy-mob-btn', function () {
            if($.spice.getWindowWidth() <= 1024){
                var _this = $(this),
                    $diyContentBox = _this.parents('.diy-content-box'),
                    $showElem = null;

                if (true) {
                    // 球鞋
                    $showElem = $('.diy-shoe', $diyContentBox);
                    $diyContentBox.data('type', 'shoe')
                }else{
                    // 球衣
                    $showElem = $('.diy-shirt', $diyContentBox);
                    $diyContentBox.data('type', 'shirt')
                }

                if ($showElem.hasClass('is-open')) {
                    _this.removeClass('is-open')
                    $showElem.stop(true, true).slideUp(300, function () {
                        $(this).removeClass('is-open')
                    });
                }else{
                    _this.addClass('is-open')
                    $showElem.stop(true, true).slideDown(300, function () {
                        $(this).addClass('is-open')
                    });
                }
            }
        })

        // 球员切换
        $('.diy-content-box').on('tap', '.diy-choice .icon-radio-blue', function () {
            if($.spice.getWindowWidth() <= 1024){
                var _this = $(this),
                    $parent = _this.parent(),
                    index = $parent.index() + 1,
                    $diyContentBox = _this.parents('.diy-content-box');

                if(!_this.hasClass('is-active')){
                    _this.addClass('is-active')
                    $('.icon-radio-blue', $parent.siblings()).removeClass('is-active')
                }

                if(index === 1){
                    $('.diy-choice-1', $diyContentBox).addClass('block')
                    $('.diy-choice-2', $diyContentBox).removeClass('block').addClass('none')
                }else{
                    $('.diy-choice-1', $diyContentBox).removeClass('block').addClass('none')
                    $('.diy-choice-2', $diyContentBox).addClass('block')
                }
            }
        })

        // 选择球员
        $('.diy-content-box').on('change', '.diy-shirt .events-form-select select', function () {
            if($.spice.getWindowWidth() <= 1024){
                var _this = $(this),
                    $diyContentBox = _this.parents('.diy-content-box');

                if (true) {
                    // 显示价格、清除按钮
                    $('.diy-content-box .diy-shoe .custom-fee').removeClass('none')
                    // 显示定制图片
                    $('.diy-content-box .e-diy-img').removeClass('none')
                }
            }
        })


        // 输入信息，显示价格
        $('.diy-content-box').on('input propertychange', '.diy-shoe input', function() {
            if($.spice.getWindowWidth() <= 1024){
                if (true) {
                    // 显示价格、清除按钮
                    $('.diy-content-box .diy-shoe .custom-fee').removeClass('none')
                    // 显示定制图片
                    $('.diy-content-box .e-diy-img').removeClass('none')
                }
            }
        });

        // 清除
        $('.diy-content-box').on('tap', '.e-clear', function () {
            if($.spice.getWindowWidth() <= 1024){
                var _this = $(this),
                    $diyContentBox = _this.parents('.diy-content-box'),
                    elemType = $diyContentBox.data('type'),
                    $diyBox = null,
                    $customFee = _this.parents('.custom-fee');


                if (elemType === 'shoe') {
                    $diyBox = $('.diy-shoe', $diyContentBox)
                    $('input', $diyBox).val('');
                    $customFee.addClass('none')

                }else if (elemType === 'shirt') {
                    $diyBox = $('.diy-shirt', $diyContentBox)

                    // 重置 select
                    $('.events-form-select select option:eq(0)', $diyBox).attr("selected", true);
                    $('.events-form-select .btn .dropdown-text', $diyBox).text($('.events-form-select select option:eq(0)', $diyBox).val())

                    // 重置徽章
                    $('.badge-swiper-container .swiper-slide', $diyBox).removeClass('is-active')

                    // 重置信息
                    $('.diy-choice-2 input', $diyBox).val('');

                    $customFee.addClass('none')
                }


                $('.e-diy-img', $diyContentBox).addClass('none')
            }

        })
	// mobile 定制 end


	// 评论图片尺寸
	zmnImgCenter($(".evaluation-img ul li img"));
		// var commentPicturesFun = {
		// 	getImgSize: function (elem) {
		// 		var $elem = $(elem),
		// 		image = new Image(),
		// 		imageSize = {
		// 			width: null,
		// 			height: null
		// 		};

		// 		image.src = $elem.attr('src');

		// 		imageSize.width = image.width;
		// 		imageSize.height = image.height;

		// 		return imageSize;
		// 	},
		// 	setImgSize: function (elem) {
		// 		var $elem = $(elem);
		// 	}
		// }

		// if ($('.evaluation-img').length) {
		// 	var commentPicturesMaxSize = ($.spice.getWindowWidth() > 1024) ? 50 : 100; // 最大尺寸

		// 	if ($.spice.getWindowWidth() > 1024) {
		// 		$('.evaluation-img ul li img').each(function (index, el) {
		// 			var elSize = commentPicturesFun.getImgSize(el)

		// 			if (elSize.width > elSize.height) {

		// 			}

		// 		})
		// 	}else{

		// 	}
		// }
	// 评论图片尺寸 end


 /*!!!!!商品部分滚动跟随!!!!!*/

   // 设置滚动开始的高度节点
   var _WscrollTop;
   var _startDom = $('.breadcrumb');
   var _header = $('.header-fixed');
//   var startHeight = _startDom.outerHeight() + _startDom.offset().top - _header.outerHeight();
   var startHeight = _startDom.outerHeight() + $(".usp-header-article").outerHeight();
   var endHeight = startHeight+$('.first-article').outerHeight() - $('.first-article-bg').outerHeight();
   // console.log($(".first-article").outerHeight(),endHeight);
   //需要滚动的元素
   var _scrollDom1 = $(".first-article > .row > .col-10-6");
   var _scrollDom2 = $(".first-article .first-article-bg");
   var _headerHei = $('.header-fixed').outerHeight();
   var headerBannerboxH;
   if ($(".header-banner-box").hasClass('header-banner-show')) {
    headerBannerboxH = $(".header-banner-box").outerHeight(true);
   } else {
    headerBannerboxH = 0;
   }
   // console.log(_scrollDom1,_scrollDom2);
   // console.log(_headerHei)
   $('.events-banner-close').on('tap', function(){
    headerBannerboxH = 0;
   })
   $(window).scroll(()=>{
    if (($.spice.getWindowWidth() > 1024)){
      console.log("A:", $(window).scrollTop());
      console.log("B:", startHeight);
     _WscrollTop = $(window).scrollTop();
     if (_WscrollTop > startHeight && _WscrollTop < endHeight) {
      _scrollDom2.css({ top: _WscrollTop - _headerHei - 10});
      _scrollDom1.css({ top: _WscrollTop - _headerHei - 10});
     } else if ($(window).scrollTop() < startHeight) {
      _scrollDom2.css({ top: 0 });
      _scrollDom1.css({ top: 0 });
     } /*else if (_WscrollTop > endHeight) {
      _scrollDom2.css({ top: endHeight});
      _scrollDom1.css({ top: endHeight});
     }*/
    }
    
   });

	//7-13   PDP 文字描述和评价整合成2个TAB
	$('.table-check span').on('tap', function () {
		$(this).addClass('is-active').siblings().removeClass('is-active')
		if ($.spice.getWindowWidth() > 1024) {
			if ($(this).data('index') === 0) {
				$('.article-hot,.article-prompt-copy,.article-matching-recommendation-m,.how-wear').css({
					'display': 'block'
				})
				$('.user-ass').css({'display':'none'})
			} else if ($(this).data('index') === 1) {
				$('.article-hot,.article-prompt-copy,.article-matching-recommendation-m,.how-wear').css({
					'display': 'none'
				})
				$('.user-ass').css({'display':'block'})
				zmnImgCenter($(".evaluation-img ul li img"));
			}
		}else{
			if ($(this).data('index') === 0) {
				$('.article-hot,.article-prompt-copy,.article-matching-recommendation-m,.how-wear').css({
					'display': 'block'
				});
				$('.user-ass-m').addClass('none');
			} else if ($(this).data('index') === 1) {
				console.log("1");
				$('.user-ass-m').removeClass('none');
				$('.article-hot,.article-prompt-copy,.article-matching-recommendation-m,.how-wear').css({
					'display': 'none'
				});
				zmnImgCenter($(".evaluation-img ul li img"));
			}
		}
		
	})
	// $('.event-hot-mob-title .icon').on('tap', function () {
	// 	$(this).toggleClass('is-open-down')
		// $(this).toggleClass('icon-arrow-up')
		// $(this).toggleClass('icon-arrow-down')
		// $(this).parent().nextAll('.mob-content').slideToggle()
	// })
	//PDP 文字描述和评价整合成2个TAB  end

	//AD2-2336 个性印制输入框加上数量指示 10-16
	$(".e-form-input-size-left").keyup(function(){
		//这就是输入值的个数
		var forminputsizeleft = this.value.length;
		$('.e-input-size-left p').text(forminputsizeleft+'/10');
	});
	$(".e-form-input-size-right").keyup(function(){
		//这就是输入值的个数
		var forminputsizeright = this.value.length;
		$('.e-input-size-right p').text(forminputsizeright+'/10');
	});
});


//图片居中
function zmnImgCenter(obj){
    obj.each(function(){
		var $this=$(this);
		var objHeight=$this.height();//图片高度
		var objWidth=$this.width();//图片宽度
		var parentHeight=$this.parent().height();//图片父容器高度
		var parentWidth=$this.parent().width();//图片父容器宽度
		var ratio=objHeight/objWidth;
		if(objHeight>parentHeight && objWidth>parentWidth){
			//当图片宽高都大于父容器宽高
			if(objHeight>objWidth) {//赋值宽高
				$this.width(parentWidth);
				$this.height(parentWidth*ratio);
			}else {
				$this.height(parentHeight);
				$this.width(parentHeight/ratio);
			}
			objHeight=$this.height();//重新获取宽高
			objWidth=$this.width();
			$(this).css("left",(parentWidth-objWidth)/2);
			$(this).css("top",(parentHeight-objHeight)/2);
		}else{
			//当图片宽高小于父容器宽高
			$(this).css("left",(parentWidth-objWidth)/2);
			$(this).css("top",(parentHeight-objHeight)/2);
		}
	})
}

function scrollGallery(obj, showNum, opt) {
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


	$.spice.tools.scrollGalleryRes({
		elem: $resGallery,
		options: opt || {
			moveNum: showNum
		}
	});

};

/* 倒计时 */
function show_date_time() {
	var EndTime = new Date('2117/11/16 11:30:00');
	var NowTime = new Date();
	var t = EndTime.getTime() - NowTime;
	var d = Math.floor(t / 1000 / 60 / 60 / 24);
	var h = Math.floor(t / 1000 / 60 / 60 % 24);
	var m = Math.floor(t / 1000 / 60 % 60);
	var s = Math.floor(t / 1000 % 60);
	if (d < 0) {
		$('.the-pre-sale').hide();
		$('.size-num-box').removeClass('none').show();

		$(".time-box").html("<div class='time_main float-clearfix'><div class='time_failure'>倒计时已经失效</div></div>");
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
		$(".time-box").html("<div class='time_main float-clearfix'><div class='time_show'><p class='time_countdown'>" + daysold + "天</p></div><div class='time_show'><p class='time_countdown'>" + hrsold + "小时</p></div><div class='time_show'><p class='time_countdown'>" + minsold + "分</p></div><div class='time_show'><p class='time_countdown'>" + seconds + "秒</p></div></div>");
		NowTime = Number(NowTime) + 1000;
	}
};

function mySwiper(i){
	var mySwiper = new Swiper(i, {
		scrollbarHide: true,
		slidesPerView: 'auto',
		centeredSlides: false,
		spaceBetween: 0,
		grabCursor: true
	});
	$(i).data('bud-swiper', mySwiper);
}

