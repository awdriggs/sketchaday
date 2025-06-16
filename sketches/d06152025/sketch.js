let arcs = [];
// let x, y;
// let arcType;
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
  // noLoop();

  numRows = 20;
  numCols = 20;
  cellSize = width/numRows;


  for(let i = 0; i < numRows; i++){
    print("row " + i);
    let y = i * cellSize;
    for(let j = 0; j < numCols; j++){
      print("col " + j);
      let x = j * cellSize;
      let arcType = floor(random(0, 4));
      let dir = random() ? -1 : 1;

      arcs.push(new swingingArc(x, y, dir,  arcType, cellSize));

    }
  }

}

function draw(){
  background(255);

  for(let a of arcs){
    a.draw();
  }

  if(frameCount % 60 == 0){
    for(let a of arcs){
      a.updateType();
      print(a.type)
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

class swingingArc {
  constructor(x,y, dir, type, size){
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.type = type;
    this.size = size;
  }

  updateType(){
    this.type += this.dir;
    this.type = (this.type + 4) % 4;
  }

  draw(){

    if(this.type == 0){
      arc(this.x, this.y, this.size, this.size, 0, HALF_PI);
    } else if(this.type == 1) {
      arc(this.x, this.y, this.size, this.size, HALF_PI, PI);
    } else if(this.type == 2) {
      arc(this.x, this.y, this.size, this.size, PI, HALF_PI * 3);
    } else {
      arc(this.x, this.y, this.size, this.size, HALF_PI * 3, TWO_PI);
    }

    // ellipse(this.x, this.y, 2, 2)
  }
}

