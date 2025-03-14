console.log("hello");
let numCol, numRow;
let flipflop = 0;

let w, h;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  numCols = 25;
  numRows = 5;
  w = width/numCols;
  h = height/numRows;
  // print(w,h);

  // noStroke();

  print('setup');
}

function draw() {
  //checkboard
  print('draw');

  let toggle = flipflop;

  for(let i = 0; i < numCols; i++){
    for(let j = 0; j < numRows; j++){
      print(i,j);
      // fill(random(0,255));
      toggle % 2 ? fill(0) : fill(255);
      rect(i * w, j * h, w, h);
      toggle++;
    }
  }

  if(frameCount % 300 == 0){
    if(flipflop == 0) {
      flipflop = 1;
    } else {
      flipflop = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

