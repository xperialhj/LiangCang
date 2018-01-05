var oUsername=document.getElementById("username");
var oPassword=document.getElementById("password");
var oAutologin=document.getElementById("autoLogin");
var oLogin=document.getElementById("login");
oLogin.onclick=function(){
	var strUsername=oUsername.value;
	var strPassword=oPassword.value;
	var json={
		"username":strUsername,
		"password":strPassword,
		"status":"login",	
	}
	loginOrRegister(json,function(obj){
		if (obj.code == 0) {
					alert("登陆成功");
					if(oAutologin.checked==true){
						localStorage.setItem("username",strUsername);
						localStorage.setItem("password",strPassword);
					}
					location.href="../index.html";
				}else {
					alert(obj.message);
				}
	});
}
window.onload=function(){
	var strUsername=localStorage.getItem("username");
	var strPassword=localStorage.getItem("password");
	if(strUsername!=null&&strPassword!=null){
		var json={
		"username":strUsername,
		"password":strPassword,
		"status":"login",	
	    }
		loginOrRegister(json,function(obj){
			if (obj.code == 0) {
						alert("登陆成功");
						location.href="../index.html";
					}else {
						alert(obj.message);
					}
		});
	}
}

