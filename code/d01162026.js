//gradient nested squares
let gradients = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numGradients = 40;
  for(let i = 0; i < numGradients; i++){
    let x = random(0, width);
    let y = random(0, height);
    let w = random(width/2, width);
    let h = random(height/2, height);
    gradients.push(new Gradient(x, y, w, h, 10));
  }

  noFill();
  noStroke();
}

function draw() {
  background(255);
  // blendMode(SUBTRACT);
  // blendMode(DIFFERENCE);

  for(let g of gradients){
    g.draw();
  }
}

function mousePressed(){
  for(let g of gradients){
    g.setColor();
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

class Gradient {
  constructor(x, y, w, h, numSquares){
    // this.squares = this.build(x, y, s, numSquares);
    this.cx = x;
    this.cy = y;
    this.width = w;
    this.height = h;
    this.setColor(); //sets the fille
    this.angle = random(TWO_PI);
    this.numSquares = numSquares;
    this.wStep = this.width/this.numSquares;
    this.hStep = this.height/this.numSquares;
    this.dir = random() > 0.5 ? -1 : 1;
    this.speed = random(0.001, 0.005);
  }

  draw(){

    fill(this.fill);

    for(let i = 0; i < this.numSquares; i++){
      let w = i * this.wStep; 
      let h = i * this.hStep; 
      push();
      translate(this.cx, this.cy);
      rotate(this.angle);
      ellipse(0, 0, w, h);
      // fill(0);
      // ellipse(0, 0, 10);
      pop();

    }

    this.angle += this.speed  * this.dir;
  }

  setColor(){
    this.fill = color(random(0, 255), random(0, 255), random(0,255), 10);
  }

}




