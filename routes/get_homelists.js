var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var response;
	var data=req.body; 
	usersDb.open(function(err,db){
		if(err){
			throw err;
		}else{
			var ten=db.db('ten');
			var homelists=ten.collection('homelists');
			homelists.find({}).toArray(function(err,doc){
				response={
					suc:true,
					rs:doc
				};
				res.json(response);
				ten.close();
			});
		}
	});
}
