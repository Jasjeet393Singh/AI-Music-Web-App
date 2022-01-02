zigzag = "";
hay = "";

zigzag_status = "";
hay_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
	zigzag = loadSound("zigzag.mp3");
	hay = loadSound("hay.mp3");
}

function setup() {
	canvas =  createCanvas(640, 480);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 640, 480);
	
	zigzag_status = zigzag.isPlaying();
	hay_status = hay.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			zigzag.stop();

		if(hay_status == false)
		{
			hay.play();
			document.getElementById("song").innerHTML = "Playing - 🎵H.A.Y🎵"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			hay.stop();

		if(zigzag_status == false)
		{
			zigzag.play();
			document.getElementById("song").innerHTML = "Playing - 🎵ZigZag🎵"
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
