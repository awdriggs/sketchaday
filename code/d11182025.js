let cutSections = [];
let numRows, numCols;
let rowHeight, colWidth;
let margin; // Renamed from yOffset for clarity

function setup() {
  createCanvas(800, 800);
  numRows = 5;
  numCols = 10;

  margin = height / 19;

  colWidth = (width - 2 * margin) / numCols; // Calculate width within margins
  rowHeight = (height - 2 * margin) / numRows; // Calculate height within margins

  generateCuts();
  // noLoop();
  strokeWeight(5);
  strokeCap(SQUARE);
}

function draw() {
  background(255);

  strokeCap(SQUARE);
  // Draw cut sections
  for (let section of cutSections) {
    section.draw();
  }

  // Draw horizontal grid lines within margins
  strokeCap(ROUND);
  for (let i = 0; i <= numRows; i++) {
    let y = margin + i * rowHeight;
    line(margin, y, width - margin, y);
  }

  if (frameCount % 30 == 0 && random() > 0.5) {
    generateCuts();
  }
}

function generateCuts() {
  cutSections = [];
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
          cutStart + margin * i * dir, // Offset the start for each segment
          displaceBy,
          cutLength
        ));
      }

      index += count;
    } else {
      // No cut - just a straight line
      cutSections.push(new CutSection(x, random(0, gridHeight), 0, 0));
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
  constructor(x, cutStart, displacement, cutLength) {
    this.x = x;
    this.cutStart = cutStart; // Relative to margin
    this.cutEnd = cutStart + cutLength;
    this.displacement = displacement;
    this.gridHeight = height - 2 * margin;
  }

  draw() {
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
}
