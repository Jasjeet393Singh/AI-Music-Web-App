song = "";

function setup() {
    canvas = createCanvas(640,480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 640, 480);
}

function preload() {
    song = loadSound("ZigZag.mp3","H.A.Y.mp3");
}

function play() {
    song.play();
}