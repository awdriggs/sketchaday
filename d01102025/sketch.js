// MetaBalls : p5.js implementation
// https://editor.p5js.org/codingtrain/sketches/ISPozOLXW
// Basile Pesin-http://vertmo.github.io

//color and image shit is you!
var numBlobsPerChannel = 10;
var redBlobs = [];
var greenBlobs = [];
var blueBlobs = [];

let redMask, greenMask, blueMask;
let redChannel, greenChannel, blueChannel;
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

  redChannel = createGraphics(400, 400);
}


function draw() {
  background(255);

    //load
  redMask = generateMask(redChannel);
 // Apply the mask.
  // redImage.mask(redMask);
  tint("red");
  image(redMask, 0, 0);
  // Display the image.
  // image(redImage, 0, 0);
  for (i = 0; i < numBlobsPerChannel; i++) {
    redBlobs[i].update();
    // greenBlobs[i].update();
    // blueBlobs[i].update();
  }
}

function generateMask(channel){

  // pg = createGraphics(width, height);

  channel.loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < redBlobs.length; i++) {
        let xdif = x - redBlobs[i].x;
        let ydif = y - redBlobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += 10 * redBlobs[i].r / d;
      }
      channel.set(x, y, color(sum, 0, 0));
    }
  }
  channel.updatePixels();
  
  channel.filter(POSTERIZE, 2)
  channel.filter(THRESHOLD, 0.1);

  channel = chromaKey(channel);

  return channel.get(); //return the image
}

function chromaKey(channel) {
  // Make a copy of the image here, if needed (to avoid modifying the original)
  let copy = createImage(channel.width, channel.height);
  copy.copy(channel, 0, 0, channel.width, channel.height, 0, 0, channel.width, channel.height);

  copy.loadPixels();

  for (let i = 0; i < copy.pixels.length; i += 4) {
    // Check if the pixel is white
    let r = copy.pixels[i];
    let g = copy.pixels[i + 1];
    let b = copy.pixels[i + 2];
    let a = copy.pixels[i + 3];

    if (r === 255 && g === 255 && b === 255) {
      // If white, keep it fully opaque
      copy.pixels[i + 3] = 255;
    } else {
      // If not white, make it fully transparent
      copy.pixels[i + 3] = 0;
    }
  }

  copy.updatePixels();

  return copy;
}
