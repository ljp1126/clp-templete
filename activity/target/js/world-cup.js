// 自适应轮播
function worldCup(events,obj, pcShowNum, mobShowNum) {
	// var $resGallery = $('.events-guess-you-Iike', obj);
	var $resGallery = $(events, obj);

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
		speed: 600,
		breakpoints: {
			1024: {
				slidesPerGroup: mobShowNum,
				speed: 300
			}
		}
	});
}
function GetUrlParam(paraName) {
	var url = document.location.toString();
	var arrObj = url.split("?");
	if (arrObj.length > 1) {
		var arrPara = arrObj[1].split("&");
		var arr;
		for (var i = 0; i < arrPara.length; i++) {
			arr = arrPara[i].split("=");
			if (arr != null && arr[0] == paraName) {
				return arr[1];
			}
		}
		return "";
	}
	else {
		return "";
	}
}
$(function(){
	var _w = $.spice.getWindowWidth();
	$('.header-banner-box').css({ 'opacity': '0' })
	$('.header-fixed').css({'opacity':'0'})
	//tab 悬浮
	var windowTop = 0;
	$(window).on('scroll.worldCupScroll', function() {
		var $scrollTop = $(this).scrollTop(),
			$tabMain = $('.article-tab'),
			$positionTop = $tabMain.offset().top,
            headerH = $('.header-fixed').outerHeight(true),
			headerBannerboxH = 0,
			articleboots = $('.article-boots-item-5').offset().top,
			articlebootsH = $('.article-boots-item-5').outerHeight(true);
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
		if ($scrollTop > $positionTop && $scrollTop < articleboots - articlebootsH -100){
			$('.boots-fixed-right').removeClass('none');
		}else{
			$('.boots-fixed-right').addClass('none');
		}
		if($scrollTop > $positionTop){
			$tabMain.addClass('tab-fixed').addClass('tab-main-width');
			if ($scrollTop >= windowTop) {
				windowTop = $scrollTop;
				$tabMain.find('.tab-main').css({ top: 0 })
			} else {
				windowTop = $scrollTop;
				$tabMain.find('.tab-main').css({ top: (headerH + headerBannerboxH) })
			}
		}else{
			if($scrollTop  < $positionTop - headerH - headerBannerboxH){
				$tabMain.removeClass('tab-fixed').find('.tab-main').removeAttr('style');
			}
		}

	}).trigger('scroll.worldCupScroll');
	
	// $(window).on('resize.worldCup', function () {
    //     $('.swiper-container .swiper-slide-btn').each(function (index, el) {
	// 		$(this).find('.btn').height($('.swiper-container .swiper-slide a img').height())
	// 	});
	// }).trigger('resize.worldCup');

	// $('.article-tab').on('tap','.tab-main li',function(){
	// 	var _this = $(this),
	// 		$thisIndex = _this.index(),
	// 		$tabItem = $('.article-tab-item'),
	// 		$itemLength = $tabItem.length;

	// 	$('html,body').animate({
	// 		scrollTop: $('.article-tab').offset().top-$('.header-fixed').innerHeight()
	// 	}, 500);
	// 	// _this.addClass('is-active').siblings('li').removeClass('is-active');
	// 	// $tabItem.addClass('none').eq($thisIndex).removeClass('none');

	// 	if ($thisIndex == 1){
	// 		console.log(111)

	// 	}
	// 	if ($thisIndex == 2){

	// 	}
	// })
	//配件
	$(window).on('resize.worldCup', function () {
		$('.swiper-container .swiper-slide-btn').each(function (index, el) {
			$(this).find('a').height($('.swiper-container .swiper-slide .thumbnail a img').height())
			//$('.swiper-container .swiper-slide-btn .btn').height($('.swiper-container .swiper-slide-btn').height())
		});
	}).trigger('resize.worldCup');
	var itemLength = $('.dress-item-goods').length;
	for (var index = 1; index <= itemLength; index++) {
		worldCup('.events-guess-you-Iike-' + index,'.e-dress-goods-' + index, 3, 2);
	}
	//配件 end

	//战靴   显示战靴的时候 配件的隐藏，打开这个
	// var itemLengths = $('.dress-item-goods-01').length;
	// console.log(itemLengths)
	// for (var index = 1; index <= itemLengths; index++) {
	// 	myResGallery('.e-dress-goods-' + index, 0, 1);
	// }
	//战靴 end
	// schedule


	// dress
	// var itemLength = $('.dress-item-goods').length;
	// for (var index = 1; index <= itemLength; index++) {
	// 	myResGallery('.e-dress-goods-'+index, 4, 2);
	// }

	// accessories
	// 视频
	$('.e-lp-video-btn').on('tap', function (e) {
		e.preventDefault();
		var _this = $(this),
			videoCode = _this.data('videoCode');

		openVideo(videoCode, 'true');
	});

	// combat-boots
		// 视频
		$('.e-video-btn').on('tap', function (e) {
			e.preventDefault();
			var _this = $(this),
				videoCode = _this.data('videoCode');

			openVideo(videoCode, 'true');
		});
		// 视频 end

		var windowTop = 0,
			flag = false,
			upIndex = 0;
		$('.e-tab-right .tab-item').on('tap', function (e) {
			e.preventDefault();

			var _this = $(this),
				thisIndex = _this.index(),
				headerTop = $('.header-fixed').innerHeight(),
				tabMain = $('.article-tab .tab-main').innerHeight(),
				bootsItem = $('.article-combat-boots .article-boots-item'),
				bootsItemTop = bootsItem.eq(thisIndex).offset().top;
			console.log(thisIndex)
			$('html,body').animate({
				scrollTop : bootsItemTop - tabMain - headerTop
			},600)
			// _this.addClass('tab-right-con-color').siblings().removeClass('tab-right-con-color')
			// if($('.header-fixed').css('top') != '0px'){
			// 	console.log(1)
			// 	$('html,body').animate({
			// 		scrollTop : bootsItemTop - tabMain
			// 	},600)
			// }else{console.log(2)
			// 	$('html,body').animate({
			// 		scrollTop : bootsItemTop - 40 - headerTop
			// 	},600)
			// }
		})
		//右边导航变色
		$(window).on('scroll.worldCupScrollColo', function () {
			var $scrollTops = $(this).scrollTop(),
				articlbootsitem1 = $('.article-boots-item-1').offset().top,
				articlbootsitem2 = $('.article-boots-item-2').offset().top,
				articlbootsitem3 = $('.article-boots-item-3').offset().top,
				articlbootsitem4 = $('.article-boots-item-4').offset().top;
			if ($scrollTops > articlbootsitem1 && $scrollTops < articlbootsitem2 - 230){
				$('.e-tab-right .tab-item:eq(0)').addClass('tab-right-con-color').siblings().removeClass('tab-right-con-color')
			} else if ($scrollTops > articlbootsitem2 - 230 && $scrollTops < articlbootsitem3 - 230){
				$('.e-tab-right .tab-item:eq(1)').addClass('tab-right-con-color').siblings().removeClass('tab-right-con-color')
			} else if ($scrollTops > articlbootsitem3 - 230 && $scrollTops < articlbootsitem4 - 230){
				$('.e-tab-right .tab-item:eq(2)').addClass('tab-right-con-color').siblings().removeClass('tab-right-con-color')
			} else if ($scrollTops > articlbootsitem4 - 230){
				$('.e-tab-right .tab-item:eq(3)').addClass('tab-right-con-color').siblings().removeClass('tab-right-con-color')
			}
			
		}).trigger('scroll.worldCupScrollColo');


	// knowledge


	// 换图 + 懒加载
	$.spice.tools.changeImageSrc({
		callBack: function(img, self) {
			$.spice.lazyLoad('img[lazysrc]', {
				attr: self.opt.lazyData,
				prestrain: 1
			});
		}
	});
	$.spice.lazyLoad('img[lazy-src]', {
		attr: 'lazy-src'
	});

	var swiper2 = new Swiper('.swiper-container-kv', {
		slidesPerView: 'auto',
		centeredSlides: true,
		paginationClickable: true,
		preventClicks: false,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
		prevButton: '.swiper-button-prev2',
		nextButton: '.swiper-button-next2',
		initialSlide: 0,
		speed: 1000,
		autoplay: 3000,
		loop: true,
	});

	var swiper1 = new Swiper('.swiper-container-od-jacket', {
		slidesPerView: 'auto',
		loop: false,
		centeredSlides: true,
		spaceBetween: 0,
		prevButton: '.swiper-button-prev1',
		nextButton: '.swiper-button-next1',
		initialSlide: 1
	});
	var ruleDialog = $.spice.dialog({
		template: $('#rule-dialog').html(),
		dialogClass: 'rule-dialog',
		initEvent: function (e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function () {
				dialog.hide();
			});
		}
	});
	$('.e-btn-rule').on('tap', function () {
		ruleDialog.show();
	});
	if (GetUrlParam("a") == 1) {
		var headerbannerboxHei = 0,
			headerfixedHEi = $('.header-fixed').height(),
			articlebannerHei = $('.article-banner').height(),
			differenceHei = 0;
		if ($('.header-banner-box').hasClass('header-banner-show')) {
			headerbannerboxHei = $('.header-banner-box').innerHeight();
		} else {
			headerbannerboxHei = 0;
		}
		if (_w > 1024) {
			differenceHei = 0;
		} else {
			differenceHei = 0;
		}
		$('html,body').animate({
			scrollTop: 79.281 + headerfixedHEi + articlebannerHei - differenceHei 
		}, 500)
	}
	setTimeout(function () {
		$('.header-banner-box').css({ 'opacity': '1' })
		$('.header-fixed').css({ 'opacity': '1' })
	}, 1000);
})
