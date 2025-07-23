let grid = [];

let last3moves = [];

let agent;

let numCols, numRows

function setup(){
  createCanvas(800, 800);

  numCols = 10;
  numRows = 10;

  let cellSize = width/numCols;

  for(let i = 0; i < numRows; i++){
    let row = [];
    for(let j = 0; j < numCols; j++){
      let x = j * cellSize;
      let y = i * cellSize;
      row.push(new Cell(x, y, cellSize));
    }
    grid.push(row);
  }

  //start a new agent at a random position and random type
  let startX = floor(random(0, numCols));
  let startY = floor(random(0, numRows));
  agent = new Agent(startX, startY, floor(random(0, 4)));
}

function draw(){
  background(255);

  for(let row of grid){
    for(let cell of row){
      cell.draw();
    }
  }

  if(frameCount % 20 == 0){
    // cell.type = floor(random(0, 4));
    agent.update();
    console.log(agent);
    // debugger;

    grid[agent.y][agent.x].type = floor(random(0, 4));
    // cell.x = agent.x;
    // cell.y = agent.y;
  }
}

class Cell {
  constructor(x,y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.filled = false;
    // this.type = floor(random(0, 4)); //for testing
  }

  draw(){
    // rect(this.x, this.y, this.size, this.size);
    strokeWeight(10);

    if(this.type == 0){
      line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size/2);
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y + this.size);
    } else if(this.type == 1){
      line(this.x + this.size/2, this.y, this.x + this.size/2, this.y + this.size/2);
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size, this.y + this.size/2);
    } else if(this.type == 2){
      line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size/2);
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y);
    } else if(this.type ==3){
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y + this.size);
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size, this.y + this.size/2);
    }
  }

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Agent {
  constructor(startX, startY, startType){
    this.x = startX;
    this.y = startY;
    this.type = startType;
  }

  //check validity etc.

  //update
  update(){
    //move in dpad direction
    //check if the cell
    let dir = floor(random(0, 4))
    // debugger;

    // ((x % numCols) + numCols) % numCols +
    if(dir == 0){
      this.x++;
    } else if(dir == 1){
      this.x--;
    } else if(dir == 2){
      this.y++;
    } else if(dir == 3){
      this.y--;
    }

    if(this.x >= numCols){
      this.x = 0;
    } else if(this.x < 0){
      this.x = numCols - 1;
    }

    if(this.y >= numRows){
      this.y = 0;
    } else if(this.y < 0){
      this.y = numRows - 1;
    }
    // this.x = (this.x++) % numCols
  }
}
