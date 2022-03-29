$(function(){
	$('.e-lpw-video').on('tap', function(e) {
        e.preventDefault();
        openVideo('972235E851DDFB3E9C33DC5901307461','true');
    });

    $(".e-show-ercode").on('tap', function(e) {
        e.preventDefault();
        $(".ercode-showbox").addClass('showbox')
    });

    $(".e-close-ercode").on('tap', function(e) {
        e.preventDefault();
        $(".ercode-showbox").removeClass('showbox')
    });

    // if($(".ercode-showbox").hasClass('showbox')){
    // 	$(document.body).not('.ercode-showbox').on('tap', function(e) {
	   //      e.preventDefault();
	   //      $(".ercode-showbox").removeClass('showbox')
	   //  });
    // }

    

})