$(function(){

	//规则
	var ruleDialog = $.spice.dialog({
		template: $('#rule-dialog').html(),
		dialogClass: 'rule-dialog',
		initEvent: function(e) {
			var dialog = e.data.dialog;
			$('.dialog-close', dialog.elem).on('tap', function() {
				dialog.hide();
			});
		}
	});
	$('.e-btn-rule').on('tap',function(){
		ruleDialog.show();
	});

	//投票
	var mySwiper = new Swiper('.swiper-container-vote', {
		scrollbarHide: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		grabCursor: true,
		centeredSlides: false,
		slideToClickedSlide: false,
		//initialSlide : 4,
	});
	$('.swiper-container-vote .swiper-slide').on('tap',function(){
		$(this).addClass('is-active').siblings().removeClass('is-active');
	});

	if($(window).width() > 1024){
		$('.swiper-container-vote .swiper-slide').on('mouseenter', function() {
			$(this).addClass('is-active').siblings().removeClass('is-active');
		}).on('mouseleave', function() {});
	}

})
