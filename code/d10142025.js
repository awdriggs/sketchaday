let grid, emptyCells, agents;
let numCols, numRows;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 100;
  numRows = 100;

  start();

  noStroke();
}

let lastNumEmpty;

function draw() {
  background(255);
  emptyCells = []; //reset empty cell
  let agentsToKeep = [];

  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let c = grid[i][j];
      c.draw();

      if(c.fill == 255){
        emptyCells.push([i, j]); //if the cell is still empty add it back to the empty cell array
      }
    }
  }

  //loop through agents
  for(let a of agents){
    a.checkSize(); //see if you are larger than your maxSize

    if(a.growX || a.growY || a.growXNeg || a.growYNeg){
      a.grow();
      agentsToKeep.push(a);

    // } else if(a.alive == true){

    //   let children = newAgents(a.color, a.startX, a.startY, a.startX + a.w, a.startY + a.h);
    //   agentsToKeep.push(...children);  // Add children to the keep list
    //   a.alive = false;
    //   a.alive = false;
    // }


  }  else if(a.alive == true){
  // console.log(`Subdividing parent at (${a.startX}, ${a.startY}), size ${a.w}x${a.h}`);
  let available = findEmpty(a.startX, a.startY, a.startX + a.w, a.startY + a.h, a.color);
  // console.log(`Available cells: ${available.length}`);
  let children = newAgents(a.color, a.startX, a.startY, a.startX + a.w, a.startY + a.h);
  // console.log(`Children alive: ${children.filter(c => c.alive).length}`);
  agentsToKeep.push(...children);
  a.alive = false;
}
  }


  if(lastNumEmpty == emptyCells.length && emptyCells.length != 0){
    let fillers = newAgents(255, 0, 0, numCols, numRows);
    agentsToKeep.push(...fillers);
  }


  lastNumEmpty = emptyCells.length;

  // if(frameCount == 1){
  //   saveGif('thumb', floor(random(3, 5)));
  // }

  agents = agentsToKeep;
}

function start(){
  emptyCells = [];
  grid = [];

  let cellSize = width/numCols;

  for(let i = 0; i < numRows; i++){
    let aRow = [];
    let y = i * cellSize;
    for(let j = 0; j < numCols; j++){

      let x = j * cellSize;
      aRow.push(new Cell(x, y, cellSize))

      emptyCells.push([i, j]); //all cells start as empty so add it now

    }
    grid.push(aRow);
  }

  //color, minX, minY, maxX, maxY

  agents = newAgents(255, 0, 0, numCols, numRows);
}

