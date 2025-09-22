//more textile inspiration from kitty
//moving towards this...https://www.stedelijk.nl/nl/collectie/35745-kitty-van-der-mijll-dekker-reliefkleed?page=2
let cellSize = 100;
function setup() {
  // createCanvas(300, 300);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  //seperator
  // line(width/2, 0, width/2, height);

  let cellSize = width/4;
  let margin = cellSize/2;
  let cornerX = margin;
  let cornerY = height/2 - cellSize/2;

  nestedSquare(cornerX, cornerY, 30, cellSize);

  cornerX += cellSize;
  diagonalRight(cornerX, cornerY, 30, cellSize);

  cornerX += cellSize;

  cornerSquare(cornerX, cornerY, 30, cellSize);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function nestedSquare(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    rect(cornerX + move/2, cornerY + move/2, cellSize - move);
  }
}

function cornerSquare(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  for(let i = 0; i < count; i++){
    let move = offset * i;
    rect(cornerX, cornerY, cellSize - move);
  }
}

function diagonalRight(cornerX, cornerY, count, cellSize){
  let offset = cellSize/count;

  //boundry
  rect(cornerX, cornerY, cellSize, cellSize);

  for(let i = 0; i < count; i++){
    line(cornerX + offset * i, cornerY + cellSize, cornerX + cellSize, cornerY + offset * i);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}