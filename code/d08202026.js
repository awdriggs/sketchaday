//rect packing a gridded space
let grid = [];
let rects = [];
let numRows = 10;
let numCols = 10;
let size;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  size = width/numCols; //grid size and used for rect drawignss
  resetGrid();
}

function draw() {
  background(255);

  // for(let row of grid){
  //   for(let cell of row){
  //     cell.draw();
  //   }
  // }

  noStroke();
  for(let r of rects){
    fill(r.fill);
    rect(r.x * size, r.y * size, r.w * size, r.h * size);
  }


  if(frameCount % 60 == 0){
    resetGrid();
  }
}

function resetGrid(){
  rects = [];
  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = []
    let y = i * size;
    for(let j = 0; j < numCols; j++){
      let x = j * size;
      row.push(new Cell(x, y, size));
    }
    grid.push(row);
  }

  scanAndFill();
}

function getFilledPercent(){
    return grid.reduce((sum, row) => sum + row.filter(c => c.filled).length, 0) / (numRows * numCols);
}

function scanAndFill() {
  //scan from left to right, find an empty, fill it with a random width/height
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      //if cell is free, generate a new shape
      //create a shape
      if(grid[i][j].filled == false){
        makeRect(j, i);
      }
    }
  }
}

function makeRect(x, y) {
  let w = floor(random(1, min(numCols/2, numCols - x) + 1));
  let h = floor(random(1, min(numRows/2, numRows - y) + 1));

  let valid = true;
  for(let i = 0; i < h; i++){
    for(let j = 0; j < w; j++){
      if(grid[y + i][x + j].filled == true) {
        valid = false;
        break;
      }
    }
  }

  if(valid){
    rects.push({x: x, y: y, w: w, h: h, fill: color(random(255), random(255), random(255))});
    markFilled(x, y, w, h);
  } else {
    // fallback: claim just this one cell
    rects.push({x: x, y: y, w: 1, h: 1, fill: color(random(255), random(255), random(255))});
    markFilled(x, y, 1, 1);
  }
}

function markFilled(x, y, w, h) {
  for(let i = y; i < y + h; i++){
    for(let j = x; j < x + w; j++){
      grid[i][j].filled = true;
    }
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

class Cell {
  constructor(x, y, s){
    this.x = x;
    this.y = y;
    this.size = s;
    this.filled = false;
  }

  draw(){
    stroke(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}

