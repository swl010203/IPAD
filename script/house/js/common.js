/**
 * Created by Administrator on 2017/4/18 0018.
 */
(function (win,doc) {
    function change() {
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/640+'px';
    }
    doc.addEventListener('DOMContentLoaded',change,false);
    win.addEventListener('resize',change,false);
})(window,document);


function tab (){
	$(".tab .btn").on("click",function(){
		var thisIndex = $(this).index();		
		$(this).addClass('active').siblings().removeClass('active');
		$(".box>div").css("display","none");
		$(".box>div").eq(thisIndex).css("display","block");	
	})
}
tab();


//查看图片

function pic (){
	for(var i = 0 ; i < 23 ; i++){
		$(".pic-list ul").append("<img src='img/ad"+0+".png' class='car_img'>").css("width",$(".pic-list img").width()*i+"rem");
	}
}
pic();	
//动态创建img

$(document).ready(function(e) {
	var imgObj = document.getElementsByClassName("car_img");
	var imgLen = imgObj.length;
	var windowWidth = $(window).width();
	$(".car_img").bind("click",function(event){

	});
	int = setInterval(carouselImg,100000);
	for(var i=0;i<imgLen;i++){
		$(".car_img").eq(i).css({"top":"0","left":i*windowWidth});
		imgObj[i].addEventListener('touchstart',touchstart,false);
		imgObj[i].addEventListener('touchmove',touchmove,false);
		imgObj[i].addEventListener('touchend',touchend,false);
	}

});

function touchstart(event){
	event.preventDefault();
	if( event.targetTouches.length == 1 )
	{
		clearInterval(int);
		var touch = event.targetTouches[0];
		pressX = touch.pageX;
	}
}

/*
 *定义每次滑动的距离spanX
 *定义当前滑动的索引位置thisIndex，轮播图的个数imgLen
 */
function touchmove(event){
	var txt  = document.getElementsByClassName("text")[0].getElementsByClassName("page")[0];
	event.preventDefault();
	if( event.targetTouches.length == 1 )
	{
		var touch = event.targetTouches[0];
		var spanX = touch.pageX - pressX ,
			windowWidth = $(window).width();
		var $car_img = $(".car_img"),
			$this = $(this);
		var thisIndex = $this.index(),
			imgLen = $(".car_img").length;
		for(var i=0;i < imgLen;i++){
			$car_img.eq(i).css("left",windowWidth*(i-thisIndex)+spanX);
		}		
	}
	console.log(thisIndex+2);
	txt.innerHTML = thisIndex+2;
}

function touchend(event){
	var $car_img = $(".car_img"),
		$this = $(this),
		$carousel_icon = $(".carousel_icon"),
		windowWidth = $(window).width();
	var thisIndex = $this.index(),
		imgLen = $(".car_img").length;
	var thisLeft = parseInt($(this).css("left"));
	//向左滑动执行的方法
	if(thisLeft < -32 && thisIndex < imgLen){
		//当轮播图滑动最后一个位置时，当前轮播图位置不变
		if(thisIndex == imgLen-1){
			for(var i=0;i < imgLen;i++){
				$car_img.eq(i).animate({"left":windowWidth*(i-thisIndex)},300);

			}
		}
		//当轮播不在最后一个位置时，轮播图位置变化方法
		else{
			for(var i=0;i < imgLen;i++){
				$car_img.eq(i).animate({"left":windowWidth*(i-(thisIndex+1))},300);
				$carousel_icon.eq(i).addClass("carousel_icon2").removeClass("carousel_icon1");
			}
			$carousel_icon.eq(thisIndex+1).removeClass("carousel_icon2").addClass("carousel_icon1");
		}

	}
	//向右滑动执行的方法
	else if(thisLeft > 32 && thisIndex >= 0){
		//当轮播图在第一个位置时
		if( thisIndex == 0){
			for(var i=0;i < imgLen;i++){
				$car_img.eq(i).animate({"left":windowWidth*(i-thisIndex)},300);
			}
		}
		//轮播图不在第一个位置
		else{
			for(var i=0;i < imgLen;i++){
				$car_img.eq(i).animate({"left":windowWidth*(i-(thisIndex-1))},300);
				$carousel_icon.eq(i).addClass("carousel_icon2").removeClass("carousel_icon1");
			}
			$carousel_icon.eq(thisIndex-1).removeClass("carousel_icon2").addClass("carousel_icon1");
		}
	}
	//当滑动距离在大于-32px并且小于32px时，当前轮播图位置不变
	else{
		for(var i=0;i < imgLen;i++){
			$car_img.eq(i).animate({"left":windowWidth*(i-thisIndex)},100);
		}
	}
	int = setInterval(carouselImg,300000);
}

