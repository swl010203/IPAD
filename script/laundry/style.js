/**
 * Created by WangZijian on 2017/4/18 0018.
 */
(function (win,doc) {
    function change() {
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/640+'px';
    }
    doc.addEventListener('DOMContentLoaded',change,false);
    win.addEventListener('resize',change,false);
})(window,document);


var oDIv=null;	
function tab (btn,obj){
	$(btn).on("click",function (){
		$(this).addClass("active").siblings().removeClass("active");
		var thisIndex = $(this).index();
		$(obj).hide();
		$(obj).eq(thisIndex).show()
	});		
}

tab(".head li",".case-list .list");


//价格明细部分


function first (){
	$(".kind-list .head li").on("click",function (){
		var thisIndex = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".kind-list .main-list").css("display","none");
		$(".kind-list .main-list").eq(thisIndex).css("display","block");
	});	
}
first();
//首层选项卡
function second (){
	$(".main-list .tit li").on("click",function (){
		var thisIndex = $(this).index();
		$(".main-list .tit li").removeClass("active");
		$(this).addClass("active");
		var oMain = this.parentNode.parentNode.parentNode.getElementsByClassName("main")[0];
		var aUl = oMain.getElementsByTagName("ul");
		for (var i = 0 ; i < aUl.length ; i++){
			aUl[i].style.display = "none";
		}
		$(aUl).eq(thisIndex).css("display","block");
	});
}
second();
//内层选项卡


//一键预约

function cla(){	
	$(".nav li").click(function (){
		var thisIndex = $(this).index();
		$(this).toggleClass("active");
	})
}
cla();
//点击选中服务


//选择地址部分
function phone(){
	var oPho = document.querySelectorAll(".phone");
	for (var i = 0 ; i < oPho.length; i++){
		var str = oPho[i].innerHTML;
		$(".phone")[i].innerHTML=str.substr(0,3)+"****"+str.substr(7);
	}
}
phone();
//手机号不显示中四位
function del (){
	$(".default .del").click(function (){
		$(this).parent().parent().parent().empty();
	});
}
del();
//删除地址
function defaultAdd (){
	$(".default .fl").on("click",function (){					
		$(".default .fl p").addClass("xuan");	
		$(this).find("p").eq(0).removeClass("xuan");
	});
}
defaultAdd();
//选择默认地址

//选择取件时间

function tar(){	
	$(".period li").on("click",function (){
		$(".period img").remove('li img');
		$(".period li").css("color","#999");
		$(this).append("<img src='../../images/icon/sanjiao.png'/>");
		$(this).css("color","#116f81");
	})
}
//tar();
//点击选中时间段	

function p(s) {
	return s < 10 ? '0' + s: s;
}
//补零函数

function dataa(){
	
	var myDate = new Date();
	var month = myDate.getMonth()+1;
	var date = myDate.getDate();	
	var today = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
	var arr = ["昨天","今天","明天"];
	var week = today[myDate.getDay()];	//星期	
	
	var qqq = document.querySelectorAll(".wek");	//写入星期对象
	
	for (var i = 0 ; i < qqq.length ; i++){
		if(i<3){
			qqq[i].innerHTML = arr[i];
			switch(i){
				case 1 :
					qqq[i].parentNode.className="now";
					break;
				case 2 :
					qqq[i].parentNode.className="next";
					break;

			}
		}else if (week){
			var j = i ;
			qqq[i].innerHTML = today[j+2];
			if(j+2==7){
				j=0;
				qqq[i].innerHTML = today[j];
			}
		}
	}
	
	var mmm = document.querySelectorAll(".mon");	//写入日期对象
	
	for (var i = 0, j =-1 ; i < mmm.length ; i++,j++){
		var now = p(month)+"月"+p(date+j)+"日";		
		mmm[i].innerHTML = now;
	}
}

//dataa();
//	自动写入日期星期

function qqq (){
	$(".datatime li").click(function (){
		$(".datatime li i").empty();
		$(this).append("<i><img src='../../images/icon/arrow.png'/></i>");
	});
}
//qqq();

function ppp (){
	$(".information li:last-child").click(function (){
		$(".information span").toggleClass("xuan");
	})
}
ppp();

//拖动函数