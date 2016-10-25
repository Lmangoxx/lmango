/********/

/********/
define(["jquery"],function($){
	/*
	 @ 字符串部分修饰（ex:134****2134）
	 @ dome  : 所有属性带data-truncate的标签
	 @ param : data-truncate(必须)--要截取的字符串
	 @ param : data-truncate-type(非必须，array类型|默认[0,1])--第一个代表要开始截取的位置，第二个代表要截取的长度
	 @ return: string类型
	 */
	$("body *[data-truncate]").each(function(event){
		function tru(s,n){
			var h = '';
			for (var i = 0; i < n; i++) {
				h+=s;
			};
			return h;
		}
		var $this = $(this),
			$num  = $this.data("truncate").toString(),
			$type = $this.data("truncate-type") || [0,1],
			str   = $num.substring(0,$type[0]-1) + tru("*",$type[1]) + $num.substring( ($type[0] + $type[1] -1) );
		$this.text(str);
	});
	var Lmango = { 
		/**
		 * rand()获取随机数（整数|如果不是整数，判断并作转换）
		 * @ param mi 区间最小值
		 * @ param ma 区间最大值
		 * @ return int
		 */
		rand : function(mi,ma){
			"use strict";  //符合ES5标准
			if(typeof mi != Number){
				mi = mi * 1;
			}
			if(typeof ma != Number){
				ma = ma * 1;
			}
			var out = mi + Math.round( Math.random() * ( ma - mi)) ;	
			return parseInt(out);
		},
	    /**
		 * randomColor()获取随机颜色值
		 * @ return string
		 */
	    randomColor : function(){
	    	"use strict";  //符合ES5标准
	    	var colorNum = "0123456789abcdef",
	    		color = "#";
	    	for(var i = 0; i < 6; i++){
	    		color += colorNum[parseInt(Math.random()*16)];
	    	}
	    	return color;
	    },
	    /* include.js */
		include : function(d,g){
			"use strict";  //符合ES5标准
			function o(){}
			function j(b,c,a){/\.css$/.test(b)?(a=f.createElement(p),a.href=b,a.rel="stylesheet",a.type="text/css",e.appendChild(a),c()):(k++,a=f.createElement(q),a.onload=function(){r(a,c)},a.onreadystatechange=function(){/loaded|complete/.test(this.readyState)&&r(a,c)},a.async=!0,a.src=b,e.insertBefore(a,e.firstChild))}
			function r(b,c){t(c);l[b.src.split("/").pop()]=1;b.onload=b.onreadystatechange=null}
			function t(b){function c(){!--k&&g()}
			b.length?b(c):(b(),c())};function s(b){var c,a;c=b.length;for(a=[];c--;a.unshift(b[c]));return a}
			var f=document,e=f.getElementsByTagName("head")[0],l={},k=0,h=[],q="script",p="link",m;!d.pop&&(d=[d]);g=g||o;(function c(a,i,e,n){if(!f.body)return setTimeout(c,1);h=[].concat(s(f.getElementsByTagName(q)),s(f.getElementsByTagName(p)));for(a=h.length;a--;)(m=h[a].src||h[a].href)&&(l[m.split("/").pop()]=m);for(a=d.length;a--;)n=o,e=!1,d[a].pop?(i=d[a][0],n=d[a][1],e=d[a][2]):i=d[a],l[i.split("/").pop()]||j(i,n,e);!k&&g()})()
		}
	};
	return Lmango;
});