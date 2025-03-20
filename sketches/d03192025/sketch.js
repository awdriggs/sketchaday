let numRows, numCols;
let cellSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numRows = 20;
  numCols = 20;
  cellSize = width/numRows; //squares
  noStroke();
  rectMode(CENTER)
}

function draw() {
  background(255);
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){

      fill("red");

      if ((i + j) % 2 == 0) {
        fill("blue"); // White squares
        rect(j * cellSize + cellSize/2, i * cellSize + cellSize/2, cellSize/2, cellSize); 
        fill("red"); // Black squares
        rect(j * cellSize + cellSize/2, i * cellSize + cellSize/2, cellSize, cellSize/2); 
      } else {
        fill("red"); // Black squares
        rect(j * cellSize + cellSize/2, i * cellSize + cellSize/2, cellSize, cellSize/2); 
        fill("blue"); // White squaresj
        rect(j * cellSize + cellSize/2, i * cellSize + cellSize/2, cellSize/2, cellSize); 
      }

    }
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

