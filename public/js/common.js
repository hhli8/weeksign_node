var headUrl='http://127.0.0.1:3000';
var COM={
	isPhone:function(phone){
		if (!/^(\+86)?[1][34578]\d{9}$/.test(phone))return false;return true;
	},
	psdOk:function(psd){
		if(!/^[\w]{6,12}$/.test(psd))return false;return true;
	},
	ajax:function(url,data,type){
		var out;
		$.ajax({
			url:url,
			data:data,
			type:type,
			async:false,
			success:function(res){
				out=res;
			},
			error:function(res){
				out="error";
			}
		});
		return out;
	},
	warn:function(text,size){
		if(!$('#badWarn')[0]){
			var warn=document.createElement('div');
			$(warn).attr('id','badWarn');
			$(warn).html(text);
			$('body').append(warn);
			$(warn).fadeIn('slow',function(){
				setTimeout(function(){
					$(warn).remove();
				},2000);
			});
			setTimeout(function(){
				$(warn).fadeOut('slow');
			},1500);
		}
	},
	getUrlData:function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	},
	IsPC:function(){
		return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)?false:true;
	}
};
         