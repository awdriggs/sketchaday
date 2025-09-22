//more textile inspiration from kitty
//moving towards this...https://www.stedelijk.nl/nl/collectie/35745-kitty-van-der-mijll-dekker-reliefkleed?page=2
let cellSize = 100;
function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);
  // noLoop();
}

function draw() {
  background(255);
  //seperator
  // line(width/2, 0, width/2, height);

  let cellSize = width/4;
  let margin = cellSize/2;
  let cornerX = margin;
  let cornerY = height/2 - cellSize/2;

  if(mouseIsPressed){
    diagonalLeftBottom(cornerX, cornerY, 30, cellSize);

    cornerX += cellSize;
    diagonalRightTop(cornerX, cornerY, 30, cellSize);

    cornerX += cellSize;
    diagonalRightFull(cornerX, cornerY, 30, cellSize);
  } else {
    // nestedSquare(cornerX, cornerY, 30, cellSize);
    diagonalLeftTop(cornerX, cornerY, 30, cellSize);

    cornerX += cellSize;
    diagonalRightBottom(cornerX, cornerY, 30, cellSize);
    // diagonalRightTop(cornerX, cornerY, 30, cellSize);

    cornerX += cellSize;
    diagonalLeftFull(cornerX, cornerY, 30, cellSize);
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//rewrite as filters
function nestedSquare(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;
    
  for(let i = 0; i < count; i++){
    let move = offset * i;
    rect(cornerX + move/2, cornerY + move/2, cellSize - move);
  }
}

function filterTop(){

}

function filterBottom(){

}

function filterLeft(){

}

function filterRight(){

}

//rewrites as two lines meeting
function cornerSquare(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    rect(cornerX, cornerY, cellSize - move);
  }
}

function diagonalRightBottom(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;
  print(offset);
  //boundry
  // rect(cornerX, cornerY, cellSize, cellSize);

  for(let i = 0; i < count; i++){
    line(cornerX + offset * i, cornerY + cellSize, cornerX + cellSize, cornerY + offset * i);
  }
}

function diagonalRightTop(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  //boundry
  // rect(cornerX, cornerY, cellSize, cellSize);

  for(let i = 0; i < count; i++){
    let move = offset * i;
    line(cornerX, cornerY + cellSize - move, cornerX + cellSize - move, cornerY);
  }
}

function diagonalRightFull(cornerX, cornerY, count, cellSize){
  diagonalRightTop(cornerX, cornerY, count, cellSize);
  diagonalRightBottom(cornerX, cornerY, count, cellSize);
}

function diagonalLeftBottom(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    line(cornerX, cornerY + move, cornerX + cellSize - move, cornerY + cellSize);
  }
}

function diagonalLeftTop(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    line(cornerX + move, cornerY, cornerX + cellSize, cornerY + cellSize - move);
  }
}

function diagonalLeftFull(cornerX, cornerY, count, cellSize){
  diagonalLeftTop(cornerX, cornerY, count, cellSize);
  diagonalLeftBottom(cornerX, cornerY, count, cellSize);
}


function nestedDiamonds(cornerX, cornerY, count, cellSize){
  //spit the area into four
  //top left is right leaning
  diagonalRightFull(cornerX, cornerY, count/2, cellSize/2);
  //top right is left leaning
  diagonalLeftFull(cornerX + cellSize/2, cornerY, count/2, cellSize/2);
  //bottom left is left leaning
  diagonalLeftFull(cornerX, cornerY + cellSize/2, count/2, cellSize/2);
  //botton right is right leaning
  diagonalRightFull(cornerX + cellSize/2, cornerY + cellSize/2, count/2, cellSize/2);
}

function nestedDiamondsInSquare(cornerX, cornerY, count, cellSize) {
  //nested diamonds that are in the middle of a square, leaving the corners blank
  let offset = cellSize/count;
  //one diamond
  console.log(count);
  // quad(cornerX, cornerY + cellSize/2, cornerX + cellSize/2, cornerY, cornerX + cellSize, cornerY + cellSize/2, cornerX + cellSize/2, cornerY + cellSize);
  for(let i = 0; i < 16; i++){
    let move = offset * i;
    console.log(i, move);

    quad(cornerX + move, cornerY + cellSize/2, cornerX + cellSize/2, cornerY + move, cornerX + cellSize - move, cornerY + cellSize/2, cornerX + cellSize/2, cornerY + cellSize - move);
  }
}

function horiziontalLines(){

}

function zigzagLines() {

}

function grid(){

}

//happy accident, parabola
function parabolaLeftTop(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    line(cornerX, cornerY + move, cornerX + cellSize - move, cornerY);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}