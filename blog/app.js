var express = require('express');  //引入express
var path = require('path');  //引入path
var port = process.env.PORT || 3000;   //端口设置（process.env.PORT在shell环境下设置端口）
var app = express();  //设置服务

app.set('view engine','jade');  //设置默认的模板引擎
app.set('views','./views/pages');   //设置视图的根目录(jade文件目录)
app.use('/lib/',express.static(path.join(__dirname,'public/lib/bower_components/')));  //设置第三方引入静态资源路径
app.use('/static/',express.static(path.join(__dirname,'public/')));  //设置自己静态资源路径
app.listen(port);  //监听端口

app.get('/index',function(req,res){
	res.render('index',{ 
		title : "Imooc 首页",
		news : [
			{ 
				title : "这是首页1"
			},
			{ 
				title : "这是首页2"
			}
		]
	});
});

console.log('bolg started on port:'+port);

