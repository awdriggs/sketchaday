let grid;
let lineWeight

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  //build the triangle grid
  let numCols = 10;
  let numRows = 10;
  let cellWidth = width/10;
  let cellHeight = height/10;

  grid = new Grid(numCols, numRows, cellWidth, cellHeight);

  lineWeight = 10 * width/800
}

function draw() {
  background(255);

  grid.draw();

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Grid {
  constructor(numCols, numRows, cw, ch){
    this.grid = [];
    //build the points
    for(let i = 0; i < numRows; i++){
      let row = [];
      let offset;
      let cols;

      if(i % 2 == 0){
        cols = numCols;
        offset = 0;
      } else {
        cols = numCols-1;
        offset = cw/2;
      }

      for(let j = 0; j < cols; j++){
        let x = j * cw + offset;
        let y = i * cw;
        

        let mover = new Mover(x + cw/2, y + ch/2, x, y, cw, ch);
        // debugger;
        row.push(mover);
      }

      this.grid.push(row);
    }
  }

  draw(){ 
    this.update();

    for(let i = 0; i < this.grid.length; i++){
      for(let j = 0; j < this.grid[i].length; j++){
        let p = this.grid[i][j].loc;

        noStroke();
        fill(0);
        ellipse(p.x, p.y, lineWeight, lineWeight);

        stroke(0)
        strokeWeight(lineWeight);
        if(j > 0 && j < this.grid[i].length){
          let prev = this.grid[i][j-1].loc;
          line(p.x, p.y, prev.x, prev.y);
        }

        if(i > 0){
          if(i % 2 == 0){
            let prevR = this.grid[i-1][j] ? this.grid[i-1][j].loc : null;
            let prevL = this.grid[i-1][j-1] ? this.grid[i-1][j-1].loc : null;

            if(prevL) line(p.x, p.y, prevL.x, prevL.y);
            if(prevR) line(p.x, p.y, prevR.x, prevR.y);

          } else {
            let prevL = this.grid[i-1][j] ? this.grid[i-1][j].loc : null;
            let prevR = this.grid[i-1][j+1] ? this.grid[i-1][j+1].loc : null;

            if(prevL) line(p.x, p.y, prevL.x, prevL.y);
            if(prevR) line(p.x, p.y, prevR.x, prevR.y);
          }
        }
      }
      //lines!
    }
  }

  update(){
    for(let row of this.grid){
      for(let mover of row){
        mover.update();
      }
    }
  }
}

class Mover {
  constructor(sx, sy, bx, by, bw, bh){
    this.loc = createVector(sx, sy);
    this.boundingBox = {x: bx, y: by, w: bw, h: bh};
    this.angle = createVector(random(TWO_PI), random(TWO_PI));
    this.speed = random(0.1, 1);
    this.stepSize = 0.8;
    this.dia = 10;
  }

  update(){
    this.angle.x += random(-this.stepSize, this.stepSize);
    this.angle.y += random(-this.stepSize, this.stepSize);

    let bb = this.boundingBox;
    let r = this.dia / 2;

    let nx = this.loc.x + sin(this.angle.x) * this.speed;
    let ny = this.loc.y + sin(this.angle.y) * this.speed;

    if(nx - r < bb.x || nx + r > bb.x + bb.w){
      this.angle.x *= -1;
      nx = this.loc.x + sin(this.angle.x) * this.speed;
    }

    if(ny - r < bb.y || ny + r > bb.y + bb.h){
      this.angle.y *= -1;
      ny = this.loc.y + sin(this.angle.y) * this.speed;
    }

    this.loc.x = nx;
    this.loc.y = ny;
  }

  draw(){
    this.update();
    // rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);
    // ellipse(this.loc.x, this.loc.y, this.dia, this.dia);
  }
}

