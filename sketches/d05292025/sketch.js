let originalImage;
let maskedImage;
let mask;
let angle = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  makeMask();

  resetBg();
  
  maskedImage = originalImage.get();
  maskedImage.mask(mask);
}

function draw() {
  background(255);
  
  fill(0);
  //redraw the orginal image
  image(originalImage, 0, 0);
  
  //rotate
  push();
  translate(width/2, height/2);
  rotate(angle);
  image(maskedImage, -width/2, -height/2);
  pop();

  angle+=0.01;
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 10.46);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function makeMask(){
  pg = createGraphics(width, height);

  // pg.background(255);
  pg.fill(0, 255);
  pg.ellipse(pg.width/2, pg.height/2, pg.width/2, pg.height/2)

  mask = pg.get();
}

function resetBg(){
  let bg = createGraphics(width, height);
  
  bg.background(255);
  // bg.background("red");
  
  bg.fill(0);
  // bg.ellipse(width/4, height/4, width/3, height/3);
  let offset = width/8;
  let rectWidth = width/2;
  bg.rect(offset, 0, rectWidth - offset, height);
  
  originalImage = bg.get();
}

 


