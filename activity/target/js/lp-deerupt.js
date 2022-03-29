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

    //轮播
    var swiper1 = new Swiper('.events-scroll-loopm', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoPlay: true,
        loop: true,
        noSwiping: true,
        speed: 2000,
        autoplay: 3000,
        autoplayDisableOnInteraction: false

    });

});
