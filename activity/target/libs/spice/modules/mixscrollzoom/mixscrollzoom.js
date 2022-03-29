
(function(window,$){
    var initOptions = {
      config:$.spice.config,
      scrollSelector:'.events-scroll-loop-false',
      scrollOptions : {
        standard:{
          type:'scroll',
          autoPlay:false,
          loop:false,
          btn:false
        },
        medium:{
          type:'scroll',
          autoPlay:false,
          loop:false,
          btn:false
        },
        small:{
          type:'scroll-loop',
          autoPlay:false,
          loop:true,
          btn:false,
          dot:{
        				style: 'dot'
        			}
        }
      },
      gallerySelector:'.events-scroll-gallery',
      galleryOptions : {
        standard:{
          type:'gallery',
          autoPlay:false,
          loop:false,
          moveNum:2,
          gallery_show_num:4
        },
        medium:{
          type:'gallery',
          autoPlay:false,
          loop:false,
          moveNum:1,
          gallery_show_num:3
        },
        small:{
          type:'gallery',
          autoPlay:false,
          moveNum:0,
          loop:false
        }
      },
      cloudZoomSelector:'.event-cloudzoom-default',
      cloudZoomOptions:{
        standard:{
          animationTime: 300,
          easeTime: 0,
          zoomWidth: 200,
          zoomHeight: 300,
          zoomOffsetX: 20
        },
        medium:{
          animationTime: 300,
          easeTime: 0,
          zoomOffsetX: 0,
          zoomPosition: 'inside'
        },
        small:{

        }
      },
      // 大图切换速度，跟滚动图里面的speed可使用参数相同
      speed:'normal'
    };
  /*
  * obj Object 参数
  */
  $.spice.mixScrollZoom = function(selector,obj){
    return new mixScrollZoom(selector,obj).init();
  }
mixScrollZoom = function(selector,obj){
    'use strict';
    var options,$mix_scroll_zoom_dom,galleryFlag,cloudZoomFlag,$gallery_li_doms,$gallery_li_doms_length;
    selector = selector || '.mix-scroll-zoom';
    if(!$.isPlainObject(obj))obj = {};
    this.tempObj = obj;
    var $self = this;
    function scrollFn (index,scrollObj){
      $gallery_li_doms = $($self.gallerySelector).find('li');
      $gallery_li_doms_length = $gallery_li_doms.length;
      $gallery_li_doms.removeClass('is-active').eq(index%$gallery_li_doms_length - 1).addClass('is-active');
      $self.scroll_index = index%$gallery_li_doms_length - 1;
    };
    $self.handleMedia = function(media){
      if(media != $self.prevMedia){

        if(!!galleryFlag){
          $($self.gallerySelector).data('spice.kvScroll').destroy();
          galleryFlag = null;
        }
        if(!!cloudZoomFlag){
          $($self.cloudZoomSelector).off();
        }
        if($self.galleryOptions[media].gallery_show_num < $gallery_li_doms_length){
          $self.gallery = $.spice.kvScroll($self.gallerySelector,$self.galleryOptions[media]);
        };
        if(!!$self.galleryOptions[media].gallery_show_num){
          $self.setGalleryItemStyle($self.galleryOptions[media].gallery_show_num);
        }
        if($.spice.keys($self.cloudZoomOptions[media]).length > 0){
          $.spice.cloudZoom($self.cloudZoomSelector,$self.cloudZoomOptions[media]);
          cloudZoomFlag = true;
          $self.scrollOptions[media].callBack = '';
        }else{
          if(!$self.galleryOptions[media].gallery_show_num){
            $($self.gallerySelector).find('ul,ul li').attr('style','').removeClass('is-active');
          }
          $self.scrollOptions[media].callBack = scrollFn;
        }
        $.spice.kvScroll($self.scrollSelector, $self.scrollOptions[media]);
        $($self.gallerySelector).find('li').eq(0).tap();
        // 对多图滚动元素大小进行处理
        $self.prevMedia = media;
      }else{
        return ;
      }
    };

    // 对滚动图下面的元素做宽高处理
    this.setGalleryItemStyle = function (num){
      $(this.gallerySelector+' .scroller-wrap').find('ul').css('width',($gallery_li_doms_length/num)*100+'%').find('li').css('width',(100/$gallery_li_doms_length)+'%');
    }
    // 焦点图点击控制大图移动
    this.handle_gallery_click = function (){
      $mix_scroll_zoom_dom
      .find(options.gallerySelector)
      .find('li')
      .off('tap')
      .on('tap',function(e){
        var scrollObj = $($self.scrollSelector).data('spice.kvScroll');
        if(scrollObj.isNotAnimate()){
          var sub_self =  $(this);
              $self.scroll_index = sub_self.index();
          if(  $('.scroll-dots',$self.selector).length > 0){
            $('.scroll-dots',$self.selector).find('a').eq($self.scroll_index).tap();
          }else{
            scrollObj.scroller($self.scroll_index,$self.speed);
          }
          sub_self.addClass('is-active').prevAll().removeClass('is-active');
          sub_self.nextAll().removeClass('is-active');
        }else{return}
      })
    }
    this.initial = function (){
      this.options = $.extend({},initOptions,this.tempObj);
      options = this.options,
      options.config.debounceTime = 0,
      this.config = $.extend(options.config,{
        isRetinaCheck:(this.tempObj.config && this.tempObj.config.isRetinaCheck) ? this.tempObj.config.isRetinaCheck : false,
        callBack:$self.handleMedia
      }),
      this.selector = options.selector = selector,
      this.scrollOptions =options.scrollOptions,
      this.scrollSelector =options.selector+' '+ options.scrollSelector,
      this.galleryOptions =options.galleryOptions,
      this.gallerySelector =options.selector+' ' + options.gallerySelector,
      this.cloudZoomOptions =options.cloudZoomOptions,
      this.cloudZoomSelector =options.selector+' ' + options.cloudZoomSelector,
      this.speed =options.speed,
      // 获取容器节点
      $mix_scroll_zoom_dom = $(this.selector),
      galleryFlag = null,
      cloudZoomFlag = false,
      $gallery_li_doms = $(options.gallerySelector+' li',$mix_scroll_zoom_dom),
      $gallery_li_doms_length = $gallery_li_doms.length,
      this.prevMedia = null;
    }
    this.destroy = function(){
      $(this.selector).removeData('spice.minScrollZoom');
      $(this.scrollSelector).data('spice.kvScroll').destroy();
      $(this.gallerySelector).data('spice.kvScroll').destroy();
      $(this.cloudZoomSelector).data('CloudZoom').destroy();
    }
    this.init = function (){
      this.initial();
      this.resizeScreenDebounce = $.spice.resizeScreenDebounce(this.config);
      $(window).off('resize'+$self.selector).on('resize'+$self.selector,this.resizeScreenDebounce).trigger('resize').resize(function(){
        $(window).trigger('resize'+$self.selector);
      });
      this.handle_gallery_click();
      $(this.selector).data('spice.mixScrollZoom',this);
    };
  };

})(window,jQuery);
