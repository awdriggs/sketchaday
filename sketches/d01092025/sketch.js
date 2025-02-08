// MetaBalls : p5.js implementation
// https://editor.p5js.org/codingtrain/sketches/ISPozOLXW
// Basile Pesin-http://vertmo.github.io

//color and image shit is you!
var numBlobsPerChannel = 10;
var redBlobs = [];
var greenBlobs = [];
var blueBlobs = [];

let redMask, greenMask, blueMask;
let redImage, greenImage, blueImage;

function setup() {
  createCanvas(400, 400);
  redImage = loadImage('red.jpg');
  greenImage = loadImage('green.jpg');
  blueImage = loadImage('blue.jpg');

  // maskImage = loadImage('/assets/mask2.png');

  //init hte blobs
  for (i = 0; i < numBlobsPerChannel; i++) redBlobs.push(new Blob(random(0, width), random(0, height)));
  for (i = 0; i < numBlobsPerChannel; i++) greenBlobs.push(new Blob(random(0, width), random(0, height)));
  for (i = 0; i < numBlobsPerChannel; i++) blueBlobs.push(new Blob(random(0, width), random(0, height)));
}

function draw() {
  background(255);

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < redBlobs.length; i++) {
        let xdif = x - redBlobs[i].x;
        let ydif = y - redBlobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += 10 * redBlobs[i].r / d;
      }
      set(x, y, color(sum, 0, 0));
    }
  }
  updatePixels();
  
  filter(POSTERIZE, 2)
  filter(THRESHOLD, 0.1);
  
  //load

  for (i = 0; i < numBlobsPerChannel; i++) {
    redBlobs[i].update();
    // greenBlobs[i].update();
    // blueBlobs[i].update();
  }
}

function generateMask(channel){

  pg = createGraphics(width, height);

  return pg.get(); //return the image
}
