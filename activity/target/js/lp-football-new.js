$(function(){
	// kv 轮播
	var window_w = $(window).width();
		if(window_w>1024){
			if ($('.events-scroll-football-new-kv').data('spice.kvScroll')) {
				$('.events-scroll-football-new-kv').data('spice.kvScroll').destroy();
			}
			var flag = true;
			$.spice.kvScroll('.events-scroll-football-new-kv', {
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
						var $this = $('.events-scroll-football-new-kv').data('spice.kvScroll');
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
			if ($('.events-scroll-football-new-kv').data('spice.kvScroll')) {
				$('.events-scroll-football-new-kv').data('spice.kvScroll').destroy();
			}
			$.spice.kvScroll('.events-scroll-football-new-kv', {
				type: 'scroll-loop',
				btn: true,
				autoPlay: true,
				loop: true,
				time: 3000,
				easing: 500,
				dot: {
					style: 'dot'
				}
			});
		}
	//主体轮播
	var swiper = new Swiper('.swiper-container-football-new', {
        spaceBetween: 40,
        slidesPerView: 1.4,
        centeredSlides: true,
        slideToClickedSlide: true,
        grabCursor: true,
       	nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
        loop : true,
        loopedSlides :5,
        pagination: '.swiper-pagination',
       	paginationClickable: true,
        swipeHandler: '.swipe-handler',
        breakpoints: {
        	1024: {
        		slidesPerView : 1,
        		spaceBetween: 0,
        		swipeHandler: '',
        	}
        },
        paginationBulletRender: function (swiper, index, className) {
		     var arrList = ['拜仁慕尼黑','曼联','AC米兰','尤文图斯','皇家马德里'];
		      return '<span class="swiper-pagination-bullet">' +
					'<div class="img-box">' +
						'<img src="../static/images/lp-football-new/logo_0'+ (index+1) +'.png" alt="">' +
					'</div>' +
					'<p>'+ arrList[index]+'</p>' +
				'</span>'
		  }
    });
})
