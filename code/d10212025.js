
let grid, emptyCells, agents;
let numCols, numRows;
let cellSize

let rects = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 10;
  numRows = 10;

  start();
  buildGrid(); //this uses recursion
  //when you get to here the grid wil be built
  createRects(agents);

  noStroke();
}

let lastNumEmpty;

function draw() {
  background(255);

   for(let r of rects){
    r.draw();
  }

}

function mousePressed(){
  start();
  buildGrid();
  createRects(agents);
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

  let numAgents = 4;
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

class Rect {
  constructor(x, y, w, h, fc, gc){
    this.width = w;
    this.height = h;
    this.cornerX = x;
    this.cornerY = y;
    this.fc = fc;
    this.gc = gc;

    this.init();
  }

  init() {
    this.grid = [];

    let minWidth = this.width/20;
    let maxWidth = this.width/10;
    let minHeight = this.height/20;
    let maxHeight = this.height/10;

    // Track relative position, not absolute
    let relX = 0;
    let row = [];

    while(relX < this.width){
      let w = random(minWidth, maxWidth);

      if(this.width - (relX + w) < minWidth){
        w = this.width - relX;
      } else if(relX + w > this.width){
        w = this.width - relX;
      }

      // Use absolute position for Poly constructor
      row.push(new Poly(this.cornerX + relX, this.cornerY, w, random(minHeight, maxHeight), this.fc, this.gc));
      relX += w;
    }

    this.grid.push(...row);

    for(let i = 0; i < row.length; i++){
      let relY = row[i].h; // Start relative to cornerY
      let x = row[i].cornerX;
      let w = row[i].w;

      while(relY < this.height){
        let h = random(minHeight, maxHeight);

        if(this.height - (relY + h) < minHeight){
          h = this.height - relY;
        } else if(relY + h > this.height){
          h = this.height - relY;
        }

        this.grid.push(new Poly(x, this.cornerY + relY, w, h, this.fc, this.gc));
        relY += h;
      }
    }
  }

  draw(){
    for(let c of this.grid){
      c.draw();
    }
  }
}

class Poly {
  constructor(cornerX, cornerY, w, h, fill, groundFill){
    this.cornerX = cornerX;
    this.cornerY = cornerY;
    this.w = w;
    this.h = h;
    this.margin = this.w/4;
    this.x1 = this.cornerX + this.margin * random(0.25, 0.75);
    this.y1 = this.cornerY + this.margin * random(0.25, 0.75);
    this.x2 = this.cornerX + this.w - this.margin * random(0.25, 0.75);
    this.y2 = this.cornerY + this.margin * random(0.25, 0.75);
    this.x3 = this.cornerX + this.w - this.margin * random(0.25, 0.75);
    this.y3 = this.cornerY + this.h - this.margin * random(0.25, 0.75);
    this.x4 = this.cornerX + this.margin * random(0.25, 0.75);
    this.y4 = this.cornerY + this.h - this.margin * random(0.25, 0.75);

    // debugger;
    //colors
    this.groundFill = groundFill;
    this.fill = fill;
  }

  draw(){
    //draw the ground
    fill(this.groundFill);
    rect(this.cornerX, this.cornerY, this.w, this.h);

    fill(this.fill);
    //draw the poly
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y2);
    vertex(this.x3, this.y3);
    vertex(this.x4, this.y4);
    endShape(CLOSE);

  }
}

