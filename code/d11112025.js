let numBoxes = 8;
let boxes = [];

let grid, emptyCells, agents;
let numCols, numRows;
let cellSize

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 10;
  numRows = 10;

  start();
  buildGrid(); //this uses recursion
  //when you get to here the grid wil be built
  boxes = generateBoxes(agents);

  noLoop();
  noStroke();
}

let lastNumEmpty;

function draw() {
  background(255);

  for(let b of boxes){
    b.draw()
  }
}

function mousePressed(){
  start();
  buildGrid();
  boxes = generateBoxes(agents);

  redraw();
}

function start(){
  emptyCells = [];
  grid = [];

  cellSize = width/numCols;

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

  let numAgents = numBoxes;
  for(let i = 0; i < numAgents; i++){
    let w = floor(random(10, 50));
    let h = floor(random(10, 50));

    agents.push(new Rectangle(w, h));
  }
}

function buildGrid(){
  emptyCells = []; //reset empty cells

  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let c = grid[i][j];

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

  if(emptyCells.length > 0){
    buildGrid() //recursion
  }
}

function createRects(agents) {
  //loop through the agents, make a Rect for each grid rectangle
  for(let a of agents){
    // debugger;
    let x = a.startX * cellSize;
    let y = a.startY * cellSize;
    let w = a.w * cellSize;
    let h = a.h * cellSize;

    rects.push(new Rect(x, y, w, h, color(random(0, 255), random(0, 255), random(0, 255)), color(random(0, 255), random(0, 255), random(0,255))));

  }
}

function generateBoxes(agents){
  let boxes = [];

  for(let a of agents){
    // debugger;
    let x = a.startX * cellSize;
    let y = a.startY * cellSize;
    let w = a.w * cellSize;
    let h = a.h * cellSize;

    boxes.push(new gradientBox(x, y, w, h));
  }

  return boxes
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function setColors(){
  let colors = [];
  let allColors = [color("#D3A7A0"), color("#104E4E"), color("#8E6E3D"), color("#D36E22"), color("#0B0811"), color("#E4C09D"), color("#E4C09D"), color("#8F5D25")];
  // let allColors = [color(255), color(0)];

  allColors = shuffle(allColors);

  //build the colors array from the options.
  //choose one, two, or three colors
  numColors = floor(random(1, 4));
  // numColors = 3

  if(numColors == 1){
    colors.push(allColors[0]);
  } else if(numColors == 2){
    colors.push(allColors[0]);
    colors.push(allColors[1]);
  } else {
    colors.push(allColors[0]);
    colors.push(allColors[1]);
    colors.push(allColors[0]);
  }

  console.log(colors);
  return colors;
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

class gradientBox {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colors = setColors(); //call the global set colors function
    this.opacity = floor(random(128, 255))
  }
  // fill(red(c), green(c), blue(c), 128); // alpha 0-255

  draw(){
    //build a gradient from the colors array
    if(this.colors.length == 1){
      fill(this.colors[0]);
      rect(this.x, this.y, this.w, this.h);
    } else if(this.colors.length == 2){
      for(let i = 0; i < this.w; i++){
        fill(lerpColor(this.colors[0], this.colors[1], i/this.w));
        rect(this.x + i, this.y, 1.5, this.h);
      }
    } else if(this.colors.length == 3){
      for(let i = 0; i < this.w/2; i++){
        fill(lerpColor(this.colors[0], this.colors[1], i/(this.w/2)));
        rect(this.x + i, this.y, 1.5, this.h);
      }

      for(let i = this.w/2; i < this.w; i++){
        fill(lerpColor(this.colors[1], this.colors[0], (i-this.w/2)/(this.w/2)));
        rect(this.x + i, this.y, 1.5, this.h);
      }
    }
  }
}


