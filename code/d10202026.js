//broken grid.
let cells = [];
let margin, availableWidth, availableHeight;

function setup() {
  createCanvas(300, 300);
  reset();

  noFill();
}


function draw() {
  background(255);

  stroke(0);
  for(let r of cells){
    for(let c of r){
      c.draw();
    }
  }

  if(frameCount % 60 == 0){
    reset();
  }

}

function reset() {
  cells = [];
  let marginLeft = width/5 //* width/800;
  let marginTop = width/10 //* width/800;
  let availableWidth = width - marginLeft * 2;
  let availableHeight = height - marginTop * 2;

  let cellSize = availableWidth/10;
  let spacing = cellSize/5;

  let nudge = 0;
  for(let y = 0; y < availableHeight; y += cellSize + random(spacing/2, spacing)){
    let row = []
    nudge = constrain(nudge + random(spacing * 2), 0, marginLeft);
    
    for(let x = 0; x < availableWidth; x += cellSize + random(spacing/2, spacing)){
      y += random(-spacing/4, spacing/4); //add a little jitter to each oen
      row.push(new Cell(x, y, cellSize));
    }

    let lastCellRight= row[row.length-1].x + cellSize;
    let leftover = availableWidth - lastCellRight;
    let offset = leftover / 2 + marginLeft + nudge;

    row.forEach(c => c.x += offset);
    cells.push(row);
    // let leftOverWidth = availableWidth -
  }

  //offset for y values
  let lastRow = cells[cells.length - 1];
  let bottomEdge = Math.max(...lastRow.map(c => c.y)) + cellSize;
  let leftoverY = availableHeight - bottomEdge;
  let yOffset = leftoverY / 2 + marginTop;

  cells.flat().forEach(c => c.y += yOffset);

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
  constructor(x, y, cellSize){
    this.x = x;
    this.y = y;
    this.size = cellSize;
  }

  draw(){
    rect(this.x, this.y, this.size, this.size);
  }
}
