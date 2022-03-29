;(function($){

	var datetime = $.spice.datetime;
	if(datetime){
		datetime.dates['en_US'] = {
			daysMin: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
			, months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
			, time: 'time'
			, clear: 'clear'
			, today: 'today'
			, confirm: 'confirm'
			, hour: 'hour'
			, minute: 'minute'
			, seconds: 'seconds'
		}
	}

})(jQuery);