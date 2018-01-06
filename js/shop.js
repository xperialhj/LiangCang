
		var oCla=document.getElementById("classify");
		var oGoods=document.getElementById("goods");
		var oPage=document.getElementById("page").getElementsByTagName("a");
window.onload=function(){
		var obj={
			method:"GET",
			url:"http://csit.top/api_cat.php",
			json:{},
			callback:function(json){
				var arr=json.data;
				var oUl=document.createElement("ul");
				oCla.appendChild(oUl);
				for (var i = 0; i < arr.length; i++) {
					 var oLi=document.createElement("li");
					 oLi.innerHTML='<a onclick="getGoods('+arr[i].cat_id+')">'+arr[i].cat_name+'</a>';
					 oUl.appendChild(oLi);
				}
			    getGoods(arr[0].cat_id);
		    }    
	    }
	ajax(obj);

	window.onmousewheel=function(event){
		var oNav=document.getElementById("nav");
		var oHeader=document.getElementById("header");
		var top=document.body.scrollTop||document.documentElement.scrollTop;
		   if(top>150){
				oGoback.style.display="block";
			}else if(top<=150){
				oGoback.style.display="none";
			}
		if(event.wheelDelta){ 
			var direction = event.wheelDelta > 0 ? 1 : -1;
		}else if(event.detail){ 
			var direction = event.detail > 0 ? -1 : 1;
		}
		
		if(top>56&&direction==-1){
			oNav.style.position="fixed";
			oNav.style.top=0;
			oNav.style.left=0;
			oHeader.style.position="";
		}else if(top>56&&direction==1){
			oHeader.style.position="fixed";
			oHeader.style.top=0;
			oHeader.style.left=0;
			oNav.style.position="fixed";
			oNav.style.top="56px";
			oNav.style.left=0;
		}else{
			oHeader.style.position="";
			oNav.style.position="";
		}			
	}
}
var oGoback=document.getElementById("goback");
oGoback.onclick=function(){
	var top=document.documentElement.scrollTop||document.body.scrollTop
	var timer=setInterval(function(){
		top-=50;
		document.documentElement.scrollTop =top;
		document.body.scrollTop =top;
		if(top<=0){
		  clearInterval(timer);
		  //解决回到顶部后定位bug
		  var oNav=document.getElementById("nav");
		  var oHeader=document.getElementById("header");
		  oHeader.style.position="";
		  oNav.style.position="";
		}
	},10)
}
var oHand=document.getElementById("hand");
oHand.onmouseover=function(){
	if(oHand.lock){
		return;
		
	}
	oHand.lock=true;
	var l=0;
	var end=false;
	var timer=setInterval(function(){
		if(l==-25){
			end=true;
		}
		if(!end){
			l--;
			oHand.style.left=l+"px";
		}else{
			l++;
			oHand.style.left=l+"px";
			if(l>=0){
				clearInterval(timer);
				oHand.lock=false;
			}
		}
	},10)
}

	function skip(id,page){
	
		var obj={
			method:"GET",
			url:"http://csit.top/api_goods.php",
			json:{
				cat_id:id,
				page:page,
				pagesize:24
			},
			callback:function(json){
			    console.log("callback");
				var arr=json.data;
				var oUl=document.createElement("ul");
				oGoods.innerHTML="";
				oGoods.appendChild(oUl);
				var heartLog=[];
				var fav=[];
				for (var i = 0; i < arr.length; i++) {
					var oLi=document.createElement("li");
					oLi.innerHTML='<img src="'+ arr[i].goods_thumb +'"/>'+'<a id="brand">'+ arr[i].goods_name +'</a>'+'<input type="button"  onclick="addcart('+arr[i].goods_id+')"/>'+ 
					'<a class="fav"><span class="Fav">'+ arr[i].star_number +'</span><img class="heartlogo" src="img/heart_gray.png"/></a>'+'<div class="desc"><h2>￥' +arr[i].price +'</h2><h3>' +arr[i].goods_name +'</h3><p>'+ arr[i].goods_desc +'</p></div>';
					oUl.appendChild(oLi);				
					heartLog[i]=document.getElementsByClassName("heartlogo")[i];
			        fav[i]=document.getElementsByClassName("Fav")[i];
				}
				for (var k = 0; k < heartLog.length; k++) {
					(function (j){
						heartLog[j].onclick =function(){
						fav[j].style.display="block";
						if(!heartLog[j].red){
							heartLog[j].src="img/heart_red.png";
							var num=parseInt(fav[j].innerHTML);
							num++;
							fav[j].innerHTML=num;
							heartLog[j].red=true;
						}else{
							heartLog[j].src="img/heart_gray.png";
							var num=parseInt(fav[j].innerHTML);
							num--;
							fav[j].innerHTML=num;
							heartLog[j].red=false;
						}
					}    
					})(k);
				}
			}
			
	    }
		ajax(obj);
	}


	function getGoods(id){

		var obj={
			method:"GET",
			url:"http://csit.top/api_goods.php",
			json:{
				cat_id:id,
				page:1,
				pagesize:24
			},
			callback:function(json){
				var arr=json.data;
				var oUl=document.createElement("ul");
				oGoods.innerHTML="";
				oGoods.appendChild(oUl);
				var heartLog=[];
				var fav=[];
				for (var i = 0; i < arr.length; i++) {
					var oLi=document.createElement("li");
					oLi.innerHTML='<img src="'+ arr[i].goods_thumb +'"/>'+'<a id="brand">'+ arr[i].goods_name +'</a>'+'<input type="button"  onclick="addcart('+arr[i].goods_id+')"/>'+ 
					'<a class="fav"><span class="Fav">'+ arr[i].star_number +'</span><img class="heartlogo" src="img/heart_gray.png"/></a>'+'<div class="desc"><h2>￥' +arr[i].price +'</h2><h3>' +arr[i].goods_name +'</h3><p>'+ arr[i].goods_desc +'</p></div>';
					oUl.appendChild(oLi);				
					heartLog[i]=document.getElementsByClassName("heartlogo")[i];
			        fav[i]=document.getElementsByClassName("Fav")[i];
				}
				for (var j = 0; j < oPage.length; j++){
		            oPage[j].goods_id=id; 
	         	}
				
				for (var k = 0; k < heartLog.length; k++) {
					(function (j){
						heartLog[j].onclick =function(){
						fav[j].style.display="block";
						if(!heartLog[j].red){
							heartLog[j].src="img/heart_red.png";
							var num=parseInt(fav[j].innerHTML);
							num++;
							fav[j].innerHTML=num;
							heartLog[j].red=true;
						}else{
							heartLog[j].src="img/heart_gray.png";
							var num=parseInt(fav[j].innerHTML);
							num--;
							fav[j].innerHTML=num;
							heartLog[j].red=false;
						}
					}    
					})(k);
				}
			}
	    }
		ajax(obj);
	}

function addcart(id){
	var token=localStorage.getItem("token");
	var obj={
		method:"POST",
		url:"http://csit.top/api_cart.php",
		json:{
			goods_id:id,
		    number:"1"
		},
		head:"token",
		headValue:token,
		callback:function(obj){
			alert(obj.message);
		}
	}
	ajax(obj);
}
//window.onload= function(){
	//var aFav =document.getElementById("fav");
	//var heartLog =document.getElementById("heartlogo");
	//var dobconunt=0;
	//aFav.onclick =function(){
		//dobcount++;
		//if(dobcount % 2 != 0){
			//heartLog.style.src="img/heart_red.png";
		//}
	//}		
//}
				 