var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var data=req.body; 
	var response;
	usersDb.open(function(err,db){
		if(err){
			throw err;
			response={suc:false,msg:'数据库出错'};
		}else{
			var ten=db.db('ten');
			var Users=ten.collection('users');
			var query={'phone':data.phone,'psd':data.psd};
			Users.find(query).toArray(function(err,doc){
				if(doc.length){
					response={'suc':true,'res':doc[0]};
				}else{
					response={'suc':false,'msg':'账号或密码有误'};
				}
				ten.close();
				res.json(response);
			});
		}
	});
}
