$(function(){
	
	// 放大
	// 
	$('.events-scale').on('mouseenter', function() {
		$(this).find('img').css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
		$(this).find('.dia-wh').css({ 'opacity': .3 });
	})

	// 复原
	// 
	$('.events-scale').on('mouseleave', function() {
		$(this).find('img').css({ 'transition': 'none', 'transform': 'none'});
		$(this).find('.dia-wh').css({ 'opacity': 0 });
	})
	
	// 遮罩
	// 
//	$('.action-sports-skate').on('mouseenter', function() {
//		$(this).find('.dia-wh').css({ 'opacity': .3 });
//	})
//
//	$('.action-sports-skate').on('mouseleave', function() {
//		$(this).find('.dia-wh').css({ 'opacity': 0 });
//	})
	
//	日常LP
	$('.e-us-btn a').on('tap',function(){
		var _index = $(this).index();
		$(this).addClass('is-active').siblings().removeClass('is-active');
		$('.e-pw-us>div').eq(_index).addClass('is-active').siblings().removeClass('is-active');
		$('.e-pw-box>div').eq(_index).addClass('is-active').siblings().removeClass('is-active');
		$('.us-bottom>div').eq(_index).addClass('is-active').siblings().removeClass('is-active');
	});
	$('.e-pw-us>div').on('tap',function(){
		var _index = $(this).index();
		$(this).addClass('is-active').siblings().removeClass('is-active');
		$('.e-us-btn a').eq(_index).addClass('is-active').siblings().removeClass('is-active');
		$('.e-pw-box>div').eq(_index).addClass('is-active').siblings().removeClass('is-active');
		$('.us-bottom>div').eq(_index).addClass('is-active').siblings().removeClass('is-active');
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
