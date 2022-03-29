$(function () {

	/* KV轮播 */
	var bOk = true,
		_activeIndex = 0,

		//轮播头部横线部分
		$swiperTitleLi = $('li','.pc-title-status'),
		/* $swiperContent = $('.swiper-slide','.swiper-container-customize'), */
		//轮播后下面的切换部分
		$tabContent = $('.author-des-tab-content'),
		//轮播左右箭头
		$prevAndNextBtn = $('.swiper-button-prev,.swiper-button-next','.swiper-container-customize'),
		/* 视差滚动 */
		$sub3Dele = $('.sub-images-scroll'),
		//title 和  作者部分  滚动 淡入
		$titleAndAuthor = $('.title-image,.author-image .pc','.author-des-tab-content'),
		$swiperCustomize = $('.swiper-container-customize');

		/* 视频 */
		/* $video = $('.slider-video video',$swiperCustomize); */


		//轮播初始化
	 var swiper = new Swiper('.swiper-container-customize', {
	        spaceBetween: 40,
	        slidesPerView: 1.4,
	        centeredSlides: true,
	        slideToClickedSlide: true,
	        grabCursor: true,
	        prevButton:'.swiper-button-prev',
	        nextButton:'.swiper-button-next',
	        loop : true,
	        loopedSlides :4,
	        pagination: '.swiper-pagination',
	        paginationHide : 'true',
	        paginationClickable: true,
	        swipeHandler: '.swipe-handler',
	        onSlideChangeEnd: function(swiper){
		     	bOk = true;
		     	_activeIndex = $('.swiper-slide.swiper-slide-active','.swiper-container-customize').data('swiper-slide-index');
		     	
		     	/* KV轮播title横线部分进行active切换 */
		     	$swiperTitleLi.eq(_activeIndex).addClass('active').siblings().removeClass('active');

		     	/* kv轮播时下面的内容进行切换 */
		     	$tabContent.eq(_activeIndex).show().siblings().hide();
		     	/* $tabContent.eq(0).show().siblings().hide(); */
		    },
	        breakpoints: {
	        	1024: {
	        		slidesPerView : 1,
	        		spaceBetween: 0,
	        		/* noSwiping : false */
	        		swipeHandler: '',
	        	}
	        }
	    });

	var $swiperPagenationSpan = $('.swiper-pagination .swiper-pagination-bullet','.article-kv-customize-wrapper'),
	 	$swiperContent = $('.swiper-slide','.swiper-container-customize'),
	 	activeSwiper = $('.swiper-slide-active',$swiperCustomize),
	 	$video = $('.slider-video video',activeSwiper);
	
	 //swiper  title部分切换
	 $swiperTitleLi.on('tap',function(){
	 	if( !bOk ) return;
	 	bOk = false;
	 	var _index = $(this).index();
	 	$(this).addClass('active').siblings().removeClass('active');
	 	$swiperPagenationSpan.eq(_index).trigger('click');
	 });

	 //左右箭头  点击
	 $prevAndNextBtn.on('click',function(){
	 	if( !bOk ) return;
	 	bOk = false;
	 	if( activeSwiper.hasClass('is-larger') ){
	 		activeSwiper.removeClass('is-larger');
	 		if( $video.length ){
	 			$video[0].pause();
	 		}
	 		
	 		
	 	}
	 	if( $(window).width() > 1024 ){
	 		$titleAndAuthor.each( function( index , element ){ 
	 			if( $(element).parents('.author-des-tab-content').css('display') == 'block' ){
	 				if( $(element).data('opacity') == 1 ){
	 					$(element).removeClass('active');
	 					$(element).data('opacity',0)
	 				}
	 			}
	 		} );

	 		//叠加图片视差滚动效果
	 		$sub3Dele.each( function( index , element ){
	 			if( $(element).parents('.author-des-tab-content').css('display') == 'block' || $(element).parents('.images-content-pc').length > 0){
	 				if( $(element).parents('.author-des-tab-content').css('display') == 'block' ){
	 					if( $(element).data('opacity') == 1 ){
	 						$(element).removeClass('active');
	 						$(element).data('opacity',0)
	 					}
	 				}
	 			}else{

	 			}
	 		} );
	 	}
	 });


	$(window).on('scroll.3d' , function(){
		if( $(window).width() <= 1024 ) return;
		var _scrollTop = $(window).scrollTop();
		var _winH = $(window).height();
		var subH = _scrollTop + _winH;

		/* KV轮播 滚动放大效果 */
		if(	_scrollTop > $swiperCustomize.offset().top + $swiperCustomize.height()/4 ){
			if(!bOk) return;
			/* 激活的swiper */
			activeSwiper = $('.swiper-slide-active',$swiperCustomize);
			activeSwiper.addClass('is-larger');
			$video = $('.slider-video video',activeSwiper);
			if( $video.length ){
				if( !$video.attr('src') ){
					$video.attr('src',$video.data('src'));
				}
				$video[0].play();
			}
		}

		//title  和 作者部分 淡入效果
		$titleAndAuthor.each( function( index , element ){ 
			if( $(element).parents('.author-des-tab-content').css('display') == 'block' ){
				var eleTop = $(element).offset().top;
				if( _scrollTop > $swiperCustomize.offset().top + $swiperCustomize.height()/2 ){
					if( !$(element).data('opacity') ){
						/* $(element).css({
							opacity : 1
						}); */
						$(element).addClass('active');
						$(element).data('opacity',1)
					}
				}
			}
		} );

		//叠加图片视差滚动效果
		$sub3Dele.each( function( index , element ){
			if( $(element).parents('.author-des-tab-content').css('display') == 'block' || $(element).parents('.images-content-pc').length > 0){
				var eleTop = $(element).offset().top;
				if( subH > eleTop && _scrollTop < eleTop + 100 ){
					if( !$(element).data('opacity') ){
						/* $(element).css({
							opacity : 1
						}); */
						$(element).addClass('active');
						$(element).data('opacity',1)
					}
					var objParams = $(element).data('speed');
					var speed = objParams.speed;
					var dis = subH - eleTop;
					var tranY = dis*speed/20;
					var direction = objParams.direction;
					/* $(element).data('transY',tranY); */
					if( direction == 'reverse' ) {
						tranY = -tranY;
					}
					$(element).css({
						transform : 'translateY('+tranY+'px)'
					});	
				}
			}else{

			}
		} );
		
	});

	//tab切换
	 $('.title-tab>div').click(function() {
        var _index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.con-tab >div','.pc-tab-content').eq(_index).show().siblings().hide();
    });


	 //开始创作  预览全部hover效果
	 $('.begin-study').hover(function(){
	 	$(this).addClass('black').removeClass('white');
	 	$('.icon-arrow-herizontal',this).addClass('icon-arrow-white');
	 },function(){
	 	$(this).addClass('white').removeClass('black');
	 	$('.icon-arrow-herizontal',this).removeClass('icon-arrow-white');
	 });

	 //开始创作  预览全部hover效果
	 $('.prev-look').hover(function(){
	 	$(this).addClass('white').removeClass('black');
	 	$('.icon-arrow-herizontal',this).removeClass('icon-arrow-white');
	 },function(){
	 	$(this).addClass('black').removeClass('white');
	 	$('.icon-arrow-herizontal',this).addClass('icon-arrow-white');
	 });


	/* 轮播左右箭头hover效果 */
	 $(window).on('resize.swiperCustomize',function(){
	 	if( $(window).width() > 1024 ){
	 		if( !$prevAndNextBtn.hasClass('nc-arrow-is-hover') ){
	 			$prevAndNextBtn.addClass('nc-arrow-is-hover');
	 		}
	 	}else{
	 		if( $prevAndNextBtn.hasClass('nc-arrow-is-hover') ){
	 			$prevAndNextBtn.removeClass('nc-arrow-is-hover');
	 		}
	 		if( activeSwiper.hasClass('is-larger') ){
	 			activeSwiper.removeClass('is-larger');
	 			if( $video.length ){
	 				$video[0].pause();
	 			}
	 			
	 			
	 		}
	 	}
	 }).trigger('resize.swiperCustomize');
	 
});
