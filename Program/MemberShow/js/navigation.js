		var userAgent = navigator.userAgent.toLowerCase(); 
		// Figure out what browser is being used
		jQuery.browser = { 
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
		safari: /webkit/.test( userAgent ), 
		opera: /opera/.test( userAgent ), 
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
		}; //通过正则去判断当前使用的哪种内核的浏览器
		$(function(){
			if($.browser.version != "7.0")//如果不是IE7就将导航栏收起时的left值设置成列表的宽度
			{
				

                    							$(".navigation-box").css({"left":parseInt($(".navigation").css("width"))})	

				$(window).resize(function(){
					timer = setTimeout(function () {
                    							$(".navigation-box").css({"left":parseInt($(".navigation").css("width"))})	
               								 },10);

					
				});
			}
			else {
				$(".navigation-box").css({"right":200});//如果是IE7就将导航栏收起时的right值设置成200
			}
				
			
			var flag=true;//判断导航栏是展开还是关闭
			if(flag=true){
				$(".navigation-box").hover(function(){//关闭效果下hower第二第四条线移动，鼠标移开回正
					$(".second-line").stop(true,true).animate({
						"margin-left":12,
						"margin-right":0
					},200);
					$(".forth-line").stop(true,true).animate({
						"margin-left":12,
						"margin-right":0
					},200)
				},function(){
					$(".second-line").stop(true,true).animate({
						"margin-left":0,
						"margin-right":12
					},200);
					$(".forth-line").stop(true,true).animate({
						"margin-left":0,
						"margin-right":12
					},200)
				});
			}
			$(".navigation-box").on("click",function(){//点击事件绑定
				if ($(".second-line").is(':animated')||$(".slide-left").is(':animated')||$('.first-line').is(':animated')) {
                    return;//如果任意一个动画执行中，则按钮不可点
                }
				if(flag==true)//导航栏关闭到展开
				{//第二第四条线移开，此函数的回调函数是第一第三两条线重合，此函数的回调函数是旋转，变成叉号
					$(".second-line").stop(true).animate({"right":-50},300,function(){
						$(".first-line").stop(true).animate({"top":10.5},1,function(){
							$('.first-line').stop(true).rotate({
								                angle: 0,
								                animateTo: 45,
								                easing: $(".easing").easeInOutExpo,
								                duration:400,
								                callback:function(){}
								            });
						})
						

					});
					
					$(".forth-line").stop(true).animate({"right":-50},300,function(){
						$(".third-line").stop(true).animate({"top":-7.5},1,function(){
								$('.third-line').stop(true).rotate({
								                angle: 0,
								                animateTo: -45,
								                easing: $(".easing").easeInOutExpo,
								                duration:400,
								                callback:function(){}

								            });
						})

					});
					
					$(".slide-left").stop(true).animate({"right":0},1000);
					flag=false;
				}
				else if(flag==false)//导航栏展开到关闭
				{//导航栏关闭到展开的逆过程
					$(".slide-left").stop(true).animate({"right":-100+"%"},1000);
					$('.first-line').stop(true).rotate({
								                angle: 45,
								                animateTo: 0,
								                easing: $(".easing").easeInOutExpo,
								                 callback: rotation1,
								                 duration:400
								                });
					$('.third-line').stop(true).rotate({
								                angle: -45,
								                animateTo: 0,
								                easing: $(".easing").easeInOutExpo,
								                 callback: rotation2,
								                 duration:400
								                });
					flag=true;
				}
			
			})
			$('.roll-li').hover(function(){
			$(this).animate({'top':-25},400);},function(){$(this).stop(true).animate({'top': 0}, 400); })//展开的导航栏的hover效果
		})
		function rotation1(){//叉号旋转过后的回调函数
	                	$(".first-line").stop(true).animate({"top":0},1,function(){$(".second-line").stop(true).animate({"right":0},300	)})};
    	function rotation2(){
    	$(".third-line").stop(true).animate({"top":0},1,function(){$(".forth-line").stop(true).animate({"right":0},300	)})};