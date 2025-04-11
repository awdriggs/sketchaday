let cells = [];

function setup() {
  createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);

  let numCols = 3;
  let numRows = 3;

  let w = width/numCols;
  let h = width/numRows;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){

      let x = j * w;
      let y = i * h;

      let o = "horiziontal";

      let c = random(1, 10);

      cells.push(new Cell(x, y, w, h, o, c));
    }
  }

  fill(255);
  noStroke();
}

function draw() {
  background(0);
  for(let c of cells){
    c.draw();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(x, y, width, height, orientation, count){
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigt = height;
    this.orientation = orientation;
    this.count = count;
    this.space = this.width/this.count;
    this.size = random(this.space * 0.2, this.space * 0.8);
  }

  draw(){
    //calc spacing
    for(let i = 0; i < this.count; i++){
      if(this.orientation == "horiziontal"){
        rect(this.x, this.y + i * this.space, this.width, this.size);
      } else {
        rect(this.x + i * this.space, this.y, this.size, this.height);
      }
    }
  }

}
