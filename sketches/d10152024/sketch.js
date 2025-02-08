let cells = [];

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  gridify();
  noStroke();
  // testCell = new Cell(100, 100, 100, 100);

}

function draw() {
  background(255);
  for(let c of cells){
    c.show();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridify();
}

function gridify(){
  let cellSize = 50;
  //set spacing between cols
  let margin = 10; //left/right/top/bottom
  //determine num cols
  let numCols = floor(width/(cellSize + margin)); 
  //determine num rows
  let numRows = floor(height/(cellSize + margin)); 
  print(numCols, numRows);
  //double for, made the grid
  for(let i = 0; i < numCols; i++){
    for(let j = 0; j < numRows; j++){
      cells.push(new Cell(margin * i + i * cellSize + margin, margin * j + j * cellSize + margin, cellSize, 255));    
    }
  }
}

class Cell {
  constructor(x, y, size, c){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = c;
  }

  show(){
    if(this.mouseIn()){
      if(this.color > 0){
        // this.color--;
        this.color = 0;
      }
    } else {
      if(this.color < 255){
        this.color++;
      }
    }

    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  mouseIn(){
    if(mouseX > this.x && mouseX < this.x + this.size  && mouseY > this.y && mouseY < this.y + this.size){
      console.log("hover");
      return true
    } else {
      return false
    }
  }
}
