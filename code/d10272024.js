let cells = [];

function setup(){
  createCanvas(windowWidth, windowHeight);

  let frameWidth, frameHeight;

  if(windowWidth < 400){
    frameWidth = width;
  } else {
    frameWidth = floor(windowWidth/4);
  }

  frameHeight = frameWidth * 2;

  cells.push(new Cell(width/2 - frameWidth/2, height/2 - frameHeight/2, frameWidth, frameHeight, 255));

}

function draw(){
  background(255);

  for(let c of cells){
    c.show();
  }
}

function mousePressed(){
  for(let c of cells){
    //TODO add some height limit
    if(c.alive && c.clicked() && c.h > 50){
      //divide, based on some rule
      let newCells = c.divide();
      cells.push.apply(cells, newCells);
      //cull(); 
      break; //only divide one cell per loop
    }
  }
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

//cell class if its needed
class Cell {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
    this.alive = true;
    print(this);
  }

  show() {
    //display the cell, a rectangle
    fill(this.color);
    // rect(this.x, this.y, this.w, this.h);
    rect(this.x, this.y, this.w, this.h);
  }

  divide() {
    //
    let children = [];
    //TODO update for a rectangle
    //TODO add different types of division

    //horizontal divide
    let newHeight = (this.h - 10)/4; 
    for(let i = 0; i < 4; i++){
      
      children.push(new Cell(this.x + 10, this.y + i * newHeight + 10, this.w - 20, newHeight - 10 , 255));
    }
    // children.push(new Cell(this.x + this.size/2, this.y, this.size/2, randomColor()));
    // children.push(new Cell(this.x, this.y + this.size/2, this.size/2, randomColor()));
    // children.push(new Cell(this.x + this.size/2, this.y + this.size/2, this.size/2, randomColor()));

    this.alive = false;

    return children;
  }

  clicked() {
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      print(this + " clicked")
      return true;
    } else {
      return false;
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