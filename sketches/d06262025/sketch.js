let grid = [];

let last3moves = [];

let agent;

let numCols, numRows


let typeMoveLookup = {
  "0": ["right", "up"],
  "1": ["left", "up"],
  "2": ["left", "down"],
  "3": ["right", "down"],
}

let possibleNextTypes = {
  left: [0, 3],
  right: [1, 2],
  down: [0, 1],
  up: [2, 3],
}

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

  if(frameCount % 20 == 0 && agent.alive){
    print("update")
    // cell.type = floor(random(0, 4));
    grid[agent.y][agent.x].update(agent.type);
    agent.update();
    console.log(agent);
  }
}

class Cell {
  constructor(x,y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.filled = false;
    this.lastMove = null;
    // this.type = floor(random(0, 4)); //for testing
  }

  draw(){
    strokeWeight(1);
    stroke(0)
    rect(this.x, this.y, this.size, this.size);

    strokeWeight(10);

    if(this.type == 0){
      //quad 1
      stroke("blue")
      line(this.x + this.size/2, this.y, this.x + this.size/2, this.y + this.size/2); //middle down
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size, this.y + this.size/2); //middle right
    } else if(this.type == 1){
      //quad 2
      stroke("green")
      line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size/2); //middle left
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y); //middle down
    } else if(this.type == 2){
      // quad 3
      stroke("red")
      line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size/2); //left side horiziontal
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y + this.size); //bottom to down
    } else if(this.type ==3){
      //quad 4
      stroke("yellow")
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y + this.size);
      line(this.x + this.size/2, this.y + this.size/2, this.x + this.size, this.y + this.size/2);
    }
  }

  update(type){
    this.filled = true;
    this.type = type;
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
    this.alive = true;
  }

  //check validity etc.
  checkValidity(x, y){
    if(grid[y][x].filled == false){
      console.log("valid");
      return true;
    } else {
      return false;
    }
  }

  getNewPosition(dir){
    let x = this.x;
    let y = this.y;

    //move in dpad direction
    // let dir = floor(random(0, 4))

    let dpad;
    // debugger;

    // ((x % numCols) + numCols) % numCols +
    if(dir == "right"){
      x++; //right
      // dpad = "right";
    } else if(dir == "left"){
      x--; //left
      // dpad = "left";
    } else if(dir == "down"){
      y++; //down
      dpad = "down";
    } else if(dir == "up"){
      y--; //up
      // dpad = "up";
    }

    //pacman rules
    if(x >= numCols){
      x = 0;
    } else if(x < 0){
      x = numCols - 1;
    }

    if(y >= numRows){
      y = 0;
    } else if(y < 0){
      y = numRows - 1;
    }

    return {x: x, y: y, dir: dir}
  }

  //update
  update(){
    //a given type has two moves
    //first check to see if either of the moves is valid

    // Make a shallow copy of the array
    let moves = [...typeMoveLookup[this.type]];
    let numTries = moves.length
    console.log(this.type, moves)
    // debugger;

    while(numTries > 0){
      let indexToTry = floor(random(0, moves.length));
      let moveToTry = moves.splice(indexToTry, 1)[0];
      console.log("move to try", moveToTry);
      //get a new position
      let nextPos =  this.getNewPosition(moveToTry);
      //check if the cell
      let isValid = this.checkValidity(nextPos.x, nextPos.y);

      // debugger;

      if(isValid){
        // debugger;
        this.x = nextPos.x;
        this.y = nextPos.y;
        // this.lastMove = nextPos.dir; //might not be needed anymore

        let nextType = floor(random(0, 2));
        console.log(nextType);
        this.type = possibleNextTypes[moveToTry][nextType]
        console.log("next type", this.type)
        break;
      }

      numTries--;
    }
    
    //future, try switching here to the opposite and repeating? need to have an exit condition though so no infinite flipflop
    if(numTries == 0){
      console.log("dead")
      this.alive = false;
    }

  }

}
