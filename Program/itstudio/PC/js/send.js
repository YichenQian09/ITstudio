var department=0;
$(function(){
	var H=$(window).height();
	if(H>700)
	{
		$("#theForm").css({"font-size":22});
		$("#theForm input").css({"font-size":18});
		$(".department").css({"font-size":18});
		$(".introduction").css({"font-size":18});

		 H=$(window).height();
	}
	else if(H<=700&&H>600)
	{
		$("#theForm").css({"font-size":18});
		$("#theForm input").css({"font-size":14});
		$(".department").css({"font-size":14});
		$(".introduction").css({"font-size":14});
		 H=$(window).height();

	}
	else if(H<=600&&H>500)
	{
		$("#theForm").css({"font-size":14});
		$("#theForm input").css({"font-size":12});
		$(".department").css({"font-size":12});
		$(".introduction").css({"font-size":12});
		 H=$(window).height();

	}
	else if(H<=500&&H>450)
	{
		$("#theForm").css({"font-size":12});
		$("#theForm input").css({"font-size":10});
		$(".department").css({"font-size":10});
		$(".introduction").css({"font-size":10});
		 H=$(window).height();

	}
	else if($(window).height()<=450)
	{
		$("#theForm").css({"font-size":10});
		$("#theForm input").css({"font-size":8});
		$(".department").css({"font-size":8});
		$(".introduction").css({"font-size":8});
		 H=450;
	}
	var W=0.65*H;
	$("html").css({"height":H})
	$(".container").css({"height":0.95*H,"margin-top":0.025*H,"width":W})
	$("#theForm").css({"height":0.95*H,"margin-top":0.025*H,"width":W})
	$("#theForm input").css({"margin-left":0.05*W,"padding-left":0.05*W,"padding-right":0.05*W,"width":0.8*W})
	$(".formHeader").css({"height":0.075*H,"width":W,"line-height":0.075*H+"px"})
	$(".name").css({"height":0.07*H,"margin-top":0.02*H})
	$(".grade").css({"height":0.07*H,"margin-top":0.02*H})
	$(".QQ").css({"height":0.07*H,"margin-top":0.02*H})
	$(".telephone").css({"height":0.07*H,"margin-top":0.02*H})
	$(".department").css({"height":0.07*H,"margin-top":0.02*H,"margin-left":0.05*W,"width":0.43*W,"line-height":0.07*H+"px"})
	$(".departmentRight").css({"height":0.07*H,"margin-top":0.02*H,"margin-left":0.05*W,"width":0.43*W})
	$(".introduction").css({"padding-left":0,"height":0.2*H,"width":0.8*W,"line-height":30+"px"})
	$(".introduction").parent().css({"height":0.2*H,"margin-top":0.02*H,"width":0.85*W,"line-height":30+"px","border-bottom": "1px solid #cccbc8","margin-left":0.05*W,"padding-left":0.045*W})
	$(".submit").css({"height":0.07*H,"margin-top":0.02*H,"width":0.9*W,"margin-left":0.05*W,"line-height":0.07*H+"px"})
	$(".logo").css({"width":0.4*W,"margin-left":-1.1*W,"height":0.12*W});


	$(window).resize(function(){
	var H=$(window).height();
	if(H>700)
	{
		$("#theForm").css({"font-size":22});
		$("#theForm input").css({"font-size":18});
		$(".department").css({"font-size":18});
		$(".introduction").css({"font-size":18});

		 H=$(window).height();
	}
	else if(H<=700&&H>600)
	{
		$("#theForm").css({"font-size":18});
		$("#theForm input").css({"font-size":14});
		$(".department").css({"font-size":14});
		$(".introduction").css({"font-size":14});
		 H=$(window).height();

	}
	else if(H<=600&&H>500)
	{
		$("#theForm").css({"font-size":14});
		$("#theForm input").css({"font-size":12});
		$(".department").css({"font-size":12});
		$(".introduction").css({"font-size":12});
		 H=$(window).height();

	}
	else if(H<=500&&H>450)
	{
		$("#theForm").css({"font-size":12});
		$("#theForm input").css({"font-size":10});
		$(".department").css({"font-size":10});
		$(".introduction").css({"font-size":10});
		 H=$(window).height();

	}
	else if($(window).height()<=450)
	{
		$("#theForm").css({"font-size":10});
		$("#theForm input").css({"font-size":8});
		$(".department").css({"font-size":8});
		$(".introduction").css({"font-size":8});
		 H=450;
	}
	var W=0.65*H;

	$("html").css({"height":H})
	$(".container").css({"height":0.95*H,"margin-top":0.025*H,"width":W})
	$("#theForm").css({"height":0.95*H,"margin-top":0.025*H,"width":W})
	$("#theForm input").css({"margin-left":0.05*W,"padding-left":0.05*W,"padding-right":0.05*W,"width":0.8*W})
	$(".formHeader").css({"height":0.075*H,"width":W,"line-height":0.075*H+"px"})
	$(".name").css({"height":0.07*H,"margin-top":0.02*H})
	$(".grade").css({"height":0.07*H,"margin-top":0.02*H})
	$(".QQ").css({"height":0.07*H,"margin-top":0.02*H})
	$(".telephone").css({"height":0.07*H,"margin-top":0.02*H})
	$(".department").css({"height":0.07*H,"margin-top":0.02*H,"margin-left":0.05*W,"width":0.43*W,"line-height":0.07*H+"px"})
	$(".departmentRight").css({"height":0.07*H,"margin-top":0.02*H,"margin-left":0.05*W,"width":0.43*W})
	$(".introduction").css({"padding-left":0,"height":0.2*H,"width":0.8*W,"line-height":30+"px"})
	$(".introduction").parent().css({"height":0.2*H,"margin-top":0.02*H,"width":0.85*W,"line-height":30+"px","border-bottom": "1px solid #cccbc8","margin-left":0.05*W,"padding-left":0.045*W})
	$(".submit").css({"height":0.07*H,"margin-top":0.02*H,"width":0.9*W,"margin-left":0.05*W,"line-height":0.07*H+"px"})
	$(".logo").css({"width":0.4*W,"margin-left":-1.1*W,"height":0.12*W});

	

	})
	var flag=[false,false,false,false,false,false];
	
$(".name").on({
	focus:function(){
		if(!flag[0]){
	    $(".name").val("")
	    $(".name").css({"border-bottom":" 1px solid #2a74a3","color":"#2a74a3"})
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
	    $(".name").css({"border-bottom":"1px solid #cccbc8"})
	}
})
$(".grade").on({
	focus:function(){
		if(!flag[1]){
		$(".grade").css({"border-bottom":" 1px solid #2a74a3","color":"#2a74a3"})
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
	   $(".grade").css({"border-bottom":"1px solid #cccbc8"})
	}
})
$(".QQ").on({
	focus:function(){
		if(!flag[2]){
	    $(".QQ").val("")
	    $(".QQ").css({"border-bottom":" 1px solid #2a74a3","color":"#2a74a3"})
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
	    $(".QQ").css({"border-bottom":"1px solid #cccbc8"})
	}
})
$(".telephone").on({
	focus:function(){
		if(!flag[4]){
	    $(".telephone").val("")
	    $(".telephone").css({"border-bottom":" 1px solid #2a74a3","color":"#2a74a3"})
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
	   $(".telephone").css({"border-bottom":"1px solid #cccbc8"})
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
		$(".font-end").css({"color": " #2a74a3","border-bottom":"1px solid  #2a74a3"})
		$(".VS").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".UI").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".APP").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
})
$(".VS").click(

	function(){
		department=2;
		flag[3]=true;
		$(".VS").css({"color": " #2a74a3","border-bottom":"1px solid  #2a74a3"})
		$(".font-end").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".UI").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".APP").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
})
$(".UI").click(
	function(){
		department=3;
		flag[3]=true;
		$(".UI").css({"color": " #2a74a3","border-bottom":"1px solid  #2a74a3"})
		$(".VS").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".font-end").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".APP").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
})
$(".APP").click(
	function(){
		department=4;
		flag[3]=true;
		$(".APP").css({"color": " #2a74a3","border-bottom":"1px solid  #2a74a3"})
		$(".VS").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".UI").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
		$(".font-end").css({"color": "#cccbc8","border-bottom":"1px solid #cccbc8"})
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