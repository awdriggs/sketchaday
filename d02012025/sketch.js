let numRows;
let rectSize = 100;
let rows = [];

function setup(){
  createCanvas(800, 800);

  numRows = height/rectSize;

  for(let i = 0; i < numRows; i++){
    let y = i * rectSize;

    let row = [];
    let x = 0;
    let count = 0;
    while(x < width){
      // for(let i = 0; i < 10; i++){
      let x1, x2;
      if(x == 0){
        x1 = 0;
        x2 = 0;
      } else {
        x1 = row[row.length - 1].x3;
        x2 = row[row.length - 1].x4;
      }

      let x3 =  min(width, x1 + random(rectSize * 0.65, rectSize));
      let x4 =  min(width, x2 + random(rectSize * 0.65, rectSize));

      row.push(new Poly(x1, y, x2, y + rectSize, x3, y, x4, y + rectSize, randomColor()));

      x = min(x3, x4); //update x
    }
    rows.push(row);
  }
}


function draw(){
  background(255);

  // test.draw();
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
  constructor(x1, y1, x2, y2, x3, y3, x4, y4, c){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.color = c;
  }

  draw(){
    fill(this.color);
    beginShape();
    vertex(this.x1, this.y1); //left top
    vertex(this.x3, this.y3); //right top
    vertex(this.x4, this.y4); //right bottom
    vertex(this.x2, this.y2); //left bottom
    vertex(this.x1, this.y1); //back to start
    endShape();
  }
}
