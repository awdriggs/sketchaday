let numCols, numRows;
let rows = [];
let rectHeight = 100;
let rectWidth;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols = 10;
  let numRows = height / rectHeight;

  rectWidth = width / numCols;

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = i * rectHeight;
    for(let j = 0; j < numCols; j++){
      let x = j * rectWidth + rectWidth / 2;

      if(j == 0){
        x1 = 0;
        x2 = 0;
      } else {
        let last = row[row.length - 1];
        x1 = last.x3;
        x2 = last.x4;
      }
      
      let x3, x4;
      if(j == numCols - 1){
        x3 = width;
        x4 = width;
      }

      row.push(new Poly(x, y, x1, x2, rectHeight, randomColor(), x3, x4));
    }
    rows.push(row);
  }

  // let last = row[row.length - 1];
  //       x1 = last.x3;
  //       x2 = last.x4;

  noStroke();
}

function draw() {
  background(255);

  for(let row of rows){
    for(let p of row){
      p.draw();
    }
  }

}

function randomColor(){
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  return color(r, g, b);
}

class Poly {
  constructor(cx, cy, x1, x2, h, c, x3, x4){
    this.cx = cx; //center line
    this.cy = cy;
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3 || cx + random(0.3 * rectWidth, 0.6 * rectWidth);
    this.x4 = x4 || cx + random(0.3 * rectWidth, 0.6 * rectWidth);
    this.h = h;
    this.color = c;
  }

  draw(){
    this.poly();
    // stroke(0);
    // line(this.cx, this.cy, this.cx, this.cy + this.h);
  }

  poly(){
    fill(this.color);
    beginShape();
    vertex(this.x1, this.cy); //left top
    vertex(this.x3, this.cy); //right top
    vertex(this.x4, this.cy + this.h); //right bottom
    vertex(this.x2, this.cy + this.h); //left bottom
    vertex(this.x1, this.cy); //back to start
    endShape();
  }
}

// class Poly {
//   constructor(x1, y1, x2, y2, x3, y3, x4, y4, c){
//     this.x1 = x1;
//     this.y1 = y1;
//     this.x2 = x2;
//     this.y2 = y2;
//     this.x3 = x3;
//     this.y3 = y3;
//     this.x4 = x4;
//     this.y4 = y4;
//     this.color = c;
//   }

//   draw(){
//     fill(this.color);
//     // }

