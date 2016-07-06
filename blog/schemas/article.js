var mongoose = require('mongoose');  //引入mongoose模块

var ArticleSchema = new mongoose.Schema({ 
	title : String,      //文章标题
	author : String,     //作者
	source : String,     //文章来源
	classify : Number,   //文章分类
	keywords : String,   //关键字
	newsType : Number,   //文章类型(置顶，热门，精华之类)
	content : String,     //文章内容
	clickNum : Number,      //浏览次数
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt : {
			type : Date,
			default : Date.now()
		}
	}
});

//每次保存数据的时候都执行一次
ArticleSchema.pre('save',function(next){
	if(this.isNew) {    //如果是新添加的文章，创建时间跟更新时间都改为当前时间
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else {    //不是新添加的文章，只更新updateAt时间
		this.meta.updateAt = Date.now();
	}
	next();   //存储往下执行
});

ArticleSchema.statics = {
	fetch : function(cd){     //查询所以文章并按照更新时间排序
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cd);
	},
	findById : function(cd){  //根据Id查询文章
		return this
		.findOne({_id:id})
		.exec(cd);
	}
};
//把NewsSchema暴露出来
module.exports = ArticleSchema;
