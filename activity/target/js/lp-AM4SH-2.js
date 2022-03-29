$(function () {
    // 换图 + 懒加载
    $.spice.lazyLoad('img[lazysrc]', {
        attr: 'lazysrc'
    });
    $.spice.tools.changeImageSrc({
        callBack: function (img, self) {
            $.spice.lazyLoad('img[lazysrc]', {
                attr: self.opt.lazyData,
                prestrain: 1
            });
        }
    });

    // 视频
    $('.e-lp-video-btn').on('tap', function (e) {
        e.preventDefault();
        var _this = $(this),
            videoCode = _this.data('videoCode');

        openVideo(videoCode, 'true');
    });
    // 视频 end

    //点击tab 1
    $('.article-tab a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text');
        if (_thisData == '06'){
            return false;
        }
        $('.article-tab a').children('div:first-child').css({ 'display': 'block' });
        $('.article-tab a').children('div:last-child').css({ 'display': 'none' });
        _this.children('div:first-child').css({'display':'none'});
        _this.children('div:last-child').css({'display': 'block'});
        $('.ganged-' + _thisData).css('display', 'block').siblings().css('display', 'none')
    })

    //点击tab 2
    $('.step-box-content a').on('tap', function () {
        var _this = $(this),
            _thisData = _this.data('text');
        $('.step-box-content a').children('div:first-child').css({ 'display': 'block' });
        $('.step-box-content a').children('div:last-child').css({ 'display': 'none' });
        _this.children('div:first-child').css({ 'display': 'none' });
        _this.children('div:last-child').css({ 'display': 'block' });
        $('.step-' + _thisData).css('display', 'block').siblings().css('display', 'none')
    })

    // 图片hover放大
    $('.ganged-detail-one div img,.ganged-detail-two div img,.ganged-detail-three div img').on('mouseenter', function () {
        $(this).css({ 'transition': 'transform 7.5s linear', 'transform': 'scale(1.3)' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(180deg)' })
    });

    // 图片hover复原
    $('.ganged-detail-one div img,.ganged-detail-two div img,.ganged-detail-three div img').on('mouseleave', function () {
        $(this).css({ 'transition': 'none', 'transform': 'none' });
        $(this).parent().parent().find('i').css({ 'transition': 'transform 1s linear', 'transform': 'rotate(-180deg)' });
    }); 

    //点击滚动到底部
    $('.btn-blue').on('tap', function(){
        $('html,body').animate({
            'scrollTop': $(".article-foot").offset().top
        }, 600)
    })
    $('.foot-btn').on('tap', function () {
        $(".foot-box-size-red").removeClass('none');
        $(this).css({
            'cursor': 'not-allowed',
            'background-color': '#888888'
        })
    })
});
