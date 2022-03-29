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

	/*轮播*/
	var mySwiper = new Swiper('.swiper-container-kv', {
		loop: true,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		speed:500,
		slidesPerView : 1,
		spaceBetween : 0,
		observer: true,
		observeParents: true,
		nextButton: '.next-btn',
		prevButton: '.prev-btn'
	});
	$(".swiper-container-kv").mouseenter(function() {
		mySwiper.stopAutoplay();
	}).mouseleave(function() {
		mySwiper.startAutoplay();
	});

	var banner1 = new Swiper('.swiper-container-banner-1', {
		loop: false,
		autoplay: false,
		autoplayDisableOnInteraction: false,
		speed:500,
		slidesPerView : 1,
		spaceBetween : 0,
		observer: true,
		observeParents: true,
		nextButton: '.next-btn',
		prevButton: '.prev-btn',
		pagination : '.swiper-pagination',
		paginationClickable :true,
	});

});
