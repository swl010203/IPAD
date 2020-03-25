	a();
		function a(){
			var shuliang = 0;
			for(var i = 0;i<$(".shuliang span").length;i++){
				var a = $(".shuliang span").eq(i).html();
				if(a == 0){
					$(".shuliang").eq(i).children(".jian").addClass("jinzhi");
				}
				var price=$('.fl .red').text();
				var price_ = price.substring(1);
				var numPrice = parseInt(a)*parseInt(price_);
				shuliang+=numPrice;
//				console.log(shuliang)
				$(".pricePosi").html("￥"+shuliang);
			}
		}
		$(".jian").click(function(){
			var class_ =$(this).attr("aa");
			var num=parseInt($(this).parent().find('span').text());
			num--;
			if(num<=0){
				num=0;
				$(this).addClass("jinzhi");
				$(this).next("span").html(0);
			}else{
				$(this).next("span").html(num);
			}
			a();
		});
		$(".jia").click(function(){
			var num=parseInt($(this).parent().find('span').text());
			num++;
			if(num>=0){
				$(this).parent().children(".jian").removeClass("jinzhi");
			}
				$(this).prev("span").html(num);
			a();
		});
		$(".bianji").click(function(){
			$(this).addClass("hide_");
			$("footer").eq(0).addClass("hide_");
			$("footer").eq(1).removeClass("hide_");
			$(".selD").removeClass("hide_");
			
		});
		$(".del").click(function(){
			$(".mark").removeClass("hide_");
		});
		$(".queren button").click(function(){
			var btnClass = $(this).attr("class");
			if(btnClass=="sure"){
				$(".selImg").parent("li").remove();
				$(".mark").addClass("hide_");
			}else{
				$(".mark").addClass("hide_");
			}
		});
		$(".ok").click(function(){
			$(".bianji").removeClass("hide_");
			$("footer").eq(1).addClass("hide_");
			$("footer").eq(0).removeClass("hide_");
			$(".selD").addClass("hide_");
		});
		var flag = true;
		$(".sel").click(function(){
			if(flag){
				$(this).addClass("selImg");
				$(".selD").addClass("selImg");
				flag = false;
			}else{
				$(this).removeClass("selImg");
				flag = true;
				$(".selD").removeClass("selImg");
			}
			
		});
		$(".selD").click(function(){
			if(this.classList.contains("selImg")){
				$(this).removeClass("selImg");
			}else{
				$(this).addClass("selImg");
			}
		});