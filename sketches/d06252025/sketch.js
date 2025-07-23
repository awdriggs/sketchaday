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

  if(frameCount % 20 == 0 && agent.alive){
    print("update")
    // cell.type = floor(random(0, 4));
    agent.update();
    console.log(agent);
    // debugger;

    if(agent.alive){
      grid[agent.y][agent.x].update(floor(random(0, 4)));
    }
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
    if(dir == 0){
      x++; //right
      dpad = "right";
    } else if(dir == 1){
      x--; //left
      dpad = "left";
    } else if(dir == 2){
      y++; //down 
      dpad = "down";
    } else if(dir == 3){
      y--; //up
      dpad = "up";
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

    return {x: x, y: y, dir: dpad}
  }

  //update
  update(){
    //store current position to revert back to if needed
    // let lastX = this.x;
    // let lastY = this.y;

    let tries = [0, 1, 2, 3]; //you get 4 tries

    while(tries.length > 0){
      let indexToTry = floor(random(0, tries.length));

      let typeToTry = tries.splice(indexToTry, 1);
      //get a new position
      let nextPos =  this.getNewPosition(typeToTry);
      //check if the cell
      let isValid = this.checkValidity(nextPos.x, nextPos.y);

      if(isValid){
        this.x = nextPos.x;
        this.y = nextPos.y;
        this.lastMove = nextPos.dir;
        break;
      }
    }

    if(tries.length == 0){
      console.log("dead")
      this.alive = false;
    }
    // this.x = (this.x++) % numCols
  }
}
