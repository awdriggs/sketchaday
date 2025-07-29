let grid = [];

let last3moves = [];

let agents = [];

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

  numCols = 50;
  numRows = 50;

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
  numAgents = 10;
  for(let i = 0; i < numAgents; i++){
    // let startX = floor(random(0, numCols));
    // let startY = floor(random(0, numRows));

    // let agent = new Agent(startX, startY, floor(random(0, 4)));
    // agent.path = [{x: startX, y: startY, type: agent.type}];

    agents.push(spawnAgent());
  }
}

function draw(){
  background(255);

  for(let row of grid){
    for(let cell of row){
      cell.draw();
    }
  }

  if(frameCount % 5 == 0){
    // Phase 1: All agents decide their moves and update positions
    for(let agent of agents){
      if(agent.alive == true){
        print("update")
        agent.update();
      }
    }

    // Phase 2: All agents write to the grid after all moves are decided
    for(let agent of agents){
      if(agent.alive == true){
        grid[agent.y][agent.x].update(agent.type, agent.color);
      }
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

function spawnAgent() {
  let newLoc = findEmptyCell();

  if(newLoc){
    let agent = new Agent(newLoc.x, newLoc.y, floor(random(0, 4)));
    agent.path = [{x: newLoc.x, y: newLoc.y, type: agent.type}];
    return agent
  }
}

// More thorough - check all cells if needed
function findEmptyCell() {
  // First try random positions (faster when grid is mostly empty)
  for(let i = 0; i < 20; i++) {
    let x = floor(random(0, numCols));
    let y = floor(random(0, numRows));
    if(!grid[y][x].filled) return {x: x, y: y};
  }

  // If that fails, systematically check all cells
  for(let y = 0; y < numRows; y++) {
    for(let x = 0; x < numCols; x++) {
      if(!grid[y][x].filled) return {x: x, y: y};
    }
  }
  return null; // grid is completely full
}

class Cell {
  constructor(x,y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.filled = false;
    this.lastMove = null;
    this.color = null;
    // this.type = floor(random(0, 4)); //for testing
  }

  draw(){
    strokeWeight(1);
    stroke(0)
    // rect(this.x, this.y, this.size, this.size);

    strokeWeight(1);

    if(this.type == 0){
      //quad 1
      // stroke("blue");
      // stroke(this.color)
      // arc(this.x + this.size, this.y, this.size, this.size, HALF_PI, PI)
      line(this.x + this.size/2, this.y, this.x + this.size, this.y + this.size/2)
    } else if(this.type == 1){
      //quad 2
      // stroke("green")
      // stroke(this.color)
      // line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size/2); //middle left
      // line(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2, this.y); //middle down
      // arc(this.x, this.y, this.size, this.size, 0, HALF_PI)
      line(this.x + this.size/2, this.y, this.x, this.y + this.size/2)
    } else if(this.type == 2){
      // quad 3
      // stroke("red")
      // stroke(this.color)
      line(this.x, this.y + this.size/2, this.x + this.size/2, this.y + this.size)
    } else if(this.type ==3){
      //quad 4
      // stroke("yellow")
      // stroke(this.color)
      // arc(this.x + this.size, this.y + this.size, this.size, this.size, PI, HALF_PI * 3)
      line(this.x + this.size/2, this.y + this.size, this.x + this.size, this.y + this.size/2);
    }
  }

  update(type, c){
    this.filled = true;
    this.type = type;
    this.color = c
  }

  // Method to clear a cell (for backtracking)
  clear(){
    this.filled = false;
    this.type = undefined;
  }
}

class Agent {
  constructor(startX, startY, startType){
    this.x = startX;
    this.y = startY;
    this.type = startType;
    this.alive = true;
    this.backtrackAttempts = 0; // Track how many times we've backtracked
    this.maxBacktracks = 10; // More reasonable limit - should rarely need this many
    // this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.color = random(0, 200); 
    this.path = []
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

    if(dir == "right"){
      x++; //right
    } else if(dir == "left"){
      x--; //left
    } else if(dir == "down"){
      y++; //down
    } else if(dir == "up"){
      y--; //up
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

  // Method to backtrack one step
  backtrack(){
    console.log("Attempting to backtrack...");

    // Can't backtrack if we're at the starting position or have no path
    if(this.path.length <= 1){
      console.log("Cannot backtrack - at starting position");
      return false;
    }

    // Clear the current cell
    grid[this.y][this.x].clear();

    // Remove current position from path
    this.path.pop();

    // Move back to previous position
    let previousState = this.path[this.path.length - 1];
    this.x = previousState.x;
    this.y = previousState.y;
    this.type = previousState.type;

    console.log(`Backtracked to position (${this.x}, ${this.y}) with type ${this.type}`);

    this.backtrackAttempts++;
    return true;
  }

  //update
  update(){
    // Make a shallow copy of the array
    let moves = [...typeMoveLookup[this.type]];
    let numTries = moves.length
    console.log(this.type, moves)

    while(numTries > 0){
      let indexToTry = floor(random(0, moves.length));
      let moveToTry = moves.splice(indexToTry, 1)[0];
      console.log("move to try", moveToTry);

      //get a new position
      let nextPos = this.getNewPosition(moveToTry);

      //check if the cell is valid
      let isValid = this.checkValidity(nextPos.x, nextPos.y);

      if(isValid){
        // Move to new position
        this.x = nextPos.x;
        this.y = nextPos.y;

        let nextType = floor(random(0, 2));
        console.log(nextType);
        this.type = possibleNextTypes[moveToTry][nextType]
        console.log("next type", this.type)

        // Add new position to path
        this.path.push({x: this.x, y: this.y, type: this.type});

        return; // Successfully moved
      }

      numTries--;
    }

    // No valid moves found - try to backtrack
    console.log("No valid moves found");

    if(this.backtrackAttempts < this.maxBacktracks && this.backtrack()){
      console.log("Backtracked successfully, trying again...");
      // Try again from the previous position
      this.update();
    } else {
      console.log("Cannot backtrack further or max backtracks reached - agent dies");

      //looke for new location to move to...
      let newLoc = findEmptyCell();

      if(newLoc){
        this.x = newLoc.x;
        this.y = newLoc.y;
      } else {
        this.alive = false;
      }
    }
  }
}
