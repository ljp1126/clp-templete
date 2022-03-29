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

    // 视频
        $('.e-lp-video-btn').on('tap', function(e) {
            e.preventDefault();
            var _this = $(this),
                videoCode =_this.data('videoCode');

            openVideo(videoCode, 'true');
        });
    // 视频 end

    var $parallaxScrollingElem = $('.e-parallax-img');

    $(window).on('scroll.parallaxScrolling', function () {
        if ($.spice.getWindowWidth() <= 1024) return;
        var _scrollTop = $(window).scrollTop(),
            _winH = $(window).height(),
            subH = _scrollTop + _winH;

        //叠加图片视差滚动效果
        $parallaxScrollingElem.each(function (index, element) {
            var eleTop = $(element).offset().top;
            if (subH > eleTop && _scrollTop < eleTop + 100) {
                if (!$(element).data('opacity')) {
                    $(element).addClass('active');
                    $(element).data('opacity', 1)
                } 
                var objParams = $(element).data('speed'),
                    speed = objParams.speed,
                    dis = subH - eleTop,
                    tran = dis * speed / 10,
                    positionDirection = objParams.positionDirection,
                    movementDirection = objParams.movementDirection;

                if (movementDirection == 'reverse') {
                    tran = -tran;
                }

                if (positionDirection == 'vertical') {
                    $(element).css({
                        transform: 'translateY(' + tran + 'px)'
                    });
                } else if (positionDirection == 'horizontal') {
                    $(element).css({
                        transform: 'translateX(' + tran + 'px)'
                    });
                }
            }
        });

    }).trigger('scroll.parallaxScrolling');


});
