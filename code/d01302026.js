//snake movement
let numCols, numRows;
let cells = [];

let mover;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  build(); 
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

  let x = floor(random(0, numCols));
  let y = floor(random(0, numRows));
  mover = new Mover(x, y, cells);
}

function draw() {
  background(255);

  print("loop");
  for(let r of cells){
    for(let c of r){
      c.draw();
    }
  }

  if(frameCount % 30 == 0){
    mover.move();
  }

  if(mover.alive == false){
    build();
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
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.filled = false;
  }

  draw(){
    if(this.filled == true){
      fill(0, 0, 255);
      print("this is filled");
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}

class Mover {
  constructor(sx, sy, env){
    this.x = sx;
    this.y = sy;
    this.env = env; //have access to the environment?
    this.env[this.y][this.x].filled = true;
    this.dir = floor(random(0, 4));
    this.alive = true;
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
      if(tryX < 0 || tryX >= this.env[this.y].length){
        this.turn();
        tries--;
      } else if(tryY < 0 || tryY >= this.env.length){
        this.turn();
        tries--;
      } else if(this.env[tryY][tryX].filled == false){ //fille check
        this.x = tryX;
        this.y = tryY;
        this.env[this.y][this.x].filled = true;
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
