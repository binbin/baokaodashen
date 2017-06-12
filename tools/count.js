
var superagent = require('superagent');
require('superagent-retry')(superagent);
var cheerio = require('cheerio')


var fs = require('fs')

var async = require('async')

var S = require('string');

var xss = require('xss')

var minify = require('html-minifier').minify;

var index =0 
var s_index=0
fs.readFile('./school.sql', 'utf-8', function(err, data) {
	var arr = data.split(/\n/)
	// arr=arr.slice(0,2)
		// var arr1=arr.map(function(n){
		//     return  (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
		// })
		/*
		arr.forEach(function(n) {
				var id = (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
				console.log(id)
			})
		*/
	async.mapLimit(arr, 20,function(n, callback) {
	// async.mapSeries(arr, function(n, callback) {
		var id = (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
		superagent.get('http://gkcx.eol.cn/schoolhtm/specialty/specialtyList/specialty' + id + '.htm').retry(5).end(function(err, response) {
			if (err) {
				console.log('$$$$err things')
				return console.log(err) && callback(null,1)
			}
			var $ = cheerio.load(response.text, {
				decodeEntities: false
			})
			var c=0
			$('.table1 a').each(function(){
                c++
			})
			console.log('完成学校:'+(++s_index))
			callback(null,c)
		})
	},function(err, results){
		console.log(results)
		for(var i=0;i<results.length;i++){
			index+=results[i]
		}
		console.log('一共有专业'+index)
	})

})