function carouselImg(){
	var $car_img = $(".car_img"),
		$carousel_icon = $(".carousel_icon"),
		windowWidth = $(window).width();
	var imgLen = $car_img.length,
		imgZeroIndex = 0;
	for(var i=0;i<imgLen;i++){
		var everyImgLeft = parseInt($car_img.eq(i).css("left"));
		if(everyImgLeft == 0){
			imgZeroIndex = i;
			break;
		}

	}
	if(imgZeroIndex == imgLen-1){
		for(var i=0;i<imgLen;i++){
			$car_img.eq(i).animate({"left":windowWidth*i},300);
			$carousel_icon.eq(i).removeClass("carousel_icon1").addClass("carousel_icon2");
		}
		$carousel_icon.eq(0).removeClass("carousel_icon2").addClass("carousel_icon1");
	}
	else{
		for(var i=0;i<imgLen;i++){
			$car_img.eq(i).animate({"left":windowWidth*(i-(imgZeroIndex+1))},300);
			$carousel_icon.eq(i).removeClass("carousel_icon1").addClass("carousel_icon2");
		}
		$carousel_icon.eq(imgZeroIndex+1).removeClass("carousel_icon2").addClass("carousel_icon1");
	}
}


//预约看房

function kan (){
	$(".protocol").click(function (){
		$(this).toggleClass("active");
	})
}
kan();


function oPen (){
	$(".timer").click(function (){
		$(".time-box").animate({top:0});
		$(".time-box").css("display","block");
	});
	$(".finshs").click(function (){		
		var str = $(".time-list .active").prev('p').text();
		$(".timer .timers").val(str);
		$(".time-box").animate({top:10+"rem"},200);
		$(".time-box").css("display","none");
	});
	$(".closes").click(function (){
		$(".time-box").animate({top:10+"rem"},200);
		$(".time-box").css("display","none");
	})
}
oPen();	

function dataa(){
	var timestamp = Date.parse(new Date());
	for(var i = 0 ; i < 7 ; i++){
		var time=GetDateStr(i);
		$(".time-list .datatime"+i).val(time[1]);
		$(".time-list .fl").eq(i).text(time[0]);
	}
}

dataa();   
function GetDateStr(AddDayCount) { 
	var dd = new Date();
	dd.setDate(dd.getDate()+AddDayCount);
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1; 
	var d = dd.getDate(); 
	var data=[];
	data[0]=y+"年"+m+"月"+d+"日";
	data[1]=y+"-"+m+"-"+d;
	return data; 
}  
//补零函数

function clo (){
	$(".homer").click(function (){
		$(".home-box").animate({top:0});
		$(".home-box").css("display","block");
	});
	$(".finsh").click(function (){
		$(".home-box").animate({top:0+"rem"},200);
		$(".home-box").css("display","none");
		var str = [];
		$(".home-list .active").prev('p').each(function(){
			str.push($(this).text());
		}); 
		$(".homer .homers").val(str);
	});
	$(".close").click(function (){
		$(".home-box").animate({top:0+"rem"},200);
		$(".home-box").css("display","none");
	})
}
clo();

function iScrollClick(){
	if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return true;
	if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
	if (/Silk/i.test(navigator.userAgent)) return true;
	if (/Android/i.test(navigator.userAgent)) {
		var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
		return parseFloat(s[0]+s[3]) < 44 ? true : false;
	}
}
function iScrollClicks(){
	if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return true;
	if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
	if (/Silk/i.test(navigator.userAgent)) return true;
	if (/Android/i.test(navigator.userAgent)) {
		var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
		return parseFloat(s[0]+s[3]) < 44 ? true : false;
	}
}
function bodyScroll(event){
	    event.preventDefault();
	}