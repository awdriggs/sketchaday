//TODO
//[x] make an agent that moves through the grid
//[x] random walk
//[x] perlin walk
//[x] gaussian walk
//[x] static noise walk
//[ ] build 4 "columns" of cells, apply a different random function to each
//[ ] refactor! agent needs access to each domains rows and cols

// let cells = [];
let agent;
// let numCols, numRows;

let noiseX = 0.0;

let domain1, domain2;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  // gridify();

  noStroke();
  // textSize(20);
  // testCell = new Cell(100, 100, 100, 100);
  domain1 = new Domain(50, 100, 500, 500, "static");
  domain2 = new Domain(550, 100, 500, 500, "static");
  // testDomain.gridify(50, 10);

  // agent = new Mover(testDomain.cells, "static");
}

function draw() {
  background(255);

  stroke(0, 255, 0);
  fill(255);
  // rect(testDomain.x, testDomain.y, testDomain.w, testDomain.h);

  //move this to be a part of domain class 
  for(let c of domain1.cells){
    c.show();
  }
  
  for(let c of domain2.cells){
    c.show();
  }


  domain1.agent.show();
  domain1.agent.move();

  domain2.agent.show();
  domain2.agent.move();
  // noiseX += 1; //for the perlin walk, move somewher else?

  // fill(0, 255, 0);
  // text(agent.walk, 20, 40);
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // gridify();
  // agent = new Mover(cells);
}

function keyPressed() {
  // print(key == "ArrowLeft");

  // let dir;

  // if(key == "ArrowLeft"){
  //   agent.walk = "perlin"

  // } else if(key == "ArrowRight"){
  //   agent.walk = "drunk"
  // } else if(key == "ArrowDown"){
  //   agent.walk = "gaussian"
  // } else if(key == "ArrowUp"){
  //   agent.walk = "static"
  // }

  // agent.step(dir);
}

//function gridify(){
//  cells = [];

//  let cellsize = 50;
//  //set spacing between cols
//  let margin = 10; //left/right/top/bottom
//  //determine num cols
//  numcols = floor(width/(cellsize + margin));
//  //determine num rows
//  numrows = floor(height/(cellsize + margin));
//  print(numcols, numrows);
//  //double for, made the grid
//  for(let i = 0; i < numcols; i++){
//    for(let j = 0; j < numrows; j++){
//      cells.push(new cell(margin * i + i * cellsize + margin, margin * j + j * cellsize + margin, cellsize, 255));
//    }
//  }
//}

class Domain {
  constructor(x, y, w, h, noiseClass){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.noise = noiseClass;
    this.gridify(50, 10); //sets this.cells
    this.agent = new Mover(this, noiseClass);  
  }
  
  //refactor so that domain controls all! example this.cells[0].agentIn(this.agent)
  //agent.step(this.numRows, this.numCols);
  //this will fix the headache of passing the parent around

  update(){
    
    //call move with the cells array
    //

    //display all the cells
  }

  gridify(cellSize, margin){
    this.cells = []; //empty and refresh
   

    // let cellSize = 50; //change these to globals?

    //set spacing between cols
    // let margin = 10; //left/right/top/bottom
    //determine num cols
    this.numCols = floor(this.w/(cellSize + margin));
    //determine num rows
    this.numRows = floor(this.h/(cellSize + margin));
    // print(this.num, numCols, numRows);
    //double for, made the grid
    for(let i = 0; i < this.numCols; i++){
      for(let j = 0; j < this.numRows; j++){
        this.cells.push(new Cell(this.x + margin * i + i * cellSize + margin, this.y + margin * j + j * cellSize + margin, cellSize, 255, this));
      }
    }
  }



}

class Cell {
  constructor(x, y, size, c, p){
    this.parent = p;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = c;
    // this.agent = a;
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
    //don't feel great about this
    if(this.parent.agent.currentCell == this){ //refering to the global agent
      return true;
    } else {
      return false;
    }
  }
}


class Mover {
  constructor(parent, noiseFunc){
    this.parent = parent;
    this.env = parent.cells;
    // this.envIndex = floor(random() * cellArray.length);
    this.envIndex = 0;
    this.currentCell = this.env[this.envIndex];
    this.walk = noiseFunc;
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
    let dir;
    if(this.walk == "drunk"){
      //drunk walk
      dir = floor(random(0, 4))
      this.step(dir);
    } else if(this.walk == "perlin"){
      //perlin walk
      dir = floor(noise(noiseX) * 4);
      this.step(dir);
    } else if(this.walk == "gaussian"){
      //gaussian walk
      dir = floor(randomGaussian(2));
      this.step(dir);
    } else if(this.walk == "static"){
      this.envIndex = floor(random(0, this.env.length));
      this.currentCell = this.env[this.envIndex];
    }
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

