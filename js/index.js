
	var aUl = document.getElementById('banner').getElementsByTagName('ul')[0];//获取ul数组
	var aLi = document.getElementById('banner').getElementsByTagName('li');//获取li数组
	var oPre = document.getElementById('Pre'); //获取上一张按钮
	var oNext = document.getElementById('Next');//获取下一张按钮
	var aSpan = document.getElementById('bannerButton').getElementsByTagName('span'); //获取span数组 
	var liLength=aLi.length;
	aUl.appendChild(aLi[0].cloneNode(true));
	var count=0;
    var liWidth=FCS(aLi[0],'width');

	oNext.onclick=function(){
		if(aUl.lock){
		return;
		}
		count++;
	  move(aUl,{'left':-liWidth*count},500,function(){
			if(count>liLength-1){
			 count=0;
			 aUl.style.left='0px';
			}		
		});
		var n=count;
		if(n>=liLength){
     n=0;
		}
		for(var j=0;j<liLength;j++){
		   aSpan[j].className='';
		 }
    aSpan[n].className='activecolor';
	}
	oPre.onclick=function(){
		if(aUl.lock){
		return;
		}
		count--;
		if(count<0){
			 count=liLength-1;
			 aUl.style.left=-liWidth*liLength+'px';
		}	
	  move(aUl,{'left':-liWidth*count},500,function(){});
		var n=count;
		if(n>=liLength){
     n=0;
		}
		for(var j=0;j<liLength;j++){
		   aSpan[j].className='';
		 }
    aSpan[n].className='activecolor';
	}
	for(var i=0;i<liLength;i++){
    (function(i){aSpan[i].onclick=function(){
		 if(aUl.lock){
		  return;
		 }
		 for(var j=0;j<liLength;j++){
		   aSpan[j].className='';
		 }
     aSpan[i].className='activecolor';
     move(aUl,{'left':-liWidth*i},500);
		}})(i);
	}
	
var oHg=document.getElementById("hotgoods");
getHotGoods();

var username=localStorage.getItem("username");
var token=localStorage.getItem("token");
if(username&&token){
	getUserInfo();
}

//!!
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
//	setTimeout(function(){
//		if(oHand.lock){
//		console.log('lock')
//		return;
//	}
//	move(oHand,{'left':'-25px'},500,function(){
//		move(this,{'left':'0px'},500)})	
////		var time=setInterval(function(){
////			if(oHand.style.left!='0px'){
////				console.log(oHand.lock)
////			    oHand.lock=true;
////			}else if(oHand.style.left=='0px'){
////				oHand.lock=false;
////				console.log(oHand.lock)
////				clearInterval(time);
////			}
////		},10)		 
//	},1000);

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

