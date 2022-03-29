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

    var $video = $('.mi-ultraboost-xeno-video');

    $video[0] && $video[0].addEventListener('canplaythrough', function() {
        this.play()
    });

    $video[0].addEventListener('ended', function() {
        this.play()
    }, false);

    $('.e-form-checkbox').on('tap', function () {
        var _this = $(this)

        if ($('.icon-checked', _this).hasClass('is-active')) {
            $('.icon-checked', _this).removeClass('is-active');
        }else{
            $('.icon-checked', _this).addClass('is-active');
            $('.e-btn-box').removeClass('is-error')
        }

    })


    $('.e-to-buy').on('tap', function () {
        var _this = $(this),
            $btnBox = _this.parents('.e-btn-box');

        // if (!$('.e-form-checkbox i').hasClass('is-active')) {
        //     $btnBox.addClass('is-error');
        //     return false;
        // }
    })


});
