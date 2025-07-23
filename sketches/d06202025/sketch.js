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

  agent = {x: 5, y: 5, type: floor(random(0, 8)), alive: true}

  // noLoop();
  currentCell = getCell(agent.x, agent.y);

  console.log(currentCell);
  currentCell.setType(agent.type);

  strokeWeight(3);
}

function draw(){
  background(255);
  for(let i = 0; i < cells.length; i++){
    cells[i].draw();
  }

  if(frameCount % 20 == 0 && agent.alive){
    let nextState = floor(random(0, 2)); //test one of the two combos
    updateAgent(nextState, 0); //give it a state to try, first try

    if(agent.alive){ //agent might be dead after update cell, better check
      currentCell = getCell(agent.x, agent.y);

      currentCell.setType(agent.type)
      currentCell.stroke = color(random(0,255), random(0,255), random(0,255))
    }
  }
}

function updateAgent(nextState, tries){
  //recursive funtion, see
  // let nextState = floor(random(0, 2));
  console.log(`current: ${agent.type}, next: ${nextState}`);

  if(tries > 1) {
    //you've tried both posibilities, agent should stop.
    agent.alive = false;
    console.log("agent die");
  } else { //attempt to update
    tries++; //we're trying

    //hold on to these values 
    let x = agent.x;
    let y = agent.y;
    let nextType;

    //setup the next move
    if(agent.type == 0){
      if(nextState == 0){
        x++;
        y--;
        nextType = 2;
      } else {
        y--;
        nextType = 7;
      }
    } else if(agent.type == 1){
      if(nextState == 0){
        x++;
        y++;
        nextType = 3;
      } else {
        x++;
        nextType = 0;
      }
    } else if(agent.type == 2){
      if(nextState == 0){
        x++
        y--;
        nextType = 0;
      } else {
        x++;
        nextType = 3;
      }
    } else if(agent.type == 3){
      if(nextState == 0){
        y++;
        nextType = 4;
      } else {
        x++;
        y++;
        nextType = 1;
      }
    } else if(agent.type == 4){
      if(nextState == 0){
        x--;
        y++;
        nextType = 6;
      } else {
        x--;
        nextType = 5;
      }
    } else if(agent.type == 5){
      if(nextState == 0){
        y--;
        nextType = 2;
      } else {
        x--;
        y--;
        nextType = 7;
      }
    } else if(agent.type == 6){
      if(nextState == 0){
        x--;
        y++;
        nextType = 4;
      } else {
        y++;
        nextType = 1;
      }
    } else if(agent.type == 7){
      if(nextState == 0){
        x--;
        nextType = 6;
      } else {
        x--;
        y--;
        nextType = 5;
      }
    }

    //is the cell you want to move to free?
    let cellToTest = getCell(x, y);

    if(cellToTest.filled == false){
      //yes, update agent,
      agent.x = x;
      agent.y = y;
      agent.type = nextType;
    } else {
      //no? set next stat to the opposite of what it is
      if(nextState == 0) {
        nextState = 1;
      } else {
        nextState = 0;
      }
      //recursion
      updateAgent(nextState, tries);

    }
  }
}

function getCell(x, y){
  let cell = cells[
    ((x % numCols) + numCols) % numCols +
    (((y % numRows) + numRows) % numRows) * numCols
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

