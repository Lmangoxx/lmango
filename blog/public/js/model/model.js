define(['jquery'],function($){
	/**
	 * 天气类型模版
	 * @ 主要是天空中需要定义的模块
	 * @ 如太阳、云朵、下雨、下雪等样式
	 */
	"use strict";  //符合ES5标准
	return {
		"qing" : [  //晴天模版开始
			[ 	"cloud2", 
				{
					top : 320,
					minMove : 800,
					maxMove : 1100
				}
			],
			[ 	"cloud5",
				{
					top : 250,
					minMove : 200,
					maxMove : 400
				}
			],
			[ 	"sun",
				{
					top : 70,
					minMove : 0,
					maxMove : 1200
				}
			],
			[ 	"balloon",
				{
					top : 140,
					minMove : 0,
					maxMove : 1200
				}
			]
		],    //晴天模版结束
		"duoyun" : [  //多云模版开始
			[ 	"cloud1",
				{
					top : 120,
					minMove : 0,
					maxMove : 300
				}
			],
			[ 	"cloud2", 
				{
					top : 320,
					minMove : 800,
					maxMove : 1100
				}
			],
			[ 	"cloud3",
				{
					top : 190,
					minMove : 700,
					maxMove : 900
				}
			],
			[ 	"cloud4",
				{
					top : 90,
					minMove : 500,
					maxMove : 700
				}
			],
			[ 	"cloud5",
				{
					top : 250,
					minMove : 200,
					maxMove : 400
				}
			],
			[ 	"sun",
				{
					top : 70,
					minMove : 0,
					maxMove : 1200
				}
			],
			[ 	"balloon",
				{
					top : 140,
					minMove : 0,
					maxMove : 1200
				}
			]
		],     //多云模版结束
		"leizhenyu" : [
			[
				'canvas',
				{ 
					speed : 10,
					interaction : false,
					count : 200,
					size : 0,
					windPower : 0
				}
			]
		],
		"dayu" : [
			[
				'canvas',
				{ 
					speed : 15,
					interaction : false,
					count : 400,
					size : 0,
					windPower : 0
				}
			]
		],
		"baoyu" : [
			[
				'canvas',
				{ 
					speed : 15,
					interaction : false,
					count : 500,
					size : 0,
					windPower : 0
				}
			]
		],
		"yin" : [
		]
	}
});