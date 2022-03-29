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


    var $parallaxScrollingElem = $('.e-animation-box');

    $(window).on('scroll.parallaxScrolling', function() {
        var windowScrollTop = $(window).scrollTop(),
            _winH = window.innerHeight,
            subH = windowScrollTop + _winH,
            $animationBox3 = $('.animation-box-3'),
            animationBox3Top = $animationBox3.offset().top;

        $parallaxScrollingElem.each(function(index, el) {
            var elTop = $('.e-animation-img', el).offset().top;
            if (subH > elTop && windowScrollTop < elTop + $('.e-animation-img', el).outerHeight(true)) {
                $('.e-animation-img', el).parents('.e-animation-box').addClass('is-view');
            }
            
        });
        
        if(subH < animationBox3Top || windowScrollTop > ($animationBox3.outerHeight(true) + animationBox3Top)){
            $parallaxScrollingElem.removeClass('is-view')
        }


    }).trigger('scroll.parallaxScrolling');

});