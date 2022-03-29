
$(function(){
	//列表地图tap切换
	$(".listmap-toggle-place li").on("tap",function(){
		var iindex = $(this).index();
		$(this).siblings().removeClass("is-active");
		$(this).addClass("is-active");

		$(".sfcont-right-cont").find(".map-list-box").addClass("none");
		$(".sfcont-right-cont").find(".map-list-box").eq(iindex).removeClass("none");

		if($(".ic-type-map").parents("li").hasClass('is-active')){
			$(".map-hide-place").addClass("none");
		}else{
			$(".map-hide-place").removeClass("none");
		}

	})


	//店铺类型选中
	$(".store-search-type dd").on("tap",function(){
		var iobj = $(this).find(".icon-checked");
		if(iobj.hasClass("is-active")){
			iobj.removeClass("is-active");
		}else{
			iobj.addClass("is-active");
		}
	})

	//page size页码统一
	$(".page-size-place .page-num").on("tap",function(){
		$(".page-size-place").find(".page-num").removeClass("is-active");
		var iindex = $(this).index();
		// alert(iindex);

		$(".page-size-place").each(function(){
			$(this).find("span").eq(iindex).addClass("is-active");
		});

	})

 
	//省市联动
	//pc端省市联动
	$.spice.citySelect(".sfpc-select-city", {
		btnClass: '.events-city-text',
		contentClass: '.events-city-content',
		defaultText: ['请选择省份或地区', '请选择城市'],
		defaultDataStart: 1,
		isIscroll: true,
		tinyscrollbarConfig: {
			wheelLock: true,
			touchLock: false
		},
		callBack: function(val, elem) {
			var iprovince = val[0].split('-')[1];
			var icity = val[1].split('-')[1];
			var str = '区域：';
			if(iprovince!='请选择省份或地区'){
				icity = (icity=="请选择城市")?"":icity;
				var alltxt = iprovince+" "+icity;
				if($('.store-search-crumbs dd label:contains('+str+')').length){

					var _thisP = $('.store-search-crumbs dd label:contains('+str+')');				
					_thisP.parents("dd").find("span").text(alltxt);

				}else{
				
					$('.store-search-crumbs').append('<dd>\
											<i class="icon icon-clear"></i>\
											<label>区域：</label><span>'+alltxt+'</span></dd>');

				}
					
				

			}else{
				$('.store-search-crumbs dd label:contains('+ str +')').parents("dd").remove();
			}
			
		}
	});

	//mb端省市联动
	$.spice.citySelect(".sfmb-select-city", {
		defaultText: ['请选择省份或地区', '请选择城市'],
		defaultDataStart: 1,
		isIscroll: true,
		tinyscrollbarConfig: {
			wheelLock: true,
			touchLock: false
		},
		callBack: function(val, elem) {
			var iprovince = val[0].split('-')[1];
			var icity = val[1].split('-')[1];
			var str = '区域：';
			if(iprovince!='请选择省份或地区'){
				icity = (icity=="请选择城市")?"":icity;
				var alltxt = iprovince+" "+icity;
				if($('.store-search-crumbs dd label:contains('+str+')').length){

					var _thisP = $('.store-search-crumbs dd label:contains('+str+')');				
					_thisP.parents("dd").find("span").text(alltxt);

				}else{
				
					$('.store-search-crumbs').append('<dd>\
											<i class="icon icon-clear"></i>\
											<label>区域：</label><span>'+alltxt+'</span></dd>');

				}
					
				

			}else{
				$('.store-search-crumbs dd label:contains('+ str +')').parents("dd").remove();
			}
			
		}
		
	});


    //面包屑的选中显示


   // $('.e-select-city').data('spice.citySelect').getSelectVal();



    $('.store-search-type dd').live('tap', function() {
		var _this = $(this),
			_thisHasActive = _this.find(".icon-checked").hasClass('is-active'),
			_thisP = _this.parents('.store-search-type'),
			_dtTxt = _thisP.find("dt").text(),
			_thisTxt = _this.find("span").text();


		if ($('.store-search-crumbs').hasClass('none')) {
			$('.store-search-crumbs').removeClass('none');
			$('.store-search-crumbs').fadeIn(300);
		}


		if (_thisHasActive) {

			$('.store-search-crumbs').append('<dd>\
										<i class="icon icon-clear"></i>\
										<label>'+_dtTxt+'：</label><span>'+_thisTxt+'</span></dd>');
		}else{
			$('.store-search-crumbs dd span:contains('+ _thisTxt +')').parents('dd').fadeOut('300', function() {
				$(this).remove();
				if ($('.store-search-crumbs dd').length === 0) {
					$('.store-search-crumbs').addClass('none');
					$(this).find('dd').remove();
				}
			});

		}
	});

	//门店失焦面包屑
	$(".store-search-condition input[type='text']").blur(function(){
		// alert(2);
		var _thisTxt = $(this).val();
		_thisTxt = _thisTxt.replace(/\s+/g, ' ');//合并多个空格为一个
		var str = '门店地址/门店：';
		if(_thisTxt != ""){//空字符串有个bug||_thisTxt!=" "
				// alert(2)
			if($('.store-search-crumbs dd label:contains('+str+')')){
				var _thisP = $('.store-search-crumbs dd label:contains('+str+')');
				_thisP.parents("dd").find("span").text(_thisTxt);
			}else{
				$('.store-search-crumbs').append('<dd>\
										<i class="icon icon-clear"></i>\
										<label>门店名称或门店地址：</label><span>'+_thisTxt+'</span></dd>');

			}
			
		}else{
			// alert(1)
			$('.store-search-crumbs dd label:contains('+ str +')').parents("dd").remove();

		}
	});



	// 面包屑清除全部
	$('.store-search-crumbs span').on('tap', function() {
		$('.store-search-type dd .icon-checked').removeClass('is-active');

		$('.store-search-crumbs').fadeOut('300', function() {
			$('.store-search-crumbs dd').remove();
			$(this).addClass('none');
		});
	});

	//面包屑小叉叉清空
	$(".store-search-crumbs dd .icon-clear").live('tap', function() {

			var _thisText = $(this).parents("dd").find("span").text();
			$(this).parents('dd').fadeOut('300', function() {
				$(this).remove();
				$('.store-search-type dd span:contains('+ _thisText +')').parent("dd").find(".icon-checked").removeClass('is-active');
			});
		if ($('.store-search-crumbs dd').length === 1) {
				$('.store-search-crumbs').fadeOut('300', function() {
					$(this).addClass('none');
					$('.store-search-crumbs dd').remove();
				});
			}

	});

	// 微信显示
	$(document).on('mouseenter','.events-spice-standard .share-wechat a', function() {
		$(this).siblings('.wechat-code-box').stop(true, true).fadeIn(300);
	}).on('mouseleave','.events-spice-standard .share-wechat a',function() {
		$(this).siblings('.wechat-code-box').stop(true, true).fadeOut(300);
	});

	//mobile显示loadding
	var _w = $(window).width()
	 if (_w < 1025) {
        // 翻页
        // num 可控制提前或者延后加载
        // 默认 loading 图标出现就执行
        var page = 0;
        $.spice.visualArea('.list-loading-wrap', {
            num: -100,
            callBack: function(elem) {
                ++page;
                if (page <= 2) {

                    var template = $('#store-item-list').html(),
                        html = '';
                    for (var i = 0; i < 1; i++) {
                        html += template;
                    };
                    $('.map-list-box .store-item-box').append(html);

                    //spice.lazyLoad();
                    $('.list-loading-wrap').show();
                } else {
                    //隐藏loading图标
                    $('.list-loading-wrap').hide();
                }
            }
        });
    }

});