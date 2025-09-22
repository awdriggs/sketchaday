//a growing stain
//start with one pixel
//it "infects" an adjacent pixel
//each new adjecent pixel can infect another adjacent pixel
//add some probabiity to it deosn't just grow at a steady rate

console.log("yo");

let cells = []; //you could just use pixels, but this gives you more control over size
let grid = [];
let numCols, numRows;
let threshold = 0.5;
let cellSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  // numCols = width/2;
  // numRows = height/2;
  numCols = 100;
  numRows = 100;
  cellSize = width/numCols;

  // let x = floor(random(0, numCols));
  // let y = floor(random(0, numRows));
  let x = width/2;
  let y = height/2;
  cells.push(new Cell(x, y, cellSize, false));

  //build the grid of empty cells
  // for(let i = 0; i < numRows; i++){
  //   let y = i * cellSize;
  //   for(let j = 0; j < numCols; j++){
  //     let x = j * cellSize;
  //     grid.push(new Cell(x, y, cellSize, false)); 
  //   }
  // }
}

function draw() {
  background(255);

  for(let c of cells){
    c.draw();
    c.move();
    c.grow();
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

class Cell {
  constructor(x, y, size, filled) {
    this.x = x;
    this.y = y;
    this.s = size;
    this.filled = filled;
  }

  draw(){
    fill(0);
    rect(this.x, this.y, this.s, this.s);
  }

  move(){
    // console.log('growing'); 
    //row the dice, if below thres, grow
    if(random() < 0.5){ 
      // console.log("grow");
      let dir = floor(random(0, 4));
      //choose a random dpad direction to grow
      let x = 0;
      let y = 0;

      if(dir == 0){
        x += cellSize;
      } else if(dir == 1){
        x -= cellSize;
      } else if(dir == 2){
        y += cellSize;
      } else {
        y -= cellSize;;
      }

      this.x = this.x + x;
      this.y = this.y + y;

      //no edge detection, let it bleed off the page!
      // cells.push(new Cell(this.x + x, this.y + y, this.s, false));
    }
  }

  grow(){
    if(random() < 0.01 && cells.length < 100){ 
      cells.push(new Cell(this.x, this.y, this.s, false));
    }
  }
}