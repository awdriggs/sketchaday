//more textile inspiration from kitty
//moving towards this...https://www.stedelijk.nl/nl/collectie/35745-kitty-van-der-mijll-dekker-reliefkleed?page=2

let strokeColor;
let fillColor;
let cellSize = 100;

function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  strokeColor = 0;
  fillColor = 255;
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
    // hourGlassHorizontal(cornerX, cornerY, 30, cellSize);
    grid(cornerX, cornerY, 4, cellSize, diagonalRightBottom, 10 );

    cornerX += cellSize;
    zigzagVerticalLines(cornerX, cornerY, 30, cellSize);

    cornerX += cellSize;
    grid(cornerX, cornerY, 4, cellSize, diagonalLeftTop, 10 );
  } else {

    // topFilter(cornerX, cornerY, 30, cellSize);
    // leftFilter(cornerX, cornerY, 30, cellSize);
    grid(cornerX, cornerY, 4, cellSize, diagonalRightTop, 10 );

    cornerX += cellSize;
    // bottomFilter(cornerX, cornerY, 30, cellSize);
    // rightFilter(cornerX, cornerY, 30, cellSize);
    // hourGlassVertical(cornerX, cornerY, 30, cellSize);
    zigzagHorizontalLines(cornerX, cornerY, 30, cellSize);

    cornerX += cellSize;
    // diagonalRightFull(cornerX, cornerY, 30, cellSize);
    // nestedSquare(cornerX, cornerY, 30, cellSize);
    grid(cornerX, cornerY, 4, cellSize, diagonalLeftBottom, 10 );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function nestedSquare(cornerX, cornerY, count, cellSize){
  // let offset = cellSize/count;

  // for(let i = 0; i < count; i++){
  //   let move = offset * i;
  //   rect(cornerX + move/2, cornerY + move/2, cellSize - move);
  // }
  hourGlassHorizontal(cornerX, cornerY, count, cellSize);
  hourGlassVertical(cornerX, cornerY, count, cellSize);
}

function topFilter(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;
  //triangle boundry

  for(let i = 0; i < count/2; i++){
    let move = offset * i;
    line(cornerX + move, cornerY + move, cornerX + cellSize - move, cornerY + move);
  }
}

function bottomFilter(cornerX, cornerY, count, cellSize){
  // print("filter bottom");
  let offset = cellSize/count;

  for(let i = 0; i < count/2; i++){
    let move = offset * i;
    line(cornerX + move, cornerY + cellSize - move, cornerX + cellSize - move, cornerY + cellSize - move);
  }
}

function leftFilter(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count/2; i++){
    let move = offset * i;
    line(cornerX + move, cornerY + move, cornerX + move, cornerY + cellSize - move);
  }
}

function rightFilter(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count/2; i++){
    let move = offset * i;
    line(cornerX + cellSize - move, cornerY + move, cornerX + cellSize - move, cornerY + cellSize - move);
  }
}

function hourGlassHorizontal(cornerX, cornerY, count, cellSize){
  leftFilter(cornerX, cornerY, count, cellSize);
  rightFilter(cornerX, cornerY, count, cellSize);
}

function hourGlassVertical(cornerX, cornerY, count, cellSize){
  topFilter(cornerX, cornerY, count, cellSize);
  bottomFilter(cornerX, cornerY, count, cellSize);
}

//rewrites as two lines meeting
function cornerSquare(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i <= count; i++){
    let move = offset * i;
    // rect(cornerX, cornerY, cellSize - move);
    line(cornerX + move, cornerY, cornerX + move, cornerY + move);
    line(cornerX, cornerY + move, cornerX + move, cornerY + move);
  }
}

function diagonalRightBottom(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

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

function horiziontalLines(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;
  for(let i = 0; i <= count; i++){
    let move = offset * i;
    line(cornerX, cornerY + move, cornerX + cellSize, cornerY + move);
  }
}

function verticalLines(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;
  for(let i = 0; i <= count; i++){
    let move = offset * i;
    line(cornerX + move, cornerY, cornerX + move, cornerY + cellSize);
  }
}

function zigzagVerticalLines(cornerX, cornerY, count, cellSize) {
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    for(let j = 0; j < count; j++){
      // line(cornerX + move, cornerY + move, cornerX + move, cornerY + move + offset);
      let yMove = offset * j;
      if( j % 2 == 0){
        line(cornerX + move, cornerY + yMove, cornerX + move + offset, cornerY + yMove + offset);
      } else {
        line(cornerX + move + offset, cornerY + yMove, cornerX + move, cornerY + yMove + offset);
      }

    }
  }
}

function zigzagHorizontalLines(cornerX, cornerY, count, cellSize) {
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    for(let j = 0; j < count; j++){
      let xMove = offset * j;
      if(j % 2 == 0){
        line(cornerX + xMove, cornerY + move, cornerX + xMove + offset, cornerY + move + offset);
      } else {
        line(cornerX + xMove, cornerY + move + offset, cornerX + xMove + offset, cornerY + move);
      }
    }
  }
}

function grid(cornerX, cornerY, count, cellSize, fn, innerCount){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let x = offset * i;
    for(let j = 0; j < count; j++){
      let y = offset * j;
      fn(cornerX + x, cornerY + y, innerCount, offset);
    }
  }

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