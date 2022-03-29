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
    setTimeout(function() {
    	$('.payment-Prompt').fadeOut();
	}, 5000);

	var _w, _h;
	$(window).on('resize.orders', function() {
		_w = $.spice.getWindowWidth();
		_h = $(window).height();

		/*订单列表商品超2个显示个数*/
		$('.product-multiple-list').each(function(){
			var _this = $(this),
				this_length = _this.find('.thumbnail').length;

			if (_w > 1250) {
				if(this_length > 5){
					_this.find('.thumbnail:eq(5)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(4)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
			}else if(_w <= 1250 && _w > 1100){
				if(this_length > 4){
					_this.find('.thumbnail:eq(4)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(3)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
				}
			}else{
				if(this_length > 3){
					_this.find('.thumbnail:eq(3)').prevAll('.thumbnail').removeClass('none');
					_this.find('.thumbnail:eq(2)').nextAll('.thumbnail').addClass('none');
					_this.find('.thumbnail-more').show();
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

	//取消订单弹层
    var cancelOrderDialog = $.spice.dialog({
    	title: '确定取消该订单吗？',
        dialogClass: 'dialog-cancel-order dialog-common-prompt',
        buttons: {
            '确定取消': {
                btnClass: 'btn-blue',
                btnEvent: function(e) {
                    //隐藏弹出层
                    e.data.dialog.hide();
                }
            },
            '暂不取消': {
                btnClass: 'btn-black',
                btnEvent: function(e) {
                    //隐藏弹出层
                    e.data.dialog.hide();
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

    // return-details-checked 提交弹窗
     //提交订单弹层
    var submitordersDialog = $.spice.dialog({
        title: '请确定您填写的退货物流信息',
        content: '<ul id="logistics" class="logistics"><li><label>快递公司：</label><span id="setCompany"></span></li><li><label>快递单号：</label><span id="setNumber"></span></li></ul>',
        dialogClass: 'dialog-return',
        buttons: {
            '确定提交': {
                btnClass: 'btn-blue',
                btnEvent: function(e) {
                    //隐藏弹出层
                    getText();
                    var html = $("#logistics").html();
                    $("#company-box").html(html);
                    $("#discript").hide();
                    $("#form").hide();
                    $("#over-add").removeClass('none');
                    $("#list").addClass('list-bottom');
                    e.data.dialog.hide();
                }
            },
            '返回修改': {
                btnClass: 'btn-black',
                btnEvent: function(e) {
                    //隐藏弹出层
                    e.data.dialog.hide();
                }
            },
            
        }
    });

    function getText() {
        var company = $("#company").text();
        var number = $("#number").val();
        $("#setCompany").text(company);
        $("#setNumber").text(number);
        var html = $("#logistics").html();
        console.log(company,number,html);
    }
    $('.event-submit').on('tap', function() {
         getText();
        submitordersDialog.show();
    });

     //mb退货计量

    $.spice.calculateNum('.e-calculateNum', {
        btnMinus: '.events-minus',
        btnPlus: '.events-plus',
        textInput: '.events-input',
        max: 10,
        min: 0,
        callBack: function(s, o) {
            console.log(s, o)
        }
    });

    //文本域失焦显现
    // $(".placeholder-place").find("textarea").focus(function(){
    //     $(".placeholder-txt").addClass('none');
    // });
    // $(".placeholder-place").find("textarea").blur(function(){
    //     var tt = $(this).val();
    //     if(tt == null||tt == ""||tt == undefined){
    //         $(".placeholder-txt").removeClass('none');
    //     }
    //     else{
    //         $(".placeholder-txt").addClass('none');
    //     }
        
    // });


    //控制出现不同下拉框



    $.spice.dropdown('.events-dropdown1', {
        isIscroll: true,
        tinyscrollbarConfig: {
            wheelLock: true,
            touchLock: false
        },
        showElemTapCallBack: function(s, o) {
            s.addClass('is-active').siblings().removeClass('is-active');
            $(o.opt.dropElem, o.elem).find('span:eq(0)').html(s.find('a').html());
            s.addClass('is-active').siblings().removeClass('is-active');
            
            if(s.index() == 0){
                $(".returns-select-box").find(".returns-select-line").eq(1).removeClass('none');
            }
            if(s.index() == 5){
                $(".cancel-order-description").addClass('none').eq(1).removeClass('none');
            }
            else{
                $(".cancel-order-description").addClass('none').eq(0).removeClass('none');
            }
            
        }
    });

    //下拉框初始化

    $.spice.dropdown('.events-returns-num', {
         isIscroll: true,
        tinyscrollbarConfig: {
            wheelLock: true,
            touchLock: false
        },
        showElemTapCallBack: function(s, o) {
            s.addClass('is-active').siblings().removeClass('is-active');
            $(o.opt.dropElem, o.elem).find('span:eq(0)').html(s.find('a').html());
        }

    });


    $.spice.dropdown('.events-dropdown2', {
        isIscroll: true,
        tinyscrollbarConfig: {
            wheelLock: true,
            touchLock: false
        },
        showElemTapCallBack: function(s, o) {
            s.addClass('is-active').siblings().removeClass('is-active');
            $(o.opt.dropElem, o.elem).find('span:eq(0)').html(s.find('a').html());
        }
    });



    //退单流程tap切换
    /*$(".progressbar").find(".progress-item").on("tap",function(){
        var iIndex = $(this).index();
        $(this).siblings().removeClass("current");
        $(this).addClass("current");

        $(".return-details-box").find(".return-details-cont").addClass("none");
        $(".return-details-box").find(".return-details-cont").eq(iIndex).removeClass("none");
        var lastObj = $(".return-details-box").find(".return-details-cont:last");
        if(!lastObj.hasClass("none")){
            $(".footer-order-price").find(".point-total").removeClass("none");
        }else{
            $(".footer-order-price").find(".point-total").addClass("none")
        }
    })*/

    // 评价数字
    $.spice.MessageLimit('.cancel-order-description',{
        recordClass: 'events-MessageRecord'
        , maxCount: 100
        , isCounter: false
        , isCutoff: true
        , keyUpCheck: false
        , blurCheck: true
        , isFullwidth: true
    });



})
