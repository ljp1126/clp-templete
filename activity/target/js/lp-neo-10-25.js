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
    //小轮播 kv
    var swiper1 = new Swiper('.swiper-container-kv-01', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 'auto',
        autoplay: 3000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
    });

    var swiper2 = new Swiper('.swiper-container-kv-02', {
        slidesPerView: 'auto',
        pagination: '.swiper-pagination2',
        paginationClickable: true,
        autoplay: 3000,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-4 .link-02 a').addClass('none');
                $('.article-goods-4 .link-02 .link-03').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-4 .link-02 a').addClass('none');
                $('.article-goods-4 .link-02 .link-03').removeClass('none');
            }else if(swiper.activeIndex == 1){
                $('.article-goods-4 .link-02 a').addClass('none');
                $('.article-goods-4 .link-02 .link-04').removeClass('none');
            }
        },
    });

    var swiper4 = new Swiper('.swiper-container-kv-04', {
        slidesPerView: 'auto',
        autoplay:3000,
        pagination: '.swiper-pagination4',
        paginationClickable: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction:false,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-1 .goods-2-size-link a').addClass('none');
                $('.article-goods-1 .goods-2-size-link .link-1').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-1 .goods-2-size-link a').addClass('none');
                $('.article-goods-1 .goods-2-size-link .link-1').removeClass('none');
            }else{
                $('.article-goods-1 .goods-2-size-link a').addClass('none');
                $('.article-goods-1 .goods-2-size-link .link-2').removeClass('none');
            }
        },
    });
    var swiper5 = new Swiper('.swiper-container-kv-05', {
        slidesPerView: 'auto',
        autoplay:3000,
        pagination: '.swiper-pagination5',
        paginationClickable: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction:false,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-1 .goods-2-size-link a').addClass('none');
                $('.article-goods-1 .goods-2-size-link .link-3').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-1 .goods-2-size-link a').addClass('none');
                $('.article-goods-1 .goods-2-size-link .link-3').removeClass('none');
            }else{
                $('.article-goods-1 .goods-2-size-link a').addClass('none');
                $('.article-goods-1 .goods-2-size-link .link-4').removeClass('none');
            }
        },
    });
    var swiper3 = new Swiper('.swiper-container-kv-03', {
        slidesPerView: 'auto',
        autoplay: 6000,
        pagination: '.swiper-pagination3',
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-02').addClass('none');
                $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-01').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if($('.article-goods-1').hasClass('Scheduling-4')){
                if(swiper.activeIndex == 0){
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-02').addClass('none');
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-01').removeClass('none');
                    swiper4.init();
                    swiper5.stopAutoplay()
                }else if(swiper.activeIndex == 1){
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-02').addClass('none');
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-01').removeClass('none');
                    swiper4.init();
                    swiper5.stopAutoplay()
                }else{
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-01').addClass('none');
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-02').removeClass('none');
                    swiper5.init();
                    swiper4.stopAutoplay()
                }
            }else{
                if(swiper.activeIndex == 0){
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-02').addClass('none');
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-01').removeClass('none');
                    swiper4.init();
                    swiper5.stopAutoplay()
                }else if(swiper.activeIndex == 1){
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-01').addClass('none');
                    $('.goods-2-size-Broadcast-sm .goods-2-size-Broadcast-sm-box-02').removeClass('none');
                    swiper5.init();
                    swiper4.stopAutoplay()
                }
            }
        },
    });

    var swiper9= new Swiper('.swiper-container-kv-07', {
        slidesPerView: 'auto',
        autoplay:3000,
        pagination: '.swiper-pagination7',
        paginationClickable: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-2 .goods-3-size-link a').addClass('none');
                $('.article-goods-2 .goods-3-size-link .link-5').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-2 .goods-3-size-link a').addClass('none');
                $('.article-goods-2 .goods-3-size-link .link-5').removeClass('none');
            }else{
                $('.article-goods-2 .goods-3-size-link a').addClass('none');
                $('.article-goods-2 .goods-3-size-link .link-6').removeClass('none');
            }
        },
    });
    var swiper8 = new Swiper('.swiper-container-kv-08', {
        slidesPerView: 'auto',
        autoplay:3000,
        pagination: '.swiper-pagination8',
        paginationClickable: true,
        observer:true,
        observeParents:true,
        autoplayDisableOnInteraction : false,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-2 .goods-3-size-link a').addClass('none');
                $('.article-goods-2 .goods-3-size-link .link-7').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 0){
                $('.article-goods-2 .goods-3-size-link a').addClass('none');
                $('.article-goods-2 .goods-3-size-link .link-7').removeClass('none');
            }else{
                $('.article-goods-2 .goods-3-size-link a').addClass('none');
                $('.article-goods-2 .goods-3-size-link .link-8').removeClass('none');
            }
        },
    });
    var swiper6 = new Swiper('.swiper-container-kv-06', {
        slidesPerView: 'auto',
        autoplay: 6000,
        pagination: '.swiper-pagination6',
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
        onInit: function(swiper){
            if(swiper.activeIndex == 0){
                $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-04').addClass('none');
                $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-03').removeClass('none');
            }
        },
        onSlideChangeEnd:function(swiper){
            if($('.article-goods-2').hasClass('Scheduling-4')){
                if(swiper.activeIndex == 0){
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-04').addClass('none');
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-03').removeClass('none');
                    swiper9.init();
                    swiper8.stopAutoplay()
                }else if(swiper.activeIndex == 1){
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-04').addClass('none');
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-03').removeClass('none');
                    swiper9.init();
                    swiper8.stopAutoplay()
                }else{
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-03').addClass('none');
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-04').removeClass('none');
                    swiper8.init();
                    swiper9.stopAutoplay()
                }
            }else{
                if(swiper.activeIndex == 0){
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-04').addClass('none');
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-03').removeClass('none');
                    swiper9.init();
                    swiper8.stopAutoplay()
                }
                if(swiper.activeIndex == 1){
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-03').addClass('none');
                    $('.goods-3-size-Broadcast-sm .goods-3-size-Broadcast-sm-box-04').removeClass('none');
                    swiper8.init();
                    swiper9.stopAutoplay()
                }
                
            }
        },
    });

    // 视频
    $('.e-lp-video-btn').on('tap', function(e) {
        e.preventDefault();
        var _this = $(this),
            videoCode =_this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

});
