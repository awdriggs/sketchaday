//inspired by the olivetti showroom floor in venice italy
//a grid of terrazo tiles that are misshaped with different  colors of ground

let rects = [];
let numCols, numRows, cellWidth, cellHeight;
let maxOffset;

function setup() {
  createCanvas(800, 800);
  
  //
  rects.push(new Rect(0, 0, width, height * 2/3, 10, 8, "red", "white"));
  rects.push(new Rect(0, height * 2/3, width, height * 1/3, 8, 2, "white", "grey"));

  noStroke();
}

function draw() {
  background(255);
  
  for(let r of rects){
    r.draw();
  }
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

class Rect {
  constructor(cornerX, cornerY, w, h, numCols, numRows, fc, gc){
    this.cornerX = cornerX;
    this.cornerY = cornerY;
    this.numCols = numCols;
    this.numRows = numRows;
    this.cellWidth = w/numCols;
    this.cellHeight = h/numRows;
    this.fc = fc;
    this.gc = gc;

    this.init();
  }

  init(){
    this.grid = [];

    for(let i = 0; i < this.numRows; i++){
      let y = i * this.cellHeight + this.cornerY;
      for(let j = 0; j < this.numCols; j++){
        let x = j * this.cellWidth + this.cornerX;

        this.grid.push(new Poly(x, y, this.cellWidth, this.cellHeight, this.fc, this.gc));

      }
    }
  }

  draw(){
    for(let c of this.grid){
      c.draw();
    }
  }

}

class Poly {
  constructor(cornerX, cornerY, w, h, fill, groundFill){
    this.cornerX = cornerX;
    this.cornerY = cornerY;
    this.w = w;
    this.h = h;
    this.margin = this.w/4;
    this.x1 = this.cornerX + this.margin * random(0.25, 0.75);
    this.y1 = this.cornerY + this.margin * random(0.25, 0.75);
    this.x2 = this.cornerX + this.w - this.margin * random(0.25, 0.75);
    this.y2 = this.cornerY + this.margin * random(0.25, 0.75);
    this.x3 = this.cornerX + this.w - this.margin * random(0.25, 0.75);
    this.y3 = this.cornerY + this.h - this.margin * random(0.25, 0.75);
    this.x4 = this.cornerX + this.margin * random(0.25, 0.75);
    this.y4 = this.cornerY + this.h - this.margin * random(0.25, 0.75);

    // debugger;
    //colors
    this.groundFill = groundFill;
    this.fill = fill;
  }

  draw(){
    //draw the ground
    fill(this.groundFill);
    rect(this.cornerX, this.cornerY, this.w, this.h);

    fill(this.fill);
    //draw the poly
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y2);
    vertex(this.x3, this.y3);
    vertex(this.x4, this.y4);
    endShape(CLOSE);
  }
}

