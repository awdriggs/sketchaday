let blocks = [];
let numRows, numCols, blockWidth, blockHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numRows = 10;
  numCols = 10;
  blockWidth = width/numCols;
  blockHeight = height/numRows;

  let total = numRows * numCols;

  for(let i = 0; i < total; i++) {
    blocks.push(new Block(blockWidth, blockHeight, floor(random(0, 4)), random() > 0.5 ? "black" : "white", random() > 0.5 ? "red" : "green"));
  }
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
  constructor(w, h, type, color1, color2){
    this.w = w;
    this.h = h;
    this.type = type;
    this.primaryColor = color1;
    this.secondaryColor = color2;
  }

  draw(x,y){
    fill(this.primaryColor);
    rect(x, y, this.w, this.h);
  }

}

