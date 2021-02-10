/**
 *Simply Music
 * 功能实现
 */

// 设置body高度和宽度 
var body_height=window.innerHeight;
var body_width=window.innerWidth;
document.body.style.height=body_height*0.95+'px';
document.body.style.width=body_width+'px';
var rate =body_width/100; //  rate = vw/px

//获取元素
var mainbox=document.getElementById('mainbox');//主界面 
var bg_img=document.getElementById('bg_img');//背景图
var song=document.getElementById('song');//歌名
var singer=document.getElementById('singer');//歌手名
var CD_cover=document.getElementById('CD_cover');//专辑图
var song_name=['youdeshihou','guangnianzhiwai','moguizhongdetianshi'];
var song_names=['有的时候','光年之外','魔鬼中的天使'];
var singer_name=['王大毛','邓紫祺','田馥甄'];
var audio=document.getElementById('audio');//播放器
var circle=document.getElementById('circle');//中心
var show=document.getElementById('show'); //展示区
var current_time=document.getElementById('current_time');//当前时间
var end_time=document.getElementById('end_time');//总时间
var whole_bar=document.getElementById('whole_bar');//总进度条
var current_bar=document.getElementById('current_bar');//当前进度条
var dot=document.getElementById('dot');//进度条的点

//按钮
var search=document.getElementById('search'); //搜索
var reload_page = document.getElementById('reload');//刷新
var back_page=document.getElementById('back'); //菜单
var menu=document.getElementById('menu'); //菜单
var list=document.getElementById('list'); //列表
var append=document.getElementById('append'); //歌曲管理
var heart=document.getElementById('heart'); //收藏
var download=document.getElementById('download'); //分享
var add=document.getElementById('add'); //添加
var theme=document.getElementById('theme'); //主题
var mode=document.getElementById('mode');//随机、顺序、单曲循环
var pre=document.getElementById('pre');//上一首
var pause_play=document.getElementById('pause_play');//暂停、播放
var next=document.getElementById('next');//下一首
var sound=document.getElementById('sound');//音量
var whole_volume=document.getElementById('whole_volume');//总音量
var current_volume=document.getElementById('current_volume');//当前音量
var volume_dot=document.getElementById('volume_dot');//音量进度条的点

//按钮图标
var close_add_page = append.getElementsByTagName('img')[0];//添加页面关闭按钮
var close_list_page = list.getElementsByTagName('img')[0];//歌曲页面关闭按钮
var mode_img=mode.getElementsByTagName('img')[0];
var pause_play_img=pause_play.getElementsByTagName('img')[0];
var pre_img = pre.getElementsByTagName('img')[0];
var next_img = next.getElementsByTagName('img')[0];
var menu_img = menu.getElementsByTagName('img')[0];

//歌词页面
var lrc=document.getElementById('lrc');//歌词
var lrc_text=document.getElementById('lrc_text');//歌词区域
var lrc_tip=document.getElementById('tip');//加载信息
var lrc_line=0;//歌词当前行数
var lrc_preline=0;//歌词之前行数
var lrc_time=[];//记录当前歌曲歌词时间
var lrc_content=[];//记录当前歌曲歌词内容
var lrc_li=document.getElementsByTagName('li');
var Islrc=[false,false,false];
var IsSwitch_lrc=false;//是否切换歌词
var lrc_scrollHeight=0;//整个歌词实际的高度

//歌曲属性
var song_num=1;//歌曲号
var IsHeart=[false,false,false,false,false];//收藏标志
var song_mode=1; //播放模式
var IsSetVoice=true;//设置音量标志
var IsPause=true;//播放状态标志
var IsDrag=false;//是否拖拽进度条
var IsDragLrc=false;//是否拖拽歌词
var duration;//当前音乐时长
var percent_width,percent_time;//进度条偏移,歌曲播放时间偏移

//进度时间
var cache_time=1000;//资源缓冲时间800ms
var time1=end_time.getElementsByTagName('span')[0];
var time2=current_time.getElementsByTagName('span')[0];


