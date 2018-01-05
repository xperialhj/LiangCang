
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

var oHand=document.getElementById("hand");
oHand.onmouseover=function(){
	if(oHand.lock){
		return;
	}
	move(oHand,{'left':'-25px'},500,function(){
		move(this,{'left':'0px'},500)
		}
	);
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
		}
	},10)
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
					for (var i = 0; i < arr.length; i++) {
					 var oLi=document.createElement("li");
					 oLi.innerHTML='<img src="'+ arr[i].goods_thumb +'"/>'+
					 '<a>'+ arr[i].goods_name +'</a>'+
					 '<input type="button" value="+" onclick="addcart('+arr[i].goods_id+')"/>'+ 
					 '<a id="fav">'+ arr[i].star_number +'</a>'+
					 '<div class="desc"><h2>￥' +arr[i].price +'</h2><h3>' +arr[i].goods_name +'</h3><p>'+ arr[i].goods_desc +'</p></div>';
					 oUl.appendChild(oLi);
					}
			}
	    }
		ajax(obj);
}