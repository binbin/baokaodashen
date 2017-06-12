var superagent = require('superagent')
var cheerio = require('cheerio')


var fs = require('fs')

var async = require('async')

var S = require('string');

var xss = require('xss')

var minify = require('html-minifier').minify;


var urls = []
for (var i = 1; i < 27; i++) {
	// for (var i = 1; i < 2; i++) {
	urls.push('http://data.api.gkcx.eol.cn/soudaxue/queryspecialty.html?messtype=json&page=' + i + '&size=50')
}


async.mapSeries(urls, function(url, callback) {
	superagent.get(url).set('Content-Type', 'application/json').end(function(err, response) {
		if (err) {
			console.log('err things')
			return console.log(err) && callback()
		}
		async.mapSeries(response.body['school'], function(major, callback1) {
			superagent.get('http://gkcx.eol.cn' + major['specialurl']).end(function(err, response) {
				if (err) {
					console.log('err things')
					return console.log(err) && callback1()
				}
				var $ = cheerio.load(response.text, {
					decodeEntities: false
				})
				var str = "insert into b_major(name,code,class,detail,zyid,level) values('{{specialname}}','{{code}}','{{zytype}}','{{detail}}',{{zyid}},'{{zycengci}}')"
				major['detail'] = xss(minify($('.query_box').html(), {
					collapseWhitespace: true
				}))

				// console.log(major['detail'])
				fs.appendFile('major.sql', S(str).template(major).s + ';\n', function(err) {
					console.log('ok')
					callback1()
				});
			})
		})
		callback()
	});
});