function newAgents(targetColor, minX, minY, maxX, maxY){
  let newAgents = []

  let numAgents = 4;
  for(let i = 0; i < numAgents; i++){
    let w = floor(random(10, 50));
    let h = floor(random(10, 50));

    newAgents.push(new Rectangle(w, h, minX, minY, maxX, maxY, targetColor));
  }

  return newAgents
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function findEmpty(minX, minY, maxX, maxY, targetColor){
  //function to find all the empty cells within an area
  let empties = [];

  for(let r = minY; r < maxY; r++){
    for(let c = minX; c < maxX; c++){
      let cell = grid[r][c];
      if(cell.fill == targetColor){
        empties.push([r, c]);
      }
    }
  }

  return empties;
}

class Cell {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.fill = 255;
  }

  draw(){
    fill(this.fill);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Rectangle {
  constructor(maxW, maxH, parentMinX, parentMinY, parentMaxX, parentMaxY, canFill){
    this.maxWidth = maxW;
    this.maxHeight = maxH;
    this.targetColor = canFill

    this.minX = parentMinX;
    this.minY = parentMinY;
    this.maxX = parentMaxX;
    this.maxY = parentMaxY;


    this.init(); //initialize
  }

  init(){
    //find and empty cell.
    //empty cell is a 1d array of indices
    let emptyCells = findEmpty(this.minX, this.minY, this.maxX, this.maxY, this.targetColor);

    if(emptyCells.length > 0){
      let randomIndex = floor(random(emptyCells.length));
      let cell = emptyCells[randomIndex];

      this.startX = cell[1]
      this.startY = cell[0]

      this.vLoc = cell[0]
      this.hLoc = cell[1]
      this.w = 1;
      this.h = 1;

      this.growX = true;
      this.growY = true;
      this.growXNeg = true;
      this.growYNeg = true;
      this.growing = true;
      this.color = color(random(0, 255), random(0,255), random(0,255));
      // this.color = 0;

      this.alive = true;

      //claim cell
      grid[this.vLoc][this.hLoc].fill = this.color;
    } else {
      console.log("no space to grow, empty")
      // this.alive = false;
    }
  }

  checkSize(){
    if(this.w > this.maxWidth){
      this.growX = false;
      this.growXNeg = false;
    }

    if(this.h > this.maxHeight){
      this.growY = false;
      this.growYNeg = false;
    }
  }

  grow(){
    if(this.growX && this.hLoc + 1 < this.maxX){
      let nextX = this.hLoc + 1;

      //see if the new column can be added
      let addCol = true; //assume yes
      let cellsToFlip = [];
      for(let i = 0; i < this.h; i++){
        //cell to check
        let cell = grid[this.startY + i][nextX];

        if(cell.fill == this.targetColor){
          cellsToFlip.push(cell); //add cell to array
        } else { //any cell in the column is taken, stop
          addCol = false;
          break;
        }
      }

      if(addCol){ //if the whole col can be added
        this.hLoc++; //update to the new leading horiziontal position
        this.w++; //update the width
        for(let c of cellsToFlip){
          c.fill = this.color;
        }
      } else {
        this.growX = false; //stop trying to grow in the x location
      }
    }

    //same logic for y
    if(this.growY && this.vLoc + 1 < this.maxY){
      let nextY = this.vLoc + 1;

      let addRow = true;
      let cellsToFlip = [];

      for(let i = 0; i < this.w; i++){
        let cell = grid[nextY][this.startX + i];

        if(cell.fill == this.targetColor){
          cellsToFlip.push(cell);
        } else {
          addRow = false;
          break
        }
      }

      if(addRow){
        this.vLoc++;
        this.h++;
        for(let c of cellsToFlip){
          c.fill = this.color;
        }
      } else {
        this.growY = false;
      }
    }

    //grow -x dir
    if(this.growXNeg && this.startX - 1 >= this.minX){
      let nextX = this.startX - 1;

      //see if the new column can be added
      let addCol = true; //assume yes
      let cellsToFlip = [];
      for(let i = 0; i < this.h; i++){
        //cell to check
        let cell = grid[this.startY + i][nextX];

        if(cell.fill == this.targetColor){
          cellsToFlip.push(cell); //add cell to array
        } else { //any cell in the column is taken, stop
          addCol = false;
          break;
        }
      }

      if(addCol){ //if the whole col can be added
        this.startX--; //update to the new leading horiziontal position
        this.w++; //update the width
        for(let c of cellsToFlip){
          c.fill = this.color;
        }
      } else {
        this.growXNeg = false; //stop trying to grow in the x location
      }
    }

    //grow -y dir
    if(this.growYNeg && this.startY - 1 >= this.minY){
      let nextY = this.startY -  1;

      let addRow = true;
      let cellsToFlip = [];

      for(let i = 0; i < this.w; i++){
        let cell = grid[nextY][this.startX + i];

        if(cell.fill == this.targetColor){
          cellsToFlip.push(cell);
        } else {
          addRow = false;
          break
        }
      }

      if(addRow){
        this.startY--;
        this.h++;
        for(let c of cellsToFlip){
          c.fill = this.color;
        }
      } else {
        this.growYNeg = false;
      }
    }
  }
}
