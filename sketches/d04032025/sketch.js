// recreating the pain in the ass I was having with a raspberry pi screen as therapy

//glitch grid
let numCols;
let numRows;
let glitchWidth;
let glitchHeight;

let capture;
let noise;
let glitch;
let cellHeight, cellWidth;
// 240x135

function setup() {
  createCanvas(800, 800);
  // createCanvas(300, 300);
  capture = createCapture(VIDEO);
  capture.size(200, 200); //for side by side

  noise = createImage(width, height);
  noStroke();

  glitchWidth = width;
  glitchHeight = height;

  numRows = 1;
  numCols = 20;

  cellWidth = glitchWidth/numCols;
  cellHeight = glitchHeight/numRows;

  print(cellWidth, cellHeight)

  capture.hide();
}

function draw() {
  background(255);
  
  capture.loadPixels();
  // print(capture.pixels.length);

  // let cellImage = createImage(glitchWidth, glitchHeight);
  let cellImage = createImage(cellWidth, cellHeight);
  cellImage.loadPixels();
  // print(cellImage.pixels.length);
  subIndex = 0;

  for(let i = 0; i < cellImage.pixels.length; i+=4){
    // print(subIndex);
    cellImage.pixels[i] = capture.pixels[subIndex];
    cellImage.pixels[i+1] = capture.pixels[subIndex+1];
    cellImage.pixels[i+2] = capture.pixels[subIndex+2];
    // cellImage.pixels[i+3] = capture.pixels[subIndex+3];
    cellImage.pixels[i + 3] = 255;
    subIndex+=4;
    if(subIndex >= capture.pixels.length){
      subIndex = 0;
      // debugger;
    }
  }

  cellImage.updatePixels();

  // image(cellImage, 0, 0, glitchWidth, glitchHeight);

  for(let i = 0; i < numCols; i++){
    for(let j = 0; j < numRows; j++){
      let c =  randomColor();
      // fill(c.r, c.g, c.b);
      //rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
      image(cellImage, i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
  }
}

function randomColor(){
  return {r: floor(random(255)), g: floor(random(255)), b: floor(random(255))}
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function randomColor(){
  return {r: floor(random(255)), g: floor(random(255)), b: floor(random(255))}
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(0, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

