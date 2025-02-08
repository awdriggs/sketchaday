let cells = []; 
let numRows = 100, numCols = 100, cellSize;

function setup() {
  createCanvas(800, 800);
  noStroke();
  cellSize = width/numRows;
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      cells.push(new Cell(j * cellSize, i * cellSize, cellSize, random(0, 10)));
    }
  }
}

function draw() {
  background(255);

  for(let c of cells){
    c.draw();
  }
}

class Cell {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.state = floor(random(0, 255));
    this.dir = random() > 0.5 ? 1 : -1;
  }

  draw(){
    this.state += this.speed * this.dir;
    if (this.state < 0 || this.state > 255) {
      this.dir *= -1; // Reverse the direction
      this.state = this.state < 0 ? 0 : 255; // Clamp the state
    }
    fill(this.state);
    rect(this.x, this.y, this.size, this.size);
  }
}


