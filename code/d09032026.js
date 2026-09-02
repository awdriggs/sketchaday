//looping with noise
let noiseStep = 0.02;
let count = 4;

let rotators = [];

function setup() {
  createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);

start();
  // fill(0);
  strokeWeight(10 * width/800);
  noFill();
}

function draw() {
  background(255);

  for(let r of rotators){
    r.update();
    r.draw();
  }
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

function mousePressed(){
  start();
}

function start(){
  rotators = [];
  for(let i = 0; i < count; i++){
    let offset = width/10;
    let offsetX = random(-offset, offset);
    let offsetY = random(-offset, offset);
    rotators.push(new Rotator(width/2 + offsetX, height/2 + offsetY, random(width/4, width/2), random(), random(0.01, 0.03), random(0.3, 0.6), random(10, 11)));
  }
}

class Rotator {
  constructor(cx, cy, radius, nStart, noiseStep, speed, numLoops){
    this.centerX = cx;
    this.centerY = cy;
    this.maxRadius = radius;
    this.nPosition = nStart; //noise position
    this.noiseStep = noiseStep;
    this.color = color(random(255), random(255), random(255));
    // this.speed = TWO_PI/speed; //angle step = speed,
    this.speed = TWO_PI / 100 * speed; // speed=1 is baseline, speed=2 is twice as fast

    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = random(TWO_PI);

    this.positions = [];
    this.maxPoints = round(TWO_PI / this.speed) * numLoops;


    this.update(); //ensure init
  }

  update(){
    let r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    let x = this.centerX + cos(this.angle) * r
    let y = this.centerY + sin(this.angle) * r
    // print(x,y);

    this.positions.push({x: x, y: y});

    if(this.positions.length > this.maxPoints){
      this.positions.shift();
    }

    this.angle += this.speed;
    this.nPosition += random(0, noiseStep);
  }

  draw(){
    // ellipse(this.x, this.y, 10, 10);

    stroke(this.color);
    beginShape();
    for(let i = 0; i < this.positions.length; i++){
      curveVertex(this.positions[i].x, this.positions[i].y);
    }
    endShape();
  }
}
