let points;
// let slider;
let prevSliderValue;
let resolution = 20;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  // slider = createSlider(4, 100, 50);
  // slider.position(10, 10);
  // slider.size(100);

  // prevSliderValue = slider.value();
  // generatePoints(prevSliderValue)
  generatePoints(resolution);

}

function draw() {
  background(255);

  // if(prevSliderValue !== slider.value()){
  //   console.log("change");
  //   prevSliderValue = slider.value();
  //   generatePoints(prevSliderValue);
  // }

  for(let p of points){
    p.draw();
    p.applyForce();
  }
}

function generatePoints(resolution) {
  points = [];
  // let diameter = width * 0.6;

  // let angleStep = TWO_PI/resolution


  // for(let i = 0; i < resolution; i++){
  //   let x = width/2 + cos(angleStep * i) * diameter/2;
  //   let y = height/2 + sin(angleStep * i) * diameter/2;


  //   points.push(new Point(x + noise(x) * 100, y + noise(y) * 100, x, y));
  // }
  let numCols = 8; 
  let numRows = 8;
  let spacing = width/numCols;

  for(let i = 0; i < numRows; i++){
    console.log("row", i);
    let y = i * spacing + spacing/2;
    for(let j = 0; j < numCols; j++){
    console.log("col", j);
      let x = j * spacing + spacing/2;
      points.push(new Point(x, y, x, y));
    }
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

class Point {
  constructor(x, y, ax, ay){
    this.loc = createVector(x, y);
    this.anchor = createVector(ax, ay);

    this.k = 0.001;
    this.force = createVector(0,0);
    this.vel = createVector(0,0);
    // this.damping = random(0.9998, 0.99999);
    this.damping = 0.9;

    this.size = (width/800) * 20;
  }

  draw(){
    // line(this.loc.x, this.loc.y, this.anchor.x, this.anchor.y);
    ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }

  applyForce() {
    this.force = p5.Vector.sub(this.anchor, this.loc).mult(this.k);

    // continuous perturbation
    let n = p5.Vector.fromAngle(map(noise(this.loc.x * 0.01, this.loc.y * 0.01, frameCount * 0.005), 0, 1, -1, 1) * TWO_PI);
    n.mult(0.05 * (width/800)); // perturbation strength
    // let nx = map(noise(this.loc.x * 0.01, frameCount * 0.005), 0, 1, -1, 1);
    // let ny = map(noise(this.loc.y * 0.01, frameCount * 0.005 + 100), 0, 1, -1, 1);
    // let n = createVector(nx, ny);

    this.force.add(n);
    this.vel.add(this.force);
    this.vel.mult(this.damping);
    this.loc.add(this.vel);
  }

}

