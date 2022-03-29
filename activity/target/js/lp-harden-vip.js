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
        // speed: 2000,
        autoplay: 3000,
        loop: true,
    });



    var swiper2 = new Swiper('.swiper-container-kv2', {
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        preventClicks: false,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev3',
        nextButton: '.swiper-button-next3',
        initialSlide: 0,
        debugger: false,
        // speed: 2000,
        autoplay: 3000,
        loop: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="swiper-pagination-bullet"><img class="img-content" src="https://img.adidas.com.cn/resources/activePage/JUN/hardenmvp/img-pc-14-' + index +'new.png"></span>'
        },
        onInit: function (swiper) {
            if (swiper.activeIndex == 0) {
                $('.swiper-button-prev3').hide();
                $('.swiper-button-next3').addClass('swiper-button-next-am');
            }
        },
        // onSlideChangeEnd: function (swiper) {
        //     if ($.spice.getWindowWidth() < 1024) {
        //         if (swiper.activeIndex > 1) {
        //             $('.text').css({ 'left': '0' })
        //         } else {
        //             $('.text').css({ 'left': '100%' })
        //         }
        //         if (swiper.activeIndex == ($('.article-swiper-swift2 .swiper-slide').length - 1)) {
        //             $('.e-btn-rignt').removeClass('none');
        //         } else {
        //             $('.e-btn-rignt').addClass('none');
        //         }
        //     } else {
        //         $('.text').css({ 'left': '0' })
        //     }
        //     if (swiper.activeIndex == 0) {
        //         $('.swiper-button-prev3').hide();
        //         $('.swiper-button-next3').addClass('swiper-button-next-am');
        //     } else {
        //         $('.swiper-button-next3').removeClass('swiper-button-next-am');
        //         $('.swiper-button-prev3').show();
        //     }
        //     if (swiper.activeIndex == ($('.article-swiper-swift2 .swiper-slide').length - 1)) {
        //         $('.swiper-button-next3').hide();
        //     } else {
        //         $('.swiper-button-next3').show();
        //     }
        // }
    });
    //轮播  end

    var fingerpost = $.spice.dialog({
        template: $('#women-shoe-fingerpost').html(),
        dialogClass: 'fingerpost-winning-box',
        maskClose: true,
        initEvent: function (e) {
            var dialog = e.data.dialog;
            $('.icon-close', dialog.elem).on('tap', function () {
                dialog.hide();
            });
        }
    });


    fingerpost.elem.on('dialog.show-before', function () {
        $.spice.tools.changeImageSrc();
    })
    $('.e-pup-cent').on('tap', function (event) {
        fingerpost.show(function () {
            setTimeout(function () {
                $('.fingerpost-winning-box').data('iScroll') && $('.fingerpost-winning-box').data('iScroll').destroy();
                $('.fingerpost-winning-box .dialog-scroll-wrap').removeAttr('style');
                $('.fingerpost-winning-box').css('touch-action', 'auto');
                $('.overflow-hidden').css({
                    'height': 100 + '%'
                })
            }, 0);
        });
    })
    // 画热区
    // window.hotSpot = $.posHotSpot('', { extandClass: 'link', prefixClass: 'link-' });
    // hotSpot.css = function () {
    //     hotSpot.savePartCss()
    // };
    // hotSpot.html = function () {
    //     hotSpot.savePartHtml()
    // };


});
