$(function () {

		// 首页kv
		var window_w = $(window).width();
		if(window_w>1024){
			if ($('.events-scroll-kv').data('spice.kvScroll')) {
				$('.events-scroll-kv').data('spice.kvScroll').destroy();
			}
			var flag = true;
			$.spice.kvScroll('.events-scroll-kv', {
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
						var $this = $('.events-scroll-kv').data('spice.kvScroll');
						$this.btnNext.off('tap').on('tap', function(){
			            	$this.scroller($this.curPage+1,300);
			            });
			            $this.btnPrev.off('tap').on('tap', function(){
			            	$this.scroller($this.curPage-1,300);
			            });
			            flag = false;
					}		
				}
			});
		}else{
			if ($('.events-scroll-kv').data('spice.kvScroll')) {
				$('.events-scroll-kv').data('spice.kvScroll').destroy();
			}
			$.spice.kvScroll('.events-scroll-kv', {
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

	//tab切换
	 $('.title-tab>div').click(function() {
        var i = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.con-tab li').eq(i).show().siblings().hide();
    });
});
