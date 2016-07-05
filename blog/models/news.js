var mongoose = require('mongoose');
var NewsSchema = require('../schemas/news');

var News = mongoose.model('News',NewsSchema);   //定义以NewsSchema为模式的News模型

module.exports = News;