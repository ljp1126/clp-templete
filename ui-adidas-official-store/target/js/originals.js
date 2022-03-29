$(function(){
	var window_w = $(window).width();
	if(window_w>1024){
		if ($('.events-scroll-kv-originals').data('spice.kvScroll')) {
			$('.events-scroll-kv-originals').data('spice.kvScroll').destroy();
		}
		var flag = true;
		$.spice.kvScroll('.events-scroll-kv-originals', {
			type: 'scroll-loop',
			btn: true,
			autoPlay: true,
			loop: true,
			time: 3000,
			easing: 2500,
			dot: {
				style: 'dot'
			},
			callBack:function(){
				if(flag){
					var $this = $('.events-scroll-kv-originals').data('spice.kvScroll');
					$this.btnNext.off('tap').on('tap', function(){
		            	$this.scroller($this.curPage+1,300);
		            });
		            $this.btnPrev.off('tap').on('tap', function(){
		            	$this.scroller($this.curPage-1,300);
		            });
		            $this.dotsA.off('tap').on('tap', function(){
		            	$this.scroller($(this).index() + 1,300);
		            });
		            flag = false;
				}
			}
		});
	}else{
		if ($('.events-scroll-kv-originals').data('spice.kvScroll')) {
			$('.events-scroll-kv-originals').data('spice.kvScroll').destroy();
		}
		$.spice.kvScroll('.events-scroll-kv-originals', {
			type: 'scroll-loop',
			btn: true,
			autoPlay: true,
			loop: true,
			time: 3000,
			easing: 500,
			dot: {
				style: 'dot'
			},
			callBack:function(){}
		});
	}
	
		//輪播	
			var swiper = new Swiper('.event-swiper-img', {
			loop: true,
			slidesPerView: 3,
			paginationClickable: true,
			observer: true,
			observeParents: true,
			spaceBetween: 5,
			centeredSlides: true,
			pagination: '.swiper-pagination',
			initialSlide :0,
			slidesPerView: 'auto',
			autoplay : false,
			prevButton:'.swiper-button-prev1',
			nextButton:'.swiper-button-next1',
		})
})
