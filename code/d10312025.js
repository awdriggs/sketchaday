let pallette = ['black', 'yellow', 'white', 'green', 'red']

let bgColor, barColor, leftColor, horizontalColor;

let x, y, w, h;
let numBars, totalSize, barSize;
let verticalBarPosition, dir, stepSize;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let colors = shuffle(pallette);
  bgColor = colors[0];
  barColor = colors[1]; 
  leftColor = colors[2];
  horizontalColor = colors[3];
  
  x = 0;
  y = 0;
  w = width; //for testing now
  h = height;
  numBars = 7;
  barSize = w/numBars; 
 
  verticalBarPosition = random(0, width - barSize);
  dir = random() > 0.5 ? 1 : -1;
  stepSize = 5;

  noStroke();
}

function draw() {
  background(255);

  //draw a background
  fill(bgColor);
  rect(x, y, w, h);
  //horinzontal bar
  fill(barColor);
  rect(verticalBarPosition, y, barSize, h);
  ////left hand side
  fill(leftColor);
  rect(x, y, verticalBarPosition, h);
  ////horizontal bars
  fill(horizontalColor);
  for(let i = 1; i < numBars; i+=2){
    rect(x, i * barSize, w, barSize);
  }

  updatePosition();
}

function updatePosition(){
  verticalBarPosition += dir * stepSize; 

  if(verticalBarPosition < barSize){
    verticalBarPosition = barSize;
    dir *= -1;
  } else if(verticalBarPosition > w - barSize * 2){
    verticalBarPosition = w - barSize * 2;
    dir *= -1;
  } 
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}



