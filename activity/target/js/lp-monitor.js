$(function() {
    // 换图 + 懒加载
    $.spice.lazyLoad('img[lazysrc]', {
        attr: 'lazysrc'
    });
    $.spice.tools.changeImageSrc({
        callBack: function(img, self) {
            $.spice.lazyLoad('img[lazysrc]', {
                attr: self.opt.lazyData,
                prestrain: 1
            });
        }
    });

    // 视频
        $('.e-lp-video-btn').on('tap', function(e) {
            e.preventDefault();
            var _this = $(this),
                videoCode =_this.data('videoCode');

            openVideo(videoCode, 'true');
        });
    // 视频 end
    

    //数字滚动
    (function ($) {
        $.fn.numberAnimate = function (setting) {
            var defaults = {
                speed: 1000,//动画速度
                num: "", //初始化值
                iniAnimate: true, //是否要初始化动画效果
                symbol: '',//默认的分割符号，千，万，千万
                dot: 0 //保留几位小数点
            }
            //如果setting为空，就取default的值
            var setting = $.extend(defaults, setting);

            //如果对象有多个，提示出错
            if ($(this).length > 1) {
                alert("just only one obj!");
                return;
            }

            //如果未设置初始化值。提示出错
            if (setting.num == "") {
                alert("must set a num!");
                return;
            }
            var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

            //数字处理
            var numToArr = function (num) {
                num = parseFloat(num).toFixed(setting.dot);
                if (typeof (num) == 'number') {
                    var arrStr = num.toString().split("");
                } else {
                    var arrStr = num.split("");
                }
                //console.log(arrStr);
                return arrStr;
            }

            //设置DOM symbol:分割符号
            var setNumDom = function (arrStr) {
                var shtml = '<div class="mt-number-animate">';
                for (var i = 0, len = arrStr.length; i < len; i++) {
                    if (i != 0 && (len - i) % 3 == 0 && setting.symbol != "" && arrStr[i] != ".") {
                        shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
                    } else {
                        shtml += nHtml.replace("{{num}}", arrStr[i]);
                    }
                }
                shtml += '</div>';
                return shtml;
            }

            //执行动画
            var runAnimate = function ($parent) {
                $parent.find(".mt-number-animate-dom").each(function () {
                    var num = $(this).attr("data-num");
                    num = (num == "." ? 10 : num);
                    var spanHei = $(this).height() / 11; //11为元素个数
                    var thisTop = -num * spanHei + "px";
                    if (thisTop != $(this).css("top")) {
                        if (setting.iniAnimate) {
                            //HTML5不支持
                            if (!window.applicationCache) {
                                $(this).animate({
                                    top: thisTop
                                }, setting.speed);
                            } else {
                                $(this).css({
                                    'transform': 'translateY(' + thisTop + ')',
                                    '-ms-transform': 'translateY(' + thisTop + ')',   /* IE 9 */
                                    '-moz-transform': 'translateY(' + thisTop + ')',  /* Firefox */
                                    '-webkit-transform': 'translateY(' + thisTop + ')', /* Safari 和 Chrome */
                                    '-o-transform': 'translateY(' + thisTop + ')',
                                    '-ms-transition': setting.speed / 1000 + 's',
                                    '-moz-transition': setting.speed / 1000 + 's',
                                    '-webkit-transition': setting.speed / 1000 + 's',
                                    '-o-transition': setting.speed / 1000 + 's',
                                    'transition': setting.speed / 1000 + 's'
                                });
                            }
                        } else {
                            setting.iniAnimate = true;
                            $(this).css({
                                top: thisTop
                            });
                        }
                    }
                });
            }

            //初始化
            var init = function ($parent) {
                //初始化
                $parent.html(setNumDom(numToArr(setting.num)));
                runAnimate($parent);
            };

            //重置参数
            this.resetData = function (num) {
                var newArr = numToArr(num);
                var $dom = $(this).find(".mt-number-animate-dom");
                if ($dom.length < newArr.length) {
                    $(this).html(setNumDom(numToArr(num)));
                } else {
                    $dom.each(function (index, el) {
                        $(this).attr("data-num", newArr[index]);
                    });
                }
                runAnimate($(this));
            }
            //init
            init($(this));
            return this;
        }
    })(jQuery);
    var roundnessNO1 = $(".numberRun-one-number1").text()
    var roundnessNO2 = $(".numberRun-one-number2").text()
    var roundnessNO3 = $(".numberRun-one-number3").text()
    var roundnessNO4 = $(".numberRun-one-number4").text()
    var roundnessNO5 = $(".numberRun-one-number5").text()
    var roundnessNO6 = $(".numberRun-one-number6").text()
    var roundnessNO7 = $(".numberRun-one-number7").text()
    var roundnessNO8 = $(".numberRun-one-number8").text()
    var roundnessNO9 = $(".numberRun-one-number9").text()
    var roundnessNO10 = $(".numberRun-one-number10").text()
    var roundnessNO11 = $(".numberRun-one-number11").text()
    var numRun1 = $(".article-one .numberRun-one").numberAnimate({ num: roundnessNO1, speed: 1000, symbol: "," });
    var numRun2 = $(".article-one .numberRun-two").numberAnimate({ num: roundnessNO2, speed: 1000, symbol: "," });
    var numRun3 = $(".article-two .numberRun-one").numberAnimate({ num: roundnessNO3, speed: 1000, symbol: "," });
    var numRun4 = $(".article-two .numberRun-two").numberAnimate({ num: roundnessNO4, speed: 1000, symbol: "," });
    var numRun5 = $(".article-two .numberRun-three").numberAnimate({ num: roundnessNO5, speed: 1000, symbol: "," });
    var numRun6 = $(".article-three .numberRun-one").numberAnimate({ num: roundnessNO6, speed: 1000, symbol: "," });
    var numRun7 = $(".article-three .numberRun-two").numberAnimate({ num: roundnessNO7, speed: 1000, symbol: "," });
    var numRun8 = $(".article-three .numberRun-three").numberAnimate({ num: roundnessNO8, speed: 1000, symbol: "," });
    var numRun9 = $(".article-four .numberRun-one").numberAnimate({ num: roundnessNO9, speed: 1000, symbol: "," });
    var numRun10 = $(".article-four .numberRun-two").numberAnimate({ num: roundnessNO10, speed: 1000, symbol: "," });
    var numRun11 = $(".article-four .numberRun-three").numberAnimate({ num: roundnessNO11, speed: 1000, symbol: "," });
    //饼状图
    function demo(newData,bgColor,bdColor,bdWidth){
        return {
            type: 'pie',
            data: {
                datasets: [{
                    data: newData,
                    backgroundColor: bgColor,
                    borderColor:bdColor,
                    borderWidth:bdWidth
                }]
            },
                options: {
                    events: [],
                    tooltips: {
                        enabled: false,
                        intersect:false
                    },
                    onHover:{
                        intersect:false
                    }

                }
        };
    }
    var ctx1 = document.getElementById('chart-area').getContext('2d');
    var ctx2 = document.getElementById('chart-area-two').getContext('2d');
    var roundnessNO = $(".order-four-two-number1").text()
    var roundnessNT = $(".order-four-two-number2").text()
    var roundnessNS = $(".order-four-two-number3").text()
    var roundnessNf = $(".order-four-two-number4").text()
    window.myPie1 = new Chart(ctx1, demo([roundnessNO, roundnessNT],
        ['rgba(237, 122, 123, 0.7)','rgba(246, 165, 125, 0.7)'],
        ['rgba(237, 122, 123, 0.7)','rgba(246, 165, 125, 0.7)'],
        0.1));
    window.myPie1 = new Chart(ctx2, demo([roundnessNS, roundnessNf],
        ['rgba(237, 122, 123, 0.7)', 'rgba(246, 165, 125, 0.7)'],
        ['rgba(237, 122, 123, 0.7)', 'rgba(246, 165, 125, 0.7)'],
        0.1));    
 

	// 画热区
	// window.hotSpot = $.posHotSpot('', { extandClass: 'link', prefixClass: 'link-'});
	// hotSpot.css = function () {
	// 	hotSpot.savePartCss()
	// };
	// hotSpot.html = function () {
	// 	hotSpot.savePartHtml()
	// };


});