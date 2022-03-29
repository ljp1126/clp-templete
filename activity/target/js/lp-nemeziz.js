$(function() {
	var win_h = $(window).height(), 
		scroll_in,
		con_h1,
		con_h2,
		con_and,
		move_con_up = 0,
		move_con_down = 0,
		speed = .5,
		max_h = 80,
		p = 0,
		t = 0;
	$(window).on('scroll',function() {
		p = $(this).scrollTop();
		scroll_in = $(window).scrollTop();
		con_and = scroll_in + win_h;
		con_h1 = $('.event-part2').offset().top;
		con_h2 = $('.event-part3').offset().top;
		// console.log(con_and, con_h)
		// con_sub = con_and - con_h1;
		
		if(con_and > con_h1) {
			if(t < p) {
				move_con_up += speed
				$('.event-part2-video').css('transform', 'translateY(-'+ move_con_up +'px)');
				$('.event-part2-video').eq(1).css('transform', 'translateY(-'+ move_con_up +'px)');
				if(con_and > con_h2) {
					move_con_down += speed
					$('.event-part3-img').css('transform', 'translateY(-'+ move_con_down +'px)');
					$('.event-part3-img').eq(1).css('transform', 'translateY(-'+ move_con_down +'px)');
				}
			}else {
				move_con_up -= speed
				$('.event-part2-video').css('transform', 'translateY('+ -move_con_up +'px)');
				$('.event-part2-video').eq(1).css('transform', 'translateY('+ -move_con_up +'px)');
				if(con_and > con_h2) {
					move_con_down -= speed
					$('.event-part3-img').css('transform', 'translateY('+ -move_con_down +'px)');
					$('.event-part3-img').eq(1).css('transform', 'translateY('+ -move_con_down +'px)');
				}
			}
			// console.log(speed)
			
		}

		setTimeout(function() { t = p }, 0);
	})

	$('.event-video-ft').on('tap', function(e) {
        e.preventDefault();
        openVideo('C9BFC46F4EF972F29C33DC5901307461','true');
    });

    $('.event-video-jt').on('tap', function(e) {
        e.preventDefault();
        openVideo('CA443A0F4148A1D89C33DC5901307461','true');
    });
});