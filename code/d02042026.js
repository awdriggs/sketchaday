//snake movement
let numCols, numRows;
let cells = [];

let mover;
let usedStarts = [];

let numLines;
let offset;

let shapes = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  reset();
}

function draw() {
  background(255);

  //draw the outlines
  for(let r of cells){
    for(let c of r){
      c.draw();
    }
  }
  // print("loop");
  noFill();
  stroke(0);
  for (let s of shapes) {
    beginShape();
    for(let v of s){
      vertex(v.x, v.y);
    }
    endShape(CLOSE); // CLOSE connects back to start
  }

  if(frameCount % 30 == 0){
    reset();
  }
}

function buildCells(){
  cells = []; //reset cells
  numCols = 20;
  numRows = 20;
  let cellWidth = width/numCols;
  let cellHeight = height/numRows;

  for(let i = 0; i < numRows; i++){
    let row = [];
    for(let j = 0; j < numCols; j++){
      row.push(new Cell(j * cellWidth, i * cellHeight, cellWidth, cellHeight));
    }
    cells.push(row);
  }

}

function createMover(){
  // Find unfilled cells to start on
  let available = [];
  for(let y = 1; y < numRows - 1; y++){
    for(let x = 1; x < numCols - 1; x++){
      if(!cells[y][x].filled){
        available.push({x: x, y: y});
      }
    }
  }

  if(available.length === 0){
    return null; // Grid is full
  }

  let start = random(available);
  return new Mover(start.x, start.y, cells);
}

function reset(){
  shapes = [];
  buildCells();
  mover = createMover();

  let failures = 0;
  let maxFailures = 100;

  while(true){
    if(mover.alive == true){
      mover.move();
      if(mover.complete == true){
        shapes.push(mover.getPath());
        failures = 0; // Reset on success
        mover = createMover(); // Start next mover
        if(mover === null){
          break; // Grid is full
        }
      }
    } else if(mover.alive == false){
      mover.clearCells(); // Free up cells for reuse
      failures++;
      if(failures >= maxFailures){
        break;
      }
      mover = createMover();
      if(mover === null){
        break;
      }
    }
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

function mousePressed(){
  reset();
}

class Cell {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.filled = false;
  }

  draw(){

    if(this.filled){
      fill(this.filled);
      noStroke();
      rect(this.x, this.y, this.w, this.h);
      // print("this is filled");
    } //else {
    // fill(255);
    // noFill();
    //}
    //rect(this.x, this.y, this.w, this.h);

    // if(this.filled){
    //   this.lines()
    // }
  }

  //not using, keeping for reference for later
  lines(){
    let numLines = 20;
    let offset = this.w/numLines;

    //draw from the center line
    if(this.dir == 1 || this.dir == 3){
      line(this.x + this.w/2, this.y, this.x + this.w/2, this.y + this.h);
    } else {
      line(this.x, this.y + this.h/2, this.x + this.w, this.y + this.h/2);
    }
    // for(let i = 0; i < numLines; i++){
    //   if(this.dir == 1 || this.dir == 3){
    //     line(this.x + i * offset, this.y, this.x + i * offset, this.y + this.h);
    //   } else {
    //     line(this.x, this.y + i * offset, this.x + this.w, this.y + i * offset);
    //   }
    // }
  }
}

class Mover {
  constructor(sx, sy, env){
    this.x = sx;
    this.y = sy;
    this.startX = sx;
    this.startY = sy;
    this.env = env; //have access to the environment?
    this.dir = floor(random(0, 4));
    this.alive = true;
    this.complete = false;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.vertices = []; //store your path
    this.saveVertex(); //set the first path

  }

  move(){
    //strong desire to move in the same direction you were headed, small randomness to turn before attempting moves
    if(random() < 0.4){
      this.turn();
    }

    //move while if you can, turn if can't
    let tries = 20;

    while(tries > 0){
      let tryX = this.x;
      let tryY = this.y;

      //get the next location
      if(this.dir == 0){
        tryX = this.x + 1;
      } else if(this.dir == 1){
        tryY = this.y + 1;
      } else if(this.dir == 2){
        tryX = this.x - 1;
      } else if(this.dir == 3){
        tryY = this.y - 1;
      }

      //boundry check
      if(tryX < 1 || tryX >= this.env[this.y].length-1){
        this.turn();
        tries--;
      } else if(tryY < 1 || tryY >= this.env.length-1){
        this.turn();
        tries--;
      } else if(tryY == this.startY && tryX == this.startX && this.vertices.length >= 4){ //start check, min 4 cells for a polygon
        //back to start
        this.alive = false;
        this.complete = true;
        console.log("complete")
        break;
      } else if(this.env[tryY][tryX].filled == false){ //fille check
        this.x = tryX;
        this.y = tryY;
        this.saveVertex();
        break;
      } else {
        this.turn();
        tries--;
      }
    }

    if(tries == 0){
      this.alive = false;
      console.log("dead");
    }
  }

  turn(){
    //turn, if dir % 2 == 0, thin you can turn to either 1 or 3, else you can turn to direction 0 or 2
    if(this.dir % 2 == 0){
      this.dir = random() > 0.5 ? 1 : 3;
    } else {
      this.dir = random() > 0.5 ? 0 : 2;
    }
  }

  saveVertex(){
    let cell = this.env[this.y][this.x];
    cell.filled = this.color;
    this.vertices.push(cell);  // Store cell reference
  }

  clearCells(){
    for(let cell of this.vertices){
      cell.filled = false;
    }
  }

  getPath(){
    return this.vertices.map(cell => ({
      x: cell.x + cell.w/2,
      y: cell.y + cell.h/2
    }));
  }
}
