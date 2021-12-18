zigzag = "";
h.a.y = "";

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
    song = loadSound("zigzag.mp3","h.a.y.mp3");
}

function play() {
    song.play();
}