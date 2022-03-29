$(function(){
	
	// size展开
	$('.event-size-chart').on('tap', function(){
		var _icon = $(this).find('i'),
			_sizeChartList = $(this).closest('.size-classify-item').children('.size-chart-list');
		if(_icon.hasClass('icon-down') && !_sizeChartList.is(':visible')){
			_icon.removeClass('icon-down').addClass('icon-up');
			_sizeChartList.slideDown(500);
			
			// 尺码表滑动插件
		    if ($('.events-parameter-iscroll .scroller-wrap',_sizeChartList).length) {
		        $('.events-parameter-iscroll .scroller-wrap',_sizeChartList).each(function(index, el) {
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
		}else if(_icon.hasClass('icon-up') && _sizeChartList.is(':visible')){
			_icon.removeClass('icon-up').addClass('icon-down');
			_sizeChartList.slideUp(500);
        }
        
        sizeCartTableSize()
	});
	
    //尺码表 相关
    var _w;

    $(window).on('resize.sizeCart', function() {
        _w = $.spice.getWindowWidth();
    }).trigger('resize.sizeCart');
        
    // 尺码表hover 效果
    $('.size-classify-item').on('mouseenter', '.size-chart-mob .size-chart-table table .tr-hover td', function() {
        if (_w > 1024) {
            var _this = $(this),
                _thisIndex = _this.index()
                _thisParentIndex = _this.parent().index(),
                _thisBox = _this.closest('.size-chart-mob'),
                _thisBoxIndex = _this.parents('.size-chart-table').index();
            if(!_this.hasClass('hover-no')){
                _this.addClass('size-chart-this');
                _this.parent('tr').addClass('size-chart-bg');
                $('.size-chart-table:eq('+ _thisBoxIndex +') table tr',_thisBox).each(function(index, el) {
                    $('td:eq('+ _thisIndex +')', el).addClass('size-chart-bg');
                });

                $('.parameter-comparison-title table:eq('+ _thisBoxIndex +') td:eq('+ _thisParentIndex +')',_thisBox).addClass('size-chart-this');
                $('.parameter-comparison-title',_thisBox).addClass('parameter-comparison-title-active');
            }
        }
    }).on('mouseleave', '.size-chart-table table .tr-hover td', function() {
        if (_w > 1024) {
            var _this = $(this),
                _thisIndex = _this.index()
                _thisParentIndex = _this.parent().index(),
                _thisBox = _this.closest('.size-chart-mob'),
                _thisBoxIndex = _this.parents('.size-chart-table').index();

            _this.removeClass('size-chart-this');
            _this.parent('tr').removeClass('size-chart-bg');
            $('.size-chart-table:eq('+ _thisBoxIndex +') table tr', _thisBox).each(function(index, el) {
                $('td:eq('+ _thisIndex +')', el).removeClass('size-chart-bg');
            });

            $('.parameter-comparison-title table:eq('+ _thisBoxIndex +') td:eq('+ _thisParentIndex +')', _thisBox).removeClass('size-chart-this');
            $('.parameter-comparison-title', _thisBox).removeClass('parameter-comparison-title-active');
        }
    });


    // 屏幕尺寸改变，调整尺码表 title 高度
    $(window).on('resize.sizeCartTable', function() {
        $('.parameter-comparison-title table tr').each(function(index, el) {
            $('.parameter-comparison-title table tr:eq(' + index + ')').css({
                'height': $('.events-parameter-iscroll table tr:eq(' + index + ')').outerHeight(true)
            });
        });
    }).trigger('resize.sizeCartTable');

    // 尺码表显示时，调整尺码表 title 高度
    function sizeCartTableSize() {
        $('.parameter-comparison-title table tr').each(function(index, el) {
            $('.parameter-comparison-title table tr:eq(' + index + ')').css({
                'height': $('.events-parameter-iscroll table tr:eq(' + index + ')').outerHeight(true)
            });
        });
    }

})
