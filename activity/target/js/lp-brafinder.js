$(function(){
	w = $.spice.getWindowWidth();
	
	$.spice.kvScroll('.events-scroll-series-item', {
		type: 'scroll'
		, autoPlay: false
		, loop: true
		, dot: {
			style: 'dot'
		}
	});

	$('.scroll-container').on('touchstart touchmove touchend', function(){
		if(w < 768){
			event.stopPropagation();
		}
	});
	
	
	// 展开 收缩
	$('.brafinder-introduce dl dt').on('tap', function(){
		var _this = $(this),
			_nextDd = _this.next('dd'),
			_childIcon = $(this).find('.icon');
		if(_nextDd.is(":visible")){
			_nextDd.slideUp(200);
			_childIcon.removeClass('icon-arrow-down').addClass('icon-arrow-right');
		}else{
			_nextDd.slideDown(200);
			_childIcon.removeClass('icon-arrow-right').addClass('icon-arrow-down');
		}
	});
	$('.brafinder-style-detail dt').on('tap', function(){
		var _this = $(this),
			_nextDd = _this.next('dd'),
			_childIcon = $(this).find('.icon');
		if(w < 768){
			return false;
		}
		if(_nextDd.is(":visible")){
			_nextDd.slideUp(200);
			_childIcon.removeClass('icon-white-down').addClass('icon-white-right');
		}else{
			_nextDd.slideDown(200);
			_childIcon.removeClass('icon-white-right').addClass('icon-white-down');
		}
	});
	
	// 点击滚动
	$('.brafinder-style .brafinder-series-list li').on('tap', function(){
		var _this = $(this),
			_thisIndex = _this.index(),
			_listIndex = _this.closest('.brafinder-series-list').index('.brafinder-series-list'),
			_scorll = $('.brafinder-style-detail dd').eq(_listIndex).find('.article-series-item').eq(_thisIndex),
			_dtHeight = $('.brafinder-style-detail dd').eq(_listIndex).prev('dt').height();
		// 防止_scorll已被隐藏
		if(_scorll.is(":visible")){
			$('html, body').animate({
	            scrollTop: _scorll.offset().top - $('.header-fixed').height() - _dtHeight
	        }, 500);  
		}
	});
	
	
})