//监听键盘按键
document.addEventListener("keydown",whichkey);
function whichkey(e)
{
	var event= e || window.event;
	var key=event.keyCode;
	switch(key)
	{
		case 32:
		{	
			img_scale(pause_play_img);
			if(IsPause)
			{
				audio.play();
				pause_play_img.src="icon/pause.png";
				CD_cover.style.animationPlayState='running';
				IsPause=false;
			}
			else
			{
				audio.pause();
				pause_play_img.src="icon/play.png";
				CD_cover.style.animationPlayState='paused';
				IsPause=true;
			}
			break;
		}

	}
	console.log('current key is:'+key);
}

setTimeout(judge_next,cache_time); //等待缓冲
//等待时间 判断是否有下一帧
function judge_next()
{
	if(audio.readyState>3)
	{
		duration=audio.duration;
		time1.innerHTML=toTime(duration);//总共时间
	}
}

//时间格式转换
function toTime(t)
{
	var minutes=parseInt(t/60,10); //min
	var seconds=parseInt(t%60,10); //seconds
	if(minutes < 10)
	{
		minutes='0'+minutes;
	}
	if(seconds < 10)
	{
		seconds='0'+seconds;
	}
	return minutes+ ":" +seconds;
}

//判断随机、顺序、单曲循环	
function judge_song_mode(i)
{
	if(song_mode==1)
	{
		if(i==1)
		{
			if(song_num>=song_name.length)
			{
				song_num=1;
			}
			else
			{
				song_num++;
			}
		}
		else
		{
			if(song_num==1)
			{
				song_num=song_name.length;
			}
			else
			{
				song_num--;
			}
		}
	}
	else if(song_mode==2)
	{
		var t=song_num;
		song_num=Math.floor(Math.random()*song_name.length);
		while(song_num==t || song_num==0)
		{
			song_num=Math.floor(Math.random()*10%(song_name.length))+1;
		}
	}
}

//图标缩放
function img_scale(ele)
{
	ele.classList.add('img_animation');
	setTimeout(function()
	{
		ele.classList.remove('img_animation');
	},500);
}

//返回
back_page.onclick=function()
{
	location.href='../index.html';
};

//刷新页面
reload_page.onclick=function()
{
	window.location.href="./index.html";
};

// 当切换时恢复状态
function refresh()
{
	//等待缓冲歌曲信息
	setTimeout(judge_next,cache_time);
	console.log('歌曲序号:'+song_num);
	console.log('当前歌曲：'+song_names[song_num-1]);
	console.log("总时间:"+duration);
	console.log("播放速率:="+audio.playbackRate);
	//CD区域归位
	CD_cover.classList.remove('CD_animation');
	setTimeout(function(){
	CD_cover.classList.add('CD_animation');
	},cache_time);
	CD_cover.style.animationPlayState='running';
	pause_play_img.src="icon/pause.png";
	//换歌
	audio.src='music/'+song_name[song_num-1]+'.mp3';
	audio.currentTime=0;
	//修改歌曲信息
	song.innerHTML=song_names[song_num-1];
	singer.innerHTML=singer_name[song_num-1];
	CD_cover.style.backgroundImage='url("img/'+song_name[song_num-1]+'.jpg")';
	bg_img.style.backgroundImage='url("img/'+song_name[song_num-1]+'.jpg")';
	//修改收藏
	if(IsHeart[song_num-1])
	{
		heart.src="icon/hearted.png";
	}
	else
	{
		heart.src="icon/heart.png";
	}
	IsPause=false;
	//歌词区域归位
	lrc_text.style.transform = 'translateY(0vw)';
	lrc_line=0;
	lrc_preline=0;
	//查找歌词
	if(IsSwitch_lrc)
	{
		switch_lrc();
	}
	audio.play();
}

//搜索歌曲
search.onclick=function()
{
	img_scale(search);
	var new_song=prompt("请输入要搜索的歌曲名：","");
	var res=null;
	var flag=false;
	for(var i=0;i<song_names.length && new_song!=null;i++)
	{
		if(new_song.match(song_names[i]))
		{
			res=new_song;
			song_num=i+1;
			break;
		}
	}
	if(res!=null)
	{
		flag=confirm("已找到歌曲："+res+"\n是否立即播放？");
	}
	else
	{
		flag=false;
		if(new_song!=null)
		{
			alert("未查找到歌曲，请检查歌曲名是否正确！");
		}	
	}
	if(flag)
	{
		refresh();
	}
};

