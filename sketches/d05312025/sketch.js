let originalImage;
let maskedImage;
let mask;
let angle = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  makeMask();

  resetBg();
  underImage();

  
  // maskedImage = originalImage.get();
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
  
  // bg.fill(0);
  // bg.ellipse(width/4, height/4, width/3, height/3);
  // let offset = width/8;

  // let rectWidth = width/2;
  // bg.rect(offset, 0, rectWidth - offset, height);
  
  bg.stroke(0);
  bg.strokeWeight(width * 0.05);

  bg.push();
  bg.translate(width/2, height/2);
  bg.rotate(random(0, TWO_PI));
  
  let amt = width/8;
  let xJitter = random(-amt, amt);
  let yJitter = random(-amt, amt);
  bg.line(-width/2 + xJitter, -height/2 + yJitter, width/2 + xJitter, height/2 + yJitter); 
  bg.pop();
  
  originalImage = bg.get();

  
}

function underImage() {
   
  
  let g = createGraphics(width, height);
   
  g.background(255);
  g.stroke(0);
  g.strokeWeight(width * 0.1);
  g.line(width/2, 0, width/2, height);

  maskedImage = g.get();
}

 


