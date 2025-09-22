//TODO
//[x] make an agent that moves through the grid
//[x] random walk
//[x] perlin walk
//[x] gaussian walk
//[x] static noise walk
//[ ] build 4 "columns" of cells, apply a different random function to each
//[x] refactor! agent needs access to each domains rows and cols

// let domain1, domain2;
let columns = [];
let noises = ["drunk", "perlin", "gaussian", "static"];

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  // gridify();

  noStroke();

  for(let i = 0; i < noises.length; i++){
    columns.push(new Domain(i * width/4, 0, width/4, height, noises[i]));
  }

}

function draw() {
  background(255);

  // stroke(0, 255, 0);
  // fill(255);
  // rect(testDomain.x, testDomain.y, testDomain.w, testDomain.h);

  for(let c of columns){
    c.update();
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // need to reset each domain here, gridify?
}

class Domain {
  constructor(x, y, w, h, noiseClass){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.noise = noiseClass;
    this.gridify(30, 10); //sets this.cells, parametrize this?
    this.agent = new Mover(this.cells, this.numCols, this.numRows, noiseClass);
  }

  update(){
    for(let c of this.cells){
      c.show(this.agent); //pass the agent to cell can sense its location
    }

    // this.agent.show(); //debug where the agent is
    this.agent.move();

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
  }

  show(agent){
    if(this.mouseIn() || this.agentIn(agent)){
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
  constructor(cellArray, nc, nr, noiseFunc){
    this.env = cellArray; //the agents environment
    this.numCols = nc;
    this.numRows = nr;
    this.envIndex = 0; //where the agent is in its environment
    this.currentCell = this.env[this.envIndex]; //the cell object where the agent is 
    this.walk = noiseFunc;
    this.noiseX = 0.0; //used for perlin only
  }

  show(){
    fill(0, 0, 255);
    ellipse(this.currentCell.x + this.currentCell.size/2, this.currentCell.y + this.currentCell.size/2, 20, 20);
  }

  //mostly for testing but fun 
  cycle(){ //this cycles through the environment array
    this.envIndex++;

    if(this.envIndex == this.env.length){
      this.envIndex = 0;
    }

    print(this.envIndex);
    this.currentCell = this.env[this.envIndex];
  }

  //determine how to move, calls the step function 
  move(){
    let dir;
    if(this.walk == "drunk"){
      //drunk walk
      dir = floor(random(0, 4))
      this.step(dir);
    } else if(this.walk == "perlin"){
      //perlin walk
      dir = floor(noise(this.noiseX) * 4);
      this.step(dir);
      this.noiseX += 1; //why so high?
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
    let numRows = this.numRows; //lazy don't want to refactor this whole func
    let numCols = this.numCols;

    if(d == 2){
      this.envIndex++;
      //go back to row 0 by subtracting the number of rows
      if(this.envIndex % numRows == 0){
        this.envIndex -= numRows;
      }
    } else if(d == 3){
      this.envIndex--;
      //go to the last row
      if(this.envIndex % numRows == numRows - 1 || this.envIndex ==  -1){ //catch for if envIndex is -1
        this.envIndex += numRows;
      }
    } else if(d == 1){
      this.envIndex += numRows; //shift by the number of rows
      //if you are at the last column, to to subtract the array length to get to next column in the same row
      if(floor(this.envIndex/numRows) == numCols){
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