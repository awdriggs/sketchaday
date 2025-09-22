//snake movement
//create a grid
//send a snake through it, make it randomly turn

//keep sending snakes, if a cell is free, it can move to it
//only one snake can be alive at a time, so there is only one snake

let world = [];

let snakes = [];

let cellSize = 10;
let numCols, numRows;
let numSnakes =100;


function setup() {
  createCanvas(800, 800);
  // createCanvas(300, 300);

  numCols = floor(width / cellSize);
  numRows = floor(height / cellSize);
  console.log(width, height);

  resetWorld();
  resetSnakes();

    noStroke();
}

function draw() {
  background(255);

  drawWorld();

  for(let snake of snakes){
    snake.draw();
    snake.move();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed(){
  resetWorld();
  resetSnakes();
}

function resetWorld(){

  for(let i = 0; i < numCols; i++){
    world[i] = [];
    for(let j = 0; j < numRows; j++){
      world[i][j] = "#FFFFFF";
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

function resetSnakes(){
  snakes = [];
  for(let i = 0; i < numSnakes; i++){
    let randomX = floor(random(0, numCols));
    let randomY = floor(random(0, numRows));
    let dir = floor(random(0,4)) * 90;
    snakes.push(new Snake(randomX, randomY, dir, randomColor()));
  }
}



function randomColor(){
  let colorArray = ["#d72638", "#235789", "#80ff72"]

  return colorArray[floor(random(colorArray.length))];
}


class Snake {
  constructor(x, y, d, c){
    this.posX = x;
    this.posY = y;
    this.dir = d; //always a multiple of 90, 90 is down, 180 is left, 270 is up
    this.fill = c;
    this.alive = true;
  }

  draw(){
    world[this.posX][this.posY] = this.fill;
  }

  move(){
    if(this.alive){
      let turns = 3;
      let turnDir = random() > 0.5 ? -90 : 90; //set turn to cw or ccw
      //look at the current direction you are travlling
      //in the nex cell in that direction is free, move freely, i.e. the color is white
      //else turn 90 in the turn direction
      //check the next cell in that direction
      //repeat until you either find an empty cell to move to
      //if there are no empty cells, you are trapped, you die

      while(turns >= 0){
        let nextX = this.posX;
        let nextY = this.posY;

        if(this.dir == 0){
          nextX++;
        } else if(this.dir == 180){
          nextX--;
        } else if(this.dir == 90){
          nextY++;
        } else if(this.dir == 270){
          nextY--;
        }

        //check if it doesn't exist or is occupied
        if(nextX < 0 || nextY < 0 || world[nextX] == undefined || world[nextX][nextY] == undefined || world[nextX][nextY] != "#FFFFFF"){
          this.dir = (this.dir + turnDir + 360) % 360; // Wrap direction within [0, 90, 180, 270]
          turns--;//take away a turn
        } else {
          this.posX = nextX;
          this.posY = nextY;
          break;
        }

        //if you get here, the next cell was taken
        //loop to check again
      }

      //if you get here, there is no where to go, you die
      if(turns < 0){
        this.alive = false;
        // debugger;
      }

    }
  }

}