(function(){
	//nav
	new Vue({
		el:'#nav',
		data:{
			item:[{img:'imgs/index/bottom_nav/36useful-web-icons-home-act.png',normal:'home',des:"主页"},
				  {img:'imgs/index/bottom_nav/36useful-web-icons-group.png',normal:'group',des:"小组"},
				  {img:'imgs/index/bottom_nav/36useful-web-icons-fun.png',normal:'fun',des:"趣事"},
				  {img:'imgs/index/bottom_nav/36useful-web-icons-activity.png',normal:'activity',des:"活动"},
				  {img:'imgs/index/bottom_nav/36useful-web-icons-personal.png',normal:'personal',des:"我"}]
		},
		methods:{
			change:function(e){
				e=e||window.e;
				var t=e.target||e.srcElement;
				while(t.tagName!='LI'){
					t=t.parentNode;
				}
				//图标切换
				var act=$('#nav li.act');
				var index=$(t).index();
				var before=act.index();
				var c=$($('#nav li')[index]);
				$('#nav li.act img').attr('src','imgs/index/bottom_nav/36useful-web-icons-'+this.item[before].normal+'.png');
				act.removeClass('act');
				c.addClass('act');
				c.find('img').attr('src','imgs/index/bottom_nav/36useful-web-icons-'+this.item[index].normal+'-act.png');
				//页面切换
				$('#pageBox .pageView.act').removeClass('act')
				$($('#pageBox .pageView')[index]).addClass('act');
				if(index==0){
					
				}else if(index==1){
					
				}else if(index==2){
					
				}else if(index==3){
					
				}else if(index==4){
					var tenAccount=localStorage.tenAccount?JSON.parse(localStorage.tenAccount):'';
					if(tenAccount && $('#navPersonal .head .head-show').is(':hidden')){
						$('#navPersonal .head>div').toggleClass('hide');
					}
				}
			}
		}
	})
	$('#nav li:eq(0)').addClass('act');
	//home加载列表   20条数据
	var homedata=[
		{
			head_src:'images/fitness.png',
			head_name:'李海宏1',
			c_des:'天气不错',
			c_pic_box_type:'pic-box1',
			c_pic_box_html:'<a ><img src="images/cbd.jpg" alt="" /></a>',
			other:''
		},
		{
			head_src:'images/fitness.png',
			head_name:'李海宏2',
			c_des:'天气不错dasdasda',
			c_pic_box_type:'pic-box2',
			c_pic_box_html:'<a ><img src="images/cbd.jpg" alt="" /></a><a ><img src="images/cbd.jpg" alt="" /></a><a ><img src="images/cbd.jpg" alt="" /></a>',
			other:''
		},
		{
			head_src:'images/fitness.png',
			head_name:'李海宏3',
			c_des:'天气不错',
			c_pic_box_type:'pic-box3',
			c_pic_box_html:'<a ><img src="images/cbd.jpg" alt="" /></a><a ><img src="images/cbd.jpg" alt="" /></a>',
			other:''
		},
		{
			head_src:'images/fitness.png',
			head_name:'李海宏4',
			c_des:'天气不错',
			c_pic_box_type:'pic-box3',
			c_pic_box_html:'<a ><img src="images/cbd.jpg" alt="" /></a><a ><img src="images/cbd.jpg" alt="" /></a>',
			other:''
		},
		{
			head_src:'images/fitness.png',
			head_name:'李海宏5',
			c_des:'天气不错',
			c_pic_box_type:'pic-box3',
			c_pic_box_html:'<a ><img src="images/cbd.jpg" alt="" /></a><a ><img src="images/cbd.jpg" alt="" /></a>',
			other:''
		}
	];
	//主页数据获取
	(function(){
		var url=headUrl+'/getHomeLists',
			data={page:1,lists:5};
		var out=COM.ajax(url,data,'post');  console.log(out);
		if(out!='error'){
			if(out.suc){
				var lists=out.rs;
				if(lists.length){
					//巴拉巴拉巴拉
					homedata=[];
					var length=lists.length;
					for(i=0;i<length;i++){
						var type=lists[i].type;
						var links=lists[i].links.split(';'); 
						//var linksL=links.length;
						var linksH='';
						for(var j=0;j<type;j++){
							linksH+='<a ><img src="'+links[j]+'" alt="" /></a>';
						}
						var s={
							head_src:'images/fitness.png',
							head_name:'李海宏5',
							c_des:lists[i].title,
							c_pic_box_type:'pic-box'+type,
							c_pic_box_html:linksH,
							other:''
						};
						homedata.push(s);
					}
				}else{
					COM.warn('没有更多数据');
				}
			}else{
				COM.warn(out.msg+'!');
			}
		}else{
			COM.warn('请求出错');
		}
	})();
	new Vue({
		el:'#navHome',
		data:{
			items:homedata
		},
		methods:{
			
		}
	});
	//**********************************************************navPersonal
	var navPersonal=new Vue({
		el:'#navPersonal',
		data:{
			
		},
		methods:{
			showLogin:function(){
				$('#login').fadeIn();
			},
			showPublish:function(){
				if(!$('#login').attr('userid')){
					$('#login').fadeIn();
				}else{
					$('#editor').fadeIn();
				}
			},
			unlogin:function(){
				if(localStorage.tenAccount){
					$('#prompt').fadeIn();
				}else{
					COM.warn('请先登录');
				}
			},
			choseHeadPic:function(){
				console.log(COM.IsPC());
			}
		}
	});
})();

