//var ajax_url = "http://www.hguanjia.cn/index.php/";
//var picture_url = "http://www.hguanjia.cn/"; //图片地址
var ajax_url = "http://123.57.36.72:8104/index.php/";
var picture_url = "http://123.57.36.72:8104/"; //图片地址

//var ajax_url = "http://beta.hguanjia.cn/index.php/";
//var picture_url = "http://beta.hguanjia.cn/"; //图片地址

//全局变量  调用方法  App.serverUrl
var App = {
	
	debug:true ,           //开启调试模式  true 显示调试日志console.log false不显示
	
	//ajax配置
	ajaxCache : true,     //ajax请求缓存
	
	//openWin 设置
	allowEdit:true,       //打开新窗口 是否可以长按 复制 粘贴
	bounces:true,         //页面是否弹动
	winDelay:200,
	
	//_toast 延迟时长
	delay:2000,
	duration: 2000,       //持续时长，单位：毫秒
    location: 'bottom',   //弹出位置，顶部、中间或底部
	
	//IOS配置项
	useWKWebView:false,    //IOS新页面渲染  为true时不能与其它未使用WKWebView加载的页面通用。
	
	//页面默认颜色
	color:'#d12a18',
	//查询尾号限行的key
	xx_key:'f8f28cae86088df0e51a4ec7f666dcd5'
};

/**
 * 查询尾号限行
 * 
 * xx_type 类型，1:今日 2:明天 3:后天 4:第4天 5:第5天 6:第6天 默认1 
 */
function xx_weihao(xx_type,xx_call){
	var xx_url = "http://v.juhe.cn/xianxing/index";
	var xx_data = "?dtype=&city=beijing&type="+xx_type+"&key=f8f28cae86088df0e51a4ec7f666dcd5";
	_ajax(xx_url+xx_data,null,"get",xx_call);
}

$("#back").bind("click",function(){
   api.closeWin();
});
$(".back").bind("click",function(){
   api.closeWin();
});


/**
 * 室内首页监听获取用户信息 
 */
function addEventUserInfo(){
	
	var param = api.appParam;
    var params = JSON.parse(param);
    var uid = params.uid; 
    var address = params.address;
    var vName = params.versionName;
//    api.alert({msg:param});
    localStorage.setItem("uid",uid);
    localStorage.setItem("address",address);
    localStorage.setItem("versionName",vName);
//  console.log(vName+"======================================================uid:"+uid+"----------address:"+address);
    _ajax(ajax_url+"Index/User/myInfo",{'uid':uid},'post',function(ret){
//  	api.alert({msg:ret});
        if(ret.status== 1 ){
        	$api.setStorage('userinfo',ret.userinfo);
        	var push = api.require('push');
			push.bind({
			    userName: ret.userinfo.nickname,
			    userId: uid
			}, function(ret, err){
			    if( ret ){
					push.setListener(function( ret, err ){});
			    }
			});
        }
    });
//	
//	//获取 用户地址和uid的回调
//	api.addEventListener({
//		name:'setUserData'
//	}, function(ret){
//		console.log("获取 用户地址和uid的回调："+ JSON.stringify(ret));
//		localStorage.setItem("uid",ret.value.uid);
//		
//		localStorage.setItem("address",ret.value.address);
//		//alert('收到来自Native的事件：\n' + JSON.stringify(ret));//uid：用户id；address：用户地址
//		
//		_ajax(ajax_url+"Index/User/myInfo",{'uid':ret.value.uid},'post',function(ret){
//			if(ret.code==1){
//				$api.setStorage('userinfo',ret.userinfo);
//			}
//		})
//	});
//
//	//获取用户信息
//	api.accessNative({
//		name: 'getUserData'
//	});

}


/** 打开新窗口 
 * @param string name 窗口名称
 * @param string url  地址
 * @parem object pageParam  传递参数
 * @param slidBackEnabled  ios 是否支持左滑返回上一页
 */
var _openWinByUrl = function(name, url,pageParam,slidBackEnabled) {
	var strDM = api.systemType;
    if (strDM == 'ios') {
    	var winDelay = 0;
    }else{
    	var winDelay = App.winDelay;
    }
    
    var _slidBackEnabled = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? false  : arguments[3];
    
    if(name =='pay_head'){
    	_slidBackEnabled = false;
    }
	api.openWin({
		name : name,
		url : url + '.html',
		allowEdit:App.allowEdit ,
		useWKWebView:App.useWKWebView,
		delay:winDelay,
		pageParam :pageParam,
		slidBackEnabled:_slidBackEnabled
	});
};


/**
 * 判断是Apicloud还是H5
 * author lgp
 */

function _isApiCloud() {
	if (typeof api !== 'undefined' && typeof api.openWin !== 'undefined') {
		return true;
	} else {
		return false;
	}
}

