//TODO
//[x] make an agent that moves through the grid
//[ ] random walk

let cells = [];
let agent;
let numCols, numRows;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  gridify();

  agent = new Mover(cells);
  // noStroke();
  // testCell = new Cell(100, 100, 100, 100);
}

function draw() {
  background(255);
  for(let c of cells){
    c.show();
  }

  // agent.show();
  agent.move();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridify();
  agent = new Mover(cells);
}

function keyPressed() {
  // print(key == "ArrowLeft");

  let dir;

  if(key == "ArrowLeft"){
    dir = 0;
  } else if(key == "ArrowRight"){
    dir = 1;
  } else if(key == "ArrowDown"){
    dir = 2;
  } else if(key == "ArrowUp"){
    dir = 3;
  }

  agent.step(dir);
}

function gridify(){
  cells = [];

  let cellSize = 50;
  //set spacing between cols
  let margin = 10; //left/right/top/bottom
  //determine num cols
  numCols = floor(width/(cellSize + margin));
  //determine num rows
  numRows = floor(height/(cellSize + margin));
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

  cycle(){ //this cycles through the environment array
    this.envIndex++;

    if(this.envIndex == this.env.length){
      this.envIndex = 0;
    }

    print(this.envIndex);
    this.currentCell = this.env[this.envIndex];
  }

  move(){
    //roll a random amount
    let dir = floor(random(0, 4))
    this.step(dir);
    // print(dir);
    //call step in that direction
  }

  step(d){
    if(d == 2){
      this.envIndex++;
      //go back to row 0 by subtracting the number of rows
      if(agent.envIndex % numRows == 0){
        this.envIndex -= numRows;
      }
    } else if(d == 3){
      this.envIndex--;
      //go to the last row
      if(agent.envIndex % numRows == numRows - 1 || this.envIndex ==  -1){ //catch for if envIndex is -1
        this.envIndex += numRows;
      }
    } else if(d == 1){
      this.envIndex += numRows; //shift by the number of rows
      //if you are at the last column, to to subtract the array length to get to next column in the same row 
      if(floor(agent.envIndex/numRows) == numCols){
        this.envIndex = this.envIndex - this.env.length 
      }
      //get row --> agent.envIndex % numCols
    } else if(d == 0){
      this.envIndex -= numRows;

      if(this.envIndex < 0){
        this.envIndex = this.envIndex + this.env.length 
      }
    }
    // print(this.envIndex);
    this.currentCell = this.env[this.envIndex];
  }
}

