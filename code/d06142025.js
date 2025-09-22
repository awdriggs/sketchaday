let x, y;
let arcType;
// let turnRadius = 100;

let numCols, numRows;
let cellSize;

function setup(){
  createCanvas(800, 800);

  //init a point
  x = random(width/2 - 100, width/2 + 100);
  y = random(height/2 - 100, height/2 + 100);

  //init an arc type
  arcType = floor(random(0, 4));
  print(arcType);
  noFill();
  noLoop();

  numRows = 10;
  numCols = 10;
  cellSize = width/numRows;

}

function draw(){
  background(255);

  // ellipse(0,0,20, 20);
  for(let i = 0; i < numRows; i++){
    print("row " + i);
    let y = i * cellSize;
    for(let j = 0; j < numCols; j++){
      print("col " + j);
      let x = j * cellSize;
      // debugger;
      // translate(j * cellSize, i * cellSize);
      
      // ellipse(0,0, 20,20);
      // ellipse(x,y, 20, 20);
      arcType = floor(random(0, 4));
      drawArc(x, y, arcType);
    }
  }
}

//get next arc type
function generateArcType(prevType){


}

function drawArc(x,y, type){
  if(type == 0){
    arc(x, y, cellSize, cellSize, 0, HALF_PI);
  } else if(type == 1) {
    arc(x, y, cellSize, cellSize, HALF_PI, PI);
  } else if(type == 2) {
    arc(x, y, cellSize, cellSize, PI, HALF_PI * 3);
  } else {
    arc(x, y, cellSize, cellSize, HALF_PI * 3, TWO_PI);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}