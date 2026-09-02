//looping with noise
let noiseStep = 0.02;

let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  test = new Rotator(width/2, height/2, width/2, 0, 0.5, random(10, 11));
  // fill(0);
  strokeWeight(5 * width/800);
}

function draw() {
  background(255);

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
  constructor(cx, cy, radius, nStart, speed, numLoops){
    this.centerX = cx;
    this.centerY = cy;
    this.maxRadius = radius;
    this.nPosition = nStart; //noise position
    // this.speed = TWO_PI/speed; //angle step = speed,
    this.speed = TWO_PI / 100 * speed; // speed=1 is baseline, speed=2 is twice as fast

    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = 0;

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

    beginShape();
    for(let i = 0; i < this.positions.length; i++){
      curveVertex(this.positions[i].x, this.positions[i].y);
    }
    endShape();
  }
}
