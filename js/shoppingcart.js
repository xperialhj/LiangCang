var oAc=document.getElementById("allchecked");
getCart();
oAc.onclick=function(){
	var aCheck=document.getElementById("list").getElementsByClassName("check");
	if(oAc.checked==true){
		for (var i = 0; i < aCheck.length; i++) {
			aCheck[i].checked=true;
		}
	}else if(oAc.checked==false){
	    for (var i = 0; i < aCheck.length; i++) {
		  aCheck[i].checked=false;
	    }
	 }
	getTotalPrice();    
}
function listen(){
	var aReduce=document.getElementById("list").getElementsByClassName("reduce");
	for(var i=0;i<aReduce.length;i++){
	  (function(j){
	  	aReduce[j].onclick=function(){
		 numReduce(j);
		 getTotalPrice();
        }
	   })(i);    
    }
	var aPlus=document.getElementById("list").getElementsByClassName("plus");
	for(var i=0;i<aPlus.length;i++){
	  (function(j){
	  	aPlus[j].onclick=function(){
		 numPlus(j);
		 getTotalPrice();
        }
	   })(i);    
    }
	var aDel=document.getElementById("list").getElementsByClassName("del");
	for(var i=0;i<aDel.length;i++){
	  (function(j){
	  	aDel[j].onclick=function(){
	  	 console.log(aDel[j].name);
		 del(aDel[j].name,j);
		 getTotalPrice();
        }
	   })(i);    
    }
}
	


function getCart(id){
	var token=localStorage.getItem("token");
	var obj={
		method:"GET",
		url:"http://csit.top/api_cart.php",
		json:{},
		head:"token",
		headValue:token,
		callback:function(json){
	        var arr=json.data;
			var oUl=document.createElement("ul");
			var oList=document.getElementById("list");
			oList.innerHTML="";
			oList.appendChild(oUl);
				for (var i = 0; i < arr.length; i++) {
				 var oLi=document.createElement("li");
				 oLi.innerHTML='<div class="pic"><input class="check" type="checkbox" name="goods" onclick="getTotalPrice()"/><img src="'+ arr[i].goods_thumb +'"/></div>'+
				  '<a>'+ arr[i].goods_name +'</a>'+
				  '<div class="num"><input type="button" class="reduce" value=" - "/><span class="goods_number">' +arr[i].goods_number +'</span><input type="button" class="plus"  value=" + "/></div>'+
				  '<span class="price">' +arr[i].goods_price +'</span>'+
				  '<span class="subtotal">' +arr[i].goods_price*arr[i].goods_number +'</span>'+
				  '<div class="delete"><a class="del" name="'+arr[i].goods_id+'">删除</a></div>';
				  
				 oUl.appendChild(oLi);
				}
				listen();
		}
	}
	ajax(obj);
}

function del(id,i){
	var token=localStorage.getItem("token");
	var obj={
		method:"POST",
		url:"http://csit.top/api_cart.php",
		json:{
			goods_id:id,
		    number:"0"
		},
		head:"token",
		headValue:token,
		callback:function(obj){
			alert(obj.message);
		}
	}
	ajax(obj);
	var oUl=document.getElementById("list").getElementsByTagName("ul")[0];
	var oLi=document.getElementById("list").getElementsByTagName("ul")[0].getElementsByTagName("li")[i];
	//oUl.removeChild(oLi);
	//!!!
	oLi.style.display="none";
}

function numReduce(i){
	var oNum=document.getElementById("list").getElementsByClassName("goods_number")[i];
	var num=oNum.innerHTML;
	if(num==1){
		return;
	}
	num--;
	oNum.innerHTML=num;
	getSubtotal(i);
	getTotalPrice()
}
function numPlus(i){
	var oNum=document.getElementById("list").getElementsByClassName("goods_number")[i];
	var num=oNum.innerHTML;
	num++;
	oNum.innerHTML=num;
	getSubtotal(i);
	getTotalPrice()
}
function getSubtotal(i){
	var oNum=document.getElementById("list").getElementsByClassName("goods_number")[i];
	var oPrice=document.getElementById("list").getElementsByClassName("price")[i];
	var oSub=document.getElementById("list").getElementsByClassName("subtotal")[i];
	var num=parseFloat(oNum.innerHTML);
	var price=parseFloat(oPrice.innerHTML);
	var sub=num*price;
	oSub.innerHTML=sub;
}

function getTotalPrice(){
	var aLi=document.getElementById("list").getElementsByTagName("ul")[0].getElementsByTagName("li");
	var oTotal=document.getElementById("total");
	var sum=0;
	for (var i = 0; i < aLi.length; i++) {
		var oCheck=document.getElementById("list").getElementsByClassName("check")[i];
		var oSub=document.getElementById("list").getElementsByClassName("subtotal")[i];
		if(oCheck.checked==true&&aLi[i].style.display!="none"){
			sum+=parseFloat(oSub.innerHTML);
		}
	}
	oTotal.innerHTML="￥"+sum;
}