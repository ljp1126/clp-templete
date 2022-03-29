
///////////////common start

// 省、市、区
function spiceCitySelect(citySelectClass,btnClass,contentClass){  
	$.spice.citySelect(citySelectClass, {
		btnClass: btnClass
		, contentClass: contentClass
		, isIscroll: true
		,defaultText: ['请选择', '请选择', '请选择']
		, tinyscrollbarConfig: {
			wheelLock: true,
			touchLock: false
		}
		,callBack: function(val, elem) {
			var iprovince = val[0].split('-')[1];
			var icity = val[1].split('-')[1];
			var iarea = val[2].split('-')[1];
			if(iprovince=="请选择"){
				// $(this)
			}

			console.log(val)    
			console.log(elem);    

			// console.log(val, elem)

			// $.each(val, function(i, v) {
			// 	if (!v.split('-')[0]) {
			// 		setTimeout(function() {
			// 			console.log(i)

			// 			if (i !== 0) {
			// 				$('.col-12-4:eq('+ (i-1) +')', elem).addClass('aaa'+i);
			// 			}
			// 		}, 0)
			// 		return false
			// 	}
			// })

			// if (val.pop().split('-')[0]) {
			// 	console.log('end')
			// 	$('.col-12-4:eq(2)', elem).addClass('a' + 3);
			// }
		}
	});
}

