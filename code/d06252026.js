let noiseAreas = []
let cellSize
let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  cellSize = 50 * width/800;
  generate();
  // noFill();
  fill(0);
}

function draw() {
  background(255);
  for(let a of noiseAreas){
    a.draw();
    // ellipse(a.x, a.y, cellSize * 0.5, cellSize * 0.5);
  }


  if(frameCount % 60 == 0){
    generate();
  }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function generate(){
  noiseAreas = []
  //grid size
  let numCols = floor(width/cellSize);
  let numRows = floor(height/cellSize);

  let count = floor(random(3, 10));

  for(let i = 0; i < count; i++){
    let randomIndexX = floor(random(1, numCols));
    let randomIndexY = floor(random(1, numRows))
    let randomStartX = randomIndexX * cellSize;
    let randomStartY = randomIndexY * cellSize;
    let colsLeft = numCols - randomIndexX;
    let rowsLeft = numRows - randomIndexY;
    let xCount = floor(random(1, colsLeft));
    let yCount = floor(random(1, rowsLeft));

    noiseAreas.push(new DotFillArea(randomStartX, randomStartY, cellSize, xCount, yCount));
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class DotFillArea {
  constructor(x, y, cellSize, numCols, numRows){
    this.x = x; //corner x
    this.y = y; //corner y
    this.cellSize = cellSize;
    this.numCols = numCols;
    this.numRows = numRows;

    this.points = [];
    for(let i = 0; i < this.numRows; i++){
      for(let j = 0; j < this.numCols; j++){
        let y = i * this.cellSize + this.y + random(this.cellSize * 0.1, this.cellSize * 0.3);
        let x = j * this.cellSize + this.x + random(this.cellSize * 0.1, this.cellSize * 0.3);

        this.points.push({x: x, y: y});
      }
    }
  }

  draw(){
    //debug
    // noFill();
    // rect(this.x - this.cellSize/4, this.y - this.cellSize/4, this.numCols * this.cellSize, this.numRows * this.cellSize); //debug

    fill(0);
    for(let point of this.points){
      ellipse(point.x, point.y, this.cellSize * 0.5, this.cellSize * 0.5);
    }
  }
}
