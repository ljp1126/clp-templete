/**
 *
 * 插件模版
 * 详细用法请参考：http://xxxx/
 *
 * @ author
 * @ version
 *
 */

(function($){

    "use strict";
     //存储默认参数
    var defaultOptions = {
        infinite : false,
        number : 3,
        equalHeight : true,
        prevOrNot : false,
        nextOrNot : false,
        dragOrNot : true,
        time : 700,
        tabClass : 'is-active',
        scrollNumber : 1,
        disScale : 0.615, //建议在0.5 - 1 之间取值
        minScale : 0.5,  
        moveDis : 100 ,   //单位像素px
        notSetSize : false ,//两侧不希望等比缩放,此值为true  同时setSize函数为空函数(目的为兼容ie8),其他浏览器可忽略此参数
        setSize : function( objParent , scale , oUl ){
            if( $.browser.msie && $.browser.version<=8.0 ){

                /*var x = parseInt(objParent.css('width'))*(1-scale)/2;
                var $obj = objParent.find('a');
                objParent.css( 'paddingLeft' , x );
                objParent.css( 'paddingRight' , x );
                objParent.css( 'paddingTop' , (oUl.height()-$obj.height())/2 );
                $obj.css('opacity' , scale );*/

                var $obj = objParent.find('a');
                $obj.css( 'width' , scale*100+'%' );
                $obj.css( 'marginTop' , (oUl.height()-$obj.height())/2 );
                $obj.css('opacity' , scale );

            }else{
                //objParent.css( 'transform' , 'scale('+scale+')' );
                var $obj = objParent.find('a');
                $obj.css( 'transform' , 'scale('+scale+')' );
                $obj.css('opacity' , scale );
            }
        }
    };

    var moveCenter = function( elem, option ){
        var self = this;
        this.elem = elem;
        var newOptions = $.extend({}, defaultOptions, option);
        $.each( newOptions , function( index ,value ){
            self[index] = value;
        } );
        this.init();
    }

    moveCenter.prototype = {
        init : function(){

            var self = this;
            this.oWrapper = this.elem;
            this.str = this.oWrapper.html();
            if( this.prevOrNot ){
                this.oWrapper.append( '<div class="scroll-btn scroll-btn-prev"><a><i>&lt;</i></a></div>' );
            }
            if( this.nextOrNot ){
                this.oWrapper.append( '<div class="scroll-btn scroll-btn-next"><a><i>&gt;</i></a></div>' );
            }
            this.oWrapperInner = $( '.scroller-wrap' , this.oWrapper );
            this.oLeft = $( '.scroll-btn-prev' , this.oWrapper );
            this.oRight = $( '.scroll-btn-next' , this.oWrapper );
            this.oUl = $( this.oWrapperInner ).children('ul');
            this.maxSize = this.minScale;
            this.speed = 0;
            this.scale = 1;
            this.originScaleWidth = this.minScale;
            this.originScaleWidthFarther = this.minScale;
            this.timer = null;
            this.bOk = true;
            this.oldMoveClientX = 0;
            this.originScaleWidthData = true;
            this.originScaleWidthFartherData = true;
            this.initData = true;
            this.originCount = 0 ;
            this.dis = 0;
            this.downDis = 0;
            this.imgLoadCount = 0;
            if(this.infinite){
                this.oUl.html( this.oUl.html() + this.oUl.html() + this.oUl.html() );
                this.aLi = this.oUl.children();
                this.count = this.aLi.length/3 + (this.number-1)/2;
            }else{
                this.aLi = this.oUl.children();
                this.count = (this.number-1)/2;
            }
            if( this.scrollNumber > this.number){
                this.scrollNumber = this.number;
            }
            if( this.infinite && this.number > this.aLi.length /3 ){
                console.log( '轮播内容个数必须大于整屏放置的number数量,多图轮播可能出问题' );
            }
            this._browserRedirect();
            this.aLi.find('img').each(function( index , element ){
                if( element.complete ){
                    self.imgLoadCount ++;
                    if( self.imgLoadCount == self.aLi.find('img').length ){
                      self._init();
                    }
                }else{
                    $( element ).load( function(){
                        self.imgLoadCount ++;
                        if( self.imgLoadCount== self.aLi.find('img').length ){
                          self._init();
                        }
                    } );
                }
            });
        },
        prev : function(){
            this._leftClick();
        },
        next : function(){
            this._rightClick();
        },
        scroll : function(n,time){
            var self = this;
            this.scale = 1;
            if(!this.infinite){
                if(n<1 || n>this.aLi.length ){
                    console.log('不在滚动的区间');
                    return;
                }
            }else{
                if(n<1 || n>this.aLi.length/3){
                    console.log('不在滚动的区间');
                    return;
                }
            };
            if(time == 0){
                if(!this.infinite){
                    this.count = n-1;
                }else{
                    this.count = this.aLi.length/3 + n-1;
                }
                this._setBok();
                return;
            }else{
                if( time ){
                    this.scrollTime = time;
                }else{
                    this.scrollTime = this.time;
                }
                if( !this.infinite ){
                    if( n-1 == this.count ){
                        return;
                    }else{
                        if( $.browser.msie && $.browser.version<=8.0 ){
                            var l = (this.count-n+1) * this._getStyle( this.aLi ) * this._getStyle( this.oUl )/100;
                        }else{
                            var l = (this.count-n+1) * this.oWrapperInner.width() /this.number;
                        }
                    }
                }else{
                    if( n-1 == this.count - this.aLi.length/3 ){
                        return;
                    }
                    this._confirmCount();
                    if( $.browser.msie && $.browser.version<=8.0 ){
                        var l = (this.count - n + 1 - this.aLi.length/3) * this._getStyle( this.aLi ) * this._getStyle( this.oUl )/100;
                    }else{
                        var l = (this.count - n + 1 - this.aLi.length/3) * this.oWrapperInner.width() /this.number;
                    }
                };
            };
            this._move( this.oldLeft , l , this.scrollTime , 'linear' );
        },
        destroy : function(){
            this.oWrapper.html( this.str );
            this.prevOrNot && this._removePrev();
            this.nextOrNot && this._removeNext();
            this.dragOrNot && this._removeDrag();
        },
        _addDrag : function(){
            var self = this;
            if(!this.mobile){
                this.oUl.on('mousedown.drag',function(e){
                    self._drag(e);
                });
            }else{
                this.oUl.on('touchstart.drag',function(e){
                    self._drag(e);
                });
            }
        },
        _removeDrag : function (){
            var self = this;
            if(!this.mobile){
                this.oUl.off('mousedown.drag');
            }else{
                this.oUl.off('touchstart.drag');
            }
        },
        _addNext : function(){
            var self = this;
            if(!this.mobile){
                this.oRight.on('click.next' , function(){
                    self._rightClick();
                });
            }else{
                this.oRight.on('touchstart.next' , function(){
                    self._rightClick();
                });
            }
        },
        _removeNext : function(){
            if(!this.mobile){
                this.oRight.off('click.next');
            }else{
                this.oRight.off('touchstart.next');
            }
        },
        _addPrev : function(){
            var self = this;
            if(!this.mobile){
                this.oLeft.on('click.prev' , function(){
                    self._leftClick();
                });
            }else{
                this.oLeft.on('touchstart.prev' , function(){
                    self._leftClick();
                });
            }
        },
        _removePrev : function(){
            if(!this.mobile){
                this.oLeft.off('click.prev');
            }else{
                this.oLeft.off('touchstart.prev');
            }
        },
        _init : function(){
            var self = this;
            if( !( $.browser.msie && $.browser.version <= 8.0 ) ){
                this._setWidth();
            }else{
                this.oUl.css( 'width' , 100*this.aLi.length/this.number +'%');
                this.aLi.css('width' , 100/this.aLi.length +'%');
            }
            /*if( ( $.browser.msie && $.browser.version > 8.0 ) || ( navigator.userAgent.indexOf( 'Trident' )!=-1 && navigator.userAgent.indexOf( 'rv' )!=-1 ) ){
                this._setIEWidth();
            }else{
                this.oUl.css( 'width' , 100*this.aLi.length/this.number +'%');
                this.aLi.css('width' , 100/this.aLi.length +'%');
            }*/
            if($.browser.msie && $.browser.version<=8.0){
                this.oUl.css('height' , this.aLi.eq(this.count).height() ); 
                this._setCenter(this.count);
                this._setSize();
            }else{
               this._setResize(); 
            }

            if( self.equalHeight && self.number >= 5 && !this.notSetSize ){
                self._setSize();
            };

            
            if($.browser.msie && $.browser.version<=8.0){
                this.resizeTimer = null;
                $(window).off('resize.movecenter').on('resize.movecenter' , function(){
                    if (self.resizeTimer) {

                        clearTimeout(self.resizeTimer);
                    }
                    self.resizeTimer = setTimeout(function(){
                        if(self.notSetSize){
                            self.oUl.css('height' , self.aLi.eq(self.count).height() ); 
                        }else{
                           self._setResize(); 
                        }
                        
                    }, 150);  
                }); 
            } else{
                $(window).on('resize.movecenter' , function(){
                     self._setResize();  
                }); 
            }
            /*$(window).off('resize').on('resize' , function(){
                self._setResize();             
            });*/
            this.prevOrNot && this._addPrev();
            this.nextOrNot && this._addNext();
            this.dragOrNot && this._addDrag();
        },
        _setResize : function(){
            if( ( $.browser.msie && $.browser.version <= 8.0 ) ){
               if(this.notSetSize){
                    this.oUl.css('height' , this.aLi.eq(this.count).height() ); 
                }else{
                    this.oUl.css('height' , this.aLi.eq(this.count).height() ); 
                    this._setCenter(this.count);
                    this._setSize(); 
                }   
               
                
            }else{
                this._setWidth();
                this._setCenter(this.count);
                this._setSize();
                if( ( $.browser.msie && $.browser.version > 8.0 ) || ( navigator.userAgent.indexOf( 'Trident' )!=-1 && navigator.userAgent.indexOf( 'rv' )!=-1 ) ){
                    this._setWidth();
                    this._setCenter(this.count);
                }
                
            }


           // this._setIEWidth();
            //this.oUl.css('height' , this.aLi.eq(this.count).height() );
            //this._setCenter(this.count);
            //this._setSize();
            //this._setIEWidth();
        },
        _setWidth : function(){
            if( !( $.browser.msie && $.browser.version <= 8.0 ) ){
                this.aLi.css( 'width' , this.oWrapperInner.width() / this.number );
                this.oUl.css( 'width' , (this.aLi.width() + 1) * this.aLi.length );
            }
            /*if( ( $.browser.msie && $.browser.version > 8.0 ) || ( navigator.userAgent.indexOf( 'Trident' )!=-1 && navigator.userAgent.indexOf( 'rv' )!=-1 ) ){
                this.aLi.css( 'width' , this.oWrapperInner.width() / this.number );
                this.oUl.css( 'width' , (this.aLi.width() + 1) * this.aLi.length );
            }*/
        },
        _setCenter : function (n){
            if( $.browser.msie && $.browser.version<=8.0 ){
                this.oldLeft = 50 - (n+0.5) * this._getStyle( this.aLi ) * this._getStyle( this.oUl )/100;
                this.oUl.css('left' , this.oldLeft + '%' );
                return;
            }

            this.oldLeft = ( 0.5 - ( n + 0.5 )/this.number ) * this.oWrapperInner.width() ;
            this.oUl.css('left' , this.oldLeft);

        },
        _setSize : function (){
            var self = this;
            this._setMaxSize();
            this.aLi.each(function(index , element){
                /*if( $.browser.msie && $.browser.version<=8.0){
                    var dis = Math.abs( self.oUl.position().left + $(element).position().left + parseInt($(element).css('width')) /2 - self.oWrapperInner.width() / 2 );
                    var scale = 1 - dis/( self.oWrapperInner.width() * self.disScale );
                }else{
                   var dis = Math.abs( self.oUl.position().left + $(element).position().left + parseInt($(element).css('width')) /2 - self.oWrapperInner.width() / 2 );
                   var scale = 1 - dis/( self.oWrapperInner.width() * self.disScale ); 
                }*/
                var dis = Math.abs( self.oUl.position().left + $(element).position().left + $(element).width()/2 - self.oWrapperInner.width() / 2 );
                var scale = 1 - dis/( self.oWrapperInner.width() * self.disScale );
                if( self.equalHeight ){
                    if( scale < self.originScaleWidth ){
                        scale = self.originScaleWidth;
                    }
                }else{
                    if( scale < self.originScaleWidthFarther ){
                        scale = self.originScaleWidthFarther;
                    }
                }
                if(!self.initData){
                    if( scale > self.maxSize ){
                        self.maxSize = scale;
                        self.count = index;
                    }
                }
                if( self.count + 1 == index && scale > self.originScaleWidth && self.originScaleWidthData ){
                    self.originScaleWidth = scale;
                    self.originScaleWidthData = false;
                }
                if(self.number>=5  && !self.equalHeight && self.count + 2 == index && scale > self.originScaleWidthFarther && self.originScaleWidthFartherData ){
                    self.originScaleWidthFarther = scale;
                    self.originScaleWidthFartherData = false;
                }


                if( index == self.aLi.length-1 ){
                    self.initData = false;
                    self.originScaleWidthData = false;
                    self.originScaleWidthFartherData = false;
                }

                self.setSize( $(self.aLi[index]) , scale , self.oUl );

            });

            this.aLi.eq( this.count ).addClass( this.tabClass ).siblings().removeClass( this.tabClass );
        },
        _centerUl : function ( type ){
            if( $.browser.msie && $.browser.version<=8.0 ){
                var l =  50 - (this.count + 0.5) * this._getStyle( this.aLi ) * this._getStyle( this.oUl )/100 ;
            }else{
                var l = ( 0.5 - ( this.count + 0.5 )/this.number ) * this.oWrapperInner.width();
            }
            
            var distance = l - this.oldLeft;
            this._move( this.oldLeft , distance , this.time , type );
        },
        _setBok : function (){
            this._setCenter(this.count);
            this._setSize();
            this.bOk = true;
        },
        _rightClick : function (){
            if(!this.bOk) return;
            this.bOk = false;
            this.scale = 1 ;
            this.infinite && this._confirmCount();
            this.count += this.scrollNumber;
            if( this.infinite ){
                this._centerUl( 'linear' );
            }else{
                if(this.count > (this.aLi.length-1)) {
                    this.count = this.aLi.length-1;
                }
                this._centerUl( 'linear' );
            }
            this.elem.trigger('spice.moveCenter-before', this);
            this.elem.trigger('spice.moveCenter-next', this);
        },
        _leftClick : function(){
            if(!this.bOk) return;
            this.bOk = false;
            this.scale = 1;
            this.infinite && this._confirmCount();
            this.count -= this.scrollNumber;
            if(this.infinite){
                this._centerUl( 'linear' );
            }else{
                if( this.count < 0 ){
                    this.count = 0;
                }
                this._centerUl( 'linear' );
            }
            this.elem.trigger('spice.moveCenter-before', this);
            this.elem.trigger('spice.moveCenter-prev', this);
        },
        _confirmUlLeft : function( l ){
            if( this.infinite ){
                if(l<=( this.oWrapperInner.width() /2- (this.aLi.length-(this.number-1)/2-0.5) * this.aLi.width() ) ){
                    l = this.oWrapperInner.width() /2-(this.aLi.length/3-(this.number-1)/2-0.5 + this.aLi.length/3) * this.aLi.width();
                };
                if(l>=0){
                    l = - this.aLi.width() * this.aLi.length/3;
                };
                
            }else{
                this.oLeft.removeClass('is-disabled');
                this.oRight.removeClass('is-disabled');
                if(l >= ( this.oWrapperInner.width() - this.aLi.width() ) /2){
                     l = ( this.oWrapperInner.width() - this.aLi.width() ) /2;

                     this.timer && clearInterval(this.timer);
                     this.bOk = true;
                     this.oLeft.addClass('is-disabled');
                };
                if(l <= -( this.aLi.width() * (this.aLi.length - 0.5) - this.oWrapperInner.width() /2)){
                    l = -( this.aLi.width() * (this.aLi.length-0.5) - this.oWrapperInner.width() / 2 );
                    this.timer && clearInterval(this.timer);
                    this.bOk = true;
                    this.oRight.addClass('is-disabled');
                }
            }
            return l;
            /*if($.browser.msie && $.browser.version<=8.0){
                if( this.infinite ){
                    if(l<=( this.oWrapperInner.width() /2- (this.aLi.length-(this.number-1)/2-0.5) * parseInt(this.aLi.css('width')) ) ){
                        l = this.oWrapperInner.width() /2-(this.aLi.length/3-(this.number-1)/2-0.5 + this.aLi.length/3) * parseInt(this.aLi.css('width'));
                    };
                    if(l>=0){
                        l = - parseInt(this.aLi.css('width')) * this.aLi.length/3;
                    };
                    
                }else{
                    this.oLeft.removeClass('is-disabled');
                    this.oRight.removeClass('is-disabled');
                    if(l >= ( this.oWrapperInner.width() - parseInt(this.aLi.css('width')) ) /2){
                         l = ( this.oWrapperInner.width() - parseInt(this.aLi.css('width')) ) /2;

                         this.timer && clearInterval(this.timer);
                         this.bOk = true;
                         this.oLeft.addClass('is-disabled');
                    };
                    if(l <= -( parseInt(this.aLi.css('width')) * (this.aLi.length - 0.5) - this.oWrapperInner.width() /2)){
                        l = -( parseInt(this.aLi.css('width')) * (this.aLi.length-0.5) - this.oWrapperInner.width() / 2 );
                        this.timer && clearInterval(this.timer);
                        this.bOk = true;
                        this.oRight.addClass('is-disabled');
                    }
                }
                return l;
            }else{
                if( this.infinite ){
                    if(l<=( this.oWrapperInner.width() /2- (this.aLi.length-(this.number-1)/2-0.5) * this.aLi.width() ) ){
                        l = this.oWrapperInner.width() /2-(this.aLi.length/3-(this.number-1)/2-0.5 + this.aLi.length/3) * this.aLi.width();
                    };
                    if(l>=0){
                        l = - this.aLi.width() * this.aLi.length/3;
                    };
                    
                }else{
                    this.oLeft.removeClass('is-disabled');
                    this.oRight.removeClass('is-disabled');
                    if(l >= ( this.oWrapperInner.width() - this.aLi.width() ) /2){
                         l = ( this.oWrapperInner.width() - this.aLi.width() ) /2;

                         this.timer && clearInterval(this.timer);
                         this.bOk = true;
                         this.oLeft.addClass('is-disabled');
                    };
                    if(l <= -( this.aLi.width() * (this.aLi.length - 0.5) - this.oWrapperInner.width() /2)){
                        l = -( this.aLi.width() * (this.aLi.length-0.5) - this.oWrapperInner.width() / 2 );
                        this.timer && clearInterval(this.timer);
                        this.bOk = true;
                        this.oRight.addClass('is-disabled');
                    }
                }
                return l;
            }*/
        },
        _confirmCount : function(){
            if( this.count> 2 * this.aLi.length/3 - 1 ){
                this.count = this.count - this.aLi.length/3;
                this._setBok();
            }else if( this.count <= this.aLi.length/3 - 1 ){
                this.count = this.count + this.aLi.length/3;
                this._setBok();
            }
        },
        _drag : function(e){
            var self = this;
            clearInterval(this.timer);
            this.originCount = this.count;
            this.speed = 0;
            this.bOk = true;
            if(!self.mobile){
                var disX = e.pageX - this.oUl.position().left;
                this.oldMoveClientX = e.pageX;
                this.downDis = e.pageX;
            }else{
                var disX = e.originalEvent.changedTouches[0].pageX - this.oUl.position().left;
                this.oldMoveClientX = e.originalEvent.changedTouches[0].pageX;
                this.downDis = e.originalEvent.changedTouches[0].pageX;
            }
            if(!self.mobile){
                $(document).on( 'mousemove' , fnMove);
            }else{
                $(document).on( 'touchmove' , fnMove);
            }
            if(!self.mobile){
                $(document).on( 'mouseup' , fnEnd );
            }else{
                $(document).on( 'touchend' , fnEnd);
            }
            e.preventDefault();
            self.oUl[0].setCapture && self.oUl[0].setCapture();
            return false;
            function fnMove(e){
                if(!self.mobile){
                    var l = e.pageX - disX;
                }else{
                    var l = e.originalEvent.changedTouches[0].pageX - disX;
                }

                l = self._confirmUlLeft( l );
                self.oUl.css( 'left' , l );
                if( $.browser.msie && $.browser.version<=8.0 ){
                    self.oldLeft = l / self.oWrapperInner.width() * 100;
                }else{
                    self.oldLeft = l;   
                }

                if(!self.mobile){
                    self.speed = e.pageX - self.oldMoveClientX;
                    self.oldMoveClientX = e.pageX;
                    self.dis = e.pageX - self.downDis;
                }else{
                    self.speed = e.originalEvent.changedTouches[0].pageX - self.oldMoveClientX;
                    self.oldMoveClientX = e.originalEvent.changedTouches[0].pageX;
                    self.dis = e.originalEvent.changedTouches[0].pageX - self.downDis;
                }
                self._setSize();
            }
            function fnEnd(){
                self.elem.trigger('spice.moveCenter-before', self);
                self.scale = 1;
                self.bOk = false;
                if(Math.abs(self.speed) <= ( 1 - Math.pow( ( 1-  1/Math.round( self.time / 30 ) ) , 3) ) * self.oWrapperInner.width() / self.number /*15*/ ){
                    if( Math.abs(self.dis) > self.moveDis && self.speed >0 && self.count == self.originCount ){
                       self.count--;
                       if(!self.infinite && self.count<0){
                            self.count=0;
                       }  
                    }
                    if( Math.abs(self.dis) > self.moveDis && self.speed <0 && self.count == self.originCount ){
                           self.count++;
                           if(!self.infinite && self.count > self.aLi.length-1){
                                self.count = self.aLi.length-1; 
                           }
                    }
                    /*if($.browser.msie && $.browser.version<=8.0){
                        var dis = Math.abs( self.oUl.position().left + self.aLi.eq(self.count).position().left + parseInt(self.aLi.css('width')) /2 - self.oWrapperInner.width() /2 );
                    }else{
                        var dis = Math.abs( self.oUl.position().left + self.aLi.eq(self.count).position().left + self.aLi.width() /2 - self.oWrapperInner.width() /2 );
                    }*/
                    var dis = Math.abs( self.oUl.position().left + self.aLi.eq(self.count).position().left + self.aLi.width() /2 - self.oWrapperInner.width() /2 );
                    
                    self.scale = dis / ( self.oWrapperInner.width() * self.disScale ) * 5;
                    self._centerUl( 'linear' );
                }else{
                    clearInterval(self.timer);
                    self.timer = setInterval(function(){
                        self.speed *= 0.9;
                        /*self.oldLeft += self.speed;
                        self.oldLeft = self._confirmUlLeft(self.oldLeft);
                        self.oUl.css('left' , self.oldLeft);*/
                        if( $.browser.msie && $.browser.version<=8.0 ){
                            var l = self._confirmUlLeft( self.oUl.position().left + self.speed );
                            self.oUl.css('left' , l );
                            self.oldLeft = l / self.oWrapperInner.width() * 100;
                        }else{
                            self.oldLeft += self.speed;
                            self.oldLeft = self._confirmUlLeft(self.oldLeft);
                            self.oUl.css('left' , self.oldLeft);
                        }

                        self._setSize();
                        if(Math.abs(self.speed) <= ( 1 - Math.pow( ( 1-  1/Math.round( self.time / 30 ) ) , 3) ) * self.oWrapperInner.width() / self.number /*15*/ && self.speed >= 0){
                            clearInterval(self.timer);
                            /*if($.browser.msie && $.browser.version<=8.0){
                                var dis = self.oUl.position().left + self.aLi.eq(self.count).position().left + parseInt(self.aLi.css('width')) /2 - self.oWrapperInner.width() /2;
                            }else{
                                var dis = self.oUl.position().left + self.aLi.eq(self.count).position().left + self.aLi.width() /2 - self.oWrapperInner.width() /2;
                            }*/
                            var dis = self.oUl.position().left + self.aLi.eq(self.count).position().left + self.aLi.width() /2 - self.oWrapperInner.width() /2;
                            if(dis <= 0){
                                self._centerUl( 'ease-out' );
                            }else{
                                self.scale = 1;
                                self.count --;
                                if(self.infinite){
                                    self._centerUl( 'ease-out' );
                                }else{
                                    if( self.count < 0 ){
                                        self.count = 0;
                                    }
                                    self._centerUl( 'ease-out' );
                                }
                            }
                        }else if(Math.abs(self.speed) <= ( 1 - Math.pow( ( 1-  1/Math.round( self.time / 30 ) ) , 3) ) * self.oWrapperInner.width() / self.number/*15*/ && self.speed <= 0){
                            clearInterval(self.timer);
                            
                            /*if($.browser.msie && $.browser.version<=8.0){
                                var dis = self.oUl.position().left + self.aLi.eq(self.count).position().left + parseInt(self.aLi.css('width')) /2 - self.oWrapperInner.width() /2;
                            }else{
                                var dis = self.oUl.position().left + self.aLi.eq(self.count).position().left + self.aLi.width() /2 - self.oWrapperInner.width() /2;
                            }*/
                            var dis = self.oUl.position().left + self.aLi.eq(self.count).position().left + self.aLi.width() /2 - self.oWrapperInner.width() /2;
                            if(dis >= 0){
                                self._centerUl( 'ease-out' );
                            }else{
                                self.scale = 1 ;
                                self.count ++;
                                if( self.infinite ){
                                    self._centerUl( 'ease-out' );
                                }else{
                                    if(self.count > (self.aLi.length-1)) {
                                        self.count = self.aLi.length-1;
                                    }
                                    self._centerUl( 'ease-out' );
                                }
                            }
                        }
                    },30);
                }
                if(!self.mobile){
                    $(document).off('mousemove' , fnMove);
                    $(document).off('mouseup' , fnEnd);
                }else{
                    $(document).off('touchmove' , fnMove);
                    $(document).off('touchend' , fnEnd);
                }
                self.oUl[0].releaseCapture && self.oUl[0].releaseCapture();
            };
        },
        _setMaxSize : function(){
            if(this.equalHeight){
                this.maxSize = this.originScaleWidth;
            }else{
                this.maxSize = this.originScaleWidthFarther;
            }
        },
        _move : function( start , distance , time , type ){
            var self = this;
            this.bOk = false;
            var count = Math.round( time * this.scale / 30 );
            if(count <= 0 ){
                this.bOk = true;
                self.elem.trigger('spice.moveCenter-after', self);
                return;
            }
            var n = 0;
            this.timer = setInterval(function(){
                n++;
                if( type == 'linear' ){
                    self.oldLeft += distance / count;
                    if( $.browser.msie && $.browser.version<=8.0 ){
                        self.oUl.css( 'left' , self.oldLeft + '%');
                    }else{
                        self.oUl.css('left' , self.oldLeft);
                    }

                }else if( type == 'ease-out' ){
                    self.oldLeft = start + ( 1 - Math.pow( ( 1-  n/count ) , 3) ) * distance;
                    if( $.browser.msie && $.browser.version<=8.0 ){
                        self.oUl.css( 'left' , self.oldLeft + '%');
                    }else{
                        self.oUl.css('left' , self.oldLeft);
                    }
                }

                self.timer && self._setSize();
                if(n == count){
                    clearInterval( self.timer );
                    if( self.infinite ){
                        if( self.count >= self.aLi.length-1-(self.number-1)/2 ){
                            self.count = self.count - self.aLi.length/3;
                            self._setBok();
                        }
                        if( self.count<=(self.number-1)/2 ){
                            self.count = self.count + self.aLi.length/3;
                            self._setBok();
                        }
                        self.bOk = true;
                        self.elem.trigger('spice.moveCenter-after', self);
                        return;
                    }else{
                        if( self.count <= 0 ){
                            self.oLeft.addClass( 'is-disabled' );
                        }else if( self.count >= self.aLi.length-1){
                            self.oRight.addClass( 'is-disabled' );
                        }else{
                            self.oLeft.removeClass( 'is-disabled' );
                            self.oRight.removeClass( 'is-disabled' );
                        }
                    };
                    self.bOk = true;
                    self.elem.trigger('spice.moveCenter-after', self);
                }
            }, 30 );
        },
        _getStyle : function( obj ){ 
            return parseFloat( ( obj[0].currentStyle || getComputedStyle( obj[0] , false ) ) ['width'] );
        },
        _browserRedirect : function(){
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                this.mobile = true;
            } else {
                this.mobile = false;
            }
        }
    }

    function plugin( selector, option ) {
        if( !(selector && !$.isPlainObject(selector)) ) return false;

        var rtn = [];
        $(selector).each(function( index, self ){
            var $self = $(self)
                , data  = $self.data('spice.moveCenter');
            if (data){
                data.destroy();
            }
            $self.data('spice.moveCenter', (data = new moveCenter($self, option)));
            rtn.push(data);
        });
        return rtn;
    }
    $.spice.moveCenter = plugin;

})(jQuery);
