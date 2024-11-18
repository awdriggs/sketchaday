let mask, mask1, mask2, bg, img, flip;

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
  makeMasks();
  mask = mask2;
  // noLoop();
  flip = 0;
}

function draw() {
  
  background(255);
  img = bg.get(); //resets the image

  //draw original image
  image(img, 0, 0);
   
  //mask half the image
  img.mask(mask);
  //invert the image
  img.filter(INVERT);
  //draw the rest of the image
  image(img,0,0);
  
  if(frameCount % 30 == 0){
    changeMask();
  }
}

function changeMask() {
  if(flip % 2 == 0){
    mask = mask1;
  } else {
    mask = mask2;
  }

  flip++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function makeMasks(){
  pg = createGraphics(width, height);
  pg.beginShape();
  pg.vertex(0, 0);
  pg.vertex(width, 0);
  pg.vertex(width, height);
  pg.endShape();
  mask2 = pg.get();

  // fill(255,0);
  // rect(0,0,width, height);
  pg = createGraphics(width, height);
  pg.beginShape();
  pg.vertex(0,0);
  pg.vertex(0, height);
  pg.vertex(width, height)
  pg.endShape();
  
  mask1 = pg.get();
}


