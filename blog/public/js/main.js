require.config({
	paths: {
		jquery : "/lib/jquery-1.11.1.min",
		Lmango : "lib/Lmango",
		model : "model/model",
		let_it_snow : "lib/jquery.let_it_snow"
	},
	shim : {
		"jquery" : { exports: 'jquery'},
		"let_it_snow" : { exports: 'jquery'}
	}
});
require(['jquery','Lmango','model','let_it_snow'],function($,Lmango,model){
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
			Lmango.include(['http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city='+encodeURI(cityName)+'&dfc=1&charset=utf-8'],function(){
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
			}else if( model.length > 0){
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
				$this.css({"top" : top, "left" : Lmango.rand(min,max)}).animate({"left" : Lmango.rand(min,max)},time);   //初始化云朵位置
				myTime[index] = setInterval(function(){
					$this.stop(true).animate({
						"left": Lmango.rand(min,max)
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
});
