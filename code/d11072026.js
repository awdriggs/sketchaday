const SKETCH_NAME = document.currentScript.src.split('/').pop().replace('.js', '');

let waves = [];
// let centerPoints = [];
// let theta = 0;
let numPoints;
let spacing;
let numWaves = 10;
let theta = 0;

function setup() {
  createCanvas(800, 800);
  numPoints = 200;
  spacing = width/(numPoints * 0.75);
  let verticalSpacing = height/numWaves;;

  for(let i = -5; i < numWaves + 5; i++){
    waves.push(new Wave(i * verticalSpacing + verticalSpacing/2, verticalSpacing/5));
  }
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // for(let i=0; i < centerPoints.length; i++){
  // theta += 0.001;
  // let c = centerPoints[i];
  // c.y = sin(theta - map(i, 0, numPoints, 0, TWO_PI)) * height/4 + height/2;
  // ellipse(c.x, c.y, 10, 10);
  // }

  for(let w of waves){
    w.draw();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif(SKETCH_NAME, floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas(SKETCH_NAME, "jpg");
  }
}


class Wave {
  constructor(y, size){
    this.startY = y;
    this.centerPoints = [];
    this.theta = 0; 
    this.speed = random(0.001, 0.005) * 2;
    this.dir = random() > 0.5 ? -1 : 1;
    this.size = size;
    this.modFreq = random(2, 5);
    this.modDepth = random(0.5, 1)
    this.color = color(random(255), random(255), random(255));
    // ttheta = 0;

    for(let i = 0; i < numPoints; i++){
      let x = i * spacing + 5;
      let y = this.startY;
      this.centerPoints.push({x, y});
    }
  }

  update(){
    this.theta += this.speed * this.dir;

    for(let i=0; i < this.centerPoints.length; i++){
      // this.theta += 0.0001;
      let c = this.centerPoints[i];
      let t = this.theta + map(i, 0, numPoints, 0, HALF_PI);
      let y = sin(t + this.modFreq * sin(this.modDepth * t));
      c.y = y * height / 7 + this.startY;
      // c.y = sin(theta + map(i, 0, numPoints, 0, TWO_PI)) * height/4 + this.startY;
    }
  }

  draw(){
    this.update();
    noFill();
    stroke(this.color);
    strokeWeight(this.size);
    strokeJoin(ROUND);
    strokeCap(ROUND);
    beginShape();
    for(let c of this.centerPoints){
      vertex(c.x, c.y);
    }
    endShape();
  }
}

