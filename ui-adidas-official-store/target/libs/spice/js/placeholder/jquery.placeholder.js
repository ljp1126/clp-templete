/**
 *
 * 水印文字插件
 * 详细用法请参考：http://v3.spice.lh/javascript/placeholder
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0
 *
 */

(function($){
	$.spice.placeholder = function (selector, options) {
		if( !(selector && !$.isPlainObject(selector)) ) return false;
	    return $(selector).each(function () {
	    	var $self = $(this);
	        var config = $.extend({
	            text		: $self.attr('placeholder')// || $self.val()
	            , cssClass 	: 'placeholder'
	        }, $.type(options) ==='string'? { text : options } : (options||{}));

	        $self.attr('placeholder', config.text);//.val('');

	        if ('placeholder' in document.createElement('input')) {
	            //$self.val('');
	            return;
	        }

	        if ( $self.attr('type') == 'password' ) {
	        	
	        	var addPlaceHolder = function() {
		        	$(this).val() == "" && $(this).next('.placeholder-text').show();
		        };
		        var removePlaceHolder = function() {
		        	$(this).next('.placeholder-text').hide();
		        };

		        var searchParent = function(self){
		        	var $p = self.parent()
		        		, p = $p.css('position');

		        	if ( p == 'relative' || p == 'absolute' ) {
		        		return $p;
		        	} else{
		        		return searchParent($p);
		        	}
		        }

		        var $p = searchParent($self);
		        
	        	$('<span class="placeholder-text">'+config.text+'</span>')
	        	.css({
	        		'width': $self.outerWidth()
	        		, 'height': $self.outerHeight()
	        		, 'padding-left': $self.css('padding-left')
	        		, 'padding-top': Math.ceil(($self.outerHeight() - parseInt($self.css('font-size')))/2)
	        		, 'font-size': $self.css('font-size')
	        		, 'line-height': $self.css('font-size')
	        		, 'top': $self.offset().top - $p.offset().top
	        		, 'left': $self.offset().left - $p.offset().left
	        	})
	        	.bind('tap', function(){
	        		$self.trigger('focus');
	        	})
	        	.insertAfter($self);

	        } else{
	        	var addPlaceHolder = function() {
		        	if ($.trim($self.val()) === '' || $.trim($self.val()) == $self.attr('placeholder')){
		        		$self.addClass(config.cssClass).val(config.text);
		        	}

		        };
		        var removePlaceHolder = function() {
		        	if ($self.val() === config.text){
		        		$self.val('');
		            }
		            $self.removeClass(config.cssClass);
		        };

		        addPlaceHolder();
		        
		    }
	        
	        $self
	        .unbind('.placeholder')
	        .bind({
	        	'focus.placeholder'	: removePlaceHolder,
	        	'blur.placeholder'	: addPlaceHolder
	        });
	    });
	};
})(jQuery);

