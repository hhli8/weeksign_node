var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var response;
	var data=req.body; 
	usersDb.open(function(err,db){
		if(err){
			throw err;
			response={suc:false,msg:'数据库出错'};
		}else{
			var users=db.db('ten').collection('users');
			users.count({phone:data.phone},function(err,doc){
				if(err){
					throw err;
					response={suc:false,msg:'数据库出错'};
				}else{
					response=doc==0?{suc:true,res:1}:{suc:true,res:0};
				}
				res.json(response);
			});
		}
		db.close();
	});
};
