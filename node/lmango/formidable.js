var formidable = require('formidable'),
	http = require('http'),
	util = require('util');
http.createServer(function(req,res){
	if(req.url == '/upload' && req.method.toLowerCase() == 'post'){
		var form = new formidable.IncomingForm();
		form.parse(req,function(err,fields,files){
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.write('received upload:\n\n');
			res.end(util.inspect({fields:fields,files:files}));
		});
		return;
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end('<!DOCTYPE html>'+
			'<html lang="en">'+
			'<head>'+
				'<meta charset="UTF-8">'+
				'<title>node.js学习</title>'+
			'</head>'+
			'<body>'+
				'<div style="text-align:center">'+
					'<form action="/upload" enctype="multipart/form-data" method="post">'+
						'<input type="text" name="title"><br>'+
						'<input type="file" name="upload" multiple="multiple"><br>'+
						'<input type="submit" value="上传是">'+
					'</form>'+
				'</div>'+
			'</body>'+
			'</html>');
}).listen(8080);
