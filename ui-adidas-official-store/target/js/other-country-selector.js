$(function(){
	//地区切换
	var windowW = $(window).width();
	$('.region-holder ul li').on('click',function(){
		var _this=$(this),
			_sibli = _this.siblings('li'),
			_lichild =_this.children('.country-group');
		if(windowW>1024){
			_this.addClass('is-active').siblings('li').removeClass('is-active');
			_this.find('.country-group').addClass('is-active');
			_sibli.find('.country-group').removeClass('is-active');
		}else{
			_this.toggleClass('is-active');
			_lichild.toggleClass('is-active');
			_this.find('i').toggleClass('icon-up');
		}

	})
	$(window).resize(function(){
		if(windowW>1024){
			submuenw();
		}
	})
	submuenw();
	function submuenw(){
		var submuenleft = windowW -950;
		$('.country-group').css('left',submuenleft/2);
	}

})
