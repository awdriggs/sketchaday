let numCols = 10;
let numRows = 10;

let colWidths = [];
let rowHeights = [];
let cells = [];

let currentCol, currentRow;
let prevPos;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);

  // initialize column and row sizes
  for (let i = 0; i < numCols; i++) {
    colWidths.push(width / numCols);
  }
  for (let i = 0; i < numRows; i++) {
    rowHeights.push(height / numRows);
  }

  // create empty grid of cells
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(new Cell(0, 0, 0, 0)); // x, y, w, h will be updated in draw()
    }
    cells.push(row);
  }
}

function draw() {
  background(100);

  let y = 0;
  for (let i = 0; i < numRows; i++) {
    let x = 0;
    for (let j = 0; j < numCols; j++) {
      let w = colWidths[j];
      let h = rowHeights[i];
      let cx = x + w / 2;
      let cy = y + h / 2;

      let c = cells[i][j];
      c.x = cx;
      c.y = cy;
      c.w = w;
      c.h = h;

      fill("white");
      c.draw();
      x += w;
    }
    y += rowHeights[i];
  }

  fill(0);
  ellipse(mouseX, mouseY, 5, 5);

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed() {
  currentCol = getCol(mouseX);
  currentRow = getRow(mouseY);
  prevPos = createVector(mouseX, mouseY);
}

function mouseDragged() {
  let currentPos = createVector(mouseX, mouseY);
  let deltaX = currentPos.x - prevPos.x;
  let deltaY = currentPos.y - prevPos.y;

  if (currentCol !== undefined) {
    colWidths[currentCol] += deltaX;
    let others = numCols - 1;
    for (let j = 0; j < numCols; j++) {
      if (j !== currentCol) {
        colWidths[j] -= deltaX / others;
      }
    }
  }

  if (currentRow !== undefined) {
    rowHeights[currentRow] += deltaY;
    let others = numRows - 1;
    for (let i = 0; i < numRows; i++) {
      if (i !== currentRow) {
        rowHeights[i] -= deltaY / others;
      }
    }
  }

  // clamp to prevent negative or too small sizes
  colWidths = colWidths.map(w => max(5, w));
  rowHeights = rowHeights.map(h => max(5, h));

  prevPos = currentPos;
}

function getCol(mx) {
  let x = 0;
  for (let j = 0; j < numCols; j++) {
    let w = colWidths[j];
    if (mx >= x && mx < x + w) {
      return j;
    }
    x += w;
  }
  return undefined;
}

function getRow(my) {
  let y = 0;
  for (let i = 0; i < numRows; i++) {
    let h = rowHeights[i];
    if (my >= y && my < y + h) {
      return i;
    }
    y += h;
  }
  return undefined;
}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    rect(this.x, this.y, this.w, this.h);
  }
}
