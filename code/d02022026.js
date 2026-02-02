//snake movement
let numCols, numRows;
let cells = [];

let mover;

let numLines; 
let offset;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  //find a complete shape

  reset();
  //more drawing the liens
}

function build(){
  cells = []; //reset cells
  numCols = 10;
  numRows = 10;
  let cellWidth = width/numCols;
  let cellHeight = height/numRows;

  for(let i = 0; i < numRows; i++){
    let row = [];
    for(let j = 0; j < numCols; j++){
      row.push(new Cell(j * cellWidth, i * cellHeight, cellWidth, cellHeight));
    }
    cells.push(row);
  }

  //setup the mover 
  let x = floor(random(1, numCols-1));
  let y = floor(random(1, numRows-1));
  mover = new Mover(x, y, cells);
}

function reset(){
  build();

  //find a closed shape
  let count = 0;
  while(mover.complete == false){
    console.log(count);
    count++;
    if(mover.alive == true){
      mover.move();
    } else if(mover.complete == true){
      break;
    } else if(mover.alive == false){
      build(); //new mover
    }
  }
}

function draw() {
  background(255);

  // print("loop");
  for(let r of cells){
    for(let c of r){
      c.draw();
    }
  }

  if(frameCount % 10 == 0){
    reset();
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
    this.dir = null;
  }

  draw(){
    // if(this.filled){
    //   fill(this.filled);
    //   // print("this is filled");
    // } else {
    //   fill(255);
    // }
    // rect(this.x, this.y, this.w, this.h);
     
    if(this.filled){
      this.lines()
    }
  }

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
    this.env[this.y][this.x].filled = this.color;
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
      } else if(tryY == this.startY && tryX == this.startX){ //start check
        //back to start
        this.alive = false;
        this.complete = true;
        console.log("complete")
        break;
      } else if(this.env[tryY][tryX].filled == false){ //fille check
        this.x = tryX;
        this.y = tryY;
        this.env[this.y][this.x].filled = this.color;
        this.env[this.y][this.x].dir = this.dir;

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
}
