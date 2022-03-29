$(function() {
    setTimeout(function() {
        $.spice.lazyLoad('img[lazysrc]', {
          attr: 'lazysrc'
        });
      }, 500);
      $.spice.tools.changeImageSrc({
        elem: '.swiper-container img[data-src][data-image]',
        lazyData: 'data-src'
      });
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView : 4.2,//'auto'
        spaceBetween : 20,
    
      })  
})