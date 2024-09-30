let cells = [];
let newCells = [];

function setup() {
  createCanvas(400, 400);
  // createCanvas(windowWidth, windowHeight);
  cells.push(new Cell(0, 0, width, randomColor())); //always square
  // let parent = select('#canvas-wrapper');
  // parent.style('border', '5px deeppink dashed');
  // debugger;
  // parent.style("width", 400);
    noStroke();
}

function draw() {
  background(255);

  for(let c of cells){
    c.show();
  }
}

function mousePressed(){
  for(let c of cells){
    let newCells = c.clicked();
    if(newCells){
      cells.push.apply(cells, newCells);
      break;
    }
  }

  cull(); 
}

function cull(){
  let aliveCells = [];
  for(let c of cells){
    if(c.alive){
      aliveCells.push(c);
    }
  }
  cells = aliveCells;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
class Cell {
  constructor(x, y, size, c) {
    this.x = x;
    this.y = y;
    this.size = size; //always square
    this.color = c;
    this.alive = true;
    print(this);
  }

  show() {
    //display the cell, a rectangle
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  divide() {
    //
    let children = [];
    children.push(new Cell(this.x, this.y, this.size/2, randomColor()));
    children.push(new Cell(this.x + this.size/2, this.y, this.size/2, randomColor()));
    children.push(new Cell(this.x, this.y + this.size/2, this.size/2, randomColor()));
    children.push(new Cell(this.x + this.size/2, this.y + this.size/2, this.size/2, randomColor()));

    this.alive = false;

    return children;
  }

  clicked() {
    if(mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size){
      print(this + " clicked")
      return this.divide();
    }
  }
}

function randomColor(){
  let r, g, b;
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);

  return color(r,g,b);
}
