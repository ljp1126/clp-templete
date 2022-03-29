$(function(){
	
	var windowW = $.spice.getWindowWidth();
	if(windowW >= 1024){
		$('.icon-img .icon-a').hover(function(){
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
	
})
