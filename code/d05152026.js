//ode to annie a

//117, 62, 43 //carmine
//102, 117, 169 //blue
//125, 37, 50 //claret
let colorArray = ['#CD5038', '#7A8ABB']

let numRows, numCols
let grid = [];


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numRows = 10;
  numCols = 10;
  cellWidth = height/numRows;
  cellHeight = height/numCols;

  for(let i = 0; i < numRows; i++){
    let y = i * cellHeight
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;
      grid.push(new Cell(x, y, cellWidth, cellHeight, colorArray[0], colorArray[1]))
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

