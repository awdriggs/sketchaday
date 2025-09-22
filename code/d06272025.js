let grid = [];

let last3moves = [];

let agent;

let numCols, numRows

// Stack to keep track of agent's path for backtracking
let agentPath = [];

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
  
  // Initialize path with starting position
  agentPath = [{x: startX, y: startY, type: agent.type}];
}

function draw(){
  background(255);

  for(let row of grid){
    for(let cell of row){
      cell.draw();
    }
  }

  // Draw agent's current position
  // if(agent.alive){
  //   // fill(255, 0, 255, 100); // Purple highlight for current position
  //   let cellSize = width/numCols;
  //   // rect(agent.x * cellSize, agent.y * cellSize, cellSize, cellSize);
  // }

  if(frameCount % 20 == 0 && agent.alive){
    print("update")
    grid[agent.y][agent.x].update(agent.type);
    agent.update();
    console.log(agent);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
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
  
  // Method to clear a cell (for backtracking)
  clear(){
    this.filled = false;
    this.type = undefined;
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
    this.backtrackAttempts = 0; // Track how many times we've backtracked
    this.maxBacktracks = 10; // More reasonable limit - should rarely need this many
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
    if(agentPath.length <= 1){
      console.log("Cannot backtrack - at starting position");
      return false;
    }
    
    // Clear the current cell
    grid[this.y][this.x].clear();
    
    // Remove current position from path
    agentPath.pop();
    
    // Move back to previous position
    let previousState = agentPath[agentPath.length - 1];
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
        agentPath.push({x: this.x, y: this.y, type: this.type});
        
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
      this.alive = false;
    }
  }
}