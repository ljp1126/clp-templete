$(function() {
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
    
    $('.size-boxs a').on('tap', function() {
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top),
            windowscroll = $(window).scrollTop(),
            differences = 0,
            headerBannerboxHs = 0;
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxHs = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxHs = 0;
        }
        if (windowscroll > articleMapOffsetTop){
            differences = 50 + 100 + headerBannerboxHs
        }else{ 
            differences = 50 + headerBannerboxHs
        }
        $('html,body').animate({
            'scrollTop': articleMapOffsetTop - differences
        }, 600)
    })


        //滚动
    var windowTop = 0;
    $(window).on('scroll.worldCupScroll', function () {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-size'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-size').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            article08Hei = $('.article-woman-btn').outerHeight(true),
            $article08Top = $('.article-woman-btn'),
            article08Top = $article08Top.offset().top;

        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > $articleTop + articleHei - 270 && $scrollTop < article08Top + article08Hei - 150) {
            $('.size-boxs').addClass('article-fixed');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                $('.size-boxs').animate({ top: 0}, 0);
            } else {
                windowTop = $scrollTop;
                $('.size-boxs').animate({ top: (headerH + headerBannerboxH)},0)
            }
        } else {
            $('.size-boxs').removeClass('article-fixed').removeAttr('style');
        }
        
    }).trigger('scroll.worldCupScroll');

});
