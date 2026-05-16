//ode to annie a

//117, 62, 43 //carmine
//102, 117, 169 //blue
//125, 37, 50 //claret
let colorArray = ['#CD5038', '#752B36', '#7A8ABB']

let numRows, numCols
let grid = [];


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numRows = 5;
  numCols = 5;
  //build blocks
  cellWidth = height/numRows;
  cellHeight = height/numCols;

  numCellsRows = 10;
  numCellsCols = 10;

  let c1;

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight
    for(let j = 0; j < numCols; j++){

      if((i+j) % 2 == 0){
        c1 = colorArray[1];
      } else {
        c1 =  colorArray[0];
      }

      // debugger;

      let x = j * cellWidth;
      grid.push(new Block(x, y, cellWidth, cellHeight, numCellsRows, numCellsCols, c1, '#7A8ABB'))
    }
  }

  noStroke();
}

function draw() {
  background(255);

  for(let c of grid){
    if(frameCount % 30 == 0){
      c.rotate();
    }
    c.draw();

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
  constructor(x, y, w, h, c1, c2){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.primary = c1;
    this.secondary = c2;
    this.orientation = floor(random(4));
  }

  draw(){
    fill(this.secondary)
    rect(this.x, this.y, this.w, this.h);

    //left  upper
    fill(this.primary);
    if(this.orientation == 0){ //left upper
      triangle(this.x, this.y, this.x + this.w, this.y, this.x, this.y + this.h);
    } else if(this.orientation == 1){ //left lower
      triangle(this.x, this.y, this.x, this.y + this.h, this.x + this.w, this.y + this.h);
    } else if(this.orientation == 2){ //right upper
      triangle(this.x, this.y, this.x + this.w, this.y, this.x + this.w, this.y + this.h);
    } else if(this.orientation == 3){ //right lower
      triangle(this.x + this.w, this.y, this.x + this.w, this.y + this.h, this.x, this.y + this.h);
    } else {
      rect(this.x, this.y, this.w, this.h);
    }

    // fill(0);
    // text(this.orientation, this.x + 10, this.y + 10);
  }

  rotate(){
    this.orientation = floor(random(4));
  }
}

class Block {
  constructor(cx, cy, bw, bh, numCols, numRows, color1, color2){
    this.cells = [];
    // debugger;
    // this.primaryColor = color1
    // this.secondaryColor = color2

    let cellWidth = bw/numRows;
    let cellHeight = bh/numCols;

    for(let i = 0; i < numRows; i++){
      let y = i * cellHeight
      for(let j = 0; j < numCols; j++){
        let x = j * cellWidth;
        this.cells.push(new Cell(cx + x, cy + y, cellWidth, cellHeight, color1, color2))
      }
    }
  }

  draw(){
    for(let c of this.cells){
      c.draw();
    }
  }

  rotate(){
    for(let c of this.cells){
      c.rotate();
    }
  }
}

