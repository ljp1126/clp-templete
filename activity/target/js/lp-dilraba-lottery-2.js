$(function () {
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
});
