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

  let count = floor(random(1, 3));

  //circ area test
  let randomIndexX = floor(random(1, numCols - 4));
  let randomIndexY = floor(random(1, numRows - 4))
  let randomStartX = randomIndexX * cellSize;
  let randomStartY = randomIndexY * cellSize;
  let colsLeft = numCols - randomIndexX;
  let rowsLeft = numRows - randomIndexY;
  let xCount = floor(random(4, colsLeft));

  // let yCount = floor(random(4, rowsLeft));
  noiseAreas.push(new DotFillArea(randomStartX, randomStartY, cellSize, xCount, xCount, true));

  ////rect areas
  //for(let i = 0; i < count; i++){
  //  let randomIndexX = floor(random(1, numCols - 4));
  //  let randomIndexY = floor(random(1, numRows - 4))
  //  let randomStartX = randomIndexX * cellSize;
  //  let randomStartY = randomIndexY * cellSize;
  //  let colsLeft = numCols - randomIndexX;
  //  let rowsLeft = numRows - randomIndexY;
  //  let xCount = floor(random(4, colsLeft));
  //  let yCount = floor(random(4, rowsLeft));

  //  noiseAreas.push(new DotFillArea(randomStartX, randomStartY, cellSize, xCount, yCount, false));
  //}
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class DotFillArea {
  constructor(x, y, cellSize, numCols, numRows, mask){
    this.x = x; //corner x
    this.y = y; //corner y
    this.cellSize = cellSize;
    this.numCols = numCols;
    this.numRows = numRows;
    this.mask = mask;

    if(this.mask && this.numCols == this.numRows){ //circle mask only if mask is true and area is a square
      //calculate center
      this.boundingCenterX = this.x + this.numCols * this.cellSize/2 - this.cellSize/4;
      this.boundingCenterY = this.y + this.numRows * this.cellSize/2 - this.cellSize/4;
      //calculate diameter
      this.diameter = this.cellSize * this.numCols;
    }

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
    if(this.mask){
      //bound circle
      //if the point is in the bounding circle, draw it
      //if not, don't

      //debug
      // fill("red");
      // ellipse(this.boundingCenterX, this.boundingCenterY, 10, 10);
      // noFill();
      // ellipse(this.boundingCenterX, this.boundingCenterY, this.diameter, this.diameter);

      fill(0);
      for(let point of this.points){
        if(dist(point.x, point.y, this.boundingCenterX, this.boundingCenterY) < this.diameter/2){
          ellipse(point.x, point.y, this.cellSize * 0.5, this.cellSize * 0.5);
        }
      }


    } else {
      fill(0);
      for(let point of this.points){
        ellipse(point.x, point.y, this.cellSize * 0.5, this.cellSize * 0.5);
      }
    }
  }
}
