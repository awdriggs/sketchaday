let distance;
let prevPos, endPos;
let currentRow, currentCol;
let numCols, numRows;

let cells = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  numCols = 10;
  numRows = 10;

  let rectW = width/numCols;
  let rectH = height/numRows;

  for(let i = 0; i < numRows; i++){
    let row = []
    for(let j = 0; j < numCols; j++){
      row.push(new Cell(j * rectW + rectW/2, i * rectH + rectH/2, rectW, rectH))
    }
    cells.push(row);
  }
}

function draw() {
  background(100);

  for(let i = 0; i < cells.length; i++){
    let row = cells[i];
    for(let j = 0; j < row.length; j++){
      let c = row[j];
      if(currentCol == j && currentRow == i){
        fill("green");
      } else if(currentCol == j){
        fill("yellow");
      } else if(currentRow == i){
        fill("blue");
      } else {
        fill("white");
      } 

      c.draw(); 
    }
  }

  fill(0); 
  ellipse(mouseX, mouseY, 5, 5);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed(){
  //determine which column was clicked
  print('click');
  currentCol = getCol();

  //determine which row was clicked
  currentRow = getRow();

  print(currentCol, currentRow);

  distance = 0; //zero out the distance
  prevPos = createVector(mouseX, mouseY);
}

//old sketch, save for later
// function mousePressed(){
// }

// function mouseReleased(){
//   // endPos = createVector(mouseX, mouseY);
//   // distance = p5.Vector.dist(startPos, endPos);
// }

function mouseDragged(){
  currentPos = createVector(mouseX, mouseY);
  let moveX = currentPos.x - prevPos.x;
  let moveY = currentPos.y - prevPos.y;

  //go through the columns
  //if the column is the current column  
  //increase wdith by the amount
  //else decrese width by amound
  //go through the rows
  //if the row is the current row

  for(let i = 0; i < cells.length; i++){
    

    for(let j = 0; j < cells[i].length; j++){
      //i is row, j is col
      //determine whether to grow or shrink the width  
      let cell = cells[i][j];

      if(j == currentCol){
        wdir = 1;  //check to grow
        cell.w += moveX;
      } else {
        cell.w -= moveX/(numCols-1);
      }

      if(i == currentRow){
        cell.h += moveY;
      } else {
        cell.h -= moveY/(numRows-1);
      }

      constrain(cell.w, 1, width);
      constrain(cell.h, 1, height);
    }
  }

  prevPos = currentPos
}

function getCol(){
  //go through the array, just the first row would work
  print('check col');
  let cols = cells[0]; //just check the cols in the first row

  //see if the mouse x is within the bounds?
  for(let i = 0; i < cols.length; i++){
    let c = cols[i]
    if(mouseX > c.x - c.w/2 && mouseX < c.x + c.w/2){
      return i
    }
  }
}

function getRow(){
  print('check col');

  //see if the mouse x is within the bounds?
  for(let i = 0; i < cells.length; i++){
    let c = cells[i][0]; //first coumn of each row

    if(mouseY > c.y - c.h/2 && mouseY < c.y + c.h/2){
      return i;
    }
  }
}



class Cell {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(){
    rect(this.x, this.y, this.w, this.h);
  }
}