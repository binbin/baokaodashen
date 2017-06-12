var superagent = require('superagent');
require('superagent-retry')(superagent);
var cheerio = require('cheerio')


var fs = require('fs')

var async = require('async')

var S = require('string');

var log4js = require('log4js');
/*
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/area_school_major_plan.log'), 'area_school_major_plan');
var logger = log4js.getLogger('area_school_major_plan');

logger.setLevel('DEGUG');
*/

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/area_school_major_plan.log', category: 'area_school_major_plan'}
  ]
});
var logger = log4js.getLogger('area_school_major_plan');
logger.setLevel('DEGUG');
// fs.readFile('./school.sql', 'utf-8', function(err, data) {

// })


superagent.get('http://gkcx.eol.cn/commonXML/schoolSpecialPoint/schoolSpecialPoint310_10002_10035.xml').retry(5).end(function(err, response){
	if (err) {
		if(err.status&&404==err.status){
			return callback(null,1)
		}
		logger.error(err.status)
		return logger.error(err) && callback(null,1)
	}
	var $ = cheerio.load(response.text, {
		decodeEntities: false
	})
	$('areapiont').each(function(idx, element) {
		var areapiont = $(element);
		logger.info(areapiont.html())
		logger.info(areapiont.find('year').text())
	})
})