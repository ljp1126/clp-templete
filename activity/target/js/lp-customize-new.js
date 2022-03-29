$(function () {
	//tab切换
	 $('.title-tab>div').on('tap',function() {
        var _index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.con-tab >div','.pc-tab-content').eq(_index).addClass('show').siblings().removeClass('show');

        if($(window).width() < 1025){
        	var $this = $(this)
			  , li_index = $this.index()
			  , prev_index = $this.parent('title-tab').find('.is-active').index();

			$this.addClass('is-active').siblings('div').removeClass('is-active');
			$this.parents('.tab-swiper-container').find('.swiper-pagination span:eq('+ li_index +')').trigger('click');
        }
    });

	var swiperFlag = true;
	$(window).on('resize.swiper', function(){
		if($(window).width() < 1025){
			if(swiperFlag){
				/*轮播*/
				if (!$('.tab-swiper-container').data('bud-swiper')) {
					mySwiper($('.tab-swiper-container'));
				}
				$('.tab-swiper-container .swiper-pagination span:eq(1)').trigger('click');
				swiperFlag = false;
			}
		}else{
			$('.tab-swiper-container .swiper-pagination span:eq(1)').trigger('click');
			var data = $('.tab-swiper-container').data('bud-swiper');
			if (data) {
				data.destroy(true, true);
				$('.tab-swiper-container').removeData('bud-swiper');
			}
			swiperFlag = true;
		}
	}).trigger("resize.swiper");

	//视频
	$('.video-btn').on('tap', function(e) {
        e.preventDefault();
        openVideo('4A992F6EAE307D809C33DC5901307461','true');
    });

	//轮播
	$.spice.kvScroll('.events-customize-carousel', {
		type: 'scroll-loop',
		btn: false,
		autoPlay: true,
		loop: true,
		time: 5000,
		easing: 500,
		dot: {
			style: 'dot'
		}
	});

	$('.branner-item-box ul li').on('mouseenter',function(){
		if($(window).width() > 1024){
			$(this).removeClass('hover-style').siblings('li').addClass('hover-style');
		}
	}).live('mouseleave', function() {
		$('.branner-item-box ul li').removeClass('hover-style');
	});

	$('.customize-info-box .btn-weixin').on('mouseenter', function() {
		if($(window).width() > 1024){
			$(this).siblings('.wechat-code-box').stop(true, true).fadeIn(300);
		}
	}).on('mouseleave', function() {
		$('.customize-info-box .btn-weixin').siblings('.wechat-code-box').stop(true, true).fadeOut(300);
	});

});

function mySwiper(i) {
	var mySwiper = new Swiper(i, {
			pagination: '.swiper-pagination',
			slidesPerView: 'auto',
			paginationClickable: true,
			grabCursor: true,
			centeredSlides: true,
			onSlideChangeEnd: function(swiper){
				$('.tab-swiper-container .title-tab .swiper-slide').removeClass('is-active select');
				$('.tab-swiper-container .title-tab .swiper-slide:eq('+ swiper.activeIndex +')').addClass('is-active select');
		    	$('.con-tab > div:eq('+ swiper.activeIndex +')').addClass('show').siblings('div').removeClass('show');
		    }
		});
	$(i).data('bud-swiper', mySwiper);
}