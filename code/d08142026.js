let noiseAreas = []
let cellSize;
// let numBlobs = 10;

function setup() {
  createCanvas(800, 800);
  cellSize = 50 * width/800;

  reset();
}

function draw() {
  background(255);

  for(let a  of noiseAreas){
    a.draw();
  }
}

// function reset() {
//   blobs = []
//   let numCols = 10;
//   let numRows = 10;
//   let spacing = width/numCols; //square grid
//   for(let i = 0; i < numCols; i++){
//     let y = i * spacing + spacing/2;
//     for(let j = 0; j < numCols; j++){
//       let x = j * spacing + spacing/2;
//       blobs.push(new Blobby(x, y, 10, spacing * 0.6));
//     }
//   }
// }
function reset(){
  noiseAreas = []
  //grid size
  let numCols = floor(width/cellSize);
  let numRows = floor(height/cellSize);

  // let count = floor(random(1, 3));
  let count = 1;

  for(let i = 0; i < count; i++){
    //circ area test
    let randomIndexX = floor(random(1, numCols - 4));
    let randomIndexY = floor(random(1, numRows - 4))
    let randomStartX = randomIndexX * cellSize;
    let randomStartY = randomIndexY * cellSize;
    let colsLeft = numCols - randomIndexX;
    let rowsLeft = numRows - randomIndexY;
    let xCount = floor(random(4, colsLeft));

    // let yCount = floor(random(4, rowsLeft));
    noiseAreas.push(new DotFillArea(randomStartX, randomStartY, cellSize, xCount, xCount, true));
  }
  // count = floor(random(1, 3));
  count = 1;
  ////rect areas
  for(let i = 0; i < count; i++){
    let randomIndexX = floor(random(1, numCols - 4));
    let randomIndexY = floor(random(1, numRows - 4))
    let randomStartX = randomIndexX * cellSize;
    let randomStartY = randomIndexY * cellSize;
    let colsLeft = numCols - randomIndexX;
    let rowsLeft = numRows - randomIndexY;
    let xCount = floor(random(4, colsLeft));
    let yCount = floor(random(4, rowsLeft));

    noiseAreas.push(new DotFillArea(randomStartX, randomStartY, cellSize, xCount, yCount, false));
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

class DotFillArea {
  constructor(x, y, cellSize, numCols, numRows, mask){
    this.x = x; //corner x
    this.y = y; //corner y
    this.cellSize = cellSize;
    this.numCols = numCols;
    this.numRows = numRows;
    this.mask = mask;

    if(this.mask && this.numCols == this.numRows){ //circle mask only if mask is true and area is a square
      //calculate center
      this.boundingCenterX = this.x + this.numCols * this.cellSize/2 - this.cellSize/4;
      this.boundingCenterY = this.y + this.numRows * this.cellSize/2 - this.cellSize/4;
      //calculate diameter
      this.diameter = this.cellSize * this.numCols;
    }

    this.points = [];
    for(let i = 0; i < this.numRows; i++){
      for(let j = 0; j < this.numCols; j++){
        let y = i * this.cellSize + this.y + random(this.cellSize * 0.1, this.cellSize * 0.3);
        let x = j * this.cellSize + this.x + random(this.cellSize * 0.1, this.cellSize * 0.3);

        this.points.push(new Blobby(x, y, 10, this.cellSize * 0.5));
//       blobs.push(new Blobby(x, y, 10, spacing * 0.6));
      }
    }
  }

  draw(){
    //debug
    // noFill();
    // rect(this.x - this.cellSize/4, this.y - this.cellSize/4, this.numCols * this.cellSize, this.numRows * this.cellSize); //debug
    if(this.mask){
      //bound circle
      //if the point is in the bounding circle, draw it
      //if not, don't

      //debug
      // fill("red");
      // ellipse(this.boundingCenterX, this.boundingCenterY, 10, 10);
      // noFill();
      // ellipse(this.boundingCenterX, this.boundingCenterY, this.diameter, this.diameter);

      fill(0);
      for(let point of this.points){
        if(dist(point.x, point.y, this.boundingCenterX, this.boundingCenterY) < this.diameter/2){
          // ellipse(point.x, point.y, this.cellSize * 0.5, this.cellSize * 0.5);
          point.update();
          point.draw();
        }
      }


    } else {
      fill(0);
      for(let point of this.points){
        point.update();
        point.draw();
      }
    }
  }
}

class Blobby {
  constructor(cx, cy, r, d){
    this.x = cx;
    this.y = cy;
    this.points = [];
    let angleStep = TWO_PI / r;
    for(let i = 0; i < r; i++){
      let x = cx + cos(angleStep * i) * d/2;
      let y = cy + sin(angleStep * i) * d/2;
      this.points.push(new Point(x, y, x, y));
    }
  }

  update(){
    for(let p of this.points){
      p.applyForce();
    }
  }

  draw(){
    let pts = this.points;
    fill(0);
    beginShape();
    curveVertex(pts[pts.length - 1].loc.x, pts[pts.length - 1].loc.y);
    for(let p of pts){
      curveVertex(p.loc.x, p.loc.y);
    }
    curveVertex(pts[0].loc.x, pts[0].loc.y);
    curveVertex(pts[1].loc.x, pts[1].loc.y);
    endShape();
  }
}

class Point {
  constructor(x, y, ax, ay){
    this.loc = createVector(x, y);
    this.anchor = createVector(ax, ay);

    this.k = 0.001;
    this.force = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.damping = 0.9;
  }

  applyForce() {
    this.force = p5.Vector.sub(this.anchor, this.loc).mult(this.k);

    let n = p5.Vector.fromAngle(map(noise(this.loc.x * 0.01, this.loc.y * 0.01, frameCount * 0.005), 0, 1, -1, 1) * TWO_PI);
    n.mult(0.01 * (width/800));

    this.force.add(n);
    this.vel.add(this.force);
    this.vel.mult(this.damping);
    this.loc.add(this.vel);
  }
}
