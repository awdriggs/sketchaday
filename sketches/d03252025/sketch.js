// Set the video capture as a global variable.
let capture;
let composite;
let buffer = [];
let numFrames = 1;

let hueSum = [], satSum = [], briSum = []

function setup() {
  describe('Video capture from the device webcam.');
  createCanvas(720, 400);
  imgWidth = width/2
  let imgHeight = height;
  // Use the createCapture() function to access the device's
  // camera and start capturing video.
  capture = createCapture(VIDEO);

  capture.size(imgWidth, 400); //for side by side

  composite = createImage(imgWidth, 400);

  // colorMode(HSB, 360, 100, 100);

  for(let i = 0; i < imgWidth * imgHeight; i++){
    hueSum[i] = createVector(0, 0);
    satSum[i] = 0;
    briSum[i] = 0;
  }

  // Use capture.hide() to remove the p5.Element object made
  // using createCapture(). The video will instead be rendered as
  // an image in draw().
  capture.hide();
}

function draw() {
  background(255);

  composite.loadPixels();
  capture.loadPixels();

  avgPixels();

  composite.updatePixels();
  image(composite, 360, 0, 360, 400);

  // Draw the resulting video capture on the canvas
  // with the invert filter applied.
  image(capture, 0, 0, 360, 400);

  // filter(INVERT);
}

function keyPressed(){
  if(key == "p"){
    saveCanvas('thumb', "jpg");
  }

}

function avgPixels(){
  for(let i = 0; i < composite.pixels.length; i += 4 ){
    let pxIndex = i / 4; // which pixel are you at?
    // get the color
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];


    colorMode(RGB);
    let c = color(r,g,b)

    colorMode(HSB); // Switch to HSB mode

    let h = hue(c);
    let s = saturation(c);
    let br = brightness(c);

    // Convert hue to radians on a unit circle for proper averaging
    let hueRadians = radians(h);
    if (frameCount === 1) {
      hueSum[pxIndex] = createVector(cos(hueRadians), sin(hueRadians));
    } else {
      hueSum[pxIndex].x += cos(hueRadians);
      hueSum[pxIndex].y += sin(hueRadians);
    }

    satSum[pxIndex] += s;
    briSum[pxIndex] += br;

    // Average hue using atan2 to wrap correctly
    let avgHue = degrees(atan2(hueSum[pxIndex].y, hueSum[pxIndex].x));
    if (avgHue < 0) avgHue += 360;

    let avgSat = satSum[pxIndex] / frameCount;
    let avgBri = briSum[pxIndex] / frameCount;
    // print(avgHue, avgSat, avgBri);
    let avgColor = color(avgHue, avgSat, avgBri);
    composite.pixels[i] = red(avgColor);
    composite.pixels[i + 1] = green(avgColor);
    composite.pixels[i + 2] = blue(avgColor);
    composite.pixels[i + 3] = 255;
  }

}
