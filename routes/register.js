var usersDb=require('.././database/db.js');
exports.r=function(req,res){
	var response;
	var data=req.body; 
	if(!data.phone || !data.psd || !data.code){
		response={suc:false,msg:'请求参数出错'};
	}else if(0){  //验证码不匹配，验证手机没注册后验证验证码是否正确，正确则可注册
		response={suc:false,msg:'验证码有误'};
	}else{        //已注册(获取验证码时验证)--未注册
		//验证码按钮未点击，随意输入时，此处需要验证是否已注册
		response={suc:true,res:1};
	}
	usersDb.open(function(err,db){
		if(err){
			throw err;
		}else{
			//a表示版本1+时间+现有条数，秒，应该不存在高发事件
			//删除某个时，最后一位可相同，但时间肯定不同，ok
			var ten=db.db('ten');
			var users=ten.collection('users');
			var t=new Date();
			var userId='a'+Date.parse(t)/1000;
//			db.collection('users',function(err,col){
//				col.find({userId:'a14920487291'},function(err,doc){
//					//console.log(doc);res.json(response);
//					if(doc!=''){
//						console.log(66666);
//					}
//				});
//			});
			users.count({},function(err,doc){
				//console.log(doc);
				if(err){
					throw err;
					response={suc:false,msg:'数据库出错'};
				}else{
					userId+=''+(doc+1);
					var send={
						phone:data.phone,
						psd:data.psd,
						userId:userId,
						userHeadImg:''
					};
					users.insert(send,function(err,doc){
						if(err){
							throw err;
							response={suc:false,msg:'数据库出错'};
						}else{
							response={suc:true,res:1};
						}
						db.close();
					});
				}
				res.json(response);
			});
//			users.find({phone:{$in:[data.phone]}}).toArray(function(err,doc){
//				if(err){
//					throw err;
//				}else{
//					//console.log(doc);
//					if(doc.length){
//						response={suc:false,msg:'已注册'};
//					}else{
//						//插入
//						users.insert(send,function(err,doc){
//							
//						});
//					}
//					res.json(response);
//					db.close();
//				}		
//			});

//			db.collection('users',function(err,collection){
//				//console.log(collection);res.json(collection);return;
////				collection.find({phone:123123},function(err,dos){
////					console.log(dos);
////				});
////				return;
//	            collection.insert(send,function(err,docs){
//	                //console.log(docs);     //   输出我们插入的内容
//	                db.close();
//	                res.json(response);
//	                //已注册的未给提示
//	            });
//	        });
			
		}
	});
};
