/**
 @ Node.js base server
 */

 var http = require('http'),   //服务器创建
 	 dns  = require('dns'),    //dns查询
 	 fs   = require('fs'),     //文件操作
 	 url  = require('url'),    //url处理
 	 querystring = require('querystring');    //字符串处理
 http.createServer(function(req,res){
 	var pathname = url.parse(req.url).pathname;
 	req.setEncoding('utf8');
 	res.writeHead(200,{'Content-Type':'text/html'});
 	router(req,res,pathname);
 }).listen(1337,'127.0.0.1');
 function router(req,res,pathname){
 	switch (pathname) {
 		case '/parse':
 			parseDns(req,res);
 			break;
 		default:
 			goIndex(req,res);
 			break;
 	}
 }
 function parseDns(req,res){
 	var postData = '';
 	req.addListener('data',function(postDataChunk){
 		postData += postDataChunk;
 	});
 	req.addListener('end',function(){
 		var retData = getDns(postData,function(domain,addresses){
 			res.writeHead(200,{'Content-Type':'text/html'});
 			res.end('<!DOCTYPE html>'+
			'<html lang="en">'+
			'<head>'+
				'<meta charset="UTF-8">'+
				'<title>node.js学习</title>'+
			'</head>'+
			'<body>'+
				'<div style="text-align:center">'+
					'Domain: <span style="color:red">'+domain+'</span>'+
					'IP: <span style="color:green">'+addresses.join(',')+'</span>'+
				'</div>'+
			'</body>'+
			'</html>');
 		});
 		return;
 	});
 }
 function getDns(postData,callback){
 	var domain = querystring.parse(postData).search_dns;
 	dns.resolve(domain,function(err,addresses){
 		if(!addresses){
 			addresses = ['不存在域名'];
 		}
 		callback(domain,addresses);
 	})
 }
 function goIndex(req,res){
 	var readPath = './../' + url.parse('index.html').pathname;  //将url字符串转换为对象并取object.pathname值
 	var indexPage = fs.readFileSync(readPath);
 	res.end(indexPage);
 }



console.log('Server running at http://127.0.0.1:1337');
