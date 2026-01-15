//gradient nested squares
let gradients = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numGradients = 100;
  for(let i = 0; i < numGradients; i++){
    let x = random(0, width);
    let y = random(0, height);
    gradients.push(new Gradient(x, y, width, 10));
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
  constructor(x, y, s, numSquares){
    // this.squares = this.build(x, y, s, numSquares);
    this.cx = x;
    this.cy = y;
    this.size = s;
    this.setColor(); //sets the fille
    this.angle = random(TWO_PI);
    this.numSquares = numSquares;
    this.squareStep = this.size/this.numSquares;
    this.dir = random() > 0.5 ? -1 : 1;
    this.speed = random(0.001, 0.005);
  }

  build(x, y, s, n){
    let squares = []; //empty array to return
    let offset = s/n; //divide the total size by the number of squares


    for(let i = 0; i < n; i++){
      let dim = offset * i;
      squares.push({x: x - dim/2, y: y - dim/2, s: dim});
    }

    return squares;
  }

  // draw(){
  //   fill(this.fill);
  //   for(let s of this.squares){
  //     push();
  //     translate(width/2, height/2);
  //     rotate(this.angle);
  //     rect(0 - s.s/2, 0 - s.s/2, s.s, s.s);
  //     fill(0);
  //     ellipse(0, 0, 10);
  //     pop();

  //   }

  //   this.angle+=0.001;
  // }
  draw(){

    fill(this.fill);

    for(let i = 0; i < this.numSquares; i++){
      let s = i * this.squareStep; 
      push();
      translate(this.cx, this.cy);
      rotate(this.angle);
      rect(0 - s/2, 0 - s/2, s, s);
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




