//looping with noise

let noiseStep;
let thickness;

let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  thickness = 20 * width/800;
  setRotator();
  fill(0);
  
  strokeWeight(thickness);
}

function draw() {
  background(255, 100);


  test.update();
  test.draw();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function mousePressed(){
  setRotator();
}

function setRotator(){
  noiseStep = random(8, 12);
  let speed = 100;
  test = new Rotator(width/2, height/2, width/2 - thickness/2, 0, speed);
}

 

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
    this.nPosition = nStart;
    this.noiseStep = noiseStep / speed;
    this.speed = TWO_PI/speed; //angle step = speed,
    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = random(0, TWO_PI);
    // this.numPoints = speed + ceil(random(speed * 0.1, speed * 0.2)) * (random() > 0.5 ? -1 : 1);
    this.numPoints = speed + ceil(random() > 0.5 ? random(speed * 0.1, speed * 0.18) : random(speed * 0.04, speed * 0.08) * -1);
    console.log(this.numPoints);
    this.points = [];

    this.update(); //ensure init
  }

  update(){
    if(this.points.length < this.numPoints){
      this.r = map(noise(this.nPosition), 0, 1, this.maxRadius * 0.8, this.maxRadius);
      this.x = this.centerX + cos(this.angle) * this.r
      this.y = this.centerY + sin(this.angle) * this.r

      this.angle += this.speed;
      this.nPosition += random(0, this.noiseStep);

      this.points.push(createVector(this.x, this.y));
    }
  }

  draw(){
    noFill();
    beginShape();
    let pts = this.points;
    curveVertex(pts[0].x, pts[0].y);
    for(let p of pts){
      curveVertex(p.x, p.y);
    }
    curveVertex(pts[pts.length-1].x, pts[pts.length-1].y);
    endShape(OPEN);
  }
}
