/* 新增
 * 人数插件
 * V1.0
 */
(function ($) {      
    $.fn.datepeo = function (options,Ycallback,Ncallback) {   
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('.getPeo');
        var indexY=2;
        var initY=0;
        var yearScroll=null;
        var startnum=$('.getPeo').attr('data-src');
        $.fn.datepeo.defaultOptions = {
            beginpeo:startnum,                 //人数--份开始
            endpeo:12,                   //人数--份结束
            mode:null,					//操作模式（滑动模式）
            curdate:false,				//定位
            event:"click",                    //打开插件默认方式为点击后后弹出
            show:true
        };
        //用户选项覆盖插件默认选项   
        var opts = $.extend( true, {}, $.fn.datepeo.defaultOptions, options );
        if(!opts.show){
            that.unbind('click');
        }
        else{
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event,function () {
                createUL();      //动态生成控件显示
                init_iScrll();   //初始化iscrll
                extendOptions(); //显示控件
                that.blur();
                refreshPeo();
                bindButton();
            })

        }
        function refreshPeo(){
            yearScroll.refresh();
            resetInitDete();
            yearScroll.scrollTo(0,initY*40, 100, true);
            
        }
        function resetInitDete(){
            if(opts.curdate){return false;}
            else if(that.val()===""){return false;}
            initY = parseInt(that.val());
        }
	function resetIndex(){
            indexY=2;
            indexM=2;
            indexD=2;
       }
        function bindButton(){
            resetIndex();
            $("#dateconfirm").unbind('click').click(function () {
            	indexY = (Math.round(indexY));
                var datestr = $("#peopwrapper ul li:eq("+indexY+")").html().substr(0,$("#peopwrapper ul li:eq("+indexY+")").html().length-1);
                if(Ycallback===undefined){
                	$(".number").val(datestr);
                     if(docType){that.html(datestr+"人");}else{that.val(datestr+"人");}
                     if($('.getPeo').val()!="请选择"){
                     	$('.getPeo').css("background","none");
					}
                }else{
                     Ycallback(datestr);
                }
                $("#datePage").hide(); 
                $("#dateshadow").hide();
            });
            $("#datecancle").click(function () {
                $("#datePage").hide(); 
			$("#dateshadow").hide();
//              Ncallback(false);
            });
        }		
        function extendOptions(){
            $("#datePage").show(); 
            $("#dateshadow").show();
        }
        //人数滑动
        function init_iScrll() { 
              yearScroll = new iScroll("peopwrapper",{snap:"li",vScrollbar:false,
                  onScrollEnd:function () {
//                	if(this.y == 0){
//                		indexY = (this.y/20)*(-1)+2;
////                     console.log("this.等于"+this.y);
////                     console.log((this.y/40)*(-1)+1);
//                      yearScroll.refresh();
//                	}else{
                  		indexY = (this.y/40)*(-1)+2;
                  		yearScroll.refresh();
//                		console.log("this.等于"+this.y);
//                      console.log(indexY);
//                	}
                       
                  }});
        }
        function  createUL(){
            CreateDateUI();
            $("#peopwrapper ul").html(createPEOP_UL());
        }
        function CreateDateUI(){
            var str = ''+
                '<div id="dateshadow"></div>'+
                '<div id="datePage" class="page">'+
                    '<section>'+
                        '<div id="datetitle"><h1>请选择人数</h1></div>'+
                        '<div id="datemark"><a id="markyear"></a><a id="markmonth"></a><a id="markday"></a></div>'+
                        '<div id="timemark"><a id="markhour"></a><a id="markminut"></a><a id="marksecond"></a></div>'+
                        '<div id="datescroll2">'+
                            '<div id="peopwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                        '</div>'+
                    '</section>'+
                    '<footer id="dateFooter">'+
                        '<div id="setcancle">'+
                            '<ul>'+
                                '<li id="dateconfirm">确定</li>'+
                                '<li id="datecancle">取消</li>'+
                            '</ul>'+
                        '</div>'+
                    '</footer>'+
                '</div>';
            $("#datePlugin").html(str);
        }
        function addTimeStyle(){
            $("#datePage").css("height","380px");
            $("#datePage").css("top","60px");
            $("#peopwrapper").css("position","absolute");
            $("#peopwrapper").css("top","0px");
        }
        
        //创建 --人数-- 列表
        function createPEOP_UL(){
            var str="<li>&nbsp;</li><li>&nbsp;</li>";
            for(var i=opts.beginpeo; i<=opts.endpeo;i++){
                str+='<li>'+i+'人</li>'
            }
            return str + "<li>&nbsp;</li><li>&nbsp;</li>";
        }
    }
})(jQuery);  
