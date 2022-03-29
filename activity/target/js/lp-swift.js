$(function(){
	
	var windowW = $.spice.getWindowWidth();
	if(windowW >= 1024){
		$('.icon-a').hover(function(){
			var _thisGoodsInfo = $('.icon-goods-info', this);
			// 判断当前元素有无settimeout
			if(_thisGoodsInfo.data('delayTime')){
				clearTimeout(_thisGoodsInfo.data('delayTime'));
				_thisGoodsInfo.removeData('delayTime');
			}
			_thisGoodsInfo.addClass('is-hover');
		},function(){
			var _thisGoodsInfo = $('.icon-goods-info', this),
				delayTime = {};
			delayTime = setTimeout(function(){
				_thisGoodsInfo.removeClass('is-hover');
			}, 600);
			// 将当前settimeout事件存在当前元素data上
			_thisGoodsInfo.data('delayTime', delayTime);
		});
	}
	
	// 轮播一
    var swiper = new Swiper('.swiper-container-swift', {
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 64,
	    prevButton:'.swiper-button-prev1',
	    nextButton:'.swiper-button-next1',
	    initialSlide: 0
        
    });
    
	// 轮播二
    var swiper = new Swiper('.swiper-container-double', {
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        paginationClickable: true,
	    prevButton:'.swiper-button-prev1',
	    nextButton:'.swiper-button-next1',
	    initialSlide: 0
        
    });
    
	// 轮播二 child
    var swiper = new Swiper('.swiper-container-child', {
        pagination: '.swiper-pagination-child',
        slidesPerView: 'auto',
        loop: true,
        nested: true,
        centeredSlides: true,
        paginationClickable: true,
	    initialSlide: 0
        
    });
	
})
