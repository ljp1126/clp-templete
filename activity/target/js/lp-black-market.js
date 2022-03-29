$(function() {
    // 换图 + 懒加载
    $.spice.lazyLoad('img[lazysrc]', {
        attr: 'lazysrc'
    });
    $.spice.tools.changeImageSrc({
        callBack: function(img, self) {
            $.spice.lazyLoad('img[lazysrc]', {
                attr: self.opt.lazyData,
                prestrain: 1
            });
        }
    });


    // 公告淡入淡出
        setTimeout(function () {
            $('.e-notice-box').addClass('fadeOut');
        }, 5000);

        var noticeTimer = null;
        $('.e-notice-box').on('mouseenter', function () {
            if($.spice.getWindowWidth() > 1024){
                $('.e-notice-box').removeClass('fadeOut');
            }
        }).on('mouseleave', function () {
            if($.spice.getWindowWidth() > 1024){
                noticeTimer && clearTimeout(noticeTimer);
                noticeTimer = setTimeout(function () {
                    $('.e-notice-box').addClass('fadeOut');
                }, 0);
            }
        })
    // 公告淡入淡出 end


    // 视频
        $('.e-lp-video-btn').on('tap', function(e) {
            e.preventDefault();
            var _this = $(this),
                videoCode =_this.data('videoCode');

            openVideo(videoCode, 'true');
        });
    // 视频 end


    // 倒计时
	function timer(intDiff) {
		window.setInterval(function() {
			var day = 0,
				hour = 0,
				minute = 0,
                second = 0;

			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (hour <= 9) hour = '0' + hour;
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;

            var dateH = hour.toString(),
                dateM = minute.toString(),
                dateS = second.toString();

            $('.e-countdown').html('\
                <span>'+ dateH[0] +'</span>\
                <span>'+ dateH[1] +'</span>\
                <span class="divider">:</span>\
                <span>'+ dateM[0] +'</span>\
                <span>'+ dateM[1] +'</span>\
                <span class="divider">:</span>\
                <span>'+ dateS[0] +'</span>\
                <span>'+ dateS[1] +'</span>\
            ');

			intDiff--;
            // console.log(intDiff);
        }, 1000);

    }

    if (true) {
        // 传入秒
      //  timer(3600);
    }

    // 抢购成功页面
       /* if( $('.e-type-string').length > 0 ){
            // 打字效果
            var typewriter = new Typewriter($('.e-type-string')[0], {
                cursor: '_',
                strings: true
            });

            typewriter.typeString('Hey，#')
            .pauseFor(2500)
            .typeString('在 underground 的世界#')
            .pauseFor(1500)
            .typeString('\n')
            .typeString('里用 PROPHERE 逆行潮流')
            .start();
        }*/

        var noticeBoxPTimer = null;
        $('.e-notice-btn').on('tap', function () {
            $('.notice-box').removeClass('notice-box-p');
            noticeBoxPTimer && clearTimeout(noticeBoxPTimer);
            noticeBoxPTimer = setTimeout(function () {
                $('.e-notice-box-p').addClass('notice-box-p');
            }, 5000);
        });

        // 切换商品
        $('.e-tab-link').on('tap', function() {
            var _this = $(this),
                dataSrc = _this.data('src'),
                pc = dataSrc.pc,
                mob = dataSrc.mob,
                src = ($.spice.getWindowWidth() > 1024) ? pc : mob,
                $bg = $('.product-page-bg');

            $bg.attr('src', src);
        });

    // 抢购成功页面 end


    // 写入时间
    function getTime(date) {
        var date = date,
            time = {};

        time.year  = date.getFullYear(),
        time.month = date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth(),
        time.day   = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate(),
        time.h     = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours(),
        time.m     = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes(),
        time.s     = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();

        return time;
    }

    setInterval(function () {
        var time = getTime(new Date())
        $('.date-box .top').text(time.h + ':' + time.m + ':' + time.s);
        $('.date-box .bottom').text(time.day + '/' + time.month + '/' + time.year);
    }, 1000)

});
