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

    //轮播
    var swiper = new Swiper('.swiper-container-od-jacket', {
		loop: true,
        centeredSlides: true,
        prevButton: '.swiper-button-prev1',
        nextButton: '.swiper-button-next1',
    });
    //轮播 end

});
