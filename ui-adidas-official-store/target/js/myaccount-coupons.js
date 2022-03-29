
$(function(){
	$('.coupons-nav-top li').on('tap',function(){
		var iIndex = $(this).index();
		$(this).addClass("is-active").siblings("li").removeClass("is-active");
		$(".coupons-item-box").find(".coupons-item-cont").eq(iIndex).removeClass("none").siblings('.coupons-item-cont').addClass("none");

	});
	// 使用规则

	$('.events-ues-rule').toggle(function(){
		$(this).parents('li').find('.coupons-use-rule').removeClass('none');
		$(this).find('i').removeClass('icon-coupon-down').addClass('icon-coupon-up');
	},function(){
		$(this).parents('li').find('.coupons-use-rule').addClass('none');
		$('.events-ues-rule').find('i').addClass('icon-coupon-down').removeClass('icon-coupon-up');
	})

	var _w, _h;
	$(window).on('resize.orders', function() {
		_w = $.spice.getWindowWidth();
		_h = $(window).height();
        if (_w < 1025) {
            // 翻页
            // num 可控制提前或者延后加载
            // 默认 loading 图标出现就执行
            var page = 0;
            $.spice.visualArea('.list-loading-wrap', {
                num: -100,
                callBack: function(elem) {
                    ++page;
                    if (page <= 5) {
						
						/*$('.coupons-item-cont').each(function(){
                        	if(!$(this).hasClass('none')){*/
		                    	/*加载模板*/
		                        var template = $('#product-template').html(),
		                            html = '';
		                        for (var i = 0; i < 5; i++) {
		                            html += template;
		                        };

	                    		/*目前未使用、已使用、已过期都加载同一个模板
								  后端自行区分不同状态的模板加载*/
		                        $('.coupons-item-cont .coupons-item-ul').append(html);
		                        //$(this).find('.coupons-item-ul').append(html);
	                        	
	                        
	                        	$('.list-loading-wrap').show();
	                     /*   }
                        });*/
                    } else {
                        //隐藏loading图标
                        $('.list-loading-wrap').hide();
                    }
                }
            });
        }

	}).trigger('resize.orders');

});


