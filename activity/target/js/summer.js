$(function() {
	var _w = $.spice.getWindowWidth();
	// 换图 + 懒加载
	$.spice.lazyLoad('img[lazysrc]', {
		attr: 'lazysrc'
	});
	$.spice.tools.changeImageSrc({
		callBack: function(img, self) {
			$.spice.lazyLoad('img[lazysrc]', {
				attr: self.opt.lazyData,
				prestrain: 1
			});
		}
	});

	// var _wH = $(window).innerHeight(),
	// 	_hH = $('.header-fixed').height();
	// $('.article-banner-content').css('min-height',(_wH-_hH))

	/*轮播*/
	var swiperKv = new Swiper('.swiper-container-kv', {
		loop: false,
		autoplay: false,
		autoplayDisableOnInteraction: false,
		speed:500,
		slidesPerView : 1,
		spaceBetween : 0,
		observer: true,
		observeParents: true,
		nextButton: '.next-btn',
		prevButton: '.prev-btn',
		autoHeight: true,
		pagination : '.swiper-pagination',
		paginationClickable :true,
	});
	$('.article-banner-content').on('tap','.banner-btn',function(e) {
        e.preventDefault();
        var headerTop = $('.header-fixed').innerHeight(),
            articleKv = $('.article-kv').offset().top;
        if(_w > 1024){
			//$('html,body').animate({scrollTop:(articleKv-headerTop)},800)
			$('html,body').animate({scrollTop:(articleKv)},800)
        }else{
            $('html,body').animate({scrollTop:(articleKv)},800)
        }
	})
	$('.swiper-container-kv .swiper-slide').each(function (index, el) {
		$(el).on('tap','.kv-img .e-link-1',function(e) {
            e.preventDefault();
            var headerTop = $('.header-fixed').innerHeight(),
                kvCon = $('.kv-content').offset().top;
            if(_w > 1024){
				//$('html,body').animate({scrollTop:(kvCon-headerTop)},800)
				$('html,body').animate({scrollTop:(kvCon)},800)
            }else{
                $('html,body').animate({scrollTop:(kvCon)},800)
            }
		})
		$(el).on('tap','.kv-img .e-link-2',function(e) {
			e.preventDefault();
			$(this).hide().siblings('.kv-img-1').hide().siblings('.kv-img-2').fadeIn(500);
		})
	});

	var summerFlag = false,
		windowTop = 1;
    $(window).on('scroll.summer', function() {
		var scrolls = $(this).scrollTop(),
			wW = $(window).innerHeight(),
			conTop = $('.swiper-container-kv .swiper-slide .kv-content').offset().top;
			if (scrolls !== 0 && (wW+scrolls-150) > conTop && _w > 1024) {
				$('.e-backtop').show();
			}else if (scrolls !== 0 && (wW+scrolls-200) > conTop && _w <= 1024) {
				$('.e-backtop').show();
			}else{
				$('.e-backtop').hide();
			}

			// if (scrolls > windowTop && _w > 1024) {
			// 	windowTop = scrolls;
			// 	if(!summerFlag){
			// 		setTimeout(function() {
			// 			$('html,body').animate({scrollTop:$('.article-kv').offset().top},800);
			// 		},150)
			// 		summerFlag = true;
			// 	}
			// } else {
			// 	windowTop = scrolls;
			// 	if(summerFlag && scrolls <=0){
			// 		summerFlag = false;
			// 	}
			// }

    }).trigger('scroll.summer');

	//回到顶部
	$('.e-backtop').on('tap', function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 500);
	});

});
