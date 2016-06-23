/**
 @ http.js 用于创建http服务
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url');
    path = require('path'),
    sys = require('util'),
    querystring = require('querystring'),
    staticModule = require('./static_module');
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/favicon.ico'){  //过滤浏览器默认请求/favicon.ico
        return;
    }else if(!path.extname(pathname)){
        goIndex(res,req);
    }else{
        staticModule.getStaticFile(pathname,res);
    }

    function goIndex(res,req){
        var module = pathname.substr(1) || 'index',
        str = url.parse(req.url).query,
        //controller = querystring.parse(str).c,
        classObj = '';
        try {
            classObj = require('./' + module);
        } catch(e) {
            console.log('chdir:' + e);
        }
        console.log(module,str,classObj);
        if(classObj){  // require成功时，则应用call方法，实现类中的方法调用执行
            classObj.init(res,req);
            classObj[module].call();
        }else{  //require调用失败，则默认返回404错误信息
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('can not find source');
        }
    }
}).listen(1337,'127.0.0.1');
console.log('server runing at http://127.0.0.1:1337');
