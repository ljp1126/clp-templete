
$(function () {

    //确认非本人提示
    var notOneselfDialog = $.spice.dialog({
        template: $('#first-login-template').html(),
        dialogClass: 'notoneself-box',
        maskClose : false,
        initEvent: function(e) {
            var dialog = e.data.dialog;
            $('.events-not-oneself ').on('tap',function(){
               notOneselfDialog.hide();
            })
            $('.events-not-reset').on('tap',function(){
                notOneselfDialog.hide();
                $('.ziliao').hide();
                $('.notne-show').show();
            })
        }
    });
    $('.not-me').on('tap',function(){
         notOneselfDialog.show();
    });

});
