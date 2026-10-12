//another julio le parc inspiration, also so gestalt.
let grid = [];
// let borders = [];
// let movers = [];
let circSize;
let horizontalSpacing

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  reset();
  noStroke();
}

function reset(){
  // grid = [];
  // movers = [];

  let numCols = 10;
  let numRows = 10;

  horizontalSpacing = width/50; //exposing this global for drawing offset
  let verticalSpacing = height/50;

  // horizontalSpacing = 0; //exposing this global for drawing offset
  // let verticalSpacing = 0;

  let cellWidth = (width - horizontalSpacing * (numCols + 1)) / numCols;
  let cellHeight = (height - verticalSpacing * (numRows + 1)) / numRows;

  circSize = cellWidth;

  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = i * (cellHeight + verticalSpacing) + verticalSpacing;
    for(let j = 0; j < numCols; j++){
      let x = j * (cellWidth + horizontalSpacing) + horizontalSpacing;

      let mover = new Moon(x + cellWidth/2, y + cellHeight/2, circSize, j * 0.1, i * 0.1);

      row.push({x, y, w: cellWidth, h: cellHeight, mover});
    }
    grid.push(row);
  }

}

function draw() {
  background(255);

  for(let row of grid){
    for(let cell of row){
      push();
      drawingContext.beginPath();
      drawingContext.rect(cell.x, cell.y, cell.w, cell.h);
      drawingContext.clip();

      cell.mover.draw();

      pop();
    }
  }


  // if(frameCount % 30 == 0){
  //   reset();
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

function mousePressed(){
  reset();
}

class Moon {
  constructor(cx, cy, size, nx, ny){
    this.x = cx;
    this.y = cy;
    this.s = size;
    this.angle = noise(nx, ny) * TWO_PI;
    this.speed = 0.008;
    this.dir = noise(nx + 100, ny + 100) > 0.5 ? 1 : -1;
  }

  draw(){
    this.update();

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(0);
    ellipse(0, 0, this.s, this.s);
    fill(255);
    ellipse((this.s + horizontalSpacing) / 2, 0, this.s, this.s);
    pop();
  }

  update(){
    this.angle += this.speed * this.dir;
  }
}