//歌曲列表
var openlist=false;//歌曲列表标志
var parr=list.getElementsByTagName('p');
menu.onclick=function()
{
	img_scale(menu_img);
	if(song_num>0 && song_num<=song_name.length && !openlist)
	{
		var p=document.getElementById(song_num-1);
		list.style.display="block";
		for(var i=0;i<song_name.length;i++)
    	{
    		if(i != song_num-1)
    		{
    			parr[i].style.color="snow";
    		}
    	}
		p.style.color='red';
		openlist=true;	
	}
};

//关闭list
close_list_page.onclick=function()
{
	img_scale(close_list_page);
	if(openlist)
	{
		list.style.display="none";
		openlist=false;
	}
};

//列表选歌
list.onclick=function(e)
{
	var item = e.target;
	item.style.color='red';
	if(item.id>=0 && item.id<song_name.length)
	{
		song_num=parseInt(item.id)+1;

    	for(var i=0;i<song_name.length;i++)
    	{
    		if(i!=song_num-1)
    		{
    			parr[i].style.color="snow";
    		}
    	}
    	refresh();
	}
};

//收藏
heart.onclick=function()
{
	img_scale(heart);
	if(!IsHeart[song_num-1])
	{
		heart.src="icon/hearted.png";
		heart.classList.add('img_animation');
		IsHeart[song_num-1]=true;
	}
	else
	{
		heart.classList.remove('img_animation');
		heart.src="icon/heart.png";
		IsHeart[song_num-1]=false;
	}
};

//添加歌曲
var Isadd = false;
add.onclick=function()
{
	img_scale(add);
	if(!Isadd)
	{
		Isadd = true;
		append.style.display="block";
	}
};
close_add_page.onclick=function()
{
	img_scale(close_add_page);
	if(Isadd)
	{
		Isadd=false;
		append.style.display='none';
	}

};

//分享	
download.onclick=function()
{
	img_scale(download);
	location.href="music/"+song_name[song_num-1]+".mp3";
};

//顺序、随机、单曲:1 2 3
mode.onclick=function()
{
	img_scale(mode_img);
	if(song_mode==1)
	{
		mode_img.src="icon/random.png";
		alert("随机播放模式！");
		song_mode=2;
	}
	else if(song_mode==2)
	{
		mode_img.src="icon/song.png";
		alert("单曲循环播放模式！");
		song_mode=3;
	}
	else
	{
		mode_img.src="icon/songs.png";
		alert("顺序播放模式！");
		song_mode=1;
	}
};

// 调节音量
audio.volume=0.75;//设定初值
current_volume.style.width=75+"%";
volume_dot.style.marginLeft=57.5+'vw';
whole_volume.onclick=function(e)
{
	setTimeout(function()
	{
		volume_dot.classList.add('dot_animation');
	},10);
	var event=e||window.event;
	var width=whole_volume.clientWidth;
	var offset=event.clientX-whole_volume.offsetLeft;//浏览器偏移X-父级偏移X
	percent_width=offset/width;
	percent_width=Math.min(1,percent_width);
	percent_width=Math.max(0,percent_width);
	current_volume.style.width=100*percent_width+"%";
	audio.volume=percent_width;
	volume_dot.style.marginLeft=(percent_width*78)+'vw';
	volume_dot.classList.remove('dot_animation');
};

//上一首
pre.onclick=function()
{
	judge_song_mode(-1);
	img_scale(pre_img);
	refresh();
};

//下一首
next.onclick=function()
{
	judge_song_mode(1);
	img_scale(next_img);
	refresh();
};

//播放、暂停
pause_play.onclick=function()
{
	img_scale(pause_play_img);
	if(IsPause)
	{
		pause_play_img.src="icon/pause.png";
		CD_cover.style.animationPlayState='running';
		audio.play();
		IsPause=false;
	}
	else
	{
		pause_play_img.src="icon/play.png";
		CD_cover.style.animationPlayState='paused';
		audio.pause();
		IsPause=true;
	}
};

