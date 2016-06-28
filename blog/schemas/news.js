var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','news');
var NewsSchema = new mongoose.Schema({ 
	title : String
});