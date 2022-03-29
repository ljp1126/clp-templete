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

    $('.tab-content li').on('tap',function(){
        var target = $(this).attr('data-sign');
            $(this).addClass('is-active').siblings().removeClass('is-active')
            target_height = $('#' + target).offset().top-20;
        $("html,body").animate({scrollTop: target_height}, 500);
    })

        var swiper1 = new Swiper('.swiper-container', {
            slidesPerView : 4.5,
            spaceBetween: 30,
            loop : true,
            loopAdditionalSlid:1,
            breakpoints: {
                1024: {
                  slidesPerView : 1.5,
                  loopAdditionalSlid:1,
                }
            }
        });


});
