function getVerificationCode() {
	var code= '';
    var codeLength = 4;
    var oCode = document.getElementById('code');
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];
    }
    oCode.value = code;
}
window.onload = function(){
   getVerificationCode();
	var oUsername=document.getElementById("username");
	var oPassword=document.getElementById("password");
	var oConfirmPassword=document.getElementById("confirmPassword");
	var oAgreeButton=document.getElementById("agreeButton");
	var oCode = document.getElementById("code");
	var oVC = document.getElementById("VC");
	var oRegister=document.getElementById("register");
	oRegister.onclick=function(){
		var strUsername=oUsername.value;
		var strPassword=oPassword.value;
		if(oVC.value.toUpperCase()!=oCode.value){
			alert("验证码错误");
			getVerificationCode();
			return;
		}
		if(oConfirmPassword.value!=oPassword.value){
			alert("两次密码输入不一致");
			return;
		}
		if(oAgreeButton.checked!=true){
			alert("需同意良仓注册条款");
			return;
		}
		var json={
			"username":strUsername,
			"password":strPassword,
			"status":"register",	
		}
		loginOrRegister(json,function(obj){
			if (obj.code == 0) {
						alert("注册成功");
					}else {
						alert(obj.message);
					}
		});
	}
}