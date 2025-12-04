let blocks = [];
let numRows, numCols, blockWidth, blockHeight;
let fills = ["blue", "purple", "yellow", "orange"]

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

    this.inverse = random() > 0.5 ? true : false;

    //hold all possible drawing funcs in an array 
    this.drawFuncs = [
      this.solid,
      this.leftSlash,
      this.rightSlash,
      this.rightTri,
      this.leftTri
    ];

    this.type = floor(random(0, this.drawFuncs.length));
  }

   
  draw(x, y){
    this.drawFuncs[this.type].call(this, x, y); //call the specific drawing function with this refering to this block, not this func
  }

  //drawing funcs definitions
  solid(x, y){
    fill(this.color);
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

}

