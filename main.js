zigzag = "";
hay = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
loadSound = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup() {
    canvas = createCanvas(640,480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload() {
    zigzag = loadSound("zigzag.mp3");
    hay = loadSound("h.a.y.mp3");
}

function modelLoaded() {
    console.log("Posenet is Initialized!");
}

function gotPoses(leftWristresults, rightWristresults,error) {
    if (leftWristresults.length > 0) {
        console.log(leftWristresults);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }

    if (rightWristresults.length > 0) {
        console.log(rightWristresults);
        scoreRightWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }

    if (error) {
        console.error();
    }
}

function play() {
    zigzag.play();
    zigzag.setVolume(1);
    zigzag.rate(1);
    hay.play();
    hay.setVolume(1);
    hay.rate(1);
}

function draw() {
    image(video, 0, 0, 640, 480);
    fill('#FF0000');
    stroke('#FF0000');

    zigzag.isPlaying();
    hay.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        hay.stop();
    }

    if (zigzag.isPlaying() = false) {
        zigzag.play();
        document.getElementById("song_name").innerHTML = "ZigZag"
    }

    if (scoreRightWrist > 0.2) {
        circle(RightWristX,RightWristY,20);
        zigzag.stop();
    }
    
    if (hay.isPlaying() = false) {
        hay.play();
        document.getElementById("song_name").innerHTML = "H.A.Y"
    }
}
