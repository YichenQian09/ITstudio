
$(function (){
			var H=$(window).width()/2-10
			var i=0,time=1000;
			for(i=0;i<8;i++)
			{
				$('.ss-row').eq(i).find('div.ss-left')
								   .css({width:H }).animate({ left   : '0%'}, time)
            						.end()
								   .find('div.ss-right')
								   .css({width:H }).animate({ right   : '0%' }, time)
				if(i<=3)
					{
				   	time+=400;
				   }
				 else if(i>3&&i<=5)
				 {
				 	time+=200;
				 }
				  else if(i>5&&i<8)
				 {
				 	time+=100;
				 }
								   
			}		
	$(window).resize(function(){

			var H=$(window).width()/2-10

			$(".ss-left").css("width",H)	

			$(".ss-right").css("width",H)
			});	

});
