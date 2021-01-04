const crypto = require('crypto');

exports.UUIDGeneratorNode = () =>
	([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
);

exports.currentTimestamp = function () {
	// function currentTimestamp() {
		var d = new Date();
		
		var hr = d.getHours();
		if (hr < 10) {
		    hr = "0" + hr;
		}
		var min = d.getMinutes();
		if (min < 10) {
		    min = "0" + min;
		}
		var sec = d.getSeconds();
		if (sec < 10) {
		    sec = "0" + sec;
		}

		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
		var month = d.getMonth() + 1;
		if (month < 10) {
		    month = "0" + month;
		}
		var year = d.getFullYear();		
		return "" + year + "" + month + "" + date + '-' + hr + "" + min + "" + sec;
	// }
};

exports.currentDatestamp = function () {
	// function currentTimestamp() {
		var d = new Date();
		
		var date = d.getDate();
		if (date < 10) {
		    date = "0" + date;
		}
		var month = d.getMonth() + 1;
		if (month < 10) {
		    month = "0" + month;
		}
		var year = d.getFullYear();		
		return "" + year + "" + month + "" + date;
	// }
};