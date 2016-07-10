var express = require('express');  //引入express
var path = require('path');  //引入path
var bodyParser = require('body-parser');
var mongoose = require('mongoose');  //引入mongoose
var Article = require('./models/article');  //引入文章模型
var _ = require('underscore');  //引入underscore，作用：用新的字段替换老的字段内容
var port = process.env.PORT || 3000;   //端口设置（process.env.PORT在shell环境下设置端口）
var app = express();  //设置服务
var index_title = "Lmango - 前端小学生 - 个人博客";
var admin_title = "后台管理系统 - Lmango";

mongoose.connect('mongodb://localhost/lmango');   //数据库名称lmango

app.set('view engine','jade');  //设置默认的模板引擎
app.set('views','./views/pages');   //设置视图的根目录(jade文件目录)
//app.use(express.bodyParer());
app.use(bodyParser());
app.use('/lib/',express.static(path.join(__dirname,'public/lib/bower_components/')));  //设置第三方引入静态资源路径
app.use('/static/',express.static(path.join(__dirname,'public/')));  //设置自己静态资源路径

//空数据对象
var emptyArticle = {
	title : '',      //文章标题
	author : '',     //作者
	source : '',     //文章来源
	classify : '',   //文章分类
	keywords : '',   //关键字
	newsType : '',   //文章类型(置顶，热门，精华之类)
	show : '',       //是否显示
	content : ''     //文章内容
}

//首页路由
app.get('/index',function (req, res){
	Article.fetch(function (err, articles){
		if(err){
			console.log(err);
		}
		res.render('index',{ 
			title : index_title,
			articles : articles
		});
	})
})

//文章详情页路由
app.get('/article/:id',function (req, res){
	var id = req.params.id;
	Article.findById(id,function (err, article){ 
		if(err){ 
			console.log(err);
		}
		res.render('article',{ 
			title : article.title,
			article : article
		});
	}) 
})

//后台管理员文章录入路由
app.get('/admin/article/add',function (req, res){
	res.render('admin/add_article',{
		title : admin_title,
		article : emptyArticle
	});
})

//后台添加新文章
app.post('/admin/article/adding', function (req, res) {
    var articleObj = req.body.article;
    var id = articleObj._id;
    var _article;
    if (id != 'undefined') {
        Article.findById(id, function (err, article) {
            if (err) {
                console.log(err);
            }
            _article = _.extend(article, articleObj);
            _article.save(function (err, article) {
                if (err) {
                    console.log(err);
                }
                // res.redirect('/detail/' + movie._id);  跳转到某个页面
            });
        });
    } else {
        _article = new Article({
            title : articleObj.title,      //文章标题
			author : articleObj.author,     //作者
			source : articleObj.source,     //文章来源
			classify : articleObj.classify,   //文章分类
			keywords : articleObj.keywords,   //关键字
			newsType : articleObj.newsType,   //文章类型(置顶，热门，精华之类)
			show : articleObj.show,       //是否显示
			content : articleObj.content     //文章内容
        });
        _article.save(function (err, article) {
            if (err) {
                console.log(err);
            }
            // res.redirect('/detail/' + movie._id);
        });
    }
});

//监控打印
app.listen(port);  //监听端口
console.log('bolg started on port:'+port);

