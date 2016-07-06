var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article');

var Article = mongoose.model('Article',ArticleSchema);   //定义以ArticleSchema为模式的Article模型

module.exports = Article;