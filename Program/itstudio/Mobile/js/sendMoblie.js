var department=0;
!(function(doc, win) {
            var docEle = doc.documentElement,//获取html元素
                event = "onorientationchange" in window ? "orientationchange" : "resize",//判断是屏幕旋转还是resize;
                fn = function() {
                    var width = docEle.clientWidth;
                    width && (docEle.style.fontSize = 100  * (width / 750) + "px");//设置html的fontSize，随着event的改变而改变。
                    	
                };
            
            win.addEventListener(event, fn, false);
            doc.addEventListener("DOMContentLoaded", fn, false);
        
        }(document, window));
$(function(){
	var flag=[false,false,false,false,false,false];

	

$(".name").on({
	focus:function(){
		if(!flag[0]){
	    $(".name").val("")
	    $(".name").css({"border-bottom":" 0.02rem solid #2a74a3","color":"#2a74a3"})
		}
	},
	blur:function(){
	   reg=/^[\u4e00-\u9fa5]{2,10}$/;
	   if(!reg.test($(".name").val())){
	    $(".name").val("请输入正确的姓名");
	    $(".name").css({"color":"#e81a33"})
	    flag[0]=false;
	   }
	   else{
	   	flag[0]=true;
	   }
	    $(".name").css({"border-bottom":"0.02rem solid #cccbc8"})
	}
})
$(".grade").on({
	focus:function(){
		if(!flag[1]){
		$(".grade").css({"border-bottom":" 0.02rem solid #2a74a3","color":"#2a74a3"})
	    $(".grade").val("")
		}
	},
	blur:function(){
	   reg=/^201[4567][\u4e00-\u9fa5]{2,15}$/;
	   if(!reg.test($(".grade").val())){
	    $(".grade").val("请输入正确的年级/专业（例：2017药学）");
	    $(".grade").css({"color":"#e81a33"})
	    flag[1]=false;
	   }
	   else{
	   	flag[1]=true;
	   }
	   $(".grade").css({"border-bottom":"0.02rem solid #cccbc8"})
	}
})
$(".QQ").on({
	focus:function(){
		if(!flag[2]){
	    $(".QQ").val("")
	    $(".QQ").css({"border-bottom":" 0.02rem solid #2a74a3","color":"#2a74a3"})
		}
	},
	blur:function(){
	   reg=/^[1-9][0-9]{4,10}$/;
	   if(!reg.test($(".QQ").val())){
	    $(".QQ").val("请输入正确的QQ号码");
	    $(".QQ").css({"color":"#e81a33"})
	    flag[2]=false;
	   }
	   else{
	   	flag[2]=true;
	   }
	    $(".QQ").css({"border-bottom":"0.02rem solid #cccbc8"})
	}
})
$(".telephone").on({
	focus:function(){
		if(!flag[4]){
	    $(".telephone").val("")
	    $(".telephone").css({"border-bottom":" 0.02rem solid #2a74a3","color":"#2a74a3"})
		}
	},
	blur:function(){
	   reg=/^1[34578]\d{9}$/;
	   if(!reg.test($(".telephone").val())){
	    $(".telephone").val("请输入正确的手机号码");
	    $(".telephone").css({"color":"#e81a33"})
	    flag[4]=false;
	   }
	   else{
	   	flag[4]=true;
	   }
	   $(".telephone").css({"border-bottom":"0.02rem solid #cccbc8"})
	}
})
$(".introduction").on({
	focus:function(){
		if(!flag[5]&&$(".introduction").val()=="个人简介(200字以内)"){
	    $(".introduction").val("")
	    $(".introduction").css({"color":"#2a74a3"})
	    $(".introduction").parent().css({"border-bottom":" 1px solid #2a74a3"})
	    flag[5]=true;
	}
	}
	
})
$(".font-end").click(
	
	function(){
		department=1;
		flag[3]=true;
		$(".font-end").css({"color": " #2a74a3","border-bottom":"0.02rem solid  #2a74a3"})
		$(".VS").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".UI").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".APP").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
})
$(".VS").click(

	function(){
		department=2;
		flag[3]=true;
		$(".VS").css({"color": " #2a74a3","border-bottom":"0.02rem solid  #2a74a3"})
		$(".font-end").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".UI").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".APP").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
})
$(".UI").click(
	function(){
		department=3;
		flag[3]=true;
		$(".UI").css({"color": " #2a74a3","border-bottom":"0.02rem solid  #2a74a3"})
		$(".VS").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".font-end").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".APP").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
})
$(".APP").click(
	function(){
		department=4;
		flag[3]=true;
		$(".APP").css({"color": " #2a74a3","border-bottom":"0.02rem solid  #2a74a3"})
		$(".VS").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".UI").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
		$(".font-end").css({"color": "#cccbc8","border-bottom":"0.02rem solid #cccbc8"})
})
function htmlEncodeJQ ( str ) {  
    return $('<span/>').text( str ).html();  
}  

	$(".submit").click(function(){
	if(flag[0]==true&&flag[1]==true&&flag[2]==true&&flag[3]==true&&flag[4]==true&&flag[5]==true&&$(".introduction").val().length<=200&&$(".introduction").val().length>0)
	{
		$(".hide").attr("value",department)
	}

	else{
		if($(".introduction").val().length>200)
		{
			alert("输入超限");

		}
		else{
			alert("信息填写不完全");
		}

		
	}
	});
	$("form").submit(function () {
	   if (flag[0] == true && flag[1] == true && flag[2] == true && flag[3] == true && flag[4] == true &&flag[5]==true&&$(".introduction").val().length<=200&&$(".introduction").val().length>0) {
	    	$(".introduction").val(htmlEncodeJQ($(".introduction").val()))
	        // $(".name").val("姓名").css({ "color": "#cccbc8" });
	        // $(".grade").val("年级/专业（例：2017药学）").css({ "color": "#cccbc8" });
	        // $(".QQ").val("QQ").css({ "color": "#cccbc8" });
	        // $(".telephone").val("电话").css({ "color": "#cccbc8" });
	        // $(".department").css({ "color": "#cccbc8", "border-bottom": "0.02rem solid #cccbc8" })
	        // $(".introduction").val("个人简介").css({ "color": "#cccbc8" });
	        return true;
	    }
	    else {
	    	if($(".introduction").val().length>200)
			{
				var a=$(".introduction").val().substr(0,199);
	   			$(".introduction").val(a);

			}

	        return false;
	    }
	});
});