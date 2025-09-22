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
  // createCanvas(300, 300);

  numCols = floor(width / cellSize);
  numRows = floor(height / cellSize);
  console.log(width, height);

  resetWorld();

  
  for(let i = 0; i < numRows; i++){
    let randomX = floor(random(0, numCols));
    let dir = random() > 0.5 ? 0 : 180;
    snakes.push(new Snake(randomX, i, dir, randomColor()));
  }

  for(let i = 0; i < numCols; i++){
    let randomY = floor(random(0, numRows));
    // let dir = 270;
    let dir = random() > 0.5 ? 90 : 270;
    snakes.push(new Snake(i, randomY, dir, randomColor()));
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
    saveGif('thumb', floor(random(3, 8)));
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
  // let r = random(0, 255);
  // let g = random(0, 255);
  // let b = random(0, 255);
  // return color(r,g,b, 10);

  let colorArray = [color("#d72638"), color("#235789"), color("#80ff72")]
// let colorArray = [color(147, 181, 198, 10), color(221, 237, 170, 10), color(240, 207, 101, 100), color(215, 129, 106, 10), color(189, 79, 108, 10)];
  return colorArray[floor(random(colorArray.length))];
}


class Snake {
  constructor(x, y, d, c){
    this.posX = x;
    this.posY = y;
    this.dir = d; //always a multiple of 90, 90 is down, 180 is left, 270 is up
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
      // this.posY++;

      if(this.posY < world[0].length-1){
        this.posY++;
      } else {
        this.posY = 0;
      }

    } else if(this.posX < 0){ //left moving, 
      this.posX = 0;
      this.dir = 0;

      if(this.posY < world[0].length-1){
        this.posY++;
      } else {
        this.posY = 0;
      }

    } else if(this.posY >= world[0].length){  //check top and bottom
      print("bottom");
      this.dir = 270;
      this.posY = world[0].length - 1;
      // this.dir = 270;
      // this.posY = 0;
      if(this.posX < world.length-1){
        this.posX++;
      } else {
        this.posX = 0;
      }
       

      
      // this.posX++;
    } else if(this.posY < 0){
      // this.dir = 90;
      this.dir = 90;
      this.posY = 0;
      // this.dir = 
      if(this.posX < world.length-1){
        this.posX++;
      } else {
        this.posX = 0;
      }
    }

  }
}