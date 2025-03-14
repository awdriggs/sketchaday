//ode to dutch tea towels and kitty van der mijll dekker
// 

console.log("hello");
let numCol, numRow;
let flipflop = 0;
let timing = 30;

let slider;

let w, h;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  numCols = 25;
  numRows = numCols;
  w = width/numCols;
  h = w;
  // print(w,h);

  noStroke();

  print('setup');

  slider = createSlider(10, 600, 30);
  slider.position(10, 10);
  slider.size(100);
   
}

function draw() {
  //checkboard
  print('draw');
  background(255);

  timing = slider.value();

  // longCheck(0, 0, width, height, numCols, numRows);
  squareCheck(0,0,width, height, numCols, numRows);
  
  if(frameCount % timing == 0){
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

//long check
function longCheck(startX, startY, sectionW, sectionH, c, r){
  let w = sectionW/c;
  let h = sectionH/r;

  let toggle = flipflop;

  for(let i = 0; i < c; i++){
    for(let j = 0; j < r; j++){
      // print(i,j);
      // fill(random(0,255));
      // toggle % 2 ? fill(0) : fill(255);
      toggle % 2 ? fill(map(frameCount%timing, 0, timing-1, 0, 255)) : fill(255);
      rect(i * w, j * h, w, h);
      toggle++;
    }
  }

}
//squre check 
function squareCheck(startX, startY, sectionW, sectionH, c){
  let w = sectionW/c;
  let h = w;
  let r = floor(sectionH/h) + 1; 
  
  //a total hack! even number of rows was causeing the checkerboard to break
  //this makes it always odd
  if(r % 2 == 0){
    r+=1;
  }

  console.log(width, c, w, r, h);
  let toggle = flipflop;

  for(let i = 0; i < c; i++){
    for(let j = 0; j < r; j++){
      // print(i,j);
      // fill(random(0,255));
      // toggle % 2 ? fill(0) : fill(255);
      toggle % 2 ? fill(map(frameCount%timing, 0, timing-1, 255, 0)) : fill(255);
      rect(i * w, j * h, w, h);
      toggle++;
    }
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3,7)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

