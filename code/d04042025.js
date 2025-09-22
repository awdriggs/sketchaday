let numCols, numRows, cellWidth, cellHeight;
let cells = [];

let capture;

function setup() {
  // createCanvas(800, 800);
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 4;
  let numRows = 4;

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
}

function draw() {
  background(255);

  // capture.loadPixels
     
  // for(let c of cells){
  //   fill(color(random(0,255), random(0, 255), random(0,255)));
  //   rect(c.x, c.y, cellWidth, cellHeight);
  // }
  image(capture, 0, 0, width, height);
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