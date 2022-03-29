;(function($){

	var datetime = $.spice.datetime;
	if(datetime){
		datetime.dates['zh_HK'] = {
			daysMin: [ '日', '一', '二', '三', '四', '五', '六' ]
			, months: [ '01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月' ]
			, time: '時間'
			, clear: '清空'
			, today: '今天'
			, confirm: '確認'
			, hour: '小時'
			, minute: '分鐘'
			, seconds: '秒數'
		}
	}

})(jQuery);