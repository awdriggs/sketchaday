//slanted grid with broken inner grid
let circs = [];
let cells = [];
let thickness;

function setup() {
  createCanvas(800, 800);
  noFill();
  stroke(0);
  reset();
}

function reset() {
  cells = [];
  circs = [];

  let numCols = 10;
  let numRows = 5;
  let margin = width / 10;
  let availableWidth = width - margin * 2;
  let availableHeight = height - margin * 2;
  let cellWidth = availableWidth / (numCols - 1);
  let cellHeight = availableHeight / (numRows - 1);
  let offset = random(margin / 2, margin/4);

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

      let s = inner.subSize;
      thickness = s / 20;
      for (let r of inner.rects) {
        let x = tl.x + r.x + r.y * shear;
        let y = tl.y + r.y;
        let speed = max(20, random(s / 8, s / 2) * (800 / width));
        circs.push(new Rotator(x + s / 2, y + s / 2, s / 2 - thickness / 2, random(100), random(8, 12), speed));
      }
    }
  }
}

function buildBrokenGrid(cw, ch) {
  let subMargin = cw / 20;
  let availW = cw - subMargin * 2;
  let availH = ch - subMargin * 2;
  let subSize = availW / 5;
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
  // strokeWeight(1);

  // for (let { tl, shear, rects, subSize } of cells) {
  //   for (let r of rects) {
  //     rect(tl.x + r.x + r.y * shear, tl.y + r.y, subSize, subSize);
  //   }
  // }

  strokeWeight(thickness);
  for(let c of circs){
    c.draw();
    if(c.alive) drawing = true;
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

class Rotator {
  constructor(cx, cy, radius, nStart, noiseStep, speed){
    this.centerX = cx;
    this.centerY = cy;
    this.maxRadius = radius;
    this.nPosition = nStart;
    this.noiseStep = noiseStep / speed;
    this.speed = TWO_PI/speed; //angle step = speed,
    // this.r = map(noise(this.nPosition), 0, 1, this.maxRadius/2, this.maxRadius);
    this.angle = random(0, TWO_PI);
    this.dir = random() > 0.5 ? 1 : -1;
    // this.numPoints = speed + ceil(random(speed * 0.1, speed * 0.2)) * (random() > 0.5 ? -1 : 1);
    this.numPoints = speed + ceil(random() > 0.5 ? random(speed * 0.1, speed * 0.18) : random(speed * 0.04, speed * 0.08) * -1);
    console.log(this.numPoints);
    this.points = [];
    this.alive = true;

    this.update(); //ensure init
  }

  update(){
    if(this.points.length < this.numPoints){
      this.r = map(noise(this.nPosition), 0, 1, this.maxRadius * 0.8, this.maxRadius);
      this.x = this.centerX + cos(this.angle) * this.r
      this.y = this.centerY + sin(this.angle) * this.r

      this.angle += this.speed * this.dir;
      this.nPosition += random(0, this.noiseStep);

      this.points.push(createVector(this.x, this.y));
    } else {
      this.alive = false;
    }
  }

  draw(){

    if(this.alive) this.update();
    noFill();
    beginShape();
    let pts = this.points;
    curveVertex(pts[0].x, pts[0].y);
    for(let p of pts){
      curveVertex(p.x, p.y);
    }
    curveVertex(pts[pts.length-1].x, pts[pts.length-1].y);
    endShape(OPEN);
  }
}
