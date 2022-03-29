$(function(){
	var _w,_h;

	// 全选
		$.spice.CheckBox('.events-checkBox', {
			isBan : true,
			checkCallBack: function(obj) {
				$(obj.elem).closest('.cart-list-item').toggleClass('is-selected');
				console.log(obj);
				$('.cart-selected-num').html('<span>（</span>已选中 '+ obj.selected.length +' 件 <span class="m-selected-info">商品</span><span>）</span>');
			},
			checkAllCallBack: function(obj) {
				if( $(obj.elem).hasClass('on') ){
					$(obj.allBoxNoDis).closest('.cart-list-item').addClass('is-selected');
				}else{
					$(obj.allBoxNoDis).closest('.cart-list-item').removeClass('is-selected');
				}
				console.log(obj)
				$('.cart-selected-num').html('<span>（</span>已选中 '+ obj.selected.length +' 件 <span class="m-selected-info">商品</span><span>）</span>');
			},
			removeAllCallBack: function(obj) {
				console.log(obj)
			}
		});

	// 删除
		$('.events-cart-item .operate-delete').on('tap', function() {
			var _this = $(this),
				_thisP = _this.closest('.cart-list-item');
			if (_w > 1024) {
				_thisP.fadeOut('400', function() {
					_thisP.remove();
					$(window).trigger('resize.cartRightFixed');
				});
			}else{
				_thisP.addClass('will-die');
				goodsRemoveDialog.show(function () {
					/*$('.goods-remove-dialog').animate({
						left: 0
					}, 300);*/
				});
			}
		});

	// 删除弹层
		var goodsRemoveDialog = $.spice.dialog({
			dialogClass: 'shoppingcart-dialog goods-remove-dialog',
			maskClose: false,
			title: ' ',
			content: '确定删除该商品吗？',
			buttons: {
				'确定删除': {
					btnClass: 'btn-success btn btn-blue',
					btnEvent: function(e) {
						$('.will-die').fadeOut('400', function() {
							$('.will-die').remove();
						});

					}
				},
				'暂不删除': {
					btnClass: 'btn-cancel btn btn-black',
					btnEvent: function(e) {
						$('.cart-list-item').removeClass('will-die');

					}
				}
			},
			initEvent: function (e) {
				var dialog = e.data.dialog;
				$('.dialog-close, .btn-success, .btn-cancel', dialog.elem).on('tap', function() {
					$('.cart-list-item').removeClass('will-die');

					goodsRemoveDialog.hide();
					/*$('.goods-remove-dialog').animate({
						left: 100+'%'
					}, 300, function () {
						goodsRemoveDialog.hide();
					});
					setTimeout(function() {
						$('.goods-remove-dialog').css('left',0);
					}, 1000);*/
				});
			}
		});

	// 编辑
		$('.operate-edit').on('tap', function() {
			var _this = $(this),
				_thisP =
				 _this.parents('.cart-list-item');

				_thisP.addClass('will-edit');

				if (_w > 1024) {
					shoppincartEditDialog.show();
				}else{
					shoppincartEditDialog.show(function () {
						$('.shoppincart-edit-dialog').animate({
							/*left: 0*/
						}, 300,function(){
							if ($('.shoppincart-edit-dialog').data('iScroll')) {
								$('.shoppincart-edit-dialog').data('iScroll').destroy();
								$('.shoppincart-edit-dialog .dialog-scroll-wrap').removeAttr('style');
							}
						});


					});
				}

			// 写入定制数据到编辑弹层
				var editDialog = $('.shoppincart-edit-dialog'),
					left = $('.customized-left', _thisP),
					right = $('.customized-right', _thisP),
					price = $('.customized-price', _thisP);

				if ( left.length || right.length || price.length ) {

					$('.customized-input-left input', editDialog).val($('span', left).text());
					$('.customized-input-right input', editDialog).val($('span', right).text());
					$('.customized-info-box .price span', editDialog).text($('span', price).text());
				}

		});

	// 编辑弹层
		var shoppincartEditDialog = $.spice.dialog({
			dialogClass: 'shoppingcart-dialog shoppincart-edit-dialog',
			//maskClose: false,
			title: '编辑商品',
			content: $('#shoppingcart-edit-template').html(),
			initEvent: function (e) {
				//下拉框
				$.spice.dropdown('.events-dropdown', {
					isIscroll: true,
					tinyscrollbarConfig: {
						wheelLock: true,
						touchLock: false
					},
					showElemTapCallBack: function(s, o) {
						$(o.opt.dropElem, o.elem).find('span:eq(0)').html(s.text());
					}
				});

				// 半模拟下拉框
				$('.events-form-select select').change(function() {
					var val = $('option:checked', this).val();
					$('span.dropdown-text', $(this).closest('select').prev('a')).html(val);
					$(this).closest('.events-form-select').addClass('is-success');
				});
				$('select', '.events-form-select')
				.on('focus', function(){
					spiceDialogRefresh();
				})
				.on('blur', function(){
					spiceDialogRefresh();
				})

				if ($.spice.getWindowWidth() > 1024) {
					$.spice.cloudZoom('.event-cart-cloudzoom', {
						animationTime: 0
						, easeTime: 0
						, zoomOffsetX: 0
						, zoomPosition: 'inside'
					});
				}else{
					$('.icon-mob-click').on('tap',function(){
						var imgUrl = $(this).siblings('img').attr('src');

						$("#zoom").find("img").attr("src", imgUrl);

						$('html,body').animate({
							scrollTop: 0
						}).css({
								'overflow': 'hidden',
								'position': 'fixed',
								'height': '100' + '%'
							});
						/*获取页面最大的z-index*/
						var maxZ = Math.max.apply(null,$.map($('body > *'), function(e,n){
							if($(e).css('position')=='fixed')
							return parseInt($(e).css('z-index'))||1 ;
							})
						);
						$('.e-pdp-imgpop').css('z-index',maxZ+1).fadeIn(100);
						$('.e-popup-mask').show();

						if( $.spice.smartZoom('.smart-zoom-image', 'isPluginActive') ){
							$.spice.smartZoom('.smart-zoom-image', 'destroy');
							$.spice.smartZoom('.smart-zoom-image');
						}else{
							$.spice.smartZoom('.smart-zoom-image');
						}

					});
					$('.e-pop-close').on('tap', function(event) {
						$('html,body').removeAttr('style');

						$('.e-pdp-imgpop').fadeOut(100);
						$('.e-popup-mask').hide();
					});
					$('.e-popup-mask').click(function() {
						$('.e-pdp-imgpop').fadeOut(100)
						$(this).hide();
					});

				}

				var dialog = e.data.dialog;

				$('.events-update-cart', dialog.elem).on('tap', function() {
					var size, number;

					// pc 取全模拟下拉框的数据，mobile 取原生下拉框的数据
					if ($.spice.getWindowWidth() > 1024) {
						size = $.trim($('.change-size .events-dropdown .dropdown-text', dialog.elem).text()),
						number = $.trim($('.change-number .events-dropdown .dropdown-text', dialog.elem).text());
					}else{
						size = $.trim($('.change-size .events-dropdown .dropdown-text', dialog.elem).text()),
						number = $.trim($('.change-number .events-dropdown .dropdown-text', dialog.elem).text());
					}

					var _willEdit = $('.will-edit');

					$('.info-size span', _willEdit).text(size);
					$('.info-num-select .dropdown-text', _willEdit).text(number);
					$('.select .events-dropdown .dropdown-text, span.info-number', _willEdit).text(number);

					// 写入定制信息
						var shoppingcartGoodsInfo = $('.product-info', _willEdit),
							left = $('.customized-left', shoppingcartGoodsInfo),
							right = $('.customized-right', shoppingcartGoodsInfo),
							price = $('.customized-price', shoppingcartGoodsInfo),
							leftVal = $('.customized-input-left input', dialog.elem).val(),
							rightVal = $('.customized-input-right input', dialog.elem).val(),
							customizedPriceVal = $('.customized-info-box .price span', dialog.elem).text();

						// 如果有定制信息则只写值，否则写入结构

						if ( left.length || right.length || price.length ) {
							$('span', left).text( leftVal );
							$('span', right).text( rightVal );
							$('span', price).text( customizedPriceVal );
						}else{
							leftVal && $('.m-info-num', _willEdit).before('<p class="customized-info customized-left">左脚文字：<span>'+ leftVal +'</span></p>');
							rightVal && $('.m-info-num', _willEdit).before('<p class="customized-info customized-right">右脚文字：<span>'+ rightVal +'</span></p>');
							customizedPriceVal && $('.m-info-num', _willEdit).after('<p class="customized-info customized-price">定制费：<span>'+ customizedPriceVal +'</span></p>')
						}
					// 写入定制信息 end

					$('.cart-list-item').removeClass('will-edit');

					if (_w > 1024) {
						dialog.hide(function () {
							dialog.init();
						});
					}else{
						dialog.hide(function () {
							dialog.init();
						});
						/*$('.shoppincart-edit-dialog').animate({
							left: 100+'%'
						}, 300, function () {
							dialog.hide(function () {
								dialog.init();
							});
						});*/
					}

				});

				$('.dialog-close', dialog.elem).on('tap', function() {
					$('.cart-list-item').removeClass('will-edit');

					if (_w > 1024) {
						dialog.hide(function() {
							dialog.init();
						});
					}else{
						dialog.hide(function () {
							dialog.init();
						});
						/*$('.shoppincart-edit-dialog').animate({
							left: 100+'%'
						}, 300, function () {
							dialog.hide(function () {
								dialog.init();
							});
						});*/
					}
				});
			}
		});

	$(window).on('resize.cart', function(){
		_w = $.spice.getWindowWidth();
		if (_w > 1024) {
			goodsRemoveDialog.init();
			$('.cart-list-item').removeClass('will-die');
		}
	}).trigger('resize.cart');

	/*定制信息弹层*/
	var customizedDialog = $.spice.dialog({
		template: $('#customized-dialog').html(),
		dialogClass: 'pdp-info-dialog customized-clause-dialog'
	});
	$('.customized-opt-box .icon-cart-question-mark').live('tap', function(e) {
		e.preventDefault();
		customizedDialog.show();
	});
	//个性定制
	$('.diy-choice>div').live('tap',function(){
		$('.diy-choice > div >i').removeClass('is-active');
		$(this).find('i').addClass('is-active');

		if($('.choice-1').is('.is-active')){
			$('.diy-choice-1').show();
			$('.diy-choice-2').hide();
		}else{
			$('.diy-choice-1').hide();
			$('.diy-choice-2').show();
		}
	});

	//cart右模块悬浮
	$(window).on('resize.cartRightFixed', function() {
		var wW = $(window).width();
		if(wW > 1024){
			$(window).scroll(function() {
				if ($('.shopping-cart-content').length != 0) {
					var headerOffsetT = $('.shopping-cart-content').offset().top-80;
				}

				var wH = $(window).scrollTop(),
					cartLeftH = $(".shopping-cart-left").height();

					if(wH > headerOffsetT && cartLeftH > 650){
						$('.shopping-cart-right').addClass("cart-right-fixed");
					}else{
						$('.shopping-cart-right').removeClass("cart-right-fixed");
						$(".shopping-cart-right").css({top:'0',left:'0px'});
					}

				//悬浮
				var bodyH = $("body").height(),
					bodyW = $("body").width(),
					cartContentW = $(".shopping-cart-content").width(),
					cartLeftW = $(".shopping-cart-left .cart-title").width(),
					footerH = $(".footer").height(),
					guessYouIikeH = $(".article-guess-you-Iike").height()+60,
					cartRightH = $(".shopping-cart-right").height(),
					positionTop = bodyH-footerH-guessYouIikeH-cartRightH,
					rightTop = bodyH-footerH-guessYouIikeH-cartRightH-80,
					rightLeft = (bodyW-cartContentW)/2+cartLeftW+20;
					//console.log(rightLeft);

				if(wH >= rightTop){
					$(".cart-right-fixed").css({top:positionTop+28,left:rightLeft+'px'});
					$(".cart-right-fixed").addClass("position");
				}else{
					if(wW > 1024){
						/*111px = 导航 80+shopping-cart-content:padding-top 31*/
						$(".cart-right-fixed").css({top:'111px',left:rightLeft+'px'});
					}else{
						$(".cart-right-fixed").css({top:'0px',left:'0px'});
					}
					$(".cart-right-fixed").removeClass("position");
				}
				if($('.events-cart-item .cart-list-item').length < 2){
					$('.shopping-cart-right').removeClass("position").removeAttr('style');
				}
			}).scroll();
		}else{
			$(".shopping-cart-right").removeClass("cart-right-fixed position").removeAttr('style');
		}
	}).trigger('resize.cartRightFixed');

	//尺码表弹层 相关
	var _wW,
		sizeDialogTmp;

	$(window).on('resize.sizeCart', function() {
		_wW = $.spice.getWindowWidth();
	}).trigger('resize.sizeCart');

	var sizeDialog = $.spice.dialog({
		template: sizeDialogTmp,
		dialogClass: 'reebok-dialog size-chart-dialog',
		maskClose: false,
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function() {
				if (_wW > 1024) {
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


		if (_wW > 1024) {
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
		if (_wW > 1024) {
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
		if (_wW > 1024) {
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

})
