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
	new Swiper(".article-1 .swiper-container", {
		slidesPerView: "auto",
		loop: true,
		autoplay: 2500,
		autoplayDisableOnInteraction: false,
		prevButton: '.article-1 .prev-btn',
		nextButton: '.article-1 .next-btn'
	})
});