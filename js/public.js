/*
作用:返回一个随机整数
参数:第一个是最小值,第二个最大值
返回值:最小到最大值之间的随机整数
*/
function rand(min,max){
	return min+Math.floor(Math.random()*(max-min+1));
}


/*
作用:生成随机颜色
参数:无
返回值:返回一个十六进制的颜色  #456ABC
*/
function getColor(){
	var str = "#";
	for(var i=0;i<6;i++){		
		str += rand(0,15).toString(16)
	}	
	return str;

}

/*
作用:通过id获取元素
参数:id
返回值:DOM节点
*/
function $id(id){
	return document.getElementById(id);
}

/*
作用:获取窗口可视区域的宽高
参数:无
返回值:json对象
*/

function getClient(){
	if(window.innerWidth!=undefined){
		return {
			width: window.innerWidth,
			height:window.innerHeight
		};
	}else if(document.compatMode=="CSS1Compat"){
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}else{
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}
}

function scroll(){
	// return {
	// 	left:document.documentElement.scrollLeft+document.body.scrollLeft,
	// 	top:document.documentElement.scrollTop+document.body.scrollTop
	// }
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}

function getElements(className){
		//定义一个数组,用于存放符合条件的DOM节点
		var result = [];
		//第一步:获取页面上的所有标签
		var all = document.getElementsByTagName('*');
		//第二步:筛选其中类名叫one的元素
		for(var i=0;i<all.length;i++){
			if(all[i].className==className){
				//如果循环到的标签的类名和传入的类名一致,说明这个标签就是符合条件的
				result.push(all[i])
			}
		}
		return result;
}

//封装一个getStyle方法用于获取元素的样式
function getStyle(element,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(element,null)[attr];
	}else{
		return element.currentStyle[attr];
	}

}

function addEvent(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false)
	}else{
		dom.attachEvent("on"+type,fn)
	}
}


function trim(str){
	var reg = /(^\s+)|(\s+$)/g
	str = str.replace(reg,"")
	return str;
}


// function animate(dom,target){
// 	//封装一个函数,实现让指定目标运动到指定位置
// 	clearInterval(dom.timer)
// 	dom.timer = setInterval(function(){
// 		//获取元素当前位置
// 		var current = dom.offsetLeft;
// 		//设置速度
// 		var speed = current>target?-5:5;
// 		//计算下一次的位置
// 		var next = current + speed;
// 		//判断是都到达目标
// 		if(Math.abs(next - target)<=5){
// 			dom.style.left = target+"px";
// 			clearInterval(dom.timer)
// 		}else{
// 			//元素定位
// 			dom.style.left = next+"px";
// 		}
		
// 	},20)

// }

//思路:封装一个运动函数,可以实现指定元素,指定属性运动到指定目标位置
function animate(dom,attr,target,fn){
	//要用定时器先清定时器
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		//获取元素当前位置
		if(attr=="opacity"){
			//因为透明度获取的值是小数,所以都乘以100
			var current = getStyle(dom,attr)*100
		}else{
			var current = parseInt(getStyle(dom,attr));
		}				
		//设置速度
		var speed = current> target?-5:5;
		//计算元素下一次位置
		var next = current + speed;
		//判断是否到达目标位置
		if(Math.abs(next-target)<5){
			if(attr=="opacity"){
				dom.style.opacity = target/100;//谷歌火狐和ie9+
				dom.style.filter = "alpha(opacity="+target+")";//ie678
			//如果有传入fn,就在动画执行完成后执行
			}else{
				dom.style[attr] = target + "px";
			}				
			if(fn){
				fn()
			}
			// 可以简写成
			// fn&&fn()
			clearInterval(dom.timer);
		}else{
			//元素定位
			if(attr=="opacity"){
				dom.style.opacity = next/100;//谷歌火狐和ie9+
				dom.style.filter = "alpha(opacity="+next+")";//ie678
			}else{
				dom.style[attr] = next+"px"
			}
		}
		
	},30)
}
