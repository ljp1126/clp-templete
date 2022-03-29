$(function () {

		// kv
			$.spice.kvScroll('.events-scroll-school-kv', {
				type: 'scroll-loop',
				btn: true,
				autoPlay: false,
				loop: true,
				time: 3000,
//				easing: 2500,
				dot: {
					style: 'dot'
				},
				callBack:function(x,y){	
					$(y.dots[0]).css({
					    'width': '46px',
					    'left': '73%',
					    'margin-left': '-15px'
					})

				}
			});		
});
