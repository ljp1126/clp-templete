$(function () {
	// shopping-assistant-tab
	$('.e-shopping-assistant-tab li').on('tap', function() {
		var _this = $(this),
			_index = _this.data('index')

		if (!_this.hasClass('is-active')) {
			_this.addClass('is-active').siblings().removeClass('is-active')
			$('.article-shopping-assistant-container .step-'+_index).addClass('is-active').siblings().removeClass('is-active');
		}

	});


	// 第一步，选择类型
	$('.e-type-option-title').on('tap', function() {
		var _this = $(this)
			_index = _this.parents('.type-option').index(),
			$typeOption = _this.parents('.type-option');

		if (!$typeOption.hasClass('is-active')) {
			$typeOption.addClass('is-active').siblings().removeClass('is-active')
		}

		// 跳转到第二步
		$('.e-shopping-assistant-tab li[data-index=2]').trigger('tap');

		// 更新推荐
		$('.step-3 .box:eq('+ _index +')').addClass('is-active').siblings('.box').removeClass('is-active');
	});

	// 第二步，选择尺码tab切换
	$('.size-tabs-title li').on('tap', function() {
		var _this = $(this),
			_index = _this.index();

		if (!_this.hasClass('is-active')) {
			_this.addClass('is-active').siblings().removeClass('is-active')
			$('.size-tabs-content .size-description:eq('+ _index +')').addClass('is-active').siblings().removeClass('is-active');
		}
	});

	// 第二步，选择尺码后跳转到推荐
	$('.size-description > .btn-calculation').on('tap', function() {
		var _this = $(this);

		if (!_this.hasClass('is-disabled')) {
			$('html,body').animate({
				scrollTop: 0
			}, 300);

			$('.e-shopping-assistant-tab li[data-index=3]').trigger('tap');
		}
	});




	// mobile 选择尺码
	$('select', '.e-size-selector-m').on('change', function() {
		var $this = $(this),
			optionValue = $('option:selected', this).attr('value'),
			optionDataVal = $('option:selected', this).attr('data-val');
		$('.dropdown-text', $(this).siblings('.btn')).html(optionValue).removeClass('is-empty');

		var $parentText = $this.parents('.size-select-content'),
			textArr = [];
		$('.e-size-selector-m', $parentText).each(function(index, el) {
			textArr.push($('.btn .dropdown-text', el).text())
		});
		if (textArr[0] !== '' && textArr[1] !== '') {
			$this.parents('.size-description').find('.btn-calculation').removeClass('is-disabled');
		} else {
			$this.parents('.size-description').find('.btn-calculation').addClass('is-disabled');
		}
	})


	// 左右滑动切换tab
		// mobile 滑动
		var sx = 0,
			mx = 0,
			ex = 0,
			tabFlag = 1;
		$('.e-shopping-assistant-tab').on('touchstart', function(e) {
			var target = $.spice.getEvent(e)[0].target,
				tagName = target.tagName;
			sx = $.spice.getEventXY(e).x;
		}).on('touchmove', function(e) {
			mx = $.spice.getEventXY(e).x;
			if (Math.abs(mx - sx) > 8) {
				e.preventDefault();
			}
		}).on('touchend', function(e) {
			ex = $.spice.getEventXY(e).x;

			var v = ex - sx;
			if (Math.abs(v) > 30) {
				if (ex - sx > 0) {
					if (tabFlag < 4) {
						tabFlag++;
						// console.log("right");
					}
				} else {
					if (tabFlag > 1) {
						// console.log("left");
						tabFlag--;
					}
				}

				// console.log(tabFlag);
				$('.e-shopping-assistant-tab li[data-index='+tabFlag+']').trigger('tap');
			}
		});

	// 左右滑动切换tab end

});
