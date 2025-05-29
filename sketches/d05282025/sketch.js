let originalImage;
let mask;
let angle = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  makeMask();

  resetBg();
}

function draw() {
  background(255);
  // ellipse(width/2, height/2, width/2, height/2);
  
  fill(0);
  ellipse(width/4, height/4, width/3, height/3);

  originalImage.mask(mask);

  push();
  translate(width/2, height/2);
  rotate(angle);
  image(originalImage, -width/2, -height/2);
  pop();

  angle+=0.01;
  // image(mask, 0, 0);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

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
  bg.ellipse(width/4, height/4, width/3, height/3);
  
  originalImage = bg.get();
}

 