//字符串00：00.00转变时间seconds
function toTime2(s)	
{
	var min=parseInt(s[0].substr(0,2),10);
	var sec=parseInt(s[0].substr(3,2),10);
	var ms=parseInt(s[0].substr(6,2),10);
	var time=min*60+sec+ms/100;
	return time;
}

//切换歌词页面
function switch_lrc()
{
	IsSwitch_lrc=true;
	lrc_tip.innerHTML="歌词正在加载中...";
	lrc.style.display='block';
	CD.style.display='none';
	circle.style.display='none';
	simply_music.style.display="none";
	
	var pattern_time=/[0-9]{2}[:][0-9]{2}[.][0-9]{2}/;//匹配时间
	var url="get_lrc.php";
	var data={'song_name':song_name[song_num-1]};
	var callback_function=function(result)
	{
		if(result.status==1)
		{
			Islrc[song_num]=true;
			lrc_tip.innerHTML=null;
			lrc_text.innerHTML=null;
			var text=result.lrc;
			for(var i=0;i<text.length;i++)
			{
				var res_time=pattern_time.exec(text[i]);//返回结果为数组
				var index=res_time[0].length+2;
				if(i==0)//消除第一行多出'['的问题
				{
					index++;
				}
				var res_content=text[i].substr(index);
				lrc_time[i]=toTime2(res_time)-1;
				lrc_content[i]=res_content;
				lrc_text.innerHTML+='<li>'+res_content+'</li>';
			}
			lrc_time.push(duration+1);//防止最后一句歌词无法显示
			lrc_scrollHeight=lrc_text.scrollHeight-40*rate;//获取歌词高度-40vw*rate	
			console.log('lrc_scrollHeight='+lrc_scrollHeight);
			var currentTime=audio.currentTime;
			//当前歌词标记
			for(var i=lrc_line;i<lrc_time.length-1;i++)
			{
				//当前正在播放歌词行
				if(currentTime<lrc_time[i+1] && currentTime>=lrc_time[i])
				{
					lrc_preline=lrc_line;
					lrc_line=i;
					if(lrc_line>0)
					{
						lrc_li[lrc_preline].style.color="white";
					}
					lrc_li[lrc_line].style.color="red";
					break;
				}
			}
		}
		else
		{
			Islrc[song_num]=false;
			lrc_tip.innerHTML="歌词加载失败！<a href='#'onclick='switch_lrc();'>重试</a>";
			lrc_text.innerHTML=null;
		}
	}
	$.get(url,data,callback_function,"json");
}

CD.onclick=switch_lrc;
//切换CD
lrc_text.onclick=function()
{
	IsSwitch_lrc=false;
	lrc.style.display='none';
	CD.style.display='block';
	circle.style.display='block';
	simply_music.style.display='block';
};

//绑定监听事件时间更新进度条
audio.addEventListener('timeupdate',function()
{
	// console.log('audio.buffered.length='+audio.buffered.length);
	// console.log('audio.buffered.start(0)='+audio.buffered.start(0));
	// console.log('audio.buffered.end(0)='+audio.buffered.end(0));

	var currentTime=audio.currentTime;
	percent_time=currentTime/duration;//计算时间比
	if(!IsDrag)//防止拖拉出现混乱
	{
		current_bar.style.width=percent_time*60+'vw';
		time2.innerHTML=toTime(percent_time*duration);
		dot.style.marginLeft=(percent_time*60)+'vw';
		//同步歌词
		if(Islrc[song_num] && !IsDragLrc)//是否拖拉歌词
		{
			for(var i=lrc_line;i<lrc_time.length-1;i++)
			{
				//当前正在播放歌词行
				if(currentTime<lrc_time[i+1] && currentTime>=lrc_time[i])
				{
					lrc_preline=lrc_line;
					lrc_line=i;
					var lrc_position= Math.floor(lrc_line*rate*7);//换算成px 1vw~10.7px
					var current_position=Math.ceil(lrc_text.scrollTop);//初值
					var offset=lrc_position-current_position;
					//修改进度
					if(lrc_position<lrc_scrollHeight)
					{
						current_position=current_position+offset;
						lrc_text.scrollTop=Math.ceil(current_position);

						if(lrc_position+45*rate>=lrc_scrollHeight && (lrc_time.length-lrc_line)<=7)  //剩余偏移(85-40)*10.7 px
						{
							lrc_text.style.transform = 'translateY('+(lrc_time.length-lrc_line-8)*7+'vw)';
						}
						//console.log('lrc_text.scrollTop='+lrc_text.scrollTop+"  lrc_line="+lrc_line);
					}					
					//修改当前播放歌词
					if(lrc_line>0)
					{
						lrc_li[lrc_preline].style.color="white";
					}
					if(lrc_line<=lrc_li.length)
					{
						lrc_li[lrc_line].style.color="red";
					}
					break;
				}
			}
		}
	}
});

