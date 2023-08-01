var doc = document,
	video = doc.getElementsByTagName('video')[0];

var totalTime, startTime, endTime, points, reversePlay;

(function($){
	
	$('.sections').fullpage({
		onLeave: onleave
	}); 
	
	video.addEventListener('loadedmetadata', videoLoaded);
	
	video.addEventListener('timeupdate', function() {
		console.log(Math.floor(this.currentTime));
		
		if (Math.floor(this.currentTime) == endTime){
			clearInterval(reversePlay);
			this.pause();
			console.log('Stopped');
	
			$.fn.fullpage.setAllowScrolling(true);
		}
	});
	
})(jQuery);



function videoLoaded(){
	totalTime = video.duration;
	points = [[0, 35], [35, 36], [36, 37], [37, totalTime]];
	
	startTime = points[0][0];
	endTime = points[0][1];
	video.play();
}

function onleave(n, idx, dir) {
	
	$.fn.fullpage.setAllowScrolling(false);
	
	if (dir == 'up') {
	
		startTime = points[idx-1][1];
		endTime = points[idx-1][0];
		
		reversePlay = setInterval(function(){
			video.currentTime += -.1;
		}, 40);

	} else {
	
		startTime = points[idx-1][0];
		endTime = points[idx-1][1];
	
		video.play();
		
	}
}