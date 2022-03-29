$(function(){
	// 换图 + 懒加载
	setTimeout(function() {
		$.spice.lazyLoad('img[lazysrc]', {
			attr: 'lazysrc'
		});
	}, 500);
	$.spice.tools.changeImageSrc({
		callBack: function(img, self) {
			$.spice.lazyLoad('img[lazysrc]', {
				attr: self.opt.lazyData,
				prestrain: 1
			});
		}
	});


	//跑马灯
	if($(window).width() > 900) {
		$('.marquee-item-sj').marquee({
			duration: 6000,
			gap: 20,
			delayBeforeStart: 0,
			direction: 'right',
			startVisible: true,
			duplicated: true
		});
	} else {
		$('.marquee-item-sj').marquee({
			duration: 6000,
			gap: 20,
			delayBeforeStart: 0,
			direction: 'right',
			startVisible: true,
			duplicated: true
		});
	}
	//终端
	var browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
			};
		}(),
	}


	// home-page视频
	var loadImgFun_index = function(imgArr, fn) {
	  // 图片加载fun
	  var loadImgLen = 0,
		  errImgLen = 0
	  var imgdefereds = [];
	  $(imgArr).each(function() {
		  var defered = $.Deferred();
		  $(this).on('load', function() {
			  defered.resolve();
			  loadImgLen++
		  }).on('error', function() {
			  defered.resolve();
			  errImgLen++
		  })
		  if (this.complete) setTimeout(function() {
			  defered.resolve();
		  }, 200);
		  imgdefereds.push(defered);
	  })
	  $.when.apply(null, imgdefereds).done(function() {
		  if (fn && $.isFunction(fn)) {
			  fn()
		  }
	  });
	}

	//视频
	$('.e-video').each(function(index, el) {
			$(el).parents('.article').addClass('home-video')
		var  videoCodePC = $('.video-code-pc', el).data('video-code'),
			 videoCodeMob = $('.video-code-mob', el).data('video-code'),
			 videoId = 'home_video_' + index;
			 console.log(videoId);
		// loadImgFun_index($('.video-code img', el), function() {
		// 	// $('.video-content', el).show().css({
		// 	// 	'height': $('.video-code img', el).outerHeight(true)
		// 	// })
		// 	// $('.video-code img', el).css({
		// 	// 	'visibility': 'hidden'
		// 	// })
		// })
		// 开发需要打开此代码---开始
		var bannerVideoIdPc = videoCodePC;
		var bannerVideoIdMob = videoCodeMob;
		var url = base + "/indexCCVideo.json";
		var dataPc = loxia.syncXhrGet(url, {
			'bannerVideoId': bannerVideoIdPc
		});
		var dataMob = loxia.syncXhrGet(url, {
			'bannerVideoId': bannerVideoIdMob
		});
		var videoUrlPc = dataPc.mp4VideoUrl;
		var videoUrlMob = dataMob.mp4VideoUrl;
		// 开发需要打开此代码---结束

		// 下面的videoUrl为前端静态视频地址（静态页面的video路径 ，开发需注释掉）
		// var videoUrlPc = 'https://cm15-c110-2.play.bokecc.com/flvs/ca/QxIQb/uLkdROQyBM-20.mp4?t=1588212196&key=97D5B6873C5843BF4DE6B27D56AED00D&tpl=10';
		var pchtml = '<video class="video" id="' + videoId + '"   webkit-playsinline="true" playsInline="true" muted="true" "><source src="' + videoUrlPc + '" ></source></video>';

		var mobhtml = '<video class="video" id="' + videoId + '"  webkit-playsinline="true" playsInline="true" muted="true" ><source src="' + videoUrlMob + '" ></source></video>';

		$('.video-content-pc', el).html(pchtml);
		$('.video-content-mob', el).html(mobhtml);

		 $(el).parents('.home-video').addClass('is-play')
		 $('#home_video_' + index)[0].play();
		$('#home_video_' + index)[0].addEventListener('canplaythrough', function() {
			console.log('视频准备就绪，开始播放');
			this.play()
		});
		$('#home_video_' + index)[0].addEventListener('ended', function() {
			this.play()
		});

	});

	var windowTop = 0;
	var $homeVideo = $(".home-video"),
		v_offTop = [],
		v_Height = [];
	var getVideoSize = $.spice.throttle(function() {
		v_offTop = [];
		v_Height = [];
		$homeVideo.each(function(index, el) {
			var _this_OT = $(el).offset().top,
				_this_HT = $(el).outerHeight(true);
			v_offTop.push(_this_OT);
			v_Height.push(_this_HT);
		})
	}, 300);
	$(window).on('scroll', function() {
		var _mobVideo = $(".pc-mob-video");
		if (!_mobVideo.length > 0 && $.spice.getWindowWidth() < 768) {
			return;
		}
		var $scrollTop = $(this).scrollTop(),
			headerBannerboxH = 0,
			wH = $(this).outerHeight(true),
			$header = $('.header-fixed'),
			headerH = $header.outerHeight(true);
		getVideoSize();
		if ($(".header-banner-box").hasClass('header-banner-show')) {
			headerBannerboxH = $(".header-banner-box").outerHeight(true);
		} else {
			headerBannerboxH = 0;
		}
		headerH = headerH + headerBannerboxH;

		// // 视频播放
		for (var i = 0; i < $homeVideo.length; i++) {
			if ($scrollTop > (v_offTop[i] - headerBannerboxH - wH) && $scrollTop < (v_offTop[i] + 6 - headerH)) {
				// console.log("第", i, '个视频进入');
				if (!$homeVideo.eq(i).hasClass('is-play')) {
					$homeVideo.eq(i).addClass('is-play').removeClass("is-pause");
					$('#home_video_' + i)[0].play();
					$('#home_video_' + i)[0].addEventListener('canplaythrough', function() {
						console.log('视频准备就绪，开始播放');
						this.play()
					});
					$('#home_video_' + i)[0].addEventListener('ended', function() {
						this.play()
					});
				}
			} else if ($scrollTop > (v_offTop[i] + v_Height[i] - headerH - 24)) {
				// console.log("第", i, '个离开');
				$homeVideo.eq(i).addClass('is-pause').removeClass("is-play");
				$('#home_video_' + i)[0].pause();
			}
		}
		// if ($scrollTop > (articleVideoF_T + articleVideoF_H - headerH - 24)) {
		// 	console.log("视频划过了");
		// } else if ($scrollTop > (articleVideoF_T - headerBannerboxH - wH)) {
		// 	console.log("视频出现了");
		// } else {
		// 	console.log('未出现')
		// }

	}).trigger('scroll');

	// $(".e-play-video").on('tap', function() {
	// 	if ($(this).parents('.article-video').hasClass('video-box2')) {
	// 		$('.article-second .article-video').removeClass('is-play');
	// 	}
	// 	var _parent_article = $(this).parents('.article-video'),
	// 		_video_s = $('.article-video').find('.video'),
	// 		_video = $(this).parents('.article-video').find('.video');
	// 	_parent_article.toggleClass('is-play');
	// 	$(this).parents('.article-video').siblings().removeClass('is-play');
	//
	// 	if (_parent_article.hasClass('is-play')) {
	// 		for (var i = 0; i < _video_s.length; i++) {
	// 			_video_s.eq(i)[0].pause();
	// 		}
	// 		_video[0].play();
	// 		_video[0].addEventListener('ended', function() {
	// 			this.play()
	// 		});
	// 	} else {
	// 		_video[0].pause();
	// 	}
	//
	// });




})
