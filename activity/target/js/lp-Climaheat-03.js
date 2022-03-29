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

    // 视频
    $('.e-lp-video-btn').on('tap', function(e) {
        e.preventDefault();
        var _this = $(this),
            videoCode =_this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

    //轮播
    var swiper1 = new Swiper('.swiper-container-kv', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoPlay: true,
        loop: true,
        noSwiping: true,
        speed: 2000,
        autoplay: 2000,
        autoplayDisableOnInteraction: false
    });

    // 图片hover放大
    $('.events-scale img').on('mouseenter', function() {
        $(this).css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
    });

    // 图片hover复原
    $('.events-scale img').on('mouseleave', function() {
        $(this).css({ 'transition': 'none', 'transform': 'none'});
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)'});
    }); 


    // 图片hover放大  底部
    $('.grieshoch-box a').on('mouseenter', function () {
        $(this).children('img').css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
        console.log(1)
    });
    // 图片hover复原 底部
    $('.grieshoch-box a').on('mouseleave', function () {
        $(this).children('img').css({ 'transition': 'none', 'transform': 'none' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)' });
    });

});
