let cutSections = [];
let numRows, numCols;
let rowHeight, colWidth;
let margin; // Renamed from yOffset for clarity
let weight = 5;

function setup() {
  createCanvas(800, 800);
  numRows = 5;
  numCols = 10;

  margin = height / 19;

  colWidth = (width - 2 * margin) / numCols; // Calculate width within margins
  rowHeight = (height - 2 * margin) / numRows; // Calculate height within margins

  generateCuts();
  // noLoop();
  
  strokeWeight(weight);
  strokeCap(SQUARE);
}

function draw() {
  background(255);

  stroke(0);
  strokeCap(SQUARE);
  // Draw cut sections
  for (let section of cutSections) {
    section.move();
    section.draw();
  }

  noStroke();
  fill(0);
  ellipse(margin, margin, weight, weight);
  ellipse(width - margin, margin, weight, weight)
  ellipse(width - margin, height - margin, weight, weight)
  ellipse(margin, height - margin, weight, weight)
  

  if (frameCount % 30 == 0 && random() > 0.5) {
    generateCuts();
  }
}

function generateCuts(){
  cutSections = [];
  generateColumns();
  generateRows();
}


function generateColumns() {
  let index = 0;

  // let minDisplacement = 10;
  // let maxDisplacement = 20;
  let minDisplacement = colWidth * 0.15;
  let maxDisplacement = colWidth * 0.5;
  
  let dir = random() > 0.5 ? -1 : 1;

  let gridHeight = height - 2 * margin; // Available height within margins

  while (index <= numCols) {
    let x = margin + index * colWidth;

    // Check if we have room for a multi-column cut without going past the last column
    let count = floor(random(2, 4));
    let canDisplace = random() > 0.75 && (index + count) <= numCols;

    if (canDisplace) {
      // Create a cut section
      let cutStart = random(0, gridHeight); // Position within the grid (0 = top margin)
      let cutLength = margin * floor(random(4, 8));
      let displaceBy = random(minDisplacement, maxDisplacement);

      for (let i = 0; i < count; i++) {
        cutSections.push(new CutSection(
          x + i * colWidth,
          margin,
          cutStart + margin * i * dir, // Offset the start for each segment
          displaceBy,
          cutLength,
          "column"
        ));
      }

      index += count;
    } else {
      // No cut - just a straight line
      cutSections.push(new CutSection(x, margin, random(0, gridHeight), 0, 0, "column"));
      index++;
    }
  }
}

function generateRows(){
  let index = 0;

  // let minDisplacement = 10;
  // let maxDisplacement = 20;
  let minDisplacement = rowHeight * 0.15;
  let maxDisplacement = rowHeight * 0.5;
  
  let dir = random() > 0.5 ? -1 : 1;

  let gridWidth = width - 2 * margin; // Available height within margins

  while (index <= numRows) {
    let y = margin + index * rowHeight;

    // Check if we have room for a multi-column cut without going past the last column
    let count = floor(random(2, 4));
    let canDisplace = random() > 0.75 && (index + count) <= numRows;

    if (canDisplace) {
      // Create a cut section
      let cutStart = random(0, gridWidth); // Position within the grid (0 = top margin)
      let cutLength = margin * floor(random(4, 8));
      let displaceBy = random(minDisplacement, maxDisplacement);

      for (let i = 0; i < count; i++) {
        cutSections.push(new CutSection(
          margin,
          y + i * rowHeight,
          cutStart + margin * i * dir, // Offset the start for each segment
          displaceBy,
          cutLength,
          "row"
        ));
      }

      index += count;
    } else {
      // No cut - just a straight line
      cutSections.push(new CutSection(margin, y, random(0, gridWidth), 0, 0, "row"));
      index++;
    }
  }
}

function keyPressed() {
  if (key == "g") {
    saveGif('thumb', floor(random(3, 8)));
  } else if (key == "p") {
    saveCanvas('thumb', "jpg");
  }
}

class CutSection {
  constructor(x, y, cutStart, displacement, cutLength, type) {
    this.x = x;
    this.y = y;
    this.cutStart = cutStart; // Relative to margin
    this.cutEnd = cutStart + cutLength;
    this.cutLength = cutLength;
    this.displacement = displacement;
    this.gridHeight = height - 2 * margin;
    this.gridWidth = width - 2 * margin;
    this.type = type; //row or column
  }

  draw() {
    if(this.type == "column"){
      this.column();
    } else {
      this.row();
    }
  }

  column() {
    let topMargin = margin;
    let bottomMargin = height - margin;

    // Clamp values to stay within margins
    let actualCutStart = constrain(this.cutStart, 0, this.gridHeight) + margin;
    let actualCutEnd = constrain(this.cutEnd, 0, this.gridHeight) + margin;

    // Draw line from top margin to cut start
    if (actualCutStart > topMargin) {
      line(this.x, topMargin, this.x, actualCutStart);
    }

    // Draw displaced section
    if (actualCutEnd > actualCutStart) {
      line(this.x + this.displacement, actualCutStart, this.x + this.displacement, actualCutEnd);
    }

    // Draw line from cut end to bottom margin
    if (actualCutEnd < bottomMargin) {
      line(this.x, actualCutEnd, this.x, bottomMargin);
    }
  }

  row() {
    let leftMargin = margin;
    let rightMargin = width - margin;

    // Clamp values to stay within margins
    let actualCutStart = constrain(this.cutStart, 0, this.gridWidth) + margin;
    let actualCutEnd = constrain(this.cutEnd, 0, this.gridWidth) + margin;

    // Draw line from top margin to cut start
    if (actualCutStart > leftMargin) {
      line(leftMargin, this.y, actualCutStart, this.y);
    }

    // Draw displaced section
    if (actualCutEnd > actualCutStart) {
      // line(this.x + this.displacement, actualCutStart, this.x + this.displacement, actualCutEnd);
      line(actualCutStart, this.y + this.displacement, actualCutEnd, this.y + this.displacement);
    }

    // Draw line from cut end to bottom margin
    if (actualCutEnd < rightMargin) {
      // line(this.x, actualCutEnd, this.x, bottomMargin);
      line(actualCutEnd, this.y, rightMargin, this.y);
    }
  }

  move(){
    this.cutStart++;
    this.cutEnd = this.cutStart + this.cutLength;
    //not worrying about edge cases yet
  }
}
