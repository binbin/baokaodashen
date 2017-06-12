var superagent = require('superagent');
require('superagent-retry')(superagent);
var cheerio = require('cheerio')


var fs = require('fs')

var async = require('async')

var S = require('string');

var xss = require('xss')

var minify = require('html-minifier').minify;

var index =0 

var loop=function(arr,index,size,fun,realCallBack){
      fun(arr.slice(index,index+size),index,size,function(){
      	if(index+size<=arr.length){
      		loop(arr,index+size,size,fun,realCallBack)
      	}else{
      		realCallBack()
      	}
      });

}

fs.readFile('./school.sql', 'utf-8', function(err, data) {
	var arr = data.split(/\n/)
	loop(arr.slice(0, 5),0,1,function(array,index,size,cb){
	           async.mapSeries(array,function(n,callback){
			var id = (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
			superagent.get('http://gkcx.eol.cn/schoolhtm/specialty/specialtyList/specialty' + id + '.htm').retry(5).end(function(err, response){
				if (err) {
					console.log('$$$$err things')
					return console.log(err) && callback()
				}
				var $ = cheerio.load(response.text, {
					decodeEntities: false
				})
				var majors = []
				$('.table1 a').each(function(idx, element) {
					var $element = $(element);
					majors.push({
						name: $element.text(),
						href: $element.attr('href')
					})
				})
				async.mapLimit(majors,20, function(n, callback1){
					superagent.get('http://gkcx.eol.cn' + n['href']).retry(5).end(function(err, response1){
						if (err) {
							console.log('%%%%%http://gkcx.eol.cn' + n['href'])
							return console.log(err) && callback1()
						}
						var Jq = cheerio.load(response1.text, {
							decodeEntities: false
						})

						if (!Jq('div.Scores').html()) {
							console.log('#####http://gkcx.eol.cn' + n['href'])
							console.log('****error****')
						}
						var detail = xss((Jq('div.Scores').html()||'暂无内容').replace(/\b\w+=[^>]+/g,'').replace(/\n|\s+/g,'').replace(/'/g,'"'));
						var str = "insert into b_school_major(school_id,major_id,detail) select b_school.id,b_major.id,'" + detail + "' from b_school,b_major where b_school.eol_id=" + id + " and b_major.name='" + n['name'] + "' ;\n"
						fs.appendFile('school_major'+(index+1)+'-'+(index+size+1)+'.sql', str, function(err) {
							if (err) {
								console.log('file write error ')
								return console.log(err) && callback1()
							}
							callback1()
						});
					})
				},function(){
					callback()
				})
			})
	           },function(err, results){

				console.log('完成'+results.length)
				cb()
		})
	},function(){
		console.log('fixed')
	})
})

/*
fs.readFile('./school.sql', 'utf-8', function(err, data) {
		var arr = data.split(/\n/)
			// var arr1=arr.map(function(n){
			//     return  (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
			// })
			
			// arr.forEach(function(n) {
			// 		var id = (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
			// 		console.log(id)
			// 	})
			
		// async.mapLimit(arr, 5,function(n, callback) {
    async.mapSeries(arr, function(n, callback) {
			var id = (/(?:b_area\.id\,)(\d+)\,/).exec(n)[1]
			superagent.get('http://gkcx.eol.cn/schoolhtm/specialty/specialtyList/specialty' + id + '.htm').retry(5).end(function(err, response) {
				if (err) {
					console.log('$$$$err things')
					return console.log(err) && callback()
				}
				var $ = cheerio.load(response.text, {
					decodeEntities: false
				})
				var majors = []
				$('.table1 a').each(function(idx, element) {
					var $element = $(element);
					majors.push({
						name: $element.text(),
						href: $element.attr('href')
					})
				})
				// async.mapSeries(majors, function(n, callback1) {
        async.mapLimit(majors,20, function(n, callback1) {
					superagent.get('http://gkcx.eol.cn' + n['href']).retry(5).end(function(err, response1) {
						if (err) {
							console.log('%%%%%http://gkcx.eol.cn' + n['href'])
							return console.log(err) && callback1()
						}
						var Jq = cheerio.load(response1.text, {
							decodeEntities: false
						})

						if (!Jq('div.Scores').html()) {
							console.log('#####http://gkcx.eol.cn' + n['href'])
							console.log('****error****')
						}
						var detail = xss((Jq('div.Scores').html()||'暂无内容').replace(/\b\w+=[^>]+/g,'').replace(/\n|\s+/g,'').replace(/'/g,'"'));
						// var detail = Jq('div.Scores').html().replace(/\b\w+=[^>]+/g,'').replace(/\n|\s+/g,'').replace(/'/g,'"');
						// try {
						// 	detail = minify(detail, {
						// 		collapseWhitespace: true,
						// 		removeEmptyAttributes: true,
						// 		removeAttributeQuotes: true,
						// 		removeRedundantAttributes: true,
						// 		removeOptionalTags: true,
						// 		removeIgnored: true,
						// 		removeEmptyElements: true,
						// 		lint: true,
						// 		quoteCharacter: '"'
						// 	})
						// } catch (e) {
						// 	console.log('&&&&&http://gkcx.eol.cn' + n['href'])
						// 	console.log(e)
						// }

						var str = "insert into b_school_major(school_id,major_id,detail) select b_school.id,b_major.id,'" + detail + "' from b_school,b_major where b_school.eol_id=" + id + " and b_major.name='" + n['name'] + "' ;\n"
						fs.appendFile('school_major.sql', str, function(err) {
							if (err) {
								console.log('file write error ')
								return console.log(err) && callback1()
							}
							callback1()
						});
					})
				}, function(err, results) {
          console.log(index++)
					if (err) {
						console.log('err things')
						return console.log(err) && callback()
					}
					callback()
				})
			})
		},function(err, results){
			console.log('完成'+results.length)
		})

	})
*/
	/*
	superagent.get('http://gkcx.eol.cn/schoolhtm/specialty/specialtyList/specialty31.htm').end(function(err, response) {
		if (err) {
			console.log('err things')
			return console.log(err)
		}
		var $ = cheerio.load(response.text, {
			decodeEntities: false
		})
		var majors = []
		$('.table1 a').each(function(idx, element) {
			var $element = $(element);
			majors.push({
				name: $element.text(),
				href: $element.attr('href')
			})
		})
		async.mapSeries(majors, function(n, callback1) {
			superagent.get('http://gkcx.eol.cn' + n['href']).end(function(err, response) {
				console.log(n['name'])
				callback1(null, '+++' + n['name'])
			})
		}, function(err, results) {
			console.log('****')
			console.log(results)
		})
	})
	*/