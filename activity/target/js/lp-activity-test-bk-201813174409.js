$(function() {
	// 换图 + 懒加载
	$.spice.lazyLoad("img[lazysrc]", {
		attr: "lazysrc"
	});
	$.spice.tools.changeImageSrc({
		callBack: function(img, self) {
			$.spice.lazyLoad("img[lazysrc]", {
				attr: self.opt.lazyData,
				prestrain: 1
			});
		}
	});

	function handler() {
		event.preventDefault()
	}
	// 禁止滑动
	document.addEventListener('touchmove', handler, false)


	// 滑动部分
	var windowW = $.spice.getWindowWidth(), // window 宽
		$article = $('.e-article'), // 效果主体元素
		articleH = $article.outerHeight(true), //效果主体元素高度
		$ul = $('ul', $article), // 需要操作的ul 元素
		$li = $('li', $ul), // li
		viewNum = {
			x: 4, // 设置显示li个数 row
			y: 0 // 设置显示li个数 col
		},
		rowNum = 8, // 行数
		colNum = 10, // 列数
		setUlW = (windowW / viewNum.x) * colNum, // 设置ul宽度
		moveNum = 1, // 每次操作移动步数
		offSetTopRow = 2, // 距离上面间隔行数
		offSetLeftCol = 3, // 距离左边加个列数
		liSize = {
			w: 0, // li 宽度
			h: 0 // li 高度
		},
		translate = {
			x: 0, // X轴偏移量
			y: 0 // Y轴偏移量
		},
		position = {
			x: offSetTopRow, //所在当前行数
			y: offSetLeftCol  //所在当前列数
		},
		getClientWidth = function (el) {
			return $(el)[0].getBoundingClientRect().width.toFixed(2);
		},
		getClientHeight = function (el) {
			return $(el)[0].getBoundingClientRect().height.toFixed(2);
		};
		
		// 设置铺品尺寸
		$ul.css({
			'width': setUlW,
		})

		// 更新li 宽高
		liSize.w = getClientWidth($li);
		liSize.h = getClientHeight($li);

		// 更新ul偏移量
		translate.x = -liSize.w * offSetLeftCol;
		translate.y = -liSize.h * offSetTopRow;
		
		// 设置铺品偏移量
		$ul.css({
			'transform': 'translate(' + translate.x + 'px, ' + translate.y + 'px)'
		})
		
		// 缩放手势
		touch.on('.e-article', 'pinch', function(e) {
			console.log(e)
		});

		// 滑动手势
		touch.on('.e-article', 'swipeleft swiperight swipeup swipedown', function(e) {
			// console.log(e);
			e.originEvent.preventDefault();
	
			// 更新li 宽高
			liSize.w = getClientWidth($li);
			liSize.h = getClientHeight($li);
	
			// 判断方向
			if (e.direction === 'up') {
			
				if(position.x + offSetTopRow === rowNum) return false;

				translate.y = translate.y - liSize.h * moveNum;
				
				position.x = position.x + moveNum;

			} else if (e.direction === 'right') {
				if (position.y <= 0) return false;
	
				translate.x = translate.x + liSize.w * moveNum;

				position.y = position.y - moveNum;

			} else if (e.direction === 'down') {
				if (position.x <= 0) return false;
	
				translate.y = translate.y + liSize.h * moveNum;

				position.x = position.x - moveNum;

			} else if (e.direction === 'left') {
				if (position.y >= colNum - viewNum.x) return false;
	
				translate.x = translate.x - liSize.w * moveNum;

				position.y = position.y + moveNum;

			}
			
			console.log(position, translate, liSize);
			
			// 执行动作
			$('.e-article ul').css({
				'transform': 'translate(' + translate.x + 'px, ' + translate.y + 'px)'
			}).data('touchSwipe', {
				'position': position,
				'translate': translate,
				'liSize': liSize
			})
	
		});






	// 滑动部分 end

});