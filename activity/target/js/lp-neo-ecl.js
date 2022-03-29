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
    
    //模块四轮播
    let mySwiper2 = new Swiper('.swiper-container1', {
        autoplay: 5000,//可选选项，自动滑动
        loop: true,
        fade: {
            crossFade: true,
        },
        effect: 'fade',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        pagination: '.pagination',
        paginationClickable: true,
        paginationType: 'custom',
        paginationCustomRender: function (swiper, current, total) {
            $('.swiper-p4 .pagination').find('span').eq(current - 1).addClass('pagination-active').siblings().removeClass('pagination-active')
        },
        onInit: function (swiper) {
            $('.swiper-p4 .pagination').find('span').on('tap', function () {
                let _index = $(this).index() + 1;
                swiper.slideTo(_index);
            })
        }
    });


    // 模块四点击执行函数

    let changeColor = (num) => {
        if (num == 1) {
            $('.smallTx > a').removeClass('is-hide');
            $('.smallTx > a:nth-child(2n)').addClass('is-hide');
        } else if (num == 2) {

            $('.smallTx > a').removeClass('is-hide');
            $('.smallTx > a:nth-child(2n-1)').addClass('is-hide');
        }
    }

    // 初始执行num =1
    changeColor(1);

    //模块四点击颜色切换
    $('.colorDot').on('click', function () {
        let num = $(this).parent().find('span').index(this) + 1;
        $(this).addClass('color-active').siblings().removeClass('color-active');
        changeColor(num);
    })

    var swiper1 = new Swiper('.swiper-container-kv', {
        slidesPerView: 'auto',
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev2',
        nextButton: '.swiper-button-next2',
        initialSlide: 1,
        autoplay: 3000,
        loop: true,
        breakpoints: {
            1024: {
                // slidesPerGroup: mobShowNum,
                speed: 300
            }
        }

    });
    $.spice.tools.changeImageSrc({
        callBack: function (img, self) {
            $.spice.lazyLoad('img[lazysrc]', {
                attr: self.opt.lazyData,
                prestrain: 1
            });
        }
    });
    var swiper2 = new Swiper('.swiper-container-kv-02', {
        slidesPerView: 'auto',
        autoplay: 3000,
        pagination: '.swiper-pagination',
    });
});
