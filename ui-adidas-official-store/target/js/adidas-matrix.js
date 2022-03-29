$(function(){
	$.spice.kvScroll('.events-final-scroll', {
		type: 'fade',
		btn: false,
		autoPlay: false,
		loop: true,
		dot: {
			style: 'dot'
		},
		callBack: function (o) {
			console.log(o);
			// $('.e-brand li').eq(o-1).addClass('active').siblings().removeClass('active');
			$('.e-brand li:eq(' + o + ')').trigger('tap', true);
		}
		
	});


	$('.e-brand li').on('tap',function(e, flag){
		var  _index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		if(!flag){
			$('.final-scroll .scroll-dots a').eq(_index).trigger('tap');
		}

		return false;
	})

	$('.events-final-scroll li').on('tap', function(){
		$('.events-final-scroll').data('spice.kvScroll').next()
	})

})