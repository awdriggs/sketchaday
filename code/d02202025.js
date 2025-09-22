//snake movement
//create a grid
//send a snake through it, make it randomly turn

//keep sending snakes, if a cell is free, it can move to it
//only one snake can be alive at a time, so there is only one snake

let world = [];

let snakes = [];

let cellSize = 10;
let numCols, numRows;


function setup() {
  createCanvas(800, 800);

  numCols = floor(width / cellSize);
  numRows = floor(height / cellSize);
  console.log(width, height);

  resetWorld();

  
  for(let i = 0; i < numRows; i++){
    let randomX = floor(random(0, numCols));
    snakes.push(new Snake(randomX, i, randomColor()));
  }

  noStroke();
}

function draw() {
  // background(255);

  drawWorld();

  for(let snake of snakes){
    snake.draw();
    snake.move();
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


// function mousePressed(){
//   let x = floor(mouseX/cellSize)
//   let y = floor(mouseY/cellSize)
//   // debugger;
//   snakes.push(new Snake(x, y, randomColor()));
// }

function resetWorld(){

  for(let i = 0; i < numCols; i++){
    world[i] = [];
    for(let j = 0; j < numRows; j++){
      world[i][j] = color(255, 255, 255);
    }
  }
}


function drawWorld(){
  for(let i = 0; i < world.length; i++){
    for(let j = 0; j < world[i].length; j++){
      let x = i * cellSize;
      let y = j * cellSize;
      fill(world[i][j]);
      rect(x, y, cellSize);
    }
  }
}


function randomColor(){
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);
  return color(r,g,b, 10);
}


class Snake {
  constructor(x, y, c){
    this.posX = x;
    this.posY = y;
    this.dir = 0; //always a multiple of 90, 90 is down, 180 is left, 270 is up
    this.fill = c;
  }

  draw(){
    world[this.posX][this.posY] = this.fill;
  }

  move(){
    if(this.dir == 0){
      this.posX++;
    } else if(this.dir == 180){
      this.posX--;
    } else if(this.dir == 90){
      this.posY++;
    } else if(this.dir == 270){
      this.posY--;
    }

    this.edges();
  }

  check(x, y){

  }

  edges(){
    //check left right
    if(this.posX >= world.length){
      this.posX = world.length-1;
      this.dir = 180;
      this.posY++;
    } else if(this.posX < 0){
      this.posX = 0;
      this.dir = 0;
      this.posY++;
    }

    //check top and bottom
    if(this.posY >= world[0].length){
      print("bottom");
      // this.posY = world[0].length - 1;
      // this.dir = 270;
      this.posY = 0;

      // this.posX++;
    } else if(this.posY < 0){
      // this.dir = 90;
      this.dir = 270;
      // this.posX++;
    }

  }
}