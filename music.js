window.onload = function() {
	var audio = document.getElementById('audio');
	var progress = document.getElementById('progress');
	var playpause = document.getElementById("playpause");
	var volume = document.getElementById("volume");
	var canvas = document.getElementById('progress');
	var context = canvas.getContext('2d');
	var bg = document.getElementById("bg");
	var backward = document.getElementById("backward");
	var forward = document.getElementById("forward");
	var playlist = document.getElementById("playlist");
	var lis = playlist.getElementsByTagName("li");
	var len = lis.length;
	var onoff = true;

	audio.addEventListener('timeupdate', function() {
		updateProgress();
	}, false);
	
	
	
	//  声明默认播放的索引
	var currentIndex = 2;
	
	/*前进一首*/
	forward.onclick = function() {
		currentIndex++;
		audio.src = "";
		if(currentIndex >= len) {
			currentIndex = 0;
			audio.src = (currentIndex + 1) + ".mp3";
			lis[len - 1].className = "";
			lis[0].className = "active icon-heart";
		} else {
			audio.src = (currentIndex + 1) + ".mp3";
			lis[currentIndex - 1].className = "";
			lis[currentIndex].className = "active icon-heart";
		}
		playpause.innerHTML = '<i class="icon-pause"></i>';
		audio.play();
		resetPlayer();
		onoff = !onoff;
		/*随机背景*/
		function selectFrom(startNumber, endNumber) {
		    var choice = endNumber - startNumber + 1;
		    return Math.floor(Math.random() * choice + startNumber);
		}
		var bgNum = selectFrom(1,10);	
		bg.src = "bg" + bgNum + ".jpg";
		
	}
	
	/*后退一首*/
	backward.onclick = function() {
		currentIndex--;
		audio.src = "";
		if(currentIndex < 0) {
			currentIndex = len - 1;
			audio.src = currentIndex + 1 + ".mp3";
			lis[0].className = "";
			lis[currentIndex].className = "active icon-heart";
		} else {
			audio.src = (currentIndex + 1) + ".mp3";
			lis[currentIndex + 1].className = "";
			lis[currentIndex].className = "active icon-heart";
		}
		playpause.innerHTML = '<i class="icon-pause"></i>';
		audio.play();
		resetPlayer();
		onoff = !onoff;
		function selectFrom(startNumber, endNumber) {
		    var choice = endNumber - startNumber + 1;
		    return Math.floor(Math.random() * choice + startNumber);
		}
		var bgNum = selectFrom(1,10);	
		bg.src = "bg" + bgNum + ".jpg";		
	}
	
	/*播放列表点击切换*/
	for(var i = 0; i < len; i++) {
		lis[i].index = i;		
		lis[i].onclick = function() {
			for(var j = 0; j < len; j++) {
				lis[j].className = "";
				audio.src = "";
			}
			this.className = "active icon-heart";
			audio.src = (this.index + 1) + ".mp3";
			audio.play();
			playpause.innerHTML = '<i class="icon-pause"></i>';
		}
	}
	
	/* 暂停&播放 */	
	playpause.onclick = function togglePlayPause() {
		if(!onoff) {
			audio.pause();
			playpause.innerHTML = '<i class="icon-play"></i>';
		} else {
			audio.play();
			playpause.innerHTML = '<i class="icon-pause"></i>';
		}
		onoff = !onoff;
	}

	/* 设置音量 */	
	volume.onchange = function(){
		audio.volume = volume.value;
	}
	
	/* 更新进度*/
	function updateProgress() {
		var percent = Math.floor((100 / audio.duration) * audio.currentTime);
		progress.value = percent;
		var centerX = canvas.width / 2;
		var centerY = canvas.height / 2;
		var radius = 150;
		var circ = Math.PI * 2;
		var quart = Math.PI / 2;
		var cpercent = percent / 100;
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, ((circ) * cpercent), false);
		context.lineWidth = 10;
		context.strokeStyle = '#26C5CB';
		context.stroke();
		if(audio.ended) resetPlayer();
	}
	/*重置歌曲进度*/
	function resetPlayer() {
		audio.currentTime = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
		playpause.title = "Play";
		playpause.innerHTML = '<i class="icon-pause"></i>';
	}
}