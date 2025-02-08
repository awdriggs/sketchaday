//TODO
//[x] make an agent that moves through the grid
let cells = [];
let agent;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  gridify();

  agent = new Mover(cells);
  noStroke();
  // testCell = new Cell(100, 100, 100, 100);
}

function draw() {
  background(255);
  for(let c of cells){
    c.show();
  }

  agent.move();
  // agent.show();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridify();
  agent = new Mover(cells);
}

function gridify(){
  cells = [];

  let cellSize = 50;
  //set spacing between cols
  let margin = 10; //left/right/top/bottom
  //determine num cols
  let numCols = floor(width/(cellSize + margin));
  //determine num rows
  let numRows = floor(height/(cellSize + margin));
  print(numCols, numRows);
  //double for, made the grid
  for(let i = 0; i < numCols; i++){
    for(let j = 0; j < numRows; j++){
      cells.push(new Cell(margin * i + i * cellSize + margin, margin * j + j * cellSize + margin, cellSize, 255));
    }
  }


}

class Cell {
  constructor(x, y, size, c){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = c;
  }

  show(){
    if(this.mouseIn() || this.agentIn()){
      if(this.color > 0){
        // this.color--;
        this.color = 0;
      }
    } else {
      if(this.color < 255){
        this.color++;
      }
    }

    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  mouseIn(){
    if(mouseX > this.x && mouseX < this.x + this.size  && mouseY > this.y && mouseY < this.y + this.size){
      console.log("hover");
      return true
    } else {
      return false
    }
  }

  agentIn(){
    if(agent.currentCell == this){ //refering to the global agent
      return true;
    } else {
      return false;
    }
  }
}


class Mover {
  constructor(cellArray){
    this.env = cellArray;
    // this.envIndex = floor(random() * cellArray.length);
    this.envIndex = 0;
    this.currentCell = this.env[this.envIndex]

  }

  show(){
    fill(0, 0, 255);
    ellipse(this.currentCell.x + this.currentCell.size/2, this.currentCell.y + this.currentCell.size/2, 20, 20);
  }

  move(){
    this.envIndex++;

    if(this.envIndex == this.env.length){
      this.envIndex = 0;
    }

    print(this.envIndex);
    this.currentCell = this.env[this.envIndex];
  }
}

