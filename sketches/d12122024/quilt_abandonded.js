//inspired by https://americanart.si.edu/artwork/tartan-119498
//tartan quilt patter
let test;

//check
let check = [
  {block: "solid", colors: ["grey"]},
  {block: "solid", colors: ["lightgrey"]}
]

let stripe = [
  {block: "solid", colors: ["grey"]},
  {block: "solid", colors: ["lightgrey"]}
]

function setup() {

  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  test = new Quilt(100, 100, 600, 5, testPattern, []);

}

function draw() {
  background(255);
  test.draw();
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

class Quilt{
  constructor(x, y, s, d, p, c) {
    this.originX = x
    this.originY = y
    this.size = s;
    this.dim = d;
    this.pattern = p; //an array of block types
    this.colors = c; //an array of colors
    // this.height = h;
    this.blocks = [];
    this.patternIndex = 0;

    this.setup();
  }

  setup(){
    //everything is square
    let blockDim = this.dim;
    // debugger;
    let blockSize = this.size/blockDim;

    for(let i = 0; i < blockDim; i++){
      let x = this.originX + i * blockSize;
      for(let j = 0; j < blockDim; j++){
        let y = this.originY + j * blockSize;
        let type = this.pattern[this.patternIndex];

        this.blocks.push(new Block(x,y, blockSize, type));
        
        this.incrementPatternIndex();
      }
    }
  }

  draw() {
    for(let b of this.blocks){
      b.draw();
    }
  }

  incrementPatternIndex() {
    this.patternIndex++;
    
    if(this.patternIndex >= this.pattern.length){
      this.patternIndex = 0;
    }
  }

}

class Block{
  constructor(x, y, s, t){
    this.x = x;
    this.y = y;
    this.size = s;
    this.type = t;
  }

  draw(){
    console.log("drawing block");

    if(this.type.block == "solid"){
      this.solid(this.type.colors);
    }
    // rect(this.x, this.y, this.size, this.size);
  }

  solid(colors){
    fill(colors[0]);
    rect(this.x, this.y, this.size, this.size);
  }
}

//for later! 
class Pattern {
  
}
