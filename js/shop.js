var oCla=document.getElementById("classify");
var oGoods=document.getElementById("goods");
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
	
	if(event.wheelDelta){ 
		var direction = event.wheelDelta > 0 ? 1 : -1;
	}else if(event.detail){ 
		var direction = event.detail > 0 ? -1 : 1;
	}
	console.log(direction)
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




function getGoods(id){
	var obj={
		method:"GET",
		url:"http://csit.top/api_goods.php",
		json:{
			cat_id:id,
			page:1,
			pagesize:1000
		},
		callback:function(json){
			var arr=json.data;
			var oUl=document.createElement("ul");
			oGoods.innerHTML="";
			oGoods.appendChild(oUl);
				for (var i = 0; i < arr.length; i++) {
				 var oLi=document.createElement("li");
				 oLi.innerHTML='<img src="'+ arr[i].goods_thumb +'"/>'+
				 '<p>'+ arr[i].goods_name +'</p>'+
				 '<div class="desc"><h2>￥' +arr[i].price +'</h2><h3>' +arr[i].goods_name +'</h3><p>'+ arr[i].goods_desc +'</p></div>';
				 
				 oUl.appendChild(oLi);
				}
		}
    }
	ajax(obj);
}
