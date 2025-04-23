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

  // Initialize widths and heights equally
  for (let i = 0; i < numCols; i++) {
    colWidths.push(width / numCols);
  }
  for (let i = 0; i < numRows; i++) {
    rowHeights.push(height / numRows);
  }

  // Initialize cells
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(new Cell(0, 0, 0, 0)); // positions updated in draw()
    }
    cells.push(row);
  }
}

function draw() {
  background(100);

  fill(255);
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

      c.draw();
      x += w;
    }
    y += rowHeights[i];
  }

  fill(0);
  ellipse(mouseX, mouseY, 5, 5);
}

function mousePressed() {
  currentCol = getCol(mouseX);
  currentRow = getRow(mouseY);
  prevPos = createVector(mouseX, mouseY);
}

function mouseDragged(){
  updateGrid();
}
 
function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
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

function updateGrid(){
let currentPos = createVector(mouseX, mouseY);
  let delta = p5.Vector.sub(currentPos, prevPos);
  
  // Use the larger movement to keep square ratio
  let d = abs(delta.x) > abs(delta.y) ? delta.x : delta.y;

  // Clamp the new size to avoid collapse
  let maxColSize = width - (numCols - 1) * 10;
  let maxRowSize = height - (numRows - 1) * 10;

  // --- COLUMN growth ---
  if (currentCol !== undefined) {
    let newWidth = constrain(colWidths[currentCol] + d, 10, maxColSize);
    let remaining = width - newWidth;
    let totalOthers = 0;
    for (let j = 0; j < numCols; j++) {
      if (j !== currentCol) totalOthers += colWidths[j];
    }

    for (let j = 0; j < numCols; j++) {
      if (j !== currentCol) {
        if (totalOthers > 0) {
          colWidths[j] = max(10, (colWidths[j] / totalOthers) * remaining);
        } else {
          colWidths[j] = remaining / (numCols - 1);
        }
      }
    }

    colWidths[currentCol] = newWidth;
  }

  // --- ROW growth ---
  if (currentRow !== undefined) {
    let newHeight = constrain(rowHeights[currentRow] + d, 10, maxRowSize);
    let remaining = height - newHeight;
    let totalOthers = 0;
    for (let i = 0; i < numRows; i++) {
      if (i !== currentRow) totalOthers += rowHeights[i];
    }

    for (let i = 0; i < numRows; i++) {
      if (i !== currentRow) {
        if (totalOthers > 0) {
          rowHeights[i] = max(10, (rowHeights[i] / totalOthers) * remaining);
        } else {
          rowHeights[i] = remaining / (numRows - 1);
        }
      }
    }

    rowHeights[currentRow] = newHeight;
  }

  prevPos = currentPos;
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