/**
 * ajax请求
 * @param string     url      ajax请求地址
 * @param array      data     请求数据 json对象  {'1':1,'2':2}
 * @param string    _method   请求类型 默认 post
 * @param function  _call     请求成功回调函数
 * @param string    _datatype 回调类型 默认 json
 * @param filestr   _files    文件路径  {'file1':file}
 */
var _ajax = function(url,data,_method,_call,_datatype,_files){
	var _data = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? {}  : arguments[1];
	var _method = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? "post"  : arguments[2];
	var _datatype = ( typeof arguments[4] == "undefined" || arguments[4] == null) ? "json"  : arguments[4];
	var _files = ( typeof arguments[5] == "undefined" || arguments[5] == null) ? {}  : arguments[5];
	//判断是Apicloud还是H5
	var is_api = _isApiCloud();
	if(App.debug){
		var debugUrl="";
		$.each(_data,function(k,v){
			debugUrl += k+"="+v+"&";
		});
		console.log("请求地址："+url+"?"+debugUrl);
		if(_data)
			console.log("请求数据data："+ JSON.stringify(_data));
		if(_files)
			console.log("请求文件："+ JSON.stringify(_files));
	}
	if(is_api){
		api.ajax({
			url:url,
			method:_method,
			dataType:_datatype,
			cache:App.ajaxCache,
			data:{
				values:_data,
				files:_files
			}
		},function(ret,err){			
			if(ret){
				if ( typeof _call == "function") {
					_call(ret);
				}
				if(App.debug){
					//console.log("返回内容："+ JSON.stringify(ret));
					console.log("返回内容err："+ JSON.stringify(err));
					var a = location.href;
			        var b = a.split("/");
			        var c = b.slice(b.length-1, b.length).toString(String);
					console.log("返回内容ret："+ JSON.stringify(ret)+" \r\n请求页面："+c);
				}
			}else{
				if(err){
					if(err.statusCode !=200){
						//api.alert({msg:"网络连接失败，请稍后再试"});
					}
				}
				closeloading();
				api.refreshHeaderLoadDone();
				api.hideProgress();
				
			}
			
		});
	}else{
		$.ajax({
			url: url,
			data: _data,
			method:_method,
			dataType: "json",
			success: function(ret){
				console.log(ret);
				if ( typeof _call == "function") {
					_call(ret);
				}
			},
			error:function(){
				//alert("网络连接失败，请稍后再试");
				return false;
			}
		});
	}
};


/**
 * 底部弹出框  一般用与上传头像
 * @param string title 标题
 * @param array  buttons 按钮
 * @param function _call 回调方法
 */
var _actionSheet = function(title, buttons,_call){
	api.actionSheet({
		title: title,
		cancelTitle: '取消',
		buttons:buttons,
		style:{
			fontNormalColor:App.color
		}
	}, function(ret, err) {
		var index = ret.buttonIndex;
		if ( typeof _call == "function") {
			_call(ret,index);
		}
	});
	
};



/**
 * 图片缓存
 * string url 图片网络url地址
 */

function _imageCache(url, el) {
	$(el).each(function(k, v) {
		if (typeof v != undefined && v != null && v != '') {
			api.imageCache({
				url: url[k],
				thumbnail: true,
				policy: 'cache_else_network'
			}, function(ret, err) {
				$(el).eq(k).attr('src', ret.url);
			});
		}

	});
	return url;

}

/**
 * 图片浏览
 * array _data  数组
 * int   _index  第几个开始
 */

function photoBrowser(_data, _index) {
	
	var _data = (typeof arguments[0] == "undefined" || arguments[0] == null) ? [] : arguments[0];
	var _index = _index ? _index : 0;
	var photoBrowser = api.require('photoBrowser');
	console.log(_data);
	photoBrowser.open({
		images: _data,
		placeholderImg: 'widget://image/default.jpg',
		bgColor: '#000',
		activeIndex: _index
	}, function(ret, err) {
		if (ret) {
			if (ret.eventType == 'click') {
				photoBrowser.close();
			}
		} else {

		}
	});
}

function closephotoBrowser() {
	var photoBrowser = api.require('photoBrowser');
	photoBrowser.close();
}
	
	

//消息提示
var _toast = function(msg,callback,delay){
	var delay = ( typeof arguments[2] == "undefined" || arguments[2] == null  ||  arguments[2]=='') ? App.delay  : arguments[2];  //延迟时长
	//判断是Apicloud还是H5
	var is_api = _isApiCloud();
	if(is_api){
		api.toast({
			duration:App.duration,
			location:App.location,
			msg:msg
		});
		if ( typeof callback == "function") {
			setTimeout(function(){
				callback();
			},delay); 
		}
	}else{
		if ( typeof callback == "function") {
			setTimeout(function(){
				callback();
			},delay); 
		}
	}
	
};

