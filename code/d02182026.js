//grid division
let grids = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numRows = 4;
  let numCols = 2;

  let divHeight = height/numRows;
  let divWidth = width/numCols;

  for(let i = 0; i < numRows; i++){
    let y = i * divHeight
    for(let j = 0; j < numCols; j++){
      let x = j * divWidth
      let grid = new Grid(x, y, divWidth, divHeight, 10, 10, true);
      grids.push(grid);
    }
  }
  // staticGrid = new Grid(width, height, 100, 100, false, 200, 0.5);
}

function draw() {
  background(255);

  // staticGrid.draw();

  let update = frameCount % 60 == 0;

  let x, y;

  if(update){
    x = random(0, width);
    y = random(0, height)
  }

  for(let grid of grids){
    if(update){
      grid.update(x, y);
    }
    grid.draw();
  }
}

function mousePressed(){
  for(let grid of grids){
    grid.update(mouseX, mouseY);
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

class Grid {
  constructor(x,y, w, h, numCols, numRows, diagonals = false, strokeColor = 0, strokeWeight = 1){
    this.x = x; //corner x
    this.y = y; //corner y
    this.w = w;
    this.h = h;
    this.numCols = numCols;
    this.numRows = numRows;
    this.maxRows = numRows;
    this.maxCols = numCols;
    this.diagonals = diagonals;
    this.weight = strokeWeight;
    this.color = strokeColor;
    this.buildCells(); //creates the cells array
  }

  buildCells(){

    this.cellW = this.w/this.numCols;
    this.cellH = this.h/this.numRows;

    this.cells = [];

    for(let i = 0; i < this.numRows; i++){
      let y = this.y + i * this.cellH;
      for(let j = 0; j < this.numCols; j++){
        let x = this.x + j * this.cellW;
        this.cells.push({x: x, y: y});
      }
    }

  }

  draw(){
    strokeWeight(this.weight);
    for(let c of this.cells){
      // console.log('ey');
      noFill();
      rect(c.x, c.y, this.cellW, this.cellH);
    }

    if(this.diagonals){
      strokeWeight(this.weight * 2);
      //row diagonals
      for(let i = 0; i < this.numRows; i++){
        let startY = this.y + i * this.cellH;
        let endY = this.y + (i + 1) * this.cellH;
        let startX = this.x;
        let endX = this.x + this.w;
        line(startX, startY, endX, endY);
      }

      //col diagonals
      for(let i = 0; i < this.numCols; i++){
        let startX = this.x + i * this.cellW;
        let endX = this.x + (i + 1) * this.cellW;
        let startY = this.y;
        let endY = this.y + this.h;
        line(startX, startY, endX, endY);
      }
    }
  }

  mouseIn(x, y){
    if(x > this.x && x < this.x + this.w &&  y > this.y && y < this.y + this.h){
      //print in
      // console.log(this, "mouse in");
      return true;
    } else {
      return false;
    }
  }

  update(x, y){
    if(this.mouseIn(x, y)){
      //where si the mouse within the grid?
      let mX = x - this.x;
      let mY = y - this.y;

      this.numCols = floor(constrain(mX/(this.w), 0, 1) * this.maxCols) + 1
      this.numRows = floor(constrain(mY/(this.h), 0, 1) * this.maxRows) + 1
      this.buildCells();
    }

  }
}
