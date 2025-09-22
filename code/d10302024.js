let cells = [];

function setup(){
  createCanvas(windowWidth, windowHeight);

  let frameWidth, frameHeight;
  let offset = 10;
  if(windowWidth < 400){
    frameWidth = width;
    frameHeight = frameWidth * 2;
    cells.push(new Cell(width/2 - frameWidth/2, height/2 - frameHeight/2, frameWidth, frameHeight, 255));
  } else { //small screen, add one in the middle
    frameWidth = floor(windowWidth/4);// - offset;
    frameHeight = frameWidth * 2;
    for(let i = 0; i < 4; i++){
      cells.push(new Cell(i * frameWidth + offset, height/2 - frameHeight/2, frameWidth, frameHeight, 255));
    }
  }
}

function draw(){
  background(255);

  for(let c of cells){
    c.show();
  }
}

function mousePressed(){
  for(let c of cells){
    if(c.alive && c.clicked() && c.h > 25 && c.w > 25){
      let type;
      let r = random(); //roll the dice!
      if(c.h == c.w){ //square
        if(r > 0.5){
          type = 3; //split into 4 smaller squares
        } else {
          type = 1; //split in half
        }
      } else if(c.h > c.w){ //vertical rect
        if(r > 0.5){
          type = 0;//split vertically into 4
        } else {
          type = 5; //split vertically into 2
        }
      } else { //horizontal rect
        if(r > 0.5){
          type = 4; //split across
        } else {
          type = 1; //split
        }
      }

      //divide, based on some rule
      let newCells = c.divide(type);
      cells.push.apply(cells, newCells);
      cull();
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
    rect(this.x - 5, this.y -5, this.w -10 , this.h - 10);
  }

  divide(type) {
    //
    let children = [];
    //TODO add different types of division

    if(type == 0){
      //vertical  divide into 4 parts
      let newHeight = this.h/4;
      for(let i = 0; i < 4; i++){
        children.push(new Cell(this.x, this.y + i * newHeight, this.w, newHeight, 255));
      }
    } else if(type == 1){ //split in half
      let newWidth = this.w/2;
      children.push(new Cell(this.x, this.y, newWidth, this.h, 255));
      children.push(new Cell(this.x + newWidth, this.y, newWidth, this.h, 255));
    } else if(type ==3){
      //square it out
      let newWidth = this.w/2;
      let newHeight = this.h/2;
      children.push(new Cell(this.x, this.y, newWidth, newHeight, 255));
      children.push(new Cell(this.x + newWidth, this.y, newWidth, newHeight, 255));
      children.push(new Cell(this.x, this.y + newHeight, newWidth, newHeight, 255));
      children.push(new Cell(this.x + newWidth, this.y + newHeight, newWidth, newHeight, 255));
    } else if(type == 4){
      //horzontal divide into 4 parts
      let newWidth = this.w/4;
      for(let i = 0; i < 4; i++){
        children.push(new Cell(this.x + i * newWidth, this.y, newWidth, this.h, 255));
      }
    } else if(type == 5){
      //vertical divide into two parts
      let newHeight = this.h/2;
      for(let i = 0; i < 2; i++){
        children.push(new Cell(this.x, this.y + i * newHeight, this.w, newHeight, 255));
      }
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