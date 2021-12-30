zigzag = "";
hay = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup() {
    canvas = createCanvas(640,480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    image(video, 0, 0, 640, 480);
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
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = " + leftWristY);
        zigzag.play();
    }

    if (rightWristresults.length > 0) {
        console.log(rightWristresults)
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY = " + rightWristY);
        hay.play();
    }

    if (error) {
        console.error();
    }
}