//*********************************login**************************
      //如何修改return里面的值呢？
var prompt=Vue.component('prompt',{
	template:'<div class="prompt" v-on:on="no"><p class="t">{{t}}</p><div class="c">{{c}}</div><div class="b"><span class="no">{{no}}</span> <span class="yes">{{yes}}</span></div></div>',
	data:function(){
		return prompt_data;
	},
	methods:{
//		no:function(){
//			console.log(9987);
//		},
//		yes:function(){
//			console.log(2);
//		}
	}
});
var prompt_data={
	t:'退出确认',
	c:'退出当前账号，将不能同步收藏，发布评论和云端分享等',
	no:'取消',
	yes:'确认退出'
};
var prompt=new Vue({
	el:"#prompt",
	methods:{
//		no:function(){
//			console.log(2);
//		}
	}
});
$('#prompt').click(function(e){
	e=window.e||e;
	var target=e.srcElement||e.target;
	if(target.id=='prompt'){
		$('#prompt').fadeOut();
	}
});
$('#prompt .prompt .b span.no').click(function(){
	$('#prompt').fadeOut();
});
$('#prompt .prompt .b span.yes').click(function(){
	//清值
	$('#login').attr({
		'userid':'',
		'phone':''
	});
	localStorage.setItem('tenAccount','');
	//头像
	$('#navPersonal .head>div').toggleClass('hide');
	$('#prompt').fadeOut();
});
new Vue({
	el:'#login',
	data:{
		alert_phone_l:false,
		alert_psd_l:false,
		alert_phone_r:false,
		alert_psd_r1:false,
		alert_psd_r2:false,
		alert_code:false,
		alert_phone_g:false,
		alert_psd_g1:false,
		alert_psd_g2:false,
		alert_code_g:false
	},
	methods:{
		login_:function(phone,psd){
			var url=headUrl+'/login.hhl',
				data={phone:phone,psd:psd};
			var out=COM.ajax(url,data,'post'); 
			if(out!='error'){
				if(out.suc){
					$('#login').fadeOut();
					var obj=out.res;
					$('#login').attr({
						'userid':obj.userId,
						'phone':obj.phone
					});
					localStorage.setItem('tenAccount',JSON.stringify(data));
					$('#navPersonal .head>div').toggleClass('hide');
				}else{
					COM.warn(out.msg+'!');
				}
			}else{
				COM.warn('请求出错');
			}
		},
		closeLogin:function(){
			$('#login').fadeOut();
		},
		loginboxShow:function(){
			$('#login .ul-box>div:visible').fadeOut(function(){
				$('#login .login-box').fadeIn();
			});
		},
		registerboxShow:function(){
			$('#login .ul-box>div:visible').fadeOut(function(){
				$('#login .register-box').fadeIn();
			});
		},
//		toggle:function(){
//			$('#login .ul-box>div:visible').fadeOut(function(){
//				$('#login .ul-box>div.dn').fadeIn(function(){$(this).toggleClass('dn');});
//				$(this).toggleClass('dn');
//			});
//		},
		phone_login:function(){  //号码输入
			var phone=this.$refs.phone_l.value;
			if(COM.isPhone(phone))this.alert_phone_l=false;
		},
		password_l:function(){  //密码聚焦
			var phone=this.$refs.phone_l.value;  
			if(!COM.isPhone(phone))this.alert_phone_l=true;
		},
		psd_login:function(){  //密码输入
			var psd=this.$refs.psd_l.value;
			if(COM.psdOk(psd)){this.alert_psd_l=false;}
		},
		do_login:function(){//登录
			var phone=this.$refs.phone_l.value,
				psd=this.$refs.psd_l.value;
			if(!COM.isPhone(phone)){this.alert_phone_l=true;return;}
			if(!COM.psdOk(psd)){this.alert_psd_l=true;return;}
			//ajax
			var url=headUrl+'/login.hhl',
				data={phone:phone,psd:psd};
			var out=COM.ajax(url,data,'post'); //console.log(out);
			if(out!='error'){
				//ok--请求成功-数据可能错误
				if(out.suc){
					//登录成功，跳转页面，缓存登录信息
					$('#login').fadeOut();
					//登录后处理。。。。。
					var obj=out.res;
					$('#login').attr({
						'userid':obj.userId,
						'phone':obj.phone
					});
					//是否记住账号
					//var check=$('#login .rember-box .rember');
					//var account=check[0].checked?JSON.stringify(data):'';
					localStorage.setItem('tenAccount',JSON.stringify(data));
					$('#navPersonal .head>div').toggleClass('hide');
				}else{
					COM.warn(out.msg+'!');
				}
			}else{
				//出错-服务器--统一
				COM.warn('请求出错');
			}
		},
		//注册
		phone_reg:function(){  //号码输入
			var phone=this.$refs.phone_r.value; 
			if(COM.isPhone(phone))this.alert_phone_r=false;
		},
		password_r1:function(){  //密码1聚焦
			var phone=this.$refs.phone_r.value;  
			if(!COM.isPhone(phone))this.alert_phone_r=true;
		},
		psd_reg1:function(){  //密码1输入
			var psd1=this.$refs.psd_r1.value;
			if(COM.psdOk(psd1)){this.alert_psd_r1=false;}
		},
		password_r2:function(x,y,z){   //密码2聚焦
			var phone=this.$refs.phone_r.value;  
			if(!COM.isPhone(phone)){this.alert_phone_r=true;return;}
			var psd1=this.$refs.psd_r1.value;
			if(!COM.psdOk(psd1)){this.alert_psd_r1=true;COM.warn('密码为6~12位，包括大小写字母、数字与下划线');return;}
			var psd2=this.$refs.psd_r2.value;
			if(x=='code_focus'){
				if(!COM.psdOk(psd2)){this.alert_psd_r2=true;COM.warn('密码为6~12位，包括大小写字母、数字与下划线');return;}
				if(psd1!=psd2){this.alert_psd_r2=true;COM.warn('两次密码不匹配');return;}
			}
			if(y=='getcode'){//此时验证手机号码是否已验证
				var url=headUrl+'/isRegistered',data={phone:phone};
				var out=COM.ajax(url,data,'post');  //console.log(out); 
				if(out!='error'){      
					//ok--请求成功-数据可能错误
					if(out.suc){  
						if(out.res){  //==1未注册
							var wait=60;
					        function time(o){
					        	if(wait==0){
					        		o.removeAttr("disabled");
					        		o.text("获取验证码");
					        	}else{
					        		o.attr("disabled",true);
					        		o.text("重新发送("+wait+")");
					        		wait--;
					        		setTimeout(function(){time(o)},1000);
					        	}
					        }
					        time($('.register-box .getCode'));
						}else{
							COM.warn('该手机号已注册');
							return;
						}
					}else{ 
						COM.warn(out.msg+'!');//后台不给!号，有！表示后台的，无！都是前端提示
					}
				}else{
					//出错-服务器--统一
					COM.warn('请求出错');
				}
			}
			if(z=='do_register'){
				var code=this.$refs.code.value;
				if(!code){this.alert_code=true;COM.warn('请输入验证码');return;}
				var url=headUrl+'/isRegistered',data={phone:phone};
				var out=COM.ajax(url,data,'post');  //console.log(out); 
				if(out!='error'){
					if(out.suc){  
						if(out.res){
							//******
							var url=headUrl+'/register',
								data={
									phone:phone,
									psd:psd2,
									code:code
								};
							var out=COM.ajax(url,data,'post'); //console.log(out);
							if(out!='error'){
								//ok--请求成功-数据可能错误
								if(out.suc){
									//注册成功，提示，跳转到登录或直接登录，到个人中心
									COM.warn('注册成功'); 
									this.$refs.phone_l.value=phone;
									this.$refs.psd_l.value=psd2;
									//this.toggle();
									this.loginboxShow();
									//var html='<div id="waiting"><div class="circle-box"><b class="circle"></b><b class="circle"></b><b class="circle"></b></div>';
									//$('body').append(html);
									var the=this;
									setTimeout(function(){
										//登录--自动
										//选择是否记住密码，无需自动登录
										the.login_(phone,psd2);
									},2000);
								}else{
									COM.warn(out.msg+'!');
								}
							}else{
								//出错-服务器--统一
								COM.warn('请求出错');
							}
							//*******
						}else{
							COM.warn('该手机号已注册');
							return;
						}
					}else{ 
						COM.warn(out.msg+'!');
					}
				}else{
					COM.warn('请求出错');
				}	
			}
		},
		psd_reg2:function(){   //密码2输入
			var psd2=this.$refs.psd_r2.value;
			if(COM.psdOk(psd2)){this.alert_psd_r2=false;}
			var psd1=this.$refs.psd_r1.value;
			if(psd1==psd2){this.alert_psd_r2=false;}
		},
		code_focus:function(){   //验证码聚焦
			this.password_r2('code_focus');
		},
		code_in:function(){    //验证码输入--输入为纠错--简单验证不为空就好
			var code=this.$refs.code.value;
			if(code){this.alert_code=false;}
		},
		code_get:function(){  //验证码点击
			this.password_r2('code_focus','getcode');
		},
		do_register:function(){  //注册
			this.password_r2('code_focus','','do_register');
		},
		//登录-----找回密码---
		login_to_g:function(){
			$('#login .ul-box>div:visible').fadeOut(function(){
				$('#login .getback-psd-box').fadeIn();
			});
		},
		
		//找回密码
		phone_g_keyup:function(){  //号码输入
			var phone=this.$refs.phone_g.value; 
			if(COM.isPhone(phone))this.alert_phone_g=false;
		},
		password_g1:function(){  //密码1聚焦
			var phone=this.$refs.phone_g.value;  
			if(!COM.isPhone(phone))this.alert_phone_g=true;
		},
		psd_g_keyup1:function(){  //密码1输入
			var psd1=this.$refs.psd_g1.value;
			if(COM.psdOk(psd1)){this.alert_psd_g1=false;}
		},
		password_g2:function(x,y,z){   //密码2聚焦
			var phone=this.$refs.phone_g.value;  
			if(!COM.isPhone(phone)){this.alert_phone_g=true;return;}
			var psd1=this.$refs.psd_g1.value;
			if(!COM.psdOk(psd1)){this.alert_psd_g1=true;COM.warn('密码为6~12位，包括大小写字母、数字与下划线');return;}
			var psd2=this.$refs.psd_g2.value;
			if(x=='code_focus'){
				if(!COM.psdOk(psd2)){this.alert_psd_g2=true;COM.warn('密码为6~12位，包括大小写字母、数字与下划线');return;}
				if(psd1!=psd2){this.alert_psd_g2=true;COM.warn('两次密码不匹配');return;}
			}
			if(y=='getcode'){//此时验证手机号码是否已验证
				var url=headUrl+'/isRegistered',data={phone:phone};
				var out=COM.ajax(url,data,'post');  //console.log(out); 
				if(out!='error'){      
					//ok--请求成功-数据可能错误
					if(out.suc){  
						if(out.res){  //==1未注册
							COM.warn('该手机号尚未注册');
						}else{
							var wait=60;
					        function time(o){
					        	if(wait==0){
					        		o.removeAttr("disabled");
					        		o.text("获取验证码");
					        	}else{
					        		o.attr("disabled",true);
					        		o.text("重新发送("+wait+")");
					        		wait--;
					        		setTimeout(function(){time(o)},1000);
					        	}
					        }
					        time($('.getback-psd-box .getCode'));
						}
					}else{ 
						COM.warn(out.msg+'!');//后台不给!号，有！表示后台的，无！都是前端提示
					}
				}else{
					//出错-服务器--统一
					COM.warn('请求出错');
				}
			}
			if(z=='do_getback'){
				var code=this.$refs.code_g.value;
				if(!code){this.alert_code_g=true;COM.warn('请输入验证码');return;}
				var url=headUrl+'/isRegistered',data={phone:phone};
				var out=COM.ajax(url,data,'post');  //console.log(out); 
				if(out!='error'){
					if(out.suc){  
						if(!out.res){//重设密码
							//******
							var url=headUrl+'/getback_psd',
								data={
									phone:phone,
									psd:psd2,
									code:code
								};
							var out2=COM.ajax(url,data,'post'); //console.log(out2);return;
							if(out!='error'){
								//ok--请求成功-数据可能错误
								if(out.suc){
									//注册成功，提示，跳转到登录或直接登录，到个人中心
									COM.warn('修改成功'); 
									//回复初始化
									this.$refs.phone_g.value='';
									this.$refs.psd_g1.value='';
									this.$refs.psd_g2.value='';
									this.$refs.code_g.value='';
									//****
									this.$refs.phone_l.value=phone;
									this.$refs.psd_l.value=psd2;
									this.loginboxShow();
									//var html='<div id="waiting"><div class="circle-box"><b class="circle"></b><b class="circle"></b><b class="circle"></b></div>';
									//$('body').append(html);
									var the=this;
									setTimeout(function(){
										the.login_(phone,psd2);
									},2000);
								}else{
									COM.warn(out.msg+'!');
								}
							}else{
								//出错-服务器--统一
								COM.warn('请求出错');
							}
							//*******
						}else{
							COM.warn('该手机号尚未注册');
							return;
						}
					}else{ 
						COM.warn(out.msg+'!');
					}
				}else{
					COM.warn('请求出错');
				}	
			}
		},
		psd_g_keyup2:function(){   //密码2输入
			var psd2=this.$refs.psd_g2.value;
			if(COM.psdOk(psd2)){this.alert_psd_g2=false;}
			var psd1=this.$refs.psd_g1.value;
			if(psd1==psd2){this.alert_psd_g2=false;}
		},
		code_focus_g:function(){   //验证码聚焦
			this.password_g2('code_focus');
		},
		code_in_g:function(){    //验证码输入--输入为纠错--简单验证不为空就好
			var code=this.$refs.code_g.value;
			if(code){this.alert_code_g=false;}
		},
		code_get_g:function(){  //验证码点击
			this.password_g2('code_focus','getcode');
		},
		do_getback:function(){  //提交
			this.password_g2('code_focus','','do_getback');
		},
	}
});

//******************************editor************************
new Vue({
	el:'#editor',
	data:{
		
	},
	methods:{
		closeEditor:function(){
			$('#editor').fadeOut();
		},
		submitArticle:function(){
			var t=this.$refs.title.value,
				content=$('#editor .article').html(),
				userid=$('#login').attr('userid');
			var url=headUrl+'/article',//换掉
				data={
					userId:userid,
					title:t,
					content:content
				};
			var out=COM.ajax(url,data,'post'); console.log(out);	
			if(out!='error'){
				if(out.suc){
					COM.warn('发表成功');
					$('#editor').fadeOut();
					$('#editor .addNewTitle').val('');
					$('#editor .article').html('添加内容');
				}else{
					COM.warn(out.msg+'!');
				}
			}else{
				COM.warn('请求出错');
			}
		},
		blur:function(){
			var article=$('#editor .article').html();
			if(!article){
				$('#editor .article').html('添加内容');
				$('#editor .article').addClass('none');
			}
		},
		article_focus:function(){ 
			var article=$('#editor .article').html(); 
			if(article=='添加内容'){
				$('#editor .article').html('');
				$('#editor .article').removeClass('none');
			}
		}
	}
});
console.log(localStorage);
