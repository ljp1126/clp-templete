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
    if ($.spice.getWindowWidth() < 1024) {
        var swiper1 = new Swiper('.swiper-container-od-jacket', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            prevButton: '.swiper-button-prev1',
            nextButton: '.swiper-button-next1',
            slidesPerGroup: 2,
            initialSlide: 0,
            breakpoints: {
                1024: {
                    slidesPerGroup: 2
                }
            }
        });
    }

   
});
