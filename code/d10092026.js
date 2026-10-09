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

  circSize = cellWidth * 0.8;

  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = i * (cellHeight + verticalSpacing) + verticalSpacing;
    for(let j = 0; j < numCols; j++){
      let x = j * (cellWidth + horizontalSpacing) + horizontalSpacing;

      let cellMovers = [];
      // for(let k = 0; k < floor(random(2, 4)); k++){
      for(let k = 0; k < 2; k++){
        let cx = random(x + circSize/2, x + cellWidth - circSize/2);
        let cy = random(y + circSize/2, y + cellHeight - circSize/2);
        cellMovers.push(new Mover(cx, cy, x, y, cellWidth, cellHeight, 1 * width/800));
      }

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
        ellipse(mover.loc.x, mover.loc.y, circSize, circSize);
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

