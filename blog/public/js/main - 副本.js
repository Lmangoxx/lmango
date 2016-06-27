require.config({
	paths: {
		jquery : "lib/jquery-1.7.2.min",
		slider : "lib/slider-16.3.21",
		Popup  : "lib/Popup/Popup"
	}
});
"use strict";
require(['jquery','Popup'],function($,Popup){
	var Popup = new Popup.Popup();

	// var city = function(){
	// 	this.canvas = document.getElementById('canvas');
	// 	this.ctx = this.canvas.getContext('2d');
	// 	this.w = window.innerWidth;
	// 	this.h = window.innerHeight;
	// 	this.x = 100;
	// 	this.init();
	// }

	// city.prototype = {
	// 	init : function (){
	// 	    var img = new Image();
	// 		img.src="./images/cloud.png";
	//     	this.ctx.drawImage(img,0,0);
	// 	    // this.updata();
	// 	    // window.addEventListener( 'resize', this.windowResize, false );
	// 	},
	// 	windowResize : function(){
	// 		this.canvas.width = window.innerWidth;
	//     	this.canvas.height = window.innerHeight;
	//     	this.updata();
	// 	},
	// 	updata : function(){
	// 		this.render();
	// 	},
	// 	render : function(){
	// 		this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
 //    		this.cloud(100,300,50);
	// 	},
	// 	cloud : function(min,max,y){
	// 		var img = new Image();
	// 		img.src="./images/cloud.png";
	//     	this.ctx.drawImage(img,0,0);
	// 	},
	// 	move : function(min,max){
	// 		if( this.x == min){
	//     		m = 1;
	//     	}else if( this.x == max){
	//     		m = -1;
	//     	}
	//     	this.x += m;
	//     	return this.x;
	// 	}
	// }

	// new city();

	//canvas部分代码

	var requestAnimationFrame = (function(){  
	        return 	window.requestAnimationFrame ||  
	        		window.webkitRequestAnimationFrame ||  
	        		window.mozRequestAnimationFrame ||  
	        		window.oRequestAnimationFrame ||  
	        		window.msRequestAnimationFrame || 
	        		function(callback) {  
			            window.setTimeout(callback, 1000 / 60);  
			        };  
    	})();  


    var canvas=document.getElementById('canvas'),
    	ctx=canvas.getContext('2d'),
    	w = window.innerWidth,
    	h = window.innerHeight,
    	requestA,
    	m,
    	x = 100;
    canvas.width = w;
    canvas.height = h; 

    updata();

    window.addEventListener( 'resize', windowResize, false );

    //浏览器窗口改变
    function windowResize(){
    	canvas.width = window.innerWidth;
    	canvas.height = window.innerHeight;
    	cancelAnimationFrame(requestA);
    	updata();
    }
    function updata(){
    	requestA = requestAnimationFrame(updata);
    	render();
    }
    function render(){
    	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    	cloud(100,300,50);
    }	
    function cloud(min,max,y){
    	var img = new Image();
		img.src="./images/cloud.png";
    	ctx.drawImage(img,move(min,max),y);
    }
    function move(min,max){
    	if( x == min){
    		m = 1;
    	}else if( x == max){
    		m = -1;
    	}
    	x += m;
    	return x;
    }
    function rand(mi,ma){
		var out = mi + Math.round( Math.random() * ( ma - mi)) ;	
		return parseInt(out);
	}
    //随机颜色
    function randomColor(){
    	var colorNum = "0123456789abcdef",
    		color = "#";
    	for(var i = 0; i < 6; i++){
    		color += colorNum[parseInt(Math.random()*16)];
    	}
    	return color;
    }
});