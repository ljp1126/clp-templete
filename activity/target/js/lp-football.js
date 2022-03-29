$(function(){
	//轮播
	//点击样式
	$('.events-scroll-football-kv .scroll-btn-prev,.events-scroll-football-kv .scroll-btn-next').live('tap', function(event) {
		var topBoxTop=$('.events-scroll-football-kv').offset().top - $('.top-nav').height() - $('.header').height()-2;
		$(window).scrollTop(topBoxTop);
		$('.events-scroll-football-kv .scroller-wrap li:not(.kvScroll-Clone)').find(".shoes").removeClass('frame');
	});
	$.spice.kvScroll('.events-scroll-football-kv', {
		type: 'scroll-loop',
		autoPlay: false,
		loop: true,
		btn: true,
		time: 5000,
		callBack:function(i,j){
			var lis =$('.events-scroll-football-kv .scroller-wrap li:not(.kvScroll-Clone)'),
				thisLi=lis.eq($('.events-scroll-football-kv').data('spice.kvScroll').curPage-1);
			thisLi.find('.shoes').addClass('frame');
		}
	});
	//点击了解更多出现当前商品图
	$("[data-name='learn-more-btn']").on('tap', function(event) {
		$('.learn-more').eq($('.events-scroll-football-kv').data('spice.kvScroll').curPage).addClass('showPro');
		$('body,html').css('overflow','hidden');
	});
	$('.events-close').on('tap',function(){
		$('.learn-more').removeClass('showPro');
		$('body,html').removeAttr('style');
	})
	//顶部固定条
	function topBoxTop() {
		var topBox=$('[data-id="shoes"]'),
			winH=$(window).scrollTop(),
			topBoxTop=topBox.offset().top;
		if(winH>=topBoxTop){
			$('.TopBar').show();
		}else{
			$('.TopBar').hide();
		}
	}
	$('#img-onload').load(function(){
		$(window).scroll(topBoxTop)
	})

	//点击固定条的上下按钮滚动到轮播位置
	$('.events-prev').on('click',function(){
		var topBoxTop=$('.events-scroll-football-kv').offset().top - $('.top-nav').height() - $('.header').height()-2;
		$(window).scrollTop(topBoxTop);
		$('.events-scroll-football-kv .scroll-btn-prev').trigger("tap");
	 	changeIndex();
	})
	$('.events-next').on('click',function(){
		var topBoxTop=$('.events-scroll-football-kv').offset().top - $('.top-nav').height() - $('.header').height()-2;
		$(window).scrollTop(topBoxTop);
		$('.events-scroll-football-kv .scroll-btn-next').trigger("tap");
	 	changeIndex();
	})
	//点击轮播左右按钮切换固定条的内容
	$('.events-scroll-football-kv .scroller-wrap').on('tap', ".scroll-btn-prev", function(event) {
	 	changeIndex();
	});
	$('.events-scroll-football-kv .scroller-wrap').on('tap', ".scroll-btn-next", function(event) {
	 	changeIndex();
	});
	//改变固定条的内容
	function changeIndex (){
		if ($(".scroller-wrap").attr('index') == 1) {
			$(".scroller-wrap").attr("index","0");
	 	} else {
			$(".scroller-wrap").attr("index","1");
	 	}
		var scrollIndex = $(".scroller-wrap").attr('index');
		$(".controls span").hide();
		$(".controls span").eq(scrollIndex).show();
	}
	//替换video的路径
	/*var videoBtn = $(".banner-iterm-video"),
        videoDialog = $("#video").find('source');

	videoBtn.on('tap', function(event) {
		event.preventDefault();
		var videoSrc = $(this).attr("data-url");
		$("#video").attr("src", videoSrc);
	});*/

	//微博微信分享
	if($(window).width()>1024){
		$('.events-icon-active').hover(function() {
			$(this).parents('a').next('div').show();
		}, function() {
			$(this).parents('a').next('div').hide();
		});
	}
})
