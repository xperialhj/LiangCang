var oLoginMid = document.getElementById('LoginMid');//获取大盒子的id
var oClose = document.getElementById('close');//获取close的id
oClose.onclick = function(){//colose:点击事件
oLoginMid.style.display = 'none';//大盒子消失
}
var oUsername= document.getElementById("username");//获取用户名
var oUserpassword = document.getElementById("userpassword");//获取密码
var oBt = document.getElementById("Login");//获取登录良仓
var oCb = document.getElementById("autologin");//获取自动登录勾选框
//console.log(oBt)

oBt.onclick =function(){
	var Uname = oUsername.value;
	var Upw = oUserpassword.value;
		
	var json = {
		username:Uname,
		password:Upw,
		status:'login'
	}
//console.log(json)
	loginOrRegister(json, function(obj) {
	
		if (obj.code == 0) {
			alert("登陆成功")			
			oLoginMid.style.display="none";
			location.reload();
			
			if (oCb.checked == true) {
				
				
				localStorage.setItem("password", Upw)
				
			}
		    localStorage.setItem("username", Uname)
		    localStorage.setItem("token", obj.data.token)
				
		} else {
			alert(obj.message)
		}
	})
}

window.onload = function() {
	var Uname = localStorage.getItem("username")
	var Upw = localStorage.getItem("password")
	console.log(Uname)
	if (Uname != null && Upw != null) {
		
		var json = {
			username: Uname,
			password: Upw,
			status: "login"
		}
		loginOrRegister(json,function(obj) {
			if(obj.code==0){
				alert("自动登陆成功")
			}
			else{
				alert(obj.Message)
			}
			
		})
	}
}

function showWindow(){
	var Uname = localStorage.getItem("username")
	var token = localStorage.getItem("token")
	var oLoginMid = document.getElementById('LoginMid');
	if(!Uname&&!token){
		oLoginMid.style.display ="block";
		return false;
	}else if(Uname&&token){
		return true;
	}
}
