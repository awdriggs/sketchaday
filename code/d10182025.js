//inspired by the olivetti showroom floor in venice italy
//a grid of terrazo tiles that are misshaped with different  colors of ground

let grid = [];
let numCols, numRows, cellWidth, cellHeight;
let maxOffset;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  init();

  noStroke();
}

function draw() {
  background(0, 255, 0);

  for(let c of grid){
    c.draw();
  }

}

function mousePressed(){
  init();
}

function init() {
  grid = [];

  let minWidth = width/20;
  let maxWidth = width/10;

  let x = 0;

  while(x < width){
    let prevX = x;
    let w = random(minWidth, maxWidth);

    if(width - (x+w) < minWidth){
      w = width - x;
    } else if(x + w > width){
      w = width - x;
    }

    x += w;

    let fc = color(random(0, 255), random(0, 255), random(0, 255));
    let gc = color(random(0, 255), random(0, 255), random(0, 255));
    grid.push(new Poly(prevX, 0, w, height, fc, gc));
  }

}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
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

