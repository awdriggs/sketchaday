let distance;
let prevPos, endPos;
let currentRow, currentCol;


let cells = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  let numCols = 10;
  let numRows = 10;

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
  //determine which column was clicked
  print('click');
  currentCol = getCol();

  //determine which row was clicked
  currentRow = getRow();

  print(currentCol, currentRow);
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

//old sketch, save for later
// function mousePressed(){
//   distance = 0; //zero out the distance
//   prevPos = createVector(mouseX, mouseY);
// }

// function mouseReleased(){
//   // endPos = createVector(mouseX, mouseY);
//   // distance = p5.Vector.dist(startPos, endPos);
// }

// function mouseDragged(){
//   currentPos = createVector(mouseX, mouseY);

//   rectW = rectW + (currentPos.x - prevPos.x);
//   rectH = rectH + (currentPos.y - prevPos.y);

//   prevPos = currentPos
// }

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
