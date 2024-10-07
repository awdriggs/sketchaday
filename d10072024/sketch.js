
let cells = [];
let newCells = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(1000, 600); //multiples of 200 only


  //build cells
  buildCells();

  // noStroke();
}

function draw() {
  // if(frameCount == 1){
  //   saveGif("fracture", 10);
  // }

  background(255);

  for(let c of cells){
    c.show();
  }

  // fracture();
}

//build cells
function buildCells(){
  let containerWidth = 600;
  let containerHeight = 600;


  let initSize = 200;
  let numCols = containerWidth/initSize;
  let numRows = containerHeight/initSize;

  let hOffset = (width - containerWidth)/2;
  let vOffset = (height - containerHeight)/2;

  //no negative offsets!
  if(hOffset < 0){
    hOffset = 0;
  }

  if(vOffset < 0){
    vOffset = 0;
  }
  cells = []; //clear out old cells
  for(let i = 0; i < numCols; i++){
    for(let j = 0; j < numRows; j++){
      //get a random draw function from patterns
      let randomIndex = floor(random(0, patterns.length));
      let pattern = patterns[randomIndex];
      cells.push(new Cell(initSize * i + hOffset, initSize * j + vOffset, initSize, pattern, 20));
    }
  }

}

function mousePressed(){
  buildCells();
}

function fracture(){
  for(let c of cells){
    if(random() < 0.01 && c.size > 5){
      let newCells = c.divide();
      cells.push.apply(cells, newCells);
      break; //only divide one cell per loop
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
  constructor(x, y, size, func, c) {
    this.x = x;
    this.y = y;
    this.size = size; //always square
    // this.color = c;
    this.alive = true;
    this.draw = func;
    this.count = c;
    print(this);
  }

  show() {
    //display the cell, a rectangle
    // fill(this.color);
    // rect(this.x, this.y, this.size, this.size);
    this.draw(this.x, this.y, this.count, this.size);
  }


  //needs update with new constructor
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
