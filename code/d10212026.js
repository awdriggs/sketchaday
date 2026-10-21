//broken grid.
let circs = [];
let margin, availableWidth, availableHeight;
let thickness;

function setup() {
  createCanvas(800, 800);
  reset();

  noFill();
}

function draw() {
  background(255);

  stroke(0);
  
  let drawing = false;
  for(let c of circs){
    c.draw();
    if(c.alive) drawing = true;
  }

  // if(!drawing) reset();
}

function reset() {
  circs = [];
  let cells = [];
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

  thickness = cellSize/20;
  strokeWeight(thickness);

  let maxSpeed = cellSize/8;
  let minSpeed = cellSize/2;

  cells.flat().forEach((c) => {
    let speed = random(cellSize/8, cellSize/2) * (800/width);
    // console.log(c);
    
  // test = new Rotator(width/2, height/2, width/2 - thickness/2, 0, speed);
    circs.push(new Rotator(c.x + c.size/2, c.y + c.size/2, c.size/2 - thickness/2, random(100), random(8,12), speed));     
  });

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function mousePressed(){
  reset();
}

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