function getHotGoods(){
		var obj={
			method:"GET",
			url:"http://csit.top/api_goods.php",
			json:{
				page:1,
				pagesize:18
			},
			callback:function(json){
				var arr=json.data;
				var oUl=document.createElement("ul");
				oHg.innerHTML="";
				oHg.appendChild(oUl);
				var heartLog=[];
				var fav=[];
					for (var i = 0; i < arr.length; i++) {
					 var oLi=document.createElement("li");
					 oLi.innerHTML='<img src="'+ arr[i].goods_thumb +'"/>'+
					 '<a id="brand">'+ arr[i].goods_name +'</a>'+
					 '<input type="button" value="+" onclick="addcart('+arr[i].goods_id+')"/>'+ 
					 '<a class="fav"><span class="Fav">'+ arr[i].star_number +'</span><img class="heartlogo" src="img/heart_gray.png"/></a>'+
					 '<div class="desc"><h2>￥' +arr[i].price +'</h2><h3>' +arr[i].goods_name +'</h3><p>'+ arr[i].goods_desc +'</p></div>';
					 oUl.appendChild(oLi);
					 heartLog[i]=document.getElementsByClassName("heartlogo")[i];
			         fav[i]=document.getElementsByClassName("Fav")[i];
					}
					for (var k = 0; k < heartLog.length; k++) {
					(function (j){
						heartLog[j].onclick =function(){
						if(showWindow()){
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
						
					}    
					})(k);
				}
			}
	    }
		ajax(obj);
}


//聊天框
var oBo=document.getElementsByTagName('body')[0];
	var oBox=document.getElementById('chat_box');
	var oTxt=document.getElementById('chat_txt');
	var oBox3=document.getElementById('chat_box3');
	var oBut=document.getElementById('chat_but');
	var oUi=document.getElementById('chat_ul');
	var oBox6=document.getElementById('chat_box6')
	var oBox22=document.getElementById('chat_box22')
	oBut.onclick=function(){
		var oLi=document.createElement('li')
		var oSpan=document.createElement('span')
		var cc=oTxt.value;
		oTxt.value="";
        oLi.innerHTML+=cc;
		oUi.appendChild(oLi)
	}
	oBox6.onclick=function(){
		oBox.style.display="block"
		oBox6.style.display="none"
	}
	oBox22.onclick=function(){
		oBox6.style.display="block"
		oBox.style.display="none"
	}
	oBox.onmousedown=function(event){
		var event=event||window.event;
		var l=event.clientX-oBox.offsetLeft;
		var t=event.clientY-oBox.offsetTop;
		
		document.onmousemove=function(event){
			var event=event||window.event;
			event.preventDefault();
			var x=event.clientX-l;
			var y=event.clientY-t;
			if(x <= 0) x = 0;
			if(y <= 0) y = 0;
			if(x >= oBo.clientWidth - oBox.offsetWidth) x = oBo.clientWidth - oBox.offsetWidth;
			if(y >= oBo.clientHeight - oBox.offsetHeight) y = oBo.clientHeight - oBox.offsetHeight;
			oBox.style.left=x+"px";
			oBox.style.top=y+"px";
		}
	}
	oBox.onmouseup=function(){
		document.onmousemove=null;
	}




function getUserInfo(){
	var strUsername=localStorage.getItem("username");
	var token=localStorage.getItem("token");
	var obj={
			method:"GET",
			url:"http://csit.top/api_userinfo.php",
			json:{
				status:"info",
				username:strUsername
			},
			head:"token",
		    headValue:token,
			callback:function(json){
				var arr=json.data;
				console.log(json);
				var name=document.getElementById("info");
				name.innerHTML="";
				name.innerHTML='<img src="img/touxiang.png"/><span>'+arr.username+'</span><div id="userinfo"><a><span>个人设置</span></a><a><span>收货信息</span></a><a><span>我的订单</span></a><a><span id="exit">退出</span></a></div>';
				//退出登陆事件
				var oExit=document.getElementById("exit");
				oExit.onclick=function(){
					localStorage.setItem("token","");
					localStorage.setItem("username","");
					getSmallCart();
					getUserInfo();
					location.reload();
                }
			}
	}				
		ajax(obj);
}

getSmallCart();
function getSmallCart(){
	var token=localStorage.getItem("token");
	if(!token){
		return;
	}
	var obj={
		method:"GET",
		url:"http://csit.top/api_cart.php",
		json:{},
		head:"token",
		headValue:token,
		callback:function(json){
	        var arr=json.data;
	        console.log(arr)
			var oUl=document.createElement("ul");
			var oGoods=document.getElementsByClassName("goods")[0];
			oGoods.innerHTML="";
			oGoods.appendChild(oUl);
				for (var i = 0; i < arr.length; i++) {
				 var oLi=document.createElement("li");
				 oLi.innerHTML='<img src="'+arr[i].goods_thumb+'"/><span class="goodsname">'+arr[i].goods_name+'</span><span class="goodsnum">数量:'+arr[i].goods_number+'</span><span class="goodsprice">￥'+arr[i].goods_price+'</span>'
				 oUl.appendChild(oLi);
				}
				var cartNum=document.getElementById("cartnum");
				cartNum.innerHTML=arr.length;
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