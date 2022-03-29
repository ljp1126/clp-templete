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
    
    //视频轮播
    var swiper = new Swiper('.swiper-container-od-jacket', {
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: 2000,
        speed: 2000,
        loop: true,
        paginationClickable: true,
        prevButton: '.swiper-button-prev1',
        nextButton: '.swiper-button-next1',
        initialSlide: 0,
    });
    var swiper = new Swiper('.swiper-container-od-jacket-1', {
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: 2000,
        speed: 2000,
        loop: true,
        paginationClickable: true,
        prevButton: '.swiper-button-prev11',
        nextButton: '.swiper-button-next11',
        initialSlide: 0,
    });
    // var swiper = new Swiper('.swiper-container-od-jacket-2', {
    //     slidesPerView: 'auto',
    //     centeredSlides: true,
    //     autoplay: 2000,
    //     speed: 2000,
    //     loop: true,
    //     paginationClickable: true,
    //     prevButton: '.swiper-button-prev111',
    //     nextButton: '.swiper-button-next111',
    //     initialSlide: 0,
    // });
    if ($.spice.getWindowWidth() > 1024) {
        // 图片hover放大  底部
        $('.hover-box').on('mouseenter', function() {
            $(this).children('img').css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
            $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
            console.log(1)
        });
        // 图片hover复原 底部
        $('.hover-box').on('mouseleave', function() {
            $(this).children('img').css({ 'transition': 'none', 'transform': 'none' });
            $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)' });
        });
    }
    
});
