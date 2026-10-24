//slanted grid with broken inner grid
let cells = [];

function setup() {
  createCanvas(800, 800);
  noFill();
  stroke(0);
  reset();
}

function reset() {
  cells = [];

  let numCols = 4;
  let numRows = 3;
  let margin = width / 10;
  let availableWidth = width - margin * 2;
  let availableHeight = height - margin * 2;
  let cellWidth = availableWidth / (numCols - 1);
  let cellHeight = availableHeight / (numRows - 1);
  let offset = random(margin / 2, margin);

  let dir = random() > 0.5 ? -1 : 1;
  let outerGrid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    let rowOffset = lerp(offset, 0, i / (numRows - 1)) * dir;
    let y = i * cellHeight + margin;
    for (let j = 0; j < numCols; j++) {
      row.push({ x: j * cellWidth + rowOffset + margin, y });
    }
    outerGrid.push(row);
  }

  for (let i = 0; i < numRows - 1; i++) {
    for (let j = 0; j < numCols - 1; j++) {
      let tl = outerGrid[i][j];
      let tr = outerGrid[i][j + 1];
      let bl = outerGrid[i + 1][j];
      let cw = tr.x - tl.x;
      let ch = bl.y - tl.y;
      let shear = (bl.x - tl.x) / ch;
      let inner = buildBrokenGrid(cw, ch);
      cells.push({ tl, shear, rects: inner.rects, subSize: inner.subSize });
    }
  }
}

function buildBrokenGrid(cw, ch) {
  let subMargin = cw / 10;
  let availW = cw - subMargin * 2;
  let availH = ch - subMargin * 2;
  let subSize = availW / 3;
  let spacing = subSize / 5;

  let rows = [];
  for (let sy = 0; sy < availH; sy += subSize + random(spacing / 2, spacing)) {
    let row = [];
    for (let sx = 0; sx < availW; sx += subSize + random(spacing / 2, spacing)) {
      sy += random(-spacing / 4, spacing / 4);
      row.push({ x: sx, y: sy });
    }
    if (row.length === 0) continue;
    let lastRight = row[row.length - 1].x + subSize;
    let xOff = (availW - lastRight) / 2 + subMargin;
    row.forEach(c => c.x += xOff);
    rows.push(row);
  }

  if (rows.length === 0) return { rects: [], subSize };

  let lastRow = rows[rows.length - 1];
  let bottomEdge = Math.max(...lastRow.map(c => c.y)) + subSize;
  let yOff = (availH - bottomEdge) / 2 + subMargin;
  rows.flat().forEach(c => c.y += yOff);

  return { rects: rows.flat(), subSize };
}

function draw() {
  background(255);
  stroke(0);
  noFill();

  for (let { tl, shear, rects, subSize } of cells) {
    for (let r of rects) {
      rect(tl.x + r.x + r.y * shear, tl.y + r.y, subSize, subSize);
    }
  }

  if(frameCount % 60 == 0){
    reset();
  }
}

function keyPressed() {
  if (key == "g") {
    saveGif('thumb', floor(random(3, 8)));
  } else if (key == "p") {
    saveCanvas('thumb', "jpg");
  }
}
