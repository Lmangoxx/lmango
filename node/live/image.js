/**
 @ image.js 用于处理图片展示
 */
var res,req,
    fs = require('fs'),
    url = require('url');
exports.init = function(response,request){
    res = response;
    req = request;
}
exports.image = function(imgUrl){
    var readPath = __dirname + '/' + url.parse(imgUrl).pathname;
    var imgPage = fs.readFileSync(readPath);
    res.writeHead(200,{'Content-Type':'image/png'});
    res.end(imgPage);
}
