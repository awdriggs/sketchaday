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

  let numCols = 5;
  let numRows = 5;

  let horizontalSpacing = width/20;
  let verticalSpacing = height/20;

  let cellWidth = (width - horizontalSpacing * (numCols + 1)) / numCols;
  let cellHeight = (height - verticalSpacing * (numRows + 1)) / numRows;

  circSize = cellWidth * 0.6;

  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = i * (cellHeight + verticalSpacing) + verticalSpacing;
    for(let j = 0; j < numCols; j++){
      let x = j * (cellWidth + horizontalSpacing) + horizontalSpacing;

      let cellMovers = [];
      for(let k = 0; k < floor(random(1, 3)); k++){
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
  background(0);

  for(let row of grid){
    for(let cell of row){
      drawingContext.save();
      drawingContext.beginPath();
      drawingContext.rect(cell.x, cell.y, cell.w, cell.h);
      drawingContext.clip();

      for(let mover of cell.movers){
        mover.update();
        fill(255);
        ellipse(mover.loc.x, mover.loc.y, circSize, circSize);
      }

      drawingContext.restore();
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

