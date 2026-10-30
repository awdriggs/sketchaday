let numCols = 30;
let numRows = 20;

let colWidths = [];
let rowHeights = [];
let cells = [];
let colors = [];

let currentCol, currentRow;
let prevPos;

let capture;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);


  capture = createCapture(VIDEO);
  capture.size(numCols, numRows);
  filter(GRAY);
  capture.hide();

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

  noStroke();
}

function draw() {
  background(100);

  updateColors();

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

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function updateColors(){
  capture.loadPixels();

  for(let i = 0; i < cells.length; i++){
    let row = cells[i];

    for(let j = 0; j < row.length; j++){
      let pIndex = (i * numCols + j) * 4;

      let r = capture.pixels[pIndex];
      let g = capture.pixels[pIndex+1];
      let b = capture.pixels[pIndex+2];
      let grey = 0.299 * r + 0.587 * g + 0.114 * b;  
      // cells[i][j].color = color(r,g,b);
      cells[i][j].color = grey
    }
  }

}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(255,255,255); //init to white
  }

  draw() {
    // fill(this.color);
    fill("#BCA0BC");
    rect(this.x, this.y, this.w, this.h);

    //calcuate the width of a the bar grey color
    //darker = wider
    let thickness = map(this.color, 30, 255, this.w, 0, true);
    fill("#704C5E");
    rect(this.x, this.y, thickness, this.h);

  }
}