$(function () {

	var moveObj = null;//临时储存list对象。
	var moveObjIndex = -1;//临时储存list对象的下标。
	var newAddbtnTop = "";
	var w_W = $(window).width(),
			w_H = $(window).height();
	var tmpset = $('#ressselect').html(),
		address_list = $('.add-address-list').html();

		templist = $("#linshi-list").html();






	//设置mobile端的地址栏可以滑动删除。
	var w_W = $(window).width();
	if(w_W <= 1024){
			//mb下添加允许手滑的class
			$(".add-address-list").addClass("canslide");
		}
		else{
			$(".add-address-list").removeClass("canslide");
		}
	$(window).resize(function(){
		var w_W = $(window).width();
		if(w_W <= 1024){
			//mb下添加允许手滑的class
			$(".add-address-list").addClass("canslide");
		}
		else{
			$(".add-address-list").removeClass("canslide");
		}
	});


  
	// 游客
	if($('.order-submit-content').hasClass('order-submit-guest-content')){
		// 省、市、区
		spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
	};


	// 复选按钮事件
	//加icon写法 $('.checked-select-con .checked-select .icon-checked').live('tap',function(){
	$('.checked-select-con .checked-select').live('tap',function(){
		$(this).find('.icon-checked').toggleClass('is-active');
		$(this).siblings('.invoice-box').toggleClass('none');
	});

	//取消按钮pc端头部显示
	 $('.add-address-btn .btn').off().live('tap', function (e) {
		e.preventDefault();
		$(".order-title").addClass('none');
		$(".order-title-box .pc-place").removeClass('none');

		$(".mb-place .event-address").removeClass("none");
		$(".mb-place .spantxt").removeClass("none");

		
	});
	//0地址情况下返回
	$('.add-address-btn .event-save-return').off().live('tap', function (e) {
		//没有新增地址的时候出现提示
		var listLen = $(".father-list-box").find(".distribution-list").length;
		if(listLen == 0){
			$(".order-title-tips").removeClass("none");

			$(".address-select-list").hide();
			$('.event-address-box').empty().append(tmpset).show();
			$(".address-form-box .btn-blue").addClass("event-save-new");
			$(".mob-address-list-content").removeClass("block-sm");
			$(".add-address-btn .btn-black").hide();

			
		}
		//mb端无配送地址时候对应显现mb头部底部提示
		if($(".order-title-tips").hasClass("none")){
			$(".mb-place .spantxt").removeClass("none");
		}

		//mb端添加和不给添加对应显现
		if(!$(".mb-place .maxaddress").hasClass("none")){
			$(".mb-place .event-address").addClass("none");
		}else{
			$(".mb-place .event-address").removeClass("none");
		}

		
	});





	// 添加地址
	
		
   
	$('.event-editor,.event-address').off().live('tap', function (e) {
		e.preventDefault();
		

		newAddbtnTop = $(this).scrollTop();

		address_list = $('.add-address-list').html();

		/*隐藏地址列表显示新增地址form*/    
		$('.event-address-select').hide();
		$('.event-address-box').empty().append(tmpset).show();
		$(".mob-address-list-content").addClass("block-sm");
		$(".add-address-btn .btn-black").show();

		$(".order-title-box .pc-place").addClass('none');
		if($(this).hasClass('event-editor')){//编辑按钮入口          
			$(".order-title").removeClass('none').text("编辑收货地址");
			$(".address-form-box .btn-blue").text("更新该地址");
			$(".address-form-box .event-save-return.block-sm.none").text("取消编辑");

			if(!$(".mb-place .maxaddress").hasClass("none")){
				$(".mb-place .event-address").addClass("none");
			}else{
				$(".mb-place .event-address").removeClass("none");
			}

		   
			$(".mb-place .spantxt").removeClass("none");
			$(".mob-address-list-content").find(".mb-list-tit").addClass("none");
		}else{//新增按钮入口    
			$(".order-title-tips").addClass("none");
			$(".order-title").removeClass('none').text("新建收货地址");
			$(".address-form-box .btn-blue").addClass("event-save-new").text("保存该地址");

			$(".mb-place .event-address").addClass("none");
			$(".mb-place .spantxt").addClass("none");

		}

		$(".father-list-box").find(".event-default-address").removeAttr("style");

		

		if(w_W < 1025){
		   

			// $('html,body').css({
			//     'overflow': 'hidden',
			//     'position': 'fixed',
			//     'height': '100' + '%'
			// });

			$("body").scrollTop(0);

			var listnum = $(".father-list-box").find(".distribution-list").length;
			if(listnum == 0){
				$(".mob-address-list-content").removeClass("block-sm");
			}


			/*获取地址列表内容填充mob-address-list*/
			$('.mob-address-list').html(address_list);
			$('.mob-address-list').find('.event-default-address').removeClass('none');
			$(".father-list-box").find(".event-default-address").removeAttr("style");
			
			// mob显示完整地址列表
			// $('.address-full').show();
			// $('.address-form-box .form-group:eq(1)').nextAll().addClass('none');

			/*增加滚动条*/
			/*$('.address-form-content > .viewport').height(w_H);
			if ($('.address-form-content .viewport .overview').height() > w_H) {
				$.spice.tinyscrollbar('.address-form-content', {
					isIscroll: true,
					tinyscrollbarConfig: {
						wheelLock: true,
						touchLock: false
					},
					callBack: function( o ){}
				});
				$('.address-form-content .scrollbar').addClass('scrollbar-show');
			}
		   
			*/
			// 省、市、区
			$.spice.citySelect('.events-city-simulation', {
				defaultText:['请选择','请选择','请选择']
				, isIscroll: true
			});
		}else{
			// 省、市、区
			spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
		}

	});

	//初始判断地址列表的数量以及对应的显示
	var listLen = $(".add-address-list").find(".distribution-list").length;
	if(listLen == 0){
		$(".order-title-tips").removeClass('none');//出现提示添加tips
		$(".order-title-box").find(".event-address").addClass("none");//出现添加按钮
		$(".order-title-box").find(".maxaddress").addClass("none"); //隐藏上限不可点按钮
		$(".order-title-box").find(".mb-place .spantxt").addClass("none"); //隐藏mb已添加文本

		$('.event-address-select').hide();
		$('.event-address-box').empty().append(tmpset).show();
		$(".address-form-box .btn-blue").next(".btn-black").removeClass("block-sm");//隐藏mb取消按钮
		$(".address-form-box .btn-black").addClass("none");//隐藏pc取消按钮
		$(".mob-address-list-content").removeClass("block-sm");//隐藏mb地址列表处
		$(".address-form-box .btn-blue").addClass("event-save-new");//添加保存事件
		if(w_W<=1024){
		// 省、市、区
			$.spice.citySelect('.events-city-simulation', {
				defaultText:['请选择','请选择','请选择']
				, isIscroll: true
			});
		}else{
			// 省、市、区
			spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
		}


	}

	if(listLen == 4){
		$(".order-title-tips").addClass('none');//出现提示添加tips
		$(".order-title-box").find(".event-address").addClass("none");//出现添加按钮
		$(".order-title-box").find(".maxaddress").removeClass("none"); //隐藏上限不可点按钮

	}



	//地址手滑
	var sx = 0,
		mx = 0,
		ex = 0;
	$('.mob-address-list .event-default-address,.canslide .event-default-address')
		.live($.spice.mousedown, function(e) {
			sx = $.spice.getEventXY(e).x;
		})
		.live($.spice.mousemove, function(e) {
			mx = $.spice.getEventXY(e).x;
			if (Math.abs(mx - sx) > 8) e.preventDefault();

		})
		.live($.spice.mouseup, function(e) {
			ex = $.spice.getEventXY(e).x;
			var v = ex - sx;
			if (Math.abs(v) > 30) {
				if (ex - sx > 0) {
					 $(this).animate({left:"0px"});
				} else {
					$(this).siblings().animate({left:"0px"});
					$(this).animate({left:"-80px"});
				}
			}
		});


	// 删除地址
	$('.event-delect').live('tap',function(){
		var _this = $(this);
		moveObj = $(this);
		var pp = $(this).parents('.father-list-box');
		moveObjIndex =  $(this).parents(".event-default-address").index(); 
		sureDelete.show();
		if(w_W<=1024){
			//sureDelete.show();
		}else{
			/*$('.father-list-box').each(function(){
				var _this = $(this);
				_this.find(".event-default-address").eq(moveObjIndex).animate({opacity:0},500,function(){
					var listLen = moveObj.parents('.event-default-address').siblings().length;
					_this.find(".event-default-address").eq(moveObjIndex).remove();

					
					$(".order-title-box").find(".event-address").removeClass("none");//出现添加按钮
					$(".order-title-box").find(".maxaddress").addClass("none"); //隐藏上限不可点按钮

					if(listLen == 0){
						
						$(".order-title-tips").removeClass('none');//出现提示添加tips

						//mb
						$(".order-title-box .mb-place .spantxt").addClass("none");
						$(".order-title-box .event-address").addClass("none");
						
						//先隐藏地址列
						$(".address-select-list").hide();
						$('.event-address-box').empty().append(tmpset).show();
						$(".address-form-box .btn-blue").addClass("event-save-new");
						$(".mob-address-list-content").removeClass("block-sm");
						$(".address-form-box .btn-black").eq(1).removeClass("block-sm");//0地址mb去掉取消按钮
						$(".add-address-btn .btn-black").hide();
						if(w_W<=1024){
						// 省、市、区
							$.spice.citySelect('.events-city-simulation', {
								defaultText:['请选择','请选择','请选择']
								, isIscroll: true
							});
						}else{
							// 省、市、区
							spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
						}


					}

					//默认地址规则
					var iactive = $(".father-list-box").find(".is-active").length;
					if(iactive == 0){
						 $(".father-list-box").each(function(){
							$(this).find(".distribution-list").eq(0).addClass("is-active");
						 });

					}


				});

			});*/

		}
		

		  

	})

		//确认删除弹层
	var sureDelete = $.spice.dialog({
		title: '确定删除该地址吗？',
		dialogClass: 'dialog-del',
		buttons: {
			'确定删除': {
				btnClass: 'btn-blue',
				btnEvent: function(e) {
					//隐藏弹出层
					e.data.dialog.hide(function(){
						//联动删除
						$('.father-list-box').each(function(){
							var _this = $(this);
							_this.find(".event-default-address").eq(moveObjIndex).animate({opacity:0},500,function(){
								var listLen = moveObj.parents('.event-default-address').siblings().length;
								_this.find(".event-default-address").eq(moveObjIndex).remove();

								
								$(".order-title-box").find(".event-address").removeClass("none");//出现添加按钮
								$(".order-title-box").find(".maxaddress").addClass("none"); //隐藏上限不可点按钮

								if(listLen == 0){
									
									$(".order-title-tips").removeClass('none');//出现提示添加tips

									//mb
									$(".order-title-box .mb-place .spantxt").addClass("none");
									$(".order-title-box .event-address").addClass("none");
									
									//先隐藏地址列
									$(".address-select-list").hide();
									$('.event-address-box').empty().append(tmpset).show();
									$(".address-form-box .btn-blue").addClass("event-save-new");
									$(".mob-address-list-content").removeClass("block-sm");
									$(".address-form-box .btn-black").eq(1).removeClass("block-sm");//0地址mb去掉取消按钮
									$(".add-address-btn .btn-black").hide();
									if(w_W<=1024){
									// 省、市、区
										$.spice.citySelect('.events-city-simulation', {
											defaultText:['请选择','请选择','请选择']
											, isIscroll: true
										});
									}else{
										// 省、市、区
										spiceCitySelect('.events-city-simulation','.events-city-text','.events-city-content');
									}


								}

								//默认地址规则
								var iactive = $(".father-list-box").find(".is-active").length;
								if(iactive == 0){
									 $(".father-list-box").each(function(){
										$(this).find(".distribution-list").eq(0).addClass("is-active");
									 });

								}


							});

						});

						

					});
				}
			},
			'暂不删除': {
				btnClass: 'btn-black',
				btnEvent: function(e) {
					//隐藏弹出层
					e.data.dialog.hide();
				}
			}
		}
	});

	//编辑地址事件

	$('.event-save').live('tap',function(){
		$('.event-address-select').show();

		//无添加tips时候mb的tip显现。
		if($(".order-title-tips").hasClass("none")){
			$(".mb-place .spantxt").removeClass("none");
		}

		//mb地址上限同步显现
		if(!$(".mb-place .maxaddress").hasClass("none")){
			$(".mb-place .event-address").addClass("none");
		}else{
			$(".mb-place .event-address").removeClass("none");
		}


		//清空编辑块
		$('.event-address-box').hide().empty();
		
		$('html,body').removeAttr('style');
	})

	// 保存地址之后计算上限
	$('.event-save-new').live('tap',function(){
		moveobj = $(this).parents(".add-address-list");
		$('.event-address-select').show();
		$(".order-title-tips").addClass('none');
		//临时添加测试
		// $(".add-address-list").append("<div class='distribution-list'>fdsfsd</div>");
		$(".add-address-list").append(templist);
		//清空编辑块
		$('.event-address-box').hide().empty();
		//
		$('html,body').removeAttr('style');
		//已经添加成功之后计算数量
		var listLen = $(".distribution-list").length;
		$(".order-title-box .mb-place .spantxt").removeClass("none");
		$(".order-title-box .event-address").removeClass("none");
		if(listLen == 1){
			$(".father-list-box .distribution-list").eq(0).addClass('is-active');
		}
		if(listLen == 4){
			$(".order-title-tips").addClass('none');//隐藏提示添加tips
			$(".order-title-box").find(".event-address").addClass("none");//隐藏添加按钮
			$(".order-title-box").find(".maxaddress").removeClass("none");//出现上限不可点按钮
		}

	})

	


	// 返回
	$('.event-save-return,.address-form-close').live('tap', function (e) {
		e.preventDefault();
		$("body").scrollTop(newAddbtnTop);
		$('.event-address-select').show();
		$('.event-address-box').hide().empty();
		$('html,body').removeAttr('style');
	});


	// 地址、配送、支付方式切换
	$('.event-checkout-method > div,.event-default-address,.event-payment-list').live('tap',function(){
		$(this).addClass('is-active').siblings().removeClass('is-active');
	});



	//下拉框提示文案的控制

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





	
});

///////////////common end
