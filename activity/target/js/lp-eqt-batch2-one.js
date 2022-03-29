$(function() {
    var $eqtOne = $('.e-article'),
		$li = $('li', $eqtOne),
		liLen = $li.length,
		loadImgFun = function(imgArr, fn) {
			// 图片加载fun
			console.log('开始加载图片...');
			var loadImgLen = 0,
				errImgLen = 0

			var imgdefereds = [];
			$(imgArr).each(function() {
				var defered = $.Deferred();
				$(this).on('load', function() {
					defered.resolve();
					loadImgLen++
				}).on('error', function() {
					defered.resolve();
					errImgLen++
					$(this).remove();
					console.log('有' + errImgLen + '个图片加载失败');
				})
				if (this.complete) setTimeout(function() {
					defered.resolve();
				}, 1000);
				imgdefereds.push(defered);
			})
			$.when.apply(null, imgdefereds).done(function() {
				setTimeout(function() {
					if (fn && $.isFunction(fn)) {
						fn()
					}
					console.log("imgArr.length", imgArr.length);
					console.log("loadImgLen", loadImgLen);
					console.log('errImgLen', errImgLen);
					console.log('图片加载完成');
				}, 0)
			});

		};
	
	// 自定义换图
	$.spice.tools.changeImageSrc({
		elem: 'img.e-eqt-jpg[data-image]',
		callBack: function (elem) {
			var $elem = elem;
		}
    });
    
    $.spice.tools.changeImageSrc({
		elem: 'img.e-eqt-gif[data-image]',
		callBack: function (elem) {
			var $elem = elem;
		}
	});

	var imgArrs = function () {
		var arr = [];
		$.each($li, function (i,e) {
			arr.push($('.eqt-jpg', e)[0]);
		})
		return arr;
    };

	var timer = null,
		imgNumFlag = 0;
	loadImgFun(imgArrs(), function () {
		timer = setInterval(function () {
			var $img = $('li:eq('+ imgNumFlag +') .e-eqt-gif', $eqtOne);

			$img.attr('src', $img.attr('lazysrc'));

			imgNumFlag ++;
			
			if(imgNumFlag === 20){
				clearInterval(timer);
			}
		}, 500);
    });


    // 视频
        $('.e-lp-video-btn').on('tap', function(e) {
            e.preventDefault();
            var _this = $(this),
                videoCode =_this.data('videoCode');

            openVideo(videoCode, 'true');
        });
    // 视频 end
    
    var preventHandler = function() {
        event.preventDefault();
    },
	preventScroll = function(flag) {
		var supportsPassive = false,
			flag = flag ? flag : false;
			

		// 判断浏览器是否支持 passive特性
		try {
			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassive = true;
				}
			});
			window.addEventListener('prevent-scroll', null, opts);
		} catch (e) {}
		
		if (flag) {
			document.addEventListener(
				'touchmove',
				preventHandler,
				supportsPassive ? { passive: false } : false
			);
		} else {
			document.removeEventListener(
				'touchmove', 
				preventHandler, 
				false
			);
		}
	};

	// 禁止滑动
	if($.spice.getWindowWidth() <= 768){
		preventScroll(true)
	}

	// 手势部分
	var eqtFun = {
		// 获取元素的实际宽高
		getClientWidth: function (el) {
			return $(el)[0].getBoundingClientRect().width.toFixed(2) - 0;
		},
		getClientHeight: function (el) {
			return $(el)[0].getBoundingClientRect().height.toFixed(2) - 0;
		}
	};

    var windowW = $.spice.getWindowWidth(), // window 宽
        $container = $('.container'), // 页面主体
        $article = $('.e-article'), // 效果主体元素
        $articleAdd = $('.e-article-add'), // 新增内容块
		articleSize = {
			w: $.spice.getWindowWidth(),  //效果主体元素宽度
			h: window.innerHeight - $('.header-fixed').outerHeight(true), //效果主体元素高度
        },
        articleOneH = $article.outerHeight(true), //获取第一个article 高度
		$ul = $('ul', $article), // 需要操作的ul 元素
		$li = $('li', $ul), // li
		rowNum = 5, // 行数
		colNum = 4, // 列数
		moveNum = 1, // 每次操作移动步数
		screen = 0, //初始屏 为零( 缩放 )
		liSize = {
			x: eqtFun.getClientWidth($li), // li 宽度
			y: eqtFun.getClientHeight($li) // li 高度
		},
		viewNum = {
			x: 4, // 显示的列数
            y: Math.floor(articleSize.h / liSize.y), // 显示的行数
            y0: Math.floor(articleSize.h / liSize.y) // 初始屏显示的行数
		},
		ulW = windowW, // 设置ul宽度
		translate = {
			x: 0, // X轴偏移量
			y: 0 // Y轴偏移量
		},
		position = {
			x: 0, //所在当前行数
			y: 0  //所在当前列数
		},
		dataTouchSwipe = {},// data
        touchFlag = true, //手势开关
        articleAddFlag = false; //添加内容是否显示标记

        
		// 滑动
			touch.on('.container', 'swipeleft swiperight swipeup swipedown', function(e) {
				// console.log(e);
				e.preventDefault();
				
				if (!touchFlag) return false;

				// 滑动
					// 更新act大小
					articleSize = {
						w: $.spice.getWindowWidth(),  //效果主体元素宽度
                        h: window.innerHeight - $('.header-fixed').outerHeight(true), //效果主体元素高度
                    }
                    articleOneH = $article.outerHeight(true);

					// 更新li 宽高
					liSize = {
						x: eqtFun.getClientWidth($li),
						y: eqtFun.getClientHeight($li)
					}

					// 更新显示行数
                    viewNum.y = Math.floor(articleSize.h / liSize.y);

                    // 记录初始屏显示行数
                    if (screen === 0) {
                        viewNum.y0 = Math.floor(articleSize.h / liSize.y);
                    }

					// 判断方向
					if (e.direction === 'up') {
						// 如果当前行数 = 需要滚动的行数 return
						// if(position.x + viewNum.y >= rowNum) return false;
						if(position.x + viewNum.y >= rowNum) {
                            $container.velocity({
                                translateY: -$articleAdd.outerHeight(true)
                            }, {
                                complete: function () {
                                    articleAddFlag = true;
                                }
                            });
                        }else{
                            // 如果即将滚动到最后一行
                            if(position.x + moveNum >= rowNum - viewNum.y){
                                translate.y = (-liSize.y * rowNum) + (liSize.y * viewNum.y) + (articleSize.h - liSize.y * viewNum.y);
                                position.x = rowNum - viewNum.y;
                            }else{
                                translate.y = translate.y - liSize.y * moveNum;
                                position.x = position.x + moveNum;
                            }
                        }
						
						

					} else if (e.direction === 'right') {
						if(position.y <= 0) return false;

						
                        
                        if (screen !== 2) {
                            if (position.y + moveNum > colNum - viewNum.x) {
                                translate.x = 0;
                                position.y = 0;
                            }else{
                                translate.x = translate.x + liSize.x * moveNum;
                                position.y = position.y - moveNum;
                            }
                        }else{
                            if (position.y === 0) {
                                translate.x = 0;
                                position.y = 0;
                            }else{
                                translate.x = translate.x + liSize.x * moveNum;
                                position.y = position.y - moveNum;
                            }
                        }

					} else if (e.direction === 'down') {
						// 缩放以后会参数小于1的小数
						if(position.x <= 0) return false;
                        
                        if (articleAddFlag) {
                            $container.velocity({
                                translateY: 0
                            }, {
                                complete: function () {
                                    articleAddFlag = false;
                                }
                            });
                        }else{
                            // 如果即将滚动到第一行
                            if(position.x - moveNum <= moveNum - 1){
                                translate.y = 0;
                                position.x = 0;
                            }else{
                                translate.y = translate.y + liSize.y * moveNum;
                                position.x = position.x - moveNum;
                            }
                        }


					} else if (e.direction === 'left') {
						if(colNum - viewNum.x === position.y) return false;

						if (position.y + moveNum > colNum - viewNum.x) {
                            translate.x = (-liSize.x * colNum) + liSize.x * viewNum.x
							position.y = colNum - 1;
						}else{
							translate.x = translate.x - liSize.x * moveNum;
							position.y = position.y + moveNum;
						}
					}
					
					// 关闭手势
					touchFlag = false;
					// 执行动作
					$ul.velocity({
						'left': translate.x,
						'top': translate.y
					}, {
						complete: function () {
							// 打开手势
							touchFlag = true;
                            
                            dataTouchSwipe = {
                                'screen': screen,
                                'position': position,
                                'translate': translate,
                                'liSize': liSize,
                                'moveNum': moveNum
                            };
                            $('.e-article').data('touchSwipe', dataTouchSwipe);
                            console.log($('.e-article').data('touchSwipe'));
						}
                    });
                    

                    $articleAdd.velocity({
						'top': translate.y
					});
					
					
				// 滑动 end

				
			});
		// 滑动 end
		
		var changedTouch, // 保存缩放变量
			pinchType, //缩放属性
			$startElem, // 缩放手势起点元素
			$endElem, // 缩放手势终点元素
			pinchElemData = { //获取缩放元素data
                start: 0,
                startX: 0, //开始元素X坐标
                startY: 0, //开始元素Y坐标
                end: 0,
                endX: 0, //结束元素X坐标
                endY: 0 //结束元素Y坐标
			},
			pinchElemPosition = { // 缩放元素行、列
				x: 0,
				y: 0
            },
            pinchFlag = 0; // 放大标记

		
		// 缩放
			touch.on('.e-article', 'pinchstart pinchend pinchin pinchout', function(e) {
				e.preventDefault();
				
                if (!touchFlag) return false;
                
                // 记录初始屏显示行数
                if (screen === 0) {
                    viewNum.y0 = Math.floor(articleSize.h / liSize.y);
                }

				// 缩放
					changedTouch = e.originEvent.changedTouches[0];

					if(e.type === 'pinchstart'){
						// 更新li 宽高
						liSize.x = eqtFun.getClientWidth($li);
						liSize.y = eqtFun.getClientHeight($li);
						
						$startElem = $(e.target).is('li') ? $(e.target) : $(e.target).parents('li');
					}else if(e.type === 'pinchout'){
						pinchType = 'pinchout'
						// console.log('放大');
					}else if(e.type === 'pinchin'){
						pinchType = 'pinchin'
						// console.log('缩小');
					}else if(e.type === 'pinchend'){
						$endElem = $(e.target).is('li') ? $(e.target) : $(e.target).parents('li');

                        if (pinchType === 'pinchout') {
                            // 更新开始、结束元素Data
                            pinchElemData.start = $startElem.data('value');
                            pinchElemData.startX = Math.floor(pinchElemData.start / viewNum.x);
                            pinchElemData.startY = pinchElemData.start % viewNum.x;
    
                            pinchElemData.end = $endElem.data('value');
                            pinchElemData.endX = Math.floor(pinchElemData.end / viewNum.x);
                            pinchElemData.endY = pinchElemData.end % viewNum.x;
    
                            console.group('---------------------------------');
                                console.log('start:', pinchElemData.start);
                                console.log('startx:', pinchElemData.startX);
                                console.log('starty:', pinchElemData.startY);
    
                                console.log('---------------------------------');
                                
                                console.log('end:', pinchElemData.end);
                                console.log('endx:', pinchElemData.endX);
                                console.log('endy:', pinchElemData.endY);
                            console.groupEnd();
    
                            
                            // 一级放大
                            if(screen === 0){
                                // 求两个元素的相对关系
                                if (Math.abs(pinchElemData.startX - pinchElemData.endX) === 0 && Math.abs(pinchElemData.startY - pinchElemData.endY) === 1) {
                                    // 垂直
                                    pinchFlag = pinchElemData.start < pinchElemData.end ? pinchElemData.start : pinchElemData.end;
                                }else if (Math.abs(pinchElemData.startX - pinchElemData.endX) === 1 && Math.abs(pinchElemData.startY - pinchElemData.endY) === 0) {
                                    // 水平
                                    pinchFlag = pinchElemData.start < pinchElemData.end ? pinchElemData.start : pinchElemData.end;
                                }else if (Math.abs(pinchElemData.startX - pinchElemData.endX) === 1 && Math.abs(pinchElemData.startY - pinchElemData.endY) === 1) {
                                    // 对角
                                    if (Math.abs(pinchElemData.start - pinchElemData.end) === 3){
                                        //对角 顶点在右
                                        if (pinchElemData.start < pinchElemData.end) {
                                            // 开始元素$li index在前
                                            pinchFlag = pinchElemData.start -1
                                        }else{
                                            pinchFlag = pinchElemData.end - 1
                                        }
                                    }else if(Math.abs(pinchElemData.start - pinchElemData.end) === 5){
                                        // 对角 顶点在左
                                        if (pinchElemData.start < pinchElemData.end) {
                                            // 开始元素$li index在前
                                            pinchFlag = pinchElemData.start
                                        }else{
                                            pinchFlag = pinchElemData.end
                                        }
                                    }
    
                                    console.log('pinchFlag', pinchFlag);
                                    
    
                                }else if (pinchElemData.start === pinchElemData.end) {
                                    pinchFlag = pinchElemData.start;
                                }
                                
        
                                
                                // 更新缩放元素行、列
                                pinchElemPosition.x = Math.floor(pinchFlag / viewNum.x);
                                pinchElemPosition.y = pinchFlag % viewNum.x;

                                // 设置ul的宽度
                                ulW = articleSize.w * 2;

                                // 如果不是第四列
                                if((pinchElemPosition.y + 1) !== colNum && (pinchElemPosition.x + 1) !== rowNum){
                                    // 计算当前行数
                                    position.x = pinchElemPosition.x;
                                    // 计算当前列数
                                    position.y = pinchElemPosition.y;
                                    
                                }else if((pinchElemPosition.x + 1) === rowNum){
                                    // 如果缩放元素是最后一行
                                    
                                    // 计算当前行数
                                    position.x = pinchElemPosition.x - 1;
                                    // 计算当前列数
                                    position.y = pinchElemPosition.y;
                                    
                                }else{
                                    // 如果缩放元素是第四列

                                    // 计算当前行数
                                    position.x = pinchElemPosition.x;
                                    // 计算当前列数
                                    position.y = pinchElemPosition.y - 1;
                                }
                                
                                // 计算y轴偏移量
                                translate.y = -(liSize.y * position.x) * 2;
                                // 计算x轴偏移量
                                translate.x = -(liSize.x * position.y) * 2;

                                // 更新移动步数
                                moveNum = 2;
                        
                                // 放大倍数
                                screen = 1;

                                // 更新显示列数
                                viewNum.x = 2; 
                            }else if (screen === 1) {
                                if (pinchElemData.start === pinchElemData.end){
                                    pinchFlag = pinchElemData.start;
                                    console.log('pinchFlag: ', pinchFlag);

                                    // 计算当前行数
                                    position.x = Math.floor(pinchFlag / 4);
                                    // 计算当前列数
                                    position.y = pinchFlag % 4;
                                    
                                }
                                

                                // 设置ul的宽度
                                ulW = articleSize.w * 4;

                                // 计算y轴偏移量
                                translate.y = -(liSize.y * position.x) * 2;
                                // 计算x轴偏移量
                                translate.x = -(liSize.x * position.y) * 2;


                                // 更新移动步数
                                moveNum = 1;
                        
                                // 放大倍数
                                screen = 2;

                                // 更新显示列数
                                viewNum.x = 1; 
                            }
                            
                        }
                        
                        // 缩小
                        if (pinchType === 'pinchin') {
                            
                            // 二级缩小
                            if(screen === 1){
                                // 设置ul的宽度
                                ulW = articleSize.w;

                                // 更新当前行、列
                                if (position.x >= viewNum.y0) {
                                    // 判断当前行数是否大于显示行数
                                    position.x = rowNum - viewNum.y0 - 1;
                                    // 计算y轴偏移量
                                    translate.y = -liSize.y;
                                }else{
                                    position.x = position.x - position.x;
                                    // 计算y轴偏移量
                                    translate.y = -(liSize.y * position.x);
                                }
                                position.y = position.y - position.y;
                                
                                // 计算x轴偏移量
                                translate.x = -(liSize.x * position.y);

                                // 更新移动步数
                                moveNum = 1;
                        
                                // 放大倍数
                                screen = 0;

                                // 更新显示行数
                                viewNum.x = 4; 
                            }else if (screen === 2) {
                                // 设置ul的宽度
                                ulW = articleSize.w * 2;
                                
                                pinchFlag = pinchElemData.start;
                                console.log('pinchFlag: ', pinchFlag);

                                // 计算当前行数
                                position.x = Math.floor(pinchFlag / 4);
                                // 计算当前列数
                                position.y = pinchFlag % 4 === 3 ? (pinchFlag % 4) - 1 : pinchFlag % 4;
                                
                                
                                // 计算y轴偏移量
                                translate.y = -(liSize.y * position.x) / 2;
                                // 计算x轴偏移量
                                translate.x = -(liSize.x * position.y) / 2;
    
                                // 更新移动步数
                                moveNum = 2;
                        
                                // 放大倍数
                                screen = 1;
    
                                // 更新显示行数
                                viewNum.x = 2; 
                            }
                        }


                        // 关闭手势
                        touchFlag = false;

                        // 设置ul参数
                        $ul.velocity({
                            'width': ulW,
                            'left': translate.x,
                            'top': translate.y
                        }, {
                            complete: function () {
                                // 更新li 大小
                                liSize = {
                                    x: eqtFun.getClientWidth($li), // li 宽度
                                    y: eqtFun.getClientHeight($li) // li 高度
                                }

                                if (screen === 2) {
                                    viewNum.y = 1;
                                }else{
                                    // 更新 显示 行、列
                                    viewNum.y = Math.floor(articleSize.h / liSize.y) // 显示的行数
                                }
                                
                                


                                // 打开手势
                                touchFlag = true;

                                dataTouchSwipe = {
                                    'screen': screen,
                                    'position': position,
                                    'translate': translate,
                                    'liSize': liSize,
                                    'moveNum': moveNum
                                };
                                $('.e-article').data('touchSwipe', dataTouchSwipe);
                                console.log($('.e-article').data('touchSwipe'));
                            }
                        })
						
						// console.log(pinchType, $startElem, $endElem);
						return false;
					}
				// 缩放 end
				
			});
		// 缩放 end

	// 手势部分 end

});