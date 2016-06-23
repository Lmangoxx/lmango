/**
 @ httpParams.js 用于处理GET，POST请求
 */
var res,req,
    url = require('url'),
    querystring = require('querystring');
exports.init = function(response,request){
    res = response;
    req = request;
}
exports.GET = function(key){
    var paramStr = url.parse(req.url).query,
   		param = querystring.parse(paramStr);
   return param[key] ? param[key] : '';
}
exprots.POST = function(key,callback){
	//数据接收中
	var postData = '';
	req.addListener('data',function(postDataChunk){
		postData += postDataChunk;
	});
	req.addListener('end',function(){
		//数据接收完毕，执行回调函数
		var param = querystring.parse(postData);
		var value = param[key] ? param[key] : '';
		callback(value);
	});
}
