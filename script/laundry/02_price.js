function first (){
	$(".kind-list .head li").on("click",function (){
		var thisIndex = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".kind-list .head ul").animate({
			left:-thisIndex*0.63+"rem"
		},200);
		$(".kind-list .main-list").css("display","none");
		$(".kind-list .main-list").eq(thisIndex).css("display","block");
	});	
}
first();

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
