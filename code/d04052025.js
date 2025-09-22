let numCols, numRows, cellWidth, cellHeight;
let cells = [];

let capture;

function setup() {
  // createCanvas(800, 800);
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 10;
  let numRows = 10;

  capture = createCapture(VIDEO);
  capture.size(numCols, numRows); 

  
  cellWidth = width/numCols;
  cellHeight = height/numRows;
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      cells.push({x: j * cellWidth, y: i  * cellHeight});
    }
  }

  capture.hide();
  noStroke();
}

function draw() {
  background(255);

  capture.loadPixels()
  for(let i = 0; i < cells.length; i++){ //cell is a flat array, so is pixels!, pixels is 4 times longer because of rgba values
    let c = cells[i];
    let pIndex = i * 4;
    // fill(color(random(0,255), random(0, 255), random(0,255)));
    let r = capture.pixels[pIndex];
    let g = capture.pixels[pIndex+1];
    let b = capture.pixels[pIndex+2];

    fill(r,g,b);
    rect(c.x, c.y, cellWidth, cellHeight);
  }
  // image(capture, 0, 0, width, height);
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(0, 7)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}