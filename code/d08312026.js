//looping with noise
 
let noiseStep = 0.2; 

let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  test = new Rotator(width/2, height/2, width/2, 0, 60); 
  fill(0);
}

function draw() {
  background(255, 100);

  
  test.update();
  test.draw();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Rotator {
  constructor(cx, cy, radius, nStart, speed){
    this.centerX = cx;
    this.centerY = cy;
    this.maxRadius = radius;
    this.nPosition = nStart; //noise position
    this.speed = TWO_PI/speed; //angle step = speed, 
    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = 0;
    
    this.update(); //ensure init
  }
  
  update(){
    this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.x = this.centerX + cos(this.angle) * this.r 
    this.y = this.centerY + sin(this.angle) * this.r 

    this.angle += this.speed; 
    this.nPosition += random(0, noiseStep);
  }

  draw(){
    ellipse(this.x, this.y, 10, 10);
  }
}
