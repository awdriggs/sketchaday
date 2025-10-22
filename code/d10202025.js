//inspired by the olivetti showroom floor in venice italy
//a grid of terrazo tiles that are misshaped with different  colors of ground

let rects = [];
let maxOffset;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  createRects();
  // grid = createMosaicGrid(width, height, width/20, width/10, height/10, height/20)

  noStroke();
}

function draw() {
  background(0, 255, 0);

  for(let r of rects){
    r.draw();
  }

}

function mousePressed(){
  createRects();
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function createRects() {
  rects = [];

  rects.push(new Rect(0, 0, width, height, color(random(0, 255), random(0, 255), random(0, 255)), color(random(0, 255), random(0, 255), random(0,255))));

  // rects.push(new Rect(200, 0, width, height, color(random(0, 255), random(0, 255), random(0, 255)), color(random(0, 255), random(0, 255), random(0,255))));
  let numRect = 4;
  for(let i = 0; i < numRect; i++){
    rects.push(new Rect(random(width), random(height), random(width/10, width), random(height/10, height), color(random(0, 255), random(0, 255), random(0, 255)), color(random(0, 255), random(0, 255), random(0,255))));
  }
}

class Rect {
  constructor(x, y, w, h, fc, gc){
    this.width = w;
    this.height = h;
    this.cornerX = x;
    this.cornerY = y;
    this.fc = fc;
    this.gc = gc;

    this.init();
  }

  init() {
    this.grid = [];

    let minWidth = this.width/20;
    let maxWidth = this.width/10;
    let minHeight = this.height/20;
    let maxHeight = this.height/10;

    // Track relative position, not absolute
    let relX = 0;
    let row = [];

    while(relX < this.width){
      let w = random(minWidth, maxWidth);

      if(this.width - (relX + w) < minWidth){
        w = this.width - relX;
      } else if(relX + w > this.width){
        w = this.width - relX;
      }

      // Use absolute position for Poly constructor
      row.push(new Poly(this.cornerX + relX, this.cornerY, w, random(minHeight, maxHeight), this.fc, this.gc));
      relX += w;
    }

    this.grid.push(...row);

    for(let i = 0; i < row.length; i++){
      let relY = row[i].h; // Start relative to cornerY
      let x = row[i].cornerX;
      let w = row[i].w;

      while(relY < this.height){
        let h = random(minHeight, maxHeight);

        if(this.height - (relY + h) < minHeight){
          h = this.height - relY;
        } else if(relY + h > this.height){
          h = this.height - relY;
        }

        this.grid.push(new Poly(x, this.cornerY + relY, w, h, this.fc, this.gc));
        relY += h;
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