//拖拉歌词
var function_lrcdrag=function()
{
	console.log('lrc.scrollTop='+lrc_text.scrollTop);
};

var start_height=0; 
var timer_temp=null;
lrc_text.addEventListener('touchstart',function(e)
{
	IsDragLrc=true;
	start_height=e.touches[0].clientY;
	console.log("start_height="+start_height);
	lrc_text.addEventListener('touchmove',function_lrcdrag,{passive:true});
},{passive:true});
lrc_text.addEventListener('touchend',function()
{
	timer_temp=setTimeout(function()
	{
		lrc_text.removeEventListener('touchmove', function_lrcdrag);
		IsDragLrc=false;
		clearInterval(timer_temp);
	},1000);
},{passive:true});

//移动端拖拉进度条
var function_ontouchmove=function(e)
{
	var event = e.touches[0]; //touches位于屏幕上的所有手指的列表
	var width=whole_bar.clientWidth;
	var offset=Math.min(event.clientX-whole_bar.offsetLeft,width);
	percent_width=Math.min(offset/width,1);
	percent_width=Math.max(percent_width,0);
	time2.innerHTML=toTime(percent_width*duration);
	if(percent_width==1)
	{
		drag_full=true;
		percent_width=0.99;//防止暂停状态拖拉切歌
	}
	current_bar.style.width=100*percent_width +'%';
	dot.style.marginLeft=(percent_width*60)+'vw';
};

//将事件处理程序标记为“被动”以使页面更具响应性
dot.addEventListener('touchstart',function()
{
	IsDrag=true;
	dot.style.transform='scale(1.5,1.5)';
	document.ontouchmove=function_ontouchmove;//绑定拖拉事件
},{passive:true});
dot.addEventListener('touchend',function()
{
	dot.style.transform='scale(1.0,1.0)';
	document.ontouchmove=null;//移除拖拉事件
	console.log("currentTime="+audio.currentTime);
	audio.currentTime=percent_width*duration;
	IsDrag=false;
},{passive:true});

//点击进度条
whole_bar.onclick=function(e)
{
	setTimeout(function()
	{
		dot.classList.add('dot_animation');
	},10);
	var event=e || window.event;//兼容性IE
	var width=whole_bar.clientWidth;
	var offset=event.clientX-whole_bar.offsetLeft;//浏览器偏移X-父级偏移X
	percent_width=offset/width;
	current_bar.style.width=percent_width*100 +'%';
	time2.innerHTML=toTime(percent_width*duration);
	audio.currentTime=percent_width*duration;
	dot.style.marginLeft=(percent_width*60)+'vw';
	dot.classList.remove('dot_animation');

	//同步歌词
	var currentTime=audio.currentTime;
	console.log('*****currentTime='+currentTime+" lrc_line="+lrc_line);
	if(Islrc[song_num])
	{
		for(var i=0;i<lrc_time.length-1;i++)
		{
			//当前正在播放歌词行
			if(currentTime<lrc_time[i+1] && currentTime>=lrc_time[i])
			{
				lrc_preline=lrc_line;
				lrc_line=i;
				lrc_li[lrc_preline].style.color="white";
				lrc_li[lrc_line].style.color="red";
				break;
			}
		}
	}

};

//当前歌曲结束
audio.addEventListener('ended',function()
{	
	//修改列表颜色
	var p=document.getElementById(song_num-1);
	p.style.color='snow';
	judge_song_mode(1);
	var p=document.getElementById(song_num-1);
	p.style.color='red';
	refresh();
});


