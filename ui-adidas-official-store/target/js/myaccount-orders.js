$(function(){
	/*顶部、订单筛选tab*/
	$('.events-nav-tab ul li').on('tap',function(){
		var index = $(this).index();
		$(this).addClass('is-active').siblings().removeClass('is-active');
		if($(this).parents('.events-nav-tab').hasClass('myaccount-top-nav')){
			$('.my-orders-item-box .events-orders-item').eq(index).show().siblings().hide();
		}
	});

	/*提示支付 显示5秒隐藏*/
    /*setTimeout(function() {
    	$('.payment-Prompt').fadeOut();
	}, 5000);*/

	var _w, _h;
	$(window).on('resize.orders', function() {
		_w = $.spice.getWindowWidth();
		_h = $(window).height();

		/*订单列表商品超2个显示个数*/
		$('.goods-item-info').each(function(){
			var _this = $(this),
				this_length = _this.find('.thumbnail').length;

			if (_w > 1250) {
				if(this_length > 5){
					_this.find('.thumbnail:eq(5)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(4)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
                if(this_length == 5){
                    _this.find('.thumbnail:eq(4)').removeClass('none');
                    _this.find('.thumbnail-more').hide();
                }
			}else if(_w <= 1250 && _w > 1100){
				if(this_length > 4){
					_this.find('.thumbnail:eq(4)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(3)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
                if(this_length == 4){
                    _this.find('.thumbnail:eq(3)').removeClass('none');
                    _this.find('.thumbnail-more').hide();
                }
			}else{
				if(this_length > 3){
					_this.find('.thumbnail:eq(3)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(2)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
                if(this_length < 4){
                    _this.find('.thumbnail-more').hide();
                }
			}
		});

		/*评价带赠品按钮定位*/
		$('.product-show .product-list-item').each(function(){
			if (_w > 1024) {
				if($(this).find('> div').hasClass('gift-product-info')){
					var gift_product_info_H = ($(this).find('.gift-product-info').height()+22)/2;
					$(this).find('.btn-wrapper').css('margin-top',-gift_product_info_H);
				}
			}else{
				$(this).find('.btn-wrapper').removeAttr('style');
			}
		});

	}).trigger('resize.orders');

    var visualFlag = true;
    if ($.spice.getWindowWidth() < 1025) {
        // 翻页
        // num 可控制提前或者延后加载
        // 默认 loading 图标出现就执行
        var page = 0;
        $.spice.visualArea('.list-loading-wrap', {
            num: -100,
            callBack: function(elem) {
                if(!visualFlag) return false;
                ++page;
                if (page <= 5) {
                    var template = $('#product-template').html(),
                        html = '';
                    for (var i = 0; i < 4; i++) {
                        html += template;
                    };
                    $('.events-orders-item .goods-item-box').append(html);

                    //spice.lazyLoad();
                    $('.list-loading-wrap').show();
                } else {
                    //隐藏loading图标
                    visualFlag = false;
                    $('.list-loading-wrap').hide();
                }
            }
        });
    }

	//取消订单弹层
    var cancelOrderDialog = $.spice.dialog({
    	title: '确定取消该订单吗？',
        dialogClass: 'dialog-cancel-order dialog-common-prompt',
        buttons: {
            '暂不取消': {
                btnClass: 'btn-black',
                btnEvent: function(e) {
                    //隐藏弹出层
                    e.data.dialog.hide();
                }
			},
			'确定取消': {
                btnClass: 'btn-blue ',
                btnEvent: function(e) {
                    $(this).addClass('is-disabled');
                     $(this).text("正在取消...")
                    //隐藏弹出层
                    // e.data.dialog.hide();
                }
            }
        }
    });
    $('.events-cancel-order').on('tap', function() {
        cancelOrderDialog.show();
    });

    $('.logistics-btn').toggle(function(){

    	$('.logistics-con').slideDown();
    	$(this).find('p').html('收起物流信息');
    	$(this).find('i').removeClass('icon-logistics-btn-bottom').addClass('icon-logistics-btn-top')
    },function(){
    	$('.logistics-con').slideUp();
    	$(this).find('p').html('展开物流信息');
    	$(this).find('i').removeClass('icon-logistics-btn-top').addClass('icon-logistics-btn-bottom')
    })


   	$('.comment-details-btn').toggle(function(){

    	$(this).prev('.comment-details-con').slideDown();
    	$(this).find('p').html('收起评论详情');
    	$(this).find('i').removeClass('icon-comment-details-btn-bottom').addClass('icon-comment-details-btn-top')
    },function(){
    	$(this).prev('.comment-details-con').slideUp();
    	$(this).find('p').html('展开评论详情');
    	$(this).find('i').removeClass('icon-comment-details-btn-top').addClass('icon-comment-details-btn-bottom')
    })

    $('.reason-cancellation-rder .reason-cancellation-rder-btn').toggle(function(){

    	$(this).siblings().slideDown();
    	$(this).addClass('active');

    	$(this).find('i').removeClass('reason-cancellation-icon-bottom').addClass('reason-cancellation-icon-top')
    },function(){
    	$(this).siblings().slideUp();
    	$(this).removeClass('active');

    	$(this).find('i').removeClass('reason-cancellation-icon-top').addClass('reason-cancellation-icon-bottom')
    })

    //鼠标滑过事件
    $('.reason-cancellation-rder-con p').mouseover(function(){
    	  $('.reason-cancellation-rder .reason-cancellation-rder-btn').removeClass('active');
    	  $(this).addClass('active')
    })
    $('.reason-cancellation-rder-con p').mouseout(function(){
    	  $(this).removeClass('active')
    })

    //点击icon切换
    $('.size .icon').live('click',function(){
    	$(this).addClass('icon-size-circular-active').siblings().removeClass('icon-size-circular-active')
    })

	//点击按钮删除图片
	$('.pic .icon-delete-picture').live('click',function(){
		$(this).parents('li').remove();
	})

    // 星星评价
    $.spice.StarRank('.events-starRank1',{
        rankLen : 5
        ,hasHalf : false

    });

    // 评价数字
    $.spice.MessageLimit('.evaluate',{
        recordClass: 'events-MessageRecord'
        , maxCount: 200
        , isCounter: false
        , isCutoff: true
        , keyUpCheck: false
        , blurCheck: true
    });
    $.spice.MessageLimit('.cancel-order-description',{
        recordClass: 'events-MessageRecord'
        , maxCount: 100
        , isCounter: false
        , isCutoff: true
        , keyUpCheck: false
        , blurCheck: true
    });

    $('.checked-select').on('tap',function(){
        $(this).find('.icon-checked').toggleClass('is-active');
    });

})
