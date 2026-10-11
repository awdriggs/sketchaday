//ode to julio le parc
let moons = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 10;
  let numRows = 10;

  let cellDim = width/numCols; //making square grid
  let circSize = cellDim*0.7;

  for(let i = 0; i < numRows; i++){
    let y  = i * cellDim + cellDim/2;
    for(let j = 0; j < numCols; j++){
      let x = j * cellDim + cellDim/2;
      moons.push(new Moon(x, y, circSize, j * 0.1, i * 0.1));
    }
  }

  noStroke();
}

function draw() {
  background(255);

  for(let m of moons){
    m.draw();
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

class Moon {
  constructor(cx, cy, size, nx, ny){
    this.x = cx;
    this.y = cy;
    this.s = size;
    this.angle = noise(nx, ny) * TWO_PI;
    this.speed = 0.008;
    this.dir = noise(nx + 100, ny + 100) > 0.5 ? 1 : -1;
  }

  draw(){
    this.update();

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(0);
    ellipse(0, 0, this.s, this.s);
    fill(255);
    rect(-this.s/2, this.s/3, this.s, this.s/4); 
    pop();
  }

  update(){
    this.angle += this.speed * this.dir;
  }
}
