//ode to dutch tea towels and kitty van der mijll dekker

console.log("hello");
let numCol, numRow;
let flipflop = 0;
let color1, color2;

let rightBoundrySlider, bottomBoundrySlider;
let setColorButton;

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

  rightBoundrySlider = createSlider(1, width-10, floor(width * (4/5)) +1 );
  rightBoundrySlider.position(10, 10);
  rightBoundrySlider.size(100);

  bottomBoundrySlider = createSlider(1, height - 10, floor(height * (2/3)) + 1); 
  bottomBoundrySlider.position(10, 40);
  bottomBoundrySlider.size(100);

  button = createButton('Set Colors');
  button.mousePressed(setColors); 
  button.position(10, 65);
  
  color1 = color(0);
  color2 = color(255);

}

function draw() {
  //checkboard
  print('draw');
  background(255);

  // timing = slider.value();

  // longCheck(0, 0, width, height, numCols, numRows);
  // squareCheck(0,0,width, height, numCols, numRows);
  
  let rightDiv = floor(rightBoundrySlider.value()); 
  let bottomDiv = floor(bottomBoundrySlider.value()); 
  
  // fill('red');
  // rect(0,0, rightDiv, bottomDiv); 
  squareCheck(0, 0, rightDiv, bottomDiv, 20, 10);

  // fill('pink');
  // rect(0, bottomDiv,  rightDiv, height - bottomDiv);
  longCheck(0, bottomDiv, rightDiv, height - bottomDiv, 40, 3);

  // fill('green');
  // rect(rightDiv, 0,  rightDiv, bottomDiv);
  longCheck(rightDiv, 0, width - rightDiv, bottomDiv, 3, 40);

  // fill('blue');
  // rect(rightDiv, bottomDiv, rightDiv, bottomDiv)
  squareCheck(rightDiv, bottomDiv, width - rightDiv, height - bottomDiv, 20, 10);

  // if(frameCount % timing == 0){
  //   if(flipflop == 0) {
  //     flipflop = 1;
  //   } else {
  //     flipflop = 0;
  //   }
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//long check
function longCheck(startX, startY, sectionW, sectionH, c, r){
  let w = sectionW/c;
  let h = sectionH/r;

  let toggle = flipflop;


  //a total hack! even number of rows was causeing the checkerboard to break
  //this makes it always odd
  if(r % 2 == 0){
    r+=1;
  }


  for(let i = 0; i < c; i++){
    for(let j = 0; j < r; j++){
      // print(i,j);
      // fill(random(0,255));
      // toggle % 2 ? fill(0) : fill(255);
      toggle % 2 ? fill(color1) : fill(color2);
      rect(i * w + startX, j * h + startY, w, h);
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

  // console.log(width, c, w, r, h);
  let toggle = flipflop;

  for(let i = 0; i < c; i++){
    for(let j = 0; j < r; j++){
      // print(i,j);
      // fill(random(0,255));
      // toggle % 2 ? fill(0) : fill(255);
      toggle % 2 ? fill(color1) : fill(color2);
      rect(i * w + startX, j * h + startY, w, h);
      toggle++;
    }
  }
}

function setColors() {
  color1 = prompt("Color 1! Enter an HTML Color Name");
  color2 = prompt("Color 2! Enter an HTML Color Name");
}