$(function(){
	
		$(window).on('scroll.trainingTab', function() {
			var _windowScroll = $(window).scrollTop(),
				_trainingMainTop = $('.training-july-main').offset().top;
			if(_windowScroll > _trainingMainTop){
				$('.training-july-tab').addClass('is-active');
			}else{
				$('.training-july-tab').removeClass('is-active');
			}
		}).trigger('scroll.trainingTab');
		
		$('.training-july-tab li').on('tap', function(){
			var _this = $(this),
				_thisIndex = _this.index();
			$("html,body").animate({scrollTop:$('.training-july-main .training-july-content li.is-active .july-img-02').offset().top - $('.training-july-tab').height() - $('.header').height()},1000);
			_this.addClass('is-active').siblings('li').removeClass('is-active');
			$('.training-july-content > li:eq('+_thisIndex+')').addClass('is-active').siblings('li').removeClass('is-active');
			$('.training-july-content > li').find('.july-video .video-content').html('');
			var videoContent = $('.training-july-content > li:eq('+_thisIndex+')').find('.july-video .video-content'),
				videoSrc = $('.training-july-content > li:eq('+_thisIndex+')').find('.july-video input').val();
				setTimeout(function() {
					videoContent.append('<script src="https://p.bokecc.com/player?vid='+videoSrc+'&siteid=6293AC06BFB87D25&autoStart=true&playerid=36764A827EC1263B&playertype=1"></script>');
				},1000);
		});
		
		/*$('.video-content').on('tap', function(){
			$('video', this)[0].play();
		});*/
	
})
