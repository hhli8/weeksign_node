var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var response;
	var data=req.body; 
	//get时获取不到参数
	usersDb.open(function(err,db){
		if(err){
			throw err;
		}else{
			var ten=db.db('ten');
			var homelists=ten.collection('homelists');
			var query={title:'加农炮和榴弹炮的区别在哪？'};
			homelists.find(query).toArray(function(err,doc){
				console.log(doc.length);
				response={
					suc:true,
					rs:doc[0]
				};
				res.json(response);
				ten.close();
			});
		}
	});
}