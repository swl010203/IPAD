$(document).ready(function(){

// 庆典策划
    $('.gservice li').click(function(){
         $(this).addClass('gservice_top_cls').siblings().removeClass('gservice_top_cls');
    });




	// 充值
    $('.gway_list li').click(function(){
    	$(this).siblings().children('a').removeClass('glist-color');
    	$(this).children('a').addClass('glist-color');

        $(".gway_list li i").removeClass("glist-yes");
       $(this).children().children('i').addClass('glist-yes');
    });

    $('.falist p').click(function(){
        $(this).addClass('glist-color').siblings().removeClass('glist-color');
        //$(".gproject_pic1").removeClass("cur");
        $(this).find('.gproject_pic1').removeClass('cur');
        $(this).children('i').addClass('cur');
    });
    $('.zslist p').click(function(){
        $(this).addClass('glist-color').siblings().removeClass('glist-color');
        //$(".gproject_pic1").removeClass("cur");
        $(this).find('.gproject_pic1').removeClass('cur');
        $(this).children('i').addClass('cur');
    });




    // 卡券切换样式
        $(".gkaquan-dio .main").css("display","none");
        $(".gselected").css("display","none");
        $(".a1").click(function(){
            $(".main").css("display","none");
            $(".gselected").css("display","block");

        });
        $(".a2").click(function(){
            $(".main").css("display","none");
            $(".gkaquan-dio.main").css("display","block");
        });
        $(".gkaquan-dio1").click(function(){
            $(".gcov").removeClass("gdio-cover");
            $(this).children().eq(5).addClass("gdio-cover");
            $(".gsuc").removeClass("gdio-success");
            $(this).children().eq(6).addClass("gdio-success");

        });


// 意见反馈
$('.gtel input').focus(function(){
        $(this).removeAttr('placeholder');
    });

$('.gtel input').blur(function(){
     if($(this).val()==""){
        $(this).attr('placeholder','您的联系电话')}
    });



    // 充值金额

 $('.gjine_btn a').click(function(){
        $(this).addClass('gjine_color').siblings().removeClass('gjine_color');
    });
 $('.gjine_btn input').focus(function(){
        $(this).removeAttr('placeholder');
    });

$('.gjine_btn input').blur(function(){
     if($(this).val()==""){
        $(this).attr('placeholder','输入金额')}
    });


// 个人中心
    $('.ggeren li').click(function(){
    	$(this).addClass('ggeren_color').siblings().removeClass('ggeren_color');
    });




// 修改支付密码

$('.ggxiugai').focus(function(){
        $(this).removeAttr('placeholder');
        $(this).addClass('gfocus');
    });

$('.ggxiugai').blur(function(){
    $(this).removeClass('gfocus');
     if($(this).val()==""){
        $('.gxiugai1').attr('placeholder','18888888888');
         $('.gxiugai-sr').attr('placeholder','请输入验证码');}
    });


// 修改昵称

$('.galter input').focus(function(){
        $(this).removeAttr('placeholder');
        $(this).addClass('galter-bor');

    });
$('.galter input').blur(function(){
    $(this).removeClass('galter-bor');
     if($(this).val()==""){
         $(this).attr('placeholder','请输入昵称');
        }
    });

// 卡券

$('.gkaquan-tab li').click(function(){
      $(this).addClass('gtab-color').siblings().removeClass('gtab-color');
  });


// 意见反馈

$('.gfankui-list span').click(function(){
        $(this).addClass('gfankui-color').siblings().removeClass('gfankui-color');
//      $(this).css('border','none').siblings().css('border','1px solid #e0e0e0');
		$('.gfankui-list span').attr('style','border:1px solid #e0e0e0');
		$('.gfankui-color').attr('style','border:none');
		
		
    });

// 搜索
$('input').focus(function(){
        $(this).removeAttr('placeholder');
        $(this).addClass('gsearch-color');

    });
$('.input').blur(function(){
    $(this).removeClass('gsearch-color');
     if($(this).val()==""){
         $(this).attr('placeholder','请输入商品名称');
        }
    });

// 会展业务
$('.gbussiness_list ul li').click(function(){
        $(this).addClass('glist-color').siblings().removeClass('glist-color');
    });


// 评分


$('span').click(function(){

        if(this.classList.contains('gstar1')){
            var index_= $(this).index();//1

            var len_=$('.gstar1').length;//1
            for(var i=0;i<=len_;i++){
                if(i>=index_){
                    $(".gcomment-star").eq(i).removeClass("gstar1");
                }
            }
        }else{
             var index_= $(this).index();
             var len_=$('.gcomment-star').length;
             for(var i=0;i<len_;i++){
                if(i<index_){
                    $(".gcomment-star").eq(i).addClass("gstar1");
                }
            }
        }
    })

});
