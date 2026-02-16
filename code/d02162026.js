//grid division
let staticGrid;
let testGrid;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  testGrid = new Grid(width, height, 10, 10, true);
  staticGrid = new Grid(width, height, 100, 100, false, 200, 0.5);
}

function draw() {
  background(255);

  // staticGrid.draw();

  let numCols = floor(constrain(mouseX/width, 0, 1) * 10) + 1
  let numRows = floor(constrain(mouseY/height, 0, 1) * 10) + 1

  testGrid = new Grid(width, height, numCols, numRows, true);

  testGrid.draw();


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
  constructor(w, h, numCols, numRows, diagonals = false, strokeColor = 0, strokeWeight = 1){
    this.w = w;
    this.h = h;
    this.numCols = numCols;
    this.numRows = numRows;
    this.diagonals = diagonals;
    this.cellW = w/numCols;
    this.cellH = h/numRows;
    this.weight = strokeWeight;
    this.color = strokeColor;
    this.cells = [];

    for(let i = 0; i < this.numRows; i++){
      let y = i * this.cellH;
      for(let j = 0; j < this.numCols; j++){
        let x = j * this.cellW;
        this.cells.push({x: x, y: y});
      }
    }
  }

  draw(){
    strokeWeight(this.weight);
    for(let c of this.cells){
      // console.log('ey');
      noFill();
      rect(c.x, c.y, this.cellW, this.cellH);

    }
    
    if(this.diagonals){
      strokeWeight(this.weight * 2);
      //row diagonals
      for(let i = 0; i < this.numRows; i++){
        let startY = i * this.cellH;
        let endY = (i + 1) * this.cellH;
        let startX = 0;
        let endX = this.w;
        line(startX, startY, endX, endY);
      }

      //col diagonals
      for(let i = 0; i < this.numCols; i++){
        let startX = i * this.cellW;
        let endX = (i + 1) * this.cellW;
        let startY = 0;
        let endY = this.h;
        line(startX, startY, endX, endY);
      }

    }
  }
}
