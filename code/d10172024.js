//TODO
//[x] make an agent that moves through the grid
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

  //agent.move();
  agent.show();

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
    dir = "left";
  } else if(key == "ArrowRight"){
    dir = "right";
  } else if(key == "ArrowDown"){
    dir = "down";
  } else if(key == "ArrowUp"){
    dir = "up";
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

  move(){
    this.envIndex++;

    if(this.envIndex == this.env.length){
      this.envIndex = 0;
    }

    print(this.envIndex);
    this.currentCell = this.env[this.envIndex];
  }

  step(d){
    if(d == "down"){
      this.envIndex++;

      // print("row", this.envIndex/numCols) 
      print("row", agent.envIndex % numRows)

      if(agent.envIndex % numRows == 0){
        this.envIndex -= numRows;
      }
      // if(agent.envIndex % numRows == numRows){
      //   print("loop");
      //   this.envIndex = this.envIndex - numRows;
      // }
    } else if(d == "up"){
      this.envIndex--;

      print("row", agent.envIndex % numRows)
      if(agent.envIndex % numRows == numRows - 1){
        this.envIndex += numRows;
      }
      // if(this.envIndex < 0){
      //   this.envIndex = 0;
      // }
    } else if(d == "right"){
      this.envIndex += numRows;

      if(floor(agent.envIndex/numRows) == numCols){
        this.envIndex = this.envIndex - this.env.length 
        // this.envIndex = 0;
      }
      //get row --> agent.envIndex % numCols
    } else if(d == "left"){
      this.envIndex -= numRows;

      if(this.envIndex < 0){
        this.envIndex = this.env.length + this.envIndex
        // this.envIndex = 
      }
    }
    
    // print(this.envIndex);
    this.currentCell = this.env[this.envIndex];
  }
}