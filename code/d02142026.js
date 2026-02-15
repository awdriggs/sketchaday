let cells = [];
let n = 0;
let angleStep = 0.05;

let mover;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numCols = 10;
  let numRows = 10;
  let margin = 10;
  let cellWidth = (width - margin * 2)/numCols;
  let cellHeight = (height - margin * 2)/numRows;


  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth + cellWidth/2 + margin ;
      let y = i * cellHeight + cellHeight/2 + margin;

      cells.push(new Circle(x, y, cellWidth * 0.8, cellHeight * 0.8, 0));
    }
  }

  noStroke();

  mover = new Mover();
}

function draw() {
  background(255);

  for(let i = 0; i < cells.length; i++){
    let c = cells[i]
    // c.angle = map(noise(c.x * 0.005, c.y * 0.005, n), 0, 1, 0, TWO_PI);
    c.setAngle(mover.position.x, mover.position.y)
    c.setDist(mover.position.x, mover.position.y)
    c.draw();
  }

  // fill(200);
  // ellipse(mouseX, mouseY, 5, 5);

  mover.update();
  mover.checkEdges();
  // mover.show();

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

class Circle {
  constructor(x, y, w, h, a){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = a;
    this.distance = this.w/6;
  }

  draw(){
    // this.angle = this.setAngle();
    push();
    translate(this.x, this.y)
    rotate(this.angle);
    fill(0);
    ellipse(0, 0, this.w, this.h);
    fill(255);

    // this.distance = this.setDist();
    ellipse(this.distance, 0, this.w, this.h);
    // stroke(0);
    // line(0, 0, this.w/2, 0);
    pop();
  }

  setAngle(x,y){
    this.angle = atan2(y - this.y, x - this.x);
  }

  setDist(x,y){
    let distance = dist(this.x, this.y, x, y);
    let mappedDist = map(distance, 0, 1131, 0, this.w/2, true);
    this.distance = mappedDist;
  }

}

class Mover {

  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-4, 4), random(-4, 4));
    // The object has two vectors: position and velocity.

  }


  update() {
    this.position.add(this.velocity);
    //Motion 101: position changes by velocity.

  }


  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);

  }


  checkEdges() {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }

    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }
}


