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
    if ($.spice.getWindowWidth() > 1024) {
        $('.img-hover img').on('mouseenter', function () {
            $(this).css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
            $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
        });

        // 图片hover复原
        $('.img-hover img').on('mouseleave', function () {
            $(this).css({ 'transition': 'none', 'transform': 'none' });
            $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)' });
        });
    }
   
});
