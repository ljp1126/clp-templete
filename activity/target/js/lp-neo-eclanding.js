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
			videoCode = _this.data('videoCode');

		openVideo(videoCode, 'true');
	});
	// 视频 end


	//轮播
	var swiper1 = new Swiper('.swiper-container-kv-01', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		preventClicks: false
	});
	var swiper2 = new Swiper('.swiper-container-kv-02', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination2',
		paginationClickable: true,
		preventClicks: false

	});
	var swiper3 = new Swiper('.swiper-container-kv-03', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination3',
		paginationClickable: true,
		preventClicks: false
	});
	var swiper4 = new Swiper('.swiper-container-kv-04', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination4',
		paginationClickable: true,
		preventClicks: false

	});
	var swiper5 = new Swiper('.swiper-container-kv-05', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination5',
		paginationClickable: true,
		preventClicks: false
	});
	var swiper6 = new Swiper('.swiper-container-kv-06', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination6',
		paginationClickable: true,
		preventClicks: false

	});
	var swiper7 = new Swiper('.swiper-container-kv-07', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination7',
		paginationClickable: true,
		preventClicks: false
	});
	var swiper8 = new Swiper('.swiper-container-kv-08', {
		slidesPerView: 'auto',
		autoplay: 3000,
		pagination: '.swiper-pagination8',
		paginationClickable: true,
		preventClicks: false

	});
});
