$(function(){
	var addcarDialog = $.spice.dialog({
        template: $('#my-exchange-dialog').html(),
        dialogClass: 'my-exchange-dialog',
        initEvent: function(e) {}
    });
    $('.events-here').on('tap', function(e) {
        e.preventDefault();
        addcarDialog.show();
    });
})
