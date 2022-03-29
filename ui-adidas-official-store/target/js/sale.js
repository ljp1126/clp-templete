$(function () {
	var verificationDialog = $.spice.dialog({
	    template: $('#verification').html()
	    , dialogClass: 'dialog-verification'
	});
	$('.verification-btn').on('tap',function(){
		verificationDialog.show();
	});


});
