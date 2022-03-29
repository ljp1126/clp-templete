/**
 *
 * 滚动条
 * 详细用法请参考：http://v3.spice.lh/javascript/tinyscrollbar
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 */

(function($){
    "use strict";
    var pluginName = "tinyscrollbar"
        , defaults = {
            axis : 'y'
            , wheel : true
            , wheelSpeed : 40
            , wheelLock : true
            , touchLock : true
            , trackSize : false
            , thumbSize : false
            , thumbSizeMin : 20
            , callBack: null
        };

    function Plugin($container, options) {
        /**
         * The options of the carousel extend with the defaults.
         *
         * @property options
         * @type Object
         */
        this.options = $.extend({}, defaults, options);

        /**
         * @property _defaults
         * @type Object
         * @private
         * @default defaults
         */
        this._defaults = defaults;

        /**
         * @property _name
         * @type String
         * @private
         * @final
         * @default 'tinyscrollbar'
         */
        this._name = pluginName;

        var self = this
        ,   $viewport = $container.find(".viewport")
        ,   $overview = $container.find(".overview")
        ,   $scrollbar = $container.find(".scrollbar")
        ,   $track = $scrollbar.find(".track")
        ,   $thumb = $scrollbar.find(".thumb")

        ,   hasTouchEvents = $.spice.hasTouch//("ontouchstart" in document.documentElement)
        ,   wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                         document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                         "DOMMouseScroll" // let's assume that remaining browsers are older Firefox
        ,   isHorizontal = this.options.axis === 'x'
        ,   sizeLabel = isHorizontal ? "width" : "height"
        ,   posiLabel = isHorizontal ? "marginLeft" : "marginTop"

        ,   mousePosition = 0
        ;

        /**
         * The position of the content relative to the viewport.
         *
         * @property contentPosition
         * @type Number
         */
        this.contentPosition = 0;

        /**
         * The height or width of the viewport.
         *
         * @property viewportSize
         * @type Number
         */
        this.viewportSize = 0;

        /**
         * The height or width of the content.
         *
         * @property contentSize
         * @type Number
         */
        this.contentSize = 0;

        /**
         * The ratio of the content size relative to the viewport size.
         *
         * @property contentRatio
         * @type Number
         */
        this.contentRatio = 0;

        /**
         * The height or width of the content.
         *
         * @property trackSize
         * @type Number
         */
        this.trackSize = 0;

        /**
         * The size of the track relative to the size of the content.
         *
         * @property trackRatio
         * @type Number
         */
        this.trackRatio = 0;

        /**
         * The height or width of the thumb.
         *
         * @property thumbSize
         * @type Number
         */
        this.thumbSize = 0;

        /**
         * The position of the thumb relative to the track.
         *
         * @property thumbPosition
         * @type Number
         */
        this.thumbPosition = 0;

        /**
         * Will be true if there is content to scroll.
         *
         * @property hasContentToSroll
         * @type Boolean
         */
        this.hasContentToSroll = false;

        /**
         * @method _initialize
         * @private
         */
        function _initialize() {
            self.update();
            _setEvents();

            return self;
        }

        /**
         * You can use the update method to adjust the scrollbar to new content or to move the scrollbar to a certain point.
         *
         * @method update
         * @chainable
         * @param {Number|String} [scrollTo] Number in pixels or the values "relative" or "bottom". If you dont specify a parameter it will default to top
         */
        this.update = function(scrollTo) {
            var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
            this.viewportSize = $viewport[0]['offset'+ sizeLabelCap];
            this.contentSize = $overview[0]['scroll'+ sizeLabelCap];
            this.contentRatio = this.viewportSize / this.contentSize;
            this.trackSize = this.options.trackSize || this.viewportSize;
            this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
            this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize);
            this.hasContentToSroll = this.contentRatio < 1;

            $scrollbar.toggleClass("disable", !this.hasContentToSroll);

            switch (scrollTo) {
                case "bottom":
                    this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                    break;

                case "relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;

                default:
                    this.contentPosition = parseInt(scrollTo, 10) || 0;
            }

            this.thumbPosition = this.contentPosition / this.trackRatio;

            _setCss();

            return self;
        };

        this.remove = function() {
            _setCss('0');
            if(hasTouchEvents) {
                $viewport[0].ontouchstart = null;
            }
            else {
                $thumb.unbind("mousedown");
                $track.unbind("mousedown");
            }

            $(window).unbind('resize.' + pluginName);

            if(self.options.wheel && window.addEventListener) {
                $container[0].removeEventListener(wheelEvent, _wheel, false);
            }
            else if(self.options.wheel) {
                $container[0].onmousewheel = null;
            }
        };

        /**
         * @method _setCss
         * @private
         */
        function _setCss(num) {
            $thumb.css(posiLabel, num || self.thumbPosition);
            $overview.css(posiLabel, num || -self.contentPosition);
            $scrollbar.css(sizeLabel, num || self.trackSize);
            $track.css(sizeLabel, num || self.trackSize);
            $thumb.css(sizeLabel, num || self.thumbSize);
        }

        /**
         * @method _setEvents
         * @private
         */
        function _setEvents() {
            if(hasTouchEvents) {
                $viewport[0].ontouchstart = function(event) {
                    if(1 === event.touches.length) {
                        event.stopPropagation();

                        _start(event.touches[0]);
                    }
                };
            }
            else {
                $thumb.bind("mousedown", function(event){
                    event.stopPropagation();
                    _start(event);
                });
                $track.bind("mousedown", function(event){
                    _start(event, true);
                });
            }

            $(window).bind('resize.' + pluginName, function() {
                self.update("relative");
            });

            if(self.options.wheel && window.addEventListener) {
                $container[0].addEventListener(wheelEvent, _wheel, false);
            }
            else if(self.options.wheel) {
                $container[0].onmousewheel = _wheel;
            }
        }

        /**
         * @method _isAtBegin
         * @private
         */
        function _isAtBegin() {
            return self.contentPosition > 0;
        }

        /**
         * @method _isAtEnd
         * @private
         */
        function _isAtEnd() {
            return self.contentPosition <= (self.contentSize - self.viewportSize) - 5;
        }

        /**
         * @method _start
         * @private
         */
        function _start(event, gotoMouse) {
            if(self.hasContentToSroll) {
                $("body").addClass("noSelect");

                mousePosition = gotoMouse ? $thumb.offset()[posiLabel] : (isHorizontal ? event.pageX : event.pageY);

                if(hasTouchEvents) {
                    document.ontouchmove = function(event) {
                        if(self.options.touchLock || _isAtBegin() && _isAtEnd()) {
                            event.preventDefault();
                        }
                        _drag(event.touches[0]);
                    };
                    document.ontouchend = _end;
                }
                else {
                    $(document).bind("mousemove", _drag);
                    $(document).bind("mouseup", _end);
                    $thumb.bind("mouseup", _end);
                    $track.bind("mouseup", _end);
                }

                _drag(event);
            }
        }

        /**
         * @method _wheel
         * @private
         */
        function _wheel(event) {
            if(self.hasContentToSroll) {
                // Trying to make sense of all the different wheel event implementations..
                //
                var evntObj = event || window.event
                ,   wheelDelta = -(evntObj.deltaY || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40
                ,   multiply = (evntObj.deltaMode === 1) ? self.options.wheelSpeed : 1
                ;

                self.contentPosition -= wheelDelta * multiply * self.options.wheelSpeed;
                self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));
                self.thumbPosition = self.contentPosition / self.trackRatio;

                /**
                 * The move event will trigger when the carousel slides to a new slide.
                 *
                 * @event move
                 */
                $container.trigger("move");

                $thumb.css(posiLabel, self.thumbPosition);
                $overview.css(posiLabel, -self.contentPosition);

                if(self.options.wheelLock || _isAtBegin() && _isAtEnd()) {
                    evntObj = $.event.fix(evntObj);
                    evntObj.preventDefault();
                }
                self.options.callBack && $.isFunction(self.options.callBack) && self.options.callBack( self );
            }
        }

        /**
         * @method _drag
         * @private
         */
        function _drag(event) {
            if(self.hasContentToSroll) {
                var mousePositionNew = isHorizontal ? event.pageX : event.pageY
                ,   thumbPositionDelta = hasTouchEvents ? (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition)
                ,   thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta))
                ;

                if (thumbPositionNew) {
                    self.contentPosition = thumbPositionNew * self.trackRatio;
                };
                // self.contentPosition = thumbPositionNew * self.trackRatio;

                $container.trigger("move");

                $thumb.css(posiLabel, thumbPositionNew);
                $overview.css(posiLabel, -self.contentPosition);
                self.options.callBack && $.isFunction(self.options.callBack) && self.options.callBack( self );
            }
        }

        /**
         * @method _end
         * @private
         */
        function _end() {
            self.thumbPosition = parseInt($thumb.css(posiLabel), 10) || 0;

            $("body").removeClass("noSelect");
            $(document).unbind("mousemove", _drag);
            $(document).unbind("mouseup", _end);
            $thumb.unbind("mouseup", _end);
            $track.unbind("mouseup", _end);
            document.ontouchmove = document.ontouchend = null;
        }

        return _initialize();
    }

    $.spice[pluginName] = function(selector, options){
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        return $(selector).each(function(i, elem) {
            $(elem).removeData('spice.' + pluginName);
            $.data(this, "spice." + pluginName, new Plugin($(this), options));
            //if(!$.data(this, "plugin_" + pluginName)) {
            //    $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            //}
        });
    }

})(jQuery);