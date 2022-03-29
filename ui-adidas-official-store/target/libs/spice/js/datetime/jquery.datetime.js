/**
 *
 * 日期控件
 * 详细用法请参考：http://v3.spice.lh/javascript/datetime
 * 如果链接无法访问，请联系QQ：1515110755 或 RTX：hong.liang
 *
 * @ author Razy
 * @ version 1.0
 *
 */

(function($){

    "use strict";

    // 全局配置，如果采用默认均不需要改动
    var config = {
        // 日期格式
        format: 'YYYY-MM-DD'
        // 最小日期
        , min: '1900-01-01 00:00:00'
        // 最大日期
        , max: '2099-12-31 23:59:59'
        , init: false
        , language: 'zh_CN'
    };

    var Dates = {}, doc = document, creat = 'createElement', byid = 'getElementById', tags = 'getElementsByTagName';
    var as = ['datetime-box', 'datetime-void', 'datetime-click'];


    //主接口
    var win = window;

    Dates.trim = function(str){
        str = str || '';
        return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
    };

    //补齐数位
    Dates.digit = function(num){
        return num < 10 ? '0' + (num|0) : num;
    };

    Dates.stopmp = function(e){
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        return this;
    };

    Dates.each = function(arr, fn){
        var i = 0, len = arr.length;
        for(; i < len; i++){
            if(fn(i, arr[i]) === false){
                break
            }
        }
    };

    Dates.hasClass = function(elem, cls){
        elem = elem || {};
        return new RegExp('\\b' + cls +'\\b').test(elem.className);
    };

    Dates.addClass = function(elem, cls){
        elem = elem || {};
        Dates.hasClass(elem, cls) || (elem.className += ' ' + cls);
        elem.className = Dates.trim(elem.className);
        return this;
    };

    Dates.removeClass = function(elem, cls) {
        elem = elem || {};
        if (Dates.hasClass(elem, cls)) {
            var reg = new RegExp('\\b' + cls +'\\b');
            elem.className = elem.className.replace(reg, '');
        }
        return this;
    };

    //清除css属性
    Dates.removeCssAttr = function(elem, attr){
        var s = elem.style;
        if(s.removeProperty){
            s.removeProperty(attr);
        } else {
            s.removeAttribute(attr);
        }
    };

    //显示隐藏
    Dates.shde = function(elem, type){
        elem.style.display = type ? 'none' : 'block';
    };

    //简易选择器
    Dates.query = function(node){
        if(node && node.nodeType === 1){
            if(node.tagName.toLowerCase() !== 'input'){
                throw new Error('选择器elem错误');
            }
            return node;
        }

        var node = (Dates.trim(node)).split(' '), elemId = doc[byid](node[0].substr(1)), arr;
        if(!elemId){
            return;
        } else if(!node[1]){
            return elemId;
        } else if(/^\./.test(node[1])){
            var find, child = node[1].substr(1), exp = new RegExp('\\b' + child +'\\b');
            arr = []
            find = doc.getElementsByClassName ? elemId.getElementsByClassName(child) : elemId[tags]('*');
            Dates.each(find, function(ii, that){
                exp.test(that.className) && arr.push(that); 
            });
            return arr[0] ? arr : '';
        } else {
            arr = elemId[tags](node[1]);
            return arr[0] ? elemId[tags](node[1]) : '';
        }
    };

    //事件监听器
    Dates.on = function(elem, even, fn){
        elem.attachEvent ? elem.attachEvent('on'+ even, function(){
            fn.call(elem, win.even);
        }) : elem.addEventListener(even, fn, false);
        return Dates;
    };

    //阻断mouseup
    Dates.stopMosup = function(evt, elem){
        if(evt !== $.spice.hasTouch ? 'touchend' : 'mouseup'){
            Dates.on(elem, $.spice.hasTouch ? 'touchend' : 'mouseup', function(ev){
                Dates.stopmp(ev);
            });
        }
    };

    Dates.run = function(options){
        var S = Dates.query, elem, devt, even = as.event, target;
        try {
            target = even.target || even.srcElement || {};
        } catch(e){
            target = {};
        }
        //elem = options.elem ? S(options.elem) : target;
        elem = options.elem ? $(options.elem)[0] : target;

        as.elemv = /textarea|input/.test(elem.tagName.toLocaleLowerCase()) ? 'value' : 'innerHTML';
        if (('init' in options ? options.init : config.init) && (!elem[as.elemv])) elem[as.elemv] = datetime.now(null, options.format || config.format);

        /*if(even && target.tagName){
            if(!elem || elem === Dates.elem){
                return;
            }
            Dates.stopMosup(even.type, elem);
            Dates.stopmp(even);
            Dates.view(elem, options);
            Dates.reshow();
        } else {*/
            devt = options.event || 'tap';
            Dates.each((elem.length|0) > 0 ? elem : [elem], function(ii, that){
                Dates.stopMosup(devt, that);
                $(that).off(devt).on(devt, function(ev){
                    Dates.stopmp(ev);
                    if(that !== Dates.elem){
                        Dates.view(that, options);
                        Dates.reshow();
                    }
                });
                /*Dates.on(that, devt, function(ev){
                    Dates.stopmp(ev);
                    if(that !== Dates.elem){
                        Dates.view(that, options);
                        Dates.reshow();
                    }
                });*/
            });
        //}
    };

    Dates.scroll = function(type){
        type = type ? 'scrollLeft' : 'scrollTop';
        return doc.body[type] | doc.documentElement[type];
    };

    Dates.winarea = function(type){
        return document.documentElement[type ? 'clientWidth' : 'clientHeight']
    };

    //判断闰年
    Dates.isleap = function(year){
        return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
    };

    //检测是否在有效期
    Dates.checkVoid = function(YY, MM, DD){
        var back = [];
        YY = YY|0;
        MM = MM|0;
        DD = DD|0;
        if(YY < Dates.mins[0]){
            back = ['y'];
        } else if(YY > Dates.maxs[0]){
            back = ['y', 1];
        } else if(YY >= Dates.mins[0] && YY <= Dates.maxs[0]){
            if(YY == Dates.mins[0]){
                if(MM < Dates.mins[1]){
                    back = ['m'];
                } else if(MM == Dates.mins[1]){
                    if(DD < Dates.mins[2]){
                        back = ['d'];
                    }
                }
            }
            if(YY == Dates.maxs[0]){
                if(MM > Dates.maxs[1]){
                    back = ['m', 1];
                } else if(MM == Dates.maxs[1]){
                    if(DD > Dates.maxs[2]){
                        back = ['d', 1];
                    }
                }
            }
        }
        return back;
    };

    //时分秒的有效检测
    Dates.timeVoid = function(times, index){
        if(Dates.ymd[1]+1 == Dates.mins[1] && Dates.ymd[2] == Dates.mins[2]){
            if(index === 0 && (times < Dates.mins[3])){
                return 1;
            } else if(index === 1 && times < Dates.mins[4]){
                return 1;
            } else if(index === 2 && times < Dates.mins[5]){
                return 1;
            }
        } else if(Dates.ymd[1]+1 == Dates.maxs[1] && Dates.ymd[2] == Dates.maxs[2]){
            if(index === 0 && times > Dates.maxs[3]){
                return 1;
            } else if(index === 1 && times > Dates.maxs[4]){
                return 1;
            } else if(index === 2 && times > Dates.maxs[5]){
                return 1;
            }
        }
        if(times > (index ? 59 : 23)){
            return 1;
        }
    };

    //检测日期是否合法
    Dates.check = function(){
        var reg = Dates.options.format.replace(/YYYY|MM|DD|hh|mm|ss/g,'\\d+\\').replace(/\\$/g, '');
        var exp = new RegExp(reg), value = Dates.elem[as.elemv];
        var arr = value.match(/\d+/g) || [], isvoid = Dates.checkVoid(arr[0], arr[1], arr[2]);
        if(value.replace(/\s/g, '') !== ''){
            if(!exp.test(value)){
                Dates.elem[as.elemv] = '';
                //Dates.msg('日期不符合格式，请重新选择。');
                return 1;
            } else if(isvoid[0]){
                Dates.elem[as.elemv] = '';
                //Dates.msg('日期不在有效期内，请重新选择。');
                return 1;
            } else {
                isvoid.value = Dates.elem[as.elemv].match(exp).join();
                arr = isvoid.value.match(/\d+/g);
                if(arr[1] < 1){
                    arr[1] = 1;
                    isvoid.auto = 1;
                } else if(arr[1] > 12){
                    arr[1] = 12;
                    isvoid.auto = 1;
                } else if(arr[1].length < 2){
                    isvoid.auto = 1;
                }
                if(arr[2] < 1){
                    arr[2] = 1;
                    isvoid.auto = 1;
                } else if(arr[2] > Dates.months[(arr[1]|0)-1]){
                    arr[2] = 31;
                    isvoid.auto = 1;
                } else if(arr[2].length < 2){
                    isvoid.auto = 1;
                }
                if(arr.length > 3){
                    if(Dates.timeVoid(arr[3], 0)){
                        isvoid.auto = 1;
                    };
                    if(Dates.timeVoid(arr[4], 1)){
                        isvoid.auto = 1;
                    };
                    if(Dates.timeVoid(arr[5], 2)){
                        isvoid.auto = 1;
                    };
                }
                if(isvoid.auto){
                    Dates.creation([arr[0], arr[1]|0, arr[2]|0], 1);
                } else if(isvoid.value !== Dates.elem[as.elemv]){
                    Dates.elem[as.elemv] = isvoid.value;
                }
            }
        }
    };

    //生成日期
    Dates.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    Dates.viewDate = function(Y, M, D){
        var S = Dates.query, log = {}, De = new Date();
        Y < (Dates.mins[0]|0) && (Y = (Dates.mins[0]|0));
        Y > (Dates.maxs[0]|0) && (Y = (Dates.maxs[0]|0));
        
        De.setFullYear(Y, M, D);
        log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];
        
        Dates.months[1] = Dates.isleap(log.ymd[0]) ? 29 : 28;
        
        De.setFullYear(log.ymd[0], log.ymd[1], 1);
        log.FDay = De.getDay();
        
        log.PDay = Dates.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
        log.NDay = 1;
        
        //渲染日
        Dates.each(as.tds, function(i, elem){
            var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
            elem.className = '';
            if(i < log.FDay){
                elem.innerHTML = DD = i + log.PDay;
                Dates.addClass(elem, 'datetime-nothis');
                MM === 1 && (YY -= 1);
                MM = MM === 1 ? 12 : MM - 1; 
            } else if(i >= log.FDay && i < log.FDay + Dates.months[log.ymd[1]]){
                elem.innerHTML = DD = i  - log.FDay + 1;
                if(i - log.FDay + 1 === log.ymd[2]){
                    Dates.addClass(elem, as[2]);
                    log.thisDay = elem;
                }
            } else {
                elem.innerHTML = DD = log.NDay++;
                Dates.addClass(elem, 'datetime-nothis');
                MM === 12 && (YY += 1);
                MM = MM === 12 ? 1 : MM + 1; 
            }
           
            if(Dates.checkVoid(YY, MM, DD)[0]){
                Dates.addClass(elem, as[1]);
            }
            
            //Dates.options.festival && Dates.festival(elem, MM + '.' + DD);
            elem.setAttribute('y', YY);
            elem.setAttribute('m', MM);
            elem.setAttribute('d', DD);
            YY = MM = DD = null;
        });
        
        Dates.valid = !Dates.hasClass(log.thisDay, as[1]);
        Dates.ymd = log.ymd;
        
        //锁定年月
        as.year.innerHTML = Dates.ymd[0]/* + Dates.options.language.year*/;
        as.month.innerHTML = Dates.options.language.months[ Dates.ymd[1] ];
        
        //定位月
        Dates.each(as.mms, function(i, elem){
            var getCheck = Dates.checkVoid(Dates.ymd[0], (elem.getAttribute('m')|0) + 1);
            if(getCheck[0] === 'y' || getCheck[0] === 'm'){
                Dates.addClass(elem, as[1]);
            } else {
                Dates.removeClass(elem, as[1]);
            }
            Dates.removeClass(elem, as[2]);
            getCheck = null
        });
        Dates.addClass(as.mms[Dates.ymd[1]], as[2]);
        
        //定位时分秒
        log.times = [
            Dates.inymd[3]|0 || 0, 
            Dates.inymd[4]|0 || 0, 
            Dates.inymd[5]|0 || 0
        ];
        Dates.each(new Array(3), function(i){
            Dates.hmsin[i].innerHTML = Dates.digit(Dates.timeVoid(log.times[i], i) ? Dates.mins[i+3]|0 : log.times[i]|0);
        });
        
        //确定按钮状态
        Dates[Dates.valid ? 'removeClass' : 'addClass'](as.ok, as[1]);
    };

    //节日
    /*Dates.festival = function(td, md){
        var str;
        switch(md){
            case '1.1':
                str = '元旦';
            break;
            case '3.8':
                str = '妇女';
            break;
            case '4.5':
                str = '清明';
            break;
            case '5.1':
                str = '劳动';
            break;
            case '6.1':
                str = '儿童';
            break;
            case '9.10':
                str = '教师';
            break;
            case '10.1':
                str = '国庆';
            break;
        };
        str && (td.innerHTML = str);
        str = null;
    };*/

    //生成年列表
    Dates.viewYears = function(YY){
        var S = Dates.query, str = '';
        Dates.each(new Array(14), function(i){
            if(i === 7) {
                str += '<li '+ (parseInt(as.year.innerHTML) === YY ? 'class="'+ as[2] +'"' : '') +' y="'+ YY +'">'+ YY + /*Dates.options.language.year + */'</li>';
            } else {
                str += '<li y="'+ (YY-7+i) +'">'+ (YY-7+i) + /*Dates.options.language.year + */'</li>';
            }
        }); 
        S('#datetime-ys').innerHTML = str;
        Dates.each(S('#datetime-ys li'), function(i, elem){
            if(Dates.checkVoid(elem.getAttribute('y'))[0] === 'y'){
                Dates.addClass(elem, as[1]);
            } else {
                Dates.on(elem, 'click', function(ev){
                    Dates.stopmp(ev).reshow();
                    Dates.viewDate(this.getAttribute('y')|0, Dates.ymd[1], Dates.ymd[2]);
                });
            }
        });
    };

    //初始化面板数据
    Dates.initDate = function(){
        var S = Dates.query, log = {}, De = new Date();
        var ymd = Dates.elem[as.elemv].match(/\d+/g) || [];
        if(ymd.length < 3){
            ymd = Dates.options.start.match(/\d+/g) || [];
            if(ymd.length < 3){
                ymd = [De.getFullYear(), De.getMonth()+1, De.getDate()];
            }
        }
        Dates.inymd = ymd;
        Dates.viewDate(ymd[0], ymd[1]-1, ymd[2]);
    };

    //是否显示零件
    Dates.iswrite = function(){
        var S = Dates.query, log = {
            time: S('#datetime-hms')
        };
        Dates.shde(log.time, !Dates.options.istime);
        Dates.shde(as.oclear, !('isclear' in Dates.options ? Dates.options.isclear : 1));
        Dates.shde(as.otoday, !('istoday' in Dates.options ? Dates.options.istoday : 1));
        Dates.shde(as.ok, !('issure' in Dates.options ? Dates.options.issure : 1));
    };

    //方位辨别
    Dates.orien = function(obj, pos){
        var tops, rect = Dates.elem.getBoundingClientRect();
        obj.style.left = rect.left + (pos ? 0 : Dates.scroll(1)) + 'px';
        if(rect.bottom + obj.offsetHeight/1.5 <= Dates.winarea()){
            tops = rect.bottom - 1;         
        } else {
            tops = rect.top > obj.offsetHeight/1.5 ? rect.top - obj.offsetHeight + 1 : Dates.winarea() - obj.offsetHeight;
        }
        obj.style.top = Math.max(tops + (pos ? 0 : Dates.scroll()),1) + 'px';
    };

    //吸附定位
    Dates.follow = function(obj){
        if(Dates.options.fixed){
            obj.style.position = 'fixed';
            Dates.orien(obj, 1);
        } else {
            obj.style.position = 'absolute';
            Dates.orien(obj);
        }
    };

    //生成表格
    Dates.viewtbHTML = '';
    Dates.viewtb = function(){
        var tr, view = [], weeks = Dates.options.language.daysMin;
        var log = {}, table = doc[creat]('table'), thead = doc[creat]('thead');
        thead.appendChild(doc[creat]('tr'));
        log.creath = function(i){
            var th = doc[creat]('th');
            th.innerHTML = weeks[i];
            thead[tags]('tr')[0].appendChild(th);
            th = null;
        };
        
        Dates.each(new Array(6), function(i){
            view.push([]);
            tr = table.insertRow(0);
            Dates.each(new Array(7), function(j){
                view[i][j] = 0;
                i === 0 && log.creath(j);
                tr.insertCell(j);
            });
        });
        
        table.insertBefore(thead, table.children[0]); 
        table.id = table.className = 'datetime-table';
        tr = view = null;
        return table.outerHTML.toLowerCase();
    };

    //渲染控件骨架
    Dates.view = function(elem, options){
        var S = Dates.query, div, log = {};
        options = options || elem;

        Dates.elem = elem;
        Dates.options = options;
        Dates.options.format || (Dates.options.format = config.format);
        Dates.options.start = Dates.options.start || '';
        Dates.mm = log.mm = [Dates.options.min || config.min, Dates.options.max || config.max];
        Dates.mins = log.mm[0].match(/\d+/g);
        Dates.maxs = log.mm[1].match(/\d+/g);

        //if( !Dates.viewtbHTML ){
        Dates.viewtbHTML = Dates.viewtb();
        //}
        
        $( '#' + as[0] ).remove();

        //if(!Dates.box){
        div = doc[creat]('div');
        div.id = as[0];
        div.className = as[0];
        div.style.cssText = 'position: absolute;';
        
        div.innerHTML =  log.html = '<div class="datetime-top">'
          +'<div class="datetime-ym datetime-y" id="datetime-YY">'
            +'<a class="datetime-choose datetime-chprev datetime-tab"><cite></cite></a>'
            +'<span id="datetime-y"></span><label></label>'
            +'<a class="datetime-choose datetime-chnext datetime-tab"><cite></cite></a>'
            +'<div class="datetime-yms">'
              +'<a class="datetime-tab datetime-chtop"><cite></cite></a>'
              +'<ul id="datetime-ys"></ul>'
              +'<a class="datetime-tab datetime-chdown"><cite></cite></a>'
            +'</div>'
          +'</div>'
          +'<div class="datetime-ym datetime-m" id="datetime-MM">'
            +'<a class="datetime-choose datetime-chprev datetime-tab"><cite></cite></a>'
            +'<span id="datetime-m"></span><label></label>'
            +'<a class="datetime-choose datetime-chnext datetime-tab"><cite></cite></a>'
            +'<div class="datetime-yms" id="datetime-ms">'+ function(){
                var str = ''
                    , months = Dates.options.language.months;
                Dates.each(months, function(i){
                    str += '<span m="'+ i +'">'+ months[i] +'</span>';
                });
                
                return str;
            }() +'</div>'
          +'</div>'
        +'</div>'
        
        + Dates.viewtbHTML
        
        +'<div class="datetime-bottom">'
          +'<ul id="datetime-hms">'
            +'<li class="datetime-sj">' + Dates.options.language.time + '</li>'
            +'<li><span></span>:</li>'
            +'<li><span></span>:</li>'
            +'<li><span></span></li>'
          +'</ul>'
          +'<div class="datetime-time" id="datetime-time"></div>'
          +'<div class="datetime-btn">'
            +'<a id="datetime-clear">' + Dates.options.language.clear + '</a>'
            +'<a id="datetime-today">' + Dates.options.language.today + '</a>'
            +'<a id="datetime-ok">' + Dates.options.language.confirm + '</a>'
          +'</div>'
        +'</div>';
        doc.body.appendChild(div); 
        Dates.box = S('#'+as[0]);        
        Dates.events();
        div = null;
        /*} else {
            Dates.shde(Dates.box);
        }*/
        Dates.follow(Dates.box);
        options.zIndex ? Dates.box.style.zIndex = options.zIndex : Dates.removeCssAttr(Dates.box, 'z-index');
        Dates.stopMosup('click', Dates.box);
        
        Dates.initDate();
        Dates.iswrite();
        Dates.check();
    };

    //隐藏内部弹出元素
    Dates.reshow = function(){
        Dates.each(Dates.query('#'+ as[0] +' .datetime-show'), function(i, elem){
            Dates.removeClass(elem, 'datetime-show');
        });
        return this;
    };

    //关闭控件
    Dates.close = function(){
        Dates.reshow();
        Dates.shde(Dates.query('#'+ as[0]), 1);
        Dates.elem.blur();
        Dates.elem = null;
    };

    //转换日期格式
    Dates.parse = function(ymd, hms, format){
        ymd = ymd.concat(hms);
        format = format || (Dates.options ? Dates.options.format : config.format);
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index){
            ymd.index = ++ymd.index|0;
            return Dates.digit(ymd[ymd.index]);
        });     
    };

    //返回最终日期
    Dates.creation = function(ymd, hide){
        var S = Dates.query, hms = Dates.hmsin;
        var getDates = Dates.parse(ymd, [hms[0].innerHTML, hms[1].innerHTML, hms[2].innerHTML]);
        Dates.elem[as.elemv] = getDates;
        if(!hide){
            Dates.close();
            typeof Dates.options.choose === 'function' && Dates.options.choose(getDates); 
        }
    };

    //事件
    Dates.events = function(){
        var S = Dates.query, log = {
            box: '#'+as[0]
        };
        
        Dates.addClass(doc.body, 'datetime-body');
        
        as.tds = S('#datetime-table td');
        as.mms = S('#datetime-ms span');
        as.year = S('#datetime-y');
        as.month = S('#datetime-m');

        //显示更多年月
        Dates.each(S(log.box + ' .datetime-ym'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                Dates.addClass(this[tags]('div')[0], 'datetime-show');
                if(!i){
                    log.YY = parseInt(as.year.innerHTML);
                    Dates.viewYears(log.YY);
                }
            });
        });
        
        Dates.on(S(log.box), 'click', function(){
            Dates.reshow();
        });
        
        //切换年
        log.tabYear = function(type){  
            if(type === 0){
                Dates.ymd[0]--;
            } else if(type === 1) {
                Dates.ymd[0]++;
            } else if(type === 2) {
                log.YY -= 14;
            } else {
                log.YY += 14;
            }
            if(type < 2){
                Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
                Dates.reshow();
            } else {
                Dates.viewYears(log.YY);
            }
        };
        Dates.each(S('#datetime-YY .datetime-tab'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev);
                log.tabYear(i);
            });
        });
        
        
        //切换月
        log.tabMonth = function(type){
            if(type){
                Dates.ymd[1]++;
                if(Dates.ymd[1] === 12){
                    Dates.ymd[0]++;
                    Dates.ymd[1] = 0;
                }            
            } else {
                Dates.ymd[1]--;
                if(Dates.ymd[1] === -1){
                    Dates.ymd[0]--;
                    Dates.ymd[1] = 11;
                }
            }
            Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
        };
        Dates.each(S('#datetime-MM .datetime-tab'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                log.tabMonth(i);
            });
        });
        
        //选择月
        Dates.each(S('#datetime-ms span'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                if(!Dates.hasClass(this, as[1])){
                    Dates.viewDate(Dates.ymd[0], this.getAttribute('m')|0, Dates.ymd[2]);
                }
            });
        });
        
        //选择日
        Dates.each(S('#datetime-table td'), function(i, elem){
            Dates.on(elem, 'click', function(ev){
                if(!Dates.hasClass(this, as[1])){
                    Dates.stopmp(ev);
                    Dates.creation([this.getAttribute('y')|0, this.getAttribute('m')|0, this.getAttribute('d')|0]);
                }
            });
        });
        
        //清空
        as.oclear = S('#datetime-clear');
        Dates.on(as.oclear, 'click', function(){
            Dates.elem[as.elemv] = '';
            Dates.close();
            typeof Dates.options.choose === 'function' && Dates.options.choose(); 
        });
        
        //今天
        as.otoday = S('#datetime-today');
        Dates.on(as.otoday, 'click', function(){
            var now = new Date();
            Dates.creation([now.getFullYear(), now.getMonth() + 1, now.getDate()]);
        });
        
        //确认
        as.ok = S('#datetime-ok');
        Dates.on(as.ok, 'click', function(){
            if(Dates.valid){
                Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
            }
        });
        
        //选择时分秒
        log.times = S('#datetime-time');
        Dates.hmsin = log.hmsin = S('#datetime-hms span');
        log.hmss = [Dates.options.language.hour, Dates.options.language.minute, Dates.options.language.seconds];
        log.hmsarr = [];
        
        //生成时分秒或警告信息
        Dates.msg = function(i, title){
            var str = '<div class="datetime-hsmtex">'+ title +'<span>×</span></div>';
            if(typeof i === 'string'){
                str += '<p>'+ i +'</p>';
                Dates.shde(S('#'+as[0]));
                Dates.removeClass(log.times, 'datetime-time1').addClass(log.times, 'datetime-msg');
            } else {
                if(!log.hmsarr[i]){
                    str += '<div id="datetime-hmsno" class="datetime-hmsno">';
                    Dates.each(new Array(i === 0 ? 24 : 60), function(i){
                        str += '<span>'+ i +'</span>';
                    });
                    str += '</div>'
                    log.hmsarr[i] = str;
                } else {
                    str = log.hmsarr[i];
                }
                Dates.removeClass(log.times, 'datetime-msg');
                Dates[i=== 0 ? 'removeClass' : 'addClass'](log.times, 'datetime-time1');
            }
            Dates.addClass(log.times, 'datetime-show');
            log.times.innerHTML = str;
        };
        
        log.hmson = function(input, index){
            var span = S('#datetime-hmsno span'), set = Dates.valid ? null : 1;
            Dates.each(span, function(i, elem){
                if(set){
                    Dates.addClass(elem, as[1]);
                } else if(Dates.timeVoid(i, index)){
                    Dates.addClass(elem, as[1]);
                } else {
                    Dates.on(elem, 'click', function(ev){
                        if(!Dates.hasClass(this, as[1])){
                            input.innerHTML = Dates.digit(this.innerHTML|0);
                        }
                    });
                } 
            });
            Dates.addClass(span[input.value|0], 'datetime-click');
        };
        
        //展开选择
        Dates.each(log.hmsin, function(i, elem){
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                Dates.msg(i, log.hmss[i]);
                log.hmson(this, i);
            });
        });
        Dates.on(doc, $.spice.hasTouch ? 'touchend' : 'mouseup', function(){
            var box = S('#'+as[0]);
            if(box && box.style.display !== 'none'){
                Dates.check() || Dates.close();
            }
        }).on(doc, 'keydown', function(event){
            event = event || win.event;
            var codes = event.keyCode;

            //如果在日期显示的时候按回车
            if(codes === 13 && Dates.elem){
                Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
            }
        });
    };

    var datetime = function(options){
        options = options || {};
        try{
            as.event = win.event ? win.event : datetime.caller.arguments[0];
        } catch(e){};
        Dates.run(options);
        return datetime;
    };

    //重置定位
    datetime.reset = function(){
        (Dates.box && Dates.elem) && Dates.follow(Dates.box);
    };

    //返回指定日期
    datetime.now = function(timestamp, format){
        var De = new Date((timestamp|0) ? function(tamp){
            return tamp < 86400000 ? (+new Date + tamp*86400000) : tamp;
        }(parseInt(timestamp)) : +new Date);
        return Dates.parse(
            [De.getFullYear(), De.getMonth()+1, De.getDate()],
            [De.getHours(), De.getMinutes(), De.getSeconds()],
            format
        );
    };

    $.spice.datetime = function( selector, option ){
        if( !(selector && !$.isPlainObject(selector)) ) return false;
        if( !option ){
            option = {};
        }
        var language = option.language;
        if( !language ){
            language = 'zh_CN';
            option.language = $.spice.datetime.dates[language];
        }else if( $.type(language) == 'string' ){
            option.language = $.spice.datetime.dates[language];
        }

        $.each($(selector), function(i, elems){
            $(elems).data('spice.datetime', datetime(
                $.extend({}
                    , {elem:elems}
                    , option)
            ));
        });
        
    }

    $.spice.datetime.dates = {};

})(jQuery);