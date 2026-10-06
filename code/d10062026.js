let grid = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  reset();

  //calc the size, margin between all things;
  //equal margins around edges and sides of the grid;
  //num cols + 1;

}

function reset(){
  grid = [];
  let numCols = 3;
  let numRows = 3;

  let horizontalSpacing = width/20;
  let verticalSpacing = height/20;

  let cellWidth = (width - horizontalSpacing * (numCols + 1)) / numCols;
  let cellHeight = (height - verticalSpacing * (numRows + 1)) / numRows;

  let circSize = cellWidth * 0.6;

  console.log(cellWidth, cellHeight);

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = i * (cellHeight + verticalSpacing) + verticalSpacing;
    for(let j = 0; j < numCols; j++){
      let x = j * (cellWidth + horizontalSpacing) + horizontalSpacing;

      let circs = [];
      for(let i = 0; i < floor(random(1, 3)); i++){
        let cx = random(x + circSize/4, x + cellWidth - circSize/4);
        let cy = random(y + circSize/4, y + cellHeight - circSize/4);

        circs.push({cx, cy, size: circSize});
      }

      let cellFill = color(random(255), random(255), random(255));

      let cell = {x, y, w: cellWidth, h: cellHeight, circs, cellFill};
      row.push(cell);
    }

    grid.push(row);
  }

}

function draw() {
  background(255);

  for(let row of grid){
    for(let cell of row){
      // fill(cell.cellFill);
      fill(255);
      for(let circ of cell.circs){
        ellipse(circ.cx, circ.cy, circ.size, circ.size);
      }
      noFill();
      rect(cell.x, cell.y, cell.w, cell.h);
    }
  }

  if(frameCount % 30 == 0){
    reset();
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

