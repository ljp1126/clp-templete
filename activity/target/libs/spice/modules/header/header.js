$(function(){

	// 可配置参数
	var opt = {
		// 点击按钮
		btn: '.events-btn-bar'
		// 与按钮同级的菜单类
		, menuClass: '.navbar-menu'
		// 背景遮罩类
		, maskClass: 'mask-header'
		// 动画速度
		, speed: 280
		, closeMenu: '.events-navbar-back'
		, scrollMenu: ''
	}

	//
	var $window = $(window)
		, $body = $('body')
		, $btn = $(opt.btn)
		, $menu = $btn.siblings(opt.menuClass)
		//顶部导航遮罩层
		, mask = $.spice.mask({maskClass: opt.maskClass, appendTo: '.header .nav-bar'})
		, $maskElem = mask.elem
		, $closeMenu = $(opt.closeMenu);

	var func = {
		getElemCssObj: function(elem, fn){
			var wrapObj = {}, menuObj = {}, part = false, w = $menu.outerWidth(true);
			if( $menu.hasClass('navbar-header-scroll-left') ){
				menuObj['left'] = elem == 'mask' ? -w : 0;
			}else if( $menu.hasClass('navbar-header-scroll-right') ){
				menuObj['right'] = elem == 'mask' ? -w : 0;
			}else if( $menu.hasClass('navbar-header-scroll-left-part') ){
				wrapObj['left'] = elem == 'mask' ? 0 : w;
				menuObj['left'] = elem == 'mask' ? -w : 0;
			}
			else if( $menu.hasClass('navbar-header-scroll-right-part') ){
				wrapObj['right'] = elem == 'mask' ? 0 : w;
				menuObj['right'] = elem == 'mask' ? -w : 0;
			}
			fn(menuObj, wrapObj);
		}
	}

	$window.on('resize.spice.header', function(){
		var wH = $window.height();
		if( $body.hasClass('events-spice-ipad') 
			|| $body.hasClass('events-spice-mobile') ){

			if( $menu.hasClass('navbar-header-scroll-right') 
				|| $menu.hasClass('navbar-header-scroll-left') 
				|| $menu.hasClass('navbar-header-scroll-right-part') 
				|| $menu.hasClass('navbar-header-scroll-left-part') ){
				//$menu.css({height: wH});
			}

		}else{
			$menu.add($('#wrapper')).add($('.header')).removeAttr('style');
			mask.hide();
			if(!$('.spice-dialog').is(':visible')){
				$('body, html').removeClass('overflow-hidden');
			}
		}
	}).trigger('resize.spice.header');

	// 顶部导航展开收起按钮
	$btn.on('tap.spice.header', function(){
		var maskZIndex = $maskElem.css('zIndex')
			, menuZIndex = $menu.css('zIndex');

		mask.show();
		$('body, html').addClass('overflow-hidden');
		$menu.css({zIndex: ( menuZIndex <= maskZIndex ? maskZIndex + 1 : menuZIndex )});
		func.getElemCssObj('btn', function(menuObj, wrapObj){
			$('#wrapper').delay(0).animate(wrapObj, opt.speed, function(){

			});
			if( $('.header').css('position') == 'fixed' ){
				$('.header').delay(0).animate(wrapObj, opt.speed, function(){

				});
			}
			$menu.delay(0).animate(menuObj, opt.speed, function(){
				$.spice._initScroll( opt.scrollMenu ? $(opt.scrollMenu) : $menu );
			});
		});
		return false;
	});

	// 背景遮罩
	$maskElem
		.on('tap.spice.header', function(){
			func.getElemCssObj('mask', function(menuObj, wrapObj){
				$('#wrapper').delay(0).animate(wrapObj, opt.speed, function(){

				});
				if( $('.header').css('position') == 'fixed' ){
					$('.header').delay(0).animate(wrapObj, opt.speed, function(){

					});
				}
				$menu.delay(0).animate(menuObj, opt.speed, function(){
					mask.hide();
					$('body, html').removeClass('overflow-hidden'); 
				});
			});
		}).on('touchmove.spice.header', function(e){
			e.preventDefault();
		});

	$closeMenu.on('tap.spice.header.close', function(){
		$maskElem.trigger('tap.spice.header');
	});

});	