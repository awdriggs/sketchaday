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
    waves.push(new Wave(i * verticalSpacing + verticalSpacing/2, verticalSpacing * 2));
  }
  // createCanvas(windowWidth, windowHeight);
  fill(0)
}

function draw() {
  background(255);

  // for(let i=0; i < centerPoints.length; i++){
  theta += 0.001;
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
    this.size = size;
    this.modFreq = random(2, 10);
    this.modDepth = random(0.5, 2)
    // ttheta = 0;

    for(let i = 0; i < numPoints; i++){
      let x = i * spacing + 5;
      // let y = sin(theta + map(i, 0, numPoints, 0, TWO_PI)) * height/4 + this.startY;
      let y = sin(theta) + 0.5 * sin(2.3 * theta + 1) + 0.25 * sin(5.7 * theta + 2);
      // let y = sin(map(i, 0, numPoints, 0, TWO_PI)) * height/4 + this.startY;
      this.centerPoints.push({x, y});
    }
  }

  update(){
    for(let i=0; i < this.centerPoints.length; i++){
      // this.theta += 0.0001;
      let c = this.centerPoints[i];
      let t = theta + map(i, 0, numPoints, 0, HALF_PI);
      let y = sin(t + this.modFreq * sin(this.modDepth * t));
      c.y = y * height / 7 + this.startY;
      // c.y = sin(theta + map(i, 0, numPoints, 0, TWO_PI)) * height/4 + this.startY;
    }
  }

  draw(){
    this.update();
    for(let i=0; i < this.centerPoints.length; i++){
      let c = this.centerPoints[i];
      i % 2 == 0 ? fill(0) : fill(255);
      circle(c.x, c.y, this.size);
    }
  }
}

