/**
 @ static_module.js 用于MMIE类型
 */
var CONF = __dirname + '/conf/',  //MMIE类型存放路径
    PUBLIC = __dirname + '/public';  //静态文件存放路径（css,js,html类型文件）
/**
 @ require本模块需要的Node.js模块
 */
var sys = require('util'),
	http = require('http'), 
	fs    = require('fs'),
	url   = require('url'),
	path  = require('path');
	mmieConf = getMmieConf();

exports.getStaticFile = function(pathname,res){
    var extname = path.extname(pathname);
    extname = extname ? extname.slice(1) : '';
    var realPath = PUBLIC + pathname;
    var mmieType = mmieConf[extname] ? mmieConf[extname] : 'text/plain';
    fs.exists(realPath,function(exists){
        if(!exists){
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.write('This request URL '+pathname+' was not found on this server');
            res.end();
        }else {
            fs.readFile(realPath,'binary',function(err,file){
                if(err){
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end(err);
                }else{
                    res.writeHead(200,{'Content-Type':mmieType});
                    res.write(file,'binary');
                    res.end();
                }
            })
        }
    })
}
/**
 @ 静态资源库读取函数getUrlConf()（409种MMIE）
 */ 
function getMmieConf(){
    var routerMsg = {};
    try {
        var str = fs.readFileSync(CONF + 'mmie_type.json','utf8');
        routerMsg = JSON.parse(str);
    } catch(e) {
        sys.debug('JSON parse fails');
    }
    return routerMsg;
} //end getMmieConf()
