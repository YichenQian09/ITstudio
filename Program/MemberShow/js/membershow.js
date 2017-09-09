//jQuery(".member-entrance-2").slide({mainCell:".member-entrance-page ul",autoPlay:true,delayTime:1000,effect:"leftLoop",interTime:5000});
$(function(){
	var memberthisYear;
	$(".member-entrance-2  .hd li:eq(0)").addClass("onhd");
	if(!!window.ActiveXObject || "ActiveXObject" in window)
	{
		console.log("ie");
		$(".pop-member-back").css({
			"filter":"Alpha(opacity=95)",
			"backgroundColor": "rgba(255,255,255,0.95)"
		});
	}
	//判断是否为IE，如果是IE，变化弹窗不透明度
	$(".pop-member").css({
		"width":$(window).width(),
		"height":$(window).height()
	});
	$(".pop-member-in").css({
		"top":"200px",
		"left":($(".container").width()-$(".pop-member-in").width())/2
	});
	//弹窗的位置
	$(".container").css({
			"height":$(window).height(),
			"width":"100%"
		});
	if($(window).width()/$(window).height()>=(1896/887))
	{
		$(".container").css({
			"backgroundSize":"100% auto"
		});
	}
	else{
		$(".container").css({
			"backgroundSize":"auto 100%"
		});
	}
	if($(window).width()>1010){
			$(".container").css({
			"height":$(window).height(),
			"width":"100%"
			});
			if($(window).width()/$(window).height()>=(1896/887))
			{
				$(".container").css({
					"backgroundSize":"100% auto"
				});
			}
			else{
				$(".container").css({
					"backgroundSize":"auto 100%"
				});
			}
		}
		else{
			$(".container").css({
				"width":1010,
				"height":$(window).height()
			});
		}
	if($(window).height()<590)
		{
			$(".container").css({
				"height":590,
				"backgroundSize":"auto 100%"
			});
			$(".pop-member-in").css({
				"top":"130px"
			});
		}
	//背景图的位置
	$(".next-page").css({
			"bottom":0,
			"left":($(".container").width()-$(".next-page-background").width())/2
		});
	//翻页按钮的位置
	$(".member-entrance-2  .hd").css({
		"left":$(".every-contain").width()*0.375-$(".member-entrance-2 .hd ul").width()*0.5
	});
	//16级左右翻页按钮的位置
	$(window).resize(function(){
		$(".pop-member").css({
			"width":$(window).width(),
			"height":$(window).height()
		});
		$(".pop-member-in").css({
			"left":($(".container").width()-$(".pop-member-in").width())/2
		});	
		if($(window).width()>1010){
			$(".container").css({
			"height":$(window).height(),
			"width":"100%"
			});
			if($(window).width()/$(window).height()>=(1896/887))
			{
				$(".container").css({
					"backgroundSize":"100% auto"
				});
			}
			else{
				$(".container").css({
					"backgroundSize":"auto 100%"
				});
			}
		}
		else{
			$(".container").css({
				"width":1010,
				"height":$(window).height()
			});
		}
		if($(window).height()<590)
		{
			$(".container").css({
				"height":590,
				"backgroundSize":"auto 100%"
			});
			$(".pop-member-in").css({
				"top":"130px"
			});
		}
		else{
			$(".pop-member-in").css({
				"top":"200px"
			});
		}

		$(".member-line").css({
			"left":($(window).width()-$(".member-line").width())/2
		});
		$(".next-page").css({
			"bottom":0,
			"left":($(".container").width()-$(".next-page-background").width())/2
		});
		$(".member-entrance-2 .hd").css({
		"left":$(".every-contain").width()*0.375-$(".member-entrance-2 .hd ul").width()*0.5
		});
	})
	//窗口大小改变时以上各处的位置
	$(".container").mouseenter(function(){
		$(".every-member-in div").fadeOut(200);
	})
	$(".member-contain").delegate(".every-member-in","mouseleave",function(e){
		if(!$(this).find("div").is(":animated")){
			$(this).find("div").stop(false,true).fadeOut(200);
		}
		e.stopPropagation();
	});
	$(".member-contain").delegate(".every-member-in","mouseenter",function(e){
		if(!$(this).find("div").is(":animated")){
			var showPhoto=$(this).find("div");
			$(".every-member-in").find("div").not(showPhoto).stop(false,true).fadeOut(200);
			$(this).find("div").stop(false,true).fadeIn(200);
		}
		e.stopPropagation();
	});
	//鼠标移入移出各个成员显示姓名和部门
	var usedyear=5;//上一次点击的成员年份
	var nowyear=5;//本次点击的成员年份（默认进入为2016年,2011为0，设置成5）
	var yearWaittime;
	getEveryyear();
	//获取16年的数据
	for(var loadi=0;loadi<5;loadi++)
	{
			$(".member-year:eq("+loadi+") .member-small-point").css({
							"width":10,
            				"height":10,
            				"top":0,
            				"left":0,
            				"backgroundColor":"#e94e1b"
			});
			$(".member-year-line:eq("+loadi+") div").css({
							"height":"30px"
			});

	}
	$(".member-year:eq("+5+") .member-small-point").css({
		"width":14,
        "height":14,
        "top":-2,
        "left":-2,
       	"backgroundColor":"#e94e1b"
	});
	$(".member-year:eq("+5+") .member-year-year").css({
		"fontSize":"18px",
	});
	$(".member-introduce-in").css({
		marginTop:-5*$(".member-introduce-photo").height()
	});
	//左边的时间轴显示16年
	$(".member-contain").delegate(".every-member-in","click",function(){
		var i =$(this).parents(".member-entrance").find(".every-member-in").index(this);
	    //获取现在点击的成员
	     $(".pop-member").css({
		 	"display":"block"
		 });
		 $(".navigation").css({
		 	"visibility":"hidden"
		 });
		 $(".navigation-box").css({
			"visibility":"hidden"
		 });
		 $(".container").addClass("container-blur");
		$.ajax({
		        type: "GET",
		        url: "Ajax/MemberHandler.ashx",
		        data: { MemberYear: nowyear + 2011 },
		        //发送给后台，请求第几页信息，每页信息多大
		        //dataType:"json",
		        async: true,
		        success: function (dat){
		        	var memberthisYear = JSON.parse(dat);
		        	console.log(nowyear);
		        	console.log(memberthisYear);
		        	/*for (var j = 0; j < memberthisYear.length; j++)
					{
		    			if($(this).find("h1").text()==memberthisYear[j].MemberName)
		    			{
		        			i = j;
		    			}
					}*/
					console.log(i);
					$(".pop-member-in>img").attr("src",memberthisYear[i].MemberImage);
					$(".member-detailed h1").text(memberthisYear[i].MemberName);
					$(".member-detailed>p").text(memberthisYear[i].MemberInstruction);
					$(".member-star p").text(memberthisYear[i].MemberConstellation);
					$(".member-major p").text(memberthisYear[i].MemberInterest);
					$(".member-hobby p").text(memberthisYear[i].MemberMajor);
		        }
		}) 
	})
	//显示弹窗，将后台数据添加在弹窗上
	$(".pop-member-back").click(function(){
		$(".pop-member").css({
			"display":"none"
		});
		$(".navigation").css({
			"visibility":"visible"
		});
		$(".navigation-box").css({
			"visibility":"visible"
		});
		$(".container").removeClass("container-blur");
	})
	//关闭弹窗
	var hasgetMember = new Array([6]);
	for (var k = 0; k < 6; k++)
	{
	    hasgetMember[k] = 0;
	}
	//避免重复请求数据
	$(".member-entrance-2  .hd li").click(function(){
		$(".every-member-in div").fadeOut(200);
		var nowpage=$(".member-entrance-2  .hd li").index(this);
		$(this).addClass("onhd");
		$(".member-entrance-2  .hd li").not(this).removeClass("onhd");
		$(".member-entrance-page").stop(false,true).animate({
			marginLeft:-nowpage*$(".every-contain").width()
		},300);
	})
	//切换16级各页之间的效果
	$(".member-year").click(function(){
		$(".every-member-in div").fadeOut(200);
		nowyear = $(".member-year").index(this);
			$(".member-introduce-in").stop(false,true).animate({
				marginTop:-nowyear*$(".member-introduce-photo").height()
			},700);
	//上面是上下切换不同年份成员的效果

		var changeyearTime=100;
		if(nowyear!=usedyear)
		{
			$(".member-year:eq("+usedyear+") .member-year-year").animate({
							fontSize:"14px",
			},changeyearTime);
			$(".member-year:eq("+usedyear+") .member-small-point").animate({
							width:10,
            				height:10,
            				top:0,
            				left:0
			},changeyearTime);
		}
		if(nowyear>usedyear)
		{
			var jy=0;
			var i;
			function biggeryear() {  
    			jy++;
    			if(jy<=nowyear){
        			if(nowyear==jy)
        			{
        				setTimeout(function(){
        				$(".member-year-line:eq("+(jy-1)+") div").animate({
							height:"30px"
						},changeyearTime);
						$(".member-year:eq("+(jy-1)+") .member-small-point").animate({
            					width:10,
            					height:10,
            					backgroundColor:"#e94e1b",
            					top:0,
            					left:0
            				},changeyearTime);
						$(".member-year:eq("+jy+") .member-small-point").animate({
								width:14,
            					height:14,
            					backgroundColor:"#e94e1b",
            					top:-2,
            					left:-2

						},changeyearTime);
						$(".member-year:eq("+jy+") .member-year-year").animate({
							fontSize:"18px",
						},changeyearTime);
            			biggeryear();  
        				},changeyearTime);
        			}
        			else
        			{
        				setTimeout(function(){ 
        					$(".member-year-line:eq("+(jy-1)+") div").animate({
								height:"30px"
							},changeyearTime);
            				$(".member-year:eq("+(jy-1)+") .member-small-point").animate({
            					width:10,
            					height:10,
            					backgroundColor:"#e94e1b",
            					top:0,
            					left:0
            				},changeyearTime);
            				biggeryear();  
        				},changeyearTime);
        			}	
    			}
			}  
			biggeryear();
			usedyear=nowyear;
		}
		else if(nowyear<usedyear){
			var iy=usedyear;
    		function smalleryear(){
    			iy--;
    			if(iy>=nowyear){
    				if(nowyear==iy)
        			{
        				setTimeout(function(){
        				$(".member-year-line:eq("+iy+") div").animate({
								height:0
							},changeyearTime);
            				$(".member-year:eq("+(iy+1)+") .member-small-point").animate({
            					width:6,
            					height:6,
            					backgroundColor:"white",
            					top:2,
            					left:2
            				},changeyearTime);	
						$(".member-year:eq("+iy+") .member-small-point").animate({
								width:14,
            					height:14,
            					backgroundColor:"#e94e1b",
            					top:-2,
            					left:-2

						},changeyearTime);
						$(".member-year:eq("+iy+") .member-year-year").animate({
							fontSize:"18px",
						},changeyearTime);
            			smalleryear();  
        				},changeyearTime);
        			}
        			else
        			{
        				setTimeout(function(){ 
        					$(".member-year-line:eq("+(iy)+") div").animate({
								height:0
							},changeyearTime);
            				$(".member-year:eq("+(iy+1)+") .member-small-point").animate({
            					width:6,
            					height:6,
            					backgroundColor:"white",
            					top:2,
            					left:2
            				},changeyearTime);
            				smalleryear();  
        				},changeyearTime);
        			}
    			}

    		}
    		smalleryear();
    		usedyear=nowyear;
		}



		if (hasgetMember[nowyear]== 0) {
		    getEveryyear();
		}
		//如果已经有该年的数据，不再重复添加
	})
	//时间轴按照顺序变化效果
	function getEveryyear(){
			$.ajax({
		        type: "GET",
		        url: "Ajax/MemberHandler.ashx",
		        data: { MemberYear: nowyear + 2011 },
		        //发送给后台，请求第几页信息，每页信息多大
		        //dataType:"json",
		        async: true,
		        success: function (dat) {
		            jsonObj = JSON.parse(dat);
		            var length = jsonObj.length;
		            var everyMembersize;
		            	var thispageContain=$(".member-entrance:eq("+nowyear+") .member-contain");
		            var k;
		            
		            //将json字符串解析
		            var memeberpageLength;
		            var remainLength=jsonObj.length;
		            for(k=0;k<thispageContain.length&&k<2;k++){
		            	if(jsonObj.length<=8)
		            	{
		            		length=jsonObj.length;
		            	}
		            	else
		            	{
		            		
		            		if(remainLength<=8)
		            		{
		            			length=remainLength;
		            		}
		            		else
		            		{
		            			length=8;
		            			remainLength=remainLength-8;
		            		}
		            	}
		            	var thisContain=thispageContain[k];
		            		if (length <= 2) {
		                		$(thisContain).css({
		                    		"width": "25%",
		                    		"height": "100%",
		                    		"marginLeft": "25%"
		                		});
		                		everyMembersize="100%";
		            		}
		            		else if (length <= 4) {
		                		$(thisContain).css({
		                    		"width": "50%",
		                    		"height": "100%",
		                    		"marginLeft":"12.5%"
		                		});
		                		everyMembersize = "50%";
		            		}
		            		else if (length <= 6) {
		                		$(thisContain).css({
		                    		"width": "75%",
		                    		"height": "100%",
		                    		"marginLeft": 0
		                		});
		                		everyMembersize = "33.3%";
		            		}
		            		else {
		                		$(thisContain).css({
		                    		"width": "100%",
		                    		"height": "100%",
		                    		"marginLeft": 0
		                		});
		                		everyMembersize = "25%";
		            		}
		            		//根据不同的json数据长度排版
		            	for (j = k*8; j < k*8+length; j++) {
		               		var everymember = $("<div>").addClass("every-member").css({ "width": everyMembersize }).appendTo(thispageContain[k]);
		                	var everymemberIn = $("<div>").addClass("every-member-in").appendTo(everymember);
		                	var memberPhoto = $("<img>").attr("src", jsonObj[j].MemberImage).appendTo(everymemberIn);
		                	var memberMessage = $("<div>").appendTo(everymemberIn);
		                	var memberName = $("<h1>").text(jsonObj[j].MemberName).appendTo(memberMessage);
		                	var memberDep = $("<p>").text(jsonObj[j].MemberDepartment).appendTo(memberMessage);
		            	}
		            }
		            hasgetMember[nowyear] = 1;
		        }
		    })
	}
	//获得每一年的数据
	var arrowChange=setInterval(arrowShow,2000);
	function arrowShow(){
		$(".next-page-arrow").animate({opacity:0},1000,function(){
			$(this).animate({opacity:1},1000);
		});
	}
	//跳页按钮浮动效果
	$('.container').bind('mousewheel', function(event, delta) {
    	if (delta<0&& $(".container").height()==$(window).height()) {
    window.location.href = "Introdution.aspx";
    	}
	});
	$(".next-page").click(function(){
		window.location.href="Introdution.aspx";
	})
	//滚动和点击跳页
})