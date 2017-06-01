var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var response;
	var data=req.body; 
	var submiter=data.manger;
	if(submiter=='15958980873' || submiter=='15958980872'){
		usersDb.open(function(err,db){
			if(err){
				throw err;
			}else{
				var ten=db.db('ten');
				var homelists=ten.collection('homelists');
				var Users=ten.collection('users');
				var query={'phone':submiter,'psd':data.psd}; 
				Users.find(query).toArray(function(err,doc){
					if(doc.length){
						//response={'suc':true,'res':doc[0]};
						var homelists=ten.collection('homelists');
						var insertData={
							title:data.title,
							content:data.content,
							links:data.links,
							type:data.type,
							userid:data.userid
						};
						homelists.insert(insertData,function(err,doc){
							if(err){
								throw err;
							}else{
								response={suc:true,res:doc.ops[0]._id};
							}
							res.json(response);
						});
					}else{ 
						response={'suc':false,'msg':'密码有误'};res.json(response);
					}
					ten.close();//必须要，不然连续就报错
				});
			}
		});
//		usersDb.on("close", function (err,db) {//关闭数据库
//		    if(err) throw err;
//		    else console.log("成功关闭数据库.");
//		});
	}else{
		response={suc:false,msg:'非管理员不可编辑提交'};res.json(response);
	}
};