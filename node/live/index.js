/**
 @ index.js 用于处理index.html页面展示
 */
var res,req,
    fs = require('fs'),
    url = require('url');
exports.init = function(response,request){
    res = response;
    req = request;
}
exports.index = function(){
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(indexPage);
}
