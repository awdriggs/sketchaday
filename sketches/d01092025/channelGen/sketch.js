//utility sketch
var redblobs = []

function setup() {
  createCanvas(400, 400);



  noLoop();
}

function draw() {
  background(255);

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      set(x, y, color(255, 0, 0));
    }
  }
  updatePixels();
  
  saveCanvas("red.jpg");

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      set(x, y, color(0, 255, 0));
    }
  }
  updatePixels();
  
  saveCanvas("green.jpg");

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      set(x, y, color(0, 0, 255));
    }
  }
  updatePixels();
  
  saveCanvas("blue.jpg");
}
