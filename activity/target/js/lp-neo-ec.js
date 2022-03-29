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
    
    /*轮播*/
    var mySwiper = new Swiper('.swiper-container-kv', {
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        nextButton: '.next-btn',
        prevButton: '.prev-btn'
    });


});
