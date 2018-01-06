	var oText1=document.getElementById('text1');	
	var oText2=document.getElementById('text2');
	var oBut=document.getElementById('but');
	var oCb=document.getElementById('cb');
	oBut.onclick=function(){
		strUsername=oText1.value;
		strPassword=oText2.value;
		var json={
			username:strUsername,
			password:strPassword,
			status:"login"

		}
		loginOrRegister(json,function(obj){
			if(obj.code==0){
				alert("登录成功");
				if(oCb.checked==true){
					
					localStorage.setItem("password",strPassword)
				}
				localStorage.setItem("username",strUsername)
				localStorage.setItem("token",obj.data.token);
				location.href = "index.html";
			}else{
				alert(obj.Message);
			}
		})
	}
	window.onload=function(){
		var strUsername=localStorage.getItem("username");
		var strPassword=localStorage.getItem("password");
		if(strUsername!=null&&strPassword!=null){
			var json={
			username:strUsername,
			password:strPassword,
			status:"login"
		}
			loginOrRegister(json,function(obj){
				alert("自动登录成功");
				 location.href = "index.html";
			})
		}
	}
