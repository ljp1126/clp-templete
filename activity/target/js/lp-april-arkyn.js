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

	// 倒计时
	$('.e-countdown').countdown('2018/03/27 14:00:00', function(event) {
		var totalHours = '%H';
		if (event.offset.totalDays > 0) {
			totalHours = event.offset.totalDays * 24 + event.offset.hours;
		}

		var $this = $(this).html(event.strftime('\
			<span>'+ totalHours +'</span>\
			<span class="divider">HOURS</span>\
			<span>%M</span>\
			<span class="divider">MIN</span>\
			<span>%S</span>\
			<span class="divider">SEC</span>\
		'));
	});


});
