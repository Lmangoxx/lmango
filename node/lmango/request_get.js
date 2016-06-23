var request = require('request');
request.get('http://127.0.0.1:1337',function(error,response,result){
	console.log(result);
})