$(function(){
    // 視頻播放
	var mySwiper1 = new Swiper('.events-swiper-neo', {
		loop: true,
		slidesPerView : 1,
		spaceBetween : 0,
		paginationClickable: true,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});
	
})