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

    //视频轮播
    var swiper = new Swiper('.swiper-container-od-jacket', {
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: 2000,
        speed: 2000,
        loop: true,
        paginationClickable: true,
        pagination: '.swiper-pagination',
        spaceBetween: 92,
        prevButton: '.swiper-button-prev1',
        nextButton: '.swiper-button-next1',
        initialSlide: 0,
    });
    var swiper2 = new Swiper('.swiper-container-od-jacket-2', {
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: 2000,
        speed: 2000,
        loop: true,
        paginationClickable: true,
        pagination: '.swiper-pagination1',
        spaceBetween: 92,
        prevButton: '.swiper-button-prev11',
        nextButton: '.swiper-button-next11',
        initialSlide: 0,
        paginationBulletRender: function (swiper, index, className) {
            var arrList = ['SOLARBOOST 男子', 'SOLARBOOST 女子', 'UltraBOOST 女子', 'UltraBOOST 中性'];
            return '<span class="swiper-pagination-bullet">' + arrList[index] + '</span>'
        }
    });
    if ($.spice.getWindowWidth() < 1024) {
        $('.swiper-container-od-jacket-2 .swiper-slide').removeAttr('style');
    }

    //吸顶点击
    $('.ceiling-box a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text'),
            $articleMap = $('.article-btns-' + _thisData),
            articleMapOffsetTop = Math.floor($articleMap.offset().top),
            windowscroll = $(window).scrollTop(),
            differences = 0;
        if (windowscroll > articleMapOffsetTop) {
            differences = 71 + 80
        } else {
            differences = 71;
        }
        console.log(differences)
        $('html,body').animate({
            'scrollTop': articleMapOffsetTop - differences
        }, 600)
    })

    //吸顶
    var windowTop = 0;
    $(window).on('scroll.worldCupScroll', function () {
        var $scrollTop = $(this).scrollTop(),
            headerBannerboxH = 0,
            $article = $('.article-ceiling'),
            $articleTop = $article.offset().top,
            articleHei = $('.article-ceiling').outerHeight(true),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            articlebtns02 = $('.article-btns-02'),
            articlebtns02Top = articlebtns02.offset().top,
            articlebtns04 = $('.article-btns-04'),
            articlebtns04Top = articlebtns04.offset().top,
            articlebtns06 = $('.article-btns-06'),
            articlebtns06Top = articlebtns06.offset().top,
            articlefoot = $('.article-foot'),
            articlefootTop = articlefoot.offset().top;
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true);
        } else {
            headerBannerboxH = 0;
        }
        if ($scrollTop > articlebtns02Top - 150){
            $('.ceiling-box-06').removeClass('text-decorations');
            $('.ceiling-box-04').removeClass('text-decorations');
            $('.ceiling-box-02').addClass('text-decorations');
        } 
        if ($scrollTop > articlebtns04Top - 150){
            $('.ceiling-box-06').removeClass('text-decorations');
            $('.ceiling-box-02').removeClass('text-decorations');
            $('.ceiling-box-04').addClass('text-decorations');
        }
        if($scrollTop > articlebtns06Top - 150){
            $('.ceiling-box-04').removeClass('text-decorations');
            $('.ceiling-box-02').removeClass('text-decorations');
            $('.ceiling-box-06').addClass('text-decorations');
        }
        // if ($scrollTop > $articleTop + articleHei && $scrollTop < article08Top + article08Hei - 150) {
        if ($scrollTop > $articleTop + articleHei && $scrollTop < articlefootTop) {
            $('.ceiling-b').addClass('article-fixed');
            if ($scrollTop >= windowTop) {
                windowTop = $scrollTop;
                $('.ceiling-b').animate({ top: 0 }, 0);
            } else {
                windowTop = $scrollTop;
                $('.ceiling-b').animate({ top: (headerH + headerBannerboxH) }, 0);
            }
        } else {
            $('.ceiling-b').removeClass('article-fixed').removeAttr('style');
        }

    }).trigger('scroll.worldCupScroll');
    
});
