let grid = [];
let borders = [];
let movers = [];
let circSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  reset();
  noStroke();
}

function reset(){
  // grid = [];
  movers = [];

  let numCols = 10;
  let numRows = 10;

  let horizontalSpacing = width/30;
  let verticalSpacing = height/30;

  let cellWidth = (width - horizontalSpacing * (numCols + 1)) / numCols;
  let cellHeight = (height - verticalSpacing * (numRows + 1)) / numRows;

  circSize = cellWidth;

  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = i * (cellHeight + verticalSpacing) + verticalSpacing;
    for(let j = 0; j < numCols; j++){
      let x = j * (cellWidth + horizontalSpacing) + horizontalSpacing;

      let cellMovers = [];
        cellMovers.push(new Rotator(x + cellWidth/2, y + cellHeight/2, cellWidth * 0.4, circSize));

      row.push({x, y, w: cellWidth, h: cellHeight, movers: cellMovers});
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

      for(let mover of cell.movers){
        mover.update();
        fill(0);
        mover.draw();
      }

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

class Rotator {
  constructor(cx, cy, r, s){
    this.centerPoint = createVector(cx, cy);
    this.angle = random(TWO_PI);
    this.speed = random(0.001, 0.01);
    this.dir = random() ? -1 : 1;
    this.radius = r; //distance ftrom center to position
    this.size = s;
    this.loc = createVector(this.centerPoint.x + cos(this.angle) * this.radius, this.centerPoint.y + sin(this.angle) * this.radius)
  }

  draw(){
    ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }

  update(){
    this.angle += this.speed * this.dir;
    this.loc = createVector(this.centerPoint.x + cos(this.angle) * this.radius, this.centerPoint.y + sin(this.angle) * this.radius)
  }
}



