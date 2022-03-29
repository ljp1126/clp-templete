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
    var swiper = new Swiper('.swiper-container-od-jacket', {
        slidesPerView: 'auto',
        //					loop: true,
        centeredSlides: true,
        paginationClickable: true,
        pagination: '.swiper-pagination',
        spaceBetween: 96,
        prevButton: '.swiper-button-prev1',
        nextButton: '.swiper-button-next1',
        initialSlide: 0,
        paginationBulletRender: function (swiper, index, className) {
            var arrList = ['RED', 'BLack', 'Blue', 'Green'];
            return '<span class="swiper-pagination-bullet">' + arrList[index] + '</span>'
        }
    });
    //轮播 end

});
