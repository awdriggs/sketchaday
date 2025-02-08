//inspiration from kitty van der mijll dekker
//https://www.stedelijk.nl/nl/collectie/32670-kitty-van-der-mijll-dekker-theedoek
let numCols, numRows;
let cellSize;
let rectWidth;
let rectHeight;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  reSize();
  noLoop();
  noStroke();
}

function draw() {
  background("blue");

  for(let i = 0; i < numCols; i++){
    let flippy = i;
    for(let j = 0; j < numRows; j++){
      // ellipse(i * cellSize + , j * cellSize, 20, 20);
      // fill(255);
      // rect(i * cellSize, j * cellSize, cellSize, cellSize);
      //rect in the middle of the cell
      fill("white");
      let cx, cy;
      cx = i * cellSize + cellSize/2 ;
      cy = j * cellSize + cellSize/2;
      push();
      translate(cx,cy);
      if(flippy % 2 == 0) rotate(HALF_PI);
      rect(0 - cellSize/2, 0 - cellSize/6, cellSize, cellSize/3);
      pop();
      // rect(i * cellSize, j * cellSize + cellSize/3, cellSize, cellSize/3);

      flippy++;
      console.log(i,j,flippy);

    }
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reSize();
}

function reSize(){
  //starting with a set cellsize
  // cellSize = 100;
  // numCols = floor(width/cellSize);
  // numRows = floor(height/cellSize);
  // rectWidth = cellSize;
  // rectHeight = rectWidth/3;

  //starting with a dynamic cellsize
  numCols = 10;
  cellSize = width/numCols;
  numRows = floor(height/cellSize)+1;
  rectWidth = cellSize;
  rectHeight = rectWidth/3;
}
