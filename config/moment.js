var ejs = require('ejs')
var moment = require('moment');

ejs.filters.formatDate = function(date){
	return moment(date).format('ll')
}
