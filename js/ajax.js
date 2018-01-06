function loginOrRegister(json,callBack){
	 var xhr=new XMLHttpRequest();
     xhr.onreadystatechange=function(){
 	 if(xhr.readyState==4){
 		if(xhr.status>=200&&xhr.status<300||xhr.status==304){
				var str = xhr.responseText;		
				var obj = JSON.parse(str);
				callBack(obj);
 		}
 	 }
    }
    var st=getString(json);
 	xhr.open("POST", "http://csit.top/api_user.php", true);
 	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 	xhr.send(st);
}	
function getString(obj){
var str='';
//var count=0;
//var objLength=0;
//for(var k in obj){
//	objLength++;
//}
for(var k in obj){
//	count++;
//	if(count<objLength){
	 str=str+k+"="+obj[k]+'&';	
//	}else{
//	 str=str+k+"="+obj[k];
//	}
}
str=str.substring(0,str.length-1);
return(str);
}

function ajax(obj){
	 var xhr=new XMLHttpRequest();
     xhr.onreadystatechange=function(){
 	 if(xhr.readyState==4){
 		if(xhr.status>=200&&xhr.status<300||xhr.status==304){
				var str = xhr.responseText;		
				var json = JSON.parse(str);
				obj.callback(json);
 		}
 	 }
    }
    if(obj.method=="GET"){
    	var st=getString(obj.json);
    	obj.url=obj.url+"?"+st;
    }
    xhr.open(obj.method, obj.url, true);
    if(obj.head){
 			xhr.setRequestHeader(obj.head, obj.headValue);
 		}
    if(obj.method=="GET"){
    	xhr.send();
    }else{
    	var st=getString(obj.json);
 		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 		xhr.send(st);
    }
}



