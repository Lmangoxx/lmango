/* ===========================================================
 * jquery-let_it_snow.js v1
 * ===========================================================
 * NOTE: This plugin is based on the work by Jason Brown (Loktar00)
 * https://github.com/loktar00/JQuery-Snowfall
 * http://www.thepetedesign.com
 *
 * As the end of the year approaches, let's add 
 * some festive to your website!
 *
 * https://github.com/peachananr/let_it_snow
 @ speed：该参数用于控制雪花飘落的速度。数值越高速度越快。数值设置在0-5之间。默认值为0。
 @ interaction：该参数用于设置用户与雪花之间的交互。如果设置为true，那么鼠标和雪花之间将形成一种互斥作用，从而生成一种用户与雪花的交互动作。默认值为true。
 @ size：该参数用于设置雪花的平均大小。数值越高雪花越大。数值设置在0-10之间。默认值为2。
 @ count：该参数用于设置统一时间在屏幕中的雪花的数量。默认值为200。
 @ opacity：该参数用于设置雪花的平均透明度。设置为1，雪花完全不透明。数值设置在0.0到1.0之间。默认值为0。
 @ color：该参数用于设置雪花的颜色。可用的格式为6个字母的HEX颜色格式。默认值为"#FFFFFF"。
 @ windPower：该参数用于设置风吹的方向。如果你想风吹向右边，设置为正数。如果想风吹向其它方向，设置为负数。数值越大（正数）/数值越小（负数），风吹动的越厉害。默认值为0。
 @ image：你可以使用一张雪花图片来代替默认的圆形雪花。该参数是图片的URL，设置为false表示使用默认的圆形图像。默认值为false。
 *
 * ========================================================== */
define(['jquery'],function($){
  var defaults = {
    speed: 0,
    interaction: true,
    size: 2,
    count: 200,
    opacity: 0,
    color: "#ffffff",
    windPower: 0,
    image: false
  };
  
  
  $.fn.let_it_snow = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        flakes = [],
        canvas = el.get(0),
        ctx = canvas.getContext("2d"),
        flakeCount = settings.count,
        mX = -100,
        mY = -100;
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
    (function() {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        window.requestAnimationFrame = requestAnimationFrame;
    })();
    
    function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 100,
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                dx = x2 - x,
                dy = y2 - y;

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist,
                    ycomp = (y - y2) / dist,
                    deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                
                switch (settings.windPower) { 
                  case false:
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                  break;
                  
                  case 0:
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                  break;
                  
                  default: 
                    flake.velX += 0.01 + (settings.windPower/100);
                }
            }

            var s = settings.color;
            var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
            var matches = patt.exec(s);
            var rgb = parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16);

            
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                reset(flake);
            }


            if (flake.x >= canvas.width || flake.x <= 0) {
                reset(flake);
            }
            if (settings.image == false) {
              ctx.fillStyle = "rgba(" + rgb + "," + flake.opacity + ")"
              ctx.beginPath();
              ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
              ctx.fill();
            } else {
              
              ctx.drawImage($("img#lis_flake").get(0), flake.x, flake.y, flake.size * 2, flake.size * 2);
            }
            
        }
        requestAnimationFrame(snow);
    };
    
    
    function reset(flake) {
        
        if (settings.windPower == false || settings.windPower == 0) {
          flake.x = Math.floor(Math.random() * canvas.width);
          flake.y = 0;
        } else {
          if (settings.windPower > 0) {
            var xarray = Array(Math.floor(Math.random() * canvas.width), 0);
            var yarray = Array(0, Math.floor(Math.random() * canvas.height))
            var allarray = Array(xarray, yarray)
            
            var selected_array = allarray[Math.floor(Math.random()*allarray.length)];
            
             flake.x = selected_array[0];
             flake.y = selected_array[1];
          } else {
            var xarray = Array(Math.floor(Math.random() * canvas.width),0);
            var yarray = Array(canvas.width, Math.floor(Math.random() * canvas.height))
            var allarray = Array(xarray, yarray)
            
            var selected_array = allarray[Math.floor(Math.random()*allarray.length)];
            
             flake.x = selected_array[0];
             flake.y = selected_array[1];
          }
        }
        
        flake.size = (Math.random() * 3) + settings.size;
        flake.speed = (Math.random() * 1) + settings.speed;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + settings.opacity;
    }
     function init() {
      for (var i = 0; i < flakeCount; i++) {
          var x = Math.floor(Math.random() * canvas.width),
              y = Math.floor(Math.random() * canvas.height),
              size = (Math.random() * 3)  + settings.size,
              speed = (Math.random() * 1) + settings.speed,
              opacity = (Math.random() * 0.5) + settings.opacity;
      
          flakes.push({
              speed: speed,
              velY: speed,
              velX: 0,
              x: x,
              y: y,
              size: size,
              stepSize: (Math.random()) / 30,
              step: 0,
              angle: 180,
              opacity: opacity
          });
      }
      
      snow();
    }
    
    if (settings.image != false) {
      $("<img src='"+settings.image+"' style='display: none' id='lis_flake'>").prependTo("body")
    }
    
    init();
    
    $(window).resize(function() {
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function() {
        el2 = el.clone();
        el2.insertAfter(el);
        el.remove();
        
        el2.let_it_snow(settings);
      }, 200);
    });
    
    if (settings.interaction == true) {
      canvas.addEventListener("mousemove", function(e) {
          mX = e.clientX,
          mY = e.clientY
      });
    }
  }
});

