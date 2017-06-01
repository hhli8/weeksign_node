var usersDb=require('.././database/db.js');
var edit={
	submit:function(req,res){
		var response;
		var data=req.body; 
		usersDb.open(function(err,db){
			if(err){
				throw err;
				response={suc:false,msg:'数据库出错'};
			}else{
				var ten=db.db('ten');
				var articles=ten.collection('articles');
				var id=Date.parse(new Date())/1000; 
				articles.count({},function(err,doc){
					if(err){
						throw err;
						response={suc:false,msg:'数据库出错'};
					}else{
						id=''+id+doc; 
						var send={
							id:id,title:data.title,con:data.con
						};
						articles.insert(send,function(err,doc){
							if(err){
								throw err;
								response={suc:false,msg:'数据库出错'};
							}else{
								response={suc:true,rs:1};
							}
							res.json(response);
							db.close();
						});
					}
				});
			}
		});
	},
	get:function(req,res){
		var response;
		var data=req.body;
		var total;
		usersDb.open(function(err,db){
			if(err){
				throw err;
				response={suc:false,msg:'数据库出错'};
			}else{
				var ten=db.db('ten');
				var articles=ten.collection('articles');
				//skip:0，开始，包头
				var skip=data.page*data.length,
					limit=parseInt(data.length);
					//limit=10;
				articles.find({}).count(function(err,doc){
					if(err){
						throw err;
					}else{
						total=doc;
						var skipNum;  
						if(!data.total){
							skipNum=total-skip-limit;
						}else{
							skipNum=data.total-skip-limit;//console.log(skipNum);
							if(skipNum<0){
								skipNum=0;
								limit=data.total-skip;
							}
						}
						articles.find({}).skip(skipNum).limit(limit).toArray(function(err,doc){ 
							if(err){
								throw err;
							}else{
								if(!data.total){
									response={suc:true,rs:doc.reverse(),total:total}
								}else{
									response={suc:true,rs:doc.reverse()}
								}
							}
							res.json(response);
							db.close();
						});
					}
				});
				// 第一次时给定total，分页加载时根据total查   
				// 刷新时，比对total，等就不变，不等就将后面切出来的返回,先不考虑加在前面吧	
			}
		});
	},
	getSingle:function(req,res){
		var response;
		var data=req.body;
		usersDb.open(function(err,db){
			if(err){
				throw err;
			}else{
				var ten=db.db('ten');
				var articles=ten.collection('articles');
				var query={id:data.id};
				//console.log(data.id=='591aa551c24f4b3ce83b1971');
				articles.find(query).toArray(function(err,doc){
					//console.log(doc);
					if(doc.length){
						response={suc:true,rs:doc[0]}
					}else{
						response={suc:false,msg:'none'}
					}
					res.json(response);
					db.close();
				});
			}
		});
	},
	refresh:function(req,res){
		var response;
		var data=req.body;
		usersDb.open(function(err,db){
			if(err){
				throw err;
			}else{
				var ten=db.db('ten');
				var articles=ten.collection('articles');
				var oldCount=data.count;
				articles.find({}).count(function(err,doc){
					var newCount=doc;
					if(oldCount==doc){
						response={suc:true,rs:[],refreshCount:newCount};res.json(response);
					}else{
						var skip=parseInt(oldCount);
						articles.find({}).skip(skip).toArray(function(err,doc){
							if(err){
								throw err;
							}else{
								//console.log(doc);
								response={suc:true,rs:doc.reverse(),refreshCount:newCount};
							}
							res.json(response);
						});
					}
					db.close();
				})
			}
		})
	}
}
module.exports=edit;