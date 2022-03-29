$(function() {
	// 换图 + 懒加载
	setTimeout(function() {
		$.spice.lazyLoad('img[lazysrc]', {
			attr: 'lazysrc'
		});
	}, 500);
})