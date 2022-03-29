$(function(){
	var windowW = $.spice.getWindowWidth()
		, windowH = $(window).height();
	//帮助中心下拉
	$('.help-nav-items label').on('click',function(){
		var _this=$(this),
			_li = _this.parent('li'),
			_sibli = _li.siblings('li');
			_li.addClass('is-active'),
			windowW=$(window).width();
		if(windowW>1024){
			_li.find('.help-tab').toggleClass('help-tab-show');
			_sibli.removeClass('is-active');
			_sibli.find('.help-tab').removeClass('help-tab-show');
		}else{
			_li.addClass('is-active');
			_li.find('.help-tab').toggleClass('help-tab-show');
			_this.find('.iconright-box i').toggleClass('icon-arrow-up');
			_sibli.removeClass('is-active');
			_sibli.find('.help-tab').removeClass('help-tab-show');
			_sibli.find('.iconright-box i').removeClass('icon-arrow-up');
		}

	})
	//搜索内容模拟
	$('#search-input').keydown(function(){
		var _this=$(this);
		_this.parents('.dropdown').children('.sub-menu').show();
		$.spice.tinyscrollbar('.events-tinyscroll-y', {
	        isIscroll: true,
	        tinyscrollbarConfig: {
	            wheelLock: true,
	            touchLock: false
	        },
	        callBack: function( o ){}
	    });
	})
	$('#search-input').blur(function(){
		var _this=$(this);
		_this.parents('.dropdown').children('.sub-menu').hide();
	})
	//表格左右滚动效果
	var IScrollFlag = false;
	$(window).on('resize.faqSize', function() {
		var _w = $.spice.getWindowWidth();
		if (_w <= 1024) {
			 if ($('.events-parameter-iscroll .scroller-wrap').length) {
                $('.events-parameter-iscroll .scroller-wrap').each(function(index, el) {
                    new IScroll(el, {
                        preventDefault: false,
                        scrollX: true,
                        scrollY: false,
                        scrollbars: true,
                        preventDefaultException: {
                            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|IMG|P|I)$/
                        }
                    });

                });
            }
			IScrollFlag = true
		} else {
			IScrollFlag = false
		}
	}).trigger('resize.faqSize')
	//mob退后流程弹窗
	$('.envens-img-enlarge').on('tap',function(){
		retrunGoodsDialog.show();
		var dialogW=$('.reture-goods').width();
		$('.events-par-iscroll .scroller-wrap').css('width',dialogW)
		if ($('.events-par-iscroll .scroller-wrap').length) {
			$('.events-par-iscroll .scroller-wrap').each(function(index, el) {
				new IScroll(el, {
					preventDefault: false,
					scrollX: true,
					scrollY: false,
					scrollbars: true,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV|SPAN|IMG|P|I)$/
					}
				});

			});
		}
	})
	var retrunGoodsDialog = $.spice.dialog({
		template: $('#reture-goods').html(),
        dialogClass: 'reture-goods',
    });
    // 参数高度统一
    function paremeterTdH(){
    	// alert(2)
		$('.express-table-title table tr').each(function(index, el) {
		    var lefttdH = $(el).find('td').removeAttr('style').eq(index).outerHeight(true)
		        , righttdH = $('.express-table-mob-cont table tr').eq( index ).find('td').removeAttr('style').eq(0).outerHeight()
		        , maxH = Math.max( lefttdH, righttdH );
	         $('.express-table-mob-cont table tr').eq( index ).find('td').height( maxH );
	        $(el).find('td').height( maxH );

		});
	}
	 paremeterTdH();

})
