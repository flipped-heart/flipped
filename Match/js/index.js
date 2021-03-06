
	function refresh()
	{
		statue = 0;
		score = 0;
		img_num = 0;
		init();
		$("#button").removeClass("disabled");
		$("[data-id]").each(function()
		{
			$(this).find(".front").hide();
			$(this).find(".back").show();
			$(this).addClass("disabled");
		});	
	}
	function start()
	{
		$("#button").addClass("disabled");
		if(statue == 0)
		{
			statue=1;
			$("#time").text(30+'s');
			second = 30;
			$("[data-id]").each(function()
			{
				$(this).removeClass("disabled");
			});	
			interval = setInterval(function () {
				second--;
				$("#time").text(second+'s');
				if(second < 1)
				{
					clearInterval(interval);
					if(score<8)
					{
						alert("Game Over!");
						refresh();
					}
				}	
			},1000);
			
		}
	}

	function init() 
	{
		var value=[0,1,3,2,2,7,1,4,5,3,5,8,7,6,4,8,6];
		var len=16;
		for(var i=1;i<=16;i++)
		{
			var e=$("[data-id="+i+"]").find(".front");
			var rand=Math.floor(Math.random()*len) + 1;
			var url = "./img/"+value[rand]+".jpg";
			e.attr("src",url); 	
			e.attr("value",value[rand]);
			value.splice(rand,1);
			len--;
		}
	}
	

	$(".flip").on("click",function () {
		if($(this).attr("data-type")==0)
		{
			$(this).attr("data-type",1);
			var data_id=$(this).attr("data-id");
			var obj = $("[data-id="+data_id+"]");
			obj.addClass("flipped");
			var timer=setTimeout(function() {
				obj.find(".back").hide();
				obj.find(".front").show();
				obj.removeClass("flipped");
				var delay = setTimeout(function()
				{
					if(img_num == 1) //匹配
					{
						var first=$("[data-type=1]").find(".front").first().attr("value");
						var last=$("[data-type=1]").find(".front").last().attr("value");
						if(first!=last)
						{
							$("[data-type=1]").each(function()
							{
								$(this).addClass("flipped");
								$(this).find(".front").hide();
								$(this).find(".back").show();
								$(this).removeClass("flipped");
								$(this).attr("data-type",0);
							});	
						}
						else
						{
							$("[data-type=1]").each(function()
							{
								$(this).addClass("disabled");
								$(this).attr("data-type",0);
							});	
							score++;
						}	
						img_num=0;
						if(score == 8)
						{
							clearInterval(interval);
							var t = 30 - second;
							if(perfect>t)
							{
								perfect=t;
							}
							alert("Perfect!用时"+t+"s,正在重新生成...");
							$("#rank").text("最高纪录："+perfect+'s');
							var tim = setTimeout(function(){
								refresh();
								clearTimeout(tim);
							},1500);
						}
					}
					else
					{
						img_num++;
					}
					clearTimeout(delay);
				},100);
				clearTimeout(timer);
			},100);
		}
	});
