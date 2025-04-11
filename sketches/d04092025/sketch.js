let numCols, numRows, cellWidth, cellHeight;
let cells = [];

let capture;

function setup() {
  createCanvas(800, 800);
  // createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 1;
  let numRows = 1000;

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
  // ellipseMode(CORNER)
}

function draw() {
  background(255);

  capture.loadPixels()
  for(let i = 0; i < cells.length; i++){ //cell is a flat array, so is pixels!, pixels is 4 times longer because of rgba values
    let c = cells[i];
    let pIndex = i * 4;
    let overlap = 1;
    // fill(color(random(0,255), random(0, 255), random(0,255)));
    let r = capture.pixels[pIndex];
    let g = capture.pixels[pIndex+1];
    let b = capture.pixels[pIndex+2];
    // let a = 255/overlap;

    fill(r,g,b);
    // let s = cellWidth * 3.5
    rect(c.x, c.y, cellWidth * overlap, cellHeight);
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

