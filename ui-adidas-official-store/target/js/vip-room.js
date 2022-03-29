$(function () {
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
		            $this.dotsA.off('tap').on('tap', function(){
		            	$this.scroller($(this).index() + 1,300);
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

	var _w = '', _h = '';
	//公共响应
	$(window).on('resize.index', function() {
		var _w = $(window).width() + $.spice.getScrollbarWidth();
			_h = $(window).height();
	}).trigger('resize.index');

	/*立即购买按钮弹层*/
	var infoDialog = $.spice.dialog({
	    title: ''
	    , content: '很抱歉，本活动仅向受邀请的adiCLUB会员开放<br/>更多精彩活动，敬请关注！'
	    , dialogClass: 'vip-room-info-dialog'
	    , buttons: {
	    	'确认': {
	    		btnClass: 'btn-blue btn-success'
	    		, btnEvent: function(e){
	    			//隐藏弹出层
	    			e.data.dialog.hide();
	    			$('.event-buy-now,.events-addcart').addClass('is-disabled');
					$('.event-msg-block').addClass('msg-block-show');
	    		}
	    	}
	    }
	});
	$(".event-buy-now").on("tap",function(e){
		e.preventDefault();
		if(!$(this).hasClass('is-disabled')){
			infoDialog.show();
		}
	});

});
