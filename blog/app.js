var express = require('express');  //引入express
var path = require('path');  //引入path
var mongoose = require('mongoose');  //引入mongoose
var News = require('./models/news');  //引入文章模型
var _ = require('underscore');  //引入underscore，作用：用新的字段替换老的字段内容
var port = process.env.PORT || 3000;   //端口设置（process.env.PORT在shell环境下设置端口）
var app = express();  //设置服务

mongoose.connect('mongodb://localhost/lmango');

app.set('view engine','jade');  //设置默认的模板引擎
app.set('views','./views/pages');   //设置视图的根目录(jade文件目录)
app.use('/lib/',express.static(path.join(__dirname,'public/lib/bower_components/')));  //设置第三方引入静态资源路径
app.use('/static/',express.static(path.join(__dirname,'public/')));  //设置自己静态资源路径
app.listen(port);  //监听端口

app.get('/index',function(req,res){
	// News.fetch(funciton(err,news){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	res.render('index',{ 
	// 		title : "Lmango - 前端小学生 - 个人博客",
	// 		news : news
	// 	});
	// })
});

console.log('bolg started on port:'+port);

