// recreating the pain in the ass I was having with a raspberry pi screen as therapy

//glitch grid
let numCols;
let numRows;
let glitchWidth;
let glitchHeight;


let capture;
let noise; 
let glitch; 
// 240x135

function setup() {
  createCanvas(135 * 4, 240 * 4);
  capture = createCapture(VIDEO);
  capture.size(300, 300); //for side by side

  // createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);
  noise = createImage(width, height);
  noStroke();
  
  glitchWidth = width * 0.9;
  glitchHeight = height * 0.8;
  
  capture.hide();
}

function draw() {
  background(255);

  noise.loadPixels();

  for(let i = 0; i < noise.pixels.length; i+=4){
    let c = randomColor();
    // debugger;
    noise.pixels[i] = c.r; 
    noise.pixels[i+1] = c.g; 
    noise.pixels[i+2] = c.b; 
    noise.pixels[i+3] = 255; 
  }

  noise.updatePixels();

  image(noise, 0, 0, width, height);


  fill(255, 0, 0);
  rect(0, 0, width * 0.55, height * 0.75);

  rect(0, 0, width * 0.5, height * 0.125);
  fill(0, 255, 0);
  rect(width*0.5, 0, width * 0.5, height * 0.125);
  fill(0, 0, 255);
  rect(0, height * 0.125, width * 0.5, height * 0.25);
  fill(255, 255, 0);
  rect(width*0.5, height * 0.125, width * 0.5, height * 0.25);

  // image(capture, 0, 0, 100, 100);
  
  capture.loadPixels();
  print(capture.pixels.length);

  let cellImage = createImage(glitchWidth, glitchHeight);  
  cellImage.loadPixels();
  for(let i = 0; i < glitchWidth * glitchHeight * 4; i++){
    let subIndex = i % capture.pixels.length;
    // print(subIndex);

    cellImage.pixels[i] = capture.pixels[subIndex];  

    // if(i > capture.pixels.length){
    //   debugger;
    // }

    // if(capture.pixels[0] != 0){
    //   debugger;
    // }
  }

  cellImage.updatePixels();

  image(cellImage, 0, 0, glitchWidth, glitchHeight);
  //for(let i = 0; i < numCols; i++){
  //  for(let j = 0; j < numRows; j++){
  //    let c =  randomColor();
  //    // fill(c.r, c.g, c.b);
  //    //rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
  //    image(cellImage, i * cellWidth, j * cellHeight, cellWidth, cellHeight);
  //  }
  //}




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

