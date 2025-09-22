//ode to dutch tea towels and kitty van der mijll dekker

console.log("hello");
let numCol, numRow;
let flipflop = 0;
let timing = 30;

let slider;

let w, h;

function setup() {
  // createCanvas(300, 300);
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
  // squareCheck(0,0,width, height, numCols, numRows);
  
  let rightDiv = floor(width * (4/5)+1); 
  let bottomDiv = floor(height * (2/3)+1); 
  
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
      toggle % 2 ? fill(map(frameCount%timing, 0, timing-1, 0, 255)) : fill(255);
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
      toggle % 2 ? fill(map(frameCount%timing, 0, timing-1, 255, 0)) : fill(255);
      rect(i * w + startX, j * h + startY, w, h);
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