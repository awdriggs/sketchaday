
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
  emptyCells = []; //reset empty cells

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
    }
  }

  if(lastNumEmpty == emptyCells.length && emptyCells.length != 0){
    newAgents();
  } else {
    lastNumEmpty = emptyCells.length;
  }

  // if(frameCount == 1){
  //   saveGif('thumb', floor(random(3, 8)));
  // }
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

  newAgents();

 }

function newAgents(){
  agents = [];

 let numAgents = 2;
  for(let i = 0; i < numAgents; i++){
    let w = floor(random(10, 50));
    let h = floor(random(10, 50));

    agents.push(new Rectangle(w, h));
  }
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

function findEmpty(){
  //function to find all the empty cells
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
  constructor(maxW, maxH){
    this.maxWidth = maxW;
    this.maxHeight = maxH;

    this.init(); //initialize
  }

  init(){
    //find and empty cell.
    //empty cell is a 1d array of indices
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

    //claim cell
    grid[this.vLoc][this.hLoc].fill = this.color;
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
    if(this.growX && this.hLoc + 1 < numCols){
      let nextX = this.hLoc + 1;

      //see if the new column can be added
      let addCol = true; //assume yes
      let cellsToFlip = [];
      for(let i = 0; i < this.h; i++){
        //cell to check
        let cell = grid[this.startY + i][nextX];

        if(cell.fill == 255){
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
    if(this.growY && this.vLoc + 1 < numRows){
      let nextY = this.vLoc + 1;
      
      let addRow = true;
      let cellsToFlip = [];

      for(let i = 0; i < this.w; i++){
        let cell = grid[nextY][this.startX + i];

        if(cell.fill == 255){
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
    if(this.growXNeg && this.startX - 1 >= 0){
      let nextX = this.startX - 1;

      //see if the new column can be added
      let addCol = true; //assume yes
      let cellsToFlip = [];
      for(let i = 0; i < this.h; i++){
        //cell to check
        let cell = grid[this.startY + i][nextX];

        if(cell.fill == 255){
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
    if(this.growYNeg && this.startY - 1 >= 0){
      let nextY = this.startY -  1;
      
      let addRow = true;
      let cellsToFlip = [];

      for(let i = 0; i < this.w; i++){
        let cell = grid[nextY][this.startX + i];

        if(cell.fill == 255){
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