//弹出带一个按钮的对话框

function _alert(msg) {
	var is_api = _isApiCloud();

	if (is_api) {
		api.alert({
			title: "提示",
			msg: msg,
			buttons: ['确定']
		});
	} else {
		//	alert(title);
		console.log(title);
	}

}
//显示进度提示框

function showprogress(title) {
	api.showProgress({
		style: 'default',
		animationType: 'fade',
		title: title,
		text: '',
		modal: false
	});
}
//隐藏进度框

function hideprogress() {
	api.hideProgress(); //隐藏进度条
}

window.loading_id = 0;
/**
 * 页面Loading
 */

function loading(frame) {
	var frame = (typeof arguments[0] == "undefined" || arguments[0] == null) ? "" : arguments[0];
	var UILoading = api.require('UILoading');
	UILoading.flower({
		center: {
			// x: 160,
			// y: 240
		},
		mask: '#fff',
		size: 30,
		fixed: true,
		fixedOn: frame
	}, function(ret) {
		window.loading_id = ret.id;
	});
}
/**
 * 页面Loading
 */

function closeloading() {
	var uiloading = api.require('UILoading');
	uiloading.closeFlower({
		id: window.loading_id
	});
}
	/* 打开新窗口 
	 * @param name 窗口名称
	 * @param url  地址
	 * pageParam 传递参数
	 */
	
	function openWinByUrl(name,pageParam) {
		api.openWin({
			name : name,
			url : name + '.html',
			bgColor:"#676766",
			allowEdit:true,	
			pageParam :pageParam
		});
	}
	/*
	 * 打开 frame
	 */
	function openFrameUrl(name,header,h,pageParam){
			api.openFrame({
		    name: name,
		    url: name + '.html',
		    rect: {
		        x: 0,
		        y: header,
		        w: 'auto',
		        h: h
		    },
		    pageParam: pageParam,
		    bounces: true,
		    bgColor: 'rgba(0,0,0,0)',
		    vScrollBarEnabled: true,
		    hScrollBarEnabled: true
		});

	}

	
	


/**
 * 时间戳转时间
 * @param timespan 时间戳  非必填，为空时获取当前日期时间
 * @param is_time  是否获取时间，  为false时 值获取日期，为true时获取日期与时间
 */
function _formatDate(timespan,is_time) {
	if( typeof arguments[0] == "undefined" || arguments[0] == null){
		var now = new Date();
	}else{
		var now = new Date(timespan);
	}
	var year = now.getFullYear();
	var month = zeroize(now.getMonth() + 1);
	var date = zeroize(now.getDate());
	var hour = zeroize(now.getHours());
	var minute = zeroize(now.getMinutes());
	var second = zeroize(now.getSeconds());
	if(is_time){
		return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
	}else{
		return year + "-" + month + "-" + date ;
	}
	
}
 var zeroize = function (value, length) {

    if (!length) length = 2;

    value = String(value);

    for (var i = 0, zeros = ''; i < (length - value.length); i++) {

        zeros += '0';

    }

    return zeros + value;

};


// 判断是否存在非法表情、字符
function checkEmoji(str) {
    var re =/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则;//只能输入汉字和英文字母
    return !re.test(str)
    
}


// 判断是否是手机号
function _isPhone(str){
	var re =/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	return re.test(str);
}


//隐藏手机号中间4位****
function hidePhone(phone){
	return (phone.substring(0, 3) + "****" + phone.substring(7, 11));
}

/*
 * 正数判断
 */
function _isznumber(str){
	var re =/^\d+(?=\.{0,1}\d+$|$)/;
  	return re.test(str);
} 

/*
 * 正整数判断
 */
function _isNum(str){
  var re= /^\+?[1-9][0-9]*$/;　　//正整数
  return re.test(str);
}

// 是否是正浮点数
function _isDecimal(str) {
	var re = /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/;
	return re.test(str);
}


//更新下单平台方式  1惠管家APP 2信息查询机 3自助服务机 4室内分机 5商家端APP
function updateOrderMethod(order_sn ,  channel , order_method_id){
	_ajax(ajax_url+"Index/Pay/updateOrderMethod",{
		'order_sn':order_sn,'channel':channel , 'order_method_id':order_method_id
		},'post',function(ret){}
	);
}

//数据打点统计
function data_dot( event_id, uid, remark ) {
    var localUid = localStorage.getItem( 'uid' );
    uid = uid != 0 ? uid : ( localUid ? localUid : 0 );
    _ajax(ajax_url +"Index/Base/dataDot", {event_id:event_id, uid:uid, remark:remark},'post',function(ret){
    }, 'html');
}
