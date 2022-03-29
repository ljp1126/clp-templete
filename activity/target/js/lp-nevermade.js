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

    // 视频
    $('.e-lp-video-btn').on('tap', function(e) {
        e.preventDefault();
        var _this = $(this),
            videoCode =_this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

    //轮播
    if ($.spice.getWindowWidth() > 1024) {
        var galleryThumbs = new Swiper('.swiper-container-od-jacket1', {
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            spaceBetween:96,
            noSwiping: true,
            initialSlide: 1


        });
        var galleryTop = new Swiper('.swiper-container-od-jacket', {
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            pagination: '.swiper-pagination',
            initialSlide: 1,
            prevButton:'.swiper-button-prev1',
            nextButton:'.swiper-button-next1',
            spaceBetween:96,
            noSwiping: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;

        $('.article-swiper-swift .swiper-container-od-jacket1 .swiper-wrapper .swiper-slide').click(function(){
            console.log($(this).index())
            galleryTop.slideTo($(this).index());//切换到第一个slide，速度为1秒
        })
    }else{
        var galleryThumbs = new Swiper('.swiper-container-od-jacket1', {
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 10,
            slidesPerView: 1,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            spaceBetween:25,
            noSwiping: true,
            initialSlide: 1


        });
        var galleryTop = new Swiper('.swiper-container-od-jacket', {
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            pagination: '.swiper-pagination',
            initialSlide: 1,
            prevButton:'.swiper-button-prev1',
            nextButton:'.swiper-button-next1',
            spaceBetween:25,
            noSwiping: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;

        $('.article-swiper-swift .swiper-container-od-jacket1 .swiper-wrapper .swiper-slide').click(function(){
            console.log($(this).index())
            galleryTop.slideTo($(this).index());//切换到第一个slide，速度为1秒
        })
    }

  
    // var swiper = new Swiper('.swiper-container-od-jacket', {
    //     slidesPerView: 'auto',
    //     centeredSlides: true,
    //     paginationClickable: true,
    //     pagination: '.swiper-pagination',
    //     spaceBetween:96,
    //     prevButton:'.swiper-button-prev1',
    //     nextButton:'.swiper-button-next1',
    //     initialSlide: 0,
    //     paginationBulletRender: function (swiper, index, className) {
    //         var arrList = ['9AM','7AM','5AM'];
    //             return '<span class="swiper-pagination-bullet">'+ arrList[index]+'</span>'
    //     }
    // });
});
