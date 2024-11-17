let mask, bg, img;

// Load the image.
function preload() {
  bg = loadImage('bg.jpg');
}

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  bg.resize(width, height);
  img = bg.get();
  // img.resize(width, height)
  makeMask();
  // noLoop();
}

function draw() {
  background(255);
  img = bg.get();
  //draw original image
  image(img, 0, 0);
  //mask half the image
  img.mask(mask);
  //invert the image
  img.filter(INVERT);
  //draw the rest of the image
  image(img,0,0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function makeMask(){
  beginShape();
  fill(0);
  vertex(0,0);
  vertex(0, height);
  vertex(width, height)
  endShape();
  
  mask = get();
}
