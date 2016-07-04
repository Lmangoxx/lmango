require.config({
	paths: {
		jquery : "lib/jquery-1.7.2.min",
		model : "model/model",
		let_it_snow : "lib/jquery.let_it_snow"
	},
	shim : {
		"jquery" : { exports: 'jquery'},
		"let_it_snow" : { exports: 'jquery'}
	}
});
require(['jquery','model','let_it_snow'],function($,model){
	/**
	 * city动画代码实现(根据实时城市天气情况更新页面动画效果)
	 * @ 太阳、云朵运动、下雨、下雪等天气
	 * @ 热气球漂浮（晴天时显示）
	 * @ 房屋平地而起
	 * @ 汽车行驶等等
	 */
	"use strict";  //符合ES5标准
	var cityName = '';
	//获取当前用户所在城市
	$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {
            cityName = remote_ip_info.city;
            //调用天气api接口
			include(['http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city='+encodeURI(cityName)+'&dfc=1&charset=utf-8'],function(){
				if(window.SWther){ 
					var swtherData = window.SWther.w[cityName][0];  //天气数据
					console.log(swtherData);
					$("#city-cell").addClass(swtherData.f1);
					skyFun.init(model[swtherData.f1]);
				}else{ 
					swther();
				}
			});
        } else {
            alert('没有找到匹配的地址信息！');
        }
    });
	var skyFun = {
		init : function(model){
			"use strict";  //符合ES5标准
			if(model[0][0] == 'canvas'){
				$('#canvas').let_it_snow(model[0][1]);
			}else{
				for(var i = 0, length = model.length; i < length; i++ ){
					var m = model[i],
						div = $('<div class="'+m[0]+'" id="'+m[0]+'" top="'+m[1].top+'" min-move="'+m[1].minMove+'" max-move="'+m[1].maxMove+'">');
					$("#sky-box").append(div);
				}
				this.upData();
			}
		},
		upData : function(){
			"use strict";  //符合ES5标准
			var myTime = [];  //定义天空物体运动时间数组
			$("#sky-box div").each(function(index, el) {   //遍历每朵云朵
				var $this = $(this),     //获取云朵对应的参数
					top = $this.attr("top") * 1,
					min = $this.attr("min-move") * 1,
					max = $this.attr("max-move") * 1,
					time = (max - min) < 0 ? -(max - min) * 20 : (max - min) * 20;
				$this.css({"top" : top, "left" : rand(min,max)}).animate({"left" : rand(min,max)},time);   //初始化云朵位置
				myTime[index] = setInterval(function(){
					$this.stop(true).animate({
						"left": rand(min,max)
					},time);
				}, time);
			});
		}
	};

	$("#build-box div").each(function(index, el) {   //遍历建筑物
		"use strict";  //符合ES5标准
		var $this = $(this);     //获取当前建筑物
		$this.css({
			"-webkit-animation-delay" : (index*0.1) + "s",
			"animation-delay" : (index*0.1) + "s"
		});
	});
	//下雪
	
	/**
	 * rand()获取随机数（整数|如果不是整数，判断并作转换）
	 * @ param mi 区间最小值
	 * @ param ma 区间最大值
	 * @ return int
	 */
	function rand(mi,ma){
		"use strict";  //符合ES5标准
		if(typeof mi != Number){
			mi = mi * 1;
		}
		if(typeof ma != Number){
			ma = ma * 1;
		}
		var out = mi + Math.round( Math.random() * ( ma - mi)) ;	
		return parseInt(out);
	}
    
    /**
	 * randomColor()获取随机颜色值
	 * @ return string
	 */
    function randomColor(){
    	"use strict";  //符合ES5标准
    	var colorNum = "0123456789abcdef",
    		color = "#";
    	for(var i = 0; i < 6; i++){
    		color += colorNum[parseInt(Math.random()*16)];
    	}
    	return color;
    }

    /* include.js */
	function include(d,g){
		"use strict";  //符合ES5标准
		function o(){}
		function j(b,c,a){/\.css$/.test(b)?(a=f.createElement(p),a.href=b,a.rel="stylesheet",a.type="text/css",e.appendChild(a),c()):(k++,a=f.createElement(q),a.onload=function(){r(a,c)},a.onreadystatechange=function(){/loaded|complete/.test(this.readyState)&&r(a,c)},a.async=!0,a.src=b,e.insertBefore(a,e.firstChild))}
		function r(b,c){t(c);l[b.src.split("/").pop()]=1;b.onload=b.onreadystatechange=null}
		function t(b){function c(){!--k&&g()}
		b.length?b(c):(b(),c())};function s(b){var c,a;c=b.length;for(a=[];c--;a.unshift(b[c]));return a}
		var f=document,e=f.getElementsByTagName("head")[0],l={},k=0,h=[],q="script",p="link",m;!d.pop&&(d=[d]);g=g||o;(function c(a,i,e,n){if(!f.body)return setTimeout(c,1);h=[].concat(s(f.getElementsByTagName(q)),s(f.getElementsByTagName(p)));for(a=h.length;a--;)(m=h[a].src||h[a].href)&&(l[m.split("/").pop()]=m);for(a=d.length;a--;)n=o,e=!1,d[a].pop?(i=d[a][0],n=d[a][1],e=d[a][2]):i=d[a],l[i.split("/").pop()]||j(i,n,e);!k&&g()})()
	}
});
