/************Popup弹窗函数**************
 **** 构造函数:Popup()
 **** 创建时间：2016-4-15
 **** 版本型号：1.0
****************************************/
"use strict";
define(['jquery'],function($){
	
		var Popup = function(){
			this.init();
		}

		Popup.fn = Popup.prototype = {
			init : function(){
				this.css();
			},
			css : function(){
				var __FILE__,
					file,
					scripts = document.getElementsByTagName("script"),
					head = document.getElementsByTagName('head')[0],
					link = document.createElement('link');
				__FILE__ = scripts[scripts.length - 1].getAttribute("src");
				file = __FILE__.substring(0, __FILE__.lastIndexOf('/'));
				link.href = file + "/lib/Popup/skin/popup_css.css";
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('type', 'text/css');
				head.appendChild(link);
			},
			msg : function(text){
				if(text && "string" == typeof text){
					var box = $("<div class='popup-msg'>"+text+"</div>");
					$("body").append(box);
					box.animate({
						"opacity" : 1
					},2500).animate({
						"opacity" : 0
					},500,function(){
						$(this).remove();
					});
				}
			}
		};
		//对象暴露出来
		return {
			Popup :  Popup
		}

});
