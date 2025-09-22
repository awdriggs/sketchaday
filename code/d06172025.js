//make a "world" a grid of cols and rows
//create a agent that can move through the system
//the agent starts at a random axis
//the agent moves in direction specified by its previous arctype

// let universe = [];
let cells = [];
let numCols = 10;
let numRows = 10;

let agent; 
let currentCell;

function setup(){
  createCanvas(800, 800);

  let cellHeight = height/numRows;
  let cellWidth = width/numCols;

  for(let i = 0; i < numRows; i++){
    // let row = [];
    let y = i * cellHeight;

    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;
      cells.push(new Cell(x, y, cellWidth, cellHeight))
    }
  }

  agent = {x: 5, y: 5, prevType: floor(random(0, 4))}
  // noLoop();
  currentCell = cells[
    ((agent.x % numCols) + numCols) % numCols +
    (((agent.y % numRows) + numRows) % numRows) * numCols
  ];
  console.log(currentCell);
  currentCell.setType(3);

  strokeWeight(3);
}

function draw(){
  background(255);
  for(let i = 0; i < cells.length; i++){
    cells[i].draw();

    if(frameCount % 60 == 0){
      let randTest = floor(random(0, 4))
      cells[i].setType(randTest);
    }
  }


  // if(frameCount % 60 == 0){
  //   currentCell.setType(floor(random(0, 4)))
  // }
}

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
    this.type = floor(random(0, 4));
    // this.type = 3;
  }

  draw(){
    // rect(this.x, this.y, this.w, this.h);

    noFill();

    if(this.type != undefined){

      if(this.type == 0){
        arc(this.x, this.y, this.w * 2, this.h * 2, 0, HALF_PI);
      } else if(this.type == 1) {
        arc(this.x + this.w, this.y, this.w * 2, this.h * 2, HALF_PI, PI);
      } else if(this.type == 2) {
        arc(this.x + this.w, this.y + this.h, this.w * 2, this.h * 2, PI, HALF_PI * 3);
      } else {
        arc(this.x, this.y + this.h, this.w * 2, this.h * 2, HALF_PI * 3, TWO_PI);
      }
    }

    // ellipse(this.x, this.y, 10, 10);


    //draw an arc based on the arc type
  }

  setType(type){
    this.type = type;
  }
}