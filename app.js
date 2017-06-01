var express=require('express');
var app=express();  
var bodyParser = require('body-parser');
//可访问静态文件
app.use(express.static('public'));
//post请求的设置相关
app.use(require('body-parser').urlencoded({extended: true,limit: '50mb'}));
//app.use(express.json({limit: '50mb'}));
//var urlencodedParser = bodyParser.urlencoded({limit: '5mb'});
//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

var register=require('./routes/register');
app.post('/register',register.r);

var isRegistered=require('./routes/isRegistered.js');
app.post('/isRegistered',isRegistered);

var login=require('./routes/login.js');
app.post('/login.hhl',login);

//找回密码
var getback_psd=require('./routes/getback_psd.js');
app.post('/getback_psd',getback_psd);

//var article=require('./routes/article');
//app.post('/article',article);

var imgUp=require('./routes/imgUp.js');
app.post('/imgUp',imgUp);

//主页文章-提交
//var homeLists=require('./routes/homeLists');
//app.post('/homeLists',homeLists.insert);

//主页数据获取
//app.post('/getHomeLists',homeLists.out);
//获取单个数据--根据id
//app.post('/getHomeListsSingle',homeLists.outSingle);

//表单测试
//var form=require('./routes/form');
//app.post('/form',form);

var edit_manager=require('./routes/edit_manager.js');
app.post('/edit_post',edit_manager);

var get_homelists=require('./routes/get_homelists.js');
app.get('/get_homelists',get_homelists);

var get_homelists_detail=require('./routes/get_homelists_detail.js');
app.post('/get_homelists_detail',get_homelists_detail);

var Edit_a=require('./routes/Edit_a.js');
app.post('/Edit_a_submit',Edit_a.submit);
app.post('/Edit_a_get',Edit_a.get);
app.post('/Edit_a_refresh',Edit_a.refresh);     
app.post('/Edit_a_single',Edit_a.getSingle);

var server = app.listen(3000, function () {  //127.0.0.1:3000
	console.log('启动成功');
})