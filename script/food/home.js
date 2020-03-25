
//倒计时
var nowtime = new Date();
var starttime = nowtime.setHours(nowtime.getHours()+2);
 setInterval(function () {    
 	nowtime = new Date();    
 	var time = starttime - nowtime;    
   	var day = parseInt(time / 1000 / 60 / 60 / 24);   
 	var hour = parseInt(time / 1000 / 60 / 60 % 24);   
 	var minute = parseInt(time / 1000 / 60 % 60);    
 	var seconds = parseInt(time / 1000 % 60);  
 	if(hour<10){
 		hour='0'+hour;
 	}
 	if(minute<10){
 		minute='0'+minute;
 	}
 	if(seconds<10){
 		seconds='0'+seconds;
 	}
 	$('.hou').html(hour);
 	$('.min').html(minute);
 	$('.sec').html(seconds)
},1000);