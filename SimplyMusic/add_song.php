<?php
	if(isset($_POST['song']) && isset($_POST['singer']) && $_FILES['image']['size']>0 && $_FILES['address']['size']>0 && $_FILES['lrc']['size']>0)
	{
		$song = $_POST['song'];
		$singer =$_POST['singer'];
		$image =$_FILES['image'];
		$address =$_FILES['address'];
		$lrc =$_FILES['lrc'];


		move_uploaded_file($image['tmp_name'], 'C:/phpstudy_pro/WWW/SimplyMusic/img/'.$image['name']);
		move_uploaded_file($address['tmp_name'], 'C:/phpstudy_pro/WWW/SimplyMusic/music/'.$address['name']);
		move_uploaded_file($lrc['tmp_name'], 'C:/phpstudy_pro/WWW/SimplyMusic/lrc/'.$lrc['name']);
		exit("<script type='text/javascript'>
			alert('添加完成!');
			location.href='index.html';
		</script>");

	}	
	exit("<script type='text/javascript'>
			alert('添加失败!');
			location.href='index.html';
		</script>");

?>