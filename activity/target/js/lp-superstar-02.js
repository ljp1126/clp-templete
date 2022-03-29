$(function() {
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
  var swiper = new Swiper('.swiper-container-kv', {
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: '5%',
    pagination: '.swiper-pagination-one',
    paginationClickable: true,
    autoplay: 3000
  });
});
