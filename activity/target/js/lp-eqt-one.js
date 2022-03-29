$(function() {

	
	var $eqtOne = $('.e-eqt-one'),
		$li = $('li', $eqtOne),
		liLen = $li.length,
		loadImgFun = function(imgArr, fn) {
			// 图片加载fun
			console.log('开始加载图片...');
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
					$(this).remove();
					console.log('有' + errImgLen + '个图片加载失败');
				})
				if (this.complete) setTimeout(function() {
					defered.resolve();
				}, 1000);
				imgdefereds.push(defered);
			})
			$.when.apply(null, imgdefereds).done(function() {
				setTimeout(function() {
					if (fn && $.isFunction(fn)) {
						fn()
					}
					console.log("imgArr.length", imgArr.length);
					console.log("loadImgLen", loadImgLen);
					console.log('errImgLen', errImgLen);
					console.log('图片加载完成');
				}, 0)
			});

		};
	
	// 自定义换图
	$.spice.tools.changeImageSrc({
		elem: 'img.e-eqt-one-gif[data-image]',
		callBack: function (elem) {
			var $elem = elem;
		}
	});

	var imgArrs = function () {
		var arr = [];
		$.each($li, function (i,e) {
			arr.push($('a>img', e)[0]);
		})
		return arr;
	};

	var timer = null,
		imgNumFlag = 0;
	loadImgFun(imgArrs(), function () {
		timer = setInterval(function () {
			var $img = $('li:eq('+ imgNumFlag +') .e-eqt-one-gif', $eqtOne);

			$img.attr('src', $img.attr('lazysrc'));

			imgNumFlag ++;
			
			if(imgNumFlag === 4){
				clearInterval(timer);
			}
		}, 500);
	})


});