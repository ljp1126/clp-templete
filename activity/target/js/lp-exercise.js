
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

    // kv
    var swiper1 = new Swiper('.swiper-container-kv', {
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        preventClicks: false,
        autoplayDisableOnInteraction:false,
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev2',
        nextButton: '.swiper-button-next2',
        initialSlide: 0,
        speed:1000,
        autoplay: 3000,
        loop: true,
    });
    //kv end

    var swiper2 = new Swiper('.swiper-container-kv2', {
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        preventClicks: false,
        pagination: '.swiper-pagination',
        prevButton:'.swiper-button-prev3',
        nextButton:'.swiper-button-next3',
        initialSlide: 0,
        debugger: false,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="swiper-pagination-bullet"><div><img class="none-sm img-fixed-' + index + '" src="../static/images/lp-exercise/btn_00' + (index + 1) + '.png" alt=""><img class="btnh none-sm img-fixed-font-' + index + '" src="../static/images/lp-exercise/btnh_0'+(index+1)+'.png" alt=""><img  class="none block-sm" src="../static/images/lp-exercise/m-btn_00'+(index+1)+'.png" alt=""><img class="btnh none block-sm" src="../static/images/lp-exercise/m-btnh_0'+(index+1)+'.png" alt=""></div></span>'
        },
        onInit: function(swiper){
            if(swiper.activeIndex==0){
                $('.swiper-button-prev3').hide();
                $('.swiper-button-next3').addClass('swiper-button-next-am');
            }
        },
        onSlideChangeEnd:function(swiper){
            if($.spice.getWindowWidth() < 1024){
                if(swiper.activeIndex > 1){
                    $('.text').css({'left':'0'})
                }else{
                    $('.text').css({'left':'100%'})
                }
                if(swiper.activeIndex==($('.article-swiper-swift2 .swiper-slide').length-1)){
                    $('.e-btn-rignt').removeClass('none');
                }else{
                    $('.e-btn-rignt').addClass('none');
                }
            }else{
                $('.text').css({'left':'0'})
            }
            if(swiper.activeIndex==0){
                $('.swiper-button-prev3').hide();
                $('.swiper-button-next3').addClass('swiper-button-next-am');
            }else{
                $('.swiper-button-next3').removeClass('swiper-button-next-am');
                $('.swiper-button-prev3').show();
            }
            if(swiper.activeIndex==($('.article-swiper-swift2 .swiper-slide').length-1)){
                $('.swiper-button-next3').hide();
            }else{
                $('.swiper-button-next3').show();
            }
        }
    });

    $('.e-btn-rignt').on('tap',function(){
        $('#wrapper').addClass('wrapper-show wrapper-list');
        var timr = setInterval(function(){
            $('#wrapper').removeClass('wrapper-hide wrapper-show');
            // $('#wrapper').removeClass('wrapper-show');
            $('.e-btn-rignt').addClass('none');
			$('.e-btn-left').removeClass('none');
			$('.header-fixed').removeAttr('style');
            $('.container').css({ 'padding-top': 60 + 'px' });
            // $('.bottom-text').removeClass("block-sm")
            clearInterval(timr)
        },500)
    })
    $('.e-btn-left').on('tap',function(){
        $('#wrapper').addClass('wrapper-hide');
        var time = setInterval(function(){
            $('#wrapper').removeClass('wrapper-list wrapper-show');
            $('.e-btn-rignt').removeClass('none');
			$('.e-btn-left').addClass('none')
            $('.container').css({ 'padding-top': 0 + 'px' });
            $('.bottom-text').addClass("block-sm")
            clearInterval(time)
        },500)
    })

    // $('#wrapper').addClass('wrapper-show');
    if ($.spice.getWindowWidth() < 1024) {
        $(".swiper-container-kv2").addClass('swiper-no-swiping');
        $(".swiper-button-next").addClass('none');
        $(".header-fixed").css({ 'left': 0 });
        $('.article-kv-c-font').addClass('article-kv-c-font-02');
        $('.container').css({ 'padding-top': 60 + 'px' });
        $('.bottom-text').removeClass('block-sm');
        $('.swiper-container-kv2 .swiper-wrapper>div.block-sm').addClass('swiper-slide');
        //滚动事件
        $(window).on('scroll.headerkv', function () {
            var wScrollTop = $(window).scrollTop(),
                headerH = $('.header-fixed').innerHeight();
            // if (wScrollTop > 20 && !$('.wrapper-top').hasClass('wrapper-list')) {
            if (!$('.wrapper-top').hasClass('wrapper-list')) {
                $(".swiper-container-kv2").removeClass('swiper-no-swiping');
                $(".swiper-button-next").removeClass('none');
                $(".header-fixed").css({ 'left': 100 + '%' })
                $('.container').css({ 'padding-top': 0 })
                $('.article-swiper-swift2').css({ 'padding-bottom': 0 })
                $('.article-kv-c-font').removeClass('article-kv-c-font-02')
                $('.bottom-text').addClass('block-sm');
            }
        }).trigger('scroll.headerkv')
    } else {
        $('.swiper-container-kv2 .swiper-wrapper>div.block-sm').removeClass('swiper-slide');
    }

    $(window).scroll(function () {

        if($('#wrapper').hasClass('wrapper-list')){
            var $eventsTop = $('.wrapper-list .bottom-text');
            var $self = $(this),
			sT = $self.scrollTop();
            $eventsTop[sT+$(window).height() > $eventsTop.offset().top ? 'addClass' : 'removeClass']('bottom-text-top');
            console.log(sT,$eventsTop.position().top,$eventsTop.offset().top)
        }


    }).scroll();

    $(window).on('resize.windowHeight', function () {
    	if($.spice.getWindowWidth() > 1024){
    		$('.article-swiper-swift2').css({
                'height': $(window).height() + 'px' + $(".scrolltop-fix").outerHeight(true)
	        })
    	}else{
    		$('.article-swiper-swift2').css({
	        	'height':''
	        })
    	}
    }).trigger('resize.windowHeight');


    //男女子吸顶
    var windowTopHeaderLPC = 0,
        flag = false;
    $(window).on('scroll.headerScrollLPC', function () {
        var scrolls = $(this).scrollTop(),
            $navPanal = $('.e-video-panal'),
            $header = $('.header-fixed'),
            headerH = $header.outerHeight(true),
            articleCommodity = $('.article-commodity').offset().top + 50,
            articleCommodityH = $('.article-commodity').outerHeight(true),
            // articleWoman = $('.article-woman').offset().top,
            headerBannerboxH = 0;
        if ($(".header-banner-box").hasClass('header-banner-show')) {
            headerBannerboxH = $(".header-banner-box").outerHeight(true)
        } else {
            headerBannerboxH = 0;
        }
        if ($.spice.getWindowWidth() > 1024){
            if (scrolls > articleCommodity && scrolls < articleCommodityH + articleCommodity - 100) {
                $navPanal.addClass('top-btn-content-hei nav-fixed');
                if (scrolls >= windowTopHeaderLPC) {
                    windowTopHeaderLPC = scrolls;
                    if (!flag) {
                        $navPanal.animate({ top: 0 }, 0)
                        flag = true;
                    }
                } else {
                    windowTopHeaderLPC = scrolls;
                    if (flag) {
                        $navPanal.animate({ top: (headerH + headerBannerboxH) }, 0)
                        flag = false;
                    }
                }
            } else {
                $navPanal.removeClass('top-btn-content-hei nav-fixed');
                setTimeout(function () {
                    $navPanal.removeAttr('style');
                }, 10)
            }
        }
        
    }).trigger('scroll.headerScrollLPC');


    $('.e-video-panal .link-f-01').on('tap', function () {
        var commodityMan = $('.article-commodity').offset().top - 50;
        $('html,body').animate({
            'scrollTop': commodityMan
        })
    })

    $('.e-video-panal .link-f-02').on('tap', function () {
        var commodityWoman = $('.article-commodity').offset().top + ($('.article-commodity').outerHeight(true) / 2) - 40;
        $('html,body').animate({
            'scrollTop': commodityWoman
        })
    })


    //吸顶
    // if ($.spice.getWindowWidth() > 1024){
    //     var windowTopHeaderLP = 0
    //     $(window).on('scroll.headerScrollLP', function () {
    //         var scrolls = $(this).scrollTop(),
    //             headerHei = $('.header-fixed').outerHeight(true);
    //             articleKv = $(".article-kv").outerHeight(true),
    //             scrolltopFix = $(".scrolltop-fix").outerHeight(true),
    //             articleSwiper = $(".article-swiper-swift2").outerHeight(true);
    //         if ($(".header-banner-box").hasClass('header-banner-show')) {
    //             headerBannerboxH = $(".header-banner-box").outerHeight(true)
    //         } else {
    //             headerBannerboxH = 0;
    //         }
    //         if (scrolls > headerHei + articleKv + scrolltopFix && scrolls < headerHei + articleKv + articleSwiper) {
    //             $(".small-icon-contianer").addClass('small-icon-contianer-fix');
    //             $(".small-icon-contianer span img").css('height','50px');
    //             $(".img-fixed-0").attr('src', '../static/images/lp-exercise/img-fixed-pc-img-01.png');
    //             $(".img-fixed-1").attr('src', '../static/images/lp-exercise/img-fixed-pc-img-02.png');
    //             $(".img-fixed-2").attr('src', '../static/images/lp-exercise/img-fixed-pc-img-03.png');
    //             $(".img-fixed-3").attr('src', '../static/images/lp-exercise/img-fixed-pc-img-04.png');
    //             $(".img-fixed-font-0").attr('src', '../static/images/lp-exercise/img-fixed-pc-time-01.png');
    //             $(".img-fixed-font-1").attr('src', '../static/images/lp-exercise/img-fixed-pc-time-02.png');
    //             $(".img-fixed-font-2").attr('src', '../static/images/lp-exercise/img-fixed-pc-time-03.png');
    //             $(".img-fixed-font-3").attr('src', '../static/images/lp-exercise/img-fixed-pc-time-04.png');
    //             if (scrolls >= windowTopHeaderLP) {
    //                 windowTopHeaderLP = scrolls;
    //                 $(".small-icon-contianer").css({
    //                         'top': 0
    //                 });
    //             } else {
    //                 windowTopHeaderLP = scrolls;
    //                 $(".small-icon-contianer").css({
    //                     'top': headerBannerboxH + headerHei
    //                 });
    //             }
    //         }else{
    //             $(".small-icon-contianer").removeClass('small-icon-contianer-fix');
    //             $(".small-icon-contianer").css({
    //                 'top': 'inherit'
    //             });
    //             $(".small-icon-contianer span img").removeAttr('style');
    //             $(".img-fixed-0").attr('src', '../static/images/lp-exercise/btn_01.png');
    //             $(".img-fixed-1").attr('src', '../static/images/lp-exercise/btn_02.png');
    //             $(".img-fixed-2").attr('src', '../static/images/lp-exercise/btn_03.png');
    //             $(".img-fixed-3").attr('src', '../static/images/lp-exercise/btn_04.png');
    //             $(".img-fixed-font-0").attr('src', '../static/images/lp-exercise/btnh_01.png');
    //             $(".img-fixed-font-1").attr('src', '../static/images/lp-exercise/btnh_02.png');
    //             $(".img-fixed-font-2").attr('src', '../static/images/lp-exercise/btnh_03.png');
    //             $(".img-fixed-font-3").attr('src', '../static/images/lp-exercise/btnh_04.png');
    //         }
    //     }).trigger('scroll.headerScrollLP');
    // }
    // $(".small-icon-contianer").on('tap', function(){
    //     $('html,body').animate({
    //         'scrollTop': $(".article-swiper-swift2").offset().top + $(".scrolltop-fix").outerHeight(true) - $('.header-fixed').outerHeight(true)
    //     })
    // })
});
