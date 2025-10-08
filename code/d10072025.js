let grid = []
let emptyCells = [];
let agents = [];
let numCols, numRows;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 100;
  numRows = 100;

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

  let numAgents = 200;
  for(let i = 0; i < numAgents; i++){
    agents.push(new Rectangle(10, 10));
  }

  noStroke();
}

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
    a.grow();
  }

  console.log(emptyCells.length);

  // if(frameCount == 1){
  //   saveGif('thumb', floor(random(3, 8)));
  // }
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
    this.vLoc = cell[0]
    this.hLoc = cell[1]


    this.growX = true;
    this.growY = true;
    this.growing = true;
    this.color = color(random(0, 255), random(0,255), random(0,255));
    // this.color = 0;

    //claim cell
    grid[this.vLoc][this.hLoc].fill = this.color;
  }

  grow(){
    this.hLoc++;

    if(this.growX && this.hLoc < numCols){
      if(grid[this.vLoc][this.hLoc].fill == 255){
        grid[this.vLoc][this.hLoc].fill = this.color
      }
    } else {
      this.growX = false;
    }


    if(this.growY){

    }

  }

}
