let blocks = [];
let numRows, numCols, blockWidth, blockHeight;
let fills = [
  {r: 73, g: 24, b: 255},
  {r: 245, g: 221, b: 66},
  {r: 24, g: 137, b: 32},
  {r: 255, g: 134, b: 3},
  {r: 178, g: 0, b: 6},
]

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numRows = 10;
  numCols = 10;
  blockWidth = width/numCols;
  blockHeight = height/numRows;

  let total = numRows * numCols;

  for(let i = 0; i < total; i++) {

    blocks.push(new Block(blockWidth, blockHeight));
  }

  noStroke();
}

function draw() {
  background(255);

  for(let i = 0; i < numRows; i++){
    let y = i * blockHeight;

    for(let j = 0; j < numCols; j++){
      let x = j * blockWidth;
      let index = i * numCols + j;
      blocks[index].draw(x, y);
    }
  }

  for(let b of blocks){
    if(random() < 0.001){
      b.inverse = !b.inverse;
    }
  }

  if(frameCount % 60 == 0){
    let first = blocks.shift();
    blocks.push(first);
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

class Block {
  constructor(w, h){
    this.w = w;
    this.h = h;

    this.color = fills[floor(random(0, fills.length))];
    this.secondColor = this.invertColor();

    this.inverse = random() > 0.5 ? true : false;

    //hold all possible drawing funcs in an array
    this.drawFuncs = [
      this.solid,
      this.leftSlash,
      this.rightSlash,
      this.rightTri,
      this.leftTri,
      this.topTri,
      this.bottomTri,
    ];

    if(random() < 0.25){
      this.type = floor(random(1, this.drawFuncs.length));
    } else {
      this.type = 0;
    }
  }

  draw(x, y){
    this.drawFuncs[this.type].call(this, x, y); //call the specific drawing function with this refering to this block, not this func
  }

  invertColor(){
    let r, g, b;

    r = 255 - this.color.r;
    g = 255 - this.color.g;
    b = 255 - this.color.b;

    return {r: r, g: g, b: b}
  }

  //drawing funcs definitions
  solid(x, y){
    let ground;
    if(this.inverse){
      ground = this.secondColor 
    } else {
      ground = this.color
    }

    fill(ground.r, ground.g, ground.b);
    rect(x, y, this.w, this.h);
  }

  leftSlash(x, y){
    let ground, foreground
    if(this.inverse){
      ground = 255;
      foreground = 0;
    } else {
      ground = 0;
      foreground = 255;
    }

    fill(ground);
    rect(x, y, this.w, this.h);

    //draw slash
    let offset = this.w / 4;
    fill(foreground);
    beginShape();
    vertex(x + this.w, y);
    vertex(x + this.w, y + offset);
    vertex(x + offset, y + this.h);
    vertex(x, y + this.h);
    vertex(x, y + this.h- offset);
    vertex(x + this.w- offset, y);
    vertex(x + this.w, y);
    endShape(CLOSE);
  }

  rightSlash(x, y){
    let ground, foreground
    if(this.inverse){
      ground = 255;
      foreground = 0;
    } else {
      ground = 0;
      foreground = 255;
    }

    fill(ground);
    rect(x, y, this.w, this.h);

    //draw slash
    let offset = this.w / 4;
    fill(foreground);
    beginShape();
    vertex(x, y);
    vertex(x + offset, y);
    vertex(x + this.w, y + this.h - offset);
    vertex(x + this.w, y + this.h);
    vertex(x + this.w - offset, y + this.h);
    vertex(x, y + offset);
    vertex(x, y);
    endShape(CLOSE);
  }

  rightTri(x, y){
    let ground, foreground
    if(this.inverse){
      ground = 255;
      foreground = 0;
    } else {
      ground = 0;
      foreground = 255;
    }

    fill(ground);
    rect(x, y, this.w, this.h);

    fill(foreground);
    beginShape();
    vertex(x, y);
    vertex(x, y + this.h);
    vertex(x + this.w, y + this.h/2)
    vertex(x, y);
    endShape();
  }

  leftTri(x, y){
    let ground, foreground
    if(this.inverse){
      ground = 255;
      foreground = 0;
    } else {
      ground = 0;
      foreground = 255;
    }

    fill(ground)
    rect(x, y, this.w, this.h);

    fill(foreground);
    beginShape();
    vertex(x + this.w, y);
    vertex(x + this.w, y + this.h);
    vertex(x, y + this.h/2)
    vertex(x + this.w, y);
    endShape();
  }

  topTri(x, y){
    let ground, foreground
    if(this.inverse){
      ground = 255;
      foreground = 0;
    } else {
      ground = 0;
      foreground = 255;
    }

    fill(ground)
    rect(x, y, this.w, this.h);

    fill(foreground);
    beginShape();
    vertex(x, y);
    vertex(x + this.w, y);
    vertex(x + this.w/2, y + this.h)
    vertex(x, y);
    endShape();
  }

  bottomTri(x, y){
    let ground, foreground
    if(this.inverse){
      ground = 255;
      foreground = 0;
    } else {
      ground = 0;
      foreground = 255;
    }

    fill(ground)
    rect(x, y, this.w, this.h);

    fill(foreground);
    beginShape();
    vertex(x, y + this.h);
    vertex(x + this.w, y + this.h);
    vertex(x + this.w/2, y)
    vertex(x, y + this.h);
    endShape();
  }
}

