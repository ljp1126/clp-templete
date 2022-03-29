$(function() {
	// 第一个轮播
	// $.spice.kvScroll('.events-scroll-loop1', {
	// 	type: 'scroll-loop', 
	// 	autoPlay: true, 
	// 	loop: true
	// });
	// 第二个轮播
	// $.spice.kvScroll('.events-scroll-loop2', {
	// 	type: 'scroll-loop', 
	// 	autoPlay: true, 
	// 	loop: true
	// });
	// 第三个轮播
	// $.spice.kvScroll('.events-scroll-loop3', {
	// 	type: 'scroll-loop', 
	// 	autoPlay: true, 
	// 	loop: true
	// });
	// 第四个轮播
	var mySwiper = new Swiper('.swiper-container', {
		loop: false,
	    pagination: '.swiper-pagination',
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    slidesPerView : 'auto',
	    slidesPerGroup : 4,
		paginationClickable :true,
		breakpoints: {
			1024: {
				slidesPerGroup: 2,
				speed: 300
			}
		}
	})

	$('.pw-stan-play').on('tap', function(e) {
        e.preventDefault();
        openVideo('76246A6A9110D6D29C33DC5901307461','true');
    });
})