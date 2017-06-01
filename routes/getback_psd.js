var usersDb=require('.././database/db.js');
module.exports=function(req,res){
	var response;
	var data=req.body; 
	if(!data.phone || !data.psd || !data.code){
		response={suc:false,msg:'请求参数出错'};res.json(response);
	}else if(0){  //验证码不匹配，验证手机没注册后验证验证码是否正确，正确则可注册
		response={suc:false,msg:'验证码有误'};res.json(response);
	}else{        //已注册(获取验证码时验证)--
		usersDb.open(function(err,db){
			if(err){
				throw err;
			}else{
				//修改数据
				var ten=db.db('ten');
				var users=ten.collection('users');
				var where={"phone":data.phone};
				var updata={$set: {"psd":data.psd}}; //如果不用$set，替换整条数据
				users.update(where,updata,function(err,doc){
					if(err){
						throw err;
					}else{
						//console.log(doc);
						response={suc:true};res.json(response);
					}
				});
			}
			db.close();
		});
	}
};
