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

    if ($.spice.getWindowWidth() > 1024) {
        // 图片hover变图
        $('.events-scale a').on('mouseenter', function () {
            $(this).children('.shoe-img-01').css({ 'display': 'none' });
            $(this).children('.shoe-img-02').css({ 'display': 'block' });
        });
        // 图片hover复原
        $('.events-scale a').on('mouseleave', function () {
            $(this).children('.shoe-img-01').css({ 'display': 'block' });
            $(this).children('.shoe-img-02').css({ 'display': 'none' });
        });
    }
    if ($.spice.getWindowWidth() < 1024) {
        $('.events-scale a .shoe-img-02').css({ 'display': 'none' });
    }

    //轮播
    if ($.spice.getWindowWidth() > 1024) {
        var swiper = new Swiper('.swiper-container-od-jacket-2', {
            slidesPerView: 'auto',
            centeredSlides: true,
            autoplay: 2000,
            speed: 2000,
            loop: true,
            spaceBetween: 220,
            prevButton: '.swiper-button-prev11',
            nextButton: '.swiper-button-next11',
            initialSlide: 0,
            onSlideChangeEnd: function (swiper) {
                var activeIndexs = swiper.activeIndex;
                if (activeIndexs == 0 || activeIndexs == 4 || activeIndexs == 8) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-l-01.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-r-01.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-t-01.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-b-01.png");
                } else if (activeIndexs == 1 || activeIndexs == 5 || activeIndexs == 9) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-l-02.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-r-02.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-t-02.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-b-02.png");
                } else if (activeIndexs == 2 || activeIndexs == 6 || activeIndexs == 10) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-l-03.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-r-03.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-t-03.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-b-03.png");
                } else if (activeIndexs == 3 || activeIndexs == 7 || activeIndexs == 11) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-l-04.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-r-04.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-t-04.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-p-b-04.png");
                }
            }
        });
    }else{
        var swiper2 = new Swiper('.swiper-container-od-jacket-2', {
            slidesPerView: 'auto',
            centeredSlides: true,
            autoplay: 2000,
            speed: 2000,
            loop: true,
            spaceBetween: 65,
            prevButton: '.swiper-button-prev11',
            nextButton: '.swiper-button-next11',
            initialSlide: 0,
            onSlideChangeEnd: function (swiper) {
                var activeIndexs = swiper.activeIndex;
                if (activeIndexs == 0 || activeIndexs == 4 || activeIndexs == 8) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-l-01.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-r-01.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-t-01.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-b-01.png");
                } else if (activeIndexs == 1 || activeIndexs == 5 || activeIndexs == 9) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-l-02.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-r-02.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-t-02.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-b-02.png");
                } else if (activeIndexs == 2 || activeIndexs == 6 || activeIndexs == 10) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-l-03.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-r-03.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-t-03.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-b-03.png");
                } else if (activeIndexs == 3 || activeIndexs == 7 || activeIndexs == 11) {
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-prev .icon-action-sports-arrow-l').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-l-04.png)' });
                        $('.article-swiper-swift-2 .swiper-container .action-sports-swiper-btn .swiper-button-next .icon-action-sports-arrow-r').css({ 'background': 'url(https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-r-04.png)' });
                        $('.article-img img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-t-04.png");
                        $('.article-img-02 img').attr("src", "https://img.adidas.com.cn/resources/activePage/SEP/ZNE/img-m-b-04.png");
                }
            }
        });
    }
   
});
