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

	// 抽奖弹层
	var LpDialog = $.spice.dialog({
        template: $('#draw-step-qx').html(),
        dialogClass: 'qx-winning-box',
        maskClose : false,
        initEvent: function(e) {}
    });

    
    LpDialog.elem.on('dialog.show-before', function () {
        $.spice.tools.changeImageSrc();
    })

    LpDialog.show();

    $('.click-hour').on('tap', function(){
        // $('.qx-winning').hide();
        LpDialog.hide();
    })
});
