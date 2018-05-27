$(document).ready(function(){
	$(".container-404")
	.css({"height":$(window).height()});
	/*使容器的高等于可视窗口的高*/
	$(".real-robot")
	.css({
		"bottom":$(".real-spring").height()+1
	});
	/*使机器人始终在弹簧上方*/
	var onceTime=16;
	//var robotjump=setInterval(jumpDown,1400);
	jumpDown();
	function jumpDown(){
		if($(".real-spring").height()>33){
			$(".real-spring").animate({"height":$(".real-spring").height()-2},Math.abs($(".real-spring").height()-67)/2+4,jumpDown);
			$(".real-robot").animate({"bottom":$(".real-spring").height()-1},Math.abs($(".real-spring").height()-67)/2+4);
		}
		else{
			jumpUp();
		}	
	}
	//往下跳 离平衡位置越近，速度越快
	function jumpUp(){
		if($(".real-spring").height()<101){
			$(".real-spring").animate({"height":$(".real-spring").height()+2},Math.abs($(".real-spring").height()-67)/2+4,jumpUp);
			$(".real-robot").animate({"bottom":$(".real-spring").height()+3},Math.abs($(".real-spring").height()-67)/2+4);
		}
		else jumpDown();
	}
	/*var down=1;
	var jumpTime=30;
	UpandDown();
	function UpandDown(){
		var distance=Math.abs($(".real-spring").height()-67);
		var speed=Math.ceil((34-distance)/5)+2;
		console.log(speed);
		console.log($(".real-spring").height());
		if($(".real-spring").height()>=101)
			down=1;
		else if($(".real-spring").height()<=33)
			down=0;
		if(down){
			$(".real-spring").animate({"height":$(".real-spring").height()-speed},jumpTime,UpandDown);
			$(".real-robot").animate({"bottom":$(".real-spring").height()-speed+1},jumpTime);
		}
		else
		{
			$(".real-spring").animate({"height":$(".real-spring").height()+speed},jumpTime,UpandDown);
			$(".real-robot").animate({"bottom":$(".real-spring").height()+speed+1},jumpTime);
		}
	}*/
})
$(document).ready(function(){
	$(".main-404")
	.css({
		"left":($(".container-404").width()-$(".main-404").width())/2
	});
	//使404居中
	$(window).resize(function(){
		$(".container-404")
		.css({"height":$(window).height()});
		$(".main-404")
		.css({
			"left":($(".container-404").width()-$(".main-404").width())/2
		});

	})
	/*可视窗口大小变化时改变*/
})