//a growing stain
//start with one pixel
//it "infects" an adjacent pixel
//each new adjecent pixel can infect another adjacent pixel
//add some probabiity to it deosn't just grow at a steady rate

console.log("yo");

let movers = []; //you could just use pixels, but this gives you more control over size
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
  let x = floor(random(0, numCols));;
  let y = floor(random(0, numRows));;
  movers.push(new Agent(x, y));



  // build the grid of empty cells
  for(let i = 0; i < numRows; i++){
    let row = []
    let y = i * cellSize;
    for(let j = 0; j < numCols; j++){
      let x = j * cellSize;
      row.push(new Cell(x, y, cellSize, false));
    }
    grid.push(row);
  }

  noStroke();

}

function draw() {
  background(255);

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let c = grid[i][j];
      c.draw();
      // c.move();
      // c.grow();
    }
  }

  for(let m of movers){
    m.move();
    grid[m.y][m.x].filled = true;
    m.grow();
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
    if(this.filled){
      fill(0)
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.s, this.s);
  }

}

class Agent {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }



  move(){
    // console.log('growing');
    //row the dice, if below thres, grow
    if(random() < 0.5){
      // console.log("grow");
      let dir = floor(random(0, 4));
      //choose a random dpad direction to grow
      let x = this.x;
      let y = this.y;

      if(dir == 0){
        x += 1;
      } else if(dir == 1){
        x -= 1;
      } else if(dir == 2){
        y += 1;
      } else {
        y -= 1;
      }

      if(x < numCols && x > 0 && y < numRows && y > 0){
        this.x = x;
        this.y = y;
      }
    }
  }

  grow(){
    if(random() < 0.01 && movers.length < 100){
      movers.push(new Agent(this.x, this.y));
    }
  }
}
