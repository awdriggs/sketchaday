let cells = [];
let n = 0;
let angleStep = 0.05;

let mover;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numCols = 50;
  let numRows = 50;
  let margin = 5;
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

  mover = new Mover(width/2, height/2, width/2 * 0.8);
}

function draw() {
  background(255);

  for(let i = 0; i < cells.length; i++){
    let c = cells[i]
    // c.angle = map(noise(c.x * 0.005, c.y * 0.005, n), 0, 1, 0, TWO_PI);
    c.setAngle(mover.x, mover.y)
    c.setDist(mover.x, mover.y)
    c.draw();
  }

  // fill(200);
  // ellipse(mouseX, mouseY, 5, 5);

  // mover.draw();
  mover.update();
  // stroke(0);
  // line(mover.x, mover.y, width/2, height/2);
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

    ellipse(this.distance, 0, this.w, this.h);
    // stroke(0);
    // line(-this.distance * 4, 0, this.distance * 4, 0);
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
  constructor(x, y, r){
    this.cx = x;
    this.cy = y;
    this.maxR = r;
    this.minR = r/10;
    this.r = r;
    this.offset = 0.05; //spiral movement 
    this.angle = random(0, TWO_PI);
    this.dir = random() > 0.5 ? 1 : -1;
    this.breath = -1;
    this.x = cos(this.angle) * this.r;
    this.y = sin(this.angle) * this.r;

  }

  draw(){
    fill("red");
    ellipse(this.x, this.y, 10, 10);
  }

  update(){
    let totalSpeed = 5; // constant pixels per frame
    let radialStep = this.offset * this.breath;
    let tangential = sqrt(totalSpeed * totalSpeed - radialStep * radialStep);
    this.angle += (tangential / this.r) * this.dir;

    this.r += radialStep;

    if(this.r < this.minR){
      this.r = this.minR;
      this.breath *= -1;
    } else if(this.r > this.maxR){
      this.r = this.maxR;
      this.breath *= -1;
    }

    this.x = cos(this.angle) * this.r + this.cx;
    this.y = sin(this.angle) * this.r + this.cy;;
  }
}
