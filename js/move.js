function move(ele,targetJSON,time,callBack){
	ele.lock=true;
	if(arguments.length==4){
		if(typeof arguments[0]!='object'||typeof arguments[1]!='object'||typeof arguments[2]!='number'||typeof arguments[3]!='function'){
			//return alert('参数有误');
			throw new Error('参数有误');
		}
	}
	else if(arguments.length==3){
		//var length=4;
		if(typeof arguments[0]!='object'||typeof arguments[1]!='object'||typeof arguments[2]!='number'){
			//return alert('参数有误');
			throw new Error('参数有误');
		}
	callBack=null;
	}

	if(window.navigator.userAgent.indexOf("MSIE") == -1){
	var interval=20;
	}else{
	var interval=50;
	}
	var originalJSON={};
	for(var k in targetJSON){
	originalJSON[k]=parseFloat(FCS(ele,k));
	}
	var times=time/interval;
	var changeJSON={};
	for(var k in targetJSON){
	changeJSON[k]=(parseFloat(targetJSON[k])-originalJSON[k])/times;
	}
	var count=0;
	var timer=setInterval(function(){
	  count++;
		for(var k in changeJSON){
	originalJSON[k]+=changeJSON[k];
		}
		for(var k in changeJSON){
			if(k=='opacity'){
	ele.style[k]=originalJSON[k];
				ele.style.filter='alpha('+100*targetJSON[k]+')';
			}else{
	ele.style[k]=originalJSON[k]+'px';
			}
		}
		if(count==times){
			clearInterval(timer);
			for(var k in changeJSON){
				if(k=='opacity'){
				ele.style[k]=targetJSON[k];
				ele.style.filter='alpha('+100*targetJSON[k]+')';
				}else{
				ele.style[k]=targetJSON[k];
				}
		  }
			callBack&&callBack.call(ele);
			ele.lock=false;
		}
	},interval)
}
  
	function FCS(ele,property){
	if(window.getComputedStyle){
	return parseFloat(window.getComputedStyle(ele)[property]);   
		}else{
	return parseFloat(ele.currentStyle[property]);
		}
	}


