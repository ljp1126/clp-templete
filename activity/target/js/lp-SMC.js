$(function () {
    // 换图 + 懒加载
    $.spice.lazyLoad('img[lazysrc]', {
        attr: 'lazysrc'
    });
    $.spice.tools.changeImageSrc({
        callBack: function (img, self) {
            $.spice.lazyLoad('img[lazysrc]', {
                attr: self.opt.lazyData,
                prestrain: 1
            });
        }
    });

    // 视频
    $('.e-lp-video-btn').on('tap', function (e) {
        e.preventDefault();
        var _this = $(this),
            videoCode = _this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

    // 图片hover放大
    $('.article-foot-2 .foot-2-boxfoot-2-box a .foot-2-boxfoot-2-img img').on('mouseenter', function () {
        $(this).css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
        $(this).parent('foot-2-boxfoot-2-img').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' });

    });

    // 图片hover复原
    $('.article-foot-2 .foot-2-boxfoot-2-box a .foot-2-boxfoot-2-img img').on('mouseleave', function () {
        $(this).css({ 'transition': 'none', 'transform': 'none' });
        $(this).parent('foot-2-boxfoot-2-img').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)' });
    }); 

    //轮播
    var swiper1 = new Swiper('.swiper-container-kv', {
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
    //轮播 end

    $(window).on('scroll.headerScrollLP', function() {
        var scrolls = $(this).scrollTop(),
            articlekvHei = $('.article-kv').outerHeight(true);

        if (scrolls > articlekvHei / 2 ) {
            $('.size-box').css({
                'opacity': '1',
                'top': '0'
            })
        } 
    }).trigger('scroll.headerScrollLP');

});
