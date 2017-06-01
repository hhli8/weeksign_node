var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var fs = require('fs');
	var response;
	var data=req.body; 
	//console.log(data);
	//var out=new Buffer(data.img, 'base64').toString();
	
	var bitmap = new Buffer(data.img, 'base64');
	fs.writeFileSync('./public/upImgs/new1.jpg', bitmap);//无需默认生成，会自动生成
	res.json({suc:true,rs:fs});
}
