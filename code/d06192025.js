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

  agent = {x: 5, y: 5, type: floor(random(0, 4))}
  // noLoop();
  currentCell = setCurrent();

  console.log(currentCell);
  currentCell.setType(agent.type);

  strokeWeight(3);
}

function draw(){
  background(255);
  for(let i = 0; i < cells.length; i++){
    cells[i].draw();
  }

  if(frameCount % 20 == 0){
    updateAgent();
    currentCell = setCurrent();
    currentCell.setType(agent.type)
    currentCell.stroke = color(random(0,255), random(0,255), random(0,255))
  }
}

function updateAgent(){
  let nextState = floor(random(0, 2));
  console.log(`current: ${agent.type}, next: ${nextState}`);

  if(agent.type == 0){
    if(nextState == 0){
      agent.x++;
      agent.y--;
      agent.type = 2;
    } else {
      agent.y--;
      agent.type = 7;
    }
  } else if(agent.type == 1){
    if(nextState == 0){
      agent.x++;
      agent.y++;
      agent.type = 3;
    } else {
      agent.x++;
      agent.type = 0;
    }
  } else if(agent.type == 2){
    if(nextState == 0){
      agent.x++
      agent.y--;
      agent.type = 0;
    } else {
      agent.x++;
      agent.type = 3;
    }
  } else if(agent.type == 3){
    if(nextState == 0){
      agent.y++;
      agent.type = 4;
    } else {
      agent.x++;
      agent.y++;
      agent.type = 1;
    }
  } else if(agent.type == 4){
    if(nextState == 0){
      agent.x--;
      agent.y++;
      agent.type = 6;
    } else {
      agent.x--;
      agent.type = 5;
    }
  } else if(agent.type == 5){
    if(nextState == 0){
      agent.y--;
      agent.type = 2;
    } else {
      agent.x--;
      agent.y--;
      agent.type = 7;
    } 
  } else if(agent.type == 6){
    if(nextState == 0){
      agent.x--;
      agent.y++;
      agent.type = 4;
    } else {
      agent.y++;
      agent.type = 1;
    }
  } else if(agent.type == 7){
    if(nextState == 0){
      agent.x--;
      agent.type = 6;
    } else {
      agent.x--;
      agent.y--;
      agent.type = 5;
    }
  }
}

function setCurrent(){
  let cell = cells[
    ((agent.x % numCols) + numCols) % numCols +
    (((agent.y % numRows) + numRows) % numRows) * numCols
  ];

  return cell
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
    // this.type = floor(random(0, 4));
    // this.type = 3;
    this.stroke = color(random(0, 255), random(0,255), random(0,255))
  }

  draw(){
    // rect(this.x, this.y, this.w, this.h);

    noFill();


    if(this.type != undefined){
      strokeWeight(10);
      stroke(this.stroke);
      if(this.type == 0 || this.type == 4){
        arc(this.x, this.y, this.w * 2, this.h * 2, 0, HALF_PI);
      } else if(this.type == 1 || this.type == 5) {
        arc(this.x + this.w, this.y, this.w * 2, this.h * 2, HALF_PI, PI);
      } else if(this.type == 2 || this.type == 6) {
        arc(this.x + this.w, this.y + this.h, this.w * 2, this.h * 2, PI, HALF_PI * 3);
      } else if(this.type == 3 || this.type == 7) {
        arc(this.x, this.y + this.h, this.w * 2, this.h * 2, HALF_PI * 3, TWO_PI);
      }
    }

    // ellipse(this.x, this.y, 10, 10);


    //draw an arc based on the arc type
  }

  setType(type){
    this.type = type;
    this.filled = true;
  }
}