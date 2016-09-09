var webpack = require('webpack');
var path = require('path');
<<<<<<< HEAD
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');  //webpack默认插件，用途是提取js公共代码到common.js中
=======
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
>>>>>>> origin/master

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    new ExtractTextPlugin("public/css/styles.css"),
    //页面入口文件配置
    entry: {
        main : path.join(__dirname,'public/js/main.js')
    },
    //入口文件输出配置
    output: {
        path: './dist/',
        filename: '[name].bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    resolve: {
    	root: [  //添加默认搜索路径
	      	path.join(__dirname, "public/")
	    ],
    	extensions: ['', '.js', '.json', '.scss'],
	    alias: {
	      	jquery: "lib/bower_components/jquery-1.11.1.min.js",
	      	let_it_snow: "js/lib/jquery.let_it_snow.js"
	    }
	}
};