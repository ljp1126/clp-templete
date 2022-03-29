(function(window,$){
    var initinalData = {
          config:$.spice.config,
          callBack:'',
          scrollSelector:'',
          detectTime:500 //监听时间
        }
    $.spice.imgChange=function(selector,obj){
      return new imgChange(selector,obj).init();
    }
    // 调用方式
    // $.spice.imgChange({selector:'.events-imgChange'});
    function imgChange(selector,obj){
      'use strict';
      selector = selector || '.events-imgChange';
      if(!$.isPlainObject(obj))obj = {};
      var preMedia,$self,flag = true,scrollObj=null,timeStamp,timer,detectTime,fn;
      $self = this;
      this.options = $.extend({},initinalData,obj);
      this.srcDataAry = [],
      this.selector = selector;
      scrollObj =  $($self.options.scrollSelector).data('spice.kvScroll');
      detectTime = this.options.detectTime;
      this.handleResize = function(media){
        // 如果是运动中的话 就直接不换
        if(!!scrollObj){
          if(!scrollObj.isNotAnimate){
            return;
          }
          timeStamp = new Date().getTime();
          if(flag){
            scrollObj.stop();
            flag = false;
          }
          timer && clearTimeout(timer);
          timer = setTimeout(function(){
            var now = new Date().getTime();
            if(now - timeStamp > detectTime){
              scrollObj.start();
              flag = true;
            }
          },detectTime);
        }
        if(preMedia != media){
          $($self.selector).each(function(index,item){
            $(this).replaceWith(function(){
              return  $(item).clone(true).attr('src',$self.srcDataAry[index][media]);
            });
          })
          fn = $self.options.callBack;
          if(!!fn && typeof fn == "function"){
            fn($($self.selector));
          }
          preMedia = media;
        }
      };
      this.config=$.extend(this.options.config,{
        isRetinaCheck : (obj.config && obj.config.isRetinaCheck) ? obj.config.isRetinaCheck : false,
        callBack : this.handleResize
      });
      // 设置延迟时间为0
      this.config.debounceTime = 0;
      function initinal(){
        // 获取srcJosn数据
        $($self.selector).each(function(index,item){
          var tempData = null;
              tempData = $(this).data('image-src');
              $self.srcDataAry.push(tempData);
        }).data('spice.imgChange',$self);
        $(window)
          .resize(function(){
            $(window).trigger('resize'+$self.selector);
          })
          .off('resize'+$self.selector)
          .on('resize'+$self.selector,$.spice.resizeScreenDebounce($self.config)).trigger('resize'+$self.selector);
      };
      this.init = function(){
        initinal();
      };
      this.destroy=function(){
        $(this.selector).removeData('spice.imgChange');
        $(window).off('resize'+$self.selector);
      }
    }
})(window,jQuery)
