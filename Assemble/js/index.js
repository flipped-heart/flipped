
	function refresh()
	{
		statue = 0;
		success = 0;
		second = 0;
		init();
		clearInterval(interval);
		$("#button").removeClass("disabled");
		$("[data-id]").each(function()
		{
			$(this).addClass("disabled");
		});	
	}
	function start()
	{
		if(first ==0)
		{
			init();
			$("#reback").removeClass('disabled');
			first=1;
		}
		$("#button").addClass("disabled");
		if(statue == 0)
		{
			statue=1;
			img_num = 0;
			$("#time").text(0+'s');
			$("[data-id]").each(function()
			{
				$(this).removeClass("disabled");
			});	
			interval = setInterval(function () {
				second++;
				$("#time").text(second+'s');
				if(second < 1)
				{
					clearInterval(interval);
					if(0==success)
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
		var e=$("[data-id="+empty+"]");
		e.attr("data-type",0);
		url = "./img/"+empty+".jpg";
		e.find('img').attr('data-img',empty);
		e.find('img').attr('src',url);
		e.find('img').show();
		empty=Math.floor(Math.random()*16) + 1;
		var len=15;
		var val = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		for(var i=1;i<=16;i++)
		{
			e=$("[data-id="+i+"]");
			if(i == empty)
			{
				e.attr("data-type",1);
				e.find('img').attr('data-img',0);
				e.find('img').attr('src',"");
				e.find('img').hide();
			}
			else
			{
				var rand=Math.floor(Math.random()*len) + 1;
				var url = "./img/"+val[rand]+".jpg";
				e.attr("data-type",0);
				e.find('img').attr('data-img',val[rand])
				e.find('img').attr('src',url);
				val.splice(rand,1);
				len--;
			}
		}
	}
	function verify()
	{
		var t="";
		for(var i=1;i<=16;i++)
		{
			t+=$("[data-id="+i+"] img").attr("data-img");
		}
		if(t == value)
		{
			success=1;
			clearInterval(interval);
			if(perfect > second)
			{
				perfect = second;
				$("#rank").text("最高纪录："+perfect+'s');
			}
			var e=$("[data-id="+empty+"]");
			e.attr("data-type",0);
			e.find('img').attr('data-img',16);
			var url = "./img/"+empty+".jpg";
			e.find('img').attr('src',url);
			e.find('img').show();
			alert("success！用时:"+second+"s ,正在重新生成中...");
			var timer =setTimeout(function()
			{
				refresh();
				clearTimeout(timer);
			},1500);
		}
	}

	function reback()
	{
		refresh();
	}

	$(".slice").on("click",function () {
		if($(this).attr("data-type")==0)
		{
			var data_id=$(this).attr("data-id");
			var obj = $("[data-id="+data_id+"]").find('img');
			var emp = $("[data-id="+empty+"]").find('img');
			var res = data_id-empty;
			if(res == 1 || res == -1 || res == 4 || res == -4 )
			{
				$(this).attr("data-type",1);
				$("[data-id="+empty+"]").attr("data-type",0);
				switch (res)
				{
					case 1:
						obj.addClass('left');
						var timer = setTimeout(function(){
							obj.removeClass('left');	
							var url = obj.attr('src');
							var data_img =obj.attr("data-img");
							obj.attr("data-img",0);
							emp.attr("data-img",data_img);
							obj.hide();
							emp.show();
							emp.attr('src',url);
							empty=data_id;
							clearTimeout(timer);
							verify();
						},200);
						break;

					case -1:
						obj.addClass('right');
						var timer = setTimeout(function(){
							obj.removeClass('right');	
							var url = obj.attr('src');
							var data_img =obj.attr("data-img");
							obj.attr("data-img",0);
							emp.attr("data-img",data_img);
							obj.hide();
							emp.show();
							emp.attr('src',url);
							empty=data_id;
							clearTimeout(timer);
							verify();
						},200);
						break;

					case 4:
						obj.addClass('up');
						var timer = setTimeout(function(){
							obj.removeClass('up');	
							var url = obj.attr('src');
							var data_img =obj.attr("data-img");
							obj.attr("data-img",0);
							emp.attr("data-img",data_img);
							obj.hide();
							emp.show();
							emp.attr('src',url);
							empty=data_id;
							clearTimeout(timer);
							verify();
						},200);
						break;

					case -4:
						obj.addClass('down');
						var timer = setTimeout(function(){
							obj.removeClass('down');	
							var url = obj.attr('src');
							var data_img =obj.attr("data-img");
							obj.attr("data-img",0);
							emp.attr("data-img",data_img);
							obj.hide();
							emp.show();
							emp.attr('src',url);
							empty=data_id;
							clearTimeout(timer);
							verify();
						},200);
						break;
					
					default:
						break;
				}
			}
		}
	});
