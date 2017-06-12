var superagent = require('superagent')
var cheerio = require('cheerio')


var fs = require('fs')

var async = require('async')

var S = require('string');


var urls = []
for (var i = 1; i < 56; i++) {
// for (var i = 1; i < 10; i++) {
	urls.push('http://data.api.gkcx.eol.cn/soudaxue/queryschool.html?messtype=json&province=&schooltype=&page=' + i + '&size=50')
}


async.mapSeries(urls,  function(url, callback) {
	superagent.get(url).set('Content-Type', 'application/json').end(function(err, response) {
		if (err) {
			console.log('err things')
			return console.log(err) && callback()
		}
		async.mapSeries(response.body['school'],function(school,callback1){
            var str="insert into b_school(name,oldname,is985,is211,edudirectly,school_level,site_url,tuition,membership,code,school_type,school_nature,summary,school_property_id,area_id,eol_id,autonomyrs,library) select '{{schoolname}}','{{oldname}}',{{f985}},{{f211}},{{edudirectly}},'{{level}}','{{guanwang}}','{{shoufei}}','{{membership}}',{{schoolcode}},'{{schooltype}}','{{schoolnature}}','{{jianjie}}',b_school_property.id,b_area.id,{{schoolid}},'{{autonomyrs}}','{{library}}'  from b_school_property,b_area where b_school_property.name='{{schoolproperty}}' and b_area.province='{{province}}' "
			// S(str).template(response.body['school'][i]).s
			fs.appendFile('school.sql', S(str).template(school).s + ';\n', function(err) {
				console.log('ok')
				callback1()
			});
		})
		callback()
	});
}, function(err, result) {
	console.log('final:');
	console.log(result);
});
