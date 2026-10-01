let grid = [];
let hLines = []; // one per row
let vLines = []; // one per col
let numCols, numRows;
let colors = [];
let margin, gridW, gridH;

function setup() {
  createCanvas(800, 800);
  margin = width / 10;
  numCols = 10;
  numRows = 10;
  colors = ["#FA3BF050", "#FFED2950", "#1BFC0650", "#30C5FF50", "#FF5C0050", "#8A00C450"];

  gridW = (width - margin) / numCols;
  gridH = (height - margin) / numRows;

  for (let i = 0; i < numRows; i++) {
    let y = margin/2 + i * gridH;
    for (let j = 0; j < numCols; j++) {
      let x = margin/2 + j * gridW;
      grid.push({x, y, w: gridW, h: gridH});
    }
  }

  colors = shuffle(colors);

  for (let i = 0; i < numRows; i++) {
    let y = margin/2 + i * gridH + gridH/2;
    hLines.push(new Line(margin/2, y, colors[i % colors.length], random(3, 6), 0));
  }

  for (let j = 0; j < numCols; j++) {
    let x = margin/2 + j * gridW + gridW/2;
    vLines.push(new Line(margin/2, x, colors[(j + floor(colors.length/2)) % colors.length], random(3, 6), 1));
  }

  noFill();
  strokeWeight(gridH);
  strokeCap(SQUARE);
}

function draw() {
  background(255);

  for (let l of hLines) if (l.alive) l.update();
  for (let l of vLines) if (l.alive) l.update();

  for (let idx = 0; idx < grid.length; idx++) {
    let c = grid[idx];
    let i = floor(idx / numCols);
    let j = idx % numCols;

    if ((i + j) % 2 == 0) {
      hLines[i].drawSegment(c.x, c.x + c.w);
      vLines[j].drawSegment(c.y, c.y + c.h);
    } else {
      vLines[j].drawSegment(c.y, c.y + c.h);
      hLines[i].drawSegment(c.x, c.x + c.w);
    }
  }
}

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

function reset(){
  hLines = [];
  vLines = [];

  colors = shuffle(colors);

  for (let i = 0; i < numRows; i++) {
    let y = margin/2 + i * gridH + gridH/2;
    hLines.push(new Line(margin/2, y, colors[i % colors.length], random(3, 6), 0));
  }

  for (let j = 0; j < numCols; j++) {
    let x = margin/2 + j * gridW + gridW/2;
    vLines.push(new Line(margin/2, x, colors[(j + floor(colors.length/2)) % colors.length], random(3, 6), 1));
  }
}

class Line {
  constructor(sx, sy, c, s, d){
    this.x = sx; // progress coordinate (x for horizontal, y for vertical)
    this.y = sy; // position coordinate (row y center, or col x center)
    this.locs = [];
    this.locs.push(createVector(sx, sy));
    this.color = c;
    this.step = s;
    this.alive = true;
    this.dir = d;
    this.limit = d == 0 ? width - margin/2 : height - margin/2;
  }

  update(){
    this.alive = this.x < this.limit;
    if (this.alive) {
      this.x += this.step;
      let dice = floor(random(3));
      if (dice == 0) this.y += 0.5;
      else if (dice == 1) this.y -= 0.5;
      this.locs.push(createVector(this.x, this.y));
    }
  }

  drawSegment(min, max){
    let start = floor((min - margin/2) / this.step);
    let end = ceil((max - margin/2) / this.step);
    start = constrain(start, 0, this.locs.length - 1);
    end = constrain(end, 0, this.locs.length);
    if (end - start < 2) return;
    stroke(this.color);
    beginShape();
    for (let k = start; k < end; k++) {
      let l = this.locs[k];
      this.dir ? vertex(l.y, l.x) : vertex(l.x, l.y);
    }
    endShape();
  }
}
